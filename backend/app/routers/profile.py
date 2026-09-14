from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import StudentProfile, AnalysisResult
from app.schemas import FullAnalysisResponse, TargetRoleUpdateRequest, StudentProfileResponse
from app.services.career_recommender import compute_all_career_matches, get_role_by_name
from app.services.gap_analyzer import analyze_skill_gap
from app.services.roadmap_generator import generate_personalized_roadmap
from app.services.enhancement_suggester import get_internship_suggestions, get_portfolio_suggestions

router = APIRouter(tags=["Profile and Candidates"])


@router.get("/api/candidates", response_model=List[StudentProfileResponse])
def get_all_candidates(db: Session = Depends(get_db)):
    candidates = db.query(StudentProfile).order_by(StudentProfile.id.desc()).all()
    return candidates


@router.get("/api/candidates/{candidate_id}", response_model=StudentProfileResponse)
def get_single_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(StudentProfile).filter(StudentProfile.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail=f"Candidate with ID {candidate_id} not found.")
    return candidate


@router.get("/api/profile/{profile_id}", response_model=FullAnalysisResponse)
@router.get("/api/dashboard/{profile_id}", response_model=FullAnalysisResponse)
def get_student_profile_analysis(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail=f"Student Profile with ID {profile_id} not found.")

    latest_analysis = (
        db.query(AnalysisResult)
        .filter(AnalysisResult.profile_id == profile_id)
        .order_by(AnalysisResult.id.desc())
        .first()
    )

    if not latest_analysis:
        extracted_skills = profile.extracted_skills
        all_matches = compute_all_career_matches(extracted_skills)
        active_target_role = all_matches[0]["role_name"] if all_matches else "Data Analyst"
        gap_data = analyze_skill_gap(active_target_role, extracted_skills)
        roadmap_data = generate_personalized_roadmap(active_target_role, gap_data["missing_skills"])
        internship_suggs = get_internship_suggestions(active_target_role, gap_data["missing_skills"])
        profile_dict = {
            "projects": profile.projects,
            "internships": profile.internships,
            "certifications": profile.certifications,
            "github_url": profile.github_url,
            "linkedin_url": profile.linkedin_url,
            "extracted_skills": extracted_skills
        }
        portfolio_suggs = get_portfolio_suggestions(profile_dict, active_target_role, gap_data["missing_skills"])

        latest_analysis = AnalysisResult(
            profile_id=profile.id,
            active_target_role=active_target_role,
            readiness_score=gap_data["readiness_score"]
        )
        latest_analysis.matched_skills = gap_data["matched_skills"]
        latest_analysis.missing_skills = gap_data["missing_skills"]
        latest_analysis.priority_skills = gap_data["priority_skills"]
        latest_analysis.career_matches = all_matches
        latest_analysis.gap_analysis = gap_data
        latest_analysis.roadmap = roadmap_data
        latest_analysis.internship_suggestions = internship_suggs
        latest_analysis.portfolio_suggestions = portfolio_suggs

        db.add(latest_analysis)
        db.commit()
        db.refresh(latest_analysis)

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
        active_target_role=latest_analysis.active_target_role,
        readiness_score=latest_analysis.readiness_score,
        matched_skills=latest_analysis.matched_skills,
        missing_skills=latest_analysis.missing_skills,
        priority_skills=latest_analysis.priority_skills,
        career_matches=latest_analysis.career_matches,
        gap_analysis=latest_analysis.gap_analysis,
        roadmap=latest_analysis.roadmap,
        internship_suggestions=latest_analysis.internship_suggestions,
        portfolio_suggestions=latest_analysis.portfolio_suggestions
    )


@router.post("/api/profile/{profile_id}/target-role", response_model=FullAnalysisResponse)
def update_active_target_role(
    profile_id: int,
    request: TargetRoleUpdateRequest,
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail=f"Student Profile with ID {profile_id} not found.")

    role_info = get_role_by_name(request.target_role)
    if not role_info:
        raise HTTPException(status_code=400, detail=f"Role '{request.target_role}' is not recognized.")

    canonical_role_name = role_info["role_name"]
    extracted_skills = profile.extracted_skills

    # Recompute matches
    all_matches = compute_all_career_matches(extracted_skills)
    for m in all_matches:
        m["is_active_target"] = (m["role_name"].lower() == canonical_role_name.lower())

    # Recompute gap analysis
    gap_data = analyze_skill_gap(canonical_role_name, extracted_skills)
    readiness_score = gap_data["readiness_score"]
    matched_skills = gap_data["matched_skills"]
    missing_skills = gap_data["missing_skills"]
    priority_skills = gap_data["priority_skills"]

    # Recompute roadmap
    roadmap_data = generate_personalized_roadmap(canonical_role_name, missing_skills)

    # Recompute internship & portfolio recommendations
    internship_suggs = get_internship_suggestions(canonical_role_name, missing_skills)
    profile_dict = {
        "projects": profile.projects,
        "internships": profile.internships,
        "certifications": profile.certifications,
        "github_url": profile.github_url,
        "linkedin_url": profile.linkedin_url,
        "extracted_skills": extracted_skills
    }
    portfolio_suggs = get_portfolio_suggestions(profile_dict, canonical_role_name, missing_skills)

    # Update or add new AnalysisResult record
    analysis = AnalysisResult(
        profile_id=profile.id,
        active_target_role=canonical_role_name,
        readiness_score=readiness_score
    )
    analysis.matched_skills = matched_skills
    analysis.missing_skills = missing_skills
    analysis.priority_skills = priority_skills
    analysis.career_matches = all_matches
    analysis.gap_analysis = gap_data
    analysis.roadmap = roadmap_data
    analysis.internship_suggestions = internship_suggs
    analysis.portfolio_suggestions = portfolio_suggs

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
        active_target_role=canonical_role_name,
        readiness_score=readiness_score,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        priority_skills=priority_skills,
        career_matches=all_matches,
        gap_analysis=gap_data,
        roadmap=roadmap_data,
        internship_suggestions=internship_suggs,
        portfolio_suggestions=portfolio_suggs
    )
