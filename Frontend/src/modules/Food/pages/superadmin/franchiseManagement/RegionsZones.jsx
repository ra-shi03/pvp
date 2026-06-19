import React, { useState, useEffect } from "react";
import {
  Download,
  RefreshCw,
  FileText,
  Plus,
  Search,
  X
} from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Sub-components
import AddRegionModal from "./AddRegionModal";
import AddZoneModal from "./AddZoneModal";
import AssignTerritoryModal from "./AssignTerritoryModal";
import RegionDetailsDrawer from "./RegionDetailsDrawer";
import ZoneDetailsDrawer from "./ZoneDetailsDrawer";
import RegionsZonesData from "./RegionsZonesData";

export default function RegionsZones() {
  const [activeTab, setActiveTab] = useState("regions"); // "regions" | "zones"

  // Mock initial datasets (Indian geographics)
  const [regions, setRegions] = useState([
    { id: "reg-1", name: "North India", country: "India", description: "Covers Delhi NCR, Punjab, Haryana, and Rajasthan.", zonesCount: 4, franchisesCount: 12, storesCount: 32, revenue: 15400000, status: "Active", createdDate: "2026-01-12" },
    { id: "reg-2", name: "West India", country: "India", description: "Covers Maharashtra, Gujarat, and Goa clusters.", zonesCount: 3, franchisesCount: 8, storesCount: 24, revenue: 12400000, status: "Active", createdDate: "2026-02-15" },
    { id: "reg-3", name: "South India", country: "India", description: "Covers Karnataka, Tamil Nadu, Telangana, and Kerala.", zonesCount: 5, franchisesCount: 15, storesCount: 40, revenue: 18500000, status: "Active", createdDate: "2026-01-20" },
    { id: "reg-4", name: "Central India", country: "India", description: "Covers Madhya Pradesh and Chhattisgarh.", zonesCount: 2, franchisesCount: 6, storesCount: 16, revenue: 8400000, status: "Active", createdDate: "2026-03-01" },
    { id: "reg-5", name: "East India", country: "India", description: "Covers West Bengal, Odisha, and Bihar.", zonesCount: 1, franchisesCount: 2, storesCount: 4, revenue: 1200000, status: "Archived", createdDate: "2026-04-10" }
  ]);

  const [zones, setZones] = useState([
    { id: "zn-1", name: "Mumbai Zone", regionId: "reg-2", regionName: "West India", description: "Metro Mumbai, Thane, Navi Mumbai region.", territoriesCount: 6, franchisesCount: 4, storesCount: 12, activeOrders: 14, revenue: 6500000, status: "Active", createdDate: "2026-02-16" },
    { id: "zn-2", name: "Pune Zone", regionId: "reg-2", regionName: "West India", description: "Pune municipal corp, PCMC and Hinjewadi.", territoriesCount: 4, franchisesCount: 3, storesCount: 8, activeOrders: 8, revenue: 4200000, status: "Active", createdDate: "2026-02-18" },
    { id: "zn-3", name: "Delhi NCR Zone", regionId: "reg-1", regionName: "North India", description: "Delhi, Noida, Gurugram, and Ghaziabad.", territoriesCount: 8, franchisesCount: 7, storesCount: 20, activeOrders: 22, revenue: 9800000, status: "Active", createdDate: "2026-01-15" },
    { id: "zn-4", name: "Bengaluru Zone", regionId: "reg-3", regionName: "South India", description: "Bengaluru Urban, East/West, and outer rings.", territoriesCount: 10, franchisesCount: 9, storesCount: 25, activeOrders: 28, revenue: 11500000, status: "Active", createdDate: "2026-01-22" },
    { id: "zn-5", name: "Chennai Zone", regionId: "reg-3", regionName: "South India", description: "Chennai city, OMR, and industrial corridors.", territoriesCount: 6, franchisesCount: 5, storesCount: 12, activeOrders: 10, revenue: 5800000, status: "Active", createdDate: "2026-01-28" },
    { id: "zn-6", name: "Bhopal Zone", regionId: "reg-4", regionName: "Central India", description: "Bhopal city limits and Arera Cluster.", territoriesCount: 3, franchisesCount: 2, storesCount: 6, activeOrders: 5, revenue: 2800000, status: "Active", createdDate: "2026-03-05" },
    { id: "zn-7", name: "Indore Zone", regionId: "reg-4", regionName: "Central India", description: "Indore city, Vijay Nagar, and Rajwada.", territoriesCount: 4, franchisesCount: 3, storesCount: 8, activeOrders: 7, revenue: 4200000, status: "Active", createdDate: "2026-03-10" },
    { id: "zn-8", name: "Kolkata Zone", regionId: "reg-5", regionName: "East India", description: "Salt Lake, New Town, and South Kolkata.", territoriesCount: 2, franchisesCount: 2, storesCount: 4, activeOrders: 0, revenue: 1200000, status: "Archived", createdDate: "2026-04-12" }
  ]);

  // Search and Debounce
  const [regionsSearch, setRegionsSearch] = useState("");
  const [regionsDebouncedSearch, setRegionsDebouncedSearch] = useState("");
  const [zonesSearch, setZonesSearch] = useState("");
  const [zonesDebouncedSearch, setZonesDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setRegionsDebouncedSearch(regionsSearch);
    }, 400);
    return () => clearTimeout(handler);
  }, [regionsSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setZonesDebouncedSearch(zonesSearch);
    }, 400);
    return () => clearTimeout(handler);
  }, [zonesSearch]);

  // Filtered dataset states (propagated from child component)
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const [filteredZones, setFilteredZones] = useState(zones);

  // Drawers and Modals States
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isRegionDrawerOpen, setIsRegionDrawerOpen] = useState(false);

  const [selectedZone, setSelectedZone] = useState(null);
  const [isZoneDrawerOpen, setIsZoneDrawerOpen] = useState(false);

  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [editRegionData, setEditRegionData] = useState(null);

  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [editZoneData, setEditZoneData] = useState(null);

  const [isAssignTerritoryOpen, setIsAssignTerritoryOpen] = useState(false);

  // Archive Confirmations
  const [archiveTarget, setArchiveTarget] = useState(null); // { type: "region" | "zone", data: object }
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);

  // KPI calculations (Updates dynamically)
  const totalRegions = regions.length;
  const totalZones = zones.length;
  const activeRegions = regions.filter((r) => r.status === "Active").length;
  const activeZones = zones.filter((z) => z.status === "Active").length;
  const totalTerritories = zones.reduce((acc, curr) => acc + (curr.territoriesCount || 0), 0);
  const totalFranchises = regions.reduce((acc, curr) => acc + (curr.franchisesCount || 0), 0);
  const totalStores = regions.reduce((acc, curr) => acc + (curr.storesCount || 0), 0);
  const totalRevenueVal = regions.reduce((acc, curr) => acc + (curr.revenue || 0), 0);

  const formatCurrencyInCr = (val) => {
    const inCr = val / 10000000;
    return `₹${inCr.toFixed(2)} Cr`;
  };

  // CSV Downloader
  const handleDownloadCSV = () => {
    if (activeTab === "regions") {
      const headers = ["Region ID", "Region Name", "Country", "Zones count", "Franchises count", "Stores count", "Revenue (INR)", "Status", "Created Date"];
      const rows = filteredRegions.map((r) => [r.id, r.name, r.country, r.zonesCount, r.franchisesCount, r.storesCount, r.revenue, r.status, r.createdDate]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.map(val => `"${val}"`).join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Regions_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ["Zone ID", "Zone Name", "Parent Region", "Territories count", "Franchises count", "Stores count", "Active Orders", "Revenue (INR)", "Status", "Created Date"];
      const rows = filteredZones.map((z) => [z.id, z.name, z.regionName, z.territoriesCount, z.franchisesCount, z.storesCount, z.activeOrders, z.revenue, z.status, z.createdDate]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.map(val => `"${val}"`).join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Zones_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Landscape PDF Exporter
  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const isReg = activeTab === "regions";
    doc.setFontSize(16);
    doc.text(`PAPA VEG PIZZA - ${isReg ? "REGIONS" : "ZONES"} MANAGEMENT REPORT`, 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 21);

    const headers = isReg
      ? ["ID", "Region Name", "Country", "Zones", "Franchises", "Stores", "Total Revenue", "Status", "Created Date"]
      : ["ID", "Zone Name", "Parent Region", "Territories", "Franchises", "Stores", "Orders", "Revenue", "Status", "Created Date"];

    const tableRows = isReg
      ? filteredRegions.map((r) => [r.id, r.name, r.country, r.zonesCount, r.franchisesCount, r.storesCount, `₹${r.revenue.toLocaleString()}`, r.status, r.createdDate])
      : filteredZones.map((z) => [z.id, z.name, z.regionName, z.territoriesCount, z.franchisesCount, z.storesCount, z.activeOrders, `₹${z.revenue.toLocaleString()}`, z.status, z.createdDate]);

    autoTable(doc, {
      head: [headers],
      body: tableRows,
      startY: 28,
      theme: "striped",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [164, 60, 18] }, // Match primary dark brick red
    });

    doc.save(`${isReg ? "Regions" : "Zones"}_Export_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Add/Edit Submissions
  const handleRegionSubmit = (regionData) => {
    if (editRegionData) {
      setRegions((prev) => prev.map((r) => (r.id === regionData.id ? regionData : r)));
    } else {
      setRegions((prev) => [...prev, regionData]);
    }
    setIsRegionModalOpen(false);
    setEditRegionData(null);
  };

  const handleZoneSubmit = (zoneData) => {
    if (editZoneData) {
      setZones((prev) => prev.map((z) => (z.id === zoneData.id ? zoneData : z)));
    } else {
      setZones((prev) => [...prev, zoneData]);
    }
    setIsZoneModalOpen(false);
    setEditZoneData(null);
  };

  // Archival Confirmations & Toggle Status
  const triggerArchiveConfirm = (type, data) => {
    setArchiveTarget({ type, data });
    setIsArchiveConfirmOpen(true);
  };

  const confirmArchive = () => {
    if (!archiveTarget) return;
    const { type, data } = archiveTarget;
    if (type === "region") {
      setRegions((prev) =>
        prev.map((r) => (r.id === data.id ? { ...r, status: "Archived" } : r))
      );
      if (selectedRegion?.id === data.id) {
        setSelectedRegion((prev) => ({ ...prev, status: "Archived" }));
      }
    } else {
      setZones((prev) =>
        prev.map((z) => (z.id === data.id ? { ...z, status: "Archived" } : z))
      );
      if (selectedZone?.id === data.id) {
        setSelectedZone((prev) => ({ ...prev, status: "Archived" }));
      }
    }
    setIsArchiveConfirmOpen(false);
    setArchiveTarget(null);
  };

  const activateRecord = (type, data) => {
    if (type === "region") {
      setRegions((prev) =>
        prev.map((r) => (r.id === data.id ? { ...r, status: "Active" } : r))
      );
      if (selectedRegion?.id === data.id) {
        setSelectedRegion((prev) => ({ ...prev, status: "Active" }));
      }
    } else {
      setZones((prev) =>
        prev.map((z) => (z.id === data.id ? { ...z, status: "Active" } : z))
      );
      if (selectedZone?.id === data.id) {
        setSelectedZone((prev) => ({ ...prev, status: "Active" }));
      }
    }
  };

  // Territory Assign callback
  const handleSaveAssignments = (payload) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === payload.zoneId
          ? { ...z, territoriesCount: payload.assignedTerritories.length }
          : z
      )
    );
    setIsAssignTerritoryOpen(false);
  };

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-900 pb-3 pt-2">
        <div className="space-y-0.5">
          <h1 className="text-lg font-bold text-black dark:text-zinc-100 leading-tight">
            Regions & Zones
          </h1>
          <p className="text-[10px] font-bold text-black/75 dark:text-zinc-300 mt-0.5">
            Manage geographical hierarchy for franchises, stores, reporting, and operations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 select-none">
          <button
            onClick={() => {
              setEditRegionData(null);
              setIsRegionModalOpen(true);
            }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-100 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Plus size={13} className="stroke-[3]" />
            <span>ADD REGION</span>
          </button>
          <button
            onClick={() => {
              setEditZoneData(null);
              setIsZoneModalOpen(true);
            }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-100 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Plus size={13} className="stroke-[3]" />
            <span>ADD ZONE</span>
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-100 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Download size={13} />
            <span>DOWNLOAD CSV</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-100 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer font-bold text-[11px]"
          >
            <FileText size={13} />
            <span>EXPORT PDF</span>
          </button>
          <button
            onClick={() => {
              console.log("Synchronizing geographical hierarchies...");
            }}
            className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-100 rounded-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* 8 Dynamic KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 select-none">
        {/* Total Regions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Total Regions</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-black dark:text-zinc-100">{totalRegions}</h3>
            <span className="text-[8px] font-bold text-zinc-500">Clusters</span>
          </div>
        </div>

        {/* Total Zones */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Total Zones</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-black dark:text-zinc-100">{totalZones}</h3>
            <span className="text-[8px] font-bold text-zinc-500">Sectors</span>
          </div>
        </div>

        {/* Active Regions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Active Regions</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-emerald-600 dark:text-emerald-400">{activeRegions}</h3>
            <span className="text-[8px] font-bold text-emerald-600/80">Operational</span>
          </div>
        </div>

        {/* Active Zones */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Active Zones</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-emerald-600 dark:text-emerald-400">{activeZones}</h3>
            <span className="text-[8px] font-bold text-emerald-600/80">Operational</span>
          </div>
        </div>

        {/* Total Territories */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Total Territories</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-blue-600 dark:text-blue-400">{totalTerritories}</h3>
            <span className="text-[8px] font-bold text-blue-500/80">SLA Bounds</span>
          </div>
        </div>

        {/* Total Franchises */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Franchises</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-orange-600 dark:text-orange-400">{totalFranchises}</h3>
            <span className="text-[8px] font-bold text-zinc-500">Holders</span>
          </div>
        </div>

        {/* Total Stores */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Stores count</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-purple-600 dark:text-purple-400">{totalStores}</h3>
            <span className="text-[8px] font-bold text-zinc-500">Mapped Outlets</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Total Revenue</span>
          <div className="mt-2 flex flex-col">
            <h3 className="text-xs font-black text-[var(--primary)]">{formatCurrencyInCr(totalRevenueVal)}</h3>
            <span className="text-[7px] font-bold text-emerald-600">All Regions</span>
          </div>
        </div>
      </div>

      {/* Tabs Controller */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-2 rounded-xl flex justify-between items-center shadow-sm select-none">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("regions")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "regions"
                ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/25"
                : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
            }`}
          >
            Regions ({filteredRegions.length})
          </button>
          <button
            onClick={() => setActiveTab("zones")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "zones"
                ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/25"
                : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
            }`}
          >
            Zones ({filteredZones.length})
          </button>
        </div>

        {/* Quick Search inside Tabs */}
        <div className="relative w-64 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={13} />
          {activeTab === "regions" ? (
            <input
              type="text"
              placeholder="Search regions..."
              value={regionsSearch}
              onChange={(e) => setRegionsSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] placeholder-zinc-400"
            />
          ) : (
            <input
              type="text"
              placeholder="Search zones..."
              value={zonesSearch}
              onChange={(e) => setZonesSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] placeholder-zinc-400"
            />
          )}
        </div>
      </div>

      {/* Grid and Table Data Rendering */}
      <RegionsZonesData
        activeTab={activeTab}
        regions={regions}
        setRegions={setRegions}
        zones={zones}
        setZones={setZones}
        setSelectedRegion={setSelectedRegion}
        setIsRegionDrawerOpen={setIsRegionDrawerOpen}
        setSelectedZone={setSelectedZone}
        setIsZoneDrawerOpen={setIsZoneDrawerOpen}
        setEditRegionData={setEditRegionData}
        setIsRegionModalOpen={setIsRegionModalOpen}
        setEditZoneData={setEditZoneData}
        setIsZoneModalOpen={setIsZoneModalOpen}
        setIsAssignTerritoryOpen={setIsAssignTerritoryOpen}
        triggerArchiveConfirm={triggerArchiveConfirm}
        activateRecord={activateRecord}
        regionsSearch={regionsSearch}
        setRegionsSearch={setRegionsSearch}
        regionsDebouncedSearch={regionsDebouncedSearch}
        zonesSearch={zonesSearch}
        setZonesSearch={setZonesSearch}
        zonesDebouncedSearch={zonesDebouncedSearch}
        onFilteredRegionsChange={setFilteredRegions}
        onFilteredZonesChange={setFilteredZones}
      />

      {/* Region details drawer */}
      <RegionDetailsDrawer
        isOpen={isRegionDrawerOpen}
        onClose={() => setIsRegionDrawerOpen(false)}
        region={selectedRegion}
        onEdit={(r) => {
          setIsRegionDrawerOpen(false);
          setEditRegionData(r);
          setIsRegionModalOpen(true);
        }}
        onArchiveToggle={(r) => {
          if (r.status === "Active") {
            triggerArchiveConfirm("region", r);
          } else {
            activateRecord("region", r);
          }
        }}
      />

      {/* Zone details drawer */}
      <ZoneDetailsDrawer
        isOpen={isZoneDrawerOpen}
        onClose={() => setIsZoneDrawerOpen(false)}
        zone={selectedZone}
        onEdit={(z) => {
          setIsZoneDrawerOpen(false);
          setEditZoneData(z);
          setIsZoneModalOpen(true);
        }}
        onAssignTerritory={(z) => {
          setIsZoneDrawerOpen(false);
          setSelectedZone(z);
          setIsAssignTerritoryOpen(true);
        }}
        onArchiveToggle={(z) => {
          if (z.status === "Active") {
            triggerArchiveConfirm("zone", z);
          } else {
            activateRecord("zone", z);
          }
        }}
      />

      {/* Add / Edit Region Modal */}
      <AddRegionModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        onSubmit={handleRegionSubmit}
        existingRegions={regions}
        editRegion={editRegionData}
      />

      {/* Add / Edit Zone Modal */}
      <AddZoneModal
        isOpen={isZoneModalOpen}
        onClose={() => setIsZoneModalOpen(false)}
        onSubmit={handleZoneSubmit}
        regions={regions}
        existingZones={zones}
        editZone={editZoneData}
      />

      {/* Assign Territory Modal */}
      <AssignTerritoryModal
        isOpen={isAssignTerritoryOpen}
        onClose={() => setIsAssignTerritoryOpen(false)}
        onSubmit={handleSaveAssignments}
        zone={selectedZone}
      />

      {/* Custom Archive Confirmation Alert Modal */}
      {isArchiveConfirmOpen && archiveTarget && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[70] flex items-center justify-center p-4 lg:pl-[280px]" id="archive-confirm-modal">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 animate-scaleUp">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-wider text-rose-600">Archive Confirmation</h3>
              <button
                onClick={() => setIsArchiveConfirmOpen(false)}
                className="text-black dark:text-zinc-300 hover:text-[var(--primary)] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 text-xs font-semibold text-black dark:text-zinc-300 space-y-3">
              {archiveTarget.type === "region" ? (
                <p className="leading-relaxed">
                  Archiving this region will disable future assignments but preserve historical relationships. Existing zones, territories, franchises, and stores remain intact.
                </p>
              ) : (
                <p className="leading-relaxed">
                  Archiving this zone will prevent future assignments while preserving historical operational data.
                </p>
              )}
            </div>
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-end gap-3 select-none">
              <button
                onClick={() => setIsArchiveConfirmOpen(false)}
                className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-350 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmArchive}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                {archiveTarget.type === "region" ? "Archive Region" : "Archive Zone"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
