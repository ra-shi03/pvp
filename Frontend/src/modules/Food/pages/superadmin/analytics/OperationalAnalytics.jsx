import React, { useState, useEffect } from 'react';
import { 
  Activity, RefreshCw, Download, TrendingUp, TrendingDown, 
  CheckCircle, ArrowUp, Info, ChevronRight, Search 
} from 'lucide-react';
import StoreOperationalDetails from './StoreOperationalDetails';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function OperationalAnalytics() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedStore, setSelectedStore] = useState(null);

  const deliveryZones = [
    { name: 'Downtown Core', orders: 482, avgTime: '22m', status: 'optimal' },
    { name: 'Tech District', orders: 312, avgTime: '18m', status: 'optimal' },
    { name: 'Lakeside South', orders: 245, avgTime: '28m', status: 'critical' },
    { name: 'West Industrial', orders: 198, avgTime: '34m', status: 'optimal' }
  ];

  const filteredZones = deliveryZones.filter(z => 
    z.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4 animate-fade-down">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Activity className="text-[var(--primary)]" size={20} />
          <h2 className="text-lg font-bold text-black dark:text-white">Operational Analytics</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black/70 dark:text-white/70 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm font-bold text-[11px]">
            <RefreshCw size={12} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-colors shadow-md font-bold text-[11px]">
            <Download size={12} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* KPI Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Card 1: Avg Prep Time */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Avg Prep Time</span>
            <div className="text-lg font-black text-black dark:text-white">12m</div>
            <div className="w-12 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-[var(--primary)] w-4/5 rounded-full"></div>
            </div>
          </div>
          <span className="text-rose-600 dark:text-rose-500 flex items-center text-[10px] font-bold gap-0.5 bg-rose-50 dark:bg-rose-955/20 px-1.5 py-0.5 rounded-full">
            <TrendingUp size={11} /> 4%
          </span>
        </div>
        {/* Card 2: Avg Delivery Time */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Avg Delivery</span>
            <div className="text-lg font-black text-black dark:text-white">24m</div>
            <div className="w-12 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-[var(--primary)] w-2/3 rounded-full"></div>
            </div>
          </div>
          <span className="text-emerald-600 dark:text-emerald-500 flex items-center text-[10px] font-bold gap-0.5 bg-emerald-50 dark:bg-emerald-955/20 px-1.5 py-0.5 rounded-full">
            <TrendingDown size={11} /> 2%
          </span>
        </div>
        {/* Card 3: On-Time Delivery */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">On-Time %</span>
            <div className="text-lg font-black text-black dark:text-white">94%</div>
            <div className="w-12 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-[var(--primary)] w-[94%] rounded-full"></div>
            </div>
          </div>
          <span className="text-[var(--primary)]">
            <CheckCircle size={14} />
          </span>
        </div>
        {/* Card 4: Rider Utilization */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Utilization</span>
            <div className="text-lg font-black text-black dark:text-white">82%</div>
            <div className="w-12 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-[var(--primary)] w-[82%] rounded-full"></div>
            </div>
          </div>
          <span className="text-black/50 dark:text-white/50 text-[9px] font-bold">Stable</span>
        </div>
        {/* Card 5: Acceptance Rate */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Acceptance</span>
            <div className="text-lg font-black text-black dark:text-white">98%</div>
            <div className="w-12 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-[var(--primary)] w-[98%] rounded-full"></div>
            </div>
          </div>
          <span className="text-emerald-600 dark:text-emerald-500 flex items-center text-[10px] font-bold gap-0.5 bg-emerald-50 dark:bg-emerald-955/20 px-1.5 py-0.5 rounded-full">
            <ArrowUp size={11} /> 1%
          </span>
        </div>
        {/* Card 6: Complaint Rate */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Complaint Rate</span>
            <div className="text-lg font-black text-rose-600 dark:text-rose-500">1.2%</div>
            <div className="w-12 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-rose-600 w-[12%] rounded-full"></div>
            </div>
          </div>
          <span className="text-black/50 dark:text-white/50 text-[9px] font-semibold">Target &lt; 1%</span>
        </div>
      </section>

      {/* Main Insights Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Order Funnel - Column Span 8 */}
        <section className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/50">
            <h2 className="text-xs font-bold text-black dark:text-white">Order Execution Funnel</h2>
            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Data
            </span>
          </div>
          <div className="flex-1 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex-1 w-full text-center">
              <div className="text-lg font-black text-black dark:text-white mb-2">1,240</div>
              <div className="h-9 w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center border-b-2 border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Placed</span>
              </div>
            </div>
            <div className="hidden md:block"><ChevronRight className="text-zinc-300 dark:text-zinc-700" size={14} /></div>
            
            <div className="flex-1 w-full text-center">
              <div className="text-lg font-black text-black dark:text-white mb-2">1,215</div>
              <div className="h-9 w-[98%] mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center border-b-2 border-zinc-300 dark:border-zinc-700">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Accepted</span>
              </div>
            </div>
            <div className="hidden md:block"><ChevronRight className="text-zinc-300 dark:text-zinc-700" size={14} /></div>
            
            <div className="flex-1 w-full text-center">
              <div className="text-lg font-black text-black dark:text-white mb-2">1,180</div>
              <div className="h-9 w-[95%] mx-auto bg-zinc-300 dark:bg-zinc-700 rounded-lg flex items-center justify-center border-b-2 border-zinc-400 dark:border-zinc-600">
                <span className="text-[10px] font-bold text-black/80 dark:text-white/80 uppercase tracking-wider">Preparing</span>
              </div>
            </div>
            <div className="hidden md:block"><ChevronRight className="text-zinc-300 dark:text-zinc-700" size={14} /></div>
            
            <div className="flex-1 w-full text-center">
              <div className="text-lg font-black text-[var(--primary)] mb-2">1,150</div>
              <div className="h-9 w-[92%] mx-auto bg-[var(--primary)]/75 rounded-lg flex items-center justify-center border-b-2 border-[var(--primary)]">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Ready</span>
              </div>
            </div>
            <div className="hidden md:block"><ChevronRight className="text-zinc-300 dark:text-zinc-700" size={14} /></div>
            
            <div className="flex-1 w-full text-center">
              <div className="text-lg font-black text-[var(--primary)] mb-2">1,110</div>
              <div className="h-9 w-[89%] mx-auto bg-[var(--primary)]/85 rounded-lg flex items-center justify-center border-b-2 border-[var(--primary)]">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Out</span>
              </div>
            </div>
            <div className="hidden md:block"><ChevronRight className="text-zinc-300 dark:text-zinc-700" size={14} /></div>
            
            <div className="flex-1 w-full text-center">
              <div className="text-lg font-black text-[var(--primary)] mb-2">1,095</div>
              <div className="h-9 w-[87%] mx-auto bg-[var(--primary)] rounded-lg flex items-center justify-center border-b-2 border-[var(--primary)] shadow-sm">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Delivered</span>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4 flex justify-center">
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-xs font-semibold text-black/70 dark:text-white/70">Overall Success Rate:</span>
              <span className="text-[var(--primary)] font-black text-sm">88.3%</span>
            </div>
          </div>
        </section>

        {/* SLA Status - Column Span 4 */}
        <section className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-3.5 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-black dark:text-white mb-4">SLA Performance</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-black/70 dark:text-white/70">Kitchen Prep &lt; 15m</span>
                  <span className="text-rose-600 dark:text-rose-500 font-bold text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-rose-50 dark:bg-rose-955/20 rounded">Critical</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-[72%] rounded-full"></div>
                  </div>
                  <span className="font-mono text-xs font-black w-8 text-black dark:text-white">72%</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-black/70 dark:text-white/70">Last Mile Delivery &lt; 30m</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-955/20 rounded">Healthy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[91%] rounded-full"></div>
                  </div>
                  <span className="font-mono text-xs font-black w-8 text-black dark:text-white">91%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <div className="flex items-center gap-1.5 text-[var(--primary)] mb-2">
              <Info size={14} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Root Cause Analysis</span>
            </div>
            <p className="text-xs text-black/70 dark:text-white/70 font-semibold leading-relaxed">
              High kitchen load in Downtown district (Zone A) is currently causing a 12% delay in average prep times. Recommended: Toggle Zone A to "Busy" mode.
            </p>
          </div>
        </section>

        {/* Kitchen Load Heatmap - Column Span 7 */}
        <section className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/50">
            <h2 className="text-xs font-bold text-black dark:text-white">Kitchen Load (Hourly)</h2>
            <div className="flex gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-black/50 dark:text-white/50"><div className="w-2 h-2 rounded bg-zinc-100 dark:bg-zinc-800"></div>Low</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-black/50 dark:text-white/50"><div className="w-2 h-2 rounded bg-[var(--primary)]"></div>High</span>
            </div>
          </div>
          <div className="p-3.5 overflow-x-auto scrollbar-none">
            <div className="grid grid-cols-24 gap-0.5 min-w-[700px]" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
              {/* Hourly blocks - Using varied opacities of primary color for heatmap */}
              {[10, 5, 5, 5, 10, 15, 20, 30, 40, 50, 60, 80, 90, 110, 70, 60, 60, 80, 90, 120, 110, 80, 60, 30].map((val, i) => {
                let bgColor = `bg-[var(--primary)]`;
                let opacity = val / 100;
                if (val > 100) {
                  bgColor = 'bg-rose-500'; // Critical over capacity
                  opacity = 0.8 + ((val - 100) / 100);
                }
                return (
                  <div key={i} className="h-20 rounded-sm flex items-end p-0.5 hover:opacity-80 transition-opacity cursor-pointer group relative overflow-hidden" title={`${i}:00 Load`}>
                    <div className={`${bgColor} w-full rounded-t-sm`} style={{ height: `${Math.min(val, 100)}%`, opacity }}></div>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-24 mt-2 min-w-[700px]" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
              {[...Array(24)].map((_, i) => (
                <span key={i} className={`text-[9px] font-bold text-center ${i === 13 || i === 19 || i === 20 ? 'text-[var(--primary)]' : 'text-black/30 dark:text-white/30'}`}>
                  {i.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Top Delivery Zones - Column Span 5 */}
        <section className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-zinc-50/50 dark:bg-zinc-950/50">
            <h2 className="text-xs font-bold text-black dark:text-white">Top Delivery Zones</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Zones..." 
                className="pl-7 pr-3 py-1 text-[11px] font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 w-full sm:w-[140px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-none">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-955 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-3 py-1.5 text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Zone Name</th>
                  <th className="px-3 py-1.5 text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider text-right">Orders</th>
                  <th className="px-3 py-1.5 text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider text-right">Avg Time</th>
                  <th className="px-3 py-1.5 text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {filteredZones.length > 0 ? filteredZones.map((zone, i) => (
                  <tr 
                    key={i} 
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors cursor-pointer text-xs"
                    onClick={() => setSelectedStore(zone)}
                  >
                    <td className="px-3 py-2 font-bold text-black dark:text-white">{zone.name}</td>
                    <td className="px-3 py-2 font-mono font-black text-right text-black/70 dark:text-white/70">{zone.orders}</td>
                    <td className="px-3 py-2 font-mono font-black text-right text-black/70 dark:text-white/70">{zone.avgTime}</td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center">
                        <span className={`w-2 h-2 rounded-full ${
                          zone.status === 'optimal' 
                            ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                            : 'bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                        }`}></span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-3 py-4 text-center text-xs font-semibold text-black/50 dark:text-white/50">
                      No zones found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Featured Analysis Area */}
      <section className="relative h-40 rounded-xl overflow-hidden group shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&fm=webp" 
          alt="Dashboard Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-955 via-zinc-955/90 to-zinc-900/40 dark:from-black dark:via-black/90 dark:to-transparent flex items-center p-4 md:p-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-block px-2 py-0.5 bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 rounded text-[9px] font-black uppercase tracking-widest backdrop-blur-md">AI Prediction Insight</span>
            <h3 className="text-white text-lg md:text-xl font-black">Forecast: High Demand Spike</h3>
            <p className="text-zinc-300 font-medium text-[11px] leading-normal max-w-xl">
              Predictive models indicate a <strong className="text-white">25% increase</strong> in order volume across all zones in the next 120 minutes due to local sports events. Recommendation: Scale up rider availability.
            </p>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl transform transition-transform group-hover:scale-105">
            <div className="text-zinc-300 text-[8px] font-black uppercase tracking-wider mb-1">Volume Projection</div>
            <div className="text-2xl font-black text-white drop-shadow-md">+420 <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Orders</span></div>
          </div>
        </div>
      </section>

      <StoreOperationalDetails 
        isOpen={!!selectedStore} 
        onClose={() => setSelectedStore(null)} 
        storeName={selectedStore?.name} 
      />
    </div>
  );
}
