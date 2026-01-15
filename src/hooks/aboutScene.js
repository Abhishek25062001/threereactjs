/* aboutScene.js */
(() => {
    // Mobile Check
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    {
        const canvas = document.getElementById("aboutCanvas");
        if (!canvas) return;

        let isVisible = true;
        document.addEventListener("visibilitychange", () => {
            isVisible = !document.hidden;
            if (isVisible) animate();
        });

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.z = 8;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Geometry: Torus Knot
        const geometry = new THREE.TorusKnotGeometry(1.8, 0.6, 120, 20);
        const material = new THREE.MeshStandardMaterial({
            color: 0x4ade80,
            wireframe: true,
            roughness: 0.2,
            metalness: 0.8
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x4ade80, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        // Animation
        function animate() {
            if (!isVisible) return;
            requestAnimationFrame(animate);

            mesh.rotation.x += 0.003;
            mesh.rotation.y += 0.005;

            renderer.render(scene, camera);
        }

        animate();

        // Resize
        window.addEventListener("resize", () => {
            // Re-check canvas size as it's in a flex container now
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            renderer.setSize(width, height, false); // false prevents style update loop
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }
})();
