# SkillBridge AI — Quick Start Guide ⚡
**Smart India Hackathon 2026**

Follow these quick instructions to run the complete working SkillBridge AI application locally.

---

## 1. Start the Backend Server (FastAPI)

Open your terminal in the project root directory:

```bash
cd backend
pip install -r requirements.txt
python run.py
```

- **Backend API URL:** `http://127.0.0.1:8000`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`
- **API Health Check:** `http://127.0.0.1:8000/api/health`

---

## 2. Start the Frontend Development Server (React + Vite)

Open a **second** terminal in the project root directory:

```bash
cd frontend
npm install
npm run dev
```

- **Frontend Application URL:** `http://localhost:5173`

---

## 3. How to Test & Demo for Judges

1. Open **`http://localhost:5173`** in your browser.
2. Click **"⚡ Quick Demo Profiles"** in the navigation bar to test live backend calculations:
   - **Rohan Sharma** (Target: Data Analyst)
   - **Priya Patel** (Target: Machine Learning Engineer)
   - **Aman Verma** (Target: Full Stack Web Developer)
3. Explore the **Readiness Gauge**, **Skill Gap Breakdown Matrix**, **Career Match Cards**, and **Learning Roadmap**.
4. Test dynamic career target switching by selecting **"Switch Target Role"** or clicking **"Set as Active Target"** on any career card.
5. Upload custom resumes (`.pdf`, `.docx`, `.txt`) via the **"Resume Analyzer"** page.
