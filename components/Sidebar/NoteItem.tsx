
import React from 'react';
import { Note } from '../../types';
import { formatDate } from '../../utils/helpers';

interface NoteItemProps {
  note: Note;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onTogglePin?: (id: string, e: React.MouseEvent) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, isActive, onSelect, onDelete, onTogglePin }) => {
  return (
    <div
      onClick={() => onSelect(note.id)}
      className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 active:scale-[0.98] border ${
        isActive 
          ? 'bg-indigo-600/15 border-indigo-500/40 shadow-lg shadow-indigo-900/10' 
          : 'bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/[0.08]'
      }`}
    >
      <div className="flex justify-between items-start mb-1.5">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-slate-800'}`}></div>
          <h3 className={`font-bold text-sm truncate pr-12 transition-colors ${
            isActive ? 'text-indigo-300' : 'text-slate-300 group-hover:text-white'
          }`}>
            {note.title || (note.type === 'table' ? 'Arkusz bez nazwy' : 'Nowa myśl')}
          </h3>
        </div>
        
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onTogglePin && (
            <button 
              onClick={(e) => onTogglePin(note.id, e)}
              className={`p-2 rounded-lg transition-all ${note.isPinned ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10'}`}
              title={note.isPinned ? "Odepnij" : "Przypnij"}
            >
              <i className={`fas fa-thumbtack text-[10px] ${note.isPinned ? '' : 'rotate-45'}`}></i>
            </button>
          )}
          <button 
            onClick={(e) => onDelete(note.id, e)}
            className="text-slate-600 hover:text-red-400 transition-all p-2 rounded-lg hover:bg-red-500/10"
            title="Usuń"
          >
            <i className="fas fa-trash-can text-[10px]"></i>
          </button>
        </div>
      </div>
      
      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium mb-3">
        {note.type === 'table' 
          ? `${note.tableData?.length || 0} wierszy danych` 
          : (note.content || 'Pusta notatka...')}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-[9px] text-slate-700 font-black uppercase tracking-widest group-hover:text-slate-500 transition-colors">
          {formatDate(note.createdAt)}
        </span>
        <div className="flex items-center gap-2">
          {note.isPinned && <i className="fas fa-thumbtack text-indigo-500/50 text-[9px]"></i>}
          {note.type === 'table' && <i className="fas fa-table-cells text-indigo-500/30 text-[9px]"></i>}
          {note.isFavorite && <i className="fas fa-star text-amber-500 text-[9px]"></i>}
        </div>
      </div>
    </div>
  );
};
