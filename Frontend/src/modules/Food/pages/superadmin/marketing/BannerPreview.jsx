import React, { useState, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Eye, MousePointerClick, Percent, ShoppingCart, TrendingUp, TrendingDown, Settings, Link as LinkIcon, Calendar, MapPin, PauseCircle, Edit } from 'lucide-react';

export default function BannerPreview({ banner, onBack }) {
  const [previewMode, setPreviewMode] = useState('Mobile');
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setAnimateBars(true), 100);
  }, []);

  // Mock data for the chart based on HTML
  const chartData = [
    { day: 'Mon', hImp: 'h-16', hClk: 'h-8' },
    { day: 'Tue', hImp: 'h-20', hClk: 'h-10' },
    { day: 'Wed', hImp: 'h-28', hClk: 'h-14' },
    { day: 'Thu', hImp: 'h-24', hClk: 'h-12' },
    { day: 'Fri', hImp: 'h-32', hClk: 'h-18' },
    { day: 'Sat', hImp: 'h-16', hClk: 'h-8' },
    { day: 'Sun', hImp: 'h-20', hClk: 'h-10' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-955 pb-16 animate-in fade-in slide-in-from-right-4 duration-300 relative z-50">
      {/* Top App Bar */}
      <header className="w-full sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center h-12 px-4 md:px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors flex items-center justify-center text-black/50 dark:text-white/50">
            <ArrowLeft size={18} className="text-[var(--primary)]" />
          </button>
          <h1 className="text-sm font-bold text-[var(--primary)] truncate max-w-[200px] md:max-w-md">{banner?.title || 'Weekend BOGO Blowout'}</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
            {banner?.status || 'Active'}
          </span>
          <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-black/50 dark:text-white/50">
            <MoreVertical size={14} />
          </button>
        </div>
      </header>

      <main className="p-3 md:p-4 max-w-5xl mx-auto space-y-4">
        {/* Preview Section */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Banner Preview</h2>
            <div className="flex bg-zinc-200 dark:bg-zinc-850 p-0.5 rounded-lg">
              <button 
                onClick={() => setPreviewMode('Mobile')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all shadow-sm ${previewMode === 'Mobile' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
              >
                Mobile
              </button>
              <button 
                onClick={() => setPreviewMode('Desktop')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all shadow-sm ${previewMode === 'Desktop' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
              >
                Desktop
              </button>
            </div>
          </div>
          
          <div className={`relative mx-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center transition-all duration-500 ${previewMode === 'Mobile' ? 'w-full md:w-[320px] aspect-[4/5]' : 'w-full aspect-[21/9]'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <img 
              src={banner?.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&fm=webp"} 
              alt="Preview" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 p-4 w-full h-full flex flex-col justify-center items-start text-white">
              <span className="bg-[var(--primary)] px-1.5 py-0.5 rounded text-[8px] font-bold mb-1.5 uppercase shadow-sm">
                LIMITED TIME
              </span>
              <h3 className="text-xl md:text-3xl font-bold leading-tight mb-1 tracking-tight">
                Buy 1 Get 1
              </h3>
              <p className="text-xs md:text-sm opacity-90 mb-4 max-w-[180px] md:max-w-xs font-semibold">
                Signature Pizzas only. Every Saturday & Sunday.
              </p>
              <button className="bg-[var(--primary)] text-white font-bold px-4 py-2 rounded-full text-xs shadow-lg hover:bg-[var(--primary)]/90 active:scale-95 transition-all">
                Order Now
              </button>
            </div>
          </div>
        </section>

        {/* Analytics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Impressions', val: '245,670', trend: '+12%', icon: Eye, color: 'text-emerald-600 dark:text-emerald-400', TIcon: TrendingUp },
            { label: 'Clicks', val: '12,780', trend: '+8.4%', icon: MousePointerClick, color: 'text-emerald-600 dark:text-emerald-400', TIcon: TrendingUp },
            { label: 'CTR', val: banner?.ctr || '5.2%', trend: '-0.2%', icon: Percent, color: 'text-red-600 dark:text-red-400', TIcon: TrendingDown },
            { label: 'Conversions', val: '840', trend: '+15.1%', icon: ShoppingCart, color: 'text-emerald-600 dark:text-emerald-400', TIcon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider flex items-center gap-1">
                  {stat.label}
                </span>
                <h4 className="text-base font-black text-black dark:text-white">{stat.val}</h4>
                <span className={`text-[10px] flex items-center gap-0.5 font-semibold mt-0.5 ${stat.color}`}>
                  <stat.TIcon size={10} /> {stat.trend}
                </span>
              </div>
              <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-black/50 dark:text-white/50 rounded-lg shrink-0">
                <stat.icon size={12} />
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Charts */}
          <section className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-black dark:text-white">Performance Trends</h3>
              <span className="text-[9px] font-bold text-black/60 dark:text-white/60 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-805 px-1.5 py-0.5 rounded">Last 7 Days</span>
            </div>
            
            <div className="h-32 flex items-end justify-between gap-1.5 px-1 pt-4">
              {chartData.map((data, i) => (
                <div key={i} className="flex flex-col items-center flex-1 group">
                  <div className={`w-full max-w-[32px] bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-t ${data.hImp} group-hover:bg-[var(--primary)]/20 dark:group-hover:bg-[var(--primary)]/30 transition-colors relative`}>
                    <div className={`absolute bottom-0 w-full bg-[var(--primary)] rounded-t transition-all duration-1000 ease-in-out ${animateBars ? data.hClk : 'h-0'}`}></div>
                  </div>
                  <span className="text-[9px] font-bold text-black/40 dark:text-white/40 mt-2">{data.day}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[var(--primary)]/20"></div>
                <span className="text-[9px] font-bold text-black/60 dark:text-white/60">Impressions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[var(--primary)]"></div>
                <span className="text-[9px] font-bold text-black/60 dark:text-white/60">Clicks</span>
              </div>
            </div>
          </section>

          {/* Settings Summary */}
          <section className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <Settings size={14} className="text-black/50 dark:text-white/50" /> Settings Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-lg border border-zinc-100 dark:border-zinc-700">
                  <LinkIcon size={14} className="text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-black/60 dark:text-white/60">Redirect Target</div>
                  <div className="text-xs text-black dark:text-white font-bold">Category: Signature Pizzas</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-lg border border-zinc-100 dark:border-zinc-700">
                  <Calendar size={14} className="text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-black/60 dark:text-white/60">Schedule</div>
                  <div className="text-xs text-black dark:text-white font-bold">Jun 01 - Jun 30, 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-lg border border-zinc-100 dark:border-zinc-700">
                  <MapPin size={14} className="text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-black/60 dark:text-white/60">Display Locations</div>
                  <div className="text-xs text-black dark:text-white font-bold">Homepage, App Home Screen</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 p-2.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 flex justify-center gap-3 z-50">
        <div className="w-full max-w-5xl mx-auto flex gap-3">
          <button className="flex-1 md:flex-none md:w-36 border border-[var(--primary)] text-[var(--primary)] font-bold py-1.5 rounded-lg text-xs hover:bg-[var(--primary)]/5 active:scale-95 transition-all flex items-center justify-center gap-1.5">
            <Edit size={14} /> Edit Banner
          </button>
          <button className="flex-1 md:flex-none md:w-44 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-1.5 rounded-lg text-xs hover:bg-zinc-800 dark:hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm">
            <PauseCircle size={14} /> Pause Campaign
          </button>
        </div>
      </footer>
    </div>
  );
}
