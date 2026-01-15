import { useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useVaultScene(canvasRef) {
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.z = 10

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Vault door
        const doorGeometry = new THREE.BoxGeometry(4, 6, 0.5)
        const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 })
        const door = new THREE.Mesh(doorGeometry, doorMaterial)
        scene.add(door)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0x4ade80, 1)
        pointLight.position.set(0, 0, 5)
        scene.add(pointLight)

        function animate() {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }

        animate()

        // Scroll animation
        ScrollTrigger.create({
            trigger: '.vault-scroll-container',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => {
                door.rotation.y = self.progress * Math.PI
                if (self.progress > 0.7) {
                    document.getElementById('vault-overlay').style.opacity = '1'
                } else {
                    document.getElementById('vault-overlay').style.opacity = '0'
                }
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
            doorGeometry.dispose()
            doorMaterial.dispose()
        }
    }, [canvasRef])
}
