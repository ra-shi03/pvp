import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Mail, Download, Copy, TrendingUp, Star, UserX, Clock, Filter, AlertCircle, FileDown } from 'lucide-react';

export default function NotificationAnalysis({ notification, onBack }) {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-12 animate-in fade-in slide-in-from-right-4 duration-300 relative z-50">
      {/* Top Header */}
      <header className="w-full sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 flex items-center h-12 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors flex items-center justify-center">
            <ArrowLeft size={16} className="text-[var(--primary)]" />
          </button>
          <h1 className="text-sm font-bold text-[var(--primary)] tracking-tight">Notification Analytics</h1>
        </div>
      </header>

      <main className="p-3 md:p-4 max-w-7xl mx-auto space-y-4">
        {/* Campaign Header Card */}
        <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-black dark:text-white">{notification?.title || 'Weekend Pizza Party Promo'}</h3>
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 tracking-wider">
                Completed
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                <Bell size={12} className="text-black/70 dark:text-white/70" />
                <span className="text-[9px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Push</span>
              </div>
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                <Mail size={12} className="text-black/70 dark:text-white/70" />
                <span className="text-[9px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Email</span>
              </div>
              <span className="text-black/50 dark:text-white/50 text-[11px] font-semibold ml-1 border-l border-zinc-200 dark:border-zinc-800 pl-2">Sent on Oct 24, 2023 • 18:00</span>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black/70 dark:text-white/70 font-bold text-xs rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-95 flex items-center justify-center gap-1.5 shadow-sm">
              <Download size={14} /> Download PDF
            </button>
            <button className="flex-1 md:flex-none px-3 py-1.5 bg-[var(--primary)] text-white font-bold text-xs rounded-lg hover:bg-[var(--primary)]/90 transition-colors active:scale-95 flex items-center justify-center gap-1.5 shadow-sm">
              <Copy size={14} /> Clone Campaign
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none gap-2">
          <button className="px-4 py-2 text-[var(--primary)] font-bold border-b-2 border-[var(--primary)] text-xs whitespace-nowrap">Overview</button>
          <button className="px-4 py-2 text-black/50 dark:text-white/50 font-bold hover:text-[var(--primary)] transition-colors text-xs whitespace-nowrap">Delivery</button>
          <button className="px-4 py-2 text-black/50 dark:text-white/50 font-bold hover:text-[var(--primary)] transition-colors text-xs whitespace-nowrap">Engagement</button>
          <button className="px-4 py-2 text-black/50 dark:text-white/50 font-bold hover:text-[var(--primary)] transition-colors text-xs whitespace-nowrap">Logs</button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group flex items-center justify-between">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-black/70 dark:text-white/70 font-bold text-[10px] uppercase tracking-wider">Open Rate</span>
              <span className="text-lg font-black text-black dark:text-white tracking-tight">22.4%</span>
            </div>
            <div className="h-8 w-16 bg-[var(--primary)]/5 rounded relative overflow-hidden flex items-end shrink-0">
              <svg className="absolute bottom-0 w-full h-full text-[var(--primary)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 80 Q 25 20, 50 60 T 100 30" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group flex items-center justify-between">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-black/70 dark:text-white/70 font-bold text-[10px] uppercase tracking-wider">CTR</span>
              <span className="text-lg font-black text-black dark:text-white tracking-tight">4.6%</span>
            </div>
            <div className="h-8 w-16 bg-[var(--primary)]/5 rounded relative overflow-hidden flex items-end shrink-0">
              <svg className="absolute bottom-0 w-full h-full text-[var(--primary)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 90 Q 20 70, 40 85 T 80 40 T 100 10" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-black/70 dark:text-white/70 font-bold text-[10px] uppercase tracking-wider">Revenue Generated</span>
              <span className="text-lg font-black text-[var(--primary)] tracking-tight">$12,450</span>
            </div>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded shrink-0">
              <TrendingUp size={12} />
              <span>+12.4%</span>
            </div>
          </div>
        </div>

        {/* Main Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Funnel Card */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-black dark:text-white">Delivery Funnel</h4>
              <button className="text-[var(--primary)] text-xs font-bold hover:underline">View Retention</button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Sent', val: '100k', pct: '100.0%', w: '100%', opacity: 'opacity-20', textOnPrimary: true },
                { label: 'Delivered', val: '98k', pct: '98.0%', w: '98%', opacity: 'opacity-40', textOnPrimary: true },
                { label: 'Opened', val: '22k', pct: '22.4%', w: '22%', opacity: 'opacity-60', textOnPrimary: true },
                { label: 'Clicked', val: '4.5k', pct: '4.6%', w: '4.6%', opacity: 'opacity-80' },
                { label: 'Converted', val: '850', pct: '0.85%', w: '0.8%', opacity: 'opacity-100', minW: '8px' }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-16 text-right shrink-0">
                    <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">{step.label}</p>
                    <p className="text-xs font-bold text-black dark:text-white">{step.val}</p>
                  </div>
                  <div className="grow h-8 bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-md relative overflow-hidden flex items-center">
                    <div className={`h-full bg-[var(--primary)] ${step.opacity} transition-all duration-1000 ease-out`} style={{ width: animateBars ? step.w : '0%', minWidth: step.minW || '0' }}></div>
                    <div className={`absolute inset-0 flex items-center px-3 font-bold ${step.textOnPrimary && parseFloat(step.w) > 15 ? 'text-white' : 'text-[var(--primary)]'} text-xs`}>
                      {step.pct}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segments Card */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
            <h4 className="text-sm font-bold text-black dark:text-white mb-4">Top Performing Segments</h4>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-1.5 -mx-1.5 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                    <Star size={14} />
                  </div>
                  <div>
                    <p className="font-bold text-black dark:text-white text-xs">VIP Customers</p>
                    <p className="text-[10px] text-black/50 dark:text-white/50 font-semibold">2.4k targets</p>
                  </div>
                </div>
                <div className="text-right w-16">
                  <p className="text-[var(--primary)] font-bold text-xs mb-1">12.8%</p>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full rounded-full transition-all duration-1000" style={{ width: animateBars ? '85%' : '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-1.5 -mx-1.5 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <UserX size={14} />
                  </div>
                  <div>
                    <p className="font-bold text-black dark:text-white text-xs">Inactive Customers</p>
                    <p className="text-[10px] text-black/50 dark:text-white/50 font-semibold">15.2k targets</p>
                  </div>
                </div>
                <div className="text-right w-16">
                  <p className="text-[var(--primary)] font-bold text-xs mb-1">4.2%</p>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full rounded-full transition-all duration-1000" style={{ width: animateBars ? '35%' : '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-1.5 -mx-1.5 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <Clock size={14} />
                  </div>
                  <div>
                    <p className="font-bold text-black dark:text-white text-xs">Late Night Diners</p>
                    <p className="text-[10px] text-black/50 dark:text-white/50 font-semibold">8.1k targets</p>
                  </div>
                </div>
                <div className="text-right w-16">
                  <p className="text-[var(--primary)] font-bold text-xs mb-1">9.5%</p>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full rounded-full transition-all duration-1000" style={{ width: animateBars ? '65%' : '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 text-black/70 dark:text-white/70 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              See All Segments
            </button>
          </div>
        </div>

        {/* Recent Activity / Logs */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
            <h4 className="text-sm font-bold text-black dark:text-white">Recent Activity Logs</h4>
            <div className="flex gap-1.5">
              <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 text-black/50 dark:text-white/50">
                <Filter size={14} />
              </button>
              <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 text-black/50 dark:text-white/50">
                <FileDown size={14} />
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
            {[
              { name: 'Marcus Thompson', action: 'Converted via Push', status: 'Success', statusColor: 'bg-emerald-100 text-emerald-700', time: 'Just now', icon: Bell, iconColor: 'text-[var(--primary)]' },
              { name: 'Elena Rodriguez', action: 'Email Delivered', status: 'Delivered', statusColor: 'bg-emerald-100 text-emerald-700', time: '2 mins ago', icon: Mail, iconColor: 'text-[var(--primary)]' },
              { name: 'David Chen', action: 'Push Opened', status: 'Opened', statusColor: 'bg-blue-100 text-blue-700', time: '5 mins ago', icon: Bell, iconColor: 'text-[var(--primary)]' },
              { name: 'Sarah Jenkins', action: 'Push Failed (Expired)', status: 'Failed', statusColor: 'bg-red-100 text-red-700', time: '12 mins ago', icon: AlertCircle, iconColor: 'text-red-500', isError: true },
              { name: 'Michael Okafor', action: 'Email Clicked', status: 'Clicked', statusColor: 'bg-blue-100 text-blue-700', time: '15 mins ago', icon: Mail, iconColor: 'text-[var(--primary)]' },
            ].map((log, i) => (
              <div key={i} className="px-3.5 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${log.isError ? 'bg-red-50 dark:bg-red-900/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                    <log.icon size={14} className={log.iconColor} />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-black dark:text-white">{log.name}</p>
                    <p className="text-[10px] text-black/50 dark:text-white/50 font-semibold">{log.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`${log.statusColor} dark:bg-opacity-20 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider`}>
                    {log.status}
                  </span>
                  <p className="text-[9px] text-black/50 dark:text-white/50 mt-1 font-semibold">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <button className="text-[var(--primary)] font-bold text-[10px] hover:underline uppercase tracking-wider">
              View All 100,000 Entries
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
