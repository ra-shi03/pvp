import React, { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Award,
  DollarSign,
  Plus,
  Home,
  Briefcase,
  MapPin,
  Pizza,
  Utensils,
  Star,
  CheckCircle,
  FileText,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Truck,
  X,
  CreditCard,
  AlertTriangle,
  Info,
  ChevronRight
} from "lucide-react"

// Complete Customer Database with distinct details for high-fidelity views
const CUSTOMERS_DB = {
  "CUST-9842": {
    id: "CUST-9842",
    name: "Marco Rossi",
    email: "marco.r@example.com",
    phone: "+39 333 456 7890",
    status: "ACTIVE",
    loyalty: "Gold Tier",
    points: 1250,
    nextTierPoints: 1500,
    nextTierName: "Platinum",
    walletBalance: 25.00,
    memberSince: "Oct 12, 2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh75eq_s9eg7xnwZQcweM7ldZvNc3ToQs4NGIReb_UgvLSGQnJfAZLHzsW-oFaE7kSdmx-5FCwFlTW4jLwsiMwSDm3LkauPnHcQNLLIHCIKbRaD4XmGQopNE_WtKDpVBKyt2HMVTctdCoOzOrplhsnwdLHrjss29Gq6m2qFyscXr-pZCd2d6MC3J_C8WeHh4BaM02aPHt-vBlRTITRokmD0AvKuG6tGel5STb4VKb2Ir2yjICGcgDs59l4ofn389Nw8XvHNJ_SQcoS",
    addresses: [
      { id: "1", type: "Home", street: "123 Pepperoni Lane", city: "Brooklyn, NY 11201", icon: Home },
      { id: "2", type: "Work", street: "456 Tech Plaza", city: "Manhattan, NY 10001", icon: Briefcase }
    ],
    orders: [
      { id: "ORD-123", restaurant: "Downtown Pizza", date: "Oct 14, 2023", total: 42.50, status: "Delivered", icon: Pizza, items: "Double Cheese Feast x1, Diet Coke x2", distance: "2.4 km", rating: 5, rider: "Rahul Dev" },
      { id: "ORD-119", restaurant: "Bistro Roma", date: "Oct 10, 2023", total: 31.20, status: "Delivered", icon: Utensils, items: "Spaghetti Carbonara x1, Garlic Bread x1", distance: "3.1 km", rating: 4, rider: "Vikram Rathore" }
    ],
    review: {
      date: "Oct 14",
      rating: 5,
      item: "Double Cheese Feast",
      text: "Best pizza in town! Delivery was incredibly fast and the dough was perfectly crispy."
    },
    transactions: [
      { id: "TXN-001", desc: "Order #ORD-123 Payment", amount: -42.50, type: "charge", date: "Oct 14, 2023" },
      { id: "TXN-002", desc: "Promo Credit Topup", amount: 10.00, type: "credit", date: "Oct 12, 2023" }
    ]
  },
  "CUST-7215": {
    id: "CUST-7215",
    name: "Elena Vance",
    email: "elena.v@example.com",
    phone: "+39 342 112 0044",
    status: "BLOCKED",
    loyalty: "Silver Tier",
    points: 450,
    nextTierPoints: 1000,
    nextTierName: "Gold",
    walletBalance: 12.00,
    memberSince: "Sep 15, 2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6n4i4OqmTeyK-H0oq23VRRrSr1yhXRFFvHwCKd7u_bH_34RtmKQq0_lsfGxNd4Nnd-HdPct9xcvqPFdGomJO33cw3CSJnTqYTNahxg4LFhDaNs5sf_iBcwt5_cF-21mbpQd5ivvJ_W5hvbT-jE2hWn_KLZjLMXmNkopAdMum1UwCR8pW3aUMCcy5GlRqbR1uziSRABGtiHcuGjDCQXeLGV4Dexv6oLTDnO0lIagYabizec_qJ7KCEijke0H795e-zS-dSZGWzz93B",
    addresses: [
      { id: "1", type: "Home", street: "44 Baker St", city: "Marylebone, London NW1", icon: Home }
    ],
    orders: [
      { id: "ORD-095", restaurant: "Bistro Roma", date: "Sep 28, 2023", total: 18.50, status: "Delivered", icon: Utensils, items: "Lasagna Classica x1, Lemon Soda x1", distance: "1.2 km", rating: 5, rider: "Pending Rider" }
    ],
    review: {
      date: "Sep 28",
      rating: 4,
      item: "Lasagna Classica",
      text: "Tasty and hot lasagna, although the portion was slightly small. Friendly service."
    },
    transactions: [
      { id: "TXN-101", desc: "Order #ORD-095 Payment", amount: -18.50, type: "charge", date: "Sep 28, 2023" }
    ]
  },
  "CUST-5501": {
    id: "CUST-5501",
    name: "Luca Moretti",
    email: "luca.m@example.com",
    phone: "+39 321 009 8877",
    status: "SUSPENDED",
    loyalty: "Platinum Tier",
    points: 3500,
    nextTierPoints: 5000,
    nextTierName: "Elite VIP",
    walletBalance: 180.00,
    memberSince: "Nov 02, 2022",
    avatar: "",
    addresses: [
      { id: "1", type: "Home", street: "Via Roma 10", city: "Milan, Lombardy 20121", icon: Home },
      { id: "2", type: "Work", street: "Piazza Duomo 4", city: "Milan, Lombardy 20122", icon: Briefcase }
    ],
    orders: [
      { id: "ORD-204", restaurant: "Downtown Pizza", date: "Nov 01, 2023", total: 54.00, status: "Delivered", icon: Pizza, items: "Calzone Ripieno x2, Spicy Buffalo Wings x1", distance: "1.9 km", rating: 5, rider: "Rahul Dev" }
    ],
    review: {
      date: "Nov 01",
      rating: 5,
      item: "Calzone Ripieno",
      text: "Outstanding Calzones. Best Italian spices and cheeses! Highly recommended."
    },
    transactions: [
      { id: "TXN-201", desc: "Order #ORD-204 Payment", amount: -54.00, type: "charge", date: "Nov 01, 2023" },
      { id: "TXN-202", desc: "Wallet Deposit", amount: 150.00, type: "credit", date: "Oct 28, 2023" }
    ]
  },
  "CUST-2234": {
    id: "CUST-2234",
    name: "Alice Smith",
    email: "alice.s@example.com",
    phone: "+1 234 567 8910",
    status: "ACTIVE",
    loyalty: "Platinum Tier",
    points: 4200,
    nextTierPoints: 5000,
    nextTierName: "Elite VIP",
    walletBalance: 124.50,
    memberSince: "Jun 04, 2022",
    avatar: "",
    addresses: [
      { id: "1", type: "Home", street: "789 Maple Court", city: "Los Angeles, CA 90001", icon: Home },
      { id: "2", type: "Work", street: "101 Hollywood Blvd", city: "Los Angeles, CA 90028", icon: Briefcase }
    ],
    orders: [
      { id: "ORD-225", restaurant: "Bistro Roma", date: "May 20, 2026", total: 68.00, status: "Delivered", icon: Utensils, items: "Lasagna Classica x2, Garlic Bread x2, Lemon Soda x4", distance: "4.2 km", rating: 5, rider: "Vikram Rathore" },
      { id: "ORD-220", restaurant: "Downtown Pizza", date: "May 15, 2026", total: 28.50, status: "Delivered", icon: Pizza, items: "Double Cheese Feast x1, Diet Coke x1", distance: "1.8 km", rating: 5, rider: "Rahul Dev" }
    ],
    review: {
      date: "May 20",
      rating: 5,
      item: "Lasagna Classica",
      text: "Absolutely incredible Lasagna! It was piping hot and seasoned perfectly."
    },
    transactions: [
      { id: "TXN-221", desc: "Order #ORD-225 Payment", amount: -68.00, type: "charge", date: "May 20, 2026" },
      { id: "TXN-222", desc: "Wallet Deposit", amount: 100.00, type: "credit", date: "May 19, 2026" }
    ]
  },
  "CUST-4112": {
    id: "CUST-4112",
    name: "Chloe Bennett",
    email: "chloe.b@example.com",
    phone: "+1 415 982 1204",
    status: "ACTIVE",
    loyalty: "Gold Tier",
    points: 1450,
    nextTierPoints: 2000,
    nextTierName: "Platinum",
    walletBalance: 45.20,
    memberSince: "Jan 20, 2024",
    avatar: "",
    addresses: [
      { id: "1", type: "Home", street: "555 California St", city: "San Francisco, CA 94104", icon: Home }
    ],
    orders: [
      { id: "ORD-301", restaurant: "Downtown Pizza", date: "May 26, 2026", total: 19.50, status: "Delivered", icon: Pizza, items: "Pepperoni Slice x2, Diet Pepsi x1", distance: "2.1 km", rating: 4, rider: "Rahul Dev" }
    ],
    review: {
      date: "May 26",
      rating: 4,
      item: "Pepperoni Slice",
      text: "Decent pizza, delivered reasonably quickly. Could be a bit more cheesy."
    },
    transactions: [
      { id: "TXN-301", desc: "Order #ORD-301 Payment", amount: -19.50, type: "charge", date: "May 26, 2026" }
    ]
  },
  "CUST-1049": {
    id: "CUST-1049",
    name: "David Miller",
    email: "david.m@example.com",
    phone: "+1 617 384 9081",
    status: "SUSPENDED",
    loyalty: "Silver Tier",
    points: 150,
    nextTierPoints: 500,
    nextTierName: "Gold",
    walletBalance: 0.00,
    memberSince: "Feb 10, 2024",
    avatar: "",
    addresses: [
      { id: "1", type: "Home", street: "12 Beacon St", city: "Boston, MA 02108", icon: Home }
    ],
    orders: [
      { id: "ORD-055", restaurant: "Bistro Roma", date: "Mar 02, 2026", total: 12.00, status: "Delivered", icon: Utensils, items: "Garlic Bread x2", distance: "5.4 km", rating: 3, rider: "Vikram Rathore" }
    ],
    review: {
      date: "Mar 02",
      rating: 3,
      item: "Garlic Bread",
      text: "The garlic bread was a bit dry and cold when it arrived. Hope it improves."
    },
    transactions: [
      { id: "TXN-055", desc: "Order #ORD-055 Payment", amount: -12.00, type: "charge", date: "Mar 02, 2026" }
    ]
  },
  "CUST-8831": {
    id: "CUST-8831",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "+1 305 771 9082",
    status: "ACTIVE",
    loyalty: "Gold Tier",
    points: 1100,
    nextTierPoints: 1500,
    nextTierName: "Platinum",
    walletBalance: 65.00,
    memberSince: "Dec 01, 2023",
    avatar: "",
    addresses: [
      { id: "1", type: "Home", street: "888 Brickell Ave", city: "Miami, FL 33131", icon: Home }
    ],
    orders: [
      { id: "ORD-412", restaurant: "Bistro Roma", date: "May 22, 2026", total: 35.50, status: "Delivered", icon: Utensils, items: "Spaghetti Carbonara x1, Lemon Soda x2", distance: "3.5 km", rating: 5, rider: "Vikram Rathore" }
    ],
    review: {
      date: "May 22",
      rating: 5,
      item: "Spaghetti Carbonara",
      text: "Best carbonara I have ordered online! Tasted authentic and rich."
    },
    transactions: [
      { id: "TXN-412", desc: "Order #ORD-412 Payment", amount: -35.50, type: "charge", date: "May 22, 2026" },
      { id: "TXN-413", desc: "Wallet Deposit", amount: 50.00, type: "credit", date: "May 20, 2026" }
    ]
  }
}

export default function UserProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Match URL ID to database, default to Marco Rossi if not found
  const initialCustomerData = useMemo(() => {
    return CUSTOMERS_DB[id] || CUSTOMERS_DB["CUST-9842"]
  }, [id])

  // React State for interactive updates
  const [customer, setCustomer] = useState(initialCustomerData)
  
  // Wallet Interaction State
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [addFundsAmount, setAddFundsAmount] = useState("10")
  
  // Address Interaction State
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [newAddressType, setNewAddressType] = useState("Home")
  const [newAddressStreet, setNewAddressStreet] = useState("")
  const [newAddressCity, setNewAddressCity] = useState("")

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showAllOrders, setShowAllOrders] = useState(false)

  // Wallet deposit trigger
  const handleAddFunds = (e) => {
    e.preventDefault()
    const amount = parseFloat(addFundsAmount)
    if (isNaN(amount) || amount <= 0) return

    setCustomer((prev) => {
      const nextBalance = prev.walletBalance + amount
      const nextTransactions = [
        {
          id: `TXN-${Date.now()}`,
          desc: "Mock Balance Top-up Deposit",
          amount: amount,
          type: "credit",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        },
        ...prev.transactions
      ]
      return { ...prev, walletBalance: nextBalance, transactions: nextTransactions }
    })
    setShowWalletModal(false)
  }

  // Address creation trigger
  const handleAddAddress = (e) => {
    e.preventDefault()
    if (!newAddressStreet || !newAddressCity) return

    const newAddr = {
      id: `ADDR-${Date.now()}`,
      type: newAddressType,
      street: newAddressStreet,
      city: newAddressCity,
      icon: newAddressType === "Home" ? Home : newAddressType === "Work" ? Briefcase : MapPin
    }

    setCustomer((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddr]
    }))

    // Reset Form and close modal
    setNewAddressStreet("")
    setNewAddressCity("")
    setShowAddressModal(false)
  }

  // Loyalty bar percentage helper
  const loyaltyProgressPercent = useMemo(() => {
    return Math.min(100, Math.floor((customer.points / customer.nextTierPoints) * 100))
  }, [customer.points, customer.nextTierPoints])

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Top Header Row with back button */}
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button
          onClick={() => navigate("/food/superadmin/customers/list")}
          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-350 transition-colors cursor-pointer"
          aria-label="Back to customer list"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
            Customer Profile Dashboard
          </h1>
          <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">
            Modify profile settings, adjust funds, and inspect transaction logs.
          </p>
        </div>
      </div>

      {/* Main Bento Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Overview, Loyalty, Wallet) - col-span-4 */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Bento Card 1: Customer Profile Overview Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                {customer.avatar ? (
                  <img
                    alt={customer.name}
                    src={customer.avatar}
                    className="w-28 h-28 rounded-full object-cover border-4 border-[var(--primary)]/10 dark:border-[var(--primary)]/20 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[var(--primary)] to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-md border-4 border-white dark:border-zinc-850">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                {/* Active Indicator status dot */}
                <span
                  className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900 shadow-sm ${
                    customer.status === "ACTIVE"
                      ? "bg-emerald-500"
                      : customer.status === "BLOCKED"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                />
              </div>

              <h2 className="font-headline-md text-headline-md text-zinc-900 dark:text-zinc-50 mb-1">
                {customer.name}
              </h2>
              <span
                className={`text-[9px] font-extrabold px-3 py-1 rounded-full mb-6 ${
                  customer.status === "ACTIVE"
                    ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400"
                    : customer.status === "BLOCKED"
                    ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                    : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400"
                }`}
              >
                {customer.status} Status
              </span>

              {/* Basic Meta Fields List */}
              <div className="w-full space-y-4 text-left pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3.5">
                  <Mail size={16} className="text-zinc-400" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-350 truncate">{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Phone size={16} className="text-zinc-400" />
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Phone number</p>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-350">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Calendar size={16} className="text-zinc-400" />
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Member Since</p>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-350">{customer.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Loyalty & Wallet Balance Integrated Card */}
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 mb-6">
                <div>
                  <p className="text-[9px] font-bold opacity-80 uppercase tracking-wider">Loyalty Level</p>
                  <h3 className="text-lg font-black flex items-center gap-1.5 mt-0.5">
                    <Award size={18} className="text-amber-300" />
                    {customer.loyalty}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold opacity-80 uppercase tracking-wider">Wallet Balance</p>
                  <p className="text-xl font-black mt-0.5">${customer.walletBalance.toFixed(2)}</p>
                </div>
              </div>

              {/* Loyalty progress Bar */}
              <div className="bg-white/10 rounded-xl p-3.5 mb-5 backdrop-blur-md border border-white/10">
                <div className="flex justify-between items-center mb-1.5 text-[10px] font-bold">
                  <span>{customer.points} Points</span>
                  <span>{customer.nextTierPoints - customer.points} to {customer.nextTierName}</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-white h-full transition-all duration-500 shadow" style={{ width: `${loyaltyProgressPercent}%` }} />
                </div>
              </div>

              {/* Wallet Top-up functional button trigger */}
              <button
                onClick={() => setShowWalletModal(true)}
                className="w-full bg-white hover:bg-zinc-50 text-[var(--primary)] font-extrabold text-xs py-3 rounded-xl transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={14} />
                <span>Deposit Wallet Credits</span>
              </button>
            </div>

            {/* Decorative background logo */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Pizza size={120} />
            </div>
          </div>

        </section>

        {/* Right Column (Addresses, Order History, Reviews, Transactions) - col-span-8 */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Saved Addresses Section (Horizontal Scroll) */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <MapPin size={16} className="text-[var(--primary)]" />
                Saved Delivery Locations
              </h3>
              <button
                onClick={() => setShowAddressModal(true)}
                className="text-[var(--primary)] font-bold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Address</span>
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 snap-x">
              {customer.addresses.map((addr) => {
                const AddrIcon = addr.icon
                return (
                  <div
                    key={addr.id}
                    className="min-w-[260px] max-w-[280px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[var(--primary)]/30 rounded-2xl p-4 snap-start hover:shadow-md transition-shadow flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AddrIcon size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">
                        {addr.type} Location
                      </span>
                      <p className="text-xs font-bold text-zinc-850 dark:text-zinc-50 mt-1 truncate">{addr.street}</p>
                      <p className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5">{addr.city}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Orders History bento panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4.5 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/20">
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <ShoppingBag size={16} className="text-[var(--primary)]" />
                Customer Recent Orders Log
              </h3>
              <span className="text-[9px] font-bold text-zinc-400">Total: {customer.orders.length}</span>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {customer.orders.slice(0, showAllOrders ? customer.orders.length : 2).map((order) => {
                const OrderIcon = order.icon
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="p-5 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <OrderIcon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-zinc-900 dark:text-zinc-50 group-hover:text-[var(--primary)] transition-colors">
                          {order.id}
                        </p>
                        <p className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5">
                          {order.restaurant} • {order.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs font-black text-zinc-900 dark:text-zinc-50">${order.total.toFixed(2)}</p>
                        <span className="inline-block text-[9px] font-extrabold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/10 mt-1">
                          {order.status}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-350 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )
              })}
            </div>

            {customer.orders.length > 2 && (
              <button
                onClick={() => setShowAllOrders(!showAllOrders)}
                className="w-full py-4 text-center text-xs font-bold text-[var(--primary)] bg-zinc-50/50 dark:bg-zinc-950/20 border-t border-zinc-100 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {showAllOrders ? "Hide expanded orders list" : `View All ${customer.orders.length} Order Logs`}
              </button>
            )}
          </div>

          {/* Feedback Rating & Transactions Log Split Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feedback Review Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50">Latest Product Review</h3>
                  <span className="text-zinc-400 font-semibold text-[9px]">{customer.review.date}</span>
                </div>
                
                {/* Rating Stars render */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < customer.review.rating ? "fill-amber-400 stroke-none" : "text-zinc-200"}
                    />
                  ))}
                </div>

                <p className="text-xs font-black text-[var(--primary)] mb-2 leading-tight">
                  Item: {customer.review.item}
                </p>
                <p className="text-xs font-medium italic text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  "{customer.review.text}"
                </p>
              </div>
            </div>

            {/* Transactions Log List */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 mb-4">
                  Recent Cash Flow Transactions
                </h3>
                
                <div className="space-y-3.5">
                  {customer.transactions.slice(0, 3).map((txn) => (
                    <div key={txn.id} className="flex justify-between items-center text-xs font-semibold gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {txn.type === "credit" ? (
                          <div className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600">
                            <TrendingUp size={12} />
                          </div>
                        ) : (
                          <div className="p-1 rounded bg-rose-50 dark:bg-rose-950/20 text-rose-600">
                            <TrendingDown size={12} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-zinc-800 dark:text-zinc-350 truncate leading-tight">{txn.desc}</p>
                          <span className="text-[9px] text-zinc-400">{txn.date}</span>
                        </div>
                      </div>
                      
                      <span className={`font-bold flex-shrink-0 ${
                        txn.type === "credit" ? "text-emerald-600" : "text-rose-600"
                      }`}>
                        {txn.type === "credit" ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </section>

      </div>

      {/* MODAL OVERLAYS (Framer Motion Animated) */}
      <AnimatePresence>
        
        {/* Wallet Funds Deposit Modal */}
        {showWalletModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWalletModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md mx-4 h-fit bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl z-[120]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <CreditCard size={18} className="text-[var(--primary)]" />
                  Deposit Mock Wallet Funds
                </h3>
                <button onClick={() => setShowWalletModal(false)} className="text-zinc-400 hover:text-zinc-600">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddFunds} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Choose Deposit Amount (USD)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["5", "10", "25", "50"].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAddFundsAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          addFundsAmount === amt
                            ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">$</span>
                    <input
                      type="number"
                      required
                      value={addFundsAmount}
                      onChange={(e) => setAddFundsAmount(e.target.value)}
                      placeholder="Enter custom amount..."
                      className="w-full pl-7 pr-4 py-2 text-xs border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-100 dark:border-zinc-800 rounded-xl text-[10px] text-zinc-450 leading-relaxed flex gap-2.5 items-start">
                  <Info size={14} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Mock deposit operates entirely in local page state. Balance is updated in real-time for evaluation.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all text-center cursor-pointer"
                >
                  Authorize Deposit of ${parseFloat(addFundsAmount || 0).toFixed(2)}
                </button>
              </form>
            </motion.div>
          </>
        )}

        {/* Saved Addresses Modal Creation Dialog */}
        {showAddressModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddressModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md mx-4 h-fit bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl z-[120]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <MapPin size={18} className="text-[var(--primary)]" />
                  Create New Delivery Location
                </h3>
                <button onClick={() => setShowAddressModal(false)} className="text-zinc-400 hover:text-zinc-600">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Location Label Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Home", "Work", "Other"].map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setNewAddressType(label)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          newAddressType === label
                            ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddressStreet}
                    onChange={(e) => setNewAddressStreet(e.target.value)}
                    placeholder="e.g. 100 Main St, Apt 2B"
                    className="w-full p-3 text-xs border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    City, State & ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddressCity}
                    onChange={(e) => setNewAddressCity(e.target.value)}
                    placeholder="e.g. Brooklyn, NY 11201"
                    className="w-full p-3 text-xs border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all text-center cursor-pointer"
                >
                  Save Delivery Address Card
                </button>
              </form>
            </motion.div>
          </>
        )}

        {/* Detailed Recent Order Modal Drawer */}
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md mx-4 h-fit bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl z-[120]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                <div>
                  <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-bold">
                    {selectedOrder.id}
                  </span>
                  <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 mt-1">
                    Order Summary Invoice
                  </h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-zinc-600">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/20 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center flex-shrink-0">
                    <Pizza size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{selectedOrder.restaurant}</p>
                    <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                      Distance: {selectedOrder.distance} • Dispatch Rider: {selectedOrder.rider}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ordered Item Details</p>
                  <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-350">{selectedOrder.items}</p>
                    
                    <div className="flex justify-between items-center border-t border-zinc-150 dark:border-zinc-850 pt-2.5 mt-2.5">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">Paid via POS</span>
                      <span className="text-sm font-black text-zinc-900 dark:text-zinc-50">
                        ${selectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Rider Logistics status</p>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-100 dark:border-zinc-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-[var(--primary)]" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{selectedOrder.rider}</span>
                    </div>
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => {
                    alert(`POS Invoice approved and audited for order ${selectedOrder.id}!`)
                    setSelectedOrder(null)
                  }}
                  className="py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
                >
                  Approve Invoice
                </button>
                <button
                  onClick={() => {
                    alert(`Rider logistics dispatch confirmed for order ${selectedOrder.id}!`)
                    setSelectedOrder(null)
                  }}
                  className="py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
                >
                  Assign Rider Dispatch
                </button>
              </div>
            </motion.div>
          </>
        )}

      </AnimatePresence>
    </div>
  )
}
