import React, { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  Plus,
  Users,
  UserCheck,
  Store,
  UserMinus,
  Mail,
  Phone,
  X,
  Save,
  Trash2,
  Ban,
  ClipboardList
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import StoreManagerDetailsDrawer from "./StoreManagerDetailsDrawer"

// Full Manager Database
const INITIAL_MANAGERS = [
  {
    id: "PV-882",
    name: "Marco Santoro",
    email: "marco.s@papaveg.com",
    phone: "+1 312-555-0192",
    store: "Chicago - Downtown",
    group: "Urban Slice Group",
    status: "Active",
    avatar: ""
  },
  {
    id: "PV-714",
    name: "Sarah Jenkins",
    email: "s.jenkins@papaveg.com",
    phone: "+1 630-555-0104",
    store: "Naperville East - Mall",
    group: "Midwest Pizza Co.",
    status: "On Leave",
    avatar: ""
  },
  {
    id: "PV-630",
    name: "David Miller",
    email: "d.miller@papaveg.com",
    phone: "+1 630-555-0188",
    store: "Aurora West Station",
    group: "Midwest Pizza Co.",
    status: "Suspended",
    avatar: ""
  },
  {
    id: "PV-904",
    name: "Elena Vance",
    email: "e.vance@example.com",
    phone: "+1 312-555-0904",
    store: "Evanston North",
    group: "Coastal Veggie Grills",
    status: "Active",
    avatar: ""
  },
  {
    id: "PV-512",
    name: "Marcus Rossi",
    email: "m.rossi@example.com",
    phone: "+1 815-555-0212",
    store: "Naperville West",
    group: "Midwest Pizza Co.",
    status: "Active",
    avatar: ""
  },
  {
    id: "PV-384",
    name: "Chloe Bennett",
    email: "c.bennett@example.com",
    phone: "+1 312-555-0384",
    store: "Chicago Loop",
    group: "Urban Slice Group",
    status: "Active",
    avatar: ""
  }
]

export default function StoreManagersList() {
  const navigate = useNavigate()
  const [managers, setManagers] = useState(INITIAL_MANAGERS)

  // Local Search state for instant keystroke updates, debounced search query for heavy list updates
  const [localSearch, setLocalSearch] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter dropdown state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true)
  const [franchiseFilter, setFranchiseFilter] = useState("All Franchises")
  const [storeFilter, setStoreFilter] = useState("All Stores")
  const [statusFilter, setStatusFilter] = useState("Any Status")
  const [sortBy, setSortBy] = useState("Newest")

  // Selected manager details drawer state
  const [selectedManager, setSelectedManager] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Add/Edit Modals operational states
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [activeModalManager, setActiveModalManager] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [managerToDelete, setManagerToDelete] = useState(null)

  // Add/Edit Form fields state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    store: "Chicago - Downtown",
    group: "Urban Slice Group",
    status: "Active"
  })
  const [formErrors, setFormErrors] = useState({})

  // Dropdown list options
  const franchiseOptions = ["All Franchises", "Urban Slice Group", "Midwest Pizza Co.", "Coastal Veggie Grills"]
  const storeOptions = ["All Stores", "Chicago - Downtown", "Naperville East - Mall", "Aurora West Station", "Evanston North", "Naperville West", "Chicago Loop"]
  const statusOptions = ["Any Status", "Active", "On Leave", "Suspended"]

  // 1. Debounce Search Bar Input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 300)

    return () => clearTimeout(handler)
  }, [localSearch])

  // Filter & Sort Logic
  const filteredManagers = useMemo(() => {
    return managers
      .filter((m) => {
        const query = searchQuery.toLowerCase().trim()
        const matchesQuery =
          !query ||
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.id.toLowerCase().includes(query) ||
          m.phone.includes(query)

        const matchesFranchise = franchiseFilter === "All Franchises" || m.group === franchiseFilter
        const matchesStore = storeFilter === "All Stores" || m.store === storeFilter
        const matchesStatus = statusFilter === "Any Status" || m.status === statusFilter

        return matchesQuery && matchesFranchise && matchesStore && matchesStatus
      })
      .sort((a, b) => {
        if (sortBy === "Name") return a.name.localeCompare(b.name)
        return b.id.localeCompare(a.id) // Newest First default
      })
  }, [managers, searchQuery, franchiseFilter, storeFilter, statusFilter, sortBy])

  // Reset Filters trigger
  const handleResetFilters = () => {
    setLocalSearch("")
    setSearchQuery("")
    setFranchiseFilter("All Franchises")
    setStoreFilter("All Stores")
    setStatusFilter("Any Status")
    setSortBy("Newest")
  }

  // Open modal for add or edit
  const openAddEditModal = (mgr = null) => {
    if (mgr) {
      setActiveModalManager(mgr)
      setFormData({
        name: mgr.name,
        email: mgr.email,
        phone: mgr.phone,
        store: mgr.store,
        group: mgr.group,
        status: mgr.status
      })
    } else {
      setActiveModalManager(null)
      setFormData({
        name: "",
        email: "",
        phone: "",
        store: "Chicago - Downtown",
        group: "Urban Slice Group",
        status: "Active"
      })
    }
    setFormErrors({})
    setShowAddEditModal(true)
  }

  const validateForm = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = "Full Name is required"
    if (!formData.email.trim()) {
      errs.email = "Email address is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email format"
    }
    if (!formData.phone.trim()) errs.phone = "Phone number is required"
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSaveManager = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (activeModalManager) {
      setManagers((prev) =>
        prev.map((m) => (m.id === activeModalManager.id ? { ...m, ...formData } : m))
      )
      if (selectedManager && selectedManager.id === activeModalManager.id) {
        setSelectedManager({ ...selectedManager, ...formData })
      }
    } else {
      const newId = `PV-${Math.floor(100 + Math.random() * 900)}`
      const newMgr = { id: newId, ...formData }
      setManagers((prev) => [newMgr, ...prev])
    }
    setShowAddEditModal(false)
  }

  const handleConfirmDelete = () => {
    if (!managerToDelete) return
    setManagers((prev) => prev.filter((m) => m.id !== managerToDelete.id))
    if (selectedManager && selectedManager.id === managerToDelete.id) {
      setIsDrawerOpen(false)
    }
    setShowDeleteModal(false)
    setManagerToDelete(null)
  }

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 md:px-8 space-y-8 min-h-screen">
      {/* Top Header Row with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 pt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/food/superadmin/managers")}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-350 transition-colors cursor-pointer"
            aria-label="Back to Managers Overview"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 leading-tight">
              List of Store Managers
            </h1>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Full index listing of all franchise operators and active branch store managers.
            </p>
          </div>
        </div>
        <button
          onClick={() => openAddEditModal()}
          className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer font-bold text-xs"
        >
          <Plus size={15} className="stroke-[3]" />
          <span>Add New Manager</span>
        </button>
      </div>

      {/* Advanced Filter Panel section */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-850/40 transition-colors cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <ClipboardList size={16} className="text-[var(--primary)]" />
            <span className="font-extrabold text-sm text-zinc-850 dark:text-zinc-100">Toggle Directory Filters</span>
          </div>
          <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${showAdvancedFilters ? "rotate-180" : ""}`} />
        </button>

        {showAdvancedFilters && (
          <div className="px-6 pb-6 pt-2 space-y-5 border-t border-zinc-50 dark:border-zinc-850/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search input with local binding (Debounced) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Search Manager</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Name, Email, PV ID..."
                    className="w-full text-xs pl-9 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                  {localSearch && (
                    <button
                      onClick={() => setLocalSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Franchise select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Franchise Group</label>
                <select
                  value={franchiseFilter}
                  onChange={(e) => setFranchiseFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
                >
                  {franchiseOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Store select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Store assignment</label>
                <select
                  value={storeFilter}
                  onChange={(e) => setStoreFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
                >
                  {storeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-455 uppercase block">Employment Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-550 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850 font-bold text-xs transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="px-6 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/95 text-white font-bold text-xs shadow transition-all cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Directory List View (Table Layout) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between select-none">
          <p className="text-xs font-bold text-zinc-400">
            Showing {filteredManagers.length} of {managers.length} Managers
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-450 dark:text-zinc-500 font-bold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-[var(--primary)] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Newest">Newest First</option>
              <option value="Name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Premium Tabular Table List representation */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] font-black text-zinc-450 uppercase tracking-widest select-none">
                  <th className="py-4 px-6">Manager</th>
                  <th className="py-4 px-6">Franchise Group</th>
                  <th className="py-4 px-6">Store Assignment</th>
                  <th className="py-4 px-6">Employment Status</th>
                  <th className="py-4 px-6">Contact Details</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850/60">
                {filteredManagers.map((mgr) => {
                  const isActive = mgr.status === "Active"
                  const isOnLeave = mgr.status === "On Leave"

                  return (
                    <tr
                      key={mgr.id}
                      onClick={() => {
                        setSelectedManager(mgr)
                        setIsDrawerOpen(true)
                      }}
                      className="hover:bg-zinc-50/40 dark:hover:bg-zinc-800/20 transition-colors cursor-pointer group"
                    >
                      {/* Manager Profile Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-650 dark:text-zinc-350 flex items-center justify-center shadow-inner">
                              {mgr.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${isActive ? "bg-emerald-500" : isOnLeave ? "bg-amber-500" : "bg-rose-500"
                              }`} />
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <span className="font-extrabold text-sm text-zinc-850 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors truncate block">
                              {mgr.name}
                            </span>
                            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-wider">
                              ID: {mgr.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Franchise Group */}
                      <td className="py-4 px-6">
                        <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                          {mgr.group}
                        </span>
                      </td>

                      {/* Store Assignment */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                          <Store size={13} className="text-zinc-400 flex-shrink-0" />
                          <span className="text-[11px] font-semibold truncate max-w-[180px]">
                            {mgr.store}
                          </span>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${isActive
                          ? "bg-green-50 dark:bg-green-950/20 text-green-600"
                          : isOnLeave
                            ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600"
                            : "bg-rose-50 dark:bg-rose-950/20 text-rose-600"
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : isOnLeave ? "bg-amber-500" : "bg-rose-500"}`} />
                          {mgr.status}
                        </span>
                      </td>

                      {/* Contact Stack */}
                      <td className="py-4 px-6">
                        <div className="space-y-1 text-zinc-500 dark:text-zinc-400">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <Mail size={12} className="text-zinc-400 flex-shrink-0" />
                            <span className="text-[10.5px] truncate font-medium max-w-[200px]">{mgr.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone size={12} className="text-zinc-400 flex-shrink-0" />
                            <span className="text-[10.5px] font-semibold">{mgr.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openAddEditModal(mgr)}
                            className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setManagerToDelete(mgr)
                              setShowDeleteModal(true)
                            }}
                            className="px-3 py-1.5 rounded-lg border border-rose-200/40 dark:border-rose-950 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-[10px] text-rose-550 dark:text-rose-455 transition-all cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredManagers.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center select-none shadow-sm flex flex-col items-center justify-center">
            <UserMinus size={36} className="text-zinc-400 mb-3" />
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50">No Store Managers Found</h4>
            <p className="text-[10px] text-zinc-400 font-semibold max-w-xs mt-1">
              No results matched your search queries or active advanced filters. Click reset to clear filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-5 py-2 rounded-xl bg-[var(--primary)]/10 hover:bg-[var(--primary)]/15 text-[var(--primary)] font-bold text-xs transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* DETAILED DRAWERS */}
      <StoreManagerDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        manager={selectedManager}
        onEdit={(mgr) => {
          setIsDrawerOpen(false)
          openAddEditModal(mgr)
        }}
      />

      {/* ADD / EDIT MODALS */}
      <AnimatePresence>
        {showAddEditModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddEditModal(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[110]"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[120] overflow-y-auto pointer-events-none select-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl shadow-2xl p-6 pointer-events-auto flex flex-col max-h-[90vh]"
              >
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50">
                      {activeModalManager ? "Update Store Manager Profile" : "Register Store Manager"}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                      Configure store assignment, contact information, and account details.
                    </p>
                  </div>
                  <button onClick={() => setShowAddEditModal(false)} className="p-1 text-zinc-400 hover:text-zinc-650 cursor-pointer">
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSaveManager} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4 scrollbar-thin">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-455 uppercase block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marco Santoro"
                      className={`w-full p-3 text-xs border rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:bg-white transition-colors ${formErrors.name ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                    />
                    {formErrors.name && <p className="text-[9px] font-black text-rose-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-455 uppercase block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marco@papaveg.com"
                        className={`w-full p-3 text-xs border rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:bg-white transition-colors ${formErrors.email ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                          }`}
                      />
                      {formErrors.email && <p className="text-[9px] font-black text-rose-500 mt-1">{formErrors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-455 uppercase block">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 312-555-xxxx"
                        className={`w-full p-3 text-xs border rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:bg-white transition-colors ${formErrors.phone ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                          }`}
                      />
                      {formErrors.phone && <p className="text-[9px] font-black text-rose-500 mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-455 uppercase block">Franchise Group</label>
                      <select
                        value={formData.group}
                        onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                        className="w-full text-xs px-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none cursor-pointer"
                      >
                        {franchiseOptions.slice(1).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-455 uppercase block">Store Assignment</label>
                      <select
                        value={formData.store}
                        onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                        className="w-full text-xs px-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none cursor-pointer"
                      >
                        {storeOptions.slice(1).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-455 uppercase block">Employment Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full text-xs px-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none cursor-pointer"
                    >
                      {statusOptions.slice(1).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-2 z-10 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowAddEditModal(false)}
                    className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-555 hover:bg-zinc-55 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveManager}
                    className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/95 text-white rounded-xl text-xs font-bold shadow-md shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Save size={13} />
                    <span>{activeModalManager ? "Save Profile Changes" : "Register Manager"}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* SUSPEND / REMOVE DIALOG MODAL */}
      <AnimatePresence>
        {showDeleteModal && managerToDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[110]"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[120] select-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-2xl relative"
              >
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-955/20 text-rose-600 rounded-full flex items-center justify-center mb-4">
                  <Ban size={20} className="stroke-[2.5]" />
                </div>

                <div className="mb-6">
                  <h3 className="font-extrabold text-sm text-zinc-850 dark:text-zinc-55 leading-tight">
                    Remove Store Manager Profile
                  </h3>
                  <p className="text-[11.5px] text-zinc-450 dark:text-zinc-500 font-semibold mt-2 leading-relaxed">
                    Are you sure you want to remove <strong className="text-zinc-800 dark:text-zinc-150">{managerToDelete.name}</strong> from their post as Store Manager at <strong className="text-zinc-800 dark:text-zinc-150">{managerToDelete.store}</strong>? This action permanently revokes all check-in punch cards and administrative authorization records.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-5 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-555 hover:bg-zinc-55 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex items-center gap-2 px-5 py-3.5 bg-rose-600 hover:bg-rose-550 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Confirm Removal</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
