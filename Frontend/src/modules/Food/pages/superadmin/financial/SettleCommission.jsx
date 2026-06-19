import React, { useState, useRef } from 'react';
import { X, Wallet, Upload, CheckCircle } from 'lucide-react';

export default function SettleCommission({ isOpen, onClose }) {
  const [fileName, setFileName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSaveDraft = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose(); // Optional: close after saving
    }, 3000);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-900/40 dark:bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal / Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 translate-x-0 overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors active:scale-90 text-black/50 dark:text-white/50"
            >
              <X size={14} />
            </button>
            <h2 className="text-sm font-bold text-black dark:text-white">Settle Commission</h2>
          </div>
          <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
            <img 
              alt="Admin" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE4KQYiVmI4p1-utmceNN_JySycCdWZgHfDmFOpXoHyxiSwcpSaLs28tvLt0djQbmW0wSUYe0tYStqwNr6S4Icr2bCeoLz8O9W1W-G19xszug580pTBKsm-rPzjsqwBOA19QKfgMswZ4b3UTtK1FAHnYbgLeJ2Lt-70uygi-LIeGCrARpxW8wO2ePS6yfsTwwzapgq5tFozWwSJwFJmlLNxtxBXuPE15G9RmES2azZB5nVKUkUoXOibcmq7WryMtr-x8rRdnrzj-c" 
            />
          </div>
        </header>

        <main className="flex-1 p-3.5 space-y-4">
          {/* Summary Card */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/5 px-2.5 py-1.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5">
              <Wallet className="text-[var(--primary)]" size={14} />
              <span className="text-[9px] font-bold text-[var(--primary)] uppercase tracking-wider">Settlement Summary</span>
            </div>
            <div className="p-2.5 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[9px] font-bold text-black/50 dark:text-white/50 mb-0.5 uppercase tracking-wider">Commission</p>
                <p className="text-sm font-black text-black dark:text-white">₹1,240</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-black/50 dark:text-white/50 mb-0.5 uppercase tracking-wider">Franchise Share</p>
                <p className="text-sm font-black text-[var(--primary)]">₹11,160</p>
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-955 px-2.5 py-1.5 flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-black/50 dark:text-white/50">Franchise Unit:</span>
              <span className="font-mono text-xs font-bold text-black dark:text-white">North Region #402</span>
            </div>
          </section>

          {/* Settlement Form */}
          <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Settlement Date */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Settlement Date</label>
              <input 
                type="date" 
                defaultValue="2023-11-24"
                className="w-full h-9 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs font-semibold focus:border-[var(--primary)] focus:ring-[var(--primary)] outline-none transition-all text-black dark:text-white" 
              />
            </div>

            {/* Transfer Reference */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Transfer Ref #</label>
              <input 
                type="text" 
                placeholder="e.g. TRF-9082341"
                className="w-full h-9 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs font-semibold focus:border-[var(--primary)] focus:ring-[var(--primary)] outline-none transition-all text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30" 
              />
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Payment Method</label>
              <select className="w-full h-9 px-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs font-semibold focus:border-[var(--primary)] focus:ring-[var(--primary)] outline-none transition-all text-black dark:text-white appearance-none pr-8 relative"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23737688%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.6rem top 50%', backgroundSize: '0.6rem auto' }}>
                <option value="imps">IMPS Transfer</option>
                <option value="neft">NEFT / RTGS</option>
                <option value="upi">UPI Business</option>
                <option value="cheque">Corporate Cheque</option>
              </select>
            </div>

            {/* Bank Reference */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Bank Reference</label>
              <input 
                type="text" 
                placeholder="Enter bank transaction ID"
                className="w-full h-9 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs font-semibold focus:border-[var(--primary)] focus:ring-[var(--primary)] outline-none transition-all text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30" 
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Upload Bank Receipt</label>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors group ${fileName ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                onClick={() => fileInputRef.current.click()}
              >
                {fileName ? (
                  <CheckCircle className="text-[var(--primary)] mb-1.5 group-hover:scale-110 transition-transform" size={20} />
                ) : (
                  <Upload className="text-[var(--primary)] mb-1.5 group-hover:scale-110 transition-transform" size={20} />
                )}
                <p className="font-bold text-xs text-black dark:text-white text-center">{fileName || 'Tap to upload receipt'}</p>
                <p className="text-[9px] text-black/50 dark:text-white/50 mt-0.5">PDF, JPG or PNG (Max 5MB)</p>
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Settlement Notes */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Settlement Notes</label>
              <textarea 
                rows="2"
                placeholder="Optional internal comments regarding this settlement cycle..."
                className="w-full p-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs font-semibold focus:border-[var(--primary)] focus:ring-[var(--primary)] outline-none transition-all resize-none text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2 pb-4">
              <button 
                type="submit"
                className="w-full h-9 bg-[var(--primary)] text-white font-bold rounded-lg shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5 hover:brightness-110 text-xs"
              >
                Confirm Settlement
              </button>
              <button 
                type="button"
                onClick={handleSaveDraft}
                className="w-full h-9 border border-zinc-200 dark:border-zinc-700 text-black/70 dark:text-white/70 font-bold rounded-lg active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs"
              >
                Save Draft
              </button>
            </div>
          </form>

          {/* Subtle Footer Info */}
          <footer className="text-center pb-4 border-t border-zinc-100 dark:border-zinc-850 pt-4">
            <p className="text-[10px] text-black/50 dark:text-white/50 font-bold">
              All settlements are audited against <span className="font-mono text-black dark:text-white">v2.4.0</span> logic.
            </p>
          </footer>
        </main>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 z-[80] ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <CheckCircle size={16} className="text-emerald-400 dark:text-emerald-500" />
        <span className="text-xs font-semibold">Settlement saved as draft</span>
      </div>
    </>
  );
}
