from typing import List, Dict, Any
from app.services.career_recommender import get_role_by_name, CORE_SKILL_WEIGHT, SECONDARY_SKILL_WEIGHT


def analyze_skill_gap(target_role_name: str, extracted_skills: List[str]) -> Dict[str, Any]:
    role = get_role_by_name(target_role_name)
    if not role:
        return {
            "target_role": target_role_name,
            "department": "Engineering & Analytics",
            "category": "Technical",
            "description": "Role not found",
            "readiness_score": 0.0,
            "avg_salary": "₹6 LPA – ₹15 LPA",
            "market_demand": "High",
            "industry_growth": "+20%",
            "matched_core_count": 0,
            "total_core_count": 0,
            "matched_secondary_count": 0,
            "total_secondary_count": 0,
            "matched_skills": [],
            "missing_skills": [],
            "priority_skills": [],
            "details": []
        }

    core_skills = role.get("core_skills", [])
    secondary_skills = role.get("secondary_skills", [])
    extracted_set = set(extracted_skills)

    matched_core = [s for s in core_skills if s in extracted_set]
    missing_core = [s for s in core_skills if s not in extracted_set]

    matched_secondary = [s for s in secondary_skills if s in extracted_set]
    missing_secondary = [s for s in secondary_skills if s not in extracted_set]

    total_weight = (len(core_skills) * CORE_SKILL_WEIGHT) + (len(secondary_skills) * SECONDARY_SKILL_WEIGHT)
    matched_weight = (len(matched_core) * CORE_SKILL_WEIGHT) + (len(matched_secondary) * SECONDARY_SKILL_WEIGHT)

    readiness_score = round((matched_weight / total_weight) * 100, 1) if total_weight > 0 else 0.0

    details = []
    # Process core skills
    for s in core_skills:
        is_matched = s in extracted_set
        details.append({
            "skill_name": s,
            "skill_type": "Core",
            "weight_multiplier": "Core (x1.5)",
            "status": "Matched" if is_matched else "Missing",
            "priority": "High" if not is_matched else "Satisfied",
            "recommendation": f"Core Competency: Verified proficiency in {s}." if is_matched else f"Critical Core Gap: Master {s} immediately to qualify for {role.get('role_name')}."
        })

    # Process secondary skills
    for s in secondary_skills:
        is_matched = s in extracted_set
        details.append({
            "skill_name": s,
            "skill_type": "Secondary",
            "weight_multiplier": "Supporting (x1.2)",
            "status": "Matched" if is_matched else "Missing",
            "priority": "Medium" if not is_matched else "Satisfied",
            "recommendation": f"Supporting Skill: Practical exposure in {s} enhances resume score." if is_matched else f"Supporting Skill Gap: Prioritize learning {s} to build portfolio strength."
        })

    return {
        "target_role": role.get("role_name", target_role_name),
        "department": role.get("department", "AI & Analytics"),
        "category": role.get("category", "Technical"),
        "description": role.get("description", ""),
        "readiness_score": readiness_score,
        "avg_salary": role.get("avg_salary", "₹7 LPA – ₹18 LPA"),
        "market_demand": role.get("market_demand", "Very High"),
        "industry_growth": role.get("industry_growth", "+28% (Very High)"),
        "matched_core_count": len(matched_core),
        "total_core_count": len(core_skills),
        "matched_secondary_count": len(matched_secondary),
        "total_secondary_count": len(secondary_skills),
        "matched_skills": matched_core + matched_secondary,
        "missing_skills": missing_core + missing_secondary,
        "priority_skills": missing_core,
        "details": details
    }
