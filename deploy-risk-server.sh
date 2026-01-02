#!/bin/bash
set -e

echo "========================================"
echo " DEPLOY RISK STARTED"
echo "========================================"

APP_DIR="/var/www/prostoburo-risk"
REPO_URL="https://github.com/golkonst77/risk.git"
BRANCH="main"

# Первый деплой
if [ ! -d "$APP_DIR" ]; then
    echo "[INFO] Первый деплой. Клонируем репозиторий..."
    git clone $REPO_URL $APP_DIR
else
    echo "[INFO] Обновление репозитория..."
    cd $APP_DIR
    git fetch
    git checkout $BRANCH
    git pull origin $BRANCH
fi

cd $APP_DIR

echo "[INFO] Установка зависимостей..."
npm install

echo "[INFO] Сборка проекта..."
npm run build

echo "[INFO] Перезапуск сервиса (если используется PM2)"
pm2 restart risk || pm2 start npm --name "risk" -- start

echo "========================================"
echo " DEPLOY RISK FINISHED SUCCESSFULLY"
echo "========================================"
