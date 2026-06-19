import React, { useState } from 'react';
import { Search, Upload, CalendarDays, Plus } from 'lucide-react';
import { BannersList } from './BannersData';
import CreateBanners from './CreateBanners';
import BannerPreview from './BannerPreview';

export default function BannersAndPromotions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Banner Type');
  const [filterStatus, setFilterStatus] = useState('Status');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  if (selectedBanner) {
    return <BannerPreview banner={selectedBanner} onBack={() => setSelectedBanner(null)} />;
  }

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4 animate-in fade-in duration-500">
      
      {/* Page Header Actions */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">Promotion Management</h3>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Create, schedule, and monitor promotional banners for app and web.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 text-black/70 dark:text-white/70 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm">
            <Upload size={14} /> <span className="hidden sm:inline">Bulk Upload</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 text-black/70 dark:text-white/70 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm">
            <CalendarDays size={14} /> <span className="hidden sm:inline">Banner Calendar</span>
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[var(--primary)] text-white rounded-lg text-xs font-bold hover:bg-[var(--primary)]/90 active:scale-95 transition-all shadow-md"
          >
            <Plus size={14} /> Create Banner
          </button>
        </div>
      </section>

      {/* KPI Stats Section */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4 select-none">
        {[
          { label: 'Active Banners', val: '12', trend: '+5%', tColor: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Scheduled', val: '8', trend: 'Steady', tColor: 'text-black/50 dark:text-white/50' },
          { label: 'Total Impressions', val: '1.2M', trend: '+12%', tColor: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Total Clicks', val: '45k', trend: '+8.4%', tColor: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Avg CTR', val: '3.75%', trend: '+0.5%', tColor: 'text-emerald-600 dark:text-emerald-400' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">{kpi.label}</span>
              <h4 className="text-lg font-black text-black dark:text-white">{kpi.val}</h4>
              <span className={`text-[10px] font-semibold ${kpi.tColor} mt-0.5`}>{kpi.trend}</span>
            </div>
            <div className="w-12 h-6 bg-zinc-50 dark:bg-zinc-800/50 rounded overflow-hidden relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/15 to-transparent"></div>
              <svg viewBox="0 0 100 24" className="w-full h-full stroke-emerald-500 fill-none" strokeWidth="2.5">
                 <polyline points="0,20 20,15 40,18 60,10 80,12 100,5"/>
              </svg>
            </div>
          </div>
        ))}
        {/* Revenue Impact (Highlighted) */}
        <div className="bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10 p-3 border border-[var(--primary)]/20 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">Revenue Impact</span>
            <h4 className="text-lg font-black text-[var(--primary)]">$84.2k</h4>
            <span className="text-[10px] font-semibold text-[var(--primary)] mt-0.5">+15%</span>
          </div>
          <div className="w-12 h-6 bg-white/50 dark:bg-black/15 rounded overflow-hidden relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/15 to-transparent"></div>
            <svg viewBox="0 0 100 24" className="w-full h-full stroke-[var(--primary)] fill-none" strokeWidth="2.5">
               <polyline points="0,20 20,18 40,15 60,12 80,8 100,5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h4 className="text-xs font-bold text-black dark:text-white">Revenue Generated Overview</h4>
            <p className="text-[10px] text-black/60 dark:text-white/60 mt-0.5">Attributed sales performance for the last 30 days.</p>
          </div>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button className="text-[10px] font-bold px-2 py-1 bg-white dark:bg-zinc-700 text-black dark:text-white rounded shadow-sm">Day</button>
            <button className="text-[10px] font-bold px-2 py-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white rounded transition-colors">Week</button>
          </div>
        </div>
        
        <div className="h-36 w-full relative flex items-end gap-1.5 px-2">
          {/* Simple Bar Chart Visualization */}
          {[40, 55, 70, 45, 85, 95, 65, 40, 75, 50, 30, 60, 90, 45, 70, 80, 55, 40, 65, 95].map((height, i) => (
             <div 
               key={i} 
               className={`flex-1 transition-colors rounded-t-sm relative group cursor-pointer ${
                 i === 5 ? 'bg-[var(--primary)]/30 dark:bg-[var(--primary)]/40 border-x border-t border-[var(--primary)]/50' : 'bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 dark:bg-[var(--primary)]/20 dark:hover:bg-[var(--primary)]/30'
               }`} 
               style={{ height: `${height}%` }}
             >
               <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold z-20">
                 ${(height * 12).toFixed(0)}
               </div>
             </div>
          ))}
          {/* Legend */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 translate-y-full">
            <span className="text-[9px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">30 Days Ago</span>
            <span className="text-[9px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">Today</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl mt-8 shadow-sm">
        <div className="flex-1 relative">
          <input 
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 font-semibold" 
            placeholder="Search by title, coupon code..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={14} className="absolute left-2.5 top-2.5 text-black/50 dark:text-white/50" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <select 
            className="bg-zinc-50 dark:bg-zinc-95 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs px-2.5 py-1.5 focus:ring-2 focus:ring-[var(--primary)] outline-none min-w-[120px] text-black dark:text-white transition-all cursor-pointer font-semibold"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>Banner Type</option>
            <option>Homepage Slider</option>
            <option>App Slider</option>
            <option>Popup</option>
            <option>Sidebar</option>
          </select>
          <select 
            className="bg-zinc-50 dark:bg-zinc-95 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs px-2.5 py-1.5 focus:ring-2 focus:ring-[var(--primary)] outline-none min-w-[120px] text-black dark:text-white transition-all cursor-pointer font-semibold"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>Status</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Expired</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Banners Listing */}
      <BannersList searchTerm={searchTerm} filterType={filterType} filterStatus={filterStatus} onPreview={setSelectedBanner} />

      <CreateBanners isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
