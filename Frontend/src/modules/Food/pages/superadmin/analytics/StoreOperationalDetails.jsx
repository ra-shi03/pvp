import React, { useState } from 'react';
import { 
  X, AlertTriangle, Utensils, Croissant, Package, 
  Map, Users, Clock, ShoppingCart, Truck 
} from 'lucide-react';

export default function StoreOperationalDetails({ isOpen, onClose, storeName }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'inventory', label: 'Inventory' }
  ];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={onClose}
      />
      
      <div className={`fixed inset-y-0 right-0 w-full md:w-[420px] bg-white dark:bg-zinc-950 shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{storeName || 'Downtown Manhattan #402'}</h2>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Store Operational Profile</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3.5 scrollbar-none">
          {/* Store Header Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 mb-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Status</p>
                <span className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 animate-pulse w-max">
                  <AlertTriangle size={14} />
                  High Load
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 rounded-lg p-2.5 border border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ShoppingCart size={14} />
                  Live Orders
                </p>
                <p className="text-xl font-black text-[var(--primary)]">42</p>
              </div>
              <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 rounded-lg p-2.5 border border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Users size={14} />
                  Active Riders
                </p>
                <p className="text-xl font-black text-[var(--primary)]">18</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex border-b border-zinc-200 dark:border-zinc-800 mb-4 overflow-x-auto scrollbar-none relative">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors relative ${
                  activeTab === tab.id 
                    ? 'text-[var(--primary)]' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] rounded-t-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Tab Contents */}
          <div className="space-y-4">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Delivery Time vs. Customer Rating</h3>
                  <div className="relative h-32 w-full border-l border-b border-zinc-200 dark:border-zinc-800 flex items-end justify-between px-2 pb-2 mt-4">
                    {/* Simulated Scatter/Correlation Chart */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                    <div className="w-3 h-3 bg-[var(--primary)] rounded-full absolute bottom-[80%] left-[10%] opacity-80"></div>
                    <div className="w-3 h-3 bg-[var(--primary)] rounded-full absolute bottom-[70%] left-[25%] opacity-80"></div>
                    <div className="w-3 h-3 bg-[var(--primary)] rounded-full absolute bottom-[50%] left-[40%] opacity-80"></div>
                    <div className="w-3 h-3 bg-rose-500 rounded-full absolute bottom-[20%] left-[80%] opacity-80"></div>
                    <div className="w-3 h-3 bg-rose-500 rounded-full absolute bottom-[15%] left-[90%] opacity-80"></div>
                    <div className="w-full flex justify-between absolute -bottom-6 left-0 text-[10px] font-mono font-bold text-zinc-400">
                      <span>0 min</span><span>20 min</span><span>40 min</span><span>60 min</span>
                    </div>
                  </div>
                  <p className="mt-6 text-xs font-medium text-zinc-500 italic">Strong negative correlation: ratings drop significantly after 35 mins.</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Complaints Breakdown</h3>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 w-24">Cold Food</span>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[65%] h-full bg-rose-500 rounded-full"></div>
                        </div>
                        <span className="font-mono text-xs font-black w-8 text-zinc-900 dark:text-zinc-100">42%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 w-24">Late Delivery</span>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[30%] h-full bg-[var(--primary)] rounded-full"></div>
                        </div>
                        <span className="font-mono text-xs font-black w-8 text-zinc-900 dark:text-zinc-100">18%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 w-24">Missing Items</span>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[12%] h-full bg-[var(--primary)]/60 rounded-full"></div>
                        </div>
                        <span className="font-mono text-xs font-black w-8 text-zinc-900 dark:text-zinc-100">12%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Avg Resolution Time</span>
                    <span className="text-lg font-black text-[var(--primary)]">14m</span>
                  </div>
                </div>
              </div>
            )}

            {/* Kitchen Tab */}
            {activeTab === 'kitchen' && (
              <div className="animate-fade-in space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Pizza Prep Time Trend</h3>
                  <div className="h-24 w-full flex items-end gap-1 px-1">
                    <div className="flex-1 bg-[var(--primary)]/20 h-1/2 rounded-t-sm"></div>
                    <div className="flex-1 bg-[var(--primary)]/30 h-3/4 rounded-t-sm"></div>
                    <div className="flex-1 bg-[var(--primary)] h-[90%] rounded-t-sm"></div>
                    <div className="flex-1 bg-rose-500 h-[95%] rounded-t-sm"></div>
                    <div className="flex-1 bg-rose-600 h-full rounded-t-sm"></div>
                    <div className="flex-1 bg-[var(--primary)] h-[85%] rounded-t-sm"></div>
                  </div>
                  <div className="flex justify-between mt-3 font-mono font-bold text-[10px] text-zinc-400">
                    <span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span><span>22:00</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">Delayed Orders</p>
                    <p className="text-xl font-black text-rose-600 dark:text-rose-500">12</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Clock size={14} /> Wait Queue
                    </p>
                    <p className="text-xl font-black text-[var(--primary)]">8</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4">Top Consumed Ingredients</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <Utensils size={16} className="text-zinc-400" />
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Mozzarella Cheese</span>
                      </div>
                      <span className="font-mono text-xs font-black text-[var(--primary)]">142kg</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <Croissant size={16} className="text-zinc-400" />
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Wheat Dough</span>
                      </div>
                      <span className="font-mono text-xs font-black text-[var(--primary)]">210 units</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Tab */}
            {activeTab === 'delivery' && (
              <div className="animate-fade-in space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                    <Truck size={16} className="text-zinc-500" />
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Rider Productivity</h3>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800/50">
                        <th className="p-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Rider Name</th>
                        <th className="p-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center">Deliv.</th>
                        <th className="p-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Avg Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                      <tr>
                        <td className="p-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">Marcus R.</td>
                        <td className="p-2 text-center font-mono text-xs font-black text-zinc-700 dark:text-zinc-300">14</td>
                        <td className="p-2 text-right font-mono text-xs font-black text-[var(--primary)]">18m</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">Sarah K.</td>
                        <td className="p-2 text-center font-mono text-xs font-black text-zinc-700 dark:text-zinc-300">12</td>
                        <td className="p-2 text-right font-mono text-xs font-black text-[var(--primary)]">22m</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">John D.</td>
                        <td className="p-2 text-center font-mono text-xs font-black text-zinc-700 dark:text-zinc-300">9</td>
                        <td className="p-2 text-right font-mono text-xs font-black text-rose-500">34m</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Map size={16} /> Zone Performance
                  </h3>
                  <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <div className="grid grid-cols-2 grid-rows-2 w-full h-full p-2 gap-2 relative z-10">
                      <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-xl flex items-center justify-center border border-[var(--primary)]/30 backdrop-blur-sm shadow-sm">
                        <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-wider">North (Fast)</span>
                      </div>
                      <div className="bg-rose-500/10 dark:bg-rose-500/20 rounded-xl flex items-center justify-center border border-rose-500/30 backdrop-blur-sm shadow-sm">
                        <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">East (Congested)</span>
                      </div>
                      <div className="bg-zinc-100/50 dark:bg-zinc-800/50 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm shadow-sm">
                        <span className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">West (Normal)</span>
                      </div>
                      <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-xl flex items-center justify-center border border-[var(--primary)]/30 backdrop-blur-sm shadow-sm">
                        <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-wider">South (Fast)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="animate-fade-in space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Stockout Analysis</h3>
                  
                  <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-3 rounded-lg flex items-center gap-3 mb-4 shadow-sm">
                    <Package size={32} className="text-rose-500" />
                    <div>
                      <p className="text-sm font-black text-rose-600 dark:text-rose-400">Shortage Detected</p>
                      <p className="text-xs font-bold text-rose-500/80 uppercase tracking-wider mt-1">Pepperoni Stock &lt; 5%</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Orders Impacted by Shortages:</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-lg p-2.5 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-[var(--primary)] mb-0.5">18</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Today</span>
                      </div>
                      <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-lg p-2.5 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-rose-500 mb-0.5">4%</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Revenue Loss</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4">Critical Supplies Re-order</h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Mushrooms</span>
                      <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">In Transit</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Black Olives</span>
                      <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">Restocked</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/10 rounded-lg">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Onions</span>
                      <span className="bg-rose-500 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm">Order Now</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
