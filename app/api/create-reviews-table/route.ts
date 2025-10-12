import { NextRequest, NextResponse } from 'next/server'

export async function POST(_: NextRequest) {
  return NextResponse.json({
    error: 'Функционал Supabase для отзывов отключён',
    message: 'Supabase удалён из проекта',
  }, { status: 501 })
}
