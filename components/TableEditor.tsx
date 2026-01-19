
import React, { useState } from 'react';
import { Note } from '../types';
import { MetaEditorModal } from './TableEditor/MetaEditorModal';
import { TableCell } from './TableEditor/TableCell';

interface TableEditorProps {
  headers: string[];
  data: string[][];
  comments?: { [key: string]: string };
  links?: { [key: string]: string };
  allNotes: Note[];
  onNoteSelect: (id: string) => void;
  onChange: (newHeaders: string[], newData: string[][], newComments?: { [key: string]: string }, newLinks?: { [key: string]: string }) => void;
}

export const TableEditor: React.FC<TableEditorProps> = ({ 
  headers, 
  data, 
  comments = {}, 
  links = {}, 
  allNotes,
  onNoteSelect,
  onChange 
}) => {
  const [activeMetaKey, setActiveMetaKey] = useState<string | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const tableHeaders = headers && headers.length > 0 ? headers : ['Nagłówek 1', 'Nagłówek 2'];
  const tableData = data && data.length > 0 ? data : [['', ''], ['', '']];

  // Helper functions
  const updateHeader = (colIdx: number, val: string) => {
    const newHeaders = [...tableHeaders];
    newHeaders[colIdx] = val;
    onChange(newHeaders, tableData, comments, links);
  };

  const updateCell = (rowIdx: number, colIdx: number, val: string) => {
    const newData = tableData.map((r, rIdx) => 
      rIdx === rowIdx ? r.map((c, cIdx) => cIdx === colIdx ? val : c) : r
    );
    onChange(tableHeaders, newData, comments, links);
  };

  const handleMetaSave = (newComment: string) => {
    if (!activeMetaKey) return;
    const newComments = { ...comments };
    if (newComment.trim()) newComments[activeMetaKey] = newComment;
    else delete newComments[activeMetaKey];
    onChange(tableHeaders, tableData, newComments, links);
    setActiveMetaKey(null);
  };

  const handleLinkNote = (noteId: string) => {
    if (!activeMetaKey) return;
    const newLinks = { ...links, [activeMetaKey]: noteId };
    onChange(tableHeaders, tableData, comments, newLinks);
  };

  const handleUnlink = () => {
    if (!activeMetaKey) return;
    const newLinks = { ...links };
    delete newLinks[activeMetaKey];
    onChange(tableHeaders, tableData, comments, newLinks);
  };

  const addRow = () => onChange(tableHeaders, [...tableData, new Array(tableHeaders.length).fill('')], comments, links);
  const addColumn = () => onChange([...tableHeaders, `Kolumna ${tableHeaders.length + 1}`], tableData.map(r => [...r, '']), comments, links);
  
  const removeRow = (idx: number) => {
    if (tableData.length <= 1) return;
    onChange(tableHeaders, tableData.filter((_, i) => i !== idx), comments, links);
  };

  const removeColumn = (idx: number) => {
    if (tableHeaders.length <= 1) return;
    onChange(tableHeaders.filter((_, i) => i !== idx), tableData.map(r => r.filter((_, i) => i !== idx)), comments, links);
  };

  return (
    <div className="w-full pb-10 animate-in fade-in slide-in-from-bottom-2 duration-700 relative">
      {activeMetaKey && (
        <MetaEditorModal 
          activeKey={activeMetaKey}
          initialComment={comments[activeMetaKey] || ""}
          linkedNoteId={links[activeMetaKey]}
          allNotes={allNotes}
          onSave={handleMetaSave}
          onLink={handleLinkNote}
          onUnlink={handleUnlink}
          onClose={() => setActiveMetaKey(null)}
        />
      )}

      <div className="overflow-x-auto custom-scrollbar rounded-[32px] border border-slate-800/40 bg-slate-900/10 backdrop-blur-sm shadow-2xl shadow-indigo-950/10">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800/60 bg-slate-900/20">
              <th className="w-16 p-4 text-center border-r border-slate-800/40">
                 <div className="w-7 h-7 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto shadow-inner">
                    <i className="fas fa-hashtag text-[9px] text-indigo-500/60"></i>
                 </div>
              </th>
              {tableHeaders.map((header, colIdx) => {
                const key = `col-${colIdx}`;
                return (
                  <TableCell 
                    key={key}
                    isHeader
                    cellKey={key}
                    value={header}
                    hasComment={!!comments[key]}
                    hasLink={!!links[key]}
                    isDraggingOver={dragOverKey === key}
                    onChange={(val) => updateHeader(colIdx, val)}
                    onMetaOpen={() => setActiveMetaKey(key)}
                    onLinkOpen={links[key] ? () => onNoteSelect(links[key]) : undefined}
                    onRemove={() => removeColumn(colIdx)}
                    onDragOver={(e) => { e.preventDefault(); setDragOverKey(key); }}
                    onDragLeave={() => setDragOverKey(null)}
                    onDrop={(e) => { e.preventDefault(); setDragOverKey(null); const id = e.dataTransfer.getData('noteId'); if(id) handleLinkNote(id); }}
                  />
                );
              })}
              <th className="w-16 p-0 bg-indigo-500/[0.02]">
                <button onClick={addColumn} className="w-full h-full py-6 text-slate-700 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all flex items-center justify-center">
                  <i className="fas fa-plus-circle text-lg"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIdx) => (
              <tr key={`row-${rowIdx}`} className="group/row border-b border-slate-800/30 last:border-b-0 hover:bg-indigo-500/[0.01] transition-colors">
                <td className="p-4 text-center relative border-r border-slate-800/40 bg-slate-900/10">
                   <span className="text-[10px] font-black text-slate-700 group-hover/row:opacity-0 transition-opacity">{rowIdx + 1}</span>
                   <button onClick={() => removeRow(rowIdx)} className="absolute inset-2 opacity-0 group-hover/row:opacity-100 flex items-center justify-center text-red-500/70 hover:text-red-500 transition-all rounded-xl bg-red-500/10">
                    <i className="fas fa-trash-can text-[10px]"></i>
                  </button>
                </td>
                {row.map((cell, colIdx) => {
                  const key = `cell-${rowIdx}-${colIdx}`;
                  return (
                    <TableCell 
                      key={key}
                      cellKey={key}
                      value={cell}
                      hasComment={!!comments[key]}
                      hasLink={!!links[key]}
                      isDraggingOver={dragOverKey === key}
                      onChange={(val) => updateCell(rowIdx, colIdx, val)}
                      onMetaOpen={() => setActiveMetaKey(key)}
                      onLinkOpen={links[key] ? () => onNoteSelect(links[key]) : undefined}
                      onDragOver={(e) => { e.preventDefault(); setDragOverKey(key); }}
                      onDragLeave={() => setDragOverKey(null)}
                      onDrop={(e) => { e.preventDefault(); setDragOverKey(null); const id = e.dataTransfer.getData('noteId'); if(id) handleLinkNote(id); }}
                    />
                  );
                })}
                <td className="bg-slate-900/5"></td>
              </tr>
            ))}
            <tr className="bg-indigo-500/[0.01]">
              <td className="p-0 border-r border-slate-800/40">
                <button onClick={addRow} className="w-full py-5 text-slate-700 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all flex items-center justify-center">
                  <i className="fas fa-plus-circle text-lg"></i>
                </button>
              </td>
              <td colSpan={tableHeaders.length + 1} className="bg-slate-950/20"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
