import React, { useState, useEffect } from 'react';
import { Network, ShieldCheck, BadgeCheck, Filter, Search, CheckCircle, AlertTriangle, XCircle, RefreshCw, DownloadCloud, Radio, Edit2, CheckSquare, Eye, ExternalLink } from 'lucide-react';
import EditSeoSettings from './EditSeoSettings';
import SocialPreview from './SocialPreview';

export default function SeoSettings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const initialPages = [
    {
      id: 1,
      name: "Home Page",
      url: "pizza-master.com/",
      status: "Excellent",
      statusColor: "bg-green-100 text-green-700",
      tags: [
        { label: "INDEXED", color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" },
        { label: "OG READY", color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" },
        { label: "META OK", color: "bg-[var(--primary)]/10 text-[var(--primary)]" },
      ]
    },
    {
      id: 2,
      name: "Blog: Perfect Crust",
      url: "/blog/perfect-crust",
      status: "Good",
      statusColor: "bg-amber-100 text-amber-700",
      tags: [
        { label: "INDEXED", color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" },
        { label: "OG MISSING", color: "bg-red-100 text-red-700" },
      ]
    }
  ];

  const filteredPages = initialPages.filter(page => 
    page.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
    page.url.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4 animate-fade-down">
      
      {/* Header Actions */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-lg font-bold text-black dark:text-white">SEO Settings</h1>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Manage meta tags, indexing, and social previews.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial bg-[var(--primary)] text-white px-3 py-1.5 rounded text-[11px] font-bold shadow hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-1.5">
            <Network size={12} />
            <span>Sitemap</span>
          </button>
          <button className="flex-1 sm:flex-initial border border-zinc-200 dark:border-zinc-700 text-black/70 dark:text-white/70 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded text-[11px] font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-1.5">
            <ShieldCheck size={12} />
            <span>Health Scan</span>
          </button>
        </div>
      </header>

      {/* KPI Dashboard */}
      <section className="grid grid-cols-2 gap-3">
        {/* Indexed Pages */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Indexed Pages</span>
            <span className="text-base font-black text-black dark:text-white">156</span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-500 flex items-center text-[10px] font-bold gap-0.5 bg-emerald-50 dark:bg-emerald-955/20 px-1.5 py-0.5 rounded-full">
            +12
          </span>
        </div>

        {/* Health Score */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Health Score</span>
            <span className="text-base font-black text-black dark:text-white">92%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full relative flex items-center justify-center" style={{ background: 'conic-gradient(var(--primary) calc(92 * 1%), #e5e7eb 0)' }}>
              <div className="absolute inset-0.5 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-[9px] font-black text-[var(--primary)]">92%</span>
              </div>
            </div>
            <BadgeCheck size={14} className="text-[var(--primary)]" />
          </div>
        </div>

        {/* Warnings & Sync */}
        <div className="col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Warnings</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
                <span className="text-xs font-bold text-black dark:text-white">12 Meta</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
                <span className="text-xs font-bold text-black dark:text-white">8 OG Tags</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase">Last Sync</p>
            <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">09 Jun, 10:45 AM</p>
          </div>
        </div>
      </section>

      {/* SEO Pages Management */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-bold text-black dark:text-white">Page Management</h2>
          <button className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">
            <Filter size={14} />
          </button>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-750 text-black dark:text-white rounded text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" 
            placeholder="Search pages..." 
          />
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" />
        </div>

        <div className="space-y-2">
          {filteredPages.map(page => (
            <div key={page.id} className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-bold text-black dark:text-white">{page.name}</h3>
                  <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">{page.url}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${page.statusColor}`}>{page.status}</span>
                  <button onClick={() => setIsPreviewModalOpen(true)} className="p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors active:scale-95" title="Preview">
                    <Eye size={12} />
                  </button>
                  <button onClick={() => setIsEditModalOpen(true)} className="p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-black/50 dark:text-white/50 hover:text-[var(--primary)] transition-colors active:scale-95" title="Edit">
                    <Edit2 size={12} />
                  </button>
                </div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {page.tags.map((tag, idx) => (
                  <span key={idx} className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {filteredPages.length === 0 && (
            <div className="text-center py-4 text-black/50 dark:text-white/50 text-xs font-semibold">No pages found matching "{searchTerm}"</div>
          )}
        </div>
      </section>

      {/* Health Monitor */}
      <section className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-3">
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Global SEO Checklist</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-500" />
              <span className="text-xs font-semibold text-black dark:text-white">Meta Titles</span>
            </div>
            <span className="text-[10px] font-semibold text-black/50 dark:text-white/50">All Pages</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-500" />
              <span className="text-xs font-semibold text-black dark:text-white">Meta Descriptions</span>
            </div>
            <span className="text-[10px] font-semibold text-black/50 dark:text-white/50">All Pages</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-550" />
              <span className="text-xs font-semibold text-black dark:text-white">Canonical URLs</span>
            </div>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">3 Missing</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle size={14} className="text-rose-500" />
              <span className="text-xs font-semibold text-black dark:text-white">Structured Data</span>
            </div>
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-500">Required</span>
          </div>
        </div>
      </section>

      {/* Sitemap Management */}
      <section className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-bold text-black dark:text-white">Sitemap</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50">Auto-gen</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-8 h-4.5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-[14px]"></div>
            </label>
          </div>
        </div>
        
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Current URL</span>
            <span className="text-xs font-bold text-black dark:text-white">/sitemap_index.xml</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Total URLs</span>
            <span className="text-xs font-bold text-black dark:text-white">248 Pages</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center gap-1 p-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <RefreshCw size={12} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Regen</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <DownloadCloud size={12} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Fetch</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-black/70 dark:text-white/70 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <Radio size={12} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Ping</span>
          </button>
        </div>
      </section>

      {/* Robots Configuration */}
      <section className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-3">
        <h2 className="text-xs font-bold text-black dark:text-white">Robots & Indexing</h2>
        
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-black dark:text-white">Allow Search Crawling</p>
              <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Global indexation setting</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-8 h-4.5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-[14px]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-black dark:text-white">Image Indexing</p>
              <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Allow Google Images to index media</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-8 h-4.5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-[14px]"></div>
            </label>
          </div>
          
          <div className="space-y-1.5 pt-1.5">
            <p className="text-[10px] font-bold text-black/70 dark:text-white/70">Robots.txt Preview</p>
            <div className="bg-zinc-950 text-zinc-300 p-3 rounded-lg font-mono text-[10px] leading-relaxed overflow-x-auto">
              User-agent: *<br/>
              Disallow: /admin/<br/>
              Disallow: /checkout/<br/>
              Allow: /<br/>
              <br/>
              Sitemap: https://pizza-master.com/sitemap.xml
            </div>
          </div>
        </div>
      </section>

      {/* Social Preview Center */}
      <section className="bg-white dark:bg-zinc-900 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-black dark:text-white">Social Previews</h2>
          <button onClick={() => setIsPreviewModalOpen(true)} className="flex items-center gap-1 text-[10px] font-bold text-[var(--primary)] hover:underline">
            View Simulator <ExternalLink size={12} />
          </button>
        </div>
        
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
          <button className="flex-1 py-1 text-[var(--primary)] font-bold text-xs border-b border-[var(--primary)]">Google</button>
          <button className="flex-1 py-1 text-black/50 dark:text-white/50 font-bold text-xs hover:text-black dark:hover:text-white transition-colors">Facebook</button>
          <button className="flex-1 py-1 text-black/50 dark:text-white/50 font-bold text-xs hover:text-black dark:hover:text-white transition-colors">Twitter</button>
        </div>
        
        <div className="space-y-2 pt-1">
          <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline cursor-pointer">Pizza Master | Handcrafted Artisanal Pizza Delivered Fast</div>
          <div className="text-green-700 dark:text-green-500 text-[10px] font-bold">https://pizza-master.com/</div>
          <p className="text-black/70 dark:text-white/70 text-xs font-semibold leading-relaxed line-clamp-2">Experience the best artisanal pizza. Fresh ingredients, 400-degree stone ovens, and authentic recipes from the heart of Italy to your doorstep.</p>
          <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 mt-2 relative group w-full">
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1600&auto=format&fit=crop" 
              alt="Gourmet Pizza" 
              className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => setIsPreviewModalOpen(true)} className="bg-white text-zinc-900 px-3 py-1.5 rounded text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
                <Eye size={12} /> <span>Open Simulator</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent SEO Activities */}
      <section className="space-y-3 pb-4">
        <h2 className="text-xs font-bold text-black dark:text-white">Recent Activity</h2>
        
        <div className="space-y-3 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800">
          
          <div className="relative pl-8">
            <div className="absolute left-0 top-1 w-5 h-5 bg-rose-50 dark:bg-rose-955/20 rounded-full flex items-center justify-center border-2 border-zinc-50 dark:border-zinc-950">
              <Edit2 size={10} className="text-rose-600 dark:text-rose-500" />
            </div>
            <p className="text-xs font-bold text-black dark:text-white">SEO Manager updated Meta Title</p>
            <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">"Best Pizza" &rarr; "Authentic Pizza Master"</p>
            <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase mt-1">2 HOURS AGO</p>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute left-0 top-1 w-5 h-5 bg-blue-50 dark:bg-blue-955/20 rounded-full flex items-center justify-center border-2 border-zinc-50 dark:border-zinc-950">
              <RefreshCw size={10} className="text-blue-600 dark:text-blue-500" />
            </div>
            <p className="text-xs font-bold text-black dark:text-white">Marketing Team generated Sitemap</p>
            <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">248 URLs processed successfully</p>
            <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase mt-1">6 HOURS AGO</p>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute left-0 top-1 w-5 h-5 bg-emerald-50 dark:bg-emerald-955/20 rounded-full flex items-center justify-center border-2 border-zinc-50 dark:border-zinc-950">
              <CheckSquare size={10} className="text-emerald-600 dark:text-emerald-500" />
            </div>
            <p className="text-xs font-bold text-black dark:text-white">System Health Scan Complete</p>
            <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Score improved from 88% to 92%</p>
            <p className="text-[9px] font-bold text-black/50 dark:text-white/50 uppercase mt-1">YESTERDAY</p>
          </div>
          
        </div>
      </section>

      {/* Edit SEO Modal */}
      <EditSeoSettings isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      
      {/* Social Preview Modal */}
      <SocialPreview isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} />

    </div>
  );
}
