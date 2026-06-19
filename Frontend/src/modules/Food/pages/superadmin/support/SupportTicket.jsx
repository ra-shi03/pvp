import React, { useState } from 'react';
import { Plus, Ticket, Hourglass, CheckCircle2, BadgeCheck, AlertTriangle, Clock, TrendingUp, PackageSearch } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TicketQueue from './TicketQueue';
import TicketDetails from './TicketDetails';
import AssignTicket from './AssignTicket';
import EscalateTicket from './EscalateTicket';
import UpdateTicket from './UpdateTicket';

const trendData = [
  { name: 'Mon', tickets: 120 },
  { name: 'Tue', tickets: 180 },
  { name: 'Wed', tickets: 150 },
  { name: 'Thu', tickets: 280 },
  { name: 'Fri', tickets: 200 },
  { name: 'Sat', tickets: 90 },
  { name: 'Sun', tickets: 70 },
];

const SupportTicket = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <>
      <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4 animate-in fade-in duration-500">
      {/* Hero Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div className="space-y-0.5">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Support Tickets</h2>
          <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">Manage customer, franchise, rider, and internal support requests.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-full md:w-auto gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-white rounded text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Create Ticket
          </button>
        </div>
      </section>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-3">
        {/* Card: Open */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Open Tickets</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-zinc-900 dark:text-zinc-50">1,284</span>
                <span className="text-[8px] font-bold text-red-650 bg-red-50 dark:bg-red-950/20 px-1 rounded">+12%</span>
              </div>
            </div>
            <div className="w-16 bg-zinc-150 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-[var(--primary)] h-full w-3/4 rounded-full"></div>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] shrink-0">
            <Ticket className="w-4 h-4" />
          </div>
        </div>

        {/* Card: Pending */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Pending</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-zinc-900 dark:text-zinc-50">456</span>
                <span className="text-[8px] font-bold text-orange-655 bg-orange-50 dark:bg-orange-950/20 px-1 rounded">-4%</span>
              </div>
            </div>
            <div className="w-16 h-4 flex items-end">
              <svg className="w-full h-full text-orange-500 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 10 5, 20 12 T 40 8 T 60 15 T 80 5 T 100 10" strokeLinecap="round"></path>
              </svg>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 shrink-0">
            <Hourglass className="w-4 h-4" />
          </div>
        </div>

        {/* Card: Resolved Today */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Resolved</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-zinc-900 dark:text-zinc-50">182</span>
                <span className="text-[8px] font-bold text-emerald-650 bg-emerald-50 dark:bg-emerald-950/20 px-1 rounded">+24%</span>
              </div>
            </div>
            <div className="w-16 h-4 flex items-end">
              <svg className="w-full h-full text-emerald-555 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 18 L 10 14 L 20 16 L 30 10 L 40 12 L 50 6 L 60 8 L 70 2 L 80 5 L 100 0" strokeLinecap="round"></path>
              </svg>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Card: SLA Compliance */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">SLA Comp.</p>
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 mt-0.5">98.2%</h2>
            </div>
            <span className="text-[8px] font-bold text-blue-600 dark:text-blue-400">Target: 95%</span>
          </div>
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
            <BadgeCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Card: High Priority */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">High Priority</p>
              <h2 className="text-lg font-black text-red-650 dark:text-red-450 mt-0.5">42</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-10 h-1 bg-zinc-150 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-red-500"></div>
              </div>
              <span className="text-[8px] font-bold text-zinc-500 dark:text-zinc-450">33%</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        {/* Card: Avg Res Time */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Avg Res Time</p>
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 mt-0.5">2h 14m</h2>
            </div>
            <span className="text-[8px] font-semibold text-zinc-400 dark:text-zinc-500 italic">-15m today</span>
          </div>
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Card: Escalated */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Escalated</p>
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 mt-0.5">12</h2>
            </div>
            <span className="text-[8px] font-bold text-red-500 uppercase tracking-tight">Workload</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Card: Closed */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:shadow-md transition-shadow h-[85px]">
          <div className="flex flex-col justify-between h-full py-0.5">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Closed</p>
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 mt-0.5">8,421</h2>
            </div>
            <div className="flex -space-x-1.5">
              <div className="w-4.5 h-4.5 rounded-full border border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-700"></div>
              <div className="w-4.5 h-4.5 rounded-full border border-white dark:border-zinc-900 bg-zinc-300 dark:bg-zinc-600"></div>
              <div className="w-4.5 h-4.5 rounded-full border border-white dark:border-zinc-900 bg-zinc-400 dark:bg-zinc-500 flex items-center justify-center text-[7px] text-white font-bold bg-zinc-550">+5</div>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350 shrink-0">
            <PackageSearch className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket Trend Line Chart */}
        <div className="lg:col-span-2 p-3.5 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 min-h-[260px] flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Ticket Volume Trend</h3>
            <select className="text-[10px] font-bold border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-750 dark:text-zinc-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="flex-grow w-full h-[180px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary, #005ab4)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary, #005ab4)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e2eb" className="dark:stroke-zinc-750" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} tickMargin={5} className="text-zinc-500 dark:text-zinc-400" />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} className="text-zinc-500 dark:text-zinc-400" />
                <Tooltip 
                  contentStyle={{ borderRadius: '6px', border: '1px solid #e0e2eb', fontSize: '10px', boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)', backgroundColor: 'var(--surface-container-lowest, #fff)' }}
                  itemStyle={{ color: 'var(--primary, #005ab4)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="tickets" stroke="var(--primary, #005ab4)" strokeWidth={2} fillOpacity={1} fill="url(#colorTickets)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Tickets by Category</h3>
          <div className="flex-grow flex items-center justify-center relative my-2">
            {/* Doughnut Chart Simulation */}
            <div className="relative w-28 h-28 rounded-full border-[14px] border-zinc-50 dark:border-zinc-800 flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 rounded-full border-[14px] border-[var(--primary)] hover:opacity-90 transition-opacity cursor-pointer" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-[14px] border-blue-400 hover:opacity-90 transition-opacity cursor-pointer" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
              <div className="absolute inset-0 rounded-full border-[14px] border-orange-400 hover:opacity-90 transition-opacity cursor-pointer" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 75%)' }}></div>
              <div className="flex flex-col items-center mt-[-14px] ml-[-14px]">
                <span className="text-base font-black text-zinc-900 dark:text-zinc-50">1.2k</span>
                <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Total</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 mt-1">
            <div className="flex justify-between items-center text-[10px] font-semibold p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded transition-colors cursor-pointer">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-sm"></div>
                <span className="text-zinc-650 dark:text-zinc-350">Customer Support</span>
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">45%</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded transition-colors cursor-pointer">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-450 shadow-sm"></div>
                <span className="text-zinc-650 dark:text-zinc-350">Franchise Queries</span>
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">30%</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded transition-colors cursor-pointer">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-450 shadow-sm"></div>
                <span className="text-zinc-650 dark:text-zinc-350">Rider Relations</span>
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">15%</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-semibold p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded transition-colors cursor-pointer">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 shadow-sm"></div>
                <span className="text-zinc-650 dark:text-zinc-350">Internal IT</span>
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">10%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rendering based on state */}
      {selectedTicketId ? (
          <TicketDetails 
            ticketId={selectedTicketId} 
            onBack={() => setSelectedTicketId(null)} 
            onAssignClick={() => setIsAssignModalOpen(true)} 
            onEscalateClick={() => setIsEscalateModalOpen(true)} 
            onStatusClick={() => setIsUpdateModalOpen(true)}
          />
      ) : (
          <TicketQueue onTicketSelect={setSelectedTicketId} onAssignClick={() => setIsAssignModalOpen(true)} />
      )}

      </div>

      {/* Assign Modal */}
      <AssignTicket isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} />
      
      {/* Escalate Modal */}
      <EscalateTicket isOpen={isEscalateModalOpen} onClose={() => setIsEscalateModalOpen(false)} ticketId={selectedTicketId} />

      {/* Update Status Modal */}
      <UpdateTicket isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} ticketId={selectedTicketId} />
    </>
  );
};

export default SupportTicket;
