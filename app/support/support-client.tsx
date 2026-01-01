"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Scale, 
  FileText, 
  Shield, 
  Calculator, 
  Lightbulb, 
  Award,
  MessageCircle,
  Phone,
  CheckCircle,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { useContactForm } from "@/hooks/use-contact-form"

const supportServices = [
  {
    id: 1,
    icon: Shield,
    title: "Оценка налоговых рисков",
    description: "Профессиональный анализ вашей бизнес-структуры на предмет налоговых рисков",
    features: [
      "Оценка риска дробления бизнеса",
      "Анализ схем работы с самозанятыми",
      "Выявление признаков искусственного дробления"
    ],
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    icon: FileText,
    title: "Легитимизация структуры",
    description: "Помощь в приведении бизнес-структуры в соответствие с требованиями ФНС",
    features: [
      "Разработка плана легитимизации",
      "Подготовка документов, подтверждающих реальное разделение",
      "Оформление договоров и соглашений"
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    icon: Scale,
    title: "Защита при проверках",
    description: "Профессиональная защита ваших интересов при налоговых проверках",
    features: [
      "Подготовка ответов на требования ФНС",
      "Представительство при камеральных и выездных проверках",
      "Обжалование решений о доначислениях"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    icon: Calculator,
    title: "Расчёт потенциальных рисков",
    description: "Оценка финансовых последствий признания дробления или переквалификации",
    features: [
      "Расчёт возможных доначислений НДС и налогов",
      "Оценка штрафов и пеней",
      "Прогноз финансовых потерь"
    ],
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 5,
    icon: Lightbulb,
    title: "Оптимизация без рисков",
    description: "Рекомендации по безопасной оптимизации налоговой нагрузки",
    features: [
      "Легальные способы снижения налогов",
      "Правильное оформление отношений с подрядчиками",
      "Соблюдение требований ФНС"
    ],
    gradient: "from-yellow-500 to-amber-500"
  },
  {
    id: 6,
    icon: Award,
    title: "Сопровождение и мониторинг",
    description: "Постоянный мониторинг изменений в законодательстве и вашей структуры",
    features: [
      "Отслеживание изменений в налоговом законодательстве",
      "Регулярный аудит структуры бизнеса",
      "Своевременные рекомендации по снижению рисков"
    ],
    gradient: "from-indigo-500 to-purple-500"
  }
]

const faqSupportData = [
  {
    question: "Сколько стоит консультация по налоговым рискам?",
    answer: "Первичная консультация по оценке рисков - бесплатно. Комплексное сопровождение, легитимизация структуры и защита при проверках оцениваются индивидуально в зависимости от сложности ситуации."
  },
  {
    question: "Как быстро можно получить оценку рисков?",
    answer: "Мы отвечаем на запросы в течение 1-2 часов в рабочее время. Срочные консультации возможны в режиме онлайн через чат или телефон. Калькуляторы на сайте дают мгновенную оценку."
  },
  {
    question: "Можете ли вы защитить при проверке ФНС?",
    answer: "Да, наши специалисты имеют право представлять ваши интересы в налоговых органах на основании доверенности. Мы сопровождаем клиентов при проверках, готовим ответы на требования и обжалуем решения о доначислениях."
  },
  {
    question: "Что делать, если калькулятор показал высокий риск?",
    answer: "При высоком риске рекомендуем немедленно обратиться за консультацией. Мы поможем разработать план легитимизации структуры, подготовить необходимые документы и снизить риски до минимума."
  }
]

export default function SupportClient() {
  const { openContactForm } = useContactForm()
  const [openFaqItems, setOpenFaqItems] = useState<number[]>([])

  const toggleFaqItem = (index: number) => {
    setOpenFaqItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/uploads/hero-bg-support.jpg')" }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Badge className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full mb-4 text-sm font-semibold">
            Профессиональная юридическая помощь
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Юридическая поддержка по налоговым рискам
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Комплексная помощь в оценке, снижении и защите от налоговых рисков: дробление бизнеса, работа с самозанятыми, проверки ФНС
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={openContactForm} className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-all duration-300 px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
              Получить консультацию
            </Button>
            <a href="tel:+79533301777">
              <Button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
                <Phone className="mr-2 h-5 w-5" />
                +7 953 330-17-77
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши услуги
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Полный спектр услуг по оценке и снижению налоговых рисков вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {supportServices.map((service) => (
              <Card
                key={service.id}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.3)' }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${service.gradient}`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="bg-white/80 border-blue-300">
                      #{service.id}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight text-gray-800">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Online Consultation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      Онлайн-консультации и поддержка
                    </h3>
                    <p className="text-blue-100 text-lg mb-6">
                      Запишитесь на консультацию с экспертом по налоговым рискам. Получите персональную оценку вашей ситуации и план действий.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button onClick={openContactForm} className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 font-semibold">
                        Записаться на консультацию
                      </Button>
                      <Link href="https://t.me/prostoburo" target="_blank">
                        <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 font-semibold">
                          Написать в Telegram
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Частые вопросы о налоговых рисках
            </h2>
            <div className="space-y-4">
              {faqSupportData.map((item, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaqItem(index)}
                      className="w-full text-left p-4 md:p-6 flex items-start justify-between hover:bg-gray-50 transition-colors duration-200 group rounded-t-xl"
                    >
                      <span className="text-base md:text-lg font-medium text-gray-900 pr-4 leading-relaxed flex-1">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:text-blue-600 ${
                          openFaqItems.includes(index) ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openFaqItems.includes(index) && (
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6 py-4 md:py-6 rounded-b-xl">
                        <p className="text-white leading-relaxed text-sm md:text-base">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы получить профессиональную поддержку?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Свяжитесь с нами прямо сейчас и получите бесплатную консультацию по оценке рисков вашего бизнеса!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={openContactForm} className="bg-white text-green-700 hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
              Получить консультацию
            </Button>
            <Link href="/calculator">
              <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-green-700 transition-colors px-8 py-3 rounded-lg shadow-lg text-lg font-semibold">
                Проверить риски
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

