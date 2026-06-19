import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ClipboardCheck,
  HelpCircle,
  Image,
  Info,
  Lightbulb,
  Search,
  Tag,
  X,
} from "lucide-react";

const steps = ["Basic Info", "Media", "Attributes", "SEO", "Review"];
const badgeOptions = ["Vegetarian", "Popular", "Healthy", "New"];

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all";

const inspirationImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDX6-3A-0NA7c021WPbJ4mbzApsB6vwMyTr7lF8ezA-2je4qX4OUJpGKmAjJXYulJLY5Mnx_Vv4_GkSH6_n_F1u_EUY8aQ5Fbw-a9myQb1CGk8i34F8U-QQQm1ItXv0NAvO5lRS0kNjvcUuG5bG5nz56Yd3ZrDSuniSzCoLginWrcuF9s7B7RqZpEwIBzwML_got-4Vu3sm61JbV8LFv9l3YXZJI0VybUcXLf-pEsPmalYruTr2FPcOWGDq1xIap9X6PHACyR04mTU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZTuHlPD1RB_qKon9c1tqL66tkBA2Mcy1EWzgBF_t5TbmYMK1k0sOss1Zsc96CYbMCtX6N2DNTsWWt-Qs2ejOJXdsy5vk_cDeiQgXQYEryCdCMXkUg_JPJzEWZkR27D5KEtwAkXtdS966sXpPmmzhKUAv9_kA9F261sTyGD4rZAjCEEsEzURgyAJEF8EA6Qicd3OtcTOAH1MrFLB9KlMccuHMoaNnEJtWQczteQF4FvrxfBZArs-l8_ylO-Gxs1h_SrAj0GR0kt0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjlKfRC8U_eip7gyXGxZpuwyfCrDAQeP895qYjQjUdy1PzW2C14ikvwZ30YrC_FXHoAUo1PWW7nT29r3AbPMSvHQ_zwX8JPNyp2CCD8TcUHXfZTyMcQc1Ml0esym_EL0NXkKVCerJ1UFZu7mzrX6NXwUQIw07FjEl--6xX9NrnhFwCL_yxqp4SUl3MBg3LGCm0XHHdvKGnnv66FEYweQ29tp0aX2MhAQksaf6V2ICE8fwluutB0_SOff92W7ZUeQZhrPMXJEi0fzk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDA8pTJJGfdARfzunMaB_0z5WOKNFtj64u9maEaD1YIArgH1aIJ-82W2IZ26BrWdU5BSAzy37a9XUb2kdGKuyccD411WoQykbRVfziaeFLohGhFB-EbROaX6TLq_pXigGUuaj31nt-H1g97zq5STuQADrWPwzUtb3a34jMoxakvnnGTMqrzVC0AKRNQaaICg9coSsQWbXmV7AfEmGN6zRAjdFivsVcgrRgYiwwUgbCXXGt8PF5mArd5QQIU3PWAnhBABlfxyYOEoPw",
];

function Field({ id, label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && <p className="text-[10px] text-zinc-500 italic">{hint}</p>}
    </div>
  );
}

function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-between px-3 relative">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />
      <div
        className="absolute top-1/2 left-0 h-[2px] bg-[var(--primary)] -translate-y-1/2 z-0 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
      {steps.map((label, index) => {
        const step = index + 1;
        const active = currentStep >= step;
        return (
          <div key={label} className="relative z-10 flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-zinc-50 dark:ring-zinc-900 transition-colors ${active ? "bg-[var(--primary)] text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
              {currentStep > step ? <Check size={14} strokeWidth={3} /> : step}
            </div>
            <span className={`text-[10px] sm:text-xs font-bold hidden sm:block ${active ? "text-[var(--primary)]" : "text-zinc-400"}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]" />
    </label>
  );
}

function UploadCard({ title, description, icon: Icon, wide }) {
  return (
    <div className={`${wide ? "md:col-span-7" : "md:col-span-5"} bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm flex flex-col`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
        {wide ? <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Recommended</span> : <HelpCircle className="text-[var(--primary)]" size={16} />}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{description}</p>
      <div className={`flex-1 w-full rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 ${wide ? "aspect-[2/1]" : "aspect-[4/3]"} flex flex-col items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-900/50 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group`}>
        <div className="p-3 rounded-full bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 transition-all">
          <Icon className="text-[var(--primary)]" size={24} />
        </div>
        <div className="text-center">
          <span className="text-sm font-bold block text-[var(--primary)]">Upload {wide ? "Banner" : "Thumbnail"}</span>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{wide ? "High resolution, min 1920x1080px" : "PNG or JPG, max 2MB"}</span>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, icon: Icon, step, children, className, setCurrentStep }) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Icon className="text-[var(--primary)]" size={18} /> {title}
        </h3>
        <button onClick={() => setCurrentStep(step)} className="text-[var(--primary)] hover:bg-[var(--primary)]/10 px-3 py-1 rounded-full text-sm font-bold transition-colors">
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

export default function AddCategoryModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [parentCategory, setParentCategory] = useState("");
  const [displayPriority, setDisplayPriority] = useState("10");
  const [selectedBadges, setSelectedBadges] = useState(["Vegetarian"]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  useEffect(() => {
    setSlug(categoryName.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
  }, [categoryName]);

  if (!isOpen) return null;

  const moveStep = (delta) => setCurrentStep((step) => Math.min(5, Math.max(1, step + delta)));
  const toggleBadge = (badge) =>
    setSelectedBadges((badges) => (badges.includes(badge) ? badges.filter((item) => item !== badge) : [...badges, badge]));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Add New Category</h2>
            <button onClick={onClose} className="text-zinc-400 hover:text-[var(--primary)] transition-colors p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <X size={20} />
            </button>
          </div>
          <Stepper currentStep={currentStep} />
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field id="category_name" label="Category Name" hint="Required for customer-facing menus.">
                  <input id="category_name" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className={inputClass} placeholder="e.g. Signature Pizzas" />
                </Field>
                <Field id="category_slug" label="Slug" hint="Unique URL identifier.">
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-zinc-400 font-medium text-sm">/cat/</span>
                    <input id="category_slug" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={`${inputClass} pl-12`} placeholder="signature-pizzas" />
                  </div>
                </Field>
              </div>
              <Field id="category_desc" label="Description">
                <textarea id="category_desc" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the offerings in this category for the menu page..." />
              </Field>
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Category Status</span>
                  <p className="text-xs text-zinc-500">Set whether this category is visible in the shop.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${isActive ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Media</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Upload the visual identity for your new pizza category.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <UploadCard title="Category Icon" description="A square image used in menu lists and filters (1:1 ratio)." icon={Camera} />
                <UploadCard title="Hero Banner" description="Large format banner displayed at the top of the category page (16:9 ratio)." icon={Image} wide />
                <div className="md:col-span-12 bg-white dark:bg-zinc-900 border-l-4 border-[var(--primary)] p-4 rounded-lg shadow-sm flex items-start gap-3">
                  <Lightbulb className="text-[var(--primary)] mt-1 shrink-0" size={20} />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">Photography Tips</span>
                    Use natural lighting and keep the product as the focus of the frame.
                  </p>
                </div>
                <div className="md:col-span-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 overflow-hidden">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">Style Inspiration</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {inspirationImages.map((src, index) => (
                      <div key={src} className="aspect-square rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`Inspiration ${index + 1}`} src={src} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-l-4 border-[var(--primary)] pl-3">Attributes</h2>
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field id="parent-category" label="Parent Category">
                    <div className="relative">
                      <select id="parent-category" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} className={`${inputClass} h-10 appearance-none`}>
                        <option value="">None (Top Level)</option>
                        <option value="pizzas">Pizzas</option>
                        <option value="sides">Sides & Appetizers</option>
                        <option value="beverages">Beverages</option>
                        <option value="desserts">Desserts</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" size={18} />
                    </div>
                  </Field>
                  <Field id="display-priority" label="Display Priority">
                    <input id="display-priority" type="number" value={displayPriority} onChange={(e) => setDisplayPriority(e.target.value)} className={`${inputClass} h-10`} />
                  </Field>
                </div>
                <div className="space-y-3">
                  <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Badges</span>
                  <div className="flex flex-wrap gap-2">
                    {badgeOptions.map((badge) => (
                      <button key={badge} onClick={() => toggleBadge(badge)} className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${selectedBadges.includes(badge) ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">SEO</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Tune search metadata and preview the public result.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
                  <Field id="meta-title" label="Meta Title">
                    <input id="meta-title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputClass} placeholder="Best Vegetarian Pizza Categories" />
                  </Field>
                  <Field id="meta-desc" label="Meta Description">
                    <textarea id="meta-desc" rows="4" value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe this category for search engines..." />
                  </Field>
                  <Field id="canonical-url" label="Canonical URL">
                    <div className="flex flex-col sm:flex-row sm:items-center border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all bg-white dark:bg-zinc-950">
                      <span className="bg-zinc-50 dark:bg-zinc-900/50 px-3 py-2 sm:h-10 flex items-center text-zinc-500 dark:text-zinc-400 text-xs border-b sm:border-b-0 sm:border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">papavegpizza.com/menu/</span>
                      <input id="canonical-url" type="text" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} className="flex-1 w-full h-10 px-3 bg-transparent text-zinc-900 dark:text-zinc-100 outline-none text-sm" placeholder="category-name" />
                    </div>
                  </Field>
                </div>
                <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                    <Search className="text-[var(--primary)]" size={20} /> Search Preview
                  </h3>
                  <div className="border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 shadow-inner overflow-hidden">
                    <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6]">https://papavegpizza.com/menu/{canonicalUrl || slug || "..."}</span>
                    <h4 className={`text-lg leading-tight my-1 truncate font-sans ${metaTitle ? "text-[#1a0dab] dark:text-[#8ab4f8]" : "text-[#1a0dab]/50 dark:text-[#8ab4f8]/50"}`}>{metaTitle || "Enter a Meta Title..."}</h4>
                    <p className={`text-sm leading-snug line-clamp-2 font-sans ${metaDesc ? "text-[#4d5156] dark:text-[#bdc1c6]" : "text-[#4d5156]/50 dark:text-[#bdc1c6]/50"}`}>{metaDesc || "Start typing a meta description to preview the search result snippet."}</p>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500">
                    <p className="text-sm text-amber-900 dark:text-amber-200/80">
                      <Lightbulb className="inline mr-2 text-amber-500" size={16} /> Include keywords like Vegetarian, Pizza, and Healthy for better ranking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Review & Finalize</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Verify category details before publishing to the live menu.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <SummaryCard title="Basic Details" icon={Info} step={1} className="md:col-span-7" setCurrentStep={setCurrentStep}>
                  <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">{categoryName || "Not Set"}</p>
                  <span className={`inline-flex mt-3 px-2.5 py-0.5 rounded-full text-xs font-bold ${isActive ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>{isActive ? "Active" : "Inactive"}</span>
                </SummaryCard>
                <SummaryCard title="Attributes" icon={Tag} step={3} className="md:col-span-5" setCurrentStep={setCurrentStep}>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Priority: {displayPriority || 10}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedBadges.map((badge) => (
                      <span key={badge} className="px-2 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700">{badge}</span>
                    ))}
                  </div>
                </SummaryCard>
                <SummaryCard title="SEO Metadata" icon={Search} step={4} className="md:col-span-12" setCurrentStep={setCurrentStep}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{metaTitle || `${categoryName || "Category"} | Papa Veg Pizza`}</p>
                    <p className="text-sm font-mono bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 break-all">/menu/{canonicalUrl || slug || "..."}</p>
                    <p className="md:col-span-2 text-sm text-zinc-600 dark:text-zinc-400 italic">"{metaDesc || description || `Discover our collection of ${categoryName || "pizza categories"}.`}"</p>
                  </div>
                </SummaryCard>
                <div className="md:col-span-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-dashed border-zinc-300 dark:border-zinc-700">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <ClipboardCheck className="text-[var(--primary)]" size={20} /> Final Validation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Visible on App", "Menu Assigned", "Tags Verified"].map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                        <div className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 p-1.5 rounded-full shrink-0">
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
          <button onClick={currentStep === 1 ? onClose : () => moveStep(-1)} className="px-4 py-2 rounded-lg text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
            {currentStep > 1 && <ArrowLeft size={16} />}
            {currentStep === 1 ? "Cancel" : "Previous"}
          </button>
          <button onClick={currentStep === 5 ? onClose : () => moveStep(1)} className={`${currentStep === 5 ? "bg-emerald-600" : "bg-[var(--primary)]"} text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2`}>
            {currentStep === 5 ? "Save Category" : "Next Step"}
            {currentStep === 5 ? <Check size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
