import React, { useState } from 'react';
import { 
  ChevronDown, Calendar, Plus, TrendingUp, Sparkles, AlertTriangle, 
  FileText, Map, Wallet, MoreVertical, X 
} from 'lucide-react';

export default function RevenueForecasting() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      
      {/* Sticky Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-12 z-30">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select className="w-full sm:w-auto pl-3 pr-8 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-bold appearance-none focus:ring-[var(--primary)] focus:ring-1 focus:border-[var(--primary)] outline-none text-black dark:text-white">
              <option>All Regions</option>
              <option>North Region</option>
              <option>South Zone</option>
              <option>East Sector</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50 pointer-events-none" size={12} />
          </div>
          <div className="relative flex-1 sm:flex-none">
            <button className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white">
              <Calendar size={12} className="text-black/50 dark:text-white/50" />
              Q4 2023 - Q1 2024
            </button>
          </div>
        </div>
        <div className="flex w-full sm:w-auto shrink-0">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg font-bold text-xs hover:brightness-110 transition-all shadow-md active:scale-[0.98]">
            <Plus size={14} />
            Schedule New Report
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4">
        
        {/* Projected Revenue Chart (Major Slot) */}
        <div className="col-span-12 xl:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div>
              <h3 className="text-xs font-bold text-black dark:text-white">Revenue Forecast</h3>
              <p className="text-[10px] font-semibold text-black/50 dark:text-white/50 mt-0.5">Projected growth trend for the next fiscal quarter</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] font-bold border border-emerald-200 dark:border-emerald-800/50">
                <TrendingUp size={10} />
                +12.4% Predicted
              </span>
            </div>
          </div>
          
          {/* SVG Chart Mock */}
          <div className="h-36 w-full relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              {/* Grid Lines */}
              <line stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50" className="text-zinc-100 dark:text-zinc-800"></line>
              <line stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150" className="text-zinc-100 dark:text-zinc-800"></line>
              <line stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="250" y2="250" className="text-zinc-100 dark:text-zinc-800"></line>
              
              {/* Historical Data Line */}
              <path d="M 0 250 L 100 230 L 200 240 L 300 180 L 400 190 L 500 140 L 600 160" fill="none" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
              
              {/* Prediction Area (Dashed) */}
              <path d="M 600 160 L 700 120 L 800 135 L 900 80 L 1000 60" fill="none" stroke="var(--primary)" strokeDasharray="8 6" strokeLinecap="round" strokeWidth="4"></path>
              
              {/* Gradient Fill */}
              <linearGradient id="chart-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"></stop>
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"></stop>
              </linearGradient>
              <path d="M 0 250 L 100 230 L 200 240 L 300 180 L 400 190 L 500 140 L 600 160 L 700 120 L 800 135 L 900 80 L 1000 60 L 1000 300 L 0 300 Z" fill="url(#chart-grad)"></path>
              
              {/* Highlight Dot */}
              <circle cx="600" cy="160" fill="var(--primary)" r="6" stroke="#fff" strokeWidth="2" className="dark:stroke-zinc-900"></circle>
            </svg>
            
            {/* Chart Labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-1.5 text-[9px] text-black/50 dark:text-white/50 font-bold uppercase tracking-wider">
              <span>OCT</span><span>NOV</span><span>DEC</span><span className="text-[var(--primary)] font-black">JAN (NOW)</span><span>FEB</span><span>MAR</span><span>APR</span>
            </div>
          </div>
          
          {/* AI Insights Floating Banner */}
          <div className="mt-4 flex items-start gap-2 p-2.5 bg-zinc-50 dark:bg-[var(--primary)]/5 rounded-xl border border-[var(--primary)]/20">
            <Sparkles className="text-[var(--primary)] shrink-0 mt-0.5" size={14} />
            <p className="text-xs text-black/75 dark:text-white/75 font-semibold">
              <span className="font-bold text-[var(--primary)]">Forecast:</span> Annual target on track for 105% achievement based on current trajectory.
            </p>
          </div>
        </div>

        {/* AI Insights Cards (Right Rail) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-4">
          
          {/* Insight 1: Growth */}
          <div 
            className="relative bg-white dark:bg-zinc-900 rounded-xl p-3.5 shadow-sm border-2 border-transparent bg-clip-padding cursor-pointer overflow-hidden transition-transform hover:-translate-y-0.5"
            style={{ backgroundImage: 'linear-gradient(white, white), linear-gradient(to bottom right, var(--primary), #bf3003)', backgroundOrigin: 'border-box' }}
            onClick={toggleDrawer}
          >
            {/* Dark mode overlay fix for gradient border hack */}
            <div className="absolute inset-0 bg-white dark:bg-zinc-900 m-[1.5px] rounded-[10px] z-0"></div>
            <div className="relative z-10 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <TrendingUp className="text-[var(--primary)]" size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-black dark:text-white mb-0.5">Highest Growth Potential</h4>
                <p className="text-[11px] font-semibold text-black/70 dark:text-white/70">
                  North Region is predicted to see a <span className="text-[var(--primary)] font-bold">+15%</span> increase next month due to local seasonal events.
                </p>
              </div>
            </div>
          </div>

          {/* Insight 2: Risk */}
          <div className="bg-white dark:bg-zinc-900 border-l-2 border-l-rose-500 rounded-xl p-3.5 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-rose-600 dark:text-rose-400" size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-600 dark:text-rose-500 mb-0.5">Risk Alert: Margins</h4>
                <p className="text-[11px] font-semibold text-black/70 dark:text-white/70">
                  Delivery costs in <span className="font-bold text-black dark:text-white">South Zone</span> are rising 8% faster than revenue. Significant margin impact predicted for Q1.
                </p>
              </div>
            </div>
          </div>

          {/* Metric Quick Card */}
          <div className="bg-zinc-900 dark:bg-zinc-950 text-white rounded-xl p-3.5 shadow-lg relative overflow-hidden flex-1 flex flex-col justify-center">
            <p className="text-[9px] font-bold text-[var(--primary)] uppercase tracking-wider mb-1">AI Prediction Confidence</p>
            <div className="flex items-end gap-1.5 mb-3">
              <h2 className="text-xl font-black leading-none">94.2%</h2>
              <span className="text-[10px] font-bold text-zinc-400 mb-0.5">High Accuracy</span>
            </div>
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
              <div className="bg-[var(--primary)] w-[94%] h-full rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Automated Reports Section (Bottom Slot) */}
        <div className="col-span-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
            <div>
              <h3 className="text-xs font-bold text-black dark:text-white">Scheduled Reports</h3>
              <p className="text-[10px] font-semibold text-black/50 dark:text-white/50">Automated distribution list and upcoming triggers</p>
            </div>
            <button className="text-[10px] font-bold text-[var(--primary)] hover:underline">Manage All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Report Name</th>
                  <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Frequency</th>
                  <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Recipients</th>
                  <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Last Run</th>
                  <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Status</th>
                  <th className="px-3 py-2 text-[9px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="text-black/50 dark:text-white/50" size={14} />
                      <span className="font-bold text-xs text-black dark:text-white">Weekly CEO Summary</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70 dark:text-white/70">Every Monday at 8 AM</td>
                  <td className="px-3 py-2 text-xs font-semibold text-black/70 dark:text-white/70">Executive Team (4)</td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70 dark:text-white/70">Oct 23, 2023</td>
                  <td className="px-3 py-2">
                    <span className="px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-md text-[9px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/50">Active</span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button className="text-black/50 dark:text-white/50 hover:text-[var(--primary)] transition-colors p-0.5">
                      <MoreVertical size={12} />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Map className="text-black/50 dark:text-white/50" size={14} />
                      <span className="font-bold text-xs text-black dark:text-white">Regional Growth Forecast</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70 dark:text-white/70">Monthly - 1st Day</td>
                  <td className="px-3 py-2 text-xs font-semibold text-black/70 dark:text-white/70">Regional Managers (12)</td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70 dark:text-white/70">Oct 01, 2023</td>
                  <td className="px-3 py-2">
                    <span className="px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-md text-[9px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/50">Active</span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button className="text-black/50 dark:text-white/50 hover:text-[var(--primary)] transition-colors p-0.5">
                      <MoreVertical size={12} />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="text-black/50 dark:text-white/50" size={14} />
                      <span className="font-bold text-xs text-black dark:text-white">Margin Health Audit</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70 dark:text-white/70">Quarterly</td>
                  <td className="px-3 py-2 text-xs font-semibold text-black/70 dark:text-white/70">Finance Dept.</td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70 dark:text-white/70">Sept 30, 2023</td>
                  <td className="px-3 py-2">
                    <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-black/50 dark:text-white/50 rounded-md text-[9px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700">Paused</span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button className="text-black/50 dark:text-white/50 hover:text-[var(--primary)] transition-colors p-0.5">
                      <MoreVertical size={12} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Side Drawer (Details Overlay) */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-[360px] bg-white dark:bg-zinc-950 shadow-2xl z-[100] transform transition-transform duration-300 overflow-hidden border-l border-zinc-200 dark:border-zinc-800 rounded-l-2xl ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-3.5 flex flex-col h-full bg-white dark:bg-zinc-950">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-black dark:text-white">Insight Deep Dive</h2>
            <button 
              className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black/50 dark:text-white/50 transition-colors"
              onClick={toggleDrawer}
            >
              <X size={14} />
            </button>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1.5">
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <p className="text-[9px] font-bold text-[var(--primary)] mb-1.5 uppercase tracking-widest">Analytics Engine v3</p>
              <h3 className="text-xs font-bold text-black dark:text-white mb-2.5">North Region Expansion Factors</h3>
              <p className="text-xs font-semibold text-black/70 dark:text-white/70 leading-relaxed">
                The predicted 15% growth is primarily driven by three uncorrelated data points: historical seasonal peaks in the tech sector cluster, an 8% increase in pre-bookings for the upcoming trade expo, and a recent competitor store closure within a 5-mile radius.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-lg bg-white dark:bg-zinc-900">
                <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider mb-1.5">Confidence Interval</p>
                <p className="text-sm font-black text-black dark:text-white">±2.4%</p>
              </div>
              <div className="border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-lg bg-white dark:bg-zinc-900">
                <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider mb-1.5">Data Freshness</p>
                <p className="text-sm font-black text-black dark:text-white">12m ago</p>
              </div>
            </div>
            
            <div className="h-28 w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-black/45 dark:text-white/45 text-xs font-bold italic">Interactive data heatmap loading...</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity"
          onClick={toggleDrawer}
        ></div>
      )}

    </div>
  );
}
