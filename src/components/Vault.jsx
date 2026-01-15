import { useRef } from 'react'
import useVaultScene from '../hooks/useVaultScene'

export default function Vault() {
    const canvasRef = useRef(null)

    useVaultScene(canvasRef)

    return (
        <section id="vault" className="relative bg-black">
            <div className="vault-scroll-container" style={{ height: '400vh' }}>
                <div className="vault-viewport sticky top-0 h-screen w-full overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-full block" />

                    {/* Overlay Text (Appears when unlocked) */}
                    <div
                        id="vault-overlay"
                        className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none opacity-0 transition-opacity duration-1000"
                    >
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            Proof of Work
                        </h3>
                        <p className="text-xl text-green-400 font-mono">ACCESS GRANTED</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
