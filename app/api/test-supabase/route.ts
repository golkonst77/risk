import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ disabled: true, reason: 'supabase-removed' }, { status: 501 })
}

export async function POST(_: NextRequest) {
  return NextResponse.json({ disabled: true, reason: 'supabase-removed' }, { status: 501 })
}
