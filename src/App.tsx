import { HashRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Marquee } from './components/ui/Marquee'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'

function Portfolio() {
  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <Navbar />
        <Home />
        <Marquee />
        <Footer />
      </div>
    </>
  )
}

// Adresse privée de l'espace messages, définie dans .env (VITE_ADMIN_PATH) pour ne pas
// figurer dans le dépôt. Sans valeur, l'espace n'est pas accessible.
// La vraie protection reste la connexion côté serveur.
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH ? `/${import.meta.env.VITE_ADMIN_PATH}` : null

// HashRouter : GitHub Pages ne sait pas servir une sous-page, mais /#/... fonctionne partout
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        {ADMIN_PATH && <Route path={ADMIN_PATH} element={<Admin />} />}
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </HashRouter>
  )
}
