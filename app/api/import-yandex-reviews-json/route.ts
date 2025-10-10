import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

// Static mode: отключен импорт в БД

interface ImportedReview {
  author?: string
  name?: string
  text?: string
  rating?: number
  date?: string
  source?: string
}

export async function POST() {
  return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 })
}
 


