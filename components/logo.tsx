"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import siteConfig from "@/data/site-config.json"

interface LogoConfig {
  text: string
  show: boolean
  type: "text" | "image"
  imageUrl?: string
}

interface LogoProps {
  siteName?: string
  className?: string
}

export function Logo({ siteName = "ПростоБюро РИСКИ", className = "" }: LogoProps) {
  const fixedLogoText = "ПростоБюро РИСКИ"

  const logoConfig = useMemo<LogoConfig>(() => {
    const cfg: any = siteConfig
    const type = (cfg?.logo?.type === 'image' ? 'image' : 'text') as LogoConfig['type']
    const imageUrl = typeof cfg?.logo?.imageUrl === 'string' ? cfg.logo.imageUrl : ''
    const text = fixedLogoText
    return {
      show: true,
      type,
      imageUrl,
      text,
    }
  }, [])

  if (!logoConfig.show) {
    return null
  }

  // Добавляем timestamp для избежания кэширования изображений
  const imageUrl = logoConfig.imageUrl ? `${logoConfig.imageUrl}?t=${Date.now()}` : ""

  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      {logoConfig.type === "image" && logoConfig.imageUrl ? (
        <>
          <div className="relative h-12 w-12">
            <Image
              src={imageUrl}
              alt={logoConfig.text || siteName}
              fill
              className="object-contain rounded-lg"
              unoptimized={true} // Отключаем оптимизацию Next.js для избежания кэширования
            />
          </div>
          <span className="font-bold text-xl">
            ПростоБюро <span className="text-red-600 text-2xl font-extrabold">РИСКИ</span>
          </span>
        </>
      ) : (
        <>
          <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">ПБ</span>
          </div>
          <span className="font-bold text-xl">
            ПростоБюро <span className="text-red-600 text-2xl font-extrabold">РИСКИ</span>
          </span>
        </>
      )}
    </Link>
  )
}