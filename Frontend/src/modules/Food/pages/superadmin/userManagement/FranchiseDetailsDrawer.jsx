import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  User,
  Store,
  MapPin,
  TrendingUp,
  ShieldAlert,
  ClipboardList,
  Mail,
  Phone,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Briefcase
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts"

// Mock rich data corresponding to selected franchise admin
const GENERATED_DETAILS = {
  stores: [
    { name: "Papa Veg Mumbai Central", city: "Mumbai, Maharashtra", type: "Main Bistro", status: "Active", revenue: 84000 },
    { name: "Papa Veg Andheri West", city: "Mumbai, Maharashtra", type: "Express Store", status: "Active", revenue: 54000 },
    { name: "Papa Veg Pune Outlet", city: "Pune, Maharashtra", type: "Bistro Outlet", status: "Inactive", revenue: 12000 }
  ],
  revenueData: [
    { month: "Jan", revenue: 12000, orders: 480 },
    { month: "Feb", revenue: 18000, orders: 620 },
    { month: "Mar", revenue: 15050, orders: 540 },
    { month: "Apr", revenue: 26000, orders: 980 },
    { month: "May", revenue: 32000, orders: 1200 },
    { month: "Jun", revenue: 47000, orders: 1800 }
  ],
  staff: [
    { name: "Ravi Sharma", role: "General Store Manager", store: "Mumbai Central", email: "r.sharma@papaveg.com", status: "Active" },
    { name: "Neha Singh", role: "Assistant Store Manager", store: "Mumbai Central", email: "n.singh@papaveg.com", status: "Active" },
    { name: "Amit Patel", role: "Store Manager", store: "Andheri West", email: "a.patel@papaveg.com", status: "Active" },
    { name: "Priya Desai", role: "Junior Kitchen Manager", store: "Pune Outlet", email: "p.desai@papaveg.com", status: "Suspended" }
  ],
  orders: [
    { id: "ORD-9912", customer: "Rohan Gupta", items: "1x Truffle Pizza, 2x Garlic Bread", amount: 38.50, status: "COMPLETED", time: "10 mins ago" },
    { id: "ORD-9884", customer: "Pooja Verma", items: "2x Spicy Diavola, 1x Veg Salad", amount: 42.00, status: "DELIVERING", time: "25 mins ago" },
    { id: "ORD-9762", customer: "Vikram Malhotra", items: "3x Margherita Classic, 1x Coca Cola 1.5L", amount: 29.90, status: "COMPLETED", time: "2 hours ago" },
    { id: "ORD-9610", customer: "Sanjay Kumar", items: "1x Veggie Garden Special", amount: 15.00, status: "CANCELLED", time: "4 hours ago" }
  ]
}

export default function FranchiseDetailsDrawer({ isOpen, onClose, admin }) {
  const [activeTab, setActiveTab] = useState("Personal")

  if (!admin) return null

  const tabs = [
    { name: "Personal", icon: User },
    { name: "Franchise", icon: Store },
    { name: "Stores", icon: Layers },
    { name: "Analytics", icon: TrendingUp },
    { name: "Staff", icon: Briefcase },
    { name: "Orders", icon: ClipboardList }
  ]

  // Reusable custom chart tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950 text-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-700/50 shadow-xl text-[10px] font-bold">
          <p className="opacity-60">{label}</p>
          <p className="text-[var(--primary)] mt-1">Revenue: ₹{payload[0].value.toLocaleString()}</p>
          {payload[1] && <p className="text-emerald-400 mt-0.5">Orders: {payload[1].value}</p>}
        </div>
      )
    }
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] cursor-pointer"
          />          {/* Sliding Details Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm md:max-w-md bg-zinc-50 dark:bg-zinc-955 border-l border-zinc-150 dark:border-zinc-850 z-[105] shadow-2xl flex flex-col h-full"
          >
            {/* Drawer Header */}
            <div className="px-4 py-2.5 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--primary)]/5 text-[var(--primary)] flex items-center justify-center font-extrabold text-xs border border-[var(--primary)]/20 shadow-inner">
                  {admin.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
                    {admin.name}
                  </h3>
                  <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-1.5 mt-0.5">
                    <span>{admin.id}</span>
                    <span>•</span>
                    <span className="font-bold text-zinc-650 text-zinc-700 dark:text-zinc-350 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                      {admin.franchiseName}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 active:scale-95 transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Horizontal Tabs Row */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-855 flex items-center gap-1 overflow-x-auto pb-0 px-3 py-1.5 flex-shrink-0 scrollbar-none select-none">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.name
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full text-[10px] font-bold transition-all flex-shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon size={12} className="stroke-[2.2]" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Main Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-4 scrollbar-thin">
              <AnimatePresence mode="wait">
                {/* TAB 1: PERSONAL INFORMATION */}
                {activeTab === "Personal" && (
                  <motion.div
                    key="Personal"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3.5 space-y-4 shadow-sm">
                      <h4 className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                        Personal Info Details
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-zinc-400 rounded-xl">
                            <Mail size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] text-zinc-400 font-semibold">Email Address</p>
                            <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{admin.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 text-zinc-400 rounded-xl">
                            <Phone size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] text-zinc-400 font-semibold">Phone Number</p>
                            <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{admin.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 text-zinc-400 rounded-xl">
                            <MapPin size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] text-zinc-400 font-semibold">HQ Location</p>
                            <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                              {admin.city}, {admin.state}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 text-zinc-400 rounded-xl">
                            <Calendar size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] text-zinc-400 font-semibold">Date Registered</p>
                            <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{admin.joinedDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-4">
                      <h4 className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                        Operational Status
                      </h4>
                      <div className="flex items-center gap-4 pt-1">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            admin.status === "ACTIVE"
                              ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30"
                              : admin.status === "INACTIVE"
                              ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
                              : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                          }`}
                        >
                          {admin.status}
                        </span>
                        <p className="text-[9px] text-zinc-400 font-medium leading-normal">
                          {admin.status === "ACTIVE"
                            ? "This administrator is currently active. All stores under their brand can process transactions and listings."
                            : admin.status === "INACTIVE"
                            ? "This administrator is currently disabled. Stores will remain listed but no modifications are allowed."
                            : "Account suspended due to policy violations. All consumer store listings are hidden."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: FRANCHISE DETAILS */}
                {activeTab === "Franchise" && (
                  <motion.div
                    key="Franchise"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3.5 space-y-4 shadow-sm">
                      <h4 className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                        Franchise Configuration
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                          <p className="text-[9px] text-zinc-400 font-semibold">Franchise Type</p>
                          <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 mt-1">{admin.type}</p>
                        </div>

                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                          <p className="text-[9px] text-zinc-400 font-semibold">Total Stores Limit</p>
                          <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 mt-1">
                            {admin.totalStores} {admin.totalStores === 1 ? "Store" : "Stores"}
                          </p>
                        </div>

                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-850 rounded-2xl">
                          <p className="text-[9px] text-zinc-400 font-semibold">Active Managers</p>
                          <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 mt-1">
                            {admin.totalManagers} Operators
                          </p>
                        </div>
                      </div>

                      <h4 className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider pt-2">
                        Contract & Financial Details
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                          <p className="text-[9px] text-zinc-400 font-semibold">Franchise Duration</p>
                          <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 mt-1">
                            {admin.franchiseDuration ? `${admin.franchiseDuration} Years` : "3 Years"}
                          </p>
                        </div>

                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                          <p className="text-[9px] text-zinc-400 font-semibold">Total Franchise Cost</p>
                          <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 mt-1">
                            {admin.franchiseCost !== "" && admin.franchiseCost !== undefined ? `₹${Number(admin.franchiseCost).toLocaleString()}` : "—"}
                          </p>
                        </div>

                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                          <p className="text-[9px] text-zinc-400 font-semibold">Paid Amount</p>
                          <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 mt-1">
                            {admin.paidAmount !== "" && admin.paidAmount !== undefined ? `₹${Number(admin.paidAmount).toLocaleString()}` : "—"}
                          </p>
                        </div>

                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-100 dark:border-zinc-850 rounded-2xl">
                          <p className="text-[9px] text-zinc-400 font-semibold">Due Amount</p>
                          <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 mt-1">
                            {admin.dueAmount !== "" && admin.dueAmount !== undefined ? `₹${Number(admin.dueAmount).toLocaleString()}` : "—"}
                          </p>
                        </div>
                      </div>

                      <div className="p-2.5 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-start gap-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <ShieldAlert size={14} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Legal Agreement & Limits</p>
                          <p className="text-[9px] text-zinc-400 font-semibold mt-1 leading-normal">
                            All franchise licenses require signed store approvals before setting up stores. Multi-Store operators are constrained to their configured limits. Request adjustments via global CMS panel.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: STORES LIST */}
                {activeTab === "Stores" && (
                  <motion.div
                    key="Stores"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                          Registered Stores
                        </h4>
                        <span className="text-[9px] text-zinc-400 font-bold">
                          {GENERATED_DETAILS.stores.length} Registered
                        </span>
                      </div>

                      <div className="divide-y divide-zinc-100 dark:divide-zinc-800 pt-1">
                        {GENERATED_DETAILS.stores.map((store, i) => (
                          <div key={i} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
                            <div>
                              <p className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200">{store.name}</p>
                              <p className="text-[9px] text-zinc-400 font-semibold mt-1 flex items-center gap-1.5">
                                <span>{store.type}</span>
                                <span>•</span>
                                <span className="flex items-center gap-0.5">
                                  <MapPin size={8} />
                                  {store.city}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <div className="text-right">
                                <p className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200">
                                  ₹{store.revenue.toLocaleString()}
                                </p>
                                <p className="text-[8px] text-zinc-400 font-bold mt-0.5">Total Revenue</p>
                              </div>
                              <span
                                className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full ${
                                  store.status === "Active"
                                    ? "bg-green-50 dark:bg-green-950/20 text-green-600"
                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-450 dark:text-zinc-550"
                                }`}
                              >
                                {store.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: REVENUE ANALYTICS CHARTS */}
                {activeTab === "Analytics" && (
                  <motion.div
                    key="Analytics"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Performance Summary grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3.5 rounded-xl shadow-sm">
                        <span className="text-[9px] text-zinc-400 font-semibold">Total Revenue Generated</span>
                        <h3 className="text-base font-black text-zinc-800 dark:text-zinc-200 mt-1">
                          ₹{admin.revenue.toLocaleString()}
                        </h3>
                        <p className="text-[9px] text-emerald-500 font-extrabold flex items-center gap-1 mt-2">
                          <ArrowUpRight size={10} />
                          <span>+14.8% growth</span>
                        </p>
                      </div>

                      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3.5 rounded-xl shadow-sm">
                        <span className="text-[9px] text-zinc-400 font-semibold">Average Order Basket</span>
                        <h3 className="text-base font-black text-zinc-800 dark:text-zinc-200 mt-1">₹28.40</h3>
                        <p className="text-[9px] text-zinc-400 font-bold flex items-center gap-1 mt-2">
                          <span>Standard Margin</span>
                        </p>
                      </div>
                    </div>

                    {/* Area Chart Component */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-4">
                      <h4 className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                        Revenue & Orders Growth (H1)
                      </h4>

                      <div className="w-full h-44 pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={GENERATED_DETAILS.revenueData}
                            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" className="dark:stroke-zinc-800" />
                            <XAxis
                              dataKey="month"
                              tick={{ fontSize: 9, fill: "#a1a1aa" }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{ fontSize: 9, fill: "#a1a1aa" }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="revenue"
                              stroke="var(--primary)"
                              strokeWidth={3}
                              fillOpacity={1}
                              fill="url(#colorRevenue)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 5: STAFF ROLES */}
                {activeTab === "Staff" && (
                  <motion.div
                    key="Staff"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                          Franchise Managers & Operators
                        </h4>
                        <span className="text-[9px] text-zinc-400 font-bold">
                          {GENERATED_DETAILS.staff.length} Active Staff
                        </span>
                      </div>

                      <div className="divide-y divide-zinc-100 dark:divide-zinc-800 pt-1">
                        {GENERATED_DETAILS.staff.map((employee, i) => (
                          <div key={i} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
                            <div>
                              <p className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200">{employee.name}</p>
                              <p className="text-[9px] text-zinc-400 font-semibold mt-1 flex items-center gap-1.5">
                                <span>{employee.role}</span>
                                <span>•</span>
                                <span className="font-mono">{employee.store}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-[7px] font-black px-2 py-0.5 rounded ${
                                  employee.status === "Active"
                                    ? "bg-green-50 dark:bg-green-950/20 text-green-600"
                                    : "bg-rose-50 dark:bg-rose-950/20 text-rose-600"
                                }`}
                              >
                                {employee.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 6: RECENT ORDERS */}
                {activeTab === "Orders" && (
                  <motion.div
                    key="Orders"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-4">
                      <h4 className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                        Recent Store Transactions
                      </h4>

                      <div className="space-y-2 pt-1">
                        {GENERATED_DETAILS.orders.map((ord) => (
                          <div
                            key={ord.id}
                            className="p-2.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200">
                                  {ord.id}
                                </span>
                                <span className="text-[9px] text-zinc-400 font-semibold">{ord.time}</span>
                                <span className="hidden sm:inline text-zinc-400">•</span>
                                <span className="text-[9px] text-zinc-400 font-bold">
                                  Cust: {ord.customer}
                                </span>
                              </div>
                              <p className="text-[9px] text-zinc-500 font-semibold mt-1">
                                {ord.items}
                              </p>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                              <p className="text-[10px] font-black text-zinc-800 dark:text-zinc-200">
                                ₹{ord.amount.toFixed(2)}
                              </p>
                              <span
                                className={`text-[7px] font-black px-2 py-0.5 rounded-full ${
                                  ord.status === "COMPLETED"
                                    ? "bg-green-50 dark:bg-green-950/20 text-green-600 border border-green-100 dark:border-green-955"
                                    : ord.status === "DELIVERING"
                                    ? "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-100 dark:border-blue-955"
                                    : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-100 dark:border-rose-955"
                                }`}
                              >
                                {ord.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer buttons block */}
            <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-shrink-0 flex items-center justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
