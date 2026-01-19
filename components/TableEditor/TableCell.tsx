
import React from 'react';

interface TableCellProps {
  value: string;
  isHeader?: boolean;
  cellKey: string;
  hasComment: boolean;
  hasLink: boolean;
  isDraggingOver: boolean;
  onChange: (val: string) => void;
  onMetaOpen: () => void;
  onLinkOpen?: () => void;
  onRemove?: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export const TableCell: React.FC<TableCellProps> = ({
  value,
  isHeader,
  cellKey,
  hasComment,
  hasLink,
  isDraggingOver,
  onChange,
  onMetaOpen,
  onLinkOpen,
  onRemove,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  const baseClasses = `p-0 border-r border-slate-800/30 last:border-r-0 relative transition-all duration-300 ${isDraggingOver ? 'bg-emerald-500/20 shadow-inner' : ''}`;
  
  if (isHeader) {
    return (
      <th 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`${baseClasses} group min-w-[200px]`}
      >
        <div className="flex items-center bg-transparent group-hover:bg-indigo-500/[0.02] transition-colors relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1">
            <button 
              onClick={onMetaOpen}
              className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all ${
                (hasComment || hasLink) ? 'text-indigo-400 opacity-100 bg-indigo-500/10' : 'text-slate-700 opacity-0 group-hover:opacity-100 hover:text-indigo-500'
              }`}
            >
              <i className={`fas ${hasLink ? 'fa-link' : (hasComment ? 'fa-comment-dots' : 'fa-paperclip')} text-[10px]`}></i>
            </button>
            {hasLink && onLinkOpen && (
              <button 
                onClick={onLinkOpen}
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all"
              >
                <i className="fas fa-external-link-alt text-[8px]"></i>
              </button>
            )}
          </div>
          
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent px-16 py-6 text-[10px] font-black text-indigo-400 uppercase tracking-[0.25em] focus:outline-none focus:text-white transition-all text-center placeholder-slate-700"
            placeholder="Nagłówek..."
          />
          
          {onRemove && (
            <button 
              onClick={onRemove}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 w-8 h-8 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all"
            >
              <i className="fas fa-trash-can text-[10px]"></i>
            </button>
          )}
        </div>
      </th>
    );
  }

  return (
    <td 
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`${baseClasses} group/cell`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent px-6 py-5 text-sm text-slate-400 focus:text-slate-100 focus:outline-none focus:bg-white/[0.02] transition-all placeholder-slate-800"
        placeholder="..."
      />
      
      <div className="absolute top-1.5 right-1.5 flex gap-1">
        {hasLink && onLinkOpen && (
          <button 
            onClick={onLinkOpen}
            className="w-5 h-5 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10 hover:scale-110 transition-all"
          >
            <i className="fas fa-external-link-alt text-[7px]"></i>
          </button>
        )}
        <button 
          onClick={onMetaOpen}
          className={`w-5 h-5 flex items-center justify-center rounded-lg transition-all ${
            (hasComment || hasLink)
              ? 'text-indigo-400 bg-indigo-500/10' 
              : 'opacity-0 group-hover/cell:opacity-100 text-slate-700 hover:text-indigo-500 bg-slate-900/50'
          }`}
        >
          <i className={`fas ${hasLink ? 'fa-link' : 'fa-paperclip'} text-[8px]`}></i>
        </button>
      </div>
      
      {(hasComment || hasLink) && (
        <div className={`absolute top-0 right-0 w-1.5 h-1.5 rounded-bl-full shadow-[0_0_5px_rgba(99,102,241,1)] ${hasLink ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
      )}
    </td>
  );
};
