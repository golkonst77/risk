"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, BarChart3, Lightbulb } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Как работает диагностика
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <CardTitle className="text-xl">Отвечаете на вопросы</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                12–13 простых вопросов, без сложных терминов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <CardTitle className="text-xl">Получаете результат</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Процент риска + разбор, где именно проблема
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <CardTitle className="text-xl">Понимаете, что делать</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Ничего / исправить / срочно действовать
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

