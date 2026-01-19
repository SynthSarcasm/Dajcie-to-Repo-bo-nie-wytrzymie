
import { useState, useEffect } from 'react';
import { AISettings } from '../types';

const DEFAULT_SETTINGS: AISettings = {
  enableSTT: true,
  enableAutoTitle: true,
  enableSmartFormatting: true,
  enableSummarize: true,
  enableTaskExtraction: true,
  userName: 'Gość'
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = localStorage.getItem('ai_notes_settings');
    if (saved) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_notes_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<AISettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings };
};
