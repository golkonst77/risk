import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { essential, analytics, marketing, timestamp, version } = body || {}

    void essential
    void analytics
    void marketing
    void timestamp
    void version

    return NextResponse.json(
      {
        success: true,
        message: 'Согласие принято (сохранение в БД отложено)',
        saved: false,
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        success: true,
        message: 'Согласие принято',
        saved: false,
      },
      { status: 200 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Cookie Consent API',
      version: '1.0',
      endpoints: {
        POST: 'Сохранение согласия пользователя',
      },
    },
    { status: 200 }
  )
}
