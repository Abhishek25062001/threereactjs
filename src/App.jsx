import { useState, useEffect } from 'react'
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

function App() {
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
