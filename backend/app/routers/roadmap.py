from typing import Optional, List
from fastapi import APIRouter, Query
from app.schemas import Roadmap
from app.services.roadmap_generator import generate_personalized_roadmap
from app.services.career_recommender import load_job_roles

router = APIRouter(tags=["Roadmap"])


@router.get("/api/roadmap", response_model=Roadmap)
@router.get("/api/roadmap/{role_name}", response_model=Roadmap)
def get_roadmap_for_role(
    role_name: Optional[str] = "Data Analyst",
    missing_skills: Optional[str] = Query(None, description="Comma-separated list of missing skills")
):
    missing_list = []
    if missing_skills:
        missing_list = [s.strip() for s in missing_skills.split(",") if s.strip()]

    target_role = role_name or "Data Analyst"
    roadmap = generate_personalized_roadmap(target_role, missing_list)
    return roadmap
