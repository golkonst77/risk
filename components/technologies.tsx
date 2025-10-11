"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Building2, FileText, Send, Briefcase, BarChart3, Activity, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const instructions = [
  {
    id: 1,
    icon: CheckCircle,
    title: "Проверьте право на АУСН",
    description: "Быстрый чек-лист, подходите ли вы по критериям — регион, доход, численность, деятельность.",
    linkText: "Перейти к чек-листу",
    linkHref: "/#calculator",
    gradient: "from-green-600 to-emerald-600"
  },
  {
    id: 2,
    icon: Building2,
    title: "Выберите уполномоченный банк",
    description: "Откройте расчётный счёт для работы на АУСН. Смотрите наш актуальный список банков и условий.",
    linkText: "Список банков для АУСН",
    linkHref: "/#banks",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    id: 3,
    icon: FileText,
    title: "Подготовьте документы",
    description: "Скачайте шаблоны заявления и других нужных форм. Следуйте инструкциям по заполнению.",
    linkText: "Скачать шаблоны",
    linkHref: "/#faq",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    id: 4,
    icon: Send,
    title: "Подайте заявление",
    description: "Пошаговое руководство по подаче заявления через личный кабинет ФНС или через банк.",
    linkText: "Инструкция по подаче",
    linkHref: "/#faq",
    gradient: "from-orange-600 to-red-600"
  },
  {
    id: 5,
    icon: Briefcase,
    title: "Выберите объект налогообложения",
    description: "Сравните варианты \"Доходы\" и \"Доходы минус расходы\". Узнайте, какая ставка выгоднее вашему бизнесу.",
    linkText: "Калькулятор налогов",
    linkHref: "/#calculator",
    gradient: "from-indigo-600 to-blue-600"
  },
  {
    id: 6,
    icon: BarChart3,
    title: "Организуйте учёт и отчётность",
    description: "Вся отчётность ведётся через банк. Минимум бумаг, максимум автоматизации.",
    linkText: "FAQ по автоматизации",
    linkHref: "/#faq",
    gradient: "from-teal-600 to-green-600"
  },
  {
    id: 7,
    icon: Activity,
    title: "Держите лимиты под контролем",
    description: "Следите за лимитами доходов и работников, чтобы не потерять право на АУСН.",
    linkText: "Как отслеживать лимиты",
    linkHref: "/#calculator",
    gradient: "from-yellow-600 to-orange-600"
  },
  {
    id: 8,
    icon: HelpCircle,
    title: "Получите консультацию",
    description: "Задайте вопрос нашему эксперту и получите разъяснения по любому этапу перехода.",
    linkText: "Оставить заявку на консультацию",
    linkHref: "/#contacts",
    gradient: "from-rose-600 to-pink-600"
  }
]

export function Technologies() {
  const router = useRouter()

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="technologies">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Пошаговый гид
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Инструкции по переходу на АУСН
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Следуйте нашему пошаговому руководству для безопасного и быстрого перехода на автоматизированную упрощённую систему налогообложения
          </p>
        </div>

        {/* Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {instructions.map((instruction) => (
            <Card 
              key={instruction.id} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200"
            >
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${instruction.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <instruction.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-lg text-center">{instruction.title}</CardTitle>
                <CardDescription className="text-center text-sm">
                  {instruction.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClick(instruction.linkHref)}
                  className="w-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                >
                  {instruction.linkText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">Популярные вопросы по АУСН</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">Кто может перейти на АУСН?</h4>
              <p className="text-sm text-blue-100">
                Малый бизнес в пилотных регионах с доходом до 60 млн руб. и штатом до 5 человек
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">Какие налоги заменяет АУСН?</h4>
              <p className="text-sm text-blue-100">
                НДС, налог на прибыль (для ООО) или НДФЛ (для ИП), страховые взносы
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">Когда можно подать заявление?</h4>
              <p className="text-sm text-blue-100">
                Для новых ИП/ООО — в течение 30 дней после регистрации. Для действующих — до 31 декабря
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">Нужна ли отчётность на АУСН?</h4>
              <p className="text-sm text-blue-100">
                Декларации не нужны! Банк сам передаёт данные в налоговую. Только уведомления о работниках
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleClick('/#faq')}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              Все вопросы и ответы
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
