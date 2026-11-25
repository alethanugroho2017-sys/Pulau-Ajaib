import React, { useState } from 'react';
import { Printer, Download, Award, Smile, Meh, HelpCircle, Star } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { getPredikat } from './Menu09KuisEvaluasi';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

export type FeelingType = 'senang' | 'biasa' | 'bingung' | null;

interface Menu10HasilRefleksiProps {
  onBackHome: () => void;
  studentName: string;
  onChangeName: (name: string) => void;
  quizScore: number | null;
  game1Score: number | null;
  game2Score: number | null;
  game3Score: number | null;
  unlockedIsland: number;
  completedIslands: number[];
  feeling: FeelingType;
  onSelectFeeling: (f: FeelingType) => void;
}

export const Menu10HasilRefleksi: React.FC<Menu10HasilRefleksiProps> = ({
  onBackHome,
  studentName,
  onChangeName,
  quizScore,
  game1Score,
  game2Score,
  game3Score,
  completedIslands,
  feeling,
  onSelectFeeling,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const effectiveScore = quizScore ?? 0;
  const predikat = quizScore !== null ? getPredikat(quizScore) : null;

  const handlePrint = () => {
    soundEngine.playPop();
    window.print();
  };

  const handleDownloadCertificate = () => {
    soundEngine.playFanfare();
    triggerConfetti(70);

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cream parchment background
    ctx.fillStyle = '#fffdf5';
    ctx.fillRect(0, 0, 1200, 850);

    // Outer & inner decorative border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 20;
    ctx.strokeRect(28, 28, 1144, 794);
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 6;
    ctx.strokeRect(52, 52, 1096, 746);

    // Header
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 28px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MEDIA PEMBELAJARAN INTERAKTIF PULAU AJAIB · KELAS 2 SD', 600, 125);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 56px Outfit, sans-serif';
    ctx.fillText('PIAGAM PETUALANG', 600, 200);

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 34px Outfit, sans-serif';
    ctx.fillText('Bintang Bangun Datar', 600, 255);

    ctx.fillStyle = '#475569';
    ctx.font = '600 24px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Diberikan dengan bangga kepada:', 600, 330);

    ctx.fillStyle = '#1e293b';
    ctx.font = '900 50px Outfit, sans-serif';
    ctx.fillText(studentName.trim() || 'Petualang Hebat Kelas 2', 600, 405);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(280, 425);
    ctx.lineTo(920, 425);
    ctx.stroke();

    ctx.fillStyle = '#334155';
    ctx.font = '600 23px Plus Jakarta Sans, sans-serif';
    ctx.fillText(
      'Telah menjelajahi Geometri Bangun Datar bersama Kiko si Kucing Penjelajah',
      600,
      485
    );
    ctx.fillText(
      `Nilai Kuis Evaluasi: ${quizScore !== null ? quizScore : '-'} · Pulau Diselesaikan: ${completedIslands.length}/6`,
      600,
      530
    );

    // Gold seal
    ctx.beginPath();
    ctx.arc(600, 650, 58, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#b45309';
    ctx.stroke();

    ctx.fillStyle = '#78350f';
    ctx.font = '900 22px Outfit, sans-serif';
    ctx.fillText('JUARA', 600, 646);
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText('GEOMETRI', 600, 670);

    // Signatures
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 20px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Kiko si Kucing Penjelajah', 270, 720);
    ctx.fillText('Guru Kelas 2 SD', 930, 720);

    const link = document.createElement('a');
    link.download = `Piagam-Bintang-Bangun-Datar-${(studentName || 'Siswa').replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const feelings: {
    id: Exclude<FeelingType, null>;
    label: string;
    desc: string;
    reply: string;
    icon: React.ElementType;
    activeClass: string;
  }[] = [
    {
      id: 'senang',
      label: 'Senang',
      desc: 'Aku paham dan seru sekali!',
      reply: 'Meong! Kiko juga senang sekali melihatmu bersemangat belajar bangun datar!',
      icon: Smile,
      activeClass: 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-200',
    },
    {
      id: 'biasa',
      label: 'Biasa',
      desc: 'Lumayan, perlu latihan lagi.',
      reply: 'Bagus! Coba mainkan Game Tebak Bentuk atau Bernyanyi supaya makin seru ya!',
      icon: Meh,
      activeClass: 'bg-amber-100 border-amber-500 text-amber-950 ring-4 ring-amber-200',
    },
    {
      id: 'bingung',
      label: 'Bingung',
      desc: 'Aku masih ingin bertanya.',
      reply: 'Tidak apa-apa! Ayo buka Menu 03 untuk melihat kartu 3D lagi atau tanya Ibu/Bapak Guru.',
      icon: HelpCircle,
      activeClass: 'bg-sky-100 border-sky-500 text-sky-950 ring-4 ring-sky-200',
    },
  ];

  return (
    <PageShell
      menuNumber="10"
      title="Hasil dan Refleksi"
      subtitle="Lihat nilaimu, cetak Piagam Bintang Bangun Datar, dan pilih perasaanmu"
      onBackHome={onBackHome}
    >
      {/* Score Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-7">
        <div className="bg-indigo-50 rounded-2xl p-4 border-2 border-indigo-200 text-center">
          <div className="text-xs font-bold text-indigo-700">Kuis Evaluasi</div>
          <div className="text-3xl font-display font-black text-indigo-950 tabular-nums mt-1">
            {quizScore !== null ? quizScore : '-'}
          </div>
          <div className="text-xs font-bold text-indigo-600 mt-0.5">
            {predikat ? predikat.label : 'Belum dikerjakan'}
          </div>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 text-center">
          <div className="text-xs font-bold text-purple-700">Game 1: Tebak</div>
          <div className="text-3xl font-display font-black text-purple-950 tabular-nums mt-1">
            {game1Score !== null ? `${game1Score}%` : '-'}
          </div>
        </div>
        <div className="bg-pink-50 rounded-2xl p-4 border-2 border-pink-200 text-center">
          <div className="text-xs font-bold text-pink-700">Game 2: Pasangkan</div>
          <div className="text-3xl font-display font-black text-pink-950 tabular-nums mt-1">
            {game2Score !== null ? `${game2Score}%` : '-'}
          </div>
        </div>
        <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200 text-center">
          <div className="text-xs font-bold text-sky-700">Game 3: Keranjang</div>
          <div className="text-3xl font-display font-black text-sky-950 tabular-nums mt-1">
            {game3Score !== null ? `${game3Score}%` : '-'}
          </div>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200 text-center col-span-2 lg:col-span-1">
          <div className="text-xs font-bold text-emerald-700">Peta Pulau</div>
          <div className="text-3xl font-display font-black text-emerald-950 tabular-nums mt-1">
            {completedIslands.length}/6
          </div>
        </div>
      </div>

      {/* Certificate Name & Actions */}
      <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex-1">
            <label
              htmlFor="student-name-input"
              className="block text-sm font-display font-extrabold text-amber-950 mb-1.5"
            >
              Tulis Namamu untuk Piagam Petualang:
            </label>
            <input
              id="student-name-input"
              type="text"
              value={studentName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Contoh: Aisyah Putri Kelas 2A"
              className="w-full bg-white border-2 border-amber-300 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <GlossyButton variant="amber" size="md" onClick={handlePrint}>
              <Printer className="w-5 h-5" />
              <span>Cetak Piagam</span>
            </GlossyButton>
            <GlossyButton variant="blue" size="md" onClick={handleDownloadCertificate}>
              <Download className="w-5 h-5" />
              <span>{downloaded ? 'Piagam Diunduh!' : 'Unduh Gambar Piagam'}</span>
            </GlossyButton>
          </div>
        </div>
      </div>

      {/* Printable Piagam Preview */}
      <div
        id="piagam-cetak"
        className="relative bg-[#fffdf5] rounded-3xl p-6 sm:p-10 border-[8px] border-amber-400 shadow-xl mb-8 text-center"
      >
        <div className="border-2 border-sky-400 rounded-2xl p-5 sm:p-8">
          <div className="flex items-center justify-center gap-2 text-amber-700 font-display font-extrabold text-xs sm:text-sm mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>PULAU AJAIB · GEOMETRI BANGUN DATAR KELAS 2 SD</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
            PIAGAM PETUALANG
          </h3>
          <div className="text-xl sm:text-2xl font-display font-extrabold text-sky-700 mt-1 mb-4">
            &ldquo;Bintang Bangun Datar&rdquo;
          </div>
          <p className="text-sm text-slate-600">Diberikan dengan bangga kepada:</p>
          <div className="text-2xl sm:text-4xl font-display font-black text-slate-900 my-3 pb-2 border-b-2 border-slate-300 max-w-md mx-auto">
            {studentName.trim() || 'Petualang Hebat Kelas 2'}
          </div>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
            Telah berani menjelajahi 6 bentuk bangun datar bersama Kiko si Kucing Penjelajah dengan nilai kuis{' '}
            <strong className="tabular-nums">{quizScore !== null ? effectiveScore : '-'}</strong> dan menaklukkan{' '}
            <strong className="tabular-nums">{completedIslands.length}</strong> dari 6 Pulau Ajaib!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-around gap-6 pt-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/kiko_explorer_portrait_1795627984374.jpg"
                alt="Cap Kiko"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
              />
              <div className="text-left">
                <div className="font-display font-extrabold text-sm text-slate-900">
                  Kiko Penjelajah
                </div>
                <div className="text-xs text-slate-500">Maskot Pulau Ajaib</div>
              </div>
            </div>

            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-700 flex flex-col items-center justify-center text-amber-950 shadow-md">
              <Award className="w-7 h-7" />
              <span className="text-[10px] font-display font-black">BINTANG</span>
            </div>

            <div className="text-center">
              <div className="font-display font-extrabold text-sm text-slate-900">
                Guru Kelas 2 SD
              </div>
              <div className="text-xs text-slate-500">Pembimbing Belajar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection Section: Senang / Biasa / Bingung */}
      <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-200">
        <h3 className="text-xl font-display font-black text-slate-900 text-center mb-1">
          Bagaimana Perasaanmu Setelah Belajar Hari Ini?
        </h3>
        <p className="text-sm text-slate-600 text-center mb-5">
          Pilih salah satu wajah perasaanmu di bawah ini ya!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {feelings.map((item) => {
            const Icon = item.icon;
            const active = feeling === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundEngine.playCorrect();
                  onSelectFeeling(item.id);
                  if (item.id === 'senang') triggerConfetti(45);
                }}
                className={`btn-3d rounded-2xl p-5 border-2 border-b-[5px] flex flex-col items-center text-center gap-2 cursor-pointer ${
                  active
                    ? item.activeClass
                    : 'bg-white hover:bg-sky-50 border-slate-200 border-b-slate-300 text-slate-800'
                }`}
              >
                <Icon className="w-12 h-12" />
                <span className="font-display font-black text-xl">{item.label}</span>
                <span className="text-xs sm:text-sm font-medium opacity-80">{item.desc}</span>
              </button>
            );
          })}
        </div>

        {feeling && (
          <div className="mt-5 bg-white rounded-2xl p-4 border-2 border-sky-200 text-center font-semibold text-sky-950">
            {feelings.find((f) => f.id === feeling)?.reply}
          </div>
        )}
      </div>
    </PageShell>
  );
};
