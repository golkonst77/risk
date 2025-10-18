"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PDFViewerModalProps {
  isOpen: boolean
  onClose: () => void
  pdfPath: string
  title?: string
}

export function PDFViewerModal({ isOpen, onClose, pdfPath, title = "Документ" }: PDFViewerModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[95vw] h-[95vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b flex justify-between items-center">
          <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="w-full h-[calc(95vh-4rem)] flex-1 overflow-hidden bg-white">
          <iframe 
            src={`${pdfPath}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border-0" 
            title={title}
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ display: 'block', backgroundColor: 'white' }}
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}