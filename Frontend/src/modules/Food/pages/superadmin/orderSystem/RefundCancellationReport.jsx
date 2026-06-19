import React, { useState, useEffect } from 'react';
import { 
  X, History, FileText, FileDown, TableProperties, 
  Calendar, ChevronDown, Download, CheckCircle, Loader2 
} from 'lucide-react';

export default function RefundCancellationReport({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 10);
      setDownloadComplete(false);
      setIsDownloading(false);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsRendered(false), 300);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col relative z-10 transition-all duration-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Export Report</h2>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Configure your custom refund and cancellation data export.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 dark:text-zinc-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-3.5 space-y-4 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          
          {/* Preset Selection */}
          <section>
            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 mb-2 block uppercase tracking-wider">Quick Presets</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-full border border-[var(--primary)] bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-[10px] font-semibold flex items-center gap-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <History size={14} />
                Last 30 Days
              </button>
              <button className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-[var(--primary)] dark:hover:border-[var(--primary)] transition-colors text-[10px] font-semibold flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800">
                Today's Pending
              </button>
              <button className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-[var(--primary)] dark:hover:border-[var(--primary)] transition-colors text-[10px] font-semibold flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800">
                Monthly Summary
              </button>
            </div>
          </section>

          {/* Row Layout: Format & Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Format */}
            <section>
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 mb-2 block uppercase tracking-wider">File Format</label>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-[var(--primary)] bg-red-50 dark:bg-red-900/20 text-[var(--primary)] transition-colors">
                  <FileText size={16} className="mb-1" />
                  <span className="text-[10px] font-bold">CSV</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-[var(--primary)] text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] transition-colors bg-white dark:bg-zinc-800">
                  <FileDown size={16} className="mb-1" />
                  <span className="text-[10px] font-bold">PDF</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-[var(--primary)] text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] transition-colors bg-white dark:bg-zinc-800">
                  <TableProperties size={16} className="mb-1" />
                  <span className="text-[10px] font-bold">Excel</span>
                </button>
              </div>
            </section>

            {/* Date Range */}
            <section>
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 mb-2 block uppercase tracking-wider">Date Range</label>
              <div className="space-y-2">
                <div className="relative">
                  <input 
                    className="w-full h-9 pl-8 pr-8 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-medium focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all text-zinc-800 dark:text-zinc-100" 
                    type="text" 
                    defaultValue="Oct 01, 2026 - Oct 31, 2026" 
                  />
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </section>
          </div>

          {/* Column Checklist (Bento Style) */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Columns to Include</label>
              <button className="text-[var(--primary)] text-[10px] font-bold hover:underline">Select All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                { label: 'Order ID', checked: true },
                { label: 'Customer Name', checked: true },
                { label: 'Transaction Date', checked: true },
                { label: 'Refund Amount', checked: true },
                { label: 'Status', checked: true },
                { label: 'Reason Code', checked: false },
                { label: 'Store ID', checked: false },
                { label: 'Approver Name', checked: false },
              ].map((col, idx) => (
                <label key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 cursor-pointer transition-all">
                  <input 
                    defaultChecked={col.checked} 
                    className="w-3.5 h-3.5 rounded text-[var(--primary)] border-zinc-300 dark:border-zinc-600 focus:ring-[var(--primary)]" 
                    type="checkbox" 
                  />
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{col.label}</span>
                </label>
              ))}
            </div>
          </section>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col sm:flex-row justify-end gap-2.5 shrink-0">
          <button 
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            disabled={isDownloading}
          >
            Cancel
          </button>
          <button 
            onClick={handleDownload}
            disabled={isDownloading || downloadComplete}
            className={`h-9 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto min-w-[160px] ${
              downloadComplete 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-[var(--primary)] hover:opacity-90 text-white'
            }`}
          >
            {isDownloading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : downloadComplete ? (
              <>
                <CheckCircle size={18} />
                Report Exported
              </>
            ) : (
              <>
                <Download size={18} />
                Generate & Download
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
