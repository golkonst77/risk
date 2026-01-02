"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, FileCheck, ArrowRight } from "lucide-react"
import { useCruiseClick } from "@/hooks/use-cruise-click"

export function NextSteps() {
  const { handleCruiseClick } = useCruiseClick()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="border-0 bg-white/10 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
              Если риск высокий — мы поможем
            </CardTitle>
            <CardDescription className="text-lg text-blue-100">
              Калькулятор показывает риск, но не заменяет анализ документов.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">30 минут</span>
              </div>
              <div className="hidden sm:block text-blue-200">•</div>
              <div className="flex items-center gap-2 text-blue-100">
                <FileCheck className="h-5 w-5" />
                <span className="font-semibold">разбор вашей ситуации</span>
              </div>
              <div className="hidden sm:block text-blue-200">•</div>
              <div className="text-blue-100 font-semibold">
                конкретные шаги
              </div>
            </div>

            <Button
              onClick={handleCruiseClick}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
            >
              Получить консультацию эксперта
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

