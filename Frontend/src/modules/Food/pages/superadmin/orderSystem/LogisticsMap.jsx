import React, { useState } from 'react';
import {
  Pizza, Bike, Receipt, Timer, AlertTriangle, Search, Mic,
  Store, CheckCircle2, PauseCircle, AlertCircle, TrendingUp,
  ArrowDown, Bell, ChevronRight, X
} from 'lucide-react';

export default function LogisticsMap({ isOpen, onClose }) {
  const [selectedRider, setSelectedRider] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-surface dark:bg-zinc-950 flex flex-col animate-in fade-in zoom-in-95 duration-300">

      {/* Header Overlay for Modal Closing */}
      <div className="absolute top-3 right-3 z-50">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-300 active:scale-95"
        >
          <X size={16} />
        </button>
      </div>

      <main className="flex-grow relative overflow-hidden bg-[#e5e5f7]">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full opacity-60 pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,249,250,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)]"></div>
          <img
            className="w-full h-full object-cover grayscale mix-blend-multiply opacity-20 dark:opacity-40 dark:invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1zJ-XTwoq9y-uCb9JEHOpKLzA-4MyxynwBPjo5nJScPE72sSSw0bAAb8eLVy1qnS5hRl-zN4ogwqKbcC5doSsjKUBUiBDJhK-UzO5ZYjcipg0m70hQUjjcTiwp0BsTQ-oII0BtdmxgIpmi8vE-RkyvVGvnX3MnJsUum-tG16QXY3yMF93sU1fBE1Bbq8KMPKr271Rg_2lZiM7ZYhFkSwoIJDQGJOolCbuJFsmQs1zm65s2GbdNi9-MICrtceyjGSJuVTWvmrdqV4"
            alt="Map background"
          />

          {/* Map Markers - Stores */}
          <div className="absolute top-1/4 left-1/3 animate-[floating_3s_ease-in-out_infinite]">
            <div className="flex flex-col items-center">
              <div className="bg-[var(--primary)] text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-zinc-900">
                <Pizza size={20} />
              </div>
              <div className="mt-1 px-2 py-0.5 bg-white dark:bg-zinc-800 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-[var(--primary)] dark:text-red-400">Downtown Hub</div>
            </div>
          </div>
          <div className="absolute top-1/2 left-2/3 animate-[floating_3s_ease-in-out_infinite]" style={{ animationDelay: '-0.5s' }}>
            <div className="flex flex-col items-center">
              <div className="bg-[var(--primary)] text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-zinc-900">
                <Pizza size={20} />
              </div>
              <div className="mt-1 px-2 py-0.5 bg-white dark:bg-zinc-800 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-[var(--primary)] dark:text-red-400">North Sector</div>
            </div>
          </div>

          {/* Map Markers - Riders */}
          <div className="absolute top-[40%] left-[45%] cursor-pointer group" onClick={() => setSelectedRider(selectedRider === 1 ? null : 1)}>
            <div className="bg-emerald-600 text-white p-1.5 rounded-full shadow-md border border-white dark:border-zinc-900 hover:scale-110 transition-transform">
              <Bike size={18} />
            </div>
            {/* Rider Tooltip */}
            {selectedRider === 1 && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 shadow-xl z-20 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-zinc-900 dark:text-zinc-100 font-bold">Rider #PV-882</span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1.5 rounded font-bold uppercase">Active</span>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-1 flex items-center gap-1">
                  <Receipt size={12} /> Order: #77291
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-2 flex items-center gap-1">
                  <Timer size={12} /> ETA: 4 mins
                </p>
                <button className="w-full py-1.5 bg-[var(--primary)] text-white text-[10px] font-bold rounded-lg uppercase tracking-wide hover:brightness-110 transition-all">Track Details</button>
              </div>
            )}
          </div>

          <div className="absolute top-[60%] left-[30%] cursor-pointer" onClick={() => setSelectedRider(selectedRider === 2 ? null : 2)}>
            <div className="bg-indigo-600 text-white p-1.5 rounded-full shadow-md border border-white dark:border-zinc-900 hover:scale-110 transition-transform">
              <Bike size={18} />
            </div>
            {selectedRider === 2 && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 shadow-xl z-20 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-zinc-900 dark:text-zinc-100 font-bold">Rider #PV-105</span>
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-1.5 rounded font-bold uppercase">Idle</span>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-2">Waiting for next assignment</p>
                <button className="w-full py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold rounded-lg uppercase tracking-wide hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Assign Order</button>
              </div>
            )}
          </div>

          <div className="absolute top-[20%] left-[70%]">
            <div className="bg-red-600 text-white p-1.5 rounded-full shadow-md border border-white dark:border-zinc-900 animate-bounce">
              <AlertTriangle size={18} />
            </div>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-full max-w-sm px-3 z-10">
          <div className="bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 rounded-full h-10 flex items-center px-3 gap-2.5">
            <Search className="text-zinc-400" size={16} />
            <input
              className="flex-grow bg-transparent border-none focus:ring-0 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
              placeholder="Search Rider ID, Store or Area..."
              type="text"
            />
            <button className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500">
              <Mic size={14} />
            </button>
          </div>
        </div>

        {/* Floating Filters */}
        <div className="absolute bottom-40 md:bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-wrap justify-center gap-1.5 px-3 w-full max-w-2xl">
          <button className="bg-[var(--primary)] text-white px-3 py-1.5 rounded-full shadow-sm text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95">
            <Store size={14} />
            Stores
          </button>
          <button className="bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm text-xs font-medium flex items-center gap-1.5 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Active Deliveries
          </button>
          <button className="bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm text-xs font-medium flex items-center gap-1.5 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <PauseCircle size={14} className="text-zinc-400" />
            Idle Riders
          </button>
          <button className="bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm text-xs font-medium flex items-center gap-1.5 transition-all hover:bg-red-50 dark:hover:bg-red-900/20">
            <AlertCircle size={14} />
            Critical Delays
          </button>
        </div>

        {/* Logistics Summary Card / Bottom Sheet */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-white dark:bg-zinc-900 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] border-t border-zinc-200 dark:border-zinc-800 rounded-t-2xl p-4 pb-5">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">

                {/* KPI 1: Riders */}
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Bike size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Active Riders</p>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">142</h2>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                        <TrendingUp size={10} className="mr-0.5" /> 12%
                      </span>
                    </div>
                  </div>
                </div>

                {/* KPI 2: Delivery Time */}
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Timer size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Avg. Time</p>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">22m 14s</h2>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                        <ArrowDown size={10} className="mr-0.5" /> 3m
                      </span>
                    </div>
                  </div>
                </div>

                {/* KPI 3: Critical Alert Section */}
                <div className="flex-1 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-3 rounded-xl flex items-center gap-3 group cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">Critical Delays</p>
                    <div className="flex justify-between items-center mt-0.5">
                      <h2 className="text-lg font-black text-red-600 dark:text-red-400">08</h2>
                      <ChevronRight size={16} className="text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[9px] text-red-600/80 dark:text-red-400/80 mt-0.5">Orders  30 mins limit</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );
}
