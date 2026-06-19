import React, { useState } from 'react';
import { 
  Layers, X, CheckCircle, RefreshCw, Globe, MapPin, Download, Trash2, 
  ChevronDown, Info, Search, Circle, Map, FileText, Grid, AlertTriangle, HelpCircle 
} from 'lucide-react';

export default function BulkAction({ isOpen, onClose }) {
  const [activeAction, setActiveAction] = useState('update-status');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Bulk Actions Modal */}
      <div className="bg-white dark:bg-zinc-950 w-full max-w-xl border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-full animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Layers className="text-[var(--primary)]" size={18} />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Bulk Actions</h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal" 
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 dark:text-zinc-400"
          >
            <X size={18} />
          </button>
        </header>

        {/* Selection Summary Bar */}
        <div className="bg-[var(--primary)]/5 px-4 py-1.5 flex items-center justify-between border-b border-[var(--primary)]/10 dark:border-[var(--primary)]/20">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="text-[var(--primary)]" size={16} />
            <span className="text-xs font-semibold text-[var(--primary)]">12 Stores Selected</span>
          </div>
          <button className="text-[var(--primary)] text-xs font-semibold hover:underline">Clear Selection</button>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
          {/* Action List (Vertical Selection) */}
          <nav className="w-full sm:w-[150px] lg:w-[170px] shrink-0 border-b sm:border-b-0 sm:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-955 overflow-y-auto">
            <ul className="py-1">
              <li>
                <button 
                  className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2 transition-colors ${activeAction === 'update-status' ? 'bg-white dark:bg-zinc-950 border-l-[3px] border-[var(--primary)] text-[var(--primary)] font-bold shadow-sm' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium'}`}
                  onClick={() => setActiveAction('update-status')}
                >
                  <RefreshCw size={14} className="shrink-0" />
                  <span className="text-xs">Update Status</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2 transition-colors ${activeAction === 'assign-region' ? 'bg-white dark:bg-zinc-950 border-l-[3px] border-[var(--primary)] text-[var(--primary)] font-bold shadow-sm' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium'}`}
                  onClick={() => setActiveAction('assign-region')}
                >
                  <Globe size={14} className="shrink-0" />
                  <span className="text-xs">Assign to Region</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2 transition-colors ${activeAction === 'assign-zone' ? 'bg-white dark:bg-zinc-950 border-l-[3px] border-[var(--primary)] text-[var(--primary)] font-bold shadow-sm' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium'}`}
                  onClick={() => setActiveAction('assign-zone')}
                >
                  <MapPin size={14} className="shrink-0" />
                  <span className="text-xs">Assign to Zone</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2 transition-colors ${activeAction === 'export' ? 'bg-white dark:bg-zinc-950 border-l-[3px] border-[var(--primary)] text-[var(--primary)] font-bold shadow-sm' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium'}`}
                  onClick={() => setActiveAction('export')}
                >
                  <Download size={14} className="shrink-0" />
                  <span className="text-xs">Export Data</span>
                </button>
              </li>
              <li className="mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-1.5">
                <button 
                  className={`w-full text-left px-3.5 py-2.5 flex items-center gap-2 transition-colors ${activeAction === 'delete' ? 'bg-red-50 dark:bg-red-950/20 border-l-[3px] border-red-600 text-red-600 font-bold' : 'hover:bg-red-50 dark:hover:bg-red-950/10 text-red-600 text-xs font-medium'}`}
                  onClick={() => setActiveAction('delete')}
                >
                  <Trash2 size={14} className="shrink-0" />
                  <span className="text-xs font-semibold">Delete Selected</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Action Configuration Area */}
          <main className="flex-1 p-3.5 overflow-y-auto bg-white dark:bg-zinc-955 text-zinc-900 dark:text-zinc-100">
            <div>
              {activeAction === 'update-status' && (
                <div className="action-panel">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Update Store Status</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Modify the operational status for all 12 selected franchise locations.</p>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-300 mb-1 block">New Status</span>
                      <div className="relative">
                        <select className="w-full h-9 px-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg appearance-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-xs">
                          <option value="active">Active (Operational)</option>
                          <option value="pending">Pending (Review)</option>
                          <option value="suspended">Suspended (Action Required)</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 dark:text-zinc-400" size={16} />
                      </div>
                    </label>
                    <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/30 flex gap-2.5">
                      <Info className="text-amber-600 dark:text-amber-500 shrink-0" size={16} />
                      <p className="text-xs text-amber-800 dark:text-amber-400">Changing status to "Suspended" will temporarily disable online ordering and POS access for these stores.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeAction === 'assign-region' && (
                <div className="action-panel">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Assign Region</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Reassign stores to a new regional management hierarchy.</p>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input 
                      className="w-full h-9 pl-8 pr-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none text-xs text-zinc-900 dark:text-zinc-100" 
                      placeholder="Search regions (e.g. Northeast, West Coast...)" 
                      type="text"
                    />
                  </div>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden bg-white dark:bg-zinc-950">
                    <div className="p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center justify-between cursor-pointer transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">NE</div>
                        <div>
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Northeast Division</div>
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Admin: Sarah Jenkins</div>
                        </div>
                      </div>
                      <Circle className="text-zinc-300 dark:text-zinc-600" size={16} />
                    </div>
                    <div className="p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center justify-between cursor-pointer transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded bg-orange-100 dark:bg-orange-955/40 text-orange-700 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">SE</div>
                        <div>
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Southeast Metro</div>
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Admin: Michael Chen</div>
                        </div>
                      </div>
                      <Circle className="text-zinc-300 dark:text-zinc-600" size={16} />
                    </div>
                  </div>
                </div>
              )}

              {activeAction === 'assign-zone' && (
                <div className="action-panel">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Assign Delivery Zone</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Select a regional parent first to view available zones.</p>
                  <div className="h-32 border-2 border-dashed border-zinc-350 dark:border-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 p-4 text-center">
                    <Map className="mb-1.5 text-zinc-400" size={24} />
                    <p className="text-xs">Zone selection depends on Region assignment.</p>
                  </div>
                </div>
              )}

              {activeAction === 'export' && (
                <div className="action-panel">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">Export Store Data</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <button className="p-2.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-lg hover:border-[var(--primary)] dark:hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10 transition-all flex flex-col items-center gap-1.5 shadow-sm">
                      <FileText className="text-green-600" size={20} />
                      <span className="text-xs font-semibold">CSV</span>
                    </button>
                    <button className="p-2.5 border border-[var(--primary)] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10 text-zinc-900 dark:text-zinc-100 rounded-lg flex flex-col items-center gap-1.5 shadow-sm ring-1 ring-[var(--primary)]">
                      <Grid className="text-green-700" size={20} />
                      <span className="text-xs font-semibold">Excel</span>
                    </button>
                    <button className="p-2.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-lg hover:border-[var(--primary)] dark:hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10 transition-all flex flex-col items-center gap-1.5 shadow-sm">
                      <FileText className="text-red-600" size={20} />
                      <span className="text-xs font-semibold">PDF</span>
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-1.5 cursor-pointer group">
                      <input defaultChecked className="w-3.5 h-3.5 rounded text-[var(--primary)] focus:ring-[var(--primary)] border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" type="checkbox" />
                      <span className="text-xs text-zinc-700 dark:text-zinc-300">Include financial performance metrics</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer group">
                      <input defaultChecked className="w-3.5 h-3.5 rounded text-[var(--primary)] focus:ring-[var(--primary)] border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer" type="checkbox" />
                      <span className="text-xs text-zinc-700 dark:text-zinc-300">Include store manager contact details</span>
                    </label>
                  </div>
                </div>
              )}

              {activeAction === 'delete' && (
                <div className="action-panel">
                  <div className="bg-red-50/50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900/30">
                    <h3 className="text-sm font-bold text-red-650 dark:text-red-500 mb-2 flex items-center gap-1.5">
                      <AlertTriangle size={18} />
                      Dangerous Action
                    </h3>
                    <p className="text-xs text-red-800 dark:text-red-400 mb-4">
                      You are about to delete <strong>12 selected stores</strong> from the Provisions Enterprise network. This action is irreversible.
                    </p>
                    <div className="space-y-2.5">
                      <p className="text-[10px] font-bold text-red-900 dark:text-red-450 uppercase tracking-wider">Type CONFIRM to proceed</p>
                      <input 
                        className="w-full h-9 px-3 bg-white dark:bg-zinc-950 border border-red-350 dark:border-red-900/40 rounded-lg outline-none focus:ring-2 focus:ring-red-500/20 text-xs text-zinc-900 dark:text-zinc-100 font-mono" 
                        placeholder="CONFIRM" 
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Modal Footer */}
        <footer className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between bg-zinc-50 dark:bg-zinc-955 gap-3 shrink-0">
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <HelpCircle size={14} />
            <span className="text-[10px] font-semibold">Affects 12 entities</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={onClose}
              className="flex-1 sm:flex-none h-9 px-4 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 text-xs font-semibold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              className={`flex-1 sm:flex-none h-9 px-4 text-xs font-bold rounded-lg shadow-md transition-all active:scale-[0.98] ${
                activeAction === 'delete' 
                  ? 'bg-red-600 text-white shadow-red-600/20 hover:bg-red-700' 
                  : 'bg-[var(--primary)] text-white shadow-[var(--primary)]/20 hover:brightness-110'
              }`}
            >
              {activeAction === 'delete' ? 'Confirm Delete' : 'Apply Action'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
