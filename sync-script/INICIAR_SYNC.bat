@echo off
title Sync Gigante de Piedra - MySQL a Supabase
color 0A

echo.
echo  ================================================
echo   SYNC GIGANTE DE PIEDRA - MySQL ^> Supabase
echo  ================================================
echo.

:: Verificar Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js no esta instalado.
    echo.
    echo  Descargalo en: https://nodejs.org  (version LTS)
    echo  Instala y vuelve a ejecutar este archivo.
    echo.
    pause
    exit /b 1
)

echo  Node.js encontrado: OK
echo.

:: Ir a la carpeta del script
cd /d "%~dp0"

:: Instalar dependencias si no existen
if not exist "node_modules" (
    echo  Instalando dependencias (solo la primera vez)...
    npm install
    echo.
)

:: Verificar .env
if not exist ".env" (
    echo  [ERROR] No se encuentra el archivo .env
    echo  Copia .env.example a .env y rellena las credenciales MySQL.
    echo.
    pause
    exit /b 1
)

echo  Iniciando sincronizacion...
echo  (Cierra esta ventana para detener el sync)
echo.

node sync-mysql-supabase.js

echo.
echo  El script se ha detenido.
pause
