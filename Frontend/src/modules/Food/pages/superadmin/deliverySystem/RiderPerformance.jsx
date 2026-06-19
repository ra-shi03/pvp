import React from 'react';
import { X, Truck, CheckCircle2, Clock, Star, CheckSquare, MapPin, Navigation, TrendingUp } from 'lucide-react';

export default function RiderPerformance({ rider, onClose }) {
    if (!rider) return null;

    return (
        <>
            {/* Drawer Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose}></div>
            
            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] lg:w-[450px] bg-white dark:bg-zinc-900 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[60] flex flex-col transform transition-transform duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-955/50 shrink-0">
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight uppercase">Rider Analytics</h2>
                    <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-4">
                    {/* Operative Profile */}
                    <section className="flex items-end justify-between border-l-4 border-[var(--primary)] pl-3 py-1">
                        <div>
                            <p className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Operative Profile</p>
                            <h2 className="text-base font-black text-zinc-900 dark:text-zinc-50 uppercase leading-none">{rider.id || 'RID-092'}</h2>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[9px] font-extrabold text-emerald-500 uppercase tracking-widest">Active Duty</span>
                        </div>
                    </section>

                    {/* KPI Grid (Bento Style) */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-22 shadow-sm hover:border-[var(--primary)]/30 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 group-hover:text-[var(--primary)] transition-colors">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest">Deliveries Today</span>
                                <Truck size={14} />
                            </div>
                            <p className="text-xl font-black text-[var(--primary)]">24</p>
                        </div>
                        
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-22 shadow-sm hover:border-blue-500/30 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500 transition-colors">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest">Success Rate</span>
                                <CheckCircle2 size={14} />
                            </div>
                            <p className="text-xl font-black text-blue-500">98<span className="text-xs font-bold ml-0.5">%</span></p>
                        </div>
                        
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-22 shadow-sm hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest">Avg Time</span>
                                <Clock size={14} />
                            </div>
                            <p className="text-xl font-black text-zinc-900 dark:text-zinc-50">18<span className="text-xs font-bold ml-0.5">m</span></p>
                        </div>
                        
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-22 shadow-sm hover:border-amber-500/30 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 group-hover:text-amber-500 transition-colors">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest">Avg Rating</span>
                                <Star size={14} />
                            </div>
                            <p className="text-xl font-black text-amber-500">4.9</p>
                        </div>
                    </div>

                    {/* Analytics Charts Section */}
                    <div className="flex flex-col gap-2.5">
                        {/* Line Chart Container */}
                        <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex justify-between items-center mb-2.5">
                                <h3 className="text-[9px] font-extrabold text-[var(--primary)] uppercase tracking-widest flex items-center gap-1"><TrendingUp size={12}/> Daily Deliveries (30D)</h3>
                                <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded uppercase">Avg: 21.4/Day</span>
                            </div>
                            {/* Mock Line Chart */}
                            <div className="h-24 w-full relative flex items-end gap-1 px-0.5">
                                {[0.5, 0.6, 0.3, 0.75, 0.85, 0.6, 0.8, 0.5, 0.75, 1, 0.6, 0.8].map((height, i) => (
                                    <div key={i} className="flex-1 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded-t border-t-2 border-[var(--primary)] relative group transition-colors cursor-pointer" style={{ height: `${height * 100}%` }}>
                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-1.5 py-0.5 text-[10px] font-bold rounded shadow-lg z-10">
                                            {Math.round(height * 30)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Donut Chart & Efficiency Section */}
                        <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                            <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
                                <svg className="w-18 h-18 transform -rotate-90" viewBox="0 0 72 72">
                                    <circle className="text-zinc-100 dark:text-zinc-800" cx="36" cy="36" fill="transparent" r="30" stroke="currentColor" strokeWidth="6"></circle>
                                    <circle className="text-blue-500" cx="36" cy="36" fill="transparent" r="30" stroke="currentColor" strokeDasharray="188.4" strokeDashoffset="22.6" strokeWidth="6" strokeLinecap="round"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-sm font-black text-blue-500">88%</span>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                                <div>
                                    <h3 className="text-[9px] font-extrabold text-blue-500 uppercase tracking-widest">Efficiency Index</h3>
                                    <p className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 leading-tight mt-0.5">Operative is performing in the top 5% of the fleet. Logistics friction minimized.</p>
                                </div>
                                <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[88%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Event Feed */}
                    <section className="flex flex-col gap-2">
                        <h3 className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">System Log // Real-Time</h3>
                        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800/50 shadow-sm">
                            <div className="p-2.5 flex items-start gap-2.5 bg-[var(--primary)]/5">
                                <CheckSquare className="text-[var(--primary)] mt-0.5 shrink-0" size={14} />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Delivery Completed</p>
                                    <p className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Order #PX-9921 • Central Hub</p>
                                </div>
                                <span className="text-[9px] font-bold text-[var(--primary)]">14:22:01</span>
                            </div>
                            <div className="p-2.5 flex items-start gap-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                                <MapPin className="text-blue-500 mt-0.5 shrink-0" size={14} />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Geofence Entry</p>
                                    <p className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Zone B-4 • Fast Transit</p>
                                </div>
                                <span className="text-[9px] font-bold text-zinc-400">14:15:44</span>
                            </div>
                            <div className="p-2.5 flex items-start gap-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                                <Navigation className="text-emerald-500 mt-0.5 shrink-0" size={14} />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Order Pick-up</p>
                                    <p className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Merchant: Fire-Oven Grill</p>
                                </div>
                                <span className="text-[9px] font-bold text-zinc-400">14:02:12</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
