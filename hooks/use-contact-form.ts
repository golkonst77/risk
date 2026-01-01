"use client"

import { create } from "zustand"

interface ContactFormStore {
  isOpen: boolean
  openContactForm: () => void
  openContactFormFinal: () => void
  closeContactForm: () => void
  startAtFinalStep: boolean
}

export const useContactForm = create<ContactFormStore>((set) => ({
  isOpen: false,
  startAtFinalStep: false,
  openContactForm: () => set({ isOpen: true, startAtFinalStep: false }),
  openContactFormFinal: () => set({ isOpen: true, startAtFinalStep: true }),
  closeContactForm: () => set({ isOpen: false, startAtFinalStep: false }),
}))
