import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Vault from './components/Vault'
import Social from './components/Social'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      <Projects />
      <Vault />
      <Social />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
