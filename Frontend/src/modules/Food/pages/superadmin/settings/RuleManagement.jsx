import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit2, Copy, Ban, CheckCircle } from 'lucide-react';

const initialRules = [
  { id: 1, name: 'GST (Central + State)', desc: 'Goods and Services Tax', region: 'India > MP', rate: '18%', status: 'Active' },
  { id: 2, name: 'VAT (Standard)', desc: 'Value Added Tax', region: 'UAE', rate: '5%', status: 'Active' },
  { id: 3, name: 'State Sales Tax', desc: 'Retail Pizza Sales', region: 'USA > California', rate: '7.25%', status: 'Inactive' },
  { id: 4, name: 'Service Cess', desc: 'Additional Luxury Surcharge', region: 'India > KA', rate: '1%', status: 'Active' },
];

export default function RuleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const filteredRules = initialRules.filter(rule => 
    rule.name.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
    rule.region.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <section className="xl:col-span-2 space-y-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-2 bg-zinc-50/50 dark:bg-zinc-955/50">
          <h3 className="text-xs font-bold text-black dark:text-white">Rule Management</h3>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search rules..." 
                className="w-full pl-8 pr-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded text-xs font-semibold outline-none bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" />
            </div>
            <button className="p-1 border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-black/70 dark:text-white/70">
              <Filter size={12} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-955 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Tax Name</th>
                <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Region</th>
                <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Rate</th>
                <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Status</th>
                <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors text-xs">
                  <td className="px-3.5 py-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-black dark:text-white">{rule.name}</span>
                      <span className="text-[10px] font-semibold text-black/70 dark:text-white/70">{rule.desc}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-2 font-semibold text-black/70 dark:text-white/70">{rule.region}</td>
                  <td className="px-3.5 py-2 font-mono font-black text-[var(--primary)]">{rule.rate}</td>
                  <td className="px-3.5 py-2">
                    {rule.status === 'Active' ? (
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[9px] font-bold">Active</span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-650 dark:bg-zinc-800 dark:text-zinc-400 rounded-full text-[9px] font-bold">Inactive</span>
                    )}
                  </td>
                  <td className="px-3.5 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-1 text-black/50 dark:text-white/50 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded transition-colors" title="Edit">
                        <Edit2 size={12} />
                      </button>
                      <button className="p-1 text-black/50 dark:text-white/50 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded transition-colors" title="Duplicate">
                        <Copy size={12} />
                      </button>
                      {rule.status === 'Active' ? (
                        <button className="p-1 text-black/50 dark:text-white/50 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-colors" title="Deactivate">
                          <Ban size={12} />
                        </button>
                      ) : (
                        <button className="p-1 text-black/50 dark:text-white/50 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition-colors" title="Activate">
                          <CheckCircle size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRules.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-3.5 py-6 text-center text-xs font-semibold text-black/50 dark:text-white/50">
                    No rules found matching "{debouncedTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center mt-auto">
          <span className="text-[10px] font-bold text-black/50 dark:text-white/50">Showing {filteredRules.length} of {initialRules.length} rules</span>
          <div className="flex gap-1.5">
            <button className="px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-bold text-black/50 dark:text-white/50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] bg-[var(--primary)] text-white font-bold shadow-sm">1</button>
            <button className="px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-bold text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">2</button>
            <button className="px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-bold text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}
