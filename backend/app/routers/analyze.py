import os
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Response
from fastapi.responses import Response
from sqlalchemy.orm import Session
from typing import Optional, List

from app.database import get_db
from app.models import StudentProfile, AnalysisResult
from app.schemas import FullAnalysisResponse, TextAnalysisRequest
from app.services.resume_parser import (
    parse_pdf, parse_docx, parse_txt, parse_resume_content
)
from app.services.skill_extractor import extract_skills
from app.services.career_recommender import (
    compute_all_career_matches, get_role_by_name
)
from app.services.gap_analyzer import analyze_skill_gap
from app.services.roadmap_generator import generate_personalized_roadmap
from app.services.enhancement_suggester import (
    get_internship_suggestions, get_portfolio_suggestions
)
from app.services.report_generator import generate_readiness_pdf

router = APIRouter(tags=["Analyze"])


def perform_full_analysis(db: Session, parsed_data: dict, requested_target_role: Optional[str] = None) -> FullAnalysisResponse:
    raw_text = parsed_data.get("raw_text", "")
    extracted_skills = extract_skills(raw_text)

    # If extracted skills are empty, check if skills list was provided directly
    if not extracted_skills and parsed_data.get("skills"):
        extracted_skills = parsed_data["skills"]

    # 1. Create or save StudentProfile
    profile = StudentProfile(
        name=parsed_data.get("name") or "Candidate",
        email=parsed_data.get("email") or "",
        phone=parsed_data.get("phone") or "",
        github_url=parsed_data.get("github_url") or "",
        linkedin_url=parsed_data.get("linkedin_url") or "",
        degree=parsed_data.get("degree") or "",
        institution=parsed_data.get("institution") or "",
        graduation_year=parsed_data.get("graduation_year") or "",
        raw_text=raw_text
    )
    profile.projects = parsed_data.get("projects", [])
    profile.internships = parsed_data.get("internships", [])
    profile.certifications = parsed_data.get("certifications", [])
    profile.extracted_skills = extracted_skills

    db.add(profile)
    db.commit()
    db.refresh(profile)

    # 2. Compute career matches
    all_matches = compute_all_career_matches(extracted_skills)

    # 3. Determine active target role
    active_target_role = "Data Analyst"
    if requested_target_role:
        matched_r = get_role_by_name(requested_target_role)
        if matched_r:
            active_target_role = matched_r["role_name"]
    elif all_matches:
        active_target_role = all_matches[0]["role_name"]

    # Mark active target in matches list
    for match in all_matches:
        match["is_active_target"] = (match["role_name"].lower() == active_target_role.lower())

    # 4. Perform skill gap analysis for active target role
    gap_data = analyze_skill_gap(active_target_role, extracted_skills)
    readiness_score = gap_data["readiness_score"]
    matched_skills = gap_data["matched_skills"]
    missing_skills = gap_data["missing_skills"]
    priority_skills = gap_data["priority_skills"]

    # 5. Generate personalized roadmap
    roadmap_data = generate_personalized_roadmap(active_target_role, missing_skills)

    # 6. Generate internships and portfolio suggestions
    internship_suggestions = get_internship_suggestions(active_target_role, missing_skills)
    portfolio_suggestions = get_portfolio_suggestions(parsed_data, active_target_role, missing_skills)

    # 7. Save AnalysisResult in Database
    analysis = AnalysisResult(
        profile_id=profile.id,
        active_target_role=active_target_role,
        readiness_score=readiness_score
    )
    analysis.matched_skills = matched_skills
    analysis.missing_skills = missing_skills
    analysis.priority_skills = priority_skills
    analysis.career_matches = all_matches
    analysis.gap_analysis = gap_data
    analysis.roadmap = roadmap_data
    analysis.internship_suggestions = internship_suggestions
    analysis.portfolio_suggestions = portfolio_suggestions

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return FullAnalysisResponse(
        profile_id=profile.id,
        profile={
            "id": profile.id,
            "name": profile.name,
            "email": profile.email,
            "phone": profile.phone,
            "github_url": profile.github_url,
            "linkedin_url": profile.linkedin_url,
            "degree": profile.degree,
            "institution": profile.institution,
            "graduation_year": profile.graduation_year,
            "projects": profile.projects,
            "internships": profile.internships,
            "certifications": profile.certifications,
            "extracted_skills": profile.extracted_skills,
            "created_at": profile.created_at
        },
        active_target_role=active_target_role,
        readiness_score=readiness_score,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        priority_skills=priority_skills,
        career_matches=all_matches,
        gap_analysis=gap_data,
        roadmap=roadmap_data,
        internship_suggestions=internship_suggestions,
        portfolio_suggestions=portfolio_suggestions
    )


# Standard and alias upload routes
@router.post("/api/analyze-resume", response_model=FullAnalysisResponse)
@router.post("/api/analyze/upload", response_model=FullAnalysisResponse)
async def analyze_file_upload(
    file: UploadFile = File(...),
    candidate_name: Optional[str] = Form(None),
    degree: Optional[str] = Form(None),
    target_role: Optional[str] = Form(None),
    industry_track: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    filename = file.filename.lower()
    content = await file.read()

    if len(content) == 0:
        raise HTTPException(status_code=400, detail="The uploaded file is completely empty.")

    extracted_text = ""
    if filename.endswith(".pdf"):
        extracted_text = parse_pdf(content)
    elif filename.endswith(".docx"):
        extracted_text = parse_docx(content)
    elif filename.endswith(".txt"):
        extracted_text = parse_txt(content)
    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a PDF (.pdf), Word (.docx), or Text (.txt) resume."
        )

    if not extracted_text or len(extracted_text.strip()) < 15:
        raise HTTPException(
            status_code=400,
            detail="Could not extract readable text from the uploaded file. Please ensure it is not a scanned image, or paste resume text directly."
        )

    parsed_data = parse_resume_content(extracted_text)
    if candidate_name and candidate_name.strip():
        parsed_data["name"] = candidate_name.strip()
    if degree and degree.strip():
        parsed_data["degree"] = degree.strip()

    return perform_full_analysis(db, parsed_data, target_role)


# Standard and alias text analysis routes
@router.post("/api/analyze-text", response_model=FullAnalysisResponse)
@router.post("/api/analyze/text", response_model=FullAnalysisResponse)
def analyze_text(request: TextAnalysisRequest, db: Session = Depends(get_db)):
    if not request.text or len(request.text.strip()) < 15:
        raise HTTPException(
            status_code=400,
            detail="Resume text is too short. Please provide at least 15 characters of resume content."
        )

    parsed_data = parse_resume_content(request.text)
    if request.candidate_name and request.candidate_name.strip():
        parsed_data["name"] = request.candidate_name.strip()
    if request.degree and request.degree.strip():
        parsed_data["degree"] = request.degree.strip()

    return perform_full_analysis(db, parsed_data, request.target_role)


# Standard Demo Analysis routes
@router.get("/api/demo/{demo_id}", response_model=FullAnalysisResponse)
@router.post("/api/demo/{demo_id}", response_model=FullAnalysisResponse)
@router.get("/api/analyze/demo/{demo_id}", response_model=FullAnalysisResponse)
def analyze_demo_profile(demo_id: str, db: Session = Depends(get_db)):
    """
    Live backend analysis execution for the 3 SIH 2026 demo candidates:
    1: Rohan Sharma (Target: Data Analyst)
    2: Priya Patel (Target: ML Engineer / Machine Learning Engineer)
    3: Aman Verma (Target: Full Stack Web Developer)
    """
    demo_id_str = str(demo_id).lower()

    if demo_id_str in ["1", "rohan", "rohan_sharma"]:
        text = """Rohan Sharma
Email: rohan.sharma@example.com | Phone: +91 9876543210
GitHub: https://github.com/rohan-sharma-data | LinkedIn: https://linkedin.com/in/rohansharma-analytics
Education:
Bachelor of Technology in Computer Science (3rd Year)
Delhi Technological University (DTU), 2026

Summary:
Enthusiastic Data Analyst with strong hands-on expertise in Python, SQL, Pandas, NumPy, Excel, and Data Visualization. Experienced in building statistical dashboards and performing exploratory data analysis on real-world business datasets.

Technical Skills:
Python, SQL, Pandas, NumPy, Excel, Data Visualization, Matplotlib, Problem Solving, Communication

Projects:
- E-Commerce Sales Performance & Customer Lifetime Value Dashboard using SQL and Excel Pivot Tables
- COVID-19 Global Trends Exploratory Data Analysis using Python Pandas and Matplotlib
- Retail Store Inventory Optimization Model with SQL aggregations

Certifications:
- Google Data Analytics Professional Certificate
- Advanced SQL for Data Scientists (Coursera)
"""
        target_role = "Data Analyst"

    elif demo_id_str in ["2", "priya", "priya_patel"]:
        text = """Priya Patel
Email: priya.patel@example.com | Phone: +91 9123456780
GitHub: https://github.com/priyapatel-ai | LinkedIn: https://linkedin.com/in/priya-patel-ml
Education:
Bachelor of Engineering in Artificial Intelligence & Data Science (Final Year)
Vellore Institute of Technology (VIT), 2026

Summary:
Aspiring Machine Learning Engineer with deep passion for building deep learning architectures, neural networks, and computer vision models using PyTorch, TensorFlow, Scikit-Learn, and Python.

Technical Skills:
Python, PyTorch, TensorFlow, Scikit-Learn, NumPy, Machine Learning, Deep Learning, Git, GitHub, Problem Solving

Projects:
- Real-Time Convolutional Neural Network for Plant Leaf Disease Classification using PyTorch
- Customer Churn Prediction Engine with XGBoost and Scikit-Learn pipelines
- Multi-Class Semantic Image Segmentation with TensorFlow / Keras

Internships:
- Computer Vision Research Intern at AI Innovations Lab (4 months)

Certifications:
- Deep Learning Specialization by Andrew Ng (DeepLearning.AI)
"""
        target_role = "Machine Learning Engineer"

    elif demo_id_str in ["3", "aman", "aman_verma"]:
        text = """Aman Verma
Email: aman.verma@example.com | Phone: +91 9988776655
GitHub: https://github.com/amanverma-dev | LinkedIn: https://linkedin.com/in/aman-verma-web
Education:
Bachelor of Technology in Computer Science
Netaji Subhas University of Technology (NSUT), 2026

Summary:
Passionate Full Stack Web Developer skilled in building modern reactive frontends with React, JavaScript, HTML5, and CSS3, integrated with backend services and version controlled via Git and GitHub.

Technical Skills:
JavaScript, React, HTML5, CSS3, Git, GitHub, Node.js, Teamwork, Problem Solving

Projects:
- SkillBridge AI - Interactive Learning Roadmap and Resume Assessment Portal in React
- Collaborative Kanban Task Management Web App with Drag-and-Drop and LocalStorage
- Modern Responsive SaaS Landing Page with Tailwind CSS

Internships:
- Frontend Engineering Intern at WebCraft Studios (3 months)

Certifications:
- Meta Front-End Developer Professional Certificate
"""
        target_role = "Full Stack Web Developer"
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Demo profile '{demo_id}' not found. Please select 1 (Rohan Sharma), 2 (Priya Patel), or 3 (Aman Verma)."
        )

    parsed_data = parse_resume_content(text)
    return perform_full_analysis(db, parsed_data, target_role)


# Export Report PDF Route
@router.get("/api/export-report/{profile_id}")
@router.post("/api/export-report/{profile_id}")
def export_report_pdf(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail=f"Profile {profile_id} not found")

    analysis = (
        db.query(AnalysisResult)
        .filter(AnalysisResult.profile_id == profile_id)
        .order_by(AnalysisResult.id.desc())
        .first()
    )

    if not analysis:
        # Generate default analysis
        extracted_skills = profile.extracted_skills
        all_matches = compute_all_career_matches(extracted_skills)
        active_role = all_matches[0]["role_name"] if all_matches else "Data Analyst"
        gap_data = analyze_skill_gap(active_role, extracted_skills)
        roadmap_data = generate_personalized_roadmap(active_role, gap_data["missing_skills"])
    else:
        gap_data = analysis.gap_analysis
        roadmap_data = analysis.roadmap
        all_matches = analysis.career_matches
        active_role = analysis.active_target_role

    data_payload = {
        "profile": {
            "name": profile.name,
            "email": profile.email,
            "phone": profile.phone,
            "degree": profile.degree,
            "institution": profile.institution,
            "extracted_skills": profile.extracted_skills
        },
        "active_target_role": active_role,
        "readiness_score": analysis.readiness_score if analysis else gap_data.get("readiness_score", 0),
        "matched_skills": gap_data.get("matched_skills", []),
        "missing_skills": gap_data.get("missing_skills", []),
        "priority_skills": gap_data.get("priority_skills", []),
        "gap_analysis": gap_data,
        "roadmap": roadmap_data,
        "career_matches": all_matches
    }

    try:
        pdf_bytes = generate_readiness_pdf(data_payload)
        candidate_slug = "".join([c if c.isalnum() else "_" for c in profile.name]).lower()
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=SkillBridge_AI_Report_{candidate_slug}.pdf"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")
