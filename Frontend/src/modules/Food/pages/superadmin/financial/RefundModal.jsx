import React from 'react';
import { X } from 'lucide-react';

export default function RefundModal({ isOpen, onClose, transaction }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/60 dark:bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-zinc-900 w-full max-w-sm rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col animate-fade-down">
        <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="font-bold text-sm text-black dark:text-white">Process Refund</h3>
          <button 
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black/50 dark:text-white/50 transition-colors"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="p-3.5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3 p-2.5 bg-zinc-50 dark:bg-zinc-955 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
            <div>
              <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Original Amount</p>
              <p className="font-bold text-xs text-black dark:text-white">₹{transaction?.amount?.toFixed(2) || '1,240.00'}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Remaining Limit</p>
              <p className="font-bold text-xs text-black dark:text-white">₹{transaction?.amount?.toFixed(2) || '1,240.00'}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Refund Amount</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-bold text-xs text-black/50 dark:text-white/50">₹</span>
                <input 
                  className="w-full pl-6 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] font-bold text-xs text-black dark:text-white outline-none transition-colors" 
                  type="text" 
                  defaultValue={transaction?.amount || '1240'}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Refund Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer group">
                  <input defaultChecked className="text-[var(--primary)] focus:ring-[var(--primary)] accent-[var(--primary)]" name="refundType" type="radio"/>
                  <span className="text-xs font-semibold text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white">Full</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer group">
                  <input className="text-[var(--primary)] focus:ring-[var(--primary)] accent-[var(--primary)]" name="refundType" type="radio"/>
                  <span className="text-xs font-semibold text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white">Partial</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Refund Reason</label>
              <select className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs py-1.5 px-2.5 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-black dark:text-white outline-none transition-colors">
                <option>Customer Cancelled</option>
                <option>Food Quality Issue</option>
                <option>Delivery Delay</option>
                <option>Incorrect Order</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-955 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
          <button 
            className="flex-1 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg font-bold text-xs hover:bg-white dark:hover:bg-zinc-800 text-black/70 dark:text-white/70 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-1.5 bg-rose-500 text-white rounded-lg font-bold text-xs hover:bg-rose-600 shadow-sm active:scale-95 transition-all"
            onClick={onClose}
          >
            Confirm Refund
          </button>
        </div>
      </div>
    </div>
  );
}
