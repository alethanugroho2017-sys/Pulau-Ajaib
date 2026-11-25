import React from 'react';
import { ShapeId } from '../data/geometryData';

interface ShapeDiagramProps {
  shapeId: ShapeId;
  size?: number;
  showVertices?: boolean;
  showOutlineOnly?: boolean;
  className?: string;
}

export const ShapeDiagram: React.FC<ShapeDiagramProps> = ({
  shapeId,
  size = 120,
  showVertices = false,
  showOutlineOnly = false,
  className = '',
}) => {
  const uid = React.useId();

  const configs: Record<
    ShapeId,
    { fillStart: string; fillEnd: string; stroke: string }
  > = {
    persegi: { fillStart: '#fb7185', fillEnd: '#e11d48', stroke: '#9f1239' },
    persegi_panjang: { fillStart: '#60a5fa', fillEnd: '#2563eb', stroke: '#1e3a8a' },
    segitiga: { fillStart: '#fcd34d', fillEnd: '#f59e0b', stroke: '#b45309' },
    lingkaran: { fillStart: '#34d399', fillEnd: '#059669', stroke: '#065f46' },
    oval: { fillStart: '#a78bfa', fillEnd: '#7c3aed', stroke: '#4c1d95' },
    trapesium: { fillStart: '#f472b6', fillEnd: '#db2777', stroke: '#831843' },
  };

  const c = configs[shapeId];
  const fill = showOutlineOnly ? 'rgba(255,255,255,0.16)' : `url(#grad-${uid})`;
  const strokeWidth = showOutlineOnly ? 5 : 4;
  const dash = showOutlineOnly ? '8 5' : undefined;

  const vertices: Record<ShapeId, [number, number][]> = {
    persegi: [
      [28, 28],
      [92, 28],
      [92, 92],
      [28, 92],
    ],
    persegi_panjang: [
      [14, 34],
      [106, 34],
      [106, 86],
      [14, 86],
    ],
    segitiga: [
      [60, 20],
      [102, 96],
      [18, 96],
    ],
    lingkaran: [],
    oval: [],
    trapesium: [
      [34, 30],
      [86, 30],
      [106, 90],
      [14, 90],
    ],
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.fillStart} />
          <stop offset="100%" stopColor={c.fillEnd} />
        </linearGradient>
        <filter id={`shadow-${uid}`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter={`url(#shadow-${uid})`}>
        {shapeId === 'persegi' && (
          <rect
            x="28"
            y="28"
            width="64"
            height="64"
            rx="4"
            fill={fill}
            stroke={c.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
          />
        )}
        {shapeId === 'persegi_panjang' && (
          <rect
            x="14"
            y="34"
            width="92"
            height="52"
            rx="4"
            fill={fill}
            stroke={c.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
          />
        )}
        {shapeId === 'segitiga' && (
          <polygon
            points="60,20 102,96 18,96"
            strokeLinejoin="round"
            fill={fill}
            stroke={c.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
          />
        )}
        {shapeId === 'lingkaran' && (
          <circle
            cx="60"
            cy="60"
            r="40"
            fill={fill}
            stroke={c.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
          />
        )}
        {shapeId === 'oval' && (
          <ellipse
            cx="60"
            cy="60"
            rx="28"
            ry="44"
            fill={fill}
            stroke={c.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
          />
        )}
        {shapeId === 'trapesium' && (
          <polygon
            points="34,30 86,30 106,90 14,90"
            strokeLinejoin="round"
            fill={fill}
            stroke={c.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
          />
        )}
      </g>

      {/* Glossy highlight */}
      {!showOutlineOnly && (
        <ellipse
          cx="50"
          cy="42"
          rx="16"
          ry="6"
          fill="rgba(255,255,255,0.35)"
          transform="rotate(-18 50 42)"
        />
      )}

      {/* Vertex / Sudut dots */}
      {showVertices &&
        vertices[shapeId].map(([vx, vy], idx) => (
          <g key={idx}>
            <circle cx={vx} cy={vy} r="7" fill="#fef08a" stroke="#b45309" strokeWidth="2.5" />
            <circle cx={vx} cy={vy} r="2.5" fill="#b45309" />
          </g>
        ))}
    </svg>
  );
};
