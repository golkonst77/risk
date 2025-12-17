"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

const news = [
  {
    title: "Количество компаний на АУСН выросло в три раза в 2025 году",
    description:
      "В 2025 году число клиентов ВТБ на автоУСН увеличилось втрое. По данным ФНС, общее число предпринимателей на режиме достигло 41,5 тыс. С 1 января 2026 года присоединятся ещё 14 тыс. налогоплательщиков.",
    date: "16 декабря 2025",
    category: "АУСН",
  },
  {
    title: "Выгода от перехода на АУСН — до 790 тыс. руб. в год",
    description:
      "По расчётам ВТБ, прямая финансовая выгода от перехода на автоУСН составляет до 790 тыс. руб. в год для компаний с оборотом до 5 млн руб. за счёт освобождения от страховых взносов, работы без НДС и автоматизации учёта.",
    date: "17 декабря 2025",
    category: "Экономика",
  },
  {
    title: "16 новых регионов присоединятся к эксперименту с 2026 года",
    description:
      "С 1 января 2026 года АУСН появится в 16 дополнительных регионах, включая Республику Башкортостан, Алтайский и Пермский края, Пензенскую область. Всего будет 67 участников эксперимента.",
    date: "10 декабря 2025",
    category: "Регионы",
  },
  {
    title: "АУСН доступна клиентам банка «Центр-инвест»",
    description:
      "Банк «Центр-инвест» подключил поддержку АУСН в своём интернет-банке и может полностью онлайн подключать клиентов малого бизнеса к режиму без посещения офиса.",
    date: "12 декабря 2025",
    category: "Банки",
  },
  {
    title: "Основной контингент пользователей АУСН — розница и услуги",
    description:
      "Большинство клиентов на АУСН работают в розничной торговле и сфере услуг. Более 40% сосредоточены в Москве и МО, около 10% — в Санкт-Петербурге и ЛО. Активно используют и предприниматели из Татарстана, Краснодарского края.",
    date: "16 декабря 2025",
    category: "Аналитика",
  },
  {
    title: "АУСН с 2022 года — эксперимент до конца 2027 года",
    description:
      "Эксперимент по автоУСН действует с 1 июля 2022 года по 31 декабря 2027 года. Налоговый режим полностью автоматизирует расчёт налогов на основе данных из ЛК ФНС, банков и ККТ. В 2026 году ожидается значительный рост числа участников.",
    date: "Постоянная информация",
    category: "Справка",
  },
]

const pickRandom = <T,>(items: T[], count: number) => {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, Math.min(count, arr.length))
}

export function News() {
  const [visibleNews, setVisibleNews] = useState(() => news.slice(0, 3))

  useEffect(() => {
    setVisibleNews(pickRandom(news, 3))
  }, [])

  return (
    <section id="news" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-16">
          <div className="mb-4 md:mb-0 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Новости и статьи
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
              Актуальная информация о налогах, бухгалтерии и бизнесе
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 px-4">
          {visibleNews.map((article, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 rounded-xl">
              <CardHeader className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="text-base md:text-lg group-hover:text-blue-600 transition-colors leading-relaxed">{article.title}</CardTitle>
                <CardDescription className="text-sm md:text-base leading-relaxed">{article.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12 px-4">
          <p className="text-xs md:text-sm text-gray-500">Новости автоматически обновляются из проверенных источников</p>
        </div>
      </div>
    </section>
  )
}
