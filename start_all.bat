@echo off
echo ========================================================
echo Starting SkillBridge AI Full Stack (Backend + Frontend)
echo ========================================================
start "SkillBridge Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && python run.py"
timeout /t 2 /nobreak >nul
start "SkillBridge Frontend (Vite)" cmd /k "cd /d "%~dp0frontend" && npm run dev"
echo.
echo Both servers have been launched!
echo - Backend: http://127.0.0.1:8000 (Swagger: http://127.0.0.1:8000/docs)
echo - Frontend: http://localhost:5173
echo.
pause
