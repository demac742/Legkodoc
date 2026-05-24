@echo off
cd /d "%~dp0"
for /f "tokens=5" %%p in ('netstat -ano ^| findstr :3021 ^| findstr LISTENING') do (
  taskkill /PID %%p /F >nul 2>nul
)
echo Local server on port 3021 stopped.
