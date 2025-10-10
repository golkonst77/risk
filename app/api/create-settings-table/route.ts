import { NextResponse } from 'next/server'

export async function POST() { return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 }) }