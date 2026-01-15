import { useState, useEffect } from 'react'

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [ringPos, setRingPos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    useEffect(() => {
        let animationFrameId

        const animateCursor = () => {
            setRingPos((prev) => ({
                x: prev.x + (mousePos.x - prev.x) * 0.15,
                y: prev.y + (mousePos.y - prev.y) * 0.15,
            }))
            animationFrameId = requestAnimationFrame(animateCursor)
        }

        animateCursor()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [mousePos])

    useEffect(() => {
        const hoverTargets = document.querySelectorAll('a, button, .project-card')

        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => setIsHovering(false)

        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)
        })

        return () => {
            hoverTargets.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter)
                el.removeEventListener('mouseleave', handleMouseLeave)
            })
        }
    }, [])

    return (
        <>
            <div
                id="cursor-dot"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                }}
            />
            <div
                id="cursor-ring"
                className={isHovering ? 'cursor-hover' : ''}
                style={{
                    left: `${ringPos.x}px`,
                    top: `${ringPos.y}px`,
                }}
            />
        </>
    )
}
