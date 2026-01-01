"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useContactForm } from "@/hooks/use-contact-form"

const faqRiskData = [
  {
    question: "Что такое налоговые риски и почему о них вообще нужно думать?",
    answer: "Налоговый риск — это вероятность того, что налоговая инспекция при проверке переквалифицирует вашу схему работы и доначислит налоги, пени и штрафы. Чаще всего это происходит при дроблении бизнеса и работе с самозанятыми вместо сотрудников. Проблема в том, что риски обычно становятся очевидны уже после начала проверки, когда исправлять что-то поздно и дорого."
  },
  {
    question: "Чем опасно дробление бизнеса с точки зрения ФНС?",
    answer: "ФНС может признать несколько ИП или компаний единым бизнесом, если увидит общий контроль, одних и тех же клиентов, общие деньги и ресурсы, налоговый мотив (например, уход от НДС). В таком случае доначисляют НДС, налог на прибыль / НДФЛ, пени и штрафы. Калькулятор помогает заранее понять, насколько ваша структура похожа на типовые схемы, которые ФНС уже переквалифицирует."
  },
  {
    question: "Законно ли работать с самозанятыми?",
    answer: "Да, работать с самозанятыми законно, если это действительно гражданско-правовые отношения. Риск возникает, когда самозанятый фактически работает как сотрудник, есть подчинение, график, контроль процесса, он зависит только от одного заказчика, договор и оплата похожи на трудовые. В этом случае ФНС может переквалифицировать отношения в трудовые."
  },
  {
    question: "В чём разница между дроблением и риском по самозанятым?",
    answer: "Это две разные, но часто связанные темы: дробление бизнеса — про структуру компаний и ИП, самозанятые — про замену сотрудников и персонала. На практике они часто пересекаются: например, часть бизнеса дробят, а часть людей оформляют как самозанятых — и ФНС рассматривает это в комплексе."
  },
  {
    question: "Если калькулятор показывает высокий риск — это значит, что проверка неизбежна?",
    answer: "Нет. Высокий риск не означает автоматическую проверку. Он означает, что при проверке у ФНС будет много аргументов, текущая схема похожа на те, которые уже переквалифицируются, лучше подумать о корректировках заранее. Калькулятор — это диагностика, а не приговор."
  },
  {
    question: "Можно ли снизить налоговый риск, не закрывая бизнес и не «ломая» схему?",
    answer: "Во многих случаях — да. Чаще всего риск снижается за счёт правильного разделения функций и контроля, доработки договоров и документооборота, изменения логики оплаты, устранения формальных признаков подмены. Именно поэтому важно понять где именно риск, а не просто «страшно или нет»."
  },
  {
    question: "Почему в калькуляторах используются баллы и проценты?",
    answer: "Баллы и проценты — это удобный способ показать относительный риск, а не математическая точность. ФНС тоже не считает «по формуле», но оценивает совокупность признаков, усиливает одни факторы другими, смотрит на общую картину. Калькулятор моделирует именно такой подход."
  },
  {
    question: "Может ли ФНС учитывать сразу несколько факторов риска одновременно?",
    answer: "Да, и именно так она и делает. Например: дробление бизнеса + самозанятые, общие клиенты + регулярные выплаты, единое управление + налоговый мотив. Поэтому мы и разделяем риски по блокам, а не задаём один-два вопроса."
  },
  {
    question: "Я уже работаю так несколько лет, и проверок не было. Значит, всё безопасно?",
    answer: "Не обязательно. Отсутствие проверок не означает отсутствие риска. ФНС часто проверяет при росте оборотов, при смене налогового режима, по сигналам из банков и контрагентов, выборочно, по отраслям. Лучше проверить схему до того, как возникнет формальный повод."
  },
  {
    question: "Заменяет ли калькулятор консультацию специалиста?",
    answer: "Нет. Калькулятор помогает быстро оценить риск, показывает проблемные зоны, даёт общее понимание ситуации. Но он не заменяет анализ документов и фактов. Если риск средний или высокий — консультация помогает понять, что именно делать дальше и какие действия действительно имеют смысл."
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Часто задаваемые вопросы о налоговых рисках
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Подробные ответы на все вопросы о рисках дробления бизнеса и работы с самозанятыми
          </p>
        </div>

        {/* Основной блок с вопросами в 2 столбца */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {faqRiskData.map((item, index) => (
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

        {/* Дисклеймер */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 italic max-w-3xl mx-auto">
            ⚠️ Важное уточнение: Результаты калькуляторов и ответы в FAQ носят информационный характер и не являются юридическим заключением или официальной позицией ФНС.
          </p>
        </div>

        {/* CTA секция */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Если ситуация неочевидна — лучше разобрать её индивидуально
            </h3>
            <p className="text-gray-600 mb-6">
              Получите персональную консультацию от наших экспертов по налоговым рискам
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
