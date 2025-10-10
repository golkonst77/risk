import { NextRequest, NextResponse } from 'next/server'

// Static mode

// Получение конкретной кампании
export async function GET() { return NextResponse.json({ campaign: null }) }

// Обновление кампании
export async function PUT() { return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 }) }

// Удаление кампании
export async function DELETE() { return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 }) }