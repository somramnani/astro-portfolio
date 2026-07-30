import * as THREE from "three";

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const canvas = document.querySelector("#hero-canvas");
const wrapper = canvas?.closest<HTMLElement>(".hero-background");

if (canvas instanceof HTMLCanvasElement && wrapper) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  camera.position.set(0, 0, 7);

  const group = new THREE.Group();
  scene.add(group);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.25, 1),
    new THREE.MeshStandardMaterial({
      color: 0xe85d45,
      roughness: 0.42,
      metalness: 0.18,
      flatShading: true,
    }),
  );
  group.add(core);

  const wire = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.72, 0.018, 150, 12),
    new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.35,
      metalness: 0.55,
    }),
  );
  group.add(wire);

  const dotsGeometry = new THREE.BufferGeometry();
  const dotPositions: number[] = [];
  for (let i = 0; i < 120; i += 1) {
    const radius = 2.15 + Math.random() * 1.85;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    dotPositions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    );
  }
  dotsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dotPositions, 3),
  );

  const dots = new THREE.Points(
    dotsGeometry,
    new THREE.PointsMaterial({
      color: 0x2563eb,
      size: 0.035,
      transparent: true,
      opacity: 0.72,
    }),
  );
  group.add(dots);

  scene.add(new THREE.AmbientLight(0xffffff, 1.8));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(3, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x9bd8d2, 1.1);
  fillLight.position.set(-4, -2, 3);
  scene.add(fillLight);

  const resize = () => {
    const { width, height } = wrapper.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = wrapper.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    group.position.x = x * 0.28;
    group.position.y = y * -0.22;
  };

  window.addEventListener("resize", resize);
  wrapper.addEventListener("pointermove", onPointerMove);
  resize();

  const render = () => {
    renderer.render(scene, camera);
  };

  if (reduceMotion) {
    group.rotation.set(0.35, -0.4, 0.12);
    render();
  } else {
    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      core.rotation.x = time * 0.25;
      core.rotation.y = time * 0.36;
      wire.rotation.x = time * -0.19;
      wire.rotation.y = time * 0.3;
      dots.rotation.y = time * 0.05;
      group.rotation.z = Math.sin(time * 0.45) * 0.08;
      render();
      window.requestAnimationFrame(animate);
    };
    animate();
  }
}
