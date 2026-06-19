import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, CalendarDays, Wallet } from 'lucide-react';

const mockTransactions = [
  { id: '#TXN-94021', date: '24 Oct 2023, 14:22', type: 'Sales', reference: 'Order #8829 | Mumbai-West', debit: null, credit: 2450.00, balance: 12492450.00 },
  { id: '#TXN-94020', date: '24 Oct 2023, 13:05', type: 'Refund', reference: 'Order #8812 | Delhi-Central', debit: 1200.00, credit: null, balance: 12490000.00 },
  { id: '#TXN-94019', date: '24 Oct 2023, 11:45', type: 'Settlement', reference: 'HDFC Bank | Cycle #42', debit: null, credit: 450000.00, balance: 12491200.00 },
  { id: '#TXN-94018', date: '24 Oct 2023, 09:10', type: 'Commission', reference: 'Franchise Fee | Bangalore-East', debit: 15400.00, credit: null, balance: 12041200.00 },
  { id: '#TXN-94017', date: '23 Oct 2023, 22:30', type: 'Sales', reference: 'Bulk Order #911 | PizzaCorp HQ', debit: null, credit: 42100.00, balance: 12056600.00 },
];

export default function TransactionData({ onViewTransaction }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Transaction Type: All');
  const [storeFilter, setStoreFilter] = useState('Store: All Locations');

  // Debouncing Search Input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    return mockTransactions.filter(item => {
      const matchSearch = item.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                          item.reference.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchType = typeFilter === 'Transaction Type: All' || item.type.toLowerCase() === typeFilter.split(': ')[1].toLowerCase();
      
      const storeName = storeFilter === 'Store: All Locations' ? 'All Locations' : storeFilter.split(' - ')[0].trim();
      const matchStore = storeFilter === 'Store: All Locations' || item.reference.toLowerCase().includes(storeName.toLowerCase());
      
      return matchSearch && matchType && matchStore;
    });
  }, [debouncedSearchTerm, typeFilter, storeFilter]);

  const getTypeStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'sales': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'refund': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800';
      case 'settlement': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800';
      case 'commission': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800';
      default: return 'bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Sticky Filter Bar */}
      <div className="sticky top-12 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex flex-wrap items-center gap-2 shadow-sm">
        <div className="flex items-center gap-1.5 border-r border-zinc-200 dark:border-zinc-800 pr-2">
          <Filter className="text-black/50 dark:text-white/50" size={12} />
          <span className="text-[9px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Filters</span>
        </div>
        
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" size={12} />
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-xs text-black dark:text-white outline-none transition-colors" 
            placeholder="Search Master Ledger..." 
            type="text"
          />
        </div>

        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-transparent border-none text-xs font-bold text-black/70 dark:text-white/70 focus:ring-0 cursor-pointer outline-none p-0"
        >
          <option>Transaction Type: All</option>
          <option>Transaction Type: Sales</option>
          <option>Transaction Type: Refund</option>
          <option>Transaction Type: Settlement</option>
          <option>Transaction Type: Commission</option>
        </select>
        
        <select 
          value={storeFilter}
          onChange={(e) => setStoreFilter(e.target.value)}
          className="bg-transparent border-none text-xs font-bold text-black/70 dark:text-white/70 focus:ring-0 cursor-pointer outline-none p-0"
        >
          <option>Store: All Locations</option>
          <option>Mumbai - Bandra</option>
          <option>Delhi - CP</option>
          <option>Bangalore - Indiranagar</option>
        </select>
        
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-black/70 dark:text-white/70 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
          <CalendarDays size={12} className="text-[var(--primary)]" />
          Oct 01 - Oct 31, 2023
        </div>
        
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-black/70 dark:text-white/70 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
          <Wallet size={12} className="text-[var(--primary)]" />
          Amount: ₹500 - ₹10L
        </div>
        
        <button 
          onClick={() => {
            setSearchTerm('');
            setTypeFilter('Transaction Type: All');
            setStoreFilter('Store: All Locations');
          }}
          className="ml-auto text-[var(--primary)] text-[10px] font-bold uppercase tracking-wider hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Data Table Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Transaction No</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Date & Time</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Type</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Reference / Store</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Debit</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Credit</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Balance</th>
                <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
              {filteredData.length > 0 ? filteredData.map((tx, i) => (
                <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-3 py-2 font-bold text-xs text-black dark:text-white">{tx.id}</td>
                  <td className="px-3 py-2 text-xs font-semibold text-black/50 dark:text-white/50">{tx.date}</td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider border ${getTypeStyle(tx.type)}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs font-semibold text-black/70 dark:text-white/70">{tx.reference}</td>
                  <td className="px-3 py-2 text-right text-xs font-bold text-rose-600 dark:text-rose-400">
                    {tx.debit ? formatCurrency(tx.debit) : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-xs font-bold text-emerald-600 dark:text-emerald-500">
                    {tx.credit ? formatCurrency(tx.credit) : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-xs font-bold text-black dark:text-white">
                    {formatCurrency(tx.balance)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button 
                      onClick={() => onViewTransaction && onViewTransaction(tx)}
                      className="p-1 text-black/50 dark:text-white/50 hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Eye size={12} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-3 py-4 text-center text-black/50 dark:text-white/50 font-semibold text-xs">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 px-3.5 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-black/50 dark:text-white/50 font-bold">
            Showing <span className="font-bold text-black dark:text-white">1 - {filteredData.length}</span> of 18,540 transactions
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-30 text-black/50 dark:text-white/50 transition-colors" disabled>
              <ChevronLeft size={12} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold shadow-sm">1</button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-[10px] font-bold text-black/50 dark:text-white/50 transition-colors">2</button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-[10px] font-bold text-black/50 dark:text-white/50 transition-colors">3</button>
            <span className="px-1 text-black/50">...</span>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-[10px] font-bold text-black/50 dark:text-white/50 transition-colors">371</button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-black/50 dark:text-white/50 transition-colors">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
