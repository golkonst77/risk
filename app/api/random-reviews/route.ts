import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

const filePath = join(process.cwd(), 'data', 'local-reviews.json')

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '9', 10), 50)
  try {
    const raw = await readFile(filePath, 'utf-8')
    const parsed = JSON.parse(raw)
    const all = (parsed.reviews ?? parsed) as any[]
    // Перемешиваем (Fisher–Yates)
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    const selected = all.slice(0, limit)
    return NextResponse.json({ success: true, reviews: selected })
  } catch (error) {
    return NextResponse.json({ success: true, reviews: [] })
  }
}