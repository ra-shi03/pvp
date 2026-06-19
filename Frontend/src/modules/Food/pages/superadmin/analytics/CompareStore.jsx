import React, { useEffect, useState } from 'react';
import { X, Download, MapPin } from 'lucide-react';

export default function CompareStore({ isOpen, onClose }) {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger animation after render
      const timer = setTimeout(() => setAnimateBars(true), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimateBars(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 lg:left-[280px] z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md h-full bg-zinc-50 dark:bg-zinc-950 flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 translate-x-0">
        
        {/* Header */}
        <header className="flex justify-between items-center px-3 h-12 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              aria-label="Close Comparison" 
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            >
              <X size={16} />
            </button>
            <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-50 truncate">Compare Stores</h1>
          </div>
          <button className="flex items-center gap-1 bg-[var(--primary)] text-white px-3 py-1 rounded-lg text-[10px] font-bold transition-opacity hover:opacity-90 active:scale-95">
            <Download size={12} />
            Export
          </button>
        </header>

        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shrink-0 text-xs">
          <div className="w-1/3 p-2.5 flex items-center border-r border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Metrics</span>
          </div>
          <div className="w-1/3 p-2.5 text-center border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-inner">
            <p className="text-[9px] font-bold text-[var(--primary)] mb-0.5 uppercase tracking-wider">STORE #402</p>
            <p className="text-xs font-black text-zinc-900 dark:text-zinc-100 truncate">CP New Delhi</p>
          </div>
          <div className="w-1/3 p-2.5 text-center">
            <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 mb-0.5 uppercase tracking-wider">STORE #118</p>
            <p className="text-xs font-black text-zinc-900 dark:text-zinc-100 truncate">Koramangala</p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-4">
          
          {/* Revenue Comparison Card */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm">
            <div className="flex justify-between items-end mb-3">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Revenue (YTD)</h3>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded-md">Diff: +12.4%</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 leading-tight">₹42.8L</span>
                  <span className="text-[9px] font-mono font-bold text-zinc-400">CP Delhi</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden w-full">
                  <div 
                    className="h-full bg-[var(--primary)] transition-all duration-1000 ease-out rounded-full" 
                    style={{ width: animateBars ? '85%' : '0%' }}
                  ></div>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 leading-tight">₹38.1L</span>
                  <span className="text-[9px] font-mono font-bold text-zinc-400">Koramangala</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden w-full">
                  <div 
                    className="h-full bg-zinc-400 dark:bg-zinc-600 transition-all duration-1000 ease-out rounded-full" 
                    style={{ width: animateBars ? '72%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          </section>

          {/* Orders & AOV Bento Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Total Orders</h3>
              <div className="space-y-2.5">
                <div className="flex flex-col">
                  <span className="text-base font-black text-zinc-900 dark:text-zinc-50">12.4k</span>
                  <span className="text-[9px] font-bold text-[var(--primary)] mt-0.5 uppercase">CP DELHI</span>
                </div>
                <div className="flex flex-col opacity-60">
                  <span className="text-base font-black text-zinc-900 dark:text-zinc-50">9.8k</span>
                  <span className="text-[9px] font-bold text-zinc-500 mt-0.5 uppercase">KORAMANGALA</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Avg Order Value</h3>
              <div className="space-y-2.5">
                <div className="flex flex-col">
                  <span className="text-base font-black text-zinc-900 dark:text-zinc-50">₹450</span>
                  <span className="text-[9px] font-bold text-[var(--primary)] mt-0.5 uppercase">CP DELHI</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-zinc-900 dark:text-zinc-50">₹520</span>
                  <span className="text-[9px] font-bold text-zinc-500 mt-0.5 uppercase">KORAMANGALA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Performance Grid */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 p-2.5 bg-zinc-50/50 dark:bg-zinc-950/50">Customer Metrics</h4>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <div className="flex items-center p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-xs">
                <div className="w-1/3">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">New Guests</span>
                </div>
                <div className="w-1/3 text-center">
                  <span className="font-mono font-bold text-[var(--primary)]">2,410</span>
                </div>
                <div className="w-1/3 text-center">
                  <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">1,890</span>
                </div>
              </div>
              <div className="flex items-center p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-xs">
                <div className="w-1/3">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Repeat Rate</span>
                </div>
                <div className="w-1/3 text-center">
                  <span className="font-mono font-bold text-[var(--primary)]">64%</span>
                </div>
                <div className="w-1/3 text-center">
                  <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">72%</span>
                </div>
              </div>
              <div className="flex items-center p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-xs">
                <div className="w-1/3">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Delivery Time</span>
                </div>
                <div className="w-1/3 text-center">
                  <span className="font-mono font-bold text-rose-500">28m</span>
                </div>
                <div className="w-1/3 text-center">
                  <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">22m</span>
                </div>
              </div>
            </div>
          </section>

          {/* Growth Rate Chart (Visual Aesthetic Component) */}
          <section className="bg-zinc-900 dark:bg-zinc-950 text-white rounded-xl p-3.5 overflow-hidden relative shadow-lg border border-zinc-800">
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Quarterly Growth Velocity</h3>
              <div className="flex items-end gap-1 h-20">
                {[40, 60, 85, 70, 95].map((h, i) => (
                  <div key={`d-${i}`} className="flex-1 bg-[var(--primary)] rounded-t-md transition-all duration-1000 ease-out" style={{ height: animateBars ? `${h}%` : '0%' }}></div>
                ))}
                {[30, 45, 40, 55, 50].map((h, i) => (
                  <div key={`s-${i}`} className="flex-1 bg-zinc-600 rounded-t-md transition-all duration-1000 ease-out delay-150" style={{ height: animateBars ? `${h}%` : '0%' }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-sm shadow-[var(--primary)]/50"></div>
                  <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-wider">CP Delhi (+24%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-600 shadow-sm"></div>
                  <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-wider">Koramangala (+12%)</span>
                </div>
              </div>
            </div>
            {/* Glassmorphism Flare Effect */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--primary)] blur-[70px] opacity-20 pointer-events-none"></div>
          </section>

          {/* Store Location Reference */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 h-28 relative group shadow-sm">
            <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&fm=webp" 
                alt="Regional Map" 
                className="w-full h-full object-cover grayscale opacity-60 dark:opacity-40 group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3">
              <div className="flex justify-between w-full items-center">
                <p className="text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={12} className="text-[var(--primary)]" />
                  Regional Proximity
                </p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-[9px] px-2 py-1 rounded border border-white/30 uppercase font-bold transition-colors">
                  Open Map
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Actions */}
        <footer className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-2.5 shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Clear All
          </button>
          <button className="w-full py-2 px-3 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity active:scale-95">
            Update List
          </button>
        </footer>

      </div>
    </div>
  );
}
