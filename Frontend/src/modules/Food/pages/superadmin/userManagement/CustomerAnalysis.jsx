import React, { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Users,
  UserCheck,
  UserX,
  ClipboardList,
  DollarSign,
  Award,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Search,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Star
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid
} from "recharts"

export default function CustomerAnalysis() {
  const navigate = useNavigate()

  // 6 KPI Stats Card Data
  const stats = useMemo(() => [
    {
      title: "Total Customers",
      value: "12,482",
      growth: "+12%",
      isPositive: true,
      icon: Users,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100 dark:border-rose-900/30"
    },
    {
      title: "Active Users",
      value: "11,204",
      growth: "+8%",
      isPositive: true,
      icon: UserCheck,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30"
    },
    {
      title: "Suspended",
      value: "128",
      growth: "-2%",
      isPositive: false,
      icon: UserX,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100 dark:border-rose-900/30"
    },
    {
      title: "Total Orders",
      value: "45,210",
      growth: "+15%",
      isPositive: true,
      icon: ClipboardList,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400 border-blue-100 dark:border-blue-900/30"
    },
    {
      title: "Total Revenue",
      value: "$1.2M",
      growth: "+10%",
      isPositive: true,
      icon: DollarSign,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20 dark:text-purple-400 border-purple-100 dark:border-purple-900/30"
    },
    {
      title: "Loyalty Members",
      value: "8,432",
      growth: "+20%",
      isPositive: true,
      icon: Award,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/30"
    }
  ], [])

  // Weekly Signups Data for Recharts
  const chartData = useMemo(() => [
    { day: "Mon", signups: 120, active: 90 },
    { day: "Tue", signups: 190, active: 140 },
    { day: "Wed", signups: 160, active: 110 },
    { day: "Thu", signups: 220, active: 180 },
    { day: "Fri", signups: 310, active: 250 },
    { day: "Sat", signups: 420, active: 380 },
    { day: "Sun", signups: 380, active: 310 }
  ], [])

  // Brief List of Customers (3 Sample Entries)
  const recentCustomers = useMemo(() => [
    {
      id: "CUST-9842",
      name: "Marco Rossi",
      phone: "+39 333 456 7890",
      email: "marco.r@example.com",
      status: "ACTIVE",
      tier: "Gold Tier",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh75eq_s9eg7xnwZQcweM7ldZvNc3ToQs4NGIReb_UgvLSGQnJfAZLHzsW-oFaE7kSdmx-5FCwFlTW4jLwsiMwSDm3LkauPnHcQNLLIHCIKbRaD4XmGQopNE_WtKDpVBKyt2HMVTctdCoOzOrplhsnwdLHrjss29Gq6m2qFyscXr-pZCd2d6MC3J_C8WeHh4BaM02aPHt-vBlRTITRokmD0AvKuG6tGel5STb4VKb2Ir2yjICGcgDs59l4ofn389Nw8XvHNJ_SQcoS"
    },
    {
      id: "CUST-7215",
      name: "Elena Vance",
      phone: "+39 342 112 0044",
      email: "elena.v@example.com",
      status: "BLOCKED",
      tier: "Silver Tier",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6n4i4OqmTeyK-H0oq23VRRrSr1yhXRFFvHwCKd7u_bH_34RtmKQq0_lsfGxNd4Nnd-HdPct9xcvqPFdGomJO33cw3CSJnTqYTNahxg4LFhDaNs5sf_iBcwt5_cF-21mbpQd5ivvJ_W5hvbT-jE2hWn_KLZjLMXmNkopAdMum1UwCR8pW3aUMCcy5GlRqbR1uziSRABGtiHcuGjDCQXeLGV4Dexv6oLTDnO0lIagYabizec_qJ7KCEijke0H795e-zS-dSZGWzz93B"
    },
    {
      id: "CUST-5501",
      name: "Luca Moretti",
      phone: "+39 321 009 8877",
      email: "luca.m@example.com",
      status: "SUSPENDED",
      tier: "Platinum Tier",
      avatar: "" // Triggers initials avatar
    }
  ], [])

  return (
    <div className="pb-12 max-w-7xl mx-auto px-4 md:px-8">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Customer Analytics
            </h1>
            <span className="bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--primary)]/20 animate-pulse">
              Live Overview
            </span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-1">
            Real-time analytics and user acquisition channels monitoring.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl shadow-sm transition-all text-zinc-700 dark:text-zinc-300 w-full sm:w-auto"
          >
            <RefreshCw size={14} className="text-[var(--primary)] animate-spin-hover" />
            <span>Refresh Metrics</span>
          </button>
        </div>
      </div>

      {/* Stats KPI Grid Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl border ${stat.color} flex items-center justify-center`}>
                  <Icon size={18} className="stroke-[2.2]" />
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                    stat.isPositive
                      ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
                      : "text-rose-600 bg-rose-50 dark:bg-rose-950/20"
                  }`}
                >
                  {stat.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {stat.growth}
                </span>
              </div>
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold mb-0.5">{stat.title}</p>
                <p className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </motion.section>

      {/* Main Analysis Chart & Preview Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Interactive Growth Chart Area */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-extrabold text-base text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                <TrendingUp size={18} className="text-[var(--primary)]" />
                Customer Growth & Signups Trend
              </h3>
              <p className="text-xs text-zinc-400 font-semibold mt-0.5">Weekly sign-ups comparison index</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-[var(--primary)] px-2.5 py-1 bg-[var(--primary)]/10 rounded-full flex items-center gap-1">
                <Sparkles size={11} />
                +18% Signups Growth
              </span>
            </div>
          </div>

          {/* Recharts Area Graph */}
          <div className="h-[280px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(200, 200, 200, 0.15)" />
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}`}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                    borderColor: "rgba(0, 0, 0, 0.05)",
                    fontSize: "11px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="signups"
                  name="New Signups"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSignups)"
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  name="Active Orderers"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorActive)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-4 text-[10px] text-zinc-400 font-semibold">
            <span>*Refreshed in sync with user registration gateway</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Acquisition Active
            </span>
          </div>
        </motion.div>

        {/* Customer Directory Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="font-extrabold text-base text-zinc-800 dark:text-zinc-100 flex items-center gap-2 mb-1">
              Recent Acquisitions
            </h3>
            <p className="text-xs text-zinc-400 font-medium mb-5">
              Latest customer profiles added.
            </p>

            <div className="space-y-4">
              {recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 hover:border-[var(--primary)]/30 rounded-xl transition-all duration-300 group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {customer.avatar ? (
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-11 h-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[var(--primary)] to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-[var(--primary)] transition-colors">
                        {customer.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5">
                        {customer.id}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                        customer.status === "ACTIVE"
                          ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400"
                          : customer.status === "BLOCKED"
                          ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                          : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {customer.status}
                    </span>
                    <p className="text-[9px] text-zinc-400 font-semibold mt-1 flex items-center justify-end gap-0.5">
                      <Star size={8} className="fill-amber-500 stroke-none" />
                      {customer.tier}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium "View All Customers" Button */}
          <button
            onClick={() => navigate("/food/superadmin/customers/list")}
            className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[var(--primary)]/10 hover:shadow-[var(--primary)]/20 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>View All Customers</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
