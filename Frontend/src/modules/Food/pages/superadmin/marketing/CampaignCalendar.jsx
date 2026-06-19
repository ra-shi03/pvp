import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, TrendingUp, CheckCircle, Download, RefreshCw } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function CampaignCalendar() {
  const [activeView, setActiveView] = useState('Month');
  const [showToast, setShowToast] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState('New campaign successfully scheduled');

  const handleAddCampaign = () => {
    setToastMessage('New campaign successfully scheduled');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF();
        
        // Brand Primary Color Header: #7e3866
        doc.setFillColor(126, 56, 102);
        doc.rect(0, 0, 210, 15, "F");
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text("PizzaCorp Admin Portal", 15, 10);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(126, 56, 102);
        doc.text("Campaign Calendar", 15, 32);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(120, 120, 120);
        doc.text("Report Month: October 2024", 15, 42);
        doc.text("Generated: " + new Date().toLocaleDateString(), 15, 47);
        
        doc.setDrawColor(230, 230, 230);
        doc.line(15, 52, 195, 52);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text("October 2024 Campaigns List", 15, 62);
        
        const items = [
          { name: "Pepperoni BOGO Weekend", code: "BOGOFRIDAY", type: "BOGO", date: "Oct 4 - Oct 6", reach: "12,450" },
          { name: "Autumn Discount 15%", code: "LATE20", type: "Discount", date: "Oct 8 - Oct 12", reach: "6,000" },
          { name: "Founder's Day Festival", code: "FOUNDERS", type: "Festival", date: "Oct 14 - Oct 17", reach: "15,400" }
        ];
        
        let y = 75;
        items.forEach((item, index) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(126, 56, 102);
          doc.text(`${index + 1}. ${item.name}`, 15, y);
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          doc.text(`Code: ${item.code}   |   Type: ${item.type}   |   Dates: ${item.date}   |   Reach: ${item.reach} users`, 20, y + 6);
          
          y += 18;
        });
        
        doc.save("campaign_calendar_october_2024.pdf");
        
        setToastMessage("Calendar PDF downloaded successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (err) {
        console.error("PDF generation failed:", err);
      } finally {
        setIsDownloading(false);
      }
    }, 1200);
  };

  const handleSyncCalendar = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setToastMessage("Campaigns successfully synced to Google Calendar!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-[500px] animate-in fade-in duration-500 relative">
      
      {/* Calendar View Toolbar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-t-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
            {['Month', 'Week', 'Timeline'].map((view) => (
              <button 
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-2.5 py-1 text-xs rounded transition-all ${
                  activeView === view 
                    ? 'bg-white dark:bg-zinc-700 text-black dark:text-white font-bold shadow-sm' 
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-black/50 dark:text-white/50"><ChevronLeft size={14} /></button>
            <span className="text-xs font-bold px-1 text-black dark:text-white">October 2024</span>
            <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-black/50 dark:text-white/50"><ChevronRight size={14} /></button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
            <span className="text-[9px] font-semibold text-black/70 dark:text-white/70">BOGO</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span className="text-[9px] font-semibold text-black/70 dark:text-white/70">Discount</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[9px] font-semibold text-black/70 dark:text-white/70">Festival</span>
          </div>
          <button 
            onClick={handleAddCampaign}
            className="flex items-center gap-1.5 bg-[var(--primary)] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[var(--primary)]/90 active:scale-95 transition-all shadow-sm"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Campaign</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid Content */}
      <div className="flex-1 bg-white dark:bg-zinc-900 border-x border-b border-zinc-200 dark:border-zinc-800 rounded-b-xl overflow-x-auto scrollbar-none shadow-sm relative">
        <div className="min-w-[800px] h-full flex flex-col">
          {/* Days Header */}
          <div className="grid grid-cols-7 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} className="py-2 text-center text-[9px] font-bold text-black/50 dark:text-white/50 tracking-wider">{day}</div>
            ))}
          </div>
          
          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 border-l border-zinc-200 dark:border-zinc-800 flex-1">
            {/* Week 1: Partially prev month */}
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 opacity-40 bg-zinc-50 dark:bg-zinc-800/30 text-[10px] text-black/50 font-medium">29</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 opacity-40 bg-zinc-50 dark:bg-zinc-800/30 text-[10px] text-black/50 font-medium">30</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">1</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">2</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">3</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70 relative group z-10">
              4
              <div className="mt-1 relative">
                <div className="h-5 rounded px-1.5 mb-0.5 flex items-center cursor-pointer transition-transform hover:scale-[1.02] bg-[var(--primary)] text-white text-[9px] font-bold truncate shadow-sm">
                  Pepperoni BOGO Weekend
                </div>
                {/* Popover Example */}
                <div className="hidden group-hover:block absolute z-50 w-52 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 shadow-xl -mt-20 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:bottom-[-6px] before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-white dark:before:bg-zinc-800 before:rotate-45 before:border-b before:border-r before:border-zinc-200 dark:before:border-zinc-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[var(--primary)] truncate">BOGO Promo</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold rounded-full">Live</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-black/60 dark:text-white/60 font-semibold">Redemptions</span>
                      <span className="text-[10px] font-bold text-black dark:text-white">1,240</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-black/60 dark:text-white/60 font-semibold">Conv. Rate</span>
                      <span className="text-[10px] font-bold text-black dark:text-white">12.4%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--primary)] w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">5</div>
            
            {/* Week 2 */}
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">6</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">7</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70 relative group">
              8
              <div className="mt-1">
                <div className="h-5 rounded px-1.5 mb-0.5 flex items-center cursor-pointer transition-transform hover:scale-[1.02] bg-blue-500 text-white text-[9px] font-bold truncate shadow-sm">
                  Autumn Discount 15%
                </div>
              </div>
            </div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">9</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">10</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">11</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">12</div>
            
            {/* Week 3 */}
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">13</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70 relative bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10">
              14
              <div className="mt-1">
                <div className="h-5 rounded px-1.5 mb-0.5 flex items-center cursor-pointer transition-transform hover:scale-[1.02] bg-amber-500 text-white text-[9px] font-bold truncate shadow-sm">
                  Founder's Day Festival
                </div>
              </div>
            </div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70 bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10">15</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70 bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10">16</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70 bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10">17</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">18</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">19</div>
            
            {/* Week 4 */}
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">20</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">21</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">22</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">23</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">24</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">25</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">26</div>
            
            {/* Week 5 */}
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">27</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">28</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">29</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">30</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 text-[10px] font-bold text-black/70 dark:text-white/70">31</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 opacity-40 bg-zinc-50 dark:bg-zinc-800/30 text-[10px] text-black/50 font-medium">1</div>
            <div className="min-h-[80px] border-r border-b border-zinc-200 dark:border-zinc-800 p-1.5 opacity-40 bg-zinc-50 dark:bg-zinc-800/30 text-[10px] text-black/50 font-medium">2</div>
          </div>
        </div>
      </div>

      {/* Right Side Quick Insights (Floating on Desktop) */}
      <div className="fixed right-8 bottom-8 w-64 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-3.5 space-y-4 hidden xl:block z-40 animate-in slide-in-from-right-8 duration-500">
        <h3 className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp size={14} className="text-[var(--primary)]" />
          MONTHLY FORECAST
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-black/60 dark:text-white/60 font-semibold">Active Campaigns</p>
              <p className="text-base font-black text-black dark:text-white">4</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-black/60 dark:text-white/60 font-semibold">Est. Reach</p>
              <p className="text-base font-black text-[var(--primary)]">850k</p>
            </div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <p className="text-[9px] font-bold text-black dark:text-white mb-1 uppercase tracking-wider">Top Performing</p>
            <p className="text-xs font-bold text-black dark:text-white truncate">Pepperoni BOGO Weekend</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">+18.2%</span>
              <span className="text-[9px] text-black/50 dark:text-white/50 font-bold uppercase tracking-wider">vs last month</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity shadow-sm flex justify-center items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <RefreshCw size={12} className="animate-spin" /> Downloading...
                </>
              ) : (
                <>
                  <Download size={12} /> Download Calendar PDF
                </>
              )}
            </button>
            <button 
              onClick={handleSyncCalendar}
              disabled={isSyncing}
              className="w-full py-1.5 border border-zinc-200 dark:border-zinc-700 text-black/70 dark:text-white/70 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm flex justify-center items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? (
                <>
                  <RefreshCw size={12} className="animate-spin" /> Syncing...
                </>
              ) : (
                <>
                  <RefreshCw size={12} /> Sync to Google Calendar
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Feedback Overlay */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-full flex items-center gap-3 shadow-xl transition-opacity duration-300 pointer-events-none z-50 ${showToast ? 'opacity-100' : 'opacity-0'}`}>
        <CheckCircle size={20} className="text-emerald-400 dark:text-emerald-600" />
        <span className="text-sm font-bold">{toastMessage}</span>
      </div>
    </div>
  );
}
