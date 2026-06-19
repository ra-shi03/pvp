import React, { useState } from "react";
import { ArrowLeft, UserCircle, User, MapPin, Calendar, Plus, Info, Send } from "lucide-react";

export default function RequestDocumentsModal({ isOpen, onClose, onRequestSent, request }) {
  const [checkedDocs, setCheckedDocs] = useState({
    gst: true,
    bank: true,
    fssai: false,
    property: false
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" id="request-docs-overlay">
      <div className="bg-zinc-50 dark:bg-zinc-950 w-full max-w-3xl h-[85vh] md:h-[620px] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800">
        
        {/* TopAppBar */}
        <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center px-4 h-12 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-[var(--primary)] leading-tight">Request Documents</h2>
              <span className="font-mono text-[10px] text-zinc-500">ID {request?.id || "#RQ-2023-001"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">Drafting</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
              <UserCircle size={18} />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 p-3.5 bg-white dark:bg-zinc-950">
          <div className="space-y-4">
            
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Applicant Summary */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
                  <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-1.5">Applicant Summary</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[var(--primary)]/5 rounded-lg flex items-center justify-center text-[var(--primary)]">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{request?.applicant || "Amit Sharma"}</p>
                      <p className="text-xs text-zinc-500 flex items-center gap-0.5 mt-0.5">
                        <MapPin size={12} />
                        {request?.city || "Mumbai"}, MH
                      </p>
                    </div>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[9px] uppercase text-zinc-400 font-bold">Application Date</p>
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">Oct 24, 2023</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-zinc-400 font-bold">Risk Level</p>
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-500 mt-0.5">Medium</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
                  <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Deadline</h3>
                  <div>
                    <label className="sr-only" htmlFor="due-date">Due Date</label>
                    <div className="relative group">
                      <input 
                        className="w-full h-9 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg px-3 text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all outline-none dark:text-zinc-100" 
                        id="due-date" 
                        type="date" 
                        defaultValue="2023-11-15" 
                      />
                      <Calendar className="absolute right-3 top-2.5 text-zinc-400 pointer-events-none" size={16} />
                    </div>
                    <p className="mt-1.5 text-[10px] font-semibold text-zinc-400">Applicant will receive a reminder 24h before expiry.</p>
                  </div>
                </section>
              </div>

              {/* Document Checklist */}
              <div className="col-span-12 md:col-span-8">
                <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm flex flex-col h-full">
                  <div className="flex justify-between items-center mb-3 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Document Checklist</h3>
                    <button className="text-[var(--primary)] text-xs font-bold hover:underline">Select All</button>
                  </div>
                  
                  <div className="space-y-2.5 flex-1">
                    {/* Item 1 */}
                    <label className={`flex items-start gap-2.5 p-2.5 border rounded-lg cursor-pointer transition-colors group
                      ${checkedDocs.gst ? 'bg-zinc-50 dark:bg-zinc-800/50 border-[var(--primary)]/30' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                      <div className="pt-0.5">
                        <input 
                          type="checkbox" 
                          checked={checkedDocs.gst}
                          onChange={(e) => setCheckedDocs({...checkedDocs, gst: e.target.checked})}
                          className="w-4 h-4 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">GST Registration</p>
                          <span className="text-[9px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Required</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Copy of the Goods and Services Tax certificate as per government norms.</p>
                      </div>
                    </label>

                    {/* Item 2 */}
                    <label className={`flex items-start gap-2.5 p-2.5 border rounded-lg cursor-pointer transition-colors group
                      ${checkedDocs.bank ? 'bg-zinc-50 dark:bg-zinc-800/50 border-[var(--primary)]/30' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                      <div className="pt-0.5">
                        <input 
                          type="checkbox" 
                          checked={checkedDocs.bank}
                          onChange={(e) => setCheckedDocs({...checkedDocs, bank: e.target.checked})}
                          className="w-4 h-4 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">Bank Statement</p>
                          <span className="text-[9px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Required</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Last 6 months of active savings/current account statements.</p>
                      </div>
                    </label>

                    {/* Item 3 */}
                    <label className={`flex items-start gap-2.5 p-2.5 border rounded-lg cursor-pointer transition-colors group
                      ${checkedDocs.fssai ? 'bg-zinc-50 dark:bg-zinc-800/50 border-[var(--primary)]/30' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                      <div className="pt-0.5">
                        <input 
                          type="checkbox" 
                          checked={checkedDocs.fssai}
                          onChange={(e) => setCheckedDocs({...checkedDocs, fssai: e.target.checked})}
                          className="w-4 h-4 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">FSSAI License</p>
                          <span className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Optional</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Food Safety and Standards Authority of India registration or application proof.</p>
                      </div>
                    </label>

                    {/* Item 4 */}
                    <label className={`flex items-start gap-2.5 p-2.5 border rounded-lg cursor-pointer transition-colors group
                      ${checkedDocs.property ? 'bg-zinc-50 dark:bg-zinc-800/50 border-[var(--primary)]/30' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                      <div className="pt-0.5">
                        <input 
                          type="checkbox" 
                          checked={checkedDocs.property}
                          onChange={(e) => setCheckedDocs({...checkedDocs, property: e.target.checked})}
                          className="w-4 h-4 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">Property Documents</p>
                          <span className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Optional</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Rent agreement or ownership proof for the proposed outlet location.</p>
                      </div>
                    </label>
                  </div>

                  <button className="mt-4 w-full py-2 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-500 font-bold text-xs flex items-center justify-center gap-1.5 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
                    <Plus size={14} />
                    Add Custom Document Requirement
                  </button>
                </section>
              </div>

              {/* Additional Instructions */}
              <div className="col-span-12">
                <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
                  <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Additional Instructions</h3>
                  <textarea 
                    className="w-full h-20 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all outline-none resize-none dark:text-zinc-100" 
                    placeholder="Provide specific notes or context for the applicant regarding these documents..."
                  ></textarea>
                  <div className="mt-2 flex items-center gap-1.5 text-zinc-400">
                    <Info size={14} />
                    <p className="text-[10px] font-medium">These notes will be displayed clearly in the applicant's portal.</p>
                  </div>
                </section>
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 flex justify-between items-center shrink-0">
          <div className="hidden sm:block">
            <p className="text-[10px] font-semibold text-zinc-500">© 2024 Papa Veg Pizza Franchise Management System</p>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button 
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 h-9 text-zinc-600 dark:text-zinc-300 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                const selectedNames = [];
                if(checkedDocs.gst) selectedNames.push("GST Registration");
                if(checkedDocs.bank) selectedNames.push("Bank Statement");
                if(checkedDocs.fssai) selectedNames.push("FSSAI License");
                if(checkedDocs.property) selectedNames.push("Property Documents");
                
                onRequestSent(selectedNames);
              }}
              className="flex-[2] sm:flex-none px-5 h-9 bg-[var(--primary)] text-white font-bold text-xs rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Send size={14} />
              Send Request
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
