import React, { useState } from 'react';
import { 
    RefreshCw, Download, UserPlus, ArrowUp, ArrowDown, 
    Check, Truck, ClipboardList, AlertTriangle, RotateCcw,
    Timer, Activity
} from 'lucide-react';
import DeliveryData from './DeliveryData';
import DeliveryDetails from './DeliveryDetails';
import AssignRider from './AssignRider';

export default function DeliveryManagement() {
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    return (
        <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full flex flex-col xl:flex-row gap-4">
            {/* Main Content Canvas */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-2">
                    <div className="space-y-0.5">
                        <h1 className="text-lg font-bold text-black dark:text-white leading-tight">Delivery Management</h1>
                        <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Monitor, assign and track deliveries across all franchise stores in real time.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-[11px] font-bold shadow-sm active:scale-95 cursor-pointer">
                            <RefreshCw size={12} className="text-black/60 dark:text-white/60" />
                            <span>Refresh</span>
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-[11px] font-bold shadow-sm active:scale-95 cursor-pointer">
                            <Download size={12} className="text-black/60 dark:text-white/60" />
                            <span>Export</span>
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-955 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-[11px] font-bold shadow-sm active:scale-95 cursor-pointer">
                            <span>Bulk Assign</span>
                        </button>
                        <button 
                            onClick={() => setIsAssignModalOpen(true)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition-all text-[11px] font-bold shadow-md active:scale-95 cursor-pointer"
                        >
                            <UserPlus size={14} />
                            <span>Assign Rider</span>
                        </button>
                    </div>
                </div>

                {/* KPI Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4 select-none">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Total Deliveries</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                                <h3 className="text-lg font-black text-black dark:text-white mt-0.5">1,482</h3>
                                <span className="text-emerald-500 font-bold text-[8px] flex items-center gap-0.5">
                                    +12% <ArrowUp size={8} />
                                </span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
                            <Truck size={14} />
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Active Deliveries</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                                <h3 className="text-lg font-black text-[var(--primary)] mt-0.5">42</h3>
                                <span className="text-black/60 dark:text-white/60 font-semibold text-[8px]">LIVE NOW</span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
                            <ClipboardList size={14} />
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Delivered Today</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                                <h3 className="text-lg font-black text-black dark:text-white mt-0.5">1,390</h3>
                                <span className="text-black/60 dark:text-white/60 font-semibold text-[8px]">94% GOAL</span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-100 dark:border-emerald-900/20">
                            <Check size={14} strokeWidth={3} />
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md border-t-2 border-t-red-500">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Failed Deliveries</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                                <h3 className="text-lg font-black text-rose-500 mt-0.5">8</h3>
                                <span className="text-rose-600 dark:text-rose-450 font-bold text-[8px] flex items-center gap-0.5">
                                    -2% <ArrowDown size={8} />
                                </span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-md bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 shrink-0 border border-rose-100 dark:border-rose-900/30">
                            <AlertTriangle size={14} className="stroke-red-500" />
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Avg Time</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                                <h3 className="text-lg font-black text-black dark:text-white mt-0.5">24m</h3>
                                <span className="text-[var(--primary)] font-bold text-[8px]">FASTEST</span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-850 text-black/60 dark:text-white/60 shrink-0 border border-zinc-200 dark:border-zinc-700">
                            <Timer size={14} />
                        </div>
                    </div>
                    {/* Card 6 */}
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">On-Time %</span>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                                <h3 className="text-lg font-black text-black dark:text-white mt-0.5">98.2%</h3>
                                <span className="text-black/60 dark:text-white/60 font-semibold text-[8px]">TARGET 95%</span>
                            </div>
                        </div>
                        <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
                            <Activity size={14} />
                        </div>
                    </div>
                </div>

                {/* Data Component */}
                <DeliveryData onSelectDelivery={setSelectedDelivery} />
            </div>

            {/* Right Activity Sidebar */}
            <aside className="hidden xl:flex flex-col w-[260px] shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden h-[calc(100vh-200px)] sticky top-6">
                <div className="p-3.5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
                    <h3 className="font-bold text-xs text-black dark:text-white">Delivery Activity</h3>
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold border border-emerald-500/20 animate-pulse">LIVE</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3.5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {/* Activity Item */}
                    <div className="flex gap-3 relative">
                        <div className="absolute left-[9px] top-5 bottom-[-16px] w-px bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-5 w-5 rounded-full bg-emerald-500 flex-shrink-0 z-10 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-sm">
                            <Check className="text-white" size={8} strokeWidth={3} />
                        </div>
                        <div className="pt-0.5">
                            <p className="text-[11px] text-black dark:text-white leading-snug"><span className="font-bold">#PV-9819</span> delivered by <span className="font-bold">Jordan S.</span></p>
                            <p className="text-[9px] font-semibold text-black/60 dark:text-white/60 mt-0.5">Just now • East Side Zone</p>
                        </div>
                    </div>

                    {/* Activity Item */}
                    <div className="flex gap-3 relative">
                        <div className="absolute left-[9px] top-5 bottom-[-16px] w-px bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 z-10 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-sm">
                            <Truck className="text-white" size={8} strokeWidth={3} />
                        </div>
                        <div className="pt-0.5">
                            <p className="text-[11px] text-black dark:text-white leading-snug"><span className="font-bold">#PV-9821</span> picked up by <span className="font-bold">Marcus R.</span></p>
                            <p className="text-[9px] font-semibold text-black/60 dark:text-white/60 mt-0.5">4 mins ago • Downtown Store</p>
                        </div>
                    </div>

                    {/* Activity Item */}
                    <div className="flex gap-3 relative">
                        <div className="absolute left-[9px] top-5 bottom-[-16px] w-px bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-5 w-5 rounded-full bg-purple-500 flex-shrink-0 z-10 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-sm">
                            <ClipboardList className="text-white" size={8} strokeWidth={3} />
                        </div>
                        <div className="pt-0.5">
                            <p className="text-[11px] text-black dark:text-white leading-snug"><span className="font-bold">#PV-9823</span> assigned to <span className="font-bold">Lily T.</span></p>
                            <p className="text-[9px] font-semibold text-black/60 dark:text-white/60 mt-0.5">8 mins ago • Auto-assigned</p>
                        </div>
                    </div>

                    {/* Activity Item */}
                    <div className="flex gap-3 relative">
                        <div className="absolute left-[9px] top-5 bottom-[-16px] w-px bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-5 w-5 rounded-full bg-amber-500 flex-shrink-0 z-10 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-sm">
                            <AlertTriangle className="text-white" size={8} strokeWidth={3} />
                        </div>
                        <div className="pt-0.5">
                            <p className="text-[11px] text-black dark:text-white leading-snug"><span className="font-bold">#PV-9822</span> pending for 10+ mins</p>
                            <p className="text-[9px] font-bold text-amber-600 mt-0.5">Critical • Manual action required</p>
                        </div>
                    </div>

                    {/* Activity Item */}
                    <div className="flex gap-3 relative">
                        <div className="h-5 w-5 rounded-full bg-rose-500 flex-shrink-0 z-10 border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-sm">
                            <RotateCcw className="text-white" size={8} strokeWidth={3} />
                        </div>
                        <div className="pt-0.5">
                            <p className="text-[11px] text-black dark:text-white leading-snug"><span className="font-bold">#PV-9818</span> returned to North Hub</p>
                            <p className="text-[9px] font-semibold text-black/60 dark:text-white/60 mt-0.5">22 mins ago • Customer not home</p>
                        </div>
                    </div>
                </div>

                <div className="p-2.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
                    <button className="w-full py-1.5 text-[10px] font-bold text-[var(--primary)] hover:bg-[var(--primary)]/5 border border-transparent hover:border-[var(--primary)]/20 transition-all rounded-lg cursor-pointer">View Full Log</button>
                </div>
            </aside>

            <DeliveryDetails delivery={selectedDelivery} onClose={() => setSelectedDelivery(null)} />
            <AssignRider isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} />
        </div>
    );
}
