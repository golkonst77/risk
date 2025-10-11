/**
 * Dashboard Theme Configuration
 * Цветовая схема и константы стилей для калькулятора АУСН в dashboard-стиле
 */

export const DASHBOARD_THEME = {
  colors: {
    primary: '#F8743C',
    secondary: '#22215B',
    background: '#FAFAFF',
    cardBackground: '#FFFFFF',
    
    // Цвета для графиков
    chart: {
      usn6: '#3B82F6',      // Синий
      usn15: '#8B5CF6',     // Фиолетовый
      osno: '#6B7280',      // Серый
      ausn8: '#10B981',     // Зелёный
      ausn20: '#F59E0B',    // Оранжевый
    },
    
    // Цвета для статусов
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      info: '#3B82F6',
    },
    
    // Градиенты
    gradients: {
      primary: 'linear-gradient(135deg, #F8743C 0%, #FF9A6C 100%)',
      secondary: 'linear-gradient(135deg, #22215B 0%, #4A4983 100%)',
      success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      chart: 'linear-gradient(180deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 100%)',
    }
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(48, 50, 92, 0.08)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    card: '0 8px 24px rgba(48, 50, 92, 0.08)',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  
  spacing: {
    cardPadding: '24px',
    sectionGap: '24px',
    elementGap: '16px',
  },
  
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    sizes: {
      hero: '3.75rem',    // 60px - для больших цифр экономии
      title: '1.875rem',  // 30px - заголовки карточек
      subtitle: '1.25rem', // 20px - подзаголовки
      body: '1rem',       // 16px - основной текст
      small: '0.875rem',  // 14px - вспомогательный текст
    }
  },
  
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
    }
  }
} as const

// Утилита для получения цвета статуса лимита
export function getLimitColor(percentage: number): string {
  if (percentage >= 90) return DASHBOARD_THEME.colors.status.danger
  if (percentage >= 70) return DASHBOARD_THEME.colors.status.warning
  return DASHBOARD_THEME.colors.status.success
}

// Утилита для форматирования больших чисел
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

// Утилита для форматирования процентов
export function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}

