import React, { useState } from 'react';
import { Youtube, HardDrive, Play, Check, Sparkles } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { SHAPES_DATA } from '../data/geometryData';
import { ShapeDiagram } from '../components/ShapeDiagram';
import { soundEngine, speakIndonesian } from '../utils/audio';

interface Menu05VideoProps {
  onBackHome: () => void;
}

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=EB2rOeSnheY';

export const Menu05Video: React.FC<Menu05VideoProps> = ({ onBackHome }) => {
  const [driveUrl, setDriveUrl] = useState<string>(() => {
    return localStorage.getItem('pulau_ajaib_drive_url') || '';
  });
  const [driveSaved, setDriveSaved] = useState(false);
  const [showMiniLesson, setShowMiniLesson] = useState(false);

  const handleSaveDrive = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = driveUrl.trim();
    localStorage.setItem('pulau_ajaib_drive_url', trimmed);
    setDriveSaved(true);
    soundEngine.playCorrect();
    setTimeout(() => setDriveSaved(false), 2000);
  };

  const validDriveUrl =
    driveUrl.trim().startsWith('http://') || driveUrl.trim().startsWith('https://')
      ? driveUrl.trim()
      : '';

  return (
    <PageShell
      menuNumber="05"
      title="Video Pembelajaran"
      subtitle="Tonton Video Seru Bangun Datar tanpa error iframe"
      onBackHome={onBackHome}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
        {/* Left: Crisp Video Preview Poster (No broken iframe!) */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden border-4 border-sky-200 shadow-xl bg-sky-100">
            <img
              src="/src/assets/images/video_geometri_cover_1795627984352.jpg"
              alt="Video Pembelajaran Bangun Datar Pulau Ajaib"
              referrerPolicy="no-referrer"
              className="w-full aspect-video object-cover"
            />
            <div className="bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-display font-black text-white">
                Petualangan Mengenal 6 Bangun Datar
              </h3>
              <p className="text-sky-100 text-sm sm:text-base mt-1">
                Klik tombol Merah untuk menonton di YouTube atau tombol Biru untuk menonton di Google Drive.
              </p>
            </div>
          </div>
        </div>

        {/* Right: 2 Glossy 3D Action Buttons (Red YouTube & Blue Drive) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200">
            <h4 className="font-display font-extrabold text-lg text-slate-900 mb-3">
              Pilih Sumber Video:
            </h4>

            <div className="flex flex-col gap-3.5">
              {/* Red 3D Button: Tonton di YouTube */}
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playPop()}
                className="btn-3d w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-display font-extrabold text-lg text-white bg-gradient-to-b from-rose-500 to-red-600 border-b-[6px] border-red-800 shadow-lg shadow-red-900/25"
              >
                <Youtube className="w-7 h-7 shrink-0" />
                <span>Tonton di YouTube</span>
              </a>

              {/* Blue 3D Button: Tonton di Drive */}
              {validDriveUrl ? (
                <a
                  href={validDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playPop()}
                  className="btn-3d w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-display font-extrabold text-lg text-white bg-gradient-to-b from-sky-400 to-blue-600 border-b-[6px] border-blue-800 shadow-lg shadow-blue-900/25"
                >
                  <HardDrive className="w-7 h-7 shrink-0" />
                  <span>Tonton di Drive</span>
                </a>
              ) : (
                <GlossyButton
                  variant="blue"
                  size="lg"
                  className="w-full py-4"
                  onClick={() => {
                    setShowMiniLesson((v) => !v);
                    speakIndonesian(
                      'Ayo simak ringkasan enam bangun datar bersama Kiko sambil menunggu tautan Google Drive dari Ibu atau Bapak Guru!'
                    );
                  }}
                >
                  <HardDrive className="w-7 h-7 shrink-0" />
                  <span>Tonton di Drive</span>
                </GlossyButton>
              )}
            </div>
          </div>

          {/* Optional Teacher Google Drive Link Input */}
          <form
            onSubmit={handleSaveDrive}
            className="bg-sky-50 rounded-2xl p-4 border border-sky-200"
          >
            <label
              htmlFor="drive-url-input"
              className="block text-xs font-bold text-sky-900 mb-1.5"
            >
              Tautan Google Drive (Opsional untuk Guru):
            </label>
            <div className="flex gap-2">
              <input
                id="drive-url-input"
                type="url"
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="flex-1 min-w-0 bg-white border border-sky-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <GlossyButton type="submit" variant="teal" size="sm">
                {driveSaved ? <Check className="w-4 h-4" /> : <span>Simpan</span>}
              </GlossyButton>
            </div>
            <p className="text-xs text-slate-600 mt-1.5">
              {validDriveUrl
                ? 'Tombol Biru siap membuka video Google Drive di tab baru.'
                : 'Jika belum diisi, tombol Biru menampilkan Ringkasan Animasi Interaktif di bawah.'}
            </p>
          </form>
        </div>
      </div>

      {/* Built-in Interactive Summary Lesson when Drive link isn't set or toggled */}
      {(showMiniLesson || !validDriveUrl) && (
        <div className="mt-7 bg-gradient-to-r from-amber-50 to-sky-50 rounded-2xl p-5 border-2 border-amber-200">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <Play className="w-5 h-5 text-sky-600 fill-sky-600" />
              <h4 className="font-display font-extrabold text-lg text-slate-900">
                Ringkasan Visual Cepat 6 Bangun Datar
              </h4>
            </div>
            <span className="text-xs font-bold text-amber-800 inline-flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>Klik kartu untuk mendengarkan penjelasan!</span>
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SHAPES_DATA.map((shape) => (
              <button
                key={shape.id}
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  speakIndonesian(`${shape.name}. ${shape.description}`);
                }}
                className="btn-3d bg-white rounded-2xl p-3 border border-slate-200 border-b-4 flex flex-col items-center text-center cursor-pointer hover:bg-sky-50"
              >
                <ShapeDiagram shapeId={shape.id} size={64} />
                <span className="font-display font-bold text-sm text-slate-900 mt-1">
                  {shape.name}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {shape.sides} sisi · {shape.corners} sudut
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
};
