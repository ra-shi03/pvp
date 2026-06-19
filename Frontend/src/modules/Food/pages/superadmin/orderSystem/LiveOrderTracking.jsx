import React, { useState, useEffect } from 'react';
import { 
  X, Pizza, Home, Bike, LocateFixed, Filter, List, 
  BadgeCheck, Route, ShoppingBag 
} from 'lucide-react';

export default function LiveOrderTracking({ isOpen, onClose, order }) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 10);
      setProgress(65);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsRendered(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setProgress(p => (p < 95 ? p + 0.5 : p));
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isRendered) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .marker-pulse::after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: 50%;
            z-index: -1;
            animation: map-marker-pulse 2s infinite;
            opacity: 0.5;
        }
        @keyframes map-marker-pulse {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(3); opacity: 0; }
        }
      `}} />

      {/* Drawer Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Full-screen map modal (or slide-up drawer for mobile, but let's make it a large centered modal or full-screen drawer like the HTML suggests) */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[450px] lg:w-[480px] bg-zinc-50 dark:bg-zinc-955 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Top App Bar */}
        <header className="bg-white dark:bg-zinc-900 sticky top-0 z-50 shadow-sm border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center px-3.5 h-12 shrink-0 w-full">
          <div className="flex items-center gap-2.5">
            <button 
              className="text-[var(--primary)] hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-full transition-colors"
              onClick={onClose}
            >
              <X size={18} />
            </button>
            <Pizza size={18} className="text-[var(--primary)]" />
            <h1 className="text-sm font-bold text-[var(--primary)]">Papa Veg Pizza</h1>
          </div>
          <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
            <img 
              alt="Admin User" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfr0Fsxr_UJ8bjwb1I1SJjrsY18ufs70s_Mim7GFh_EcAYSZo0PW52KpErBOWSZpPqlzwfQxyPbWajtk48fKLgoNoaXaAPL42gGnatTls_SBdM6rgDUCDNNqQH9-CHlosYszA34bsifZIEcRwv8Jkjy5FNbcxfcRbD_huwhwyryPSzLHJJHjFFq30SoKNJ6cTBAkuR_tpHMobKPJAT47zKvOioIyVDsBM0dZjF6H1p0Po5n2DexlAvnEI3MNj4UbxK-XOImwuoEOY"
            />
          </div>
        </header>

        {/* Main Map Canvas */}
        <main className="relative flex-1 w-full overflow-hidden">
          {/* Background Map Image */}
          <div className="absolute inset-0 z-0">
            <img 
              alt="Map" 
              className="w-full h-full object-cover grayscale-[20%] opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEwTico7m0MzddrE7cfV_zMnQP9izJST4qZ788sZ51olSnT6KUO8GS0j3dV7yVRaLRShz5LubJEPudvLwMSd_KJRc0W3a4AGLSLRagHO3rJmVDfKSKSxc6VT8tk6n_hIHq_yiLbCvkKqBosF-F76cxpj19CONZg7LD5IhfqjgThuVIAHBrg9FzscWQH7HVb_EDUKVdcViPWM-1LJRIaP3pHXjHaNcHhdK6cX0CmpX5TEarkVKAJXLUHpfNnjDC8X7e80KSRE5DkR8"
            />
          </div>

          {/* Custom Map Markers Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Papa Veg Store Marker */}
            <div className="absolute top-[30%] left-[25%] pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
              <div className="flex flex-col items-center">
                <div className="bg-[var(--primary)] text-white p-1.5 rounded-full shadow-lg border border-white">
                  <Pizza size={14} />
                </div>
                <span className="mt-0.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-55 px-1.5 py-0.5 rounded text-[9px] font-bold shadow-sm border border-zinc-200 dark:border-zinc-700 uppercase tracking-wider">Downtown Store</span>
              </div>
            </div>

            {/* Customer Location Marker */}
            <div className="absolute top-[65%] right-[20%] pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg border border-white">
                  <Home size={14} />
                </div>
                <span className="mt-0.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-55 px-1.5 py-0.5 rounded text-[9px] font-bold shadow-sm border border-zinc-200 dark:border-zinc-700 uppercase tracking-wider">Delivery Point</span>
              </div>
            </div>

            {/* Active Rider Marker */}
            <div className="absolute top-[52%] left-[48%] pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
              <div className="flex flex-col items-center">
                <div className="bg-emerald-600 text-white p-1.5 rounded-full shadow-lg border border-white marker-pulse relative">
                  <Bike size={14} />
                </div>
                <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded-lg text-[9px] font-bold shadow-md flex items-center gap-1 border border-emerald-200 dark:border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {order?.riderId || 'RD-9921'}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons Cluster */}
          <div className="absolute right-3.5 top-3.5 z-20 flex flex-col gap-2.5">
            <button className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 shadow-md flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 active:scale-95">
              <LocateFixed size={16} />
            </button>
            <button className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 shadow-md flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 active:scale-95">
              <Filter size={16} />
            </button>
            <button className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 shadow-md flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 active:scale-95">
              <List size={16} />
            </button>
          </div>

          {/* Active Delivery Card (Bottom Sheet Style) */}
          <div className="absolute bottom-4 left-3.5 right-3.5 z-30">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {/* Progress Bar */}
              <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
              </div>
              
              <div className="p-3.5">
                <div className="flex justify-between items-start mb-3.5">
                  <div className="flex gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center overflow-hidden border border-emerald-200 dark:border-emerald-800/30 shrink-0">
                      <img 
                        alt="Rider Portrait" 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBForZ4gm9iijEz9_1p7hmm_uPIn2effOwpV0YTqJAIPmvpwh6JIiM1Po0Ig_RQmp7E5a3EOtIsv4oD4JAyh9rZVVORCNFdOnA67wQCXygWAATMyF-fG-a0ljBKlOEu-4VVd9aZxmURdqT3xEh_ZpN2FDr2AZfLoWtL-8pRBveCOKqjgerXMWFFHwPskY8EfWpvvLUSB8-C79BgOMuqZz4QNpREf87_UONkoZG2tlJvBls2F2Fm57RBn0XIkvyZPH2_9fsEQdOSIqY"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Rider #{order?.riderId || 'RD-9921'}</h3>
                      <p className="text-[10px] text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                        <BadgeCheck size={12} className="text-emerald-600 dark:text-emerald-500" />
                        On the way to customer
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-500">{order?.eta?.split(' ')[0] || '8'} <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">mins</span></span>
                    <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">Estimated Time</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3.5 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-lg">
                      <Route size={14} className="text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">Distance</p>
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{order?.distance || '1.4 km'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-lg">
                      <ShoppingBag size={14} className="text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">Order Status</p>
                      <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-bold border border-emerald-200 dark:border-emerald-800/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        OUT FOR DELIVERY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
