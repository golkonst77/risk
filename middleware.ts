import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Упрощенный middleware для статического сайта
// В статическом режиме middleware работает только для базового роутинга
export function middleware(request: NextRequest) {
  // В статическом режиме просто пропускаем все запросы
  // Next.js сам обработает статические страницы
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Применяем только к страницам, исключая статические файлы
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
} 