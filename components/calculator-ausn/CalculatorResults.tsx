"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingDown, TrendingUp, Download, MessageCircle } from "lucide-react"
import type { ComparisonResults } from "./types"

interface CalculatorResultsProps {
  results: ComparisonResults
  onConsultation?: () => void
  onDownloadPDF?: () => void
}

export function CalculatorResults({ results, onConsultation, onDownloadPDF }: CalculatorResultsProps) {
  // Форматирование числа с пробелами и валютой
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Форматирование процентов
  const formatPercent = (value: number): string => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  // Определение цвета для экономии/переплаты
  const getSavingsColor = (savings: number): string => {
    if (savings > 0) return 'text-green-600'
    if (savings < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  // Определение иконки для экономии/переплаты
  const getSavingsIcon = (savings: number) => {
    if (savings > 0) return <TrendingDown className="h-5 w-5 text-green-600" />
    if (savings < 0) return <TrendingUp className="h-5 w-5 text-red-600" />
    return null
  }

  const renderSystemCard = (
    systemKey: 'current' | 'ausn8' | 'ausn20',
    isBest: boolean
  ) => {
    const system = results[systemKey]
    const isAUSN = systemKey !== 'current'

    return (
      <Card className={`relative ${isBest ? 'ring-2 ring-green-500 shadow-lg' : ''}`}>
        {isBest && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-green-500 text-white px-4 py-1">
              Рекомендуем
            </Badge>
          </div>
        )}

        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>{system.systemName}</span>
            {isAUSN && (
              <Badge variant="outline" className="text-xs">
                АУСН
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Основной налог */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Основной налог:</p>
            <p className="text-2xl font-bold">{formatCurrency(system.tax)}</p>
            {system.taxBreakdown && (
              <div className="text-xs text-muted-foreground space-y-0.5">
                {system.taxBreakdown.ndfl && (
                  <p>НДФЛ: {formatCurrency(system.taxBreakdown.ndfl)}</p>
                )}
                {system.taxBreakdown.profitTax && (
                  <p>Налог на прибыль: {formatCurrency(system.taxBreakdown.profitTax)}</p>
                )}
                {system.taxBreakdown.nds && (
                  <p>НДС: {formatCurrency(system.taxBreakdown.nds)}</p>
                )}
              </div>
            )}
          </div>

          {/* Страховые взносы */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Страховые взносы:</p>
            <p className="text-xl font-semibold">{formatCurrency(system.insurance)}</p>
            {system.insuranceBreakdown && (
              <div className="text-xs text-muted-foreground space-y-0.5">
                {system.insuranceBreakdown.self !== undefined && system.insuranceBreakdown.self > 0 && (
                  <p>За себя: {formatCurrency(system.insuranceBreakdown.self)}</p>
                )}
                {system.insuranceBreakdown.employees !== undefined && system.insuranceBreakdown.employees > 0 && (
                  <p>За сотрудников: {formatCurrency(system.insuranceBreakdown.employees)}</p>
                )}
              </div>
            )}
          </div>

          {/* Разделитель */}
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Итого к уплате:</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(system.total)}
              </p>
            </div>
          </div>

          {/* Экономия/Переплата */}
          {isAUSN && 'savings' in system && (
            <div className={`flex items-center justify-between p-3 rounded-lg bg-gray-50 ${
              system.savings > 0 ? 'bg-green-50' : system.savings < 0 ? 'bg-red-50' : ''
            }`}>
              <div className="flex items-center gap-2">
                {getSavingsIcon(system.savings)}
                <span className="text-sm font-medium">
                  {system.savings > 0 ? 'Экономия' : system.savings < 0 ? 'Переплата' : 'Без изменений'}:
                </span>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getSavingsColor(system.savings)}`}>
                  {formatCurrency(Math.abs(system.savings))}
                </p>
                <p className={`text-sm ${getSavingsColor(system.savings)}`}>
                  {formatPercent(system.savingsPercent)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Заголовок с рекомендацией */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Результаты сравнения</h2>
        <p className="text-lg text-muted-foreground">{results.recommendation}</p>
      </div>

      {/* Карточки сравнения */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderSystemCard('current', results.bestOption === 'current')}
        {renderSystemCard('ausn8', results.bestOption === 'ausn8')}
        {renderSystemCard('ausn20', results.bestOption === 'ausn20')}
      </div>

      {/* Действия */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
        {onDownloadPDF && (
          <Button variant="outline" size="lg" onClick={onDownloadPDF}>
            <Download className="mr-2 h-5 w-5" />
            Скачать подробный расчет (PDF)
          </Button>
        )}
        {onConsultation && (
          <Button size="lg" onClick={onConsultation}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Получить консультацию
          </Button>
        )}
      </div>

      {/* Дополнительная информация */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Следующий шаг: переход на АУСН</h3>
              <p className="text-sm text-muted-foreground">
                Для перехода на АУСН необходимо подать заявление через уполномоченный банк.
                Наши специалисты помогут подготовить все документы и сопроводят весь процесс перехода.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Проверка соответствия всем требованиям</li>
                <li>✓ Подготовка пакета документов</li>
                <li>✓ Помощь в выборе банка</li>
                <li>✓ Сопровождение перехода</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

