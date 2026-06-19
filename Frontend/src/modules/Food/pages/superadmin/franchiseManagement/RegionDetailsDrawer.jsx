import React, { useState } from "react";
import { X, Building2, BarChart2, MapPin, ChevronRight, ChevronDown, Award, Store, ShoppingBag } from "lucide-react";

export default function RegionDetailsDrawer({ isOpen, onClose, region, onEdit, onArchiveToggle }) {
  const [activeTab, setActiveTab] = useState("Info");
  const [expandedZones, setExpandedZones] = useState({});

  if (!isOpen || !region) return null;

  // Mock geographic breakdown
  const mockHierarchy = {
    zones: [
      {
        id: "zn-1",
        name: "Pune West Zone",
        territories: [
          { id: "tr-1", name: "Baner Cluster", stores: ["Baner Express Store", "Aundh Pizza Store"] },
          { id: "tr-2", name: "Balewadi High St", stores: ["Balewadi Smart Kitchen"] }
        ]
      },
      {
        id: "zn-2",
        name: "Pune East Zone",
        territories: [
          { id: "tr-3", name: "Koregaon Park Road", stores: ["KP Premium Store", "Kalyani Nagar Outlet"] }
        ]
      }
    ]
  };

  const toggleZone = (zoneId) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zoneId]: !prev[zoneId]
    }));
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-900 shadow-2xl flex flex-col h-full animate-slideIn">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20">
              <Building2 size={15} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-zinc-100">Region Details</h3>
              <p className="text-[10px] font-bold text-black/60 dark:text-zinc-400 mt-0.5">{region.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-black dark:text-zinc-300 hover:text-[var(--primary)] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 border-b border-zinc-150 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex gap-4 shrink-0 select-none">
          {["Info", "Breakdown", "Analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-[11px] font-black uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                  : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {activeTab === "Info" && (
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-black/55 dark:text-zinc-400 uppercase tracking-wider">Basic Information</h4>
                <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/35 border border-zinc-200 dark:border-zinc-900 rounded-xl text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-zinc-500 block uppercase">Region Name</span>
                    <span className="font-bold text-black dark:text-zinc-100">{region.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-zinc-500 block uppercase">Country</span>
                    <span className="font-bold text-black dark:text-zinc-100">{region.country}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
                    <span className="text-[9px] font-bold text-zinc-500 block uppercase">Description</span>
                    <p className="font-semibold text-black/80 dark:text-zinc-300 mt-0.5 leading-relaxed">
                      {region.description || "Geographical regional cluster managing franchise operations."}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
                    <span className="text-[9px] font-bold text-zinc-500 block uppercase">Created Date</span>
                    <span className="font-bold text-black dark:text-zinc-100">{region.createdDate || "2026-01-01"}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
                    <span className="text-[9px] font-bold text-zinc-500 block uppercase">Status</span>
                    <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded ${
                      region.status === "Active"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400"
                    }`}>
                      {region.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Operational Summary */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-black/55 dark:text-zinc-400 uppercase tracking-wider">Operational Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase">Zones</span>
                      <p className="text-sm font-black text-black dark:text-zinc-100 mt-0.5">{region.zonesCount || 3}</p>
                    </div>
                    <Building2 className="text-zinc-400" size={16} />
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase">Franchises</span>
                      <p className="text-sm font-black text-black dark:text-zinc-100 mt-0.5">{region.franchisesCount || 8}</p>
                    </div>
                    <Award className="text-zinc-400" size={16} />
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase">Stores</span>
                      <p className="text-sm font-black text-black dark:text-zinc-100 mt-0.5">{region.storesCount || 24}</p>
                    </div>
                    <Store className="text-zinc-400" size={16} />
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-bold text-zinc-500 uppercase">Revenue</span>
                      <p className="text-sm font-black text-[var(--primary)] mt-0.5">₹{region.revenue ? region.revenue.toLocaleString() : "42.5 L"}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-500">↑ 12%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Breakdown" && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-black/55 dark:text-zinc-400 uppercase tracking-wider">Geographic Breakdown</h4>
              <div className="border border-zinc-200 dark:border-zinc-900 rounded-xl p-3 bg-zinc-50/50 dark:bg-zinc-900/10 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-zinc-100">
                  <MapPin size={14} className="text-[var(--primary)]" />
                  <span>{region.name} Region</span>
                </div>

                <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800 space-y-2">
                  {mockHierarchy.zones.map((zone) => {
                    const isExpanded = expandedZones[zone.id];
                    return (
                      <div key={zone.id} className="space-y-1.5">
                        <button
                          onClick={() => toggleZone(zone.id)}
                          className="flex items-center justify-between w-full text-left p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-lg hover:border-[var(--primary)]/40 transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            <span className="text-xs font-bold text-black dark:text-zinc-200">{zone.name}</span>
                          </div>
                          <span className="text-[8px] font-black bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded">
                            {zone.territories.length} Territories
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="pl-5 space-y-1.5">
                            {zone.territories.map((territory) => (
                              <div key={territory.id} className="p-2 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-lg border border-zinc-150 dark:border-zinc-900">
                                <span className="text-[11px] font-bold text-black dark:text-zinc-100 block">{territory.name}</span>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {territory.stores.map((store, i) => (
                                    <span
                                      key={i}
                                      className="text-[9px] font-semibold bg-[var(--primary)]/5 text-[var(--primary)] px-1.5 py-0.5 rounded border border-[var(--primary)]/10"
                                    >
                                      {store}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Analytics" && (
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-black/55 dark:text-zinc-400 uppercase tracking-wider">Analytics Snapshot</h4>

              {/* Sparklines */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Revenue Trend */}
                <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl space-y-2">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase block">Revenue Trend</span>
                  <div className="h-8 flex items-end">
                    <svg className="w-full h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path d="M 0 25 Q 15 15, 30 20 T 60 10 T 90 2 T 100 8" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[8px] font-bold text-zinc-400">
                    <span>Mon</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Orders Trend */}
                <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl space-y-2">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase block">Orders Trend</span>
                  <div className="h-8 flex items-end">
                    <svg className="w-full h-8 animate-pulse" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path d="M 0 28 Q 25 2, 50 15 T 100 1" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[8px] font-bold text-zinc-400">
                    <span>Mon</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Store Distribution */}
                <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl space-y-2">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase block">Stores Allocation</span>
                  <div className="space-y-1 pt-1.5">
                    <div className="flex justify-between text-[9px] font-bold text-zinc-600 dark:text-zinc-300">
                      <span>West Pune</span>
                      <span>16</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--primary)] w-[65%]" />
                    </div>
                    <div className="flex justify-between text-[9px] font-bold text-zinc-600 dark:text-zinc-300 pt-1">
                      <span>East Pune</span>
                      <span>8</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[35%]" />
                    </div>
                  </div>
                </div>

                {/* Franchise Distribution */}
                <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl space-y-2">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase block">Franchise Share</span>
                  <div className="space-y-1 pt-1.5">
                    <div className="flex justify-between text-[9px] font-bold text-zinc-600 dark:text-zinc-300">
                      <span>Exclusive</span>
                      <span>80%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[80%]" />
                    </div>
                    <div className="flex justify-between text-[9px] font-bold text-zinc-600 dark:text-zinc-300 pt-1">
                      <span>Shared</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[20%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 grid grid-cols-2 gap-3 shrink-0 select-none">
          <button
            onClick={() => onArchiveToggle(region)}
            className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
              region.status === "Active"
                ? "border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                : "border-emerald-250 dark:border-emerald-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
            }`}
          >
            {region.status === "Active" ? "Archive Region" : "Activate Region"}
          </button>
          <button
            onClick={() => onEdit(region)}
            className="px-3 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer text-center"
          >
            Edit Region
          </button>
        </div>
      </aside>
    </>
  );
}
