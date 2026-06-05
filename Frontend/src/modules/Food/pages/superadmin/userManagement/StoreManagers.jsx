import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
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
  ArrowUpRight,
  TrendingDown,
  ClipboardList
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import StoreManagerDetailsDrawer from "./StoreManagerDetailsDrawer"

// Initial Managers list to drive the interactive bento dashboard list
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

export default function StoreManagers() {
  const navigate = useNavigate()
  const [managers, setManagers] = useState(INITIAL_MANAGERS)

  // Sorting state
  const [sortBy, setSortBy] = useState("Newest")

  // Selected manager drawer states
  const [selectedManager, setSelectedManager] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Modals operational states
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [activeModalManager, setActiveModalManager] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [managerToDelete, setManagerToDelete] = useState(null)

  // Add/Edit Form state
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

  // KPI calculations derived from local state
  const kpis = useMemo(() => {
    const total = managers.length
    const active = managers.filter(m => m.status === "Active").length
    const onLeave = managers.filter(m => m.status === "On Leave").length
    const suspended = managers.filter(m => m.status === "Suspended").length
    return { total, active, onLeave, suspended }
  }, [managers])

  // Sorted manager listings
  const filteredManagers = useMemo(() => {
    return [...managers].sort((a, b) => {
      if (sortBy === "Name") return a.name.localeCompare(b.name)
      // Default sort (simulate newest first by ID sort)
      return b.id.localeCompare(a.id)
    })
  }, [managers, sortBy])

  // Add/Edit trigger setup
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

  // Validate form details before submitting
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

  // Commit Add or Edit changes
  const handleSaveManager = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (activeModalManager) {
      // Edit mode commit
      setManagers(prev =>
        prev.map(m => (m.id === activeModalManager.id ? { ...m, ...formData } : m))
      )
      // Sync selected manager details if open
      if (selectedManager && selectedManager.id === activeModalManager.id) {
        setSelectedManager({ ...selectedManager, ...formData })
      }
    } else {
      // Add mode commit
      const newId = `PV-${Math.floor(100 + Math.random() * 900)}`
      const newMgr = { id: newId, ...formData }
      setManagers(prev => [newMgr, ...prev])
    }
    setShowAddEditModal(false)
  }

  // Delete/Suspend confirmation commit
  const handleConfirmDelete = () => {
    if (!managerToDelete) return
    setManagers(prev => prev.filter(m => m.id !== managerToDelete.id))
    if (selectedManager && selectedManager.id === managerToDelete.id) {
      setIsDrawerOpen(false)
    }
    setShowDeleteModal(false)
    setManagerToDelete(null)
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Page Header section */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Store Managers
          </h1>
          <p className="text-xs font-semibold text-zinc-400">
            Administrate localized store manager profiles, analytics, and active punchcard logs.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/food/superadmin/managers/list")}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer font-bold text-xs"
          >
            <ClipboardList size={15} />
            <span>Show All List</span>
          </button>
          <button
            onClick={() => openAddEditModal()}
            className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-bold text-xs"
          >
            <Plus size={15} className="stroke-[3]" />
            <span>Add Store Manager</span>
          </button>
        </div>
      </section>

      {/* High-Fidelity Bento KPI Grid with SVG Sparkline Charts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* KPI: Total Managers */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <Users size={20} />
            </div>
            <span className="text-emerald-500 font-bold text-xs flex items-center gap-0.5">
              <ArrowUpRight size={14} /> +12%
            </span>
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Managers</p>
          <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-50 mt-1">{kpis.total}</h3>
          <div className="mt-4 h-8 w-full bg-zinc-50 dark:bg-zinc-955 rounded-lg overflow-hidden relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path className="text-[var(--primary)] stroke-[2] fill-none" d="M0 15 Q 10 5, 20 12 T 40 8 T 60 14 T 80 4 T 100 10" />
            </svg>
          </div>
        </div>

        {/* KPI: Active Managers */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
              <UserCheck size={20} />
            </div>
            <span className="text-emerald-500 font-bold text-xs flex items-center gap-0.5">
              <ArrowUpRight size={14} /> +3%
            </span>
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Managers</p>
          <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-50 mt-1">{kpis.active}</h3>
          <div className="mt-4 h-8 w-full bg-zinc-50 dark:bg-zinc-955 rounded-lg overflow-hidden relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path className="text-emerald-500 stroke-[2] fill-none" d="M0 10 Q 25 18, 50 10 T 100 12" />
            </svg>
          </div>
        </div>

        {/* KPI: On Leave */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
              <Store size={20} />
            </div>
            <span className="text-zinc-450 text-[10px] font-bold">Standard Capacity</span>
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Managers On Leave</p>
          <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-50 mt-1">{kpis.onLeave}</h3>
          <div className="mt-4 h-8 w-full bg-zinc-50 dark:bg-zinc-955 rounded-lg overflow-hidden relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path className="text-amber-500 stroke-[2] fill-none" d="M0 15 L 20 15 L 40 5 L 60 10 L 80 5 L 100 15" />
            </svg>
          </div>
        </div>

        {/* KPI: Suspended */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600">
              <UserMinus size={20} />
            </div>
            <span className="text-rose-500 font-bold text-xs flex items-center gap-0.5">
              <TrendingDown size={14} /> -2%
            </span>
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Suspended Managers</p>
          <h3 className="text-2xl font-black text-zinc-800 dark:text-zinc-50 mt-1">{kpis.suspended}</h3>
          <div className="mt-4 h-8 w-full bg-zinc-50 dark:bg-zinc-955 rounded-lg overflow-hidden relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path className="text-rose-500 stroke-[2] fill-none" d="M0 10 C 20 10, 40 10, 50 10 C 60 10, 80 10, 100 10" />
            </svg>
          </div>
        </div>
      </section>

      {/* Grid view of Managers directory cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between select-none">
          <p className="text-xs font-bold text-zinc-400">
            Showing {filteredManagers.length} of {managers.length} Managers
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-455 dark:text-zinc-500 font-bold">Sort by:</span>
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

        {/* Bento Grid cards list - Kept as is as requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManagers.map((mgr) => {
            const isActive = mgr.status === "Active"
            const isOnLeave = mgr.status === "On Leave"

            return (
              <div
                key={mgr.id}
                onClick={() => {
                  setSelectedManager(mgr)
                  setIsDrawerOpen(true)
                }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 hover:border-[var(--primary)]/35 rounded-3xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3.5">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-650 dark:text-zinc-350 flex items-center justify-center shadow-inner">
                          {mgr.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${isActive ? "bg-emerald-500" : isOnLeave ? "bg-amber-500" : "bg-rose-500"
                          }`} />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="font-extrabold text-sm text-zinc-850 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors truncate">
                          {mgr.name}
                        </h4>
                        <p className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 truncate">{mgr.store}</p>
                        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{mgr.group}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${isActive
                        ? "bg-green-50 dark:bg-green-950/20 text-green-600"
                        : isOnLeave
                          ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600"
                          : "bg-rose-50 dark:bg-rose-950/20 text-rose-600"
                        }`}>
                        {mgr.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-850/60 grid grid-cols-1 gap-2.5 text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail size={13} className="text-zinc-400 flex-shrink-0" />
                      <span className="text-[10.5px] truncate font-medium">{mgr.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-zinc-400 flex-shrink-0" />
                      <span className="text-[10.5px] font-semibold">{mgr.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-850/50 flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => openAddEditModal(mgr)}
                    className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 font-bold text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setManagerToDelete(mgr)
                      setShowDeleteModal(true)
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-rose-200/40 dark:border-rose-950 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-[10px] text-rose-550 dark:text-rose-455 transition-all cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty filtered managers fallback */}
        {filteredManagers.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center select-none shadow-sm flex flex-col items-center justify-center">
            <UserMinus size={36} className="text-zinc-400 mb-3" />
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50">No Store Managers Found</h4>
            <p className="text-[10px] text-zinc-400 font-semibold max-w-xs mt-1">
              Add a new store manager to begin managing localized store profiles.
            </p>
          </div>
        )}
      </section>

      {/* SLIDING DETAILS DRAWER */}
      <StoreManagerDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        manager={selectedManager}
        onEdit={(mgr) => {
          setIsDrawerOpen(false)
          openAddEditModal(mgr)
        }}
      />

      {/* ADD / EDIT DIALOG MODAL */}
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
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-805">
                  <div>
                    <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50">
                      {activeModalManager ? "Update Store Manager Profile" : "Register Store Manager"}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                      Configure store assignment, contact information, and account details.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddEditModal(false)}
                    className="p-1 text-zinc-400 hover:text-zinc-650 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSaveManager} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4 scrollbar-thin">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marco Santoro"
                      className={`w-full p-3 text-xs border rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:bg-white transition-colors ${formErrors.name ? "border-rose-500" : "border-zinc-200 dark:border-zinc-805"
                        }`}
                    />
                    {formErrors.name && <p className="text-[9px] font-black text-rose-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-450 uppercase block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marco@papaveg.com"
                        className={`w-full p-3 text-xs border rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:bg-white transition-colors ${formErrors.email ? "border-rose-500" : "border-zinc-200 dark:border-zinc-805"
                          }`}
                      />
                      {formErrors.email && <p className="text-[9px] font-black text-rose-500 mt-1">{formErrors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-450 uppercase block">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 312-555-xxxx"
                        className={`w-full p-3 text-xs border rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:bg-white transition-colors ${formErrors.phone ? "border-rose-500" : "border-zinc-200 dark:border-zinc-805"
                          }`}
                      />
                      {formErrors.phone && <p className="text-[9px] font-black text-rose-500 mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-450 uppercase block">Franchise Group</label>
                      <select
                        value={formData.group}
                        onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                        className="w-full text-xs px-3 py-3 border border-zinc-200 dark:border-zinc-805 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-850 dark:text-zinc-100 focus:outline-none cursor-pointer"
                      >
                        {franchiseOptions.slice(1).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-450 uppercase block">Store Assignment</label>
                      <select
                        value={formData.store}
                        onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                        className="w-full text-xs px-3 py-3 border border-zinc-205 dark:border-zinc-805 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-850 dark:text-zinc-100 focus:outline-none cursor-pointer"
                      >
                        {storeOptions.slice(1).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase block">Employment Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full text-xs px-3 py-3 border border-zinc-205 dark:border-zinc-805 rounded-xl bg-zinc-50 dark:bg-zinc-955 text-zinc-850 dark:text-zinc-100 focus:outline-none cursor-pointer"
                    >
                      {statusOptions.slice(1).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </form>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-2 z-10 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowAddEditModal(false)}
                    className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveManager}
                    className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl text-xs font-bold shadow-md shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] cursor-pointer"
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
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-full flex items-center justify-center mb-4">
                  <Ban size={20} className="stroke-[2.5]" />
                </div>

                <div className="mb-6">
                  <h3 className="font-extrabold text-sm text-zinc-850 dark:text-zinc-50 leading-tight">
                    Remove Store Manager Profile
                  </h3>
                  <p className="text-[11.5px] text-zinc-450 dark:text-zinc-500 font-semibold mt-2 leading-relaxed">
                    Are you sure you want to remove <strong className="text-zinc-800 dark:text-zinc-150">{managerToDelete.name}</strong> from their post as Store Manager at <strong className="text-zinc-800 dark:text-zinc-150">{managerToDelete.store}</strong>? This action permanently revokes all check-in punch cards and administrative authorization records.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-5 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
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
