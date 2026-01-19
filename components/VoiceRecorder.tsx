
import React from 'react';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { AISettings } from '../types';

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  settings: AISettings;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onTranscriptionComplete, 
  isProcessing: externalProcessing,
  setIsProcessing: setExternalProcessing,
  settings
}) => {
  const {
    isRecording,
    recordingTime,
    isProcessing: internalProcessing,
    processingStatus,
    error,
    startRecording,
    stopRecording
  } = useVoiceRecorder(settings, (text) => {
    onTranscriptionComplete(text);
    setExternalProcessing(false);
  });

  React.useEffect(() => {
    if (internalProcessing) setExternalProcessing(true);
  }, [internalProcessing, setExternalProcessing]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isAnyProcessing = externalProcessing || internalProcessing;

  return (
    <div className="flex items-center gap-3">
      {error && (
        <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-3 py-1.5 rounded-xl uppercase tracking-widest animate-pulse border border-red-500/20 backdrop-blur-md">
          {error}
        </span>
      )}

      {isRecording && (
        <div className="flex items-center gap-4 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in fade-in zoom-in duration-300 backdrop-blur-md shadow-2xl shadow-red-900/20">
          <div className="flex gap-1 items-center h-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div 
                key={i} 
                className="w-1 bg-red-500 rounded-full animate-wave-bar" 
                style={{ 
                  height: `${40 + Math.random() * 60}%`, 
                  animationDuration: `${0.4 + (i % 3) * 0.2}s`,
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>
          <span className="text-red-500 font-mono text-xs font-black tracking-tight">{formatTime(recordingTime)}</span>
        </div>
      )}
      
      {isAnyProcessing && (
        <div className="flex items-center gap-4 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl animate-in slide-in-from-right duration-500 backdrop-blur-md shadow-2xl shadow-indigo-900/20">
          <div className="relative">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-2 h-2 bg-indigo-500 rounded-full blur-[4px]"></div>
          </div>
          <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
            {processingStatus === 'uploading' ? 'Szyfrowanie...' : 'AI Myśli...'}
          </span>
        </div>
      )}

      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isAnyProcessing}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 transform shadow-2xl ${
          isRecording 
            ? 'bg-red-600 scale-110 shadow-red-900/40' 
            : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40 hover:-translate-y-1 hover:rotate-3 active:scale-90 active:rotate-0'
        } ${isAnyProcessing ? 'opacity-20 cursor-wait' : ''}`}
      >
        <div className="relative">
            {isRecording && <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 scale-150"></div>}
            <i className={`fas ${isRecording ? 'fa-square text-sm' : 'fa-microphone text-xl'} text-white relative z-10`}></i>
        </div>
      </button>

      <style>{`
        @keyframes wave-bar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
        }
        .animate-wave-bar {
          animation: wave-bar 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
