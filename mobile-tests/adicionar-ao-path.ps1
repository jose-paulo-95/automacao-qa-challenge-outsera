# Script para adicionar Android SDK ao PATH do Windows
# Execute este script como Administrador

Write-Host "🔧 Adicionando Android SDK ao PATH..." -ForegroundColor Cyan

# Caminho padrão do Android SDK
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"

# Verificar se o SDK existe
if (-not (Test-Path "$sdkPath\platform-tools\adb.exe")) {
    Write-Host "❌ Android SDK não encontrado em: $sdkPath" -ForegroundColor Red
    Write-Host "📝 Por favor, verifique o caminho do Android SDK no Android Studio:" -ForegroundColor Yellow
    Write-Host "   File → Settings → Appearance & Behavior → System Settings → Android SDK" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ou informe o caminho manualmente:" -ForegroundColor Yellow
    $sdkPath = Read-Host "Digite o caminho do Android SDK"
    
    if (-not (Test-Path "$sdkPath\platform-tools\adb.exe")) {
        Write-Host "❌ SDK ainda não encontrado. Encerrando..." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Android SDK encontrado em: $sdkPath" -ForegroundColor Green

# Caminhos a adicionar
$platformTools = "$sdkPath\platform-tools"
$tools = "$sdkPath\tools"
$emulator = "$sdkPath\emulator"

# Verificar se já está no PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$pathsToAdd = @()

if ($currentPath -notlike "*$platformTools*") {
    $pathsToAdd += $platformTools
    Write-Host "➕ Adicionando: $platformTools" -ForegroundColor Yellow
}

if ($currentPath -notlike "*$tools*") {
    $pathsToAdd += $tools
    Write-Host "➕ Adicionando: $tools" -ForegroundColor Yellow
}

if ($currentPath -notlike "*$emulator*") {
    $pathsToAdd += $emulator
    Write-Host "➕ Adicionando: $emulator" -ForegroundColor Yellow
}

if ($pathsToAdd.Count -eq 0) {
    Write-Host "✅ Os caminhos já estão no PATH!" -ForegroundColor Green
} else {
    # Adicionar ao PATH do usuário
    $newPath = $currentPath
    foreach ($path in $pathsToAdd) {
        $newPath += ";$path"
    }
    
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "✅ PATH atualizado!" -ForegroundColor Green
}

# Criar/Atualizar ANDROID_HOME
$currentAndroidHome = [Environment]::GetEnvironmentVariable("ANDROID_HOME", "User")
if ($currentAndroidHome -ne $sdkPath) {
    [Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkPath, "User")
    Write-Host "✅ ANDROID_HOME configurado: $sdkPath" -ForegroundColor Green
} else {
    Write-Host "✅ ANDROID_HOME já está configurado" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Configuração concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Feche e reabra o terminal/PowerShell para aplicar as mudanças." -ForegroundColor Yellow
Write-Host ""
Write-Host "Depois, teste com:" -ForegroundColor Cyan
Write-Host "  adb version" -ForegroundColor White
Write-Host "  adb devices" -ForegroundColor White
