import React, { useState, useEffect } from "react";
import { X, Check, ArrowLeft, ArrowRight, Save, Landmark, AlertTriangle } from "lucide-react";

export default function AddEditTerritoryModal({
  isOpen,
  onClose,
  onSubmit,
  regions,
  zones,
  franchises,
  existingTerritories,
  editTerritory
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    status: "Active",
    regionId: "",
    zoneId: "",
    assignedFranchiseId: "",
    postalCodes: [],
    deliveryRadiusKm: 5,
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [postalInput, setPostalInput] = useState("");

  // Pre-fill if editing
  useEffect(() => {
    if (editTerritory) {
      setFormData({
        id: editTerritory.id,
        name: editTerritory.name,
        description: editTerritory.description || "",
        status: editTerritory.status || "Active",
        regionId: editTerritory.regionId || "",
        zoneId: editTerritory.zoneId || "",
        assignedFranchiseId: editTerritory.assignedFranchiseId || "",
        postalCodes: [...(editTerritory.postalCodes || [])],
        deliveryRadiusKm: editTerritory.deliveryRadiusKm || 5,
        notes: editTerritory.notes || ""
      });
      setStep(1);
      setErrors({});
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        status: "Active",
        regionId: "",
        zoneId: "",
        assignedFranchiseId: "",
        postalCodes: [],
        deliveryRadiusKm: 5,
        notes: ""
      });
      setStep(1);
      setErrors({});
    }
  }, [editTerritory, isOpen]);

  // Validation routines per step
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Territory Name is required.";
      } else {
        // Uniqueness check within the same zone
        const duplicate = existingTerritories.some(
          (t) =>
            t.name.toLowerCase().trim() === formData.name.toLowerCase().trim() &&
            t.zoneId === formData.zoneId &&
            t.id !== formData.id
        );
        if (duplicate && formData.zoneId) {
          newErrors.name = "A territory with this name already exists in the selected zone.";
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.regionId) {
        newErrors.regionId = "Please select a region.";
      }
      if (!formData.zoneId) {
        newErrors.zoneId = "Please select a zone.";
      }
    }

    if (currentStep === 4) {
      if (formData.postalCodes.length === 0) {
        newErrors.postalCodes = "At least one postal code PIN is required.";
      }
      if (!formData.deliveryRadiusKm || formData.deliveryRadiusKm <= 0) {
        newErrors.deliveryRadiusKm = "Delivery radius must be greater than 0 km.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  // Add postal PIN chip
  const handleAddPostal = () => {
    const trimmed = postalInput.trim();
    if (!trimmed) return;
    
    // Simple Indian PIN validation (6 digits)
    if (!/^\d{6}$/.test(trimmed)) {
      setErrors({ ...errors, postalInput: "Pincode must be exactly 6 digits." });
      return;
    }

    if (formData.postalCodes.includes(trimmed)) {
      setErrors({ ...errors, postalInput: "Pincode is already added." });
      return;
    }

    setFormData({
      ...formData,
      postalCodes: [...formData.postalCodes, trimmed]
    });
    setPostalInput("");
    setErrors({ ...errors, postalInput: null, postalCodes: null });
  };

  // Remove postal PIN chip
  const handleRemovePostal = (code) => {
    setFormData({
      ...formData,
      postalCodes: formData.postalCodes.filter((c) => c !== code)
    });
  };

  // Bulk paste pincodes
  const handleBulkPaste = () => {
    const raw = prompt("Paste comma or space-separated 6-digit PIN codes:");
    if (!raw) return;
    const regex = /\b\d{6}\b/g;
    const found = raw.match(regex) || [];
    if (found.length === 0) {
      alert("No valid 6-digit postal codes detected.");
      return;
    }
    const combined = Array.from(new Set([...formData.postalCodes, ...found]));
    setFormData({ ...formData, postalCodes: combined });
    setErrors({ ...errors, postalCodes: null });
  };

  const handleSaveDraft = () => {
    console.log("Saving territory draft...", formData);
    alert("Draft saved successfully!");
    onClose();
  };

  const handleFinalSubmit = () => {
    if (validateStep(step)) {
      onSubmit(formData);
    }
  };

  // Cascading dropdown filters
  const availableZones = formData.regionId
    ? zones.filter((z) => z.regionId === formData.regionId)
    : [];

  const availableFranchises = formData.regionId
    ? franchises.filter((f) => f.regionId === formData.regionId)
    : franchises;

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[70] flex items-center justify-center p-3 sm:p-4 lg:pl-[280px] select-none">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 flex flex-col max-h-[90vh] animate-scaleUp">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between items-center">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-black dark:text-zinc-100 uppercase tracking-wider">
              {editTerritory ? "Edit Territory" : "Add Territory"}
            </h3>
            <p className="text-[10px] text-zinc-500 font-bold">Step {step} of 5</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-black dark:hover:text-zinc-200 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Wizard Stepper Progress Bar */}
        <div className="flex w-full h-1 bg-zinc-100 dark:bg-zinc-900">
          <div
            className="h-full bg-[var(--primary)] transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Form Body Scroll area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin text-xs">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  Territory Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bandra West Cluster"
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                />
                {errors.name && <p className="text-[9px] font-black text-rose-500">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summarize the geographical boundaries or market segments covered."
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Geographic Assignment */}
          {step === 2 && (
            <div className="space-y-4">
              {editTerritory && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-2 text-amber-700 dark:text-amber-400 font-bold leading-normal">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <p className="text-[9px]">
                    WARNING: Changing Region or Zone downstream mappings affects stores currently tied to this territory code. Check existing stores list prior to committing changes.
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  Select Region *
                </label>
                <select
                  value={formData.regionId}
                  onChange={(e) =>
                    setFormData({ ...formData, regionId: e.target.value, zoneId: "" })
                  }
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                >
                  <option value="">Choose Region...</option>
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                {errors.regionId && (
                  <p className="text-[9px] font-black text-rose-500">{errors.regionId}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  Select Zone *
                </label>
                <select
                  value={formData.zoneId}
                  onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                  disabled={!formData.regionId}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] disabled:opacity-50 font-semibold"
                >
                  <option value="">Choose Zone...</option>
                  {availableZones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name}
                    </option>
                  ))}
                </select>
                {errors.zoneId && (
                  <p className="text-[9px] font-black text-rose-500">{errors.zoneId}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Franchise Assignment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase flex items-center gap-1">
                  <Landmark size={12} />
                  <span>Assign Franchise (Optional)</span>
                </label>
                <select
                  value={formData.assignedFranchiseId}
                  onChange={(e) => setFormData({ ...formData, assignedFranchiseId: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                >
                  <option value="">No Franchise Assignment (Unassigned)</option>
                  {availableFranchises.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.code})
                    </option>
                  ))}
                </select>
                <p className="text-[9px] text-zinc-500 mt-1 leading-relaxed">
                  Only franchises operating in the selected Region / Zone are listable. Leaving this unassigned will flag the territory in dashboard audits.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Coverage Area */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase flex justify-between items-center">
                  <span>Postal PIN Codes (Indian 6-digit Codes) *</span>
                  <button
                    onClick={handleBulkPaste}
                    className="text-[9px] font-black text-[var(--primary)] hover:underline cursor-pointer"
                  >
                    Bulk Import / Paste
                  </button>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={postalInput}
                    onChange={(e) => setPostalInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddPostal())}
                    placeholder="Type Pincode e.g. 400050"
                    maxLength={6}
                    className="flex-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                  />
                  <button
                    onClick={handleAddPostal}
                    className="px-3.5 bg-zinc-150 dark:bg-zinc-800 hover:bg-zinc-200 rounded-lg text-xs font-bold transition-colors cursor-pointer text-black dark:text-zinc-200"
                  >
                    Add PIN
                  </button>
                </div>
                {errors.postalInput && (
                  <p className="text-[9px] font-black text-rose-500">{errors.postalInput}</p>
                )}
                {errors.postalCodes && (
                  <p className="text-[9px] font-black text-rose-500">{errors.postalCodes}</p>
                )}

                {/* PIN tags list container */}
                <div className="mt-2 flex flex-wrap gap-1 p-2 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-850 rounded-lg max-h-24 overflow-y-auto">
                  {formData.postalCodes.length > 0 ? (
                    formData.postalCodes.map((code) => (
                      <span
                        key={code}
                        className="px-2 py-0.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-[10px] font-black text-black dark:text-zinc-200 flex items-center gap-1 shadow-sm"
                      >
                        <span>{code}</span>
                        <button
                          onClick={() => handleRemovePostal(code)}
                          className="hover:text-red-500 cursor-pointer text-[10px]"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-[9px] text-zinc-500 font-bold p-1">No pincodes added.</span>
                  )}
                </div>
              </div>

              {/* Delivery Radius */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  Delivery Radius (km) *
                </label>
                <input
                  type="number"
                  value={formData.deliveryRadiusKm}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryRadiusKm: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                  min={1}
                />
                {errors.deliveryRadiusKm && (
                  <p className="text-[9px] font-black text-rose-500">{errors.deliveryRadiusKm}</p>
                )}
                <span className="text-[8px] text-zinc-500 leading-normal">
                  Defines the default delivery dispatch bounds mapped to stores in this territory.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Additional Notes */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                  Internal Operations Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="confidential remarks, log modifications, or scheduling constraints."
                  className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-zinc-100 outline-none focus:border-[var(--primary)] font-semibold"
                />
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl space-y-1.5 border border-zinc-150 dark:border-zinc-850">
                <h4 className="font-bold text-[9px] text-zinc-450 uppercase">Submission Checklist</h4>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-650 dark:text-zinc-350">
                  <Check size={12} className="text-emerald-500" />
                  <span>Territory Name: "{formData.name || "Untitled"}"</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-650 dark:text-zinc-350">
                  <Check size={12} className="text-emerald-500" />
                  <span>Radius: {formData.deliveryRadiusKm} km</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-650 dark:text-zinc-350">
                  <Check size={12} className="text-emerald-500" />
                  <span>PIN Codes: {formData.postalCodes.length} covered</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 flex justify-between select-none">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-4 py-1.5 bg-zinc-150 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-zinc-100 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Save size={12} />
              <span>Save Draft</span>
            </button>
          </div>

          <div className="flex gap-2">
            {step > 1 && (
              <button
                onClick={handlePrev}
                className="px-4 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-50 transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft size={12} />
                <span>Prev</span>
              </button>
            )}

            {step < 5 ? (
              <button
                onClick={handleNext}
                className="px-4 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <ArrowRight size={12} />
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>{editTerritory ? "Update Territory" : "Create Territory"}</span>
                <Check size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
