import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lazy load heavy components
const Projects = lazy(() => import('./components/Projects'))
const Vault = lazy(() => import('./components/Vault'))
const Social = lazy(() => import('./components/Social'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Section reveal animations - matching original HTML version
    gsap.utils.toArray('.reveal').forEach((section) => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  return (
    <div className="bg-black text-white font-sans">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-green-400">Loading...</div></div>}>
        <Projects />
        <Vault />
        <Social />
      </Suspense>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
