import React, { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, Store, Globe, Filter, RefreshCw, MoreVertical, Eye, RotateCcw, Info, ChevronLeft, ChevronRight } from 'lucide-react';

const mockTransactions = [
  { id: '#PAY-99231', orderId: '#PZ-12401', customer: { name: 'Rahul Kapoor', initials: 'RK' }, store: 'Indiranagar HQ', gateway: 'Razorpay', amount: 1240.00, status: 'SUCCESSFUL' },
  { id: '#PAY-99230', orderId: '#PZ-12400', customer: { name: 'Sneha Nair', initials: 'SN' }, store: 'Koramangala 3rd', gateway: 'Stripe', amount: 850.50, status: 'FAILED' },
  { id: '#PAY-99229', orderId: '#PZ-12399', customer: { name: 'Arjun Mehta', initials: 'AM' }, store: 'MG Road Mall', gateway: 'PhonePe', amount: 3420.00, status: 'PENDING' },
  { id: '#PAY-99228', orderId: '#PZ-12398', customer: { name: 'Lisa D\'Souza', initials: 'LD' }, store: 'Whitefield', gateway: 'Razorpay', amount: 1999.00, status: 'REFUNDED' },
  { id: '#PAY-99227', orderId: '#PZ-12397', customer: { name: 'Vikram Singh', initials: 'VS' }, store: 'Indiranagar HQ', gateway: 'Paytm', amount: 550.00, status: 'SUCCESSFUL' },
];

export default function PaymentsData({ onProcessRefund, onViewTransaction }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('Today');
  const [storeFilter, setStoreFilter] = useState('All Stores');
  const [gatewayFilter, setGatewayFilter] = useState('All Gateways');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Debouncing Search Term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    return mockTransactions.filter(item => {
      const matchSearch = item.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                          item.orderId.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                          item.customer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchStore = storeFilter === 'All Stores' || item.store === storeFilter;
      const matchGateway = gatewayFilter === 'All Gateways' || item.gateway === gatewayFilter;
      const matchStatus = statusFilter === 'All Statuses' || item.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchSearch && matchStore && matchGateway && matchStatus;
    });
  }, [debouncedSearchTerm, storeFilter, gatewayFilter, statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'SUCCESSFUL': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'FAILED': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800';
      case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800';
      case 'REFUNDED': return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-800';
      default: return 'bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  return (
    <>
      {/* Filters Bar */}
      <div className="sticky top-12 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl shadow-sm flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" size={12} />
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none text-xs transition-colors text-black dark:text-white" 
            placeholder="Search Customer, Order, or Transaction ID..." 
            type="text" 
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="text-black/50 dark:text-white/50" size={12} />
          <select 
            value={dateRange} onChange={(e) => setDateRange(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold py-1 px-2 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] text-black dark:text-white transition-colors"
          >
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Custom Range</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <Store className="text-black/50 dark:text-white/50" size={12} />
          <select 
             value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}
             className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold py-1 px-2 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] text-black dark:text-white transition-colors"
          >
            <option>All Stores</option>
            <option>Indiranagar HQ</option>
            <option>Koramangala 3rd</option>
            <option>MG Road Mall</option>
            <option>Whitefield</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <Globe className="text-black/50 dark:text-white/50" size={12} />
          <select 
            value={gatewayFilter} onChange={(e) => setGatewayFilter(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold py-1 px-2 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] text-black dark:text-white transition-colors"
          >
            <option>All Gateways</option>
            <option>Razorpay</option>
            <option>Stripe</option>
            <option>PhonePe</option>
            <option>Paytm</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="text-black/50 dark:text-white/50" size={12} />
          <select 
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold py-1 px-2 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] text-black dark:text-white transition-colors"
          >
            <option>All Statuses</option>
            <option>Successful</option>
            <option>Failed</option>
            <option>Refunded</option>
            <option>Pending</option>
          </select>
        </div>
        <button 
          onClick={() => {
            setSearchTerm('');
            setDateRange('Today');
            setStoreFilter('All Stores');
            setGatewayFilter('All Gateways');
            setStatusFilter('All Statuses');
          }}
          className="ml-auto w-7 h-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-black/70 dark:text-white/70"
        >
          <RefreshCw size={12} />
        </button>
      </div>

      {/* Data Table */}
      <section className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden mb-4">
        <div className="px-3.5 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h5 className="font-bold text-xs text-black dark:text-white">Recent Transactions</h5>
            <span className="px-1.5 py-0.2 bg-zinc-100 dark:bg-zinc-800 text-black/70 dark:text-white/70 text-[9px] font-black rounded-full uppercase tracking-wider">Live Feed</span>
          </div>
          <div className="flex gap-1.5">
            <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-black/50 dark:text-white/50">
              <MoreVertical size={14} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50/50 dark:bg-zinc-950/50 sticky top-0">
              <tr>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 w-8"><input className="rounded border-zinc-300 dark:border-zinc-700 text-[var(--primary)] focus:ring-[var(--primary)]" type="checkbox" /></th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Payment ID</th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Order ID</th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Customer</th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Store</th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Gateway</th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Amount</th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Status</th>
                <th className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
              {filteredData.length > 0 ? filteredData.map((tx, i) => (
                <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-3 py-2"><input className="rounded border-zinc-300 dark:border-zinc-700 text-[var(--primary)] focus:ring-[var(--primary)] bg-transparent" type="checkbox" /></td>
                  <td className="px-3 py-2 text-[var(--primary)] font-bold text-xs">{tx.id}</td>
                  <td className="px-3 py-2 text-xs font-semibold text-black/70 dark:text-white/70">{tx.orderId}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-black dark:text-white shrink-0">{tx.customer.initials}</div>
                      <span className="text-xs font-semibold text-black dark:text-white">{tx.customer.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs font-semibold text-black/70 dark:text-white/70">{tx.store}</td>
                  <td className="px-3 py-2">
                    <span className="text-[9px] font-bold text-black/70 dark:text-white/70 uppercase px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200/50 dark:border-zinc-700/50">{tx.gateway}</span>
                  </td>
                  <td className="px-3 py-2 font-bold text-xs text-black dark:text-white">₹{tx.amount.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right">
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${getStatusStyle(tx.status)}`}>{tx.status}</span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button 
                      onClick={() => {
                        if (tx.status === 'REFUNDED') {
                          onProcessRefund && onProcessRefund(tx);
                        } else if (tx.status === 'SUCCESSFUL') {
                          onViewTransaction && onViewTransaction(tx);
                        }
                      }}
                      className="p-1 text-black/50 dark:text-white/50 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      {tx.status === 'SUCCESSFUL' || tx.status === 'PENDING' ? <Eye size={12} /> : tx.status === 'FAILED' ? <RotateCcw size={12} /> : <Info size={12} />}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="px-3 py-4 text-center text-black/50 dark:text-white/50 font-semibold text-xs">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-3.5 py-2 bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <p className="text-[10px] text-black/50 dark:text-white/50 font-bold">Showing {filteredData.length > 0 ? 1 : 0}-{Math.min(10, filteredData.length)} of {filteredData.length} transactions</p>
          <div className="flex gap-1.5">
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-50 text-black/50 dark:text-white/50" disabled>
              <ChevronLeft size={12} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-[var(--primary)] text-white rounded text-[10px] font-bold shadow-sm">1</button>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 text-[10px] font-bold text-black/50 dark:text-white/50">2</button>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 text-[10px] font-bold text-black/50 dark:text-white/50">3</button>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded hover:bg-white dark:hover:bg-zinc-800 text-black/50 dark:text-white/50">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
