"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import type { Book } from "@/content/home";
import { shelfState } from "./shelfState";

/*
 * A row of bound books. The cover artwork is the front face; spines,
 * page edges and shadows are drawn procedurally on small canvases, so the
 * only network cost is the four cover images. Loaded on demand (desktop,
 * WebGL, motion allowed) and paused whenever the shelf is off screen.
 */

const W = 1.5;
const H = 2.16;
const D = 0.28;
const SPACING = 2.35;

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function pagesTexture(rotate = false) {
  const t = canvasTexture(64, 256, (ctx) => {
    ctx.fillStyle = "#efe5d1";
    ctx.fillRect(0, 0, 64, 256);
    for (let x = 0; x < 64; x += 2) {
      ctx.fillStyle = `rgba(90,70,40,${0.05 + Math.random() * 0.1})`;
      ctx.fillRect(x, 0, 1, 256);
    }
  });
  if (rotate) {
    t.center.set(0.5, 0.5);
    t.rotation = Math.PI / 2;
  }
  return t;
}

function spineTexture(book: Book) {
  return canvasTexture(64, 512, (ctx) => {
    ctx.fillStyle = book.spine;
    ctx.fillRect(0, 0, 64, 512);
    const g = ctx.createLinearGradient(0, 0, 64, 0);
    g.addColorStop(0, "rgba(0,0,0,0.45)");
    g.addColorStop(0.4, "rgba(255,255,255,0.06)");
    g.addColorStop(1, "rgba(0,0,0,0.3)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 512);
    ctx.strokeStyle = "rgba(205,181,136,0.7)";
    ctx.lineWidth = 1.5;
    [28, 34, 478, 484].forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(8, y);
      ctx.lineTo(56, y);
      ctx.stroke();
    });
    ctx.save();
    ctx.translate(32, 256);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = "#e8dcc4";
    ctx.font = "italic 26px 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(book.title, 0, 0, 400);
    ctx.restore();
  });
}

let shadowTex: THREE.Texture | null = null;
function shadowTexture() {
  if (shadowTex) return shadowTex;
  shadowTex = canvasTexture(256, 64, (ctx) => {
    const g = ctx.createRadialGradient(128, 32, 4, 128, 32, 120);
    g.addColorStop(0, "rgba(0,0,0,0.55)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.save();
    ctx.scale(1, 0.27);
    ctx.fillRect(0, 0, 256, 240);
    ctx.restore();
  });
  return shadowTex;
}

function BookMesh({ book, cover, index }: { book: Book; cover: THREE.Texture; index: number }) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    const pages = new THREE.MeshStandardMaterial({ map: pagesTexture(), roughness: 0.92 });
    const pagesTop = new THREE.MeshStandardMaterial({ map: pagesTexture(true), roughness: 0.92 });
    const spine = new THREE.MeshStandardMaterial({ map: spineTexture(book), roughness: 0.6 });
    const back = new THREE.MeshStandardMaterial({ color: book.spine, roughness: 0.7 });
    const front = new THREE.MeshStandardMaterial({ map: cover, roughness: 0.5, metalness: 0.02 });
    // BoxGeometry face order: +x, -x, +y, -y, +z, -z
    return [pages, spine, pagesTop, pagesTop, front, back];
  }, [book, cover]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const d = index - shelfState.progress;
    const ad = Math.abs(d);
    const k = 1 - Math.pow(0.0015, dt); // frame-rate independent smoothing

    const focus = Math.max(0, 1 - ad);
    const tx = d * SPACING;
    const tz = -Math.min(ad, 2.2) * 1.5;
    const ry = -d * 0.62 + focus * shelfState.pointer.x * 0.32;
    const rx = focus * -shelfState.pointer.y * 0.14;

    g.position.x += (tx - g.position.x) * k;
    g.position.z += (tz - g.position.z) * k;
    g.rotation.y += (ry - g.rotation.y) * k;
    g.rotation.x += (rx - g.rotation.x) * k;
    if (body.current) body.current.position.y = Math.sin(performance.now() / 1400 + index) * 0.03 * focus;

    const fade = THREE.MathUtils.clamp(2.6 - ad, 0, 1);
    g.visible = fade > 0.01;
    materials.forEach((m) => {
      m.transparent = fade < 1;
      m.opacity = fade;
    });
    if (shadow.current) (shadow.current.material as THREE.MeshBasicMaterial).opacity = 0.9 * fade;
  });

  return (
    <group ref={group} position={[index * SPACING, 0, 0]}>
      <mesh ref={body} material={materials}>
        <boxGeometry args={[W, H, D]} />
      </mesh>
      <mesh ref={shadow} position={[0, -H / 2 - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W * 1.9, D * 4]} />
        <meshBasicMaterial map={shadowTexture()} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

function Books({ books }: { books: Book[] }) {
  const covers = useLoader(
    THREE.TextureLoader,
    books.map((b) => b.cover),
  );
  covers.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
  return (
    <group position={[0, 0.12, 0]}>
      {books.map((b, i) => (
        <BookMesh key={b.id} book={b} cover={covers[i]} index={i} />
      ))}
    </group>
  );
}

export default function BookScene({ books, active }: { books: Book[]; active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 7.2], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} color="#f1e3c8" />
      <directionalLight position={[3, 4, 6]} intensity={2.4} color="#ffe3bd" />
      <directionalLight position={[-5, 2, -3]} intensity={1.1} color="#c98f5a" />
      <Suspense fallback={null}>
        <Books books={books} />
      </Suspense>
    </Canvas>
  );
}
