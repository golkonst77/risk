"use client"

import { useContactForm } from "./use-contact-form"
import { useState } from "react"

export const useCruiseClick = () => {
  const { openContactForm } = useContactForm()
  const [modalOpen, setModalOpen] = useState(false)
  const [quizUrl, setQuizUrl] = useState<string | null>(null)

  const handleCruiseClick = async () => {
    openContactForm()
  }

  return { handleCruiseClick, modalOpen, setModalOpen, quizUrl }
}