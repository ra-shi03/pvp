import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Mail, Phone, Store, MapPin, Layers, Save, Ban } from "lucide-react"

// Combined ADD / EDIT Franchise Admin Modal
export function EditFranchiseModal({ isOpen, onClose, admin, onSave }) {
  const isEdit = !!admin

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    franchiseName: "",
    city: "",
    state: "",
    type: "Single Store",
    totalStores: 1,
    status: "ACTIVE"
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
        franchiseName: admin.franchiseName || "",
        city: admin.city || "",
        state: admin.state || "",
        type: admin.type || "Single Store",
        totalStores: admin.totalStores || 1,
        status: admin.status || "ACTIVE"
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        franchiseName: "",
        city: "",
        state: "",
        type: "Single Store",
        totalStores: 1,
        status: "ACTIVE"
      })
    }
    setErrors({})
  }, [admin, isOpen])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.franchiseName.trim()) newErrors.franchiseName = "Franchise name is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (formData.totalStores < 1) newErrors.totalStores = "Must have at least 1 store"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSave({
      ...(admin || {}),
      ...formData,
      id: admin?.id || `FRAN-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: admin?.joinedDate || new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }),
      revenue: admin?.revenue || 0,
      totalManagers: admin?.totalManagers || 0
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[105] overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
                    {isEdit ? "Edit Franchise Admin" : "Add Franchise Admin"}
                  </h3>
                  <p className="text-zinc-400 dark:text-zinc-500 font-semibold text-xs mt-0.5">
                    {isEdit ? "Update profile details and administrative permissions." : "Register a new franchise operator in the system."}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-zinc-55 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body (Scrollable) */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4 scrollbar-thin">
                {/* Personal Section */}
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                    Personal Details
                  </span>
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-450 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className={`w-full text-xs pl-11 pr-4 py-3.5 border rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all ${
                          errors.name ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-450 text-zinc-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@example.com"
                          className={`w-full text-xs pl-11 pr-4 py-3.5 border rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all ${
                            errors.email ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-450 text-zinc-400" />
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +1 234 567 890"
                          className={`w-full text-xs pl-11 pr-4 py-3.5 border rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all ${
                            errors.phone ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Franchise Details Section */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-wider">
                    Franchise Configuration
                  </span>

                  {/* Franchise Brand Name */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Franchise / Brand Name</label>
                    <div className="relative">
                      <Store size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-450 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.franchiseName}
                        onChange={(e) => setFormData({ ...formData, franchiseName: e.target.value })}
                        placeholder="e.g. Papa Veg Centro"
                        className={`w-full text-xs pl-11 pr-4 py-3.5 border rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all ${
                          errors.franchiseName ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                    </div>
                    {errors.franchiseName && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.franchiseName}</p>}
                  </div>

                  {/* City & State Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">City</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-450 text-zinc-400" />
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Milan"
                          className={`w-full text-xs pl-11 pr-4 py-3.5 border rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all ${
                            errors.city ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                          }`}
                        />
                      </div>
                      {errors.city && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">State / Region</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="e.g. Lombardia"
                        className={`w-full text-xs px-4 py-3.5 border rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all ${
                          errors.state ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                      {errors.state && <p className="text-[10px] text-rose-500 font-bold mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  {/* Franchise Type, Stores Count, and Status Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Franchise Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => {
                          const val = e.target.value
                          setFormData({
                            ...formData,
                            type: val,
                            totalStores: val === "Single Store" ? 1 : Math.max(formData.totalStores, 2)
                          })
                        }}
                        className="w-full text-xs px-3.5 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all cursor-pointer"
                      >
                        <option>Single Store</option>
                        <option>Multi Store</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Store Limit</label>
                      <div className="relative">
                        <Layers size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="number"
                          min="1"
                          disabled={formData.type === "Single Store"}
                          value={formData.totalStores}
                          onChange={(e) => setFormData({ ...formData, totalStores: parseInt(e.target.value) || 1 })}
                          className={`w-full text-xs pl-11 pr-4 py-3.5 border rounded-xl text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all ${
                            formData.type === "Single Store"
                              ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-450 dark:text-zinc-500 border-zinc-150 dark:border-zinc-850 cursor-not-allowed"
                              : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Account Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full text-xs px-3.5 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                        {isEdit && <option value="SUSPENDED">SUSPENDED</option>}
                      </select>
                    </div>
                  </div>
                </div>
              </form>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-2 z-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-5 py-3.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl text-xs font-bold shadow-md shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Save size={14} className="stroke-[2.5]" />
                  <span>{isEdit ? "Save Profile Changes" : "Create Franchise Admin"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Destructive SUSPEND modal dialog
export function SuspendFranchiseModal({ isOpen, onClose, admin, onConfirm }) {
  const [reason, setReason] = useState("Violation of terms")
  const [notes, setNotes] = useState("")

  const reasons = [
    "Violation of terms",
    "Late payouts",
    "Repeated low customer ratings",
    "Operational issues / closure",
    "Other"
  ]

  const handleConfirm = () => {
    onConfirm(admin.id, { reason, notes })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && admin && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[105]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 pointer-events-auto relative"
            >
              {/* Top Red Danger Icon */}
              <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 rounded-full flex items-center justify-center mb-4">
                <Ban size={20} className="stroke-[2.5]" />
              </div>

              {/* Content text */}
              <div className="mb-5">
                <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">
                  Suspend Franchise Account
                </h3>
                <p className="text-zinc-400 dark:text-zinc-500 font-semibold text-xs mt-1.5 leading-normal">
                  Are you sure you want to suspend <strong className="text-zinc-800 dark:text-zinc-200">{admin.name}</strong> ({admin.franchiseName})? This operation will revoke administrative panel access and hide all active store listings from consumers.
                </p>
              </div>

              {/* Form Input options */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Primary Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full text-xs px-3.5 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
                  >
                    {reasons.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5">Additional Notes (Internal)</label>
                  <textarea
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Provide specific notes regarding why the account is suspended..."
                    className="w-full text-xs p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={onClose}
                  className="px-5 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex items-center gap-2 px-5 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Ban size={14} className="stroke-[2.5]" />
                  <span>Suspend Account</span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
