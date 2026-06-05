import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MoreVertical,
  Eye,
  Edit,
  Ban,
  UserCheck,
  Trash2,
  CheckCircle,
  AlertCircle,
  Bike,
  Car,
  Plus,
  Star,
  ChevronRight,
  ChevronLeft,
  Users,
  Radio,
  PowerOff,
  Truck,
  ShieldAlert
} from "lucide-react"

// Import custom subcomponents
import DeliveryPartnersFilters from "./DeliveryPartnersFilters"
import DeliveryPartnerDetailsDrawer from "./DeliveryPartnerDetailsDrawer"
import EditDeliveryPartnerModal from "./EditDeliveryPartnerModal"
import DeliverySuspendedModal from "./DeliverySuspendedModal"

const INITIAL_RIDERS = [
  {
    id: "RP-88421",
    name: "Alex Rivera",
    email: "alex.rivera@papaveg.com",
    phone: "+1 212-555-0192",
    store: "NYC Downtown",
    franchise: "NYC Metro",
    vehicle: "Electric Bike",
    vehicleModel: "NIU N-Series",
    licenseNumber: "ABC-1234-NY",
    totalOrders: 450,
    completedOrders: 450,
    cancelledOrders: 5,
    rating: 4.8,
    status: "Online",
    address: "722 Broadway St, Manhattan, Suite 4B",
    storeManager: "Sarah Jenkins",
    priorityRouting: true,
    recentDeliveries: [
      { id: "ORD-11498", date: "Today, 02:45 PM", status: "Delivered", earnings: 12.50 },
      { id: "ORD-11495", date: "Today, 01:12 PM", status: "Delivered", earnings: 8.75 },
      { id: "ORD-11490", date: "Today, 11:30 AM", status: "Failed", earnings: 0.00 },
      { id: "ORD-11488", date: "Yesterday, 09:15 PM", status: "Delivered", earnings: 15.20 },
      { id: "ORD-11482", date: "Yesterday, 08:30 PM", status: "Delivered", earnings: 9.40 }
    ]
  },
  {
    id: "RP-88422",
    name: "Elena Gomez",
    email: "elena.gomez@papaveg.com",
    phone: "+1 212-555-0841",
    store: "Jersey Heights",
    franchise: "Jersey Shore",
    vehicle: "Scooter",
    vehicleModel: "Vespa Elettrica",
    licenseNumber: "XYZ-5678-NJ",
    totalOrders: 328,
    completedOrders: 328,
    cancelledOrders: 2,
    rating: 4.9,
    status: "Busy",
    address: "415 Ocean Ave, Jersey City, NJ 07302",
    storeManager: "Marcus Aurelius",
    priorityRouting: false,
    recentDeliveries: [
      { id: "ORD-11488", date: "Yesterday, 09:15 PM", status: "Delivered", earnings: 15.20 },
      { id: "ORD-11482", date: "Yesterday, 08:30 PM", status: "Delivered", earnings: 9.40 }
    ]
  },
  {
    id: "RP-88423",
    name: "Marcus Chen",
    email: "marcus.chen@papaveg.com",
    phone: "+1 212-555-0374",
    store: "NYC Midtown",
    franchise: "NYC Metro",
    vehicle: "Car",
    vehicleModel: "Tesla Model 3",
    licenseNumber: "MCN-9012-NY",
    totalOrders: 1102,
    completedOrders: 1102,
    cancelledOrders: 18,
    rating: 4.7,
    status: "Offline",
    address: "789 Lex Ave, New York, NY 10021",
    storeManager: "David Miller",
    priorityRouting: true,
    recentDeliveries: [
      { id: "ORD-11475", date: "2 days ago", status: "Delivered", earnings: 18.00 },
      { id: "ORD-11471", date: "2 days ago", status: "Delivered", earnings: 11.25 }
    ]
  },
  {
    id: "RP-88424",
    name: "James Wilson",
    email: "james.wilson@papaveg.com",
    phone: "+1 212-555-0629",
    store: "Brooklyn East",
    franchise: "NYC Metro",
    vehicle: "Electric Bike",
    vehicleModel: "Rad Power RadCity",
    licenseNumber: "JWL-3456-NY",
    totalOrders: 84,
    completedOrders: 84,
    cancelledOrders: 12,
    rating: 3.2,
    status: "Suspended",
    address: "101 Flatbush Ave, Brooklyn, NY 11217",
    storeManager: "Sarah Jenkins",
    priorityRouting: false,
    recentDeliveries: [
      { id: "ORD-11425", date: "3 days ago", status: "Failed", earnings: 0.00 }
    ]
  }
]

export default function DeliveryPartnersManagement() {
  const [riders, setRiders] = useState(INITIAL_RIDERS)

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [franchiseFilter, setFranchiseFilter] = useState("All Franchises")
  const [storeFilter, setStoreFilter] = useState("All Stores")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [vehicleFilter, setVehicleFilter] = useState("Vehicle Type")

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Overlay Trigger States
  const [selectedRider, setSelectedRider] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
  const [activeMenuId, setActiveMenuId] = useState(null)

  // Toast notifications state
  const [toast, setToast] = useState(null)
  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Calculate stats dynamically
  const kpiStats = useMemo(() => {
    return {
      total: riders.length,
      online: riders.filter((r) => r.status === "Online").length,
      offline: riders.filter((r) => r.status === "Offline").length,
      onDelivery: riders.filter((r) => r.status === "Busy").length,
      suspended: riders.filter((r) => r.status === "Suspended").length,
    }
  }, [riders])

  // Filter logic
  const filteredRiders = useMemo(() => {
    return riders.filter((rider) => {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        rider.name.toLowerCase().includes(query) ||
        rider.phone.includes(query) ||
        rider.id.toLowerCase().includes(query) ||
        rider.vehicle.toLowerCase().includes(query)

      const matchesFranchise =
        franchiseFilter === "All Franchises" || rider.franchise === franchiseFilter

      const matchesStore =
        storeFilter === "All Stores" || rider.store.toLowerCase().includes(storeFilter.toLowerCase())

      const matchesStatus =
        statusFilter === "All Statuses" || rider.status === statusFilter

      const matchesVehicle =
        vehicleFilter === "Vehicle Type" || rider.vehicle === vehicleFilter

      return matchesSearch && matchesFranchise && matchesStore && matchesStatus && matchesVehicle
    })
  }, [riders, searchQuery, franchiseFilter, storeFilter, statusFilter, vehicleFilter])

  // Paginated results
  const paginatedRiders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredRiders.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredRiders, currentPage])

  const totalPages = Math.ceil(filteredRiders.length / itemsPerPage)

  const handleSaveRider = (savedData) => {
    const exists = riders.some((r) => r.id === savedData.id)
    if (exists) {
      // Edit mode
      setRiders((prev) => prev.map((r) => (r.id === savedData.id ? savedData : r)))
      showToast(`Updated details for ${savedData.name}!`, "success")
    } else {
      // Add mode
      setRiders((prev) => [savedData, ...prev])
      showToast(`Successfully added delivery partner ${savedData.name}!`, "success")
    }
    setIsEditModalOpen(false)
    setSelectedRider(null)
  }

  const handleSuspendToggle = (rider) => {
    if (rider.status === "Suspended") {
      setRiders((prev) =>
        prev.map((r) => (r.id === rider.id ? { ...r, status: "Online" } : r))
      )
      showToast(`${rider.name} has been activated!`, "success")
      setActiveMenuId(null)
      setSelectedRider((prev) => (prev && prev.id === rider.id ? { ...prev, status: "Online" } : prev))
    } else {
      setIsDrawerOpen(false)
      setSelectedRider(rider)
      setIsSuspendModalOpen(true)
      setActiveMenuId(null)
    }
  }

  const handleConfirmSuspension = (rider, reason, notes) => {
    setRiders((prev) =>
      prev.map((r) => (r.id === rider.id ? { ...r, status: "Suspended" } : r))
    )
    showToast(`${rider.name} is now Suspended!`, "warning")
    setIsSuspendModalOpen(false)
    setSelectedRider(null)
  }

  const handleDeleteRider = (rider) => {
    if (window.confirm(`Are you sure you want to remove delivery partner ${rider.name}?`)) {
      setRiders((prev) => prev.filter((r) => r.id !== rider.id))
      showToast(`Removed delivery partner ${rider.name}`, "warning")
      setActiveMenuId(null)
      if (selectedRider?.id === rider.id) {
        setIsDrawerOpen(false)
        setSelectedRider(null)
      }
    }
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setFranchiseFilter("All Franchises")
    setStoreFilter("All Stores")
    setStatusFilter("All Statuses")
    setVehicleFilter("Vehicle Type")
    setCurrentPage(1)
    showToast("Filters reset successful!", "success")
  }

  const getVehicleIcon = (vehicle) => {
    switch (vehicle) {
      case "Car":
        return <Car size={16} />
      default:
        return <Bike size={16} />
    }
  }

  const getProfileImage = (name) => {
    if (name?.toLowerCase().includes("alex")) return "/rider_alex.webp"
    if (name?.toLowerCase().includes("elena")) return "/rider_elena.webp"
    if (name?.toLowerCase().includes("marcus")) return "/rider_marcus.webp"
    return "/rider_alex.webp" // Default fallback
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

      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Delivery Partners
          </h1>
          <p className="text-zinc-400 font-semibold text-xs mt-0.5">
            Manage delivery riders across all stores
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedRider(null)
            setIsEditModalOpen(true)
          }}
          className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl text-xs font-bold shadow-md shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus size={16} className="stroke-[3]" />
          <span>Add Delivery Partner</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Total Riders */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[var(--primary)]">
              <Users size={20} />
            </div>
            <span className="text-emerald-500 font-bold text-xs">+12%</span>
          </div>
          <div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Total Riders</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.total}</h2>
          </div>
        </div>

        {/* Online Riders */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-500/10 rounded-xl text-green-600">
              <Radio size={20} className="animate-pulse" />
            </div>
            <span className="text-emerald-500 font-bold text-xs">+5%</span>
          </div>
          <div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Online</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.online}</h2>
          </div>
        </div>

        {/* Offline Riders */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500">
              <PowerOff size={20} />
            </div>
            <span className="text-rose-500 font-bold text-xs">-2%</span>
          </div>
          <div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Offline</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.offline}</h2>
          </div>
        </div>

        {/* On Delivery Riders */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600">
              <Truck size={20} />
            </div>
            <span className="text-emerald-500 font-bold text-xs">+18%</span>
          </div>
          <div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">On Delivery</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.onDelivery}</h2>
          </div>
        </div>

        {/* Suspended Riders */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-600">
              <ShieldAlert size={20} />
            </div>
            <span className="text-rose-500 font-bold text-xs">+3%</span>
          </div>
          <div>
            <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Suspended</p>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">{kpiStats.suspended}</h2>
          </div>
        </div>
      </section>

      {/* Filter Options */}
      <DeliveryPartnersFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        franchiseFilter={franchiseFilter}
        setFranchiseFilter={setFranchiseFilter}
        storeFilter={storeFilter}
        setStoreFilter={setStoreFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        vehicleFilter={vehicleFilter}
        setVehicleFilter={setVehicleFilter}
        onReset={handleResetFilters}
      />

      {/* Main Responsive Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm mt-6">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Orders
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Rating
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
              {paginatedRiders.length > 0 ? (
                paginatedRiders.map((rider) => (
                  <tr
                    key={rider.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors group cursor-pointer"
                    onClick={() => {
                      setSelectedRider(rider)
                      setIsDrawerOpen(true)
                    }}
                  >
                    {/* Partner Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-800">
                          <img
                            src={getProfileImage(rider.name)}
                            alt={rider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50 group-hover:text-[var(--primary)] transition-colors">
                            {rider.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">{rider.phone}</p>
                        </div>
                      </div>
                    </td>

                    {/* Store */}
                    <td className="px-6 py-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {rider.store}
                    </td>

                    {/* Vehicle */}
                    <td className="px-6 py-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-400">{getVehicleIcon(rider.vehicle)}</span>
                        <span>{rider.vehicle}</span>
                      </div>
                    </td>

                    {/* Total Orders */}
                    <td className="px-6 py-4 text-xs font-extrabold text-zinc-950 dark:text-zinc-50 text-center">
                      {rider.totalOrders}
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={14} className="fill-amber-400 stroke-none" />
                        <span className="text-xs font-bold text-zinc-850 dark:text-zinc-150">{rider.rating}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full ${rider.status === "Online"
                          ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30"
                          : rider.status === "Busy"
                            ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
                            : rider.status === "Offline"
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700/35"
                              : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                          }`}
                      >
                        {rider.status}
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td className="px-6 py-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === rider.id ? null : rider.id)}
                        className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Action Popover */}
                      <AnimatePresence>
                        {activeMenuId === rider.id && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setActiveMenuId(null)} />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 5 }}
                              className="absolute right-6 top-10 w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-40 p-1.5"
                            >
                              <button
                                onClick={() => {
                                  setSelectedRider(rider)
                                  setIsDrawerOpen(true)
                                  setActiveMenuId(null)
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-600 hover:text-[var(--primary)] dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                              >
                                <Eye size={14} />
                                <span>View Profile Drawer</span>
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedRider(rider)
                                  setIsEditModalOpen(true)
                                  setActiveMenuId(null)
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-600 hover:text-[var(--primary)] dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                              >
                                <Edit size={14} />
                                <span>Edit Profile details</span>
                              </button>

                              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />

                              <button
                                onClick={() => handleSuspendToggle(rider)}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold transition-colors ${rider.status === "Suspended"
                                  ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                                  : "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                  }`}
                              >
                                {rider.status === "Suspended" ? <UserCheck size={14} /> : <Ban size={14} />}
                                <span>{rider.status === "Suspended" ? "Activate Account" : "Suspend Rider"}</span>
                              </button>

                              <button
                                onClick={() => handleDeleteRider(rider)}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                              >
                                <Trash2 size={14} />
                                <span>Delete Partner</span>
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
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <Truck size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">No Delivery Partners Found</p>
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

        {/* Table Pagination Footer */}
        {filteredRiders.length > 0 && (
          <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRiders.length)} of {filteredRiders.length} partners
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

      {/* Details Profile Drawer */}
      <DeliveryPartnerDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
          setSelectedRider(null)
        }}
        rider={selectedRider}
        onSuspend={handleSuspendToggle}
        onEdit={(rider) => {
          setIsDrawerOpen(false)
          setSelectedRider(rider)
          setIsEditModalOpen(true)
        }}
      />

      {/* Add / Edit Modal */}
      <EditDeliveryPartnerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedRider(null)
        }}
        rider={selectedRider}
        onSave={handleSaveRider}
      />

      {/* Suspend Confirmation Modal */}
      <DeliverySuspendedModal
        isOpen={isSuspendModalOpen}
        onClose={() => {
          setIsSuspendModalOpen(false)
          setSelectedRider(null)
        }}
        rider={selectedRider}
        onConfirm={handleConfirmSuspension}
      />
    </div>
  )
}
