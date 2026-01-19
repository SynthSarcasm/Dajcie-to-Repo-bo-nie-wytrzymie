
import { useState, useRef, useCallback } from 'react';
import { transcribeAudio } from '../services/geminiService';
import { AISettings } from '../types';

export const useVoiceRecorder = (settings: AISettings, onTranscriptionComplete: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<'uploading' | 'analyzing' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    if (!settings.enableSTT) return;
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setError("Błąd mikrofonu");
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isRecording]);

  const processAudio = async (blob: Blob) => {
    setIsProcessing(true);
    setProcessingStatus('uploading');
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        setProcessingStatus('analyzing');
        try {
          const transcription = await transcribeAudio(base64Audio, blob.type, settings);
          onTranscriptionComplete(transcription);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsProcessing(false);
          setProcessingStatus(null);
        }
      };
    } catch (error) {
      setError("Błąd pliku");
      setIsProcessing(false);
      setProcessingStatus(null);
    }
  };

  return {
    isRecording,
    recordingTime,
    isProcessing,
    processingStatus,
    error,
    startRecording,
    stopRecording
  };
};
