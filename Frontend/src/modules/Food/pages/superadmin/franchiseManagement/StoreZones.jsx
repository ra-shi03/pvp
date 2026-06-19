import React, { useState, useEffect } from "react";
import { ChevronRight, Plus, Globe, Search, Map, ChevronDown, Building2, Layers, Maximize2, Info, ArrowRight, Store } from "lucide-react";
import StoreAddZoneModal from "./StoreAddZoneModal";
import StoreCoverageMap from "./StoreCoverageMap";
import StoreAssignmentModal from "./StoreAssignmentModal";
import AddRegionModal from "./AddRegionModal";
import StoresTabModal from "./StoresTabModal";
import AnalyticsTabModal from "./AnalyticsTabModal";

export default function StoreZones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Territory Data & Filter Logic
  const [expandedNodes, setExpandedNodes] = useState({
    "ind": true,
    "mh": true,
    "pnq": true
  });

  const toggleExpand = (id) => {
    setExpandedNodes(prev => ({...prev, [id]: !prev[id]}));
  };

  const territoryData = [
    {
      id: "ind", name: "India", type: "country", icon: Globe, iconColor: "text-[var(--primary)]",
      children: [
        {
          id: "mh", name: "Maharashtra", type: "state", icon: Map, iconColor: "text-orange-500",
          children: [
            {
              id: "pnq", name: "Pune Region", type: "region", icon: Building2, active: true,
              children: [
                { id: "za", name: "Zone A (North)", stores: 12, type: "zone" },
                { id: "zb", name: "Zone B (Central)", stores: 8, type: "zone" },
                { id: "zc", name: "Zone C (South)", stores: 15, type: "zone" },
              ]
            }
          ]
        },
        { id: "ka", name: "Karnataka", type: "state", icon: Map, children: [] },
        { id: "dl", name: "Delhi NCR", type: "state", icon: Map, children: [] }
      ]
    }
  ];

  const filterTree = (nodes, term) => {
    if (!term) return nodes;
    const lowerTerm = term.toLowerCase();
    return nodes.map(node => {
      const isMatch = node.name.toLowerCase().includes(lowerTerm);
      const filteredChildren = node.children ? filterTree(node.children, term) : [];
      if (isMatch || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
      return null;
    }).filter(Boolean);
  };

  const filteredTerritory = filterTree(territoryData, debouncedSearch);

  const renderTree = (nodes, level = 0) => {
    if (nodes.length === 0 && level === 0) {
      return <div className="text-xs text-black/50 dark:text-white/50 p-3 text-center font-bold bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">No matching regions or zones found.</div>;
    }
    
    return nodes.map((node, index) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = debouncedSearch ? true : expandedNodes[node.id];
      const isZone = node.type === "zone";

      if (isZone) {
        return (
          <div key={node.id} className="flex items-center justify-between p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center gap-1.5">
              <Layers size={14} className="text-black/50 dark:text-white/50" />
              <span className="text-xs font-semibold text-black dark:text-white">{node.name}</span>
            </div>
            <span className="text-[9px] bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded font-bold">{node.stores} Stores</span>
          </div>
        );
      }

      const isRegion = node.type === "region";
      const Icon = node.icon;
      
      const buttonClass = isRegion 
        ? "flex items-center gap-1.5 w-full text-left font-bold text-[var(--primary)] bg-[var(--primary)]/10 p-1.5 rounded-lg"
        : node.type === "state" && !hasChildren
          ? "flex items-center gap-1.5 w-full text-left font-semibold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white py-1 transition-colors text-xs"
          : "flex items-center gap-1.5 w-full text-left font-bold text-black dark:text-white py-1 group text-xs";

      let containerClass = "space-y-0.5";
      if (level > 0) containerClass += " pl-4";
      if (node.type === "state" && !hasChildren && index > 0) {
        containerClass += " pt-1.5 mt-1.5";
        if (index === 1) containerClass += " border-t border-zinc-200 dark:border-zinc-850";
      }

      return (
        <div key={node.id} className={containerClass}>
          <button 
            onClick={() => node.children && toggleExpand(node.id)}
            className={buttonClass}
          >
            {node.children && (
              isExpanded 
                ? <ChevronDown size={14} className={isRegion ? "" : "text-[var(--primary)]"} /> 
                : <ChevronRight size={14} className={`${isRegion ? "" : "text-[var(--primary)]"} group-hover:rotate-90 transition-transform`} />
            )}
            {!node.children && <div className="w-[14px]"></div>}
            {Icon && <Icon size={14} className={node.iconColor || "text-black dark:text-white"} />}
            <span>{node.name}</span>
          </button>

          {hasChildren && isExpanded && (
            <div className={isRegion ? "pl-4 space-y-0.5 border-l border-zinc-200 dark:border-zinc-800 ml-1.5 mt-1" : ""}>
               {renderTree(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-2">
        <div className="space-y-0.5">
          <h1 className="text-lg font-bold text-black dark:text-white leading-tight">
            Store Zones & Regions
          </h1>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">
            Manage franchise territories, delivery zones, and store allocation
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setIsAssignModalOpen(true)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] transition-all cursor-pointer font-bold text-[11px]"
          >
            <Store size={14} />
            <span>ASSIGN STORES</span>
          </button>
          <button
            onClick={() => setIsAddZoneModalOpen(true)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] transition-all cursor-pointer font-bold text-[11px]"
          >
            <Plus size={14} className="stroke-[3]" />
            <span>ADD ZONE</span>
          </button>
          <button 
            onClick={() => setIsAddRegionModalOpen(true)}
            className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-3.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Globe size={14} />
            <span>ADD REGION</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 select-none">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Total Regions</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">18</h3>
              <span className="text-emerald-500 font-bold text-[8px]">+2 New</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
            <Globe size={14} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Total Zones</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">64</h3>
              <span className="text-orange-500 font-bold text-[8px]">Active</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-orange-500/10 text-orange-600 shrink-0 border border-orange-100 dark:border-orange-900/30">
            <Layers size={14} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Assigned Stores</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">152</h3>
              <span className="text-blue-500 font-bold text-[8px]">94% Fill Rate</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 shrink-0 border border-blue-100 dark:border-blue-900/30">
            <Store size={14} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Revenue</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">₹2.4 Cr</h3>
              <span className="text-emerald-500 font-bold text-[8px]">↑ 12.5%</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
            <Building2 size={14} />
          </div>
        </div>
      </div>

      {/* Territory Management Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Section 1: Territory Tree (Left) */}
        <div className="xl:col-span-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden h-[500px] shadow-sm">
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-2">Territory Hierarchy</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black dark:text-white" size={14} />
              <input
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:border-[var(--primary)] focus:ring-0 outline-none transition-all"
                placeholder="Search region or zone..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800">
            {renderTree(filteredTerritory)}
          </div>
        </div>

        {/* Section 2 & 3: Details & Table (Right) */}
        <div className="xl:col-span-8 space-y-4">
          {/* Region Details Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--primary)] text-white flex items-center justify-center rounded-lg shadow-md shrink-0">
                  <Building2 size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-black dark:text-white">Pune Region</h2>
                    <span className="px-1.5 py-0.5 bg-emerald-550/10 text-emerald-600 dark:text-emerald-400 text-[8px] font-bold rounded uppercase tracking-wider">Active</span>
                  </div>
                  <p className="text-[10px] text-black/70 dark:text-white/70 flex items-center gap-1 mt-0.5 font-medium">
                    <span className="font-bold">Code:</span> PNQ-021 <span className="mx-0.5">|</span> <span className="font-bold">Manager:</span> Rajesh K.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Monthly Rev</p>
                  <p className="text-xs font-black text-[var(--primary)] mt-0.5">₹42.8 L</p>
                </div>
                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Total Zones</p>
                  <p className="text-xs font-black text-black dark:text-white mt-0.5">6</p>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="px-3 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 scrollbar-none">
              <div className="flex gap-6 min-w-max">
                {["Overview", "Zones (6)", "Stores (35)", "Analytics", "Coverage Map"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-1.5 font-bold text-xs transition-colors ${
                      activeTab === tab 
                        ? "border-b-2 border-[var(--primary)] text-[var(--primary)]" 
                        : "text-black/60 dark:text-white/60 hover:text-[var(--primary)]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "Overview" && (
              <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-bold text-black dark:text-white uppercase text-[9px] tracking-wider">Demographics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <p className="text-[9px] text-black/50 dark:text-white/50 font-bold uppercase">Population Reach</p>
                      <p className="font-bold text-xs text-black dark:text-white mt-0.5">3.2M</p>
                    </div>
                    <div className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <p className="text-[9px] text-black/50 dark:text-white/50 font-bold uppercase">Avg. Delivery Time</p>
                      <p className="font-bold text-xs text-[var(--primary)] mt-0.5">24 mins</p>
                    </div>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 h-28 relative group cursor-pointer">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Map coverage visual"
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80&fm=webp"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-white/95 text-zinc-900 px-3 py-1.5 rounded-full font-bold text-[10px] shadow-md flex items-center gap-1.5 hover:bg-white transition-colors">
                        <Maximize2 size={12} />
                        View Full Coverage
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-black dark:text-white uppercase text-[9px] tracking-wider">Operational Health</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-black/70 dark:text-white/70 font-semibold">Zone Efficiency</span>
                        <span className="font-bold text-black dark:text-white">88%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[88%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-black/70 dark:text-white/70 font-semibold">Store Utilization</span>
                        <span className="font-bold text-black dark:text-white">72%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--primary)] w-[72%]"></div>
                      </div>
                    </div>

                    <div className="mt-2 p-2.5 border border-[var(--primary)]/20 bg-[var(--primary)]/5 rounded-lg flex items-start gap-2">
                      <Info size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-black/80 dark:text-white/80 font-medium leading-relaxed">Pune Region is currently performing 15% above national average for lunch-hour deliveries.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Stores (35)" && (
              <div className="p-3 bg-zinc-50/50 dark:bg-zinc-900/20">
                <StoresTabModal />
              </div>
            )}

            {activeTab === "Analytics" && (
              <div className="p-3 bg-zinc-50/50 dark:bg-zinc-900/20">
                <AnalyticsTabModal />
              </div>
            )}

            {activeTab === "Coverage Map" && (
              <div className="p-3">
                <StoreCoverageMap />
              </div>
            )}
          </div>

          {/* Zones Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
              <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">Zones in Pune Region</h3>
              <button className="text-[var(--primary)] font-bold text-xs hover:underline flex items-center gap-0.5">
                <span>VIEW ALL ZONES</span>
                <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-550/10 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Zone Name</th>
                    <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Manager</th>
                    <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider text-center">Stores</th>
                    <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Efficiency</th>
                    <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr className="hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10 transition-colors group">
                    <td className="px-3 py-2">
                      <div className="font-bold text-xs text-black dark:text-white group-hover:text-[var(--primary)] transition-colors">Zone A (North)</div>
                      <div className="text-[10px] text-black/70 dark:text-white/70 mt-0.5">Baner, Pashan, Balewadi</div>
                    </td>
                    <td className="px-3 py-2 text-xs font-semibold text-black dark:text-white">Amit Deshmukh</td>
                    <td className="px-3 py-2 text-center text-xs font-bold text-black dark:text-white">12</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shrink-0">
                          <div className="h-full bg-[var(--primary)] w-[92%]"></div>
                        </div>
                        <span className="text-[10px] font-bold text-black dark:text-white">92%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-[9px] font-bold rounded uppercase tracking-wider">Active</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10 transition-colors">
                    <td className="px-3 py-2">
                      <div className="font-bold text-xs text-black dark:text-white">Zone B (Central)</div>
                      <div className="text-[10px] text-black/70 dark:text-white/70 mt-0.5">Shivajinagar, FC Road, Camp</div>
                    </td>
                    <td className="px-3 py-2 text-xs font-semibold text-black dark:text-white">Priya Sharma</td>
                    <td className="px-3 py-2 text-center text-xs font-bold text-black dark:text-white">8</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shrink-0">
                          <div className="h-full bg-orange-500 w-[65%]"></div>
                        </div>
                        <span className="text-[10px] font-bold text-black dark:text-white">65%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="px-1.5 py-0.5 bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 text-[9px] font-bold rounded uppercase tracking-wider">Understaffed</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10 transition-colors">
                    <td className="px-3 py-2">
                      <div className="font-bold text-xs text-black dark:text-white">Zone C (South)</div>
                      <div className="text-[10px] text-black/70 dark:text-white/70 mt-0.5">Katraj, Dhankawadi, Bibwewadi</div>
                    </td>
                    <td className="px-3 py-2 text-xs font-semibold text-black dark:text-white">Vikram Malhotra</td>
                    <td className="px-3 py-2 text-center text-xs font-bold text-black dark:text-white">15</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shrink-0">
                          <div className="h-full bg-[var(--primary)] w-[84%]"></div>
                        </div>
                        <span className="text-[10px] font-bold text-black dark:text-white">84%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="px-1.5 py-0.5 bg-emerald-550/10 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-[9px] font-bold rounded uppercase tracking-wider">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StoreAddZoneModal
        isOpen={isAddZoneModalOpen}
        onClose={() => setIsAddZoneModalOpen(false)}
      />
      <StoreAssignmentModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      />
      <AddRegionModal
        isOpen={isAddRegionModalOpen}
        onClose={() => setIsAddRegionModalOpen(false)}
        onSaveRegion={(region) => {
          console.log("New Region Saved:", region);
        }}
      />
    </div>
  );
}
