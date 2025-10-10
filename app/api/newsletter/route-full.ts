import { NextRequest, NextResponse } from 'next/server'

// Static mode

export async function POST() { return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 }) }

export async function GET() { return NextResponse.json({ subscribers: [] }) }