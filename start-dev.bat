@echo off
echo Starting CareerPath Dev Server...
echo.
set "PATH=C:\Windows\system32;C:\Windows;C:\Program Files\nodejs"
node node_modules\vite\bin\vite.js --host --port 5173
pause
