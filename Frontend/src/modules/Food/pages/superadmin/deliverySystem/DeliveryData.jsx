import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Filter, MoreVertical, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

export default function DeliveryData({ onSelectDelivery }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Debouncing logic for filters
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const allDeliveries = [
        { id: '#PV-9821', order: 'Lg. Margherita + Coke', customer: 'Sarah Jenkins', store: 'Downtown (D1)', rider: 'Marcus R.', status: 'PICKED UP', distance: '3.2 km', eta: '12 mins', created: '12:45 PM', statusColor: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20' },
        { id: '#PV-9822', order: 'Family Feast Pk', customer: 'Robert Fox', store: 'West End (W4)', rider: 'Unassigned', status: 'PENDING', distance: '5.1 km', eta: '-', created: '12:52 PM', statusColor: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20' },
        { id: '#PV-9819', order: 'Veg Supreme Med', customer: 'Elena Gilbert', store: 'East Side (E2)', rider: 'Jordan S.', status: 'DELIVERED', distance: '1.8 km', eta: 'Arrived', created: '12:30 PM', statusColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' },
        { id: '#PV-9823', order: 'Garlic Bread x4', customer: 'Alex Wong', store: 'Downtown (D1)', rider: 'Lily T.', status: 'ASSIGNED', distance: '2.4 km', eta: '18 mins', created: '12:58 PM', statusColor: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20' },
        { id: '#PV-9818', order: 'Paneer Special', customer: 'Deepak K.', store: 'North Hub (N7)', rider: 'Amara L.', status: 'RETURNED', distance: '4.5 km', eta: '-', created: '12:15 PM', statusColor: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20' },
    ];

    const filteredDeliveries = allDeliveries.filter(delivery => {
        const matchesSearch = 
            delivery.id.toLowerCase().includes(debouncedTerm.toLowerCase()) || 
            delivery.order.toLowerCase().includes(debouncedTerm.toLowerCase()) || 
            delivery.rider.toLowerCase().includes(debouncedTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'All Status' || delivery.status === statusFilter.toUpperCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex flex-col gap-4">
            {/* Filter Panel */}
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-3 shadow-sm">
                <div className="relative flex items-center w-full sm:w-64">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60" size={12} />
                    <input 
                        className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-white placeholder-zinc-400 outline-none" 
                        placeholder="Search ID, Order, Rider..." 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden lg:block mx-1"></div>
                
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-black dark:text-white hidden sm:inline uppercase tracking-wider">Date:</span>
                    <button className="bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-black dark:text-white transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <span>Today</span> <ChevronDown size={12} className="text-black/60 dark:text-white/60" />
                    </button>
                </div>
                
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-black dark:text-white hidden sm:inline uppercase tracking-wider">Store:</span>
                    <button className="bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-black dark:text-white transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <span>All Stores</span> <ChevronDown size={12} className="text-black/60 dark:text-white/60" />
                    </button>
                </div>
                
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-black dark:text-white hidden sm:inline uppercase tracking-wider">Status:</span>
                    <select 
                        className="bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 py-1 px-2.5 rounded-lg text-xs font-bold text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none cursor-pointer shadow-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Assigned</option>
                        <option>Picked Up</option>
                        <option>Delivered</option>
                        <option>Returned</option>
                    </select>
                </div>
                
                <button className="p-1.5 text-black dark:text-white bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all ml-auto shadow-sm">
                    <Filter size={12} />
                </button>
            </div>

            {/* Main Data Table Container */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm flex-1 flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">ID</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Order</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Customer</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Store</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Rider</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Status</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Distance</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">ETA</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Created</th>
                                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filteredDeliveries.length > 0 ? filteredDeliveries.map((delivery, index) => (
                                <tr key={index} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850 transition-colors group cursor-pointer" onClick={() => onSelectDelivery && onSelectDelivery(delivery)}>
                                    <td className="px-3 py-2 text-xs font-bold text-[var(--primary)]">{delivery.id}</td>
                                    <td className="px-3 py-2 text-xs font-bold text-black dark:text-white">{delivery.order}</td>
                                    <td className="px-3 py-2 text-xs text-black dark:text-white font-bold">{delivery.customer}</td>
                                    <td className="px-3 py-2 text-xs text-black/70 dark:text-white/70 font-medium">{delivery.store}</td>
                                    <td className="px-3 py-2">
                                        <div className={`flex items-center gap-1.5 ${delivery.rider === 'Unassigned' ? 'text-amber-600 dark:text-amber-500' : 'text-black dark:text-white'}`}>
                                            {delivery.rider === 'Unassigned' ? (
                                                <AlertTriangle size={12} className="animate-pulse" />
                                            ) : (
                                                <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700 shrink-0">
                                                    <img src={`https://i.pravatar.cc/100?u=${delivery.rider.replace(' ', '')}`} alt={delivery.rider} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <span className="text-xs font-bold">{delivery.rider}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide ${delivery.statusColor}`}>
                                            {delivery.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-xs font-mono font-bold text-black dark:text-white">{delivery.distance}</td>
                                    <td className="px-3 py-2 text-xs font-mono font-bold text-black dark:text-white">{delivery.eta}</td>
                                    <td className="px-3 py-2 text-[10px] text-black/60 dark:text-white/60 font-semibold">{delivery.created}</td>
                                    <td className="px-3 py-2 text-right">
                                        <button 
                                            className="p-1 text-black/60 dark:text-white/60 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            onClick={(e) => { e.stopPropagation(); onSelectDelivery && onSelectDelivery(delivery); }}
                                        >
                                            <MoreVertical size={14} />
                                        </button>
                                    </td>
                                </tr>
                             )) : (
                                <tr>
                                    <td colSpan="10" className="px-3 py-8 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <div className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-300 dark:text-zinc-600">
                                                <Search size={20} />
                                            </div>
                                            <p className="text-xs font-bold text-black/60 dark:text-white/60">No deliveries found</p>
                                            <p className="text-[10px] text-black/50 dark:text-white/50">Try adjusting your filters or search terms.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 px-3 py-2 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                    <span className="text-[11px] font-semibold text-black/70 dark:text-white/70">
                        Showing {filteredDeliveries.length > 0 ? 1 : 0} to {filteredDeliveries.length} of {allDeliveries.length} active deliveries
                    </span>
                    <div className="flex gap-1.5">
                        <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            <ChevronLeft size={12} />
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            <ChevronRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
