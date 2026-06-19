import React from 'react';
import { X, Calendar, FilterX, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TaxAuditHistory({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm animate-in slide-in-from-right-4 fade-in duration-300 overflow-hidden">
          {/* Header */}
          <header className="flex justify-between items-center px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Tax Audit History</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">System logs for tax rule modifications</p>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <X size={16} className="text-zinc-500" />
            </button>
          </header>

          {/* Filters Section (Dense) */}
          <section className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 space-y-3 shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Admin Filter */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Admin</label>
                <select className="h-8 px-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all">
                  <option>All Administrators</option>
                  <option>John Doe</option>
                  <option>Sarah Chen</option>
                  <option>Michael Scott</option>
                </select>
              </div>
              
              {/* Date Range */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Date Range</label>
                <div className="relative h-8">
                  <input type="text" readOnly value="Last 30 Days" className="w-full h-full px-2.5 pr-8 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs focus:border-[var(--primary)] outline-none cursor-default" />
                  <Calendar size={15} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Region Filter */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Region</label>
                <select className="h-8 px-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs focus:border-[var(--primary)] outline-none transition-all">
                  <option>All Regions</option>
                  <option>North India</option>
                  <option>South India</option>
                  <option>West India</option>
                  <option>Central India</option>
                </select>
              </div>
              
              {/* Tax Type Filter */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Tax Type</label>
                <select className="h-8 px-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-xs focus:border-[var(--primary)] outline-none transition-all">
                  <option>All Types</option>
                  <option>VAT</option>
                  <option>Sales Tax</option>
                  <option>Service Tax</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <button className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline">
                <FilterX size={14} />
                Clear All
              </button>
              <button className="flex items-center gap-1.5 px-3 h-8 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95">
                <Download size={14} />
                Export Reports
              </button>
            </div>
          </section>

          {/* Audit Table */}
          <main className="flex-1 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-800/80 backdrop-blur-sm z-10 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Admin</th>
                  <th className="px-4 py-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Old Value</th>
                  <th className="px-4 py-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">New Value</th>
                  <th className="px-4 py-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">2023-10-24 14:22</td>
                  <td className="px-4 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">S. Chen</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold">Updated</span>
                  </td>
                  <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 italic">8.50%</td>
                  <td className="px-4 py-2 text-xs font-bold text-[var(--primary)]">8.75%</td>
                  <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-xs">Annual inflation adjustment...</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">2023-10-22 09:15</td>
                  <td className="px-4 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">J. Doe</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold">Created</span>
                  </td>
                  <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 italic">N/A</td>
                  <td className="px-4 py-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">MH_SVC_TX</td>
                  <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-xs">New regional service tax code...</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">2023-10-20 18:45</td>
                  <td className="px-4 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">Admin_Auto</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold">Disabled</span>
                  </td>
                  <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 italic">Active</td>
                  <td className="px-4 py-2 text-xs font-bold text-red-500">Inactive</td>
                  <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-xs">Sunset of COVID-19 relief rates...</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">2023-10-18 11:30</td>
                  <td className="px-4 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">S. Chen</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold">Updated</span>
                  </td>
                  <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 italic">GST_12</td>
                  <td className="px-4 py-2 text-xs font-bold text-[var(--primary)]">GST_18</td>
                  <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-xs">Directive 2023/X compliance...</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">2023-10-17 14:10</td>
                  <td className="px-4 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">M. Scott</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold">Updated</span>
                  </td>
                  <td className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 italic">Pune_ST</td>
                  <td className="px-4 py-2 text-xs font-bold text-[var(--primary)]">Mumbai_Central_ST</td>
                  <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-xs">Consolidating regional codes...</td>
                </tr>
              </tbody>
            </table>
          </main>

          {/* Footer / Pagination */}
          <footer className="px-4 py-2.5 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Showing 1-10 of 248 entries</span>
            <div className="flex gap-1">
              <button className="w-7 h-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 transition-colors active:scale-95">
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-[var(--primary)] bg-[var(--primary)] text-white rounded-lg text-[11px] font-bold shadow-sm">1</button>
              <button className="w-7 h-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[11px] font-bold transition-colors">2</button>
              <button className="w-7 h-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[11px] font-bold transition-colors">3</button>
              <button className="w-7 h-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 transition-colors active:scale-95">
                <ChevronRight size={14} />
              </button>
            </div>
          </footer>
    </div>
  );
}
