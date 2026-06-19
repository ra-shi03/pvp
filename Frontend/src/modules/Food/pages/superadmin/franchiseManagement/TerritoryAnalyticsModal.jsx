import React, { useState } from "react";
import { X, Calendar, BarChart3, TrendingUp, PieChart, MapPin, Compass, AlertCircle, ShoppingBag } from "lucide-react";

export default function TerritoryAnalyticsModal({ isOpen, onClose, territory }) {
  if (!isOpen || !territory) return null;

  const [timeRange, setTimeRange] = useState("7days"); // "today" | "7days" | "30days"
  const [activeSubTab, setActiveSubTab] = useState("sales"); // "sales" | "sla" | "heatmap"

  // Mock datasets for trends (based on 7days or 30days)
  const salesData7d = [
    { day: "Mon", orders: 28, revenue: 11200 },
    { day: "Tue", orders: 32, revenue: 13500 },
    { day: "Wed", orders: 25, revenue: 10400 },
    { day: "Thu", orders: 35, revenue: 15100 },
    { day: "Fri", orders: 48, revenue: 21000 },
    { day: "Sat", orders: 60, revenue: 26500 },
    { day: "Sun", orders: 55, revenue: 24000 }
  ];

  const storePerformance = [
    { code: "ST-MUM-01", name: "Bandra Carter Road Pizza Hub", orders: 210, revenue: 95000, sla: "98.2%" },
    { code: "ST-MUM-02", name: "Bandra Pali Hill Express", orders: 145, revenue: 64000, sla: "94.5%" },
    { code: "ST-MUM-03", name: "Bandra Linking Road Diner", orders: 85, revenue: 38000, sla: "92.0%" }
  ];

  const heatMapData = (territory.postalCodes || []).map((code, idx) => {
    const densities = ["High Density", "Medium Density", "Low Density"];
    const percentages = [55, 30, 15];
    const ordersVal = [120, 65, 32];
    return {
      code,
      density: densities[idx % 3],
      share: `${percentages[idx % 3]}%`,
      orders: ordersVal[idx % 3],
      revenue: ordersVal[idx % 3] * 420
    };
  });

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[70] flex items-center justify-center p-3 sm:p-4 lg:pl-[280px] select-none text-xs font-semibold">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 flex flex-col max-h-[85vh] animate-scaleUp">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-[var(--primary)]" size={16} />
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-zinc-100">
                Territory Analytics
              </h3>
              <span className="text-[9px] font-bold text-zinc-500">{territory.name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-black dark:hover:text-zinc-200 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Top Control Bar Filters */}
        <div className="px-5 py-3 border-b border-zinc-150 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 flex flex-wrap justify-between items-center gap-3">
          {/* Sub-tabs selector */}
          <div className="flex bg-zinc-200/50 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setActiveSubTab("sales")}
              className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === "sales"
                  ? "bg-white dark:bg-zinc-850 text-black dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-black dark:hover:text-zinc-350"
              }`}
            >
              Sales Trend
            </button>
            <button
              onClick={() => setActiveSubTab("sla")}
              className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === "sla"
                  ? "bg-white dark:bg-zinc-850 text-black dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-black dark:hover:text-zinc-350"
              }`}
            >
              Store & SLA
            </button>
            <button
              onClick={() => setActiveSubTab("heatmap")}
              className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === "heatmap"
                  ? "bg-white dark:bg-zinc-850 text-black dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-black dark:hover:text-zinc-350"
              }`}
            >
              PIN Heatmap
            </button>
          </div>

          {/* Time range selector */}
          <div className="flex gap-1 items-center">
            <Calendar size={13} className="text-zinc-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-1.5 bg-white dark:bg-zinc-905 border border-zinc-200 dark:border-zinc-800 rounded text-[10px] font-bold text-black dark:text-zinc-200 outline-none"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Modal Body Scroll area */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin space-y-4">
          {/* TAB 1: Sales Trend Charts */}
          {activeSubTab === "sales" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-850">
                  <span className="text-[9px] font-bold text-zinc-500 block">Peak Sales Day</span>
                  <span className="text-sm font-black text-black dark:text-zinc-100">Saturday</span>
                  <p className="text-[8px] text-zinc-400 mt-1 font-semibold">Weekend rush aggregates +30% orders</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-850">
                  <span className="text-[9px] font-bold text-zinc-500 block">Avg Order Value</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">₹445.00</span>
                  <p className="text-[8px] text-zinc-400 mt-1 font-semibold">Premium pricing index stable</p>
                </div>
              </div>

              {/* Order volume SVG Line chart */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Order Volume Trend
                  </h4>
                  <span className="text-[8px] bg-red-50 text-red-600 dark:bg-red-950/20 px-1 py-0.5 rounded font-black">
                    VIBRANT SALES
                  </span>
                </div>
                <div className="h-44 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 400 150">
                    {/* SVG Line Graph */}
                    <path
                      d="M 20,130 L 70,110 L 120,120 L 170,95 L 220,70 L 270,40 L 320,55"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Grid guidelines */}
                    <line x1="20" y1="130" x2="380" y2="130" stroke="#cccccc33" strokeWidth="0.5" />
                    <line x1="20" y1="90" x2="380" y2="90" stroke="#cccccc33" strokeWidth="0.5" />
                    <line x1="20" y1="50" x2="380" y2="50" stroke="#cccccc33" strokeWidth="0.5" />

                    {/* Nodes */}
                    <circle cx="20" cy="130" r="3" fill="var(--primary)" />
                    <circle cx="70" cy="110" r="3" fill="var(--primary)" />
                    <circle cx="120" cy="120" r="3" fill="var(--primary)" />
                    <circle cx="170" cy="95" r="3" fill="var(--primary)" />
                    <circle cx="220" cy="70" r="3" fill="var(--primary)" />
                    <circle cx="270" cy="40" r="3" fill="var(--primary)" />
                    <circle cx="320" cy="55" r="3" fill="var(--primary)" />

                    {/* Values */}
                    <text x="20" y="145" fill="#888" fontSize="8" textAnchor="middle">Mon</text>
                    <text x="70" y="145" fill="#888" fontSize="8" textAnchor="middle">Tue</text>
                    <text x="120" y="145" fill="#888" fontSize="8" textAnchor="middle">Wed</text>
                    <text x="170" y="145" fill="#888" fontSize="8" textAnchor="middle">Thu</text>
                    <text x="220" y="145" fill="#888" fontSize="8" textAnchor="middle">Fri</text>
                    <text x="270" y="145" fill="#888" fontSize="8" textAnchor="middle">Sat</text>
                    <text x="320" y="145" fill="#888" fontSize="8" textAnchor="middle">Sun</text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Store & SLA Compliance */}
          {activeSubTab === "sla" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center select-none">
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-150 dark:border-zinc-850">
                  <span className="text-[8px] font-bold text-zinc-500 block">Avg Prepare Time</span>
                  <span className="text-xs font-black text-black dark:text-zinc-100">12 Mins</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-150 dark:border-zinc-850">
                  <span className="text-[8px] font-bold text-zinc-500 block">Avg Delivery Time</span>
                  <span className="text-xs font-black text-black dark:text-zinc-100">22 Mins</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-150 dark:border-zinc-850">
                  <span className="text-[8px] font-bold text-zinc-500 block">SLA Compliance</span>
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400">96.5%</span>
                </div>
              </div>

              {/* Store Performance Rankings */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl p-4 space-y-3">
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Store Performance under Territory
                </h4>
                <div className="space-y-2">
                  {storePerformance.map((store) => (
                    <div
                      key={store.code}
                      className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-905 border border-zinc-150 dark:border-zinc-850 rounded-lg"
                    >
                      <div>
                        <p className="text-[10px] font-bold text-black dark:text-zinc-100">{store.name}</p>
                        <p className="text-[8px] font-bold text-zinc-500">{store.code} • SLA: {store.sla}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-black dark:text-zinc-200">{store.orders} Orders</p>
                        <p className="text-[8px] font-bold text-emerald-600">₹{store.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Pincode Geospatial Heatmap */}
          {activeSubTab === "heatmap" && (
            <div className="space-y-4">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl flex gap-2 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-850">
                <Compass className="text-[var(--primary)] shrink-0" size={16} />
                <p className="text-[9px] font-semibold">
                  Geospatial Heatmaps index order frequencies and ticket values across postal code boundaries to optimize kitchen dispatch schedules.
                </p>
              </div>

              {/* Heatmap table list */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl overflow-hidden">
                <table className="w-full text-left text-[10px] font-bold">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-905 border-b border-zinc-150 dark:border-zinc-850 select-none text-[8px] text-zinc-500 uppercase tracking-wider">
                      <th className="p-2.5">Postal Code</th>
                      <th className="p-2.5 text-center">Orders</th>
                      <th className="p-2.5 text-right">Revenue</th>
                      <th className="p-2.5 text-center">Density</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-850 text-black dark:text-zinc-200">
                    {heatMapData.map((item) => (
                      <tr key={item.code} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-905/30">
                        <td className="p-2.5 flex items-center gap-1">
                          <MapPin size={11} className="text-zinc-400" />
                          <span>{item.code}</span>
                        </td>
                        <td className="p-2.5 text-center font-black">{item.orders}</td>
                        <td className="p-2.5 text-right text-emerald-600 font-black">₹{item.revenue.toLocaleString()}</td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                              item.density === "High Density"
                                ? "bg-red-50 text-red-600 dark:bg-red-950/20"
                                : item.density === "Medium Density"
                                ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20"
                                : "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                            }`}
                          >
                            {item.density}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-end select-none">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-350 transition-colors cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
