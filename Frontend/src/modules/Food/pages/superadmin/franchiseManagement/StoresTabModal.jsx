import React, { useState, useEffect } from "react";
import { Store, CheckCircle2, Star, Search, Filter, Plus, TrendingUp, TrendingDown } from "lucide-react";

export default function StoresTabModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const storesData = [
    {
      id: 1,
      name: "Papa Veg Pizza - Hinjewadi",
      location: "IT Park Phase 1, Pune",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp",
      status: "Active",
      revenue: "₹12,45,000",
      trend: "+8.2%",
      trendUp: true
    },
    {
      id: 2,
      name: "Papa Veg Pizza - Baner",
      location: "High Street Plaza, Pune",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp",
      status: "Active",
      revenue: "₹9,82,000",
      trend: "+12.5%",
      trendUp: true
    },
    {
      id: 3,
      name: "Papa Veg Pizza - Kothrud",
      location: "DP Road, Pune",
      image: "https://images.unsplash.com/photo-1604381536171-460b61596f2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp",
      status: "Inactive",
      revenue: "₹0",
      trend: "Maintenance",
      trendUp: false
    }
  ];

  const filteredStores = storesData.filter(store => 
    store.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
    store.location.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
            <Store size={16} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Stores</p>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">35</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Active</p>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">32</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 shrink-0">
            <Star size={16} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Average Rating</p>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">4.8</p>
          </div>
        </div>
      </div>

      {/* Search and Actions Row */}
      <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-xs text-zinc-900 dark:text-zinc-100 transition-all" 
            placeholder="Search stores by name or area..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
            <Filter size={14} /> Filter
          </button>
          <button className="flex-1 sm:flex-none px-3.5 py-1.5 bg-[var(--primary)] text-white rounded-lg text-xs font-bold hover:brightness-110 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
            <Plus size={14} /> New Store
          </button>
        </div>
      </div>

      {/* Store List Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50">
              <tr>
                <th className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">Store Name & Location</th>
                <th className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">Status</th>
                <th className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">Monthly Revenue</th>
                <th className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-3 py-6 text-center text-zinc-500 text-xs font-medium">
                    No stores found matching your search.
                  </td>
                </tr>
              ) : (
                filteredStores.map((store) => (
                  <tr key={store.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                          <img 
                            className="w-full h-full object-cover" 
                            alt={store.name} 
                            src={store.image}
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{store.name}</p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{store.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      {store.status === "Active" ? (
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-[9px] rounded uppercase font-bold tracking-wider">Active</span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[9px] rounded uppercase font-bold tracking-wider border border-zinc-300 dark:border-zinc-700">Inactive</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{store.revenue}</p>
                      <p className={`text-[9px] flex items-center gap-1 mt-0.5 font-bold ${store.trendUp ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-500'}`}>
                        {store.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {store.trend}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button className="text-[var(--primary)] text-xs font-bold hover:underline">View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-xs text-zinc-500 font-medium">Showing {filteredStores.length} of 35 stores</span>
          <div className="flex gap-2">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 text-xs text-zinc-500" disabled>
              &lt;
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors text-xs text-zinc-500">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
