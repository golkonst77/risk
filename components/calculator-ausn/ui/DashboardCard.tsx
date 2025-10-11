"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DASHBOARD_THEME } from "../dashboard-theme"

interface DashboardCardProps {
  title: string
  description?: string
  children: ReactNode
  gradient?: 'primary' | 'secondary' | 'success' | 'none'
  className?: string
  headerClassName?: string
  tabs?: Array<{ label: string; active?: boolean; onClick?: () => void }>
}

export function DashboardCard({
  title,
  description,
  children,
  gradient = 'none',
  className = '',
  headerClassName = '',
  tabs,
}: DashboardCardProps) {
  const gradientStyles: Record<string, string> = {
    primary: 'bg-gradient-to-r from-orange-50 to-amber-50',
    secondary: 'bg-gradient-to-r from-indigo-50 to-purple-50',
    success: 'bg-gradient-to-r from-green-50 to-emerald-50',
    none: 'bg-gray-50',
  }

  return (
    <Card 
      className={`rounded-3xl bg-white/95 border border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.06)] hover:shadow-[0_14px_40px_rgba(2,6,23,0.10)] transition-shadow duration-300 ${className}`}
      style={{ borderRadius: DASHBOARD_THEME.borderRadius.lg }}
    >
      <CardHeader 
        className={`border-b ${gradientStyles[gradient]} ${headerClassName}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1 text-sm text-gray-600">
                {description}
              </CardDescription>
            )}
          </div>
          
          {tabs && tabs.length > 0 && (
            <div className="flex gap-2">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={tab.onClick}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                    tab.active
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  )
}

