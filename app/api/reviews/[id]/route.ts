import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    error: 'Функционал отзывов отключён',
    message: 'Supabase удалён из проекта',
    id: params.id,
  }, { status: 501 })
}

export async function PUT(_: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    error: 'Функционал отзывов отключён',
    message: 'Supabase удалён из проекта',
    id: params.id,
  }, { status: 501 })
}

export async function PATCH(_: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    error: 'Функционал отзывов отключён',
    message: 'Supabase удалён из проекта',
    id: params.id,
  }, { status: 501 })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    error: 'Функционал отзывов отключён',
    message: 'Supabase удалён из проекта',
    id: params.id,
  }, { status: 501 })
}