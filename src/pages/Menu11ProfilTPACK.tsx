import React, { useRef, useState } from 'react';
import { GraduationCap, Cpu, BookOpen, Layers, Camera, Check, Pencil } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { soundEngine } from '../utils/audio';

interface Menu11ProfilTPACKProps {
  onBackHome: () => void;
}

export const Menu11ProfilTPACK: React.FC<Menu11ProfilTPACKProps> = ({ onBackHome }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [teacherName, setTeacherName] = useState(
    () => localStorage.getItem('pulau_ajaib_teacher_name') || 'Ibu Sari Wahyuni, S.Pd.'
  );
  const [schoolName, setSchoolName] = useState(
    () => localStorage.getItem('pulau_ajaib_school_name') || 'SDN Nusantara Harapan 01'
  );
  const [teacherRole, setTeacherRole] = useState(
    () => localStorage.getItem('pulau_ajaib_teacher_role') || 'Guru Kelas 2 SD · Pengembang MPI Pulau Ajaib'
  );
  const [photoUrl, setPhotoUrl] = useState(
    () =>
      localStorage.getItem('pulau_ajaib_teacher_photo') ||
      '/src/assets/images/guru_profil_avatar_1795627985328.jpg'
  );
  const [photoSaved, setPhotoSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeTpack, setActiveTpack] = useState<'tk' | 'pk' | 'ck' | 'tpack'>('tpack');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      const rawDataUrl = reader.result;

      const img = new Image();
      img.onload = () => {
        const maxDim = 512;
        let targetW = img.width;
        let targetH = img.height;
        if (targetW > maxDim || targetH > maxDim) {
          if (targetW >= targetH) {
            targetH = Math.round((targetH * maxDim) / targetW);
            targetW = maxDim;
          } else {
            targetW = Math.round((targetW * maxDim) / targetH);
            targetH = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        let finalUrl = rawDataUrl;
        if (ctx) {
          ctx.drawImage(img, 0, 0, targetW, targetH);
          finalUrl = canvas.toDataURL('image/jpeg', 0.88);
        }

        setPhotoUrl(finalUrl);
        try {
          localStorage.setItem('pulau_ajaib_teacher_photo', finalUrl);
        } catch {
          // Ignore storage quota overflow if browser restricts storage
        }
        soundEngine.playCorrect();
        setPhotoSaved(true);
        window.setTimeout(() => setPhotoSaved(false), 2500);
      };
      img.onerror = () => {
        setPhotoUrl(rawDataUrl);
        try {
          localStorage.setItem('pulau_ajaib_teacher_photo', rawDataUrl);
        } catch {
          // Ignore storage quota overflow
        }
        soundEngine.playCorrect();
        setPhotoSaved(true);
        window.setTimeout(() => setPhotoSaved(false), 2500);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('pulau_ajaib_teacher_name', teacherName);
    localStorage.setItem('pulau_ajaib_school_name', schoolName);
    localStorage.setItem('pulau_ajaib_teacher_role', teacherRole);
    soundEngine.playCorrect();
    setEditing(false);
  };

  const tpackNodes = [
    {
      id: 'tk' as const,
      short: 'TK',
      title: 'Technological Knowledge (Teknologi)',
      color: 'bg-sky-500 text-white border-sky-700',
      panel: 'bg-sky-50 border-sky-200',
      icon: Cpu,
      desc: 'Pemanfaatan dunia 3D Three.js interaktif, bentuk 3D yang bisa diputar 360°, suara Web Audio API, kanvas gambar jari/mouse, dan game digital tanpa instalasi.',
    },
    {
      id: 'pk' as const,
      short: 'PK',
      title: 'Pedagogical Knowledge (Pedagogi)',
      color: 'bg-emerald-500 text-white border-emerald-700',
      panel: 'bg-emerald-50 border-emerald-200',
      icon: GraduationCap,
      desc: 'Pendekatan bermain sambil belajar (Game-Based Learning) dan Discovery Learning bertahap untuk karakteristik siswa kelas 2 SD yang menyukai visual cerah dan eksplorasi aktif.',
    },
    {
      id: 'ck' as const,
      short: 'CK',
      title: 'Content Knowledge (Materi)',
      color: 'bg-amber-500 text-slate-950 border-amber-700',
      panel: 'bg-amber-50 border-amber-200',
      icon: BookOpen,
      desc: 'Materi Geometri Bangun Datar Kelas 2 SD Kurikulum Merdeka: 6 bentuk utama (Persegi, Persegi Panjang, Segitiga, Lingkaran, Oval, Trapesium), sisi, sudut, dan benda nyata.',
    },
    {
      id: 'tpack' as const,
      short: 'TPACK',
      title: 'Integrasi TPACK di Pulau Ajaib',
      color: 'bg-purple-600 text-white border-purple-800',
      panel: 'bg-purple-50 border-purple-200',
      icon: Layers,
      desc: 'Perpaduan harmonis Teknologi 3D + Pedagogi Bermain + Materi Geometri Kelas 2 SD agar siswa memahami konsep bangun datar secara konkret, bermakna, dan menyenangkan!',
    },
  ];

  const activeNode = tpackNodes.find((n) => n.id === activeTpack)!;

  return (
    <PageShell
      menuNumber="11"
      title="Profil Pengembang & TPACK"
      subtitle="Identitas Guru Pengembang dan Kerangka Pembelajaran TPACK"
      onBackHome={onBackHome}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left: Teacher Profile Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-sky-50 rounded-3xl p-6 border-2 border-slate-200">
          <div className="flex flex-col items-center text-center">
            <img
              src={photoUrl}
              alt={teacherName}
              referrerPolicy="no-referrer"
              className="w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-lg mb-3"
            />
            <input
              ref={fileInputRef}
              id="teacher-photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <GlossyButton
              variant="blue"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="mb-2"
            >
              <Camera className="w-4 h-4" />
              <span>Ganti Foto</span>
            </GlossyButton>
            {photoSaved && (
              <span className="text-xs font-bold text-emerald-700 mb-2">
                Foto baru tersimpan otomatis!
              </span>
            )}
            <div className="mb-2" />

            {editing ? (
              <form onSubmit={handleSaveProfile} className="w-full space-y-3 text-left mt-2">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Nama Guru</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Sekolah</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Peran</label>
                  <input
                    type="text"
                    value={teacherRole}
                    onChange={(e) => setTeacherRole(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                  />
                </div>
                <GlossyButton type="submit" variant="green" size="sm" className="w-full">
                  <Check className="w-4 h-4" />
                  <span>Simpan Profil</span>
                </GlossyButton>
              </form>
            ) : (
              <>
                <h3 className="text-2xl font-display font-black text-slate-900">
                  {teacherName}
                </h3>
                <p className="text-sky-700 font-bold text-sm mt-1">{schoolName}</p>
                <p className="text-slate-600 text-sm mt-1 mb-4">{teacherRole}</p>
                <GlossyButton
                  variant="white"
                  size="sm"
                  onClick={() => setEditing(true)}
                >
                  <Pencil className="w-4 h-4" />
                  <span>Ubah Nama / Sekolah</span>
                </GlossyButton>
              </>
            )}
          </div>
        </div>

        {/* Right: Interactive TPACK Framework */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <h3 className="text-2xl font-display font-black text-slate-900 mb-1">
              Kerangka Pembelajaran TPACK
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Klik salah satu komponen TPACK di bawah ini untuk melihat penerapannya dalam MPI Pulau Ajaib:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tpackNodes.map((node) => {
              const Icon = node.icon;
              const isActive = activeTpack === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playPop();
                    setActiveTpack(node.id);
                  }}
                  className={`btn-3d rounded-2xl p-3.5 border-2 border-b-[5px] flex flex-col items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? node.color
                      : 'bg-white hover:bg-slate-50 border-slate-200 border-b-slate-300 text-slate-800'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-display font-black text-base">{node.short}</span>
                </button>
              );
            })}
          </div>

          <div className={`rounded-3xl p-6 border-2 ${activeNode.panel}`}>
            <h4 className="text-xl font-display font-black text-slate-900 mb-2">
              {activeNode.title}
            </h4>
            <p className="text-slate-700 text-base leading-relaxed">{activeNode.desc}</p>
          </div>

          {/* 3-Pillar TPACK Matrix */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-sky-700 block mb-1">Teknologi (T)</strong>
              <span className="text-slate-600">
                Animasi 3D WebGL, Audio Sintesis, Kanvas Gambar Interaktif, Game Drag &amp; Tap.
              </span>
            </div>
            <div>
              <strong className="text-emerald-700 block mb-1">Pedagogi (P)</strong>
              <span className="text-slate-600">
                Eksplorasi terbimbing, tantangan bertahap 6 pulau, umpan balik positif &amp; refleksi.
              </span>
            </div>
            <div>
              <strong className="text-amber-700 block mb-1">Konten (C)</strong>
              <span className="text-slate-600">
                6 Bangun datar kelas 2 SD, ciri sisi dan sudut, serta pengamatan benda sehari-hari.
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};
