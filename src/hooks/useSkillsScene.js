import { useEffect } from 'react'
import * as THREE from 'three'

export default function useSkillsScene(canvasRef) {
    useEffect(() => {
        if (!canvasRef.current) return

        const isMobile = window.innerWidth < 768
        if (isMobile) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x050510, 0.035)

        const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
        camera.position.set(0, 5, 8)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Island
        const islandGeometry = new THREE.CylinderGeometry(5, 4, 0.5, 64)
        const islandMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            roughness: 0.8,
            metalness: 0.5,
            emissive: 0x00ffff,
            emissiveIntensity: 0.1,
        })
        const island = new THREE.Mesh(islandGeometry, islandMaterial)
        island.position.y = -2
        scene.add(island)

        // Glass Cube
        const cubeGeo = new THREE.BoxGeometry(2, 2, 2)
        const cubeMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            transmission: 0.95,
            transparent: true,
        })
        const glassCube = new THREE.Mesh(cubeGeo, cubeMat)
        glassCube.position.y = 0
        scene.add(glassCube)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0x00ffff, 2)
        pointLight.position.set(0, 5, 5)
        scene.add(pointLight)

        function animate() {
            requestAnimationFrame(animate)
            glassCube.rotation.y += 0.005
            island.rotation.y += 0.001
            renderer.render(scene, camera)
        }

        animate()

        const handleResize = () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
            islandGeometry.dispose()
            islandMaterial.dispose()
            cubeGeo.dispose()
            cubeMat.dispose()
        }
    }, [canvasRef])
}
