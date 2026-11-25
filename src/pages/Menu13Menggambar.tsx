import React, { useEffect, useRef, useState } from 'react';
import { Eraser, Trash2, Download, Pencil, Sparkles } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { SHAPES_DATA, ShapeId } from '../data/geometryData';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu13MenggambarProps {
  onBackHome: () => void;
}

const PALETTE = [
  { name: 'Merah', hex: '#ef4444' },
  { name: 'Biru', hex: '#2563eb' },
  { name: 'Kuning', hex: '#eab308' },
  { name: 'Hijau', hex: '#16a34a' },
  { name: 'Ungu', hex: '#8b5cf6' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Hitam', hex: '#0f172a' },
];

export const Menu13Menggambar: React.FC<Menu13MenggambarProps> = ({ onBackHome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  const [color, setColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const [guideShape, setGuideShape] = useState<ShapeId | null>('persegi');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const pt = getCoords(e);
    lastPtRef.current = pt;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, (isEraser ? brushSize * 2 : brushSize) / 2, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? '#ffffff' : color;
    ctx.fill();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || !lastPtRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pt = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = isEraser ? brushSize * 2 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPtRef.current = pt;
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    lastPtRef.current = null;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    soundEngine.playPop();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    soundEngine.playCorrect();
    triggerConfetti(50);
    const link = document.createElement('a');
    link.download = 'Gambarku-Pulau-Ajaib.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <PageShell
      menuNumber="13"
      title="Ayo Menggambar"
      subtitle="Gambar bangun datar pakai jari atau mouse — pilih pola jiplak jika ingin berlatih!"
      onBackHome={onBackHome}
      rightSlot={
        <GlossyButton variant="green" size="sm" onClick={handleDownload}>
          <Download className="w-4 h-4" />
          <span>Simpan Gambar</span>
        </GlossyButton>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Tools */}
        <div className="lg:col-span-4 space-y-4 bg-slate-50 rounded-2xl p-4 border-2 border-slate-200">
          <div>
            <div className="text-xs font-extrabold text-slate-600 mb-2">Pilih Warna Kuas:</div>
            <div className="flex flex-wrap gap-2">
              {PALETTE.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => {
                    soundEngine.playPop();
                    setColor(c.hex);
                    setIsEraser(false);
                  }}
                  title={c.name}
                  className={`w-9 h-9 rounded-xl border-2 cursor-pointer transition-transform ${
                    !isEraser && color === c.hex
                      ? 'border-slate-900 scale-110 ring-2 ring-amber-300'
                      : 'border-white shadow-sm'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-extrabold text-slate-600 mb-2">Ukuran Kuas:</div>
            <div className="flex gap-2">
              {[
                { label: 'Kecil', val: 4 },
                { label: 'Sedang', val: 9 },
                { label: 'Besar', val: 16 },
              ].map((s) => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => {
                    soundEngine.playPop();
                    setBrushSize(s.val);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer ${
                    brushSize === s.val
                      ? 'bg-sky-500 text-white border-sky-700'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <GlossyButton
              variant={!isEraser ? 'blue' : 'white'}
              size="sm"
              className="flex-1"
              onClick={() => setIsEraser(false)}
            >
              <Pencil className="w-4 h-4" />
              <span>Kuas</span>
            </GlossyButton>
            <GlossyButton
              variant={isEraser ? 'amber' : 'white'}
              size="sm"
              className="flex-1"
              onClick={() => setIsEraser(true)}
            >
              <Eraser className="w-4 h-4" />
              <span>Penghapus</span>
            </GlossyButton>
            <GlossyButton variant="red" size="sm" onClick={handleClear}>
              <Trash2 className="w-4 h-4" />
            </GlossyButton>
          </div>

          {/* Tracing Shape Guide */}
          <div className="pt-2 border-t border-slate-200">
            <div className="text-xs font-extrabold text-slate-600 mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Garis Pola Jiplak (Opsional):</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGuideShape(null)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                  guideShape === null
                    ? 'bg-slate-800 text-white border-slate-950'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Bebas (Tanpa Pola)
              </button>
              {SHAPES_DATA.map((sh) => (
                <button
                  key={sh.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playPop();
                    setGuideShape(sh.id);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                    guideShape === sh.id
                      ? 'bg-amber-400 text-slate-950 border-amber-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {sh.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Drawing Canvas */}
        <div className="lg:col-span-8">
          <div className="relative bg-white rounded-3xl border-4 border-sky-200 shadow-inner overflow-hidden">
            <canvas
              ref={canvasRef}
              width={760}
              height={480}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="w-full h-auto block cursor-crosshair touch-none"
            />

            {/* Optional dashed tracing overlay (non-blocking) */}
            {guideShape && (
              <svg
                viewBox="0 0 760 480"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
                aria-hidden="true"
              >
                {guideShape === 'persegi' && (
                  <rect
                    x="220"
                    y="80"
                    width="320"
                    height="320"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="6"
                    strokeDasharray="16 12"
                  />
                )}
                {guideShape === 'persegi_panjang' && (
                  <rect
                    x="130"
                    y="115"
                    width="500"
                    height="250"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="6"
                    strokeDasharray="16 12"
                  />
                )}
                {guideShape === 'segitiga' && (
                  <polygon
                    points="380,65 570,400 190,400"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="6"
                    strokeDasharray="16 12"
                  />
                )}
                {guideShape === 'lingkaran' && (
                  <circle
                    cx="380"
                    cy="240"
                    r="165"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="6"
                    strokeDasharray="16 12"
                  />
                )}
                {guideShape === 'oval' && (
                  <ellipse
                    cx="380"
                    cy="240"
                    rx="125"
                    ry="180"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="6"
                    strokeDasharray="16 12"
                  />
                )}
                {guideShape === 'trapesium' && (
                  <polygon
                    points="250,100 510,100 610,380 150,380"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="6"
                    strokeDasharray="16 12"
                  />
                )}
              </svg>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
};
