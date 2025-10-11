"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComparisonResults } from "./types"

interface CalculatorChartsProps {
  results: ComparisonResults
  formData: {
    revenue: number
    expenses: number
    employees: number
  }
}

export function CalculatorCharts({ results, formData }: CalculatorChartsProps) {
  // Данные для графиков
  const systems = [
    { name: 'Текущая', value: results.current.total, color: 'bg-gray-500' },
    { name: 'АУСН 8%', value: results.ausn8.total, color: 'bg-blue-500' },
    { name: 'АУСН 20%', value: results.ausn20.total, color: 'bg-purple-500' }
  ]

  const maxValue = Math.max(...systems.map(s => s.value))

  // Процент экономии
  const ausn8Percent = results.ausn8.savingsPercent
  const ausn20Percent = results.ausn20.savingsPercent

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Сравнение налогов */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-lg">Сравнение налоговой нагрузки</CardTitle>
          <CardDescription>Годовые платежи по каждому режиму</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {systems.map((system, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{system.name}</span>
                  <span className="font-bold text-gray-900">
                    {system.value.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${system.color} rounded-full transition-all duration-500 flex items-center justify-end pr-3`}
                    style={{ width: `${(system.value / maxValue) * 100}%` }}
                  >
                    <span className="text-xs font-semibold text-white">
                      {((system.value / maxValue) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Потенциальная экономия */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="text-lg">Потенциальная экономия</CardTitle>
          <CardDescription>При переходе на АУСН</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* АУСН 8% */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">АУСН 8%</span>
                <span className={`text-lg font-bold ${
                  results.ausn8.savings > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {results.ausn8.savings > 0 ? '-' : '+'}{Math.abs(results.ausn8.savings).toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">
                    {ausn8Percent > 0 ? 'Экономия' : 'Переплата'}
                  </span>
                  <span className={`text-xs font-semibold ${
                    ausn8Percent > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Math.abs(ausn8Percent).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ausn8Percent > 0 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${Math.min(Math.abs(ausn8Percent), 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* АУСН 20% */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">АУСН 20%</span>
                <span className={`text-lg font-bold ${
                  results.ausn20.savings > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {results.ausn20.savings > 0 ? '-' : '+'}{Math.abs(results.ausn20.savings).toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">
                    {ausn20Percent > 0 ? 'Экономия' : 'Переплата'}
                  </span>
                  <span className={`text-xs font-semibold ${
                    ausn20Percent > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Math.abs(ausn20Percent).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ausn20Percent > 0 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${Math.min(Math.abs(ausn20Percent), 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Структура расходов */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-amber-50">
          <CardTitle className="text-lg">Структура ваших данных</CardTitle>
          <CardDescription>Распределение доходов и расходов</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Годовой доход</span>
              <span className="text-lg font-bold text-blue-600">
                {formData.revenue.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Годовые расходы</span>
              <span className="text-lg font-bold text-orange-600">
                {formData.expenses.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Прибыль</span>
              <span className="text-lg font-bold text-green-600">
                {(formData.revenue - formData.expenses).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            
            {/* Визуализация пропорций */}
            <div className="pt-4">
              <div className="h-4 w-full flex rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600"
                  style={{ width: `${((formData.revenue - formData.expenses) / formData.revenue * 100)}%` }}
                  title="Прибыль"
                />
                <div 
                  className="bg-gradient-to-r from-orange-400 to-orange-600"
                  style={{ width: `${(formData.expenses / formData.revenue * 100)}%` }}
                  title="Расходы"
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>Прибыль: {((formData.revenue - formData.expenses) / formData.revenue * 100).toFixed(1)}%</span>
                <span>Расходы: {(formData.expenses / formData.revenue * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Количество сотрудников */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-lg">Информация о персонале</CardTitle>
          <CardDescription>Данные о сотрудниках</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {formData.employees}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {formData.employees === 0 
                  ? 'Без сотрудников' 
                  : `Сотрудник${formData.employees === 1 ? '' : formData.employees < 5 ? 'а' : 'ов'}`
                }
              </div>
            </div>
            
            {formData.employees > 0 && (
              <div className="w-full pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {results.current.insurance.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Взносы текущие</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {results.ausn8.insurance.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Взносы АУСН</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

