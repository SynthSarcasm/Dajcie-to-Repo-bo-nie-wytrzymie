
import React from 'react';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-slate-900 border border-white/5 rounded-[40px] shadow-2xl p-10 text-center animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-xl shadow-red-500/20">
            <i className="fas fa-trash-can text-3xl text-white"></i>
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Trwałe usunięcie</h3>
        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 px-4">
          Czy na pewno chcesz usunąć tę notatkę? <br/>
          <span className="text-red-400/80 font-bold uppercase text-[10px] tracking-widest mt-2 block">Tej operacji nie można cofnąć</span>
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg shadow-red-900/40 active:scale-95"
          >
            Potwierdzam usunięcie
          </button>
          <button 
            onClick={onCancel}
            className="w-full py-4 bg-transparent hover:bg-white/5 text-slate-500 hover:text-slate-300 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95"
          >
            Wróć do edycji
          </button>
        </div>
      </div>
    </div>
  );
};
