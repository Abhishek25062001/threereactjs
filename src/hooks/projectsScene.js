/* projectsScene.js - Infinite Tunnel */
(() => {
    // Mobile Check
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    {
        const canvas = document.getElementById("projectsCanvas");
        if (!canvas) return;

        // Register ScrollTrigger if not already (safeguard)
        gsap.registerPlugin(ScrollTrigger);

        // Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 5, 40); // Tunnel fade effect

        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 0; // Starting position

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true }); // Alpha false for better performance/fog
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        /* ===== TUNNEL GEOMETRY ===== */
        // Create a "Starfield Tunnel" effect using particles
        const tGeo = new THREE.BufferGeometry();
        const tCount = 4000;
        const tPos = new Float32Array(tCount * 3);

        for (let i = 0; i < tCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 5 + Math.random() * 10; // Tunnel radius range
            const z = (Math.random() - 0.1) * -100; // Tunnel length (0 to -100)

            tPos[i * 3] = Math.cos(angle) * radius;
            tPos[i * 3 + 1] = Math.sin(angle) * radius;
            tPos[i * 3 + 2] = z;
        }

        tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
        const tMat = new THREE.PointsMaterial({
            color: 0x4ade80,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });
        const tunnel = new THREE.Points(tGeo, tMat);
        scene.add(tunnel);


        /* ===== PROJECT BILLBOARDS ===== */
        const projectsData = [
            { title: "React Dashboard", desc: "A comprehensive analytics dashboard built with React and D3.js", color: 0x4a90e2 },
            { title: "Mobile Commerce", desc: "React Native app with Stripe integration and smooth animations", color: 0xe24a8d },
            { title: "SaaS Platform", desc: "Full-stack MERN solution with recurring billing and user auth", color: 0xf5a623 },
            { title: "3D Portfolio", desc: "Interactive portfolio leveraging Three.js and GSAP for animations", color: 0x7ed321 }
        ];

        const boardsGroup = new THREE.Group();
        scene.add(boardsGroup);
        const boards = [];

        projectsData.forEach((proj, i) => {
            // Billboard Geometry
            const boardGeo = new THREE.PlaneGeometry(5, 3); // 16:9 ish
            const boardMat = new THREE.MeshBasicMaterial({
                color: 0x111111,
                side: THREE.DoubleSide
            });
            const board = new THREE.Mesh(boardGeo, boardMat);

            // Add Border/Frame
            const edges = new THREE.EdgesGeometry(boardGeo);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: proj.color }));
            board.add(line);

            // Positioning (Staggered along Z)
            const zPos = -20 - (i * 25); // Every 25 units deep
            const xPos = (i % 2 === 0) ? 3 : -3; // Alternating sides
            const rotY = (i % 2 === 0) ? -0.3 : 0.3; // Slight tilt towards center

            board.position.set(xPos, 0, zPos);
            board.rotation.y = rotY;
            board.userData = { ...proj, originalPos: { x: xPos, y: 0, z: zPos }, originalRot: { x: 0, y: rotY, z: 0 } };

            boardsGroup.add(board);
            boards.push(board);

            // Add simple Text Label (Sprite or CanvasTexture is expensive, sticking to simple color for now or maybe a tiny sphere indicator)
            // Just coloring the border to differentiate
        });


        /* ===== SCROLL SYNC ===== */
        // We link the camera Z position to the scroll progress
        // Total Scroll Height determines how far we travel
        // Let's say we travel from Z=0 to Z = lastBoard.z + 10
        const totalDistance = Math.abs(boards[boards.length - 1].position.z) + 10;

        // Use GSAP to animate a "cameraRig" object, and we copy its pos to camera
        const cameraRig = { z: 0 };

        ScrollTrigger.create({
            trigger: ".projects-scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
                // Move rig Z from 0 to -totalDistance based on progress
                cameraRig.z = -self.progress * totalDistance;
            }
        });


        /* ===== RAYCASTER (Interaction) ===== */
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let activeBoard = null;

        window.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('click', (e) => {
            if (!activeBoard) {
                // Click to Expand interaction check
                checkIntersection();
                if (intersectedObject) {
                    expandCard(intersectedObject);
                }
            } else {
                // Close interaction
                closeCard();
            }
        });

        let intersectedObject = null;

        function checkIntersection() {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(boards);

            if (intersects.length > 0) {
                intersectedObject = intersects[0].object;
                document.body.style.cursor = "pointer";
            } else {
                intersectedObject = null;
                document.body.style.cursor = "default";
            }
        }

        // Overlay Elements
        const overlay = document.getElementById("project-overlay");
        const oTitle = document.getElementById("overlay-title");
        const oDesc = document.getElementById("overlay-desc");
        const closeBtn = document.getElementById("close-overlay");

        closeBtn.addEventListener("click", closeCard);

        function expandCard(board) {
            activeBoard = board;

            // Freeze Scroll (Optional, simple way is strict overflow hidden on body, but sticky handles it mostly)

            // Move Board to front of camera
            // We convert camera local coords to world
            const targetPos = new THREE.Vector3(0, 0, -5);
            targetPos.applyMatrix4(camera.matrixWorld);

            gsap.to(board.position, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 1,
                ease: "power3.out"
            });

            gsap.to(board.rotation, {
                x: camera.rotation.x,
                y: camera.rotation.y,
                z: camera.rotation.z,
                duration: 1,
                ease: "power3.out"
            });

            // Show Overlay
            oTitle.innerText = board.userData.title;
            oDesc.innerText = board.userData.desc;

            overlay.classList.remove("opacity-0", "pointer-events-none");
            overlay.querySelector("div").classList.remove("scale-95");
            overlay.querySelector("div").classList.add("scale-100");
        }

        function closeCard() {
            if (!activeBoard) return;

            // Return to original pos
            const orig = activeBoard.userData.originalPos;
            const origRot = activeBoard.userData.originalRot;

            gsap.to(activeBoard.position, {
                x: orig.x,
                y: orig.y,
                z: orig.z,
                duration: 1,
                ease: "power3.inOut"
            });

            gsap.to(activeBoard.rotation, {
                x: origRot.x,
                y: origRot.y,
                z: origRot.z,
                duration: 1,
                ease: "power3.inOut"
            });

            activeBoard = null;

            // Hide Overlay
            overlay.classList.add("opacity-0", "pointer-events-none");
            overlay.querySelector("div").classList.add("scale-95");
            overlay.querySelector("div").classList.remove("scale-100");
        }


        /* ===== ANIMATION ===== */

        function animate() {
            if (isMobile) return;

            // Smooth Camera Follow
            // Interpolate camera.z towards cameraRig.z
            camera.position.z += (cameraRig.z - camera.position.z) * 0.1;

            // Tunnel rotation
            tunnel.rotation.z += 0.001;

            // Raycasting for Hover glow
            if (!activeBoard) {
                checkIntersection();
                boards.forEach(b => {
                    if (b === intersectedObject) {
                        b.material.color.setHex(0x333333);
                    } else {
                        b.material.color.setHex(0x111111);
                    }
                });
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        /* ===== RESIZE ===== */
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }
})();
