import { NextRequest, NextResponse } from 'next/server'

// Static mode

// Обработка запланированных рассылок
export async function POST() { return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 }) }