import { NextRequest, NextResponse } from 'next/server'

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    error: 'Функционал рассылок отключён',
    message: 'Интеграция Supabase/Sendsay удалена из проекта',
    campaign_id: params.id,
  }, { status: 501 })
}