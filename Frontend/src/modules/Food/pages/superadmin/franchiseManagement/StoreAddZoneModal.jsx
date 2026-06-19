import React, { useState } from "react";
import { X, Lock, ChevronDown, Search } from "lucide-react";

export default function StoreAddZoneModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[580px]">
        
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Add Zone</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Configure delivery boundaries and management</p>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 flex-1">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            {/* Zone Name */}
            <div className="md:col-span-1">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Zone Name</label>
              <input 
                className="w-full h-9 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 outline-none transition-all text-xs" 
                placeholder="e.g. North Harbor Sector" 
                type="text"
              />
            </div>

            {/* Zone Code */}
            <div className="md:col-span-1">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Zone Code</label>
              <div className="relative">
                <input 
                  className="w-full h-9 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 font-mono text-xs cursor-not-allowed outline-none" 
                  readOnly
                  type="text" 
                  value="ZNE-8829-NYC"
                />
                <Lock size={14} className="absolute right-3 top-2.5 text-zinc-400" />
              </div>
            </div>

            {/* Region */}
            <div className="md:col-span-1">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Region</label>
              <div className="relative">
                <select className="w-full h-9 px-3 pr-8 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 outline-none appearance-none transition-all text-xs">
                  <option value="">Select Region</option>
                  <option value="ne">Northeast Metropolitan</option>
                  <option value="cbd">Central Business District</option>
                  <option value="ws">Western Suburbs</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-2.5 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Zone Manager */}
            <div className="md:col-span-1">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Zone Manager</label>
              <div className="relative">
                <input 
                  className="w-full h-9 px-3 pl-8 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 outline-none transition-all text-xs" 
                  placeholder="Search managers..." 
                  type="text"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-zinc-400" />
              </div>
            </div>

            {/* Delivery Coverage Radius */}
            <div className="md:col-span-1">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Delivery Coverage Radius</label>
              <div className="relative">
                <input 
                  className="w-full h-9 px-3 pr-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 outline-none transition-all text-xs" 
                  placeholder="5.0" 
                  type="number"
                  step="0.1"
                />
                <span className="absolute right-3 top-2.5 text-[10px] font-bold text-zinc-400">KM</span>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="md:col-span-1 flex flex-col justify-center">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Status</label>
              <div className="flex items-center gap-2 h-9">
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    isActive ? "bg-[var(--primary)]" : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                      isActive ? "translate-x-5.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className={`text-xs ${isActive ? "text-[var(--primary)] font-bold" : "text-zinc-500"}`}>
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Description</label>
              <textarea 
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 outline-none transition-all text-xs resize-none" 
                placeholder="Enter zone details, operating hours, and specific delivery instructions..." 
                rows="2"
              ></textarea>
            </div>
            
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-2.5">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg text-xs font-bold hover:brightness-110 shadow-md transition-all active:scale-[0.98]"
          >
            Save Zone
          </button>
        </div>

      </div>
    </div>
  );
}
