from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field


class StudentProfileBase(BaseModel):
    name: str = "Student"
    email: str = ""
    phone: str = ""
    github_url: str = ""
    linkedin_url: str = ""
    degree: str = ""
    institution: str = ""
    graduation_year: str = ""
    projects: List[str] = []
    internships: List[str] = []
    certifications: List[str] = []
    extracted_skills: List[str] = []


class StudentProfileResponse(StudentProfileBase):
    id: int
    created_at: Optional[Any] = None

    class Config:
        from_attributes = True


class CareerMatch(BaseModel):
    role_name: str
    department: Optional[str] = "Engineering & Analytics"
    category: str
    description: str
    match_percentage: float
    total_required_skills: int
    matched_skills: List[str]
    missing_skills: List[str]
    priority_skills: List[str]
    is_active_target: bool = False
    avg_salary: Optional[str] = ""
    market_demand: Optional[str] = ""
    industry_growth: Optional[str] = ""


class SkillDetail(BaseModel):
    skill_name: str
    skill_type: str  # "Core" or "Secondary"
    weight_multiplier: Optional[str] = "Core (x1.5)"
    status: str  # "Matched" or "Missing"
    priority: str  # "High" or "Medium" or "Satisfied"
    recommendation: str


class GapAnalysis(BaseModel):
    target_role: str
    department: Optional[str] = "AI & Analytics"
    category: str
    description: str
    readiness_score: float
    avg_salary: Optional[str] = "₹7 LPA – ₹18 LPA"
    market_demand: Optional[str] = "Very High"
    industry_growth: Optional[str] = "+28% (Very High)"
    matched_core_count: int
    total_core_count: int
    matched_secondary_count: int
    total_secondary_count: int
    matched_skills: List[str]
    missing_skills: List[str]
    priority_skills: List[str]
    details: List[SkillDetail]


class RoadmapPhase(BaseModel):
    phase: int
    title: str
    priority: str
    target_skills: List[str]
    topics: List[str]
    practice: str
    project: str
    job_prep: str
    is_gap_targeted: bool = False
    estimated_duration: Optional[str] = "3-4 weeks"


class Roadmap(BaseModel):
    role_name: str
    overview: str
    estimated_weeks: int
    phases: List[RoadmapPhase]


class InternshipSuggestion(BaseModel):
    title: str
    category: str
    domain: str
    match_relevance: str
    description: str
    recommended_skills: List[str]


class PortfolioSuggestion(BaseModel):
    category: str
    title: str
    priority: str  # "High", "Medium", "Low"
    impact: str
    actionable_steps: List[str]


class FullAnalysisResponse(BaseModel):
    profile_id: int
    profile: StudentProfileResponse
    active_target_role: str
    readiness_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    priority_skills: List[str]
    career_matches: List[CareerMatch]
    gap_analysis: GapAnalysis
    roadmap: Roadmap
    internship_suggestions: List[InternshipSuggestion]
    portfolio_suggestions: List[PortfolioSuggestion]


class TextAnalysisRequest(BaseModel):
    text: str
    candidate_name: Optional[str] = None
    degree: Optional[str] = None
    target_role: Optional[str] = None
    industry_track: Optional[str] = None


class TargetRoleUpdateRequest(BaseModel):
    target_role: str


class RoleItem(BaseModel):
    role_name: str
    department: Optional[str] = "General"
    category: str
    description: str
    avg_salary: Optional[str] = "₹6 LPA – ₹15 LPA"
    market_demand: Optional[str] = "High"
    industry_growth: Optional[str] = "+20%"
    core_skills: List[str]
    secondary_skills: List[str]
    skill_weights: Optional[Dict[str, float]] = None
    roadmap_reference: str


class RolesResponse(BaseModel):
    roles: List[RoleItem]
    total: int


class SkillItem(BaseModel):
    name: str
    category: str
    type: str
    aliases: List[str] = []
    description: str = ""


class SkillsResponse(BaseModel):
    skills: List[SkillItem]
    total: int
