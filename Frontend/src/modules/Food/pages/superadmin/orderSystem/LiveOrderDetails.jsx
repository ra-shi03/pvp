import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Phone, Activity, Bike, PhoneForwarded, UserSearch, 
  CheckCircle2, Receipt, Headphones, AlertTriangle, Edit3 
} from 'lucide-react';

export default function LiveOrderDetails({ isOpen, onClose, store }) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsRendered(false), 300); // Wait for transition
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .pulse-dot {
            animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
        .ios-scroll {
            -webkit-overflow-scrolling: touch;
        }
      `}} />

      {/* Drawer Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] lg:w-[450px] bg-zinc-50 dark:bg-zinc-950 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ios-scroll ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Top App Bar */}
        <header className="bg-white dark:bg-zinc-900 sticky top-0 z-50 shadow-sm border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center px-3.5 h-12 w-full shrink-0">
          <div className="flex items-center gap-2.5">
            <button 
              className="text-[var(--primary)] hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-full transition-colors"
              onClick={onClose}
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-sm font-bold text-[var(--primary)] line-clamp-1">{store?.name || 'Downtown Central'}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full pulse-dot"></span>
              <span className="text-emerald-800 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Busy</span>
            </span>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
          {/* Store Identity & Manager Card */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <img 
                  alt="Manager" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4ZIsnbwZh9wUtRY7wtyENnyLqwl7VjwgUC5tjKnen4y9xJamilayuQ42yaCjSJxJPT8xbcrNGYoUEBB_BhT51EogYEGTTRFFShhpmAJnsB9OkZ_ua7wQ-rIRInCHAE2NC9pSkow2rT7af0Y7rT6moC3I_RVfd9EW4TQy6YVCVHLe53-zSqvxJbxD2AkfUXDIMZv5-UlRR-pOTFno4BRep4az-BxGcmRc3RE6YXZkfKZ7B6DHx4j-8CaXdgJp2nkdno5otfEVc1zM"
                />
              </div>
              <div>
                <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Marco Rossi</h2>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Store Manager • ID: #DC-882</p>
              </div>
            </div>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-[var(--primary)] hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all">
              <Phone size={14} />
            </button>
          </section>

          {/* KPI Grid: Kitchen Load */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2.5">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-55">Kitchen Load</h3>
              <span className="text-lg font-bold text-[var(--primary)]">85%</span>
            </div>
            <div className="space-y-2.5">
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[var(--primary)] h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span className="text-[9px] font-bold uppercase tracking-wider">Prep Capacity</span>
                <span className="text-[10px] font-semibold text-red-600 dark:text-red-400">High Pressure</span>
              </div>
            </div>
          </section>

          {/* Bento Grid for Active Orders & Delivery Partners */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Active Orders Breakdown */}
            <section className="col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2.5">
                <Activity size={16} className="text-[var(--primary)]" />
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Active Orders</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg text-center border border-zinc-100 dark:border-zinc-800">
                  <p className="text-lg font-bold text-[var(--primary)]">12</p>
                  <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase mt-1">Preparing</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-2.5 rounded-lg text-center border border-emerald-100 dark:border-emerald-900/30">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-500">5</p>
                  <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase mt-1">Ready</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 p-2.5 rounded-lg text-center border border-red-100 dark:border-red-900/30">
                  <p className="text-lg font-bold text-red-600 dark:text-red-500">2</p>
                  <p className="text-[9px] font-bold text-red-700 dark:text-red-400 uppercase mt-1">Delayed</p>
                </div>
              </div>
            </section>

            {/* Delivery Partner Status */}
            <section className="col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm">
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2">
                  <Bike size={16} className="text-blue-600 dark:text-blue-500" />
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Partner Fleet</h3>
                </div>
                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-semibold">10 Total</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
                  <div>
                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">08</p>
                    <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Active</p>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                  <div className="w-1 h-8 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                  <div>
                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">02</p>
                    <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Idle</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Live Orders List */}
          <section className="space-y-2.5 pb-8">
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Live Orders</h3>
              <button className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-wider hover:underline">View All</button>
            </div>

            {/* Order Card 1 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Order #8821</span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Delivery</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400">2x Veggie Supreme, 1x Garlic Bread</p>
                </div>
                <p className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400">14:02 Left</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 h-8 rounded-lg text-[10px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors">
                  <PhoneForwarded size={12} />
                  Call Store
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] text-white h-8 rounded-lg text-[10px] font-bold hover:opacity-90 transition-opacity">
                  <UserSearch size={12} />
                  Reassign Rider
                </button>
              </div>
            </div>

            {/* Order Card 2 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm space-y-3 border-l-4 border-l-emerald-500">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Order #8819</span>
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Pickup</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400">1x Margherita (Large)</p>
                </div>
                <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
              <div className="flex gap-2">
                <button className="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 h-8 rounded-lg text-[10px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors">
                  <Receipt size={12} />
                  Print Ticket
                </button>
              </div>
            </div>

            {/* Order Card 3 (Delayed) */}
            <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-3 shadow-sm space-y-3 border-l-4 border-l-red-500">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Order #8815</span>
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Delayed</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400">3x Personal Pan Mix</p>
                </div>
                <p className="text-[10px] font-mono font-bold text-red-600 dark:text-red-500">+05:20 Over</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 h-8 rounded-lg text-[10px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors">
                  <Headphones size={12} />
                  Support
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white h-8 rounded-lg text-[10px] font-bold transition-opacity">
                  <AlertTriangle size={12} />
                  Escalate
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* FAB for quick store-level action */}
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-[var(--primary)] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-[80]">
          <Edit3 size={16} />
        </button>
      </div>
    </>
  );
}
