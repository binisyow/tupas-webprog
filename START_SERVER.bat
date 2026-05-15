@echo off
cd /d "%~dp0tupas-server"
echo Starting backend at http://localhost:8000
echo Keep this window open while using the app.
npm.cmd run dev
pause
