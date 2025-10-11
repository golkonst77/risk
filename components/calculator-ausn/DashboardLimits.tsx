"use client"

import { CheckCircle, AlertCircle, MapPin, Users, DollarSign, Briefcase, AlertTriangle } from "lucide-react"
import { DashboardCard } from "./ui/DashboardCard"
import { AUSN_CONFIG } from "./calculator-config"
import { formatCurrency } from "./dashboard-theme"
import type { EligibilityCheck } from "./types"

interface DashboardLimitsProps {
  eligibility?: EligibilityCheck | null
  revenue: number
  employees: number
  expenses?: number
  region?: string
}

export function DashboardLimits({ eligibility, revenue, employees, expenses = 0, region }: DashboardLimitsProps) {
  const revenueLeft = Math.max(AUSN_CONFIG.limits.maxRevenue - revenue, 0)
  const employeesLeft = Math.max(AUSN_CONFIG.limits.maxEmployees - employees, 0)

  const kpis = [
    {
      id: 'revenue',
      icon: DollarSign,
      label: 'Годовой доход',
      value: formatCurrency(revenue),
      hint: `До лимита осталось ${formatCurrency(revenueLeft)}`,
    },
    {
      id: 'expenses',
      icon: Briefcase,
      label: 'Годовые расходы',
      value: formatCurrency(expenses),
      hint: expenses > revenue ? 'Расходы не могут превышать доход' : undefined,
    },
    {
      id: 'employees',
      icon: Users,
      label: 'Сотрудники',
      value: `${employees} чел.`,
      hint: employeesLeft > 0 ? `Можно нанять ещё ${employeesLeft} чел.` : undefined,
    },
    {
      id: 'region',
      icon: MapPin,
      label: 'Регион',
      value: region || 'Не указан',
      hint: eligibility?.errors?.some((e: string) => e.includes('Регион')) ? 'Регион вне пилота' : undefined,
    },
  ]

  const advices: { icon: JSX.Element; text: string; tone: 'ok' | 'warn' }[] = []

  if (revenueLeft <= 5_000_000) {
    advices.push({ icon: <AlertTriangle className="h-4 w-4 text-orange-600" />, text: `До лимита по доходу осталось ${formatCurrency(revenueLeft)}. Планируйте рост.`, tone: 'warn' })
  }
  if (employees >= AUSN_CONFIG.limits.maxEmployees) {
    advices.push({ icon: <AlertTriangle className="h-4 w-4 text-orange-600" />, text: 'Достигнут лимит по сотрудникам (5).', tone: 'warn' })
  } else {
    advices.push({ icon: <CheckCircle className="h-4 w-4 text-green-600" />, text: `До лимита сотрудников осталось ${employeesLeft}.`, tone: 'ok' })
  }
  if (eligibility && !eligibility.eligible && eligibility.errors) {
    eligibility.errors.forEach((i: string) => advices.push({ icon: <AlertTriangle className="h-4 w-4 text-orange-600" />, text: i, tone: 'warn' }))
  }

  return (
    <DashboardCard
      title="Сводка"
      description="Ключевые показатели и советы"
      gradient="primary"
      className="h-full"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {kpis.map(k => (
            <div key={k.id} className="p-4 rounded-xl border border-slate-200 bg-white/70 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <k.icon className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">{k.label}</div>
                  <div className="text-base font-semibold text-gray-900">{k.value}</div>
                  {k.hint && <div className="text-xs text-gray-500 mt-0.5">{k.hint}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <div className="text-sm font-semibold text-gray-900 mb-2">Советы</div>
          <ul className="space-y-2">
            {advices.length === 0 ? (
              <li className="text-sm text-gray-600 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" />Показатели в норме</li>
            ) : (
              advices.map((a, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">{a.icon}{a.text}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </DashboardCard>
  )
}

