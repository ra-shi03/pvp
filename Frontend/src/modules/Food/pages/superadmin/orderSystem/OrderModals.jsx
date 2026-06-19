import React from 'react';
import { X, Star, MapPin, Package } from 'lucide-react';

export function UpdateStatusModal({ isOpen, onClose, order }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-xl shadow-xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Update Order Status</h3>
          <button 
            className="text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1.5 rounded-full transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        
        <form 
          className="p-3.5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">New Status</label>
            <select className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg h-9 px-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all">
              <option value="accepted">Accepted</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready for Pickup</option>
              <option value="dispatched">Dispatched</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Remarks</label>
            <textarea 
              className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg py-2 px-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-none" 
              placeholder="Enter notes for kitchen or rider..." 
              rows="2"
            ></textarea>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[var(--primary)] focus:ring-[var(--primary)]" 
              id="notify" 
              type="checkbox"
              defaultChecked
            />
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer" htmlFor="notify">
              Notify Customer via SMS/Push
            </label>
          </div>
          
          <div className="pt-3 flex gap-3">
            <button 
              className="flex-1 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 h-9 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors" 
              onClick={onClose} 
              type="button"
            >
              Cancel
            </button>
            <button 
              className="flex-1 bg-[var(--primary)] text-white h-9 rounded-lg text-xs font-bold hover:opacity-90 shadow-sm active:scale-95 transition-all" 
              type="submit"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AssignRiderModal({ isOpen, onClose, order }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-xl shadow-xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Assign Rider</h3>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">4 available riders near sector 45</p>
          </div>
          <button 
            className="text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1.5 rounded-full transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          {/* Rider Card 1 */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex flex-col md:flex-row items-start md:items-center gap-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <img 
                alt="Amit K." 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200&h=200"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Amit K.</h4>
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-1.5 py-0.5 rounded text-[9px] font-bold">
                  <Star size={10} className="fill-current" />
                  4.9
                </div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <MapPin size={12} />
                  <span className="text-xs">0.8 km away</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <Package size={12} />
                  <span className="text-xs">0 Active Orders</span>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto bg-[var(--primary)] text-white h-8 px-4 rounded-lg text-xs font-bold hover:opacity-90 active:scale-95 transition-all">
              Assign
            </button>
          </div>

          {/* Rider Card 2 */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex flex-col md:flex-row items-start md:items-center gap-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <img 
                alt="John D." 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">John D.</h4>
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-1.5 py-0.5 rounded text-[9px] font-bold">
                  <Star size={10} className="fill-current" />
                  4.7
                </div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <MapPin size={12} />
                  <span className="text-xs">1.2 km away</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <Package size={12} />
                  <span className="text-xs">1 Active Order</span>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto bg-[var(--primary)] text-white h-8 px-4 rounded-lg text-xs font-bold hover:opacity-90 active:scale-95 transition-all">
              Assign
            </button>
          </div>

          {/* Rider Card 3 */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex flex-col md:flex-row items-start md:items-center gap-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <img 
                alt="Sarah P." 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Sarah P.</h4>
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-1.5 py-0.5 rounded text-[9px] font-bold">
                  <Star size={10} className="fill-current" />
                  4.8
                </div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <MapPin size={12} />
                  <span className="text-xs">2.1 km away</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <Package size={12} />
                  <span className="text-xs">0 Active Orders</span>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto bg-[var(--primary)] text-white h-8 px-4 rounded-lg text-xs font-bold hover:opacity-90 active:scale-95 transition-all">
              Assign
            </button>
          </div>
        </div>
        
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end shrink-0">
          <button 
            className="h-9 px-4 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
