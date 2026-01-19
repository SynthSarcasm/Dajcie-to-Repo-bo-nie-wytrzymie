
export type NoteType = 'text' | 'table';

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  tableHeaders?: string[]; // Tablica nazw nagłówków
  tableData?: string[][];  // Dane (wiersze)
  tableComments?: { [key: string]: string }; // Notatki tekstowe (komentarze)
  tableLinks?: { [key: string]: string };    // ID powiązanych notatek: { 'cell-0-1': 'noteId_123' }
  createdAt: number;
  isFavorite: boolean;
  isPinned: boolean;
  tags: string[];
}

export interface AISettings {
  enableSTT: boolean;
  enableAutoTitle: boolean;
  enableSmartFormatting: boolean;
  enableSummarize: boolean;
  enableTaskExtraction: boolean;
  userName: string;
}

export interface TranscriptionResponse {
  text: string;
  success: boolean;
  error?: string;
}
