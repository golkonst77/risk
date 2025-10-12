import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    error: 'Функционал синхронизации рассылок отключён',
    message: 'Интеграция Supabase/Sendsay удалена из проекта',
  }, { status: 501 });
}

export async function GET() {
  return NextResponse.json({
    error: 'Функционал синхронизации рассылок отключён',
    message: 'Интеграция Supabase/Sendsay удалена из проекта',
  }, { status: 501 });
}