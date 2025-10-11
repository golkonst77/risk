"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const faqAusnData = [
  {
    question: "В каких субъектах РФ проводится эксперимент по установлению специального налогового режима «Автоматизированная упрощенная система налогообложения»?",
    answer: "Эксперимент проводится в городе Москве, в Московской и Калужской областях, а также в Республике Татарстан."
  },
  {
    question: "В течение какого срока проводится эксперимент?",
    answer: "Период проведения эксперимента: с 1 июля 2022 года до 31 декабря 2027 года включительно."
  },
  {
    question: "Как и когда можно перейти на специальный налоговый режим?",
    answer: "Переход возможен для новых и существующих налогоплательщиков в определённые сроки с уведомлением налогового органа."
  },
  {
    question: "Может ли налогоплательщик применять «Автоматизированную УСН», если работников больше 5?",
    answer: "Нет, при превышении количества работников налогоплательщик утрачивает право на режим."
  },
  {
    question: "Может ли некоммерческая организация применять АУСН?",
    answer: "Нет, некоммерческие организации не могут использовать этот режим."
  },
  {
    question: "Какие ставки установлены в АУСН?",
    answer: "Зависят от объекта налогообложения — 8% с доходов или 20% с доходов минус расходы."
  },
  {
    question: "Нужно ли подавать декларации при применении АУСН?",
    answer: "Нет, декларации не подаются."
  },
  {
    question: "Как рассчитывается налог в АУСН?",
    answer: "Налог исчисляется автоматически на основе данных ККТ, банков и личного кабинета налогоплательщика."
  },
  {
    question: "За какой период исчисляется налог?",
    answer: "Налог считается за календарный месяц."
  },
  {
    question: "Какой срок уплаты налога?",
    answer: "До 25-го числа месяца, следующего за отчетным."
  },
  {
    question: "От какой отчетности освобождены налогоплательщики АУСН?",
    answer: "От налоговой отчетности, за исключением отдельных случаев (например, кадастровая стоимость имущества)."
  },
  {
    question: "В каком случае теряется право на применение АУСН?",
    answer: "При нарушении установленных условий, начиная с месяца нарушения."
  },
  {
    question: "Можно ли совмещать АУСН с другими налоговыми режимами?",
    answer: "Нет, совмещение невозможно."
  },
  {
    question: "Что делать при утрате права на АУСН?",
    answer: "Нужно уведомить налоговый орган не позднее 15-го числа следующего месяца."
  },
  {
    question: "Какой режим применяется после утраты права на АУСН?",
    answer: "Переход на общий режим или УСН/ЕСХН по выбору налогоплательщика."
  },
  {
    question: "Возможен ли повторный переход на АУСН?",
    answer: "Да, при своевременном уведомлении налогового органа."
  },
  {
    question: "Имеет ли значение, в каком банке открыт расчётный счёт?",
    answer: "Да, расчётный счёт должен быть открыт в уполномоченном банке."
  }
]

export default function FAQAusnPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-yellow-400 text-gray-900 border-0 hover:bg-yellow-400 px-4 py-2 text-sm font-semibold">
            БАЗА ЗНАНИЙ ПО АУСН
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            ОСТАЛИСЬ ВОПРОСЫ?
            <br />
            СЕЙЧАС ОТВЕТИМ
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Подробные ответы на все вопросы об Автоматизированной упрощённой системе налогообложения
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqAusnData.map((item, index) => {
              const isOpen = openItems.includes(index)
              
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-200"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-gray-800/70 transition-colors duration-200 group"
                  >
                    <span className="text-base md:text-lg font-medium text-white leading-relaxed flex-1 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown 
                      className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:text-yellow-400 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-700">
                        <p className="text-gray-300 leading-relaxed text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
              Получите персональную консультацию по переходу на АУСН от наших экспертов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/#calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Рассчитать налог
              </a>
              <a
                href="tel:+79533301777"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                +7 (953) 330-17-77
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
            Полезные ресурсы
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/banks"
              className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-yellow-400 hover:bg-gray-800/70 transition-all duration-200"
            >
              <div className="text-yellow-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                Уполномоченные банки
              </h4>
              <p className="text-gray-400 text-sm">
                Список из 11 банков для работы с АУСН
              </p>
            </a>
            
            <a
              href="/#calculator"
              className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-yellow-400 hover:bg-gray-800/70 transition-all duration-200"
            >
              <div className="text-yellow-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                Калькулятор АУСН
              </h4>
              <p className="text-gray-400 text-sm">
                Сравните налоговую нагрузку разных режимов
              </p>
            </a>
            
            <a
              href="/#technologies"
              className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-yellow-400 hover:bg-gray-800/70 transition-all duration-200"
            >
              <div className="text-yellow-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                Инструкции по АУСН
              </h4>
              <p className="text-gray-400 text-sm">
                Пошаговые руководства по переходу
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
