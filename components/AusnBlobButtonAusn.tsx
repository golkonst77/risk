"use client"

export function AusnBlobButtonAusn() {
  return (
    <>
      {/* Мобильная версия */}
      <a
        href="https://prostoburo.com/ausn/"
        className="
          fixed z-[60] top-auto right-[4vw] md:hidden
          flex items-center justify-center
          bg-[#FF00A8]
          text-white text-[6px] font-extrabold leading-[1.05]
          shadow-[0_0_20px_rgba(255,0,168,0.55)]
          rotate-[-18deg]
          hover:rotate-[-10deg]
          hover:scale-110
          transition-transform duration-300 ease-out
          cursor-pointer
          select-none
          blob-ausn
          blob-ausn-vibrate
        "
        style={{
          width: '44.8px',
          height: '44.8px',
          bottom: 'calc(14vh - 4rem - 4.75rem)',
        }}
      >
        АУСН
      </a>
      {/* Десктопная версия */}
      <a
        href="https://prostoburo.com/ausn/"
        className="
          fixed z-[60] bottom-auto right-[12vh] hidden md:flex items-center justify-center
          bg-[#FF00A8]
          text-white text-[14px] font-extrabold leading-tight
          shadow-[0_0_20px_rgba(255,0,168,0.55)]
          rotate-[-18deg]
          hover:rotate-[-10deg]
          hover:scale-110
          transition-transform duration-300 ease-out
          cursor-pointer
          select-none
          blob-ausn
          blob-ausn-vibrate
        "
        style={{
          width: '134.4px',
          height: '134.4px',
          top: 'calc(12vh + 12rem + 4.75rem)',
        }}
      >
        АУСН
      </a>
    </>
  )
}
