import React, { useState } from 'react';
import { Eye, Sparkles, RotateCcw } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { RealObjectIllustration } from '../components/RealObjectIllustration';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { OBSERVE_10_OBJECTS, SHAPES_DATA } from '../data/geometryData';
import { soundEngine, speakIndonesian } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu04MengamatiBendaProps {
  onBackHome: () => void;
}

export const Menu04MengamatiBenda: React.FC<Menu04MengamatiBendaProps> = ({ onBackHome }) => {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const handleReveal = (itemId: string, name: string, shapeName: string) => {
    if (!revealedIds.includes(itemId)) {
      const next = [...revealedIds, itemId];
      setRevealedIds(next);
      soundEngine.playCorrect();
      speakIndonesian(`${name} berbentuk ${shapeName}!`);
      if (next.length === OBSERVE_10_OBJECTS.length) {
        soundEngine.playFanfare();
        triggerConfetti(90);
      }
    } else {
      soundEngine.playPop();
      speakIndonesian(`${name} berbentuk ${shapeName}.`);
    }
  };

  return (
    <PageShell
      menuNumber="04"
      title="Ayo Mengamati Benda"
      subtitle="Tantangan 10 benda nyata di lingkungan sekitar — klik gambar untuk ungkap bentuknya!"
      onBackHome={onBackHome}
      rightSlot={
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-rose-800 bg-rose-100 px-3.5 py-1.5 rounded-xl border border-rose-200 tabular-nums">
            Terungkap: {revealedIds.length} / {OBSERVE_10_OBJECTS.length}
          </span>
          {revealedIds.length > 0 && (
            <GlossyButton
              variant="white"
              size="sm"
              onClick={() => setRevealedIds([])}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tutup Semua</span>
            </GlossyButton>
          )}
        </div>
      }
    >
      {revealedIds.length === OBSERVE_10_OBJECTS.length && (
        <div className="mb-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-2xl p-4 flex items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 shrink-0" />
            <div>
              <strong className="font-display text-lg block">
                Hebat! Semua 10 Benda Sudah Kamu Amati!
              </strong>
              <span className="text-sm text-emerald-50">
                Sekarang kamu siap menaklukkan Game Tebak Bentuk dan Pasangkan Benda!
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {OBSERVE_10_OBJECTS.map((item, idx) => {
          const isRevealed = revealedIds.includes(item.id);
          const shape = SHAPES_DATA.find((s) => s.id === item.shapeId)!;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleReveal(item.id, item.name, shape.name)}
              className={`btn-3d relative text-left rounded-2xl p-4 border-2 border-b-[5px] transition-all cursor-pointer flex flex-col justify-between ${
                isRevealed
                  ? 'bg-emerald-50 border-emerald-400 border-b-emerald-600 shadow-md'
                  : 'bg-white hover:bg-sky-50 border-slate-200 border-b-slate-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Benda {idx + 1}</span>
                  <span>{item.location}</span>
                </div>

                <div className="relative flex items-center justify-center bg-slate-50 rounded-xl p-2 mb-3">
                  <RealObjectIllustration objectId={item.id} size={115} />
                  {isRevealed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 rounded-xl">
                      <ShapeDiagram shapeId={item.shapeId} size={96} showOutlineOnly />
                    </div>
                  )}
                </div>

                <h4 className="font-display font-extrabold text-slate-900 text-base text-center mb-1">
                  {item.name}
                </h4>
              </div>

              {isRevealed ? (
                <div className="mt-2 bg-white rounded-xl p-2.5 border border-emerald-200 text-center">
                  <div
                    className="font-display font-black text-base"
                    style={{ color: shape.colorHex }}
                  >
                    {shape.name}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">{item.clue}</p>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-100 rounded-xl py-2">
                  <Eye className="w-4 h-4" />
                  <span>Klik untuk Lihat Bentuk</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </PageShell>
  );
};
