from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import init_db
from app.routers import analyze, roles, roadmap, profile


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database tables on startup
    init_db()
    yield


app = FastAPI(
    title="SkillBridge AI - Student-Industry Alignment Platform",
    description="Smart India Hackathon 2026 Finalist Project: Intelligent Resume Parsing, Weighted Skill Gap Analysis & Personalized Learning Roadmaps.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(analyze.router)
app.include_router(roles.router)
app.include_router(roadmap.router)
app.include_router(profile.router)


@app.get("/")
def root():
    return {
        "project": "SkillBridge AI",
        "tagline": "Student-Industry Alignment Platform",
        "hackathon": "Smart India Hackathon 2026",
        "status": "online",
        "docs_url": "/docs",
        "api_endpoints": {
            "health": "/health or /api/health",
            "analyze_resume": "/api/analyze-resume (POST)",
            "analyze_text": "/api/analyze-text (POST)",
            "demo_analysis": "/api/demo/{demo_id}",
            "job_roles": "/api/roles",
            "skills_ontology": "/api/skills",
            "roadmap": "/api/roadmap",
            "candidates": "/api/candidates",
            "export_report": "/api/export-report/{profile_id}"
        }
    }


@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "hackathon": "Smart India Hackathon 2026",
        "backend": "FastAPI",
        "database": "SQLite / SQLAlchemy",
        "version": "1.0.0"
    }
