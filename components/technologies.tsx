"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Building2, FileText, Send, Briefcase, BarChart3, Activity, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { PDFViewerModal } from "@/components/pdf-viewer-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const instructions = [
  {
    id: 1,
    icon: CheckCircle,
    title: "Проверьте право на АУСН",
    description: "Быстрый чек-лист, подходите ли вы по критериям — регион, доход, численность, деятельность.",
    linkText: "Перейти к чек-листу",
    linkHref: "/CHEK_LIST/Chek-list-perehoda.pdf",
    gradient: "from-green-600 to-emerald-600"
  },
  {
    id: 2,
    icon: Building2,
    title: "Выберите уполномоченный банк",
    description: "Откройте расчётный счёт для работы на АУСН. Смотрите наш актуальный список банков и условий.",
    linkText: "Список банков для АУСН",
    linkHref: "/banks",
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
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [currentPdfPath, setCurrentPdfPath] = useState("")
  const [modalTitle, setModalTitle] = useState("")
  const [docsModalOpen, setDocsModalOpen] = useState(false)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [automationModalOpen, setAutomationModalOpen] = useState(false)
  const [limitsModalOpen, setLimitsModalOpen] = useState(false)

  const handleClick = (href: string, title?: string) => {
    // Если это PDF файл, открываем в модальном окне
    if (href.endsWith('.pdf')) {
      setCurrentPdfPath(href)
      setModalTitle(title || "Документ")
      setPdfModalOpen(true)
      return
    }
    if (title === "Подготовьте документы") {
      setDocsModalOpen(true)
      return
    }
    if (title === "Подайте заявление") {
      setSubmitModalOpen(true)
      return
    }
    if (title === "Организуйте учёт и отчётность") {
      setAutomationModalOpen(true)
      return
    }
    if (title === "Держите лимиты под контролем") {
      setLimitsModalOpen(true)
      return
    } else {
      router.push(href)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="technologies">
      <div className="container mx-auto px-4">
        {/* Модальное окно для PDF */}
        <PDFViewerModal 
          isOpen={pdfModalOpen} 
          onClose={() => setPdfModalOpen(false)} 
          pdfPath={currentPdfPath}
          title={modalTitle}
        />
        {/* Модальное окно со списком документов */}
        <Dialog open={docsModalOpen} onOpenChange={setDocsModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Список документов</DialogTitle>
              <DialogDescription>
                Шаблоны форм вы можете скачать по кнопке на карточке. Ниже перечень того, что потребуется подготовить.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 text-sm leading-6">
              <div>
                <h3 className="font-semibold mb-2">Список документов для перехода на АУСН</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Выписка из ЕГРЮЛ/ЕГРИП (оригинал или нотариально заверенная копия)</li>
                  <li>Заявление о применении АУСН (по форме ФНС)</li>
                  <li>Документ, подтверждающий остаточную стоимость основных средств (справка или расчёт)</li>
                  <li>Информация о среднесписочной численности сотрудников (расчёт, табели)</li>
                  <li>Уставные документы (для ООО: устав, учредительный договор и протокол/решение о назначении директора)</li>
                  <li>Паспорт и ИНН руководителя (копии)</li>
                  <li>Свидетельство о постановке на учёт по НДС (если ранее регистрировались на ОСНО)</li>
                  <li>Договор с уполномоченным банком и реквизиты расчётного счёта</li>
                  <li>Доверенность или полномочия на представителя (если подаёт не руководитель)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Список документов для перехода на ОСН→УСН</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Заявление о переходе на УСН (по форме ФНС)</li>
                  <li>Выписка из ЕГРЮЛ/ЕГРИП (не старше 3 месяцев)</li>
                  <li>Документы, подтверждающие доход за предыдущий год (книги учёта или отчётность)</li>
                  <li>Справка о среднесписочной численности сотрудников за год</li>
                  <li>Паспорт и ИНН руководителя (копии)</li>
                  <li>Уставные документы (для ООО)</li>
                  <li>Договор с банком и реквизиты расчётного счёта</li>
                  <li>Доверенность на представителя (если необходимо)</li>
                  <li>Справка о состоянии расчётных счетов и задолженностях по налогам (при наличии)</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                После подготовки шаблонов и заполнения всех форм загрузите их в личный кабинет ФНС или представьте в уполномоченный банк.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setDocsModalOpen(false)} variant="secondary">Закрыть</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Модал: FAQ по автоматизации учёта и отчётности (АУСН) */}
        <Dialog open={automationModalOpen} onOpenChange={setAutomationModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>FAQ по автоматизации учёта и отчётности (АУСН)</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-sm leading-6">
              <p>Вся налоговая отчётность ведётся через уполномоченный банк, который передаёт данные о доходах, расходах и зарплатах в ФНС автоматически — онлайн, без бумажных деклараций и без ручного отчёта.</p>
              <p>Для бизнеса на АУСН важно использовать только сервисы банка из утверждённого налоговой службой перечня. Все расчёты с сотрудниками, поставщиками и покупателями проходят исключительно через этот банк.</p>
              <p>Банк может предоставлять удобное приложение или онлайн-банк, где видно движение средств, данные по сотрудникам и готовые отчёты. Сам банк перечисляет НДФЛ с зарплат работников, а информацию о доходах и расходах автоматически отправляет в ФНС.</p>
              <p>Онлайн-касса (ККТ) обязательна: все поступления и возвраты должны проходить через неё для корректного учёта доходов и расходов, чтобы налог автоматически рассчитывался правильно.</p>
              <p>Финальные уведомления по сумме налога и сроку оплаты поступают в личный кабинет ФНС и онлайн-банк, где их можно также оплачивать автоматически.</p>
              <p>Организация сама сдаёт только бухгалтерскую отчётность до 31 марта и сведения о трудовой деятельности по форме ЕФС-1.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setAutomationModalOpen(false)} variant="secondary">Закрыть</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Модал: Как отслеживать лимиты */}
        <Dialog open={limitsModalOpen} onOpenChange={setLimitsModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Как отслеживать лимиты: доходы и сотрудники</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-sm leading-6">
              <div>
                <h3 className="font-semibold mb-2">Доход</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Лимит: 60 млн ₽ за год (на 2025–2027 гг.). Превышение ведёт к потере права на АУСН.</li>
                  <li>Проверяйте поступления каждый месяц — отчётный период месячный.</li>
                  <li>Учитываются только операции через уполномоченный банк и онлайн-кассу.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Численность сотрудников</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Не более 5 человек (ИП не учитывается). При превышении перевод на другой режим происходит автоматически.</li>
                  <li>Среднесписочная численность рассчитывается по указаниям Росстата (Приказ №872 от 30.11.2022).</li>
                  <li>Следите ежемесячно, учитывая всех, кто числился в штате хотя бы один день месяца.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Остаточная стоимость ОС</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Не более 150 млн ₽. Подтверждается бухгалтерскими документами, учёт — ежеквартально.</li>
                </ul>
              </div>
              <p className="text-muted-foreground">Для безопасности бизнеса ежемесячно сверяйте лимиты по выписке банка и выгрузке из онлайн-кассы, а также ведите собственный реестр сотрудников.</p>
              <p className="text-muted-foreground">При рисках превышения лимитов своевременно консультируйтесь с бухгалтером или используйте встроенные оповещения банка и онлайн-кабинета ФНС.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setLimitsModalOpen(false)} variant="secondary">Закрыть</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={submitModalOpen} onOpenChange={setSubmitModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Подача заявления на переход на АУСН</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-sm leading-6">
              <div>
                <h3 className="font-semibold mb-2">1. Через личный кабинет налогоплательщика на сайте ФНС</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Зайдите на сайт ФНС и авторизуйтесь в личном кабинете налогоплательщика (ИП — по логину и паролю, юрлица — через ЭЦП).</li>
                  <li>Найдите раздел «АУСН» в главном меню.</li>
                  <li>Откройте вкладку «Уведомление о переходе на АУСН».</li>
                  <li>Заполните форму, указав: контактный телефон, электронную почту, дату перехода, отказ от старого режима (при необходимости), выбранный объект налогообложения, при необходимости реквизиты уполномоченного банка.</li>
                  <li>Проверьте данные, подпишите форму (ЭЦП или через СМС для ИП) и отправьте в ФНС.</li>
                  <li>Дождитесь подтверждения смены режима в личном кабинете ФНС.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Через интернет-банк уполномоченного банка</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Войдите в интернет-банк, где открыт расчётный счёт.</li>
                  <li>Перейдите в раздел «АУСН», «Бухгалтерия» или аналогичный по налоговым режимам.</li>
                  <li>Заполните форму перехода на АУСН: дата, контакты, объект налогообложения, реквизиты организации/ИП.</li>
                  <li>Подпишите заявление (одноразовый код, ЭЦП или иной способ авторизации).</li>
                  <li>Дождитесь ответа от банка и ФНС (уведомления в банк и в личный кабинет ФНС).</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Сроки подачи заявления</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>С УСН/НПД: подать до последнего дня месяца, предшествующего переходу. Переход с 1 числа следующего месяца.</li>
                  <li>С ОСНО: подать до 31 декабря. Переход с 1 января следующего года.</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Совет: сохраняйте копию заявления (скриншот или PDF) и проверяйте подтверждение в личном кабинете ФНС или интернет-банке.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setSubmitModalOpen(false)} variant="secondary">Закрыть</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
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
                  onClick={() => handleClick(instruction.linkHref, instruction.title)}
                  className="w-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                >
                  {instruction.linkText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
