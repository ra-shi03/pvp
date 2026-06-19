import React, { useState } from 'react';
import { AlertTriangle, Info, X, Zap, Loader2, CheckCircle2 } from 'lucide-react';

const EscalateTicket = ({ isOpen, onClose, ticketId }) => {
    const [isEscalating, setIsEscalating] = useState(false);
    const [escalated, setEscalated] = useState(false);
    const [reason, setReason] = useState('sla');
    
    if (!isOpen) return null;

    const handleEscalate = () => {
        setIsEscalating(true);
        // Simulate API call
        setTimeout(() => {
            setIsEscalating(false);
            setEscalated(true);
            
            setTimeout(() => {
                setEscalated(false);
                onClose();
            }, 1500);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-zinc-900/50 dark:bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg flex flex-col max-h-[90vh] min-h-0 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Urgent Header */}
                <header className="bg-red-600 dark:bg-red-700 px-4 py-2.5 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        <h1 className="text-base font-bold tracking-tight">Escalate High-Priority Issue</h1>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </header>

                {/* Scrollable Content Section */}
                <div className="p-3.5 space-y-4 overflow-y-auto flex-1 min-h-0">
                    {/* SLA Impact Alert Box */}
                    <div className="bg-red-50 dark:bg-red-500/10 p-2.5 rounded-lg flex gap-2.5 border border-red-200 dark:border-red-500/20">
                        <Info className="w-4.5 h-4.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-1 uppercase tracking-wider">Critical Impact Warning</p>
                            <p className="text-red-600 dark:text-red-300 text-xs leading-relaxed">
                                Escalating this ticket will trigger an immediate <span className="font-bold">Level 2 SLA review</span>. Assigned responders will have 15 minutes to acknowledge before automatic senior management notification.
                            </p>
                        </div>
                    </div>

                    {/* Escalation Level Dropdown */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wide">Escalation Level</label>
                        <select className="w-full h-8.5 px-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all text-xs text-zinc-900 dark:text-zinc-50 outline-none appearance-none font-medium">
                            <option value="l1">Level 1: Team Lead Intervention</option>
                            <option value="l2" selected>Level 2: Department Head (Urgent)</option>
                            <option value="l3">Level 3: Executive/CTO Review (Critical)</option>
                        </select>
                    </div>

                    {/* Reason for Escalation (Radio Buttons) */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wide">Reason for Escalation</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <label className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${reason === 'sla' ? 'border-[var(--primary)] bg-blue-50 dark:bg-[var(--primary)]/10 ring-1 ring-[var(--primary)]' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <input type="radio" name="reason" value="sla" checked={reason === 'sla'} onChange={() => setReason('sla')} className="w-3.5 h-3.5 text-[var(--primary)] focus:ring-[var(--primary)] border-zinc-300" />
                                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">SLA Breach</span>
                            </label>
                            <label className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${reason === 'bug' ? 'border-[var(--primary)] bg-blue-50 dark:bg-[var(--primary)]/10 ring-1 ring-[var(--primary)]' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <input type="radio" name="reason" value="bug" checked={reason === 'bug'} onChange={() => setReason('bug')} className="w-3.5 h-3.5 text-[var(--primary)] focus:ring-[var(--primary)] border-zinc-300" />
                                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">Complex Bug</span>
                            </label>
                            <label className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${reason === 'outage' ? 'border-[var(--primary)] bg-blue-50 dark:bg-[var(--primary)]/10 ring-1 ring-[var(--primary)]' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <input type="radio" name="reason" value="outage" checked={reason === 'outage'} onChange={() => setReason('outage')} className="w-3.5 h-3.5 text-[var(--primary)] focus:ring-[var(--primary)] border-zinc-300" />
                                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">Service Outage</span>
                            </label>
                            <label className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${reason === 'other' ? 'border-[var(--primary)] bg-blue-50 dark:bg-[var(--primary)]/10 ring-1 ring-[var(--primary)]' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <input type="radio" name="reason" value="other" checked={reason === 'other'} onChange={() => setReason('other')} className="w-3.5 h-3.5 text-[var(--primary)] focus:ring-[var(--primary)] border-zinc-300" />
                                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">Other</span>
                            </label>
                        </div>
                    </div>

                    {/* Internal Handover Notes */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wide">Internal Handover Notes</label>
                        <textarea className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg p-2.5 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all text-xs text-zinc-900 dark:text-zinc-50 resize-none outline-none" placeholder="Detail the current status, steps taken, and why immediate intervention is required..." rows="3"></textarea>
                    </div>
                </div>

                {/* Footer Actions */}
                <footer className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2 shrink-0">
                    <button onClick={onClose} disabled={isEscalating || escalated} className="px-4 py-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors uppercase tracking-widest disabled:opacity-50">
                        Cancel
                    </button>
                    <button 
                        onClick={handleEscalate}
                        disabled={isEscalating || escalated}
                        className={`px-5 h-8.5 rounded-lg text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-md transition-all active:scale-95 ${escalated ? 'bg-green-600' : 'bg-[var(--primary)] hover:brightness-110'} disabled:active:scale-100 disabled:opacity-90`}
                    >
                        {isEscalating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : escalated ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Escalated</span>
                            </>
                        ) : (
                            <>
                                <span>Escalate Now</span>
                                <Zap className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EscalateTicket;
