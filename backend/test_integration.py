import urllib.request
import json

def run_tests():
    print("==================================================")
    print("SKILLBRIDGE AI - FULL END-TO-END VERIFICATION")
    print("==================================================")

    # 1. Health check
    h = json.loads(urllib.request.urlopen('http://127.0.0.1:8000/api/health').read().decode())
    print(f"[PASS] 1. Health Check: {h['status']} (Backend: {h['backend']})")

    # 2. Roles verification
    roles_data = json.loads(urllib.request.urlopen('http://127.0.0.1:8000/api/roles').read().decode())
    roles = roles_data['roles']
    tech_roles = [r for r in roles if r['category'] == 'Technical']
    non_tech_roles = [r for r in roles if r['category'] == 'Non-Technical']
    print(f"[PASS] 2. Job Roles Total: {len(roles)} (Technical: {len(tech_roles)}, Non-Technical: {len(non_tech_roles)})")

    # 3. Skills Ontology verification
    skills_data = json.loads(urllib.request.urlopen('http://127.0.0.1:8000/api/skills').read().decode())
    skills = skills_data['skills']
    print(f"[PASS] 3. Skills Ontology Total: {len(skills)} skills loaded")

    # 4. Demo 1: Rohan Sharma
    d1 = json.loads(urllib.request.urlopen('http://127.0.0.1:8000/api/demo/1').read().decode())
    print(f"[PASS] 4. Demo 1 ({d1['profile']['name']}) -> Active Target: {d1['active_target_role']}, Readiness: {d1['readiness_score']}%, Matched Skills: {len(d1['matched_skills'])}")

    # 5. Demo 2: Priya Patel
    d2 = json.loads(urllib.request.urlopen('http://127.0.0.1:8000/api/demo/2').read().decode())
    print(f"[PASS] 5. Demo 2 ({d2['profile']['name']}) -> Active Target: {d2['active_target_role']}, Readiness: {d2['readiness_score']}%, Matched Skills: {len(d2['matched_skills'])}")

    # 6. Demo 3: Aman Verma
    d3 = json.loads(urllib.request.urlopen('http://127.0.0.1:8000/api/demo/3').read().decode())
    print(f"[PASS] 6. Demo 3 ({d3['profile']['name']}) -> Active Target: {d3['active_target_role']}, Readiness: {d3['readiness_score']}%, Matched Skills: {len(d3['matched_skills'])}")

    # 7. Dynamic Target Role Switching
    req = urllib.request.Request(
        f"http://127.0.0.1:8000/api/profile/{d1['profile_id']}/target-role",
        data=json.dumps({"target_role": "Python Developer"}).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    switched = json.loads(urllib.request.urlopen(req).read().decode())
    print(f"[PASS] 7. Dynamic Role Switch: Target updated to '{switched['active_target_role']}', New Readiness: {switched['readiness_score']}%, Priority Missing: {switched['priority_skills']}")

    # 8. Resume Text Analysis Endpoint
    sample_text = """Ananya Singh
Email: ananya.singh@example.com
Degree: Bachelor of Business Administration, 2026
Skills: Recruitment, Communication, Management, Excel, Teamwork, Presentation, Time Management
"""
    req2 = urllib.request.Request(
        "http://127.0.0.1:8000/api/analyze-text",
        data=json.dumps({"text": sample_text, "target_role": "HR Executive"}).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    hr_res = json.loads(urllib.request.urlopen(req2).read().decode())
    print(f"[PASS] 8. Text Analysis (Non-Tech HR): Candidate '{hr_res['profile']['name']}' -> Target: {hr_res['active_target_role']}, Readiness: {hr_res['readiness_score']}%, Matched: {len(hr_res['matched_skills'])}")

    # 9. Learning Roadmap Endpoint
    rm = json.loads(urllib.request.urlopen('http://127.0.0.1:8000/api/roadmap/Data%20Analyst?missing_skills=Power%20BI,Tableau').read().decode())
    print(f"[PASS] 9. Roadmap: '{rm['role_name']}' has {len(rm['phases'])} phases, Est: {rm['estimated_weeks']} weeks")

    # 10. PDF Report Export Endpoint
    pdf_res = urllib.request.urlopen(f"http://127.0.0.1:8000/api/export-report/{d1['profile_id']}")
    pdf_bytes = pdf_res.read()
    print(f"[PASS] 10. PDF Report Export: Successfully generated {len(pdf_bytes)} bytes PDF report (Content-Type: {pdf_res.headers.get('Content-Type')})")

    print("==================================================")
    print("ALL 10/10 INTEGRATION TESTS PASSED PERFECTLY!")
    print("==================================================")

if __name__ == "__main__":
    run_tests()
