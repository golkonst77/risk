"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, Building2, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CalculatorFormData, BusinessType, TaxSystem } from "./types"
import { AUSN_CONFIG } from "./calculator-config"

interface CalculatorFormProps {
  onSubmit: (data: CalculatorFormData) => void
  initialData?: Partial<CalculatorFormData>
}

export function CalculatorForm({ onSubmit, initialData }: CalculatorFormProps) {
  const [formData, setFormData] = useState<CalculatorFormData>({
    businessType: initialData?.businessType || 'IP',
    currentTaxSystem: initialData?.currentTaxSystem || 'USN_INCOME',
    revenue: initialData?.revenue || 0,
    expenses: initialData?.expenses || 0,
    employees: initialData?.employees || 0,
    avgSalary: initialData?.avgSalary || 0,
    confirmedEligibility: initialData?.confirmedEligibility || false,
    region: initialData?.region || 'Калужская область',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showValidation, setShowValidation] = useState(false)

  // Форматирование числа с пробелами
  const formatNumber = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  // Парсинг числа из строки с пробелами
  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/\s/g, '')) || 0
  }

  // Обработка изменения числового поля
  const handleNumberChange = (field: keyof CalculatorFormData, value: string) => {
    let numValue = parseNumber(value)
    
    // Для доходов, расходов и зарплаты конвертируем тысячи в рубли
    if (field === 'revenue' || field === 'expenses' || field === 'avgSalary') {
      numValue = numValue * 1000
    }
    
    setFormData(prev => ({ ...prev, [field]: numValue }))
    validateField(field, numValue)
  }

  // Валидация отдельного поля
  const validateField = (field: keyof CalculatorFormData, value: any) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'revenue':
        if (value <= 0) {
          newErrors.revenue = 'Доход должен быть больше 0'
        } else if (value > AUSN_CONFIG.limits.maxRevenue) {
          newErrors.revenue = `Доход превышает лимит АУСН (${AUSN_CONFIG.limits.maxRevenue / 1_000_000} млн руб.)`
        } else {
          delete newErrors.revenue
        }
        break

      case 'expenses':
        if (value < 0) {
          newErrors.expenses = 'Расходы не могут быть отрицательными'
        } else if (value > formData.revenue) {
          newErrors.expenses = 'Расходы не могут превышать доходы'
        } else {
          delete newErrors.expenses
        }
        break

      case 'employees':
        if (value < 0) {
          newErrors.employees = 'Количество сотрудников не может быть отрицательным'
        } else if (value > AUSN_CONFIG.limits.maxEmployees) {
          newErrors.employees = `Количество сотрудников превышает лимит АУСН (${AUSN_CONFIG.limits.maxEmployees} чел.)`
        } else {
          delete newErrors.employees
        }
        break

      case 'avgSalary':
        if (formData.employees > 0 && value <= 0) {
          newErrors.avgSalary = 'Укажите среднюю зарплату сотрудника'
        } else {
          delete newErrors.avgSalary
        }
        break
    }

    setErrors(newErrors)
  }

  // Валидация всей формы
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (formData.revenue <= 0) {
      newErrors.revenue = 'Доход должен быть больше 0'
    }
    if (formData.revenue > AUSN_CONFIG.limits.maxRevenue) {
      newErrors.revenue = `Доход превышает лимит АУСН (${AUSN_CONFIG.limits.maxRevenue / 1_000_000} млн руб.)`
    }
    if (formData.expenses < 0) {
      newErrors.expenses = 'Расходы не могут быть отрицательными'
    }
    if (formData.expenses > formData.revenue) {
      newErrors.expenses = 'Расходы не могут превышать доходы'
    }
    if (formData.employees < 0) {
      newErrors.employees = 'Количество сотрудников не может быть отрицательным'
    }
    if (formData.employees > AUSN_CONFIG.limits.maxEmployees) {
      newErrors.employees = `Количество сотрудников превышает лимит АУСН (${AUSN_CONFIG.limits.maxEmployees} чел.)`
    }
    if (formData.employees > 0 && formData.avgSalary <= 0) {
      newErrors.avgSalary = 'Укажите среднюю зарплату сотрудника'
    }
    if (!formData.confirmedEligibility) {
      newErrors.confirmedEligibility = 'Подтвердите право на переход на АУСН'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Обработка отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowValidation(true)

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const getTaxSystemName = (system: TaxSystem): string => {
    switch (system) {
      case 'USN_INCOME': return 'УСН "Доходы" (6%)'
      case 'USN_INCOME_EXPENSES': return 'УСН "Доходы минус расходы" (15%)'
      case 'OSNO': return 'ОСНО'
      default: return system
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Основные данные</CardTitle>
          <CardDescription>
            Заполните информацию о вашем бизнесе для расчета
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Тип бизнеса */}
          <div className="space-y-3">
            <Label>Тип бизнеса</Label>
            <RadioGroup
              value={formData.businessType}
              onValueChange={(value: BusinessType) =>
                setFormData(prev => ({ ...prev, businessType: value }))
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="IP" id="ip" />
                <Label htmlFor="ip" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Индивидуальный предприниматель (ИП)
                </Label>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value="OOO" id="ooo" />
                <Label htmlFor="ooo" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="h-4 w-4" />
                  Общество с ограниченной ответственностью (ООО)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Текущая система налогообложения */}
          <div className="space-y-2">
            <Label htmlFor="taxSystem">Текущая система налогообложения</Label>
            <Select
              value={formData.currentTaxSystem}
              onValueChange={(value: TaxSystem) =>
                setFormData(prev => ({ ...prev, currentTaxSystem: value }))
              }
            >
              <SelectTrigger id="taxSystem">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USN_INCOME">{getTaxSystemName('USN_INCOME')}</SelectItem>
                <SelectItem value="USN_INCOME_EXPENSES">{getTaxSystemName('USN_INCOME_EXPENSES')}</SelectItem>
                <SelectItem value="OSNO">{getTaxSystemName('OSNO')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Годовой доход */}
          <div className="space-y-2">
            <Label htmlFor="revenue">Годовой доход (оборот), тыс. руб.</Label>
            <Input
              id="revenue"
              type="text"
              value={formData.revenue > 0 ? formatNumber(formData.revenue / 1000) : ''}
              onChange={(e) => handleNumberChange('revenue', e.target.value)}
              placeholder="Например: 5 000"
              className={errors.revenue ? 'border-red-500' : ''}
            />
            {errors.revenue && showValidation && (
              <p className="text-sm text-red-500">{errors.revenue}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {formData.revenue > 0 && `Итого: ${formatNumber(formData.revenue)} руб.`}
            </p>
          </div>

          {/* Годовые расходы */}
          <div className="space-y-2">
            <Label htmlFor="expenses">Годовые расходы, тыс. руб.</Label>
            <Input
              id="expenses"
              type="text"
              value={formData.expenses > 0 ? formatNumber(formData.expenses / 1000) : ''}
              onChange={(e) => handleNumberChange('expenses', e.target.value)}
              placeholder="Например: 2 000"
              className={errors.expenses ? 'border-red-500' : ''}
            />
            {errors.expenses && showValidation && (
              <p className="text-sm text-red-500">{errors.expenses}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {formData.expenses > 0 && `Итого: ${formatNumber(formData.expenses)} руб. | `}
              Учитываются для расчета УСН 15% и ОСНО
            </p>
          </div>

          {/* Количество сотрудников */}
          <div className="space-y-2">
            <Label htmlFor="employees">Количество сотрудников</Label>
            <Input
              id="employees"
              type="number"
              min="0"
              max="999"
              value={formData.employees || ''}
              onChange={(e) => handleNumberChange('employees', e.target.value)}
              placeholder="0"
              className={errors.employees ? 'border-red-500' : ''}
            />
            {errors.employees && showValidation && (
              <p className="text-sm text-red-500">{errors.employees}</p>
            )}
          </div>

          {/* Средняя зарплата */}
          {formData.employees > 0 && (
            <div className="space-y-2">
              <Label htmlFor="avgSalary">Средняя зарплата сотрудника (в месяц), тыс. руб.</Label>
              <Input
                id="avgSalary"
                type="text"
                value={formData.avgSalary > 0 ? formatNumber(formData.avgSalary / 1000) : ''}
                onChange={(e) => handleNumberChange('avgSalary', e.target.value)}
                placeholder="Например: 50"
                className={errors.avgSalary ? 'border-red-500' : ''}
              />
              {errors.avgSalary && showValidation && (
                <p className="text-sm text-red-500">{errors.avgSalary}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {formData.avgSalary > 0 && `${formatNumber(formData.avgSalary)} руб./мес.`}
              </p>
            </div>
          )}

          {/* Подтверждение права на АУСН */}
          <div className="space-y-3">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="font-medium mb-2">Проверьте соответствие требованиям АУСН:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Годовой доход ≤ 60 млн руб.</li>
                  <li>Количество сотрудников ≤ 5 человек</li>
                  <li>Регион входит в список пилотных (Москва, МО, Калужская обл. и др.)</li>
                  <li>Ваш вид деятельности не запрещен для АУСН</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmedEligibility"
                checked={formData.confirmedEligibility}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, confirmedEligibility: checked === true }))
                }
              />
              <Label
                htmlFor="confirmedEligibility"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Я проверил, что имею право перейти на АУСН
              </Label>
            </div>
            {errors.confirmedEligibility && showValidation && (
              <p className="text-sm text-red-500">{errors.confirmedEligibility}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Кнопка отправки */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="min-w-[200px]">
          Рассчитать налоги
        </Button>
      </div>
    </form>
  )
}

