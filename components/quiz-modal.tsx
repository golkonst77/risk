"use client"

// ✅ WhatsApp отправка включена обратно
// Дата включения: 2025-09-04

import { useRef, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { useContactForm } from "@/hooks/use-contact-form"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, ArrowLeft, Gift, Phone, X, CheckCircle2, AlertTriangle, AlertCircle, XCircle } from "lucide-react"
import { QuizFinalStep, type QuizFinalStepHandle } from "@/components/quiz/QuizFinalStep"
import Link from "next/link"

// CSS анимация для мигающей карточки скидки
const discountCardAnimation = `
  @keyframes discountGlow {
    0%, 100% {
      background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid #e5e7eb;
    }
    50% {
      background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
      box-shadow: 0 10px 15px -3px rgba(6, 182, 212, 0.2), 0 4px 6px -2px rgba(6, 182, 212, 0.1);
      border: 1px solid #06b6d4;
    }
  }
  
  .discount-card-animate {
    animation: discountGlow 2s ease-in-out infinite;
  }
`

interface QuizAnswer {
  questionId: number
  answer: string | string[]
}

const questions = [
  {
    id: 1,
    title: "Как устроен ваш бизнес?",
    type: "single" as const,
    options: [
      { value: "0", label: "Одна компания / ИП, без дробления и сложных схем", score: 0 },
      { value: "1", label: "Несколько ИП / ООО, но с разными направлениями и клиентами", score: 1 },
      { value: "2", label: "Несколько ИП / ООО с пересекающимися клиентами или процессами", score: 2 },
      { value: "3", label: "Несколько ИП / ООО, фактически один бизнес", score: 3 },
    ],
  },
  {
    id: 2,
    title: "Как вы работаете с людьми?",
    type: "single" as const,
    options: [
      { value: "0", label: "Штатные сотрудники, всё оформлено по ТК", score: 0 },
      { value: "1", label: "Подрядчики / самозанятые, но нерегулярно", score: 1 },
      { value: "2", label: "Самозанятые на постоянной основе", score: 2 },
      { value: "3", label: "Самозанятые фактически заменяют сотрудников", score: 3 },
    ],
  },
  {
    id: 3,
    title: "Есть ли финансовые и организационные пересечения?",
    type: "single" as const,
    options: [
      { value: "0", label: "Нет, всё разделено (деньги, управление, документы)", score: 0 },
      { value: "1", label: "Есть частичные пересечения", score: 1 },
      { value: "2", label: "Деньги, управление или клиенты пересекаются", score: 2 },
      { value: "3", label: "Всё общее, различия формальные", score: 3 },
    ],
  },
  {
    id: 4,
    title: "Были ли уже вопросы от налоговой?",
    type: "single" as const,
    options: [
      { value: "0", label: "Нет, никогда", score: 0 },
      { value: "1", label: "Были требования о пояснениях", score: 1 },
      { value: "3", label: "Была проверка или доначисления", score: 3 },
      { value: "1_alt", label: "Пока не знаю / недавно начали работать", score: 1 },
    ],
  },
]

const bonuses = ["Бесплатная консультация", "Дополнительные услуги"]

function formatRuPhone(input: string) {
  const digits = (input || "").replace(/\D/g, "")
  let normalized = digits
  if (normalized.startsWith("8")) normalized = `7${normalized.slice(1)}`
  if (normalized.startsWith("9")) normalized = `7${normalized}`
  if (!normalized.startsWith("7")) normalized = `7${normalized}`
  normalized = normalized.slice(0, 11)

  const parts = normalized.slice(1)
  const a = parts.slice(0, 3)
  const b = parts.slice(3, 6)
  const c = parts.slice(6, 8)
  const d = parts.slice(8, 10)

  let out = "+7"
  if (a) out += ` (${a}`
  if (a.length === 3) out += ")"
  if (b) out += ` ${b}`
  if (c) out += `-${c}`
  if (d) out += `-${d}`
  return out
}

function QuizSidebar({
  canProceed,
  handleNext,
  isPhoneStep,
  currentQuestion,
  calculateDiscount,
  getBonusCount,
  bonuses,
  handleSubmit,
  canSubmit,
  isSubmitting
}: {
  canProceed: boolean,
  handleNext: () => void,
  isPhoneStep: boolean,
  currentQuestion: any,
  calculateDiscount: () => number,
  getBonusCount: () => number,
  bonuses: string[],
  handleSubmit: () => void,
  canSubmit: boolean,
  isSubmitting: boolean
}) {
  return (
         <div className="w-80 bg-amber-100 px-6 py-6 border-l border-amber-200 flex flex-col justify-between items-center">
      <style dangerouslySetInnerHTML={{ __html: discountCardAnimation }} />
      <div className="w-full flex flex-col items-center">
        <div className={`rounded-2xl flex flex-col items-center mb-4 min-h-[100px] p-4 w-full ${calculateDiscount() > 0 ? 'discount-card-animate bg-cyan-100' : 'bg-cyan-100 shadow-md'}`}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-200 mb-2">
            <span className="text-2xl text-cyan-600 font-bold">₽</span>
          </div>
          <div className="text-xs text-gray-600 mb-1 leading-tight font-medium">Ваша скидка</div>
          <div className="text-xl font-bold text-cyan-600 mb-1 leading-tight break-words max-w-[90%] text-center">{calculateDiscount().toLocaleString()} ₽</div>
          <div className="text-[11px] text-gray-500 leading-tight text-center break-words max-w-[90%] whitespace-pre-line font-medium">на первый месяц\nобслуживания</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 w-full mb-4">
          <div className="text-sm font-bold mb-3 text-gray-900">Бонусы в подарок:</div>
          <div className="flex gap-3 justify-center items-center w-full">
            {bonuses.map((bonus, idx) => (
              <div
                key={bonus}
                className="flex flex-col items-center rounded-xl shadow-md min-w-[120px] max-w-[120px] min-h-[100px] max-h-[100px] justify-center p-3"
                style={{ 
                  flex: '0 0 120px',
                  backgroundColor: idx === 0 ? '#fef3c7' : '#dbeafe' // желтоватый для первого, голубоватый для второго
                }}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg mb-2 font-bold ${idx === 0 ? 'bg-orange-500' : 'bg-blue-500'}`}
                >
                  {idx === 0 ? '🎁' : '💡'}
                </div>
                <span className="text-xs text-gray-900 text-center font-bold leading-tight px-1">
                  {bonus}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Вместо блока 'Ваша экономия' — кнопка 'Получить предложение' на последнем шаге */}
        {isPhoneStep ? (
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white w-full mt-2 rounded-xl font-bold text-base shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 border-2 border-orange-400 hover:border-orange-300 whitespace-normal leading-tight text-center min-h-[80px] py-5 uppercase tracking-wide"
            style={{
              boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4), 0 4px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            {isSubmitting ? "Отправляем..." : "Получить подарок и купон"}
          </Button>
        ) : null}
      </div>
      {/* Кнопка Далее справа для multiple choice */}
      {(!isPhoneStep && currentQuestion?.type === "multiple") ? (
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-4 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
        >
          Далее
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      ) : null}
    </div>
  )
}

// Добавим функцию отправки WhatsApp с улучшенной обработкой ошибок
async function sendWhatsAppMessage(phone: string, message: string) {
  try {
    // phone теперь вся маска, извлекаем только цифры
    const cleanPhone = '7' + phone.replace(/\D/g, '').slice(1, 11);
    if (cleanPhone.length !== 11) {
      console.error('[WHATSAPP] Неверный формат номера:', phone);
      throw new Error('Неверный формат номера телефона');
    }
    
    console.log('[WHATSAPP] Отправляем сообщение на номер:', cleanPhone);
    
    const response = await fetch('https://gate.whapi.cloud/messages/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer K9edm63ZcOVma3QQQZy4vQM7JQOSI1RF',
      },
      body: JSON.stringify({
        to: cleanPhone,
        body: message,
      }),
    });
    
    const responseText = await response.text();
    console.log('[WHATSAPP] Ответ от сервера:', responseText);
    console.log('[WHATSAPP] Статус:', response.status);
    
    if (!response.ok) {
      console.error('[WHATSAPP] Ошибка отправки:', response.status, responseText);
      throw new Error(`Ошибка отправки WhatsApp: ${response.status}`);
    }
    
    try {
      const result = JSON.parse(responseText);
      if (!result.sent) {
        console.error('[WHATSAPP] Сообщение не отправлено:', result);
        throw new Error('Сообщение не было отправлено');
      }
      console.log('[WHATSAPP] Сообщение успешно отправлено:', result);
    } catch (parseError) {
      console.error('[WHATSAPP] Ошибка парсинга ответа:', parseError);
      throw new Error('Ошибка обработки ответа сервера');
    }
  } catch (error) {
    console.error('[WHATSAPP] Ошибка при отправке сообщения:', error);
    throw error;
  }
}

// Подсчитываем сумму баллов из ответов
const calculateRiskScore = (answers: QuizAnswer[]): number => {
  let totalScore = 0
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) return
    
    const answerValue = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer
    const option = question.options.find(opt => opt.value === answerValue)
    if (option && 'score' in option) {
      totalScore += (option as any).score as number
    }
  })
  return totalScore
}

// Определяем уровень риска на основе суммы баллов
const getRiskLevel = (score: number): { level: string, label: string, color: string, bgColor: string, textColor: string, borderColor: string, description: string, cta: string, ctaLink: string, icon: any } => {
  if (score <= 2) {
    return {
      level: "low",
      label: "Низкий риск",
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      description: "Явных признаков налоговых рисков не видно. Тем не менее, при росте бизнеса ситуация может меняться.",
      cta: "Пройти полный калькулятор",
      ctaLink: "/calculator",
      icon: CheckCircle2
    }
  } else if (score <= 5) {
    return {
      level: "moderate",
      label: "Умеренный риск",
      color: "yellow",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
      description: "Есть отдельные моменты, на которые ФНС может обратить внимание.",
      cta: "Проверить схему подробнее",
      ctaLink: "/calculator",
      icon: AlertTriangle
    }
  } else if (score <= 8) {
    return {
      level: "elevated",
      label: "Повышенный риск",
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
      description: "Ваша модель содержит признаки, которые часто анализируются при проверках.",
      cta: "Пройти оба калькулятора",
      ctaLink: "/calculator",
      icon: AlertCircle
    }
  } else {
    return {
      level: "high",
      label: "Высокий риск",
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      description: "Схема во многом совпадает с типовыми ситуациями, по которым ФНС доначисляет налоги.",
      cta: "Получить консультацию",
      ctaLink: "#",
      icon: XCircle
    }
  }
}

// Определяем тип бизнеса на основе ответов (для обратной совместимости)
const getBusinessType = (answers: QuizAnswer[]): "ip" | "ooo" | "both" => {
  const businessTypeAnswer = answers.find(a => a.questionId === 1)?.answer
  if (!businessTypeAnswer) return "both"

  if (Array.isArray(businessTypeAnswer)) {
    const hasIP = businessTypeAnswer.some(v => v.startsWith("ip"))
    const hasOOO = businessTypeAnswer.some(v => v.includes("ooo"))
    if (hasIP && hasOOO) return "both"
    if (hasIP) return "ip"
    if (hasOOO) return "ooo"
    return "both"
  }

  const val = businessTypeAnswer as string
  if (val.startsWith("ip")) return "ip"
  if (val.includes("ooo")) return "ooo"
  return "both"
}

function mapAusnQuizStateToQuizData(answers: QuizAnswer[], discount: number, businessType: string) {
  return {
    answers,
    discount,
    businessType,
  } as any
}

// Отправка PDF чек-листа (статический файл из public/CHEK_LIST)
async function sendWhatsAppDocument(phone: string, quiz_result: "ip" | "ooo" | "both", caption: string) {
  console.log('[QUIZ] Начинаем отправку PDF:', { phone, quiz_result, caption });
  
  // phone теперь вся маска, извлекаем только цифры
  const cleanPhone = '7' + phone.replace(/\D/g, '').slice(1, 11);
  if (cleanPhone.length !== 11) {
    console.error('[QUIZ] Неверный формат номера:', phone);
    throw new Error('Неверный формат номера телефона');
  }
  
  try {
    // Статический файл из public: /CHEK_LIST/Chek-list-perehoda.pdf
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1')
    const publicOrigin =
      (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PUBLIC_ORIGIN) ||
      (isLocal ? 'https://prostoburo.com' : origin)

    const base =
      typeof window !== 'undefined' && (window.location.pathname || '').startsWith('/ausn')
        ? '/ausn'
        : ''
    const publicBase =
      (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PUBLIC_BASEPATH) ||
      (isLocal ? '/ausn' : base)

    const fileUrl = `${publicOrigin}${publicBase}/CHEK_LIST/Chek-list-perehoda.pdf`

    // Отправляем чек-лист через WhatsApp напрямую к внешнему API
    const whatsappApiUrl = process.env.NEXT_PUBLIC_WHATSAPP_API_URL || 'https://gate.whapi.cloud'
    const whatsappApiKey = process.env.NEXT_PUBLIC_WHATSAPP_API_KEY || 'K9edm63ZcOVma3QQQZy4vQM7JQOSI1RF'
    
    const response = await fetch(`${whatsappApiUrl}/messages/document`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${whatsappApiKey}`,
      },
      body: JSON.stringify({
        to: cleanPhone,
        media: fileUrl,
        caption: caption,
      }),
    });
    
    const responseText = await response.text();
    let result: any;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { error: responseText };
    }
    
    if (!response.ok) {
      console.error('[QUIZ] Ошибка отправки файла:', JSON.stringify(result));
      throw new Error(`Ошибка отправки файла: ${response.status}`);
    }

    console.log('[QUIZ] Файл успешно отправлен:', result);
  } catch (error) {
    console.error('[QUIZ] Ошибка при отправке файла:', error);
    throw error;
  }
}

export function QuizModal({ open, onOpenChange }: { open?: boolean, onOpenChange?: (open: boolean) => void } = {}) {
  const { isOpen, closeContactForm, startAtFinalStep, openContactForm } = useContactForm()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  
  // При открытии модалки, если startAtFinalStep = true, переходим сразу на финальный шаг
  useEffect(() => {
    if (isOpen && startAtFinalStep) {
      setCurrentStep(questions.length)
    } else if (!isOpen) {
      setCurrentStep(0)
      setAnswers([])
    }
  }, [isOpen, startAtFinalStep])
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const finalStepRef = useRef<QuizFinalStepHandle | null>(null)
  const [canFinalSubmit, setCanFinalSubmit] = useState(false)
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false)
  const [phone, setPhone] = useState("")
  const [wantChecklist, setWantChecklist] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [whatsAppFallbackUrl, setWhatsAppFallbackUrl] = useState<string | null>(null)
  const [whatsAppAutoSent, setWhatsAppAutoSent] = useState<boolean | null>(null)

  const handleThanksOpenChange = (nextOpen: boolean) => {
    setShowThanks(nextOpen)
    if (!nextOpen) {
      setCoupon(null)
      setWhatsAppFallbackUrl(null)
      setWhatsAppAutoSent(null)
    }
  }

  const currentQuestion = currentStep < questions.length ? questions[currentStep] : null
  const currentAnswer = currentQuestion ? answers.find((a) => a.questionId === currentQuestion?.id) : null
  const canProceed = Boolean(
    currentAnswer && (Array.isArray(currentAnswer.answer) ? currentAnswer.answer.length > 0 : currentAnswer.answer)
  ) || false

  const isResultStep = false // Убираем экран результата, сразу переходим на финальную страницу
  const isPhoneStep = currentStep >= questions.length
  
  // Рассчитываем результат квиза
  const riskScore = calculateRiskScore(answers)
  const riskLevel = getRiskLevel(riskScore)

  const totalSteps = questions.length + 1 // +1 for final step
  const progress = isPhoneStep ? 100 : ((currentStep + 1) / totalSteps) * 100

  const calculateDiscount = () => {
    // Каждый завершенный шаг дает 2500 рублей скидки
    const completedSteps = answers.length
    const discountPerStep = 2500
    const maxDiscount = 10000

    return Math.min(completedSteps * discountPerStep, maxDiscount)
  }

  const getBonusCount = () => {
    const completedSteps = answers.length

    // Первый бонус появляется после 2-го ответа
    // Второй бонус появляется после 4-го ответа
    if (completedSteps >= 4) return 2
    if (completedSteps >= 2) return 1
    return 0
  }

  const handleAnswer = (questionId: number, answer: string | string[]) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId)
      if (existing) {
        return prev.map((a) => (a.questionId === questionId ? { ...a, answer } : a))
      }
      return [...prev, { questionId, answer }]
    })
  }

  const handleNext = () => {
    if (currentStep < questions.length) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      // Если ответили на все вопросы, автоматически переходим на финальную страницу
      if (nextStep === questions.length && answers.length === questions.length) {
        setCurrentStep(questions.length) // Переходим на финальную страницу
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      // Если на финальном шаге, возвращаемся к последнему вопросу
      if (isPhoneStep) {
        setCurrentStep(questions.length - 1)
      } else {
        setCurrentStep(currentStep - 1)
      }
    }
  }

  const handleSubmit = async () => {
    if (!phone.trim()) return

    console.log('🚀 [QUIZ] Начинаем отправку квиза...')
    console.log('📱 [QUIZ] Телефон:', phone.trim())
    console.log('📝 [QUIZ] Ответы:', answers)
    
    setIsSubmitting(true)
    let couponSaved = false
    let whatsappSent = false
    let whatsappManual = false
    let documentSent = false
    
    try {
      const discount = calculateDiscount()
      const code = `PROSTOBURO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      const fullCoupon = `${code}-${discount}`
      
      // Определяем тип бизнеса
      const businessType = getBusinessType(answers)
      
      // Купоны в статическом режиме не сохраняются на сервере
      // Можно добавить внешний API для сохранения купонов в будущем
      couponSaved = false
      console.log('Купон сгенерирован (статический режим):', fullCoupon)

      // ✅ ВКЛЮЧЕНО: Отправка WhatsApp-сообщения клиенту
      try {
        await sendWhatsAppMessage(phone, `Здравствуйте, спасибо за интерес к нашей компании. Вам купон на скидку ${fullCoupon}. Также Вам бесплатная консультация 30 минут и СКИДКА 50% на первый месяц обслуживания! Если есть вопросы — пишите прямо здесь, ответим оперативно.`)
        whatsappSent = true
        console.log('✅ WhatsApp сообщение отправлено успешно')
      } catch (error) {
        console.error('❌ Ошибка отправки WhatsApp сообщения:', error)
        // Создаем ссылку для ручной отправки
        const cleanPhone = '7' + phone.replace(/\D/g, '').slice(1, 11);
        const message = `Здравствуйте, спасибо за интерес к нашей компании. Вам купон на скидку ${fullCoupon}. Также Вам бесплатная консультация 30 минут и СКИДКА 50% на первый месяц обслуживания! Если есть вопросы — пишите прямо здесь, ответим оперативно.`;
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

        setWhatsAppFallbackUrl(whatsappUrl)
        whatsappManual = true
        whatsappSent = false
      }
      
      // ✅ ВКЛЮЧЕНО: Отправка PDF-файла с чек-листом
      if (wantChecklist) {
        try {
          await sendWhatsAppDocument(phone, businessType, `Ваш чек-лист. Спасибо за интерес к ПростоБюро!`)
          documentSent = true
          console.log('✅ WhatsApp документ отправлен успешно')
        } catch (error) {
          console.error('❌ Ошибка отправки WhatsApp документа:', error)
          // Не прерываем выполнение
        }
      }

      // Отправляем уведомление администратору через внешний email сервис
      console.log('🚀 [QUIZ] Начинаем отправку уведомления администратору...', {
        phone: phone.trim(),
        discount: discount,
        businessType: businessType,
        coupon: fullCoupon,
        answersCount: answers.length
      })
      
      try {
        const emailServiceUrl = process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL
        if (emailServiceUrl) {
          const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'urist40@gmail.com'
          const emailSubject = `Новая заявка с квиза: ${phone.trim()}`
          const emailBody = `
Новая заявка с квиза:
- Телефон: ${phone.trim()}
- Скидка: ${discount} ₽
- Купон: ${fullCoupon}
- Тип бизнеса: ${businessType}
- Количество ответов: ${answers.length}

Ответы:
${JSON.stringify(answers, null, 2)}
          `.trim()
          
          const emailResponse = await fetch(emailServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: adminEmail,
              subject: emailSubject,
              text: emailBody,
              html: emailBody.replace(/\n/g, '<br>')
            }),
          })
          
          if (emailResponse.ok) {
            console.log('✅ [QUIZ] Уведомление администратору отправлено успешно')
          } else {
            console.error('❌ [QUIZ] Ошибка отправки email администратору:', emailResponse.status)
          }
        } else {
          console.log('⚠️ [QUIZ] NEXT_PUBLIC_EMAIL_SERVICE_URL не настроен, уведомление не отправлено')
        }
      } catch (error) {
        console.error('❌ [QUIZ] Ошибка отправки уведомления администратору:', error)
        // Не критично для основного функционала
      }
      
      setCoupon(fullCoupon)
      setShowThanks(true)
      setWhatsAppAutoSent(whatsappSent)
      
      // Reset form
      setCurrentStep(0)
      setAnswers([])
      setPhone("")
      setWantChecklist(true)
      closeContactForm()
      
                   // Показываем соответствующее сообщение в зависимости от успешности операций
      if (whatsappSent) {
        toast({
          title: "Успешно!",
          description: "Мы отправили вам предложение в WhatsApp.",
        })
      } else if (whatsappManual) {
        toast({
          title: "Почти готово",
          description: "Не удалось отправить сообщение автоматически. Откройте WhatsApp и отправьте сообщение вручную.",
          variant: "default",
        })
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить предложение. Попробуйте еще раз или свяжитесь с нами по телефону.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Критическая ошибка при отправке:', error)
      const errorMessage = error instanceof Error ? error.message : "Попробуйте еще раз или свяжитесь с нами по телефону."
      toast({
        title: "Ошибка отправки",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const quizData = mapAusnQuizStateToQuizData(answers, calculateDiscount(), getBusinessType(answers))

  // Auto-advance for single choice questions
  useEffect(() => {
    if (!isPhoneStep && currentQuestion?.type === "single" && canProceed) {
      const timer = setTimeout(() => {
        handleNext()
      }, 500) // Small delay for better UX
      return () => clearTimeout(timer)
    }
  }, [canProceed, currentQuestion?.type, isPhoneStep])

  const handleOptionCheckedChange = (questionId: number, optionValue: string, checked: CheckboxPrimitive.CheckedState) => {
    const currentAnswers = Array.isArray(answers.find(a => a.questionId === questionId)?.answer)
      ? answers.find(a => a.questionId === questionId)?.answer as string[]
      : [];

    if (checked === true) {
      handleAnswer(questionId, [...currentAnswers, optionValue]);
    } else {
      handleAnswer(
        questionId,
        currentAnswers.filter((a) => a !== optionValue)
      );
    }
  }

  const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState) => {
    setWantChecklist(checked === true || checked === 'indeterminate')
  }

  return (
    <>
      <Dialog open={!!(open !== undefined ? open : isOpen)} onOpenChange={onOpenChange || closeContactForm}>
        <DialogTitle className="sr-only">Квиз для получения скидки</DialogTitle>
        <DialogDescription className="sr-only">Пройдите квиз, чтобы получить персональную скидку на бухгалтерские услуги</DialogDescription>
        <DialogContent className="max-w-6xl h-[90vh] max-h-[800px] p-0 overflow-hidden border-0 shadow-2xl" style={{
           backgroundImage: 'url("/quiz-background.jpg")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
                     <div className="h-full flex flex-col relative">
             {/* Полупрозрачный overlay для читаемости */}
             <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
             <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="bg-white px-12 py-8 text-center border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Есть ли у вас налоговые риски?
              </h1>
              <p className="text-gray-500">Ответьте на 4 вопроса и узнайте, есть ли у вашей схемы признаки, на которые обычно обращает внимание ФНС</p>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left side - Questions */}
                             <div className="flex-1 px-12 py-8 flex flex-col bg-amber-50">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">
                      {isPhoneStep ? "Контактные данные" : `Шаг ${currentStep + 1} из ${questions.length}`}
                    </span>
                    <span className="text-sm font-medium text-cyan-500">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1">
                    <div
                      className="bg-cyan-400 h-1 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question or Phone Step */}
                {isPhoneStep ? (
                  <div key="final-step" className="flex flex-col px-0 py-0 w-full">
                    <QuizFinalStep
                      key={`final-step-${currentStep}`}
                      ref={finalStepRef}
                      site="ausn"
                      quizData={quizData}
                      uiTexts={{
                        subtitle: `Оставьте email, и мы отправим персональное коммерческое предложение со скидкой ${calculateDiscount().toLocaleString()} ₽`,
                      }}
                      defaultGiftPdfFilename="Kak_vibrat_buh_kompany.pdf"
                      onStateChange={({ canSubmit, isSubmitting }) => {
                        setCanFinalSubmit(canSubmit)
                        setIsFinalSubmitting(isSubmitting)
                      }}
                      onSuccess={({ email, phone, quizData }) => {
                        setShowThanks(true)

                        setCurrentStep(0)
                        setAnswers([])
                        setCanFinalSubmit(false)
                        setIsFinalSubmitting(false)
                        closeContactForm()
                      }}
                    />
                    {/* Кнопка "Назад" на финальном шаге */}
                    <div className="mt-2">
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(questions.length - 1)}
                        className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg text-sm"
                      >
                        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                        Назад
                      </Button>
                    </div>
                  </div>
                ) : currentQuestion ? (
                  <>
                    <div className="flex flex-col px-0 py-0 overflow-y-auto max-h-[60vh]">
                      <h2 className="text-2xl font-bold mb-6 mt-2 text-gray-900 leading-tight">{currentQuestion.title}</h2>

                      {currentQuestion.type === "single" ? (
                        <div className="space-y-4">
                          {currentQuestion.options.map((option) => (
                            <div
                              key={option.value}
                              className="group relative bg-cyan-50 border border-gray-200 rounded-lg p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex items-center space-x-4">
                                <input
                                  type="radio"
                                  id={option.value}
                                  name={`question-${currentQuestion.id}`}
                                  value={option.value}
                                  checked={!Array.isArray(currentAnswer?.answer) && currentAnswer?.answer === option.value}
                                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                                  className="text-cyan-500 border-2 border-gray-300 w-5 h-5"
                                />
                                                                 <Label
                                   htmlFor={option.value}
                                   className="text-lg cursor-pointer text-gray-700 flex-1 font-normal"
                                 >
                                   {option.label}
                                 </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {currentQuestion.options.map((option) => (
                            <div
                              key={option.value}
                              className="group relative bg-cyan-50 border border-gray-200 rounded-lg p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex items-center space-x-4">
                                <Checkbox
                                  id={option.value}
                                  checked={!!(Array.isArray(currentAnswer?.answer) && currentAnswer.answer.includes(option.value))}
                                  onCheckedChange={(checked) => handleOptionCheckedChange(currentQuestion.id, option.value, checked)}
                                  className="text-cyan-500 border-2 border-gray-300 w-5 h-5 rounded"
                                />
                                                                 <Label
                                   htmlFor={option.value}
                                   className="text-lg cursor-pointer text-gray-700 flex-1 font-normal"
                                 >
                                   {option.label}
                                 </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-6 pt-4">
                      <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="flex items-center text-gray-500 hover:text-gray-700 px-6 py-3 rounded-xl"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Назад
                      </Button>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Right side - Discount & Bonuses (показываем всегда, включая финальный шаг) */}
              <QuizSidebar
                canProceed={canProceed}
                handleNext={handleNext}
                isPhoneStep={isPhoneStep}
                currentQuestion={currentQuestion}
                calculateDiscount={calculateDiscount}
                getBonusCount={getBonusCount}
                bonuses={bonuses}
                handleSubmit={() => finalStepRef.current?.submit()}
                canSubmit={canFinalSubmit && !showThanks}
                isSubmitting={isFinalSubmitting || showThanks}
              />
            </div>
          </div>
        </div>
        </DialogContent>
      </Dialog>
      {/* Модалка благодарности */}
      <Dialog open={showThanks} onOpenChange={handleThanksOpenChange}>
        <DialogTitle className="sr-only">Благодарность за прохождение квиза</DialogTitle>
        <DialogDescription className="sr-only">Ваш купон сохранен, мы свяжемся с вами</DialogDescription>
        <DialogContent className="max-w-md p-8 text-center flex flex-col items-center justify-center">
          <button onClick={() => handleThanksOpenChange(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X className="w-6 h-6" /></button>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Спасибо за уделенное время!</h2>
          <p className="text-base text-gray-700 mb-4">
            Коммерческое предложение и подарок отправлены на ваш email, проверьте почту.
          </p>
          {coupon && (
            <div className="bg-gray-100 rounded-xl p-4 mb-4 w-full">
              <div className="text-sm text-gray-500 mb-1">Ваш купон на скидку:</div>
              <div className="text-lg font-mono font-bold text-purple-700 mb-1 select-all">{coupon}</div>
              <Button size="sm" variant="outline" onClick={() => {navigator.clipboard.writeText(coupon)}}>Скопировать</Button>
            </div>
          )}
          <Button onClick={() => handleThanksOpenChange(false)} className="mt-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl">Закрыть</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
