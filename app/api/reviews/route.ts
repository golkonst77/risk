import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Статический режим: читаем из локального JSON

export async function GET(request: NextRequest) {
  // Читаем локальные отзывы
  const filePath = join(process.cwd(), 'data', 'local-reviews.json')
  const raw = await readFile(filePath, 'utf-8')
  const parsed = JSON.parse(raw)

  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const source = searchParams.get('source')

    let reviews: any[] = (parsed.reviews ?? parsed) as any[]
    // Применяем фильтры в памяти
    if (published === 'true') {
      reviews = reviews.filter(r => r.is_published === true)
    } else if (published === 'false') {
      reviews = reviews.filter(r => r.is_published === false)
    }
    if (featured === 'true') {
      reviews = reviews.filter(r => r.is_featured === true)
    }
    if (source) {
      reviews = reviews.filter(r => r.source === source)
    }
    // Сортировка по created_at
    reviews = reviews.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    if (limit) {
      reviews = reviews.slice(0, parseInt(limit))
    }
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error in reviews API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 })
}