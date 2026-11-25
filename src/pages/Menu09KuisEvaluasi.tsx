import React, { useState } from 'react';
import { Award, RotateCcw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { RealObjectIllustration } from '../components/RealObjectIllustration';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { MenuId, QUIZ_QUESTIONS } from '../data/geometryData';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface Menu09KuisEvaluasiProps {
  onBackHome: () => void;
  onQuizComplete: (score: number) => void;
  onNavigate: (menu: MenuId) => void;
}

export function getPredikat(score: number): { label: string; colorClass: string } {
  if (score >= 85) return { label: 'Sangat Baik', colorClass: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
  if (score >= 70) return { label: 'Baik', colorClass: 'text-sky-700 bg-sky-100 border-sky-300' };
  if (score >= 55) return { label: 'Cukup', colorClass: 'text-amber-700 bg-amber-100 border-amber-300' };
  return { label: 'Perlu Bimbingan', colorClass: 'text-rose-700 bg-rose-100 border-rose-300' };
}

export const Menu09KuisEvaluasi: React.FC<Menu09KuisEvaluasiProps> = ({
  onBackHome,
  onQuizComplete,
  onNavigate,
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[qIndex];
  const progressPct = Math.round(((qIndex + (finished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);

  const handleChoose = (optId: string) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optId);
    const isCorrect = optId === q.correctOptionId;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      soundEngine.playCorrect();
      triggerConfetti(40);
    } else {
      soundEngine.playWrong();
    }
  };

  const handleNext = () => {
    if (qIndex + 1 < QUIZ_QUESTIONS.length) {
      setQIndex((i) => i + 1);
      setSelectedOpt(null);
    } else {
      const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      setFinished(true);
      onQuizComplete(finalScore);
      soundEngine.playFanfare();
      triggerConfetti(100);
    }
  };

  const handleRetry = () => {
    setQIndex(0);
    setSelectedOpt(null);
    setCorrectCount(0);
    setFinished(false);
  };

  const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const predikat = getPredikat(finalScore);

  return (
    <PageShell
      menuNumber="09"
      title="Kuis Evaluasi (10 Soal)"
      subtitle="Pilih gambar atau jawaban yang paling tepat!"
      onBackHome={onBackHome}
      rightSlot={
        <div className="text-sm font-bold bg-indigo-100 text-indigo-900 px-3.5 py-1.5 rounded-xl border border-indigo-300 tabular-nums">
          Soal {Math.min(qIndex + 1, QUIZ_QUESTIONS.length)} / {QUIZ_QUESTIONS.length}
        </div>
      }
    >
      {/* Progress Bar */}
      <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 mb-6">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {finished ? (
        <div className="text-center py-6 max-w-xl mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-amber-100 border-4 border-amber-300 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <Award className="w-14 h-14" />
          </div>
          <h3 className="text-3xl font-display font-black text-slate-900 mb-2">
            Hasil Kuis Evaluasimu
          </h3>
          <div className="my-5 bg-slate-50 rounded-3xl p-6 border-2 border-slate-200">
            <div className="text-sm font-bold text-slate-500">Nilai Akhir</div>
            <div className="text-6xl font-display font-black text-indigo-700 tabular-nums my-1">
              {finalScore}
            </div>
            <div className="text-sm font-bold text-slate-600 mb-4">
              Benar {correctCount} dari {QUIZ_QUESTIONS.length} soal
            </div>
            <div
              className={`inline-block px-5 py-2 rounded-xl border-2 font-display font-black text-xl ${predikat.colorClass}`}
            >
              Predikat: {predikat.label}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <GlossyButton variant="blue" size="lg" onClick={handleRetry}>
              <RotateCcw className="w-5 h-5" />
              <span>Ulangi Kuis</span>
            </GlossyButton>
            <GlossyButton variant="amber" size="lg" onClick={() => onNavigate('10')}>
              <span>Lihat & Cetak Piagam</span>
              <ArrowRight className="w-5 h-5" />
            </GlossyButton>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-indigo-50/70 rounded-2xl p-5 border-2 border-indigo-200 mb-6">
            {q.promptObjectId && (
              <div className="bg-white rounded-2xl p-3 border border-indigo-200 shadow-sm shrink-0">
                <RealObjectIllustration objectId={q.promptObjectId} size={115} />
              </div>
            )}
            <div>
              <div className="text-xs font-extrabold text-indigo-700 mb-1">
                Pertanyaan {q.id}
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-snug">
                {q.question}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {q.options.map((opt) => {
              const isSelected = selectedOpt === opt.id;
              const isCorrect = opt.id === q.correctOptionId;

              let cardStyle =
                'bg-white hover:bg-sky-50 border-slate-200 border-b-slate-300 text-slate-900';
              if (selectedOpt !== null) {
                if (isCorrect) {
                  cardStyle =
                    'bg-emerald-50 border-emerald-500 border-b-emerald-700 text-emerald-950';
                } else if (isSelected && !isCorrect) {
                  cardStyle =
                    'bg-rose-50 border-rose-500 border-b-rose-700 text-rose-950';
                } else {
                  cardStyle = 'bg-slate-50 border-slate-200 border-b-slate-300 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={selectedOpt !== null}
                  onClick={() => handleChoose(opt.id)}
                  className={`btn-3d rounded-2xl p-4 border-2 border-b-[5px] flex items-center gap-4 text-left cursor-pointer ${cardStyle}`}
                >
                  <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-200 shrink-0">
                    {opt.shapeVisual && <ShapeDiagram shapeId={opt.shapeVisual} size={72} />}
                    {opt.objectVisual && (
                      <RealObjectIllustration objectId={opt.objectVisual} size={72} />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Pilihan {opt.id}
                    </span>
                    <div className="font-display font-extrabold text-lg">{opt.label}</div>
                  </div>
                  {selectedOpt !== null && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {selectedOpt !== null && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <strong className="font-display text-base block text-slate-900">
                  {selectedOpt === q.correctOptionId ? 'Jawaban Benar!' : 'Belum Tepat!'}
                </strong>
                <p className="text-sm text-slate-700">{q.explanation}</p>
              </div>
              <GlossyButton variant="green" size="md" onClick={handleNext}>
                <span>
                  {qIndex + 1 < QUIZ_QUESTIONS.length ? 'Soal Berikutnya' : 'Lihat Nilai Akhir'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </GlossyButton>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
};
