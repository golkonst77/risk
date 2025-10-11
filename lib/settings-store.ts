// Supabase полностью отключен. Используем локальные данные.
import { getSiteConfig } from './site-config'

// Общее хранилище настроек для всего приложения
export interface SiteSettings {
  siteName: string
  siteDescription: string
  phone: string
  email: string
  address: string
  telegram: string
  vk: string
  maintenanceMode: boolean
  analyticsEnabled: boolean
  quiz_mode?: "custom" | "external"
  quiz_url?: string
  // Время работы
  working_hours?: {
    monday_friday?: string
    saturday?: string
    sunday?: string
  }
  // Логотип
  logoType?: "text" | "image"
  logoImageUrl?: string
  logoText?: string
  logoShow?: boolean
}

// Нет клиента БД, только локальные настройки

// Временное хранилище для разработки (когда Supabase не настроен)
let localSettings: SiteSettings = {
  siteName: "Просто Бюро",
  siteDescription: "Бухгалтерские услуги",
  phone: "+7953 330-17-77",
  email: "urist40@gmail.com",
  address: "Калуга, Дзержинского 37, офис 20",
  telegram: "@prostoburo",
  vk: "vk.com/buh_urist",
  maintenanceMode: false,
  analyticsEnabled: true,
  quiz_mode: "custom",
  quiz_url: "#popup:marquiz_685a59bddc273b0019e372cd",
  working_hours: {
    monday_friday: "9:00 - 18:00",
    saturday: "По согласованию",
    sunday: "Выходной"
  },
  logoType: "image",
  logoImageUrl: "/Логотип.jpg",
  logoText: "ПростоБюро",
  logoShow: true
}

// Функция для маппинга данных из базы в интерфейс
function mapDatabaseToSettings(dbData: any): SiteSettings {
  return {
    siteName: dbData.sitename ?? dbData.site_name ?? "Просто Бюро",
    siteDescription: dbData.sitedescription ?? dbData.site_description ?? "Бухгалтерские услуги",
    phone: dbData.phone ?? "+7953 330-17-77",
    email: dbData.email ?? "urist40@gmail.com",
    address: dbData.address ?? "Калуга, Дзержинского 37, офис 20",
    telegram: dbData.telegram ?? "@prostoburo",
    vk: dbData.vk ?? "vk.com/buh_urist",
    maintenanceMode: dbData.maintenance_mode ?? dbData.maintenancemode ?? false,
    analyticsEnabled: dbData.analytics_enabled ?? dbData.analyticsenabled ?? true,
    quiz_mode: dbData.quiz_mode ?? "custom",
    quiz_url: dbData.quiz_url ?? "#popup:marquiz_685a59bddc273b0019e372cd",
    working_hours: {
      monday_friday: dbData.working_hours?.monday_friday ?? "9:00 - 18:00",
      saturday: dbData.working_hours?.saturday === "?? ????????????" ? "По согласованию" : (dbData.working_hours?.saturday ?? "По согласованию"),
      sunday: dbData.working_hours?.sunday === "????????" ? "Выходной" : (dbData.working_hours?.sunday ?? "Выходной")
    },
    logoType: dbData.logo_type ?? "text",
    logoImageUrl: dbData.logo_image_url ?? "",
    logoText: dbData.logo_text ?? dbData.sitename ?? "ПростоБюро",
    logoShow: dbData.logo_show ?? true
  }
}

export async function getSettings(): Promise<any> {
  // Читаем из site-config.json
  const siteConfig = getSiteConfig()
  
  return {
    siteName: siteConfig.site.name,
    siteDescription: siteConfig.site.description,
    phone: siteConfig.contacts.phone,
    email: siteConfig.contacts.email,
    address: siteConfig.contacts.address,
    telegram: siteConfig.contacts.telegram,
    vk: siteConfig.contacts.vk,
    maintenanceMode: siteConfig.maintenanceMode,
    analyticsEnabled: siteConfig.analytics.enabled,
    working_hours: {
      monday_friday: siteConfig.workingHours.mondayFriday,
      saturday: siteConfig.workingHours.saturday,
      sunday: siteConfig.workingHours.sunday
    },
    logoType: siteConfig.logo.type,
    logoImageUrl: siteConfig.logo.imageUrl,
    logoText: siteConfig.logo.text,
    logoShow: true,
    header: {
      logo: {
        show: true,
        type: siteConfig.logo.type,
        imageUrl: siteConfig.logo.imageUrl,
        text: siteConfig.logo.text
      }
    }
  }
}

export async function updateSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings | null> {
  // В статическом режиме просто обновляем локальный объект
  localSettings = { ...localSettings, ...newSettings }
  return localSettings
}
