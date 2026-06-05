import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MoreVertical,
  Eye,
  Edit,
  Ban,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Building,
  MapPin,
  ChevronDown,
  Layers,
  ArrowRight
} from "lucide-react"

// Reusable custom subcomponents
import FranchiseKPIs from "./FranchiseKPIs"
import FranchiseFilters from "./FranchiseFilters"
import FranchiseDetailsDrawer from "./FranchiseDetailsDrawer"
import { EditFranchiseModal, SuspendFranchiseModal } from "./FranchiseModals"

const INITIAL_FRANCHISES = [
  {
    id: "FRAN-4921",
    name: "Giovanni Bianchi",
    email: "g.bianchi@papaveg.com",
    phone: "+39 333 111 2222",
    franchiseName: "Papa Veg Milan Centro",
    city: "Milan",
    state: "Lombardia",
    type: "Multi Store",
    totalStores: 3,
    totalManagers: 6,
    revenue: 150000,
    status: "ACTIVE",
    joinedDate: "Jan 12, 2024"
  },
  {
    id: "FRAN-8832",
    name: "Francesca Neri",
    email: "f.neri@papaveg.com",
    phone: "+39 347 444 5555",
    franchiseName: "Papa Veg Rome Termini",
    city: "Rome",
    state: "Lazio",
    type: "Multi Store",
    totalStores: 2,
    totalManagers: 4,
    revenue: 98000,
    status: "ACTIVE",
    joinedDate: "Feb 20, 2024"
  },
  {
    id: "FRAN-1029",
    name: "Roberto Rossi",
    email: "r.rossi@papaveg.com",
    phone: "+39 329 888 9999",
    franchiseName: "Papa Veg Turin Palace",
    city: "Turin",
    state: "Piemonte",
    type: "Single Store",
    totalStores: 1,
    totalManagers: 2,
    revenue: 45000,
    status: "INACTIVE",
    joinedDate: "Mar 05, 2024"
  },
  {
    id: "FRAN-7721",
    name: "Sofia Romano",
    email: "s.romano@papaveg.com",
    phone: "+39 349 222 3333",
    franchiseName: "Papa Veg Florence Duomo",
    city: "Florence",
    state: "Toscana",
    type: "Multi Store",
    totalStores: 4,
    totalManagers: 8,
    revenue: 215000,
    status: "ACTIVE",
    joinedDate: "Nov 15, 2023"
  },
  {
    id: "FRAN-5534",
    name: "Antonio Bruno",
    email: "a.bruno@papaveg.com",
    phone: "+39 334 777 8888",
    franchiseName: "Papa Veg Naples Bay",
    city: "Naples",
    state: "Campania",
    type: "Single Store",
    totalStores: 1,
    totalManagers: 1,
    revenue: 32000,
    status: "SUSPENDED",
    joinedDate: "Dec 01, 2023"
  }
]

export default function FranchiseList() {
  const [franchises, setFranchises] = useState(INITIAL_FRANCHISES)

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [cityFilter, setCityFilter] = useState("")

  // Overlay Trigger States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Selected Admin Reference
  const [selectedAdmin, setSelectedAdmin] = useState(null)

  // Custom dropdown click row selection
  const [activeMenuId, setActiveMenuId] = useState(null)

  // Toast State
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Calculate high-fidelity metrics dynamically based on active list state
  const dashboardStats = useMemo(() => {
    const total = franchises.length
    const active = franchises.filter((f) => f.status === "ACTIVE").length
    const inactive = franchises.filter((f) => f.status === "INACTIVE").length
    const revenue = franchises.reduce((acc, f) => acc + f.revenue, 0)
    const pending = franchises.filter((f) => f.status === "INACTIVE" && f.revenue === 0).length

    return { total, active, inactive, revenue, pending }
  }, [franchises])

  // Advanced filters, search, and sorting mapping
  const filteredFranchises = useMemo(() => {
    return franchises.filter((fran) => {
      // Search Box Filter
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        fran.name.toLowerCase().includes(query) ||
        fran.email.toLowerCase().includes(query) ||
        fran.phone.includes(query) ||
        fran.franchiseName.toLowerCase().includes(query) ||
        fran.id.toLowerCase().includes(query)

      // Dropdown Status Filter
      const matchesStatus =
        statusFilter === "All Statuses" || fran.status === statusFilter

      // Dropdown Type Filter
      const matchesType =
        typeFilter === "All Types" || fran.type === typeFilter

      // Input City Filter
      const matchesCity =
        !cityFilter.trim() || fran.city.toLowerCase().includes(cityFilter.toLowerCase())

      return matchesSearch && matchesStatus && matchesType && matchesCity
    })
  }, [franchises, searchQuery, statusFilter, typeFilter, cityFilter])

  // Handle operations save triggers
  const handleSaveAdmin = (savedData) => {
    const exists = franchises.some((f) => f.id === savedData.id)
    if (exists) {
      // Modify
      setFranchises((prev) => prev.map((f) => (f.id === savedData.id ? savedData : f)))
      showToast(`Updated details for ${savedData.name}!`, "success")
    } else {
      // Add
      setFranchises((prev) => [savedData, ...prev])
      showToast(`Added new Franchise Operator ${savedData.name}!`, "success")
    }
    setIsAddModalOpen(false)
    setIsEditModalOpen(false)
    setSelectedAdmin(null)
  }

  const handleSuspendAdmin = (id, details) => {
    setFranchises((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "SUSPENDED" } : f))
    )
    const adminRef = franchises.find((f) => f.id === id)
    showToast(`${adminRef?.name}'s franchise is now Suspended!`, "warning")
    setIsSuspendModalOpen(false)
    setSelectedAdmin(null)
  }

  const handleActivateAdmin = (id) => {
    setFranchises((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "ACTIVE" } : f))
    )
    const adminRef = franchises.find((f) => f.id === id)
    showToast(`${adminRef?.name}'s franchise has been Activated!`, "success")
    setActiveMenuId(null)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setStatusFilter("All Statuses")
    setTypeFilter("All Types")
    setCityFilter("")
    showToast("Filters reset successful!", "success")
  }

  const handleExportCSV = () => {
    showToast("Franchise database export completed successfully!", "success")
  }

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Toast Alert Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl bg-zinc-900 text-white dark:bg-zinc-800 text-xs font-bold border border-zinc-700/50"
          >
            {toast.type === "success" ? (
              <CheckCircle size={16} className="text-emerald-500" />
            ) : (
              <AlertCircle size={16} className="text-rose-500" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Franchise Admins
          </h1>
          <p className="text-zinc-400 font-semibold text-xs mt-0.5">
            Manage franchise owners, store properties, and commissions.
          </p>
        </div>
      </div>

      {/* Reusable KPI statistics block */}
      <FranchiseKPIs stats={dashboardStats} />

      {/* Reusable Filters row */}
      <FranchiseFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        onReset={handleResetFilters}
        onExport={handleExportCSV}
        onAddAdmin={() => {
          setSelectedAdmin(null)
          setIsAddModalOpen(true)
        }}
      />

      {/* Main Responsive Data Table Container */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-150 border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Operator Info
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Franchise Brand
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  HQ Region
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredFranchises.length > 0 ? (
                filteredFranchises.map((fran) => (
                  <tr
                    key={fran.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors group"
                  >
                    {/* Operator Profile */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-600 dark:text-zinc-400 group-hover:scale-105 transition-transform">
                          {fran.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50 group-hover:text-[var(--primary)] transition-colors">
                            {fran.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">{fran.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Franchise Brand */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-zinc-400" />
                        <div>
                          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            {fran.franchiseName}
                          </p>
                          <span className="text-[9px] font-mono bg-zinc-100 dark:bg-zinc-850 px-1 py-0.5 rounded text-zinc-550 dark:text-zinc-400">
                            {fran.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* HQ Region */}
                    <td className="px-6 py-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-zinc-400" />
                        <span>
                          {fran.city}, {fran.state}
                        </span>
                      </div>
                    </td>

                    {/* Stores & Managers */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                          {fran.totalStores} {fran.totalStores === 1 ? "Store" : "Stores"}
                        </p>
                        <p className="text-[9px] text-zinc-400 font-bold mt-0.5">
                          {fran.totalManagers} Staff Managers
                        </p>
                      </div>
                    </td>

                    {/* Revenue */}
                    <td className="px-6 py-4 text-xs font-black text-zinc-800 dark:text-zinc-200">
                      ${fran.revenue.toLocaleString()}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full ${fran.status === "ACTIVE"
                            ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30"
                            : fran.status === "INACTIVE"
                              ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
                              : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                          }`}
                      >
                        {fran.status}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {fran.joinedDate}
                    </td>

                    {/* Menu Actions Trigger */}
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === fran.id ? null : fran.id)}
                        className="p-1.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Action Popover Menu */}
                      <AnimatePresence>
                        {activeMenuId === fran.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 5 }}
                              className="absolute right-6 top-12 w-44 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-xl z-20 p-1.5"
                            >
                              <button
                                onClick={() => {
                                  setSelectedAdmin(fran)
                                  setIsDrawerOpen(true)
                                  setActiveMenuId(null)
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-extrabold text-zinc-600 hover:text-[var(--primary)] hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                              >
                                <Eye size={14} />
                                <span>View Profile Drawer</span>
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedAdmin(fran)
                                  setIsEditModalOpen(true)
                                  setActiveMenuId(null)
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-extrabold text-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-50 transition-colors cursor-pointer"
                              >
                                <Edit size={14} />
                                <span>Edit Profile details</span>
                              </button>

                              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />

                              {fran.status === "SUSPENDED" ? (
                                <button
                                  onClick={() => handleActivateAdmin(fran.id)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-extrabold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer"
                                >
                                  <UserCheck size={14} />
                                  <span>Re-Activate Account</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedAdmin(fran)
                                    setIsSuspendModalOpen(true)
                                    setActiveMenuId(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-extrabold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                                >
                                  <Ban size={14} />
                                  <span>Suspend Franchise</span>
                                </button>
                              )}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty filter state */
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <Building size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">No Franchise Admins Found</p>
                        <p className="text-xs text-zinc-450 dark:text-zinc-550 font-semibold mt-0.5">
                          Try adjusting your filtering choices or resetting the search term.
                        </p>
                      </div>
                      <button
                        onClick={handleResetFilters}
                        className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Franchise details Drawer Panel */}
      <FranchiseDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
          setSelectedAdmin(null)
        }}
        admin={selectedAdmin}
      />

      {/* Edit / Add Modal Popup */}
      <EditFranchiseModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedAdmin(null)
        }}
        admin={isEditModalOpen ? selectedAdmin : null}
        onSave={handleSaveAdmin}
      />

      {/* Suspend confirmation Modal Popup */}
      <SuspendFranchiseModal
        isOpen={isSuspendModalOpen}
        onClose={() => {
          setIsSuspendModalOpen(false)
          setSelectedAdmin(null)
        }}
        admin={selectedAdmin}
        onConfirm={handleSuspendAdmin}
      />
    </div>
  )
}
