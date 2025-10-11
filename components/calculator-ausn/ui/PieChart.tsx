"use client"

import { DASHBOARD_THEME } from "../dashboard-theme"

export interface PieChartSegment {
  label: string
  value: number
  color: string
  percentage?: number
}

interface PieChartProps {
  segments: PieChartSegment[]
  size?: number
  showLegend?: boolean
  showLabels?: boolean
  className?: string
}

export function PieChart({
  segments,
  size = 200,
  showLegend = true,
  showLabels = true,
  className = '',
}: PieChartProps) {
  // Вычисляем общую сумму
  const total = segments.reduce((sum, seg) => sum + seg.value, 0)
  
  // Вычисляем проценты для каждого сегмента
  const segmentsWithPercentage = segments.map(seg => ({
    ...seg,
    percentage: (seg.value / total) * 100,
  }))

  // Генерируем SVG path для каждого сегмента
  const generatePaths = () => {
    let currentAngle = -90 // Начинаем с верха
    const radius = size / 2
    const center = size / 2

    return segmentsWithPercentage.map((segment, index) => {
      const angle = (segment.percentage / 100) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle

      // Конвертируем углы в радианы
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      // Вычисляем координаты
      const x1 = center + radius * Math.cos(startRad)
      const y1 = center + radius * Math.sin(startRad)
      const x2 = center + radius * Math.cos(endRad)
      const y2 = center + radius * Math.sin(endRad)

      // Флаг для больших дуг (> 180 градусов)
      const largeArc = angle > 180 ? 1 : 0

      // Создаём SVG path
      const path = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
        Z
      `

      currentAngle = endAngle

      return (
        <path
          key={index}
          d={path}
          fill={segment.color}
          className="transition-opacity hover:opacity-80 cursor-pointer"
        />
      )
    })
  }

  return (
    <div className={`flex flex-col md:flex-row items-center gap-6 ${className}`}>
      {/* SVG круговая диаграмма */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {generatePaths()}
        </svg>
        
        {/* Центральная информация */}
        {showLabels && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900">
              {total.toLocaleString('ru-RU')}
            </div>
            <div className="text-sm text-gray-600">Итого</div>
          </div>
        )}
      </div>

      {/* Легенда */}
      {showLegend && (
        <div className="flex flex-col gap-3 flex-1">
          {segmentsWithPercentage.map((segment, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {segment.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {segment.value.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-xs text-gray-500">
                  ({segment.percentage?.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

