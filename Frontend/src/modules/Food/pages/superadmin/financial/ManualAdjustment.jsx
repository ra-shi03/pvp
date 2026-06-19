import React, { useState } from 'react';
import { ChevronRight, FileEdit, Store, AlertCircle, UploadCloud, CheckCircle2, Hourglass, Info } from 'lucide-react';

export default function ManualAdjustment({ onCancel }) {
  const [amount, setAmount] = useState('1,240.50');
  const [hasError, setHasError] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAmountBlur = () => {
    const val = amount.replace(/,/g, '');
    if (isNaN(val) || val === '') {
      setHasError(true);
    } else {
      setHasError(false);
      setAmount(parseFloat(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
  };

  return (
    <div className="w-full animate-fade-in bg-zinc-50 dark:bg-zinc-950">
      {/* Breadcrumbs & Header */}
      <div className="mb-4">
        <div className="flex items-center gap-1 text-black/50 dark:text-white/50 text-[10px] font-bold mb-1.5 uppercase tracking-widest">
          <span>Reconciliation</span>
          <ChevronRight size={10} />
          <span className="text-[var(--primary)]">Manual Adjustment</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h1 className="text-base font-bold text-black dark:text-white mb-0.5">Create Manual Adjustment</h1>
            <p className="text-black/50 dark:text-white/50 max-w-xl text-[11px] font-semibold">
              Use this form to correct settlement discrepancies or issue manual franchise credits. All adjustments require secondary approval for amounts exceeding ₹5,000.00.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={onCancel} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-black/70 dark:text-white/70 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95 shadow-sm text-xs">
              Cancel
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white font-bold shadow-sm hover:brightness-110 transition-all active:scale-95 text-xs">
              Submit for Approval
            </button>
          </div>
        </div>
      </div>

      {/* Bento Layout Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Main Form Section */}
        <div className="col-span-1 lg:col-span-8 space-y-4">
          
          {/* Core Details Card */}
          <section className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xs font-bold text-black dark:text-white mb-3.5 flex items-center gap-1.5">
              <FileEdit className="text-[var(--primary)]" size={14} />
              Adjustment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              
              {/* Adjustment Type */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Adjustment Type</label>
                <select className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold text-black dark:text-white focus:border-[var(--primary)] focus:ring-[var(--primary)] h-9 px-2.5 outline-none transition-all">
                  <option>Credit Adjustment</option>
                  <option>Debit Adjustment</option>
                  <option selected>Settlement Correction</option>
                  <option>Network Fee Reversal</option>
                  <option>Promotional Subsidy</option>
                </select>
              </div>

              {/* Store Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Store / Franchise</label>
                <div className="relative">
                  <select className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold text-black dark:text-white focus:border-[var(--primary)] focus:ring-[var(--primary)] h-9 pl-8 pr-3 outline-none transition-all appearance-none">
                    <option>Global Treasury (Default)</option>
                    <option>PizzaCorp - NY Manhattan #042</option>
                    <option>PizzaCorp - CA Palo Alto #108</option>
                    <option>PizzaCorp - TX Austin #215</option>
                  </select>
                  <Store className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" size={12} />
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Amount (INR)</label>
                <div className="relative">
                  <input 
                    className={`w-full rounded-lg border text-xs font-mono focus:ring-1 h-9 pl-7 pr-3 outline-none transition-all ${hasError ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-955/20 focus:border-rose-500 focus:ring-rose-500 text-rose-700 dark:text-rose-400 font-bold' : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white'}`}
                    placeholder="0.00" 
                    type="text" 
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50 font-bold">₹</span>
                </div>
                {hasError && (
                  <p className="text-[10px] text-rose-500 flex items-center gap-1 mt-0.5 font-semibold">
                    <AlertCircle size={10} />
                    Invalid amount format.
                  </p>
                )}
              </div>

              {/* Reference Number */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Reference Number</label>
                <input 
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold text-black dark:text-white focus:border-[var(--primary)] focus:ring-[var(--primary)] h-9 px-2.5 outline-none transition-all" 
                  type="text" 
                  defaultValue="ADJ-2023-9941"
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                <label className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Description</label>
                <textarea 
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold text-black dark:text-white focus:border-[var(--primary)] focus:ring-[var(--primary)] p-2.5 outline-none transition-all resize-none" 
                  placeholder="Provide a brief explanation for this adjustment..." 
                  rows="2"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Documentation & Internal Notes Card */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Document Upload */}
            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <h3 className="text-xs font-bold text-black dark:text-white mb-2.5">Supporting Docs</h3>
              <div className="flex-1 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg flex flex-col items-center justify-center p-4 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all cursor-pointer group bg-zinc-50 dark:bg-zinc-950/50 min-h-[110px]">
                <UploadCloud className="text-black/50 dark:text-white/50 group-hover:text-[var(--primary)] transition-colors mb-2" size={24} />
                <p className="text-xs font-bold text-black dark:text-white text-center">Click or Drag to Upload</p>
                <p className="text-[9px] text-black/50 dark:text-white/50 text-center mt-0.5">PDF, PNG, JPG (Max 10MB)</p>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
              <h3 className="text-xs font-bold text-black dark:text-white mb-2.5">Internal Notes</h3>
              <textarea 
                className="w-full flex-1 min-h-[110px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold text-black dark:text-white focus:border-[var(--primary)] focus:ring-[var(--primary)] p-2.5 outline-none transition-all resize-none" 
                placeholder="Add confidential notes for auditors or final approvers..." 
              ></textarea>
            </div>
          </section>

        </div>

        {/* Sidebar Panel: Approval & Meta */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          
          {/* Approval Status Card */}
          <section className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-zinc-50 dark:bg-zinc-955 px-3.5 py-2 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="text-xs font-bold text-black dark:text-white">Approval Workflow</h3>
              <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-500 text-[9px] font-bold rounded uppercase tracking-wider">Draft</span>
            </div>
            
            <div className="p-3.5 space-y-4">
              {/* Workflow Timeline */}
              <div className="relative pl-4 space-y-3.5">
                {/* Line */}
                <div className="absolute left-[5px] top-1.5 bottom-1.5 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
                
                {/* Step 1 */}
                <div className="relative">
                  <span className="absolute -left-[14px] top-0.5 w-4 h-4 rounded-full bg-[var(--primary)] border-2 border-white dark:border-zinc-900 flex items-center justify-center z-10 shadow-sm">
                    <CheckCircle2 size={10} className="text-white" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-black dark:text-white">Created By</p>
                    <p className="text-[10px] text-black/70 dark:text-white/70 font-semibold">James Wilson (You)</p>
                    <p className="text-[9px] text-black/50 dark:text-white/50 mt-0.5">Oct 24, 2023 • 10:15 AM</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <span className="absolute -left-[14px] top-0.5 w-4 h-4 rounded-full bg-zinc-50 dark:bg-zinc-955 border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center z-10 shadow-sm">
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                  </span>
                  <div>
                    <p className="text-xs font-bold text-black dark:text-white">Compliance Review</p>
                    <p className="text-[10px] text-black/70 dark:text-white/70 font-semibold">Pending check...</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <span className="absolute -left-[14px] top-0.5 w-4 h-4 rounded-full bg-zinc-50 dark:bg-zinc-955 border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center z-10 shadow-sm">
                    <Hourglass size={10} className="text-black/50 dark:text-white/50" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-black/50 dark:text-white/50">Final Approval</p>
                    <p className="text-[10px] text-black/50 dark:text-white/50 italic">Sarah Chen (CFO Office)</p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="pt-3.5 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-2.5">
                  <h4 className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Comments</h4>
                  <button className="text-[var(--primary)] text-[10px] font-bold hover:underline">+ Add Comment</button>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-955 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/50 shadow-sm">
                  <p className="text-[11px] text-black/70 dark:text-white/70 italic font-semibold">"Ensure the settlement ID matches the Oct 20th batch export."</p>
                  <p className="text-[9px] text-black/50 dark:text-white/50 mt-1.5 text-right font-semibold">— Auditor Bot</p>
                </div>
              </div>
            </div>
          </section>

          {/* Settings/Toggle Card */}
          <section className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xs font-bold text-black dark:text-white mb-3.5">Processing Controls</h3>
            <div className="space-y-3.5">
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-black dark:text-white">Auto-Approve</p>
                  <p className="text-[10px] text-black/50 dark:text-white/50 font-semibold">Bypass workflow for values {'<₹100'}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-7 h-4 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3C after:w-3.5 after:h-3.5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-black dark:text-white">Notify Merchant</p>
                  <p className="text-[10px] text-black/50 dark:text-white/50 font-semibold">Send email on completion</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-7 h-4 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                </label>
              </div>
              
              <div className="pt-3.5 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <Info className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={12} />
                  <p className="text-[10px] text-blue-800 dark:text-blue-300 font-semibold leading-relaxed">Last audited 2 hours ago for this franchise entity.</p>
                </div>
              </div>
              
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
