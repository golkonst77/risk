"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react"
import { blockConfig } from "./config"
import { useRiskCalculator } from "@/hooks/useRiskCalculator"

interface RiskCalculatorResultsProps {
  answers: Record<string, number>
  onReset: () => void
}

const riskLevelConfig = {
  low: {
    label: "Низкий",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: CheckCircle2,
    description: "Ваша структура выглядит безопасной. Риск признания дробления минимален."
  },
  medium: {
    label: "Средний",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: AlertTriangle,
    description: "Есть некоторые признаки, которые могут привлечь внимание налоговой. Рекомендуется пересмотреть структуру."
  },
  elevated: {
    label: "Повышенный",
    color: "bg-orange-500",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    icon: AlertCircle,
    description: "Высокий риск признания дробления. Необходимо срочно принять меры по легитимизации структуры."
  },
  high: {
    label: "Высокий",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: XCircle,
    description: "Критический риск. Структура с высокой вероятностью будет признана искусственным дроблением."
  },
  critical: {
    label: "Критический",
    color: "bg-red-700",
    textColor: "text-red-900",
    bgColor: "bg-red-100",
    borderColor: "border-red-300",
    icon: XCircle,
    description: "Экстремально высокий риск. Немедленно требуется консультация специалиста и пересмотр структуры."
  }
}

export function RiskCalculatorResults({ answers, onReset }: RiskCalculatorResultsProps) {
  const result = useRiskCalculator(answers)
  const config = riskLevelConfig[result.riskLevel]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      {/* Основной результат */}
      <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className={`h-8 w-8 ${config.textColor}`} />
              <div>
                <CardTitle className={`text-2xl ${config.textColor}`}>
                  Уровень риска: {config.label}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {config.description}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className={`text-lg px-4 py-2 ${config.textColor} ${config.borderColor}`}>
              {result.totalPercent}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Уровень риска</span>
              <span className="font-semibold">{result.totalPercent}%</span>
            </div>
            <Progress 
              value={result.totalPercent} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Детализация по блокам */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Детализация по блокам
          </CardTitle>
          <CardDescription>
            Оценка риска по каждому критерию
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(result.blocks).map(([blockId, score]) => {
              const block = blockConfig[Number(blockId)]
              const maxScore = block.max
              const percent = Math.min(100, Math.round((score / maxScore) * 100))

              return (
                <div key={blockId} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{block.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {score} / {maxScore} ({percent}%)
                    </span>
                  </div>
                  <Progress value={percent} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Рекомендации */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Рекомендации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.riskLevel === "low" && (
              <>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-lg md:text-xl font-bold text-green-800">✅ Продолжайте поддерживать текущую структуру бизнеса.</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-lg md:text-xl font-bold text-green-800">✅ Убедитесь, что все договоры и документы соответствуют реальной деятельности.</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-lg md:text-xl font-bold text-green-800">✅ Регулярно отслеживайте изменения в законодательстве.</p>
                </div>
              </>
            )}
            {result.riskLevel === "medium" && (
              <>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-lg md:text-xl font-bold text-yellow-800">⚠️ Рекомендуется провести аудит структуры бизнеса.</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-lg md:text-xl font-bold text-yellow-800">⚠️ Усильте разделение между компаниями (офисы, персонал, клиенты).</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-lg md:text-xl font-bold text-yellow-800">⚠️ Убедитесь, что все договоры оформлены корректно.</p>
                </div>
              </>
            )}
            {(result.riskLevel === "elevated" || result.riskLevel === "high" || result.riskLevel === "critical") && (
              <>
                <div className="p-5 rounded-lg bg-red-50 border-2 border-red-300 shadow-sm">
                  <p className="text-xl md:text-2xl font-bold text-red-800">🚨 Немедленно обратитесь к налоговому консультанту.</p>
                </div>
                <div className="p-5 rounded-lg bg-red-50 border-2 border-red-300 shadow-sm">
                  <p className="text-xl md:text-2xl font-bold text-red-800">🚨 Рассмотрите возможность консолидации бизнеса.</p>
                </div>
                <div className="p-5 rounded-lg bg-red-50 border-2 border-red-300 shadow-sm">
                  <p className="text-xl md:text-2xl font-bold text-red-800">🚨 Подготовьте документы, подтверждающие реальное разделение бизнеса.</p>
                </div>
                <div className="p-5 rounded-lg bg-red-50 border-2 border-red-300 shadow-sm">
                  <p className="text-xl md:text-2xl font-bold text-red-800">🚨 Проведите внутренний аудит всех операций между компаниями.</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Кнопка нового расчета */}
      <div className="flex justify-center">
        <Button onClick={onReset} variant="outline" size="lg">
          Сделать новый расчет
        </Button>
      </div>
    </div>
  )
}

