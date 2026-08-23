@echo off
chcp 65001 > nul
title Actualizador de Base de Conocimiento iPPA
echo ===============================================
echo    ACTUALIZADOR DE BASE DE DATOS iPPA
echo ===============================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0actualizar-docs.ps1"

pause
