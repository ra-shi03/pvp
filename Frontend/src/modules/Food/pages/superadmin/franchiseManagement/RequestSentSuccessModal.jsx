import React from "react";
import { Check, ClipboardList, TrendingUp, LayoutDashboard } from "lucide-react";

export default function RequestSentSuccessModal({ isOpen, onClose, onReturnDashboard, request, requestedDocs = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/60 z-[60] backdrop-blur-sm flex items-center justify-center p-4" id="success-overlay">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-xl border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-2xl flex flex-col items-center">
        
        {/* Success State Illustration Section */}
        <div className="text-center py-4 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,175,80,0.15)]">
            <Check size={32} className="text-emerald-600 dark:text-emerald-400 stroke-[3]" />
          </div>
          <h1 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">Document Request Sent</h1>
          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-6">
            A notification has been sent to <span className="font-semibold text-zinc-900 dark:text-zinc-100">{request?.applicant || "Amit Sharma"}</span> requesting: <span className="text-[var(--primary)] italic font-medium">{requestedDocs.length > 0 ? requestedDocs.join(", ") : "GST Registration, Bank Statement"}</span>. Due date: <span className="font-semibold text-zinc-900 dark:text-zinc-100">Nov 15, 2023</span>.
          </p>
        </div>

        {/* Next Steps Bento-style Cards */}
        <div className="grid grid-cols-1 gap-3.5 w-full mb-6 max-w-md">
          {/* Action Card 1 */}
          <div 
            onClick={onClose}
            className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors shrink-0">
                <ClipboardList size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">Return to Requests</h3>
                <p className="text-xs text-zinc-500">Manage other pending document requests for potential franchisees.</p>
              </div>
            </div>
          </div>

          {/* Action Card 2 */}
          <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 cursor-pointer">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors shrink-0">
                <TrendingUp size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">View Application Timeline</h3>
                <p className="text-xs text-zinc-500">Check {request?.applicant?.split(" ")[0] || "Amit"}'s overall application progress and pending milestones.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <div className="w-full flex justify-center mt-0 mb-0">
          <button 
            onClick={onReturnDashboard}
            className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            Return to Dashboard
            <LayoutDashboard size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
