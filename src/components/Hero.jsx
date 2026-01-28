import { useRef, useEffect } from 'react'
import useHeroScene from '../hooks/useHeroScene'
import gsap from 'gsap'

export default function Hero() {
    const canvasRef = useRef(null)

    useHeroScene(canvasRef)

    useEffect(() => {
        // GSAP animations - matching original HTML version
        gsap.to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.1,
        })

        gsap.to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3,
        })

        gsap.to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.6,
        })

        gsap.to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.9,
        })
    }, [])

    return (
        <section className="hero-section min-h-screen relative flex items-center justify-center text-center px-6 overflow-hidden">
            {/* Three.js Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            <div className="hero-content relative z-10">
                <span className="inline-block px-4 py-2 mb-6 text-sm border border-green-400/30 bg-green-400/10 rounded-full text-green-400 opacity-0 translate-y-4 hero-badge">
                    Available for Work
                </span>

                <h2 className="text-6xl md:text-8xl font-extrabold leading-none tracking-tight opacity-0 translate-y-4 hero-title">
                    Hi, I'm <span className="text-green-400">Abhishek</span>
                    <br />
                    Full Stack Developer
                </h2>

                <p className="mt-6 text-xl text-white/60 max-w-2xl mx-auto opacity-0 translate-y-4 hero-subtitle">
                    I build scalable web & mobile applications using React, React Native & Node.js.
                </p>

                <div className="mt-10 flex gap-4 justify-center opacity-0 translate-y-4 hero-actions">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-green-400 text-black font-semibold rounded-full hover:bg-green-500 transition-all hover:scale-105"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all hover:scale-105"
                    >
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    )
}
