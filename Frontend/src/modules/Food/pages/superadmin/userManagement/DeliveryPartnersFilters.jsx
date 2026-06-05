import React, { useState, useEffect } from "react"
import { Search, X, RotateCcw, Plus, ListFilter } from "lucide-react"

export default function DeliveryPartnersFilters({
  searchQuery,
  setSearchQuery,
  franchiseFilter,
  setFranchiseFilter,
  storeFilter,
  setStoreFilter,
  statusFilter,
  setStatusFilter,
  vehicleFilter,
  setVehicleFilter,
  onReset,
  onAddPartner
}) {
  // Local state for search to achieve responsive typing and debouncing
  const [localSearch, setLocalSearch] = useState(searchQuery)

  // Sync local search with parent query changes (e.g., on reset)
  useEffect(() => {
    setLocalSearch(searchQuery)
  }, [searchQuery])

  // Debounce effect: update search query after 300ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 300)
    return () => clearTimeout(timer)
  }, [localSearch, setSearchQuery])

  const franchises = ["All Franchises", "NYC Metro", "Jersey Shore"]
  const stores = ["All Stores", "Downtown", "Midtown"]
  const statuses = ["All Statuses", "Online", "Offline", "Busy", "Suspended"]
  const vehicles = ["Vehicle Type", "Electric Bike", "Scooter", "Car"]

  return (
    <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-4 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 min-w-[280px]">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by Name, Phone, or Vehicle..."
            className="w-full pl-12 pr-10 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent font-medium text-sm text-zinc-800 dark:text-zinc-100 outline-none transition-all"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Franchise Filter */}
      <div className="w-full sm:w-auto">
        <select
          value={franchiseFilter}
          onChange={(e) => setFranchiseFilter(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
        >
          {franchises.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Store Filter */}
      <div className="w-full sm:w-auto">
        <select
          value={storeFilter}
          onChange={(e) => setStoreFilter(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
        >
          {stores.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
        >
          {statuses.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Filter */}
      <div className="w-full sm:w-auto">
        <select
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
        >
          {vehicles.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {/* Reset Button */}
        <button
          onClick={onReset}
          title="Reset Filters"
          className="p-3 bg-zinc-150 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <RotateCcw size={16} />
        </button>

        {/* Filter List Button */}
        <button className="p-3 bg-zinc-150 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-xl transition-all shadow-sm flex items-center justify-center">
          <ListFilter size={16} />
        </button>
      </div>
    </section>
  )
}
