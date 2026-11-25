import React from 'react';
import { KembaliMenuButton } from './GlossyButton';

interface PageShellProps {
  menuNumber: string;
  title: string;
  subtitle?: string;
  onBackHome: () => void;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({
  menuNumber,
  title,
  subtitle,
  onBackHome,
  rightSlot,
  children,
}) => {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-10 animate-pop-in">
      {/* Top Action Bar inside Page */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white/95 rounded-3xl px-5 py-3.5 shadow-xl border-b-4 border-sky-200">
        <div className="flex items-center gap-4 min-w-0">
          <KembaliMenuButton onClick={onBackHome} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
              <span>Menu {menuNumber}</span>
              {subtitle && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="truncate text-slate-500 font-semibold">{subtitle}</span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 truncate">
              {title}
            </h2>
          </div>
        </div>
        {rightSlot && <div className="flex items-center gap-3 shrink-0">{rightSlot}</div>}
      </div>

      {/* Main Content Stage */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-8 shadow-2xl border-b-[6px] border-slate-200">
        {children}
      </div>
    </div>
  );
};
