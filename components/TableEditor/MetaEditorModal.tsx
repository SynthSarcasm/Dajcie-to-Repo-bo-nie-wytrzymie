
import React, { useState } from 'react';
import { Note } from '../../types';

interface MetaEditorModalProps {
  activeKey: string;
  initialComment: string;
  linkedNoteId?: string;
  allNotes: Note[];
  onSave: (comment: string) => void;
  onLink: (noteId: string) => void;
  onUnlink: () => void;
  onClose: () => void;
}

export const MetaEditorModal: React.FC<MetaEditorModalProps> = ({
  activeKey,
  initialComment,
  linkedNoteId,
  allNotes,
  onSave,
  onLink,
  onUnlink,
  onClose
}) => {
  const [tempComment, setTempComment] = useState(initialComment);

  const availableNotes = allNotes.filter(n => n.type === 'text' && n.title !== "").slice(0, 5);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-slate-900 border border-indigo-500/30 rounded-[32px] shadow-2xl p-8 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <i className="fas fa-link text-sm"></i>
            </div>
            <div>
               <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-0.5">Kontekst elementu</h4>
               <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{activeKey}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Dodaj szybki opis</label>
            <textarea 
              autoFocus
              value={tempComment}
              onChange={e => setTempComment(e.target.value)}
              placeholder="Co chcesz tutaj zapisać?"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all min-h-[100px] resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Podepnij istniejącą notatkę</label>
            {linkedNoteId ? (
              <div className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
                <div className="flex items-center gap-3">
                   <i className="fas fa-file-lines text-indigo-400 text-xs"></i>
                   <span className="text-xs font-bold text-indigo-200 truncate">
                    {allNotes.find(n => n.id === linkedNoteId)?.title || 'Nieznana notatka'}
                   </span>
                </div>
                <button 
                  onClick={onUnlink}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <i className="fas fa-unlink text-[9px]"></i>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {availableNotes.map(note => (
                  <button 
                    key={note.id}
                    onClick={() => onLink(note.id)}
                    className="w-full flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-indigo-500/10 border border-slate-800/60 hover:border-indigo-500/40 rounded-2xl transition-all group text-left"
                  >
                    <i className="fas fa-plus text-[10px] text-slate-600 group-hover:text-indigo-400"></i>
                    <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 truncate">{note.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => onSave(tempComment)}
          className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-900/20"
        >
          Zapisz zmiany
        </button>
      </div>
    </div>
  );
};
