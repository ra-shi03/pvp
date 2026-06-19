import React, { useState, useEffect } from 'react';
import { 
  Filter, Maximize, Activity, ChefHat, Bike, AlertTriangle, 
  CheckCircle2, MapPin, Timer, UserX, Package 
} from 'lucide-react';
import { liveOrderStats, liveOrders, topStores, criticalAlerts, useDebounce } from './LiveOrderData';
import LiveOrderDetails from './LiveOrderDetails';
import LiveOrderTracking from './LiveOrderTracking';

export default function LiveOrderMonitor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  const [isStoreDetailsOpen, setIsStoreDetailsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Simulation of real-time KPI updates
  const [activeOrders, setActiveOrders] = useState(liveOrderStats.activeOrders.count);
  const [preparing, setPreparing] = useState(liveOrderStats.preparing.count);
  const [delivery, setDelivery] = useState(liveOrderStats.delivery.count);
  const [alerts, setAlerts] = useState(liveOrderStats.criticalAlerts.count);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ['kpi'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      if (randomAction === 'kpi') {
        const kpis = ['activeOrders', 'preparing', 'delivery', 'alerts'];
        const randomKpiId = kpis[Math.floor(Math.random() * kpis.length)];
        
        const delta = Math.random() > 0.5 ? 1 : -1;
        if (randomKpiId === 'activeOrders') setActiveOrders(prev => Math.max(0, prev + delta));
        if (randomKpiId === 'preparing') setPreparing(prev => Math.max(0, prev + delta));
        if (randomKpiId === 'delivery') setDelivery(prev => Math.max(0, prev + delta));
        if (randomKpiId === 'alerts') setAlerts(prev => Math.max(0, prev + delta));
      }
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes header-pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        .header-live-pulse { animation: header-pulse 2s infinite ease-in-out; }
        @keyframes blink-green {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        .status-blink { animation: blink-green 1.5s infinite step-end; }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .shimmer-effect {
            background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%);
            background-size: 200% 100%;
            animation: shimmer 3s infinite linear;
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 10;
        }
        @keyframes slide-in-right {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .alert-entrance { animation: slide-in-right 0.5s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
            .header-live-pulse, .status-blink, .shimmer-effect, .alert-entrance {
                animation: none !important;
                transform: none !important;
                background: none !important;
            }
        }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4beba; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #5b403d; }
        .order-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .order-card:hover { transform: translateY(-2px); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
      `}} />

      {/* Dashboard Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-bold text-black dark:text-white leading-tight">Live Monitoring</h2>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 rounded-full border border-red-200 dark:border-red-900/50">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 header-live-pulse"></span>
            <span className="text-red-750 dark:text-red-400 text-[9px] font-bold uppercase tracking-wider">Live</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 status-blink"></span>
            <span className="text-emerald-700 dark:text-emerald-400 text-[9px] font-bold">Connected</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search Orders..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-3 pr-3 py-1.5 w-full sm:w-52 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg text-xs text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none font-semibold"
            />
          </div>
          <button className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shadow-sm">
            <Filter size={12} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="w-7 h-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-955 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-black dark:text-white">
            <Maximize size={12} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 select-none">
        {/* Card 1: Active Orders */}
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="shimmer-effect"></div>
          <div className="flex flex-col gap-0.5 min-w-0 relative z-20">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Active Orders</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{activeOrders}</h3>
              <span className="text-emerald-500 font-bold text-[8px]">{liveOrderStats.activeOrders.trend}</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-850 text-emerald-650 dark:text-emerald-400 shrink-0 border border-zinc-200 dark:border-zinc-700 relative z-20">
            <Activity size={14} />
          </div>
        </div>

        {/* Card 2: Preparing */}
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="shimmer-effect"></div>
          <div className="flex flex-col gap-0.5 min-w-0 relative z-20">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Preparing</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{preparing}</h3>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-850 text-[var(--primary)] shrink-0 border border-zinc-200 dark:border-zinc-700 relative z-20">
            <ChefHat size={14} />
          </div>
        </div>

        {/* Card 3: Out for Delivery */}
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="shimmer-effect"></div>
          <div className="flex flex-col gap-0.5 min-w-0 relative z-20">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Out for Delivery</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{delivery}</h3>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-850 text-blue-650 dark:text-blue-450 shrink-0 border border-zinc-200 dark:border-zinc-700 relative z-20">
            <Bike size={14} />
          </div>
        </div>

        {/* Card 4: Critical Alerts */}
        <div className="relative overflow-hidden bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-200 dark:border-red-900/30 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md border-t-2 border-t-red-500">
          <div className="shimmer-effect opacity-35"></div>
          <div className="flex flex-col gap-0.5 min-w-0 relative z-20">
            <span className="text-[10px] font-bold text-red-750 dark:text-red-400 uppercase tracking-wider truncate">Critical Alerts</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-red-700 dark:text-red-400 mt-0.5">{alerts}</h3>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 shrink-0 border border-red-200 dark:border-red-800/40 relative z-20">
            <AlertTriangle size={14} className="header-live-pulse" />
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Live Order Board (Bento Style) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-3.5">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-bold text-black dark:text-white">Live Order Board</h3>
              <div className="flex gap-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5">
                <button 
                  onClick={() => setFilterType('All')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filterType === 'All' ? 'bg-white dark:bg-zinc-700 text-[var(--primary)] shadow-sm' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterType('Priority')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filterType === 'Priority' ? 'bg-white dark:bg-zinc-700 text-[var(--primary)] shadow-sm' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                >
                  Priority
                </button>
              </div>
            </div>
            
            <div className="flex overflow-x-auto gap-3.5 pb-2 custom-scrollbar snap-x">
              {/* New Orders Column */}
              <div className="min-w-[250px] flex-shrink-0 snap-start">
                <div className="flex items-center gap-1.5 mb-2.5 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">New ({liveOrders.new.length})</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {liveOrders.new.map((order, i) => (
                    <div key={i} className="order-card p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-[var(--primary)] transition-colors cursor-pointer">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-black dark:text-white">{order.id}</span>
                        <span className="text-black/60 dark:text-white/60 text-[10px] font-semibold">{order.time}</span>
                      </div>
                      <p className="text-black/85 dark:text-white/85 text-xs line-clamp-1 mb-2.5 font-medium">{order.items}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${order.type === 'VIP' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-zinc-200 dark:bg-zinc-700 text-black/70 dark:text-white/70'}`}>
                          {order.type}
                        </span>
                        <span className="text-xs font-bold text-[var(--primary)]">{order.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparing Column */}
              <div className="min-w-[250px] flex-shrink-0 snap-start">
                <div className="flex items-center gap-1.5 mb-2.5 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Preparing ({liveOrders.preparing.length})</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {liveOrders.preparing.map((order, i) => (
                    <div key={i} className="order-card p-2.5 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg cursor-pointer">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-black dark:text-white">{order.id}</span>
                        <span className="text-[var(--primary)] text-[10px] font-bold">{order.timeInPrep}</span>
                      </div>
                      <p className="text-black/85 dark:text-white/85 text-xs line-clamp-1 mb-2.5 font-medium">{order.items}</p>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1 rounded-full overflow-hidden">
                        <div className="bg-[var(--primary)] h-full" style={{width: order.progress}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready Column */}
              <div className="min-w-[250px] flex-shrink-0 snap-start">
                <div className="flex items-center gap-1.5 mb-2.5 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Ready ({liveOrders.ready.length})</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {liveOrders.ready.map((order, i) => (
                    <div key={i} className="order-card p-2.5 bg-emerald-50/40 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-lg cursor-pointer">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-black dark:text-white">{order.id}</span>
                        <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <p className="text-black/85 dark:text-white/85 text-xs line-clamp-1 mb-2.5 font-medium">{order.items}</p>
                      <button className="w-full py-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer">Dispatch</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Column */}
              <div className="min-w-[250px] flex-shrink-0 snap-start">
                <div className="flex items-center gap-1.5 mb-2.5 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">Delivery ({liveOrders.delivery.length})</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {liveOrders.delivery.map((order, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setSelectedTrackingOrder({ ...order, riderId: 'RD-992' + i }); setIsTrackingOpen(true); }}
                      className="order-card p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-black dark:text-white">{order.id}</span>
                        <Bike size={14} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-black/85 dark:text-white/85 text-xs mb-2.5 font-semibold leading-normal">ETA: {order.eta} • Rider: {order.rider}</p>
                      <div className="flex items-center gap-1 text-blue-755 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 w-fit px-1.5 py-0.5 rounded text-[9px] font-bold">
                        <MapPin size={10} />
                        <span>{order.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Store Performance Mini-Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-black dark:text-white">Top Store Performance</h3>
              <span className="text-[var(--primary)] text-[10px] font-bold cursor-pointer hover:underline">View All Stores</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="py-2 px-3 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider first:rounded-tl-lg">STORE NAME</th>
                    <th className="py-2 px-3 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">ACTIVE ORDERS</th>
                    <th className="py-2 px-3 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider last:rounded-tr-lg">AVG. PREP TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                  {topStores.map((store, i) => (
                    <tr 
                      key={i} 
                      onClick={() => { setSelectedStore(store); setIsStoreDetailsOpen(true); }}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                    >
                      <td className="py-2 px-3 text-xs font-bold text-black dark:text-white">{store.name}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 bg-emerald-105 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] font-bold">
                          {store.activeOrders} Orders
                        </span>
                      </td>
                      <td className="py-2 px-3 text-xs font-mono font-bold text-black dark:text-white">{store.avgPrepTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Critical Alerts */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-650 dark:text-red-500" />
                <h3 className="text-xs font-bold text-black dark:text-white">Critical Alerts</h3>
              </div>
              <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">4</span>
            </div>
            
            <div className="p-3 flex flex-col gap-2.5 overflow-y-auto custom-scrollbar">
              {/* Alert Items */}
              {criticalAlerts.map((alert, i) => (
                <div key={i} className={`alert-entrance p-3 rounded-lg border-l-4 flex gap-2.5 shadow-sm ${
                  alert.type === 'timer' ? 'bg-red-50 dark:bg-red-900/10 border-red-500' :
                  alert.type === 'rider' ? 'bg-red-50 dark:bg-red-900/10 border-[var(--primary)]' :
                  'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-400'
                }`} style={{animationDelay: `${(i+1)*0.1}s`}}>
                  {alert.type === 'timer' && <Timer size={14} className="text-red-600 dark:text-red-500 mt-0.5 shrink-0" />}
                  {alert.type === 'rider' && <UserX size={14} className="text-[var(--primary)] mt-0.5 shrink-0" />}
                  {alert.type === 'inventory' && <Package size={14} className="text-zinc-500 dark:text-zinc-400 mt-0.5 shrink-0" />}
                  
                  <div className="min-w-0">
                    <p className={`text-xs font-bold leading-tight ${
                      alert.type === 'timer' ? 'text-red-900 dark:text-red-200' :
                      alert.type === 'rider' ? 'text-red-900 dark:text-red-200' :
                      'text-black dark:text-white'
                    }`}>
                      {alert.id ? `Order ${alert.id} ` : ''}{alert.title}
                    </p>
                    <p className={`text-[10px] mt-1 font-semibold ${
                      alert.type === 'timer' || alert.type === 'rider' ? 'text-red-800 dark:text-red-300/80' : 'text-black/70 dark:text-white/70'
                    }`}>
                      {alert.store ? `Store: ${alert.store}. ` : ''}{alert.reason}
                    </p>
                    
                    {alert.type === 'timer' && (
                      <div className="mt-2.5 flex gap-1.5">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider active:scale-95 transition-all cursor-pointer">Assign Help</button>
                        <button className="bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-800 text-red-705 dark:text-red-400 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider hover:bg-red-50 dark:hover:bg-red-900/30 active:scale-95 transition-all cursor-pointer">Notify Store</button>
                      </div>
                    )}
                    {alert.type === 'rider' && (
                      <div className="mt-2.5">
                        <button className="bg-[var(--primary)] hover:opacity-90 text-white px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider active:scale-95 transition-all cursor-pointer">Manual Dispatch</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LiveOrderDetails 
        isOpen={isStoreDetailsOpen} 
        onClose={() => setIsStoreDetailsOpen(false)} 
        store={selectedStore} 
      />

      <LiveOrderTracking 
        isOpen={isTrackingOpen} 
        onClose={() => setIsTrackingOpen(false)} 
        order={selectedTrackingOrder} 
      />
    </div>
  );
}
