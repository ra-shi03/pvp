import React, { useState } from "react";
import { X, Search, ChevronRight, ChevronLeft, MinusCircle, CheckCircle, ChevronDown } from "lucide-react";

export default function StoreAssignmentModal({ isOpen, onClose }) {
  const [availableStores, setAvailableStores] = useState([
    { id: "241", name: "Connaught Place", location: "New Delhi, DL", selected: false },
    { id: "102", name: "Andheri West", location: "Mumbai, MH", selected: false },
    { id: "089", name: "Koramangala", location: "Bangalore, KA", selected: false },
    { id: "302", name: "Salt Lake Sector V", location: "Kolkata, WB", selected: false }
  ]);

  const [assignedStores, setAssignedStores] = useState([
    { id: "442", name: "Bandra West", location: "Mumbai, MH" },
    { id: "119", name: "Jayanagar", location: "Bangalore, KA" },
    { id: "004", name: "Sector 18", location: "Noida, UP" }
  ]);

  if (!isOpen) return null;

  const toggleAvailableSelect = (id) => {
    setAvailableStores(prev => 
      prev.map(store => store.id === id ? { ...store, selected: !store.selected } : store)
    );
  };

  const handleAssign = () => {
    const selectedStores = availableStores.filter(s => s.selected).map(s => ({...s, selected: undefined}));
    if (selectedStores.length === 0) return;
    
    setAssignedStores(prev => [...prev, ...selectedStores]);
    setAvailableStores(prev => prev.filter(s => !s.selected));
  };

  const handleRemove = (id) => {
    const storeToRemove = assignedStores.find(s => s.id === id);
    if (!storeToRemove) return;

    setAssignedStores(prev => prev.filter(s => s.id !== id));
    setAvailableStores(prev => [...prev, { ...storeToRemove, selected: false }]);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[600px]">
        
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Store Assignment</h2>
            <p className="text-[10px] text-zinc-500 mt-0.5">Configure regional boundaries and assign store locations.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
          {/* Selection Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider mb-1">Region</label>
              <select className="w-full h-9 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 outline-none transition-all text-xs text-zinc-900 dark:text-zinc-100">
                <option>North India (Delhi NCR & Punjab)</option>
                <option>West India (Maharashtra & Gujarat)</option>
                <option>South India (Karnataka & Tamil Nadu)</option>
                <option>East India (West Bengal & Odisha)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-zinc-550 uppercase tracking-wider mb-1">Target Zone</label>
              <select className="w-full h-9 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 outline-none transition-all text-xs text-zinc-900 dark:text-zinc-100">
                <option>Zone DL - Delhi Core Hub</option>
                <option>Zone MH - Mumbai Suburban West</option>
                <option>Zone KA - Bangalore Tech Corridor</option>
                <option>Zone WB - Kolkata Metro Central</option>
              </select>
            </div>
          </div>

          {/* Dual List Layout */}
          <div className="flex flex-col md:flex-row gap-3.5 items-center h-auto md:h-[320px]">
            {/* Available Stores */}
            <div className="w-full md:flex-1 flex flex-col h-[260px] md:h-full border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <div className="relative flex items-center">
                  <Search size={14} className="absolute left-3 text-zinc-400" />
                  <input 
                    className="w-full pl-9 pr-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] outline-none bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-all" 
                    placeholder="Search available stores..." 
                    type="text"
                  />
                </div>
              </div>
              <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700">
                Available Stores ({availableStores.length})
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {availableStores.map(store => (
                  <div 
                    key={store.id}
                    onClick={() => toggleAvailableSelect(store.id)}
                    className={`flex items-center gap-2.5 p-2.5 cursor-pointer transition-colors border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                      store.selected ? "bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10" : ""
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={store.selected}
                      onChange={() => {}} // handled by parent div click
                      className="rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)] bg-white dark:bg-zinc-900 w-3.5 h-3.5" 
                    />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Store #{store.id} - {store.name}</div>
                      <div className="text-[10px] text-zinc-550 mt-0.5">{store.location}</div>
                    </div>
                  </div>
                ))}
                {availableStores.length === 0 && (
                  <div className="p-4 text-center text-xs text-zinc-500">No stores available</div>
                )}
              </div>
            </div>

            {/* Transfer Controls */}
            <div className="flex flex-row md:flex-col gap-2 p-2">
              <button 
                onClick={handleAssign}
                disabled={availableStores.filter(s => s.selected).length === 0}
                className="w-8 h-8 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] text-zinc-500 dark:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} className="hidden md:block" />
                <ChevronDown size={16} className="block md:hidden" />
              </button>
            </div>

            {/* Assigned Stores */}
            <div className="w-full md:flex-1 flex flex-col h-[260px] md:h-full border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="p-3 h-12 flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Current Zone Selection</span>
              </div>
              <div className="px-3 py-1.5 bg-[var(--primary)]/10 text-[10px] font-bold text-[var(--primary)] border-b border-zinc-200 dark:border-zinc-700 uppercase tracking-wider">
                Assigned Stores ({assignedStores.length})
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {assignedStores.map(store => (
                  <div key={store.id} className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-zinc-800/20 border-b border-zinc-100 dark:border-zinc-800/50 group">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Store #{store.id} - {store.name}</div>
                      <div className="text-[10px] text-zinc-550 mt-0.5">{store.location}</div>
                    </div>
                    <button 
                      onClick={() => handleRemove(store.id)}
                      className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove Store"
                    >
                      <MinusCircle size={16} />
                    </button>
                  </div>
                ))}
                {assignedStores.length === 0 && (
                  <div className="p-4 text-center text-xs text-zinc-500">No stores assigned to this zone</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end items-center gap-2.5">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-[var(--primary)] text-white font-bold text-xs rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <CheckCircle size={14} />
            Assign Stores
          </button>
        </div>
      </div>
    </div>
  );
}
