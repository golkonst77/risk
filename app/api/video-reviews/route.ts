import { NextRequest, NextResponse } from 'next/server'

// Static mode: возвращаем пустой список видеоотзывов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '3')
    const reviews: any[] = []
    return NextResponse.json({ reviews: reviews.slice(0, limit), success: true })
  } catch (error) {
    return NextResponse.json({ reviews: [], error: 'Internal error' }, { status: 500 })
  }
}