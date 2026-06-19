import React from 'react';
import { 
  ArrowLeft, Share2, MoreVertical, DollarSign, TrendingDown, 
  TrendingUp, Pizza, Filter, Edit, LineChart 
} from 'lucide-react';

export default function ProductPerformance({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  // Placeholder data in case no product is passed
  const productData = product || {
    name: 'Ultimate Pepperoni',
    units: '7,502',
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800&fm=webp'
  };

  return (
    <div className="fixed inset-0 lg:left-[280px] z-50 bg-black/60 backdrop-blur-sm flex justify-center lg:justify-end animate-fade-in overflow-hidden">
      <div className="w-full max-w-screen-md h-full bg-zinc-50 dark:bg-zinc-950 flex flex-col shadow-2xl border-x border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300">
        
        {/* Top Navigation Bar */}
        <header className="shrink-0 sticky top-0 z-10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 h-12 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-100"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-sm font-black text-zinc-900 dark:text-zinc-50">Product Drill-down</h1>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400">
              <Share2 size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400">
              <MoreVertical size={16} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3.5 space-y-4 pb-20">
          
          {/* Section A: Product Overview */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-36 bg-zinc-100 dark:bg-zinc-950">
              <img 
                src={productData.img} 
                alt={productData.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6">
                <span className="inline-block px-2 py-0.5 bg-[var(--primary)] text-white rounded text-[9px] font-bold uppercase tracking-wider mb-1.5 shadow-sm">
                  Best Seller
                </span>
                <h2 className="text-white text-lg font-black">{productData.name}</h2>
              </div>
            </div>
            
            <div className="p-3.5 grid grid-cols-2 gap-3">
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">SKU ID</p>
                <p className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">PIZ-UP-001</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Category</p>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Classic Signature</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Base Price</p>
                <p className="text-base font-black text-zinc-900 dark:text-zinc-100">₹349</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Margin</p>
                <p className="text-base font-black text-[var(--primary)]">64.2%</p>
              </div>
            </div>
          </section>

          {/* Section B: Product KPIs (Bento Grid) */}
          <section className="grid grid-cols-2 gap-3 animate-fade-in">
            {/* Revenue */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2.5">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300">
                  <DollarSign size={16} />
                </div>
                <span className="text-[9px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-955/30 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  -2.4% <TrendingDown size={11} />
                </span>
              </div>
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">MTD Revenue</p>
              <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50">₹14.2L</h3>
            </div>
            
            {/* Quantity Sold */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2.5">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300">
                  <Pizza size={16} />
                </div>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-955/30 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  +12.8% <TrendingUp size={11} />
                </span>
              </div>
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Total Sold</p>
              <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50">{productData.units || '7,502'}</h3>
            </div>
            
            {/* Profit Margin */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl col-span-1 shadow-sm">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Profit Margin</p>
              <div className="flex items-end gap-2.5">
                <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50 leading-none">64%</h3>
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-[var(--primary)] w-[64%] rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Repeat Purchase */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl col-span-1 shadow-sm">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Repeat Rate</p>
              <div className="flex items-end gap-2.5">
                <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50 leading-none">42%</h3>
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-zinc-400 dark:bg-zinc-600 w-[42%] rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section C: 30-day Sales Trend Graph */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
            <div className="flex justify-between items-start sm:items-center mb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">30-day Sales Trend</h3>
                <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Quantity sold daily</p>
              </div>
              <button className="px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors rounded text-[10px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                MTD
              </button>
            </div>
            <div className="h-32 w-full flex items-end justify-between gap-1 mt-4">
              {/* Mock Chart Bars */}
              {[30, 45, 35, 60, 50, 75, 40, 65, 90, 55, 45].map((h, i) => (
                <div key={`b1-${i}`} className="w-2 bg-[var(--primary)] opacity-40 hover:opacity-80 transition-opacity rounded-t-sm cursor-pointer" style={{ height: `${h}%` }}></div>
              ))}
              
              <div className="w-2 bg-[var(--primary)] h-[100%] rounded-t-sm relative group cursor-pointer">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  284 Units
                </div>
              </div>
              
              {[70, 60, 50, 40, 30, 25].map((h, i) => (
                <div key={`b2-${i}`} className="w-2 bg-[var(--primary)] opacity-40 hover:opacity-80 transition-opacity rounded-t-sm cursor-pointer" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              <span>01 SEP</span>
              <span>15 SEP</span>
              <span>30 SEP</span>
            </div>
          </section>

          {/* Section D: Top Stores */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Top Performing Stores</h3>
              <button className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                <Filter size={16} />
              </button>
            </div>
            
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-xs">
              {/* Store Row 1 */}
              <div className="p-2.5 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center font-black text-emerald-700 dark:text-emerald-400 text-xs shadow-sm">
                  #1
                </div>
                <div className="flex-1">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Connaught Place, New Delhi</p>
                  <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">842 Units Sold</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-zinc-900 dark:text-zinc-100">₹2,93,858</p>
                  <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 mt-0.5">+5.2%</p>
                </div>
              </div>
              
              {/* Store Row 2 */}
              <div className="p-2.5 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-zinc-700 dark:text-zinc-300 text-xs shadow-sm">
                  #2
                </div>
                <div className="flex-1">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Koramangala, Bengaluru</p>
                  <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">715 Units Sold</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-zinc-900 dark:text-zinc-100">₹2,49,535</p>
                  <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 mt-0.5">+2.1%</p>
                </div>
              </div>
              
              {/* Store Row 3 */}
              <div className="p-2.5 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-zinc-700 dark:text-zinc-300 text-xs shadow-sm">
                  #3
                </div>
                <div className="flex-1">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Bandra West, Mumbai</p>
                  <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">688 Units Sold</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-zinc-900 dark:text-zinc-100">₹2,40,112</p>
                  <p className="text-[9px] font-bold text-rose-500 mt-0.5">-0.4%</p>
                </div>
              </div>
            </div>
            
            <button className="w-full py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              VIEW ALL 42 STORES
            </button>
          </section>
        </main>

        {/* Bottom Action Bar */}
        <div className="shrink-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-3 py-2.5 flex gap-2.5 pb-6">
          <button className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center gap-1.5 transition-colors text-xs shadow-sm">
            <Edit size={16} />
            Update Price
          </button>
          <button className="flex-1 bg-[var(--primary)] text-white font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity text-xs shadow-md active:scale-95">
            <LineChart size={16} />
            Full Forecast
          </button>
        </div>
      </div>
    </div>
  );
}
