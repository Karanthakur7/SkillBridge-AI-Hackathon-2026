import datetime
import json
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), default="Student")
    email = Column(String(255), default="")
    phone = Column(String(50), default="")
    github_url = Column(String(255), default="")
    linkedin_url = Column(String(255), default="")
    degree = Column(String(255), default="")
    institution = Column(String(255), default="")
    graduation_year = Column(String(50), default="")
    projects_json = Column(Text, default="[]")
    internships_json = Column(Text, default="[]")
    certifications_json = Column(Text, default="[]")
    extracted_skills_json = Column(Text, default="[]")
    raw_text = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    analyses = relationship("AnalysisResult", back_populates="profile", cascade="all, delete-orphan")

    @property
    def projects(self):
        try:
            return json.loads(self.projects_json) if self.projects_json else []
        except Exception:
            return []

    @projects.setter
    def projects(self, value):
        self.projects_json = json.dumps(value or [])

    @property
    def internships(self):
        try:
            return json.loads(self.internships_json) if self.internships_json else []
        except Exception:
            return []

    @internships.setter
    def internships(self, value):
        self.internships_json = json.dumps(value or [])

    @property
    def certifications(self):
        try:
            return json.loads(self.certifications_json) if self.certifications_json else []
        except Exception:
            return []

    @certifications.setter
    def certifications(self, value):
        self.certifications_json = json.dumps(value or [])

    @property
    def extracted_skills(self):
        try:
            return json.loads(self.extracted_skills_json) if self.extracted_skills_json else []
        except Exception:
            return []

    @extracted_skills.setter
    def extracted_skills(self, value):
        self.extracted_skills_json = json.dumps(value or [])


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    profile_id = Column(Integer, ForeignKey("student_profiles.id"), index=True)
    active_target_role = Column(String(255), default="Data Analyst")
    readiness_score = Column(Float, default=0.0)
    matched_skills_json = Column(Text, default="[]")
    missing_skills_json = Column(Text, default="[]")
    priority_skills_json = Column(Text, default="[]")
    career_matches_json = Column(Text, default="[]")
    gap_analysis_json = Column(Text, default="{}")
    roadmap_json = Column(Text, default="{}")
    internship_suggestions_json = Column(Text, default="[]")
    portfolio_suggestions_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    profile = relationship("StudentProfile", back_populates="analyses")

    @property
    def matched_skills(self):
        try:
            return json.loads(self.matched_skills_json) if self.matched_skills_json else []
        except Exception:
            return []

    @matched_skills.setter
    def matched_skills(self, value):
        self.matched_skills_json = json.dumps(value or [])

    @property
    def missing_skills(self):
        try:
            return json.loads(self.missing_skills_json) if self.missing_skills_json else []
        except Exception:
            return []

    @missing_skills.setter
    def missing_skills(self, value):
        self.missing_skills_json = json.dumps(value or [])

    @property
    def priority_skills(self):
        try:
            return json.loads(self.priority_skills_json) if self.priority_skills_json else []
        except Exception:
            return []

    @priority_skills.setter
    def priority_skills(self, value):
        self.priority_skills_json = json.dumps(value or [])

    @property
    def career_matches(self):
        try:
            return json.loads(self.career_matches_json) if self.career_matches_json else []
        except Exception:
            return []

    @career_matches.setter
    def career_matches(self, value):
        self.career_matches_json = json.dumps(value or [])

    @property
    def gap_analysis(self):
        try:
            return json.loads(self.gap_analysis_json) if self.gap_analysis_json else {}
        except Exception:
            return {}

    @gap_analysis.setter
    def gap_analysis(self, value):
        self.gap_analysis_json = json.dumps(value or {})

    @property
    def roadmap(self):
        try:
            return json.loads(self.roadmap_json) if self.roadmap_json else {}
        except Exception:
            return {}

    @roadmap.setter
    def roadmap(self, value):
        self.roadmap_json = json.dumps(value or {})

    @property
    def internship_suggestions(self):
        try:
            return json.loads(self.internship_suggestions_json) if self.internship_suggestions_json else []
        except Exception:
            return []

    @internship_suggestions.setter
    def internship_suggestions(self, value):
        self.internship_suggestions_json = json.dumps(value or [])

    @property
    def portfolio_suggestions(self):
        try:
            return json.loads(self.portfolio_suggestions_json) if self.portfolio_suggestions_json else []
        except Exception:
            return []

    @portfolio_suggestions.setter
    def portfolio_suggestions(self, value):
        self.portfolio_suggestions_json = json.dumps(value or [])
