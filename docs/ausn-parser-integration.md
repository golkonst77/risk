# Интеграция модуля AUSN Data Parser

## Обзор

Модуль `ausn-parser` - это автономный парсер данных АУСН, который работает отдельно от основного проекта и обновляет справочники регионов и банков с сайта ФНС.

**Расположение:** `D:\DATA\ausn-parser\`

**Репозиторий основного проекта:** `D:\DATA\AUSN_V1\`

## Архитектура интеграции

```
ausn-parser/              # Отдельный модуль парсера
  ├── output/
  │   ├── regions.json   <----┐
  │   └── banks.json     <----┤
  │                           │
AUSN_V1/                      │ копирование (npm run update-data)
  └── public/                 │
      └── data/               │
          ├── regions.json ----┘
          └── banks.json ------┘
```

## Использование данных в проекте

### Загрузка данных во фронтенде

```typescript
// components/calculator-ausn/utils.ts

export async function loadRegions() {
  try {
    const res = await fetch(`/data/regions.json?v=${Date.now()}`)
    const json = await res.json()
    return json.data // Массив регионов
  } catch (error) {
    console.error('Ошибка загрузки регионов:', error)
    // Возврат дефолтных данных
    return DEFAULT_REGIONS
  }
}

export async function loadBanks() {
  try {
    const res = await fetch(`/data/banks.json?v=${Date.now()}`)
    const json = await res.json()
    return json.data // Массив банков
  } catch (error) {
    console.error('Ошибка загрузки банков:', error)
    return DEFAULT_BANKS
  }
}
```

### Использование в компонентах

```typescript
// components/calculator-ausn/CalculatorForm.tsx

import { useState, useEffect } from 'react'
import { loadRegions } from './utils'

export function CalculatorForm() {
  const [regions, setRegions] = useState([])
  
  useEffect(() => {
    loadRegions().then(setRegions)
  }, [])
  
  return (
    <select>
      {regions.map(r => (
        <option key={r.code} value={r.code}>
          {r.name}
        </option>
      ))}
    </select>
  )
}
```

## Обновление данных

### Автоматическое обновление

Парсер запущен на сервере и обновляет данные каждое воскресенье в 03:00.

После обновления данных в `ausn-parser/output/`, нужно скопировать их в проект:

```bash
cd D:\DATA\AUSN_V1
npm run update-data
```

### Ручное обновление

Если нужно обновить данные немедленно:

```bash
# 1. Запустить парсер
cd D:\DATA\ausn-parser
npm run parse:once

# 2. Скопировать данные в проект
cd D:\DATA\AUSN_V1
npm run update-data

# 3. Проверить файлы
dir public\data
```

### Автоматизация через Git hooks

Создайте `.githooks/post-merge` для автообновления после pull:

```bash
#!/bin/sh
echo "Обновление данных АУСН..."
npm run update-data
```

## Формат данных

### regions.json

```json
{
  "version": "2025-10-11",
  "lastUpdate": "2025-10-11T03:00:00Z",
  "source": "nalog.gov.ru",
  "count": 4,
  "data": [
    {
      "code": "77",
      "name": "г. Москва"
    }
  ]
}
```

**Поля:**
- `version` - дата версии данных (YYYY-MM-DD)
- `lastUpdate` - точное время обновления (ISO 8601)
- `source` - источник данных
- `count` - количество записей
- `data` - массив регионов
  - `code` - код региона
  - `name` - название региона

### banks.json

```json
{
  "version": "2025-10-11",
  "lastUpdate": "2025-10-11T03:00:00Z",
  "source": "nalog.gov.ru",
  "count": 8,
  "data": [
    {
      "bic": "044525974",
      "name": "Тинькофф Банк",
      "website": "https://www.tinkoff.ru/business/ausn/",
      "onlineApplication": true
    }
  ]
}
```

**Поля:**
- `bic` - БИК банка
- `name` - название банка
- `website` - сайт для АУСН
- `onlineApplication` - доступна ли онлайн-заявка

## Кэширование

### На клиенте

Используйте query параметр `?v=${timestamp}` для обхода кэша браузера:

```javascript
fetch(`/data/regions.json?v=${Date.now()}`)
```

### На сервере (Next.js)

Настройте заголовки в `next.config.mjs`:

```javascript
async headers() {
  return [
    {
      source: '/data/:path*.json',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=604800',
        },
      ],
    },
  ]
}
```

### React Query / SWR

```typescript
import useSWR from 'swr'

function useRegions() {
  const { data, error } = useSWR('/data/regions.json', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 86400000, // 24 часа
  })
  
  return {
    regions: data?.data || [],
    isLoading: !error && !data,
    isError: error
  }
}
```

## Fallback стратегия

Всегда имейте дефолтные данные на случай недоступности JSON:

```typescript
// calculator-config.ts

export const DEFAULT_REGIONS = [
  { code: "77", name: "г. Москва" },
  { code: "50", name: "Московская область" },
  { code: "40", name: "Калужская область" },
  { code: "16", name: "Республика Татарстан" }
]

export const DEFAULT_BANKS = [
  {
    bic: "044525974",
    name: "Тинькофф Банк",
    website: "https://www.tinkoff.ru/business/ausn/",
    onlineApplication: true
  },
  // ...
]
```

## Мониторинг

### Проверка актуальности данных

```javascript
// Проверить дату последнего обновления
async function checkDataFreshness() {
  const res = await fetch('/data/regions.json')
  const json = await res.json()
  
  const lastUpdate = new Date(json.lastUpdate)
  const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
  
  if (daysSinceUpdate > 14) {
    console.warn('Данные устарели! Обновлено:', json.lastUpdate)
  }
}
```

### Логи парсера

Логи парсера находятся в `ausn-parser/logs/`:

```bash
# Просмотр последнего лога
cat D:\DATA\ausn-parser\logs\parser-2025-10-11.log
```

## Troubleshooting

### Данные не обновляются

1. Проверьте, запущен ли парсер:
   ```bash
   cd D:\DATA\ausn-parser
   pm2 status ausn-parser
   ```

2. Проверьте логи:
   ```bash
   cat logs/parser-*.log
   ```

3. Запустите ручное обновление:
   ```bash
   npm run parse:once
   ```

### Ошибка 404 на /data/regions.json

1. Проверьте наличие файлов:
   ```bash
   dir D:\DATA\AUSN_V1\public\data
   ```

2. Скопируйте данные:
   ```bash
   npm run update-data
   ```

### Старые данные в браузере

1. Очистите кэш браузера (Ctrl+Shift+Delete)
2. Проверьте query параметр `?v=` в URL

## CI/CD интеграция

### В GitHub Actions

```yaml
name: Update AUSN Data

on:
  schedule:
    - cron: '0 3 * * 0'  # Каждое воскресенье в 03:00
  workflow_dispatch:

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Run parser
        run: |
          cd ausn-parser
          npm install
          npm run parse:once
      
      - name: Copy data
        run: npm run update-data
      
      - name: Commit changes
        run: |
          git config user.name "AUSN Parser Bot"
          git config user.email "bot@ausn.ru"
          git add public/data/
          git commit -m "chore: update AUSN data"
          git push
```

## Разработка

### Добавление новых полей

1. Обновите селекторы в `ausn-parser/src/config.js`
2. Обновите парсер в `ausn-parser/src/parsers/*.js`
3. Обновите TypeScript типы в проекте
4. Обновите документацию

### Тестирование локально

```bash
# 1. Тест парсера
cd D:\DATA\ausn-parser
npm run parse:once

# 2. Проверка данных
cat output/regions.json

# 3. Копирование
cd D:\DATA\AUSN_V1
npm run update-data

# 4. Проверка в браузере
curl http://localhost:3000/data/regions.json
```

## Документация парсера

Полная документация модуля парсера находится в:
- `D:\DATA\ausn-parser\README.md`

## Контакты

При возникновении проблем с парсером обращайтесь к документации или проверяйте логи.

