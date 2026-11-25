import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export type GlossyVariant =
  | 'red'
  | 'blue'
  | 'green'
  | 'amber'
  | 'purple'
  | 'pink'
  | 'teal'
  | 'slate'
  | 'white';

const VARIANT_CLASSES: Record<GlossyVariant, string> = {
  red: 'bg-gradient-to-b from-rose-400 to-red-600 border-b-[5px] border-red-800 text-white shadow-lg shadow-red-900/25',
  blue: 'bg-gradient-to-b from-sky-400 to-blue-600 border-b-[5px] border-blue-800 text-white shadow-lg shadow-blue-900/25',
  green: 'bg-gradient-to-b from-emerald-400 to-green-600 border-b-[5px] border-green-800 text-white shadow-lg shadow-green-900/25',
  amber: 'bg-gradient-to-b from-amber-300 to-orange-500 border-b-[5px] border-orange-700 text-slate-950 shadow-lg shadow-orange-900/20',
  purple: 'bg-gradient-to-b from-violet-400 to-purple-600 border-b-[5px] border-purple-800 text-white shadow-lg shadow-purple-900/25',
  pink: 'bg-gradient-to-b from-pink-400 to-rose-600 border-b-[5px] border-rose-800 text-white shadow-lg shadow-rose-900/25',
  teal: 'bg-gradient-to-b from-teal-400 to-emerald-600 border-b-[5px] border-emerald-800 text-white shadow-lg shadow-emerald-900/25',
  slate: 'bg-gradient-to-b from-slate-600 to-slate-800 border-b-[5px] border-slate-950 text-white shadow-lg shadow-slate-950/25',
  white: 'bg-gradient-to-b from-white to-slate-100 border-b-[5px] border-slate-300 text-slate-900 shadow-lg shadow-slate-900/15',
};

interface GlossyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlossyVariant;
  size?: 'sm' | 'md' | 'lg';
  silent?: boolean;
}

export const GlossyButton: React.FC<GlossyButtonProps> = ({
  variant = 'blue',
  size = 'md',
  silent = false,
  className = '',
  onClick,
  children,
  disabled,
  ...rest
}) => {
  const sizeClass =
    size === 'sm'
      ? 'px-4 py-2 text-sm rounded-xl'
      : size === 'lg'
        ? 'px-7 py-3.5 text-lg rounded-2xl'
        : 'px-5 py-2.5 text-base rounded-2xl';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        if (!silent && !disabled) {
          soundEngine.playPop();
        }
        onClick?.(e);
      }}
      className={`btn-3d inline-flex items-center justify-center gap-2 font-display font-bold whitespace-nowrap shrink-0 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${sizeClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

interface KembaliMenuButtonProps {
  onClick: () => void;
}

export const KembaliMenuButton: React.FC<KembaliMenuButtonProps> = ({ onClick }) => {
  return (
    <GlossyButton variant="amber" size="md" onClick={onClick} className="font-extrabold">
      <ArrowLeft className="w-5 h-5 stroke-[2.75]" />
      <span>Kembali ke Menu Utama</span>
    </GlossyButton>
  );
};
