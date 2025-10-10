import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 })
}
