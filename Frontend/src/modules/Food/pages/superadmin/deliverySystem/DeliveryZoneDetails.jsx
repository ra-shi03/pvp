import React, { useState } from 'react';
import { X, Share, Info, MapPin, Maximize2, Wand2, ArrowUpRight } from 'lucide-react';

export default function DeliveryZoneDetails({ zone, onClose }) {
    const [activeTab, setActiveTab] = useState('Information');

    if (!zone) return null;

    const tabs = ['Information', 'Stores', 'Riders', 'Analytics', 'Map'];

    return (
        <>
            {/* Drawer Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose}></div>
            
            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] lg:w-[480px] bg-white dark:bg-zinc-900 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[60] flex flex-col transform transition-transform duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 shrink-0">
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight uppercase">Zone Intelligence</h2>
                    <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-3.5 flex flex-col gap-4">
                        {/* Zone Header info */}
                        <section className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                                <span className="text-[10px] font-extrabold uppercase tracking-widest">Region / NORTH_AMERICA</span>
                                <span className="w-1 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full"></span>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest">NYC_01</span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">{zone.name || 'Manhattan Zone A-4'}</h2>
                                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                                            <span className="relative flex h-1 w-1">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                                            </span>
                                            {zone.status || 'ACTIVE'}
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-extrabold border border-[var(--primary)]/20 uppercase tracking-wider">
                                            Priority: Level 1
                                        </span>
                                    </div>
                                </div>
                                <button className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm active:scale-95">
                                    <Share size={14} />
                                </button>
                            </div>
                        </section>

                        {/* Tab Navigation */}
                        <nav className="flex gap-4 overflow-x-auto no-scrollbar border-b border-zinc-200 dark:border-zinc-800 pb-px">
                            {tabs.map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-1.5 text-xs font-bold whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-[var(--primary)]' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] rounded-t-full"></div>
                                    )}
                                </button>
                            ))}
                        </nav>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Information Card */}
                            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Zone Statistics</h3>
                                    <Info size={14} className="text-zinc-400" />
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955/50 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                                        <div className="text-[9px] text-zinc-500 dark:text-zinc-400 font-extrabold mb-0.5 uppercase tracking-wider">Stores Covered</div>
                                        <div className="font-black text-lg text-zinc-900 dark:text-zinc-50">{zone.stores || '42'}</div>
                                    </div>
                                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955/50 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                                        <div className="text-[9px] text-zinc-500 dark:text-zinc-400 font-extrabold mb-0.5 uppercase tracking-wider">Active Riders</div>
                                        <div className="font-black text-lg text-zinc-900 dark:text-zinc-50">128</div>
                                    </div>
                                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955/50 rounded-lg border border-zinc-100 dark:border-zinc-800/80 col-span-2">
                                        <div className="text-[9px] text-zinc-500 dark:text-zinc-400 font-extrabold mb-0.5 uppercase tracking-wider">Daily Revenue Projected</div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="font-black text-xl text-[var(--primary)]">$14.2k</span>
                                            <span className="text-emerald-500 text-[10px] font-bold flex items-center gap-0.5"><ArrowUpRight size={10}/> 12.4%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-[11px] font-bold">
                                        <span className="text-zinc-600 dark:text-zinc-400">Efficiency Score</span>
                                        <span className="text-zinc-900 dark:text-zinc-50">94%</span>
                                    </div>
                                    <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-[var(--primary)] w-[94%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Preview Section */}
                            <div className="relative rounded-xl overflow-hidden min-h-[180px] border border-zinc-200 dark:border-zinc-800 shadow-sm group">
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        alt="Map Visualization" 
                                        className="w-full h-full object-cover grayscale opacity-80 brightness-75 dark:brightness-50 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" 
                                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80&fm=webp"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent"></div>
                                </div>
                                <div className="relative z-10 p-2.5 flex flex-col justify-between h-full">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-zinc-200 dark:border-white/10 text-[9px] font-extrabold uppercase tracking-widest text-zinc-900 dark:text-zinc-50 shadow-sm">
                                            Geospatial View
                                        </div>
                                        <button className="bg-[var(--primary)] p-1.5 rounded-lg text-white shadow-lg active:scale-90 transition-transform">
                                            <Maximize2 size={12} />
                                        </button>
                                    </div>
                                    <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-2.5 rounded-lg border border-zinc-200 dark:border-white/10 shadow-sm">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <MapPin className="text-[var(--primary)]" size={14} />
                                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Boundary A-4 Polygon</span>
                                        </div>
                                        <div className="text-[9px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                                            LAT: 40.7831° N, LON: 73.9712° W<br/>
                                            Total Area: 3.2 sq km
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Feed / Telemetry */}
                            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm md:col-span-2">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-[10px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Live System Events</h3>
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse delay-75"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-150"></div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-[10px] font-mono h-28 overflow-y-auto custom-scrollbar pr-2">
                                    <div className="flex gap-2 text-zinc-600 dark:text-zinc-300 border-l border-[var(--primary)] pl-2 py-0">
                                        <span className="text-[var(--primary)] font-bold shrink-0">[14:02:11]</span>
                                        <span>Route Optimization triggered for 12 nodes.</span>
                                    </div>
                                    <div className="flex gap-2 text-zinc-600 dark:text-zinc-300 border-l border-emerald-500 pl-2 py-0">
                                        <span className="text-emerald-500 font-bold shrink-0">[13:58:45]</span>
                                        <span>Rider #RD-092 delivered package to Store #ST-22.</span>
                                    </div>
                                    <div className="flex gap-2 text-zinc-600 dark:text-zinc-300 border-l border-zinc-300 dark:border-zinc-700 pl-2 py-0">
                                        <span className="text-zinc-400 dark:text-zinc-500 shrink-0">[13:55:02]</span>
                                        <span>Shift change: 14 new riders connected in Sector A.</span>
                                    </div>
                                    <div className="flex gap-2 text-zinc-600 dark:text-zinc-300 border-l border-zinc-300 dark:border-zinc-700 pl-2 py-0">
                                        <span className="text-zinc-400 dark:text-zinc-500 shrink-0">[13:50:18]</span>
                                        <span>Heartbeat check: All telemetry sensors operational.</span>
                                    </div>
                                    <div className="flex gap-2 text-zinc-600 dark:text-zinc-300 border-l border-blue-500 pl-2 py-0">
                                        <span className="text-blue-500 font-bold shrink-0">[13:45:10]</span>
                                        <span>Surge pricing activated due to high demand density.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions Container */}
                <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 shrink-0">
                    <button className="w-full h-10 bg-[var(--primary)] text-white font-extrabold rounded-lg shadow-md shadow-[var(--primary)]/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 uppercase tracking-wide text-xs">
                        <Wand2 size={14} />
                        Optimize All Routes
                    </button>
                </div>
            </div>
        </>
    );
}
