import React, { useState } from "react";
import { X, Pizza, Image as ImageIcon, Edit2, FolderOpen, CornerDownRight, ExternalLink, TrendingUp } from "lucide-react";
import EditCategoriesDetails from "./EditCategoriesDetails";

export default function CategorieDetails({ isOpen, onClose, category }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-2xl bg-white dark:bg-zinc-950 shadow-2xl flex flex-col z-[70] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-500">
              <Pizza size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Category: {category?.name || "Pizza"}
              </h3>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Inventory / Categories / {category?.name || "Pizza"}</span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Tabs */}
        <div className="flex px-4 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto gap-4 hide-scrollbar">
          {[
            { id: "basic", label: "Basic Info" },
            { id: "hierarchy", label: "Hierarchy" },
            { id: "products", label: "Products" },
            { id: "display", label: "Display Settings" },
            { id: "analytics", label: "Analytics" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === tab.id
                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                : "border-b-2 border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Basic Info Content */}
          {activeTab === "basic" && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 block">Category Cover Image</label>
                  <div className="relative w-full h-36 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    <img
                      className="w-full h-full object-cover"
                      src={category?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuD8-DswRfCQZdooZY_6Xfd538yfBl9Wt-Ve_tlGPM7_4cYDDF_c0DAx3Vlo55tugSmY6fQT93jIFz575hzGjjB3FRv_QxPQZPWygw9VTT2gef24CR8xwjdsVNrJMPNQ_db-RLaRI_qfniDlAipr9gAlNds6i_L-606cBHPTNO432mVTb3y_xQqH_UhS575bQrzsHqlEAwQH844qy7MiNmZLdQB4X-1eZFTMpeGbuVYfFuf08mPhJLKHUE9jg22mZuGh1Jqhv5pOxpE"}
                      alt="Category Cover"
                    />
                    <div className="absolute bottom-3 right-3">
                      <button className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-[var(--primary)] border border-[var(--primary)]/20 flex items-center gap-2 hover:bg-white dark:hover:bg-zinc-900 transition-colors shadow-sm">
                        <Edit2 size={14} /> Change Image
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Category Name</label>
                  <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">{category?.name || "Pizza"}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">URL Slug</label>
                  <p className="text-sm font-medium text-[var(--primary)]">/menu/{category?.name?.toLowerCase() || "pizza"}</p>
                </div>

                <div className="col-span-full flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Description</label>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {category?.description || "Our signature range of hand-stretched pizzas, made with premium locally sourced vegetables and our proprietary Papa Veg blend of Italian cheeses. Available in classic and thin-crust variants."}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Status</label>
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                      {category?.status === 'Inactive' ? 'Inactive' : 'Active & Visible'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hierarchy Content */}
          {activeTab === "hierarchy" && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Visual Category Tree</label>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <FolderOpen className="text-[var(--primary)]" size={18} />
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Root Category (Menu)</span>
                </div>
                <div className="ml-5 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Pizza className="text-[var(--primary)]" size={18} />
                    <span className="text-sm font-bold text-[var(--primary)]">{category?.name || "Pizza"}</span>
                  </div>
                  <div className="ml-5 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <CornerDownRight className="text-zinc-400" size={18} />
                      <div className="bg-white dark:bg-zinc-950 p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg flex-1 shadow-sm">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Veg Pizza</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CornerDownRight className="text-zinc-400" size={18} />
                      <div className="bg-white dark:bg-zinc-950 p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg flex-1 shadow-sm">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Cheese Pizza</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Content */}
          {activeTab === "products" && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Linked Products ({category?.productsCount || 12})</label>
                <button className="text-[var(--primary)] text-xs font-bold flex items-center gap-1 hover:underline">
                  <ExternalLink size={14} /> Manage All
                </button>
              </div>
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="px-3 py-2 text-xs font-bold text-zinc-500">Product</th>
                      <th className="px-3 py-2 text-xs font-bold text-zinc-500">SKU</th>
                      <th className="px-3 py-2 text-xs font-bold text-zinc-500">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                      <td className="px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200">Margherita Classic</td>
                      <td className="px-3 py-2 text-sm font-mono text-zinc-500">PZ-MAR-001</td>
                      <td className="px-3 py-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">Rs.249</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                      <td className="px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200">Garden Fresh Veggie</td>
                      <td className="px-3 py-2 text-sm font-mono text-zinc-500">PZ-VEG-002</td>
                      <td className="px-3 py-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">Rs.299</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                      <td className="px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200">Double Cheese Burst</td>
                      <td className="px-3 py-2 text-sm font-mono text-zinc-500">PZ-CHZ-003</td>
                      <td className="px-3 py-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">Rs.349</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Display Settings Content */}
          {activeTab === "display" && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Public Visibility</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Show this category on the customer-facing website.</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Default Sorting</label>
                  <select className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none dark:text-zinc-100">
                    <option>Most Popular First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Global Sort Order (Ordinal)</label>
                  <input
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none dark:text-zinc-100"
                    type="number"
                    defaultValue={category?.sortOrder || "1"}
                  />
                  <p className="text-[10px] text-zinc-500">Lowest numbers appear first in the main navigation menu.</p>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Content */}
          {activeTab === "analytics" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Last 30 Days Performance</label>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 border-t-4 border-t-[var(--primary)] shadow-sm">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Revenue</span>
                  <h4 className="text-2xl font-black text-[var(--primary)] mt-2">₹1,24,590</h4>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-3">
                    <TrendingUp size={14} /> +12.5%
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 border-t-4 border-t-orange-500 shadow-sm">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Order Count</span>
                  <h4 className="text-2xl font-black text-orange-500 mt-2">1,842</h4>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-3">
                    <TrendingUp size={14} /> +5.2%
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                <h5 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-6">Most Ordered Items</h5>
                <div className="space-y-6">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 w-1/3 truncate">Margherita Classic</span>
                    <div className="w-2/3 flex items-center gap-4">
                      <div className="flex-1 h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 w-8">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 w-1/3 truncate">Veg Supreme</span>
                    <div className="w-2/3 flex items-center gap-4">
                      <div className="flex-1 h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--primary)] rounded-full opacity-80" style={{ width: "62%" }}></div>
                      </div>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 w-8">62%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-wrap justify-between gap-4">
          <button
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-950 shadow-sm"
            onClick={onClose}
          >
            Close
          </button>
          <div className="flex gap-4">
            {/* <button className="px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-xl text-sm font-bold hover:bg-[var(--primary)]/5 transition-colors bg-white dark:bg-zinc-950 shadow-sm">
              Manage Products
            </button> */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl text-sm font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-md"
            >
              <Edit2 size={16} /> Edit Category
            </button>
          </div>
        </div>
      </div>

      <EditCategoriesDetails
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={category}
      />
    </>
  );
}
