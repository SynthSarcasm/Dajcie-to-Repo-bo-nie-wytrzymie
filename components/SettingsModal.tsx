
import React from 'react';
import { AISettings } from '../types';

interface SettingsModalProps {
  settings: AISettings;
  onUpdate: (updates: Partial<AISettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onUpdate, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-sm"></i>
            </div>
            <h2 className="text-lg font-bold text-slate-100">Ustawienia profilu i AI</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Profil użytkownika</h3>
            <div className="space-y-2">
              <label className="text-xs text-slate-400 ml-1">Twoje Imię / Nazwa</label>
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
                <input 
                  type="text"
                  value={settings.userName}
                  onChange={(e) => onUpdate({ userName: e.target.value })}
                  placeholder="Wpisz swoją nazwę..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-slate-200 placeholder-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-800/50"></div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Konfiguracja AI (Gemini Flash Lite)</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between group">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">Mowa na tekst (STT)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Darmowy limit Gemini Lite.</p>
                </div>
                <button 
                  onClick={() => onUpdate({ enableSTT: !settings.enableSTT })}
                  className={`w-12 h-6 rounded-full transition-all relative ${settings.enableSTT ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.enableSTT ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-200">Podsumowania AI</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Generuj skróty jednym kliknięciem.</p>
                </div>
                <button 
                  onClick={() => onUpdate({ enableSummarize: !settings.enableSummarize })}
                  className={`w-12 h-6 rounded-full transition-all relative ${settings.enableSummarize ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.enableSummarize ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-200">Ekstrakcja zadań</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Twórz listy TO-DO z tekstu.</p>
                </div>
                <button 
                  onClick={() => onUpdate({ enableTaskExtraction: !settings.enableTaskExtraction })}
                  className={`w-12 h-6 rounded-full transition-all relative ${settings.enableTaskExtraction ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.enableTaskExtraction ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-200">Automatyczne tytuły</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Inteligentne nazywanie notatek.</p>
                </div>
                <button 
                  onClick={() => onUpdate({ enableAutoTitle: !settings.enableAutoTitle })}
                  className={`w-12 h-6 rounded-full transition-all relative ${settings.enableAutoTitle ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.enableAutoTitle ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20"
          >
            ZAPISZ I ZAMKNIJ
          </button>
        </div>
      </div>
    </div>
  );
};
