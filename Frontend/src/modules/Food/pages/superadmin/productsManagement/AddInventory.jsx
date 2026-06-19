import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Calculator,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Edit2,
  Info,
  Layers,
  Lightbulb,
  List,
  Package,
  Plus,
  PlusCircle,
  Refrigerator,
  Search,
  ShieldCheck,
  Snowflake,
  Trash2,
  Truck,
  X,
} from "lucide-react";

const steps = [
  ["Basic Info", "Basic Information"],
  ["Suppliers", "Suppliers"],
  ["Pricing", "Pricing & Units"],
  ["Storage", "Stock Settings"],
  ["Review", "Review"],
];

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 transition-all outline-none";

const suppliers = [
  ["Green Leaf Farms", "Primary", "SUP-0492", "GLF-ORG-ROM", "2"],
  ["Fresh Produce Wholesalers", "Secondary", "SUP-0128", "", "4"],
];

const locations = [
  ["Cold Storage", Snowflake],
  ["Dry Pantry", Layers],
  ["Walk-in", Refrigerator],
  ["Receiving", Truck],
];

const reviewCards = [
  {
    title: "Basic Info",
    step: 1,
    icon: Info,
    rows: [
      ["Product Name", "San Marzano Tomatoes (Bulk)"],
      ["Category", "Vegetables / Canned"],
      ["SKU", "PV-TOM-SM-042"],
    ],
  },
  {
    title: "Suppliers",
    step: 2,
    icon: Truck,
    rows: [
      ["Primary Vendor", "Italian Vineyards Ltd."],
      ["Lead Time", "3 - 5 Business Days"],
    ],
  },
  {
    title: "Pricing",
    step: 3,
    icon: Banknote,
    rows: [
      ["Unit Cost", "Rs. 12.40"],
      ["Markup", "25%"],
      ["Selling Price", "Rs. 15.50"],
    ],
  },
  {
    title: "Stock Settings",
    step: 4,
    icon: Package,
    rows: [
      ["Min Stock", "50 Units"],
      ["Max Stock", "200 Units"],
      ["Location", "Aisle 4, Shelf B"],
      ["Alerts", "Enabled"],
    ],
  },
];

function Field({ id, label, children, optional }) {
  return (
    <div className="space-y-1.5 group/field">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100" htmlFor={id}>
          {label}
        </label>
        {optional && <span className="text-xs font-bold text-zinc-500">Optional</span>}
      </div>
      {children}
    </div>
  );
}

function SelectField({ id, label, options }) {
  return (
    <Field id={id} label={label}>
      <div className="relative">
        <select id={id} className={`${inputClass} appearance-none cursor-pointer`}>
          {options.map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" size={18} />
      </div>
    </Field>
  );
}

function Toggle({ checked, onChange, color = "var(--primary)" }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div
        className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
        style={{ "--tw-bg-opacity": 1, backgroundColor: checked ? color : undefined }}
      />
    </label>
  );
}

function Stepper({ currentStep }) {
  return (
    <nav className="px-4 py-2.5 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto hide-scrollbar">
      <div className="flex items-center min-w-[540px] justify-between">
        {steps.map(([label], index) => {
          const step = index + 1;
          const isDone = currentStep > step;
          const isActive = currentStep >= step;

          return (
            <React.Fragment key={label}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-7 h-7 rounded-full shadow-sm text-xs font-bold ${isActive ? "bg-[var(--primary)] text-white" : "border-2 border-zinc-300 dark:border-zinc-700 text-zinc-500"}`}>
                  {isDone ? <Check size={14} /> : step}
                </div>
                <span className={`ml-2 text-xs font-bold ${isActive ? "text-[var(--primary)]" : "text-zinc-500"}`}>{label}</span>
              </div>
              {step < steps.length && <div className={`h-[2px] flex-grow mx-2 ${currentStep >= step + 1 ? "bg-[var(--primary)]" : "bg-zinc-200 dark:bg-zinc-800"}`} />}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

function SupplierCard({ supplier }) {
  const [name, badge, id, sku, leadTime] = supplier;
  const badgeClass = badge === "Primary" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg flex flex-col md:flex-row md:items-center gap-3 hover:shadow-md transition-shadow group">
      <div className="flex-1 space-y-1">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{name}</span>
        <div className="flex items-center gap-2">
          <span className={`${badgeClass} px-2 py-0.5 rounded text-xs font-bold`}>{badge}</span>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">ID: {id}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-[1.5]">
        <Field id={`${id}-sku`} label="Supplier SKU">
          <input className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none dark:text-zinc-100" defaultValue={sku} placeholder="Enter SKU..." type="text" />
        </Field>
        <Field id={`${id}-lead`} label="Lead Time">
          <div className="relative">
            <input className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none dark:text-zinc-100" defaultValue={leadTime} type="number" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">Days</span>
          </div>
        </Field>
      </div>
      <button className="p-2 text-red-500 opacity-40 hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default function AddInventory({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [itemName, setItemName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [priceIncludesTax, setPriceIncludesTax] = useState(false);
  const [trackExpiry, setTrackExpiry] = useState(true);

  if (!isOpen) return null;

  const nextLabel = ["Next Step", "Continue to Pricing", "Continue to Storage", "Continue to Review"][currentStep - 1] || "Continue";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-300">
        <header className="flex justify-between items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-1.5 rounded-lg text-[var(--primary)] border border-red-100 dark:border-red-900/30">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Add New Inventory Item</h2>
              <p className="text-xs font-medium text-zinc-500 mt-1">
                Step {currentStep}: {steps[currentStep - 1][1]}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 cursor-pointer active:scale-95">
            <X size={20} />
          </button>
        </header>

        <Stepper currentStep={currentStep} />

        <main className="flex-1 overflow-y-auto p-4 md:p-5 hide-scrollbar">
          {currentStep === 1 && (
            <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field id="item_name" label="Item Name *">
                  <div className="relative group">
                    <input id="item_name" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className={inputClass} placeholder="e.g., Fresh Paneer" />
                    <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[var(--primary)] transition-colors" size={16} />
                  </div>
                </Field>
                <Field id="sku" label="SKU *">
                  <input id="sku" type="text" defaultValue="PV-INV-PAN-001" className={`${inputClass} bg-zinc-50 dark:bg-zinc-900/50 font-mono`} />
                </Field>
                <SelectField id="category" label="Category" options={[["dairy", "Dairy"], ["produce", "Produce"], ["grains", "Grains"], ["spices", "Spices"], ["meat", "Meat & Poultry"]]} />
                <div className={`flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border transition-colors ${isActive ? "border-emerald-500/30 dark:border-emerald-400/30" : "border-zinc-200 dark:border-zinc-800"}`}>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Active Status</span>
                    <span className="text-xs text-zinc-500 font-medium">Availability for recipes</span>
                  </div>
                  <Toggle checked={isActive} onChange={(e) => setIsActive(e.target.checked)} color="#10b981" />
                </div>
              </div>
              <Field id="description" label="Description" optional>
                <textarea id="description" rows="3" placeholder="Detailed description of the ingredient, storage requirements, or prep notes..." className={`${inputClass} resize-none`} />
              </Field>
              <div className="relative h-32 rounded-lg overflow-hidden group border border-zinc-200 dark:border-zinc-800 cursor-pointer">
                <img alt="Fresh Paneer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdaCPhgo6bYNxfWTvj3ON9sCeXOYqqImt8E0q7H2RV5a7XHMI4Bd3mIVlbKKsMKg7FEExJ06QEZkSY7OZxKLrIw4F1umEkEP6x88WZvDf_Xtu0RBxWn3dZKEB6Ax22Sh21-GwIwfiOeCT_WpAXKzoBqntMS9o7zGOHHmwi4rukYuhx4Pvgy71gjdpPr93-7z6e4fFhwg_7W8zFDpIF5wqLzYvkEjgw2mdIJcQcgkc0FcJt-wIOEahSn5jD3TeMFmB79kjLetbYxgA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 group-hover:from-black/80 transition-colors">
                  <div className="flex items-center gap-2 text-white">
                    <Camera size={20} />
                    <span className="text-sm font-bold">Item Visual Representation</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Link Approved Suppliers</h2>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Define which vendors provide this ingredient to automate reordering and track lead times.</p>
              </div>
              <Field label="Select Suppliers">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all">
                  <Search className="text-zinc-400" size={18} />
                  <input className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none" placeholder="Search by vendor name or category..." type="text" />
                  <ChevronDown className="text-zinc-400 cursor-pointer" size={18} />
                </div>
              </Field>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <List size={18} /> Supplier Specific Data
                </h3>
                {suppliers.map((supplier) => (
                  <SupplierCard key={supplier[2]} supplier={supplier} />
                ))}
                <button className="w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-3 rounded-lg flex items-center justify-center gap-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-[var(--primary)]/50 transition-all group">
                  <Plus size={18} />
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">Add Another Supplier</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Pricing & Units</h2>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Set measurement, cost, and tax properties to calculate recipe margins.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField id="uom" label="Unit of Measure" options={[["kg", "Kilograms (kg)"], ["liters", "Liters (L)"], ["cases", "Cases (Box)"], ["units", "Individual Units"], ["grams", "Grams (g)"]]} />
                <Field id="cost" label="Cost per Unit (Net)">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">Rs.</span>
                    <input id="cost" type="number" step="0.01" placeholder="0.00" className={`${inputClass} pl-12 font-mono`} />
                  </div>
                </Field>
                <SelectField id="tax" label="Tax Category" options={[["standard", "Standard (20%)"], ["reduced", "Reduced (5%)"], ["exempt", "Exempt (0%)"]]} />
                <div className={`flex items-center justify-between px-3 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border transition-colors ${priceIncludesTax ? "border-[var(--primary)]/30" : "border-zinc-200 dark:border-zinc-800"}`}>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Price includes tax</span>
                  <Toggle checked={priceIncludesTax} onChange={(e) => setPriceIncludesTax(e.target.checked)} />
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 border-t-4 border-amber-400 dark:border-amber-500 p-4 rounded-lg shadow-sm flex gap-4 items-start">
                <div className="w-9 h-9 bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-500 flex items-center justify-center rounded-full shrink-0">
                  <Calculator size={20} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-amber-900 dark:text-amber-300">Margin Intelligence</h3>
                  <p className="text-sm font-medium text-amber-800/80 dark:text-amber-200/80">Based on a Rs. 12.50 average pizza price, this cost contributes to a <span className="font-bold text-emerald-600 dark:text-emerald-400">68.2%</span> gross margin.</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Stock Settings</h2>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Configure quantities, storage zones, and shelf-life tracking.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["initial-stock", "Initial Stock Level", "KG", null],
                  ["reorder-point", "Reorder Point (Low Stock Alert)", null, AlertTriangle],
                ].map(([id, label, suffix, Icon]) => (
                  <Field key={id} id={id} label={label}>
                    <div className="relative">
                      <input id={id} type="number" placeholder="0.00" className={`${inputClass} font-mono`} />
                      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-sm">{suffix}</span>}
                      {Icon && <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />}
                    </div>
                  </Field>
                ))}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Storage Location</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {locations.map(([label, Icon], index) => (
                      <label key={label} className="cursor-pointer group">
                        <input type="radio" name="location" className="hidden peer" defaultChecked={index === 0} />
                        <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 peer-checked:bg-emerald-50 dark:peer-checked:bg-emerald-900/20 peer-checked:border-emerald-500 dark:peer-checked:border-emerald-500/50 transition-all flex flex-col items-center gap-1.5 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50">
                          <Icon className="text-zinc-600 dark:text-zinc-400" size={20} />
                          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Track Expiry Dates</h3>
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Enable automated FIFO management.</p>
                    </div>
                    <Toggle checked={trackExpiry} onChange={(e) => setTrackExpiry(e.target.checked)} />
                  </div>
                  {trackExpiry && (
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                      <div className="relative w-full sm:max-w-xs">
                        <input id="avg-shelf-life" type="number" defaultValue="7" className={`${inputClass} font-mono`} />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      </div>
                      <div className="p-2.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg flex items-center gap-2">
                        <Lightbulb className="text-amber-500 shrink-0" size={18} />
                        <span className="text-sm font-bold text-amber-800 dark:text-amber-400">Recommended: 5-7 days for fresh produce</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-[var(--primary)]" size={24} />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Review & Confirm</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewCards.map(({ title, step, icon: Icon, rows }) => (
                  <div key={title} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Icon size={20} className="text-zinc-500" /> {title}
                      </h3>
                      <button onClick={() => setCurrentStep(step)} className="text-[var(--primary)] text-sm font-bold hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Edit <Edit2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {rows.map(([label, value]) => (
                        <div key={label}>
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{label}</p>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 border border-zinc-200 dark:border-zinc-800">
                <div className="w-full md:w-1/4 aspect-square rounded-lg overflow-hidden shadow-lg border-4 border-white dark:border-zinc-800">
                  <img alt="San Marzano Tomatoes" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2l0xgYvBbhmQOW9OGVdXY0bpf-mKhWhy7w1QIb5Cm4_Hy6wHkyJ23MgK2gpf4ysNGiS6PGTQMbUSAdTENS89YmY7ITidVXnDEUCZGy_QKqASLiOdyeoZ-uq5XUyarwzvan6gcGR-pC8FJNyBqpquTcWFbNvN99to22mMzEgjsfjaUoaclfTj4imrI5lb_OSx69Lo7XzdnNY37cNBOScNlwBVrNbvVWtPtNhDmmPWMlwmvmvvm3Hj5ItoQXI-s7zFhbcdaz8mDre4" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-[var(--primary)] font-bold text-xs tracking-widest uppercase">Summary Preview</p>
                  <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">Ready for Launch.</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">All data has been validated against the <span className="font-bold text-zinc-700 dark:text-zinc-300">Papa Veg Inventory Protocol</span>. Once confirmed, this item will be available for recipe mapping and order fulfillment.</p>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center">
          <button
            onClick={currentStep === 1 ? onClose : () => setCurrentStep((prev) => prev - 1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 bg-white dark:bg-zinc-950 shadow-sm"
          >
            {currentStep > 1 && <ArrowLeft size={16} />}
            {currentStep === 1 ? "Cancel" : "Previous"}
          </button>

          <button
            onClick={currentStep === 5 ? onClose : () => setCurrentStep((prev) => Math.min(prev + 1, 5))}
            className="px-4 py-2 text-sm font-bold rounded-lg bg-[var(--primary)] text-white shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center gap-2"
          >
            {currentStep === 5 ? "Add to Inventory" : nextLabel}
            {currentStep === 5 ? <PlusCircle size={18} /> : <ArrowRight size={16} />}
          </button>
        </footer>
      </div>
    </div>
  );
}
