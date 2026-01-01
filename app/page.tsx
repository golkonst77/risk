"use client"

import { NewHero } from "@/components/homepage/NewHero"
import { ForWhom } from "@/components/homepage/ForWhom"
import { CalculatorsShowcase } from "@/components/homepage/CalculatorsShowcase"
import { HowItWorks } from "@/components/homepage/HowItWorks"
import { TrustBlock } from "@/components/homepage/TrustBlock"
import { NextSteps } from "@/components/homepage/NextSteps"
import { SupportSection } from "@/components/support-section"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { Contacts } from "@/components/contacts"
import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.location.hash) return
    
    let attempts = 0
    function tryScroll() {
      const el = document.getElementById(window.location.hash.substring(1))
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      } else if (attempts < 5) {
        attempts++
        setTimeout(tryScroll, 200)
      }
    }
    tryScroll()
  }, [typeof window !== "undefined" ? window.location.hash : null])

  return (
    <main id="home-page" className="min-h-screen">
      <NewHero />
      <ForWhom />
      <CalculatorsShowcase />
      <HowItWorks />
      <TrustBlock />
      <NextSteps />
      <SupportSection />
      <FAQ />
      <Reviews />
      <Contacts />
    </main>
  )
}
