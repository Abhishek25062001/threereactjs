import { useRef } from 'react'
import useSkillsScene from '../hooks/useSkillsScene'

export default function Skills() {
    const canvasRef = useRef(null)

    useSkillsScene(canvasRef)

    return (
        <section
            id="skills"
            className="section relative overflow-hidden text-center min-h-screen flex flex-col justify-center"
        >
            <div className="skills-bg absolute inset-0 z-0">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            <div className="skills-content relative z-10 px-6">
                <h3 className="text-5xl font-extrabold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent mb-6">
                    Skills
                </h3>
                <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
                    Hands-on experience building production applications with modern frontend and backend
                    technologies.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Frontend Card */}
                    <div className="glass-card group">
                        <div className="text-4xl mb-4">⚛️</div>
                        <h4 className="text-xl font-bold mb-3 text-white">Frontend</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                React
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Next.js
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Tailwind
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Three.js
                            </span>
                        </div>
                    </div>

                    {/* Backend Card */}
                    <div className="glass-card group">
                        <div className="text-4xl mb-4">🛠️</div>
                        <h4 className="text-xl font-bold mb-3 text-white">Backend</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Node.js
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Express
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                MongoDB
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                PostgreSQL
                            </span>
                        </div>
                    </div>

                    {/* Tools Card */}
                    <div className="glass-card group">
                        <div className="text-4xl mb-4">⚡</div>
                        <h4 className="text-xl font-bold mb-3 text-white">Tools</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Git
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Docker
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                AWS
                            </span>
                            <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80">
                                Figma
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
