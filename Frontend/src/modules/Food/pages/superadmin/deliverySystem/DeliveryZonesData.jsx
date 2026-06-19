import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Route, Clock, Banknote } from 'lucide-react';

const MOCK_ZONES = [
  { id: 1, name: 'ZN-MAN-CENTRAL', city: 'New York', state: 'NY', country: 'USA', stores: 42, fee: '$4.50', eta: '25m', status: 'ACTIVE' },
  { id: 2, name: 'ZN-BK-DUMBO', city: 'Brooklyn', state: 'NY', country: 'USA', stores: 18, fee: '$5.20', eta: '45m', status: 'LIMITED' },
  { id: 3, name: 'ZN-QUE-AST', city: 'Queens', state: 'NY', country: 'USA', stores: 12, fee: '--', eta: 'TBD', status: 'DRAFT' },
  { id: 4, name: 'ZN-SF-SOMA', city: 'San Francisco', state: 'CA', country: 'USA', stores: 34, fee: '$6.00', eta: '18m', status: 'ACTIVE' },
];

export default function DeliveryZonesData({ onSelectZone, onOpenPricing }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [countryFilter, setCountryFilter] = useState('Country');
    const [stateFilter, setStateFilter] = useState('State');
    const [cityFilter, setCityFilter] = useState('City');
    const [statusFilter, setStatusFilter] = useState('Status');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const filteredZones = MOCK_ZONES.filter(zone => {
        if (debouncedSearch && !zone.name.toLowerCase().includes(debouncedSearch.toLowerCase()) && !zone.city.toLowerCase().includes(debouncedSearch.toLowerCase())) {
            return false;
        }
        if (countryFilter !== 'Country' && zone.country !== countryFilter) return false;
        if (stateFilter !== 'State' && zone.state !== stateFilter) return false;
        if (cityFilter !== 'City' && zone.city !== cityFilter) return false;
        if (statusFilter !== 'Status' && zone.status !== statusFilter) return false;
        return true;
    });

    return (
        <div className="flex flex-col gap-4">
            {/* Filters Bar */}
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-wrap gap-3 items-center">
                <div className="flex-1 min-w-[200px] relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" size={12} />
                    <input 
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 transition-all" 
                        placeholder="Search Zone Registry..." 
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-1.5">
                    <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white text-xs font-semibold rounded-lg py-1.5 px-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]/20">
                        <option>Country</option>
                        <option>USA</option>
                        <option>UK</option>
                    </select>
                    <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white text-xs font-semibold rounded-lg py-1.5 px-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]/20">
                        <option>State</option>
                        <option>NY</option>
                        <option>CA</option>
                    </select>
                    <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white text-xs font-semibold rounded-lg py-1.5 px-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]/20">
                        <option>City</option>
                        <option>New York</option>
                        <option>Brooklyn</option>
                        <option>Queens</option>
                        <option>San Francisco</option>
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white text-xs font-semibold rounded-lg py-1.5 px-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]/20">
                        <option>Status</option>
                        <option>ACTIVE</option>
                        <option>LIMITED</option>
                        <option>DRAFT</option>
                    </select>
                </div>
            </div>

            {/* Zone Registry Table */}
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                            <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Zone Name</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">City</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider text-center">Stores</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Fee</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">ETA</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Status</th>
                            <th className="px-3 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {filteredZones.map((zone) => (
                            <tr 
                                key={zone.id} 
                                className="hover:bg-zinc-50 dark:hover:bg-zinc-850/30 transition-colors group cursor-pointer"
                                onClick={() => onSelectZone && onSelectZone(zone)}
                            >
                                <td className="px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                                            <Route size={14} />
                                        </div>
                                        <span className="font-bold text-xs text-black dark:text-white group-hover:text-[var(--primary)] transition-colors">{zone.name}</span>
                                    </div>
                                </td>
                                <td className="px-3 py-2 text-xs font-semibold text-black/70 dark:text-white/70">{zone.city}</td>
                                <td className="px-3 py-2 text-center font-bold text-xs text-black dark:text-white">{zone.stores}</td>
                                <td className="px-3 py-2 text-right font-black text-xs text-[var(--primary)]">{zone.fee}</td>
                                <td className="px-3 py-2">
                                    <div className="flex items-center gap-1 text-xs font-bold text-black/70 dark:text-white/70">
                                        <Clock size={12} className="text-blue-500" />
                                        {zone.eta}
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    {zone.status === 'ACTIVE' && (
                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider border border-emerald-500/20">
                                            <span className="relative flex h-1 w-1">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                                            </span>
                                            ACTIVE
                                        </span>
                                    )}
                                    {zone.status === 'LIMITED' && (
                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider border border-amber-500/20">
                                            <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                                            LIMITED
                                        </span>
                                    )}
                                    {zone.status === 'DRAFT' && (
                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-500/10 text-black/60 dark:text-white/60 text-[9px] font-black uppercase tracking-wider border border-zinc-500/20">
                                            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                                            DRAFT
                                        </span>
                                    )}
                                </td>
                                <td className="px-3 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-0.5">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onOpenPricing && onOpenPricing(zone); }}
                                            className="p-1 text-black/50 dark:text-white/50 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                                            title="Pricing Rules"
                                        >
                                            <Banknote size={14} />
                                        </button>
                                        <button className="p-1 text-black/50 dark:text-white/50 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors">
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredZones.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-3 py-6 text-center text-xs font-semibold text-black/60 dark:text-white/60">
                                    No zones found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
