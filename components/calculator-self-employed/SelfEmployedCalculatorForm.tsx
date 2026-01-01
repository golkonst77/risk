"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { questions } from "./config"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SelfEmployedCalculatorFormProps {
  answers: Record<string, number>
  onAnswerChange: (questionId: string, score: number) => void
  onSubmit: () => void
}

export function SelfEmployedCalculatorForm({ answers, onAnswerChange, onSubmit }: SelfEmployedCalculatorFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestion.id]

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).length

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      onSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleAnswerSelect = (score: number) => {
    onAnswerChange(currentQuestion.id, score)
    // Автоматически переходим к следующему вопросу через небольшую задержку
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        onSubmit()
      }
    }, 300)
  }

  const isAllAnswered = answeredCount === questions.length

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl md:text-2xl">
            Вопрос {currentQuestionIndex + 1} из {questions.length}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {answeredCount} / {questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-500 leading-tight">
            {currentQuestion.text}
          </h3>
        </div>
        <RadioGroup
          key={currentQuestion.id}
          value={currentAnswer !== undefined && currentAnswer !== null ? currentAnswer.toString() : ""}
          onValueChange={(value) => {
            if (value) {
              handleAnswerSelect(Number(value))
            }
          }}
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
              <RadioGroupItem value={option.score.toString()} id={`option-${index}`} className="mt-1" />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer text-sm md:text-base leading-relaxed"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
          >
            {currentQuestionIndex === questions.length - 1 ? "Завершить" : "Далее"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {isAllAnswered && (
          <div className="pt-4">
            <Button
              onClick={onSubmit}
              className="w-full"
              size="lg"
            >
              Показать результаты
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

