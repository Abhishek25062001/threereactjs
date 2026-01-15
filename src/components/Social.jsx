import { useRef } from 'react'
import useSocialScene from '../hooks/useSocialScene'

export default function Social() {
    const canvasRef = useRef(null)

    useSocialScene(canvasRef)

    return (
        <section
            id="social"
            className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
        >
            <h3 className="text-5xl font-extrabold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent text-center mb-10 z-10 relative">
                Connect
            </h3>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

            {/* Hover hint */}
            <p className="absolute bottom-10 text-white/30 text-sm z-10 pointer-events-none">
                Interact with the glass tiles
            </p>
        </section>
    )
}
