import React, { useState, useEffect } from "react";
import {
  PenTool,
  Target,
  MapPin,
  ZoomIn,
  ZoomOut,
  Locate,
  AlertTriangle,
  Ruler,
  Users,
  Store,
  Circle,
  Save,
  X
} from "lucide-react";

export default function StoreCoverageMap() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[520px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
      {/* Simulated Map Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-lighten" 
          style={{ backgroundImage: "radial-gradient(#9ca3af 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        ></div>

        {/* Territory Layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Pune Region Polygon (Abstracted) */}
          <svg className="absolute top-1/4 left-1/4 w-[400px] h-[300px]" viewBox="0 0 100 100">
            <polygon fill="rgba(175, 16, 26, 0.08)" points="10,10 90,15 85,85 20,95" stroke="#af101a" strokeDasharray="2,1" strokeWidth="0.5"></polygon>
            <circle cx="45" cy="50" fill="rgba(255, 152, 0, 0.15)" r="15" stroke="#ff9800" strokeWidth="0.3"></circle>
            <circle cx="70" cy="30" fill="rgba(255, 152, 0, 0.15)" r="12" stroke="#ff9800" strokeWidth="0.3"></circle>
          </svg>

          {/* Indore Region Polygon (Abstracted) */}
          <svg className="absolute top-1/3 left-[40%] w-[350px] h-[350px]" viewBox="0 0 100 100">
            <polygon fill="rgba(0, 95, 123, 0.08)" points="30,5 95,20 80,90 10,70" stroke="#005f7b" strokeDasharray="2,1" strokeWidth="0.5"></polygon>
            <circle cx="50" cy="45" fill="rgba(255, 152, 0, 0.15)" r="18" stroke="#ff9800" strokeWidth="0.3"></circle>
          </svg>
        </div>

        {/* Overlap Conflict Highlight */}
        <div className="absolute top-[38%] left-[42%] w-12 h-12 bg-red-500/20 rounded-full animate-pulse border-2 border-red-500 flex items-center justify-center">
          <AlertTriangle className="text-red-600 dark:text-red-400" fill="currentColor" size={18} />
        </div>
      </div>

      {/* Map Navigation Controls */}
      <div className="absolute top-3.5 left-3.5 flex flex-col gap-2.5">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col">
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md text-[var(--primary)]" title="Draw Polygon">
            <PenTool size={16} />
          </button>
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md text-zinc-500" title="Draw Radius">
            <Target size={16} />
          </button>
          <div className="h-px bg-zinc-200 dark:bg-zinc-700 my-1 mx-1.5"></div>
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md text-zinc-500" title="Add Store Marker">
            <MapPin size={16} />
          </button>
        </div>
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col">
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md text-zinc-500">
            <ZoomIn size={16} />
          </button>
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md text-zinc-500">
            <ZoomOut size={16} />
          </button>
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-md text-zinc-500">
            <Locate size={16} />
          </button>
        </div>
      </div>

      {/* Floating Region Toggle */}
      <div className="absolute top-3.5 right-3.5 gap-2 hidden md:flex">
        <button className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] border border-[var(--primary)]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
          Pune Region
        </button>
        <button className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold text-zinc-500 border border-transparent hover:bg-white dark:hover:bg-zinc-800 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
          Indore Region
        </button>
      </div>

      {/* Coverage Statistics Side Panel */}
      <aside className="absolute right-3.5 top-14 bottom-3.5 w-72 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 hidden lg:flex">
        <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">Coverage Analysis</h3>
          <p className="text-xs text-zinc-500">Selected: Western Pune Cluster</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/10">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[9px] font-bold tracking-wider text-[var(--primary)] uppercase">Area Coverage</span>
                <Ruler size={14} className="text-[var(--primary)]" />
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1,240 <span className="text-xs font-normal text-zinc-500">km²</span></div>
            </div>
            
            <div className="p-3 rounded-lg bg-cyan-600/5 border border-cyan-600/10">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[9px] font-bold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase">Population Reach</span>
                <Users size={14} className="text-cyan-700 dark:text-cyan-400" />
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">4.2M <span className="text-xs font-normal text-zinc-500">Est.</span></div>
            </div>

            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[9px] font-bold tracking-wider text-orange-700 dark:text-orange-400 uppercase">Active Stores</span>
                <Store size={14} className="text-orange-700 dark:text-orange-400" />
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">24 <span className="text-xs font-normal text-zinc-500">Locations</span></div>
            </div>
          </div>

          {/* Territory List */}
          <div>
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Territory Breakdown</h4>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-1.5">
                  <Circle size={10} fill="currentColor" className="text-[var(--primary)]" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Shivaji Nagar</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">92% Cap</span>
              </div>
              <div className="flex items-center justify-between p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-1.5">
                  <Circle size={10} fill="currentColor" className="text-[var(--primary)]" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Kothrud West</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">78% Cap</span>
              </div>
              <div className="flex items-center justify-between p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-1.5">
                  <Circle size={10} fill="currentColor" className="text-red-500" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Baner Extension</span>
                </div>
                <AlertTriangle size={12} className="text-red-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <button className="w-full py-2 bg-[var(--primary)] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all shadow-md">
            <Save size={14} />
            Update Boundaries
          </button>
        </div>
      </aside>

      {/* Overlap Notification Toast */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl shadow-2xl border-l-4 border-red-500 transform transition-all duration-500 z-50 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <AlertTriangle size={18} className="text-red-500 shrink-0" />
        <div className="flex flex-col">
          <span className="text-xs font-bold">Territory Overlap Detected</span>
          <span className="text-[10px] opacity-80 mt-0.5">Conflict between 'Pune West' and 'Indore South-West'.</span>
        </div>
        <button 
          className="ml-4 opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setShowToast(false)}
        >
          <X size={14} />
        </button>
      </div>

      {/* Mini-Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-3 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 hidden sm:block">
        <h5 className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Legend</h5>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--primary)]/20 border border-[var(--primary)]"></div>
            <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Regional Zone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500/30 border border-orange-500"></div>
            <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Delivery Radius</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[var(--primary)]" />
            <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Store Outlet</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-px border-t border-dashed border-zinc-400 dark:border-zinc-500"></div>
            <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Logistics Path</span>
          </div>
        </div>
      </div>
    </div>
  );
}
