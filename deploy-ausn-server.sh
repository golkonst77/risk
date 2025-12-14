#!/usr/bin/env bash
set -euo pipefail

# Пути
AUSN_REPO_DIR="/home/pb001/AUSN"
AUSN_BUILD_DIR="$AUSN_REPO_DIR/out"
AUSN_TARGET_DIR="/var/www/prostoburo_c_usr/data/www/prostoburo.com/ausn"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

log "=== Start deploy AUSN ==="
log "Repo:   $AUSN_REPO_DIR"
log "Build:  $AUSN_BUILD_DIR"
log "Target: $AUSN_TARGET_DIR"

cd "$AUSN_REPO_DIR"

log "Git fetch/pull..."
git fetch --all --prune
git reset --hard origin/main
git pull --rebase --autostash origin main

log "Installing dependencies (legacy peer deps)..."
npm install --legacy-peer-deps

# Для статического деплоя AUSN исключаем все app/api целиком (API недоступны при output: 'export')
if [ -d "$AUSN_REPO_DIR/app/api" ]; then
  log "Removing entire app/api for static export"
  rm -rf "$AUSN_REPO_DIR/app/api"
fi

# Исключаем динамический pages/kb с ISR, несовместимым со static export
if [ -d "$AUSN_REPO_DIR/pages/kb" ]; then
  log "Removing pages/kb (ISR/blog) for static export"
  rm -rf "$AUSN_REPO_DIR/pages/kb"
fi

# Админка (Netlify CMS) для AUSN не используется
if [ -d "$AUSN_REPO_DIR/public/admin" ]; then
  log "Removing public/admin (CMS) for AUSN deploy"
  rm -rf "$AUSN_REPO_DIR/public/admin"
fi

log "Building (next build)..."
AUSN_STATIC_EXPORT=true npm run build || { log "npm run build failed"; exit 1; }

if [ ! -d "$AUSN_BUILD_DIR" ]; then
  log "ERROR: build dir not found: $AUSN_BUILD_DIR"
  exit 1
fi

log "Preparing target directory..."
mkdir -p "$AUSN_TARGET_DIR"

log "Cleaning target..."
rm -rf "$AUSN_TARGET_DIR"/*

SRC_DIR="$AUSN_BUILD_DIR"
# Если используется basePath '/ausn', Next кладёт сайт в out/ausn
if [ -d "$AUSN_BUILD_DIR/ausn" ] && [ -f "$AUSN_BUILD_DIR/ausn/index.html" ]; then
  SRC_DIR="$AUSN_BUILD_DIR/ausn"
fi

# Генерация файлов версии для отображения в футере
SOURCE_VERSION=$(grep -oE '"version"\s*:\s*"[^"]+"' "$AUSN_REPO_DIR/package.json" | head -n1 | sed -E 's/.*"version"\s*:\s*"([^"]+)"/\1/')
BUILD_SHA=$(git rev-parse --short HEAD)
BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ)
{
  echo "{"
  echo "  \"version\": \"$SOURCE_VERSION\"," 
  echo "  \"build\": \"$BUILD_SHA\"," 
  echo "  \"date\": \"$BUILD_DATE\""
  echo "}"
} > "$SRC_DIR/version.json"
echo "version: $SOURCE_VERSION | build: $BUILD_SHA | date: $BUILD_DATE" > "$SRC_DIR/version.txt"
log "Build version: $SOURCE_VERSION ($BUILD_SHA) at $BUILD_DATE"

log "Copying build to target from $SRC_DIR ..."
rsync -a --delete "$SRC_DIR"/ "$AUSN_TARGET_DIR"/

log "=== Deploy AUSN completed successfully ==="
