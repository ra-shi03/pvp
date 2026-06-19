import React, { useState, useMemo } from 'react';
import { 
  Download, Plus, ShoppingCart, TrendingUp, Calendar, Timer, 
  CheckCircle2, XCircle, TrendingDown, CreditCard, IndianRupee, 
  Hourglass, Filter, ChevronDown, Search, Eye, ChevronLeft, 
  ChevronRight, Utensils, Truck, ArrowRight 
} from 'lucide-react';
import { initialOrders, useDebounce } from './OrdersData';
import OrderDetails from './OrderDetails';
import { UpdateStatusModal, AssignRiderModal } from './OrderModals';
import AddManualOrder from './AddManualOrder';
import LogisticsMap from './LogisticsMap';

export default function OrdersManagement() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [storeFilter, setStoreFilter] = useState('All Stores');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [isAssignRiderModalOpen, setIsAssignRiderModalOpen] = useState(false);
  const [isAddManualOrderOpen, setIsAddManualOrderOpen] = useState(false);
  const [isLogisticsMapOpen, setIsLogisticsMapOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredOrders = useMemo(() => {
    return initialOrders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        order.customerName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Statuses' || order.status === statusFilter;
      const matchesStore = storeFilter === 'All Stores' || order.store === storeFilter;

      return matchesSearch && matchesStatus && matchesStore;
    });
  }, [debouncedSearchTerm, statusFilter, storeFilter]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Out for Delivery
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-bold text-[9px]">
            <CheckCircle2 size={12} className="text-emerald-500" /> Delivered
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold text-[9px]">
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-2">
        <div className="space-y-0.5">
          <h2 className="text-lg font-bold text-black dark:text-white leading-tight">Orders Management</h2>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Monitor and manage all franchise orders in real-time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white dark:bg-zinc-950 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors shadow-sm">
            <Download size={14} /> <span>Export Reports</span>
          </button>
          <button 
            onClick={() => setIsAddManualOrderOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[var(--primary)] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:opacity-90 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus size={14} /> <span>Manual Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3 mb-4 select-none">
        {/* Card 1 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Total Orders</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">1,284</h3>
              <span className="text-emerald-500 font-bold text-[8px] flex items-center gap-0.5">
                <TrendingUp size={10} /> +12.5%
              </span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
            <ShoppingCart size={14} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Today</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">156</h3>
              <span className="text-emerald-500 font-bold text-[8px] flex items-center gap-0.5">
                <TrendingUp size={10} /> +4.2%
              </span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
            <Calendar size={14} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md border-t-2 border-t-emerald-500">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Active</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">24</h3>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[8px] tracking-wider animate-pulse">LIVE</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-100 dark:border-emerald-900/20">
            <Timer size={14} className="animate-pulse" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Delivered</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">1,210</h3>
              <span className="text-emerald-600 font-bold text-[8px] tracking-wider">98% SUCCESS</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-emerald-600 shrink-0 border border-zinc-200 dark:border-zinc-700">
            <CheckCircle2 size={14} className="text-emerald-500" />
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md border-t-2 border-t-red-500">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Cancelled</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-red-650 dark:text-red-400 mt-0.5">18</h3>
              <span className="text-red-500 font-bold text-[8px] flex items-center gap-0.5">
                <TrendingDown size={10} /> -2%
              </span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-red-500/10 text-red-600 shrink-0 border border-red-100 dark:border-red-900/30">
            <XCircle size={14} className="stroke-red-500" />
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">AOV</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">₹452.00</h3>
              <span className="text-emerald-500 font-bold text-[8px] flex items-center gap-0.5">
                <TrendingUp size={10} /> +8%
              </span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-blue-600 shrink-0 border border-zinc-200 dark:border-zinc-700">
            <CreditCard size={14} />
          </div>
        </div>

        {/* Card 7 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Revenue</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">₹70,450</h3>
              <span className="text-emerald-500 font-bold text-[8px] flex items-center gap-0.5">
                <TrendingUp size={10} /> +18%
              </span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
            <IndianRupee size={14} />
          </div>
        </div>

        {/* Card 8 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md border-t-2 border-t-amber-500">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Pending</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-amber-500 mt-0.5">06</h3>
              <span className="text-amber-600 dark:text-amber-400 font-bold text-[8px] tracking-wider">URGENT</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-100 dark:border-amber-900/30">
            <Hourglass size={14} className="stroke-amber-500" />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <div className="flex items-center gap-2 text-black dark:text-white">
            <Filter size={14} />
            <h3 className="text-xs font-bold">Advanced Filters</h3>
          </div>
          <ChevronDown 
            size={14} 
            className={`text-black/60 dark:text-white/60 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
          />
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-850 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Date Range</label>
              <input 
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none font-semibold" 
                type="date"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Order Status</label>
              <select 
                className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none font-semibold"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Store Location</label>
              <select 
                className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none font-semibold"
                value={storeFilter}
                onChange={(e) => setStoreFilter(e.target.value)}
              >
                <option>All Stores</option>
                <option>Mumbai - Bandra</option>
                <option>Delhi - CP</option>
                <option>Bangalore - Indiranagar</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Franchise Group</label>
              <select className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none font-semibold">
                <option>All Groups</option>
                <option>North India Ops</option>
                <option>South Region Pvt</option>
              </select>
            </div>
          </div>
        )}
      </section>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Orders Table Container */}
        <div className="xl:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold text-black dark:text-white">Recent Orders</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60" size={14} />
                <input 
                  className="pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none w-full sm:w-56 transition-all" 
                  placeholder="Search orders..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 sticky top-0">
                <tr>
                  <th className="px-3 py-2 font-bold text-[10px] text-black dark:text-white border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider">Order #</th>
                  <th className="px-3 py-2 font-bold text-[10px] text-black dark:text-white border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider">Customer</th>
                  <th className="px-3 py-2 font-bold text-[10px] text-black dark:text-white border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider">Store</th>
                  <th className="px-3 py-2 font-bold text-[10px] text-black dark:text-white border-b border-zinc-200 dark:border-zinc-800 text-right uppercase tracking-wider">Amount</th>
                  <th className="px-3 py-2 font-bold text-[10px] text-black dark:text-white border-b border-zinc-200 dark:border-zinc-800 text-center uppercase tracking-wider">Status</th>
                  <th className="px-3 py-2 font-bold text-[10px] text-black dark:text-white border-b border-zinc-200 dark:border-zinc-800 text-center uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                      <td className="px-3 py-2 font-mono text-xs font-bold text-[var(--primary)]">{order.id}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-black dark:text-white">{order.customerName}</span>
                          <span className="text-[10px] font-semibold text-black/70 dark:text-white/70">{order.customerPhone}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs font-bold text-black dark:text-white">{order.store}</td>
                      <td className="px-3 py-2 text-xs font-bold text-black dark:text-white text-right">{order.amount}</td>
                      <td className="px-3 py-2 text-center">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button 
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-black/60 dark:text-white/60 hover:text-[var(--primary)] dark:hover:text-[var(--primary)]"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDrawerOpen(true);
                          }}
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 py-6 text-center text-black/60 dark:text-white/60 text-xs">
                      No orders found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-auto px-3 py-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <span className="text-[11px] font-semibold text-black/70 dark:text-white/70">Showing {filteredOrders.length} of {initialOrders.length} orders</span>
            <div className="flex items-center gap-1.5">
              <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white transition-colors">
                <ChevronLeft size={12} />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded bg-[var(--primary)] text-white text-[10px] font-bold shadow-sm">1</button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white text-[10px] font-bold transition-colors">2</button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white text-[10px] font-bold transition-colors">3</button>
              <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white transition-colors">
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Live Tracking Widget */}
        <aside className="flex flex-col gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-black dark:text-white">Live Order Flow</h3>
              <span className="inline-flex px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-[9px] uppercase tracking-wider">Real-time</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center relative border border-zinc-200 dark:border-zinc-700">
                  <Utensils size={14} className="text-[var(--primary)]" />
                  <div className="absolute -top-0.5 -right-0.5 bg-[var(--primary)] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white dark:border-zinc-900 font-bold">12</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-black dark:text-white truncate">Kitchen Prep</span>
                    <span className="text-[9px] font-semibold text-black/70 dark:text-white/70 shrink-0">45% Capacity</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary)] h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center relative border border-zinc-200 dark:border-zinc-700">
                  <Truck size={14} className="text-emerald-500" />
                  <div className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white dark:border-zinc-900 font-bold">08</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-black dark:text-white truncate">Out for Delivery</span>
                    <span className="text-[9px] font-semibold text-black/70 dark:text-white/70 shrink-0">High Traffic</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center relative border border-zinc-200 dark:border-zinc-700">
                  <CheckCircle2 size={14} className="text-blue-500" />
                  <div className="absolute -top-0.5 -right-0.5 bg-blue-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-zinc-900 font-bold">156</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-black dark:text-white truncate">Today's Completed</span>
                    <span className="text-[9px] font-semibold text-black/70 dark:text-white/70 shrink-0">Goal 80%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsLogisticsMapOpen(true)}
              className="w-full mt-4 py-1.5 rounded-lg border border-[var(--primary)] text-[var(--primary)] text-[10px] font-bold hover:bg-[var(--primary)] hover:text-white transition-all cursor-pointer"
            >
              View Full Logistics Map
            </button>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <img 
              alt="Pizza Branding" 
              className="w-full h-24 object-cover" 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800&h=400"
            />
            <div className="p-3">
              <h4 className="text-xs font-bold text-black dark:text-white">Weekly Promotion</h4>
              <p className="text-[10px] text-black/70 dark:text-white/70 mt-1 leading-normal font-semibold">"The Veggie Supreme" is trending in Mumbai region with 40% increase in orders.</p>
              <button className="mt-3 text-[var(--primary)] text-[10px] font-bold flex items-center gap-1 hover:underline group cursor-pointer">
                Manage Promos <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Action Button (FAB) - Mobile Only Contextual */}
      <button 
        onClick={() => setIsAddManualOrderOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-10 h-10 bg-[var(--primary)] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus size={20} />
      </button>

      {/* Order Details Drawer */}
      <OrderDetails 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        order={selectedOrder} 
        onUpdateStatus={() => setIsUpdateStatusModalOpen(true)}
        onAssignRider={() => setIsAssignRiderModalOpen(true)}
      />

      {/* Modals */}
      <UpdateStatusModal 
        isOpen={isUpdateStatusModalOpen} 
        onClose={() => setIsUpdateStatusModalOpen(false)} 
        order={selectedOrder} 
      />
      <AssignRiderModal 
        isOpen={isAssignRiderModalOpen} 
        onClose={() => setIsAssignRiderModalOpen(false)} 
        order={selectedOrder} 
      />
      <AddManualOrder 
        isOpen={isAddManualOrderOpen} 
        onClose={() => setIsAddManualOrderOpen(false)} 
      />
      <LogisticsMap 
        isOpen={isLogisticsMapOpen} 
        onClose={() => setIsLogisticsMapOpen(false)} 
      />
    </div>
  );
}
