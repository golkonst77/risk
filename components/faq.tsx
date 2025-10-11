"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useContactForm } from "@/hooks/use-contact-form"

const faqAusnData = [
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

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const { openContactForm } = useContactForm()

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50" id="faq">
      <div className="container mx-auto px-4">
        {/* Hero блок с синим градиентом */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center mb-12">
          <Badge className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full mb-4 text-sm font-semibold">
            БАЗА ЗНАНИЙ ПО АУСН (наполняется)
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Остались вопросы? Сейчас ответим
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Подробные ответы на все вопросы об Автоматизированной упрощённой системе налогообложения
          </p>
        </div>

        {/* Основной блок с вопросами в 2 столбца */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {faqAusnData.map((item, index) => (
              <Card 
                key={index} 
                className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-4 md:p-6 flex items-start justify-between hover:bg-gray-50 transition-colors duration-200 group rounded-t-xl"
                  >
                    <span className="text-sm md:text-base font-medium text-gray-900 pr-4 leading-relaxed flex-1">
                      {item.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:text-blue-600 ${
                        openItems.includes(index) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openItems.includes(index) && (
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

        {/* CTA секция */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Остались вопросы?
            </h3>
            <p className="text-gray-600 mb-6">
              Получите персональную консультацию от наших экспертов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+79533301777"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                +7 953 330-17-77
              </a>
              
              <button 
                onClick={openContactForm}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors font-medium"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
