import React, { useState } from 'react';
import { Megaphone, Users, MoreVertical, Bell, Mail, MessageSquare, MessageCircle, Filter, Search, LayoutTemplate } from 'lucide-react';
import { NotificationList } from './NotificationData';
import CreateNotification from './CreateNotification';
import NotificationTemplate from './NotificationTemplate';
import NotificationAnalysis from './NotificationAnalysis';

export default function NotificationsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isTemplateMode, setIsTemplateMode] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  if (selectedNotification) {
    return <NotificationAnalysis notification={selectedNotification} onBack={() => setSelectedNotification(null)} />;
  }

  if (isCreateMode) {
    return <CreateNotification onBack={() => setIsCreateMode(false)} />;
  }

  if (isTemplateMode) {
    return (
      <NotificationTemplate 
        onBack={() => setIsTemplateMode(false)}
        onSelectTemplate={() => {
          setIsTemplateMode(false);
          setIsCreateMode(true);
        }}
      />
    );
  }

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">Notifications Management</h3>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Manage customer engagement across all channels.</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setIsCreateMode(true)}
            className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[var(--primary)] text-white rounded-lg text-xs font-bold hover:bg-[var(--primary)]/90 active:scale-95 transition-all shadow-md shrink-0"
          >
            <Megaphone size={14} />
            Create Notification
          </button>
          <button 
            onClick={() => setIsTemplateMode(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 text-[var(--primary)] border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all shrink-0 shadow-sm"
          >
            <LayoutTemplate size={14} />
            Templates
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 text-[var(--primary)] border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all shrink-0 shadow-sm">
            <Users size={14} />
            Audience Builder
          </button>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 select-none">
        {[
          { label: 'Sent Today', val: '12.4k', trend: '+8%', tColor: 'text-emerald-600 dark:text-emerald-400', fillW: '65%', fillC: 'bg-[var(--primary)]' },
          { label: 'Open Rate', val: '24.2%', trend: '+5%', tColor: 'text-emerald-600 dark:text-emerald-400', fillW: '45%', fillC: 'bg-[var(--primary)]' },
          { label: 'CTR', val: '4.8%', trend: '-1.2%', tColor: 'text-red-600 dark:text-red-400', fillW: '20%', fillC: 'bg-red-505' },
          { label: 'Revenue', val: '$42.5k', trend: '+12%', tColor: 'text-emerald-600 dark:text-emerald-400', fillW: '80%', fillC: 'bg-emerald-500' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">{kpi.label}</span>
              <h4 className="text-lg font-black text-black dark:text-white">{kpi.val}</h4>
              <span className={`text-[10px] font-semibold ${kpi.tColor} mt-0.5`}>{kpi.trend}</span>
            </div>
            <div className="w-12 h-1.5 bg-zinc-150 dark:bg-zinc-800 rounded-full overflow-hidden shrink-0">
              <div className={`${kpi.fillC} h-full rounded-full`} style={{ width: kpi.fillW }}></div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Charts Section (Delivery Trend) */}
        <section className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">Delivery Trend (7d)</h3>
            <MoreVertical size={14} className="text-black/50 dark:text-white/50 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
          </div>
          <div className="h-32 flex items-end justify-between gap-1.5 px-2">
            {[40, 60, 55, 85, 70, 95, 80].map((h, i) => (
              <div key={i} className="w-full bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-t-sm relative group h-full flex items-end overflow-hidden">
                <div className="w-full bg-[var(--primary)] rounded-t-sm transition-all duration-700 ease-out" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1 text-[9px] font-bold text-black/40 dark:text-white/40 tracking-wider">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </div>
        </section>

        {/* Channel Performance */}
        <section className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
          <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-4">Channel Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Push', val: '5.2k', fill: '45%', icon: Bell, color: 'bg-[var(--primary)]' },
              { label: 'Email', val: '4.8k', fill: '40%', icon: Mail, color: 'bg-blue-500' },
              { label: 'SMS', val: '1.2k', fill: '15%', icon: MessageSquare, color: 'bg-red-500' },
              { label: 'WhatsApp', val: '1.2k', fill: '15%', icon: MessageCircle, color: 'bg-emerald-500' }
            ].map((chan, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-black/70 dark:text-white/70">
                    <chan.icon size={12} className="text-black/40 dark:text-white/40" /> {chan.label}
                  </span>
                  <span className="font-bold text-black dark:text-white">{chan.val}</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                  <div className={`${chan.color} h-full transition-all duration-1000 ease-out`} style={{ width: chan.fill }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Filter Bar */}
      <section className="flex gap-3 items-center bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <input 
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 font-semibold" 
            placeholder="Search notifications..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={14} className="absolute left-2.5 top-2.5 text-black/50 dark:text-white/50" />
        </div>
        <button className="p-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black/50 dark:text-white/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm active:scale-95">
          <Filter size={14} />
        </button>
      </section>

      {/* Recent Notifications List */}
      <section className="space-y-3 pb-6">
        <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider px-1">Recent Notifications</h3>
        <NotificationList searchTerm={searchTerm} onSelect={setSelectedNotification} />
      </section>
    </div>
  );
}
