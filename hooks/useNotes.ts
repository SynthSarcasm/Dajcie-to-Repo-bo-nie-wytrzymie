
import { useState, useEffect } from 'react';
import { Note, NoteType } from '../types';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ai_notes_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotes(parsed);
        if (parsed.length > 0 && !activeNoteId) setActiveNoteId(parsed[0].id);
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_notes_data', JSON.stringify(notes));
  }, [notes]);

  const createNote = (type: NoteType = 'text') => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      type,
      tableHeaders: type === 'table' ? ['Nagłówek 1', 'Nagłówek 2'] : undefined,
      tableData: type === 'table' ? [['', ''], ['', '']] : undefined,
      createdAt: Date.now(),
      isFavorite: false,
      isPinned: false,
      tags: type === 'table' ? ['tabela'] : []
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => {
      const updated = prev.filter(n => n.id !== id);
      if (activeNoteId === id) {
        setActiveNoteId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
  };

  const togglePin = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const activeNote = notes.find(n => n.id === activeNoteId);

  return {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    updateNote,
    deleteNote,
    togglePin
  };
};
