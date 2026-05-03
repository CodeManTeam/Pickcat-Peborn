$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$port = if ($env:PORT) { [int]$env:PORT } else { 4173 }
$env:HOST = if ($env:HOST) { $env:HOST } else { "127.0.0.1" }
$env:PORT = "$port"

Write-Host "Pickcat Reborn will run at http://$env:HOST`:$env:PORT"
Write-Host "Keep this window open while previewing."
node serve.mjs
