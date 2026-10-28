import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, Check, LogOut, Mail, RefreshCw, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api, ApiError, type ContactMessage } from '../lib/api'
import { Button } from '../components/ui/Button'

export function Admin() {
  // undefined : vérification en cours · null : non connectée · string : email connecté
  const [adminEmail, setAdminEmail] = useState<string | null | undefined>(undefined)
  const [serverError, setServerError] = useState('')

  // Page privée : demander aux moteurs de recherche de ne pas l'indexer
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  useEffect(() => {
    api
      .me()
      .then((me) => setAdminEmail(me.email))
      .catch((error) => {
        if (!(error instanceof ApiError) || error.status !== 401) setServerError(error.message)
        setAdminEmail(null)
      })
  }, [])

  const logout = async () => {
    await api.logout().catch(() => undefined)
    setServerError('')
    setAdminEmail(null)
  }

  // Session expirée côté serveur : retour à l'écran de connexion, messages effacés de l'écran
  const expire = (message: string) => {
    setServerError(message)
    setAdminEmail(null)
  }

  return (
    <div className="min-h-screen bg-[#fffaf7] px-5 py-10 text-[#302b35] md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#7d737d] transition hover:text-[#443744]">
          <ArrowLeft className="h-4 w-4" /> Retour au portfolio
        </Link>

        {adminEmail === undefined ? null : adminEmail === null ? (
          <LoginForm key={serverError} notice={serverError} onLogin={setAdminEmail} />
        ) : (
          <Inbox email={adminEmail} onLogout={logout} onExpired={expire} />
        )}
      </div>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-[2rem] border border-[#eadfe1] bg-white p-7 shadow-[0_18px_55px_rgba(68,55,68,.06)] md:p-9">
      <h1 className="text-2xl font-black text-[#443744]">{title}</h1>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function LoginForm({ notice, onLogin }: { notice: string; onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(notice)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const me = await api.login(email.trim(), password)
      onLogin(me.email)
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Connexion impossible.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md">
      <Panel title="Espace messages">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-[#7d737d]">Connectez-vous pour lire les messages reçus via le portfolio.</p>
          <AdminField id="admin-email" label="Email" type="email" value={email} onChange={setEmail} autoComplete="username" />
          <AdminField id="admin-password" label="Mot de passe" type="password" value={password} onChange={setPassword} autoComplete="current-password" />
          {error && <p className="text-sm font-medium text-red-500" role="alert">{error}</p>}
          <Button type="submit" size="lg" disabled={loading} className="w-full !rounded-2xl">
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>
      </Panel>
    </div>
  )
}

function AdminField({ id, label, type, value, onChange, autoComplete }: {
  id: string
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[10px] font-black uppercase tracking-[.16em] text-[#7d737d]">{label}</label>
      <input
        id={id}
        type={type}
        required
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#eadfe1] bg-[#fffaf7] px-4 py-3.5 text-sm outline-none transition focus:border-[#e98b9b]"
      />
    </div>
  )
}

type Filter = 'all' | 'unread'

function Inbox({ email, onLogout, onExpired }: {
  email: string
  onLogout: () => void
  onExpired: (message: string) => void
}) {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  // Toute réponse 401 (session expirée ou déconnectée) ramène à l'écran de connexion
  const handleError = useCallback((error: unknown, fallback: string) => {
    if (error instanceof ApiError && error.status === 401) onExpired(error.message)
    else setError(fallback)
  }, [onExpired])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setMessages(await api.messages())
      setError('')
    } catch (loadError) {
      handleError(loadError, 'Impossible de charger les messages.')
    } finally {
      setLoading(false)
    }
  }, [handleError])

  useEffect(() => {
    load()
  }, [load])

  const toggleRead = async (message: ContactMessage) => {
    try {
      await api.setRead(message.id, !message.is_read)
      setMessages((list) => list.map((m) => (m.id === message.id ? { ...m, is_read: !m.is_read } : m)))
    } catch (updateError) {
      handleError(updateError, 'La mise à jour a échoué.')
    }
  }

  const remove = async (id: number) => {
    setConfirmDelete(null)
    try {
      await api.remove(id)
      setMessages((list) => list.filter((m) => m.id !== id))
    } catch (deleteError) {
      handleError(deleteError, 'La suppression a échoué.')
    }
  }

  const unreadCount = messages.filter((m) => !m.is_read).length
  const visible = filter === 'unread' ? messages.filter((m) => !m.is_read) : messages

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#e27e43]">Espace messages</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-.03em] text-[#443744]">
            {messages.length} message{messages.length > 1 ? 's' : ''}
            {unreadCount > 0 && <span className="ml-3 align-middle text-base font-bold text-[#e98b9b]">{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</span>}
          </h1>
          <p className="mt-1 text-xs text-[#7d737d]">Connectée en tant que {email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
          </Button>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </div>

      <div className="mt-6 inline-flex rounded-full border border-[#eadfe1] bg-white p-1">
        {(['all', 'unread'] as const).map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${filter === value ? 'bg-[#443744] text-white' : 'text-[#7d737d] hover:text-[#443744]'}`}
          >
            {value === 'all' ? 'Tous' : 'Non lus'}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500" role="alert">{error}</p>}

      <div className="mt-6 space-y-4">
        {!loading && visible.length === 0 && (
          <p className="rounded-[2rem] border border-dashed border-[#eadfe1] p-10 text-center text-sm text-[#7d737d]">
            Aucun message pour le moment.
          </p>
        )}

        {visible.map((message) => (
          <article
            key={message.id}
            className={`rounded-[2rem] border bg-white p-6 shadow-[0_18px_55px_rgba(68,55,68,.05)] md:p-7 ${message.is_read ? 'border-[#eadfe1]' : 'border-[#e98b9b]'}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  {!message.is_read && <span className="h-2.5 w-2.5 rounded-full bg-[#e98b9b]" aria-label="Non lu" />}
                  <h2 className="text-lg font-black text-[#443744]">{message.name}</h2>
                  {message.company && (
                    <span className="rounded-full bg-[#f3e4e6] px-2.5 py-0.5 text-xs font-bold text-[#443744]">{message.company}</span>
                  )}
                </div>
                <a href={`mailto:${message.email}`} className="text-sm font-semibold text-[#e98b9b] hover:underline">{message.email}</a>
              </div>
              <time className="text-xs font-semibold text-[#7d737d]" dateTime={message.created_at}>
                {new Date(message.created_at.replace(' ', 'T')).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}
              </time>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-7">{message.message}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`mailto:${message.email}?subject=${encodeURIComponent('Re : votre message sur mon portfolio')}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#443744] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#e98b9b]"
              >
                <Mail className="h-4 w-4" /> Répondre
              </a>
              <Button variant="secondary" size="sm" onClick={() => toggleRead(message)}>
                <Check className="h-4 w-4" /> {message.is_read ? 'Marquer non lu' : 'Marquer comme lu'}
              </Button>
              {confirmDelete === message.id ? (
                <>
                  <Button size="sm" className="!bg-red-500 hover:!bg-red-600" onClick={() => remove(message.id)}>
                    Confirmer la suppression
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>Annuler</Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(message.id)}>
                  <Trash2 className="h-4 w-4" /> Supprimer
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
