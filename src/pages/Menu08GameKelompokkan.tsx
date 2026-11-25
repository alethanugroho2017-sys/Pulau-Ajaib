import React, { useState } from 'react';
import { ShoppingBasket, RotateCcw, Sparkles, Check } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { RealObjectIllustration } from '../components/RealObjectIllustration';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { SHAPES_DATA, SORT_12_OBJECTS, ShapeId } from '../data/geometryData';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu08GameKelompokkanProps {
  onBackHome: () => void;
  onScoreUpdate: (score: number) => void;
}

export const Menu08GameKelompokkan: React.FC<Menu08GameKelompokkanProps> = ({
  onBackHome,
  onScoreUpdate,
}) => {
  const [sortedMap, setSortedMap] = useState<Record<string, ShapeId>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);

  const remainingItems = SORT_12_OBJECTS.filter((item) => !sortedMap[item.id]);
  const sortedCount = Object.keys(sortedMap).length;
  const allSorted = sortedCount === SORT_12_OBJECTS.length;

  const placeItemInBasket = (itemId: string, basketShapeId: ShapeId) => {
    const item = SORT_12_OBJECTS.find((i) => i.id === itemId);
    if (!item || sortedMap[item.id]) return;

    const targetShape = SHAPES_DATA.find((s) => s.id === basketShapeId)!;

    if (item.shapeId === basketShapeId) {
      const next = { ...sortedMap, [item.id]: basketShapeId };
      setSortedMap(next);
      setSelectedItemId(null);
      setDraggedId(null);
      soundEngine.playCorrect();
      triggerConfetti(35);
      setFeedback({
        text: `Benar! ${item.name} masuk ke keranjang ${targetShape.name}!`,
        ok: true,
      });

      if (Object.keys(next).length === SORT_12_OBJECTS.length) {
        soundEngine.playFanfare();
        triggerConfetti(100);
        onScoreUpdate(100);
      }
    } else {
      soundEngine.playWrong();
      setFeedback({
        text: `Ups, ${item.name} bukan berbentuk ${targetShape.name}. Coba cek ciri-cirinya lagi ya!`,
        ok: false,
      });
    }
  };

  const handleReset = () => {
    setSortedMap({});
    setSelectedItemId(null);
    setDraggedId(null);
    setFeedback(null);
  };

  return (
    <PageShell
      menuNumber="08"
      title="Game 3: Kelompokkan Benda"
      subtitle="Masukkan 12 benda ke keranjang bangun datar yang tepat (tarik atau klik!)"
      onBackHome={onBackHome}
      rightSlot={
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-bold bg-sky-100 text-sky-900 px-3.5 py-1.5 rounded-xl border border-sky-300 tabular-nums">
            Terkelompok: {sortedCount} / {SORT_12_OBJECTS.length}
          </span>
          {sortedCount > 0 && (
            <GlossyButton variant="white" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi</span>
            </GlossyButton>
          )}
        </div>
      }
    >
      {feedback && (
        <div
          className={`mb-5 rounded-2xl px-4 py-3 border-2 font-bold text-sm sm:text-base flex items-center gap-2 ${
            feedback.ok
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <span>{feedback.text}</span>
        </div>
      )}

      {allSorted ? (
        <div className="text-center py-8 bg-gradient-to-b from-emerald-50 to-sky-50 rounded-3xl border-2 border-emerald-300 mb-6">
          <Sparkles className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-3xl font-display font-black text-slate-900 mb-2">
            Luar Biasa! 12 Benda Masuk Keranjang yang Tepat!
          </h3>
          <p className="text-slate-600 mb-5">
            Kamu sudah sangat paham membedakan 6 bentuk bangun datar di dunia nyata!
          </p>
          <GlossyButton variant="green" size="lg" onClick={handleReset}>
            <RotateCcw className="w-5 h-5" />
            <span>Main Lagi</span>
          </GlossyButton>
        </div>
      ) : (
        <div className="mb-7">
          <div className="text-sm font-bold text-slate-600 mb-3">
            {selectedItemId
              ? `Benda dipilih: "${
                  SORT_12_OBJECTS.find((i) => i.id === selectedItemId)?.name
                }" — Sekarang klik keranjang bentuk di bawah!`
              : 'Seret gambar benda ke keranjang di bawah, atau klik benda lalu klik keranjangnya:'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {remainingItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={() => setDraggedId(item.id)}
                  onDragEnd={() => setDraggedId(null)}
                  onClick={() => {
                    soundEngine.playPop();
                    setSelectedItemId(isSelected ? null : item.id);
                  }}
                  className={`btn-3d rounded-2xl p-2.5 border-2 border-b-4 flex flex-col items-center cursor-grab active:cursor-grabbing ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 ring-4 ring-amber-200'
                      : 'bg-white hover:bg-sky-50 border-slate-200'
                  }`}
                >
                  <RealObjectIllustration objectId={item.id} size={74} />
                  <span className="font-display font-bold text-xs text-slate-900 mt-1 text-center leading-tight">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6 Shape Baskets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SHAPES_DATA.map((shape) => {
          const itemsInBasket = SORT_12_OBJECTS.filter(
            (i) => sortedMap[i.id] === shape.id
          );

          return (
            <div
              key={shape.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedId) {
                  placeItemInBasket(draggedId, shape.id);
                }
              }}
              onClick={() => {
                if (selectedItemId) {
                  placeItemInBasket(selectedItemId, shape.id);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && selectedItemId) {
                  placeItemInBasket(selectedItemId, shape.id);
                }
              }}
              className={`rounded-3xl p-4 border-2 border-b-[6px] transition-all cursor-pointer ${
                selectedItemId
                  ? 'bg-sky-50/90 border-sky-400 border-b-sky-600 hover:bg-sky-100'
                  : 'bg-slate-50 border-slate-300 border-b-slate-400'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <ShapeDiagram shapeId={shape.id} size={46} />
                  <div>
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <ShoppingBasket className="w-3.5 h-3.5" />
                      <span>Keranjang</span>
                    </div>
                    <h4 className="font-display font-black text-base text-slate-900">
                      {shape.name}
                    </h4>
                  </div>
                </div>
                <span className="text-xs font-extrabold bg-white px-2.5 py-1 rounded-lg border border-slate-200 tabular-nums">
                  {itemsInBasket.length} / 2
                </span>
              </div>

              <div className="min-h-[78px] bg-white rounded-2xl p-2.5 border border-dashed border-slate-300 flex flex-wrap items-center justify-center gap-2">
                {itemsInBasket.length === 0 ? (
                  <span className="text-xs font-semibold text-slate-400">
                    Taruh benda {shape.name} di sini
                  </span>
                ) : (
                  itemsInBasket.map((placed) => (
                    <div
                      key={placed.id}
                      className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-xl px-2 py-1"
                    >
                      <RealObjectIllustration objectId={placed.id} size={36} />
                      <span className="text-xs font-bold text-emerald-900">
                        {placed.name}
                      </span>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
};
