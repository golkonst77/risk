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
        <DialogHeader className="p-4 border-b flex items-center justify-between gap-3">
          <DialogTitle className="text-lg font-medium truncate">{title}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={pdfPath} download target="_blank" rel="noopener noreferrer">
                Скачать PDF
              </a>
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="w-full h-[calc(95vh-72px)] flex-1 overflow-hidden bg-white">
          <iframe 
            src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=1`}
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