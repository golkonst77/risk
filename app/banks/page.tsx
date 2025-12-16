"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, CheckCircle2, Calendar, Info, ChevronDown } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Bank {
  inn: string
  ogrn: string
  name: string
  dateAdded: string
}

interface BanksData {
  version: string
  lastUpdate: string
  source: string
  count: number
  data: Bank[]
}

export default function BanksPage() {
  const [banksData, setBanksData] = useState<BanksData | null>(null)
  const [loading, setLoading] = useState(true)
  const [openFaqItems, setOpenFaqItems] = useState<number[]>([])

  const toggleFaqItem = (index: number) => {
    setOpenFaqItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const pathname = typeof window !== "undefined" ? (window.location.pathname || "") : ""
        const basePath = pathname.startsWith("/ausn") ? "/ausn" : ""
        const response = await fetch(`${basePath}/data/banks.json?v=${Date.now()}`)
        const data = await response.json()
        setBanksData(data)
      } catch (error) {
        console.error("Ошибка загрузки банков:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBanks()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка списка банков...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Официальный список ФНС
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Уполномоченные банки для АУСН
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Полный перечень кредитных организаций, через которые можно применять автоматизированную упрощённую систему налогообложения
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span>{banksData?.count || 0} банков</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Обновлено: {banksData?.version || "..."}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Данные с nalog.gov.ru</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Alert */}
      <section className="container mx-auto px-4 -mt-8">
        <Alert className="max-w-4xl mx-auto bg-white shadow-lg">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Важно:</strong> Для применения АУСН необходимо открыть расчётный счёт в одном из уполномоченных банков. 
            Список банков актуализируется автоматически с официального портала ФНС каждую неделю.
          </AlertDescription>
        </Alert>
      </section>

      {/* Banks List */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {banksData?.data.map((bank, index) => (
              <Card 
                key={bank.inn} 
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.3)' }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 bg-white/80 border-blue-300">
                        #{index + 1}
                      </Badge>
                      <CardTitle className="text-lg leading-tight text-gray-800">
                        {bank.name}
                      </CardTitle>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-600 flex-shrink-0 ml-2" />
                  </div>
                  <CardDescription className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="h-3 w-3" />
                    В реестре с {bank.dateAdded}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ИНН:</span>
                      <span className="font-mono font-medium">{bank.inn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ОГРН:</span>
                      <span className="font-mono text-xs font-medium">{bank.ogrn}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-4">
              <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaqItem(0)}
                    className="w-full text-left p-4 md:p-6 flex items-start justify-between hover:bg-gray-50 transition-colors duration-200 group rounded-t-xl"
                  >
                    <span className="text-base md:text-lg font-medium text-gray-900 pr-4 leading-relaxed flex-1">
                      Обязательно ли открывать новый счёт для АУСН?
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:text-blue-600 ${
                        openFaqItems.includes(0) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFaqItems.includes(0) && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6 py-4 md:py-6 rounded-b-xl">
                      <p className="text-white leading-relaxed text-sm md:text-base">
                        Да, для применения АУСН необходимо иметь расчётный счёт в одном из уполномоченных банков. 
                        Если у вас уже есть счёт в банке из списка, можно использовать его.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaqItem(1)}
                    className="w-full text-left p-4 md:p-6 flex items-start justify-between hover:bg-gray-50 transition-colors duration-200 group rounded-t-xl"
                  >
                    <span className="text-base md:text-lg font-medium text-gray-900 pr-4 leading-relaxed flex-1">
                      Можно ли работать с несколькими банками?
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:text-blue-600 ${
                        openFaqItems.includes(1) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFaqItems.includes(1) && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6 py-4 md:py-6 rounded-b-xl">
                      <p className="text-white leading-relaxed text-sm md:text-base">
                        Нет, для применения АУСН все операции должны проходить через один расчётный счёт в уполномоченном банке.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaqItem(2)}
                    className="w-full text-left p-4 md:p-6 flex items-start justify-between hover:bg-gray-50 transition-colors duration-200 group rounded-t-xl"
                  >
                    <span className="text-base md:text-lg font-medium text-gray-900 pr-4 leading-relaxed flex-1">
                      Что делать, если моего банка нет в списке?
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:text-blue-600 ${
                        openFaqItems.includes(2) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFaqItems.includes(2) && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6 py-4 md:py-6 rounded-b-xl">
                      <p className="text-white leading-relaxed text-sm md:text-base">
                        Вам потребуется открыть счёт в одном из уполномоченных банков. Выбирайте банк с удобными условиями обслуживания и тарифами для вашего бизнеса.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                Нужна помощь с переходом на АУСН?
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Поможем выбрать банк, рассчитать налоги и подготовить документы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#calculator"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Рассчитать налог
                </a>
                <a
                  href="tel:+79533301777"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Получить консультацию
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
