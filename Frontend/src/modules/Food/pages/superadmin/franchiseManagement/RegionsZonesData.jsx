import React, { useState, useEffect } from "react";
import {
  Filter,
  ChevronDown,
  Sliders,
  CheckSquare,
  Square,
  Eye,
  Trash2,
  CheckCircle,
  Milestone
} from "lucide-react";

export default function RegionsZonesData({
  activeTab,
  regions,
  setRegions,
  zones,
  setZones,
  setSelectedRegion,
  setIsRegionDrawerOpen,
  setSelectedZone,
  setIsZoneDrawerOpen,
  setEditRegionData,
  setIsRegionModalOpen,
  setEditZoneData,
  setIsZoneModalOpen,
  setIsAssignTerritoryOpen,
  triggerArchiveConfirm,
  activateRecord,
  regionsSearch,
  setRegionsSearch,
  regionsDebouncedSearch,
  zonesSearch,
  setZonesSearch,
  zonesDebouncedSearch,
  onFilteredRegionsChange,
  onFilteredZonesChange
}) {
  // Region Filters state
  const [isRegionsFilterOpen, setIsRegionsFilterOpen] = useState(false);
  const [regionFilterName, setRegionFilterName] = useState("");
  const [regionFilterCountry, setRegionFilterCountry] = useState("");
  const [regionFilterStatus, setRegionFilterStatus] = useState("");
  const [regionFilterDate, setRegionFilterDate] = useState("");
  const [regionMinFranchises, setRegionMinFranchises] = useState("");
  const [regionMaxFranchises, setRegionMaxFranchises] = useState("");
  const [regionMinStores, setRegionMinStores] = useState("");
  const [regionMaxStores, setRegionMaxStores] = useState("");

  // Zone Filters state
  const [isZonesFilterOpen, setIsZonesFilterOpen] = useState(false);
  const [zoneFilterName, setZoneFilterName] = useState("");
  const [zoneFilterRegion, setZoneFilterRegion] = useState("");
  const [zoneFilterStatus, setZoneFilterStatus] = useState("");
  const [zoneFilterDate, setZoneFilterDate] = useState("");
  const [zoneMinTerritories, setZoneMinTerritories] = useState("");
  const [zoneMaxTerritories, setZoneMaxTerritories] = useState("");
  const [zoneMinStores, setZoneMinStores] = useState("");
  const [zoneMaxStores, setZoneMaxStores] = useState("");

  // Column Visibility state
  const [regionsVisibleColumns, setRegionsVisibleColumns] = useState({
    name: true,
    country: true,
    zones: true,
    franchises: true,
    stores: true,
    revenue: true,
    status: true,
    created: true
  });
  const [isRegionsColDropdownOpen, setIsRegionsColDropdownOpen] = useState(false);

  const [zonesVisibleColumns, setZonesVisibleColumns] = useState({
    name: true,
    region: true,
    territories: true,
    franchises: true,
    stores: true,
    orders: true,
    revenue: true,
    status: true,
    created: true
  });
  const [isZonesColDropdownOpen, setIsZonesColDropdownOpen] = useState(false);

  // Bulk Selection state
  const [selectedRegionIds, setSelectedRegionIds] = useState([]);
  const [selectedZoneIds, setSelectedZoneIds] = useState([]);

  // Sorting state
  const [regionsSortField, setRegionsSortField] = useState("name");
  const [regionsSortDirection, setRegionsSortDirection] = useState("asc");

  const [zonesSortField, setZonesSortField] = useState("name");
  const [zonesSortDirection, setZonesSortDirection] = useState("asc");

  // Pagination state
  const [regionsPage, setRegionsPage] = useState(1);
  const [zonesPage, setZonesPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting handlers
  const handleRegionsSort = (field) => {
    if (regionsSortField === field) {
      setRegionsSortDirection(regionsSortDirection === "asc" ? "desc" : "asc");
    } else {
      setRegionsSortField(field);
      setRegionsSortDirection("asc");
    }
  };

  const handleZonesSort = (field) => {
    if (zonesSortField === field) {
      setZonesSortDirection(zonesSortDirection === "asc" ? "desc" : "asc");
    } else {
      setZonesSortField(field);
      setZonesSortDirection("asc");
    }
  };

  // Filter Logic: Regions
  const filteredRegions = regions
    .filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(regionsDebouncedSearch.toLowerCase()) ||
        r.country.toLowerCase().includes(regionsDebouncedSearch.toLowerCase());
      const matchesName = !regionFilterName || r.name.toLowerCase().includes(regionFilterName.toLowerCase());
      const matchesCountry = !regionFilterCountry || r.country.toLowerCase().includes(regionFilterCountry.toLowerCase());
      const matchesStatus = !regionFilterStatus || r.status === regionFilterStatus;
      const matchesDate = !regionFilterDate || r.createdDate === regionFilterDate;
      const matchesMinFranchise = !regionMinFranchises || r.franchisesCount >= parseInt(regionMinFranchises, 10);
      const matchesMaxFranchise = !regionMaxFranchises || r.franchisesCount <= parseInt(regionMaxFranchises, 10);
      const matchesMinStores = !regionMinStores || r.storesCount >= parseInt(regionMinStores, 10);
      const matchesMaxStores = !regionMaxStores || r.storesCount <= parseInt(regionMaxStores, 10);

      return (
        matchesSearch &&
        matchesName &&
        matchesCountry &&
        matchesStatus &&
        matchesDate &&
        matchesMinFranchise &&
        matchesMaxFranchise &&
        matchesMinStores &&
        matchesMaxStores
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (typeof a[regionsSortField] === "string") {
        comparison = a[regionsSortField].localeCompare(b[regionsSortField]);
      } else {
        comparison = a[regionsSortField] - b[regionsSortField];
      }
      return regionsSortDirection === "asc" ? comparison : -comparison;
    });

  // Filter Logic: Zones
  const filteredZones = zones
    .filter((z) => {
      const matchesSearch =
        z.name.toLowerCase().includes(zonesDebouncedSearch.toLowerCase()) ||
        z.regionName.toLowerCase().includes(zonesDebouncedSearch.toLowerCase());
      const matchesName = !zoneFilterName || z.name.toLowerCase().includes(zoneFilterName.toLowerCase());
      const matchesRegion = !zoneFilterRegion || z.regionId === zoneFilterRegion;
      const matchesStatus = !zoneFilterStatus || z.status === zoneFilterStatus;
      const matchesDate = !zoneFilterDate || z.createdDate === zoneFilterDate;
      const matchesMinTerritories = !zoneMinTerritories || z.territoriesCount >= parseInt(zoneMinTerritories, 10);
      const matchesMaxTerritories = !zoneMaxTerritories || z.territoriesCount <= parseInt(zoneMaxTerritories, 10);
      const matchesMinStores = !zoneMinStores || z.storesCount >= parseInt(zoneMinStores, 10);
      const matchesMaxStores = !zoneMaxStores || z.storesCount <= parseInt(zoneMaxStores, 10);

      return (
        matchesSearch &&
        matchesName &&
        matchesRegion &&
        matchesStatus &&
        matchesDate &&
        matchesMinTerritories &&
        matchesMaxTerritories &&
        matchesMinStores &&
        matchesMaxStores
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (typeof a[zonesSortField] === "string") {
        comparison = a[zonesSortField].localeCompare(b[zonesSortField]);
      } else {
        comparison = a[zonesSortField] - b[zonesSortField];
      }
      return zonesSortDirection === "asc" ? comparison : -comparison;
    });

  // Report changes to parent
  useEffect(() => {
    if (onFilteredRegionsChange) {
      onFilteredRegionsChange(filteredRegions);
    }
  }, [regions, regionsDebouncedSearch, regionFilterName, regionFilterCountry, regionFilterStatus, regionFilterDate, regionMinFranchises, regionMaxFranchises, regionMinStores, regionMaxStores, regionsSortField, regionsSortDirection]);

  useEffect(() => {
    if (onFilteredZonesChange) {
      onFilteredZonesChange(filteredZones);
    }
  }, [zones, zonesDebouncedSearch, zoneFilterName, zoneFilterRegion, zoneFilterStatus, zoneFilterDate, zoneMinTerritories, zoneMaxTerritories, zoneMinStores, zoneMaxStores, zonesSortField, zonesSortDirection]);

  // Paginated slices
  const paginatedRegions = filteredRegions.slice((regionsPage - 1) * itemsPerPage, regionsPage * itemsPerPage);
  const paginatedZones = filteredZones.slice((zonesPage - 1) * itemsPerPage, zonesPage * itemsPerPage);

  const totalRegionsPages = Math.ceil(filteredRegions.length / itemsPerPage);
  const totalZonesPages = Math.ceil(filteredZones.length / itemsPerPage);

  // Bulk selectors
  const handleToggleSelectRegion = (id) => {
    setSelectedRegionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllRegions = (checked) => {
    if (checked) {
      setSelectedRegionIds(filteredRegions.map((r) => r.id));
    } else {
      setSelectedRegionIds([]);
    }
  };

  const handleToggleSelectZone = (id) => {
    setSelectedZoneIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllZones = (checked) => {
    if (checked) {
      setSelectedZoneIds(filteredZones.map((z) => z.id));
    } else {
      setSelectedZoneIds([]);
    }
  };

  return (
    <div className="space-y-4">
      {activeTab === "regions" ? (
        <div className="space-y-4">
          {/* Collapsible Filter Panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setIsRegionsFilterOpen(!isRegionsFilterOpen)}
              className="w-full p-3.5 flex justify-between items-center font-bold text-xs text-black dark:text-zinc-100 bg-zinc-50/50 dark:bg-zinc-900/40 select-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-[var(--primary)]" />
                <span>ADVANCED SEARCH & FILTER OPTIONS</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-250 ${isRegionsFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {isRegionsFilterOpen && (
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-zinc-950 animate-fadeIn">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Region Name</label>
                  <input
                    type="text"
                    value={regionFilterName}
                    onChange={(e) => setRegionFilterName(e.target.value)}
                    placeholder="e.g. North India"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Country</label>
                  <input
                    type="text"
                    value={regionFilterCountry}
                    onChange={(e) => setRegionFilterCountry(e.target.value)}
                    placeholder="e.g. India"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Status</label>
                  <select
                    value={regionFilterStatus}
                    onChange={(e) => setRegionFilterStatus(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Date Created</label>
                  <input
                    type="date"
                    value={regionFilterDate}
                    onChange={(e) => setRegionFilterDate(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Franchise Count Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={regionMinFranchises}
                      onChange={(e) => setRegionMinFranchises(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={regionMaxFranchises}
                      onChange={(e) => setRegionMaxFranchises(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Store Count Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={regionMinStores}
                      onChange={(e) => setRegionMinStores(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={regionMaxStores}
                      onChange={(e) => setRegionMaxStores(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3 flex justify-end gap-2.5 pt-2 select-none">
                  <button
                    onClick={() => {
                      setRegionFilterName("");
                      setRegionFilterCountry("");
                      setRegionFilterStatus("");
                      setRegionFilterDate("");
                      setRegionMinFranchises("");
                      setRegionMaxFranchises("");
                      setRegionMinStores("");
                      setRegionMaxStores("");
                    }}
                    className="px-4 py-1.5 bg-zinc-150 dark:bg-zinc-850 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-200 cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsRegionsFilterOpen(false)}
                    className="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg text-xs font-bold hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Regions Data Table */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm relative">
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center select-none">
              <div className="flex items-center gap-3">
                {selectedRegionIds.length > 0 && (
                  <div className="flex items-center gap-2 p-1 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg px-2">
                    <span className="text-[10px] font-black text-[var(--primary)]">{selectedRegionIds.length} Selected</span>
                    <button
                      onClick={() => {
                        setRegions((prev) => prev.map((r) => selectedRegionIds.includes(r.id) ? { ...r, status: "Archived" } : r));
                        setSelectedRegionIds([]);
                      }}
                      className="text-rose-600 hover:text-rose-700 cursor-pointer text-[10px] font-bold"
                    >
                      Archive Selected
                    </button>
                  </div>
                )}
              </div>

              {/* Column dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsRegionsColDropdownOpen(!isRegionsColDropdownOpen)}
                  className="p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer font-bold text-[10px]"
                >
                  <Sliders size={12} />
                  <span>COLUMNS</span>
                </button>
                {isRegionsColDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-900 rounded-lg shadow-xl z-20 p-2 space-y-1 animate-scaleUp">
                    {Object.keys(regionsVisibleColumns).map((col) => (
                      <div
                        key={col}
                        onClick={() => setRegionsVisibleColumns({ ...regionsVisibleColumns, [col]: !regionsVisibleColumns[col] })}
                        className="flex items-center justify-between p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded cursor-pointer text-xs font-semibold select-none text-black dark:text-zinc-100"
                      >
                        <span className="capitalize">{col}</span>
                        {regionsVisibleColumns[col] ? <CheckSquare size={13} className="text-[var(--primary)]" /> : <Square size={13} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full border-collapse text-left text-xs font-semibold">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 select-none">
                    <th className="p-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedRegionIds.length === filteredRegions.length && filteredRegions.length > 0}
                        onChange={(e) => handleToggleSelectAllRegions(e.target.checked)}
                        className="rounded text-[var(--primary)] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    {regionsVisibleColumns.name && (
                      <th onClick={() => handleRegionsSort("name")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100">
                        Region Name
                      </th>
                    )}
                    {regionsVisibleColumns.country && (
                      <th onClick={() => handleRegionsSort("country")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100">
                        Country
                      </th>
                    )}
                    {regionsVisibleColumns.zones && (
                      <th onClick={() => handleRegionsSort("zonesCount")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Total Zones
                      </th>
                    )}
                    {regionsVisibleColumns.franchises && (
                      <th onClick={() => handleRegionsSort("franchisesCount")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Franchises
                      </th>
                    )}
                    {regionsVisibleColumns.stores && (
                      <th onClick={() => handleRegionsSort("storesCount")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Stores
                      </th>
                    )}
                    {regionsVisibleColumns.revenue && (
                      <th onClick={() => handleRegionsSort("revenue")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-right">
                        Revenue
                      </th>
                    )}
                    {regionsVisibleColumns.status && (
                      <th onClick={() => handleRegionsSort("status")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Status
                      </th>
                    )}
                    {regionsVisibleColumns.created && (
                      <th onClick={() => handleRegionsSort("createdDate")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Created Date
                      </th>
                    )}
                    <th className="p-3 text-right text-black dark:text-zinc-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-black dark:text-zinc-100">
                  {paginatedRegions.length > 0 ? (
                    paginatedRegions.map((r) => {
                      const isChecked = selectedRegionIds.includes(r.id);
                      return (
                        <tr key={r.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleSelectRegion(r.id)}
                              className="rounded text-[var(--primary)] focus:ring-0 cursor-pointer"
                            />
                          </td>
                          {regionsVisibleColumns.name && (
                            <td className="p-3 font-bold text-black dark:text-zinc-100 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] cursor-pointer" onClick={() => { setSelectedRegion(r); setIsRegionDrawerOpen(true); }}>
                              {r.name}
                            </td>
                          )}
                          {regionsVisibleColumns.country && <td className="p-3 text-zinc-500 dark:text-zinc-400">{r.country}</td>}
                          {regionsVisibleColumns.zones && <td className="p-3 text-center font-bold text-zinc-700 dark:text-zinc-300">{r.zonesCount}</td>}
                          {regionsVisibleColumns.franchises && <td className="p-3 text-center font-bold text-zinc-700 dark:text-zinc-300">{r.franchisesCount}</td>}
                          {regionsVisibleColumns.stores && <td className="p-3 text-center font-bold text-zinc-700 dark:text-zinc-300">{r.storesCount}</td>}
                          {regionsVisibleColumns.revenue && <td className="p-3 text-right font-black text-black dark:text-zinc-100">₹{r.revenue.toLocaleString()}</td>}
                          {regionsVisibleColumns.status && (
                            <td className="p-3 text-center">
                              <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded ${
                                r.status === "Active"
                                  ? "bg-emerald-550/10 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400"
                              }`}>
                                {r.status}
                              </span>
                            </td>
                          )}
                          {regionsVisibleColumns.created && <td className="p-3 text-center text-zinc-500 dark:text-zinc-400 font-bold">{r.createdDate}</td>}
                          <td className="p-3 text-right space-x-1.5 select-none">
                            <button
                              onClick={() => {
                                setSelectedRegion(r);
                                setIsRegionDrawerOpen(true);
                              }}
                              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-blue-600 dark:text-blue-400 cursor-pointer inline-flex"
                              title="View Details"
                            >
                              <Eye size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setEditRegionData(r);
                                setIsRegionModalOpen(true);
                              }}
                              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-black dark:text-zinc-300 cursor-pointer inline-flex"
                              title="Edit Region"
                            >
                              <Sliders size={13} />
                            </button>
                            {r.status === "Active" ? (
                              <button
                                onClick={() => triggerArchiveConfirm("region", r)}
                                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-rose-600 dark:text-rose-400 cursor-pointer inline-flex"
                                title="Archive Region"
                              >
                                <Trash2 size={13} />
                              </button>
                            ) : (
                              <button
                                onClick={() => activateRecord("region", r)}
                                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-emerald-600 dark:text-emerald-450 cursor-pointer inline-flex"
                                title="Activate Region"
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
                      <td colSpan={10} className="p-6 text-center text-zinc-500 font-bold">No regions found matching criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            {totalRegionsPages > 1 && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs select-none">
                <span className="text-zinc-500 font-bold">Showing {paginatedRegions.length} of {filteredRegions.length} Regions</span>
                <div className="flex gap-1">
                  <button
                    disabled={regionsPage === 1}
                    onClick={() => setRegionsPage(regionsPage - 1)}
                    className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-black dark:text-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors font-bold cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1 flex items-center font-black">{regionsPage} / {totalRegionsPages}</span>
                  <button
                    disabled={regionsPage === totalRegionsPages}
                    onClick={() => setRegionsPage(regionsPage + 1)}
                    className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-black dark:text-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors font-bold cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Collapsible Filter Panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setIsZonesFilterOpen(!isZonesFilterOpen)}
              className="w-full p-3.5 flex justify-between items-center font-bold text-xs text-black dark:text-zinc-100 bg-zinc-50/50 dark:bg-zinc-900/40 select-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-[var(--primary)]" />
                <span>ADVANCED ZONES SEARCH & FILTERS</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-250 ${isZonesFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {isZonesFilterOpen && (
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-zinc-950 animate-fadeIn">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Zone Name</label>
                  <input
                    type="text"
                    value={zoneFilterName}
                    onChange={(e) => setZoneFilterName(e.target.value)}
                    placeholder="e.g. Mumbai Zone"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Parent Region</label>
                  <select
                    value={zoneFilterRegion}
                    onChange={(e) => setZoneFilterRegion(e.target.value)}
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
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Status</label>
                  <select
                    value={zoneFilterStatus}
                    onChange={(e) => setZoneFilterStatus(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Date Created</label>
                  <input
                    type="date"
                    value={zoneFilterDate}
                    onChange={(e) => setZoneFilterDate(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Territory Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={zoneMinTerritories}
                      onChange={(e) => setZoneMinTerritories(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={zoneMaxTerritories}
                      onChange={(e) => setZoneMaxTerritories(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Store Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={zoneMinStores}
                      onChange={(e) => setZoneMinStores(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={zoneMaxStores}
                      onChange={(e) => setZoneMaxStores(e.target.value)}
                      className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none"
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3 flex justify-end gap-2.5 pt-2 select-none">
                  <button
                    onClick={() => {
                      setZoneFilterName("");
                      setZoneFilterRegion("");
                      setZoneFilterStatus("");
                      setZoneFilterDate("");
                      setZoneMinTerritories("");
                      setZoneMaxTerritories("");
                      setZoneMinStores("");
                      setZoneMaxStores("");
                    }}
                    className="px-4 py-1.5 bg-zinc-155 dark:bg-zinc-850 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-200 cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsZonesFilterOpen(false)}
                    className="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg text-xs font-bold hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Zones Data Table */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm relative">
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center select-none">
              <div className="flex items-center gap-3">
                {selectedZoneIds.length > 0 && (
                  <div className="flex items-center gap-2 p-1 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg px-2">
                    <span className="text-[10px] font-black text-[var(--primary)]">{selectedZoneIds.length} Selected</span>
                    <button
                      onClick={() => {
                        setZones((prev) => prev.map((z) => selectedZoneIds.includes(z.id) ? { ...z, status: "Archived" } : z));
                        setSelectedZoneIds([]);
                      }}
                      className="text-rose-600 hover:text-rose-700 cursor-pointer text-[10px] font-bold"
                    >
                      Archive Selected
                    </button>
                  </div>
                )}
              </div>

              {/* Column dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsZonesColDropdownOpen(!isZonesColDropdownOpen)}
                  className="p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer font-bold text-[10px]"
                >
                  <Sliders size={12} />
                  <span>COLUMNS</span>
                </button>
                {isZonesColDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-900 rounded-lg shadow-xl z-20 p-2 space-y-1 animate-scaleUp">
                    {Object.keys(zonesVisibleColumns).map((col) => (
                      <div
                        key={col}
                        onClick={() => setZonesVisibleColumns({ ...zonesVisibleColumns, [col]: !zonesVisibleColumns[col] })}
                        className="flex items-center justify-between p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded cursor-pointer text-xs font-semibold select-none text-black dark:text-zinc-100"
                      >
                        <span className="capitalize">{col}</span>
                        {zonesVisibleColumns[col] ? <CheckSquare size={13} className="text-[var(--primary)]" /> : <Square size={13} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full border-collapse text-left text-xs font-semibold">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 select-none">
                    <th className="p-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedZoneIds.length === filteredZones.length && filteredZones.length > 0}
                        onChange={(e) => handleToggleSelectAllZones(e.target.checked)}
                        className="rounded text-[var(--primary)] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    {zonesVisibleColumns.name && (
                      <th onClick={() => handleZonesSort("name")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100">
                        Zone Name
                      </th>
                    )}
                    {zonesVisibleColumns.region && (
                      <th onClick={() => handleZonesSort("regionName")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100">
                        Parent Region
                      </th>
                    )}
                    {zonesVisibleColumns.territories && (
                      <th onClick={() => handleZonesSort("territoriesCount")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Territories
                      </th>
                    )}
                    {zonesVisibleColumns.franchises && (
                      <th onClick={() => handleZonesSort("franchisesCount")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Franchises
                      </th>
                    )}
                    {zonesVisibleColumns.stores && (
                      <th onClick={() => handleZonesSort("storesCount")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Stores
                      </th>
                    )}
                    {zonesVisibleColumns.orders && (
                      <th onClick={() => handleZonesSort("activeOrders")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Orders
                      </th>
                    )}
                    {zonesVisibleColumns.revenue && (
                      <th onClick={() => handleZonesSort("revenue")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-right">
                        Revenue
                      </th>
                    )}
                    {zonesVisibleColumns.status && (
                      <th onClick={() => handleZonesSort("status")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Status
                      </th>
                    )}
                    {zonesVisibleColumns.created && (
                      <th onClick={() => handleZonesSort("createdDate")} className="p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-100 text-center">
                        Created Date
                      </th>
                    )}
                    <th className="p-3 text-right text-black dark:text-zinc-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-black dark:text-zinc-100">
                  {paginatedZones.length > 0 ? (
                    paginatedZones.map((z) => {
                      const isChecked = selectedZoneIds.includes(z.id);
                      return (
                        <tr key={z.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleSelectZone(z.id)}
                              className="rounded text-[var(--primary)] focus:ring-0 cursor-pointer"
                            />
                          </td>
                          {zonesVisibleColumns.name && (
                            <td className="p-3 font-bold text-black dark:text-zinc-100 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] cursor-pointer" onClick={() => { setSelectedZone(z); setIsZoneDrawerOpen(true); }}>
                              {z.name}
                            </td>
                          )}
                          {zonesVisibleColumns.region && <td className="p-3 text-zinc-500 dark:text-zinc-400">{z.regionName}</td>}
                          {zonesVisibleColumns.territories && <td className="p-3 text-center font-bold text-zinc-700 dark:text-zinc-300">{z.territoriesCount}</td>}
                          {zonesVisibleColumns.franchises && <td className="p-3 text-center font-bold text-zinc-700 dark:text-zinc-300">{z.franchisesCount}</td>}
                          {zonesVisibleColumns.stores && <td className="p-3 text-center font-bold text-zinc-700 dark:text-zinc-300">{z.storesCount}</td>}
                          {zonesVisibleColumns.orders && <td className="p-3 text-center font-black text-blue-600 dark:text-blue-400">{z.activeOrders}</td>}
                          {zonesVisibleColumns.revenue && <td className="p-3 text-right font-black text-black dark:text-zinc-100">₹{z.revenue.toLocaleString()}</td>}
                          {zonesVisibleColumns.status && (
                            <td className="p-3 text-center">
                              <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded ${
                                z.status === "Active"
                                  ? "bg-emerald-550/10 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400"
                              }`}>
                                {z.status}
                              </span>
                            </td>
                          )}
                          {zonesVisibleColumns.created && <td className="p-3 text-center text-zinc-500 dark:text-zinc-400 font-bold">{z.createdDate}</td>}
                          <td className="p-3 text-right space-x-1.5 select-none">
                            <button
                              onClick={() => {
                                setSelectedZone(z);
                                setIsZoneDrawerOpen(true);
                              }}
                              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-blue-600 dark:text-blue-400 cursor-pointer inline-flex"
                                title="View Details"
                            >
                              <Eye size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setEditZoneData(z);
                                setIsZoneModalOpen(true);
                              }}
                              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-black dark:text-zinc-300 cursor-pointer inline-flex"
                              title="Edit Zone"
                            >
                              <Sliders size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedZone(z);
                                setIsAssignTerritoryOpen(true);
                              }}
                              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-purple-600 dark:text-purple-400 cursor-pointer inline-flex"
                              title="Assign Territory"
                            >
                              <Milestone size={13} />
                            </button>
                            {z.status === "Active" ? (
                              <button
                                onClick={() => triggerArchiveConfirm("zone", z)}
                                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-rose-600 dark:text-rose-400 cursor-pointer inline-flex"
                                title="Archive Zone"
                              >
                                <Trash2 size={13} />
                              </button>
                            ) : (
                              <button
                                onClick={() => activateRecord("zone", z)}
                                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-emerald-600 dark:text-emerald-450 cursor-pointer inline-flex"
                                title="Activate Zone"
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
                      <td colSpan={11} className="p-6 text-center text-zinc-500 font-bold">No zones found matching criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            {totalZonesPages > 1 && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs select-none">
                <span className="text-zinc-500 font-bold">Showing {paginatedZones.length} of {filteredZones.length} Zones</span>
                <div className="flex gap-1">
                  <button
                    disabled={zonesPage === 1}
                    onClick={() => setZonesPage(zonesPage - 1)}
                    className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-black dark:text-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors font-bold cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1 flex items-center font-black">{zonesPage} / {totalZonesPages}</span>
                  <button
                    disabled={zonesPage === totalZonesPages}
                    onClick={() => setZonesPage(zonesPage + 1)}
                    className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-black dark:text-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors font-bold cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
