import React, { useState } from 'react';
import { Plus, Upload, Share, Layers, Zap, Store, Activity, Maximize2 } from 'lucide-react';
import DeliveryZonesData from './DeliveryZonesData';
import DeliveryZoneDetails from './DeliveryZoneDetails';
import ZonePricingRules from './ZonePricingRules';
import CreateDeliveryZone from './CreateDeliveryZone';

export default function DeliveryZoneManagement() {
    const [selectedZone, setSelectedZone] = useState(null);
    const [pricingRulesZone, setPricingRulesZone] = useState(null);
    const [isCreateZoneOpen, setIsCreateZoneOpen] = useState(false);

    return (
        <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4">
            {/* Dashboard Header Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                    <h1 className="text-lg font-bold text-black dark:text-white tracking-tight">Delivery Zones</h1>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5 uppercase tracking-wider">Registry Management / Region 01</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsCreateZoneOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[var(--primary)] text-white font-bold px-3.5 py-1.5 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[var(--primary)]/20"
                    >
                        <Plus size={14} />
                        <span className="text-[11px] uppercase tracking-wider">Create Zone</span>
                    </button>
                    <button className="flex items-center justify-center p-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors rounded-lg shadow-sm active:scale-95">
                        <Upload size={14} />
                    </button>
                    <button className="flex items-center justify-center p-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors rounded-lg shadow-sm active:scale-95">
                        <Share size={14} />
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-[var(--primary)]/50 transition-colors cursor-pointer flex items-center justify-between">
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Total Zones</span>
                        <div className="text-lg font-black text-[var(--primary)]">124</div>
                        <div className="text-[10px] font-semibold text-emerald-500 mt-0.5 tracking-wide">+2 this week</div>
                    </div>
                    <div className="p-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg shrink-0">
                        <Layers size={14} />
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-emerald-500 shadow-sm hover:border-[var(--primary)]/50 transition-colors cursor-pointer flex items-center justify-between">
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Active</span>
                        <div className="text-lg font-black text-black dark:text-white">118</div>
                        <div className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5 tracking-wide">95.1% uptime</div>
                    </div>
                    <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                        <Zap size={14} />
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-[var(--primary)]/50 transition-colors cursor-pointer flex items-center justify-between">
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Stores</span>
                        <div className="text-lg font-black text-black dark:text-white">842</div>
                        <div className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5 tracking-wide">Across all zones</div>
                    </div>
                    <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg shrink-0">
                        <Store size={14} />
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-[var(--primary)]/50 transition-colors cursor-pointer flex items-center justify-between">
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Orders Today</span>
                        <div className="text-lg font-black text-blue-500">14.2k</div>
                        <div className="text-[10px] font-semibold text-[var(--primary)] mt-0.5 tracking-wide">Peak: 12:42 PM</div>
                    </div>
                    <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                        <Activity size={14} />
                    </div>
                </div>
            </div>

            {/* Delivery Zones Data (Filters & Table) */}
            <DeliveryZonesData onSelectZone={setSelectedZone} onOpenPricing={setPricingRulesZone} />

            {/* Map Preview Overlay */}
            <div className="relative h-48 w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-md">
                <img
                    alt="Map Interface"
                    className="w-full h-full object-cover opacity-70 grayscale brightness-75 dark:brightness-50 mix-blend-luminosity"
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80&fm=webp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute top-3 left-3 z-10">
                    <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-zinc-200 dark:border-white/10 shadow-sm flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]"></span>
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--primary)]">Live Geospatial Feed</span>
                    </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
                    <div>
                        <h3 className="text-xs font-extrabold text-white tracking-tight">Regional Coverage</h3>
                        <p className="text-[10px] font-semibold text-zinc-300 mt-0.5">Zone overlap check active</p>
                    </div>
                    <button className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 shadow-lg">
                        <Maximize2 size={14} />
                    </button>
                </div>
            </div>

            <DeliveryZoneDetails zone={selectedZone} onClose={() => setSelectedZone(null)} />
            <ZonePricingRules zone={pricingRulesZone} onClose={() => setPricingRulesZone(null)} />
            <CreateDeliveryZone isOpen={isCreateZoneOpen} onClose={() => setIsCreateZoneOpen(false)} />
        </div>
    );
}
