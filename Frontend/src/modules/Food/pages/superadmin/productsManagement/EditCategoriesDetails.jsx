import React, { useState, useEffect } from "react";
import { X, Check, Camera, Image as ImageIcon } from "lucide-react";

export default function EditCategoriesDetails({ isOpen, onClose, category }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
    parentCategory: "",
    displayPriority: "10",
    metaTitle: "",
    metaDesc: "",
    canonicalUrl: ""
  });

  useEffect(() => {
    if (category && isOpen) {
      setFormData({
        name: category.name || "",
        slug: category.slug || category.name?.toLowerCase().replace(/ /g, "-") || "",
        description: category.description || "",
        isActive: category.status !== "Inactive",
        parentCategory: category.parent || "",
        displayPriority: category.sortOrder || "10",
        metaTitle: "",
        metaDesc: "",
        canonicalUrl: ""
      });
    }
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-3xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 rounded-t-2xl">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Edit Category: {category?.name}</h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-[var(--primary)] transition-colors p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5 hide-scrollbar">
          
          {/* Basic Details */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Category Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all dark:text-zinc-100" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Slug</label>
                <input 
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all dark:text-zinc-100" 
                />
              </div>
              <div className="col-span-full space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all resize-none dark:text-zinc-100" 
                ></textarea>
              </div>
              <div className="col-span-full flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">Category Status</span>
                  <span className="text-xs text-zinc-500">Visible on the customer menu</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">Media</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
                <div className="p-2 rounded-full bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 text-[var(--primary)]">
                  <Camera size={20} />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-[var(--primary)] block">Change Thumbnail</span>
                  <span className="text-[10px] text-zinc-500">Square (1:1) PNG/JPG</span>
                </div>
              </div>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
                <div className="p-2 rounded-full bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 text-[var(--primary)]">
                  <ImageIcon size={20} />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-[var(--primary)] block">Change Banner</span>
                  <span className="text-[10px] text-zinc-500">Wide (16:9) PNG/JPG</span>
                </div>
              </div>
            </div>
          </section>

          {/* Attributes */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">Attributes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Parent Category</label>
                <select 
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleChange}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all dark:text-zinc-100"
                >
                  <option value="">None (Top Level)</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Sides">Sides & Appetizers</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase">Sort Priority</label>
                <input 
                  type="number" 
                  name="displayPriority"
                  value={formData.displayPriority}
                  onChange={handleChange}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all dark:text-zinc-100" 
                />
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-3 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-950"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-1.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-md"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
