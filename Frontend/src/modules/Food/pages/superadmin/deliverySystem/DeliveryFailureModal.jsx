import React from 'react';
import { X, AlertTriangle, Info, ChevronDown, Camera, ShieldAlert } from 'lucide-react';

export default function DeliveryFailureModal({ isOpen, onClose, orderId }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800">
                
                {/* Modal Header */}
                <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-rose-500" size={18} />
                        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Mark Delivery Failed</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <X size={16} />
                    </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-3.5 space-y-4">
                    {/* Alert Banner */}
                    <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 rounded-lg p-2.5 flex gap-3 shadow-sm">
                        <Info className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-xs font-medium text-rose-700 dark:text-rose-400 leading-relaxed">
                            Confirming failure will notify the customer and trigger the return-to-warehouse protocol for Order <span className="font-bold">{orderId || '#ORD-8821'}</span>.
                        </p>
                    </div>
                    
                    {/* Form Field: Reason */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Failure Reason</label>
                        <div className="relative">
                            <select className="w-full h-8 px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none appearance-none cursor-pointer text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-sm transition-all">
                                <option disabled selected value="">Select a reason...</option>
                                <option>Customer Unreachable</option>
                                <option>Wrong Address</option>
                                <option>Vehicle Breakdown</option>
                                <option>Safety / Access Issue</option>
                                <option>Customer Refused Delivery</option>
                                <option>Damaged Item</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" size={14} />
                        </div>
                    </div>
                    
                    {/* Form Field: Notes */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Notes</label>
                        <textarea 
                            className="w-full p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none min-h-[60px] text-xs font-medium text-zinc-800 dark:text-zinc-200 resize-none shadow-sm transition-all placeholder:text-zinc-400" 
                            placeholder="Provide additional context for the dispatch team..."
                        ></textarea>
                    </div>
                    
                    {/* Form Field: Photo Proof */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Photo Proof Upload</label>
                        <div className="border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-4 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer group">
                            <div className="w-8 h-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Camera className="text-[var(--primary)]" size={16} />
                            </div>
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Click to upload or drag photo</span>
                            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-1">Supports JPG, PNG (Max 5MB)</span>
                        </div>
                    </div>
                </div>
                
                {/* Modal Footer */}
                <div className="px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2.5">
                    <button 
                        onClick={onClose}
                        className="px-4 h-8 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 text-xs font-bold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-95 shadow-sm"
                    >
                        Cancel
                    </button>
                    <button className="px-4 h-8 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-rose-600 transition-all active:scale-95 flex items-center gap-1.5">
                        <ShieldAlert size={14} />
                        Save Failure
                    </button>
                </div>
            </div>
        </div>
    );
}
