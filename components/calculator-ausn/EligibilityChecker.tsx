"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react"
import type { EligibilityCheck } from "./types"
import { AUSN_CONFIG } from "./calculator-config"

interface EligibilityCheckerProps {
  eligibility: EligibilityCheck
  revenue: number
  employees: number
}

export function EligibilityChecker({ eligibility, revenue, employees }: EligibilityCheckerProps) {
  // Проверки соответствия
  const checks = [
    {
      label: 'Годовой доход',
      passed: revenue <= AUSN_CONFIG.limits.maxRevenue,
      current: `${(revenue / 1_000_000).toFixed(1)} млн руб.`,
      limit: `≤ ${AUSN_CONFIG.limits.maxRevenue / 1_000_000} млн руб.`,
      description: 'Доход не должен превышать установленный лимит'
    },
    {
      label: 'Количество сотрудников',
      passed: employees <= AUSN_CONFIG.limits.maxEmployees,
      current: `${employees} чел.`,
      limit: `≤ ${AUSN_CONFIG.limits.maxEmployees} чел.`,
      description: 'Штат сотрудников не должен превышать установленный лимит'
    },
  ]

  if (!eligibility.eligible) {
    return (
      <Alert variant="destructive" className="mb-6">
        <XCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">
          Обнаружены ограничения для перехода на АУСН
        </AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">
            К сожалению, по введенным данным ваш бизнес не соответствует требованиям АУСН:
          </p>
          <ul className="list-disc list-inside space-y-1">
            {eligibility.errors.map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            Вы можете рассмотреть другие налоговые режимы или скорректировать параметры бизнеса для соответствия требованиям.
          </p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <span>Проверка соответствия АУСН</span>
          <Badge className="bg-green-500 text-white ml-auto">Пройдена</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Список проверок */}
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200"
            >
              <div className="flex-shrink-0 mt-0.5">
                {check.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-medium text-sm">{check.label}</p>
                  <Badge
                    variant={check.passed ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {check.passed ? 'Соответствует' : 'Превышен лимит'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {check.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    Текущее: <span className="font-semibold">{check.current}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Лимит: <span className="font-medium">{check.limit}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Предупреждения */}
        {eligibility.warnings && eligibility.warnings.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Обратите внимание</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                {eligibility.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Дополнительная информация */}
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm">
            <p className="font-medium mb-2">Дополнительные требования АУСН:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
              <li>Регион должен входить в список пилотных (Москва, МО, Калуга, Нижний Новгород, Татарстан, Сахалин)</li>
              <li>Вид деятельности не должен быть запрещен для АУСН</li>
              <li>Остаточная стоимость основных средств ≤ 150 млн руб.</li>
              <li>Работа только с уполномоченными банками</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Список уполномоченных банков */}
        <div className="pt-2">
          <p className="text-sm font-medium mb-3">Уполномоченные банки для АУСН:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {AUSN_CONFIG.authorizedBanks.map((bank, index) => (
              <a
                key={index}
                href={bank.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 bg-white rounded border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors text-sm font-medium text-center"
              >
                {bank.name}
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

