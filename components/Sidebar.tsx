
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Note, NoteType } from '../types';
import { NoteItem } from './Sidebar/NoteItem';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNewNote: (type: NoteType) => void;
  onDeleteNote: (id: string, e: React.MouseEvent) => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onOpenSettings: () => void;
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  notes, 
  activeNoteId, 
  onNoteSelect, 
  onNewNote,
  onDeleteNote,
  onTogglePin,
  onOpenSettings,
  userName
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search on "/" key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredNotes = useMemo(() => {
    return [...notes]
      .filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [notes, searchQuery]);

  const pinnedNotes = useMemo(() => filteredNotes.filter(n => n.isPinned), [filteredNotes]);
  const recentNotes = useMemo(() => filteredNotes.filter(n => !n.isPinned), [filteredNotes]);

  return (
    <div className="w-80 flex-shrink-0 border-r border-white/5 flex flex-col h-full bg-slate-950/95 backdrop-blur-3xl z-20 transition-all duration-500">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="relative">
              {/* Animated Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-60 group-hover:blur-md transition-all duration-500 group-hover:duration-200"></div>
              
              {/* Icon Container */}
              <div className="relative w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-800 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 active:scale-95 border border-white/20">
                {/* Custom Animated Soundwave SVG Logo */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                  <rect x="3" y="10" width="2.5" height="4" rx="1.25" fill="white" className="group-hover:animate-[wave-pulse_1s_infinite_0s]" />
                  <rect x="7.5" y="7" width="2.5" height="10" rx="1.25" fill="white" className="group-hover:animate-[wave-pulse_1s_infinite_0.2s]" />
                  <rect x="12" y="4" width="2.5" height="16" rx="1.25" fill="white" className="group-hover:animate-[wave-pulse_1s_infinite_0.4s]" />
                  <rect x="16.5" y="7" width="2.5" height="10" rx="1.25" fill="white" className="group-hover:animate-[wave-pulse_1s_infinite_0.2s]" />
                  <rect x="21" y="10" width="2.5" height="4" rx="1.25" fill="white" className="group-hover:animate-[wave-pulse_1s_infinite_0s]" />
                  {/* AI Recording Dot */}
                  <circle cx="13.25" cy="12" r="1" fill="white" className="opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                </svg>
                
                {/* Glassmorphism Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-xl"></div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tighter text-white leading-tight">
                VOX<span className="text-indigo-400 group-hover:text-purple-400 transition-colors">PRO</span>
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.25em] group-hover:text-indigo-400 transition-colors">Digital Identity</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1.5">
            <button 
              onClick={() => onNewNote('table')}
              className="w-9 h-9 rounded-xl border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-slate-500 hover:text-indigo-400 transition-all flex items-center justify-center"
              title="Nowa tabela (Ctrl+Shift+T)"
            >
              <i className="fas fa-table-cells text-xs"></i>
            </button>
            <button 
              onClick={() => onNewNote('text')}
              className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center justify-center shadow-lg shadow-indigo-900/30 active:scale-90"
              title="Nowa notatka (Ctrl+N)"
            >
              <i className="fas fa-plus text-xs"></i>
            </button>
          </div>
        </div>

        <div className="relative group">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-indigo-500 transition-colors text-[10px]"></i>
          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj... [/]" 
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:bg-white/[0.05] transition-all text-slate-300 placeholder-slate-700"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-6 pb-6">
        {pinnedNotes.length > 0 && (
          <div className="space-y-1">
            <div className="px-3 mb-2 flex items-center gap-2">
               <i className="fas fa-thumbtack text-[8px] text-indigo-500/50"></i>
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Przypięte</span>
            </div>
            {pinnedNotes.map(note => (
              <NoteItem 
                key={note.id}
                note={note}
                isActive={activeNoteId === note.id}
                onSelect={onNoteSelect}
                onDelete={onDeleteNote}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        )}

        <div className="space-y-1">
          {pinnedNotes.length > 0 && (
            <div className="px-3 mb-2">
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Ostatnie</span>
            </div>
          )}
          
          {recentNotes.length === 0 && pinnedNotes.length === 0 ? (
            <div className="text-center py-20 opacity-30">
              <i className="fas fa-inbox text-2xl mb-4 block text-slate-700"></i>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Brak treści</p>
            </div>
          ) : (
            recentNotes.map(note => (
              <NoteItem 
                key={note.id}
                note={note}
                isActive={activeNoteId === note.id}
                onSelect={onNoteSelect}
                onDelete={onDeleteNote}
                onTogglePin={onTogglePin}
              />
            ))
          )}
        </div>
      </div>
      
      <div className="p-4 bg-slate-950/80 border-t border-white/5 backdrop-blur-lg">
        <div 
          onClick={onOpenSettings}
          className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] cursor-pointer transition-all group active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-colors shadow-inner">
            <i className="fas fa-user text-slate-600 group-hover:text-indigo-400 text-xs"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-slate-400 truncate uppercase tracking-widest group-hover:text-white transition-colors">{userName || 'Gość'}</p>
            <p className="text-[8px] text-slate-700 font-bold uppercase tracking-widest">Premium Active</p>
          </div>
          <i className="fas fa-cog text-[10px] text-slate-800 group-hover:text-indigo-500 transition-all"></i>
        </div>
      </div>

      <style>{`
        @keyframes wave-pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.4); }
        }
      `}</style>
    </div>
  );
};
