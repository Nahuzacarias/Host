# Regenera docs/index.json con los archivos de esta carpeta.
# Doble clic o: powershell -ExecutionPolicy Bypass -File actualizar-docs.ps1

$ErrorActionPreference = "Stop"
$docsDir = Join-Path $PSScriptRoot "docs"

if (-not (Test-Path $docsDir)) {
    New-Item -ItemType Directory -Path $docsDir | Out-Null
}

$allowed = @(".pdf", ".docx", ".txt", ".md", ".xlsx", ".csv", ".html")
$skip = @("index.json", "LEEME.txt")

$files = Get-ChildItem -Path $docsDir -File |
    Where-Object { $allowed -contains $_.Extension.ToLower() -and $skip -notcontains $_.Name } |
    Sort-Object Name |
    ForEach-Object { $_.Name }

$payload = @{ files = @($files) } | ConvertTo-Json -Compress
[System.IO.File]::WriteAllText((Join-Path $docsDir "index.json"), $payload, [System.Text.UTF8Encoding]::new($false))

Write-Host ""
Write-Host "Documentos que va a leer el bot:"
if ($files.Count -eq 0) {
    Write-Host "  (todavia no hay archivos. copia PDF, Word o texto en prueba\docs)"
} else {
    $files | ForEach-Object { Write-Host "  - $_" }
}
Write-Host ""
Write-Host "Listo. Subi los cambios a Netlify o recarga /prueba/Prueba.html"
Write-Host ""
Read-Host "Enter para cerrar"
