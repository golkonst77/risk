import { Metadata } from "next"
import SupportClient from "./support-client"

export const metadata: Metadata = {
  title: "Юридическая поддержка по налоговым рискам | Просто Бюро - Консультации и защита",
  description: "Профессиональная поддержка по налоговым рискам: оценка рисков дробления бизнеса и работы с самозанятыми, легитимизация структуры, защита при проверках ФНС.",
  keywords: "налоговые риски, дробление бизнеса, самозанятые, защита при проверках ФНС, легитимизация структуры, налоговые консультации",
}

export default function SupportPage() {
  return <SupportClient />
}

