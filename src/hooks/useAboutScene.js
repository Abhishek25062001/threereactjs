import { useEffect } from 'react'
import * as THREE from 'three'

export default function useAboutScene(canvasRef) {
    useEffect(() => {
        if (!canvasRef.current) return

        // Mobile Check
        const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        if (isMobile) return

        const canvas = canvasRef.current
        let isVisible = true

        const handleVisibilityChange = () => {
            isVisible = !document.hidden
            if (isVisible) animate()
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Scene
        const scene = new THREE.Scene()

        // Camera
        const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
        camera.position.z = 8

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Geometry: Torus Knot
        const geometry = new THREE.TorusKnotGeometry(1.8, 0.6, 120, 20)
        const material = new THREE.MeshStandardMaterial({
            color: 0x4ade80,
            wireframe: true,
            roughness: 0.2,
            metalness: 0.8,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0x4ade80, 2)
        pointLight.position.set(5, 5, 5)
        scene.add(pointLight)

        const pointLight2 = new THREE.PointLight(0xffffff, 1)
        pointLight2.position.set(-5, -5, 5)
        scene.add(pointLight2)

        // Animation
        function animate() {
            if (!isVisible) return
            requestAnimationFrame(animate)

            mesh.rotation.x += 0.003
            mesh.rotation.y += 0.005

            renderer.render(scene, camera)
        }

        animate()

        // Resize
        const handleResize = () => {
            const width = canvas.clientWidth
            const height = canvas.clientHeight

            renderer.setSize(width, height, false)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
            geometry.dispose()
            material.dispose()
        }
    }, [canvasRef])
}
