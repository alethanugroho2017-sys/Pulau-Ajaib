import React from 'react';
import { BookOpen, PlayCircle, Gamepad2, Volume2, Map, Home } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { MenuId } from '../data/geometryData';
import { speakIndonesian } from '../utils/audio';

interface Menu01PetunjukProps {
  onBackHome: () => void;
  onNavigate: (menu: MenuId) => void;
}

export const Menu01Petunjuk: React.FC<Menu01PetunjukProps> = ({ onBackHome, onNavigate }) => {
  const steps = [
    {
      num: '1',
      title: 'Cara Belajar',
      desc: 'Buka Menu 02 untuk melihat tujuan belajarmu, lalu jelajahi Menu 03 (Ayo Belajar Bangun Datar) dan Menu 04 (Ayo Mengamati Benda) untuk mengenal sisi, sudut, dan contoh benda nyata.',
      icon: BookOpen,
      bg: 'bg-sky-50 border-sky-200',
      iconBg: 'bg-sky-500',
      actionLabel: 'Mulai Belajar Bentuk',
      target: '03' as MenuId,
      btnVariant: 'blue' as const,
    },
    {
      num: '2',
      title: 'Cara Menonton & Bernyanyi',
      desc: 'Masuk ke Menu 05 (Video Pembelajaran) untuk menonton video seru melalui YouTube atau Google Drive, lalu bernyanyi bersama Kiko di Menu 12 agar makin hafal!',
      icon: PlayCircle,
      bg: 'bg-rose-50 border-rose-200',
      iconBg: 'bg-rose-500',
      actionLabel: 'Lihat Video Belajar',
      target: '05' as MenuId,
      btnVariant: 'red' as const,
    },
    {
      num: '3',
      title: 'Cara Bermain & Evaluasi',
      desc: 'Mainkan Game 1, Game 2, Game 3, menggambar di Kanvas (Menu 13), taklukkan 6 pulau di Peta Pulau Ajaib (Menu 14), lalu kerjakan Kuis Evaluasi dan cetak piagammu!',
      icon: Gamepad2,
      bg: 'bg-emerald-50 border-emerald-200',
      iconBg: 'bg-emerald-500',
      actionLabel: 'Buka Peta Pulau Ajaib',
      target: '14' as MenuId,
      btnVariant: 'green' as const,
    },
  ];

  return (
    <PageShell
      menuNumber="01"
      title="Petunjuk Penggunaan"
      subtitle="Panduan Belajar, Menonton, dan Bermain bersama Kiko"
      onBackHome={onBackHome}
    >
      {/* Kiko Welcome Banner */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-amber-50 to-sky-50 rounded-2xl p-5 border-2 border-amber-200 mb-7">
        <img
          src="/src/assets/images/kiko_explorer_portrait_1795627984374.jpg"
          alt="Kiko si Kucing Penjelajah"
          referrerPolicy="no-referrer"
          className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md shrink-0"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-display font-extrabold text-slate-900 mb-1">
            Halo Teman! Aku Kiko si Kucing Penjelajah!
          </h3>
          <p className="text-slate-700 text-base leading-relaxed mb-3">
            Selamat datang di <strong>Pulau Ajaib</strong>. Ikuti 3 langkah mudah di bawah ini supaya kamu cepat jago mengenal bangun datar kelas 2 SD!
          </p>
          <GlossyButton
            variant="amber"
            size="sm"
            onClick={() =>
              speakIndonesian(
                'Halo teman! Aku Kiko si kucing penjelajah. Ayo belajar bangun datar, menonton video seru, dan bermain game di Pulau Ajaib!'
              )
            }
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengarkan Suara Kiko</span>
          </GlossyButton>
        </div>
      </div>

      {/* 3 Main Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className={`rounded-2xl p-5 border-2 ${s.bg} flex flex-col justify-between gap-4`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${s.iconBg} text-white flex items-center justify-center shadow-sm shrink-0`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500">Langkah {s.num}</div>
                    <h4 className="text-lg font-display font-extrabold text-slate-900">{s.title}</h4>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{s.desc}</p>
              </div>
              <GlossyButton
                variant={s.btnVariant}
                size="sm"
                onClick={() => onNavigate(s.target)}
                className="w-full"
              >
                <span>{s.actionLabel}</span>
              </GlossyButton>
            </div>
          );
        })}
      </div>

      {/* Quick Legend of Controls */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
        <h4 className="text-base font-display font-extrabold text-slate-900 mb-3">
          Kenali Tombol Penting di Pulau Ajaib
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Home className="w-5 h-5" />
            </span>
            <div>
              <strong className="block text-slate-900">Kembali ke Menu Utama</strong>
              <span>Ada di bagian atas setiap halaman untuk pulang ke 14 menu.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-xl bg-sky-100 text-sky-800 shrink-0">
              <Volume2 className="w-5 h-5" />
            </span>
            <div>
              <strong className="block text-slate-900">Tombol Musik Ceria</strong>
              <span>Nyalakan atau matikan musik pulau ceria di pojok kanan atas.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <Map className="w-5 h-5" />
            </span>
            <div>
              <strong className="block text-slate-900">Peta 6 Pulau</strong>
              <span>Selesaikan Pulau 1 terlebih dahulu untuk membuka Pulau 2 sampai 6.</span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};
