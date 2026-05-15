@echo off
cd /d "%~dp0tupas-client"
echo Starting frontend at http://127.0.0.1:5173
echo Keep this window open while using the app.
npm.cmd run dev -- --host 127.0.0.1
pause
