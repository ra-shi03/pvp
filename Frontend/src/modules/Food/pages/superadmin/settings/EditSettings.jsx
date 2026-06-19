import React, { useState } from 'react';
import { X, Info, Loader2 } from 'lucide-react';

export default function EditSettings({ isOpen, onClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    appName: 'PizzaOS Enterprise',
    websiteUrl: 'admin.pizzaos.com',
    supportEmail: 'support@pizzaos.com',
    supportPhone: '+1-555-0199',
    companyAddress: '123 Pepperoni Lane, Crust City, CA 90210'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-zinc-900/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg md:rounded-xl shadow-2xl flex flex-col h-[85vh] md:h-auto md:max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 md:zoom-in-95">
        
        {/* Modal Header */}
        <header className="flex items-center justify-between p-3.5 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Edit General Settings</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={16} className="text-zinc-500" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          <form id="editSettingsForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                App Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required 
                value={formData.appName}
                onChange={(e) => setFormData({...formData, appName: e.target.value})}
                className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                Website URL <span className="text-red-500">*</span>
              </label>
              <input 
                type="url" 
                required 
                value={formData.websiteUrl}
                onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                Support Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                required 
                value={formData.supportEmail}
                onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
                className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                Support Phone <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel" 
                required 
                value={formData.supportPhone}
                onChange={(e) => setFormData({...formData, supportPhone: e.target.value})}
                className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                Company Address <span className="text-red-500">*</span>
              </label>
              <textarea 
                required 
                rows="3"
                value={formData.companyAddress}
                onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none resize-none"
              ></textarea>
            </div>

            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-start gap-2 border border-zinc-200 dark:border-zinc-700">
              <Info className="text-[var(--primary)] shrink-0 mt-0.5" size={15} />
              <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Updating these settings will affect all franchise dashboards across the enterprise network. Please verify details before saving.
              </p>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <footer className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="editSettingsForm"
            disabled={isSaving}
            className="px-3.5 py-1.5 bg-[var(--primary)] text-white text-xs font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
          >
            {isSaving && <Loader2 size={14} className="animate-spin" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </footer>
      </div>
    </div>
  );
}
