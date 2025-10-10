import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

// Интерфейс для купона
interface Coupon {
  id: number
  code: string
  phone: string
  discount: number
  business_type?: string
  createdAt: string
  used: boolean
  usedAt?: string
}

const filePath = join(process.cwd(), 'data', 'coupons.json')

// POST - создание нового купона
export async function POST() {
  return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 })
}

// GET - получение всех купонов
export async function GET() {
  try {
    const raw = await readFile(filePath, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json({ coupons: data.coupons ?? [] })
  } catch (error) {
    return NextResponse.json({ coupons: [] })
  }
}

// PUT - отметить купон как использованный
export async function PUT() {
  return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 })
}