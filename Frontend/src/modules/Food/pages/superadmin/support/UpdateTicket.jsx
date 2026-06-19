import React, { useState } from 'react';
import { Edit, X, CheckCircle, Info } from 'lucide-react';

const UpdateTicket = ({ isOpen, onClose, ticketId }) => {
    const [status, setStatus] = useState('open');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-zinc-900/50 dark:bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="w-full max-w-[480px] bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh] min-h-0 relative" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <header className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 shrink-0">
                    <div className="flex items-center gap-1.5">
                        <Edit className="w-5 h-5 text-[var(--primary)]" />
                        <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Update Ticket Status</h1>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-500 dark:text-zinc-400">
                        <X className="w-4 h-4" />
                    </button>
                </header>

                {/* Modal Body */}
                <div className="p-3.5 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0">
                    {/* Ticket Context Small Chip */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded-lg tracking-wider">TICKET {ticketId || '#PIZ-4029'}</span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">System Outage: POS Terminal 04</span>
                    </div>

                    {/* Status Selection Grid */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Choose New Status</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                { id: 'open', label: 'Open', color: 'bg-blue-500' },
                                { id: 'assigned', label: 'Assigned', color: 'bg-purple-500' },
                                { id: 'in_progress', label: 'In Progress', color: 'bg-amber-500' },
                                { id: 'waiting', label: 'Waiting for Customer', color: 'bg-rose-400' },
                                { id: 'resolved', label: 'Resolved', color: 'bg-emerald-500' },
                                { id: 'closed', label: 'Closed', color: 'bg-slate-500' },
                            ].map((s) => (
                                <div key={s.id} className="relative">
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        id={`status-${s.id}`} 
                                        value={s.id} 
                                        checked={status === s.id}
                                        onChange={() => setStatus(s.id)}
                                        className="hidden peer"
                                    />
                                    <label htmlFor={`status-${s.id}`} className="flex items-center justify-between p-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:border-[var(--primary)] transition-all bg-zinc-50 dark:bg-zinc-800/50 group peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/10 peer-checked:border-[var(--primary)]">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${s.color}`}></div>
                                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{s.label}</span>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${status === s.id ? 'border-[var(--primary)] border-[4px]' : 'border-zinc-300 dark:border-zinc-600'}`}></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Internal Note Section */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1 flex justify-between" htmlFor="audit-note">
                            <span>Status Update Note</span>
                            <span className="lowercase italic opacity-60">Required for audit log</span>
                        </label>
                        <textarea 
                            id="audit-note" 
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all outline-none resize-none" 
                            placeholder="Explain the reason for this status change..." 
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Helper info */}
                    <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-2.5 rounded-lg">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="text-[10px] font-bold leading-relaxed">Changing status to 'Resolved' or 'Closed' will notify the franchise owner automatically.</p>
                    </div>
                </div>

                {/* Footer Actions */}
                <footer className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex flex-col sm:flex-row gap-2 justify-end shrink-0">
                    <button onClick={onClose} className="px-4 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors order-2 sm:order-1">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-4 h-8 text-xs font-bold text-white bg-[var(--primary)] rounded-lg hover:shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 order-1 sm:order-2">
                        <CheckCircle className="w-4 h-4" />
                        Update Status
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default UpdateTicket;
