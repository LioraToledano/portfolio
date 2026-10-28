import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Contact />
    </main>
  )
}
