"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Building2, AlertTriangle } from "lucide-react"

export function ForWhom() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Кому подойдут эти калькуляторы
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="border-2 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Предпринимателям и ИП</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700">
                Если доход приближается к 20 млн ₽, есть несколько ИП/ООО или самозанятые
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Бизнесу с персоналом</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700">
                Если часть работы выполняют самозанятые или аутсорс
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Тем, у кого уже были вопросы ФНС</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700">
                Требования, пояснения, проверки — лучше проверить риски заранее
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

