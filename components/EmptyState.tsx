
import React from 'react';
import { getGreeting } from '../utils/helpers';

interface EmptyStateProps {
  userName: string;
  onCreateNote: (type: 'text' | 'table') => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ userName, onCreateNote }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent">
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="mb-12 flex items-center gap-3 h-20">
          {[0.4, 0.7, 1, 0.6, 0.8, 0.5, 0.9, 0.4, 0.7, 0.3].map((h, i) => (
            <div 
              key={i} 
              className="w-1.5 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-full animate-wave shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
              style={{ 
                height: `${h * 100}%`, 
                animation: `wave 1.5s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.1}s` 
              }}
            ></div>
          ))}
        </div>
        
        <div className="max-w-md">
          <h2 className="text-5xl font-black bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent mb-6 tracking-tighter">
            {getGreeting()}, {userName}!
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12 opacity-80">
            Twój osobisty asystent głosowy czeka na pierwszą myśl. Zacznij tworzyć lub uporządkuj dane w tabeli.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button 
            onClick={() => onCreateNote('text')}
            className="group relative flex items-center gap-4 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-[24px] transition-all duration-500 shadow-2xl shadow-indigo-900/40 transform hover:-translate-y-1 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/10 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <i className="fas fa-plus text-white text-sm"></i>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Nowa notatka</span>
          </button>
          <button 
            onClick={() => onCreateNote('table')}
            className="group flex items-center gap-4 px-10 py-5 bg-slate-900/40 hover:bg-slate-800 rounded-[24px] transition-all duration-500 border border-slate-800/80 hover:border-indigo-500/30 transform hover:-translate-y-1 active:scale-95 shadow-xl"
          >
            <i className="fas fa-table-cells-large text-indigo-400 text-sm"></i>
            <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Zbuduj arkusz</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0% { transform: scaleY(0.5); }
          100% { transform: scaleY(1.2); }
        }
      `}</style>

      <div className="absolute bottom-16 flex items-center gap-6 opacity-20">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-slate-500"></div>
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">VOX PRO SYSTEM</div>
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-slate-500"></div>
      </div>
    </div>
  );
};
