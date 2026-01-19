
import React, { useState } from 'react';
import { Note, AISettings } from '../types';
import { TableEditor } from './TableEditor';
import { NoteHeader } from './NoteView/NoteHeader';
import { NoteFooter } from './NoteView/NoteFooter';
import { processAIAction } from '../services/geminiService';

interface NoteViewProps {
  note: Note;
  allNotes: Note[];
  settings: AISettings;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onTranscription: (text: string) => void;
  onCopy: () => void;
  onNoteSelect: (id: string) => void;
  copyFeedback: boolean;
}

export const NoteView: React.FC<NoteViewProps> = (props) => {
  const { note, onUpdate, allNotes, onNoteSelect, setIsProcessing, isProcessing, settings } = props;
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const handleAIAction = async (action: 'summarize' | 'tasks') => {
    if (!note.content) return;
    setAiLoading(action);
    setIsProcessing(true);
    try {
      const result = await processAIAction(note.content, action);
      const separator = note.content ? '\n\n---\n' : '';
      const prefix = action === 'summarize' ? '**Podsumowanie AI:**\n' : '**Zadania do zrobienia:**\n';
      onUpdate(note.id, { content: note.content + separator + prefix + result });
    } finally {
      setAiLoading(null);
      setIsProcessing(false);
    }
  };

  const showAIToolbar = note.type === 'text' && note.content.length > 20 && (settings.enableSummarize || settings.enableTaskExtraction);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900/10">
      <NoteHeader {...props} />

      <div className="flex-1 overflow-y-auto custom-scrollbar px-10 py-6">
        <div className="max-w-4xl mx-auto min-h-full flex flex-col">
          
          {/* AI Toolbar */}
          {showAIToolbar && (
            <div className="mb-8 flex gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
              {settings.enableSummarize && (
                <button 
                  onClick={() => handleAIAction('summarize')}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:bg-indigo-500/20 transition-all disabled:opacity-50"
                >
                  {aiLoading === 'summarize' ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-sparkles"></i>}
                  Podsumuj AI
                </button>
              )}
              {settings.enableTaskExtraction && (
                <button 
                  onClick={() => handleAIAction('tasks')}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                >
                  {aiLoading === 'tasks' ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-list-check"></i>}
                  Wyciągnij zadania
                </button>
              )}
            </div>
          )}

          {note.type === 'text' ? (
            <textarea
              value={note.content}
              onChange={(e) => onUpdate(note.id, { content: e.target.value })}
              placeholder="Wypowiedz swoją myśl lub zacznij pisać tutaj..."
              className="flex-1 bg-transparent resize-none text-slate-300 leading-relaxed text-lg font-light placeholder-slate-800/60 border-none focus:outline-none selection:bg-indigo-500/20"
              spellCheck="false"
            />
          ) : (
            <TableEditor 
              headers={note.tableHeaders || []}
              data={note.tableData || []} 
              comments={note.tableComments || {}}
              links={note.tableLinks || {}}
              allNotes={allNotes}
              onNoteSelect={onNoteSelect}
              onChange={(newHeaders, newData, newComments, newLinks) => onUpdate(note.id, { 
                tableHeaders: newHeaders, 
                tableData: newData, 
                tableComments: newComments,
                tableLinks: newLinks
              })}
            />
          )}

          <div className="mt-auto pt-10 pb-6 flex flex-wrap gap-2">
            {note.tags.map((tag, idx) => (
              <span key={idx} className="group px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 hover:border-indigo-500/30 hover:text-indigo-400 transition-all cursor-default">
                <span className="opacity-30">#</span>{tag}
                <button 
                  onClick={() => onUpdate(note.id, { tags: note.tags.filter((_, i) => i !== idx) })} 
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
            <button 
              onClick={() => {
                const tag = prompt("Nazwa tagu:");
                if (tag) onUpdate(note.id, { tags: [...note.tags, tag.replace('#', '').trim()] });
              }}
              className="px-3 py-1 border border-dashed border-white/10 rounded-full text-[9px] font-bold text-slate-600 hover:text-slate-400 hover:border-indigo-500/30 transition-all uppercase tracking-widest flex items-center gap-1.5"
            >
              <i className="fas fa-plus text-[8px]"></i>
              Tag
            </button>
          </div>
        </div>
      </div>

      <NoteFooter note={note} />
    </div>
  );
};
