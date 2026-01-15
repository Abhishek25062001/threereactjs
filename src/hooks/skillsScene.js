/* skillsScene.js - Futuristic Island */
(() => {
    // Mobile Check
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    {
        const canvas = document.getElementById("skillsCanvas");
        if (!canvas) return;

        let isVisible = true;
        document.addEventListener("visibilitychange", () => {
            isVisible = !document.hidden;
            if (isVisible) animate();
        });

        // Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050510, 0.035); // Volumetric-ish fog

        // Camera
        const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(0, 5, 8);
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        /* ===== THE ISLAND ===== */
        const islandGeometry = new THREE.CylinderGeometry(5, 4, 0.5, 64);
        const islandMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            roughness: 0.8,
            metalness: 0.5,
            emissive: 0x00ffff,
            emissiveIntensity: 0.1,
            wireframe: false
        });
        const island = new THREE.Mesh(islandGeometry, islandMaterial);
        island.position.y = -2;
        scene.add(island);

        // Neon Grid Lines (using WireframeGeometry for clean lines)
        const gridGeo = new THREE.WireframeGeometry(islandGeometry);
        const gridMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 });
        const gridLines = new THREE.LineSegments(gridGeo, gridMat);
        island.add(gridLines);


        /* ===== GLASS CUBE ===== */
        const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
        const cubeMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            transmission: 0.95, // Glass-like transmission
            transparent: true,
            opacity: 1,
            thickness: 1.5,
            clearcoat: 1,
            clearcoatRoughness: 0
        });
        const glassCube = new THREE.Mesh(cubeGeo, cubeMat);
        glassCube.position.y = 0;
        scene.add(glassCube);

        /* ===== GLOWING JS LOGO (Primitives) ===== */
        const logoGroup = new THREE.Group();
        const logoMat = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0xffaa00,
            emissiveIntensity: 2,
            roughness: 0.2
        });

        // "J"
        const j1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.8, 0.2), logoMat);
        j1.position.set(-0.5, 0, 0);
        const j2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.2), logoMat);
        j2.position.set(-0.6, -0.4, 0);
        logoGroup.add(j1, j2);

        // "S"
        const sGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.2), logoMat); // Top
        s1.position.set(0.5, 0.3, 0);
        const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 0.2), logoMat); // Left down
        s2.position.set(0.35, 0.1, 0);
        const s3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.2), logoMat); // Mid
        s3.position.set(0.5, -0.1, 0);
        const s4 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 0.2), logoMat); // Right down
        s4.position.set(0.65, -0.3, 0);
        const s5 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.2), logoMat); // Bot
        s5.position.set(0.5, -0.5, 0);

        logoGroup.add(s1, s2, s3, s4, s5);

        // Center Logo inside Cube
        logoGroup.position.set(0, 0.1, 0);
        glassCube.add(logoGroup);


        /* ===== LIGHTING ===== */
        // Ambient
        const ambi = new THREE.AmbientLight(0x4040a0, 1);
        scene.add(ambi);

        // Cinematic Spotlights
        const spot1 = new THREE.SpotLight(0x00ffff, 10);
        spot1.position.set(10, 10, 5);
        spot1.lookAt(0, 0, 0);
        scene.add(spot1);

        const spot2 = new THREE.SpotLight(0xff00ff, 10);
        spot2.position.set(-10, 5, -5);
        spot2.lookAt(0, 0, 0);
        scene.add(spot2);

        // Logo Glow Light
        const pointLight = new THREE.PointLight(0xffaa00, 2, 5);
        pointLight.position.set(0, 0, 0);
        scene.add(pointLight);


        /* ===== PARTICLES ===== */
        const particlesGeo = new THREE.BufferGeometry();
        const pCount = 200;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i++) {
            pPos[i] = (Math.random() - 0.5) * 15;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0x4ade80,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });
        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);


        /* ===== ANIMATION ===== */
        const clock = new THREE.Clock();

        function animate() {
            if (!isVisible) return;
            requestAnimationFrame(animate);

            const t = clock.getElapsedTime();

            // Float Effects
            glassCube.rotation.y = t * 0.2;
            glassCube.rotation.z = Math.sin(t * 0.5) * 0.05;
            glassCube.position.y = Math.sin(t) * 0.2;

            island.rotation.y = -t * 0.05;

            // Particles Drift
            particleSystem.rotation.y = t * 0.05;

            // Camera float
            camera.position.y = 5 + Math.sin(t * 0.3) * 0.5;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }

        animate();

        /* ===== RESIZE ===== */
        window.addEventListener('resize', () => {
            const width = canvas.clientWidth || window.innerWidth;
            const height = canvas.clientHeight || window.innerHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }
})();