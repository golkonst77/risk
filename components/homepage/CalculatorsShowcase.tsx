"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Users, CheckCircle2, Link2, DollarSign, UserCheck, TrendingUp, FileText } from "lucide-react"
import Link from "next/link"

export function CalculatorsShowcase() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Выберите калькулятор
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Калькулятор дробления */}
          <Card className="border-2 border-red-200 hover:border-red-400 hover:shadow-2xl transition-all">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-red-900">Риск дробления бизнеса</CardTitle>
                  <CardDescription className="text-base text-red-700 mt-1">
                    Вероятность переквалификации структуры
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-6 text-lg">
                Показывает вероятность того, что ФНС переквалифицирует вашу структуру и доначислит НДС и налоги
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Лимит 20 млн ₽</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Связанные лица</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Общие клиенты и деньги</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Фактический контроль</span>
                </div>
              </div>

              <Link href="/calculator">
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold py-6"
                  size="lg"
                >
                  Пройти тест (2–3 минуты)
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Калькулятор самозанятых */}
          <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-blue-900">Риск переквалификации самозанятых</CardTitle>
                  <CardDescription className="text-base text-blue-700 mt-1">
                    Вероятность признания сотрудниками
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-6 text-lg">
                Показывает вероятность того, что ФНС признает самозанятых вашими сотрудниками
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Признаки трудовых отношений</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Эксклюзивность</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Регулярность выплат</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Контроль и подчинённость</span>
                </div>
              </div>

              <Link href="/calculator-self-employed">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-bold py-6"
                  size="lg"
                >
                  Пройти тест (2–3 минуты)
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

