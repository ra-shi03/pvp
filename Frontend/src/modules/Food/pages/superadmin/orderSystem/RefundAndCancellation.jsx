import React, { useState } from 'react';
import { 
  ClipboardList, Search, Bell, Clock, 
  AlertTriangle, Filter, Download, MoreVertical,
  ChevronLeft, ChevronRight, CheckSquare,
  ExternalLink, X, CheckCircle, Eye 
} from 'lucide-react';
import { initialRefunds, useDebounce } from './RefundCancellationData';
import RefundCancellationDetails from './RefundCancellationDetails';
import RefundCancellationReport from './RefundCancellationReport';

export default function RefundAndCancellation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedRefundForDetails, setSelectedRefundForDetails] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter refunds based on debounced search term and status filter
  const filteredRefunds = initialRefunds.filter(refund => {
    const matchesSearch = refund.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                          refund.customer.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || refund.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredRefunds.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isAllSelected = filteredRefunds.length > 0 && selectedIds.length === filteredRefunds.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < filteredRefunds.length;

  const handleExportAll = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const dataHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Refunds and Cancellations Export</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #111827; }
            h1 { color: #af101a; font-size: 24px; margin-bottom: 20px; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            th, td { padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: left; }
            th { background-color: #f9fafb; font-weight: bold; font-size: 14px; }
            td { font-size: 14px; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <h1>Refunds and Cancellations Report</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Requested At</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRefunds.map(r => `
                <tr>
                  <td>${r.id}</td>
                  <td>${r.customer}</td>
                  <td>${r.amount}</td>
                  <td>${r.status}</td>
                  <td>${r.requestedAt}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(dataHtml);
    printWindow.document.close();
  };

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4">
      {/* Header Search & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-2">
        <div className="space-y-0.5">
          <h1 className="text-lg font-bold text-black dark:text-white leading-tight">Refunds & Cancellations</h1>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Manage and process multiple refund requests efficiently.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end">
          <button className="p-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative shrink-0">
            <Bell size={14} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Quick Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Card 1 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <span>Pending Approvals</span>
              <span className="text-emerald-700 dark:text-emerald-400 text-[8px] font-bold bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span> 12 New
              </span>
            </span>
            <h3 className="text-lg font-black text-black dark:text-white mt-0.5">124</h3>
          </div>
          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md shrink-0 border border-blue-100 dark:border-blue-900/30">
            <Clock size={14} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <span>Processed Today</span>
              <span className="text-black dark:text-white text-[8px] font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full shrink-0">
                Total ₹4.2k
              </span>
            </span>
            <h3 className="text-lg font-black text-black dark:text-white mt-0.5">87</h3>
          </div>
          <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-md shrink-0 border border-emerald-105 dark:border-emerald-900/30">
            <ClipboardList size={14} className="text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md border-t-2 border-t-red-500">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <span>Disputed Items</span>
              <span className="text-red-700 dark:text-red-400 text-[8px] font-bold bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded-full shrink-0">
                High Priority
              </span>
            </span>
            <h3 className="text-lg font-black text-red-650 dark:text-red-400 mt-0.5">05</h3>
          </div>
          <div className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-md shrink-0 border border-red-100 dark:border-red-900/30">
            <AlertTriangle size={14} className="text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Table Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
        <h2 className="text-xs font-bold text-black dark:text-white">Active Requests</h2>
        <div className="flex flex-col sm:flex-row items-center gap-1.5 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60" size={14} />
            <input 
              className="pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none w-full sm:w-56 font-semibold placeholder-zinc-500" 
              placeholder="Search Refund ID..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-zinc-950 border rounded-lg text-xs font-bold transition-all shadow-sm ${showFilters ? 'border-[var(--primary)] text-[var(--primary)] bg-red-50 dark:bg-red-900/10' : 'border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}
          >
            <Filter size={12} />
            <span>Filters</span>
          </button>
          <button 
            onClick={handleExportAll}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-[var(--primary)] text-white border border-transparent rounded-lg hover:opacity-90 active:scale-95 transition-all text-xs font-bold shadow-md cursor-pointer"
          >
            <Download size={12} />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Expanded Filters UI */}
      {showFilters && (
        <div className="bg-white dark:bg-zinc-900 p-2.5 border border-zinc-200 dark:border-zinc-800 rounded-lg mb-4 shadow-sm flex flex-col sm:flex-row gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex-1 max-w-[180px]">
            <label className="block text-[9px] font-bold text-black dark:text-white uppercase tracking-wider mb-1">Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Pending">Pending</option>
              <option value="Priority">Priority</option>
            </select>
          </div>
        </div>
      )}

      {/* High-Density List Container */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2 px-3 w-10 text-center">
                  <input 
                    className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-600 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer" 
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Refund ID</th>
                <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Customer</th>
                <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Amount</th>
                <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Status</th>
                <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Requested At</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-3 py-6 text-center text-black/60 dark:text-white/60 text-xs font-semibold">
                    No refunds found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredRefunds.map((refund) => (
                  <tr 
                    key={refund.id} 
                    className={`group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer ${selectedIds.includes(refund.id) ? 'bg-zinc-50 dark:bg-zinc-800/30' : ''}`}
                    onClick={(e) => {
                      if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
                        handleSelectRow(refund.id);
                      }
                    }}
                  >
                    <td className="px-3 py-2 text-center">
                      <input 
                        className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-600 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer" 
                        type="checkbox"
                        checked={selectedIds.includes(refund.id)}
                        onChange={() => handleSelectRow(refund.id)}
                      />
                    </td>
                    <td className="px-3 py-2 text-xs font-bold text-[var(--primary)] font-mono tracking-tight">{refund.id}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-black dark:text-white shrink-0 border border-zinc-200 dark:border-zinc-700">
                          {refund.initials}
                        </div>
                        <span className="text-xs font-bold text-black dark:text-white">{refund.customer}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs font-bold text-black dark:text-white">{refund.amount}</td>
                    <td className="px-3 py-2">
                      {refund.status === 'New' && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold tracking-wide uppercase">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> New
                        </span>
                      )}
                      {refund.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[9px] font-bold tracking-wide uppercase">
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span> Pending
                        </span>
                      )}
                      {refund.status === 'Priority' && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[9px] font-bold tracking-wide uppercase">
                          <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span> Priority
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs font-semibold text-black dark:text-white">{refund.requestedAt}</td>
                    <td className="px-3 py-2 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRefundForDetails(refund);
                          setIsDetailsOpen(true);
                        }}
                        className="p-1 hover:bg-zinc-150 dark:hover:bg-zinc-800 rounded-lg text-black/60 dark:text-white/60 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/50">
          <span className="text-[11px] font-semibold text-black/70 dark:text-white/70">
            Showing {filteredRefunds.length} of {initialRefunds.length} entries
          </span>
          <div className="flex items-center gap-1.5">
            <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft size={12} />
            </button>
            <span className="w-6 h-6 flex items-center justify-center bg-[var(--primary)] text-white rounded text-[10px] font-bold shadow-sm">1</span>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white text-[10px] font-bold bg-transparent transition-colors">2</button>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white text-[10px] font-bold bg-transparent transition-colors">3</button>
            <button className="w-6 h-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white transition-colors">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Bulk Action Bar */}
      <div 
        className={`fixed bottom-0 left-0 lg:left-[280px] right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.4)] p-3 md:px-6 transition-transform duration-300 z-40 flex justify-center ${selectedIds.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/20">
              <CheckSquare size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--primary)]">{selectedIds.length} Items Selected</p>
              <p className="text-[10px] font-semibold text-black/70 dark:text-white/70">Bulk actions will apply to all selected refund requests.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 w-full sm:w-auto">
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 border border-zinc-250 dark:border-zinc-750 bg-white dark:bg-zinc-950 text-black dark:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-[11px] font-bold cursor-pointer"
            >
              <ExternalLink size={12} />
              <span>Export</span>
            </button>
            <button className="flex items-center justify-center gap-1 px-2.5 py-1.5 border border-red-250 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-650 dark:text-red-400 rounded-lg hover:opacity-90 transition-all text-[11px] font-bold cursor-pointer">
              <X size={12} />
              <span>Reject</span>
            </button>
            <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 active:scale-[0.98] transition-all text-[11px] font-bold shadow-lg shadow-[var(--primary)]/20 cursor-pointer">
              <CheckCircle size={12} />
              <span>Approve</span>
            </button>
          </div>
        </div>
      </div>

      <RefundCancellationDetails 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        refund={selectedRefundForDetails} 
      />

      <RefundCancellationReport 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  );
}
