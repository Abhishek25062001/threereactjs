import { useEffect } from 'react'
import * as THREE from 'three'

export default function useSocialScene(canvasRef) {
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.z = 10

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Create glass tiles
        const tileGroup = new THREE.Group()
        scene.add(tileGroup)

        const socialPlatforms = [
            { name: 'GitHub', color: 0x333333, x: -4 },
            { name: 'LinkedIn', color: 0x0077b5, x: -1.5 },
            { name: 'Twitter', color: 0x1da1f2, x: 1.5 },
            { name: 'Email', color: 0x4ade80, x: 4 },
        ]

        socialPlatforms.forEach((platform) => {
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 0.2)
            const material = new THREE.MeshPhysicalMaterial({
                color: platform.color,
                metalness: 0,
                roughness: 0,
                transmission: 0.9,
                transparent: true,
            })
            const tile = new THREE.Mesh(geometry, material)
            tile.position.x = platform.x
            tileGroup.add(tile)
        })

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        function animate() {
            requestAnimationFrame(animate)
            tileGroup.rotation.y += 0.002
            renderer.render(scene, camera)
        }

        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
        }
    }, [canvasRef])
}
