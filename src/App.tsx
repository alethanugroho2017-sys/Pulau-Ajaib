import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Target,
  Shapes,
  Search,
  Youtube,
  HelpCircle,
  Link2,
  ShoppingBasket,
  ClipboardCheck,
  Award,
  UserCheck,
  Music,
  Palette,
  Map,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { ALL_MENUS, MenuId } from './data/geometryData';
import { ThreeIslandBackground } from './components/ThreeIslandBackground';
import { GlossyButton } from './components/GlossyButton';
import { soundEngine, speakIndonesian } from './utils/audio';

import { Menu01Petunjuk } from './pages/Menu01Petunjuk';
import { Menu02Tujuan } from './pages/Menu02Tujuan';
import { Menu03BelajarBangun } from './pages/Menu03BelajarBangun';
import { Menu04MengamatiBenda } from './pages/Menu04MengamatiBenda';
import { Menu05Video } from './pages/Menu05Video';
import { Menu06GameTebak } from './pages/Menu06GameTebak';
import { Menu07GamePasangkan } from './pages/Menu07GamePasangkan';
import { Menu08GameKelompokkan } from './pages/Menu08GameKelompokkan';
import { Menu09KuisEvaluasi } from './pages/Menu09KuisEvaluasi';
import { FeelingType, Menu10HasilRefleksi } from './pages/Menu10HasilRefleksi';
import { Menu11ProfilTPACK } from './pages/Menu11ProfilTPACK';
import { Menu12Bernyanyi } from './pages/Menu12Bernyanyi';
import { Menu13Menggambar } from './pages/Menu13Menggambar';
import { Menu14PetaPulau } from './pages/Menu14PetaPulau';

const MENU_ICONS: Record<string, React.ElementType> = {
  '01': BookOpen,
  '02': Target,
  '03': Shapes,
  '04': Search,
  '05': Youtube,
  '06': HelpCircle,
  '07': Link2,
  '08': ShoppingBasket,
  '09': ClipboardCheck,
  '10': Award,
  '11': UserCheck,
  '12': Music,
  '13': Palette,
  '14': Map,
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState<MenuId>('home');
  const [musicOn, setMusicOn] = useState(false);
  const [zen3DMode, setZen3DMode] = useState(false);

  // Persistent Student Progress
  const [studentName, setStudentName] = useState<string>(
    () => localStorage.getItem('pulau_ajaib_student_name') || ''
  );
  const [exploredShapes, setExploredShapes] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pulau_ajaib_explored') || '[]');
    } catch {
      return [];
    }
  });
  const [quizScore, setQuizScore] = useState<number | null>(() => {
    const v = localStorage.getItem('pulau_ajaib_quiz_score');
    return v !== null ? Number(v) : null;
  });
  const [game1Score, setGame1Score] = useState<number | null>(() => {
    const v = localStorage.getItem('pulau_ajaib_g1_score');
    return v !== null ? Number(v) : null;
  });
  const [game2Score, setGame2Score] = useState<number | null>(() => {
    const v = localStorage.getItem('pulau_ajaib_g2_score');
    return v !== null ? Number(v) : null;
  });
  const [game3Score, setGame3Score] = useState<number | null>(() => {
    const v = localStorage.getItem('pulau_ajaib_g3_score');
    return v !== null ? Number(v) : null;
  });
  const [unlockedIsland, setUnlockedIsland] = useState<number>(() => {
    return Number(localStorage.getItem('pulau_ajaib_unlocked_island') || '1');
  });
  const [completedIslands, setCompletedIslands] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pulau_ajaib_completed_islands') || '[]');
    } catch {
      return [];
    }
  });
  const [feeling, setFeeling] = useState<FeelingType>(() => {
    return (localStorage.getItem('pulau_ajaib_feeling') as FeelingType) || null;
  });

  useEffect(() => {
    return () => {
      soundEngine.stopBgm();
    };
  }, []);

  const handleToggleMusic = () => {
    const next = soundEngine.toggleBgm();
    setMusicOn(next);
  };

  const handleNavigate = (menu: MenuId) => {
    soundEngine.playPop();
    setZen3DMode(false);
    setActiveMenu(menu);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreShape = (shapeId: string) => {
    setExploredShapes((prev) => {
      if (prev.includes(shapeId)) return prev;
      const next = [...prev, shapeId];
      localStorage.setItem('pulau_ajaib_explored', JSON.stringify(next));
      return next;
    });
  };

  const handleCompleteIsland = (islandId: number) => {
    setCompletedIslands((prev) => {
      const next = prev.includes(islandId) ? prev : [...prev, islandId];
      localStorage.setItem('pulau_ajaib_completed_islands', JSON.stringify(next));
      return next;
    });
    setUnlockedIsland((prev) => {
      const next = Math.max(prev, Math.min(6, islandId + 1));
      localStorage.setItem('pulau_ajaib_unlocked_island', String(next));
      return next;
    });
  };

  const handleResetMap = () => {
    setUnlockedIsland(1);
    setCompletedIslands([]);
    localStorage.setItem('pulau_ajaib_unlocked_island', '1');
    localStorage.setItem('pulau_ajaib_completed_islands', '[]');
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Real-time 3D Floating Island Scene */}
      <ThreeIslandBackground isHome={activeMenu === 'home'} />

      {/* Top HUD Bar */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="text-left font-display font-black text-xl sm:text-2xl text-white drop-shadow-[0_2px_0_rgba(15,23,42,0.45)] whitespace-nowrap shrink-0 cursor-pointer"
        >
          Pulau Ajaib
        </button>

        <div className="flex items-center gap-2.5 shrink-0">
          {activeMenu === 'home' && (
            <GlossyButton
              variant="white"
              size="sm"
              onClick={() => setZen3DMode((v) => !v)}
            >
              {zen3DMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {zen3DMode ? 'Tampilkan 14 Menu' : 'Lihat Pulau 3D'}
              </span>
            </GlossyButton>
          )}

          <GlossyButton
            variant={musicOn ? 'green' : 'amber'}
            size="sm"
            silent
            onClick={() => {
              soundEngine.playPop();
              handleToggleMusic();
            }}
            aria-label={musicOn ? 'Matikan Musik' : 'Nyalakan Musik'}
          >
            {musicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{musicOn ? 'Musik ON' : 'Musik OFF'}</span>
          </GlossyButton>
        </div>
      </header>

      {/* Main Viewport */}
      {activeMenu === 'home' ? (
        <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          {zen3DMode ? (
            <div className="min-h-[75vh] flex flex-col items-center justify-end pb-6 pointer-events-none">
              <div className="bg-white/95 rounded-2xl px-5 py-3 shadow-xl border-b-4 border-sky-200 pointer-events-auto text-center">
                <p className="font-display font-extrabold text-slate-900 text-base">
                  Kiko si Kucing Penjelajah sedang melambaikan tangan di Pulau Ajaib 3D!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Hero Title + Kiko Mascot Welcome Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pt-10 sm:pt-14 pb-6">
                <div className="lg:col-span-7 text-center lg:text-left">
                  <div className="inline-block text-xs sm:text-sm font-display font-extrabold text-sky-950 bg-amber-300 px-3.5 py-1 rounded-xl border-b-2 border-amber-500 shadow-sm mb-2">
                    Media Pembelajaran Interaktif · Matematika Kelas 2 SD
                  </div>
                  <h1 className="title-3d-pulau text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight">
                    PULAU AJAIB
                  </h1>
                  <p className="title-3d-sub text-lg sm:text-2xl font-display font-extrabold text-white mt-2">
                    Petualangan 3D Mengenal Geometri Bangun Datar
                  </p>
                </div>

                {/* Mascot KIKO Interactive Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white/95 rounded-3xl p-4 sm:p-5 shadow-2xl border-b-[6px] border-amber-300 flex items-center gap-4">
                    <div className="relative shrink-0 animate-float-slow">
                      <img
                        src="/src/assets/images/kiko_explorer_portrait_1795627984374.jpg"
                        alt="Maskot Kiko si Kucing Penjelajah"
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-amber-300 shadow-md"
                      />
                      <span
                        className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-display font-black px-2 py-0.5 rounded-lg shadow animate-wave-paw"
                        aria-hidden="true"
                      >
                        Hai!
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold text-amber-700">
                        Maskot Kiko si Kucing Penjelajah
                      </div>
                      <p className="text-sm font-semibold text-slate-700 leading-snug mt-0.5 mb-2.5">
                        Ayo jelajahi 14 menu seru, tonton video, mainkan 3 game, dan taklukkan 6 pulau!
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <GlossyButton
                          variant="amber"
                          size="sm"
                          onClick={() => {
                            soundEngine.playCorrect();
                            speakIndonesian(
                              'Meong! Halo teman hebat kelas dua! Aku Kiko. Ayo pilih salah satu dari empat belas menu petualangan di Pulau Ajaib!'
                            );
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Sapa Kiko!</span>
                        </GlossyButton>
                        <GlossyButton
                          variant="teal"
                          size="sm"
                          onClick={() => handleNavigate('14')}
                        >
                          <Map className="w-4 h-4" />
                          <span>Pulau {unlockedIsland}/6</span>
                        </GlossyButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 14-Menu Glossy 3D Grid */}
              <section aria-label="Menu Utama 14 Petualangan">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
                  {ALL_MENUS.map((menu) => {
                    const Icon = MENU_ICONS[menu.id] || Shapes;
                    return (
                      <button
                        key={menu.id}
                        type="button"
                        onClick={() => handleNavigate(menu.id)}
                        className={`btn-3d group h-full text-left rounded-3xl p-4 bg-gradient-to-b ${menu.gradient} border-b-[6px] ${menu.borderBottom} text-white shadow-xl flex items-center gap-3.5 cursor-pointer`}
                      >
                        <div
                          className={`w-12 h-12 rounded-2xl ${menu.badgeColor} bg-opacity-40 flex flex-col items-center justify-center shrink-0 shadow-inner border border-white/25`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-display font-black text-white/90">
                            Menu {menu.number}
                          </div>
                          <h2 className="font-display font-extrabold text-[15px] sm:text-base leading-snug text-white">
                            {menu.title}
                          </h2>
                          <p className="text-xs font-medium text-white/95 leading-snug mt-0.5">
                            {menu.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </main>
      ) : (
        <main className="relative z-10 pb-8">
          {activeMenu === '01' && (
            <Menu01Petunjuk
              onBackHome={() => handleNavigate('home')}
              onNavigate={handleNavigate}
            />
          )}
          {activeMenu === '02' && (
            <Menu02Tujuan
              onBackHome={() => handleNavigate('home')}
              onNavigate={handleNavigate}
            />
          )}
          {activeMenu === '03' && (
            <Menu03BelajarBangun
              onBackHome={() => handleNavigate('home')}
              exploredShapes={exploredShapes}
              onExploreShape={handleExploreShape}
            />
          )}
          {activeMenu === '04' && (
            <Menu04MengamatiBenda onBackHome={() => handleNavigate('home')} />
          )}
          {activeMenu === '05' && (
            <Menu05Video onBackHome={() => handleNavigate('home')} />
          )}
          {activeMenu === '06' && (
            <Menu06GameTebak
              onBackHome={() => handleNavigate('home')}
              onScoreUpdate={(s) => {
                setGame1Score(s);
                localStorage.setItem('pulau_ajaib_g1_score', String(s));
              }}
            />
          )}
          {activeMenu === '07' && (
            <Menu07GamePasangkan
              onBackHome={() => handleNavigate('home')}
              onScoreUpdate={(s) => {
                setGame2Score(s);
                localStorage.setItem('pulau_ajaib_g2_score', String(s));
              }}
            />
          )}
          {activeMenu === '08' && (
            <Menu08GameKelompokkan
              onBackHome={() => handleNavigate('home')}
              onScoreUpdate={(s) => {
                setGame3Score(s);
                localStorage.setItem('pulau_ajaib_g3_score', String(s));
              }}
            />
          )}
          {activeMenu === '09' && (
            <Menu09KuisEvaluasi
              onBackHome={() => handleNavigate('home')}
              onQuizComplete={(s) => {
                setQuizScore(s);
                localStorage.setItem('pulau_ajaib_quiz_score', String(s));
              }}
              onNavigate={handleNavigate}
            />
          )}
          {activeMenu === '10' && (
            <Menu10HasilRefleksi
              onBackHome={() => handleNavigate('home')}
              studentName={studentName}
              onChangeName={(name) => {
                setStudentName(name);
                localStorage.setItem('pulau_ajaib_student_name', name);
              }}
              quizScore={quizScore}
              game1Score={game1Score}
              game2Score={game2Score}
              game3Score={game3Score}
              unlockedIsland={unlockedIsland}
              completedIslands={completedIslands}
              feeling={feeling}
              onSelectFeeling={(f) => {
                setFeeling(f);
                if (f) localStorage.setItem('pulau_ajaib_feeling', f);
              }}
            />
          )}
          {activeMenu === '11' && (
            <Menu11ProfilTPACK onBackHome={() => handleNavigate('home')} />
          )}
          {activeMenu === '12' && (
            <Menu12Bernyanyi onBackHome={() => handleNavigate('home')} />
          )}
          {activeMenu === '13' && (
            <Menu13Menggambar onBackHome={() => handleNavigate('home')} />
          )}
          {activeMenu === '14' && (
            <Menu14PetaPulau
              onBackHome={() => handleNavigate('home')}
              unlockedIsland={unlockedIsland}
              completedIslands={completedIslands}
              onCompleteIsland={handleCompleteIsland}
              onResetProgress={handleResetMap}
            />
          )}
        </main>
      )}
    </div>
  );
}
