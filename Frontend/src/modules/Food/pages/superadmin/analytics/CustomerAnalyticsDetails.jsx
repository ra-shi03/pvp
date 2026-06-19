import React, { useState } from 'react';
import { 
  ArrowLeft, Send, TrendingUp, Wallet, Calendar, Gem, 
  ShoppingBag, Star, MessageSquare, MapPin, ChevronRight, Award
} from 'lucide-react';

export default function CustomerAnalyticsDetails({ isOpen, onClose, customer }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const custName = customer?.name || 'Rajesh Kumar';
  const custTier = customer?.tier || 'DIAMOND';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center lg:justify-end animate-fade-in overflow-hidden">
      <div className="w-full max-w-4xl h-full bg-zinc-50 dark:bg-zinc-950 flex flex-col shadow-2xl border-x border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300">
        
        {/* Header */}
        <header className="shrink-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center px-4 h-14">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="flex items-center justify-center p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-400"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&fm=webp" 
                  alt={custName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h1 className="text-sm font-black text-zinc-900 dark:text-zinc-50 leading-tight">{custName}</h1>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${custTier === 'DIAMOND' ? 'text-[var(--primary)]' : 'text-amber-500'}`}>{custTier} Member</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:block px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors rounded-lg text-xs font-bold shadow-sm">
              Edit Profile
            </button>
            <button className="px-3 py-1.5 bg-[var(--primary)] text-white hover:opacity-90 transition-opacity rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Send size={12} />
              <span className="hidden sm:inline">Message</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4">
          {/* Summary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Orders</p>
                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">42</h2>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 text-xs font-bold">
                <TrendingUp size={14} />
                <span>+12% vs last year</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Spend</p>
                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">₹42,500</h2>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                <Wallet size={14} />
                <span>Avg: ₹1,011 / order</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Est. CLV</p>
                <h2 className="text-xl font-black text-[var(--primary)]">₹1,011</h2>
              </div>
              <div className="mt-2.5">
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-[var(--primary)] h-full w-[75%] rounded-full"></div>
                </div>
                <p className="text-[9px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">High Loyalty Index</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Member Since</p>
                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50">Jan '23</h2>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                <Calendar size={14} />
                <span>14 months active</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 flex gap-6 mb-4 sticky top-0 bg-zinc-50 dark:bg-zinc-950 z-10">
            {['overview', 'orders', 'loyalty'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 font-bold text-xs uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'border-[var(--primary)] text-[var(--primary)]' 
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
                {/* Personal Info & Recent Activity */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                      <div>
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-0.5">Email Address</label>
                        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">rajesh.kumar@email.com</p>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-0.5">Phone Number</label>
                        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">+91 98765 43210</p>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-0.5">Preferred Language</label>
                        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">English, Hindi</p>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-0.5">Loyalty Tier</label>
                        <div className="flex items-center gap-1.5">
                          <Gem size={14} className="text-[var(--primary)]" />
                          <p className="text-xs font-bold text-[var(--primary)]">Diamond</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Recent Activity</h3>
                      <button className="text-[var(--primary)] font-bold text-[10px] uppercase tracking-wider hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                      <div className="p-3.5 flex gap-3.5 items-start hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                          <ShoppingBag size={15} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Order Delivered #49201</p>
                          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">2 Medium Margherita Pizzas + Garlic Bread delivered to primary address.</p>
                          <p className="text-[9px] font-bold text-zinc-400 mt-1.5 uppercase tracking-wider">Today, 2:15 PM</p>
                        </div>
                      </div>
                      <div className="p-3.5 flex gap-3.5 items-start hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                          <Star size={15} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Earned 250 Loyalty Points</p>
                          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Bonus points awarded for 'Friday Feast' promotion completion.</p>
                          <p className="text-[9px] font-bold text-zinc-400 mt-1.5 uppercase tracking-wider">Yesterday, 8:45 PM</p>
                        </div>
                      </div>
                      <div className="p-3.5 flex gap-3.5 items-start hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
                          <MessageSquare size={15} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Feedback Received</p>
                          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Rated 5 stars: "Always consistent quality and fast delivery."</p>
                          <p className="text-[9px] font-bold text-zinc-400 mt-1.5 uppercase tracking-wider">3 Days Ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map & Insights */}
                <div className="space-y-4">
                  <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                    <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">Primary Delivery Address</h3>
                      <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-snug">Apartment 4B, Skyview Residency, Sector 45, Gurgaon</p>
                    </div>
                    <div className="h-36 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&fm=webp" 
                        alt="Map" 
                        className="w-full h-full object-cover grayscale opacity-80" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                          <MapPin size={16} />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
                      <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">Reliability: <span className="text-emerald-500">98%</span></span>
                      <button className="text-[var(--primary)] font-bold text-[10px] uppercase tracking-wider">Change</button>
                    </div>
                  </div>

                  <div className="bg-zinc-955 dark:bg-black p-4 rounded-xl border border-zinc-800 text-white relative overflow-hidden shadow-lg">
                    <div className="relative z-10">
                      <h4 className="text-[9px] font-bold uppercase tracking-wider mb-2 text-[var(--primary)]">System Insight</h4>
                      <p className="text-xs font-medium leading-relaxed text-zinc-300">
                        Rajesh has ordered <strong className="text-white">8 times</strong> in the last 30 days. He is currently in the top 2% of high-value customers for the Gurgaon Central hub.
                      </p>
                      <button className="mt-3.5 text-[var(--primary)] font-bold text-[10px] uppercase tracking-wider hover:underline">
                        View Prediction Model
                      </button>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--primary)] blur-[60px] opacity-20 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            )}
                      {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                        <tr>
                          <th className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Order #</th>
                          <th className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Date</th>
                          <th className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Store</th>
                          <th className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Amount</th>
                          <th className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                          <th className="px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                        {[
                          { id: '#49201', date: 'Mar 12, 2024', store: 'Gurgaon Central', amount: '₹1,240' },
                          { id: '#48110', date: 'Mar 08, 2024', store: 'Gurgaon Central', amount: '₹980' },
                          { id: '#47285', date: 'Mar 01, 2024', store: 'Gurgaon Central', amount: '₹1,560' },
                        ].map((order, i) => (
                          <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors cursor-pointer text-xs">
                            <td className="px-3 py-2 font-mono font-bold text-[var(--primary)]">{order.id}</td>
                            <td className="px-3 py-2 font-medium text-zinc-700 dark:text-zinc-300">{order.date}</td>
                            <td className="px-3 py-2 font-medium text-zinc-700 dark:text-zinc-300">{order.store}</td>
                            <td className="px-3 py-2 font-black text-zinc-900 dark:text-zinc-100">{order.amount}</td>
                            <td className="px-3 py-2">
                              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-md text-[9px] font-bold tracking-wider">DELIVERED</span>
                            </td>
                            <td className="px-3 py-2 text-right text-zinc-400">
                              <ChevronRight size={14} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}              {/* LOYALTY TAB */}
            {activeTab === 'loyalty' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                {/* Loyalty Points Balance */}
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-sm">
                  <div className="w-12 h-12 rounded-full border-2 border-[var(--primary)]/20 flex items-center justify-center mb-3">
                    <Award className="text-[var(--primary)]" size={24} />
                  </div>
                  <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Points Balance</h3>
                  <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">1,250</div>
                  <p className="text-xs font-medium text-zinc-500 mt-1">≈ ₹125 value</p>
                  <button className="mt-4 w-full py-2 bg-[var(--primary)] text-white rounded-lg font-bold text-xs shadow-md hover:opacity-90 transition-opacity">
                    Redeem Points
                  </button>
                </div>

                {/* Tier Progress */}
                <div className="md:col-span-2 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">Tier Progress</h3>
                      <p className="text-xs font-medium text-zinc-500">Current Level: <span className="font-bold text-[var(--primary)]">Diamond</span></p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-zinc-900 dark:text-zinc-50 block">75%</span>
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">To Black Tier</p>
                    </div>
                  </div>
                  <div className="relative h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-6">
                    <div className="absolute left-0 top-0 h-full bg-[var(--primary)] rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">Free Delivery</p>
                      <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-wider">Current Perk</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">Monthly Freebie</p>
                      <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-wider">Current Perk</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/20 text-center">
                      <p className="text-xs font-bold text-[var(--primary)] mb-0.5">VIP Events</p>
                      <p className="text-[8px] font-bold text-[var(--primary)]/70 uppercase tracking-wider">Black Reward</p>
                    </div>
                  </div>
                </div>

                {/* Points History */}
                <div className="md:col-span-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                  <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Points History</h3>
                  </div>
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-xs">
                    <div className="p-3.5 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-zinc-100">Bonus: Friday Feast Promo</p>
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Mar 12, 2024</p>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-500 font-black">+250 pts</span>
                    </div>
                    <div className="p-3.5 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-zinc-100">Order #49201 Earnings</p>
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Mar 12, 2024</p>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-500 font-black">+62 pts</span>
                    </div>
                    <div className="p-3.5 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-zinc-100">Reward Redemption: Extra Large Pizza</p>
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Feb 28, 2024</p>
                      </div>
                      <span className="text-rose-600 dark:text-rose-500 font-black">-800 pts</span>
                    </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
