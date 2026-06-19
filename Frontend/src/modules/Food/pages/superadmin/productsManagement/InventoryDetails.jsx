import React, { useState } from "react";
import { X, Edit, RefreshCw, ArrowLeftRight, Truck, Pizza, Utensils, Filter, PlusCircle, ShoppingCart, SlidersHorizontal, Trash2, TrendingDown, BadgeCheck, Clock, Mail, Phone, Store, Info } from "lucide-react";
import StockAdjustment from "./StockAdjustment";

export default function InventoryDetails({ isOpen, onClose, item }) {
  const [activeTab, setActiveTab] = useState("stock");
  const [isStockAdjustmentOpen, setIsStockAdjustmentOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for Drawer */}
      <div 
        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Inventory Details Drawer */}
      <aside className={`fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-zinc-950 z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 dark:text-zinc-400"
            >
              <X size={18} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{item?.name || "Mozzarella Cheese"}</h2>
              <span className="text-[10px] text-zinc-500 font-medium mt-0.5 block">
                SKU: {item?.id || "CHS-MOZ-001"} • Category: {item?.category || "Dairy"}
              </span>
            </div>
          </div>
          <div className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-200 dark:border-emerald-800/50">
            IN STOCK
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 px-3 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto hide-scrollbar">
          {["stock", "movement", "recipes", "supplier"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-3 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab 
                  ? "text-[var(--primary)] border-[var(--primary)]" 
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border-transparent"
              }`}
            >
              {tab === "stock" ? "Stock Summary" : tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          
          {/* Stock Summary Tab Content */}
          {activeTab === "stock" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Stock Card */}
                <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold text-zinc-500 block mb-1 uppercase tracking-wider">Current Stock</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{parseFloat(item?.stock) || 150}</span>
                    <span className="text-sm font-bold text-zinc-500">kg</span>
                  </div>
                </div>
                {/* Reserved Card */}
                <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold text-zinc-500 block mb-1 uppercase tracking-wider">Reserved</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-red-600 dark:text-red-400">20</span>
                    <span className="text-sm font-bold text-zinc-500">kg</span>
                  </div>
                </div>
                {/* Available Card */}
                <div className="p-4 bg-white dark:bg-zinc-900 border-2 border-[var(--primary)] rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold text-zinc-500 block mb-1 uppercase tracking-wider">Available</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[var(--primary)]">130</span>
                    <span className="text-sm font-bold text-zinc-500">kg</span>
                  </div>
                </div>
              </div>

              {/* Reorder Level Section */}
              <div className="p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Reorder Health</h3>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded">Healthy Status</span>
                </div>
                <div className="relative w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  {/* Progress Bar */}
                  <div className="absolute left-0 top-0 h-full bg-emerald-500 transition-all" style={{ width: "75%" }}></div>
                  {/* Marker for Reorder Level */}
                  <div className="absolute h-full w-1 bg-red-500 z-10" style={{ left: "33%" }}></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold">
                  <span className="text-zinc-500">Critical: 0kg</span>
                  <span className="text-red-600 dark:text-red-400">Reorder Level: 50kg</span>
                  <span className="text-zinc-500">Target: 200kg</span>
                </div>
              </div>

              {/* Visual Asset */}
              <div className="w-full h-40 rounded-xl overflow-hidden relative group border border-zinc-200 dark:border-zinc-800">
                <img 
                  alt={item?.name || "Ingredient"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={item?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBnG4y7g7umf5-bE8g4uQYLDS-NKtgykOn8NDpOReXdvCVdzgcSs2U3icGM5OyKuWl8M_Cq-pfwJCS3nIGx3U84sCWoaufE7hWNmyz-u4lFDPaYpHLTwdqm2joM0YNcoOR-9k0nk2hZWAy8krUlAA8hhaxelHUceuMmEjlQnFbLi6SJjLXan2XO_nmWa6JaKVPzFfn2gjW9EVxPIPSoLKUhLpb9sArs21iMoynLTy80_9e2BWlegzOLyuMc4KSL43zzddcVEQnVjMk"} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                  <span className="text-white font-bold text-xs">Premium {item?.name || "Buffalo Mozzarella"} (Cold Chain Required)</span>
                </div>
              </div>
            </div>
          )}

          {/* Recipes Tab Content */}
          {activeTab === "recipes" && (
            <div className="space-y-3 animate-in fade-in duration-300">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">Usage in Recipes</h3>
              
              {/* Recipe Item 1 */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center border border-red-100 dark:border-red-900/30">
                    <Pizza className="text-[var(--primary)]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Margherita Pizza</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Standard Large Size</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[var(--primary)]">150g</p>
                  <p className="text-xs font-medium text-zinc-500">per unit</p>
                </div>
              </div>
              
              {/* Recipe Item 2 */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center border border-amber-100 dark:border-amber-900/30">
                    <Utensils className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Cheese Burst</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Sides / Appetizer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[var(--primary)]">250g</p>
                  <p className="text-xs font-medium text-zinc-500">per unit</p>
                </div>
              </div>
            </div>
          )}

          {/* Movement Tab Content */}
          {activeTab === "movement" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Movement History</h2>
                    <p className="text-xs text-zinc-500">Real-time log for item: <span className="font-bold">{item?.id || "MOZ-001"}</span></p>
                  </div>
                  <button className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-2.5 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-95 text-zinc-700 dark:text-zinc-300">
                    <Filter size={16} />
                    <span className="text-xs font-bold">Filter</span>
                  </button>
                </div>
                
                {/* Transaction List */}
                <div className="space-y-3">
                  {/* Transaction Item 1: Received */}
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <PlusCircle size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Stock Received</h3>
                        <p className="text-xs font-medium text-zinc-500">Oct 24, 2023 • 09:15 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-600 dark:text-emerald-400 font-black text-base">+50 kg</span>
                      <p className="text-xs font-medium text-zinc-500">Bal: 142 kg</p>
                    </div>
                  </div>
                  
                  {/* Transaction Item 2: Fulfilled */}
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-[var(--primary)] dark:text-red-400">
                        <ShoppingCart size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Order Fulfilled</h3>
                        <p className="text-xs font-medium text-zinc-500">Oct 23, 2023 • 06:45 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[var(--primary)] dark:text-red-400 font-black text-base">-12 kg</span>
                      <p className="text-xs font-medium text-zinc-500">Bal: 92 kg</p>
                    </div>
                  </div>

                  {/* Transaction Item 3: Adjustment */}
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <SlidersHorizontal size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Manual Adjustment</h3>
                        <p className="text-xs font-medium text-zinc-500">Oct 23, 2023 • 11:20 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-600 dark:text-amber-400 font-black text-base">+2 kg</span>
                      <p className="text-xs font-medium text-zinc-500">Bal: 104 kg</p>
                    </div>
                  </div>

                  {/* Transaction Item 4: Wastage */}
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-[var(--primary)] dark:text-red-400">
                        <Trash2 size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Wastage</h3>
                        <p className="text-xs font-medium text-zinc-500">Oct 22, 2023 • 08:00 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[var(--primary)] dark:text-red-400 font-black text-base">-4.5 kg</span>
                      <p className="text-xs font-medium text-zinc-500">Bal: 102 kg</p>
                    </div>
                  </div>
                  
                  {/* Transaction Item 5: Fulfilled (Repeat) */}
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-[var(--primary)] dark:text-red-400">
                        <ShoppingCart size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Order Fulfilled</h3>
                        <p className="text-xs font-medium text-zinc-500">Oct 22, 2023 • 02:30 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[var(--primary)] dark:text-red-400 font-black text-base">-28 kg</span>
                      <p className="text-xs font-medium text-zinc-500">Bal: 106.5 kg</p>
                    </div>
                  </div>
                </div>

                {/* Load More */}
                <button className="w-full mt-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[var(--primary)] font-bold hover:bg-[var(--primary)]/5 transition-colors">
                  Load More Transactions
                </button>
              </div>

              {/* Contextual Insight (Bento Component) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800/30 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-bold mb-1">30-Day Trend</p>
                    <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-300">+15% Volume</h4>
                  </div>
                  <div className="h-16 w-full mt-4">
                    {/* Simplified Sparkline */}
                    <div className="flex items-end gap-1 h-full w-full">
                      <div className="bg-emerald-300/60 dark:bg-emerald-700/60 w-full h-[40%] rounded-t-sm"></div>
                      <div className="bg-emerald-300/60 dark:bg-emerald-700/60 w-full h-[60%] rounded-t-sm"></div>
                      <div className="bg-emerald-300/60 dark:bg-emerald-700/60 w-full h-[30%] rounded-t-sm"></div>
                      <div className="bg-emerald-300/60 dark:bg-emerald-700/60 w-full h-[80%] rounded-t-sm"></div>
                      <div className="bg-emerald-300/60 dark:bg-emerald-700/60 w-full h-[55%] rounded-t-sm"></div>
                      <div className="bg-emerald-300/60 dark:bg-emerald-700/60 w-full h-[90%] rounded-t-sm"></div>
                      <div className="bg-emerald-500 dark:bg-emerald-500 w-full h-[100%] rounded-t-sm"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-[var(--primary)] dark:text-red-400 shrink-0">
                    <TrendingDown size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Forecast Alert</h4>
                    <p className="text-sm text-zinc-500 mt-1">High usage expected in 48h based on active recipes.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Supplier Tab Content */}
          {activeTab === "supplier" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Primary Supplier Card */}
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Primary Supplier</h2>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded text-xs uppercase tracking-wider font-bold">Preferred</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border-t-4 border-t-amber-500 border-x border-b border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl p-6 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Organic Mozzarella Co.</h3>
                      <p className="text-sm font-medium text-zinc-500">SKU: #OMC-7729-WH</p>
                    </div>
                    <div className="bg-[var(--primary)]/10 p-3 rounded-xl border border-[var(--primary)]/20">
                      <BadgeCheck className="text-[var(--primary)]" size={28} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Unit Price</p>
                      <p className="text-xl font-bold text-[var(--primary)]">$12.45 <span className="text-sm font-medium text-zinc-500">/ kg</span></p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Lead Time</p>
                      <div className="flex items-center gap-2">
                        <Clock className="text-amber-500" size={16} />
                        <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">3 Days</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[var(--primary)] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all">
                      <Mail size={18} />
                      Contact Supplier
                    </button>
                    <button className="w-14 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all">
                      <Phone size={20} />
                    </button>
                  </div>
                </div>
              </section>

              {/* Secondary Suppliers Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Secondary Suppliers</h2>
                  <button className="text-[var(--primary)] font-bold text-sm flex items-center gap-1 hover:underline">
                    <PlusCircle size={16} />
                    Add New
                  </button>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden shadow-sm">
                  {/* Supplier Item 1 */}
                  <div className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                        <Store size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">Verde Dairy Group</h4>
                        <p className="text-sm font-medium text-zinc-500">Lead Time: 5 Days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">$13.10</p>
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 px-1 bg-red-100 dark:bg-red-900/30 rounded">+5.2%</span>
                    </div>
                  </div>
                  {/* Supplier Item 2 */}
                  <div className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                        <Store size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">Global Foods Inc.</h4>
                        <p className="text-sm font-medium text-zinc-500">Lead Time: 2 Days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">$14.20</p>
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 px-1 bg-red-100 dark:bg-red-900/30 rounded">+14.0%</span>
                    </div>
                  </div>
                  {/* Supplier Item 3 */}
                  <div className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                        <Store size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">Lakeside Provisions</h4>
                        <p className="text-sm font-medium text-zinc-500">Lead Time: 4 Days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">$12.95</p>
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 px-1 bg-red-100 dark:bg-red-900/30 rounded">+4.0%</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Price Analysis Helper */}
              <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 p-4 rounded-xl flex gap-4">
                <Info className="text-emerald-600 dark:text-emerald-400 shrink-0" size={24} />
                <div>
                  <h5 className="text-sm text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">Market Insight</h5>
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-300">Your primary supplier price is 8% lower than the regional average for this item. Last market check: Oct 24, 2023.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col sm:flex-row gap-2">
          <button 
            onClick={() => setIsStockAdjustmentOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[var(--primary)] text-white font-bold text-sm rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <Edit size={16} />
            Stock Adjustment
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-95 transition-all">
            <RefreshCw size={16} />
            Stock Transfer
          </button>
        </div>
      </aside>

      {/* Modals */}
      <StockAdjustment 
        isOpen={isStockAdjustmentOpen} 
        onClose={() => setIsStockAdjustmentOpen(false)} 
        item={item} 
      />
    </>
  );
}
