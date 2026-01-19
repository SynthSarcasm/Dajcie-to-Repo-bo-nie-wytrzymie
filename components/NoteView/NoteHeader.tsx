
import React, { useEffect, useRef } from 'react';
import { Note, AISettings } from '../../types';

interface NoteHeaderProps {
  note: Note;
  settings: AISettings;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onTranscription: (text: string) => void;
  onCopy: () => void;
  copyFeedback: boolean;
}

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  note,
  onUpdate,
  onCopy,
  copyFeedback
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Focus title if it's empty (new note)
  useEffect(() => {
    if (note.title === '') {
      titleInputRef.current?.focus();
    }
  }, [note.id]);

  return (
    <header className="h-24 flex-shrink-0 flex items-center px-10 border-b border-white/[0.03] bg-white/[0.01]">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-8">
        <div className="flex-1 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${note.type === 'table' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-slate-800/40 border-slate-700/50 text-slate-500'}`}>
            <i className={`fas ${note.type === 'table' ? 'fa-table-cells' : 'fa-file-lines'} text-sm`}></i>
          </div>
          <input
            ref={titleInputRef}
            type="text"
            value={note.title}
            onChange={(e) => onUpdate(note.id, { title: e.target.value })}
            placeholder={note.type === 'table' ? "Tytuł arkusza..." : "Nazwa notatki..."}
            className="flex-1 bg-transparent text-2xl font-black text-white placeholder-slate-800 border-none focus:outline-none tracking-tighter transition-all focus:placeholder-slate-700"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] rounded-2xl p-1.5 shadow-inner">
            <button 
              onClick={onCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 ${
                copyFeedback 
                  ? 'bg-emerald-500/15 text-emerald-400' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`fas ${copyFeedback ? 'fa-check' : 'fa-copy'}`}></i>
              {copyFeedback ? 'Skopiowano' : 'Kopiuj'}
            </button>
            <button 
              onClick={() => onUpdate(note.id, { isFavorite: !note.isFavorite })}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90 ${note.isFavorite ? 'text-amber-500 bg-amber-500/15 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
              title={note.isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            >
              <i className={`${note.isFavorite ? 'fas' : 'far'} fa-star text-xs`}></i>
            </button>
            <button 
              onClick={() => onUpdate(note.id, { isPinned: !note.isPinned })}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-90 ${note.isPinned ? 'text-indigo-400 bg-indigo-500/15' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
              title={note.isPinned ? "Odepnij" : "Przypnij"}
            >
              <i className={`fas fa-thumbtack text-xs ${note.isPinned ? '' : 'rotate-45'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
