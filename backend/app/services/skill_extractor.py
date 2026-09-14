import os
import json
import re
from typing import List, Dict, Any

SKILLS_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "skills_db.json")


def load_skills_db() -> List[Dict[str, Any]]:
    try:
        with open(SKILLS_DB_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("skills", [])
    except Exception as e:
        print(f"Error loading skills_db: {e}")
        return []


def extract_skills(text: str) -> List[str]:
    if not text:
        return []

    skills_db = load_skills_db()
    extracted_skills = set()
    normalized_text = f" {text} "

    for skill in skills_db:
        canonical_name = skill["name"]
        aliases = skill.get("aliases", [])
        patterns = [canonical_name] + aliases

        for pattern in patterns:
            # Escape regex special characters in skill patterns (e.g. C++, C#, .NET)
            escaped_pattern = re.escape(pattern)
            # Create regex with word boundaries or punctuation boundaries
            regex_str = r"(?<![a-zA-Z0-9_])" + escaped_pattern + r"(?![a-zA-Z0-9_])"
            if re.search(regex_str, normalized_text, re.I):
                extracted_skills.add(canonical_name)
                break

    # Retain a consistent sorted order
    return sorted(list(extracted_skills))
