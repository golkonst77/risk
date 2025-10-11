"use client"

import { DashboardCard } from "./ui/DashboardCard"
import { PieChart, type PieChartSegment } from "./ui/PieChart"
import { DASHBOARD_THEME, formatCurrency } from "./dashboard-theme"
import type { ComparisonResults } from "./types"

interface DashboardChartsNewProps {
  results: ComparisonResults
  formData: {
    revenue: number
    expenses: number
    employees: number
  }
}

export function DashboardChartsNew({ results, formData }: DashboardChartsNewProps) {
  // Данные для столбчатой диаграммы
  const barData = [
    { label: 'УСН 6%', value: 0, color: DASHBOARD_THEME.colors.chart.usn6 },
    { label: 'УСН 15%', value: 0, color: DASHBOARD_THEME.colors.chart.usn15 },
    { label: 'ОСНО', value: 0, color: DASHBOARD_THEME.colors.chart.osno },
    { label: 'АУСН 8%', value: results.ausn8.total, color: DASHBOARD_THEME.colors.chart.ausn8 },
    { label: 'АУСН 20%', value: results.ausn20.total, color: DASHBOARD_THEME.colors.chart.ausn20 },
  ]

  // Добавляем текущую систему в нужное место
  if (results.current.system === 'USN_INCOME') {
    barData[0].value = results.current.total
  } else if (results.current.system === 'USN_INCOME_EXPENSES') {
    barData[1].value = results.current.total
  } else if (results.current.system === 'OSNO') {
    barData[2].value = results.current.total
  }

  const maxValue = Math.max(...barData.map(d => d.value))

  // Данные для круговой диаграммы (лучший вариант)
  const bestSystem = 
    results.bestOption === 'ausn8' ? results.ausn8 :
    results.bestOption === 'ausn20' ? results.ausn20 :
    results.current

  const profit = formData.revenue - formData.expenses - bestSystem.total

  const pieSegments: PieChartSegment[] = [
    {
      label: 'Налоги',
      value: bestSystem.tax,
      color: DASHBOARD_THEME.colors.primary,
    },
    {
      label: 'Взносы',
      value: bestSystem.insurance,
      color: DASHBOARD_THEME.colors.chart.osno,
    },
    {
      label: 'Чистая прибыль',
      value: Math.max(profit, 0),
      color: DASHBOARD_THEME.colors.status.success,
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Столбчатая диаграмма */}
      <DashboardCard
        title="Сравнение налоговых режимов"
        description="Годовые платежи по каждой системе"
        gradient="secondary"
      >
        <div className="space-y-8">
          {barData.map((item, idx) => {
            const percentage = item.value > 0 ? (item.value / maxValue) * 100 : 0
            const isBest = 
              (item.label === 'АУСН 8%' && results.bestOption === 'ausn8') ||
              (item.label === 'АУСН 20%' && results.bestOption === 'ausn20') ||
              (item.value === results.current.total && results.bestOption === 'current')

            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {item.label}
                    </span>
                    {isBest && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        Лучший
                      </span>
                    )}
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {item.value > 0 ? formatCurrency(item.value) : '—'}
                  </span>
                </div>
                
                <div className="relative h-12 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                  {item.value > 0 && (
                    <div
                      className={`absolute left-0 top-0 h-full rounded-xl transition-all duration-700 ease-out flex items-center justify-end pr-4 ${
                        isBest ? 'shadow-lg' : ''
                      }`}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                        boxShadow: isBest ? `0 0 20px ${item.color}60` : `0 0 8px ${item.color}40`,
                      }}
                    >
                      <span className="text-sm font-bold text-white drop-shadow">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </DashboardCard>

      {/* Круговая диаграмма */}
      <DashboardCard
        title="Структура расходов"
        description={`Распределение при ${
          results.bestOption === 'ausn8' ? 'АУСН 8%' :
          results.bestOption === 'ausn20' ? 'АУСН 20%' :
          results.current.systemName
        }`}
        gradient="success"
      >
        <div className="flex items-center justify-center py-4">
          <PieChart
            segments={pieSegments}
            size={220}
            showLegend={true}
            showLabels={false}
          />
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Годовой доход:</span>
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(formData.revenue)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Годовые расходы:</span>
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(formData.expenses)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-700">Прибыль до налогов:</span>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(formData.revenue - formData.expenses)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Чистая прибыль:</span>
            <span className="text-lg font-bold text-green-700">
              {formatCurrency(Math.max(profit, 0))}
            </span>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}

