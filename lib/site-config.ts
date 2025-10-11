import { readFileSync } from 'fs'
import { join } from 'path'

export interface SiteConfig {
  site: {
    name: string
    description: string
  }
  contacts: {
    phone: string
    email: string
    address: string
    telegram: string
    vk: string
  }
  workingHours: {
    mondayFriday: string
    saturday: string
    sunday: string
  }
  logo: {
    type: 'text' | 'image'
    imageUrl: string
    text: string
  }
  hero: {
    backgroundImage: string
    overlay: number
  }
  analytics: {
    yandexMetrikaId: string
    enabled: boolean
  }
  maintenanceMode: boolean
}

const CONFIG_FILE = join(process.cwd(), 'data', 'site-config.json')

// Дефолтные настройки
const defaultConfig: SiteConfig = {
  site: {
    name: "Портал АУСН",
    description: "Навигатор по АУСН"
  },
  contacts: {
    phone: "+7 (953) 330-17-77",
    email: "info@ausn-portal.ru",
    address: "Калуга",
    telegram: "@prostoburo",
    vk: "vk.com/buh_urist"
  },
  workingHours: {
    mondayFriday: "9:00 - 18:00",
    saturday: "По согласованию",
    sunday: "Выходной"
  },
  logo: {
    type: "text",
    imageUrl: "",
    text: "Портал АУСН"
  },
  hero: {
    backgroundImage: "hero-bg.jpg",
    overlay: 30
  },
  analytics: {
    yandexMetrikaId: "45860892",
    enabled: true
  },
  maintenanceMode: false
}

export function getSiteConfig(): SiteConfig {
  try {
    const data = readFileSync(CONFIG_FILE, 'utf8')
    const config = JSON.parse(data)
    console.log('Загружен site-config.json:', config)
    return config
  } catch (error) {
    console.error('Ошибка чтения site-config.json, используем дефолтные настройки:', error)
    return defaultConfig
  }
}

