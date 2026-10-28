import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Code2, Download, Heart, Server, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { CV_FILENAME, CV_URL } from '../../data/cv'

const words = ['React', 'TypeScript', 'PHP', 'Java', 'Python', 'MySQL']

export function Hero() {
    const ref = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })

    const blobY = useTransform(scrollYProgress, [0, 1], [0, 90])

    return (
        <section
            ref={ref}
            className="relative min-h-screen overflow-hidden pt-24"
            aria-label="Présentation"
        >
            <motion.div
                style={{ y: blobY }}
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                <div className="absolute -right-28 top-20 h-72 w-72 rounded-[42%_58%_55%_45%] bg-[#f3c2ca]/55 blur-2xl sm:h-[430px] sm:w-[430px]" />

                <div className="absolute -left-28 bottom-0 h-72 w-72 rounded-[58%_42%_38%_62%] bg-[#cbbce3]/45 blur-2xl sm:h-[430px] sm:w-[430px]" />

                <div className="absolute left-[48%] top-[24%] h-32 w-32 rounded-full bg-[#f5c7b3]/35 blur-2xl sm:h-44 sm:w-44" />
            </motion.div>

            <div
                className="soft-grid pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl -translate-y-16 items-center px-5 py-12 sm:px-7 md:py-20">
                <div className="grid w-full items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
                    <div className="min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border bg-white/75 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#6f6570] shadow-sm sm:px-4 sm:text-xs"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
                            <span className="h-2 w-2 shrink-0 rounded-full bg-[#9dc9ac]" />
                            Développeuse Full-Stack
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.08,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="font-display max-w-full text-[clamp(3.05rem,16vw,4.8rem)] font-black leading-[.8] tracking-[-.07em] sm:text-[clamp(4rem,12vw,7.2rem)] lg:text-[clamp(4rem,8vw,7.2rem)]"
                        >
                            LIORA
                            <br />
                            <span className="text-gradient">TOLEDANO</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.6 }}
                            className="mt-8 max-w-2xl text-lg font-semibold leading-8 sm:text-xl md:text-2xl"
                        >
                            Je développe des applications web qui ont{' '}
                            <span className="relative whitespace-nowrap">
                une personnalité
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-[#efb09d]/75" />
              </span>
                            .
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.38, duration: 0.6 }}
                            className="mt-4 max-w-xl text-sm leading-7 text-[#7d737d] sm:text-base"
                        >
                            De l'API jusqu'à l'interface, je construis des produits fiables,
                            soignés et pensés pour celles et ceux qui les utilisent.
                        </motion.p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <button
                                onClick={() =>
                                    document
                                        .getElementById('about')
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#443744] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#574858] sm:w-auto"
                            >
                                Découvrir mon parcours
                                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                            </button>

                            <button
                                onClick={() =>
                                    document
                                        .getElementById('contact')
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full border bg-white/75 px-6 py-3.5 text-sm font-bold text-[#443744] transition hover:-translate-y-1 hover:bg-white sm:w-auto"
                                style={{ borderColor: 'var(--color-border)' }}
                            >
                                Me contacter <span>↗</span>
                            </button>

                            <a
                                href={CV_URL}
                                download={CV_FILENAME}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border bg-white/75 px-6 py-3.5 text-sm font-bold text-[#443744] transition hover:-translate-y-1 hover:bg-white sm:w-auto"
                                style={{ borderColor: 'var(--color-border)' }}
                            >
                                Télécharger mon CV
                                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                            </a>
                        </div>
                    </div>

                    {/* Carte Mon univers : décalée de 1 cm vers la droite sur desktop */}
                    <div className="relative z-10 mx-auto w-full max-w-[470px] lg:translate-x-[38px] lg:mt-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                            animate={{ opacity: 1, scale: 1, rotate: -2 }}
                            transition={{
                                delay: 0.25,
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative rounded-[2.3rem] border bg-white/75 p-3 shadow-[0_28px_80px_rgba(68,55,68,.12)] sm:p-4"
                            style={{ borderColor: 'rgba(234,223,225,.95)' }}
                        >
                            <div className="relative min-h-[390px] overflow-hidden rounded-[1.9rem] bg-[#f6ecea] p-6 sm:p-8">
                                <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[#edb7c2]/70" />

                                <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#c9b9e0]/60" />

                                <div className="absolute right-8 top-20 h-8 w-8 rotate-12 rounded-[45%] bg-[#a9cedf]" />

                                <div className="absolute bottom-20 right-10 h-5 w-5 rounded-full bg-[#b8d7c3]" />

                                <div className="relative flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#806f78]">
                                            Mon univers
                                        </p>

                                        <p className="mt-2 text-xl font-black text-[#443744]">
                                            Code + design + curiosité
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[#c77989] shadow-sm">
                                        <Heart className="h-5 w-5 fill-current" />
                                    </div>
                                </div>

                                <div className="relative mt-14 grid grid-cols-2 gap-3">
                                    <MiniCard
                                        icon={<Code2 />}
                                        label="Front"
                                        value="React · TS"
                                    />

                                    <MiniCard
                                        icon={<Server />}
                                        label="Back"
                                        value="PHP · Java · Python"
                                    />
                                </div>

                                <div className="relative mt-3 rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-5 w-5 text-[#b58d66]" />

                                        <p className="text-sm font-bold text-[#443744]">
                                            Des applications complètes
                                        </p>
                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-[#766d76]">
                                        La même exigence des deux côtés : un code propre, des API
                                        fiables et des écrans soignés jusqu'au moindre détail.
                                    </p>
                                </div>

                                <div className="relative mt-4 flex flex-wrap gap-2">
                                    {words.map((word, index) => (
                                        <motion.span
                                            key={word}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + index * 0.08 }}
                                            className="rounded-full border border-white bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-[#5d505b]"
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute -right-2 -top-5 hidden rounded-full border bg-white px-4 py-2.5 shadow-lg sm:block"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
              <span className="text-[10px] font-black tracking-[.14em] text-[#665965]">
                01 / CRÉATIVE
              </span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 7, 0], rotate: [0, -2, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.6,
                            }}
                            className="absolute -bottom-4 left-2 rounded-full bg-[#f39a62] px-4 py-2.5 shadow-lg sm:left-[-10px]"
                        >
              <span className="text-[10px] font-black text-[#443744]">
                OUVERTE AUX OPPORTUNITÉS ↗
              </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function MiniCard({
                      icon,
                      label,
                      value,
                  }: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="rounded-2xl border border-white/80 bg-white/65 p-4 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#c77989] shadow-sm">
                {icon}
            </div>

            <p className="mt-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#887780]">
                {label}
            </p>

            <p className="mt-1 text-sm font-black text-[#443744]">{value}</p>
        </div>
    )
}