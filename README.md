# SkillBridge AI 🚀
### Intelligent Industry Readiness & Personalized Career Pathway Engine
**Smart India Hackathon 2026 Submission**

---

## 📌 1. Problem Statement
**Problem Statement:** *Challenges in aligning skill development programs with industry requirements and emerging job market demands.*

### 🔍 Problem Explanation
Higher education curricula frequently lag behind rapid technological advancements and shifting job market expectations. Students graduate with degrees but lack actionable visibility into:
1. Exact skill discrepancies between university coursework and real-world hiring criteria.
2. Objective, transparent metrics measuring their industry readiness.
3. Structured, milestone-driven roadmaps to bridge critical technical and non-technical gaps before graduation.

### 💡 Proposed Solution
**SkillBridge AI** is an end-to-end intelligent platform that bridges this gap. It processes unstructured student resumes (PDF, DOCX, TXT), automatically detects technical and soft skills against an extensive industry ontology, computes a **deterministic, weighted Industry Readiness Score**, maps skills across 19+ technical and non-technical career roles, and generates **gap-targeted, milestone-based learning roadmaps** with hands-on practice, capstone projects, internship suggestions, and portfolio enhancement guidance.

---

## ✨ 2. Key Features

- **Multi-Format Resume Parser:** Robust parsing of PDF (pypdf + pdfplumber fallback), DOCX (python-docx), and TXT formats extracting contact details, degrees, institutions, graduation year, GitHub/LinkedIn URLs, projects, internships, and certifications.
- **Curated Skill Ontology Extraction:** Word-boundary regex matching across 40+ technical and non-technical skills with support for industry aliases (e.g., `Scikit-Learn` / `sklearn`, `Pandas` / `pd`, `React` / `reactjs`).
- **Deterministic Weighted Readiness Score:** Calculates mathematically exact readiness scores where core industry skills carry double weight (`2.0x`) over secondary skills (`1.0x`), eliminating arbitrary or fake percentages.
- **Dynamic Active Target Role Switching:** Allows students to explore any role on the fly; dynamically recalculates readiness scores, priority gaps, milestone roadmaps, and internship recommendations.
- **Comprehensive Role Catalog (19+ Roles):** Covers 6 technical roles (Data Analyst, Data Scientist, Full Stack Web Developer, ML Engineer, Python Developer, DevOps & Cloud Engineer) and 13 non-technical/business roles (HR Executive, Recruiter, Sales, Business Development, Customer Support, Digital Marketing, Operations, MIS, Content Writer, Business Analyst, etc.).
- **Gap-Targeted Learning Roadmaps:** Customized step-by-step learning pathways highlighting phases that target the student's exact missing skills, complete with curriculum topics, coding practice, milestone projects, and interview preparation.
- **Portfolio & Profile Enhancement:** Actionable recommendations including GitHub profile README optimization, live project deployment with quantifiable metrics, LinkedIn headline positioning, and STAR resume formatting.
- **1-Click Live Demo Evaluation:** Instant test profiles for judges (Rohan Sharma, Priya Patel, Aman Verma) executing real backend API pipelines.

---

## 🏗️ 3. Technical Architecture & Tech Stack

```
[ Unstructured Resume (PDF / DOCX / TXT) ]
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│               SkillBridge AI Backend                   │
│  FastAPI • Uvicorn • SQLAlchemy • SQLite • Pydantic   │
├────────────────────────────────────────────────────────┤
│ 1. Resume Parser (pypdf / pdfplumber / python-docx)    │
│ 2. Skill Ontology Extractor (skills_db.json)           │
│ 3. Career Recommender & Weighted Readiness Matcher     │
│ 4. Granular Gap Analyzer & Priority Classifier         │
│ 5. Personalized Roadmap Generator (roadmaps.json)      │
│ 6. Internship & Portfolio Enhancement Engine           │
└────────────────────────────────────────────────────────┘
                   │  JSON REST API
                   ▼
┌────────────────────────────────────────────────────────┐
│               SkillBridge AI Frontend                  │
│       React 18 • Vite • Tailwind CSS • Axios           │
├────────────────────────────────────────────────────────┤
│ • Home Page (Hero, Architecture & Quick Demos)         │
│ • Resume Analyzer (Drag-and-Drop & Paste Tabs)         │
│ • Readiness Dashboard (SVG Gauge, Gaps, Targets)       │
│ • Job Roles Matrix (19+ Tech & Non-Tech Roles)         │
│ • Learning Roadmap Timeline (Phase Milestones)         │
│ • Student Profile & Portfolio Enhancement View         │
└────────────────────────────────────────────────────────┘
```

### Frontend Stack:
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS + Vanilla CSS utilities & glassmorphism
- **Icons:** Lucide React
- **HTTP Client:** Axios with centralized interceptors & Vite proxy

### Backend Stack:
- **Framework:** FastAPI (Python 3.10+)
- **Server:** Uvicorn (ASGI)
- **Database & ORM:** SQLite with SQLAlchemy 2.0
- **Validation:** Pydantic V2
- **Document Parsing:** `pypdf`, `pdfplumber`, `python-docx`
- **CORS:** FastAPI CORSMiddleware enabled for cross-origin development

---

## 🧮 4. Readiness Calculation & Skill Matching Logic

The Industry Readiness Score uses a transparent, weighted formula:

$$\text{Readiness Score} = \left( \frac{\sum \text{Weights of Matched Required Skills}}{\sum \text{Weights of All Required Skills}} \right) \times 100$$

- **Core Skills Weight:** $W_{\text{core}} = 2.0$ (Critical mandatory skills for job performance)
- **Secondary Skills Weight:** $W_{\text{secondary}} = 1.0$ (Complementary tools, libraries, or soft skills)
- **Priority Gaps:** Any missing Core Skill is automatically classified as a **High Priority Gap**.

---

## 📁 5. Project Directory Structure

```
SkillBridge-AI/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                     # FastAPI application & CORS setup
│   │   ├── database.py                 # SQLite database engine & session maker
│   │   ├── models.py                   # SQLAlchemy database models
│   │   ├── schemas.py                  # Pydantic validation schemas
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── analyze.py              # Upload, text paste & demo profile endpoints
│   │   │   ├── roles.py                # Job roles listing & detail endpoints
│   │   │   ├── roadmap.py              # Learning roadmap generation endpoints
│   │   │   └── profile.py              # Profile retrieval & dynamic target switching
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── resume_parser.py        # PDF/DOCX/TXT multi-format parser & regex extractor
│   │   │   ├── skill_extractor.py      # Skill ontology matcher with aliases
│   │   │   ├── career_recommender.py   # Weighted readiness formula & role matcher
│   │   │   ├── gap_analyzer.py         # Detailed gap matrix breakdown
│   │   │   ├── roadmap_generator.py    # Milestone roadmap generator
│   │   │   └── enhancement_suggester.py# Portfolio & internship recommendation engine
│   │   └── data/
│   │       ├── skills_db.json          # Curated technical & non-technical skill ontology
│   │       ├── job_roles.json          # 19+ Tech and Non-Tech job role definitions
│   │       └── roadmaps.json           # Step-by-step milestone roadmaps
│   ├── requirements.txt                # Python backend dependencies
│   └── run.py                          # Backend launch script (uvicorn)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Responsive header with SIH badge & demo dropdown
│   │   │   ├── Footer.jsx              # Footer with problem statement & stack details
│   │   │   ├── ReadinessGauge.jsx      # SVG circular readiness score gauge
│   │   │   ├── SkillBadge.jsx          # Color-coded skill pills (Matched / Core / Secondary)
│   │   │   ├── CareerCard.jsx          # Career card with match bar & target switch button
│   │   │   ├── SkillGapTable.jsx       # Interactive skill gap matrix table
│   │   │   └── TimelineRoadmap.jsx     # Phase milestone timeline component
│   │   ├── context/
│   │   │   └── AnalysisContext.jsx     # Centralized state management & localStorage sync
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Hero landing page & quick demo cards
│   │   │   ├── ResumeAnalyzer.jsx      # Drag-and-drop file upload & text paste
│   │   │   ├── Dashboard.jsx           # Circular gauge, active target switcher, gap table
│   │   │   ├── JobRoles.jsx            # 19+ searchable tech & non-tech job roles
│   │   │   ├── LearningRoadmap.jsx     # Customized milestone learning pathways
│   │   │   └── StudentProfile.jsx      # Extracted profile, links & portfolio enhancements
│   │   ├── services/
│   │   │   └── api.js                  # Axios HTTP client with error interceptors
│   │   ├── App.jsx                     # Route definitions
│   │   ├── index.css                   # Tailwind directives & glassmorphism styling
│   │   └── main.jsx                    # React 18 DOM mount point
│   ├── package.json
│   ├── vite.config.js                  # Vite server & API reverse proxy configuration
│   ├── tailwind.config.js              # Custom theme colors & typography
│   └── postcss.config.js
│
├── data/
│   └── sample_resumes/
│       ├── rohan_sharma_data_analyst.txt
│       ├── priya_patel_ml_engineer.txt
│       ├── aman_verma_fullstack_dev.txt
│       └── ananya_singh_hr_executive.txt
├── README.md                           # Comprehensive documentation
└── QUICK_START.md                      # Rapid setup instructions
```

---

## ⚡ 6. Installation & Setup

### Prerequisites
- **Python:** 3.10+ (Tested on Python 3.13)
- **Node.js:** 18+ (Tested on Node v24)
- **npm:** 9+

---

### Step 1: Backend Setup
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
pip install -r requirements.txt
python run.py
```
Backend will start on: **`http://127.0.0.1:8000`**
Swagger API Docs available at: **`http://127.0.0.1:8000/docs`**

---

### Step 2: Frontend Setup
Open a second terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on: **`http://localhost:5173`**

---

## 🧪 7. How to Test & Demo Flow

### Option A: Quick 1-Click Demos (Recommended for Judges)
1. Open `http://localhost:5173` in your browser.
2. Click **"⚡ Quick Demo Profiles"** in the top navbar or select one from the Home Page:
   - **Rohan Sharma** (Target: Data Analyst)
   - **Priya Patel** (Target: Machine Learning Engineer)
   - **Aman Verma** (Target: Full Stack Web Developer)
3. The dashboard instantly renders live calculated readiness scores, matched skills, missing core skills, and career match cards.
4. Test dynamic target switching by clicking **"Switch Target Role"** or selecting **"Set as Active Target"** on any career card to see readiness scores, gap breakdowns, and roadmaps recalculate in real-time.

### Option B: Upload Your Own Resume
1. Navigate to **"Resume Analyzer"**.
2. Drag and drop any `.pdf`, `.docx`, or `.txt` resume (or use sample files from `data/sample_resumes/`).
3. Click **"Analyze Resume & Calculate Readiness"**.
4. View the parsed student metadata, detected LinkedIn/GitHub links, readiness score gauge, gap matrix, and milestone roadmap.

---

## 🔮 8. Future Scope & Enhancements
- Integration with National Career Service (NCS) and Skill India Digital portals.
- Automated generation of AI mock interview questions tailored to student's exact missing skill gaps.
- GitHub API integration to automatically inspect code commits and verify practical skill competency.
- College administrator portal for batch student readiness analytics and placement readiness heatmaps.

---

## 👥 Team
**SkillBridge AI Team** • Smart India Hackathon 2026
