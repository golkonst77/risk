import { NextResponse } from "next/server"

export async function POST(_: Request) {
  return NextResponse.json({
    error: "Функционал чек-листов отключён",
    message: "Supabase удалён из проекта",
  }, { status: 501 })
}