import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    error: "Функционал чек-листов отключён",
    message: "Supabase удалён из проекта",
  }, { status: 501 })
}