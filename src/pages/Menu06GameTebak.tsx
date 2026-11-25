import React, { useMemo, useState } from 'react';
import { Trophy, RotateCcw, Star, ArrowRight } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { RealObjectIllustration } from '../components/RealObjectIllustration';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { REAL_OBJECTS, SHAPES_DATA, ShapeId } from '../data/geometryData';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu06GameTebakProps {
  onBackHome: () => void;
  onScoreUpdate: (score: number) => void;
}

const ROUND_OBJECTS = [
  REAL_OBJECTS[0],  // jam_dinding (lingkaran)
  REAL_OBJECTS[1],  // papan_tulis (persegi_panjang)
  REAL_OBJECTS[2],  // ubin_lantai (persegi)
  REAL_OBJECTS[3],  // potongan_pizza (segitiga)
  REAL_OBJECTS[4],  // telur_ayam (oval)
  REAL_OBJECTS[5],  // atap_rumah (trapesium)
  REAL_OBJECTS[7],  // rambu_jalan (segitiga)
  REAL_OBJECTS[10], // papan_catur (persegi)
];

export const Menu06GameTebak: React.FC<Menu06GameTebakProps> = ({
  onBackHome,
  onScoreUpdate,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [pickedId, setPickedId] = useState<ShapeId | null>(null);
  const [finished, setFinished] = useState(false);

  const currentItem = ROUND_OBJECTS[roundIdx];

  const options = useMemo(() => {
    const correct = SHAPES_DATA.find((s) => s.id === currentItem.shapeId)!;
    const others = SHAPES_DATA.filter((s) => s.id !== currentItem.shapeId);
    // Deterministic shuffle per round so options stay stable during render
    const rotated = [
      ...others.slice(roundIdx % others.length),
      ...others.slice(0, roundIdx % others.length),
    ].slice(0, 3);
    const combined = [correct, ...rotated];
    // Deterministic position shift
    const shift = (roundIdx * 2) % combined.length;
    return [...combined.slice(shift), ...combined.slice(0, shift)];
  }, [currentItem.shapeId, roundIdx]);

  const handleGuess = (shapeId: ShapeId) => {
    if (pickedId !== null) return;
    setPickedId(shapeId);
    if (shapeId === currentItem.shapeId) {
      const nextScore = score + 100;
      setScore(nextScore);
      setStreak((s) => s + 1);
      soundEngine.playCorrect();
      triggerConfetti(45);
      if (roundIdx + 1 === ROUND_OBJECTS.length) {
        onScoreUpdate(Math.round((nextScore / (ROUND_OBJECTS.length * 100)) * 100));
      }
    } else {
      setStreak(0);
      soundEngine.playWrong();
      if (roundIdx + 1 === ROUND_OBJECTS.length) {
        onScoreUpdate(Math.round((score / (ROUND_OBJECTS.length * 100)) * 100));
      }
    }
  };

  const handleNext = () => {
    if (roundIdx + 1 < ROUND_OBJECTS.length) {
      setRoundIdx((r) => r + 1);
      setPickedId(null);
    } else {
      setFinished(true);
      soundEngine.playFanfare();
      triggerConfetti(85);
    }
  };

  const handleRestart = () => {
    setRoundIdx(0);
    setScore(0);
    setStreak(0);
    setPickedId(null);
    setFinished(false);
  };

  return (
    <PageShell
      menuNumber="06"
      title="Game 1: Tebak Bentuk"
      subtitle="Tebak bangun datar dari gambar benda asli di sekitar kita"
      onBackHome={onBackHome}
      rightSlot={
        <div className="flex items-center gap-3 text-sm font-bold tabular-nums">
          <span className="bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-xl border border-amber-300">
            Skor: {score}
          </span>
          <span className="bg-purple-100 text-purple-900 px-3.5 py-1.5 rounded-xl border border-purple-300">
            Ronde: {roundIdx + 1} / {ROUND_OBJECTS.length}
          </span>
        </div>
      }
    >
      {finished ? (
        <div className="text-center py-8 max-w-lg mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-amber-100 border-4 border-amber-300 text-amber-500 flex items-center justify-center mx-auto mb-4 shadow-md">
            <Trophy className="w-14 h-14" />
          </div>
          <h3 className="text-3xl font-display font-black text-slate-900 mb-2">
            Game 1 Selesai!
          </h3>
          <p className="text-slate-600 text-lg mb-4">
            Skor akhirmu adalah <strong className="text-purple-700">{score}</strong> dari{' '}
            {ROUND_OBJECTS.length * 100} poin!
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((st) => (
              <Star
                key={st}
                className={`w-10 h-10 ${
                  score >= st * 250
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <GlossyButton variant="purple" size="lg" onClick={handleRestart}>
            <RotateCcw className="w-5 h-5" />
            <span>Main Lagi</span>
          </GlossyButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          {/* Left: Real Object Card */}
          <div className="lg:col-span-5 flex flex-col items-center bg-gradient-to-b from-purple-50 to-sky-50 rounded-3xl p-6 border-2 border-purple-200">
            <span className="text-xs font-bold text-purple-700 mb-2">
              {currentItem.location} · Beruntun {streak}x
            </span>
            <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200 mb-3">
              <RealObjectIllustration objectId={currentItem.id} size={170} />
            </div>
            <h3 className="text-2xl font-display font-black text-slate-900">
              {currentItem.name}
            </h3>
            <p className="text-sm text-slate-600 text-center mt-1">
              Benda ini berbentuk bangun datar apa?
            </p>
          </div>

          {/* Right: 4 Shape Options */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {options.map((opt) => {
                const isPicked = pickedId === opt.id;
                const isCorrect = opt.id === currentItem.shapeId;
                let stateClass =
                  'bg-white hover:bg-sky-50 border-slate-200 border-b-slate-300 text-slate-900';

                if (pickedId !== null) {
                  if (isCorrect) {
                    stateClass =
                      'bg-emerald-50 border-emerald-500 border-b-emerald-700 text-emerald-950';
                  } else if (isPicked && !isCorrect) {
                    stateClass =
                      'bg-rose-50 border-rose-500 border-b-rose-700 text-rose-950';
                  } else {
                    stateClass = 'bg-slate-50 border-slate-200 border-b-slate-300 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={pickedId !== null}
                    onClick={() => handleGuess(opt.id)}
                    className={`btn-3d rounded-2xl p-4 border-2 border-b-[5px] flex flex-col items-center gap-2 cursor-pointer ${stateClass}`}
                  >
                    <ShapeDiagram shapeId={opt.id} size={82} />
                    <span className="font-display font-extrabold text-base sm:text-lg">
                      {opt.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {pickedId !== null && (
              <div
                className={`rounded-2xl p-4 border-2 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  pickedId === currentItem.shapeId
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div>
                  <strong className="font-display text-base block">
                    {pickedId === currentItem.shapeId
                      ? 'Benar Sekali! +100 Poin'
                      : `Hampir Tepat! Jawaban benar: ${
                          SHAPES_DATA.find((s) => s.id === currentItem.shapeId)?.name
                        }`}
                  </strong>
                  <span className="text-sm">{currentItem.clue}</span>
                </div>
                <GlossyButton variant="green" size="md" onClick={handleNext}>
                  <span>
                    {roundIdx + 1 < ROUND_OBJECTS.length ? 'Lanjut Ronde' : 'Lihat Skor'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </GlossyButton>
              </div>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
};
