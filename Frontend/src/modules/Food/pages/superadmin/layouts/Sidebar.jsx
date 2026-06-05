import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserCog,
  Truck,
  ChefHat,
  ShieldCheck,
  Store,
  FileCheck,
  Map,
  Pizza,
  Grid,
  Sparkles,
  Layers,
  ClipboardList,
  FileX,
  Activity,
  Milestone,
  Navigation,
  Locate,
  Ticket,
  Megaphone,
  Image,
  Bell,
  CreditCard,
  History,
  Percent,
  TrendingUp,
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  DollarSign,
  Search,
  FileText,
  LifeBuoy,
  Star,
  X
} from "lucide-react"

export default function Sidebar({ isOpen, onClose, activeItem, setActiveItem }) {
  const navigate = useNavigate()
  const [expandedGroups, setExpandedGroups] = useState({
    "Core Dashboard": true,
    "User Management": true,
    "Franchise Management": false,
    "Product Management": false,
    "Order System": false,
    "Delivery System": false,
    "Marketing": false,
    "Financial": false,
    "Analytics": false,
    "CMS / Settings": false,
    "Support": false,
  })

  const toggleGroup = (groupTitle) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }))
  }

  const menuGroups = [
    {
      title: "Core Dashboard",
      items: [
        { name: "Dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "User Management",
      items: [
        { name: "Customers", icon: Users },
        { name: "Franchise Owners", icon: UserCheck },
        { name: "Store Managers", icon: UserCog },
        { name: "Delivery Partners", icon: Truck },
        { name: "Kitchen Staff", icon: ChefHat },
        { name: "Roles & Permissions", icon: ShieldCheck }
      ]
    },
    {
      title: "Franchise Management",
      items: [
        { name: "Franchise Stores", icon: Store },
        { name: "Store Requests / Approvals", icon: FileCheck },
        { name: "Store Zones / Regions", icon: Map }
      ]
    },
    {
      title: "Product Management",
      items: [
        { name: "Products", icon: Pizza },
        { name: "Categories", icon: Grid },
        { name: "Add-ons / Toppings", icon: Sparkles },
        { name: "Inventory Management", icon: Layers }
      ]
    },
    {
      title: "Order System",
      items: [
        { name: "Orders", icon: ClipboardList },
        { name: "Refunds & Cancellations", icon: FileX },
        { name: "Live Order Monitoring", icon: Activity }
      ]
    },
    {
      title: "Delivery System",
      items: [
        { name: "Delivery Management", icon: Milestone },
        { name: "Rider Tracking", icon: Navigation },
        { name: "Delivery Zones", icon: Locate }
      ]
    },
    {
      title: "Marketing",
      items: [
        { name: "Coupons", icon: Ticket },
        { name: "Offers & Campaigns", icon: Megaphone },
        { name: "Banners / Promotions", icon: Image },
        { name: "Notifications", icon: Bell }
      ]
    },
    {
      title: "Financial",
      items: [
        { name: "Payments", icon: CreditCard },
        { name: "Transactions", icon: History },
        { name: "Franchise Commissions", icon: Percent },
        { name: "Revenue Reports", icon: TrendingUp }
      ]
    },
    {
      title: "Analytics",
      items: [
        { name: "Sales Analytics", icon: BarChart3 },
        { name: "Customer Analytics", icon: LineChart },
        { name: "Operational Analytics", icon: PieChart }
      ]
    },
    {
      title: "CMS / Settings",
      items: [
        { name: "App Settings", icon: Settings },
        { name: "Tax Settings", icon: DollarSign },
        { name: "SEO Settings", icon: Search },
        { name: "Content Management", icon: FileText }
      ]
    },
    {
      title: "Support",
      items: [
        { name: "Support Tickets", icon: LifeBuoy },
        { name: "Feedback & Reviews", icon: Star }
      ]
    }
  ]

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 w-[280px] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header / Logo section */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-50 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-md shadow-[var(--primary)]/20">
              <Pizza size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">Papa Veg Admin</p>
              <p className="text-xs text-zinc-400 font-medium">Global Manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-200 lg:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable menu content */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          {menuGroups.map((group, groupIdx) => {
            const isExpanded = expandedGroups[group.title]
            return (
              <div key={groupIdx} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 uppercase tracking-wider text-left transition-colors"
                >
                  <span>{group.title}</span>
                  <span className="text-[10px] transform transition-transform duration-200">
                    {isExpanded ? "▼" : "▶"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="space-y-1 pl-1 transition-all">
                    {group.items.map((item, itemIdx) => {
                      const Icon = item.icon
                      const isActive = activeItem === item.name
                      return (
                        <button
                          key={itemIdx}
                          onClick={() => {
                            setActiveItem(item.name)
                            if (item.name === "Dashboard") {
                              navigate("/food/superadmin/dashboard")
                            } else if (item.name === "Customers") {
                              navigate("/food/superadmin/customers")
                            } else if (item.name === "Franchise Owners") {
                              navigate("/food/superadmin/franchises")
                            } else if (item.name === "Store Managers") {
                              navigate("/food/superadmin/managers")
                            } else if (item.name === "Delivery Partners") {
                              navigate("/food/superadmin/delivery-partners")
                            } else if (item.name === "Kitchen Staff") {
                              navigate("/food/superadmin/kitchen-staff")
                            } else if (item.name === "Roles & Permissions") {
                              navigate("/food/superadmin/roles-permissions")
                            }
                            // On mobile, close sidebar when clicking a menu item
                            if (window.innerWidth < 1024) {
                              onClose()
                            }
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold shadow-sm"
                              : "text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={`transition-transform duration-300 ${
                              isActive ? "scale-110 stroke-[2.2] text-[var(--primary)]" : "text-zinc-400 group-hover:text-[var(--primary)]"
                            }`}
                          />
                          <span>{item.name}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer info box */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">System: 99% Online</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium leading-normal">Server Central-AP-1 Active</p>
          </div>
        </div>
      </aside>
    </>
  )
}
