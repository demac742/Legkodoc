@echo off
cd /d "%~dp0"
call stop.cmd >nul 2>nul
start "Legkodok Dev Server" "%~dp0dev-server.cmd"
timeout /t 6 /nobreak >nul
start "" http://localhost:3021
