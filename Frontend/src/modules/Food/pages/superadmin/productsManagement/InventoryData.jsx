import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Download, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function InventoryData({ onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const filterRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Data Export", 14, 15);

    const tableColumn = ["Item Name", "SKU", "Category", "Current Stock", "Status", "Last Updated"];
    const tableRows = [];

    filteredInventory.forEach(item => {
      const rowData = [
        item.name,
        item.id,
        item.category,
        item.stock,
        item.status,
        item.lastUpdated
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [175, 16, 26] },
    });

    doc.save("inventory_data.pdf");
  };

  const initialInventory = [
    {
      id: "PV-TOM-001",
      name: "San Marzano Tomatoes",
      category: "Produce",
      stock: "45.0 kg",
      lastUpdated: "2h ago",
      status: "Healthy",
      statusColor: "emerald",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCboZtBg-Gs90exVet5HWFfL0g9OLivnzrCZTSy6ri0M3wQuPc4abJxKrLbBCF3xrGFCHcN87V8oI0L6h-pMUbqnz4jBsR6IiNJWyGfHfM3x46z4w1ltyjkvh1SyjrfQsSlUYKjWpQ-DPT3FAoCPHjmL2waIipS2MOfyxncA7XpRTmLaH_ccNOjd-VdBidnB-c4Slg5b14yoDukGJBR9en6XaUqvMSyiq5RYdYa1MboqUfnz1KYxdRGwNoNSZs18e3QkVS23e8r2go",
    },
    {
      id: "PV-DAI-024",
      name: "Fresh Mozzarella",
      category: "Dairy",
      stock: "8.5 kg",
      lastUpdated: "Refill needed",
      status: "Low Stock",
      statusColor: "amber",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKRNcSu23QgE44SxRG-b6fPhsyLW9iESYofz9WVZNjKFCOM_FY9wOLXqxrA1f3AI9-3aP4S1vuNXn9fbfwsffsEquExgJqFLTIBKWp3SOHTYzBbSNSEJfyP_gVSqYZVseImYRdpsQ-4LwLaX_hFEfAiqfYUedMdnHyeGn1-NaQxfIDpvOQaDTqdH-kTjQ5k1iLUi9tlh7irRGTOhaNCK_KHQhgkZVbp5Q8zcFxDLX5NiGP3XPdPHBaKOt7lJEK1tDoouc446TWFHQ",
    },
    {
      id: "PV-HER-012",
      name: "Fresh Basil Leaves",
      category: "Herbs",
      stock: "0.0 kg",
      lastUpdated: "Stockout",
      status: "Out of Stock",
      statusColor: "red",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpiXAUHRwZrBWPalGhH9UcI8BYvgCcLn-cF6r5zFcl7esXorN-J9DFXKKoQYotTcS3mhuoSjHrgjYNGT_o2nbdlnWR0C4iIjW7lTZ6nHaDQR-4XkFCUtxjtJjfvADBlooe2x4XObuH65WTTnrzcXfDeajaanrpBclQ_6DJbuYfsETJtVQCb4_SLQjIAQg9PMvtzon3xClkXnU5g-JlY0l5rCn_sspGxRzpYuHXYDsCS8QiFZk1smUfiS_XBdXT_IrfVPbwnwjfnW0",
    },
    {
      id: "PV-DRY-005",
      name: "Tipo 00 Flour",
      category: "Dry Goods",
      stock: "120.0 kg",
      lastUpdated: "1d ago",
      status: "Healthy",
      statusColor: "emerald",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXIF5vJ-NQCAd3yEUE6dqn-C1_sBbmpv-t2mbmglOYHcF-R1bSP_YZXtX5JJRFQnzMM1pb5nAhLgoGLU4lBnHlf3OIpVbFRn6EKTB7KjFlQpkce-tH-jyaeGq3KqaMrGscXgQIqXzdBys6bG1wEMuAmo0xqByLAkWfCQK75Pvf-ZgDhSc_rYjs84LMTTGcnT99q6yjedvK5keP_ggKfpfR-RU3OWWk7gQV472f04yjfVKmSSyQq52C19MKXw2cK4M_fO5DOD_NJVk",
    }
  ];

  const categories = ["All", ...new Set(initialInventory.map(item => item.category))];
  const statuses = ["All", ...new Set(initialInventory.map(item => item.status))];

  const filteredInventory = initialInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.id.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSearchTerm("");
  };

  return (
    <section className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Table Header/Search */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60" size={14} />
            <input
              className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all text-xs text-black dark:text-white"
              placeholder="Search by item name or SKU..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 border rounded-lg text-xs font-bold transition-all shadow-sm relative ${isFilterOpen ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-600 text-black dark:text-white' : 'bg-white dark:bg-zinc-955 border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}
            >
              <Filter size={12} />
              <span>Filters</span>
              {(selectedCategory !== "All" || selectedStatus !== "All") && (
                <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--primary)] absolute top-1 right-1"></span>
              )}
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shadow-sm"
            >
              <Download size={12} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Options Row */}
        {isFilterOpen && (
          <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 sm:flex-none px-2.5 py-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-[var(--primary)] outline-none text-black dark:text-white min-w-[120px] font-semibold"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 sm:flex-none px-2.5 py-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:ring-2 focus:ring-[var(--primary)] outline-none text-black dark:text-white min-w-[120px] font-semibold"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {(selectedCategory !== "All" || selectedStatus !== "All") && (
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-1 px-2 py-1 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-auto sm:ml-0"
                title="Reset Filters"
              >
                <X size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/80 text-black dark:text-white uppercase tracking-wider text-[10px] font-bold border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-3 py-2">Item & SKU</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2 text-right">Current Stock</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredInventory.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group"
              >
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-black dark:text-white">{item.name}</p>
                      <p className="text-[10px] text-black/70 dark:text-white/70 font-semibold">SKU: {item.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shadow-sm">
                    {item.category}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <p className={`font-bold text-xs ${item.statusColor === 'red' ? 'text-red-650 dark:text-red-400' : item.statusColor === 'amber' ? 'text-[var(--primary)]' : 'text-black dark:text-white'}`}>
                    {item.stock}
                  </p>
                  <p className={`text-[10px] ${item.statusColor === 'red' ? 'text-red-500 font-bold' : item.statusColor === 'amber' ? 'text-red-500 font-bold' : 'text-black/70 dark:text-white/70 font-semibold'}`}>
                    {item.lastUpdated}
                  </p>
                </td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${item.statusColor === 'emerald' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      item.statusColor === 'amber' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    <span className={`w-1 h-1 rounded-full ${item.statusColor === 'emerald' ? 'bg-emerald-500' :
                        item.statusColor === 'amber' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}></span>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails && onViewDetails(item);
                    }}
                    className="text-black/60 dark:text-white/60 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan="5" className="px-3 py-6 text-center text-black/60 dark:text-white/60 text-xs">
                  No items found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/50">
        <p className="text-[11px] font-semibold text-black/70 dark:text-white/70">
          Showing <span className="font-bold text-black dark:text-white">1</span> to <span className="font-bold text-black dark:text-white">{filteredInventory.length}</span> of <span className="font-bold text-black dark:text-white">156</span> items
        </p>
        <div className="flex items-center gap-1.5">
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            <ChevronLeft size={12} />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-[var(--primary)] text-white font-bold text-[10px] shadow-sm">1</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white font-bold text-[10px]">2</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white font-bold text-[10px]">3</button>
          <span className="text-black/50 dark:text-white/50 px-0.5 text-xs">...</span>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white font-bold text-[10px]">16</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
