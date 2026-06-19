import React, { useState, useEffect } from "react";
import {
  Filter,
  ChevronDown,
  Sliders,
  CheckSquare,
  Square,
  Eye,
  Edit2,
  RefreshCw,
  TrendingUp,
  MapPin,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function TerritoryManagementData({
  regions,
  zones,
  franchises,
  territories,
  setTerritories,
  searchQuery,
  setSearchQuery,
  debouncedSearchQuery,
  onFilteredTerritoriesChange,
  setSelectedTerritory,
  setIsDetailsDrawerOpen,
  setEditTerritoryData,
  setIsAddEditModalOpen,
  setIsReassignModalOpen,
  setIsAnalyticsModalOpen,
  triggerStatusChange
}) {
  // Advanced Filter toggle
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Advanced Filter states
  const [filterName, setFilterName] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterZone, setFilterZone] = useState("");
  const [filterFranchise, setFilterFranchise] = useState("");
  const [filterPostalCode, setFilterPostalCode] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMinRadius, setFilterMinRadius] = useState("");
  const [filterMaxRadius, setFilterMaxRadius] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    zone: true,
    region: true,
    postalCodes: true,
    franchise: true,
    stores: true,
    radius: true,
    orders: true,
    revenue: true,
    status: true,
    created: true
  });
  const [isColDropdownOpen, setIsColDropdownOpen] = useState(false);

  // Bulk selections
  const [selectedIds, setSelectedIds] = useState([]);

  // Sorting
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handles sorting column header clicks
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Cascading drop-down: Filter zones by selected region
  const filteredZonesDropdown = filterRegion
    ? zones.filter((z) => z.regionId === filterRegion)
    : zones;

  // Filter & Search Logic
  const filteredTerritories = territories
    .filter((t) => {
      // 1. Text Search Box (searches Territory Name, Region, Zone, Postal Code, Franchise)
      const matchesSearch =
        !debouncedSearchQuery ||
        t.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        t.regionName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        t.zoneName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        t.assignedFranchiseName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        t.postalCodes.some((code) => code.includes(debouncedSearchQuery));

      // 2. Advanced Filters
      const matchesName = !filterName || t.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesRegion = !filterRegion || t.regionId === filterRegion;
      const matchesZone = !filterZone || t.zoneId === filterZone;
      const matchesFranchise = !filterFranchise || t.assignedFranchiseId === filterFranchise;
      const matchesPostalCode =
        !filterPostalCode || t.postalCodes.some((code) => code.includes(filterPostalCode));
      const matchesStatus = !filterStatus || t.status === filterStatus;
      const matchesMinRadius =
        !filterMinRadius || t.deliveryRadiusKm >= parseFloat(filterMinRadius);
      const matchesMaxRadius =
        !filterMaxRadius || t.deliveryRadiusKm <= parseFloat(filterMaxRadius);
      const matchesDate = !filterDate || t.createdAt === filterDate;

      return (
        matchesSearch &&
        matchesName &&
        matchesRegion &&
        matchesZone &&
        matchesFranchise &&
        matchesPostalCode &&
        matchesStatus &&
        matchesMinRadius &&
        matchesMaxRadius &&
        matchesDate
      );
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle custom sorting cases (arrays or strings)
      if (sortField === "postalCodes") {
        valA = a.postalCodes.length;
        valB = b.postalCodes.length;
      }

      let comparison = 0;
      if (typeof valA === "string") {
        comparison = valA.localeCompare(valB);
      } else {
        comparison = (valA || 0) - (valB || 0);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Report filtered data back to parent for CSV/PDF downloads
  useEffect(() => {
    if (onFilteredTerritoriesChange) {
      onFilteredTerritoriesChange(filteredTerritories);
    }
  }, [
    territories,
    debouncedSearchQuery,
    filterName,
    filterRegion,
    filterZone,
    filterFranchise,
    filterPostalCode,
    filterStatus,
    filterMinRadius,
    filterMaxRadius,
    filterDate,
    sortField,
    sortDirection
  ]);

  // Paginated chunk
  const paginatedTerritories = filteredTerritories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredTerritories.length / itemsPerPage);

  // Bulk Selection Handlers
  const handleToggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredTerritories.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleBulkDeactivate = () => {
    if (selectedIds.length === 0) return;
    setTerritories((prev) =>
      prev.map((t) => (selectedIds.includes(t.id) ? { ...t, status: "Inactive" } : t))
    );
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4">
      {/* Collapsible Advanced Filters */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full p-3.5 flex justify-between items-center font-bold text-xs text-black dark:text-zinc-100 bg-zinc-50/50 dark:bg-zinc-900/40 select-none cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[var(--primary)]" />
            <span>ADVANCED SEARCH & OPERATIONAL FILTERS</span>
          </div>
          <ChevronDown
            size={14}
            className={`transition-transform duration-250 ${isFilterOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isFilterOpen && (
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-zinc-950 animate-fadeIn">
            {/* Territory Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Territory Name
              </label>
              <input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="e.g. Bandra West"
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
              />
            </div>

            {/* Region */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Region
              </label>
              <select
                value={filterRegion}
                onChange={(e) => {
                  setFilterRegion(e.target.value);
                  setFilterZone(""); // Reset zone cascadingly
                }}
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
              >
                <option value="">All Regions</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Zone
              </label>
              <select
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
              >
                <option value="">All Zones</option>
                {filteredZonesDropdown.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Franchise */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Assigned Franchise
              </label>
              <select
                value={filterFranchise}
                onChange={(e) => setFilterFranchise(e.target.value)}
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
              >
                <option value="">All Franchises</option>
                {franchises.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Postal Code */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Postal PIN Code
              </label>
              <input
                type="text"
                value={filterPostalCode}
                onChange={(e) => setFilterPostalCode(e.target.value)}
                placeholder="e.g. 400050"
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
              />
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Delivery Radius Range */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Radius Range (km)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filterMinRadius}
                  onChange={(e) => setFilterMinRadius(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filterMaxRadius}
                  onChange={(e) => setFilterMaxRadius(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                />
              </div>
            </div>

            {/* Date Created */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                Date Created
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
              />
            </div>

            {/* Filters action buttons */}
            <div className="col-span-1 md:col-span-4 flex justify-end gap-2.5 pt-2 select-none">
              <button
                onClick={() => {
                  setFilterName("");
                  setFilterRegion("");
                  setFilterZone("");
                  setFilterFranchise("");
                  setFilterPostalCode("");
                  setFilterStatus("");
                  setFilterMinRadius("");
                  setFilterMaxRadius("");
                  setFilterDate("");
                  setSearchQuery("");
                }}
                className="px-4 py-1.5 bg-zinc-150 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-200 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg text-xs font-bold hover:scale-[1.01] transition-all cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid Data Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm relative">
        {/* Table Controls */}
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center select-none">
          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 p-1 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg px-2">
                <span className="text-[10px] font-black text-[var(--primary)]">
                  {selectedIds.length} Selected
                </span>
                <button
                  onClick={handleBulkDeactivate}
                  className="text-rose-650 hover:text-rose-700 cursor-pointer text-[10px] font-bold"
                >
                  Bulk Deactivate
                </button>
              </div>
            )}
          </div>

          {/* Columns Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsColDropdownOpen(!isColDropdownOpen)}
              className="p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer font-bold text-[10px]"
            >
              <Sliders size={12} />
              <span>COLUMNS</span>
            </button>
            {isColDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-900 rounded-lg shadow-xl z-20 p-2 space-y-1 animate-scaleUp">
                {Object.keys(visibleColumns).map((col) => (
                  <div
                    key={col}
                    onClick={() =>
                      setVisibleColumns({ ...visibleColumns, [col]: !visibleColumns[col] })
                    }
                    className="flex items-center justify-between p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded cursor-pointer text-xs font-semibold select-none text-black dark:text-zinc-100"
                  >
                    <span className="capitalize">{col.replace(/([A-Z])/g, " $1")}</span>
                    {visibleColumns[col] ? (
                      <CheckSquare size={13} className="text-[var(--primary)]" />
                    ) : (
                      <Square size={13} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scrollable grid viewport */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left text-xs font-semibold">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 select-none">
                <th className="p-3 w-8">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredTerritories.length &&
                      filteredTerritories.length > 0
                    }
                    onChange={(e) => handleToggleSelectAll(e.target.checked)}
                    className="rounded text-[var(--primary)] focus:ring-0 cursor-pointer"
                  />
                </th>
                {visibleColumns.name && (
                  <th
                    onClick={() => handleSort("name")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100"
                  >
                    Territory Name
                  </th>
                )}
                {visibleColumns.zone && (
                  <th
                    onClick={() => handleSort("zoneName")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100"
                  >
                    Zone
                  </th>
                )}
                {visibleColumns.region && (
                  <th
                    onClick={() => handleSort("regionName")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100"
                  >
                    Region
                  </th>
                )}
                {visibleColumns.postalCodes && (
                  <th
                    onClick={() => handleSort("postalCodes")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100"
                  >
                    Postal Codes
                  </th>
                )}
                {visibleColumns.franchise && (
                  <th
                    onClick={() => handleSort("assignedFranchiseName")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100"
                  >
                    Assigned Franchise
                  </th>
                )}
                {visibleColumns.stores && (
                  <th
                    onClick={() => handleSort("storesCount")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center"
                  >
                    Stores
                  </th>
                )}
                {visibleColumns.radius && (
                  <th
                    onClick={() => handleSort("deliveryRadiusKm")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center"
                  >
                    Radius
                  </th>
                )}
                {visibleColumns.orders && (
                  <th
                    onClick={() => handleSort("ordersToday")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center"
                  >
                    Orders Today
                  </th>
                )}
                {visibleColumns.revenue && (
                  <th
                    onClick={() => handleSort("revenueToday")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-right"
                  >
                    Revenue Today
                  </th>
                )}
                {visibleColumns.status && (
                  <th
                    onClick={() => handleSort("status")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center"
                  >
                    Status
                  </th>
                )}
                {visibleColumns.created && (
                  <th
                    onClick={() => handleSort("createdAt")}
                    className="p-3 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center"
                  >
                    Created Date
                  </th>
                )}
                <th className="p-3 text-right text-black dark:text-zinc-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-black dark:text-zinc-100 bg-white dark:bg-zinc-900">
              {paginatedTerritories.length > 0 ? (
                paginatedTerritories.map((t) => {
                  const isChecked = selectedIds.includes(t.id);
                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectRow(t.id)}
                          className="rounded text-[var(--primary)] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      {visibleColumns.name && (
                        <td
                          className="p-3 font-bold text-black dark:text-zinc-100 hover:text-[var(--primary)] cursor-pointer"
                          onClick={() => {
                            setSelectedTerritory(t);
                            setIsDetailsDrawerOpen(true);
                          }}
                        >
                          {t.name}
                        </td>
                      )}
                      {visibleColumns.zone && (
                        <td className="p-3 text-zinc-500 dark:text-zinc-400">{t.zoneName}</td>
                      )}
                      {visibleColumns.region && (
                        <td className="p-3 text-zinc-500 dark:text-zinc-400">{t.regionName}</td>
                      )}
                      {visibleColumns.postalCodes && (
                        <td className="p-3 text-zinc-650 dark:text-zinc-350">
                          <div className="flex flex-wrap gap-1">
                            {t.postalCodes.slice(0, 3).map((code) => (
                              <span
                                key={code}
                                className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-850 rounded text-[10px] font-bold"
                              >
                                {code}
                              </span>
                            ))}
                            {t.postalCodes.length > 3 && (
                              <span className="text-[9px] font-black text-zinc-400">
                                +{t.postalCodes.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                      )}
                      {visibleColumns.franchise && (
                        <td className="p-3 font-bold text-zinc-700 dark:text-zinc-300">
                          {t.assignedFranchiseName || "Unassigned"}
                        </td>
                      )}
                      {visibleColumns.stores && (
                        <td className="p-3 text-center font-bold text-zinc-750 dark:text-zinc-250">
                          {t.storesCount}
                        </td>
                      )}
                      {visibleColumns.radius && (
                        <td className="p-3 text-center text-zinc-500 dark:text-zinc-400">
                          {t.deliveryRadiusKm} km
                        </td>
                      )}
                      {visibleColumns.orders && (
                        <td className="p-3 text-center font-black text-black dark:text-zinc-200">
                          {t.ordersToday}
                        </td>
                      )}
                      {visibleColumns.revenue && (
                        <td className="p-3 text-right font-black text-emerald-600 dark:text-emerald-450">
                          ₹{t.revenueToday.toLocaleString()}
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${
                              t.status === "Active"
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                                : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-450"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                      )}
                      {visibleColumns.created && (
                        <td className="p-3 text-center text-zinc-500 dark:text-zinc-400 font-bold">
                          {t.createdAt}
                        </td>
                      )}
                      <td className="p-3 text-right space-x-1.5 select-none whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedTerritory(t);
                            setIsDetailsDrawerOpen(true);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-blue-600 dark:text-blue-450 cursor-pointer inline-flex"
                          title="View Details"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => {
                            setEditTerritoryData(t);
                            setIsAddEditModalOpen(true);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-black dark:text-zinc-300 cursor-pointer inline-flex"
                          title="Edit Territory"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTerritory(t);
                            setIsReassignModalOpen(true);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-orange-600 dark:text-orange-450 cursor-pointer inline-flex"
                          title="Reassign Franchise"
                        >
                          <RefreshCw size={13} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTerritory(t);
                            setIsAnalyticsModalOpen(true);
                          }}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-purple-650 dark:text-purple-400 cursor-pointer inline-flex"
                          title="View Analytics"
                        >
                          <TrendingUp size={13} />
                        </button>
                        {t.status === "Active" ? (
                          <button
                            onClick={() => triggerStatusChange(t, "Inactive")}
                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-rose-600 dark:text-rose-400 cursor-pointer inline-flex"
                            title="Deactivate Territory"
                          >
                            <Trash2 size={13} />
                          </button>
                        ) : (
                          <button
                            onClick={() => triggerStatusChange(t, "Active")}
                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-emerald-600 dark:text-emerald-450 cursor-pointer inline-flex"
                            title="Activate Territory"
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={13} className="p-6 text-center text-zinc-500 font-bold">
                    No territories found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        {totalPages > 1 && (
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs select-none">
            <span className="text-zinc-500 font-bold">
              Showing {paginatedTerritories.length} of {filteredTerritories.length} Territories
            </span>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-black dark:text-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors font-bold cursor-pointer"
              >
                Prev
              </button>
              <span className="px-3 py-1 flex items-center font-black">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-black dark:text-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors font-bold cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
