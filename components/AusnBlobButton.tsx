"use client"

export function AusnBlobButton() {
  return (
    <a
      href="https://prostoburo.com/"
      className="
        fixed z-[60] top-[22vh] right-[7vw] md:top-[24vh] md:right-[10vw]
        flex items-center justify-center
        w-16 h-16 md:w-48 md:h-48
        bg-[#FF00A8]
        text-white text-[9px] md:text-xl font-extrabold leading-[1.05] md:leading-tight
        shadow-[0_0_40px_rgba(255,0,168,0.8)]
        rotate-[-18deg]
        hover:rotate-[-10deg]
        hover:scale-110
        transition-transform duration-300 ease-out
        cursor-pointer
        select-none
        blob-ausn
        blob-ausn-vibrate
      "
    >
      Закажи<br />бухгалтера!
    </a>
  )
}
