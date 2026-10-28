export function Footer() {
  return (
    <footer className="border-t bg-[#443744] px-5 py-7 text-white md:px-8" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e98b9b] text-[10px] font-black">LT</span>
          <span className="text-sm font-bold">Liora Toledano</span>
        </div>
        <p className="text-xs text-white/40">Construit avec React · TypeScript · Tailwind</p>
        <p className="text-xs text-white/40">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
