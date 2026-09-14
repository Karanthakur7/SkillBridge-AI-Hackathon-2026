from fastapi import APIRouter, HTTPException
from app.services.career_recommender import load_job_roles, get_role_by_name
from app.services.skill_extractor import load_skills_db
from app.schemas import RolesResponse, RoleItem, SkillsResponse, SkillItem

router = APIRouter(tags=["Roles and Skills"])


@router.get("/api/roles", response_model=RolesResponse)
def get_all_roles():
    roles = load_job_roles()
    return RolesResponse(
        roles=roles,
        total=len(roles)
    )


@router.get("/api/roles/{role_name}", response_model=RoleItem)
def get_single_role(role_name: str):
    roles = load_job_roles()
    for r in roles:
        if r.get("role_name", "").lower() == role_name.lower():
            return r
    raise HTTPException(status_code=404, detail=f"Role '{role_name}' not found.")


@router.get("/api/skills", response_model=SkillsResponse)
def get_all_skills():
    skills = load_skills_db()
    return SkillsResponse(
        skills=skills,
        total=len(skills)
    )
