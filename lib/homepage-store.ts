import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Хранилище настроек главной страницы
interface HeroConfig {
  badge: {
    text: string
    show: boolean
  }
  title: {
    text: string
    highlightText: string
  }
  description: string
  button: {
    text: string
    show: boolean
  }
  features: Array<{
    id: string
    title: string
    description: string
    icon: string
    color: string
    show: boolean
  }>
  background: {
    image: string
    overlay: number
  }
  layout: {
    alignment: string
    maxWidth: string
    marginLeft: number
    marginTop: number
    marginBottom: number
    paddingX: number
  }
}

const DATA_FILE = join(process.cwd(), 'data', 'homepage.json')

// Настройки по умолчанию
const defaultHeroConfig: HeroConfig = {
  badge: { text: "Поможем сделать правильный выбор налогообложения", show: true },
  title: { text: "ПОРТАЛ — навигатор по АУСН для малого бизнеса:", highlightText: "калькулятор, чек-лист, документы" },
  description:
    "Помогаем оценить право на АУСН, рассчитать налог и подготовить документы. Понятные инструкции и консультация без лишней бюрократии.",
  button: { text: "Получить консультацию бесплатно", show: true },
  features: [
    {
      id: "calc",
      title: "Калькулятор",
      description: "Расчёт налога и взносов АУСН",
      icon: "Calculator",
      color: "blue",
      show: true,
    },
    {
      id: "checklist",
      title: "Чек-лист",
      description: "Проверка права на АУСН",
      icon: "CheckCircle",
      color: "green",
      show: true,
    },
    {
      id: "docs",
      title: "Документы",
      description: "Пакет для перехода на АУСН",
      icon: "FileText",
      color: "orange",
      show: true,
    },
  ],
  background: { image: "/uploads/1752577122792_hero-bg.jpg", overlay: 25 },
  layout: {
    alignment: "center",
    maxWidth: "max-w-4xl",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingX: 60,
  },
}

export function getHeroConfig(): HeroConfig {
  try {
    const data = readFileSync(DATA_FILE, 'utf8')
    const config = JSON.parse(data)
    
    // Читаем фон из site-config.json
    try {
      const siteConfigFile = join(process.cwd(), 'data', 'site-config.json')
      const siteConfigData = readFileSync(siteConfigFile, 'utf8')
      const siteConfig = JSON.parse(siteConfigData)
      
      // Подставляем фон из site-config
      const hasHomepageBg = Boolean(config?.background?.image)
      if (!hasHomepageBg && siteConfig.hero?.backgroundImage) {
        config.background = {
          image: `/${siteConfig.hero.backgroundImage}`,
          overlay: siteConfig.hero.overlay || 30
        }
      }
    } catch (bgError) {
      console.log('site-config.json не найден, используем фон из homepage.json')
    }
    
    console.log('Получение настроек главной страницы:', config)
    return config
  } catch (error) {
    console.error('Ошибка чтения файла настроек главной страницы:', error)
    return defaultHeroConfig
  }
}

export function updateHeroConfig(newConfig: Partial<HeroConfig>): HeroConfig {
  console.log("Обновление настроек главной страницы:", newConfig)
  
  const currentConfig = getHeroConfig()
  
  // Глубокое слияние для правильного обновления вложенных объектов
  const updatedConfig = {
    ...currentConfig,
    ...newConfig,
    badge: newConfig.badge ? { ...currentConfig.badge, ...newConfig.badge } : currentConfig.badge,
    title: newConfig.title ? { ...currentConfig.title, ...newConfig.title } : currentConfig.title,
    button: newConfig.button ? { ...currentConfig.button, ...newConfig.button } : currentConfig.button,
    background: newConfig.background ? { ...currentConfig.background, ...newConfig.background } : currentConfig.background,
    layout: newConfig.layout ? { ...currentConfig.layout, ...newConfig.layout } : currentConfig.layout,
    features: newConfig.features || currentConfig.features
  }
  
  try {
    writeFileSync(DATA_FILE, JSON.stringify(updatedConfig, null, 2))
    console.log("Настройки сохранены в файл")
  } catch (error) {
    console.error("Ошибка сохранения настроек:", error)
  }
  
  console.log("Новые настройки:", updatedConfig)
  return updatedConfig
}

export type { HeroConfig }
