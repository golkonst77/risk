"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Menu, X } from "lucide-react"
import { useContactForm } from "@/hooks/use-contact-form"
import { useCruiseClick } from "@/hooks/use-cruise-click"
import { Logo } from "./logo"
 

const MENU_ITEMS = [
  { id: 'technologies', title: 'Инструкции', href: '/#technologies', isAnchor: true },
  { id: 'calculator', title: 'Калькулятор', href: '/#calculator', isAnchor: true },
  { id: 'regions', title: 'Регионы', href: '/regions', isAnchor: false },
  { id: 'banks', title: 'Банки', href: '/banks', isAnchor: false },
  { id: 'news', title: 'Новости', href: '/#news', isAnchor: true },
  { id: 'support', title: 'Поддержка', href: '/#support', isAnchor: true },
  { id: 'faq', title: 'FAQ', href: '/#faq', isAnchor: true },
  { id: 'contacts', title: 'Контакты', href: '/#contacts', isAnchor: true },
]

export const Header = () => {
  const router = useRouter()
  const appPathname = usePathname()
  const { openContactForm } = useContactForm()
  const { handleCruiseClick, modalOpen, setModalOpen } = useCruiseClick()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState({
    phone: '+7 (953) 330-17-77',
    email: 'info@example.com',
    address: '',
    telegram: '',
    vk: ''
  })
  const [isClient, setIsClient] = useState(false)
  const [currentHash, setCurrentHash] = useState("")
  
  useEffect(() => {
    setIsClient(true)
    
    // Загружаем настройки
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' })
        const loadedSettings = await res.json()
        if (loadedSettings) {
          setSettings(prev => ({
            ...prev,
            ...loadedSettings
          }))
        }
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
    
    loadSettings()
  }, [])

  useEffect(() => {
    if (!isClient) return

    const updateHash = () => {
      setCurrentHash(window.location.hash || "")
    }

    updateHash()
    window.addEventListener("hashchange", updateHash)
    window.addEventListener("popstate", updateHash)

    return () => {
      window.removeEventListener("hashchange", updateHash)
      window.removeEventListener("popstate", updateHash)
    }
  }, [isClient])
  
  const pathname = appPathname || ""
  const runtimeBasePath = pathname.startsWith("/ausn") ? "/ausn" : ""
  const normalizedPath = runtimeBasePath ? pathname.slice(runtimeBasePath.length) || "/" : pathname
  
  // Все пункты меню видны
  const visibleMenuItems = MENU_ITEMS

  const getMenuHref = (item: any) => {
    if (!runtimeBasePath) return item.href
    return `${runtimeBasePath}${item.href}`
  }

  const handleMenuClick = (item: any) => (e: React.MouseEvent) => {
    if (item.isAnchor) {
      const hrefHash = (item.href || "").split("#")[1] ? `#${(item.href || "").split("#")[1]}` : ""
      if (hrefHash) {
        setCurrentHash(hrefHash)
      }
      if (normalizedPath !== "/") {
        e.preventDefault()
        router.push(getMenuHref(item))
      }
    }
  }

  const isActiveMenuItem = (item: any) => {
    if (!isClient) return false

    if (item.isAnchor) {
      // Активируем якорь только на главной.
      if (normalizedPath !== "/") return false
      const hrefHash = (item.href || "").split("#")[1] ? `#${(item.href || "").split("#")[1]}` : ""
      if (!hrefHash) return false
      return (currentHash || "") === hrefHash
    }

    return normalizedPath === item.href
  }

  const renderMenuItem = (item: any) => {
    const active = isActiveMenuItem(item)
    return (
      <Link
        key={item.id}
        href={getMenuHref(item)}
        onClick={handleMenuClick(item)}
        className={
          "inline-flex items-center justify-center px-5 py-3 text-base font-semibold rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap " +
          (active
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-800 bg-gray-100 hover:bg-blue-600 hover:text-white")
        }
      >
        {item.title}
      </Link>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="w-full px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block flex-1 mx-6">
          <ul className="flex items-center justify-center gap-2">
            {visibleMenuItems.map(renderMenuItem)}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Открыть меню"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Right side widgets */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Контакты: телефон */}
          <a
            href={`tel:${settings.phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
            title={settings.phone}
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* CTA Button */}
          <Button
            onClick={handleCruiseClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Получить консультацию
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
                         <nav className="space-y-2">
               {visibleMenuItems.map((item) => (
                 <Link
                   key={item.id}
                   href={getMenuHref(item)}
                   onClick={(e) => {
                     handleMenuClick(item)(e)
                     setMobileMenuOpen(false)
                   }}
                   className={
                     "block px-4 py-2 rounded-lg transition-colors " +
                     (isActiveMenuItem(item)
                       ? "bg-blue-600 text-white"
                       : "text-gray-700 hover:bg-gray-100")
                   }
                 >
                   {item.title}
                 </Link>
               ))}
              <div className="pt-4 border-t">
                <a
                  href={`tel:${settings?.phone?.replace(/\s/g, '') || '+79533301777'}`}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{settings?.phone || '+7953 330-17-77'}</span>
                </a>
                <a
                  href="https://t.me/prostoburo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Telegram</span>
                </a>
                <Button
                  onClick={() => {
                    handleCruiseClick()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Получить скидку
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
