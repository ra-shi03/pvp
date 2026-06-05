import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Users,
  CheckCircle,
  Clock,
  UserX,
  TrendingUp,
  Sun,
  Sunset,
  Moon,
  Trash2,
  Edit,
  UserCheck,
  Ban,
  X,
  Award,
  AlertCircle
} from "lucide-react"

import KitchenStaffFilters from "./KitchenStaffFilters"
import KitchenStaffDetail from "./KitchenStaffDetail"

const INITIAL_STAFF = [
  {
    id: "KS-9842",
    name: "Antonio Rossi",
    email: "antonio.rossi@papaveg.com",
    store: "Downtown #101",
    franchise: "Downtown Pizza Group",
    role: "Pizza Maker",
    orders: 1240,
    efficiency: 94,
    shift: "Morning",
    status: "Active"
  },
  {
    id: "KS-7721",
    name: "Sarah Miller",
    email: "sarah.miller@papaveg.com",
    store: "Westside #203",
    franchise: "Westside Express",
    role: "Supervisor",
    orders: 856,
    efficiency: 88,
    shift: "Evening",
    status: "Inactive"
  },
  {
    id: "KS-1104",
    name: "Marco Velo",
    email: "marco.velo@papaveg.com",
    store: "Uptown #05",
    franchise: "Downtown Pizza Group",
    role: "Prep Cook",
    orders: 3110,
    efficiency: 91,
    shift: "Night",
    status: "Suspended"
  },
  {
    id: "KS-4452",
    name: "Elena Costa",
    email: "elena.costa@papaveg.com",
    store: "Central #01",
    franchise: "Northside Eats",
    role: "Pizza Maker",
    orders: 2440,
    efficiency: 98,
    shift: "Morning",
    status: "Active"
  }
]

export default function KitchenStaffManagement() {
  const [staffList, setStaffList] = useState(INITIAL_STAFF)

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [franchiseFilter, setFranchiseFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [shiftFilter, setShiftFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Table pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Overlay states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [activeMenuId, setActiveMenuId] = useState(null)

  // Modal Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    store: "Downtown #101",
    franchise: "Downtown Pizza Group",
    role: "Pizza Maker",
    orders: 0,
    efficiency: 95,
    shift: "Morning",
    status: "Active"
  })

  // Toast State
  const [toast, setToast] = useState(null)
  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Calculate stats dynamically
  const kpiStats = useMemo(() => {
    const total = staffList.length
    const active = staffList.filter((s) => s.status === "Active").length
    const onShift = staffList.filter((s) => s.status === "Active" && (s.shift === "Morning" || s.shift === "Evening")).length // Mock shift representation
    const offShift = total - onShift

    return {
      total,
      active,
      activePct: total > 0 ? ((active / total) * 100).toFixed(1) : 0,
      onShift,
      onShiftPct: total > 0 ? ((onShift / total) * 100).toFixed(0) : 0,
      offShift
    }
  }, [staffList])

  // Filter list
  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        staff.name.toLowerCase().includes(query) ||
        staff.id.toLowerCase().includes(query)

      const matchesFranchise = !franchiseFilter || staff.franchise === franchiseFilter
      const matchesRole = !roleFilter || staff.role === roleFilter
      const matchesShift = !shiftFilter || staff.shift === shiftFilter
      const matchesStatus = !statusFilter || staff.status === statusFilter

      return matchesSearch && matchesFranchise && matchesRole && matchesShift && matchesStatus
    })
  }, [staffList, searchQuery, franchiseFilter, roleFilter, shiftFilter, statusFilter])

  // Paginated list
  const paginatedStaff = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredStaff.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredStaff, currentPage])

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage)

  const handleOpenAddModal = () => {
    setSelectedStaff(null)
    setFormData({
      name: "",
      email: "",
      store: "Downtown #101",
      franchise: "Downtown Pizza Group",
      role: "Pizza Maker",
      orders: 0,
      efficiency: 95,
      shift: "Morning",
      status: "Active"
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (staff) => {
    setSelectedStaff(staff)
    setFormData({
      name: staff.name,
      email: staff.email || "",
      store: staff.store,
      franchise: staff.franchise,
      role: staff.role,
      orders: staff.orders,
      efficiency: staff.efficiency,
      shift: staff.shift,
      status: staff.status
    })
    setIsModalOpen(true)
    setActiveMenuId(null)
  }

  const handleSaveStaff = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return alert("Name is required")

    if (selectedStaff) {
      // Edit
      setStaffList((prev) =>
        prev.map((s) => (s.id === selectedStaff.id ? { ...s, ...formData } : s))
      )
      showToast(`Updated staff details for ${formData.name}`, "success")
    } else {
      // Add
      const newStaff = {
        id: `KS-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData
      }
      setStaffList((prev) => [newStaff, ...prev])
      showToast(`Added new kitchen staff ${formData.name}`, "success")
    }
    setIsModalOpen(false)
  }

  const handleDeleteStaff = (staff) => {
    if (window.confirm(`Are you sure you want to remove kitchen staff ${staff.name}?`)) {
      setStaffList((prev) => prev.filter((s) => s.id !== staff.id))
      showToast(`Removed staff member ${staff.name}`, "warning")
      setActiveMenuId(null)
    }
  }

  const handleToggleStatus = (staff) => {
    const nextStatus = staff.status === "Active" ? "Inactive" : "Active"
    setStaffList((prev) =>
      prev.map((s) => (s.id === staff.id ? { ...s, status: nextStatus } : s))
    )
    showToast(`${staff.name} is now ${nextStatus}`, nextStatus === "Active" ? "success" : "warning")
    setActiveMenuId(null)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setFranchiseFilter("")
    setRoleFilter("")
    setShiftFilter("")
    setStatusFilter("")
    setCurrentPage(1)
    showToast("Filters reset successfully!", "success")
  }

  const getShiftBadge = (shift) => {
    switch (shift) {
      case "Morning":
        return (
          <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 rounded-full font-semibold text-xs flex items-center w-fit gap-1">
            <Sun size={12} />
            Morning
          </span>
        )
      case "Evening":
        return (
          <span className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30 rounded-full font-semibold text-xs flex items-center w-fit gap-1">
            <Sunset size={12} />
            Evening
          </span>
        )
      case "Night":
        return (
          <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30 rounded-full font-semibold text-xs flex items-center w-fit gap-1">
            <Moon size={12} />
            Night
          </span>
        )
      default:
        return null
    }
  }

  const getProfileImage = (name) => {
    if (name?.toLowerCase().includes("antonio")) return "/chef_antonio.webp"
    if (name?.toLowerCase().includes("sarah")) return "/chef_sarah.webp"
    if (name?.toLowerCase().includes("marco")) return "/chef_marco.webp"
    if (name?.toLowerCase().includes("elena")) return "/chef_elena.webp"
    return "/chef_antonio.webp"
  }

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 md:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl bg-zinc-900 text-white dark:bg-zinc-800 text-xs font-bold border border-zinc-700/50"
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

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Kitchen Staff
          </h1>
          <p className="text-zinc-400 font-semibold text-xs mt-0.5">
            Manage kitchen employees across all franchises and stores.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl text-xs font-bold shadow-md shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus size={16} className="stroke-[3]" />
          <span>Add New Staff</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Staff */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[var(--primary)]">
                <Users size={20} />
              </span>
              <span className="text-emerald-500 font-bold text-xs flex items-center gap-0.5">
                <TrendingUp size={12} />
                +12%
              </span>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Total Kitchen Staff</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.total}</h2>
          </div>
          <div className="h-6 mt-4 w-full bg-zinc-100 dark:bg-zinc-850 rounded relative overflow-hidden">
            <div className="absolute inset-0 flex items-end gap-1 px-1.5">
              <div className="w-full bg-[var(--primary)]/20 h-1/3 rounded-t-sm" />
              <div className="w-full bg-[var(--primary)]/20 h-2/3 rounded-t-sm" />
              <div className="w-full bg-[var(--primary)]/30 h-1/2 rounded-t-sm" />
              <div className="w-full bg-[var(--primary)]/50 h-3/4 rounded-t-sm" />
              <div className="w-full bg-[var(--primary)]/40 h-2/5 rounded-t-sm" />
              <div className="w-full bg-[var(--primary)] h-5/6 rounded-t-sm" />
            </div>
          </div>
        </div>

        {/* Active Staff */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-green-500/10 rounded-xl text-green-600">
                <CheckCircle size={20} />
              </span>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Active Staff</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.active}</h2>
          </div>
          <p className="text-zinc-400 dark:text-zinc-550 font-semibold text-[10px] mt-4">
            {kpiStats.activePct}% of total workforce
          </p>
        </div>

        {/* On Shift */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-amber-500/10 rounded-xl text-amber-600">
                <Clock size={20} />
              </span>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">On Shift</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.onShift}</h2>
          </div>
          <div className="w-full bg-zinc-150 dark:bg-zinc-800 rounded-full h-1.5 mt-4">
            <div className="bg-amber-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${kpiStats.onShiftPct}%` }} />
          </div>
        </div>

        {/* Off Shift */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500">
                <UserX size={20} />
              </span>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Off Shift</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.offShift}</h2>
          </div>
          <p className="text-zinc-400 dark:text-zinc-550 font-semibold text-[10px] mt-4">
            Currently unavailable
          </p>
        </div>
      </section>

      {/* Filters Component */}
      <KitchenStaffFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        franchiseFilter={franchiseFilter}
        setFranchiseFilter={setFranchiseFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        shiftFilter={shiftFilter}
        setShiftFilter={setShiftFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onReset={handleResetFilters}
      />

      {/* Main Responsive Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm mt-6">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider w-16">
                  Profile
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Orders
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Efficiency
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
              {paginatedStaff.length > 0 ? (
                paginatedStaff.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors group cursor-pointer"
                    onClick={() => { setSelectedStaff(staff); setIsDetailDrawerOpen(true); }}
                  >
                    {/* Profile */}
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-150 dark:border-zinc-800 bg-zinc-100">
                        <img
                          src={getProfileImage(staff.name)}
                          alt={staff.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Employee Name */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50 group-hover:text-[var(--primary)] transition-colors">
                          {staff.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-semibold mt-0.5">{staff.id}</span>
                      </div>
                    </td>

                    {/* Store */}
                    <td className="px-6 py-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {staff.store}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 rounded-full">
                        {staff.role}
                      </span>
                    </td>

                    {/* Orders */}
                    <td className="px-6 py-4 text-xs font-extrabold text-zinc-950 dark:text-zinc-50 text-center">
                      {staff.orders.toLocaleString()}
                    </td>

                    {/* Efficiency */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-450">{staff.efficiency}%</span>
                    </td>

                    {/* Shift */}
                    <td className="px-6 py-4">
                      {getShiftBadge(staff.shift)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full ${staff.status === "Active"
                            ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30"
                            : staff.status === "Inactive"
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700/35"
                              : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                          }`}
                      >
                        {staff.status}
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td className="px-6 py-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === staff.id ? null : staff.id)}
                        className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-250 transition-colors cursor-pointer"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Action Popover */}
                      <AnimatePresence>
                        {activeMenuId === staff.id && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setActiveMenuId(null)} />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 5 }}
                              className="absolute right-6 top-10 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-40 p-1.5"
                            >
                              <button
                                onClick={() => { setSelectedStaff(staff); setIsDetailDrawerOpen(true); setActiveMenuId(null); }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-600 hover:text-[var(--primary)] dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                              >
                                <Users size={14} />
                                <span>View Details</span>
                              </button>

                              <button
                                onClick={() => handleOpenEditModal(staff)}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-600 hover:text-[var(--primary)] dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                              >
                                <Edit size={14} />
                                <span>Edit Employee</span>
                              </button>

                              <button
                                onClick={() => handleToggleStatus(staff)}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-600 hover:text-[var(--primary)] dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                              >
                                {staff.status === "Active" ? <Ban size={14} /> : <UserCheck size={14} />}
                                <span>{staff.status === "Active" ? "Suspend" : "Activate"}</span>
                              </button>

                              <div className="h-px bg-zinc-100 dark:bg-zinc-850 my-1" />

                              <button
                                onClick={() => handleDeleteStaff(staff)}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                              >
                                <Trash2 size={14} />
                                <span>Delete Member</span>
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <Users size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">No Kitchen Staff Found</p>
                        <p className="text-xs text-zinc-400 font-semibold mt-0.5">
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

        {/* Pagination Footer */}
        {filteredStaff.length > 0 && (
          <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of {filteredStaff.length} members
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-850 disabled:opacity-40 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${currentPage === i + 1
                      ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/10"
                      : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-850 disabled:opacity-40 transition-all flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inline Add/Edit Modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-[121]"
            >
              <div className="px-6 py-5 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-50">
                    {selectedStaff ? "Edit Kitchen Staff" : "Add Kitchen Staff"}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                    {selectedStaff ? `Update credentials for ${selectedStaff.name}` : "Onboard a new employee to the kitchen"}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X size={18} className="text-zinc-500 hover:text-zinc-700" />
                </button>
              </div>

              <form onSubmit={handleSaveStaff} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Employee Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Antonio Rossi"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-150 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. chef@papaveg.com"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-150 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Store */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Store</label>
                    <select
                      value={formData.store}
                      onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="Downtown #101">Downtown #101</option>
                      <option value="Westside #203">Westside #203</option>
                      <option value="Uptown #05">Uptown #05</option>
                      <option value="Central #01">Central #01</option>
                    </select>
                  </div>

                  {/* Franchise */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Franchise</label>
                    <select
                      value={formData.franchise}
                      onChange={(e) => setFormData({ ...formData, franchise: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="Downtown Pizza Group">Downtown Group</option>
                      <option value="Westside Express">Westside Express</option>
                      <option value="Northside Eats">Northside Eats</option>
                    </select>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="Pizza Maker">Pizza Maker</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Prep Cook">Prep Cook</option>
                      <option value="Dishwasher">Dishwasher</option>
                    </select>
                  </div>

                  {/* Shift */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Shift</label>
                    <select
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>

                  {/* Orders */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Orders Handled</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.orders}
                      onChange={(e) => setFormData({ ...formData, orders: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  {/* Efficiency */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Efficiency (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.efficiency}
                      onChange={(e) => setFormData({ ...formData, efficiency: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-1.5">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-150 dark:border-zinc-850">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 font-bold text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl font-bold text-xs shadow-md shadow-[var(--primary)]/10 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Staff Detail Drawer */}
      <KitchenStaffDetail
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        staff={selectedStaff}
        onEdit={(staff) => {
          setIsDetailDrawerOpen(false);
          handleOpenEditModal(staff);
        }}
        onSuspend={(staff) => {
          handleToggleStatus(staff);
        }}
      />

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-zinc-200 dark:border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400 font-semibold">© 2024 Papa Veg Operations</p>
        <div className="flex items-center gap-6 text-xs font-bold text-zinc-400">
          <a className="hover:text-[var(--primary)] transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-[var(--primary)] transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-[var(--primary)] transition-colors" href="#">Support</a>
        </div>
      </footer>
    </div>
  )
}
