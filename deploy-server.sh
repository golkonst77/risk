#!/bin/bash
set -e

echo "========================================"
echo " DEPLOY RISK (STATIC)"
echo "========================================"

APP_DIR="/var/www/prostoburo-risk"
REPO_URL="https://github.com/golkonst77/risk.git"
BRANCH="main"

if [ ! -d "$APP_DIR" ]; then
    echo "[INFO] Первый деплой"
    git clone $REPO_URL $APP_DIR
else
    echo "[INFO] Обновление"
    cd $APP_DIR
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
fi

cd $APP_DIR

echo "[INFO] Установка зависимостей"
npm install --legacy-peer-deps

echo "[INFO] Сборка СТАТИКИ"
export AUSN_STATIC_EXPORT=true
export AUSN_STATIC_BASE=/risk
npm run build

echo "[INFO] Готово. Статика собрана в out/"
