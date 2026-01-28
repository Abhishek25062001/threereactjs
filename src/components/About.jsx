import { useRef } from 'react'
import useAboutScene from '../hooks/useAboutScene'

export default function About() {
    const canvasRef = useRef(null)

    useAboutScene(canvasRef)

    return (
        <section id="about" className="section reveal min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="about-text">
                        <h3 className="text-5xl font-extrabold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-8">
                            About Me
                        </h3>
                        <p className="text-lg leading-relaxed text-white/80 mb-6">
                            I am a full-stack developer with 3 years of experience in{' '}
                            <span className="text-green-400 font-semibold">React</span>, 1.5 years in{' '}
                            <span className="text-green-400 font-semibold">React Native</span>, and 1 year in
                            Node.js.
                        </p>
                        <p className="text-lg leading-relaxed text-white/80">
                            I focus on building clean, scalable, and performance-driven applications. I love
                            solving complex problems with simple, elegant code.
                        </p>
                    </div>

                    <div className="about-visual relative h-[400px]">
                        <canvas ref={canvasRef} className="w-full h-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}
