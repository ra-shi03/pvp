import React, { useState, useEffect } from "react";
import { Search, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function StoreRequestApprovalData({
  onRowClick,
  requests = [],
  selectedRequestIds = [],
  onToggleSelectRequest,
  onToggleSelectAllRequests,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const defaultRequests = [
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
  ];

  const activeRequests = requests && requests.length > 0 ? requests : defaultRequests;

  const filteredRequests = activeRequests.filter(req =>
    req.applicant.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    req.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    req.id.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const isAllSelected = filteredRequests.length > 0 && filteredRequests.every(req => selectedRequestIds.includes(req.id));

  return (
    <div className="xl:col-span-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="p-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h5 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider">Recent Store Requests</h5>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black dark:text-white" size={14} />
          <input
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:border-[var(--primary)] focus:ring-0 outline-none transition-all"
            placeholder="Search applicant or city..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider w-10 text-center">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-[var(--primary)] focus:ring-0 cursor-pointer"
                  checked={isAllSelected}
                  onChange={(e) => onToggleSelectAllRequests && onToggleSelectAllRequests(filteredRequests.map(r => r.id), e.target.checked)}
                />
              </th>
              <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Request ID</th>
              <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Applicant Name</th>
              <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">City</th>
              <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Investment</th>
              <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">Status</th>
              <th className="px-3 py-2 text-[10px] font-bold text-black dark:text-white uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredRequests.map((req, idx) => {
              const isSelected = selectedRequestIds.includes(req.id);
              return (
                <tr
                  key={idx}
                  className={`hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10 transition-colors group cursor-pointer ${
                    isSelected ? "bg-zinc-50/85 dark:bg-zinc-900/50" : ""
                  }`}
                  onClick={() => onRowClick && onRowClick(req)}
                >
                  <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-[var(--primary)] focus:ring-0 cursor-pointer"
                      checked={isSelected}
                      onChange={() => onToggleSelectRequest && onToggleSelectRequest(req.id)}
                    />
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-[var(--primary)] font-bold">{req.id}</td>
                  <td className="px-3 py-2 text-xs font-bold text-black dark:text-white">{req.applicant}</td>
                  <td className="px-3 py-2 text-xs font-semibold text-black dark:text-white">{req.city}</td>
                  <td className="px-3 py-2 text-xs font-semibold text-black dark:text-white">{req.investment}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 text-[9px] rounded uppercase font-bold
                      ${req.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                        req.status === 'Under Review' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                          'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-0.5">
                      <button
                        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded text-black/60 dark:text-white/60 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        title="Review"
                        onClick={() => onRowClick && onRowClick(req)}
                      >
                        <Eye size={14} />
                      </button>
                      <button className="p-1 hover:bg-[var(--primary)]/10 rounded text-[var(--primary)] transition-colors" title="Approve">
                        <CheckCircle size={14} />
                      </button>
                      <button className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-rose-500 transition-colors" title="Reject">
                        <XCircle size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="7" className="px-3 py-6 text-center text-black/50 dark:text-white/50 text-xs font-semibold">
                  No requests found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
        <p className="text-[11px] font-medium text-black/70 dark:text-white/70">Showing 1 to {filteredRequests.length} of {activeRequests.length} entries</p>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors" disabled>
            <ChevronLeft size={12} />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-[var(--primary)] text-white font-bold text-[10px] shadow-sm">1</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-white transition-colors text-[10px]">2</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-white transition-colors text-[10px]">3</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
