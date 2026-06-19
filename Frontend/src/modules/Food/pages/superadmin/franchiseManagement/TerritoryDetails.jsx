import React, { useState } from "react";
import {
  X,
  MapPin,
  Building,
  Hash,
  Activity,
  Layers,
  Store,
  DollarSign,
  TrendingUp,
  Percent,
  Compass,
  ArrowRight,
  User,
  Sliders,
  Calendar,
  ExternalLink,
  Map
} from "lucide-react";

export default function TerritoryDetails({
  isOpen,
  onClose,
  territory,
  franchises,
  onEdit,
  onReassign,
  onAnalytics,
  onStatusToggle
}) {
  if (!isOpen || !territory) return null;

  // Search inside postal code chips
  const [postalSearch, setPostalSearch] = useState("");

  const assignedFranchise = franchises.find((f) => f.id === territory.assignedFranchiseId);

  // Mock stores mapping under this territory
  const mockStores = [
    { code: "ST-MUM-01", name: "Bandra Carter Road Pizza Hub", manager: "Rohan Sharma", status: "Active" },
    { code: "ST-MUM-02", name: "Bandra Pali Hill Express", manager: "Nisha Varma", status: "Active" },
    { code: "ST-MUM-03", name: "Bandra Linking Road Diner", manager: "Rahul Sen", status: "Inactive" }
  ].slice(0, territory.storesCount || 3);

  // Filter postal codes based on search input
  const filteredPostalCodes = (territory.postalCodes || []).filter((code) =>
    code.includes(postalSearch)
  );

  return (
    <>
      {/* Drawer backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[65] transition-opacity duration-300"
      />

      {/* Drawer body container */}
      <aside className="fixed inset-y-0 right-0 z-[66] w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-900 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out select-none animate-slideOver">
        {/* Header section */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Compass className="text-[var(--primary)] shrink-0" size={18} />
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-black dark:text-zinc-100">
                Territory Details
              </h2>
              <span className="text-[9px] font-bold text-zinc-500">{territory.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-850 text-zinc-500 hover:text-black dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable details wrapper */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
          {/* Section 1 – Basic Information */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-black dark:text-zinc-100 leading-tight">
                {territory.name}
              </h3>
              <span
                className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${
                  territory.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-450"
                }`}
              >
                {territory.status}
              </span>
            </div>
            <p className="text-[10px] font-semibold text-zinc-500 leading-relaxed">
              {territory.description || "No description provided for this operational boundary."}
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 font-bold border-t border-zinc-100 dark:border-zinc-900 pt-2 bg-zinc-50/50 dark:bg-zinc-900/20 p-2 rounded-lg">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>Created: {territory.createdAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity size={12} />
                <span>Last Updated: Today</span>
              </div>
            </div>
          </div>

          {/* Section 2 – Geographic Hierarchy */}
          <div className="border-t border-zinc-150 dark:border-zinc-900 pt-3 space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Geographic Hierarchy
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-lg text-black dark:text-zinc-250 border border-zinc-150 dark:border-zinc-850">
              <span className="text-zinc-500 dark:text-zinc-400">India</span>
              <ArrowRight size={10} className="text-zinc-400" />
              <span className="text-zinc-500 dark:text-zinc-400">{territory.regionName}</span>
              <ArrowRight size={10} className="text-zinc-400" />
              <span className="text-zinc-500 dark:text-zinc-400">{territory.zoneName}</span>
              <ArrowRight size={10} className="text-zinc-400" />
              <span className="font-bold text-[var(--primary)]">{territory.name}</span>
            </div>
          </div>

          {/* Section 3 – Assigned Franchise */}
          <div className="border-t border-zinc-150 dark:border-zinc-900 pt-3 space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Assigned Franchise
            </h4>
            {assignedFranchise ? (
              <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-black dark:text-zinc-100">
                    {assignedFranchise.name}
                  </p>
                  <p className="text-[9px] font-bold text-zinc-500">{assignedFranchise.code}</p>
                  <div className="flex items-center gap-1 text-[9px] font-medium text-zinc-500">
                    <User size={11} />
                    <span>Mgr: {assignedFranchise.contact}</span>
                  </div>
                </div>
                <button
                  onClick={() => console.log(`Navigating to Franchise detail ${assignedFranchise.id}`)}
                  className="p-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-black dark:text-zinc-250 rounded-lg text-[9px] font-bold inline-flex items-center gap-1 cursor-pointer"
                  title="View Franchise Details"
                >
                  <span>VIEW</span>
                  <ExternalLink size={10} />
                </button>
              </div>
            ) : (
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-center">
                <span className="text-[10px] font-bold text-amber-500">Unassigned Territory</span>
                <p className="text-[9px] text-zinc-500 mt-1">
                  Assign a franchise to start mapping stores and routing orders.
                </p>
              </div>
            )}
          </div>

          {/* Section 4 – Covered Postal Codes */}
          <div className="border-t border-zinc-150 dark:border-zinc-900 pt-3 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Covered Postal Codes ({territory.postalCodes.length})
              </h4>
              <input
                type="text"
                value={postalSearch}
                onChange={(e) => setPostalSearch(e.target.value)}
                placeholder="Find PIN..."
                className="w-24 p-1 text-[9px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded outline-none text-black dark:text-zinc-100"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-lg">
              {filteredPostalCodes.length > 0 ? (
                filteredPostalCodes.map((code) => (
                  <span
                    key={code}
                    className="px-2 py-0.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-[10px] font-black text-black dark:text-zinc-200 shadow-sm"
                  >
                    {code}
                  </span>
                ))
              ) : (
                <span className="text-[9px] text-zinc-500 font-bold p-1">No matching PIN codes.</span>
              )}
            </div>
          </div>

          {/* Section 5 – Store Mapping */}
          <div className="border-t border-zinc-150 dark:border-zinc-900 pt-3 space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Mapped Stores ({mockStores.length})
            </h4>
            <div className="space-y-1.5">
              {mockStores.length > 0 ? (
                mockStores.map((store) => (
                  <div
                    key={store.code}
                    className="p-2.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[10px] font-bold text-black dark:text-zinc-100">
                        {store.name}
                      </p>
                      <p className="text-[8px] font-bold text-zinc-500">{store.code} • Mgr: {store.manager}</p>
                    </div>
                    <span
                      className={`px-1.5 py-0.2 text-[8px] font-bold rounded ${
                        store.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                      }`}
                    >
                      {store.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[9px] text-zinc-500 font-bold">No active stores mapped to this territory yet.</p>
              )}
            </div>
          </div>

          {/* Section 6 – Operational Metrics */}
          <div className="border-t border-zinc-150 dark:border-zinc-900 pt-3 space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Operational Metrics
            </h4>
            <div className="grid grid-cols-3 gap-2.5 select-none">
              <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-lg text-center border border-zinc-150 dark:border-zinc-850">
                <span className="text-[8px] font-bold text-zinc-500 block">Orders Today</span>
                <span className="text-xs font-black text-black dark:text-zinc-100">{territory.ordersToday}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-lg text-center border border-zinc-150 dark:border-zinc-850">
                <span className="text-[8px] font-bold text-zinc-500 block">Rev Today</span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">₹{territory.revenueToday.toLocaleString()}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-lg text-center border border-zinc-150 dark:border-zinc-850">
                <span className="text-[8px] font-bold text-zinc-500 block">SLA Compliance</span>
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">96.5%</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-lg text-center border border-zinc-150 dark:border-zinc-850">
                <span className="text-[8px] font-bold text-zinc-500 block">Avg Delivery</span>
                <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">22 Mins</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-lg text-center border border-zinc-150 dark:border-zinc-850">
                <span className="text-[8px] font-bold text-zinc-500 block">Orders Month</span>
                <span className="text-xs font-black text-black dark:text-zinc-100">1,240</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-lg text-center border border-zinc-150 dark:border-zinc-850">
                <span className="text-[8px] font-bold text-zinc-500 block">Rev Month</span>
                <span className="text-xs font-black text-emerald-650 dark:text-emerald-400">₹5.4L</span>
              </div>
            </div>
          </div>

          {/* Section 7 – Delivery Coverage */}
          <div className="border-t border-zinc-150 dark:border-zinc-900 pt-3 space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Delivery Coverage Map
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg">
                <span>Radius: {territory.deliveryRadiusKm} km</span>
                <span>Exclusive Geofence Boundary</span>
              </div>

              {/* Mock Map Polygon / Geofence Visualization */}
              <div className="h-28 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative select-none">
                <Map className="absolute text-zinc-200 dark:text-zinc-850 w-full h-full p-2" />
                
                {/* SVG mock map drawing */}
                <svg className="w-full h-full z-10 opacity-70" viewBox="0 0 100 100">
                  {/* Grid lines */}
                  <line x1="20" y1="0" x2="20" y2="100" stroke="#cccccc22" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#cccccc22" strokeWidth="0.5" />
                  <line x1="80" y1="0" x2="80" y2="100" stroke="#cccccc22" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#cccccc22" strokeWidth="0.5" />
                  <line x1="0" y1="70" x2="100" y2="70" stroke="#cccccc22" strokeWidth="0.5" />
                  
                  {/* Service area polygon */}
                  <polygon
                    points="30,25 75,20 85,65 50,85 20,60"
                    fill="var(--primary)"
                    fillOpacity="0.12"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                  />
                  
                  {/* Pin indicators */}
                  <circle cx="50" cy="50" r="2.5" fill="red" />
                  <circle cx="35" cy="40" r="1.5" fill="blue" />
                  <circle cx="70" cy="55" r="1.5" fill="blue" />
                </svg>
                <div className="absolute bottom-1 right-1 bg-white/90 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800 rounded px-1 text-[8px] font-bold text-zinc-500 z-10">
                  {territory.name} Bounds
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex flex-wrap gap-2 justify-end select-none">
          <button
            onClick={() => onEdit(territory)}
            className="flex-1 bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-250 dark:border-zinc-800 text-black dark:text-zinc-200 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1 shadow-sm"
          >
            <Sliders size={12} />
            <span>EDIT</span>
          </button>
          <button
            onClick={() => onReassign(territory)}
            className="flex-1 bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-250 dark:border-zinc-800 text-black dark:text-zinc-200 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1 shadow-sm"
          >
            <Building size={12} />
            <span>REASSIGN</span>
          </button>
          <button
            onClick={() => onAnalytics(territory)}
            className="flex-1 bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-250 dark:border-zinc-800 text-black dark:text-zinc-200 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1 shadow-sm"
          >
            <TrendingUp size={12} />
            <span>ANALYTICS</span>
          </button>
          <button
            onClick={() => onStatusToggle(territory)}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold text-white transition-all cursor-pointer shadow-sm ${
              territory.status === "Active"
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {territory.status === "Active" ? "DEACTIVATE" : "ACTIVATE"}
          </button>
        </div>
      </aside>
    </>
  );
}
