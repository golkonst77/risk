import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  return NextResponse.json({
    error: 'Функционал профилей отключён',
    message: 'Supabase удалён из проекта',
  }, { status: 501 });
}

export async function POST(_: NextRequest) {
  return NextResponse.json({
    error: 'Функционал профилей отключён',
    message: 'Supabase удалён из проекта',
  }, { status: 501 });
}