import { Metadata } from "next"
import SupportClient from "./support-client"

export const metadata: Metadata = {
  title: "Юридическая поддержка по АУСН | Просто Бюро - Консультации и помощь по налогообложению",
  description: "Профессиональная юридическая поддержка по АУСН: консультации по переходу, представительство при проверках, помощь с документами. Защита прав предпринимателей в спорах с ИФНС.",
  keywords: "юридическая поддержка АУСН, консультации АУСН, помощь с переходом на АУСН, налоговые споры, защита в ИФНС",
}

export default function SupportPage() {
  return <SupportClient />
}

