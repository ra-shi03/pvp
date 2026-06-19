import React, { useState, useEffect } from "react";
import { X, Info } from "lucide-react";

export default function AddZoneModal({ isOpen, onClose, onSubmit, regions = [], existingZones = [], editZone = null }) {
  const [zoneName, setZoneName] = useState("");
  const [regionId, setRegionId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editZone) {
      setZoneName(editZone.name || "");
      setRegionId(editZone.regionId || "");
      setDescription(editZone.description || "");
      setStatus(editZone.status || "Active");
    } else {
      setZoneName("");
      setRegionId(regions[0]?.id || "");
      setDescription("");
      setStatus("Active");
    }
    setError("");
  }, [editZone, isOpen, regions]);

  if (!isOpen) return null;

  const handleSave = (isDraft = false) => {
    setError("");
    const trimmedName = zoneName.trim();

    if (!trimmedName) {
      setError("Zone name is required.");
      return;
    }
    if (!regionId) {
      setError("Valid region selection is required.");
      return;
    }

    // Check duplicate (exclude current zone if editing)
    const isDuplicate = existingZones.some(
      (z) =>
        z.name.toLowerCase() === trimmedName.toLowerCase() &&
        z.regionId === regionId &&
        (!editZone || z.id !== editZone.id)
    );

    if (isDuplicate) {
      const parentRegion = regions.find((r) => r.id === regionId);
      setError(`Zone "${trimmedName}" already exists in region "${parentRegion?.name || regionId}".`);
      return;
    }

    const selectedRegion = regions.find((r) => r.id === regionId);

    onSubmit({
      id: editZone ? editZone.id : `ZN-${Date.now()}`,
      name: trimmedName,
      regionId,
      regionName: selectedRegion ? selectedRegion.name : "",
      description,
      status: isDraft ? "Archived" : status,
      isDraft,
      territoriesCount: editZone ? editZone.territoriesCount : 0,
      franchisesCount: editZone ? editZone.franchisesCount : 0,
      storesCount: editZone ? editZone.storesCount : 0,
      activeOrders: editZone ? editZone.activeOrders : 0,
      revenue: editZone ? editZone.revenue : 0,
      createdDate: editZone ? editZone.createdDate : new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm lg:pl-[280px]" id="add-zone-modal">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 animate-scaleUp">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-zinc-100">
              {editZone ? "Edit Zone" : "Add Zone"}
            </h3>
            <p className="text-[10px] font-bold text-[var(--primary)] mt-0.5">
              {editZone ? `Modifying ${editZone.name}` : "Create a new sub-regional zone for franchise stores"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-black dark:text-zinc-300 hover:text-[var(--primary)] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}

          {editZone && editZone.storesCount > 0 && regionId !== editZone.regionId && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg flex gap-2">
              <Info className="text-amber-600 shrink-0 mt-0.5" size={14} />
              <p className="text-[10px] font-bold text-amber-800 dark:text-amber-400">
                Warning: Reassigning parent region. Ensure associated territories remain consistent with new region.
              </p>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-black dark:text-zinc-400 uppercase">Zone Name *</label>
            <input
              type="text"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              placeholder="e.g. Mumbai Central, Pune West"
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-black dark:text-zinc-400 uppercase">Select Region *</label>
            <select
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
            >
              <option value="" disabled>Select parent region</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.country})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-black dark:text-zinc-400 uppercase">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain territories covered (e.g. Andheri, Bandra, Juhu)..."
              rows={3}
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-black dark:text-zinc-400 uppercase">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)]"
            >
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between gap-3 select-none">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-300 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            {!editZone && (
              <button
                onClick={() => handleSave(true)}
                className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-300 transition-all cursor-pointer"
              >
                Save Draft
              </button>
            )}
            <button
              onClick={() => handleSave(false)}
              className="px-5 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              {editZone ? "Save Changes" : "Create Zone"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
