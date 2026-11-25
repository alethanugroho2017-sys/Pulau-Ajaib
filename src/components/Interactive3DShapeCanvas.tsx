import React, { useEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';
import { ShapeId } from '../data/geometryData';

interface Interactive3DShapeCanvasProps {
  shapeId: ShapeId;
  colorHex: string;
  showVertices?: boolean;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function getPolygonPoints(shapeId: ShapeId): [number, number][] {
  switch (shapeId) {
    case 'persegi':
      return [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
    case 'persegi_panjang':
      return [
        [-1.45, -0.85],
        [1.45, -0.85],
        [1.45, 0.85],
        [-1.45, 0.85],
      ];
    case 'segitiga':
      return [
        [0, -1.18],
        [1.15, 0.92],
        [-1.15, 0.92],
      ];
    case 'trapesium':
      return [
        [-0.78, -0.85],
        [0.78, -0.85],
        [1.3, 0.85],
        [-1.3, 0.85],
      ];
    case 'lingkaran': {
      const pts: [number, number][] = [];
      const steps = 28;
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        pts.push([Math.cos(a) * 1.12, Math.sin(a) * 1.12]);
      }
      return pts;
    }
    case 'oval': {
      const pts: [number, number][] = [];
      const steps = 28;
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        pts.push([Math.cos(a) * 0.82, Math.sin(a) * 1.24]);
      }
      return pts;
    }
  }
}

function shadeHex(hex: string, factor: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, Math.round(((num >> 16) & 255) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((num >> 8) & 255) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((num & 255) * factor)));
  return `rgb(${r}, ${g}, ${b})`;
}

export const Interactive3DShapeCanvas: React.FC<Interactive3DShapeCanvasProps> = ({
  shapeId,
  colorHex,
  showVertices = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotRef = useRef({ rx: 0.32, ry: 0.45, dragging: false, lastX: 0, lastY: 0 });
  const [autoSpin, setAutoSpin] = useState(true);
  const autoSpinRef = useRef(true);
  autoSpinRef.current = autoSpin;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const poly2D = getPolygonPoints(shapeId);
    const isCurved = shapeId === 'lingkaran' || shapeId === 'oval';
    const depth = 0.34;
    const frontVerts: Vec3[] = poly2D.map(([x, y]) => ({ x, y, z: depth }));
    const backVerts: Vec3[] = poly2D.map(([x, y]) => ({ x, y, z: -depth }));

    const rotateVec = (v: Vec3, rx: number, ry: number): Vec3 => {
      // Rotate Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = v.x * cosY + v.z * sinY;
      const z1 = -v.x * sinY + v.z * cosY;
      // Rotate X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = v.y * cosX - z1 * sinX;
      const z2 = v.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    };

    const project = (v: Vec3, w: number, h: number) => {
      const fov = 4.6;
      const scale = (Math.min(w, h) * 0.34 * fov) / (fov - v.z);
      return {
        x: w / 2 + v.x * scale,
        y: h / 2 + v.y * scale,
        z: v.z,
      };
    };

    let rafId = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 300;
      const h = rect.height || 260;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      if (autoSpinRef.current && !rotRef.current.dragging) {
        rotRef.current.ry += 0.016;
      }

      const { rx, ry } = rotRef.current;
      const fRot = frontVerts.map((v) => rotateVec(v, rx, ry));
      const bRot = backVerts.map((v) => rotateVec(v, rx, ry));

      const fProj = fRot.map((v) => project(v, w, h));
      const bProj = bRot.map((v) => project(v, w, h));

      // Ground contact shadow
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.14)';
      ctx.beginPath();
      ctx.ellipse(w / 2, h * 0.86, w * 0.24, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Collect faces (front, back, sides) for painter's sort
      interface Face {
        pts: { x: number; y: number }[];
        avgZ: number;
        color: string;
        stroke: string;
        isMain?: boolean;
      }

      const faces: Face[] = [];
      const n = poly2D.length;

      // Back face
      const backAvgZ = bRot.reduce((acc, v) => acc + v.z, 0) / n;
      faces.push({
        pts: bProj,
        avgZ: backAvgZ,
        color: shadeHex(colorHex, 0.72),
        stroke: shadeHex(colorHex, 0.55),
        isMain: true,
      });

      // Side extrusions
      for (let i = 0; i < n; i++) {
        const next = (i + 1) % n;
        const avgZ = (fRot[i].z + fRot[next].z + bRot[i].z + bRot[next].z) / 4;
        const shade = 0.78 + Math.sin(i * 0.7 + ry) * 0.14;
        faces.push({
          pts: [fProj[i], fProj[next], bProj[next], bProj[i]],
          avgZ,
          color: shadeHex(colorHex, shade),
          stroke: isCurved ? shadeHex(colorHex, 0.78) : shadeHex(colorHex, 0.58),
        });
      }

      // Front face
      const frontAvgZ = fRot.reduce((acc, v) => acc + v.z, 0) / n;
      faces.push({
        pts: fProj,
        avgZ: frontAvgZ,
        color: shadeHex(colorHex, 1.08),
        stroke: shadeHex(colorHex, 0.65),
        isMain: true,
      });

      faces.sort((a, b) => a.avgZ - b.avgZ);

      for (const face of faces) {
        ctx.beginPath();
        face.pts.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fillStyle = face.color;
        ctx.fill();
        ctx.strokeStyle = face.stroke;
        ctx.lineWidth = face.isMain ? 2.5 : isCurved ? 0.6 : 1.8;
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Highlight glowing vertex spheres on front face for polygon shapes
      if (showVertices && !isCurved) {
        const frontVisible = frontAvgZ >= backAvgZ;
        const activeVerts = frontVisible ? fProj : bProj;
        activeVerts.forEach((pt, idx) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 7.5, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#b45309';
          ctx.stroke();

          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 10px Outfit, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(idx + 1), pt.x, pt.y + 0.5);
        });
      }

      ctx.restore();
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [shapeId, colorHex, showVertices]);

  return (
    <div className="relative w-full h-64 bg-gradient-to-b from-sky-50 to-indigo-50 rounded-2xl border-2 border-sky-200 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={(e) => {
          rotRef.current.dragging = true;
          rotRef.current.lastX = e.clientX;
          rotRef.current.lastY = e.clientY;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!rotRef.current.dragging) return;
          const dx = e.clientX - rotRef.current.lastX;
          const dy = e.clientY - rotRef.current.lastY;
          rotRef.current.ry += dx * 0.014;
          rotRef.current.rx = Math.max(-1.1, Math.min(1.1, rotRef.current.rx + dy * 0.012));
          rotRef.current.lastX = e.clientX;
          rotRef.current.lastY = e.clientY;
        }}
        onPointerUp={() => {
          rotRef.current.dragging = false;
        }}
        onPointerCancel={() => {
          rotRef.current.dragging = false;
        }}
      />
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
        <span className="text-xs font-semibold text-slate-600 bg-white/90 px-2.5 py-1 rounded-lg border border-slate-200">
          Geser bentuk dengan jari/mouse untuk memutar 3D
        </span>
        <button
          type="button"
          onClick={() => setAutoSpin((s) => !s)}
          className="pointer-events-auto inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-sky-100 text-sky-700 px-3 py-1.5 rounded-lg border border-sky-200 shadow-sm cursor-pointer"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoSpin ? 'animate-spin' : ''}`} />
          <span>{autoSpin ? 'Putar Otomatis' : 'Jeda Putar'}</span>
        </button>
      </div>
    </div>
  );
};
