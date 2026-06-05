import React from "react"
import { Users, UserCheck, UserX, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function FranchiseKPIs({ stats }) {
  const kpiData = [
    {
      title: "Total Franchise Admins",
      value: stats.total,
      change: "+12.5%",
      isPositive: true,
      icon: Users,
      color: "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-805",
      sparkline: [20, 24, 22, 28, 26, 32, 30, 36, 35, 42]
    },
    {
      title: "Active Franchise Admins",
      value: stats.active,
      change: "+8.3%",
      isPositive: true,
      icon: UserCheck,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20",
      sparkline: [15, 18, 17, 21, 20, 24, 22, 27, 26, 30]
    },
    {
      title: "Inactive Franchise Admins",
      value: stats.inactive,
      change: "-4.2%",
      isPositive: false,
      icon: UserX,
      color: "text-zinc-400 dark:text-zinc-500 bg-zinc-100/50 dark:bg-zinc-800/30",
      sparkline: [8, 9, 7, 8, 6, 8, 7, 9, 8, 6]
    },
    {
      title: "Total Franchise Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      change: "+18.2%",
      isPositive: true,
      icon: DollarSign,
      color: "text-[var(--primary)] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10",
      sparkline: [120, 140, 135, 160, 155, 180, 175, 210, 200, 234]
    },
    {
      title: "Pending Approvals",
      value: stats.pending,
      change: "New",
      isPositive: true,
      icon: Clock,
      color: "text-amber-605 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20",
      sparkline: [2, 3, 2, 4, 3, 5, 4, 6, 5, 6]
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon
        return (
          <div
            key={idx}
            className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-zinc-50 dark:bg-zinc-800/20 group-hover:scale-150 transition-transform duration-500 opacity-50 pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold tracking-tight">
                {kpi.title}
              </span>
              <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-105 duration-300 ${kpi.color}`}>
                <Icon size={16} className="stroke-[2.2]" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between relative z-10">
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
                  {kpi.value}
                </h3>
                <div className="flex items-center gap-1.5 mt-2">
                  <span
                    className={`inline-flex items-center gap-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                      kpi.isPositive
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {kpi.isPositive ? (
                      <ArrowUpRight size={10} className="stroke-[2.5]" />
                    ) : (
                      <ArrowDownRight size={10} className="stroke-[2.5]" />
                    )}
                    {kpi.change}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-semibold">vs last month</span>
                </div>
              </div>

              {/* Responsive SVG Mini Trend Graph */}
              <div className="w-16 h-8 opacity-75 group-hover:opacity-100 transition-opacity">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                  <defs>
                    <linearGradient id={`sparkline-grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={kpi.isPositive ? "#10b981" : "#f43f5e"}
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor={kpi.isPositive ? "#10b981" : "#f43f5e"}
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>
                  {/* Fill path */}
                  <path
                    d={`M ${kpi.sparkline
                      .map((val, i) => `${(i * 100) / 9} ${40 - (val / 50) * 35}`)
                      .join(" L ")} L 100 40 L 0 40 Z`}
                    fill={`url(#sparkline-grad-${idx})`}
                  />
                  {/* Line path */}
                  <path
                    d={kpi.sparkline
                      .map((val, i) => `${i === 0 ? "M" : "L"} ${(i * 100) / 9} ${40 - (val / 50) * 35}`)
                      .join(" ")}
                    fill="none"
                    stroke={kpi.isPositive ? "#10b981" : "#f43f5e"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
