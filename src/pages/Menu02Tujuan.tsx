import React from 'react';
import { Target, Shapes, SearchCheck, Palette, Volume2 } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { GlossyButton } from '../components/GlossyButton';
import { MenuId } from '../data/geometryData';
import { speakIndonesian } from '../utils/audio';

interface Menu02TujuanProps {
  onBackHome: () => void;
  onNavigate: (menu: MenuId) => void;
}

export const Menu02Tujuan: React.FC<Menu02TujuanProps> = ({ onBackHome, onNavigate }) => {
  const objectives = [
    {
      number: 'Tujuan 1',
      title: 'Mengenal 6 Bentuk Bangun Datar',
      text: 'Aku bisa mengenal nama dan ciri-ciri Persegi, Persegi Panjang, Segitiga, Lingkaran, Oval, dan Trapesium serta menghitung sisi dan sudutnya.',
      icon: Shapes,
      cardClass: 'bg-sky-50 border-sky-200',
      badgeClass: 'bg-sky-500 text-white',
    },
    {
      number: 'Tujuan 2',
      title: 'Menemukan Bangun Datar di Sekitar Kita',
      text: 'Aku bisa mengamati dan menyebutkan bentuk bangun datar pada benda nyata di rumah dan di sekolah, seperti jam dinding, papan tulis, dan atap rumah.',
      icon: SearchCheck,
      cardClass: 'bg-amber-50 border-amber-200',
      badgeClass: 'bg-amber-500 text-white',
    },
    {
      number: 'Tujuan 3',
      title: 'Bermain, Mengelompokkan & Menggambar',
      text: 'Aku bisa memasangkan, mengelompokkan, serta menggambar bangun datar sendiri dengan gembira hingga meraih bintang petualang!',
      icon: Palette,
      cardClass: 'bg-emerald-50 border-emerald-200',
      badgeClass: 'bg-emerald-500 text-white',
    },
  ];

  return (
    <PageShell
      menuNumber="02"
      title="Tujuan Pembelajaran"
      subtitle="3 Misi Hebat Anak Kelas 2 SD di Pulau Ajaib"
      onBackHome={onBackHome}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-emerald-200 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold text-slate-900">
              Apa yang Akan Kita Capai Hari Ini?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Mata Pelajaran Matematika Kelas 2 SD · Bab Geometri Bangun Datar
            </p>
          </div>
        </div>
        <GlossyButton
          variant="teal"
          size="sm"
          onClick={() =>
            speakIndonesian(
              'Tujuan pembelajaran kita hari ini ada tiga. Pertama, mengenal enam bentuk bangun datar beserta sisi dan sudutnya. Kedua, menemukan bentuk bangun datar pada benda nyata di sekitar kita. Ketiga, terampil mengelompokkan, memasangkan, dan menggambar bangun datar dengan gembira!'
            )
          }
        >
          <Volume2 className="w-4 h-4" />
          <span>Bacakan Tujuan</span>
        </GlossyButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        {objectives.map((obj) => {
          const Icon = obj.icon;
          return (
            <div
              key={obj.number}
              className={`rounded-2xl p-6 border-2 ${obj.cardClass} flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-display font-extrabold text-slate-600">
                  {obj.number}
                </span>
                <div className={`w-11 h-11 rounded-xl ${obj.badgeClass} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h4 className="text-xl font-display font-extrabold text-slate-900 leading-snug">
                {obj.title}
              </h4>
              <p className="text-slate-700 text-base leading-relaxed">{obj.text}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <GlossyButton variant="blue" size="lg" onClick={() => onNavigate('03')}>
          <span>Ayo Mulai Belajar 6 Bangun Datar!</span>
        </GlossyButton>
      </div>
    </PageShell>
  );
};
