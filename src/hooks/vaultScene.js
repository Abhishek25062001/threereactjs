/* vaultScene.js - Proof of Work */
(() => {
    // Mobile Check
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    {
        const canvas = document.getElementById("vaultCanvas");
        if (!canvas) return;

        gsap.registerPlugin(ScrollTrigger);

        // Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 2, 15);

        const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 4);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lights
        const ambient = new THREE.AmbientLight(0x888888, 1); // Increased ambient
        scene.add(ambient);

        const spot = new THREE.SpotLight(0xffffff, 8); // Higher intensity
        spot.position.set(2, 5, 8); // Moved forward
        spot.angle = Math.PI / 3;
        spot.penumbra = 0.5;
        scene.add(spot);

        // Rim Light for edge definition
        const rim = new THREE.DirectionalLight(0x4ade80, 2);
        rim.position.set(-5, 5, -5);
        scene.add(rim);

        // Inner Light (Reveals contents)
        const innerLight = new THREE.PointLight(0x4ade80, 0, 8); // Starts off
        innerLight.position.set(0, 0, -2);
        scene.add(innerLight);


        /* ===== GEOMETRY: THE VAULT ===== */
        const vaultGroup = new THREE.Group();
        scene.add(vaultGroup);

        // 1. Vault Door Frame (Wall)
        const frameGeo = new THREE.BoxGeometry(10, 8, 1);
        // Cut a hole? Easier to build around the hole.
        // Left, Right, Top, Bottom pieces
        // Brighter metallic color
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.4, metalness: 0.8 });

        const leftWall = new THREE.Mesh(new THREE.BoxGeometry(3, 8, 1), wallMat);
        leftWall.position.set(-3.5, 0, 0);
        const rightWall = new THREE.Mesh(new THREE.BoxGeometry(3, 8, 1), wallMat);
        rightWall.position.set(3.5, 0, 0);
        const topWall = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 1), wallMat);
        topWall.position.set(0, 2.75, 0);
        const botWall = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 1), wallMat);
        botWall.position.set(0, -2.75, 0);

        vaultGroup.add(leftWall, rightWall, topWall, botWall);


        // 2. Vault Door Pivot Group (Hinge on Left)
        const doorPivot = new THREE.Group();
        doorPivot.position.set(-2, 0, 0.5); // Hinge pos
        vaultGroup.add(doorPivot);

        // 3. The Door Itself
        const doorGeo = new THREE.BoxGeometry(3.8, 2.8, 0.5);
        const doorMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.2, metalness: 0.9 });
        const door = new THREE.Mesh(doorGeo, doorMat);
        door.position.set(2, 0, 0); // Offset based on pivot
        doorPivot.add(door);

        // 4. The Handle
        const handleGroup = new THREE.Group();
        handleGroup.position.set(3, 0, 0.3); // Right side of door
        doorPivot.add(handleGroup);

        const wheelGeo = new THREE.TorusGeometry(0.4, 0.05, 8, 24);
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 1.0 });
        const wheel = new THREE.Mesh(wheelGeo, metalMat);
        handleGroup.add(wheel);

        // Spokes
        const spokeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
        const spoke1 = new THREE.Mesh(spokeGeo, metalMat);
        const spoke2 = new THREE.Mesh(spokeGeo, metalMat);
        spoke2.rotation.z = Math.PI / 2;
        handleGroup.add(spoke1, spoke2);


        /* ===== GEOMETRY: INTERIOR (CERTIFICATES) ===== */
        const certGroup = new THREE.Group();
        certGroup.position.z = -2; // Inside
        scene.add(certGroup);

        const certs = [
            { name: "AWS Certified", color: 0xff9900 },
            { name: "GitHub Top", color: 0x333333 },
            { name: "Full Stack", color: 0x4ade80 }
        ];

        certs.forEach((c, i) => {
            const plane = new THREE.Mesh(
                new THREE.PlaneGeometry(1, 1.4),
                new THREE.MeshStandardMaterial({
                    color: c.color,
                    emissive: c.color,
                    emissiveIntensity: 0.8,
                    roughness: 0.2
                })
            );
            // Fan them out
            plane.position.x = (i - 1) * 1.5;
            plane.rotation.y = (i - 1) * -0.2;
            certGroup.add(plane);

            // "Float" animation later
        });


        /* ===== SCROLL ANIMATION SEQUENCE ===== */
        // Timeline linked to scroll container
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".vault-scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // 1. Spin Handle (0-20%)
        tl.to(handleGroup.rotation, { z: Math.PI * 4, duration: 2 });

        // 2. Open Door (20-50%)
        tl.to(doorPivot.rotation, { y: -Math.PI / 1.5, duration: 3 });

        // 3. Camera Move In (50-100%)
        tl.to(camera.position, { z: -1, duration: 5 }, "-=1");

        // 4. Reveal Lights & UI (Late stage)
        tl.to(innerLight, { intensity: 2, duration: 2 }, "-=4");
        tl.to("#vault-overlay", { opacity: 1, duration: 2 }, "-=2");


        /* ===== ANIMATION LOOP ===== */
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            // Float certificates
            const t = clock.getElapsedTime();
            certGroup.children.forEach((c, i) => {
                c.position.y = Math.sin(t + i) * 0.1;
            });

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
