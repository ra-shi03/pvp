import React from "react";
import { X, Layers, Map, Compass, Activity, ShieldCheck, Milestone } from "lucide-react";

export default function ZoneDetailsDrawer({ isOpen, onClose, zone, onEdit, onAssignTerritory, onArchiveToggle }) {
  if (!isOpen || !zone) return null;

  // Mock territories assigned to this zone
  const mockTerritories = [
    { id: "t1", name: "Bandra West Link Road", stores: 3, coverage: "98%" },
    { id: "t2", name: "Khar Gymkhana Area", stores: 2, coverage: "95%" },
    { id: "t3", name: "Santacruz West Station", stores: 4, coverage: "92%" }
  ];

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
            <div className="w-7 h-7 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center border border-orange-200/20">
              <Layers size={15} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-zinc-100">Zone Details</h3>
              <p className="text-[10px] font-bold text-black/60 dark:text-zinc-400 mt-0.5">{zone.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-black dark:text-zinc-300 hover:text-[var(--primary)] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {/* Basic Information */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-black/55 dark:text-zinc-400 uppercase tracking-wider">Basic Information</h4>
            <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/35 border border-zinc-200 dark:border-zinc-900 rounded-xl text-xs">
              <div>
                <span className="text-[9px] font-bold text-zinc-500 block uppercase">Zone Name</span>
                <span className="font-bold text-black dark:text-zinc-100">{zone.name}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-zinc-500 block uppercase">Parent Region</span>
                <span className="font-bold text-black dark:text-zinc-100">{zone.regionName}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 block uppercase">Description</span>
                <p className="font-semibold text-black/80 dark:text-zinc-300 mt-0.5 leading-relaxed">
                  {zone.description || "Operational zone coordinating delivery routing, franchise coverage and local store logistics."}
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 block uppercase">Created Date</span>
                <span className="font-bold text-black dark:text-zinc-100">{zone.createdDate || "2026-02-10"}</span>
              </div>
              <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 block uppercase">Status</span>
                <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded ${
                  zone.status === "Active"
                    ? "bg-emerald-550/10 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-850 dark:text-zinc-400"
                }`}>
                  {zone.status}
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
                  <span className="text-[8px] font-bold text-zinc-500 uppercase">Territories</span>
                  <p className="text-sm font-black text-black dark:text-zinc-100 mt-0.5">{zone.territoriesCount || 4}</p>
                </div>
                <Milestone className="text-zinc-400" size={16} />
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase">Franchises</span>
                  <p className="text-sm font-black text-black dark:text-zinc-100 mt-0.5">{zone.franchisesCount || 2}</p>
                </div>
                <Compass className="text-zinc-400" size={16} />
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase">Stores</span>
                  <p className="text-sm font-black text-black dark:text-zinc-100 mt-0.5">{zone.storesCount || 8}</p>
                </div>
                <Map className="text-zinc-400" size={16} />
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase">Active Orders</span>
                  <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-0.5">{zone.activeOrders || 12}</p>
                </div>
                <Activity className="text-blue-500 animate-pulse" size={16} />
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-between col-span-2">
                <div>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase">Revenue</span>
                  <p className="text-sm font-black text-[var(--primary)] mt-0.5">₹{zone.revenue ? zone.revenue.toLocaleString() : "14,80,000"}</p>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-bold text-zinc-500 block uppercase">Delivery Performance</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
                    <ShieldCheck size={13} />
                    <span>94.8% SLA</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Territory Mapping */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-black/55 dark:text-zinc-400 uppercase tracking-wider">Territory Mapping</h4>
            <div className="border border-zinc-200 dark:border-zinc-900 rounded-xl divide-y divide-zinc-150 dark:divide-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 overflow-hidden">
              {mockTerritories.map((t) => (
                <div key={t.id} className="p-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-black dark:text-zinc-100 block">{t.name}</span>
                    <span className="text-[9px] font-bold text-zinc-500 mt-0.5 block">{t.stores} Active Stores</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded">
                      {t.coverage} SLA
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex flex-col gap-2 shrink-0 select-none">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onArchiveToggle(zone)}
              className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                zone.status === "Active"
                  ? "border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  : "border-emerald-250 dark:border-emerald-900 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
              }`}
            >
              {zone.status === "Active" ? "Archive Zone" : "Activate Zone"}
            </button>
            <button
              onClick={() => onEdit(zone)}
              className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-300 transition-all cursor-pointer text-center"
            >
              Edit Zone
            </button>
          </div>
          <button
            onClick={() => onAssignTerritory(zone)}
            className="w-full py-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer text-center"
          >
            Assign Territories
          </button>
        </div>
      </aside>
    </>
  );
}
