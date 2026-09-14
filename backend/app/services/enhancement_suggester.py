from typing import List, Dict, Any


def get_internship_suggestions(target_role_name: str, missing_skills: List[str]) -> List[Dict[str, Any]]:
    role_lower = target_role_name.lower()

    if "sales" in role_lower or "business development" in role_lower or "bde" in role_lower or "account executive" in role_lower:
        return [
            {
                "title": "Inside Sales & Business Development Intern",
                "category": "Sales & Revenue",
                "domain": "B2B SaaS / Enterprise Tech",
                "match_relevance": "Direct Alignment",
                "description": "Engage in outbound prospective outreach, qualify inbound leads, conduct cold calling campaigns, and schedule client product demos.",
                "recommended_skills": ["Sales", "Communication", "Negotiation", "Customer Handling"]
            },
            {
                "title": "Corporate Partnerships & Account Management Intern",
                "category": "Sales & Partnerships",
                "domain": "FinTech / High-Growth Startups",
                "match_relevance": "Strong Match",
                "description": "Support senior account executives in client presentations, draft partnership pitch decks, and manage CRM deal pipelines.",
                "recommended_skills": ["Negotiation", "Presentation", "Excel", "Management"]
            },
            {
                "title": "Lead Generation & Market Prospecting Intern",
                "category": "Sales Operations",
                "domain": "Digital Agencies",
                "match_relevance": "Practical Growth",
                "description": "Source high-intent business leads via LinkedIn Sales Navigator and draft multi-touch email sequences.",
                "recommended_skills": ["Sales", "Communication", "Time Management"]
            }
        ]

    elif "customer support" in role_lower or "customer handling" in role_lower:
        return [
            {
                "title": "Customer Experience (CX) & Support Intern",
                "category": "Customer Relations",
                "domain": "E-Commerce / Consumer Tech",
                "match_relevance": "Direct Alignment",
                "description": "Handle real-time customer escalations via live chat and email helpdesk tickets, ensuring high CSAT ratings and empathetic resolution.",
                "recommended_skills": ["Customer Handling", "Communication", "Problem Solving"]
            },
            {
                "title": "Client Success & Operations Support Intern",
                "category": "Customer Success",
                "domain": "SaaS / Subscription Services",
                "match_relevance": "Strong Match",
                "description": "Assist in user onboarding journeys, resolve account query bottlenecks, and document standard operating procedures.",
                "recommended_skills": ["Customer Handling", "Teamwork", "Excel", "Adaptability"]
            }
        ]

    elif "hr" in role_lower or "recruiter" in role_lower or "talent" in role_lower:
        return [
            {
                "title": "Talent Acquisition & Sourcing Intern",
                "category": "Human Resources",
                "domain": "Tech & Corporate Staffing",
                "match_relevance": "Direct Alignment",
                "description": "Source candidates via boolean search, screen resumes against job descriptions, coordinate panel interviews, and manage ATS pipelines.",
                "recommended_skills": ["Recruitment", "Communication", "Negotiation", "Time Management"]
            },
            {
                "title": "People Operations & HR Generalist Intern",
                "category": "Human Resources",
                "domain": "Global Enterprise / IT Services",
                "match_relevance": "Strong Match",
                "description": "Coordinate employee onboarding programs, maintain HR compliance records in Excel, and organize employee engagement workshops.",
                "recommended_skills": ["Recruitment", "Management", "Excel", "Teamwork"]
            },
            {
                "title": "Campus Hiring & Employer Branding Intern",
                "category": "Talent Strategy",
                "domain": "EdTech / Consulting",
                "match_relevance": "Practical Growth",
                "description": "Liaise with college placement cells, administer preliminary candidate evaluations, and draft hiring reports.",
                "recommended_skills": ["Communication", "Presentation", "Leadership"]
            }
        ]

    elif "digital marketing" in role_lower or "marketing" in role_lower:
        return [
            {
                "title": "Digital Marketing & Growth Intern",
                "category": "Digital Marketing",
                "domain": "Direct-to-Consumer / E-Commerce",
                "match_relevance": "Direct Alignment",
                "description": "Run organic SEO audits, manage social media campaigns, set up Meta and Google ad experiments, and monitor conversion metrics.",
                "recommended_skills": ["Digital Marketing", "Marketing", "Content Writing", "Excel"]
            },
            {
                "title": "Brand Strategy & Campaign Marketing Intern",
                "category": "Brand Management",
                "domain": "Creative Media / FMCG",
                "match_relevance": "Strong Match",
                "description": "Conduct market research surveys, design promotional campaign collateral, and prepare executive ROI presentation decks.",
                "recommended_skills": ["Marketing", "Communication", "Presentation", "Data Visualization"]
            }
        ]

    elif "content" in role_lower or "writer" in role_lower:
        return [
            {
                "title": "Content Strategy & Copywriting Intern",
                "category": "Content & Media",
                "domain": "Publishing / B2B SaaS",
                "match_relevance": "Direct Alignment",
                "description": "Author search-engine optimized blog posts, draft high-converting landing page copy, and craft engaging social media posts.",
                "recommended_skills": ["Content Writing", "Digital Marketing", "Communication"]
            },
            {
                "title": "Technical Content & Research Writing Intern",
                "category": "Technical Communications",
                "domain": "EdTech & Technology Portals",
                "match_relevance": "Strong Match",
                "description": "Research industry frameworks, interview subject matter experts, and produce structured guides and documentation.",
                "recommended_skills": ["Content Writing", "Problem Solving", "Marketing"]
            }
        ]

    elif "operations" in role_lower or "mis" in role_lower:
        return [
            {
                "title": "Operations Excellence & Process Optimization Intern",
                "category": "Operations Management",
                "domain": "Logistics & Supply Chain",
                "match_relevance": "Direct Alignment",
                "description": "Map workflow processes, track turnaround time metrics, eliminate operational bottlenecks, and update vendor logs.",
                "recommended_skills": ["Management", "Excel", "Problem Solving", "Time Management"]
            },
            {
                "title": "Management Information Systems (MIS) Intern",
                "category": "MIS & Reporting",
                "domain": "Banking / Retail Operations",
                "match_relevance": "Strong Match",
                "description": "Automate daily spreadsheet reconciliations, run SQL queries for operational data, and create executive KPI summary sheets.",
                "recommended_skills": ["Excel", "SQL", "Data Visualization", "Problem Solving"]
            }
        ]

    elif "project coordinator" in role_lower:
        return [
            {
                "title": "Agile Project Coordination Intern",
                "category": "Project Management",
                "domain": "IT Consulting / Product Engineering",
                "match_relevance": "Direct Alignment",
                "description": "Facilitate sprint ceremonies, maintain Jira sprint boards, track milestone dependencies, and compile weekly progress reports.",
                "recommended_skills": ["Management", "Communication", "Time Management", "Teamwork"]
            },
            {
                "title": "Program Management & Operations Intern",
                "category": "Program Strategy",
                "domain": "Enterprise Tech",
                "match_relevance": "Strong Match",
                "description": "Coordinate cross-functional deliverables across engineering, marketing, and business stakeholders.",
                "recommended_skills": ["Management", "Leadership", "Excel", "Presentation"]
            }
        ]

    elif "business analyst" in role_lower or "data analyst" in role_lower:
        return [
            {
                "title": "Junior Business Analyst Intern",
                "category": "Business Strategy",
                "domain": "Management Consulting / FinTech",
                "match_relevance": "Direct Alignment",
                "description": "Elicit business requirements from stakeholders, draft functional specs (BRD/FRD), and model financial data in Excel.",
                "recommended_skills": ["Excel", "SQL", "Problem Solving", "Communication"]
            },
            {
                "title": "Business Intelligence (BI) Analyst Intern",
                "category": "Business Intelligence",
                "domain": "E-Commerce / SaaS",
                "match_relevance": "Strong Match",
                "description": "Build automated Power BI dashboards, analyze customer cohort metrics, and present data-backed recommendations.",
                "recommended_skills": ["Power BI", "SQL", "Data Visualization", "Presentation"]
            }
        ]

    elif "machine learning" in role_lower or "data scientist" in role_lower:
        return [
            {
                "title": "Machine Learning Research Intern",
                "category": "Artificial Intelligence",
                "domain": "AI Research / DeepTech",
                "match_relevance": "Direct Alignment",
                "description": "Implement state-of-the-art model architectures, conduct hyperparameter tuning, and evaluate loss metrics.",
                "recommended_skills": ["Python", "PyTorch", "TensorFlow", "Scikit-Learn"]
            },
            {
                "title": "Data Science & Predictive Analytics Intern",
                "category": "Data Science",
                "domain": "Healthcare / FinTech",
                "match_relevance": "Strong Match",
                "description": "Build classification models, conduct exploratory statistical analysis, and engineer features on tabular datasets.",
                "recommended_skills": ["Python", "Pandas", "NumPy", "Statistics", "Machine Learning"]
            }
        ]

    elif "web" in role_lower or "full stack" in role_lower or "developer" in role_lower:
        return [
            {
                "title": "Frontend Developer Intern",
                "category": "Web Engineering",
                "domain": "SaaS / Consumer Apps",
                "match_relevance": "Direct Alignment",
                "description": "Develop responsive modern user interfaces using React, Tailwind CSS, and integrate RESTful APIs.",
                "recommended_skills": ["React", "JavaScript", "HTML5", "CSS3", "Git"]
            },
            {
                "title": "Full Stack Engineering Intern",
                "category": "Software Engineering",
                "domain": "Product Startup",
                "match_relevance": "Strong Match",
                "description": "Collaborate on end-to-end features spanning React frontend components, Node.js/Python backends, and databases.",
                "recommended_skills": ["JavaScript", "React", "Node.js", "SQL", "GitHub"]
            }
        ]

    else:
        return [
            {
                "title": f"{target_role_name} Associate Intern",
                "category": "Industry Internship",
                "domain": "Corporate Services & Tech",
                "match_relevance": "Direct Alignment",
                "description": f"Gain hands-on industry experience supporting core initiatives and operations in {target_role_name}.",
                "recommended_skills": ["Communication", "Problem Solving", "Time Management", "Excel"]
            },
            {
                "title": "Operations & Project Support Intern",
                "category": "Operations",
                "domain": "Business Services",
                "match_relevance": "Strong Match",
                "description": "Coordinate project deliverables, track milestone progress, and liaise with cross-functional stakeholders.",
                "recommended_skills": ["Management", "Excel", "Teamwork"]
            }
        ]


def get_portfolio_suggestions(profile_data: Dict[str, Any], target_role_name: str, missing_skills: List[str]) -> List[Dict[str, Any]]:
    role_lower = target_role_name.lower()
    is_non_tech = any(k in role_lower for k in [
        "sales", "business development", "bde", "customer support", "hr", "recruiter", 
        "marketing", "content", "operations", "mis", "account executive", "project coordinator"
    ])

    suggestions = []

    # 1. Projects / Case Studies
    if is_non_tech:
        if "sales" in role_lower or "business development" in role_lower or "account" in role_lower:
            suggestions.append({
                "category": "Sales Playbook & Pitch Deck",
                "title": f"Create an End-to-End Sales Prospecting Playbook for {target_role_name}",
                "priority": "High",
                "impact": "+40% Recruiter Response Rate",
                "actionable_steps": [
                    "Draft cold outreach email sequences, discovery call scripts, and objection handling matrices.",
                    "Build a 10-slide enterprise product pitch deck addressing specific client pain points and ROI.",
                    "Demonstrate CRM pipeline stages (BANT qualification, deal closure) in Google Sheets or Notion."
                ]
            })
        elif "hr" in role_lower or "recruiter" in role_lower:
            suggestions.append({
                "category": "Talent Acquisition Portfolio",
                "title": f"Build a Comprehensive Hiring & Sourcing Playbook for {target_role_name}",
                "priority": "High",
                "impact": "+45% Recruiter Shortlisting Rate",
                "actionable_steps": [
                    "Construct 5 niche job descriptions with targeted boolean search strings for LinkedIn and portals.",
                    "Design structured competency-based interview evaluation rubrics and candidate scorecard templates.",
                    "Build an employee onboarding checklist and HR policy documentation repository."
                ]
            })
        elif "content" in role_lower or "marketing" in role_lower:
            suggestions.append({
                "category": "Live Content Portfolio",
                "title": f"Publish 3 Live Thought-Leadership Articles & Campaign Decks",
                "priority": "High",
                "impact": "+50% Portfolio Engagement",
                "actionable_steps": [
                    "Write and publish 3 high-quality SEO-optimized articles on Medium, Substack, or LinkedIn.",
                    "Create a complete 360-degree digital marketing campaign blueprint with audience segmentation.",
                    "Include quantifiable results (e.g. 'Achieved 4,500 organic impressions, 6.2% CTR')."
                ]
            })
        elif "customer support" in role_lower:
            suggestions.append({
                "category": "Customer Support Knowledge Base",
                "title": f"Author a Customer Support SOP & Conflict Resolution Guide",
                "priority": "High",
                "impact": "+35% Interview Selection Rate",
                "actionable_steps": [
                    "Draft 10 standard operating response templates handling complex customer escalations with empathy.",
                    "Build a searchable customer FAQ knowledge base in Notion or Google Docs.",
                    "Demonstrate ticket categorization and SLA tracking metrics in an Excel model."
                ]
            })
        elif "operations" in role_lower or "mis" in role_lower:
            suggestions.append({
                "category": "Operations & Spreadsheet Model",
                "title": f"Design an Automated Executive MIS & Process Optimization Model",
                "priority": "High",
                "impact": "+40% ATS Score Improvement",
                "actionable_steps": [
                    "Build an advanced Excel model with dynamic formulas (XLOOKUP, Pivot Tables) and automated charts.",
                    "Create a BPMN business process flowchart identifying and resolving 3 operational bottlenecks.",
                    "Include automated reconciliation logic and error-flagging rules."
                ]
            })
        elif "project coordinator" in role_lower:
            suggestions.append({
                "category": "Project Management Artifacts",
                "title": f"Build a Complete Agile Project Charter & Jira Sprint Board",
                "priority": "High",
                "impact": "+35% Interview Selection Rate",
                "actionable_steps": [
                    "Set up a simulated Agile Scrum project board with user stories, acceptance criteria, and epics.",
                    "Draft a Work Breakdown Structure (WBS), RACI stakeholder matrix, and Risk Register.",
                    "Create sprint velocity charts and executive milestone progress slide decks."
                ]
            })
        else:
            suggestions.append({
                "category": "Business Case Study",
                "title": f"Develop a Comprehensive Strategic Analysis for {target_role_name}",
                "priority": "High",
                "impact": "+35% Recruiter Response Rate",
                "actionable_steps": [
                    "Conduct in-depth market research on an active business vertical and present structured findings.",
                    "Model financial projections and key operational metrics in a professional spreadsheet.",
                    "Deliver an executive summary deck defending data-driven recommendations."
                ]
            })
    else:
        # Technical roles
        target_focus = missing_skills[:2] if missing_skills else ["Core Frameworks"]
        suggestions.append({
            "category": "Projects & Evidence",
            "title": f"Build a Capstone Project targeting {', '.join(target_focus)}",
            "priority": "High",
            "impact": "+35% Recruiter Response Rate",
            "actionable_steps": [
                f"Develop a complete end-to-end project applying {', '.join(target_focus)} for {target_role_name}.",
                "Deploy the live demo on platforms like Vercel, Streamlit Cloud, or Render.",
                "Quantify measurable outcomes in the README (e.g., 'Reduced query latency by 42%', 'Achieved 91.4% F1-score')."
            ]
        })

    # 2. LinkedIn & Personal Branding
    suggestions.append({
        "category": "LinkedIn & Branding",
        "title": f"Optimize LinkedIn Headline & Summary for '{target_role_name}'",
        "priority": "High",
        "impact": "+40% Recruiter Search Visibility",
        "actionable_steps": [
            f"Set headline to: 'Aspiring {target_role_name} | {', '.join(profile_data.get('extracted_skills', [])[:4]) or 'Ready for Opportunities'}'.",
            "Write a 3-paragraph summary highlighting key projects, quantifiable achievements, and target industry impact.",
            "Share weekly industry learnings, case studies, or project breakdowns with relevant hashtags."
        ]
    })

    # 3. Certifications & Skill Validation
    suggestions.append({
        "category": "Certifications & Credibility",
        "title": f"Acquire Industry-Recognized Credentials for {target_role_name}",
        "priority": "Medium",
        "impact": "+25% Shortlisting Probability",
        "actionable_steps": [
            f"Complete verified certifications targeting priority skills: {', '.join(missing_skills[:3]) if missing_skills else 'Advanced Industry Topics'}.",
            "Add verified credential badges directly to LinkedIn 'Licenses & Certifications' and resume header."
        ]
    })

    # 4. Resume & Experience Presentation
    suggestions.append({
        "category": "Resume Formatting",
        "title": "Use STAR / XYZ Method for Experience Bullet Points",
        "priority": "High",
        "impact": "+30% ATS Score Improvement",
        "actionable_steps": [
            "Structure every bullet as: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
            f"Tailor skill keywords directly to match {target_role_name} industry job descriptions.",
            "Highlight measurable impact (e.g. 'Increased lead conversion by 18%', 'Managed team of 6')."
        ]
    })

    return suggestions
