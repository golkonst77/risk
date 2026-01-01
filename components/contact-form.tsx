"use client"

import { QuizModal } from "./quiz-modal"
import { useContactForm } from "@/hooks/use-contact-form"

export function ContactForm() {
  const { startAtFinalStep } = useContactForm()
  return <QuizModal />
}
