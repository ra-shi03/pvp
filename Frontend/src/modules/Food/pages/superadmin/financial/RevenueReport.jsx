import React, { useState, useEffect } from 'react';
import { Calendar, Map, Store, Download, Plus, Search, TrendingUp, DollarSign } from 'lucide-react';
import RevenueData from './RevenueData';
import RevenueReportDetails from './RevenueReportDetails';
import RevenueForecasting from './RevenueForecasting';
import RevenueAuditing from './RevenueAuditing';

export default function RevenueReport() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(252); // 4m 12s in seconds
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'forecasting' | 'auditing'

  // Auto-Refresh Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        setCurrentTime(new Date());
        return 300; // Reset to 5m
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins}m ${secs}s`;
  };

  if (showDetails) {
    return <RevenueReportDetails onBack={() => setShowDetails(false)} />;
  }

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto w-full space-y-4 min-h-screen bg-zinc-50 dark:bg-zinc-950 animate-fade-in relative">
      
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-black dark:text-white">
            Revenue Reports
          </h2>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Executive Financial Intelligence</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800/50 p-0.5 rounded-lg w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-zinc-900 text-[var(--primary)] shadow-sm' : 'text-black/50 dark:text-white/50 hover:text-[var(--primary)]'}`}
          >
            Historical
          </button>
          <button 
            onClick={() => setActiveTab('forecasting')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'forecasting' ? 'bg-white dark:bg-zinc-900 text-[var(--primary)] shadow-sm' : 'text-black/50 dark:text-white/50 hover:text-[var(--primary)]'}`}
          >
            Forecasting
          </button>
          <button 
            onClick={() => setActiveTab('auditing')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'auditing' ? 'bg-white dark:bg-zinc-900 text-[var(--primary)] shadow-sm' : 'text-black/50 dark:text-white/50 hover:text-[var(--primary)]'}`}
          >
            Auditing
          </button>
        </div>
      </header>

      {activeTab === 'forecasting' ? (
        <RevenueForecasting />
      ) : activeTab === 'auditing' ? (
        <RevenueAuditing />
      ) : (
        <>
          {/* Sticky Filter Bar */}
          <section className="sticky top-12 z-30 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex flex-wrap gap-2 items-center justify-between shadow-sm">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 cursor-pointer hover:border-[var(--primary)] transition-all">
                <Calendar size={12} className="text-black/50 dark:text-white/50" />
                <span className="text-xs font-bold text-black/75 dark:text-white/75">Last 30 Days</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 cursor-pointer hover:border-[var(--primary)] transition-all">
                <Map size={12} className="text-black/50 dark:text-white/50" />
                <span className="text-xs font-bold text-black/75 dark:text-white/75">All Regions</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 cursor-pointer hover:border-[var(--primary)] transition-all">
                <Store size={12} className="text-black/50 dark:text-white/50" />
                <span className="text-xs font-bold text-black/75 dark:text-white/75">All Stores</span>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none items-center justify-center flex gap-1.5 px-2.5 py-1 text-black/70 dark:text-white/70 hover:text-[var(--primary)] transition-colors font-bold text-xs bg-zinc-100 dark:bg-zinc-800 sm:bg-transparent rounded-lg">
                <Download size={12} />
                Export CSV
              </button>
              <button 
                onClick={() => setShowDetails(true)}
                className="flex-1 sm:flex-none bg-[var(--primary)] text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-sm hover:brightness-110 active:scale-95 transition-all"
              >
                Detailed Analysis
              </button>
            </div>
          </section>

          {/* KPI Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* KPI 1: Gross Revenue */}
            <div className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-[var(--primary)]/30 transition-all group flex items-center justify-between">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Gross Revenue</span>
                <span className="text-lg font-black text-black dark:text-white">₹2.45Cr</span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1 py-0.2 rounded w-fit">+12.4%</span>
              </div>
              <div className="h-6 w-16 overflow-hidden flex items-end shrink-0">
                <svg className="w-full h-full stroke-emerald-500 fill-emerald-500/10 stroke-[1.5]" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0 25 L10 22 L20 28 L30 15 L40 18 L50 10 L60 14 L70 5 L80 12 L90 8 L100 2 V30 H0 Z" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </div>
            </div>

            {/* KPI 2: Net Revenue */}
            <div className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-[var(--primary)]/30 transition-all group flex items-center justify-between">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Net Revenue</span>
                <span className="text-lg font-black text-black dark:text-white">₹2.08Cr</span>
                <span className="text-[9px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-1 py-0.2 rounded w-fit">+8.5%</span>
              </div>
              <div className="h-6 w-16 overflow-hidden flex items-end shrink-0">
                <svg className="w-full h-full stroke-[var(--primary)] fill-[var(--primary)]/10 stroke-[1.5]" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0 20 L20 22 L40 15 L60 18 L80 10 L100 5 V30 H0 Z" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </div>
            </div>

            {/* KPI 3: Franchise Fee */}
            <div className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-[var(--primary)]/30 transition-all group flex items-center justify-between">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Franchise Fee</span>
                <span className="text-lg font-black text-black dark:text-white">₹1.82Cr</span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1 py-0.2 rounded w-fit">+15.2%</span>
              </div>
              <div className="h-1 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full shrink-0 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[var(--primary)] w-[75%] rounded-full"></div>
              </div>
            </div>

            {/* KPI 4: Commission */}
            <div className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-[var(--primary)]/30 transition-all group flex items-center justify-between">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Commission</span>
                <span className="text-lg font-black text-black dark:text-white">₹26.4L</span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1 py-0.2 rounded w-fit">+4.2%</span>
              </div>
              <div className="h-1 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full shrink-0 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-zinc-400 dark:bg-zinc-500 w-[40%] rounded-full"></div>
              </div>
            </div>

            {/* KPI 5: Refunds */}
            <div className="bg-white dark:bg-zinc-900 p-3 border border-rose-200 dark:border-rose-900/30 rounded-xl shadow-sm hover:border-rose-505 transition-all group flex items-center justify-between">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Refunds</span>
                <span className="text-lg font-black text-black dark:text-white">₹5.25L</span>
                <span className="text-[9px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-1 py-0.2 rounded w-fit">-2.1%</span>
              </div>
              <div className="h-6 w-16 overflow-hidden flex items-end shrink-0">
                <svg className="w-full h-full stroke-rose-500 fill-rose-500/10 stroke-[1.5]" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0 5 L20 12 L40 8 L60 18 L80 15 L100 25 V30 H0 Z" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </div>
            </div>

            {/* KPI 6: Tax */}
            <div className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-[var(--primary)]/30 transition-all group flex items-center justify-between">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-black/70 dark:text-white/70 uppercase tracking-wider">Tax (GST)</span>
                <span className="text-lg font-black text-black dark:text-white">₹21.8L</span>
                <span className="text-[9px] font-bold text-black/50 dark:text-white/50 bg-zinc-100 dark:bg-zinc-800 px-1 py-0.2 rounded w-fit">Neutral</span>
              </div>
              <div className="flex gap-0.5 shrink-0 w-12">
                <div className="w-full h-1 bg-[var(--primary)] rounded-full"></div>
                <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
              </div>
            </div>
          </section>

          {/* Main Charts Row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Revenue Trend Line Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <div>
                  <h3 className="font-bold text-xs text-black dark:text-white">Revenue Trends</h3>
                  <p className="text-[10px] font-semibold text-black/50 dark:text-white/50 mt-0.5">Gross vs Net Revenue performance across 7 weeks</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                    <span className="text-[10px] font-bold text-black/50 dark:text-white/50">Gross</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
                    <span className="text-[10px] font-bold text-black/50 dark:text-white/50">Net</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[180px] w-full relative">
                {/* Simulated Chart Grid */}
                <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-zinc-200 dark:border-zinc-800 pb-4 pl-1.5">
                  <div className="border-t border-zinc-100 dark:border-zinc-800/50 w-full h-0"></div>
                  <div className="border-t border-zinc-100 dark:border-zinc-800/50 w-full h-0"></div>
                  <div className="border-t border-zinc-100 dark:border-zinc-800/50 w-full h-0"></div>
                  <div className="border-t border-zinc-100 dark:border-zinc-800/50 w-full h-0"></div>
                </div>
                
                {/* SVG Chart Lines */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pb-4 pl-1.5" viewBox="0 0 700 300" preserveAspectRatio="none">
                  {/* Net Line */}
                  <polyline fill="none" points="0,200 100,180 200,210 300,140 400,160 500,100 600,120 700,50" stroke="#d4d4d8" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke" className="dark:stroke-zinc-600"></polyline>
                  {/* Gross Line */}
                  <polyline fill="none" points="0,180 100,150 200,170 300,100 400,120 500,60 600,80 700,20" stroke="var(--primary)" strokeLinecap="round" strokeWidth="4" vectorEffect="non-scaling-stroke"></polyline>
                  {/* Points */}
                  <circle cx="300" cy="100" fill="var(--primary)" r="5" stroke="#fff" strokeWidth="2" className="dark:stroke-zinc-900"></circle>
                  <circle cx="500" cy="60" fill="var(--primary)" r="5" stroke="#fff" strokeWidth="2" className="dark:stroke-zinc-900"></circle>
                  <circle cx="700" cy="20" fill="var(--primary)" r="5" stroke="#fff" strokeWidth="2" className="dark:stroke-zinc-900"></circle>
                </svg>
                
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] font-semibold text-black/50 dark:text-white/50 uppercase tracking-wider px-1">
                  <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span>
                </div>
              </div>
            </div>

            {/* Payment Distribution Donut */}
            <div className="bg-white dark:bg-zinc-900 p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-xs text-black dark:text-white mb-3">Payment Methods</h3>
              
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Donut Segments */}
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="var(--primary)" strokeDasharray="42 58" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#71717a" strokeDasharray="28 72" strokeDashoffset="-42" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#d4d4d8" strokeDasharray="15 85" strokeDashoffset="-70" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#3b82f6" strokeDasharray="10 90" strokeDashoffset="-85" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#e4e4e7" strokeDasharray="5 95" strokeDashoffset="-95" strokeWidth="4"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-black text-black dark:text-white">100%</span>
                  <span className="text-[8px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Volume</span>
                </div>
              </div>
              
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0"></div>
                    <span className="font-semibold text-black/70 dark:text-white/70">UPI</span>
                  </div>
                  <span className="font-bold text-black dark:text-white">42%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-500 shrink-0"></div>
                    <span className="font-semibold text-black/70 dark:text-white/70">Credit Card</span>
                  </div>
                  <span className="font-bold text-black dark:text-white">28%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0"></div>
                    <span className="font-semibold text-black/70 dark:text-white/70">Debit Card</span>
                  </div>
                  <span className="font-bold text-black dark:text-white">15%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                    <span className="font-semibold text-black/70 dark:text-white/70">Cash</span>
                  </div>
                  <span className="font-bold text-black dark:text-white">10%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Section: Regions & Top Stores */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {/* Regional Heat Map Style Bar Chart */}
            <div className="bg-white dark:bg-zinc-900 p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-xs text-black dark:text-white">Regional Performance</h3>
                <button className="text-[10px] text-[var(--primary)] font-bold hover:underline">Map View</button>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-black dark:text-white">North Region</span>
                    <span className="text-black/50 dark:text-white/50 font-bold text-[10px]">₹82.4L (Lead)</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-[var(--primary)] w-[85%] rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-black dark:text-white">South Region</span>
                    <span className="text-black/50 dark:text-white/50 font-bold text-[10px]">₹76.1L</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-[var(--primary)] w-[78%] rounded-full opacity-80"></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-black dark:text-white">West Region</span>
                    <span className="text-black/50 dark:text-white/50 font-bold text-[10px]">₹48.9L</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-[var(--primary)] w-[52%] rounded-full opacity-60"></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-black dark:text-white">East Region</span>
                    <span className="text-black/50 dark:text-white/50 font-bold text-[10px]">₹37.6L</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-[var(--primary)] w-[38%] rounded-full opacity-40"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Store Ranking Table (Extracted Component) */}
            <div className="h-full">
              <RevenueData />
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <p className="text-[10px] font-bold text-black/50 dark:text-white/50">
          Generated on {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} • Refreshing in <span className="font-mono text-[var(--primary)] font-bold">{formatTimeLeft()}</span>
        </p>
      </footer>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-10 h-10 bg-[var(--primary)] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 group z-50 transition-all shadow-[var(--primary)]/30">
        <Plus size={14} />
        <span className="absolute right-full mr-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          New Audit Ticket
        </span>
      </button>

    </div>
  );
}
