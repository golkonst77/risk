"use client"

import { DASHBOARD_THEME, getLimitColor } from "../dashboard-theme"

interface ProgressBarProps {
  value: number
  max: number
  color?: string
  label?: string
  showPercentage?: boolean
  animated?: boolean
  height?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ProgressBar({
  value,
  max,
  color,
  label,
  showPercentage = true,
  animated = true,
  height = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const autoColor = color || getLimitColor(percentage)
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold" style={{ color: autoColor }}>
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      
      <div 
        className={`relative w-full bg-gray-100 rounded-full overflow-hidden ${heightClasses[height]}`}
      >
        <div
          className={`h-full rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: autoColor,
            boxShadow: `0 0 8px ${autoColor}40`,
          }}
        />
      </div>
    </div>
  )
}

