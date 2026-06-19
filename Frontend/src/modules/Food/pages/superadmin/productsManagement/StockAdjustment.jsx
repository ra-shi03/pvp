import React, { useState } from 'react';
import { X, Trash2, Download, Edit, Undo, Minus, Plus, Activity } from 'lucide-react';

export default function StockAdjustment({ isOpen, onClose, item }) {
  const [currentType, setCurrentType] = useState('wastage');
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const currentStock = parseFloat(item?.stock) || 150;

  const handleAdjustVal = (delta) => {
    setQuantity((prev) => Math.max(0, prev + delta));
  };

  const calculateImpact = () => {
    let result = currentStock;
    const val = parseFloat(quantity) || 0;

    if (currentType === 'wastage' || currentType === 'return') {
      result -= val;
    } else if (currentType === 'received' || currentType === 'correction') {
      result += val;
    }
    
    return result.toFixed(2);
  };

  const adjustmentTypes = [
    { id: 'wastage', label: 'Wastage', icon: Trash2 },
    { id: 'received', label: 'Received', icon: Download },
    { id: 'correction', label: 'Correction', icon: Edit },
    { id: 'return', label: 'Return', icon: Undo },
  ];

  return (
    <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Stock Adjustment Modal */}
      <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-zinc-200 dark:border-zinc-800 max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Stock Adjustment</h2>
          <button 
            onClick={onClose}
            aria-label="Close modal" 
            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors active:scale-90 text-zinc-500 dark:text-zinc-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* Item Info Section */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl flex items-start gap-4 border border-zinc-200 dark:border-zinc-800">
            <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src={item?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDbggxviuvcEB3TCPfYp4wXtRi3WWCXBpNpBVmZk7ptWbHjcF31a29xTDn4odMPu20KLY35w1KuseIKFRXyGmMCcPZHzCEpVMlC7hhFvYKQDOI_eCRjQyrHNs4sz1_DACJmxwue2vIy9pNCXQu4uQqG_N694joz9-6Xg3STTHaVt_hz4jywM5fn5G74jCc2gyiPsGUfhyzk6Elz_J1HAj8nLY1ax6ILR6ntUenbPJx3HV9gxF_1T4xIV3l_xkfImHEn46WUtqH0r8"} 
                alt={item?.name || "Item"}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{item?.name || "Mozzarella Cheese"}</h3>
              <p className="text-sm font-medium text-zinc-500">Current Stock: <span className="font-bold text-zinc-900 dark:text-zinc-100">{currentStock} kg</span></p>
            </div>
          </div>

          {/* Adjustment Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Adjustment Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {adjustmentTypes.map((type) => {
                const Icon = type.icon;
                const isActive = currentType === type.id;
                return (
                  <button 
                    key={type.id}
                    onClick={() => setCurrentType(type.id)}
                    className={`flex flex-col items-center justify-center py-3 border rounded-xl transition-all duration-200 ${
                      isActive 
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] dark:bg-[var(--primary)]/20 dark:text-red-400" 
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs font-bold mt-2">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Adjustment Quantity</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleAdjustVal(-1)}
                className="w-14 h-14 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl flex items-center justify-center active:scale-95 transition-transform border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                <Minus size={24} />
              </button>
              <div className="relative flex-1">
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full h-14 text-center text-2xl font-black border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-[var(--primary)] focus:ring-0 transition-colors bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-bold text-zinc-500 pointer-events-none">KG</span>
              </div>
              <button 
                onClick={() => handleAdjustVal(1)}
                className="w-14 h-14 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl flex items-center justify-center active:scale-95 transition-transform border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>

          {/* Reason/Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Reason for Adjustment</label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border-2 border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm focus:border-[var(--primary)] focus:ring-0 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors placeholder:text-zinc-400" 
              placeholder="e.g., Damaged packaging, monthly audit correction..." 
              rows={3}
            />
          </div>

          {/* Impact Preview */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border-l-4 border-l-[var(--primary)] border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100">
              <Activity className="text-[var(--primary)] dark:text-red-400" size={24} />
              <span className="text-base font-bold">New Calculated Stock</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[var(--primary)] dark:text-red-400">
                {calculateImpact()} <span className="text-base font-bold text-zinc-500">kg</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-[0.98]"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              // Handle update logic here
              onClose();
            }}
            className="flex-1 py-3 bg-[var(--primary)] hover:brightness-110 text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.98]"
          >
            Update Stock
          </button>
        </div>
      </div>
    </div>
  );
}
