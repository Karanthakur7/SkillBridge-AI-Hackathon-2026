import os
import json
from typing import List, Dict, Any
from app.services.career_recommender import get_role_by_name

ROADMAPS_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "roadmaps.json")


def load_roadmaps() -> Dict[str, Any]:
    try:
        with open(ROADMAPS_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("roadmaps", {})
    except Exception as e:
        print(f"Error loading roadmaps: {e}")
        return {}


def generate_personalized_roadmap(target_role_name: str, missing_skills: List[str]) -> Dict[str, Any]:
    role_info = get_role_by_name(target_role_name)
    roadmap_key = role_info.get("roadmap_reference", "data_analyst")

    all_roadmaps = load_roadmaps()
    roadmap_data = all_roadmaps.get(roadmap_key)

    if not roadmap_data:
        # Fallback to data_analyst or generic
        roadmap_data = all_roadmaps.get("data_analyst", {
            "role_name": target_role_name,
            "overview": f"Tailored learning path for {target_role_name}",
            "estimated_weeks": 8,
            "phases": []
        })

    missing_set = set(missing_skills)
    phases = []

    for phase_item in roadmap_data.get("phases", []):
        target_skills = phase_item.get("target_skills", [])
        # If any of the target skills in this phase is currently missing for the student
        is_targeted = any(s in missing_set for s in target_skills) or len(missing_skills) == 0

        phases.append({
            "phase": phase_item.get("phase", 1),
            "title": phase_item.get("title", ""),
            "priority": phase_item.get("priority", "High"),
            "target_skills": target_skills,
            "topics": phase_item.get("topics", []),
            "practice": phase_item.get("practice", ""),
            "project": phase_item.get("project", ""),
            "job_prep": phase_item.get("job_prep", ""),
            "is_gap_targeted": is_targeted
        })

    return {
        "role_name": roadmap_data.get("role_name", target_role_name),
        "overview": roadmap_data.get("overview", ""),
        "estimated_weeks": roadmap_data.get("estimated_weeks", 8),
        "phases": phases
    }
