import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ListFilter,
  MoreVertical,
  User,
  Eye,
  Edit,
  History,
  Ban,
  UserCheck,
  X,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react"

// Rich Mock Customers Data for robust filtering
const INITIAL_CUSTOMERS = [
  {
    id: "CUST-9842",
    name: "Marco Rossi",
    email: "marco.r@example.com",
    phone: "+39 333 456 7890",
    status: "ACTIVE",
    loyalty: "Gold Tier",
    orders: 14,
    spent: 1250,
    memberSince: "Oct 12, 2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh75eq_s9eg7xnwZQcweM7ldZvNc3ToQs4NGIReb_UgvLSGQnJfAZLHzsW-oFaE7kSdmx-5FCwFlTW4jLwsiMwSDm3LkauPnHcQNLLIHCIKbRaD4XmGQopNE_WtKDpVBKyt2HMVTctdCoOzOrplhsnwdLHrjss29Gq6m2qFyscXr-pZCd2d6MC3J_C8WeHh4BaM02aPHt-vBlRTITRokmD0AvKuG6tGel5STb4VKb2Ir2yjICGcgDs59l4ofn389Nw8XvHNJ_SQcoS"
  },
  {
    id: "CUST-7215",
    name: "Elena Vance",
    email: "elena.v@example.com",
    phone: "+39 342 112 0044",
    status: "BLOCKED",
    loyalty: "Silver Tier",
    orders: 8,
    spent: 720,
    memberSince: "Sep 15, 2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6n4i4OqmTeyK-H0oq23VRRrSr1yhXRFFvHwCKd7u_bH_34RtmKQq0_lsfGxNd4Nnd-HdPct9xcvqPFdGomJO33cw3CSJnTqYTNahxg4LFhDaNs5sf_iBcwt5_cF-21mbpQd5ivvJ_W5hvbT-jE2hWn_KLZjLMXmNkopAdMum1UwCR8pW3aUMCcy5GlRqbR1uziSRABGtiHcuGjDCQXeLGV4Dexv6oLTDnO0lIagYabizec_qJ7KCEijke0H795e-zS-dSZGWzz93B"
  },
  {
    id: "CUST-5501",
    name: "Luca Moretti",
    email: "luca.m@example.com",
    phone: "+39 321 009 8877",
    status: "SUSPENDED",
    loyalty: "Platinum Tier",
    orders: 28,
    spent: 2450,
    memberSince: "Nov 02, 2022",
    avatar: ""
  },
  {
    id: "CUST-2234",
    name: "Alice Smith",
    email: "alice.s@example.com",
    phone: "+1 234 567 8910",
    status: "ACTIVE",
    loyalty: "Platinum Tier",
    orders: 34,
    spent: 3100,
    memberSince: "Jun 04, 2022",
    avatar: ""
  },
  {
    id: "CUST-4112",
    name: "Chloe Bennett",
    email: "chloe.b@example.com",
    phone: "+1 415 982 1204",
    status: "ACTIVE",
    loyalty: "Gold Tier",
    orders: 11,
    spent: 980,
    memberSince: "Jan 20, 2024",
    avatar: ""
  },
  {
    id: "CUST-1049",
    name: "David Miller",
    email: "david.m@example.com",
    phone: "+1 617 384 9081",
    status: "SUSPENDED",
    loyalty: "Silver Tier",
    orders: 2,
    spent: 150,
    memberSince: "Feb 10, 2024",
    avatar: ""
  },
  {
    id: "CUST-8831",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "+1 305 771 9082",
    status: "ACTIVE",
    loyalty: "Gold Tier",
    orders: 16,
    spent: 1420,
    memberSince: "Dec 01, 2023",
    avatar: ""
  }
]

export default function CustomerList() {
  const navigate = useNavigate()

  // State Management
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [loyaltyFilter, setLoyaltyFilter] = useState("All Tiers")
  const [sortBy, setSortBy] = useState("Name A-Z")
  
  // Dropdown states for premium UI toggles
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showLoyaltyDropdown, setShowLoyaltyDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Selected customer for Bottom Sheet Actions Drawer
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  
  // Toast notifications for mock actions
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Filter & Sort Logic
  const filteredAndSortedCustomers = useMemo(() => {
    return customers
      .filter((cust) => {
        // Search Filter
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          cust.name.toLowerCase().includes(query) ||
          cust.email.toLowerCase().includes(query) ||
          cust.phone.includes(query) ||
          cust.id.toLowerCase().includes(query)

        // Status Filter
        const matchesStatus =
          statusFilter === "All Statuses" || cust.status === statusFilter

        // Loyalty Filter
        const matchesLoyalty =
          loyaltyFilter === "All Tiers" || cust.loyalty === loyaltyFilter

        return matchesSearch && matchesStatus && matchesLoyalty
      })
      .sort((a, b) => {
        if (sortBy === "Name A-Z") {
          return a.name.localeCompare(b.name)
        }
        if (sortBy === "Name Z-A") {
          return b.name.localeCompare(a.name)
        }
        if (sortBy === "Orders Count") {
          return b.orders - a.orders
        }
        if (sortBy === "Revenue Spent") {
          return b.spent - a.spent
        }
        return 0
      })
  }, [customers, searchQuery, statusFilter, loyaltyFilter, sortBy])

  // Account suspension toggler inside list state
  const handleToggleSuspension = (id) => {
    setCustomers((prev) =>
      prev.map((cust) => {
        if (cust.id === id) {
          const isCurrentlyActive = cust.status === "ACTIVE"
          const nextStatus = isCurrentlyActive ? "SUSPENDED" : "ACTIVE"
          showToast(
            `${cust.name}'s account is now ${nextStatus === "ACTIVE" ? "Activated" : "Suspended"}!`,
            nextStatus === "ACTIVE" ? "success" : "warning"
          )
          return { ...cust, status: nextStatus }
        }
        return cust
      })
    )
    setSelectedCustomer(null)
  }

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Toast Alert Banner */}
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

      {/* Top Navigation & Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/food/superadmin/customers")}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-350 transition-colors cursor-pointer"
            aria-label="Back to Analysis Overview"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Customer Directory
            </h1>
            <p className="text-zinc-400 font-semibold text-xs mt-0.5">
              Manage accounts, loyalty tiers, and status configurations.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Search & Filters Row */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center justify-between mb-6">
        {/* Search Bar Input */}
        <div className="relative md:col-span-6 lg:col-span-5 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone or ID..."
            className="w-full text-xs pl-12 pr-4 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters Select Dropdowns */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-nowrap overflow-x-auto pb-1.5 scrollbar-none gap-2.5 w-full justify-start md:justify-end select-none">
          {/* Status Filter Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown)
                setShowLoyaltyDropdown(false)
                setShowSortDropdown(false)
              }}
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm transition-colors cursor-pointer"
            >
              <span>{statusFilter}</span>
              <ChevronDown size={14} className={`opacity-60 transition-transform ${showStatusDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showStatusDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowStatusDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 shadow-xl z-40 p-1"
                  >
                    {["All Statuses", "ACTIVE", "BLOCKED", "SUSPENDED"].map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          setStatusFilter(st)
                          setShowStatusDropdown(false)
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                          statusFilter === st ? "text-[var(--primary)] font-bold bg-[var(--primary)]/5" : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Loyalty Tier Filter Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => {
                setShowLoyaltyDropdown(!showLoyaltyDropdown)
                setShowStatusDropdown(false)
                setShowSortDropdown(false)
              }}
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm transition-colors cursor-pointer"
            >
              <span>{loyaltyFilter}</span>
              <ChevronDown size={14} className={`opacity-60 transition-transform ${showLoyaltyDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showLoyaltyDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowLoyaltyDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 shadow-xl z-40 p-1"
                  >
                    {["All Tiers", "Gold Tier", "Silver Tier", "Platinum Tier"].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setLoyaltyFilter(t)
                          setShowLoyaltyDropdown(false)
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                          loyaltyFilter === t ? "text-[var(--primary)] font-bold bg-[var(--primary)]/5" : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Sort By Filter Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => {
                setShowSortDropdown(!showSortDropdown)
                setShowStatusDropdown(false)
                setShowLoyaltyDropdown(false)
              }}
              className="flex items-center gap-2 px-4 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-full text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <ListFilter size={14} />
              <span>Sort By: {sortBy}</span>
              <ChevronDown size={14} className="opacity-80" />
            </button>
            <AnimatePresence>
              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowSortDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 shadow-xl z-40 p-1"
                  >
                    {["Name A-Z", "Name Z-A", "Orders Count", "Revenue Spent"].map((sort) => (
                      <button
                        key={sort}
                        onClick={() => {
                          setSortBy(sort)
                          setShowSortDropdown(false)
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                          sortBy === sort ? "text-[var(--primary)] font-bold bg-[var(--primary)]/5" : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {sort}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Customers List Directory Area */}
      <section className="space-y-3">
        {filteredAndSortedCustomers.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {filteredAndSortedCustomers.map((cust) => (
              <motion.div
                key={cust.id}
                layoutId={`customer-card-${cust.id}`}
                className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[var(--primary)]/30 p-4 rounded-2xl hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  {cust.avatar ? (
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="w-12 h-12 rounded-full object-cover border border-zinc-250 dark:border-zinc-800 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-bold text-xs shadow-inner">
                      {cust.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 truncate group-hover:text-[var(--primary)] transition-colors">
                      {cust.name}
                    </h4>
                    <div className="text-[10px] text-zinc-400 font-semibold flex flex-wrap items-center gap-2 mt-1">
                      <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                        {cust.id}
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span>{cust.email}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{cust.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t border-zinc-100 dark:border-zinc-800 sm:border-0 flex-shrink-0">
                  {/* Status Badge */}
                  <span
                    className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full ${
                      cust.status === "ACTIVE"
                        ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30"
                        : cust.status === "BLOCKED"
                        ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
                        : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                    }`}
                  >
                    {cust.status}
                  </span>

                  <div className="flex flex-col text-left sm:text-right">
                    <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-50">${cust.spent} spent</p>
                    <p className="text-[9px] text-zinc-400 font-semibold mt-0.5">{cust.orders} orders</p>
                  </div>

                  {/* Actions vertical dot button */}
                  <button
                    onClick={() => setSelectedCustomer(cust)}
                    className="p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 active:scale-90 transition-all cursor-pointer"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <User size={32} />
            </div>
            <div>
              <h5 className="font-extrabold text-base text-zinc-800 dark:text-zinc-200">No Customers Found</h5>
              <p className="text-xs text-zinc-400 font-semibold mt-1">Try adjusting your filters or search terms.</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery("")
                setStatusFilter("All Statuses")
                setLoyaltyFilter("All Tiers")
                setSortBy("Name A-Z")
              }}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Premium Sliding Bottom Sheet Overlay */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] cursor-pointer"
            />

            {/* Slide up sheet drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 rounded-t-[2.5rem] border-t border-zinc-150 dark:border-zinc-850 p-6 z-[105] shadow-2xl max-w-xl mx-auto right-0"
            >
              {/* Top Drag Indicator */}
              <div className="w-12 h-1.5 bg-zinc-250 dark:bg-zinc-800 rounded-full mx-auto mb-6" />

              {/* Title & Customer Subtitle */}
              <div className="mb-6 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {selectedCustomer.avatar ? (
                    <img
                      src={selectedCustomer.avatar}
                      alt={selectedCustomer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-xs">
                      {selectedCustomer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-50">
                      {selectedCustomer.name}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1 mt-0.5">
                      <span>{selectedCustomer.id}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Star size={9} className="fill-amber-500 stroke-none" />
                        {selectedCustomer.loyalty}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Action Buttons list */}
              <div className="space-y-1">
                <button
                  onClick={() => navigate(`/food/superadmin/customers/profile/${selectedCustomer.id}`)}
                  className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-[var(--primary)] text-xs font-extrabold group cursor-pointer"
                >
                  <Eye size={16} className="text-zinc-400 group-hover:text-[var(--primary)]" />
                  <span>View Details Profile</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`Editing profile for ${selectedCustomer.name} is not available in mock mode.`)
                    setSelectedCustomer(null)
                  }}
                  className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 text-xs font-extrabold cursor-pointer"
                >
                  <Edit size={16} className="text-zinc-400" />
                  <span>Edit Profile Details</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`Routing to order logs for ${selectedCustomer.name}...`)
                    setSelectedCustomer(null)
                  }}
                  className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 text-xs font-extrabold cursor-pointer"
                >
                  <History size={16} className="text-zinc-400" />
                  <span>Order Transaction History</span>
                </button>

                <div className="h-px bg-zinc-150 dark:bg-zinc-800 my-2" />

                {/* REAL-TIME SUSPENSION TRIGGER BUTTON */}
                {selectedCustomer.status === "ACTIVE" ? (
                  <button
                    onClick={() => handleToggleSuspension(selectedCustomer.id)}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-rose-600 text-xs font-extrabold cursor-pointer"
                  >
                    <Ban size={16} />
                    <span>Suspend Customer Account</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleSuspension(selectedCustomer.id)}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors text-emerald-600 text-xs font-extrabold cursor-pointer"
                  >
                    <UserCheck size={16} />
                    <span>Re-Activate Customer Account</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-full mt-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
              >
                Close Actions Menu
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
