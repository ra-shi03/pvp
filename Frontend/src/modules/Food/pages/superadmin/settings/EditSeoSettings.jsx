import React, { useState } from 'react';
import { FileEdit, X, Globe, Bot, Share2, UploadCloud, AtSign, ChevronDown, Save } from 'lucide-react';

export default function EditSeoSettings({ isOpen, onClose }) {
  const [indexing, setIndexing] = useState('index');
  const [following, setFollowing] = useState('follow');

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop Overlay */}
      <div className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Edit SEO Settings Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col h-[85vh] md:h-auto md:max-h-[85vh] bg-white dark:bg-zinc-900 md:rounded-t-xl md:rounded-b-xl shadow-2xl transition-transform animate-in slide-in-from-bottom-4 md:zoom-in-95 max-w-3xl mx-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 overflow-hidden">
        {/* Modal Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-1.5">
            <FileEdit className="text-[var(--primary)]" size={16} />
            <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Edit SEO Settings</h1>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors active:scale-95 text-zinc-500">
            <X size={15} />
          </button>
        </header>

        {/* Modal Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-3.5 md:p-4 space-y-5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          
          {/* Section 1: Basic SEO */}
          <section className="space-y-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Globe className="text-zinc-500 dark:text-zinc-400" size={15} />
              <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Basic SEO</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Page Name</label>
                <input type="text" className="w-full h-8 px-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-100" placeholder="Enter page name..." defaultValue="Gourmet Pepperoni Feast"/>
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Page URL</label>
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-zinc-500 text-xs">/menu/</span>
                  <input type="text" className="w-full h-8 pl-12 pr-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-100" defaultValue="pepperoni-feast"/>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Meta Title</label>
                  <span className="text-[10px] font-semibold text-[var(--primary)]">55/60</span>
                </div>
                <input type="text" className="w-full h-8 px-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-100" defaultValue="Order Gourmet Pepperoni Feast | Pizza Master Franchise"/>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Meta Description</label>
                  <span className="text-[10px] font-semibold text-[var(--primary)]">152/160</span>
                </div>
                <textarea rows="2" className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all resize-none text-zinc-900 dark:text-zinc-100" defaultValue="Our best-selling Pepperoni Feast features premium Italian pepperoni, melted mozzarella, and our signature slow-cooked tomato sauce on a hand-tossed crust." />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Canonical URL</label>
                <input type="text" className="w-full h-8 px-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-100" defaultValue="https://pizzamaster.com/menu/pepperoni-feast"/>
              </div>
            </div>
          </section>

          {/* Section 2: Robots Configuration */}
          <section className="p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Bot className="text-zinc-500 dark:text-zinc-400" size={15} />
              <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Robots Configuration</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Indexing</p>
                <div className="flex bg-zinc-200/50 dark:bg-zinc-900 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-800">
                  <button onClick={() => setIndexing('index')} className={`flex-1 py-1 text-[11px] font-bold rounded transition-all ${indexing === 'index' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>Index</button>
                  <button onClick={() => setIndexing('noindex')} className={`flex-1 py-1 text-[11px] font-bold rounded transition-all ${indexing === 'noindex' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>No Index</button>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Following</p>
                <div className="flex bg-zinc-200/50 dark:bg-zinc-900 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-800">
                  <button onClick={() => setFollowing('follow')} className={`flex-1 py-1 text-[11px] font-bold rounded transition-all ${following === 'follow' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>Follow</button>
                  <button onClick={() => setFollowing('nofollow')} className={`flex-1 py-1 text-[11px] font-bold rounded transition-all ${following === 'nofollow' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>No Follow</button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Open Graph Configuration */}
          <section className="space-y-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Share2 className="text-zinc-500 dark:text-zinc-400" size={15} />
              <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Open Graph</h2>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">OG Title</label>
                <input type="text" className="w-full h-8 px-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-100" defaultValue="Pepperoni Feast - Pizza Master Specials" />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">OG Description</label>
                <textarea rows="2" className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all resize-none text-zinc-900 dark:text-zinc-100" defaultValue="Order the iconic Gourmet Pepperoni Feast online for fast delivery." />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">OG Image</label>
                <div className="flex items-center gap-3 p-2 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/30">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <img src="https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200&auto=format&fit=crop" alt="Gourmet Pizza" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <button className="flex items-center gap-1.5 text-[var(--primary)] text-xs font-bold py-1 px-3 hover:bg-[var(--primary)]/5 rounded-lg border border-[var(--primary)] transition-colors active:scale-95">
                      <UploadCloud size={14} />
                      <span>Upload OG Image</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Twitter Card Configuration */}
          <section className="space-y-3 pb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AtSign className="text-zinc-500 dark:text-zinc-400" size={15} />
              <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Twitter Card</h2>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Card Type</label>
                <div className="relative">
                  <select className="w-full h-8 pl-2.5 pr-8 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs appearance-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none text-zinc-900 dark:text-zinc-100">
                    <option>Summary Large Image</option>
                    <option>Summary Card</option>
                    <option>App Card</option>
                    <option>Player Card</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" size={14} />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Twitter Title</label>
                <input type="text" className="w-full h-8 px-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-100" defaultValue="Grab a Pepperoni Feast today! 🍕" />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Twitter Description</label>
                <textarea rows="2" className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all resize-none text-zinc-900 dark:text-zinc-100" defaultValue="Hungry? Our Pepperoni Feast is ready for you. Fast franchise-wide delivery available." />
              </div>
            </div>
          </section>

        </main>

        {/* Modal Footer */}
        <footer className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3 shrink-0">
          <button onClick={onClose} className="flex-1 h-8.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors active:opacity-70">
            Cancel
          </button>
          <button onClick={onClose} className="flex-[2] h-8.5 bg-[var(--primary)] text-white text-xs font-bold rounded-lg shadow hover:opacity-90 active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5">
            <Save size={15} />
            Save SEO Settings
          </button>
        </footer>
      </div>
    </>
  );
}
