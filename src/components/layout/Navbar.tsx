import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CV_FILENAME, CV_URL } from '../../data/cv'

const links = [
  { label: 'À propos', section: 'about' },
  { label: 'Contact', section: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (section: string) => {
    setMenuOpen(false)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-3 shadow-[0_12px_40px_rgba(68,55,68,.08)] backdrop-blur-xl transition-all sm:px-4"
        style={{ background: scrolled ? 'rgba(255,250,247,.88)' : 'rgba(255,250,247,.68)', borderColor: 'rgba(234,223,225,.9)' }}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-2.5" aria-label="Retour en haut">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full soft-gradient text-[11px] font-black text-white shadow-sm transition-transform group-hover:-rotate-6">LT</span>
          <span className="hidden text-sm font-bold sm:block">Liora Toledano</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <button key={link.section} onClick={() => scrollTo(link.section)} className="rounded-full px-4 py-2 text-sm font-medium text-[#766d76] transition hover:bg-white hover:text-[#443744]">{link.label}</button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a href={CV_URL} download={CV_FILENAME} className="rounded-full border bg-white/70 px-4 py-2.5 text-xs font-bold text-[#443744] transition hover:-translate-y-0.5 hover:bg-white" style={{ borderColor: 'var(--color-border)' }}>CV <span className="ml-1">↓</span></a>
          <button onClick={() => scrollTo('contact')} className="rounded-full bg-[#443744] px-5 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#59495a]">Parlons-en <span className="ml-1">↗</span></button>
        </div>
        <button onClick={() => setMenuOpen((v) => !v)} className="rounded-full border bg-white/70 p-2.5 md:hidden" style={{ borderColor: 'var(--color-border)' }} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>
          <div className="flex w-5 flex-col gap-1.5"><span className="h-[2px] w-full rounded-full bg-[#443744]" /><span className="h-[2px] w-3/4 rounded-full bg-[#443744]" /></div>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-3 mt-2 rounded-[1.5rem] border bg-[#fffaf7]/95 p-2 shadow-xl backdrop-blur-xl md:hidden" style={{ borderColor: 'var(--color-border)' }}>
            {links.map((link) => <button key={link.section} onClick={() => scrollTo(link.section)} className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold hover:bg-white">{link.label}</button>)}
            <a href={CV_URL} download={CV_FILENAME} onClick={() => setMenuOpen(false)} className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold hover:bg-white">Télécharger mon CV ↓</a>
            <button onClick={() => scrollTo('contact')} className="mt-1 block w-full rounded-2xl bg-[#443744] px-4 py-3 text-left text-sm font-bold text-white">Parlons-en ↗</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
