import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { RealObjectIllustration } from '../components/RealObjectIllustration';
import { REAL_OBJECTS, SHAPES_DATA, ShapeId } from '../data/geometryData';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu07GamePasangkanProps {
  onBackHome: () => void;
  onScoreUpdate: (score: number) => void;
}

const LEVELS = [
  {
    title: 'Level 1: Benda Sekolah & Rumah',
    items: [
      REAL_OBJECTS[0], // jam_dinding -> lingkaran
      REAL_OBJECTS[1], // papan_tulis -> persegi_panjang
      REAL_OBJECTS[2], // ubin_lantai -> persegi
      REAL_OBJECTS[3], // potongan_pizza -> segitiga
      REAL_OBJECTS[4], // telur_ayam -> oval
      REAL_OBJECTS[5], // atap_rumah -> trapesium
    ],
  },
  {
    title: 'Level 2: Tantangan Petualang',
    items: [
      REAL_OBJECTS[10], // papan_catur -> persegi
      REAL_OBJECTS[6],  // pintu_kelas -> persegi_panjang
      REAL_OBJECTS[7],  // rambu_jalan -> segitiga
      REAL_OBJECTS[11], // roda_sepeda -> lingkaran
      REAL_OBJECTS[8],  // cermin_oval -> oval
      REAL_OBJECTS[9],  // tas_trapesium -> trapesium
    ],
  },
];

export const Menu07GamePasangkan: React.FC<Menu07GamePasangkanProps> = ({
  onBackHome,
  onScoreUpdate,
}) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [selectedObjId, setSelectedObjId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const currentLevel = LEVELS[levelIdx];

  const shuffledShapes = useMemo(() => {
    const ids: ShapeId[] = ['persegi', 'persegi_panjang', 'segitiga', 'lingkaran', 'oval', 'trapesium'];
    const shift = levelIdx === 0 ? 2 : 4;
    const ordered = [...ids.slice(shift), ...ids.slice(0, shift)];
    return ordered.map((id) => SHAPES_DATA.find((s) => s.id === id)!);
  }, [levelIdx]);

  const handleSelectShape = (shapeId: ShapeId) => {
    if (!selectedObjId) return;
    const obj = currentLevel.items.find((o) => o.id === selectedObjId);
    if (!obj) return;

    if (obj.shapeId === shapeId) {
      const nextMatched = [...matchedIds, obj.id];
      setMatchedIds(nextMatched);
      setSelectedObjId(null);
      soundEngine.playCorrect();
      triggerConfetti(35);

      if (nextMatched.length === currentLevel.items.length) {
        if (levelIdx + 1 === LEVELS.length) {
          const finalScore = Math.max(60, 100 - mistakes * 5);
          onScoreUpdate(finalScore);
        }
      }
    } else {
      setMistakes((m) => m + 1);
      setWrongFlash(shapeId);
      soundEngine.playWrong();
      setTimeout(() => setWrongFlash(null), 500);
    }
  };

  const levelCleared = matchedIds.length === currentLevel.items.length;

  const handleNextLevel = () => {
    if (levelIdx + 1 < LEVELS.length) {
      setLevelIdx((l) => l + 1);
      setMatchedIds([]);
      setSelectedObjId(null);
    } else {
      setAllDone(true);
      soundEngine.playFanfare();
      triggerConfetti(90);
    }
  };

  const handleReset = () => {
    setLevelIdx(0);
    setMatchedIds([]);
    setSelectedObjId(null);
    setMistakes(0);
    setAllDone(false);
  };

  return (
    <PageShell
      menuNumber="07"
      title="Game 2: Pasangkan Benda"
      subtitle="Klik foto benda di kiri, lalu klik nama bangun datarnya di kanan!"
      onBackHome={onBackHome}
      rightSlot={
        <div className="flex items-center gap-2 text-sm font-bold tabular-nums">
          <span className="bg-pink-100 text-pink-900 px-3.5 py-1.5 rounded-xl border border-pink-300">
            {currentLevel.title}
          </span>
          <span className="bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl border border-emerald-300">
            Cocok: {matchedIds.length} / {currentLevel.items.length}
          </span>
        </div>
      }
    >
      {allDone ? (
        <div className="text-center py-8 max-w-lg mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-pink-100 border-4 border-pink-300 text-pink-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-display font-black text-slate-900 mb-2">
            Semua Pasangan Cocok!
          </h3>
          <p className="text-slate-600 text-lg mb-6">
            Hebat! Kamu berhasil memasangkan 12 benda nyata dengan nama bangun datarnya!
          </p>
          <GlossyButton variant="pink" size="lg" onClick={handleReset}>
            <RotateCcw className="w-5 h-5" />
            <span>Mainkan Lagi</span>
          </GlossyButton>
        </div>
      ) : (
        <div>
          <div className="mb-4 text-center text-sm font-bold text-slate-600">
            {selectedObjId
              ? `Sekarang pilih nama bangun datar untuk "${
                  currentLevel.items.find((i) => i.id === selectedObjId)?.name
                }" di sebelah kanan!`
              : 'Langkah 1: Klik salah satu kartu benda di sebelah kiri.'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Column: Real Objects */}
            <div className="grid grid-cols-2 gap-3.5">
              {currentLevel.items.map((item) => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedObjId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isMatched}
                    onClick={() => {
                      soundEngine.playPop();
                      setSelectedObjId(item.id);
                    }}
                    className={`btn-3d rounded-2xl p-3 border-2 border-b-[5px] flex flex-col items-center gap-1.5 cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 border-b-emerald-600 opacity-75 cursor-default'
                        : isSelected
                          ? 'bg-amber-50 border-amber-500 border-b-amber-700 ring-4 ring-amber-200'
                          : 'bg-white hover:bg-sky-50 border-slate-200 border-b-slate-300'
                    }`}
                  >
                    <RealObjectIllustration objectId={item.id} size={86} />
                    <span className="font-display font-extrabold text-sm text-slate-900">
                      {item.name}
                    </span>
                    {isMatched && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Cocok!</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Shape Names */}
            <div className="flex flex-col gap-3">
              {shuffledShapes.map((shape) => {
                const matchedObj = currentLevel.items.find(
                  (o) => o.shapeId === shape.id && matchedIds.includes(o.id)
                );
                const isWrong = wrongFlash === shape.id;

                return (
                  <button
                    key={shape.id}
                    type="button"
                    disabled={Boolean(matchedObj)}
                    onClick={() => handleSelectShape(shape.id)}
                    className={`btn-3d w-full rounded-2xl px-5 py-4 border-2 border-b-[5px] flex items-center justify-between gap-3 cursor-pointer ${
                      matchedObj
                        ? 'bg-emerald-100 border-emerald-400 border-b-emerald-600 text-emerald-950'
                        : isWrong
                          ? 'bg-rose-100 border-rose-500 border-b-rose-700 text-rose-950'
                          : selectedObjId
                            ? 'bg-sky-50 hover:bg-sky-100 border-sky-300 border-b-sky-500 text-slate-900'
                            : 'bg-white border-slate-200 border-b-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-md shrink-0"
                        style={{ backgroundColor: shape.colorHex }}
                      />
                      <span className="font-display font-black text-lg">{shape.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {matchedObj ? `Pasangan: ${matchedObj.name}` : `${shape.sides} sisi · ${shape.corners} sudut`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {levelCleared && (
            <div className="mt-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <strong className="font-display text-lg text-emerald-950">
                Hore! {currentLevel.title} Selesai!
              </strong>
              <GlossyButton variant="green" size="md" onClick={handleNextLevel}>
                <span>{levelIdx + 1 < LEVELS.length ? 'Lanjut Level 2' : 'Selesaikan Game'}</span>
                <ArrowRight className="w-4 h-4" />
              </GlossyButton>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
};
