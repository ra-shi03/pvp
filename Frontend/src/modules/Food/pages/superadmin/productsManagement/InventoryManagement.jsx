import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Package,
  TrendingUp,
  Wallet,
  ArrowRight,
  Lightbulb,
  CheckCircle
} from "lucide-react";
import InventoryData from "./InventoryData";
import InventoryDetails from "./InventoryDetails";
import AddInventory from "./AddInventory";

export default function InventoryManagement() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };
  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4">
      {/* Inventory Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-2">
        <div className="space-y-0.5">
          <h1 className="text-lg font-bold text-black dark:text-white leading-tight">Inventory Management</h1>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Manage and monitor your pizza ingredients and kitchen supplies.</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {/* <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl font-bold text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm">
            <ShoppingCart size={18} />
            Purchase Order
          </button> */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[var(--primary)] text-white rounded-lg font-bold text-[11px] hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4 select-none">
        {/* Card 1: Total Items */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Total Items</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">156</h3>
              <span className="text-emerald-500 font-bold text-[8px] flex items-center gap-0.5">
                <TrendingUp size={10} /> +4
              </span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 border border-[var(--primary)]/20">
            <Package size={14} />
          </div>
        </div>

        {/* Card 2: Low Stock */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm border-t-2 border-t-amber-500 flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Low Stock</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-amber-500 mt-0.5">12</h3>
              <span className="text-amber-600 dark:text-amber-400 font-bold text-[8px] tracking-wider">REORDER</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-100 dark:border-amber-900/30">
            <Package size={14} className="stroke-amber-500" />
          </div>
        </div>

        {/* Card 3: Out of Stock */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm border-t-2 border-t-red-500 flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Out of Stock</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-red-650 dark:text-red-400 mt-0.5">3</h3>
              <span className="text-red-655 dark:text-red-455 font-bold text-[8px] tracking-wider">URGENT</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-red-500/10 text-rose-600 dark:text-rose-400 shrink-0 border border-red-100 dark:border-red-900/30">
            <Package size={14} className="stroke-red-500" />
          </div>
        </div>

        {/* Card 4: Pending POs */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Pending POs</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">8</h3>
              <span className="text-black/60 dark:text-white/60 font-semibold text-[8px]">3 today</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white shrink-0 border border-zinc-200 dark:border-zinc-700">
            <ShoppingCart size={14} />
          </div>
        </div>

        {/* Card 5: Inventory Value */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between transition-shadow hover:shadow-md group">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Total Value</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">₹12,450</h3>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-900/30">
            <Wallet size={14} />
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <InventoryData onViewDetails={handleViewDetails} />

      {/* Bento Style Info Grid (Extra Details) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">

        {/* Automated Reordering */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-[var(--primary)] dark:text-red-400 mb-1">Automated Reordering</h4>
            <p className="text-xs text-black/80 dark:text-white/80 font-medium">There are 4 items currently eligible for automated reordering based on your custom thresholds.</p>
          </div>
          <button className="mt-3 text-[var(--primary)] dark:text-red-400 font-bold flex items-center gap-1 text-[11px] hover:underline w-fit">
            Manage Rules <ArrowRight size={12} />
          </button>
        </div>

        {/* Inventory Insight */}
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-3.5 rounded-xl relative overflow-hidden text-red-950 dark:text-red-100">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-red-800 dark:text-red-400 mb-1">Inventory Insight</h4>
            <p className="text-xs font-medium opacity-90 leading-relaxed">
              Stock turnover has increased by 12% since adding the "Summer Spice" pizza variant. Monitor flour levels closely.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.05] dark:opacity-10 text-[var(--primary)] dark:text-red-400">
            <Lightbulb size={60} strokeWidth={1} />
          </div>
        </div>

        {/* Stock Health */}
        <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
            <CheckCircle size={16} />
          </div>
          <h4 className="text-xs font-bold text-black dark:text-white mb-1">Stock Health Good</h4>
          <p className="text-xs text-black/70 dark:text-white/70 font-semibold px-2">
            92% of your high-volume ingredients are currently within safety margins.
          </p>
        </div>

      </div>

      {/* Inventory Details Drawer */}
      <InventoryDetails
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        item={selectedItem}
      />

      {/* Add Inventory Modal */}
      <AddInventory
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
