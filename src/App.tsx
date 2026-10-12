import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundScene from './components/BackgroundScene'
import { useAccentCycle } from './hooks/useAccentCycle'

function App() {
  useAccentCycle()

  return (
    <ThemeProvider>
      <div className="relative isolate min-h-[100dvh] w-full max-w-full overflow-x-clip text-[var(--color-text-primary)] transition-colors duration-500">
        <BackgroundScene />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
