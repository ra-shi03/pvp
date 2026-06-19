import React, { useState } from 'react';
import { Download, Upload, Bell, User, Banknote, CheckCircle2, XCircle, Hourglass, Undo2, WalletCards, CreditCard, Landmark, Smartphone, MonitorSmartphone } from 'lucide-react';
import PaymentsData from './PaymentsData';
import RefundModal from './RefundModal';
import PaymentDetails from './PaymentDetails';

export default function PaymentsManagement() {
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isTransactionDrawerOpen, setIsTransactionDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleProcessRefund = (transaction) => {
    setSelectedTransaction(transaction);
    setIsRefundModalOpen(true);
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDrawerOpen(true);
  };

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto w-full space-y-4 min-h-screen bg-zinc-50 dark:bg-zinc-950 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-black dark:text-white">
            Payments Management
          </h2>
          <nav className="hidden md:flex gap-4 mt-1">
            <button className="text-[var(--primary)] border-b-2 border-[var(--primary)] pb-0.5 font-bold text-xs">Overview</button>
            <button className="text-black/50 dark:text-white/50 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-all font-bold text-xs pb-0.5 border-b-2 border-transparent hover:border-[var(--primary)]">Settlements</button>
            <button className="text-black/50 dark:text-white/50 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-all font-bold text-xs pb-0.5 border-b-2 border-transparent hover:border-[var(--primary)]">Reconciliation</button>
          </nav>
        </div>
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <div className="flex gap-1.5 mr-2 border-r border-zinc-200 dark:border-zinc-800 pr-2">
            <button className="px-2.5 py-1 text-[11px] font-bold border border-zinc-300 dark:border-zinc-700 text-black/70 dark:text-white/70 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1">
              <Download size={12} />
              Reports
            </button>
            <button className="px-2.5 py-1 text-[11px] font-bold bg-[var(--primary)] text-white rounded-lg hover:brightness-110 shadow-sm active:scale-95 transition-all flex items-center gap-1">
              <Upload size={12} />
              Export
            </button>
          </div>
          <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black/50 dark:text-white/50 transition-colors">
            <Bell size={14} />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black/50 dark:text-white/50 transition-colors">
            <User size={14} />
          </button>
        </div>
      </header>

      {/* Section 1: KPI Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-black/70 dark:text-white/70 text-[10px] font-bold uppercase tracking-wider">Total Payments</span>
            <span className="text-base font-black text-black dark:text-white">₹4,85,600</span>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1 py-0.2 rounded w-fit">+12%</span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Banknote size={14} className="text-[var(--primary)] p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-7 h-7" />
            <div className="h-1 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[var(--primary)] w-3/4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-black/70 dark:text-white/70 text-[10px] font-bold uppercase tracking-wider">Successful</span>
            <span className="text-base font-black text-black dark:text-white">1,240</span>
            <span className="text-[9px] font-bold text-emerald-600">97.4%</span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <CheckCircle2 size={14} className="text-emerald-500 p-1 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg w-7 h-7" />
            <div className="h-1 w-12 bg-emerald-50 dark:bg-emerald-950/20 rounded-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-emerald-500 w-[97.4%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-black/70 dark:text-white/70 text-[10px] font-bold uppercase tracking-wider">Failed</span>
            <span className="text-base font-black text-black dark:text-white">42</span>
            <span className="text-[9px] font-bold text-rose-500">2.1%</span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <XCircle size={14} className="text-rose-500 p-1 bg-rose-50 dark:bg-rose-950/20 rounded-lg w-7 h-7" />
            <div className="h-1 w-12 bg-rose-50 dark:bg-rose-950/20 rounded-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-rose-500 w-[2.1%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-black/70 dark:text-white/70 text-[10px] font-bold uppercase tracking-wider">Pending</span>
            <span className="text-base font-black text-black dark:text-white">18</span>
            <span className="text-[9px] font-bold text-amber-500">Processing</span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Hourglass size={14} className="text-amber-500 p-1 bg-amber-50 dark:bg-amber-950/20 rounded-lg w-7 h-7" />
            <div className="h-1 w-12 bg-amber-50 dark:bg-amber-950/20 rounded-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-amber-500 w-[5%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-black/70 dark:text-white/70 text-[10px] font-bold uppercase tracking-wider">Refund Amount</span>
            <span className="text-base font-black text-black dark:text-white">₹32,500</span>
            <span className="text-[9px] font-bold text-indigo-500">-4% WoW</span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Undo2 size={14} className="text-indigo-500 p-1 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg w-7 h-7" />
            <div className="h-1 w-12 bg-indigo-50 dark:bg-indigo-950/20 rounded-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-indigo-500 w-[15%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-black/70 dark:text-white/70 text-[10px] font-bold uppercase tracking-wider">Gateway Revenue</span>
            <span className="text-base font-black text-black dark:text-white">₹15,400</span>
            <span className="text-[9px] font-bold text-[var(--primary)]">Fee Share</span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Landmark size={14} className="text-[var(--primary)] p-1 bg-[var(--primary)]/10 rounded-lg w-7 h-7" />
            <div className="h-1 w-12 bg-[var(--primary)]/10 rounded-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[var(--primary)] w-[40%] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Daily Volume Chart Placeholder */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-xs text-black dark:text-white">Daily Payment Volume</h4>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                <span className="text-[10px] text-black/50 dark:text-white/50 font-semibold">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] text-black/50 dark:text-white/50 font-semibold">Success</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-[10px] text-black/50 dark:text-white/50 font-semibold">Failed</span>
              </div>
            </div>
          </div>
          {/* Mock Bar Chart */}
          <div className="h-36 flex items-end gap-2 px-1.5 border-b border-l border-zinc-200 dark:border-zinc-800">
            <div className="flex-1 h-[60%] bg-zinc-100 dark:bg-zinc-800 rounded-t relative overflow-hidden group hover:opacity-90 cursor-pointer transition-opacity">
              <div className="absolute bottom-0 left-0 w-full h-[70%] bg-[var(--primary)]/20"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)]"></div>
            </div>
            <div className="flex-1 h-[45%] bg-zinc-100 dark:bg-zinc-800 rounded-t relative overflow-hidden group hover:opacity-90 cursor-pointer transition-opacity">
              <div className="absolute bottom-0 left-0 w-full h-[65%] bg-[var(--primary)]/20"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)]"></div>
            </div>
            <div className="flex-1 h-[80%] bg-zinc-100 dark:bg-zinc-800 rounded-t relative overflow-hidden group hover:opacity-90 cursor-pointer transition-opacity">
              <div className="absolute bottom-0 left-0 w-full h-[85%] bg-[var(--primary)]/20"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)]"></div>
            </div>
            <div className="flex-1 h-[65%] bg-zinc-100 dark:bg-zinc-800 rounded-t relative overflow-hidden group hover:opacity-90 cursor-pointer transition-opacity">
              <div className="absolute bottom-0 left-0 w-full h-[75%] bg-[var(--primary)]/20"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)]"></div>
            </div>
            <div className="flex-1 h-[90%] bg-zinc-100 dark:bg-zinc-800 rounded-t relative overflow-hidden group hover:opacity-90 cursor-pointer transition-opacity">
              <div className="absolute bottom-0 left-0 w-full h-[95%] bg-[var(--primary)]/20"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)]"></div>
            </div>
            <div className="flex-1 h-[55%] bg-zinc-100 dark:bg-zinc-800 rounded-t relative overflow-hidden group hover:opacity-90 cursor-pointer transition-opacity">
              <div className="absolute bottom-0 left-0 w-full h-[60%] bg-[var(--primary)]/20"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)]"></div>
            </div>
            <div className="flex-1 h-[75%] bg-zinc-100 dark:bg-zinc-800 rounded-t relative overflow-hidden group hover:opacity-90 cursor-pointer transition-opacity">
              <div className="absolute bottom-0 left-0 w-full h-[80%] bg-[var(--primary)]/20"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)]"></div>
            </div>
          </div>
          <div className="flex justify-between mt-1.5 text-[9px] font-bold text-black/50 dark:text-white/50 uppercase px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Payment Method Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <h4 className="font-bold text-xs text-black dark:text-white mb-3">Payment Methods</h4>
          <div className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer">
            <div className="absolute inset-0 rounded-full border-[7px] border-[var(--primary)] border-t-zinc-600 border-r-amber-500 border-l-zinc-200 dark:border-l-zinc-800 rotate-45 group-hover:scale-105 transition-transform"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-black text-black dark:text-white">1.2k</span>
              <span className="text-[8px] text-black/50 dark:text-white/50 font-bold uppercase tracking-wider">Orders</span>
            </div>
          </div>
          <div className="space-y-2.5 mt-auto">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div><span className="text-black/70 dark:text-white/70 font-semibold">UPI (GPay/PhonePe)</span></div>
              <span className="font-bold text-black dark:text-white">42%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-zinc-600"></div><span className="text-black/70 dark:text-white/70 font-semibold">Credit Card</span></div>
              <span className="font-bold text-black dark:text-white">28%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-black/70 dark:text-white/70 font-semibold">Debit Card</span></div>
              <span className="font-bold text-black dark:text-white">15%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800"></div><span className="text-black/70 dark:text-white/70 font-semibold">Net Banking</span></div>
              <span className="font-bold text-black dark:text-white">15%</span>
            </div>
          </div>
        </div>

        {/* Gateway Performance */}
        <div className="lg:col-span-12 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h4 className="font-bold text-xs text-black dark:text-white mb-3">Gateway Performance</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gateway 1 */}
            <div className="space-y-2.5 group">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <WalletCards className="text-[var(--primary)]" size={14} />
                </div>
                <div>
                  <p className="font-bold text-xs text-black dark:text-white">Razorpay</p>
                  <p className="text-[9px] text-emerald-600 font-bold">99.2% Success</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-[var(--primary)] w-[75%]"></div>
                <div className="h-full bg-[var(--primary)]/30 w-[24.2%]"></div>
                <div className="h-full bg-rose-500 w-[0.8%]"></div>
              </div>
              <p className="text-[9px] text-black/50 dark:text-white/50 font-bold tracking-wider uppercase">Revenue: <span className="text-black dark:text-white">₹3,42,000</span></p>
            </div>

            {/* Gateway 2 */}
            <div className="space-y-2.5 group">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <CreditCard className="text-[var(--primary)]" size={14} />
                </div>
                <div>
                  <p className="font-bold text-xs text-black dark:text-white">Stripe</p>
                  <p className="text-[9px] text-emerald-600 font-bold">98.5% Success</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-[var(--primary)] w-[15%]"></div>
                <div className="h-full bg-[var(--primary)]/30 w-[83.5%]"></div>
                <div className="h-full bg-rose-500 w-[1.5%]"></div>
              </div>
              <p className="text-[9px] text-black/50 dark:text-white/50 font-bold tracking-wider uppercase">Revenue: <span className="text-black dark:text-white">₹72,800</span></p>
            </div>

            {/* Gateway 3 */}
            <div className="space-y-2.5 group">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <Smartphone className="text-[var(--primary)]" size={14} />
                </div>
                <div>
                  <p className="font-bold text-xs text-black dark:text-white">PhonePe</p>
                  <p className="text-[9px] text-rose-500 font-bold">91.2% Success</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-[var(--primary)] w-[8%]"></div>
                <div className="h-full bg-[var(--primary)]/30 w-[83.2%]"></div>
                <div className="h-full bg-rose-500 w-[8.8%]"></div>
              </div>
              <p className="text-[9px] font-bold text-rose-500 animate-pulse tracking-wider uppercase">CRITICAL: DOWN IN SOUTH</p>
            </div>

            {/* Gateway 4 */}
            <div className="space-y-2.5 group">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <MonitorSmartphone className="text-[var(--primary)]" size={14} />
                </div>
                <div>
                  <p className="font-bold text-xs text-black dark:text-white">Paytm</p>
                  <p className="text-[9px] text-emerald-600 font-bold">97.8% Success</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-[var(--primary)] w-[2%]"></div>
                <div className="h-full bg-[var(--primary)]/30 w-[95.8%]"></div>
                <div className="h-full bg-rose-500 w-[2.2%]"></div>
              </div>
              <p className="text-[9px] text-black/50 dark:text-white/50 font-bold tracking-wider uppercase">Revenue: <span className="text-black dark:text-white">₹10,200</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 & 4: Table and Filter component */}
      <PaymentsData
        onProcessRefund={handleProcessRefund}
        onViewTransaction={handleViewTransaction}
      />

      <RefundModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        transaction={selectedTransaction}
      />

      <PaymentDetails
        isOpen={isTransactionDrawerOpen}
        onClose={() => setIsTransactionDrawerOpen(false)}
        transaction={selectedTransaction}
      />

    </div>
  );
}
