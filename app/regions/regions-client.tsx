"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, CheckCircle2, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useContactForm } from "@/hooks/use-contact-form"

interface Region {
  code: string
  name: string
}

interface RegionsData {
  version: string
  lastUpdate: string
  source: string
  count: number
  data: Region[]
}

export default function RegionsClient() {
  const [regionsData, setRegionsData] = useState<RegionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const { openContactForm } = useContactForm()

  useEffect(() => {
    async function fetchRegions() {
      try {
        const response = await fetch(`/data/regions.json?v=${Date.now()}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setRegionsData(data)
      } catch (error) {
        console.error("Ошибка загрузки данных регионов:", error)
        setRegionsData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchRegions()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Загрузка списка регионов...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/uploads/hero-bg-regions.jpg')" }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Badge className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full mb-4 text-sm font-semibold">
            Актуально на {regionsData?.lastUpdate ? new Date(regionsData.lastUpdate).toLocaleDateString('ru-RU') : 'неизвестно'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Регионы применения АУСН
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Полный список из {regionsData?.count || 0} субъектов РФ, где действует автоматизированная упрощённая система налогообложения
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/#calculator" passHref>
              <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-all duration-300 px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
                Рассчитать налог
              </Button>
            </Link>
            <Button onClick={openContactForm} className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
              Получить консультацию
            </Button>
          </div>
        </div>
      </section>

      {/* Info Alert */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Alert className="bg-blue-100 border-blue-300 text-blue-900 p-6 rounded-lg shadow-md max-w-5xl mx-auto">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertDescription className="ml-2">
              <p className="font-semibold text-lg mb-2">Важная информация:</p>
              <p>Эксперимент по применению АУСН проводится с 1 июля 2022 года до 31 декабря 2027 года. Список регионов актуализируется автоматически с официального сайта ФНС России.</p>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Regions List */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Список регионов с кодами субъектов РФ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {regionsData?.data.map((region, index) => (
                <Card 
                  key={region.code} 
                  className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 rounded-lg"
                >
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{region.code}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-base leading-relaxed">
                        {region.name}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
              Статистика по регионам
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-center p-6">
                <CardContent className="p-0">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-3xl font-bold text-blue-700">{regionsData?.count || 0}</p>
                  <p className="text-sm text-gray-600 mt-1">Всего регионов</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-center p-6">
                <CardContent className="p-0">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-3xl font-bold text-green-700">20</p>
                  <p className="text-sm text-gray-600 mt-1">Республик</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-center p-6">
                <CardContent className="p-0">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-3xl font-bold text-purple-700">6</p>
                  <p className="text-sm text-gray-600 mt-1">Краёв</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-center p-6">
                <CardContent className="p-0">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-3xl font-bold text-orange-700">39</p>
                  <p className="text-sm text-gray-600 mt-1">Областей</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ваш регион в списке?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Начните использовать АУСН уже сегодня! Рассчитайте налог и узнайте о выгодах перехода.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/#calculator" passHref>
              <Button className="bg-white text-green-700 hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
                Калькулятор АУСН
              </Button>
            </Link>
            <Link href="/banks" passHref>
              <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-green-700 transition-colors px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
                Выбрать банк
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

