import React, { useState, useEffect } from 'react';
import { Search, Calendar } from 'lucide-react';

const mockCommissions = [
  { id: '#PZ-8902', store: 'Mumbai Central', region: 'West', commPercent: '8.5%', amount: 425.00, status: 'Settled' },
  { id: '#PZ-8903', store: 'Delhi South', region: 'North', commPercent: '10%', amount: 620.00, status: 'Pending' },
  { id: '#PZ-8904', store: 'Bangalore East', region: 'South', commPercent: '8.5%', amount: 380.00, status: 'Review' },
  { id: '#PZ-8905', store: 'Mumbai Central', region: 'West', commPercent: '8.5%', amount: 510.00, status: 'Settled' },
  { id: '#PZ-8906', store: 'Pune North', region: 'West', commPercent: '9%', amount: 450.00, status: 'Pending' },
  { id: '#PZ-8907', store: 'Chennai City', region: 'South', commPercent: '10%', amount: 720.00, status: 'Settled' },
];

export default function CommissionData({ onViewCommission }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [storeFilter, setStoreFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredData = mockCommissions.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                          item.store.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesStore = storeFilter === 'All' || item.store === storeFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStore && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Settled':
        return 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20';
      case 'Pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 border-amber-200 dark:border-amber-800/50';
      case 'Review':
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Sticky Filter Bar */}
      <nav className="sticky top-12 z-30 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex flex-wrap items-center gap-2 shadow-sm">
        
        {/* Search Input (Debounced) */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" size={12} />
          <input 
            type="text" 
            placeholder="Search Order or Store..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:border-[var(--primary)] focus:ring-[var(--primary)] outline-none transition-all text-black dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          <select 
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs font-bold text-black/70 dark:text-white/70 outline-none appearance-none pr-6 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23737688%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '0.55rem auto' }}
          >
            <option value="All">Store: All</option>
            <option value="Mumbai Central">Mumbai Central</option>
            <option value="Delhi South">Delhi South</option>
            <option value="Bangalore East">Bangalore East</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs font-bold text-black/70 dark:text-white/70 outline-none appearance-none pr-6 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23737688%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '0.55rem auto' }}
          >
            <option value="All">Status: All</option>
            <option value="Settled">Settled</option>
            <option value="Pending">Pending</option>
            <option value="Review">Review</option>
          </select>

          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg shrink-0 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs font-bold text-black/70 dark:text-white/70">
            <Calendar size={12} className="text-black/50 dark:text-white/50" />
            <span>This Month</span>
          </div>
        </div>
      </nav>

      {/* Commissions Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-xs text-black dark:text-white">Recent Commissions</h3>
          <button className="text-[10px] font-bold text-[var(--primary)] hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Order / Store</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Comm %</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Amount</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <tr 
                    key={i} 
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                    onClick={() => onViewCommission && onViewCommission(item)}
                  >
                    <td className="px-3 py-2">
                      <p className="font-mono text-xs font-bold text-[var(--primary)] group-hover:underline">{item.id}</p>
                      <p className="text-[10px] text-black/50 dark:text-white/50 font-semibold mt-0.5">{item.store}</p>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="font-mono text-xs font-bold text-black dark:text-white bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{item.commPercent}</span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="font-mono text-xs font-bold text-black dark:text-white">{formatCurrency(item.amount)}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusStyles(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-3 py-4 text-center text-black/50 dark:text-white/50 font-semibold text-xs">
                    No commissions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
