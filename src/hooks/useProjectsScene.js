import { useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useProjectsScene(canvasRef) {
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x000000, 10, 50)

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Create tunnel
        const tunnelGroup = new THREE.Group()
        scene.add(tunnelGroup)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        // Animation
        function animate() {
            requestAnimationFrame(animate)
            tunnelGroup.rotation.z += 0.001
            renderer.render(scene, camera)
        }

        animate()

        // Scroll animation
        ScrollTrigger.create({
            trigger: '.projects-scroll-container',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => {
                camera.position.z = 5 - self.progress * 20
            },
        })

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            renderer.dispose()
        }
    }, [canvasRef])
}
