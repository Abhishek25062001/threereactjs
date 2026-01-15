import { useRef } from 'react'
import useProjectsScene from '../hooks/useProjectsScene'

export default function Projects() {
    const canvasRef = useRef(null)

    useProjectsScene(canvasRef)

    return (
        <section id="projects" className="relative bg-black">
            <div className="projects-scroll-container" style={{ height: '400vh' }}>
                <div className="projects-viewport sticky top-0 h-screen w-full overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-full block" />

                    {/* Overlay UI for Project Details */}
                    <div
                        id="project-overlay"
                        className="absolute inset-0 z-50 pointer-events-none opacity-0 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-500"
                    >
                        <div className="bg-black/90 border border-green-500/30 p-8 rounded-2xl max-w-2xl w-full mx-4 text-center transform scale-95 transition-transform duration-500 pointer-events-auto">
                            <h3 id="overlay-title" className="text-3xl font-bold text-green-400 mb-4">
                                Project Title
                            </h3>
                            <p id="overlay-desc" className="text-white/80 mb-6 text-lg">
                                Project description goes here.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    id="close-overlay"
                                    className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    Close
                                </button>
                                <a
                                    href="#"
                                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full transition-colors"
                                >
                                    View Live
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Hint */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce pointer-events-none">
                        Scroll to Explore
                    </div>
                </div>
            </div>
        </section>
    )
}
