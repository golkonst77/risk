# Git hook: автоматическое обновление версии перед каждым коммитом

$VERSION_FILE = "public/version.json"
$PACKAGE_FILE = "package.json"

# Проверяем, есть ли изменения (не считая самого version.json и package.json)
$changedFiles = git diff --cached --name-only
$otherChanges = $changedFiles | Where-Object { $_ -ne $VERSION_FILE -and $_ -ne $PACKAGE_FILE }

if ($otherChanges) {
    Write-Host "📦 Автоматическое обновление версии..." -ForegroundColor Cyan
    
    # Читаем текущую версию
    $versionContent = Get-Content $VERSION_FILE -Raw | ConvertFrom-Json
    $currentVersion = $versionContent.version
    $currentBuild = [int]$versionContent.build
    
    # Увеличиваем patch версию
    $versionParts = $currentVersion -split '\.'
    $major = [int]$versionParts[0]
    $minor = [int]$versionParts[1]
    $patch = [int]$versionParts[2]
    
    $newPatch = $patch + 1
    $newVersion = "$major.$minor.$newPatch"
    $newBuild = $currentBuild + 1
    
    # Получаем текущую дату
    $currentDate = Get-Date -Format "yyyy-MM-dd"
    
    # Обновляем version.json
    $newVersionContent = @{
        version = $newVersion
        build = "$newBuild"
        date = $currentDate
        description = "Автоматическое обновление версии"
    }
    $newVersionContent | ConvertTo-Json | Set-Content $VERSION_FILE -Encoding UTF8
    
    # Обновляем package.json
    $packageContent = Get-Content $PACKAGE_FILE -Raw | ConvertFrom-Json
    $packageContent.version = $newVersion
    $packageContent | ConvertTo-Json -Depth 100 | Set-Content $PACKAGE_FILE -Encoding UTF8
    
    # Добавляем обновленные файлы в коммит
    git add $VERSION_FILE
    git add $PACKAGE_FILE
    
    Write-Host "✅ Версия обновлена: $currentVersion → $newVersion (build $newBuild)" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Только изменения в version.json/package.json, версия не обновляется" -ForegroundColor Yellow
}

exit 0

