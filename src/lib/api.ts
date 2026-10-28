// Client de l'API PHP (dossier api/ du projet).
// Par défaut l'API est servie à côté du site (./api) ; VITE_API_URL permet de
// la placer ailleurs, par exemple https://mon-hebergeur.fr/api.
const API_URL = (import.meta.env.VITE_API_URL || `${import.meta.env.BASE_URL}api`).replace(/\/$/, '')

export interface ContactMessage {
  id: number
  name: string
  company: string
  email: string
  message: string
  is_read: boolean
  created_at: string
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}/${path}`, {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'fetch', ...init.headers },
    })
  } catch {
    throw new ApiError('Le serveur est injoignable.', 0)
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new ApiError(body.error ?? "Une erreur s'est produite.", response.status)
  return body as T
}

export const api = {
  sendMessage: (data: { name: string; company: string; email: string; message: string; website: string }) =>
    request<{ ok: true }>('contact.php', { method: 'POST', body: JSON.stringify(data) }),

  me: () => request<{ email: string }>('auth.php'),
  login: (email: string, password: string) =>
    request<{ email: string }>('auth.php', { method: 'POST', body: JSON.stringify({ action: 'login', email, password }) }),
  logout: () => request<{ ok: true }>('auth.php', { method: 'POST', body: JSON.stringify({ action: 'logout' }) }),

  messages: () => request<{ messages: ContactMessage[] }>('messages.php').then((r) => r.messages),
  setRead: (id: number, isRead: boolean) =>
    request<{ ok: true }>(`messages.php?id=${id}`, { method: 'PATCH', body: JSON.stringify({ is_read: isRead }) }),
  remove: (id: number) => request<{ ok: true }>(`messages.php?id=${id}`, { method: 'DELETE' }),
}
