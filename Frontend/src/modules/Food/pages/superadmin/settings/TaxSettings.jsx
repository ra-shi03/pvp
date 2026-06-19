import React from 'react';
import { 
  Calculator, History, Download, Plus, TrendingUp, Globe, Map, CheckCircle, AlertTriangle, 
  ChevronRight, RefreshCw, PlusCircle, XCircle 
} from 'lucide-react';
import RuleManagement from './RuleManagement';
import CreateTaxRule from './CreateTaxRule';
import TaxAuditHistory from './TaxAuditHistory';
import TaxCalculation from './TaxCalculation';

export default function TaxSettings() {
  const [isCreateRuleOpen, setIsCreateRuleOpen] = React.useState(false);
  const [isAuditHistoryOpen, setIsAuditHistoryOpen] = React.useState(false);
  const [isTaxCalculationOpen, setIsTaxCalculationOpen] = React.useState(false);

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4 flex flex-col">
      <CreateTaxRule isOpen={isCreateRuleOpen} onClose={() => setIsCreateRuleOpen(false)} />
      <TaxCalculation isOpen={isTaxCalculationOpen} onClose={() => setIsTaxCalculationOpen(false)} />
      
      {isAuditHistoryOpen ? (
        <TaxAuditHistory isOpen={isAuditHistoryOpen} onClose={() => setIsAuditHistoryOpen(false)} />
      ) : (
        <div className="animate-in fade-in duration-300 flex-1 flex flex-col space-y-4">
          {/* Top App Bar Header inside the layout */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h1 className="text-lg font-bold text-black dark:text-white">Tax Settings</h1>
              <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Manage global and region-based tax rules and compliance.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2">
                <button 
                  onClick={() => setIsTaxCalculationOpen(true)}
                  className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded transition-colors flex items-center gap-1.5 font-bold text-[11px] shadow-sm"
                >
                  <Calculator size={12} />
                  <span>Calculator Preview</span>
                </button>
                <button 
                  onClick={() => setIsAuditHistoryOpen(true)}
                  className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded transition-colors flex items-center gap-1.5 font-bold text-[11px] shadow-sm"
                >
                  <History size={12} />
                  <span>Audit Logs</span>
                </button>
                <button className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded transition-colors flex items-center gap-1.5 font-bold text-[11px] shadow-sm">
                  <Download size={12} />
                  <span>Export</span>
                </button>
              </div>
              <button 
                onClick={() => setIsCreateRuleOpen(true)}
                className="px-3 py-1.5 bg-[var(--primary)] text-white hover:opacity-90 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 font-bold text-[11px] shadow-md"
              >
                <Plus size={12} />
                <span>Add Tax Rule</span>
              </button>
            </div>
          </header>
 
          {/* Section 1: KPI Overview */}
          <section className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold text-black dark:text-white">Snapshot</h3>
              <select className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 text-xs rounded-lg px-2.5 py-1 font-bold outline-none text-black dark:text-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all">
                <option>Today</option>
                <option>Week</option>
                <option selected>Month</option>
                <option>Year</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Total Tax Rules */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Total Tax Rules</span>
                  <span className="text-base font-black text-black dark:text-white">125</span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-500 flex items-center text-[10px] font-bold gap-0.5 bg-emerald-50 dark:bg-emerald-955/20 px-1.5 py-0.5 rounded-full">
                  <TrendingUp size={11} /> +3
                </span>
              </div>
              
              {/* Active Rules */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Active Rules</span>
                  <span className="text-base font-black text-black dark:text-white">110</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-bold">88%</span>
              </div>
              
              {/* Countries Covered */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Countries Covered</span>
                  <span className="text-base font-black text-black dark:text-white">8</span>
                </div>
                <Globe size={16} className="text-black/50 dark:text-white/50" />
              </div>
              
              {/* States Covered */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">States Covered</span>
                  <span className="text-base font-black text-black dark:text-white">125</span>
                </div>
                <Map size={16} className="text-black/50 dark:text-white/50" />
              </div>
              
              {/* Tax Revenue */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm border-l-4 border-l-[var(--primary)] flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Tax Revenue</span>
                <span className="text-base font-black text-[var(--primary)]">₹12,45,000</span>
                <p className="text-[9px] font-bold text-black/50 dark:text-white/50">Collected this month</p>
              </div>
            </div>
          </section>
 
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
            {/* Rule Management Table Component */}
            <RuleManagement />
 
            {/* Tax Coverage & Engine Status */}
            <section className="space-y-4">
              {/* Engine Status Card */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-3 space-y-3">
                <h3 className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">System Health</h3>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-500" />
                      <span className="text-xs font-semibold text-black dark:text-white">Tax Rule Engine</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase">Operational</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-500" />
                      <span className="text-xs font-semibold text-black dark:text-white">Tax Calculator API</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase">Operational</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
                      <span className="text-xs font-semibold text-black dark:text-white">Compliance Sync</span>
                    </div>
                    <span className="text-[10px] text-amber-500 font-bold uppercase">Sync Delay</span>
                  </div>
                </div>
              </div>
 
              {/* Coverage Tree */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-3 overflow-hidden h-fit">
                <h3 className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider mb-2">Regional Coverage</h3>
                <div className="space-y-1.5 scrollbar-none max-h-[300px] overflow-y-auto pr-0.5">
                  {/* India Node */}
                  <details className="group" open>
                    <summary className="flex items-center gap-1.5 list-none cursor-pointer p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 rounded-lg transition-colors">
                      <ChevronRight size={12} className="text-black/50 dark:text-white/50 transition-transform group-open:rotate-90" />
                      <span className="text-xs font-bold flex-1 text-black dark:text-white">India</span>
                      <span className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)] px-1.5 py-0.5 rounded font-bold">42 Rules</span>
                    </summary>
                    <div className="ml-6 mt-1 space-y-0.5 border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 py-0.5">
                      <div className="flex justify-between items-center text-xs text-black/70 dark:text-white/70 hover:text-[var(--primary)] font-semibold cursor-pointer py-0.5">
                        <span>Madhya Pradesh</span>
                        <span className="text-[9px] font-bold text-black/50 dark:text-white/50">12 Rules</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-black/70 dark:text-white/70 hover:text-[var(--primary)] font-semibold cursor-pointer py-0.5">
                        <span>Karnataka</span>
                        <span className="text-[9px] font-bold text-black/50 dark:text-white/50">8 Rules</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-black/70 dark:text-white/70 hover:text-[var(--primary)] font-semibold cursor-pointer py-0.5">
                        <span>Maharashtra</span>
                        <span className="text-[9px] font-bold text-black/50 dark:text-white/50">15 Rules</span>
                      </div>
                    </div>
                  </details>
                  
                  {/* Gujarat Node */}
                  <details className="group">
                    <summary className="flex items-center gap-1.5 list-none cursor-pointer p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 rounded-lg transition-colors">
                      <ChevronRight size={12} className="text-black/50 dark:text-white/50 transition-transform group-open:rotate-90" />
                      <span className="text-xs font-bold flex-1 text-black dark:text-white">Gujarat</span>
                      <span className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)] px-1.5 py-0.5 rounded font-bold">5 Rules</span>
                    </summary>
                    <div className="ml-6 mt-1 space-y-0.5 border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 py-0.5">
                      <div className="text-xs text-black/70 dark:text-white/70 font-semibold py-0.5">Ahmedabad</div>
                      <div className="text-xs text-black/70 dark:text-white/70 font-semibold py-0.5">Surat</div>
                    </div>
                  </details>
 
                  {/* Delhi Node */}
                  <details className="group">
                    <summary className="flex items-center gap-1.5 list-none cursor-pointer p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 rounded-lg transition-colors">
                      <ChevronRight size={12} className="text-black/50 dark:text-white/50 transition-transform group-open:rotate-90" />
                      <span className="text-xs font-bold flex-1 text-black dark:text-white">Delhi</span>
                      <span className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)] px-1.5 py-0.5 rounded font-bold">8 Rules</span>
                    </summary>
                    <div className="ml-6 mt-1 space-y-0.5 border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 py-0.5">
                      <div className="text-xs text-black/70 dark:text-white/70 font-semibold py-0.5">New Delhi</div>
                    </div>
                  </details>
                </div>
              </div>
            </section>
          </div>
 
          {/* Section 4: Configuration & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Configuration */}
            <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-3.5">
              <h3 className="text-xs font-bold text-black dark:text-white mb-3">Global Configuration</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-black dark:text-white">Enable Global Tax</p>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70">Apply base tax rules across all franchises by default.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-black dark:text-white">Region-Based Overrides</p>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70">Allow local franchise owners to submit tax override requests.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
 
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] font-bold text-black/70 dark:text-white/70 mb-1.5">Calculation Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-1.5 p-2 border border-[var(--primary)] bg-[var(--primary)]/5 rounded-lg cursor-pointer transition-colors">
                      <input type="radio" name="calc_method" defaultChecked className="text-[var(--primary)] focus:ring-[var(--primary)] h-3.5 w-3.5" />
                      <span className="text-xs text-black dark:text-white font-bold">Inclusive</span>
                    </label>
                    <label className="flex items-center gap-1.5 p-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 rounded-lg cursor-pointer transition-colors">
                      <input type="radio" name="calc_method" className="text-[var(--primary)] focus:ring-[var(--primary)] h-3.5 w-3.5" />
                      <span className="text-xs text-black dark:text-white font-bold">Exclusive</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
 
            {/* Recent Activity Feed */}
            <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-3.5 flex flex-col h-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-black dark:text-white">Audit Trail</h3>
                <button className="text-[var(--primary)] text-xs font-bold hover:underline">View All</button>
              </div>
              <div className="flex-1 space-y-3 scrollbar-none overflow-y-auto max-h-[200px]">
                <div className="flex gap-2">
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                      <RefreshCw size={12} />
                    </div>
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[2px] h-full bg-zinc-200 dark:bg-zinc-800/50"></div>
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs text-black dark:text-white"><strong className="font-bold">Rahul Sharma</strong> updated rule <strong className="font-bold">GST MP</strong></p>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Rate changed from 12% to 18%</p>
                    <span className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase mt-0.5 block">2 hours ago</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                      <PlusCircle size={12} />
                    </div>
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[2px] h-full bg-zinc-200 dark:bg-zinc-800/50"></div>
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs text-black dark:text-white"><strong className="font-bold">System</strong> created new region <strong className="font-bold">Goa</strong></p>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Auto-sync with State Tax Directory completed.</p>
                    <span className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase mt-0.5 block">5 hours ago</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                      <XCircle size={12} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-black dark:text-white"><strong className="font-bold">Sarah Jones</strong> deactivated <strong className="font-bold">KA Retail Tax</strong></p>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Pending compliance review for Q3.</p>
                    <span className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase mt-0.5 block">Yesterday</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
