"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
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
  onChange?: (data: CalculatorFormData) => void
}

export function CalculatorForm({ onSubmit, initialData, onChange }: CalculatorFormProps) {
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
  const [regions, setRegions] = useState<Array<{ code: string; name: string }>>([])

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const res = await fetch(`/data/regions.json?v=${Date.now()}`)
        if (res.ok) {
          const json = await res.json()
          if (Array.isArray(json?.data)) setRegions(json.data)
        }
      } catch {}
    }
    loadRegions()
  }, [])

  // Форматирование числа с пробелами (в рублях)
  const formatNumber = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  // Парсинг числа из строки с пробелами
  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/\s/g, '')) || 0
  }

  // Универсальный апдейтер локального state + оповещение родителя
  const applyFormUpdate = (next: CalculatorFormData) => {
    setFormData(next)
    if (onChange) onChange(next)
  }

  // Обработка изменения числового поля (в рублях)
  const handleNumberChange = (field: keyof CalculatorFormData, value: string) => {
    let numValue = parseNumber(value)
    
    if (field === 'revenue') {
      // При изменении дохода ограничиваем расходы сверху новым доходом
      let clampedExpenses = 0
      applyFormUpdate(({...formData, revenue: numValue, expenses: (clampedExpenses = Math.min(formData.expenses, numValue))}))
      validateField('revenue', numValue)
      validateField('expenses', clampedExpenses)
    } else {
      applyFormUpdate({ ...formData, [field]: numValue } as CalculatorFormData)
      validateField(field, numValue)
    }
  }

  // Обработка изменения через слайдер (значение в рублях или целое)
  const handleSliderChange = (field: keyof CalculatorFormData, values: number[]) => {
    const numValue = values[0]
    if (field === 'revenue') {
      let clampedExpenses = 0
      applyFormUpdate({ ...formData, revenue: numValue, expenses: (clampedExpenses = Math.min(formData.expenses, numValue)) })
      validateField('revenue', numValue)
      validateField('expenses', clampedExpenses)
    } else {
      applyFormUpdate({ ...formData, [field]: numValue } as CalculatorFormData)
      validateField(field, numValue)
    }
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
          {/* Тип бизнеса */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">Тип бизнеса</Label>
            <RadioGroup
              value={formData.businessType}
              onValueChange={(value: BusinessType) =>
                setFormData(prev => ({ ...prev, businessType: value }))
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.businessType === 'IP' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}>
                <RadioGroupItem value="IP" id="ip" />
                <Label htmlFor="ip" className="flex items-center gap-2 cursor-pointer flex-1">
                  <User className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Индивидуальный предприниматель (ИП)</span>
                </Label>
              </div>
              <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.businessType === 'OOO' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}>
                <RadioGroupItem value="OOO" id="ooo" />
                <Label htmlFor="ooo" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Общество с ограниченной ответственностью (ООО)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Текущая система налогообложения */}
          <div className="space-y-3">
            <Label>Текущая система налогообложения</Label>
            <RadioGroup
              value={formData.currentTaxSystem}
              onValueChange={(value: TaxSystem) =>
                applyFormUpdate({ ...formData, currentTaxSystem: value })
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.currentTaxSystem === 'USN_INCOME' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}>
                <RadioGroupItem value="USN_INCOME" id="ts_usn6" />
                <Label htmlFor="ts_usn6" className="cursor-pointer flex-1">
                  УСН "Доходы" (6%)
                </Label>
              </div>

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.currentTaxSystem === 'USN_INCOME_EXPENSES' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}>
                <RadioGroupItem value="USN_INCOME_EXPENSES" id="ts_usn15" />
                <Label htmlFor="ts_usn15" className="cursor-pointer flex-1">
                  УСН "Доходы минус расходы" (15%)
                </Label>
              </div>

              <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.currentTaxSystem === 'OSNO' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}>
                <RadioGroupItem value="OSNO" id="ts_osno" />
                <Label htmlFor="ts_osno" className="cursor-pointer flex-1">
                  ОСНО
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Годовой доход */}
          <div className="space-y-2">
            <Label htmlFor="revenue">Годовой доход (оборот), руб.</Label>
            <Input
              id="revenue"
              type="text"
              value={formData.revenue > 0 ? formatNumber(formData.revenue) : ''}
              onChange={(e) => handleNumberChange('revenue', e.target.value)}
              placeholder="Например: 5 000 000"
              className={errors.revenue ? 'border-red-500' : ''}
            />
            <div className="pt-1">
              <Slider
                value={[Math.min(formData.revenue, AUSN_CONFIG.limits.maxRevenue)]}
                min={0}
                max={AUSN_CONFIG.limits.maxRevenue}
                step={100_000}
                onValueChange={(v) => handleSliderChange('revenue', v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>60 000 000</span>
              </div>
            </div>
            {errors.revenue && showValidation && (
              <p className="text-sm text-red-500">{errors.revenue}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {formData.revenue > 0 && `Итого: ${formatNumber(formData.revenue)} руб.`}
            </p>
          </div>

          {/* Годовые расходы */}
          <div className="space-y-2">
            <Label htmlFor="expenses">Годовые расходы, руб.</Label>
            <Input
              id="expenses"
              type="text"
              value={formData.expenses > 0 ? formatNumber(formData.expenses) : ''}
              onChange={(e) => handleNumberChange('expenses', e.target.value)}
              placeholder="Например: 2 000 000"
              className={errors.expenses ? 'border-red-500' : ''}
            />
            <div className="pt-1">
              <Slider
                value={[Math.min(formData.expenses, Math.min(formData.revenue || AUSN_CONFIG.limits.maxRevenue, AUSN_CONFIG.limits.maxRevenue))]}
                min={0}
                max={Math.min(formData.revenue || AUSN_CONFIG.limits.maxRevenue, AUSN_CONFIG.limits.maxRevenue)}
                step={100_000}
                onValueChange={(v) => handleSliderChange('expenses', v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>{formatNumber(Math.min(formData.revenue || AUSN_CONFIG.limits.maxRevenue, AUSN_CONFIG.limits.maxRevenue))}</span>
              </div>
            </div>
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
            <div className="pt-1">
              <Slider
                value={[Math.min(formData.employees, AUSN_CONFIG.limits.maxEmployees)]}
                min={0}
                max={AUSN_CONFIG.limits.maxEmployees}
                step={1}
                onValueChange={(v) => handleSliderChange('employees', v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>{AUSN_CONFIG.limits.maxEmployees}</span>
              </div>
            </div>
            {errors.employees && showValidation && (
              <p className="text-sm text-red-500">{errors.employees}</p>
            )}
          </div>

          {/* Средняя зарплата */}
          {formData.employees > 0 && (
            <div className="space-y-2">
              <Label htmlFor="avgSalary">Средняя зарплата сотрудника (в месяц), руб.</Label>
              <Input
                id="avgSalary"
                type="text"
                value={formData.avgSalary > 0 ? formatNumber(formData.avgSalary) : ''}
                onChange={(e) => handleNumberChange('avgSalary', e.target.value)}
                placeholder="Например: 50 000"
                className={errors.avgSalary ? 'border-red-500' : ''}
              />
              <div className="pt-1">
                <Slider
                  value={[Math.min(formData.avgSalary, 250_000)]}
                  min={0}
                  max={250_000}
                  step={1_000}
                  onValueChange={(v) => handleSliderChange('avgSalary', v)}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span>
                  <span>250 000</span>
                </div>
              </div>
              {errors.avgSalary && showValidation && (
                <p className="text-sm text-red-500">{errors.avgSalary}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {formData.avgSalary > 0 && `${formatNumber(formData.avgSalary)} руб./мес.`}
              </p>
            </div>
          )}

          {/* Регион применения */}
          <div className="space-y-2">
            <Label htmlFor="region">Регион применения</Label>
            <Select
              value={formData.region}
              onValueChange={(value: string) => applyFormUpdate({ ...formData, region: value } as CalculatorFormData)}
            >
              <SelectTrigger id="region">
                <SelectValue placeholder="Выберите регион" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r.code} value={r.name}>{r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Список загружается из `/data/regions.json`</p>
          </div>

          {/* Подтверждение права на АУСН (только чекбокс) */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmedEligibility"
                checked={formData.confirmedEligibility}
                onCheckedChange={(checked) =>
                  applyFormUpdate({ ...formData, confirmedEligibility: checked === true } as CalculatorFormData)
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
      {/* Кнопка отправки */}
      <div className="flex justify-center pt-4">
        <Button 
          type="submit" 
          size="lg" 
          className="min-w-[250px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Рассчитать налоги →
        </Button>
      </div>
    </form>
  )
}

