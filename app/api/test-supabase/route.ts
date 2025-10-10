import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ disabled: true, reason: 'static-mode' }, { status: 501 })
}

    return NextResponse.json({
      success: true,
      message: 'Тест Supabase завершен',
      environment: {
        supabaseUrl: !!supabaseUrl,
        serviceRoleKey: !!serviceRoleKey,
        supabaseUrlValue: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : null
      },
      services: {
        database: dbConnection,
        email: emailService
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Ошибка тестирования Supabase:', error)
    return NextResponse.json({
      success: false,
      error: 'Ошибка тестирования Supabase',
      details: error instanceof Error ? error.message : 'Неизвестная ошибка'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testEmail } = await request.json()
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        success: false,
        error: 'Отсутствуют переменные окружения Supabase'
      }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    
    // В Supabase 2.x нет встроенного метода sendRawEmail
    // Вместо этого создадим запись в базе данных для логирования
    try {
      const { data, error } = await supabase
        .from('quiz_notifications')
        .insert([
          {
            email: testEmail || 'admin@prostoburo.com',
            subject: '🧪 Тест email от Supabase',
            content: 'Это тестовое сообщение от Supabase email сервиса.',
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select()
      
      if (error) {
        console.error('Ошибка создания записи:', error)
        return NextResponse.json({
          success: false,
          error: 'Ошибка создания записи в БД',
          details: error.message,
          suggestion: 'Нужно создать таблицу quiz_notifications или использовать Edge Function'
        }, { status: 400 })
      }
      
      console.log('✅ Запись создана в БД:', data)
      return NextResponse.json({
        success: true,
        message: 'Тестовое уведомление сохранено в БД',
        data: data,
        note: 'Для реальной отправки email нужно настроить Edge Function или использовать внешний сервис'
      })
      
    } catch (dbError) {
      console.error('Ошибка при работе с БД:', dbError)
      return NextResponse.json({
        success: false,
        error: 'Ошибка при работе с БД',
        details: dbError instanceof Error ? dbError.message : 'Неизвестная ошибка',
        suggestion: 'Проверьте структуру БД или создайте таблицу quiz_notifications'
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('Ошибка обработки запроса:', error)
    return NextResponse.json({
      success: false,
      error: 'Ошибка обработки запроса'
    }, { status: 500 })
  }
}
