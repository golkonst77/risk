/**
 * Типы данных для калькулятора АУСН
 */

import { BusinessType, TaxSystem, TaxCalculationResult } from './calculator-config'

export type { BusinessType, TaxSystem, TaxCalculationResult }

export type TaxType = 'income' | 'incomeMinusExpenses'

/**
 * Входные данные формы калькулятора
 */
export interface CalculatorFormData {
  // Основные параметры
  businessType: BusinessType
  currentTaxSystem: TaxSystem
  revenue: number
  expenses: number
  employees: number
  avgSalary: number
  
  // Подтверждение
  confirmedEligibility: boolean
  
  // Дополнительные параметры
  region?: string
  residualValue?: number
  activity?: string
}

/**
 * Результаты сравнения налоговых режимов
 */
export interface ComparisonResults {
  // Текущая система
  current: TaxCalculationResult & {
    system: TaxSystem
    systemName: string
  }
  
  // АУСН 8%
  ausn8: TaxCalculationResult & {
    systemName: string
    savings: number
    savingsPercent: number
  }
  
  // АУСН 20%
  ausn20: TaxCalculationResult & {
    systemName: string
    savings: number
    savingsPercent: number
  }
  
  // Лучший вариант
  bestOption: 'current' | 'ausn8' | 'ausn20'
  recommendation: string
}

/**
 * Результаты проверки соответствия лимитам
 */
export interface EligibilityCheck {
  eligible: boolean
  errors: string[]
  warnings?: string[]
}

export interface CalculatorInputs {
  // Основные параметры
  taxType: TaxType
  revenue: number
  expenses: number
  employees: number
  region: string

  // Дополнительные параметры
  residualValue?: number
  isPreferential?: boolean
  activity?: string
}

export interface CalculatorResults {
  // Результаты расчёта
  tax: number
  taxBase: number
  taxRate: number
  effectiveRate: number

  // Сравнение с другими режимами
  comparison?: {
    usn6: number
    usn15: number
    ausn: number
    savings: number
    savingsPercent: number
  }

  // Проверка соответствия
  eligibility: {
    eligible: boolean
    errors: string[]
  }

  // Рекомендации
  recommendations?: string[]
}

export interface BankInfo {
  name: string
  commission: string
  link: string
}

export interface RegionInfo {
  code: string
  name: string
}

