import { Metadata } from "next"
import RegionsClient from "./regions-client"

export const metadata: Metadata = {
  title: "Регионы АУСН | Просто Бюро - Полный список субъектов РФ для применения АУСН",
  description: "Актуальный список из 69 регионов России, где действует автоматизированная упрощённая система налогообложения. Официальные данные ФНС с кодами субъектов.",
  keywords: "регионы АУСН, субъекты РФ АУСН, где действует АУСН, коды регионов АУСН, Москва АУСН, Калуга АУСН",
}

export default function RegionsPage() {
  return <RegionsClient />
}

