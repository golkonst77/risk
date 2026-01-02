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
          <CardContent className="text-center px-4 sm:px-6">
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

            <div className="flex justify-center">
              <Button
                onClick={handleCruiseClick}
                size="lg"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-bold text-base sm:text-lg px-4 sm:px-8 py-5 sm:py-6 shadow-xl hover:shadow-2xl transition-all whitespace-normal"
              >
                <span className="text-center">Получить консультацию эксперта</span>
                <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

