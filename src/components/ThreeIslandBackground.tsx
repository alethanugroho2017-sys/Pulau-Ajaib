import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(254, 240, 138, 0.85)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createExtrudedShape(
  shape: THREE.Shape,
  color: number,
  depth = 0.24
): THREE.Mesh {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 3,
  });
  geo.center();
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.22,
    metalness: 0.15,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  return mesh;
}

function buildKikoMascot(): {
  group: THREE.Group;
  rightArmPivot: THREE.Group;
  headGroup: THREE.Group;
  tailPivot: THREE.Group;
} {
  const group = new THREE.Group();

  const furOrange = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    roughness: 0.55,
    metalness: 0.05,
  });
  const furCream = new THREE.MeshStandardMaterial({
    color: 0xfff7ed,
    roughness: 0.6,
    metalness: 0.02,
  });
  const hatTan = new THREE.MeshStandardMaterial({
    color: 0xfde68a,
    roughness: 0.45,
    metalness: 0.08,
  });
  const bandanaBlue = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    roughness: 0.35,
    metalness: 0.1,
  });
  const darkEye = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.15,
    metalness: 0.3,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xfb7185,
    roughness: 0.4,
    metalness: 0.05,
  });

  // Body
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.45, 8, 16), furOrange);
  body.position.y = 0.65;
  body.castShadow = true;
  group.add(body);

  // Cream belly patch
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), furCream);
  belly.scale.set(0.85, 1.05, 0.55);
  belly.position.set(0, 0.62, 0.24);
  group.add(belly);

  // Feet
  const footGeo = new THREE.SphereGeometry(0.17, 14, 14);
  const leftFoot = new THREE.Mesh(footGeo, furCream);
  leftFoot.scale.set(1, 0.65, 1.35);
  leftFoot.position.set(-0.22, 0.12, 0.12);
  const rightFoot = leftFoot.clone();
  rightFoot.position.set(0.22, 0.12, 0.12);
  group.add(leftFoot, rightFoot);

  // Sky-blue explorer bandana
  const bandana = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.09, 10, 24), bandanaBlue);
  bandana.rotation.x = Math.PI / 2;
  bandana.position.set(0, 1.02, 0);
  group.add(bandana);

  // Left arm (resting on hip / compass)
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.32, 6, 12), furOrange);
  leftArm.position.set(-0.48, 0.72, 0.08);
  leftArm.rotation.z = 0.42;
  group.add(leftArm);

  // Right arm (animated waving paw!)
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.4, 0.92, 0.06);
  const rightArmMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.36, 6, 12), furOrange);
  rightArmMesh.position.set(0.16, 0.22, 0);
  rightArmMesh.rotation.z = -0.65;
  const rightPaw = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), furCream);
  rightPaw.position.set(0.31, 0.38, 0);
  rightArmPivot.add(rightArmMesh, rightPaw);
  group.add(rightArmPivot);

  // Head group
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.42, 0.04);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.46, 20, 20), furOrange);
  head.scale.set(1.08, 0.96, 1.0);
  head.castShadow = true;
  headGroup.add(head);

  // Cheeks
  const cheekGeo = new THREE.SphereGeometry(0.14, 12, 12);
  const cheekL = new THREE.Mesh(cheekGeo, furCream);
  cheekL.position.set(-0.14, -0.1, 0.38);
  const cheekR = cheekL.clone();
  cheekR.position.set(0.14, -0.1, 0.38);
  headGroup.add(cheekL, cheekR);

  // Eyes
  const eyeGeo = new THREE.SphereGeometry(0.065, 12, 12);
  const eyeL = new THREE.Mesh(eyeGeo, darkEye);
  eyeL.position.set(-0.18, 0.06, 0.41);
  const eyeR = eyeL.clone();
  eyeR.position.set(0.18, 0.06, 0.41);
  headGroup.add(eyeL, eyeR);

  // Pink nose
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), pinkMat);
  nose.position.set(0, -0.04, 0.46);
  headGroup.add(nose);

  // Cat Ears
  const earGeo = new THREE.ConeGeometry(0.16, 0.32, 4);
  const earL = new THREE.Mesh(earGeo, furOrange);
  earL.position.set(-0.3, 0.38, 0);
  earL.rotation.z = 0.35;
  earL.rotation.y = Math.PI / 4;
  const earR = earL.clone();
  earR.position.set(0.3, 0.38, 0);
  earR.rotation.z = -0.35;
  headGroup.add(earL, earR);

  // Explorer Safari Hat
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.58, 0.06, 24), hatTan);
  brim.position.set(0, 0.34, 0.02);
  const crown = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2),
    hatTan
  );
  crown.position.set(0, 0.35, 0.02);
  const hatRibbon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.345, 0.355, 0.08, 20),
    bandanaBlue
  );
  hatRibbon.position.set(0, 0.39, 0.02);
  headGroup.add(brim, crown, hatRibbon);

  group.add(headGroup);

  // Wagging tail
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.38, -0.35);
  const tail = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.5, 6, 10), furOrange);
  tail.position.set(0, 0.22, -0.18);
  tail.rotation.x = -0.7;
  tailPivot.add(tail);
  group.add(tailPivot);

  return { group, rightArmPivot, headGroup, tailPivot };
}

export const ThreeIslandBackground: React.FC<{ isHome?: boolean }> = ({ isHome = true }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isHomeRef = useRef(isHome);
  isHomeRef.current = isHome;
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x38bdf8);
    scene.fog = new THREE.FogExp2(0x7dd3fc, 0.022);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      46,
      (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight),
      0.1,
      120
    );
    camera.position.set(0, 3.6, 12.2);
    camera.lookAt(0, 1.2, 0);

    // 3-point + outdoor daylight rig
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x15803d, 0.85);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.85);
    sunLight.position.set(7, 11, 8);
    sunLight.castShadow = !isSoftwareGl;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -7;
    sunLight.shadow.camera.right = 7;
    sunLight.shadow.camera.top = 7;
    sunLight.shadow.camera.bottom = -7;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.normalBias = 0.02;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xfde047, 0.65);
    rimLight.position.set(-7, 5, -6);
    scene.add(rimLight);

    // Floating Island Group
    const islandGroup = new THREE.Group();
    islandGroup.position.set(0, -1.15, 0);
    scene.add(islandGroup);

    // Grassy Top Disc
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.72,
      metalness: 0.04,
    });
    const grassTop = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.4, 0.55, 32), grassMat);
    grassTop.position.y = 0.25;
    grassTop.receiveShadow = true;
    islandGroup.add(grassTop);

    // Second elevated grass hill
    const grassHill = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.6, 0.45, 24), grassMat);
    grassHill.position.set(-1.3, 0.62, -0.6);
    grassHill.receiveShadow = true;
    islandGroup.add(grassHill);

    // Earth / Terracotta rocky underside
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.85,
      metalness: 0.05,
    });
    const cliffMain = new THREE.Mesh(new THREE.ConeGeometry(4.35, 3.8, 12), earthMat);
    cliffMain.rotation.x = Math.PI;
    cliffMain.position.y = -1.9;
    islandGroup.add(cliffMain);

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      roughness: 0.9,
      metalness: 0.05,
    });
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.75 + (i % 2) * 0.25, 0), rockMat);
      rock.position.set(Math.cos(angle) * 2.4, -1.2 - (i % 2) * 0.4, Math.sin(angle) * 2.4);
      islandGroup.add(rock);
    }

    // Sparkling Pond + Waterfall
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.15,
      metalness: 0.2,
    });
    const pond = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.08, 24), waterMat);
    pond.position.set(-0.2, 0.54, 1.8);
    islandGroup.add(pond);

    const waterfall = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 3.4, 0.18),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      })
    );
    waterfall.position.set(-0.2, -1.15, 3.65);
    waterfall.rotation.x = 0.2;
    islandGroup.add(waterfall);

    // Stylized multi-part trees
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
    const leafMats = [
      new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.55 }),
    ];
    const treePositions: [number, number, number, number][] = [
      [-2.5, 0.85, -1.1, 1.0],
      [-1.4, 0.85, -2.0, 0.85],
      [2.4, 0.5, -1.8, 0.9],
      [-3.1, 0.5, 1.1, 0.75],
    ];
    treePositions.forEach(([tx, ty, tz, s], idx) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.2, 1.1, 8), trunkMat);
      trunk.position.y = 0.55;
      trunk.castShadow = true;
      const crown1 = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.15, 9), leafMats[idx % 3]);
      crown1.position.y = 1.35;
      crown1.castShadow = true;
      const crown2 = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.9, 9), leafMats[(idx + 1) % 3]);
      crown2.position.y = 1.95;
      crown2.castShadow = true;
      tree.add(trunk, crown1, crown2);
      tree.position.set(tx, ty, tz);
      tree.scale.setScalar(s);
      islandGroup.add(tree);
    });

    // Little Satellite Floating Island
    const miniIsland = new THREE.Group();
    const miniTop = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.0, 0.35, 16), grassMat);
    const miniBase = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.3, 8), earthMat);
    miniBase.rotation.x = Math.PI;
    miniBase.position.y = -0.8;
    miniIsland.add(miniTop, miniBase);
    miniIsland.position.set(-5.8, 1.6, -2.5);
    scene.add(miniIsland);

    // KIKO 3D Explorer Cat Mascot on the right side of the main island
    const kiko = buildKikoMascot();
    kiko.group.position.set(2.35, 0.52, 1.35);
    kiko.group.rotation.y = -0.38;
    kiko.group.scale.setScalar(1.12);
    islandGroup.add(kiko.group);

    // 3D Rainbow Arch in the sky
    const rainbowGroup = new THREE.Group();
    const rainbowColors = [0xef4444, 0xf97316, 0xfacc15, 0x22c55e, 0x3b82f6, 0x8b5cf6];
    rainbowColors.forEach((col, i) => {
      const arcGeo = new THREE.TorusGeometry(6.8 - i * 0.22, 0.11, 10, 48, Math.PI);
      const arcMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.3,
        metalness: 0.1,
        emissive: col,
        emissiveIntensity: 0.18,
      });
      const arc = new THREE.Mesh(arcGeo, arcMat);
      rainbowGroup.add(arc);
    });
    rainbowGroup.position.set(0, -0.4, -5.2);
    scene.add(rainbowGroup);

    // Moving 3D Puffy Clouds
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0,
    });
    const clouds: { group: THREE.Group; speed: number; baseY: number }[] = [];
    const cloudCoords: [number, number, number, number][] = [
      [-7.5, 4.2, -3.5, 0.95],
      [6.2, 4.8, -4.2, 1.1],
      [-2.8, 5.6, -6.0, 0.85],
      [9.0, 2.8, -2.8, 0.8],
    ];
    cloudCoords.forEach(([cx, cy, cz, sc], idx) => {
      const cg = new THREE.Group();
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.75, 14, 14), cloudMat);
      const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 14), cloudMat);
      s2.position.set(0.65, -0.1, 0);
      const s3 = new THREE.Mesh(new THREE.SphereGeometry(0.58, 14, 14), cloudMat);
      s3.position.set(-0.62, -0.12, 0.05);
      const s4 = new THREE.Mesh(new THREE.SphereGeometry(0.45, 14, 14), cloudMat);
      s4.position.set(0.15, 0.35, -0.1);
      cg.add(s1, s2, s3, s4);
      cg.position.set(cx, cy, cz);
      cg.scale.setScalar(sc);
      scene.add(cg);
      clouds.push({ group: cg, speed: 0.25 + idx * 0.08, baseY: cy });
    });

    // 6 Orbiting 3D Geometric Shapes
    const shapesPivot = new THREE.Group();
    scene.add(shapesPivot);

    const sqShape = new THREE.Shape();
    sqShape.moveTo(-0.38, -0.38);
    sqShape.lineTo(0.38, -0.38);
    sqShape.lineTo(0.38, 0.38);
    sqShape.lineTo(-0.38, 0.38);
    sqShape.closePath();

    const rectShape = new THREE.Shape();
    rectShape.moveTo(-0.55, -0.3);
    rectShape.lineTo(0.55, -0.3);
    rectShape.lineTo(0.55, 0.3);
    rectShape.lineTo(-0.55, 0.3);
    rectShape.closePath();

    const triShape = new THREE.Shape();
    triShape.moveTo(0, 0.48);
    triShape.lineTo(-0.44, -0.36);
    triShape.lineTo(0.44, -0.36);
    triShape.closePath();

    const cirShape = new THREE.Shape();
    cirShape.absarc(0, 0, 0.42, 0, Math.PI * 2, false);

    const ovalShape = new THREE.Shape();
    ovalShape.absellipse(0, 0, 0.32, 0.5, 0, Math.PI * 2, false, 0);

    const trapShape = new THREE.Shape();
    trapShape.moveTo(-0.28, 0.34);
    trapShape.lineTo(0.28, 0.34);
    trapShape.lineTo(0.5, -0.34);
    trapShape.lineTo(-0.5, -0.34);
    trapShape.closePath();

    const floatingMeshes: { mesh: THREE.Mesh; angle: number; radius: number; yBase: number }[] = [
      { mesh: createExtrudedShape(sqShape, 0xf43f5e), angle: 0.4, radius: 5.2, yBase: 1.8 },
      { mesh: createExtrudedShape(rectShape, 0x3b82f6), angle: 1.4, radius: 5.5, yBase: 2.8 },
      { mesh: createExtrudedShape(triShape, 0xf59e0b), angle: 2.5, radius: 5.1, yBase: 1.5 },
      { mesh: createExtrudedShape(cirShape, 0x10b981), angle: 3.6, radius: 5.4, yBase: 2.5 },
      { mesh: createExtrudedShape(ovalShape, 0x8b5cf6), angle: 4.7, radius: 5.0, yBase: 1.6 },
      { mesh: createExtrudedShape(trapShape, 0xec4899), angle: 5.6, radius: 5.6, yBase: 2.6 },
    ];
    floatingMeshes.forEach((item) => {
      shapesPivot.add(item.mesh);
    });

    // Light Sparkle Particles
    const particleCount = 70;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 18;
      pPositions[i * 3 + 1] = Math.random() * 8 - 1;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const glowTex = createGlowTexture();
    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      map: glowTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    };

    const tick = () => {
      if (disposed) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);

      // Gentle island bobbing
      islandGroup.position.y = -1.15 + Math.sin(t * 0.9) * 0.14;
      miniIsland.position.y = 1.6 + Math.sin(t * 1.1 + 1.2) * 0.18;

      // Kiko waving paw & cheerful nod
      kiko.rightArmPivot.rotation.z = Math.sin(t * 5.2) * 0.42 + 0.15;
      kiko.headGroup.rotation.z = Math.sin(t * 2.1) * 0.07;
      kiko.tailPivot.rotation.y = Math.sin(t * 4.0) * 0.38;

      // Orbiting 3D shapes
      floatingMeshes.forEach((item, idx) => {
        const ang = item.angle + t * 0.22;
        item.mesh.position.x = Math.cos(ang) * item.radius;
        item.mesh.position.z = Math.sin(ang) * (item.radius * 0.55) - 0.8;
        item.mesh.position.y = item.yBase + Math.sin(t * 1.5 + idx) * 0.28;
        item.mesh.rotation.y += dt * 0.9;
        item.mesh.rotation.x = Math.sin(t * 0.8 + idx) * 0.25;
      });

      // Moving clouds
      clouds.forEach((c, idx) => {
        c.group.position.x += dt * c.speed;
        c.group.position.y = c.baseY + Math.sin(t * 0.6 + idx) * 0.12;
        if (c.group.position.x > 11) {
          c.group.position.x = -11;
        }
      });

      // Sparkle drift
      particles.rotation.y = t * 0.04;

      // Smooth camera framing when navigating between Home and Sub-page
      const targetCamY = isHomeRef.current ? 3.5 : 4.4;
      const targetCamZ = isHomeRef.current ? 12.2 : 14.0;
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.06);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.06);
      camera.lookAt(0, 1.1, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) {
            m.material.forEach((mat) => mat.dispose());
          } else {
            m.material?.dispose();
          }
        }
      });
      particleGeo.dispose();
      particleMat.dispose();
      glowTex.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden bg-sky-400">
        <img
          src="/src/assets/images/pulau_ajaib_hero_1795627985309.jpg"
          alt="Pulau Ajaib 3D"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-sky-500/20" />
      </div>
    );
  }

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
};
