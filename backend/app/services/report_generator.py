import os
import io
from typing import Dict, Any
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT


def generate_readiness_pdf(analysis_data: Dict[str, Any]) -> bytes:
    """
    Generates a high-quality, professional PDF Readiness Evaluation & Skill Gap Audit Report.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    header_title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Heading1'],
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        alignment=TA_LEFT,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#64748b'),
        alignment=TA_LEFT
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0284c7'),
        fontName='Helvetica-Bold',
        spaceBefore=10,
        spaceAfter=4
    )

    body_text = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155')
    )

    badge_text = ParagraphStyle(
        'BadgeText',
        parent=styles['Normal'],
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#0369a1'),
        fontName='Helvetica-Bold'
    )

    story = []

    profile = analysis_data.get("profile", {})
    candidate_name = profile.get("name", "Candidate")
    degree = profile.get("degree", "Student")
    institution = profile.get("institution", "University")
    email = profile.get("email", "")
    phone = profile.get("phone", "")
    target_role = analysis_data.get("active_target_role", "Target Role")
    readiness_score = analysis_data.get("readiness_score", 0.0)
    matched_skills = analysis_data.get("matched_skills", [])
    missing_skills = analysis_data.get("missing_skills", [])
    priority_skills = analysis_data.get("priority_skills", [])
    gap_analysis = analysis_data.get("gap_analysis", {})
    roadmap = analysis_data.get("roadmap", {})
    career_matches = analysis_data.get("career_matches", [])

    # Top Header Banner
    header_data = [
        [
            Paragraph("<b>SkillBridge AI</b> | Smart India Hackathon 2026", subtitle_style),
            Paragraph(f"Readiness Score: <b>{readiness_score}%</b>", ParagraphStyle('ScoreBadge', parent=subtitle_style, alignment=TA_RIGHT, textColor=colors.HexColor('#0284c7')))
        ],
        [
            Paragraph("<b>Candidate Career Readiness & Skill Gap Audit</b>", header_title_style),
            ""
        ]
    ]
    t_header = Table(header_data, colWidths=[380, 160])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('SPAN', (0,1), (1,1)),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_header)
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0284c7'), spaceBefore=6, spaceAfter=10))

    # Candidate Profile & Target Role Overview Box
    score_status = "Industry Ready" if readiness_score >= 75 else ("Moderate Alignment" if readiness_score >= 50 else "Foundational Gaps")
    profile_table_data = [
        [
            Paragraph(f"<b>Candidate:</b> {candidate_name}", body_text),
            Paragraph(f"<b>Target Role:</b> {target_role}", body_text),
        ],
        [
            Paragraph(f"<b>Education:</b> {degree} • {institution}", body_text),
            Paragraph(f"<b>Audit Result:</b> {score_status} ({readiness_score}%)", body_text),
        ],
        [
            Paragraph(f"<b>Contact:</b> {email} {f'| {phone}' if phone else ''}", body_text),
            Paragraph(f"<b>Evaluation Track:</b> Smart India Hackathon 2026", body_text),
        ]
    ]
    t_profile = Table(profile_table_data, colWidths=[270, 270])
    t_profile.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#f1f5f9')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_profile)
    story.append(Spacer(1, 10))

    # 1. Extracted Skills Inventory
    story.append(Paragraph("1. Extracted Skills Inventory", section_heading))
    skills_pills = ", ".join(profile.get("extracted_skills", [])) or "None identified"
    story.append(Paragraph(f"<b>Identified Competencies ({len(profile.get('extracted_skills', []))} total):</b> {skills_pills}", body_text))
    story.append(Spacer(1, 8))

    # 2. Skill Gap Analysis Matrix
    story.append(Paragraph("2. Skill Gap & Industry Requirement Matrix", section_heading))
    gap_rows = [
        [
            Paragraph("<b>Skill Name</b>", badge_text),
            Paragraph("<b>Requirement Type</b>", badge_text),
            Paragraph("<b>Status</b>", badge_text),
            Paragraph("<b>Priority / Action</b>", badge_text)
        ]
    ]

    details = gap_analysis.get("details", [])
    for d in details[:10]:  # Up to top 10 for clean page fit
        is_matched = d.get("status") == "Matched"
        status_color = "#16a34a" if is_matched else "#dc2626"
        status_text = f"<font color='{status_color}'><b>{d.get('status')}</b></font>"
        gap_rows.append([
            Paragraph(d.get("skill_name", ""), body_text),
            Paragraph(f"{d.get('skill_type', 'Core')} Requirement", body_text),
            Paragraph(status_text, body_text),
            Paragraph(d.get("recommendation", ""), body_text)
        ])

    t_gap = Table(gap_rows, colWidths=[110, 110, 80, 240])
    t_gap.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_gap)
    story.append(Spacer(1, 10))

    # 3. AI Career Fit Rankings
    story.append(Paragraph("3. AI Career Fit Recommendations", section_heading))
    career_rows = [
        [
            Paragraph("<b>Role Name</b>", badge_text),
            Paragraph("<b>Department / Track</b>", badge_text),
            Paragraph("<b>Match %</b>", badge_text),
            Paragraph("<b>Skills Covered</b>", badge_text)
        ]
    ]
    for c in career_matches[:4]:
        match_pct = c.get("match_percentage", 0)
        career_rows.append([
            Paragraph(f"<b>{c.get('role_name', '')}</b>", body_text),
            Paragraph(c.get("category", "Technical"), body_text),
            Paragraph(f"<b>{match_pct}%</b>", body_text),
            Paragraph(f"{len(c.get('matched_skills', []))} / {c.get('total_required_skills', 0)} skills covered", body_text)
        ])

    t_career = Table(career_rows, colWidths=[160, 130, 80, 170])
    t_career.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_career)
    story.append(Spacer(1, 10))

    # 4. Personalized Learning Roadmap Milestones
    story.append(Paragraph(f"4. Personalized Learning Roadmap ({target_role})", section_heading))
    phases = roadmap.get("phases", [])
    for p in phases:
        p_title = f"Phase {p.get('phase', 1)}: {p.get('title', '')} [{p.get('priority', 'Medium')} Priority]"
        story.append(Paragraph(f"<b>{p_title}</b>", ParagraphStyle('PTitle', parent=body_text, fontName='Helvetica-Bold', textColor=colors.HexColor('#0f172a'))))
        
        target_s = ", ".join(p.get("target_skills", []))
        topics_s = "; ".join(p.get("topics", []))
        proj_s = p.get("project", "")

        story.append(Paragraph(f"• <b>Target Skills:</b> {target_s}", body_text))
        story.append(Paragraph(f"• <b>Curriculum Topics:</b> {topics_s}", body_text))
        if proj_s:
            story.append(Paragraph(f"• <b>Capstone Project:</b> {proj_s}", body_text))
        story.append(Spacer(1, 4))

    # Footer note
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=6, spaceAfter=6))
    story.append(Paragraph("<i>SkillBridge AI • Certified Report for Smart India Hackathon 2026 • AI-Powered Student-Industry Alignment Engine</i>", ParagraphStyle('Foot', parent=subtitle_style, alignment=TA_CENTER, fontSize=8)))

    doc.build(story)
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes
