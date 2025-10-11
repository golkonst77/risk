# Калькулятор АУСН

Модульная структура калькулятора автоматизированной упрощённой системы налогообложения.

## Структура

```
calculator-ausn/
├── calculator-config.ts    # Конфигурация: ставки, лимиты, регионы, банки
├── types.ts                 # TypeScript типы и интерфейсы
├── Calculator.tsx           # Основной компонент калькулятора
├── CalculatorForm.tsx       # Форма ввода данных
├── CalculatorResults.tsx    # Отображение результатов
├── ComparisonTable.tsx      # Таблица сравнения с УСН
├── EligibilityChecker.tsx   # Проверка соответствия критериям
└── README.md                # Документация
```

## Обновление данных

### Изменение налоговых ставок

Откройте `calculator-config.ts` и измените значения в разделе `taxRates`:

\`\`\`typescript
taxRates: {
  income: {
    standard: 8, // Доходы (%)
    reduced: 0, // Пониженная ставка (%)
  },
  incomeMinusExpenses: {
    standard: 20, // Доходы минус расходы (%)
    reduced: 0, // Пониженная ставка (%)
  },
}
\`\`\`

### Изменение лимитов

Лимиты находятся в разделе `limits`:

\`\`\`typescript
limits: {
  maxRevenue: 60_000_000, // Максимальный годовой доход
  maxEmployees: 5,         // Максимальное количество сотрудников
  maxResidualValue: 150_000_000, // Остаточная стоимость ОС
}
\`\`\`

### Добавление/удаление регионов

Обновите массив `regions`:

\`\`\`typescript
regions: [
  { code: '77', name: 'Москва' },
  { code: '50', name: 'Московская область' },
  // Добавьте новые регионы здесь
]
\`\`\`

### Обновление списка банков

Измените массив `authorizedBanks`:

\`\`\`typescript
authorizedBanks: [
  {
    name: 'Сбербанк',
    commission: 'от 0%',
    link: 'https://www.sberbank.ru/...',
  },
  // Добавьте новые банки здесь
]
\`\`\`

## Использование

\`\`\`typescript
import { Calculator } from '@/components/calculator-ausn'

// В компоненте страницы
<Calculator />
\`\`\`

## API

### calculateAUSN()

Расчёт налога АУСН.

\`\`\`typescript
import { calculateAUSN } from '@/components/calculator-ausn/calculator-config'

const result = calculateAUSN({
  taxType: 'income',
  revenue: 5_000_000,
  expenses: 2_000_000,
  isPreferential: false,
})
\`\`\`

### checkAUSNEligibility()

Проверка соответствия критериям АУСН.

\`\`\`typescript
import { checkAUSNEligibility } from '@/components/calculator-ausn/calculator-config'

const check = checkAUSNEligibility({
  revenue: 50_000_000,
  employees: 3,
  region: 'Москва',
  residualValue: 100_000_000,
})
\`\`\`

## Обновления налогового законодательства

При изменении налогового законодательства:

1. Обновите `calculator-config.ts`
2. Проверьте функции расчёта в том же файле
3. Обновите тесты (если есть)
4. Проверьте работу калькулятора вручную
5. Обновите changelog проекта

## Changelog

### v1.0.0 (2025-10-11)
- Создана модульная структура калькулятора
- Вынесена конфигурация в отдельный файл
- Добавлены типы TypeScript
- Подготовлена документация

