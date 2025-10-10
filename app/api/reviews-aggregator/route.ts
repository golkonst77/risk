import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const dynamic = "force-dynamic"
const filePath = join(process.cwd(), 'data', 'local-reviews.json')

export async function GET(request: NextRequest) {
  try {
    const raw = await readFile(filePath, 'utf-8')
    const parsed = JSON.parse(raw)
    const reviews = (parsed.reviews ?? parsed) as any[]
    return NextResponse.json({
      success: true,
      reviews,
      total: reviews.length,
      summary: {
        totalReviews: reviews.length,
        averageRating: reviews.length > 0 ? Math.round((reviews.reduce((sum: number, r: any) => sum + (r.rating || 5), 0) / reviews.length) * 10) / 10 : 5.0
      },
    })
  } catch (error) {
    const demoReviews = [
      {
        id: 'demo-1',
        name: 'Анна Петрова',
        company: 'ООО "Строй-Мастер"',
        rating: 5,
        text: 'Отличная команда! Помогли пройти налоговую проверку без единого штрафа. Всегда на связи, отвечают быстро и по делу.',
        source: 'demo',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        published_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-2',
        name: 'Михаил Сидоров',
        company: 'ИП Сидоров М.А.',
        rating: 5,
        text: 'Работаю с ПростоБюро уже 3 года. Никаких проблем с отчетностью, все сдается вовремя. Рекомендую!',
        source: 'demo',
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        published_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-3',
        name: 'Елена Козлова',
        company: 'ООО "Торговый дом"',
        rating: 5,
        text: 'Профессиональный подход к делу. Оперативно решают любые вопросы. Цены адекватные, качество на высоте.',
        source: 'demo',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
    return NextResponse.json({ success: true, reviews: demoReviews, total: demoReviews.length, summary: { totalReviews: demoReviews.length, averageRating: 5.0 } })
  }
} 