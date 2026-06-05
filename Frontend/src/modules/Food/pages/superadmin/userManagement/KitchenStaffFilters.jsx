import React, { useState, useEffect } from "react"
import { Search, X, FilterX } from "lucide-react"

export default function KitchenStaffFilters({
  searchQuery,
  setSearchQuery,
  franchiseFilter,
  setFranchiseFilter,
  roleFilter,
  setRoleFilter,
  shiftFilter,
  setShiftFilter,
  statusFilter,
  setStatusFilter,
  onReset
}) {
  // Local state for search to achieve responsive typing and debouncing
  const [localSearch, setLocalSearch] = useState(searchQuery)

  // Sync local search with parent query changes (e.g. on clear)
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

  const franchises = [
    { value: "", label: "All Franchises" },
    { value: "Downtown Pizza Group", label: "Downtown Pizza Group" },
    { value: "Northside Eats", label: "Northside Eats" },
    { value: "Westside Express", label: "Westside Express" }
  ]

  const roles = [
    { value: "", label: "Role: All" },
    { value: "Pizza Maker", label: "Pizza Maker" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Prep Cook", label: "Prep Cook" },
    { value: "Dishwasher", label: "Dishwasher" }
  ]

  const shifts = [
    { value: "", label: "Shift: All" },
    { value: "Morning", label: "Morning" },
    { value: "Evening", label: "Evening" },
    { value: "Night", label: "Night" }
  ]

  const statuses = [
    { value: "", label: "Status: All" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Suspended", label: "Suspended" }
  ]

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 min-w-[240px] relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by name or Employee ID..."
            className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none font-medium text-xs text-zinc-800 dark:text-zinc-100 transition-all"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Franchise Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={franchiseFilter}
            onChange={(e) => setFranchiseFilter(e.target.value)}
            className="w-full sm:w-44 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
          >
            {franchises.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Role Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-36 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
          >
            {roles.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Shift Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            className="w-full sm:w-36 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
          >
            {shifts.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-36 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer"
          >
            {statuses.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2.5 text-zinc-500 hover:text-[var(--primary)] dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-all font-bold text-xs cursor-pointer ml-auto sm:ml-0"
        >
          <FilterX size={15} />
          <span>Clear</span>
        </button>
      </div>
    </div>
  )
}
