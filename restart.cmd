@echo off
cd /d "%~dp0"
call stop.cmd
timeout /t 2 /nobreak >nul
call start.cmd
