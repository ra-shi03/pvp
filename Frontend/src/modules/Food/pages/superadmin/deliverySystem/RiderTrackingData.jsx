import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const RIDERS = [
    { id: '1', name: 'Marco Polo', order: 'ORD-9921', status: 'DELAYED', reason: 'TRAFFIC_JAM', speed: 0, eta: '+12m' },
    { id: '2', name: 'Sarah Connor', order: 'ORD-9925', status: 'DELIVERING', reason: 'EN_ROUTE', speed: 34, eta: '4m' },
    { id: '3', name: 'James Bond', order: 'STATION_04', status: 'AVAILABLE', reason: 'IDLE', speed: 0, eta: 'READY' },
    { id: '4', name: 'Ellen Ripley', order: 'ORD-9930', status: 'DELIVERING', reason: 'LAST_MILE', speed: 18, eta: '1m' },
    { id: '5', name: 'John Doe', order: 'STATION_01', status: 'AVAILABLE', reason: 'IDLE', speed: 0, eta: 'READY' },
    { id: '6', name: 'Jane Smith', order: 'ORD-9945', status: 'DELIVERING', reason: 'EN_ROUTE', speed: 28, eta: '8m' },
];

export default function RiderTrackingData({ onSelectRider }) {
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const filteredRiders = RIDERS.filter(rider => {
        if (filter !== 'ALL' && rider.status !== filter) return false;
        if (debouncedSearch && !rider.name.toLowerCase().includes(debouncedSearch.toLowerCase()) && !rider.order.toLowerCase().includes(debouncedSearch.toLowerCase())) return false;
        return true;
    });

    const statusCounts = {
        ALL: RIDERS.length,
        DELIVERING: RIDERS.filter(r => r.status === 'DELIVERING').length,
        AVAILABLE: RIDERS.filter(r => r.status === 'AVAILABLE').length,
        DELAYED: RIDERS.filter(r => r.status === 'DELAYED').length,
    };

    return (
        <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-xl z-20 shrink-0 lg:w-[300px]">
            <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-black dark:text-white tracking-tight">Fleet Monitor</h2>
                    <span className="text-[9px] font-bold text-[var(--primary)] px-2 py-0.5 bg-[var(--primary)]/10 rounded-full">{statusCounts.ALL} Active</span>
                </div>
                
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" size={12} />
                    <input 
                        type="text" 
                        placeholder="Search riders or orders..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 shadow-sm transition-all"
                    />
                </div>

                <div className="flex gap-1.5 overflow-x-auto custom-scrollbar pb-1">
                    {['ALL', 'DELIVERING', 'AVAILABLE', 'DELAYED'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider whitespace-nowrap transition-all active:scale-95 border ${
                                filter === f 
                                    ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-md shadow-[var(--primary)]/20' 
                                    : 'bg-white dark:bg-zinc-850 text-black/70 dark:text-white/70 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                        >
                            {f} ({statusCounts[f]})
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
                {filteredRiders.map(rider => (
                    <div 
                        key={rider.id}
                        onClick={() => onSelectRider && onSelectRider(rider)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer hover:shadow-md transition-all group ${
                            rider.status === 'DELAYED' 
                                ? 'bg-rose-50/50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900/50' 
                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-[var(--primary)]/50'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <div className={`w-2 h-2 rounded-full shadow-sm ${
                                rider.status === 'DELAYED' ? 'bg-rose-500 animate-pulse' :
                                rider.status === 'AVAILABLE' ? 'bg-emerald-500' :
                                'bg-[var(--primary)]'
                            }`}></div>
                            <div>
                                <p className="text-xs font-bold text-black dark:text-white group-hover:text-[var(--primary)] transition-colors">{rider.name}</p>
                                <p className="text-[9px] font-semibold text-black/70 dark:text-white/70 uppercase tracking-wider mt-0.5">{rider.order} • {rider.reason}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-[10px] font-black ${
                                rider.status === 'AVAILABLE' ? 'text-black/40 dark:text-white/40' :
                                'text-black dark:text-white'
                            }`}>
                                {rider.speed > 0 ? `${rider.speed} KM/H` : rider.status === 'AVAILABLE' ? 'STANDBY' : '0 KM/H'}
                            </p>
                            <p className={`text-[9px] font-extrabold uppercase tracking-wider mt-0.5 ${
                                rider.status === 'DELAYED' ? 'text-rose-500' :
                                rider.status === 'AVAILABLE' ? 'text-emerald-500' :
                                'text-[var(--primary)]'
                            }`}>
                                {rider.speed > 0 ? `ETA ${rider.eta}` : rider.eta}
                            </p>
                        </div>
                    </div>
                ))}
                {filteredRiders.length === 0 && (
                    <div className="py-10 text-center text-black/60 dark:text-white/60 text-xs font-medium">
                        No riders found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
