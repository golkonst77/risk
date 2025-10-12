import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest) {
  return NextResponse.json({
    error: 'Функционал отзывов (Supabase) отключён',
    message: 'Supabase удалён из проекта',
  }, { status: 501 })
}
