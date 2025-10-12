"use client"

import { TrendingDown, TrendingUp, Award, AlertTriangle } from "lucide-react"
import { DashboardCard } from "./ui/DashboardCard"
import { DASHBOARD_THEME, formatCurrency, formatPercent } from "./dashboard-theme"
import type { ComparisonResults } from "./types"

interface DashboardSummaryProps {
  results: ComparisonResults
}

export function DashboardSummary({ results }: DashboardSummaryProps) {
  // Определяем лучший вариант и максимальную экономию
  const bestOption = results.bestOption
  const maxSavings = Math.max(results.ausn8.savings, results.ausn20.savings)
  const hasEconomy = maxSavings > 0
  
  const bestSystemName = 
    bestOption === 'ausn8' ? 'АУСН 8%' :
    bestOption === 'ausn20' ? 'АУСН 20%' :
    results.current.systemName

  const savingsPercent = hasEconomy ? 
    Math.max(results.ausn8.savingsPercent, results.ausn20.savingsPercent) : 0

  // Выбираем отображаемые значения для правой панели
  const displayed = bestOption === 'ausn8'
    ? results.ausn8
    : bestOption === 'ausn20'
    ? results.ausn20
    : results.current

  return (
    <DashboardCard
      title="Итоговая аналитика"
      description="Результат сравнения налоговых режимов"
      gradient="primary"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Экономия/Переплата */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-8">
          <div className="mb-4">
            {hasEconomy ? (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            )}
          </div>

          <div className="mb-2">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {hasEconomy ? 'Ваша экономия' : 'Переплата'}
            </span>
          </div>

          <div className={`text-6xl font-extrabold mb-2 ${
            hasEconomy ? 'text-green-600' : 'text-red-600'
          }`}>
            {hasEconomy ? '-' : '+'}{formatCurrency(Math.abs(maxSavings))}
          </div>

          <div className={`text-2xl font-semibold ${
            hasEconomy ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatPercent(savingsPercent)}
          </div>

          <div className="mt-4 text-gray-600">
            в год при переходе на {bestSystemName}
          </div>
        </div>

        {/* Рекомендуемый режим */}
        <div className="flex flex-col justify-center">
          <div className={`p-6 rounded-2xl ${
            hasEconomy 
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300' 
              : 'bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              {hasEconomy ? (
                <Award className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              )}
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {hasEconomy ? 'Рекомендация' : 'Текущий режим'}
              </span>
            </div>

            <div className="mb-3">
              <div className={`text-3xl font-bold ${
                hasEconomy ? 'text-green-700' : 'text-gray-700'
              }`}>
                {bestSystemName}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Налог:</span>
                <span className="font-semibold">
                  {formatCurrency(displayed.tax)}
                </span>
              </div>
              {typeof displayed.surcharge === 'number' && displayed.surcharge > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Надбавка 5% (доход &gt; 10 млн):</span>
                  <span className="font-semibold">{formatCurrency(displayed.surcharge)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Взносы:</span>
                <span className="font-semibold">
                  {formatCurrency(displayed.insurance)}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-300 flex justify-between">
                <span className="font-medium">Итого в год:</span>
                <span className="font-bold text-lg">
                  {formatCurrency(displayed.total)}
                </span>
              </div>
            </div>
          </div>

          {!hasEconomy && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Обратите внимание:</strong> Переход на АУСН в вашем случае не даст экономии. 
                Рекомендуем остаться на текущем режиме.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  )
}

