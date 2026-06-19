import React, { useState } from 'react';
import { X, Tag, Eye, Monitor, Smartphone } from 'lucide-react';

export default function CreateBanners({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    promoTag: '',
    ctaText: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep === 1) setCurrentStep(2);
    else {
      // Mock submit
      alert('Proceeding to Step 3: Redirect configuration...');
      onClose();
      setCurrentStep(1);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center lg:pl-[280px] p-0 md:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="w-full h-full md:h-auto md:max-h-[80vh] md:max-w-lg bg-zinc-50 dark:bg-zinc-900 md:rounded-2xl flex flex-col shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top App Bar */}
        <header className="w-full shrink-0 bg-white dark:bg-zinc-900 flex justify-between items-center h-12 px-3.5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1.5 hover:bg-zinc-100 dark:bg-zinc-800 rounded-full transition-colors">
              <X size={18} className="text-[var(--primary)]" />
            </button>
            <h1 className="text-sm font-bold text-[var(--primary)]">Create New Banner</h1>
          </div>
          <div className="flex items-center">
            <span className="text-[10px] text-zinc-500 font-medium">Draft Saved</span>
          </div>
        </header>

        {/* Horizontal Stepper */}
        <div className="bg-white dark:bg-zinc-900 px-3.5 py-2 flex overflow-x-auto scrollbar-none border-b border-zinc-200 dark:border-zinc-800 gap-3 shrink-0">
          {/* Step 1 */}
          <div className={`flex items-center gap-2 flex-shrink-0 transition-opacity duration-300 ${currentStep === 1 ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${currentStep === 1 ? 'bg-[var(--primary)] text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>1</div>
            <span className={`text-xs font-semibold whitespace-nowrap ${currentStep === 1 ? 'text-[var(--primary)]' : 'text-zinc-500 dark:text-zinc-400'}`}>Content Details</span>
          </div>
          <div className="w-3 h-[1px] bg-zinc-200 dark:bg-zinc-700 self-center flex-shrink-0"></div>
          {/* Step 2 */}
          <div className={`flex items-center gap-2 flex-shrink-0 transition-opacity duration-300 ${currentStep === 2 ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${currentStep === 2 ? 'bg-[var(--primary)] text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>2</div>
            <span className={`text-xs font-semibold whitespace-nowrap ${currentStep === 2 ? 'text-[var(--primary)]' : 'text-zinc-500 dark:text-zinc-400'}`}>Media Upload</span>
          </div>
          <div className="w-3 h-[1px] bg-zinc-200 dark:bg-zinc-700 self-center flex-shrink-0"></div>
          {/* Step 3 */}
          <div className="flex items-center gap-2 flex-shrink-0 opacity-50">
            <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center text-[9px] font-bold">3</div>
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">Redirect</span>
          </div>
        </div>

        {/* Main Form Canvas */}
        <main className="flex-1 overflow-y-auto p-3.5 md:p-4 pb-20 md:pb-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          
          {/* Step 1 Content */}
          <section className={`transition-all duration-300 ${currentStep === 1 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
            <div className="space-y-3">
              <div className="space-y-1 focus-within:text-[var(--primary)] transition-colors">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Banner Title</label>
                <input 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-9 px-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-zinc-900 dark:text-zinc-100" 
                  placeholder="e.g. Summer Sizzler" 
                  type="text"
                />
              </div>
              <div className="space-y-1 focus-within:text-[var(--primary)] transition-colors">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Subtitle</label>
                <input 
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full h-9 px-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-zinc-900 dark:text-zinc-100" 
                  placeholder="Limited time offer on all large pizzas" 
                  type="text"
                />
              </div>
              <div className="space-y-1 focus-within:text-[var(--primary)] transition-colors">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Short Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none text-zinc-900 dark:text-zinc-100" 
                  placeholder="Describe the offer in 2 lines..." 
                  rows="2"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 focus-within:text-[var(--primary)] transition-colors">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Promotion Tag</label>
                  <div className="relative">
                    <Tag size={14} className="absolute left-3 top-2.5 text-zinc-400" />
                    <input 
                      name="promoTag"
                      value={formData.promoTag}
                      onChange={handleChange}
                      className="w-full h-9 pl-8 pr-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-zinc-900 dark:text-zinc-100" 
                      placeholder="e.g. 50% OFF" 
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-1 focus-within:text-[var(--primary)] transition-colors">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">CTA Button Text</label>
                  <input 
                    name="ctaText"
                    value={formData.ctaText}
                    onChange={handleChange}
                    className="w-full h-9 px-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-zinc-900 dark:text-zinc-100" 
                    placeholder="Order Now" 
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="mt-5 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Live Preview</span>
                <Eye size={16} className="text-zinc-400" />
              </div>
              <div className="p-4 text-center space-y-2.5">
                <div className="inline-block px-2 py-0.5 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-bold rounded-full">
                  {formData.promoTag || '50% OFF'}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{formData.title || 'Summer Sizzler'}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{formData.subtitle || 'Enjoy our hottest deal of the season.'}</p>
                <button className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  {formData.ctaText || 'Order Now'}
                </button>
              </div>
            </div>
          </section>

          {/* Step 2 Content (Media Upload) */}
          <section className={`transition-all duration-300 ${currentStep === 2 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
            <div className="space-y-4">
              {/* Desktop Banner Zone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Desktop Banner (1920x600)</label>
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-5 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shrink-0">
                    <Monitor size={16} className="text-[var(--primary)]" />
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Tap to upload desktop image</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">JPG, PNG, WebP up to 5MB</p>
                </div>
              </div>
              
              {/* Mobile Banner Zone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Mobile Banner (1080x1080)</label>
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-5 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shrink-0">
                    <Smartphone size={16} className="text-[var(--primary)]" />
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Tap to upload mobile image</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">JPG, PNG, WebP up to 5MB</p>
                </div>
              </div>

              {/* Visual Mood Context */}
              <div className="rounded-xl overflow-hidden h-28 relative group border border-zinc-200 dark:border-zinc-800">
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&fm=webp" 
                  alt="Asset Recommendation Context" 
                  className="w-full h-full object-cover grayscale-[0.2]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3">
                  <span className="text-[9px] text-white/70 uppercase font-bold tracking-widest mb-0.5">Asset Recommendation</span>
                  <p className="text-white text-[10px] font-medium leading-tight">Use high-contrast imagery with centralized subjects for best mobile cropping.</p>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer Actions */}
        <footer className="absolute bottom-0 left-0 md:relative w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 flex gap-3 shrink-0">
          {currentStep > 1 && (
            <button 
              onClick={handleBack}
              className="flex-1 h-9 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-lg flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-xs"
            >
              Back
            </button>
          )}
          {currentStep === 1 && (
            <button 
              onClick={onClose}
              className="flex-1 h-9 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-lg flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-xs"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={handleNext}
            className="flex-1 h-9 bg-[var(--primary)] text-white font-bold shadow-md hover:bg-[var(--primary)]/90 active:scale-95 transition-all rounded-lg flex items-center justify-center text-xs"
          >
            {currentStep === 1 ? 'Next Step' : 'Go to Redirect'}
          </button>
        </footer>
      </div>
    </div>
  );
}
