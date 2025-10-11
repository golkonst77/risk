"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import type { ComparisonResults } from "./types"

interface ComparisonTableProps {
  results: ComparisonResults
}

export function ComparisonTable({ results }: ComparisonTableProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  // Форматирование числа с пробелами и валютой
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Определение класса для лучшего варианта
  const getBestClass = (systemKey: 'current' | 'ausn8' | 'ausn20'): string => {
    return results.bestOption === systemKey ? 'bg-green-50 font-semibold' : ''
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
        <div 
          className="flex items-center justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              Детальное сравнение налоговых режимов
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </CardTitle>
            <CardDescription>
              {isExpanded 
                ? 'Подробная разбивка всех налогов и взносов по каждой системе'
                : 'Нажмите для просмотра подробной разбивки налогов и взносов'
              }
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-4"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? 'Свернуть' : 'Развернуть'}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Показатель</TableHead>
                <TableHead className="text-right">
                  {results.current.systemName}
                  {results.bestOption === 'current' && (
                    <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                  )}
                </TableHead>
                <TableHead className="text-right">
                  {results.ausn8.systemName}
                  {results.bestOption === 'ausn8' && (
                    <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                  )}
                </TableHead>
                <TableHead className="text-right">
                  {results.ausn20.systemName}
                  {results.bestOption === 'ausn20' && (
                    <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Основной налог */}
              <TableRow>
                <TableCell className="font-medium">Основной налог</TableCell>
                <TableCell className={`text-right ${getBestClass('current')}`}>
                  {formatCurrency(results.current.tax)}
                </TableCell>
                <TableCell className={`text-right ${getBestClass('ausn8')}`}>
                  {formatCurrency(results.ausn8.tax)}
                </TableCell>
                <TableCell className={`text-right ${getBestClass('ausn20')}`}>
                  {formatCurrency(results.ausn20.tax)}
                </TableCell>
              </TableRow>

              {/* Детализация налогов для ОСНО */}
              {results.current.taxBreakdown && (
                <>
                  {results.current.taxBreakdown.ndfl !== undefined && (
                    <TableRow className="text-sm text-muted-foreground">
                      <TableCell className="pl-8">— НДФЛ</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.current.taxBreakdown.ndfl)}
                      </TableCell>
                      <TableCell className="text-right">—</TableCell>
                      <TableCell className="text-right">—</TableCell>
                    </TableRow>
                  )}
                  {results.current.taxBreakdown.profitTax !== undefined && (
                    <TableRow className="text-sm text-muted-foreground">
                      <TableCell className="pl-8">— Налог на прибыль</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.current.taxBreakdown.profitTax)}
                      </TableCell>
                      <TableCell className="text-right">—</TableCell>
                      <TableCell className="text-right">—</TableCell>
                    </TableRow>
                  )}
                  {results.current.taxBreakdown.nds !== undefined && (
                    <TableRow className="text-sm text-muted-foreground">
                      <TableCell className="pl-8">— НДС</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.current.taxBreakdown.nds)}
                      </TableCell>
                      <TableCell className="text-right">—</TableCell>
                      <TableCell className="text-right">—</TableCell>
                    </TableRow>
                  )}
                </>
              )}

              {/* Страховые взносы */}
              <TableRow>
                <TableCell className="font-medium">Страховые взносы</TableCell>
                <TableCell className={`text-right ${getBestClass('current')}`}>
                  {formatCurrency(results.current.insurance)}
                </TableCell>
                <TableCell className={`text-right ${getBestClass('ausn8')}`}>
                  {formatCurrency(results.ausn8.insurance)}
                </TableCell>
                <TableCell className={`text-right ${getBestClass('ausn20')}`}>
                  {formatCurrency(results.ausn20.insurance)}
                </TableCell>
              </TableRow>

              {/* Детализация взносов */}
              {results.current.insuranceBreakdown?.self !== undefined && results.current.insuranceBreakdown.self > 0 && (
                <TableRow className="text-sm text-muted-foreground">
                  <TableCell className="pl-8">— За себя (ИП)</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(results.current.insuranceBreakdown.self)}
                  </TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-right">—</TableCell>
                </TableRow>
              )}
              {results.current.insuranceBreakdown?.employees !== undefined && results.current.insuranceBreakdown.employees > 0 && (
                <TableRow className="text-sm text-muted-foreground">
                  <TableCell className="pl-8">— За сотрудников</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(results.current.insuranceBreakdown.employees)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(results.ausn8.insurance)}
                    <span className="text-xs ml-1">(травматизм)</span>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(results.ausn20.insurance)}
                    <span className="text-xs ml-1">(травматизм)</span>
                  </TableCell>
                </TableRow>
              )}

              {/* Итого */}
              <TableRow className="font-bold border-t-2">
                <TableCell>ИТОГО К УПЛАТЕ</TableCell>
                <TableCell className={`text-right ${getBestClass('current')}`}>
                  {formatCurrency(results.current.total)}
                </TableCell>
                <TableCell className={`text-right ${getBestClass('ausn8')}`}>
                  {formatCurrency(results.ausn8.total)}
                </TableCell>
                <TableCell className={`text-right ${getBestClass('ausn20')}`}>
                  {formatCurrency(results.ausn20.total)}
                </TableCell>
              </TableRow>

              {/* Экономия */}
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Экономия/Переплата</TableCell>
                <TableCell className="text-right text-gray-400">—</TableCell>
                <TableCell className={`text-right font-semibold ${
                  results.ausn8.savings > 0 ? 'text-green-600' : 
                  results.ausn8.savings < 0 ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {results.ausn8.savings > 0 && '−'}
                  {results.ausn8.savings < 0 && '+'}
                  {formatCurrency(Math.abs(results.ausn8.savings))}
                  <div className="text-xs font-normal">
                    ({results.ausn8.savingsPercent > 0 ? '+' : ''}{results.ausn8.savingsPercent.toFixed(1)}%)
                  </div>
                </TableCell>
                <TableCell className={`text-right font-semibold ${
                  results.ausn20.savings > 0 ? 'text-green-600' : 
                  results.ausn20.savings < 0 ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {results.ausn20.savings > 0 && '−'}
                  {results.ausn20.savings < 0 && '+'}
                  {formatCurrency(Math.abs(results.ausn20.savings))}
                  <div className="text-xs font-normal">
                    ({results.ausn20.savingsPercent > 0 ? '+' : ''}{results.ausn20.savingsPercent.toFixed(1)}%)
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Примечания */}
        <div className="mt-6 space-y-2 text-sm text-muted-foreground">
          <p className="font-medium">Примечания:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Расчеты являются приблизительными и могут отличаться от фактических</li>
            <li>Для АУСН учитываются только взносы на травматизм (0,2% от ФОТ)</li>
            <li>Для точного расчета рекомендуем проконсультироваться со специалистом</li>
          </ul>
        </div>
        </CardContent>
      )}
    </Card>
  )
}

