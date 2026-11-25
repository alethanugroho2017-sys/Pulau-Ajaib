import React from 'react';
import { ObjectArtId } from '../data/geometryData';

interface RealObjectIllustrationProps {
  objectId: ObjectArtId;
  size?: number;
  className?: string;
}

export const RealObjectIllustration: React.FC<RealObjectIllustrationProps> = ({
  objectId,
  size = 136,
  className = '',
}) => {
  const renderArt = () => {
    switch (objectId) {
      case 'jam_dinding':
        return (
          <g>
            {/* Outer wooden frame */}
            <circle cx="80" cy="80" r="60" fill="#dc2626" stroke="#7f1d1d" strokeWidth="4" />
            <circle cx="80" cy="80" r="51" fill="#fffbeb" stroke="#fcd34d" strokeWidth="3" />
            {/* Hour marks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 80 + Math.cos(rad) * 40;
              const y1 = 80 + Math.sin(rad) * 40;
              const x2 = 80 + Math.cos(rad) * 46;
              const y2 = 80 + Math.sin(rad) * 46;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#334155"
                  strokeWidth={deg % 90 === 0 ? 4 : 2}
                  strokeLinecap="round"
                />
              );
            })}
            <text x="80" y="45" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">
              12
            </text>
            <text x="116" y="84" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">
              3
            </text>
            <text x="80" y="122" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">
              6
            </text>
            <text x="44" y="84" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">
              9
            </text>
            {/* Clock hands */}
            <line x1="80" y1="80" x2="80" y2="49" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="80" y1="80" x2="104" y2="90" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="80" cy="80" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          </g>
        );

      case 'papan_tulis':
        return (
          <g>
            {/* Wood frame */}
            <rect x="14" y="34" width="132" height="86" rx="6" fill="#b45309" stroke="#78350f" strokeWidth="3.5" />
            {/* Green chalkboard */}
            <rect x="22" y="42" width="116" height="70" rx="2" fill="#14532d" stroke="#166534" strokeWidth="2" />
            {/* Chalk text & doodles */}
            <text x="80" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fef08a">
              2 + 3 = 5
            </text>
            <line x1="36" y1="82" x2="90" y2="82" stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="5 3" strokeLinecap="round" />
            <polygon points="108,74 122,96 94,96" fill="none" stroke="#93c5fd" strokeWidth="2.5" />
            {/* Chalk tray */}
            <rect x="34" y="114" width="92" height="8" rx="3" fill="#92400e" />
            <rect x="48" y="110" width="16" height="5" rx="2" fill="#ffffff" />
            <rect x="70" y="109" width="22" height="6" rx="2" fill="#f59e0b" />
          </g>
        );

      case 'ubin_lantai':
        return (
          <g>
            {/* Ceramic square tile */}
            <rect x="26" y="26" width="108" height="108" rx="5" fill="#e0f2fe" stroke="#0369a1" strokeWidth="4" />
            <rect x="36" y="36" width="88" height="88" rx="2" fill="#bae6fd" stroke="#38bdf8" strokeWidth="2" />
            {/* Decorative tile motif */}
            <polygon points="80,44 116,80 80,116 44,80" fill="#0284c7" opacity="0.28" />
            <circle cx="80" cy="80" r="16" fill="#0ea5e9" opacity="0.45" />
            <circle cx="80" cy="80" r="6" fill="#ffffff" />
            {/* Shine */}
            <line x1="36" y1="54" x2="54" y2="36" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      case 'potongan_pizza':
        return (
          <g>
            {/* Crust arc at bottom-ish or top */}
            <path d="M 80 22 L 132 122 Q 80 138 28 122 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Golden crust */}
            <path d="M 26 118 Q 80 138 134 118 L 128 106 Q 80 123 32 106 Z" fill="#d97706" stroke="#92400e" strokeWidth="3" />
            {/* Pepperonis */}
            <circle cx="80" cy="64" r="9" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <circle cx="62" cy="94" r="9" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <circle cx="98" cy="96" r="8.5" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            {/* Basil leaves */}
            <ellipse cx="82" cy="84" rx="6" ry="3.5" transform="rotate(-25 82 84)" fill="#16a34a" />
            <ellipse cx="70" cy="48" rx="5" ry="3" transform="rotate(20 70 48)" fill="#16a34a" />
          </g>
        );

      case 'telur_ayam':
        return (
          <g>
            {/* Nest straw */}
            <ellipse cx="80" cy="128" rx="46" ry="12" fill="#d97706" stroke="#92400e" strokeWidth="3" />
            <ellipse cx="80" cy="126" rx="38" ry="8" fill="#fbbf24" />
            {/* Oval egg */}
            <ellipse cx="80" cy="76" rx="36" ry="50" fill="#fef3c7" stroke="#b45309" strokeWidth="3.5" />
            {/* Warm shading & glossy highlight */}
            <path d="M 55 56 Q 60 40 72 34" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
            <circle cx="96" cy="86" r="3" fill="#fde68a" />
            <circle cx="64" cy="96" r="2.5" fill="#fde68a" />
          </g>
        );

      case 'atap_rumah':
        return (
          <g>
            {/* House body below */}
            <rect x="34" y="88" width="92" height="50" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
            <rect x="68" y="106" width="24" height="32" rx="2" fill="#92400e" />
            <rect x="44" y="100" width="16" height="16" fill="#38bdf8" stroke="#78350f" strokeWidth="2" />
            <rect x="100" y="100" width="16" height="16" fill="#38bdf8" stroke="#78350f" strokeWidth="2" />
            {/* Highlighted Trapezoid Roof */}
            <polygon points="40,32 120,32 142,88 18,88" fill="#ef4444" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
            {/* Roof tile lines */}
            <line x1="34" y1="50" x2="126" y2="50" stroke="#fca5a5" strokeWidth="2" opacity="0.65" />
            <line x1="27" y1="68" x2="133" y2="68" stroke="#fca5a5" strokeWidth="2" opacity="0.65" />
            {/* Chimney */}
            <rect x="102" y="18" width="14" height="16" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          </g>
        );

      case 'pintu_kelas':
        return (
          <g>
            {/* Door frame */}
            <rect x="42" y="16" width="76" height="128" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="3.5" />
            {/* Inner wood panel */}
            <rect x="52" y="26" width="56" height="44" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
            <rect x="52" y="80" width="56" height="52" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
            {/* Small window on door */}
            <rect x="64" y="34" width="32" height="28" rx="2" fill="#bae6fd" stroke="#78350f" strokeWidth="2" />
            {/* Brass handle */}
            <circle cx="106" cy="82" r="5.5" fill="#facc15" stroke="#78350f" strokeWidth="2" />
          </g>
        );

      case 'rambu_jalan':
        return (
          <g>
            {/* Pole */}
            <rect x="75" y="106" width="10" height="38" fill="#64748b" stroke="#334155" strokeWidth="2.5" />
            {/* Triangle warning sign */}
            <polygon points="80,20 136,112 24,112" fill="#facc15" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
            {/* Exclamation mark */}
            <rect x="76" y="52" width="8" height="30" rx="4" fill="#0f172a" />
            <circle cx="80" cy="94" r="5" fill="#0f172a" />
          </g>
        );

      case 'cermin_oval':
        return (
          <g>
            {/* Stand */}
            <rect x="72" y="120" width="16" height="16" fill="#b45309" />
            <ellipse cx="80" cy="138" rx="34" ry="7" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
            {/* Oval mirror frame */}
            <ellipse cx="80" cy="70" rx="38" ry="52" fill="#f59e0b" stroke="#92400e" strokeWidth="3.5" />
            {/* Glass */}
            <ellipse cx="80" cy="70" rx="30" ry="44" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
            {/* Reflection streaks */}
            <line x1="62" y1="54" x2="88" y2="34" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
            <line x1="66" y1="74" x2="96" y2="52" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
          </g>
        );

      case 'tas_trapesium':
        return (
          <g>
            {/* Handles */}
            <path d="M 60 44 C 60 22, 100 22, 100 44" fill="none" stroke="#831843" strokeWidth="6" strokeLinecap="round" />
            {/* Trapezoid handbag body */}
            <polygon points="44,44 116,44 134,128 26,128" fill="#ec4899" stroke="#831843" strokeWidth="4" strokeLinejoin="round" />
            {/* Flap */}
            <polygon points="46,44 114,44 104,74 56,74" fill="#f472b6" stroke="#831843" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Gold clasp */}
            <rect x="72" y="68" width="16" height="12" rx="3" fill="#facc15" stroke="#854d0e" strokeWidth="2" />
          </g>
        );

      case 'papan_catur':
        return (
          <g>
            {/* Wooden square board */}
            <rect x="20" y="20" width="120" height="120" rx="5" fill="#78350f" stroke="#451a03" strokeWidth="3.5" />
            {/* 4x4 checkerboard grid */}
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={30 + col * 25}
                  y={30 + row * 25}
                  width="25"
                  height="25"
                  fill={(row + col) % 2 === 0 ? '#fef3c7' : '#1e293b'}
                />
              ))
            )}
            <rect x="30" y="30" width="100" height="100" fill="none" stroke="#451a03" strokeWidth="2" />
          </g>
        );

      case 'roda_sepeda':
        return (
          <g>
            {/* Tire */}
            <circle cx="80" cy="80" r="56" fill="none" stroke="#1e293b" strokeWidth="14" />
            {/* Rim */}
            <circle cx="80" cy="80" r="46" fill="none" stroke="#94a3b8" strokeWidth="4" />
            {/* Spokes */}
            {[0, 45, 90, 135].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={80 + Math.cos(rad) * 45}
                  y1={80 + Math.sin(rad) * 45}
                  x2={80 - Math.cos(rad) * 45}
                  y2={80 - Math.sin(rad) * 45}
                  stroke="#64748b"
                  strokeWidth="2.5"
                />
              );
            })}
            {/* Center hub */}
            <circle cx="80" cy="80" r="10" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" />
            <circle cx="80" cy="80" r="4" fill="#f8fafc" />
          </g>
        );

      case 'semangka_oval':
        return (
          <g>
            {/* Oval melon */}
            <ellipse cx="80" cy="82" rx="38" ry="54" fill="#16a34a" stroke="#14532d" strokeWidth="3.5" />
            {/* Stripes */}
            <path d="M 62 34 Q 50 82 62 130" fill="none" stroke="#14532d" strokeWidth="6" strokeLinecap="round" />
            <path d="M 80 28 L 80 136" fill="none" stroke="#14532d" strokeWidth="6" strokeLinecap="round" />
            <path d="M 98 34 Q 110 82 98 130" fill="none" stroke="#14532d" strokeWidth="6" strokeLinecap="round" />
            {/* Highlight */}
            <ellipse cx="64" cy="58" rx="6" ry="14" transform="rotate(-15 64 58)" fill="#86efac" opacity="0.55" />
          </g>
        );

      case 'perahu_trapesium':
        return (
          <g>
            {/* Baking pan / Loyang Kue trapezoid */}
            <polygon points="22,54 138,54 118,114 42,114" fill="#94a3b8" stroke="#334155" strokeWidth="3.5" strokeLinejoin="round" />
            <rect x="14" y="48" width="132" height="10" rx="5" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
            {/* Cake dome */}
            <path d="M 38 48 Q 80 20 122 48" fill="#d97706" stroke="#78350f" strokeWidth="3" />
            <line x1="56" y1="68" x2="62" y2="102" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'penggaris_segitiga':
        return (
          <g>
            <polygon points="30,24 30,132 136,132" fill="#38bdf8" stroke="#0369a1" strokeWidth="4" strokeLinejoin="round" opacity="0.92" />
            {/* Inner cutout */}
            <polygon points="48,66 48,114 96,114" fill="#ffffff" stroke="#0369a1" strokeWidth="3" strokeLinejoin="round" />
            {/* Ruler ticks */}
            {[42, 54, 66, 78, 90, 102, 114, 126].map((x) => (
              <line key={x} x1={x} y1="132" x2={x} y2="123" stroke="#0f172a" strokeWidth="2" />
            ))}
          </g>
        );

      case 'kertas_origami':
        return (
          <g>
            {/* Square origami paper with folded corner */}
            <polygon points="26,26 134,26 134,106 106,134 26,134" fill="#fb923c" stroke="#9a3412" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Folded corner */}
            <polygon points="106,134 106,106 134,106" fill="#fed7aa" stroke="#9a3412" strokeWidth="3" strokeLinejoin="round" />
            {/* Cute star pattern */}
            <circle cx="64" cy="70" r="8" fill="#fef08a" opacity="0.7" />
            <circle cx="96" cy="54" r="5" fill="#fef08a" opacity="0.7" />
          </g>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={`select-none ${className}`}
      role="img"
      aria-label={objectId}
    >
      <defs>
        <radialGradient id="obj-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </radialGradient>
      </defs>
      <rect x="4" y="4" width="152" height="152" rx="26" fill="url(#obj-bg)" />
      {renderArt()}
    </svg>
  );
};
