# Regenera docs/knowledge-base.json y docs/index.json con los archivos de esta carpeta.
# Doble clic o: powershell -ExecutionPolicy Bypass -File actualizar-docs.ps1

$ErrorActionPreference = "Continue"
$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$docsDir = Join-Path $PSScriptRoot "docs"
$scriptPy = Join-Path $PSScriptRoot "build-kb.py"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   ACTUALIZADOR DE BASE DE CONOCIMIENTO iPPA  " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Ejecutando compilador de base de datos..." -ForegroundColor Yellow
    python "$scriptPy"
} else {
    Write-Host "Compilando lista de archivos..." -ForegroundColor Yellow
    $allowed = @(".pdf", ".docx", ".txt", ".md", ".xlsx", ".csv", ".html")
    $skip = @("index.json", "LEEME.txt")

    $files = Get-ChildItem -Path $docsDir -File |
        Where-Object { $allowed -contains $_.Extension.ToLower() -and $skip -notcontains $_.Name } |
        Sort-Object Name |
        ForEach-Object { $_.Name }

    $payload = @{ files = @($files) } | ConvertTo-Json -Compress
    [System.IO.File]::WriteAllText((Join-Path $docsDir "index.json"), $payload, [System.Text.UTF8Encoding]::new($false))
}

Write-Host ""
Write-Host "Listo. Subí los cambios a Netlify o recargá /prueba/Prueba.html" -ForegroundColor Green
Write-Host ""
Read-Host "Presiona Enter para cerrar"
