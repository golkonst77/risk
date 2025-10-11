"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Calculator as CalculatorIcon } from "lucide-react"
import { CalculatorForm } from "./CalculatorForm"
import { CalculatorResults } from "./CalculatorResults"
import { ComparisonTable } from "./ComparisonTable"
import { EligibilityChecker } from "./EligibilityChecker"
import type { CalculatorFormData, ComparisonResults, EligibilityCheck } from "./types"
import {
  calculateUSN6,
  calculateUSN15,
  calculateOSNO,
  calculateAUSN8,
  calculateAUSN20,
  checkAUSNEligibility,
  AUSN_CONFIG,
} from "./calculator-config"

export function Calculator() {
  const [results, setResults] = useState<ComparisonResults | null>(null)
  const [eligibility, setEligibility] = useState<EligibilityCheck | null>(null)
  const [formData, setFormData] = useState<CalculatorFormData | null>(null)

  // Обработка отправки формы
  const handleCalculate = (data: CalculatorFormData) => {
    // Сохраняем данные формы
    setFormData(data)

    // Проверка соответствия лимитам АУСН
    const eligibilityCheck = checkAUSNEligibility({
      revenue: data.revenue,
      employees: data.employees,
      region: data.region || 'Калужская область',
    })
    setEligibility(eligibilityCheck)

    // Расчет текущей системы
    let currentResult
    let currentSystemName = ''

    switch (data.currentTaxSystem) {
      case 'USN_INCOME':
        currentResult = calculateUSN6({
          businessType: data.businessType,
          revenue: data.revenue,
          employees: data.employees,
          avgSalary: data.avgSalary,
        })
        currentSystemName = 'УСН "Доходы" (6%)'
        break

      case 'USN_INCOME_EXPENSES':
        currentResult = calculateUSN15({
          businessType: data.businessType,
          revenue: data.revenue,
          expenses: data.expenses,
          employees: data.employees,
          avgSalary: data.avgSalary,
        })
        currentSystemName = 'УСН "Доходы минус расходы" (15%)'
        break

      case 'OSNO':
        currentResult = calculateOSNO({
          businessType: data.businessType,
          revenue: data.revenue,
          expenses: data.expenses,
          employees: data.employees,
          avgSalary: data.avgSalary,
        })
        currentSystemName = 'ОСНО'
        break

      default:
        currentResult = calculateUSN6({
          businessType: data.businessType,
          revenue: data.revenue,
          employees: data.employees,
          avgSalary: data.avgSalary,
        })
        currentSystemName = 'УСН "Доходы" (6%)'
    }

    // Расчет АУСН 8%
    const ausn8Result = calculateAUSN8({
      revenue: data.revenue,
      employees: data.employees,
      avgSalary: data.avgSalary,
    })

    // Расчет АУСН 20%
    const ausn20Result = calculateAUSN20({
      revenue: data.revenue,
      expenses: data.expenses,
      employees: data.employees,
      avgSalary: data.avgSalary,
    })

    // Расчет экономии
    const ausn8Savings = currentResult.total - ausn8Result.total
    const ausn8SavingsPercent = currentResult.total > 0 
      ? (ausn8Savings / currentResult.total) * 100 
      : 0

    const ausn20Savings = currentResult.total - ausn20Result.total
    const ausn20SavingsPercent = currentResult.total > 0 
      ? (ausn20Savings / currentResult.total) * 100 
      : 0

    // Определение лучшего варианта
    const totals = [
      { key: 'current' as const, total: currentResult.total },
      { key: 'ausn8' as const, total: ausn8Result.total },
      { key: 'ausn20' as const, total: ausn20Result.total },
    ]
    const bestOption = totals.reduce((prev, current) => 
      current.total < prev.total ? current : prev
    ).key

    // Формирование рекомендации
    let recommendation = ''
    if (bestOption === 'current') {
      recommendation = 'Ваша текущая система налогообложения остается оптимальной. Переход на АУСН не принесет экономии.'
    } else if (bestOption === 'ausn8') {
      recommendation = `Рекомендуем перейти на АУСН 8% (Доходы). Экономия составит ${Math.abs(ausn8Savings).toLocaleString('ru-RU')} руб. в год.`
    } else {
      recommendation = `Рекомендуем перейти на АУСН 20% (Доходы минус расходы). Экономия составит ${Math.abs(ausn20Savings).toLocaleString('ru-RU')} руб. в год.`
    }

    // Формируем результаты
    const comparisonResults: ComparisonResults = {
      current: {
        ...currentResult,
        system: data.currentTaxSystem,
        systemName: currentSystemName,
      },
      ausn8: {
        ...ausn8Result,
        systemName: 'АУСН 8% (Доходы)',
        savings: ausn8Savings,
        savingsPercent: ausn8SavingsPercent,
      },
      ausn20: {
        ...ausn20Result,
        systemName: 'АУСН 20% (Доходы минус расходы)',
        savings: ausn20Savings,
        savingsPercent: ausn20SavingsPercent,
      },
      bestOption,
      recommendation,
    }

    setResults(comparisonResults)

    // Прокрутка к результатам
    setTimeout(() => {
      document.getElementById('calculator-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  // Обработка запроса консультации
  const handleConsultation = () => {
    // Здесь можно открыть форму контакта или модальное окно
    // Используем window для прокрутки к контактам
    const contactsSection = document.getElementById('contacts')
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Заглушка для скачивания PDF
  const handleDownloadPDF = () => {
    alert('Функция скачивания PDF будет доступна в ближайшее время')
  }

  // Сброс результатов
  const handleReset = () => {
    setResults(null)
    setEligibility(null)
    setFormData(null)
    // Прокрутка к началу калькулятора
    document.getElementById('calculator-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section id="calculator" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <CalculatorIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Калькулятор сравнения налоговых режимов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Сравните вашу текущую систему налогообложения с АУСН и узнайте, сколько вы можете сэкономить
          </p>
        </div>

        {/* Форма калькулятора */}
        <div id="calculator-form" className="mb-12">
          <CalculatorForm
            onSubmit={handleCalculate}
            initialData={formData || undefined}
          />
        </div>

        {/* Результаты */}
        {results && eligibility && formData && (
          <div id="calculator-results" className="space-y-8">
            {/* Проверка соответствия */}
            <EligibilityChecker
              eligibility={eligibility}
              revenue={formData.revenue}
              employees={formData.employees}
            />

            {/* Если соответствует лимитам - показываем результаты */}
            {eligibility.eligible && (
              <>
                {/* Карточки результатов */}
                <CalculatorResults
                  results={results}
                  onConsultation={handleConsultation}
                  onDownloadPDF={handleDownloadPDF}
                />

                {/* Таблица сравнения */}
                <ComparisonTable results={results} />

                {/* Кнопка нового расчета */}
                <div className="flex justify-center pt-6">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    ← Сделать новый расчет
                  </button>
                </div>
              </>
            )}

            {/* Если НЕ соответствует - показываем только проверку */}
            {!eligibility.eligible && (
              <div className="flex justify-center pt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Изменить данные
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

