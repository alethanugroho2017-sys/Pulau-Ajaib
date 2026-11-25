import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { Interactive3DShapeCanvas } from '../components/Interactive3DShapeCanvas';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { SHAPES_DATA, ShapeInfo } from '../data/geometryData';
import { soundEngine, speakIndonesian } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu03BelajarBangunProps {
  onBackHome: () => void;
  exploredShapes: string[];
  onExploreShape: (shapeId: string) => void;
}

export const Menu03BelajarBangun: React.FC<Menu03BelajarBangunProps> = ({
  onBackHome,
  exploredShapes,
  onExploreShape,
}) => {
  const [selected, setSelected] = useState<ShapeInfo>(SHAPES_DATA[0]);

  const handleSelectShape = (shape: ShapeInfo) => {
    soundEngine.playPop();
    setSelected(shape);
    if (!exploredShapes.includes(shape.id)) {
      onExploreShape(shape.id);
      if (exploredShapes.length + 1 === SHAPES_DATA.length) {
        soundEngine.playFanfare();
        triggerConfetti(70);
      }
    }
  };

  return (
    <PageShell
      menuNumber="03"
      title="Ayo Belajar Bangun Datar"
      subtitle="Klik kartu 3D untuk melihat sisi, sudut, dan animasi berputar"
      onBackHome={onBackHome}
      rightSlot={
        <div className="text-sm font-bold text-slate-700 bg-amber-100 px-3.5 py-1.5 rounded-xl border border-amber-300 tabular-nums">
          Dipelajari: {exploredShapes.length} / {SHAPES_DATA.length}
        </div>
      }
    >
      {/* 6 Glossy 3D Shape Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-7">
        {SHAPES_DATA.map((shape) => {
          const isActive = selected.id === shape.id;
          const isVisited = exploredShapes.includes(shape.id);
          return (
            <button
              key={shape.id}
              type="button"
              onClick={() => handleSelectShape(shape)}
              className={`btn-3d group relative flex flex-col items-center p-3.5 rounded-2xl border-2 border-b-[5px] transition-all cursor-pointer ${
                isActive
                  ? `bg-gradient-to-b ${shape.gradientClass} text-white ${shape.borderBottomClass} shadow-xl -translate-y-1`
                  : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-200 border-b-slate-300 shadow-md'
              }`}
            >
              {isVisited && (
                <span
                  className={`absolute top-2 right-2 ${
                    isActive ? 'text-white' : 'text-emerald-600'
                  }`}
                  title="Sudah dipelajari"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}
              <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <ShapeDiagram shapeId={shape.id} size={74} />
              </div>
              <span className="mt-1.5 font-display font-extrabold text-sm sm:text-base text-center leading-tight">
                {shape.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive 3D Shape Detail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Spinning 3D Stage */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Interactive3DShapeCanvas
            shapeId={selected.id}
            colorHex={selected.colorHex}
            showVertices={true}
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 text-center">
              <div className="text-xs font-bold text-amber-700">Jumlah Sisi</div>
              <div className="text-3xl font-display font-black text-amber-900 tabular-nums mt-0.5">
                {selected.sides}
              </div>
              <div className="text-xs text-amber-800 font-semibold">
                {selected.sides === 1 ? 'Sisi lengkung' : 'Sisi lurus'}
              </div>
            </div>
            <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200 text-center">
              <div className="text-xs font-bold text-sky-700">Jumlah Sudut</div>
              <div className="text-3xl font-display font-black text-sky-900 tabular-nums mt-0.5">
                {selected.corners}
              </div>
              <div className="text-xs text-sky-800 font-semibold">
                {selected.corners === 0 ? 'Tidak ada titik sudut' : 'Titik sudut'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Characteristics & Real-World Examples */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5 bg-slate-50 rounded-2xl p-6 border-2 border-slate-200">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-bold text-slate-500">{selected.nickname}</span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                  {selected.name}
                </h3>
              </div>
              <GlossyButton
                variant="amber"
                size="sm"
                onClick={() =>
                  speakIndonesian(
                    `${selected.name}. ${selected.description} ${selected.kikoTip}`
                  )
                }
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Kiko</span>
              </GlossyButton>
            </div>

            <p className="text-slate-700 text-base leading-relaxed mb-4">
              {selected.description}
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-display font-extrabold text-slate-900 mb-2">
                Ciri-ciri {selected.name}:
              </h4>
              <ul className="space-y-1.5">
                {selected.ciriCiri.map((ciri, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-slate-700 text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{ciri}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display font-extrabold text-slate-900 mb-2">
                Contoh Benda Nyata:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selected.examples.map((ex) => (
                  <div
                    key={ex}
                    className="bg-white rounded-xl px-3 py-2.5 border border-slate-200 text-center text-sm font-bold text-slate-800 shadow-xs"
                  >
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-sky-100/80 rounded-xl p-3.5 border border-sky-200 text-sm text-sky-950 font-semibold">
            Tips Kiko: {selected.kikoTip}
          </div>
        </div>
      </div>
    </PageShell>
  );
};
