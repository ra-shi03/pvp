import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Search,
  UploadCloud,
  Trash2,
  Image as ImageIcon,
  Folder,
  ShoppingBag,
  UserPlus,
  Wallet,
  CheckCircle,
  Smartphone,
  Globe,
  Store,
  Bike,
  History,
  HeadphonesIcon,
  MoreVertical,
  Info
} from 'lucide-react';
import EditSettings from './EditSettings';
import ConfigureMaintenance from './ConfigureMaintenance';

export default function AppSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Save Changes');
  const [isEditSettingsOpen, setIsEditSettingsOpen] = useState(false);
  const [isMaintenanceConfigOpen, setIsMaintenanceConfigOpen] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Papa Veg Pizza',
    email: 'admin@gmail.com',
    region: 'India',
    phoneCountryCode: '+91 (IN)',
    phone: '9999999999',
    address: 'Bholaram Ustad Marg Indore',
    state: 'Madhya Pradesh',
    pincode: '450001',
    supportEmail: '',
    supportPhone: '',
    supportHours: '',
  });

  // Debouncing for search bar
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const handleSave = () => {
    setIsSaving(true);
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Saved');
      setTimeout(() => {
        setIsSaving(false);
        setSaveStatus('Save Changes');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="p-3 md:p-4 pb-12 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-955 min-h-screen w-full space-y-4 animate-fade-down">
      <EditSettings isOpen={isEditSettingsOpen} onClose={() => setIsEditSettingsOpen(false)} />
      <ConfigureMaintenance isOpen={isMaintenanceConfigOpen} onClose={() => setIsMaintenanceConfigOpen(false)} />
      
      {/* Top App Bar Header inside the layout */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-lg font-bold text-black dark:text-white">App Settings</h1>
          <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 mt-0.5">Manage global platform configurations and maintenance</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black/70 dark:text-white/70 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 font-bold text-[11px]">
            <RefreshCw size={12} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3.5 py-1.5 rounded text-[11px] font-bold text-white shadow-sm transition-all ${
              saveStatus === 'Saved' ? 'bg-emerald-600' : 'bg-[var(--primary)] hover:opacity-90 active:scale-95'
            }`}
          >
            {saveStatus}
          </button>
        </div>
      </header>

      {/* Section 1: Settings Overview (KPI Cards) */}
      <section className="mb-2">
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
          {/* General Settings KPI */}
          <div className="min-w-[240px] flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">General Status</span>
              <span className="text-base font-black text-black dark:text-white">Active</span>
              <span className="text-[10px] font-semibold text-black/70 dark:text-white/70">PizzaOS Enterprise</span>
              <span className="text-[10px] text-[var(--primary)] font-semibold mt-0.5">admin.pizzaos.com</span>
            </div>
            <button onClick={() => setIsEditSettingsOpen(true)} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 text-[10px] font-bold rounded transition-colors">Edit</button>
          </div>
          
          {/* Localization KPI */}
          <div className="min-w-[240px] flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Region</span>
              <span className="text-base font-black text-black dark:text-white">INR (₹)</span>
              <span className="text-[10px] font-semibold text-black/70 dark:text-white/70">Asia/Kolkata Timezone</span>
            </div>
            <button className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 text-[10px] font-bold rounded transition-colors">Edit</button>
          </div>
          
          {/* Feature Flags KPI */}
          <div className="min-w-[240px] flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">Active Features</span>
              <span className="text-base font-black text-black dark:text-white">06</span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded text-[9px] font-bold">ORDERS</span>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-[9px] font-bold">WALLET</span>
                <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded text-[9px] font-bold">FRANCHISE</span>
              </div>
            </div>
            <button className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 text-[10px] font-bold rounded transition-colors">Manage</button>
          </div>
          
          {/* Maintenance KPI */}
          <div className="min-w-[240px] flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">System Status</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-500">Online</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">Healthy</span>
              </div>
            </div>
            <button onClick={() => setIsMaintenanceConfigOpen(true)} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 text-[10px] font-bold rounded transition-colors">Config</button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Branding Management */}
          <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-3.5 py-2 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-955/50">
              <h2 className="text-xs font-bold text-black dark:text-white">Branding Management</h2>
              <MoreVertical size={14} className="text-black/50 dark:text-white/50 cursor-pointer" />
            </div>
            <div className="p-3.5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block mb-1">Main App Logo</label>
                  <div className="w-full h-20 bg-zinc-50 dark:bg-zinc-800/50 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <UploadCloud size={20} className="text-black/50 dark:text-white/50" />
                    <p className="text-[10px] font-semibold text-black/50 dark:text-white/50">Drop image here or <span className="text-[var(--primary)] font-bold">Upload</span></p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-200 dark:border-zinc-800 text-xs">
                  <span className="font-semibold text-black/70 dark:text-white/70">Current: primary_logo.webp</span>
                  <Trash2 size={12} className="text-rose-500 cursor-pointer hover:text-rose-600" />
                </div>
              </div>
              
              <div className="space-y-2 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block mb-1">Dark Mode Logo</label>
                    <div className="w-full h-12 bg-zinc-950 rounded-lg flex items-center justify-center">
                      <ImageIcon size={16} className="text-white" />
                    </div>
                    <button className="w-full mt-1.5 py-1 text-[10px] font-bold border border-zinc-300 dark:border-zinc-700 rounded text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Update</button>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block mb-1">Favicon</label>
                    <div className="w-full h-12 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-[var(--primary)] rounded-sm"></div>
                    </div>
                    <button className="w-full mt-1.5 py-1 text-[10px] font-bold border border-zinc-300 dark:border-zinc-700 rounded text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Update</button>
                  </div>
                </div>
                <div className="p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800">
                  <Folder size={12} className="text-black/50 dark:text-white/50" />
                  <span className="text-[9px] text-black/70 dark:text-white/70 font-mono overflow-hidden text-ellipsis whitespace-nowrap">Storage Path: uploads/settings/branding/v1/</span>
                </div>
              </div>
            </div>
          </article>

          {/* Company & Support Information */}
          <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-3.5 py-2 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-955/50">
              <h2 className="text-xs font-bold text-black dark:text-white">Company &amp; Support Settings</h2>
              <MoreVertical size={14} className="text-black/50 dark:text-white/50 cursor-pointer" />
            </div>
            
            <div className="p-3.5 space-y-6">
              {/* Company Information Section */}
              <div>
                <h3 className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3.5">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Company name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Company name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={companyInfo.companyName}
                      onChange={(e) => setCompanyInfo({...companyInfo, companyName: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>

                  {/* Region */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Region <span className="text-red-500">*</span>
                    </label>
                    <select 
                      required
                      value={companyInfo.region}
                      onChange={(e) => setCompanyInfo({...companyInfo, region: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-shrink-0 w-32">
                        <select 
                          value={companyInfo.phoneCountryCode}
                          onChange={(e) => setCompanyInfo({...companyInfo, phoneCountryCode: e.target.value})}
                          className="w-full h-8.5 pl-3 pr-7 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white appearance-none"
                        >
                          <option value="+91 (IN)">+91 (IN)</option>
                          <option value="+1 (US)">+1 (US)</option>
                          <option value="+44 (UK)">+44 (UK)</option>
                        </select>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-xs pointer-events-none">?</span>
                      </div>
                      <input 
                        type="tel" 
                        required 
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                        className="flex-1 h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Address
                    </label>
                    <input 
                      type="text" 
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      State
                    </label>
                    <input 
                      type="text" 
                      value={companyInfo.state}
                      onChange={(e) => setCompanyInfo({...companyInfo, state: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Pincode
                    </label>
                    <input 
                      type="text" 
                      value={companyInfo.pincode}
                      onChange={(e) => setCompanyInfo({...companyInfo, pincode: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800" />

              {/* Support Information Section */}
              <div>
                <h3 className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3.5">Support Information (Dynamic Support Page)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Support Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Support Email
                    </label>
                    <input 
                      type="email" 
                      placeholder="support@foodelo.com"
                      value={companyInfo.supportEmail}
                      onChange={(e) => setCompanyInfo({...companyInfo, supportEmail: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>

                  {/* Support Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Support Phone
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+91 1234567890"
                      value={companyInfo.supportPhone}
                      onChange={(e) => setCompanyInfo({...companyInfo, supportPhone: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>

                  {/* Support Availability Hours */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block">
                      Support Availability Hours
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g., 24/7 Availability"
                      value={companyInfo.supportHours}
                      onChange={(e) => setCompanyInfo({...companyInfo, supportHours: e.target.value})}
                      className="w-full h-8.5 px-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-black dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Feature Management */}
          <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-3.5 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-955/50">
              <h2 className="text-xs font-bold text-black dark:text-white">Feature Management</h2>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
              {/* Toggle Row */}
              <div className="p-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-rose-50 dark:bg-rose-955/20 rounded-lg flex items-center justify-center">
                    <ShoppingBag size={14} className="text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-black dark:text-white">Enable Orders</h3>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70">Allow customers to place real-time orders.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              
              {/* Toggle Row */}
              <div className="p-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-50 dark:bg-blue-955/20 rounded-lg flex items-center justify-center">
                    <UserPlus size={14} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-black dark:text-white">Guest Checkout</h3>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70">Allow orders without creating an account.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              
              {/* Toggle Row */}
              <div className="p-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-purple-50 dark:bg-purple-955/20 rounded-lg flex items-center justify-center">
                    <Wallet size={14} className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-black dark:text-white">Wallet System</h3>
                    <p className="text-[10px] font-semibold text-black/70 dark:text-white/70">Enable digital credits and top-ups.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer peer-checked:bg-[var(--primary)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </article>

          {/* Parameter Control */}
          <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-3.5 py-2 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-zinc-50/50 dark:bg-zinc-955/50">
              <h2 className="text-xs font-bold text-black dark:text-white">Parameter Control</h2>
              <div className="relative w-full sm:w-48">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search parameters..." 
                  className="w-full pl-8 pr-2.5 py-1 text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-955 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">NAME</th>
                    <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">VALUE</th>
                    <th className="px-3.5 py-1.5 text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
                  {[
                    { name: 'Min Order Value', value: '₹299.00', status: 'ACTIVE' },
                    { name: 'Global Tax Rate', value: '5% GST', status: 'ACTIVE' }
                  ].filter(item => item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())).map((param, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors cursor-pointer text-xs">
                      <td className="px-3.5 py-2 font-bold text-black dark:text-white">{param.name}</td>
                      <td className="px-3.5 py-2 font-mono font-black text-black/70 dark:text-white/70">{param.value}</td>
                      <td className="px-3.5 py-2">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[9px] font-bold">
                          {param.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {debouncedSearchTerm && [
                    { name: 'Min Order Value', value: '₹299.00', status: 'ACTIVE' },
                    { name: 'Global Tax Rate', value: '5% GST', status: 'ACTIVE' }
                  ].filter(item => item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())).length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-3.5 py-6 text-center text-xs font-semibold text-black/50 dark:text-white/50">
                        No parameters found matching "{debouncedSearchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        {/* Right Column (Sidebar) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {/* Maintenance Card */}
          <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-emerald-500 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-500" />
                <h2 className="text-xs font-bold text-emerald-800 dark:text-emerald-400">System Healthy</h2>
              </div>
              <span className="px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold rounded-full border border-emerald-200 dark:border-emerald-800 uppercase">Online</span>
            </div>
            <p className="text-xs font-semibold text-black/70 dark:text-white/70 mb-3 leading-relaxed">Maintenance mode is disabled. Platforms are operating normally.</p>
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              <div className="flex flex-col items-center gap-0.5 p-1.5 bg-zinc-50 dark:bg-zinc-800 rounded opacity-70 border border-zinc-200/50 dark:border-zinc-700/50">
                <Smartphone size={14} className="text-black dark:text-white" />
                <span className="text-[8px] font-bold text-black/70 dark:text-white/70">APP</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 p-1.5 bg-zinc-50 dark:bg-zinc-800 rounded opacity-70 border border-zinc-200/50 dark:border-zinc-700/50">
                <Globe size={14} className="text-black dark:text-white" />
                <span className="text-[8px] font-bold text-black/70 dark:text-white/70">WEB</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 p-1.5 bg-zinc-50 dark:bg-zinc-800 rounded opacity-70 border border-zinc-200/50 dark:border-zinc-700/50">
                <Store size={14} className="text-black dark:text-white" />
                <span className="text-[8px] font-bold text-black/70 dark:text-white/70">POS</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 p-1.5 bg-zinc-50 dark:bg-zinc-800 rounded opacity-70 border border-zinc-200/50 dark:border-zinc-700/50">
                <Bike size={14} className="text-black dark:text-white" />
                <span className="text-[8px] font-bold text-black/70 dark:text-white/70">RIDER</span>
              </div>
            </div>
            <button onClick={() => setIsMaintenanceConfigOpen(true)} className="w-full py-1.5 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-bold rounded transition-colors shadow-sm">
              Configure Maintenance
            </button>
          </article>

          {/* Activity Log */}
          <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-3.5 py-2 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-955/50">
              <h2 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">Recent Activity</h2>
              <History size={14} className="text-black/50 dark:text-white/50" />
            </div>
            <div className="p-3.5 space-y-3">
              <div className="flex gap-2">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0 animate-pulse"></div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <p className="text-xs font-bold text-black dark:text-white truncate">Logo Updated</p>
                  <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 leading-normal">Admin (sarah.d) changed Branding.</p>
                  <p className="text-[9px] font-bold text-black/50 dark:text-white/50">10:45 AM</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <p className="text-xs font-bold text-black dark:text-white truncate">Wallet Enabled</p>
                  <p className="text-[10px] font-semibold text-black/70 dark:text-white/70 leading-normal">System auto-triggered flag.</p>
                  <p className="text-[9px] font-bold text-black/50 dark:text-white/50">09:00 PM</p>
                </div>
              </div>
            </div>
            <div className="p-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-955/50 text-center">
              <button className="text-[var(--primary)] text-xs font-bold hover:underline">Full Log</button>
            </div>
          </article>

          {/* Help Card */}
          <article className="bg-[var(--primary)] text-white p-3.5 rounded-xl shadow-md relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xs font-bold mb-1">Need Assistance?</h3>
              <p className="text-[10px] opacity-90 mb-3 leading-relaxed">Our technical team is available 24/7 for platform support.</p>
              <button className="w-full py-1.5 bg-white text-[var(--primary)] rounded text-xs font-bold shadow-sm active:scale-95 transition-transform hover:bg-zinc-50">
                Support Ticket
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-300">
              <HeadphonesIcon size={64} />
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}
