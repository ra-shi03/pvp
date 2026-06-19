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
  MapPin,
  Pizza,
  Grid,
  Sparkles,
  Gift,
  ClipboardList,
  FileX,
  Activity,
  Ticket,
  Trophy,
  Megaphone,
  Image,
  Bell,
  CreditCard,
  History,
  Percent,
  TrendingUp,
  Landmark,
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
    "Marketing": false,
    "Financial": false,
    "Analytics & Reports": false,
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
        { name: "Franchise Approvals", icon: FileCheck },
        { name: "Regions & Zones", icon: Map },
        { name: "Territory Management", icon: MapPin }
      ]
    },
    {
      title: "Product Management",
      items: [
        { name: "Products", icon: Pizza },
        { name: "Categories", icon: Grid },
        { name: "Add-ons / Toppings", icon: Sparkles },
        { name: "Combos & Deals", icon: Gift },
        { name: "Global Pricing", icon: DollarSign }
      ]
    },
    {
      title: "Order Management",
      items: [
        { name: "All Orders", icon: ClipboardList },
        { name: "Order Tracking", icon: Truck },
        { name: "Refund Requests", icon: FileX },
        { name: "Disputes", icon: Activity }
      ]
    },
    {
      title: "Financial",
      items: [
        { name: "Revenue", icon: TrendingUp },
        { name: "Franchise Commissions", icon: Percent },
        { name: "Payouts", icon: Landmark },
        { name: "Transactions", icon: History },
        { name: "Tax Reports", icon: FileText }
      ]
    },
    {
      title: "Marketing",
      items: [
        { name: "Coupons", icon: Ticket },
        { name: "Campaigns", icon: Megaphone },
        { name: "Push Notifications", icon: Bell },
        { name: "Banners", icon: Image },
        { name: "Loyalty Program", icon: Trophy }
      ]
    },
    {
      title: "Analytics & Reports",
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
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 w-[280px] transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header / Logo section */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center shadow-md shadow-[var(--primary)]/20">
              <Pizza size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="font-semibold text-black dark:text-white leading-tight text-sm">Papa Veg Admin</p>
              <p className="text-[10px] text-black dark:text-white font-medium">Global Manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 lg:hidden transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable menu content */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          {menuGroups.map((group, groupIdx) => {
            const isExpanded = expandedGroups[group.title]
            return (
              <div key={groupIdx} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-3.5 py-1.5 text-[10px] font-bold text-black dark:text-white uppercase tracking-widest hover:opacity-80 transition-colors focus:outline-none"
                >
                  <span>{group.title}</span>
                  <span className={`transition-transform duration-200 text-black dark:text-white ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {isExpanded && (
                  <div className="space-y-0.5 px-2 pb-1.5 transition-all">
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
                            } else if (item.name === "Franchise Stores") {
                              navigate("/food/superadmin/franchise-stores")
                            } else if (item.name === "Franchise Approvals") {
                              navigate("/food/superadmin/franchise-approvals")
                            } else if (item.name === "Regions & Zones") {
                              navigate("/food/superadmin/regions-zones")
                            } else if (item.name === "Territory Management") {
                              navigate("/food/superadmin/territory-management")
                            } else if (item.name === "Products") {
                              navigate("/food/superadmin/products")
                            } else if (item.name === "Categories") {
                              navigate("/food/superadmin/categories")
                            } else if (item.name === "Add-ons / Toppings") {
                              navigate("/food/superadmin/addons")
                            } else if (item.name === "Combos & Deals") {
                              navigate("/food/superadmin/combos-deals")
                            } else if (item.name === "Global Pricing") {
                              navigate("/food/superadmin/global-pricing")
                            } else if (item.name === "All Orders") {
                              navigate("/food/superadmin/orders")
                            } else if (item.name === "Order Tracking") {
                              navigate("/food/superadmin/order-tracking")
                            } else if (item.name === "Disputes") {
                              navigate("/food/superadmin/disputes")
                            } else if (item.name === "Refund Requests") {
                              navigate("/food/superadmin/refund-requests")
                            } else if (item.name === "Coupons") {
                              navigate("/food/superadmin/coupons")
                            } else if (item.name === "Campaigns") {
                              navigate("/food/superadmin/campaigns")
                            } else if (item.name === "Push Notifications") {
                              navigate("/food/superadmin/push-notifications")
                            } else if (item.name === "Banners") {
                              navigate("/food/superadmin/banners")
                            } else if (item.name === "Loyalty Program") {
                              navigate("/food/superadmin/loyalty")
                            } else if (item.name === "Tax Reports") {
                              navigate("/food/superadmin/tax-reports")
                            } else if (item.name === "Transactions") {
                              navigate("/food/superadmin/transactions")
                            } else if (item.name === "Franchise Commissions") {
                              navigate("/food/superadmin/commissions")
                            } else if (item.name === "Payouts") {
                              navigate("/food/superadmin/payouts")
                            } else if (item.name === "Revenue") {
                              navigate("/food/superadmin/revenue")
                            } else if (item.name === "Sales Analytics") {
                              navigate("/food/superadmin/sales-analytics")
                            } else if (item.name === "Customer Analytics") {
                              navigate("/food/superadmin/customer-analytics")
                            } else if (item.name === "Operational Analytics") {
                              navigate("/food/superadmin/operational-analytics")
                            } else if (item.name === "App Settings") {
                              navigate("/food/superadmin/app-settings")
                            } else if (item.name === "Tax Settings") {
                              navigate("/food/superadmin/tax-settings")
                            } else if (item.name === "SEO Settings") {
                              navigate("/food/superadmin/seo-settings")
                            } else if (item.name === "Content Management") {
                              navigate("/food/superadmin/content-management")
                            } else if (item.name === "Support Tickets") {
                              navigate("/food/superadmin/support-tickets")
                            } else if (item.name === "Feedback & Reviews") {
                              navigate("/food/superadmin/feedback-reviews")
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
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 text-left group ${isActive
                            ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30 shadow-sm"
                            : "text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[var(--primary)] border border-transparent"
                            }`}
                        >
                          <Icon
                            size={15}
                            className={`shrink-0 transition-transform duration-300 ${isActive ? "text-red-600 dark:text-red-400" : "text-black dark:text-white group-hover:text-[var(--primary)]"}`}
                          />
                          <span className="leading-snug">{item.name}</span>
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
        <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-750 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">System: 99% Online</span>
            </div>
            <p className="text-[9px] text-black dark:text-white font-medium leading-normal">Server Central-AP-1 Active</p>
          </div>
        </div>
      </aside>
    </>
  )
}
