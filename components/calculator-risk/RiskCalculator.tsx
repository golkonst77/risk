"use client"

import { useState } from "react"
import { Calculator as CalculatorIcon } from "lucide-react"
import { RiskCalculatorForm } from "./RiskCalculatorForm"
import { RiskCalculatorResults } from "./RiskCalculatorResults"

export function RiskCalculator() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswerChange = (questionId: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }))
  }

  const handleSubmit = () => {
    setShowResults(true)
    // Прокрутка к результатам
    setTimeout(() => {
      document.getElementById('calculator-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    // Прокрутка к форме
    setTimeout(() => {
      document.getElementById('calculator-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  return (
    <section id="calculator" className="min-h-screen" style={{ backgroundColor: '#FAFAFF' }}>
      {/* Hero Section */}
      <div className="relative py-8 md:py-12 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 shadow-xl">
            <CalculatorIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3 drop-shadow-lg">
            Калькулятор риска дробления бизнеса
          </h1>
          <p className="text-sm md:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Оцените риск признания вашей структуры искусственным дроблением бизнеса
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4">
        {/* Форма */}
        {!showResults && (
          <div id="calculator-form">
            <RiskCalculatorForm
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {/* Результаты */}
        {showResults && (
          <div id="calculator-results">
            <RiskCalculatorResults
              answers={answers}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </section>
  )
}


