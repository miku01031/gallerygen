@echo off
setlocal

cd /d "%~dp0"

echo Starting GalleryGen...

if not exist "node_modules" (
  echo node_modules not found, installing dependencies first...
  call npm.cmd install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

start "GalleryGen Dev Server" cmd /k "cd /d ""%~dp0"" && npm.cmd run dev"

timeout /t 3 /nobreak >nul
start "" http://localhost:3000

echo GalleryGen dev server is starting.
echo If localhost:3000 does not open, check the dev server window for the actual port.

endlocal
