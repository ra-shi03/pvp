import React, { useState, useEffect } from "react";
import { X, Check, RefreshCw, AlertTriangle } from "lucide-react";

export default function ReassignFranchiseModal({
  isOpen,
  onClose,
  onSubmit,
  territory,
  franchises
}) {
  if (!isOpen || !territory) return null;

  const [newFranchiseId, setNewFranchiseId] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const currentFranchise = franchises.find((f) => f.id === territory.assignedFranchiseId);

  // Filter franchises list to only show those operating within the same region as the territory
  const compatibleFranchises = franchises.filter(
    (f) => f.regionId === territory.regionId && f.id !== territory.assignedFranchiseId
  );

  const handleConfirm = () => {
    if (!newFranchiseId) {
      setError("Please select a new franchise holder.");
      return;
    }
    if (!reason.trim()) {
      setError("Please provide a reason for the reassignment transition.");
      return;
    }

    onSubmit({
      territoryId: territory.id,
      newFranchiseId,
      effectiveDate,
      reason
    });
    setError("");
    setReason("");
    setNewFranchiseId("");
  };

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[70] flex items-center justify-center p-4 lg:pl-[280px] select-none text-xs font-semibold">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 animate-scaleUp">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-orange-600">
            <RefreshCw size={14} />
            <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-zinc-200">
              Reassign Franchise
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-black dark:hover:text-zinc-200 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/65 rounded-lg border border-zinc-150 dark:border-zinc-850">
            <span className="text-[8px] font-bold text-zinc-500 block uppercase">Current Franchise</span>
            <p className="font-bold text-[11px] text-zinc-700 dark:text-zinc-300">
              {currentFranchise ? currentFranchise.name : "No Franchise Assigned (Unassigned)"}
            </p>
            {currentFranchise && (
              <span className="text-[8px] text-zinc-500 font-bold">Code: {currentFranchise.code}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
              Select New Franchise *
            </label>
            <select
              value={newFranchiseId}
              onChange={(e) => setNewFranchiseId(e.target.value)}
              className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
            >
              <option value="">Choose New Franchise...</option>
              {compatibleFranchises.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.code})
                </option>
              ))}
            </select>
            <span className="text-[8px] text-zinc-500 leading-normal">
              Showing franchises matching Region: {territory.regionName}
            </span>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
              Effective Date *
            </label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
              Reason for Reassignment *
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Contractual renewal change, poor store SLA compliance, etc."
              className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
            />
          </div>

          {error && <p className="text-[9px] font-black text-rose-500">{error}</p>}

          <div className="p-2.5 bg-amber-500/5 border border-amber-500/10 rounded-lg flex gap-1.5 text-amber-600 dark:text-amber-400 leading-normal font-bold">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <p className="text-[8px]">
              Downstream stores mapped to this territory code will immediately route reports under the new franchise. This action does not break historical logs.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-300 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Confirm</span>
            <Check size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
