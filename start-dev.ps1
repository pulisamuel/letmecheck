# CareerPath Dev Server Launcher
# Run this script to start the development server

$env:PATH = "C:\Windows\system32;C:\Windows;C:\Program Files\nodejs;$env:PATH"
Write-Host "Starting CareerPath Dev Server..." -ForegroundColor Cyan
Write-Host "Open http://localhost:5173 in your browser" -ForegroundColor Green
Write-Host ""

Set-Location $PSScriptRoot
node node_modules/vite/bin/vite.js --host --port 5173
