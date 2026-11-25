import React, { useState } from 'react';
import { Lock, CheckCircle2, Play, Trophy, RotateCcw } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { RealObjectIllustration } from '../components/RealObjectIllustration';
import { ISLAND_QUESTS, IslandNode, SHAPES_DATA } from '../data/geometryData';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu14PetaPulauProps {
  onBackHome: () => void;
  unlockedIsland: number;
  completedIslands: number[];
  onCompleteIsland: (islandId: number) => void;
  onResetProgress: () => void;
}

export const Menu14PetaPulau: React.FC<Menu14PetaPulauProps> = ({
  onBackHome,
  unlockedIsland,
  completedIslands,
  onCompleteIsland,
  onResetProgress,
}) => {
  const [activeIsland, setActiveIsland] = useState<IslandNode | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [pickedOpt, setPickedOpt] = useState<string | null>(null);
  const [justCleared, setJustCleared] = useState(false);

  const openIsland = (island: IslandNode) => {
    if (island.id > unlockedIsland) {
      soundEngine.playWrong();
      return;
    }
    soundEngine.playPop();
    setActiveIsland(island);
    setStepIdx(0);
    setPickedOpt(null);
    setJustCleared(false);
  };

  const handleAnswer = (optId: string) => {
    if (!activeIsland || pickedOpt !== null) return;
    const challenge = activeIsland.challenges[stepIdx];
    setPickedOpt(optId);
    if (optId === challenge.correctId) {
      soundEngine.playCorrect();
      triggerConfetti(40);
    } else {
      soundEngine.playWrong();
    }
  };

  const handleContinue = () => {
    if (!activeIsland) return;
    const challenge = activeIsland.challenges[stepIdx];
    if (pickedOpt !== challenge.correctId) {
      // Allow retry if wrong
      setPickedOpt(null);
      return;
    }

    if (stepIdx + 1 < activeIsland.challenges.length) {
      setStepIdx((s) => s + 1);
      setPickedOpt(null);
    } else {
      onCompleteIsland(activeIsland.id);
      setJustCleared(true);
      soundEngine.playFanfare();
      triggerConfetti(90);
    }
  };

  return (
    <PageShell
      menuNumber="14"
      title="Peta Pulau Ajaib"
      subtitle="Selesaikan Pulau 1 terlebih dahulu untuk membuka Pulau 2 hingga Pulau 6!"
      onBackHome={onBackHome}
      rightSlot={
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-bold bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl border border-emerald-300 tabular-nums">
            Pulau Terbuka: {unlockedIsland} / 6
          </span>
          {completedIslands.length > 0 && (
            <GlossyButton variant="white" size="sm" onClick={onResetProgress}>
              <RotateCcw className="w-4 h-4" />
              <span>Reset Peta</span>
            </GlossyButton>
          )}
        </div>
      }
    >
      {/* Active Island Quest Modal / Stage */}
      {activeIsland ? (
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-sky-50 to-emerald-50 rounded-3xl p-6 border-2 border-sky-300">
          {justCleared ? (
            <div className="text-center py-5">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 border-4 border-amber-300 text-amber-500 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-11 h-11" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-1">
                {activeIsland.islandName} Selesai!
              </h3>
              <p className="text-slate-700 mb-4">
                Kamu mendapat lencana <strong>{activeIsland.badgeName}</strong>!
                {activeIsland.id < 6
                  ? ` Pulau ${activeIsland.id + 1} sekarang sudah terbuka!`
                  : ' Selamat! Semua 6 Pulau Ajaib berhasil kamu taklukkan!'}
              </p>
              <GlossyButton
                variant="green"
                size="lg"
                onClick={() => setActiveIsland(null)}
              >
                <span>Kembali ke Peta 6 Pulau</span>
              </GlossyButton>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-extrabold text-sky-700">
                    Tantangan {stepIdx + 1} / {activeIsland.challenges.length}
                  </span>
                  <h3 className="text-xl font-display font-black text-slate-900">
                    {activeIsland.islandName}
                  </h3>
                </div>
                <GlossyButton
                  variant="white"
                  size="sm"
                  onClick={() => setActiveIsland(null)}
                >
                  <span>Tutup</span>
                </GlossyButton>
              </div>

              {(() => {
                const ch = activeIsland.challenges[stepIdx];
                const isCorrect = pickedOpt === ch.correctId;

                return (
                  <div>
                    <div className="bg-white rounded-2xl p-5 border border-sky-200 flex flex-col sm:flex-row items-center gap-4 mb-5">
                      {ch.objectId ? (
                        <RealObjectIllustration objectId={ch.objectId} size={110} />
                      ) : (
                        <ShapeDiagram shapeId={activeIsland.shapeId} size={96} showVertices />
                      )}
                      <p className="font-display font-extrabold text-lg sm:text-xl text-slate-900 text-center sm:text-left">
                        {ch.question}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {ch.options.map((opt) => {
                        const chosen = pickedOpt === opt.id;
                        const right = opt.id === ch.correctId;
                        let style =
                          'bg-white hover:bg-sky-50 border-slate-200 border-b-slate-300 text-slate-900';
                        if (pickedOpt !== null) {
                          if (chosen && right) {
                            style = 'bg-emerald-100 border-emerald-500 border-b-emerald-700 text-emerald-950';
                          } else if (chosen && !right) {
                            style = 'bg-rose-100 border-rose-500 border-b-rose-700 text-rose-950';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={pickedOpt !== null}
                            onClick={() => handleAnswer(opt.id)}
                            className={`btn-3d rounded-2xl p-3.5 border-2 border-b-[5px] flex flex-col items-center gap-2 cursor-pointer ${style}`}
                          >
                            {opt.shapeId && <ShapeDiagram shapeId={opt.shapeId} size={60} />}
                            <span className="font-display font-extrabold text-sm sm:text-base text-center">
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {pickedOpt !== null && (
                      <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`font-bold text-sm sm:text-base ${
                            isCorrect ? 'text-emerald-800' : 'text-rose-800'
                          }`}
                        >
                          {isCorrect
                            ? ch.successNote
                            : 'Belum tepat nih! Yuk coba pilih jawaban lain.'}
                        </span>
                        <GlossyButton
                          variant={isCorrect ? 'green' : 'amber'}
                          size="sm"
                          onClick={handleContinue}
                        >
                          <span>
                            {isCorrect
                              ? stepIdx + 1 < activeIsland.challenges.length
                                ? 'Tantangan Berikutnya'
                                : 'Klaim Lencana Pulau!'
                              : 'Coba Lagi'}
                          </span>
                        </GlossyButton>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Winding 6-Island Adventure Map */}
          <div className="relative bg-gradient-to-b from-sky-100 via-cyan-50 to-emerald-100 rounded-3xl p-5 sm:p-8 border-2 border-sky-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ISLAND_QUESTS.map((island) => {
                const isCompleted = completedIslands.includes(island.id);
                const isUnlocked = island.id <= unlockedIsland;
                const shape = SHAPES_DATA.find((s) => s.id === island.shapeId)!;

                return (
                  <button
                    key={island.id}
                    type="button"
                    onClick={() => openIsland(island)}
                    className={`btn-3d relative rounded-3xl p-5 border-2 border-b-[6px] text-left flex flex-col justify-between gap-3 transition-all ${
                      isCompleted
                        ? 'bg-emerald-50 border-emerald-400 border-b-emerald-600 cursor-pointer shadow-md'
                        : isUnlocked
                          ? 'bg-white hover:bg-amber-50 border-amber-400 border-b-amber-600 cursor-pointer shadow-lg'
                          : 'bg-slate-200/80 border-slate-300 border-b-slate-400 text-slate-500 cursor-not-allowed opacity-85'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-extrabold text-slate-500">
                          {island.subtitle}
                        </span>
                        <h4 className="font-display font-black text-lg text-slate-900 leading-snug">
                          {island.islandName}
                        </h4>
                      </div>
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                      ) : !isUnlocked ? (
                        <Lock className="w-6 h-6 text-slate-500 shrink-0" />
                      ) : (
                        <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                          <Play className="w-4 h-4 fill-current" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div className={isUnlocked ? '' : 'grayscale opacity-60'}>
                        <ShapeDiagram shapeId={island.shapeId} size={64} />
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xs font-extrabold"
                          style={{ color: isUnlocked ? shape.colorHex : '#64748b' }}
                        >
                          {isCompleted
                            ? `Lencana: ${island.badgeName}`
                            : isUnlocked
                              ? 'Siap Dijelajahi!'
                              : `Selesaikan Pulau ${island.id - 1} dahulu`}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};
