/* socialScene.js - Glass Tiles */
(() => {
    // Mobile Check
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    {
        const canvas = document.getElementById("socialCanvas");
        if (!canvas) return;

        // Scene
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 10);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lights
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambient);

        const pLight = new THREE.PointLight(0x4ade80, 2);
        pLight.position.set(5, 5, 5);
        scene.add(pLight);

        const rectLight = new THREE.RectAreaLight(0xffffff, 2, 10, 10);
        rectLight.position.set(-5, 5, 10);
        rectLight.lookAt(0, 0, 0);
        scene.add(rectLight);


        /* ===== HELPER: LOGO TEXTURE ===== */
        function createLogoTexture(text, color) {
            const ctxCanvas = document.createElement('canvas');
            ctxCanvas.width = 512;
            ctxCanvas.height = 512;
            const ctx = ctxCanvas.getContext('2d');

            // Background (Transparent)
            ctx.clearRect(0, 0, 512, 512);

            // Border
            ctx.strokeStyle = color;
            ctx.lineWidth = 20;
            ctx.strokeRect(20, 20, 472, 472);

            // Text
            ctx.fillStyle = color;
            ctx.font = 'bold 100px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 256, 256);

            const texture = new THREE.CanvasTexture(ctxCanvas);
            return texture;
        }


        /* ===== TILES ===== */
        const tilesData = [
            { id: 'github', name: 'GitHub', color: '#ffffff', url: 'https://github.com' },
            { id: 'linkedin', name: 'LinkedIn', color: '#0077b5', url: 'https://linkedin.com' },
            { id: 'twitter', name: 'Twitter', color: '#1da1f2', url: 'https://twitter.com' }
        ];

        const tilesGroup = new THREE.Group();
        scene.add(tilesGroup);
        const tiles = [];

        // Glass Material
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            transmission: 1, // Full glass
            thickness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
            transparent: true,
            opacity: 1
        });

        tilesData.forEach((data, i) => {
            const group = new THREE.Group();

            // 1. Glass Slab
            const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.5);
            const slab = new THREE.Mesh(geometry, glassMat.clone()); // Clone to control emissive indiv
            group.add(slab);

            // 2. Logo Plane (Inside)
            const logoTex = createLogoTexture(data.name, data.color);
            const logoGeo = new THREE.PlaneGeometry(2, 2);
            const logoMat = new THREE.MeshBasicMaterial({
                map: logoTex,
                transparent: true,
                side: THREE.DoubleSide
            });
            const logo = new THREE.Mesh(logoGeo, logoMat);
            logo.position.z = 0.05; // Slightly inside/forward
            group.add(logo);

            // Positioning
            // x: -3.5, 0, 3.5
            const xPos = (i - 1) * 3.5;
            group.position.set(xPos, 0, 0);

            // Store Metadata
            group.userData = {
                originalPos: new THREE.Vector3(xPos, 0, 0),
                velocity: new THREE.Vector3(0, 0, 0),
                url: data.url,
                slabMesh: slab
            };

            tilesGroup.add(group);
            tiles.push(group);
        });


        /* ===== INTERACTION ===== */
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        // Track mouse in Normalized Device Coords (-1 to +1)
        window.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Click to visit
        window.addEventListener('click', (e) => {
            raycaster.setFromCamera(mouse, camera);
            // Intersect with slabs (children of group children)
            const slabs = tiles.map(t => t.userData.slabMesh);
            const intersects = raycaster.intersectObjects(slabs);

            if (intersects.length > 0) {
                const parent = intersects[0].object.parent;
                window.open(parent.userData.url, '_blank');
            }
        });


        /* ===== ANIMATION LOOP ===== */
        function animate() {
            requestAnimationFrame(animate);

            // 1. Raycast for "Hover" state
            raycaster.setFromCamera(mouse, camera);
            // We verify distance in 3D world vs mouse plane?
            // Actually, for "Magnetic", let's project mouse to z=0 plane

            // Convert mouse to World Coord at z=0
            const vec = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vec.unproject(camera);
            const dir = vec.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const mouseWorld = camera.position.clone().add(dir.multiplyScalar(distance));


            tiles.forEach(tile => {
                const dist = mouseWorld.distanceTo(tile.userData.originalPos);
                const isHovering = dist < 2.5; // Radius of effect

                // MAGNETIC EFFECT
                if (isHovering) {
                    // Pull towards mouse
                    const force = mouseWorld.clone().sub(tile.userData.originalPos).multiplyScalar(0.3); // 30% strength
                    const targetPos = tile.userData.originalPos.clone().add(force);

                    // Lerp current pos to target
                    tile.position.lerp(targetPos, 0.1);

                    // Tilt towards mouse
                    // dx > 0 means mouse is right -> tilt y positive?
                    const dx = mouseWorld.x - tile.position.x;
                    const dy = mouseWorld.y - tile.position.y;

                    tile.rotation.y = THREE.MathUtils.lerp(tile.rotation.y, dx * 0.5, 0.1);
                    tile.rotation.x = THREE.MathUtils.lerp(tile.rotation.x, -dy * 0.5, 0.1);

                    // Glow
                    tile.userData.slabMesh.material.emissive.setHex(0x222222);
                    document.body.style.cursor = "pointer";
                } else {
                    // Return to origin
                    tile.position.lerp(tile.userData.originalPos, 0.1);

                    // Reset rotation
                    tile.rotation.y = THREE.MathUtils.lerp(tile.rotation.y, 0, 0.1);
                    tile.rotation.x = THREE.MathUtils.lerp(tile.rotation.x, 0, 0.1);

                    // No glow
                    tile.userData.slabMesh.material.emissive.setHex(0x000000);
                }
            });

            // If no tile is hovering... tricky since we loop. 
            // Better to track intersected object for cursor, but magnetic logic handles "proximity" better.

            renderer.render(scene, camera);
        }
        animate();


        /* ===== RESIZE ===== */
        window.addEventListener("resize", () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        });
    }
})();
