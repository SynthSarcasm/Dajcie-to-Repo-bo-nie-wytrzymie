
import React from 'react';
import { Note } from '../../types';
import { formatDate } from '../../utils/helpers';

interface NoteFooterProps {
  note: Note;
}

export const NoteFooter: React.FC<NoteFooterProps> = ({ note }) => {
  const charCount = note.type === 'text' ? note.content.length : 0;
  const wordCount = note.type === 'text' ? (note.content.trim() ? note.content.trim().split(/\s+/).length : 0) : 0;

  return (
    <footer className="h-12 flex-shrink-0 flex items-center px-10 bg-slate-950/40 border-t border-white/[0.02]">
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4 text-[9px] font-bold tracking-widest text-slate-500 uppercase">
          <span className="flex items-center gap-1.5">
            <i className="far fa-calendar-alt"></i>
            {formatDate(note.createdAt)}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-800"></span>
          <span className="flex items-center gap-1.5 text-indigo-500/60">
            <i className="fas fa-bolt"></i>
            Gemini Flash Lite
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-[9px] font-bold tracking-widest text-slate-500 uppercase">
          {note.type === 'text' ? (
            <>
              <span>{charCount} znaków</span>
              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
              <span>{wordCount} słów</span>
            </>
          ) : (
            <>
              <span>{note.tableData?.length || 0} wierszy</span>
              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
              <span className="text-indigo-400">{Object.keys(note.tableComments || {}).length + Object.keys(note.tableLinks || {}).length} metadanych</span>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};
