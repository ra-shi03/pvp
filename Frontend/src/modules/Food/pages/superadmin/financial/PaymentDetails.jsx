import React from 'react';
import { X } from 'lucide-react';

export default function TransactionDetails({ isOpen, onClose, transaction }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[60] bg-zinc-900/60 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[360px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 z-[70] transform transition-transform duration-300 shadow-xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 z-10 sticky top-0">
          <h3 className="font-bold text-sm text-black dark:text-white">Transaction Details</h3>
          <button 
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black/50 dark:text-white/50 transition-colors"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="p-3.5 overflow-y-auto flex-1 space-y-4">
          <div className="space-y-4">
            {/* Section 1: Payment Information */}
            <section className="space-y-2">
              <h4 className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Payment Information</h4>
              <div className="bg-zinc-50 dark:bg-zinc-955 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/50 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Payment ID</span>
                  <span className="font-bold text-black dark:text-white">{transaction?.id || '#PAY-99231'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Gateway ID</span>
                  <span className="font-mono text-[10px] text-black dark:text-white">txn_{transaction?.gateway?.toLowerCase() || 'razor'}_12345</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Method</span>
                  <span className="font-bold text-black dark:text-white">UPI</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Status</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold capitalize">{transaction?.status?.toLowerCase() || 'Success'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Timestamp</span>
                  <span className="text-black dark:text-white font-semibold">2024-05-24 14:30</span>
                </div>
              </div>
            </section>
            
            {/* Section 2: Order Information */}
            <section className="space-y-2">
              <h4 className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Order Information</h4>
              <div className="bg-zinc-50 dark:bg-zinc-955 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/50 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Order</span>
                  <span className="font-bold text-black dark:text-white">{transaction?.orderId || '#PZ-12401'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Store</span>
                  <span className="text-black dark:text-white font-semibold">{transaction?.store || 'Indiranagar HQ'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Customer</span>
                  <span className="text-black dark:text-white font-semibold">{transaction?.customer?.name || 'Rahul Kapoor'}</span>
                </div>
              </div>
            </section>
            
            {/* Section 3: Amount Breakdown */}
            <section className="space-y-2">
              <h4 className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Amount Breakdown</h4>
              <div className="bg-zinc-50 dark:bg-zinc-955 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/50 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Subtotal</span>
                  <span className="text-black dark:text-white font-semibold">₹{((transaction?.amount || 1240) - 140).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/70 dark:text-white/70 font-semibold">Tax</span>
                  <span className="text-black dark:text-white font-semibold">₹140.00</span>
                </div>
                <div className="pt-1.5 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-sm font-black mt-1.5">
                  <span className="text-black dark:text-white">Final</span>
                  <span className="text-black dark:text-white">₹{transaction?.amount?.toFixed(2) || '1240.00'}</span>
                </div>
              </div>
            </section>
            
            {/* Section 4: Audit Trail Timeline */}
            <section className="space-y-2">
              <h4 className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Audit Trail</h4>
              <div className="relative pl-4 space-y-3.5 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-zinc-200 dark:before:bg-zinc-800">
                <div className="relative">
                  <div className="absolute -left-[14px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--primary)] border-2 border-white dark:border-zinc-900"></div>
                  <p className="text-xs font-bold text-black dark:text-white">Payment Created</p>
                  <p className="text-[9px] text-black/50 dark:text-white/50 font-semibold">14:30:01</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[14px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--primary)] border-2 border-white dark:border-zinc-900"></div>
                  <p className="text-xs font-bold text-black dark:text-white">Gateway Callback Received</p>
                  <p className="text-[9px] text-black/50 dark:text-white/50 font-semibold">14:30:05</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[14px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--primary)] border-2 border-white dark:border-zinc-900"></div>
                  <p className="text-xs font-bold text-black dark:text-white">Payment Captured</p>
                  <p className="text-[9px] text-black/50 dark:text-white/50 font-semibold">14:30:08</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
