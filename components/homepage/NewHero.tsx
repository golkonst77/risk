"use client"

import { Button } from "@/components/ui/button"
import { Calculator, Users, Shield, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function NewHero() {
  const [basePath, setBasePath] = useState('/risk')
  
  useEffect(() => {
    // Определяем basePath из window.location для статического экспорта
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      setBasePath(path.startsWith('/risk') ? '/risk' : '')
    }
  }, [])
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8">
      {/* Фоновое изображение с осветлением и размытием */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${basePath}/Main1.webp'), url('${basePath}/Main1.jpg')`,
          filter: "brightness(1.3) blur(2px)",
        }}
      />
      {/* Дополнительное осветление через overlay */}
      <div className="absolute inset-0 bg-white/50"></div>
      
      {/* Декоративные элементы (опционально) */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl py-20 md:py-32">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-lg">
            Налоговые калькуляторы рисков
            <br />
            <span className="text-blue-600 drop-shadow-md">для бизнеса</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md font-medium">
            Проверьте, насколько ваша схема безопасна:
            <br />
            <span className="font-semibold">дробление бизнеса и работа с самозанятыми</span> — за 2–3 минуты
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/calculator">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-10 py-7 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
              >
                <Calculator className="mr-2 h-6 w-6" />
                Проверить риск дробления бизнеса
              </Button>
            </Link>
            
            <Link href="/calculator-self-employed">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-10 py-7 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
              >
                <Users className="mr-2 h-6 w-6" />
                Проверить риск по самозанятым
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Основано на практике ФНС и судебных дел</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Анонимно, без регистрации</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">Не является юридическим заключением</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

