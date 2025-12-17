"use client"

export function AusnBlobButton() {
  return (
    <a
      href="/"
      className="
        fixed z-[60] bottom-8 right-6
        relative
        flex items-center justify-center
        w-48 h-48
        bg-[#FF00A8]
        text-white text-xl font-extrabold leading-tight
        shadow-[0_0_40px_rgba(255,0,168,0.8)]
        rotate-[-18deg]
        hover:rotate-[-10deg]
        hover:scale-110
        transition-transform duration-300 ease-out
        cursor-pointer
        select-none
        blob-ausn
      "
    >
      АУСН<br />для&nbsp;своих
    </a>
  )
}
