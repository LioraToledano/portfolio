import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, Check, Download, Phone, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { CV_FILENAME, CV_URL } from '../../data/cv'
import { api, ApiError } from '../../lib/api'

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const fail = (message: string) => {
    setErrorMessage(message)
    setStatus('error')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!formRef.current) return

    const data = new FormData(formRef.current)
    const name = String(data.get('from_name') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const email = String(data.get('from_email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    // Champ invisible rempli uniquement par les robots : on fait semblant d'avoir envoyé
    if (data.get('website')) {
      setStatus('success')
      formRef.current.reset()
      return
    }

    if (!name || !company || !email || !message) return fail('Merci de remplir tous les champs.')
    if (!EMAIL_PATTERN.test(email)) return fail("L'adresse email ne semble pas valide.")
    if (message.length > 5000) return fail('Le message est trop long (5000 caractères maximum).')

    setStatus('loading')

    try {
      await api.sendMessage({ name, company, email, message, website: '' })
      setStatus('success')
      formRef.current?.reset()
    } catch (error) {
      fail(
        error instanceof ApiError && error.status >= 400 && error.status < 500
          ? error.message
          : "Une erreur s'est produite. Réessayez ou écrivez-moi directement.",
      )
    }
  }

  return (
      <section
          id="contact"
          className="relative overflow-hidden bg-[#443744] py-16 text-white md:py-20"
          aria-labelledby="contact-title"
      >
        {/* Décorations */}
        <div
            className="absolute -right-32 top-[-100px] h-[380px] w-[380px] rounded-full bg-[#e98b9b]/25 blur-3xl"
            aria-hidden="true"
        />

        <div
            className="absolute bottom-[-140px] left-[20%] h-[400px] w-[400px] rounded-full bg-[#b6a2d9]/20 blur-3xl"
            aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
            {/* COLONNE GAUCHE */}
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#f1b095]">
                06 / Contact
              </p>

              <h2
                  id="contact-title"
                  className="mt-4 font-display text-[3rem] font-black leading-[.82] tracking-[-.06em] md:text-7xl"
              >
                Construisons
                <br />
                <span className="text-[#e98b9b]">quelque chose</span>
                <br />
                ensemble ?
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-6 text-white/55 md:text-[15px] md:leading-7">
                Je souhaite rejoindre une équipe produit en tant que développeuse
                Full-Stack, dans le cadre d'un CDI. Je m'investis dans chaque fonctionnalité, du
                besoin utilisateur jusqu'à la mise en production, avec la même
                attention portée au code qu'à l'expérience.
              </p>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/55 md:text-[15px] md:leading-7">
                PHP, Java, Python, React, TypeScript : je passe naturellement du
                serveur à l'interface, ce qui facilite le travail avec les
                équipes back, front et design.
              </p>

              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#b9d8c4] opacity-60" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#b9d8c4]" />
              </span>

                <span className="text-xs font-semibold text-white/70">
                Disponible dès novembre 2026
              </span>
              </div>

              <div className="mt-7 space-y-2">
                <ContactLink
                    icon={<span className="text-sm font-black">in</span>}
                    label="LinkedIn"
                    href="https://www.linkedin.com/in/liora-toledano-104392226/"
                    external
                />

                <ContactLink
                    icon={<Phone />}
                    label="06 67 56 32 70"
                    href="tel:+33667563270"
                />

                <ContactLink
                    icon={<Download />}
                    label="Télécharger mon CV"
                    href={CV_URL}
                    download={CV_FILENAME}
                />
              </div>
            </div>

            {/* FORMULAIRE CENTRÉ */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex w-full justify-center lg:items-center"
            >
              <div className="w-full max-w-[620px] rounded-[2rem] border border-white/10 bg-white p-5 text-[#443744] shadow-[0_30px_100px_rgba(68,55,68,.18)] md:p-8">
                {status === 'success' ? (
                    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b9d8c4]/15 text-[#299b68]">
                        <Check />
                      </div>

                      <h3 className="mt-6 text-3xl font-black">
                        Message envoyé.
                      </h3>

                      <p className="mt-3 max-w-sm text-sm leading-6 text-[#7d737d]">
                        Merci ! Je vous répondrai dans les plus brefs délais.
                      </p>

                      <Button
                          variant="secondary"
                          className="mt-7"
                          onClick={() => setStatus('idle')}
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                ) : (
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        noValidate
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#e98b9b]">
                            Parlons-en
                          </p>

                          <h3 className="mt-1 text-3xl font-black">
                            Une opportunité ?
                          </h3>
                        </div>

                        <Sparkles className="h-6 w-6 text-[#f1b095]" />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            id="from_name"
                            name="from_name"
                            label="Nom"
                            placeholder="Votre nom"
                            autoComplete="name"
                        />

                        <Field
                            id="company"
                            name="company"
                            label="Entreprise"
                            placeholder="Nom de l'entreprise"
                            autoComplete="organization"
                        />
                      </div>

                      <Field
                          id="from_email"
                          name="from_email"
                          label="Email"
                          placeholder="votre@email.com"
                          type="email"
                          autoComplete="email"
                      />

                      <div>
                        <label
                            htmlFor="message"
                            className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-[#7d737d]"
                        >
                          Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Parlez-moi du poste ou de votre projet…"
                            className="w-full resize-none rounded-2xl border bg-[#fffaf7] px-4 py-3.5 text-sm outline-none transition focus:border-[#e98b9b]"
                            style={{
                              borderColor: '#eadfe1',
                            }}
                        />
                      </div>

                      {/* Piège à robots : invisible pour les humains */}
                      <div className="absolute left-[-9999px]" aria-hidden="true">
                        <label htmlFor="website">Site web</label>
                        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                      </div>

                      {status === 'error' && (
                          <p className="text-sm font-medium text-red-500" role="alert">
                            {errorMessage}
                          </p>
                      )}

                      <Button
                          type="submit"
                          size="lg"
                          disabled={status === 'loading'}
                          className="w-full justify-between !rounded-2xl !bg-[#443744] px-6 hover:!bg-[#e98b9b]"
                      >
                        {status === 'loading'
                            ? 'Envoi en cours…'
                            : 'Envoyer le message'}

                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

function Field({
                 id,
                 name,
                 label,
                 placeholder,
                 type = 'text',
                 autoComplete,
               }: {
  id: string
  name: string
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
}) {
  return (
      <div>
        <label
            htmlFor={id}
            className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-[#7d737d]"
        >
          {label}
        </label>

        <input
            id={id}
            name={name}
            type={type}
            required
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="w-full rounded-2xl border bg-[#fffaf7] px-4 py-3.5 text-sm outline-none transition focus:border-[#e98b9b]"
            style={{
              borderColor: '#eadfe1',
            }}
        />
      </div>
  )
}

function ContactLink({
                       icon,
                       label,
                       href,
                       external = false,
                       download,
                     }: {
  icon: ReactNode
  label: string
  href: string
  external?: boolean
  download?: string
}) {
  return (
      <a
          href={href}
          download={download}
          {...(external
              ? {
                target: '_blank',
                rel: 'noopener noreferrer',
              }
              : {})}
          className="group flex items-center gap-3 text-sm font-semibold text-white/65 transition hover:text-white"
      >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#f1b095] transition group-hover:-rotate-6 group-hover:bg-[#f1b095]/10">
        {icon}
      </span>

        {label}

        <ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
      </a>
  )
}