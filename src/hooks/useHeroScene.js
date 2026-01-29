import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function useHeroScene(canvasRef) {
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.z = 30

        const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent)

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: !isMobile, // Disable antialias on mobile
            powerPreference: isMobile ? 'low-power' : 'high-performance'
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5)) // Limit pixel ratio

        // Particles - reduced count for better performance
        const particlesGeometry = new THREE.BufferGeometry()
        const count = isMobile ? 500 : 1000 // Reduced from 2000
        const positions = new Float32Array(count * 3)

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 60
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0x4ade80,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Mouse Interaction
        let mouseX = 0
        let mouseY = 0
        let targetX = 0
        let targetY = 0

        const handleMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        window.addEventListener('mousemove', handleMouseMove)

        const clock = new THREE.Clock()

        function animate() {
            const elapsedTime = clock.getElapsedTime()

            targetX = mouseX * 0.001
            targetY = mouseY * 0.001

            particlesMesh.rotation.y = 0.2 * elapsedTime
            particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x)

            // Wave effect
            particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 2

            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
            particlesGeometry.dispose()
            particlesMaterial.dispose()
        }
    }, [canvasRef])
}
