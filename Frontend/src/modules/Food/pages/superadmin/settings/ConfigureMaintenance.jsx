import React, { useState } from 'react';
import { X, Info, Loader2 } from 'lucide-react';

export default function ConfigureMaintenance({ isOpen, onClose }) {
  const [isActivating, setIsActivating] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(true);
  const [formData, setFormData] = useState({
    message: "We're performing routine maintenance to improve your experience. System will be back shortly.",
    startDate: "2023-11-24T02:00",
    endDate: "2023-11-24T06:00",
    systems: {
      customerApp: true,
      website: true,
      storeDashboard: true,
      riderApp: false
    }
  });

  if (!isOpen) return null;

  const handleActivate = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center md:items-center bg-zinc-900/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg md:max-w-md h-[85vh] md:h-auto md:max-h-[85vh] rounded-t-xl md:rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 md:zoom-in-95">
        
        {/* Modal Header */}
        <header className="flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Maintenance Configuration</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={16} className="text-zinc-500" />
          </button>
        </header>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          
          {/* Enable Maintenance Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Enable Maintenance Mode</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Globally toggle system visibility</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          {/* Warning Box */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg flex gap-2 border border-zinc-200 dark:border-zinc-700">
            <Info className="text-[var(--primary)] shrink-0 mt-0.5" size={15} />
            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When enabled, customers will see the maintenance page and will not be able to place orders. Existing orders already in preparation will remain active in the dashboard.
            </p>
          </div>

          {/* Maintenance Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Maintenance Message</label>
            <textarea 
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 text-xs text-zinc-700 dark:text-zinc-300 min-h-[70px] resize-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all" 
              placeholder="Type message for users..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Start Date & Time</label>
              <input 
                type="datetime-local" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1.5 text-xs text-zinc-700 dark:text-zinc-300 h-8 focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">End Date & Time</label>
              <input 
                type="datetime-local" 
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1.5 text-xs text-zinc-700 dark:text-zinc-300 h-8 focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all" 
              />
            </div>
          </div>

          {/* Affected Systems Checklist */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Affected Systems</label>
            <div className="grid grid-cols-1 gap-1.5">
              <label className="flex items-center p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.systems.customerApp}
                  onChange={(e) => setFormData({...formData, systems: {...formData.systems, customerApp: e.target.checked}})}
                  className="w-3.5 h-3.5 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                />
                <span className="ml-2.5 text-xs text-zinc-800 dark:text-zinc-200">Customer Mobile App</span>
              </label>
              <label className="flex items-center p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.systems.website}
                  onChange={(e) => setFormData({...formData, systems: {...formData.systems, website: e.target.checked}})}
                  className="w-3.5 h-3.5 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                />
                <span className="ml-2.5 text-xs text-zinc-800 dark:text-zinc-200">Website</span>
              </label>
              <label className="flex items-center p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.systems.storeDashboard}
                  onChange={(e) => setFormData({...formData, systems: {...formData.systems, storeDashboard: e.target.checked}})}
                  className="w-3.5 h-3.5 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                />
                <span className="ml-2.5 text-xs text-zinc-800 dark:text-zinc-200">Store Dashboard</span>
              </label>
              <label className="flex items-center p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.systems.riderApp}
                  onChange={(e) => setFormData({...formData, systems: {...formData.systems, riderApp: e.target.checked}})}
                  className="w-3.5 h-3.5 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                />
                <span className="ml-2.5 text-xs text-zinc-800 dark:text-zinc-200">Rider App</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-2 shrink-0">
          <button 
            onClick={onClose}
            className="w-full md:w-auto px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleActivate}
            disabled={isActivating}
            className="w-full md:flex-1 px-4 py-1.5 text-xs font-semibold text-white bg-[var(--primary)] rounded-lg hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            {isActivating && <Loader2 size={14} className="animate-spin" />}
            {isActivating ? 'Activating...' : 'Activate Maintenance'}
          </button>
        </footer>
      </div>
    </div>
  );
}
