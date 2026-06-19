import React, { useState } from 'react';
import { X, Info, Settings, MapPin, ChevronRight, CheckCircle2, Activity, Edit3, Trash2, Plus, Minus, Radar, Clock } from 'lucide-react';

export default function CreateDeliveryZone({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState(1);
    
    // Form State
    const [formData, setFormData] = useState({
        zoneName: '',
        city: '',
        state: 'NY',
        deliveryFee: '4.99',
        minOrder: '15.00',
        freeThreshold: '50.00',
        eta: '30',
        radius: '5.5'
    });

    if (!isOpen) return null;

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
        else {
            alert("Zone configuration validated. Ready to save.");
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose}></div>
            
            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] lg:w-[480px] bg-white dark:bg-zinc-900 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[60] flex flex-col transform transition-transform duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-955/50 shrink-0">
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight uppercase">Create Delivery Zone</h2>
                    <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Progress Stepper */}
                <div className="px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
                    <div className="flex items-center justify-between relative max-w-xs mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 dark:bg-zinc-800 -translate-y-1/2 z-0 rounded-full"></div>
                        <div 
                            className="absolute top-1/2 left-0 h-0.5 bg-[var(--primary)] -translate-y-1/2 z-0 transition-all duration-500 rounded-full" 
                            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                        ></div>
                        
                        <div className="relative z-10 flex flex-col items-center gap-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${currentStep >= 1 ? 'bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>1</div>
                            <span className={`text-[9px] font-extrabold tracking-widest ${currentStep >= 1 ? 'text-[var(--primary)]' : 'text-zinc-400 dark:text-zinc-500'}`}>BASIC</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${currentStep >= 2 ? 'bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>2</div>
                            <span className={`text-[9px] font-extrabold tracking-widest ${currentStep >= 2 ? 'text-[var(--primary)]' : 'text-zinc-400 dark:text-zinc-500'}`}>SETTINGS</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${currentStep >= 3 ? 'bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>3</div>
                            <span className={`text-[9px] font-extrabold tracking-widest ${currentStep >= 3 ? 'text-[var(--primary)]' : 'text-zinc-400 dark:text-zinc-500'}`}>MAPPING</span>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-3.5">
                            <h3 className="text-xs font-bold text-[var(--primary)] flex items-center gap-2 uppercase tracking-wide">
                                <Info size={16} />
                                Basic Information
                            </h3>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Zone Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Downtown Express" 
                                        className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-50"
                                        value={formData.zoneName}
                                        onChange={(e) => handleInputChange('zoneName', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">City</label>
                                        <input 
                                            type="text" 
                                            placeholder="San Francisco" 
                                            className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-50"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">State</label>
                                        <select 
                                            className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-50 appearance-none"
                                            value={formData.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                        >
                                            <option value="CA">CA</option>
                                            <option value="NY">NY</option>
                                            <option value="TX">TX</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Delivery Settings */}
                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-3.5">
                            <h3 className="text-xs font-bold text-[var(--primary)] flex items-center gap-2 uppercase tracking-wide">
                                <Settings size={16} />
                                Zone Parameters
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Delivery Fee ($)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 font-mono text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-50"
                                        value={formData.deliveryFee}
                                        onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Min Order ($)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 font-mono text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-50"
                                        value={formData.minOrder}
                                        onChange={(e) => handleInputChange('minOrder', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Free Threshold ($)</label>
                                <input 
                                    type="number" 
                                    className="w-full bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 font-mono text-xs focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-zinc-900 dark:text-zinc-50"
                                    value={formData.freeThreshold}
                                    onChange={(e) => handleInputChange('freeThreshold', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Est. ETA (Min)</label>
                                    <div className="flex items-center bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-0.5 focus-within:ring-2 focus-within:ring-[var(--primary)]/20 focus-within:border-[var(--primary)] transition-all">
                                        <Clock size={14} className="text-amber-500 shrink-0" />
                                        <input 
                                            type="number" 
                                            className="w-full bg-transparent border-none focus:ring-0 px-1.5 py-1 font-mono text-xs outline-none text-zinc-900 dark:text-zinc-50"
                                            value={formData.eta}
                                            onChange={(e) => handleInputChange('eta', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Radius (KM)</label>
                                    <div className="flex items-center bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-0.5 focus-within:ring-2 focus-within:ring-[var(--primary)]/20 focus-within:border-[var(--primary)] transition-all">
                                        <Radar size={14} className="text-blue-500 shrink-0" />
                                        <input 
                                            type="number" 
                                            className="w-full bg-transparent border-none focus:ring-0 px-1.5 py-1 font-mono text-xs outline-none text-zinc-900 dark:text-zinc-50"
                                            value={formData.radius}
                                            onChange={(e) => handleInputChange('radius', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Zone Mapping */}
                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                            <div className="relative h-[240px] w-full bg-zinc-100 dark:bg-zinc-955">
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        className="w-full h-full object-cover grayscale brightness-50 opacity-80 mix-blend-luminosity" 
                                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80&fm=webp" 
                                        alt="Map Background" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/50"></div>
                                </div>
                                
                                {/* Drawing Tools */}
                                <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
                                    <button className="w-8 h-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors shadow-sm active:scale-95">
                                        <Activity size={15} />
                                    </button>
                                    <button className="w-8 h-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors shadow-sm active:scale-95">
                                        <Edit3 size={15} />
                                    </button>
                                    <button className="w-8 h-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors shadow-sm active:scale-95">
                                        <Trash2 size={15} />
                                    </button>
                                </div>

                                {/* Map Center Target */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                                    <div className="w-5 h-5 border-2 border-[var(--primary)] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
                                        <div className="w-1 h-1 bg-[var(--primary)] rounded-full animate-ping"></div>
                                    </div>
                                </div>

                                {/* Zoom Controls */}
                                <div className="absolute bottom-2 right-2 flex flex-col z-10">
                                    <button className="w-7 h-7 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 border-b-0 rounded-t-md flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-95">
                                        <Plus size={14} />
                                    </button>
                                    <button className="w-7 h-7 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-b-md flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-95">
                                        <Minus size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900/80 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5">
                                <MapPin size={14} className="text-zinc-400" />
                                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Tap on map to define polygon vertices</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-955/50 shrink-0">
                    <div className="flex items-center justify-between gap-3">
                        <button 
                            onClick={currentStep === 1 ? onClose : handlePrev}
                            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-bold text-[10px] uppercase tracking-wider active:scale-95"
                        >
                            {currentStep === 1 ? 'Cancel' : 'Back'}
                        </button>
                        <button 
                            onClick={handleNext}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[var(--primary)] text-white font-extrabold rounded-lg shadow-md shadow-[var(--primary)]/20 hover:opacity-90 active:scale-95 transition-all uppercase tracking-wide text-[10px]"
                        >
                            {currentStep === 3 ? (
                                <>Validate & Save <CheckCircle2 size={14} /></>
                            ) : (
                                <>Next Step <ChevronRight size={14} /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
