/**
 * Конфигурация калькулятора АУСН
 * Все ставки, лимиты и правила в одном месте для удобного обновления
 */

export const AUSN_CONFIG = {
  // Лимиты АУСН
  limits: {
    maxRevenue: 60_000_000, // Максимальный годовой доход (руб.)
    maxEmployees: 5, // Максимальное количество сотрудников
    maxResidualValue: 150_000_000, // Максимальная остаточная стоимость ОС (руб.)
  },

  // Налоговые ставки
  taxRates: {
    income: {
      standard: 8, // Доходы (%)
      reduced: 0, // Пониженная ставка для льготников (%)
    },
    incomeMinusExpenses: {
      standard: 20, // Доходы минус расходы (%)
      reduced: 0, // Пониженная ставка для льготников (%)
    },
  },

  // Страховые взносы (включены в единый налог)
  insurance: {
    included: true,
    pensionFund: 0, // ПФР - включено в налог
    medicalFund: 0, // ОМС - включено в налог
    socialFund: 0, // ФСС - включено в налог
  },

  // Пилотные регионы
  regions: [
    { code: '77', name: 'Москва' },
    { code: '50', name: 'Московская область' },
    { code: '52', name: 'Нижегородская область' },
    { code: '73', name: 'Сахалинская область' },
    { code: '40', name: 'Калужская область' },
    { code: '92', name: 'Республика Татарстан' },
  ],

  // Запрещённые виды деятельности
  prohibitedActivities: [
    'Производство подакцизных товаров',
    'Добыча и реализация полезных ископаемых',
    'Финансовые услуги (кроме страховых брокеров)',
    'Ломбарды',
    'Нотариусы и адвокаты',
    'Микрофинансовые организации',
  ],

  // Уполномоченные банки (обновляется регулярно)
  authorizedBanks: [
    {
      name: 'Сбербанк',
      commission: 'от 0%',
      link: 'https://www.sberbank.ru/ru/s_m_business/bankingservice/ausn',
    },
    {
      name: 'Тинькофф',
      commission: 'от 0%',
      link: 'https://www.tinkoff.ru/business/acquiring/',
    },
    {
      name: 'Альфа-Банк',
      commission: 'от 0%',
      link: 'https://alfabank.ru/sme/',
    },
    {
      name: 'ВТБ',
      commission: 'от 0%',
      link: 'https://www.vtb.ru/malyj-biznes/',
    },
    {
      name: 'Точка',
      commission: 'от 0%',
      link: 'https://tochka.com/',
    },
  ],

  // Сроки подачи заявления
  deadlines: {
    newBusiness: 30, // дней с момента регистрации
    existingBusiness: 'до 31 декабря', // для действующего бизнеса
  },

  // Отчётность
  reporting: {
    declarations: false, // Декларации не нужны
    notifications: true, // Уведомления о работниках нужны
    frequency: 'Автоматически через банк',
  },
}

// Константы для расчетов
export const TAX_CONSTANTS = {
  // Фиксированные взносы ИП за себя (2024-2025)
  IP_FIXED_INSURANCE: 49500,
  IP_INSURANCE_THRESHOLD: 300000,
  IP_ADDITIONAL_INSURANCE_RATE: 0.01,

  // Ставки налогов
  USN_INCOME_RATE: 0.06, // УСН 6%
  USN_INCOME_EXPENSES_RATE: 0.15, // УСН 15%
  USN_MIN_TAX_RATE: 0.01, // Минимальный налог УСН 15%
  AUSN_INCOME_RATE: 0.08, // АУСН 8%
  AUSN_INCOME_EXPENSES_RATE: 0.20, // АУСН 20%
  AUSN_MIN_TAX_RATE: 0.03, // Минимальный налог АУСН 20%
  NDFL_RATE: 0.13, // НДФЛ
  PROFIT_TAX_RATE: 0.20, // Налог на прибыль
  NDS_RATE: 0.20, // НДС

  // Страховые взносы
  EMPLOYEE_INSURANCE_RATE: 0.302, // 30.2% от ФОТ
  AUSN_INJURY_RATE: 0.002, // 0.2% на травматизм для АУСН
}

/**
 * Тип бизнеса
 */
export type BusinessType = 'IP' | 'OOO'

/**
 * Тип налоговой системы
 */
export type TaxSystem = 'USN_INCOME' | 'USN_INCOME_EXPENSES' | 'OSNO'

/**
 * Результат расчета налога
 */
export interface TaxCalculationResult {
  tax: number // Основной налог
  insurance: number // Страховые взносы
  total: number // Итого к уплате
  taxBreakdown?: { // Детализация налога (для ОСНО)
    ndfl?: number
    profitTax?: number
    nds?: number
  }
  insuranceBreakdown?: { // Детализация взносов
    self?: number
    employees?: number
  }
}

/**
 * Расчет УСН 6% (Доходы)
 */
export function calculateUSN6(params: {
  businessType: BusinessType
  revenue: number
  employees: number
  avgSalary: number
}): TaxCalculationResult {
  const { businessType, revenue, employees, avgSalary } = params

  // Налог 6% от доходов
  let tax = revenue * TAX_CONSTANTS.USN_INCOME_RATE

  // Взносы за себя (только ИП)
  let selfInsurance = 0
  if (businessType === 'IP') {
    selfInsurance = TAX_CONSTANTS.IP_FIXED_INSURANCE
    if (revenue > TAX_CONSTANTS.IP_INSURANCE_THRESHOLD) {
      selfInsurance += (revenue - TAX_CONSTANTS.IP_INSURANCE_THRESHOLD) * TAX_CONSTANTS.IP_ADDITIONAL_INSURANCE_RATE
    }
  }

  // Взносы за сотрудников
  const employeeInsurance = employees * avgSalary * 12 * TAX_CONSTANTS.EMPLOYEE_INSURANCE_RATE

  // Уменьшение налога на взносы (только для ИП)
  if (businessType === 'IP') {
    const totalInsurance = selfInsurance + employeeInsurance
    // Если есть сотрудники - максимум 50%, если нет - 100%
    const maxReduction = employees > 0 ? tax * 0.5 : tax
    const reduction = Math.min(totalInsurance, maxReduction)
    tax = Math.max(0, tax - reduction)
  }

  return {
    tax,
    insurance: selfInsurance + employeeInsurance,
    total: tax + selfInsurance + employeeInsurance,
    insuranceBreakdown: {
      self: selfInsurance,
      employees: employeeInsurance,
    },
  }
}

/**
 * Расчет УСН 15% (Доходы минус расходы)
 */
export function calculateUSN15(params: {
  businessType: BusinessType
  revenue: number
  expenses: number
  employees: number
  avgSalary: number
}): TaxCalculationResult {
  const { businessType, revenue, expenses, employees, avgSalary } = params

  // Налоговая база
  const taxBase = Math.max(0, revenue - expenses)
  // Налог 15% от базы, но не менее 1% от доходов
  const tax = Math.max(
    taxBase * TAX_CONSTANTS.USN_INCOME_EXPENSES_RATE,
    revenue * TAX_CONSTANTS.USN_MIN_TAX_RATE
  )

  // Взносы за себя (только ИП)
  let selfInsurance = 0
  if (businessType === 'IP') {
    selfInsurance = TAX_CONSTANTS.IP_FIXED_INSURANCE
    if (revenue > TAX_CONSTANTS.IP_INSURANCE_THRESHOLD) {
      selfInsurance += (revenue - TAX_CONSTANTS.IP_INSURANCE_THRESHOLD) * TAX_CONSTANTS.IP_ADDITIONAL_INSURANCE_RATE
    }
  }

  // Взносы за сотрудников
  const employeeInsurance = employees * avgSalary * 12 * TAX_CONSTANTS.EMPLOYEE_INSURANCE_RATE

  // Взносы НЕ уменьшают налог для УСН 15%

  return {
    tax,
    insurance: selfInsurance + employeeInsurance,
    total: tax + selfInsurance + employeeInsurance,
    insuranceBreakdown: {
      self: selfInsurance,
      employees: employeeInsurance,
    },
  }
}

/**
 * Расчет ОСНО
 */
export function calculateOSNO(params: {
  businessType: BusinessType
  revenue: number
  expenses: number
  employees: number
  avgSalary: number
}): TaxCalculationResult {
  const { businessType, revenue, expenses, employees, avgSalary } = params

  const taxBase = Math.max(0, revenue - expenses)
  let ndfl = 0
  let profitTax = 0
  let nds = revenue * TAX_CONSTANTS.NDS_RATE

  // Взносы за сотрудников
  const employeeInsurance = employees * avgSalary * 12 * TAX_CONSTANTS.EMPLOYEE_INSURANCE_RATE

  if (businessType === 'IP') {
    // ИП: НДФЛ + НДС + взносы за себя
    ndfl = taxBase * TAX_CONSTANTS.NDFL_RATE
    const selfInsurance = TAX_CONSTANTS.IP_FIXED_INSURANCE +
      (revenue > TAX_CONSTANTS.IP_INSURANCE_THRESHOLD
        ? (revenue - TAX_CONSTANTS.IP_INSURANCE_THRESHOLD) * TAX_CONSTANTS.IP_ADDITIONAL_INSURANCE_RATE
        : 0)

    return {
      tax: ndfl + nds,
      insurance: selfInsurance + employeeInsurance,
      total: ndfl + nds + selfInsurance + employeeInsurance,
      taxBreakdown: {
        ndfl,
        nds,
      },
      insuranceBreakdown: {
        self: selfInsurance,
        employees: employeeInsurance,
      },
    }
  } else {
    // ООО: Налог на прибыль + НДС
    profitTax = taxBase * TAX_CONSTANTS.PROFIT_TAX_RATE

    return {
      tax: profitTax + nds,
      insurance: employeeInsurance,
      total: profitTax + nds + employeeInsurance,
      taxBreakdown: {
        profitTax,
        nds,
      },
      insuranceBreakdown: {
        employees: employeeInsurance,
      },
    }
  }
}

/**
 * Расчет АУСН 8% (Доходы)
 */
export function calculateAUSN8(params: {
  revenue: number
  employees: number
  avgSalary: number
}): TaxCalculationResult {
  const { revenue, employees, avgSalary } = params

  // Налог 8% от доходов
  const tax = revenue * TAX_CONSTANTS.AUSN_INCOME_RATE

  // Только взносы на травматизм (0.2% от ФОТ)
  const fot = employees * avgSalary * 12
  const insurance = fot * TAX_CONSTANTS.AUSN_INJURY_RATE

  return {
    tax,
    insurance,
    total: tax + insurance,
  }
}

/**
 * Расчет АУСН 20% (Доходы минус расходы)
 */
export function calculateAUSN20(params: {
  revenue: number
  expenses: number
  employees: number
  avgSalary: number
}): TaxCalculationResult {
  const { revenue, expenses, employees, avgSalary } = params

  // Налоговая база
  const taxBase = Math.max(0, revenue - expenses)
  // Налог 20% от базы, но не менее 3% от доходов
  const tax = Math.max(
    taxBase * TAX_CONSTANTS.AUSN_INCOME_EXPENSES_RATE,
    revenue * TAX_CONSTANTS.AUSN_MIN_TAX_RATE
  )

  // Только взносы на травматизм (0.2% от ФОТ)
  const fot = employees * avgSalary * 12
  const insurance = fot * TAX_CONSTANTS.AUSN_INJURY_RATE

  return {
    tax,
    insurance,
    total: tax + insurance,
  }
}

/**
 * Функция расчёта налога АУСН (устаревшая, оставлена для совместимости)
 * @deprecated Используйте calculateAUSN8 или calculateAUSN20
 */
export function calculateAUSN(params: {
  taxType: 'income' | 'incomeMinusExpenses'
  revenue: number
  expenses?: number
  isPreferential?: boolean
}) {
  const { taxType, revenue, expenses = 0, isPreferential = false } = params

  let taxRate: number

  if (taxType === 'income') {
    taxRate = isPreferential
      ? AUSN_CONFIG.taxRates.income.reduced
      : AUSN_CONFIG.taxRates.income.standard
  } else {
    taxRate = isPreferential
      ? AUSN_CONFIG.taxRates.incomeMinusExpenses.reduced
      : AUSN_CONFIG.taxRates.incomeMinusExpenses.standard
  }

  const taxBase = taxType === 'income' ? revenue : Math.max(0, revenue - expenses)
  const tax = (taxBase * taxRate) / 100

  return {
    taxBase,
    taxRate,
    tax,
    effectiveRate: revenue > 0 ? (tax / revenue) * 100 : 0,
  }
}

/**
 * Проверка соответствия лимитам АУСН
 */
export function checkAUSNEligibility(params: {
  revenue: number
  employees: number
  region: string
  residualValue?: number
}) {
  const { revenue, employees, region, residualValue = 0 } = params

  const errors: string[] = []

  // Проверка дохода
  if (revenue > AUSN_CONFIG.limits.maxRevenue) {
    errors.push(
      `Доход превышает лимит ${(AUSN_CONFIG.limits.maxRevenue / 1_000_000).toFixed(0)} млн руб.`
    )
  }

  // Проверка количества сотрудников
  if (employees > AUSN_CONFIG.limits.maxEmployees) {
    errors.push(`Количество сотрудников превышает лимит ${AUSN_CONFIG.limits.maxEmployees} чел.`)
  }

  // Проверка остаточной стоимости ОС
  if (residualValue > AUSN_CONFIG.limits.maxResidualValue) {
    errors.push(
      `Остаточная стоимость ОС превышает лимит ${(AUSN_CONFIG.limits.maxResidualValue / 1_000_000).toFixed(0)} млн руб.`
    )
  }

  // Проверка региона
  const isRegionAllowed = AUSN_CONFIG.regions.some((r) => r.code === region || r.name === region)
  if (!isRegionAllowed) {
    errors.push('Регион не входит в список пилотных для АУСН')
  }

  return {
    eligible: errors.length === 0,
    errors,
  }
}

