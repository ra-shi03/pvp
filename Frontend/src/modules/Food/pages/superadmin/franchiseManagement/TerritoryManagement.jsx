import React, { useState, useEffect } from "react";
import {
  Download,
  RefreshCw,
  FileText,
  Plus,
  MapPin,
  X
} from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Sub-components
import TerritoryManagementData from "./TerritoryManagementData";
import TerritoryDetails from "./TerritoryDetails";
import AddEditTerritoryModal from "./AddEditTerritoryModal";
import ReassignFranchiseModal from "./ReassignFranchiseModal";
import TerritoryAnalyticsModal from "./TerritoryAnalyticsModal";

export default function TerritoryManagement() {
  // Mock Regions & Zones for dropdown mapping
  const [regions] = useState([
    { id: "reg-1", name: "North India" },
    { id: "reg-2", name: "West India" },
    { id: "reg-3", name: "South India" },
    { id: "reg-4", name: "Central India" }
  ]);

  const [zones] = useState([
    { id: "zn-1", name: "Delhi NCR Zone", regionId: "reg-1" },
    { id: "zn-2", name: "Mumbai Zone", regionId: "reg-2" },
    { id: "zn-3", name: "Pune Zone", regionId: "reg-2" },
    { id: "zn-4", name: "Bengaluru Zone", regionId: "reg-3" },
    { id: "zn-5", name: "Indore Zone", regionId: "reg-4" },
    { id: "zn-6", name: "Bhopal Zone", regionId: "reg-4" }
  ]);

  const [franchises] = useState([
    { id: "fran-1", name: "Northern Crust Co.", code: "PVP-FRAN-NORTH", contact: "Rajesh Kumar", storesCount: 8, regionId: "reg-1" },
    { id: "fran-2", name: "Western Spice Pizza", code: "PVP-FRAN-WEST", contact: "Amit Patel", storesCount: 12, regionId: "reg-2" },
    { id: "fran-3", name: "Southern Slice Foods", code: "PVP-FRAN-SOUTH", contact: "Karthik Raja", storesCount: 15, regionId: "reg-3" },
    { id: "fran-4", name: "Central Herb Bakers", code: "PVP-FRAN-CENTRAL", contact: "Vikram Singh", storesCount: 6, regionId: "reg-4" }
  ]);

  // Mock initial dataset for Indian territories
  const [territories, setTerritories] = useState([
    {
      id: "ter-1",
      name: "CP & Connaught Place",
      regionId: "reg-1",
      regionName: "North India",
      zoneId: "zn-1",
      zoneName: "Delhi NCR Zone",
      postalCodes: ["110001", "110002", "110003"],
      assignedFranchiseId: "fran-1",
      assignedFranchiseName: "Northern Crust Co.",
      storesCount: 3,
      deliveryRadiusKm: 6,
      ordersToday: 42,
      revenueToday: 18500,
      status: "Active",
      createdAt: "2026-01-15",
      description: "Covers Connaught Place inner/outer circles and adjacent central Delhi offices.",
      notes: "High corporate demand during weekdays."
    },
    {
      id: "ter-2",
      name: "Bandra West Cluster",
      regionId: "reg-2",
      regionName: "West India",
      zoneId: "zn-2",
      zoneName: "Mumbai Zone",
      postalCodes: ["400050", "400051", "400052"],
      assignedFranchiseId: "fran-2",
      assignedFranchiseName: "Western Spice Pizza",
      storesCount: 4,
      deliveryRadiusKm: 8,
      ordersToday: 55,
      revenueToday: 24000,
      status: "Active",
      createdAt: "2026-02-10",
      description: "Bandra West, Carter Road, and Pali Hill dense residential cluster.",
      notes: "Heavy weekend rush. Exclusivity enabled."
    },
    {
      id: "ter-3",
      name: "Koregaon Park",
      regionId: "reg-2",
      regionName: "West India",
      zoneId: "zn-3",
      zoneName: "Pune Zone",
      postalCodes: ["411001", "411002"],
      assignedFranchiseId: "fran-2",
      assignedFranchiseName: "Western Spice Pizza",
      storesCount: 2,
      deliveryRadiusKm: 5,
      ordersToday: 28,
      revenueToday: 12200,
      status: "Active",
      createdAt: "2026-02-18",
      description: "Koregaon Park lanes 1-7 and Kalyani Nagar IT boundaries.",
      notes: "Premium demographics. High average order value."
    },
    {
      id: "ter-4",
      name: "Indiranagar Hub",
      regionId: "reg-3",
      regionName: "South India",
      zoneId: "zn-4",
      zoneName: "Bengaluru Zone",
      postalCodes: ["560038", "560008"],
      assignedFranchiseId: "fran-3",
      assignedFranchiseName: "Southern Slice Foods",
      storesCount: 5,
      deliveryRadiusKm: 7,
      ordersToday: 62,
      revenueToday: 29800,
      status: "Active",
      createdAt: "2026-01-20",
      description: "Indiranagar 100ft road, 12th main, and parts of Domlur.",
      notes: "Top performing territory. Highest store density."
    },
    {
      id: "ter-5",
      name: "Arera Colony",
      regionId: "reg-4",
      regionName: "Central India",
      zoneId: "zn-6",
      zoneName: "Bhopal Zone",
      postalCodes: ["462016", "462039"],
      assignedFranchiseId: "fran-4",
      assignedFranchiseName: "Central Herb Bakers",
      storesCount: 2,
      deliveryRadiusKm: 6,
      ordersToday: 18,
      revenueToday: 7500,
      status: "Active",
      createdAt: "2026-03-01",
      description: "Arera Colony sectors E-1 to E-7 and Bittan Market.",
      notes: "Family-centric residential pizza orders."
    },
    {
      id: "ter-6",
      name: "Vijay Nagar Zone",
      regionId: "reg-4",
      regionName: "Central India",
      zoneId: "zn-5",
      zoneName: "Indore Zone",
      postalCodes: ["452010", "452011"],
      assignedFranchiseId: "fran-4",
      assignedFranchiseName: "Central Herb Bakers",
      storesCount: 3,
      deliveryRadiusKm: 8,
      ordersToday: 34,
      revenueToday: 14800,
      status: "Inactive",
      createdAt: "2026-03-12",
      description: "Vijay Nagar commercial district and C-21 Mall perimeter.",
      notes: "Temporarily suspended due to franchise shift. Reactivation pending."
    }
  ]);

  // Search, Debouncing and Filter State sync
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filteredTerritories, setFilteredTerritories] = useState(territories);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Modal and Drawer controllers
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editTerritoryData, setEditTerritoryData] = useState(null);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

  // Status Change Confirmation Modals
  const [statusChangeTarget, setStatusChangeTarget] = useState(null); // { data: territory, targetStatus: "Active" | "Inactive" }
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);

  // Calculated KPI aggregates
  const totalTerritories = territories.length;
  const activeTerritories = territories.filter((t) => t.status === "Active").length;
  const inactiveTerritories = territories.filter((t) => t.status === "Inactive").length;
  const assignedFranchisesCount = new Set(territories.map((t) => t.assignedFranchiseId).filter(Boolean)).size;
  const totalStoresMapped = territories.reduce((acc, curr) => acc + (curr.storesCount || 0), 0);
  const totalPostalCodesCovered = new Set(territories.flatMap((t) => t.postalCodes || [])).size;
  const totalOrdersToday = territories.reduce((acc, curr) => acc + (curr.ordersToday || 0), 0);
  const totalRevenueToday = territories.reduce((acc, curr) => acc + (curr.revenueToday || 0), 0);

  // Format currency
  const formatCurrency = (val) => {
    return `₹${val.toLocaleString()}`;
  };

  // CSV Exporter
  const handleDownloadCSV = () => {
    const headers = [
      "Territory ID",
      "Territory Name",
      "Parent Zone",
      "Parent Region",
      "Postal Codes",
      "Assigned Franchise",
      "Stores Count",
      "Radius (km)",
      "Orders Today",
      "Revenue Today (INR)",
      "Status",
      "Created Date"
    ];
    const rows = filteredTerritories.map((t) => [
      t.id,
      t.name,
      t.zoneName,
      t.regionName,
      (t.postalCodes || []).join(";"),
      t.assignedFranchiseName || "Unassigned",
      t.storesCount,
      t.deliveryRadiusKm,
      t.ordersToday,
      t.revenueToday,
      t.status,
      t.createdAt
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Territories_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Landscape PDF Exporter
  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(16);
    doc.text("PAPA VEG PIZZA - TERRITORY MANAGEMENT REPORT", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 21);

    const headers = [
      "ID",
      "Territory Name",
      "Zone",
      "Region",
      "Postal Codes",
      "Assigned Franchise",
      "Stores",
      "Radius",
      "Orders Today",
      "Revenue Today",
      "Status",
      "Created Date"
    ];

    const tableRows = filteredTerritories.map((t) => [
      t.id,
      t.name,
      t.zoneName,
      t.regionName,
      (t.postalCodes || []).join(", "),
      t.assignedFranchiseName || "Unassigned",
      t.storesCount,
      `${t.deliveryRadiusKm} km`,
      t.ordersToday,
      `₹${t.revenueToday.toLocaleString()}`,
      t.status,
      t.createdAt
    ]);

    autoTable(doc, {
      head: [headers],
      body: tableRows,
      startY: 28,
      theme: "striped",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [164, 60, 18] } // Match primary dark brick red
    });

    doc.save(`Territories_Export_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Submit new or updated Territory
  const handleTerritorySubmit = (payload) => {
    const targetReg = regions.find((r) => r.id === payload.regionId);
    const targetZone = zones.find((z) => z.id === payload.zoneId);
    const targetFran = franchises.find((f) => f.id === payload.assignedFranchiseId);

    const completePayload = {
      ...payload,
      id: payload.id || `ter-${Date.now().toString().slice(-4)}`,
      regionName: targetReg ? targetReg.name : "",
      zoneName: targetZone ? targetZone.name : "",
      assignedFranchiseName: targetFran ? targetFran.name : "Unassigned",
      storesCount: payload.id ? (territories.find((t) => t.id === payload.id)?.storesCount || 0) : 0,
      ordersToday: payload.id ? (territories.find((t) => t.id === payload.id)?.ordersToday || 0) : 0,
      revenueToday: payload.id ? (territories.find((t) => t.id === payload.id)?.revenueToday || 0) : 0,
      createdAt: payload.id ? (territories.find((t) => t.id === payload.id)?.createdAt || new Date().toISOString().slice(0, 10)) : new Date().toISOString().slice(0, 10)
    };

    if (editTerritoryData) {
      setTerritories((prev) => prev.map((t) => (t.id === payload.id ? completePayload : t)));
    } else {
      setTerritories((prev) => [...prev, completePayload]);
    }

    setIsAddEditModalOpen(false);
    setEditTerritoryData(null);
  };

  // Status Change Confirmation Trigger
  const triggerStatusChange = (territory, targetStatus) => {
    setStatusChangeTarget({ data: territory, targetStatus });
    setIsStatusConfirmOpen(true);
  };

  const confirmStatusChange = () => {
    if (!statusChangeTarget) return;
    const { data, targetStatus } = statusChangeTarget;
    setTerritories((prev) =>
      prev.map((t) => (t.id === data.id ? { ...t, status: targetStatus } : t))
    );
    if (selectedTerritory?.id === data.id) {
      setSelectedTerritory((prev) => ({ ...prev, status: targetStatus }));
    }
    setIsStatusConfirmOpen(false);
    setStatusChangeTarget(null);
  };

  // Reassignment Submission
  const handleReassignFranchise = (reassignData) => {
    const targetFran = franchises.find((f) => f.id === reassignData.newFranchiseId);
    setTerritories((prev) =>
      prev.map((t) =>
        t.id === reassignData.territoryId
          ? {
              ...t,
              assignedFranchiseId: reassignData.newFranchiseId,
              assignedFranchiseName: targetFran ? targetFran.name : "Unassigned",
              notes: `${t.notes || ""} [Reassigned to ${targetFran ? targetFran.name : "Unassigned"} on ${reassignData.effectiveDate} Reason: ${reassignData.reason}]`
            }
          : t
      )
    );
    if (selectedTerritory?.id === reassignData.territoryId) {
      setSelectedTerritory((prev) => ({
        ...prev,
        assignedFranchiseId: reassignData.newFranchiseId,
        assignedFranchiseName: targetFran ? targetFran.name : "Unassigned"
      }));
    }
    setIsReassignModalOpen(false);
  };

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-900 pb-3 pt-2">
        <div className="space-y-0.5">
          <h1 className="text-lg font-bold text-black dark:text-zinc-100 leading-tight">
            Territory Management
          </h1>
          <p className="text-[10px] font-bold text-black/75 dark:text-zinc-300 mt-0.5">
            Manage territories, delivery coverage, franchise assignments, and service boundaries.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 select-none">
          <button
            onClick={() => {
              setEditTerritoryData(null);
              setIsAddEditModalOpen(true);
            }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-100 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] active:scale-95 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Plus size={13} className="stroke-[3]" />
            <span>ADD TERRITORY</span>
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
              console.log("Synchronizing territory boundaries...");
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
        {/* Total Territories */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Total Territories</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-black dark:text-zinc-100">{totalTerritories}</h3>
            <span className="text-[8px] font-bold text-zinc-500">Sectors</span>
          </div>
        </div>

        {/* Active Territories */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Active</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-emerald-600 dark:text-emerald-400">{activeTerritories}</h3>
            <span className="text-[8px] font-bold text-emerald-600/80">Online</span>
          </div>
        </div>

        {/* Inactive Territories */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Inactive</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-rose-600 dark:text-rose-455">{inactiveTerritories}</h3>
            <span className="text-[8px] font-bold text-rose-500/85">Paused</span>
          </div>
        </div>

        {/* Assigned Franchises */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Franchises</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-orange-655 dark:text-orange-400">{assignedFranchisesCount}</h3>
            <span className="text-[8px] font-bold text-zinc-500">Holders</span>
          </div>
        </div>

        {/* Mapped Stores */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Mapped Stores</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-blue-600 dark:text-blue-400">{totalStoresMapped}</h3>
            <span className="text-[8px] font-bold text-blue-500/80">Outlets</span>
          </div>
        </div>

        {/* Total Postal Codes */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Postal Codes</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-purple-600 dark:text-purple-400">{totalPostalCodesCovered}</h3>
            <span className="text-[8px] font-bold text-zinc-500">PINs Cover</span>
          </div>
        </div>

        {/* Orders Today */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Orders Today</span>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-base font-black text-black dark:text-zinc-100">{totalOrdersToday}</h3>
            <span className="text-[8px] font-bold text-zinc-500">Sales qty</span>
          </div>
        </div>

        {/* Revenue Today */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-900 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <span className="text-[9px] font-bold text-black/60 dark:text-zinc-400 uppercase tracking-wider block truncate">Revenue Today</span>
          <div className="mt-2 flex flex-col">
            <h3 className="text-xs font-black text-[var(--primary)]">{formatCurrency(totalRevenueToday)}</h3>
            <span className="text-[7px] font-bold text-emerald-600">INR flow</span>
          </div>
        </div>
      </div>

      {/* Main Grid, Search & Filters component */}
      <TerritoryManagementData
        regions={regions}
        zones={zones}
        franchises={franchises}
        territories={territories}
        setTerritories={setTerritories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        debouncedSearchQuery={debouncedSearchQuery}
        onFilteredTerritoriesChange={setFilteredTerritories}
        setSelectedTerritory={setSelectedTerritory}
        setIsDetailsDrawerOpen={setIsDetailsDrawerOpen}
        setEditTerritoryData={setEditTerritoryData}
        setIsAddEditModalOpen={setIsAddEditModalOpen}
        setIsReassignModalOpen={setIsReassignModalOpen}
        setIsAnalyticsModalOpen={setIsAnalyticsModalOpen}
        triggerStatusChange={triggerStatusChange}
      />

      {/* View Details Drawer */}
      <TerritoryDetails
        isOpen={isDetailsDrawerOpen}
        onClose={() => setIsDetailsDrawerOpen(false)}
        territory={selectedTerritory}
        franchises={franchises}
        onEdit={(t) => {
          setIsDetailsDrawerOpen(false);
          setEditTerritoryData(t);
          setIsAddEditModalOpen(true);
        }}
        onReassign={(t) => {
          setIsDetailsDrawerOpen(false);
          setSelectedTerritory(t);
          setIsReassignModalOpen(true);
        }}
        onAnalytics={(t) => {
          setIsDetailsDrawerOpen(false);
          setSelectedTerritory(t);
          setIsAnalyticsModalOpen(true);
        }}
        onStatusToggle={(t) => {
          const nextStatus = t.status === "Active" ? "Inactive" : "Active";
          triggerStatusChange(t, nextStatus);
        }}
      />

      {/* Add / Edit Territory Wizard Modal */}
      <AddEditTerritoryModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSubmit={handleTerritorySubmit}
        regions={regions}
        zones={zones}
        franchises={franchises}
        existingTerritories={territories}
        editTerritory={editTerritoryData}
      />

      {/* Reassign Franchise Modal */}
      <ReassignFrassignModal
        isOpen={isReassignModalOpen}
        onClose={() => setIsReassignModalOpen(false)}
        onSubmit={handleReassignFranchise}
        territory={selectedTerritory}
        franchises={franchises}
      />

      {/* Analytics Modal */}
      <TerritoryAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        territory={selectedTerritory}
      />

      {/* Activate / Deactivate Confirmation dialog */}
      {isStatusConfirmOpen && statusChangeTarget && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[70] flex items-center justify-center p-4 lg:pl-[280px]" id="status-confirm-modal">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 animate-scaleUp">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-zinc-200">
                {statusChangeTarget.targetStatus === "Inactive" ? "Deactivate Territory" : "Activate Territory"}
              </h3>
              <button
                onClick={() => setIsStatusConfirmOpen(false)}
                className="text-black dark:text-zinc-300 hover:text-[var(--primary)] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 text-xs font-semibold text-black dark:text-zinc-300 space-y-3">
              {statusChangeTarget.targetStatus === "Inactive" ? (
                <p className="leading-relaxed">
                  Deactivating this territory will prevent new operational assignments while preserving historical data. Existing store mappings and franchises will remain intact.
                </p>
              ) : (
                <p className="leading-relaxed">
                  Activating this territory will restore normal operations, allowing store allocations and delivery dispatch bounds to function as active.
                </p>
              )}
            </div>
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-end gap-3 select-none">
              <button
                onClick={() => setIsStatusConfirmOpen(false)}
                className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-300 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`px-4 py-1.5 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer ${
                  statusChangeTarget.targetStatus === "Inactive"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-750"
                }`}
              >
                {statusChangeTarget.targetStatus === "Inactive" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline fallback renaming for spelling sanity
const ReassignFrassignModal = ReassignFranchiseModal;
