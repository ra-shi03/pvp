import React, { useState } from "react";
import { ChevronRight, Download, SlidersHorizontal, Layers, Store, Eye, CheckCircle, XCircle } from "lucide-react";
import StoreRequestApprovalData from "./StoreRequestApprovalData";
import StoreRequestApprovalDetails from "./StoreRequestApprovalDetails";
import BulkActionStore from "./BulkActionStore";

export default function StoreRequestApproval() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);

  const [requests, setRequests] = useState([
    {
      id: "#RQ-2023-001",
      applicant: "Amit Sharma",
      city: "Mumbai",
      investment: "₹50-75L",
      status: "Pending",
    },
    {
      id: "#RQ-2023-002",
      applicant: "Priya Rai",
      city: "Delhi",
      investment: "₹75L+",
      status: "Under Review",
    },
    {
      id: "#RQ-2023-003",
      applicant: "Rohan Das",
      city: "Bangalore",
      investment: "₹25-50L",
      status: "Approved",
    },
    {
      id: "#RQ-2023-004",
      applicant: "Vikram Singh",
      city: "Pune",
      investment: "₹50-75L",
      status: "Pending",
    },
  ]);

  const handleRowClick = (req) => {
    setSelectedRequest(req);
    setIsDetailsOpen(true);
  };

  const handleToggleSelectRequest = (id) => {
    setSelectedRequestIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllRequests = (filteredIds, checked) => {
    if (checked) {
      setSelectedRequestIds((prev) => {
        const newSelected = [...prev];
        filteredIds.forEach((id) => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
        return newSelected;
      });
    } else {
      setSelectedRequestIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    }
  };

  const handleClearSelection = () => {
    setSelectedRequestIds([]);
  };

  const handleApplyBulkAction = (payload) => {
    if (payload.actionType === "update-status") {
      setRequests((prev) =>
        prev.map((req) =>
          payload.requestIds.includes(req.id) ? { ...req, status: payload.status } : req
        )
      );
      // Optional: Clear selection after status update
      setSelectedRequestIds([]);
    } else if (payload.actionType === "delete") {
      setRequests((prev) => prev.filter((req) => !payload.requestIds.includes(req.id)));
      setSelectedRequestIds([]);
    } else if (payload.actionType === "request-docs") {
      console.log("Documents requested:", payload.documents, "for requests:", payload.requestIds);
    } else if (payload.actionType === "assign-reviewer") {
      console.log("Reviewer assigned:", payload.reviewer, "priority:", payload.priority, "for requests:", payload.requestIds);
    }
  };

  // Calculate counts dynamically from state
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const underReviewCount = requests.filter((r) => r.status === "Under Review").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 min-h-screen w-full space-y-4">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-2">
        <div className="space-y-0.5">
          <h1 className="text-lg font-bold text-black dark:text-white leading-tight">
            Store Requests & Approvals
          </h1>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">
            Manage franchise applications, approvals, document verification, and onboarding workflows efficiently
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] transition-all cursor-pointer font-bold text-[11px]">
            <Download size={14} />
            <span>EXPORT REQUESTS</span>
          </button>
          <button
            onClick={() => setIsBulkActionOpen(true)}
            className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-3.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Layers size={14} className="stroke-[3]" />
            <span>BULK ACTIONS {selectedRequestIds.length > 0 && `(${selectedRequestIds.length})`}</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 select-none">
        {/* Pending */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Pending Requests</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{pendingCount}</h3>
              <span className="text-amber-500 font-bold text-[8px]">Action Required</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-100 dark:border-amber-900/30">
            <Store size={14} />
          </div>
        </div>

        {/* Under Review */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Under Review</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{underReviewCount}</h3>
              <span className="text-blue-500 font-bold text-[8px]">In Progress</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-900/30">
            <Eye size={14} />
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Approved</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{approvedCount}</h3>
              <span className="text-emerald-500 font-bold text-[8px]">Ready to Onboard</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-100 dark:border-emerald-900/30">
            <CheckCircle size={14} />
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider truncate">Rejected</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{rejectedCount}</h3>
              <span className="text-rose-500 font-bold text-[8px]">Closed</span>
            </div>
          </div>
          <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0 border border-rose-100 dark:border-rose-900/30">
            <XCircle size={14} />
          </div>
        </div>
      </div>

      {/* Bento Grid - Large Table & Info Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
        {/* Table Container Component */}
        <StoreRequestApprovalData
          onRowClick={handleRowClick}
          requests={requests}
          selectedRequestIds={selectedRequestIds}
          onToggleSelectRequest={handleToggleSelectRequest}
          onToggleSelectAllRequests={handleToggleSelectAllRequests}
        />

        {/* Side Panel / Quick Insights */}
        <div className="flex flex-col gap-3 xl:col-span-1">
          {/* Distribution Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm">
            <h6 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-4">Territory Distribution</h6>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-black dark:text-white">
                  <span>North India</span>
                  <span className="font-bold text-[var(--primary)]">42%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)]" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-black dark:text-white">
                  <span>West India</span>
                  <span className="font-bold text-orange-500">35%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-black dark:text-white">
                  <span>South India</span>
                  <span className="font-bold text-blue-500">23%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Map/Visual Insight */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col flex-1 min-h-[200px]">
            <div className="p-3.5 pb-2">
              <h6 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-0.5">Regional Hotspots</h6>
              <p className="text-[10px] text-black/70 dark:text-white/70 leading-relaxed">Top cities receiving highest application volume</p>
            </div>
            <div className="flex-1 relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden min-h-[140px]">
              <img
                alt="Map distribution"
                className="w-full h-full object-cover grayscale opacity-50 dark:opacity-30"
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative scale-75">
                  <div className="absolute -top-12 -left-8 bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1.5 shadow-lg animate-bounce z-10">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                      <span className="text-[8px] font-bold text-black dark:text-white uppercase tracking-wider">Mumbai Hotspot</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-full animate-ping flex items-center justify-center">
                    <div className="w-3 h-3 bg-[var(--primary)] rounded-full shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StoreRequestApprovalDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        request={selectedRequest}
      />

      <BulkActionStore
        isOpen={isBulkActionOpen}
        onClose={() => setIsBulkActionOpen(false)}
        selectedRequests={requests.filter((r) => selectedRequestIds.includes(r.id))}
        onClearSelection={handleClearSelection}
        onApplyAction={handleApplyBulkAction}
      />
    </div>
  );
}
