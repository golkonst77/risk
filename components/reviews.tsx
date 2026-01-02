"use client"
/**
 * @file: reviews.tsx
 * @description: Компонент отзывов с динамическим получением рейтинга и адреса
 * @dependencies: API endpoints, settings store
 * @created: 2025-01-15
 */

import { useState, useEffect } from 'react'
import { Star, StarHalf } from 'lucide-react'

interface Review {
  id: string
  name: string
  company?: string
  rating: number
  text: string
  source: string
  created_at: string
  published_at?: string
  author?: string
}

interface CompanyInfo {
  name?: string
  rating?: number
}

interface Settings {
  address?: string
  phone?: string
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({})
  const [settings, setSettings] = useState<Settings>({})
  const [averageRating, setAverageRating] = useState(5.0)
  const [totalReviews, setTotalReviews] = useState(15)
  const [page, setPage] = useState(0)

  const maxPages = Math.min(3, Math.ceil(reviews.length / 3) || 0)
  const pagedReviews = reviews.slice(page * 3, page * 3 + 3)

  // Функция для расчета динамического количества клиентов
  const calculateDynamicClients = () => {
    const startDate = new Date('2024-01-01') // Начальная дата
    const currentDate = new Date()
    const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (currentDate.getMonth() - startDate.getMonth())
    const baseClients = 500
    const monthlyIncrease = 5
    return baseClients + (monthsDiff * monthlyIncrease)
  }

  const dynamicClients = calculateDynamicClients()

  // Получение настроек из статического JSON
  const fetchSettings = async () => {
    try {
      const siteConfigModule = await import('@/data/site-config.json')
      const config = siteConfigModule.default || siteConfigModule
      if (config && config.contacts) {
        setSettings({
          address: config.contacts.address || 'Калуга, Дзержинского 37, офис 20',
          phone: config.contacts.phone || '+7953 330-17-77'
        })
      }
    } catch (error) {
      console.error('Ошибка получения настроек:', error)
      setSettings({
        address: 'Калуга, Дзержинского 37, офис 20',
        phone: '+7953 330-17-77'
      })
    }
  }

  // Информация о компании - используем дефолтные значения
  const fetchCompanyInfo = async () => {
    setCompanyInfo({ 
      name: 'Просто Бюро',
      rating: 5.0 
    })
  }

  const fetchReviews = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Читаем отзывы из статического JSON файла
      const reviewsModule = await import('@/data/local-reviews.json')
      const data = reviewsModule.default || reviewsModule
      
      // Поддерживаем разные форматы JSON
      let reviewsList: any[] = []
      if (Array.isArray(data)) {
        reviewsList = data
      } else if (data.reviews && Array.isArray(data.reviews)) {
        reviewsList = data.reviews
      } else if (data.success && Array.isArray(data.reviews)) {
        reviewsList = data.reviews
      }
      
      // Фильтруем только опубликованные отзывы
      const publishedReviews = reviewsList.filter((r: any) => r.is_published !== false)
      
      // Сортируем по дате создания (новые первыми)
      const sortedReviews = publishedReviews.sort((a: any, b: any) => {
        const dateA = new Date(a.created_at || a.published_at || 0).getTime()
        const dateB = new Date(b.created_at || b.published_at || 0).getTime()
        return dateB - dateA
      })
      
      // Загружаем все отзывы для пагинации
      setReviews(sortedReviews)
      
      // Пересчитываем агрегаты
      if (publishedReviews.length > 0) {
        const avg = publishedReviews.reduce((s: number, r: any) => s + (r.rating || 5), 0) / publishedReviews.length
        setAverageRating(Number(avg.toFixed(1)))
        setTotalReviews(publishedReviews.length)
      } else {
        setAverageRating(5.0)
        setTotalReviews(0)
      }
      
      setPage(0)
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error)
      setError('Ошибка загрузки отзывов')
      setReviews([])
      setAverageRating(5.0)
      setTotalReviews(0)
    } finally {
      setLoading(false)
    }
  }

  const fetchVideoReviews = async () => {
    // Видеоотзывы пока не поддерживаются в статическом режиме
    // Можно добавить статический JSON файл для видеоотзывов в будущем
    setVideoReviews([])
  }

  useEffect(() => {
    fetchSettings()
    fetchCompanyInfo()
    fetchReviews()
    fetchVideoReviews()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Дата не указана'
      }
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Ошибка форматирования даты:', error)
      return 'Дата не указана'
    }
  }

  const renderStars = (rating: number) => {
    try {
      const stars = []
      const validRating = typeof rating === 'number' && !isNaN(rating) ? Math.max(0, Math.min(5, rating)) : 5
      const fullStars = Math.floor(validRating)
      const hasHalfStar = validRating % 1 !== 0

      for (let i = 0; i < fullStars; i++) {
        stars.push(
          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
        )
      }

      if (hasHalfStar) {
        stars.push(
          <StarHalf key="half" className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
        )
      }

      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <Star key={`empty-${i}`} className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
        )
      }

      return stars
    } catch (error) {
      console.error('Ошибка рендеринга звезд:', error)
      return Array(5).fill(null).map((_, i) => (
        <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
      ))
    }
  }

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка отзывов...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Ошибка: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Более {dynamicClients}+ довольных клиентов доверяют нам свою бухгалтерию
          </p>
        </div>

        {/* Карточки отзывов (3 на страницу, до 3 страниц) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {pagedReviews && pagedReviews.length > 0 ? (
            pagedReviews.map((review) => (
              <div key={review.id || Math.random()} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name || 'Анонимный клиент'}</h4>
                    {review.company && (
                      <p className="text-sm text-gray-600">{review.company}</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {renderStars(review.rating || 5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-4">{review.text || 'Отзыв недоступен'}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{review.created_at ? formatDate(review.created_at) : 'Дата не указана'}</span>
                  <span className="capitalize">{review.source || 'yandex-maps'}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">Отзывы загружаются...</p>
            </div>
          )}
        </div>

        {/* Пагинация */}
        {maxPages > 0 && reviews.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-12">
            <button
              className="px-4 py-2 rounded border bg-white disabled:opacity-50"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Предыдущие 3
            </button>
            <div className="text-sm text-gray-600">
              Страница {Math.min(page + 1, maxPages)} из {maxPages}
            </div>
            <button
              className="px-4 py-2 rounded border bg-white disabled:opacity-50"
              onClick={() => setPage(p => Math.min(maxPages - 1, p + 1))}
              disabled={page >= maxPages - 1}
            >
              Следующие 3
            </button>
          </div>
        )}

        <div className="text-center mt-8 md:mt-12 px-4">
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Все отзывы взяты с{" "}
            <a
              href="https://yandex.ru/maps/org/prosto_byuro/180493814174/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Яндекс.Карт
            </a>
            {" "}и нашего сайта
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-gray-500">
            <span>Средняя оценка: {averageRating}</span>
            <span className="hidden sm:inline">•</span>
            <span>Всего отзывов: {totalReviews}+</span>
          </div>
        </div>
      </div>
    </section>
  )
}
