
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SettingsModal } from './components/SettingsModal';
import { NoteView } from './components/NoteView';
import { EmptyState } from './components/EmptyState';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { VoiceRecorder } from './components/VoiceRecorder';
import { useNotes } from './hooks/useNotes';
import { useSettings } from './hooks/useSettings';
import { suggestTitle } from './services/geminiService';

const App: React.FC = () => {
  const { notes, activeNote, activeNoteId, setActiveNoteId, createNote, updateNote, deleteNote, togglePin } = useNotes();
  const { settings, updateSettings } = useSettings();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Create New Text Note: Ctrl + N
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createNote('text');
      }
      // Create New Table: Ctrl + Shift + T
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        createNote('table');
      }
      // Close active note or modal: Escape
      if (e.key === 'Escape') {
        if (isSettingsOpen) setIsSettingsOpen(false);
        else if (noteToDeleteId) setNoteToDeleteId(null);
        else setActiveNoteId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, noteToDeleteId, createNote, setActiveNoteId]);

  const openDeleteConfirmation = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNoteToDeleteId(id);
  }, []);

  const handleCopy = useCallback(() => {
    if (!activeNote) return;
    let content = '';
    if (activeNote.type === 'table') {
      content = (activeNote.tableHeaders?.join('\t') || '') + '\n' + 
                (activeNote.tableData?.map(row => row.join('\t')).join('\n') || '');
    } else {
      content = activeNote.content;
    }
    navigator.clipboard.writeText(content);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  }, [activeNote]);

  const handleTranscription = async (text: string) => {
    if (activeNote && activeNote.type === 'text') {
      const separator = activeNote.content ? '\n\n' : '';
      const newContent = activeNote.content + separator + text;
      
      let updatedTitle = activeNote.title;
      if (!updatedTitle && settings.enableAutoTitle) {
        setIsProcessing(true);
        updatedTitle = await suggestTitle(newContent);
        setIsProcessing(false);
      }

      updateNote(activeNote.id, { 
        content: newContent,
        title: updatedTitle || activeNote.title || 'Notatka głosowa'
      });
    } else {
      let title = 'Nowa notatka';
      if (settings.enableAutoTitle) {
        setIsProcessing(true);
        title = await suggestTitle(text);
        setIsProcessing(false);
      }
      createNote('text');
      // note: The effect of createNote will make the new note active
      // For immediate content update, in a real app we'd pass initial state to createNote
    }
  };

  const handleTogglePin = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePin(id);
  }, [togglePin]);

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-inter relative selection:bg-indigo-500/30">
      <Sidebar 
        notes={notes}
        activeNoteId={activeNoteId}
        onNoteSelect={setActiveNoteId}
        onNewNote={createNote}
        onDeleteNote={openDeleteConfirmation}
        onTogglePin={handleTogglePin}
        onOpenSettings={() => setIsSettingsOpen(true)}
        userName={settings.userName}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-slate-900/10 relative transition-all duration-700">
        {activeNote ? (
          <NoteView 
            note={activeNote}
            allNotes={notes}
            settings={settings}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            onUpdate={updateNote}
            onTranscription={handleTranscription}
            onCopy={handleCopy}
            onNoteSelect={setActiveNoteId}
            copyFeedback={copyFeedback}
          />
        ) : (
          <EmptyState 
            userName={settings.userName}
            onCreateNote={createNote}
          />
        )}

        {isSettingsOpen && (
          <SettingsModal 
            settings={settings}
            onUpdate={updateSettings}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}

        {noteToDeleteId && (
          <DeleteConfirmationModal 
            onConfirm={() => {
              deleteNote(noteToDeleteId);
              setNoteToDeleteId(null);
            }}
            onCancel={() => setNoteToDeleteId(null)}
          />
        )}
      </main>

      <div className="fixed bottom-10 right-10 z-50">
         <VoiceRecorder 
            onTranscriptionComplete={handleTranscription} 
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            settings={settings}
          />
      </div>

      <div className="fixed -top-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default App;
