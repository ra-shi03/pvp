import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function CustomerAnalyticsData({ onCustomerClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const customers = [
    { rank: '#01', name: 'Rajesh Kumar', tier: 'DIAMOND', rev: '₹42,500' },
    { rank: '#02', name: 'Anita Sharma', tier: 'DIAMOND', rev: '₹38,120' },
    { rank: '#03', name: 'David G.', tier: 'GOLD', rev: '₹31,450' }
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <section className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Top Customers (By Revenue)</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-[180px] md:w-[240px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto animate-fade-in">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-2 px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Rank</th>
                <th className="py-2 px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Name</th>
                <th className="py-2 px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              {filteredCustomers.length > 0 ? filteredCustomers.map((cust, i) => (
                <tr 
                  key={i} 
                  onClick={() => onCustomerClick?.(cust)}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer text-xs"
                >
                  <td className="py-2 px-3 font-mono font-bold text-zinc-500">{cust.rank}</td>
                  <td className="py-2 px-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{cust.name}</span>
                      <span className={`text-[9px] font-bold mt-0.5 ${cust.tier === 'DIAMOND' ? 'text-[var(--primary)]' : 'text-amber-500'}`}>{cust.tier}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-black text-zinc-900 dark:text-zinc-100">{cust.rev}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-xs font-semibold text-zinc-500">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button className="w-full py-2.5 text-[var(--primary)] text-xs font-bold uppercase tracking-wider border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
          View All 1,200+
        </button>
      </div>
    </section>
  );
}
