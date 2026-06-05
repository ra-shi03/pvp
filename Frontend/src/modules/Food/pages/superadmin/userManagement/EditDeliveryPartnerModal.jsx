import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function EditDeliveryPartnerModal({ isOpen, onClose, rider, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vehicle: "Electric Bike",
    status: "Online",
    priorityRouting: true,
  })

  // Prefill form data if editing an existing rider
  useEffect(() => {
    if (rider) {
      setFormData({
        name: rider.name || "",
        email: rider.email || "",
        phone: rider.phone || "",
        address: rider.address || "",
        vehicle: rider.vehicle || "Electric Bike",
        status: rider.status || "Online",
        priorityRouting: rider.priorityRouting !== false,
      })
    } else {
      // Clear form if adding a new rider
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        vehicle: "Electric Bike",
        status: "Online",
        priorityRouting: true,
      })
    }
  }, [rider, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic Validation
    if (!formData.name.trim()) return alert("Full Name is required")
    if (!formData.email.trim()) return alert("Email Address is required")
    if (!formData.phone.trim()) return alert("Phone Number is required")

    const savedRider = {
      ...(rider || {
        id: `RP-${Math.floor(10000 + Math.random() * 90000)}`,
        store: "NYC Downtown",
        franchise: "NYC Metro",
        totalOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        rating: 5.0,
        licenseNumber: `ABC-${Math.floor(1000 + Math.random() * 9000)}-NY`,
        vehicleModel: "Model Standard",
        storeManager: "Sarah Jenkins",
        recentDeliveries: [],
      }),
      ...formData,
    }

    onSave(savedRider)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-[121]"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-50">
                  {rider ? "Edit Delivery Partner" : "Add Delivery Partner"}
                </h3>
                <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                  {rider ? `Update credentials and status for ${rider.name}` : "Create a new delivery partner profile"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X size={18} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-350" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-150 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex.r@delivery.com"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-150 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 212-555-0192"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-150 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Address */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 722 Pizza Lane, Downtown District, Suite 4B"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium text-xs text-zinc-800 dark:text-zinc-150 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Vehicle Type */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Vehicle Type</label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all cursor-pointer"
                  >
                    <option value="Electric Bike">Electric Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Bicycle">Bicycle</option>
                  </select>
                </div>

                {/* Operational Status */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Operational Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-xs text-zinc-700 dark:text-zinc-350 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all cursor-pointer"
                  >
                    <option value="Online">Online</option>
                    <option value="Busy">Busy</option>
                    <option value="Offline">Offline</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Advanced Priority Routing Toggle */}
              <div className="flex items-start gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-850">
                <input
                  type="checkbox"
                  id="priorityRouting"
                  name="priorityRouting"
                  checked={formData.priorityRouting}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <div>
                  <label htmlFor="priorityRouting" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer">
                    Enable priority routing
                  </label>
                  <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                    Assign high-value orders to this partner automatically.
                  </p>
                </div>
              </div>

              {/* Form Actions Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 font-bold text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl font-bold text-xs shadow-md shadow-[var(--primary)]/10 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
