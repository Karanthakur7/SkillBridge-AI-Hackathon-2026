import os
import json
import re
from typing import List, Dict, Any

JOB_ROLES_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "job_roles.json")

CORE_SKILL_WEIGHT = 1.5
IMPORTANT_SKILL_WEIGHT = 1.3
SECONDARY_SKILL_WEIGHT = 1.2


def load_job_roles() -> List[Dict[str, Any]]:
    try:
        with open(JOB_ROLES_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("roles", [])
    except Exception as e:
        print(f"Error loading job_roles: {e}")
        return []


def calculate_role_match(role: Dict[str, Any], extracted_skills: List[str], active_target_role: str = "") -> Dict[str, Any]:
    role_name = role.get("role_name", "")
    core_skills = role.get("core_skills", [])
    secondary_skills = role.get("secondary_skills", [])
    all_required_skills = core_skills + secondary_skills

    extracted_set = set(extracted_skills)

    matched_core = [s for s in core_skills if s in extracted_set]
    missing_core = [s for s in core_skills if s not in extracted_set]

    matched_secondary = [s for s in secondary_skills if s in extracted_set]
    missing_secondary = [s for s in secondary_skills if s not in extracted_set]

    matched_skills = matched_core + matched_secondary
    missing_skills = missing_core + missing_secondary
    priority_skills = missing_core

    # Dynamic weighted calculation (Core: 1.5, Secondary: 1.2)
    total_weight = (len(core_skills) * CORE_SKILL_WEIGHT) + (len(secondary_skills) * SECONDARY_SKILL_WEIGHT)
    matched_weight = (len(matched_core) * CORE_SKILL_WEIGHT) + (len(matched_secondary) * SECONDARY_SKILL_WEIGHT)

    if total_weight > 0:
        match_percentage = round((matched_weight / total_weight) * 100, 1)
    else:
        match_percentage = 0.0

    return {
        "role_name": role_name,
        "department": role.get("department", "AI & Analytics"),
        "category": role.get("category", "Technical"),
        "description": role.get("description", ""),
        "avg_salary": role.get("avg_salary", "₹6 LPA – ₹16 LPA"),
        "market_demand": role.get("market_demand", "Very High"),
        "industry_growth": role.get("industry_growth", "+25% (High)"),
        "match_percentage": match_percentage,
        "total_required_skills": len(all_required_skills),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "priority_skills": priority_skills,
        "is_active_target": (role_name.lower() == active_target_role.lower())
    }


def compute_all_career_matches(extracted_skills: List[str], active_target_role: str = "") -> List[Dict[str, Any]]:
    roles = load_job_roles()
    results = []

    for role in roles:
        match_data = calculate_role_match(role, extracted_skills, active_target_role)
        results.append(match_data)

    # Sort descending by match_percentage
    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results


def get_role_by_name(role_name: str) -> Dict[str, Any]:
    roles = load_job_roles()
    if not role_name or not roles:
        return roles[0] if roles else {}

    target_clean = role_name.strip().lower()

    # Exact match first
    for r in roles:
        if r.get("role_name", "").lower() == target_clean:
            return r

    # Alias / Substring normalization
    normalized_aliases = {
        "recruiter": "Recruiter / Talent Acquisition",
        "recruitment": "Recruiter / Talent Acquisition",
        "talent acquisition": "Recruiter / Talent Acquisition",
        "bde": "Business Development Executive",
        "business development": "Business Development Executive",
        "sales": "Sales Executive",
        "hr": "HR Executive",
        "human resources": "HR Executive",
        "digital marketing": "Digital Marketing Executive",
        "marketing": "Marketing Executive",
        "operations": "Operations Executive",
        "mis": "MIS Executive",
        "account": "Account Executive",
        "content": "Content Writer",
        "project": "Project Coordinator",
        "full stack": "Full Stack Web Developer",
        "fullstack": "Full Stack Web Developer",
        "ml": "Machine Learning Engineer",
        "machine learning": "Machine Learning Engineer"
    }

    for key, canonical in normalized_aliases.items():
        if key in target_clean:
            for r in roles:
                if r.get("role_name", "").lower() == canonical.lower():
                    return r

    # Partial substring match
    for r in roles:
        r_name = r.get("role_name", "").lower()
        if target_clean in r_name or r_name in target_clean:
            return r

    # Fallback to first role if not found
    return roles[0] if roles else {}
