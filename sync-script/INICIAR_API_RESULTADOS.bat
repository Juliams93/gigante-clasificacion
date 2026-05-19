@echo off
title API Resultados - La Gigante (sin Supabase)
color 0A

echo.
echo  ================================================
echo   API RESULTADOS (MYSQL/CSV) - SIN SUPABASE
echo  ================================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js no esta instalado.
    echo  Descarga Node LTS en https://nodejs.org
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0"

if not exist "node_modules" (
    echo  Instalando dependencias...
    npm install
    echo.
)

if not exist ".env" (
    echo  [ERROR] Falta archivo .env
    echo  Copia .env.example a .env y rellena credenciales.
    echo.
    pause
    exit /b 1
)

echo  Iniciando API de resultados...
echo  URL esperada: http://localhost:8787/api/runners
echo.

npm run api

echo.
echo  API detenida.
pause