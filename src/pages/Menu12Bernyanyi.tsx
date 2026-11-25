import React, { useEffect, useRef, useState } from 'react';
import { Music, Play, Square, Volume2 } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { SONG_LYRICS } from '../data/geometryData';
import { soundEngine, speakIndonesian } from '../utils/audio';

interface Menu12BernyanyiProps {
  onBackHome: () => void;
}

const LINE_MELODIES: number[][] = [
  [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25],
  [659.25, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33],
  [587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 587.33],
  [783.99, 880.0, 1046.5, 880.0, 783.99, 659.25],
  [659.25, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25],
  [587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33],
  [523.25, 659.25, 783.99, 1046.5, 880.0, 1046.5],
];

export const Menu12Bernyanyi: React.FC<Menu12BernyanyiProps> = ({ onBackHome }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState<number>(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const stopSong = () => {
    clearTimers();
    setIsPlaying(false);
  };

  const playSong = () => {
    clearTimers();
    setIsPlaying(true);

    let elapsed = 0;
    SONG_LYRICS.forEach((line, idx) => {
      const startTimer = window.setTimeout(() => {
        setActiveLineIdx(idx);
        const notes = LINE_MELODIES[idx] || LINE_MELODIES[0];
        const stepMs = Math.floor((line.durationMs - 400) / notes.length);
        notes.forEach((freq, nIdx) => {
          const noteTimer = window.setTimeout(() => {
            soundEngine.playNote(freq, 0.28);
          }, nIdx * stepMs);
          timersRef.current.push(noteTimer);
        });
      }, elapsed);
      timersRef.current.push(startTimer);
      elapsed += line.durationMs;
    });

    const endTimer = window.setTimeout(() => {
      setIsPlaying(false);
      soundEngine.playFanfare();
    }, elapsed + 300);
    timersRef.current.push(endTimer);
  };

  const currentLine = SONG_LYRICS[activeLineIdx];

  return (
    <PageShell
      menuNumber="12"
      title="Bernyanyi Lagu Bangun Datar"
      subtitle="Ayo nyanyi bersama Kiko dengan iringan musik ceria!"
      onBackHome={() => {
        stopSong();
        onBackHome();
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Music Player & Active Shape Stage */}
        <div className="lg:col-span-5 bg-gradient-to-b from-lime-50 to-emerald-50 rounded-3xl p-6 border-2 border-lime-300 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md mb-3">
            <Music className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-display font-black text-slate-900 mb-1">
            Lagu &ldquo;Pulau Bangun Datar&rdquo;
          </h3>
          <p className="text-sm text-slate-600 mb-5">
            Tekan tombol Putar Musik lalu ikuti lirik yang menyala!
          </p>

          <div className="bg-white rounded-2xl p-4 border border-emerald-200 w-full flex flex-col items-center justify-center min-h-[160px] mb-5">
            {currentLine.shapeHighlight ? (
              <>
                <ShapeDiagram shapeId={currentLine.shapeHighlight} size={104} showVertices />
                <span className="text-xs font-bold text-emerald-700 mt-1">
                  Bentuk yang dinyanyikan
                </span>
              </>
            ) : (
              <img
                src="/src/assets/images/kiko_explorer_portrait_1795627984374.jpg"
                alt="Kiko Bernyanyi"
                referrerPolicy="no-referrer"
                className="w-28 h-28 rounded-2xl object-cover"
              />
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full">
            {!isPlaying ? (
              <GlossyButton variant="green" size="lg" onClick={playSong} className="w-full">
                <Play className="w-5 h-5 fill-current" />
                <span>Putar Musik Lagu</span>
              </GlossyButton>
            ) : (
              <GlossyButton variant="red" size="lg" onClick={stopSong} className="w-full">
                <Square className="w-5 h-5 fill-current" />
                <span>Hentikan Lagu</span>
              </GlossyButton>
            )}

            <GlossyButton
              variant="amber"
              size="md"
              className="w-full"
              onClick={() =>
                speakIndonesian(SONG_LYRICS.map((l) => l.text).join(' '))
              }
            >
              <Volume2 className="w-4 h-4" />
              <span>Bacakan Semua Lirik</span>
            </GlossyButton>
          </div>
        </div>

        {/* Right: Karaoke Lyrics List */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {SONG_LYRICS.map((line, idx) => {
            const isCurrent = idx === activeLineIdx;
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => {
                  setActiveLineIdx(idx);
                  const notes = LINE_MELODIES[idx] || LINE_MELODIES[0];
                  soundEngine.playNote(notes[0], 0.3);
                }}
                className={`text-left rounded-2xl px-5 py-4 border-2 transition-all cursor-pointer flex items-center gap-4 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-100 to-lime-100 border-amber-400 shadow-md scale-[1.01]'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl font-display font-black text-sm flex items-center justify-center shrink-0 ${
                    isCurrent ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </span>
                <span
                  className={`font-display text-base sm:text-lg leading-snug ${
                    isCurrent ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-700'
                  }`}
                >
                  {line.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
};
