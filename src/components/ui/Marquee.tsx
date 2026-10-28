import { motion } from 'framer-motion'

const items = ['React', 'TypeScript', 'Full-Stack', 'Laravel', 'API REST', 'UI / UX', 'Three.js', 'Tailwind', 'Symfony', 'Python', 'Machine Learning', 'Agile / Scrum']

export function Marquee() {
  const repeated = [...items, ...items]
  return (
    <div className="overflow-hidden border-y bg-white py-4" style={{ borderColor: 'var(--color-border)' }} aria-hidden="true">
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>
            {item}
            <span className="text-[#e98b9b]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
