"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Scale, FileText, Shield } from "lucide-react"

export function TrustBlock() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Почему этому можно доверять
        </h2>

        <div className="space-y-6 mb-8">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Основано на судебной практике и актах ФНС</h3>
                  <p className="text-gray-600">
                    Критерии оценки взяты из реальных решений судов и официальных разъяснений налоговой службы
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Используются реальные критерии проверок</h3>
                  <p className="text-gray-600">
                    Калькулятор учитывает те же признаки, на которые обращает внимание ФНС при проверках
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Мы не продаём «страшилки», а показываем риск</h3>
                  <p className="text-gray-600">
                    Объективная оценка без нагнетания. Вы получаете реальную картину рисков вашей структуры
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            Результаты калькуляторов носят информационный характер и не являются юридическим заключением
          </p>
        </div>
      </div>
    </section>
  )
}

