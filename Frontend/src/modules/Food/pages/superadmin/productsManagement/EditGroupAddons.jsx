import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Info, Settings, Search, PlusCircle, Trash2, UtensilsCrossed, Minus, Plus } from 'lucide-react';

export default function EditGroupAddons({ isOpen, onClose, group }) {
  const [groupName, setGroupName] = useState('');
  const [minSelections, setMinSelections] = useState(0);
  const [maxSelections, setMaxSelections] = useState(1);
  const [isRequired, setIsRequired] = useState(true);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    const target = document.getElementById('admin-main-content');
    if (target) {
      setPortalTarget(target);
    }
  }, [isOpen]);

  useEffect(() => {
    if (group) {
      setGroupName(group.name || '');
      setMinSelections(group.min !== undefined ? group.min : 0);
      setMaxSelections(group.max !== undefined ? group.max : 1);
    }
  }, [group]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="absolute inset-0 z-[60] flex items-center justify-center sm:p-6 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-4xl bg-white dark:bg-zinc-900 sm:rounded-xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-4 sm:px-5 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              aria-label="Close" 
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors active:scale-90"
            >
              <X className="text-zinc-500 dark:text-zinc-400" size={18} />
            </button>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Edit Add-on Group</h1>
          </div>
          <button className="bg-[var(--primary)] text-white font-bold text-sm px-5 py-1.5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm hidden sm:block">
            Save Changes
          </button>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto hide-scrollbar p-4 sm:p-5 space-y-4 bg-zinc-50 dark:bg-zinc-950">
          {/* Section 1: Basic Information */}
          <section className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-[var(--primary)]" size={18} />
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" htmlFor="group-name">Group Name</label>
                <input 
                  className="w-full h-10 px-3 text-sm border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-zinc-100 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" 
                  id="group-name" 
                  placeholder="e.g., Veggie Toppings" 
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" htmlFor="internal-desc">Internal Description (Optional)</label>
                <input 
                  className="w-full h-10 px-3 text-sm border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-zinc-100 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" 
                  id="internal-desc" 
                  placeholder="Notes for kitchen staff" 
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Selection Rules */}
          <section className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm border-t-4 border-t-amber-500">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="text-[var(--primary)]" size={18} />
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Selection Rules</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Minimum Selections</label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setMinSelections(Math.max(0, minSelections - 1))}
                    className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-l-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-100 dark:active:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  >
                    <Minus size={14} />
                  </button>
                  <input 
                    className="w-full h-9 text-center bg-transparent border-y border-zinc-200 dark:border-zinc-800 focus:ring-0 outline-none tabular-nums dark:text-zinc-100 text-sm" 
                    type="number" 
                    value={minSelections}
                    onChange={(e) => setMinSelections(parseInt(e.target.value) || 0)}
                  />
                  <button 
                    onClick={() => setMinSelections(minSelections + 1)}
                    className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-r-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-100 dark:active:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Maximum Selections</label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setMaxSelections(Math.max(0, maxSelections - 1))}
                    className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-l-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-100 dark:active:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  >
                    <Minus size={14} />
                  </button>
                  <input 
                    className="w-full h-9 text-center bg-transparent border-y border-zinc-200 dark:border-zinc-800 focus:ring-0 outline-none tabular-nums dark:text-zinc-100 text-sm" 
                    type="number" 
                    value={maxSelections}
                    onChange={(e) => setMaxSelections(parseInt(e.target.value) || 0)}
                  />
                  <button 
                    onClick={() => setMaxSelections(maxSelections + 1)}
                    className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-r-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-100 dark:active:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 mt-4 md:mt-0 h-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Required Group</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isRequired}
                    onChange={(e) => setIsRequired(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-[var(--primary)]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Section 3: Add Toppings to Group */}
          <section className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[300px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="text-[var(--primary)]" size={18} />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Toppings in Group</h2>
              </div>
              <div className="relative flex-1 sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input 
                  className="w-full h-9 pl-9 pr-3 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 border rounded-full focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none text-sm dark:text-zinc-100" 
                  placeholder="Search and add toppings..." 
                  type="text"
                />
              </div>
            </div>

            {/* Selected Items Table/List */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2">Topping Name</th>
                    <th className="px-3 py-2">Base Price</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {/* Item 1 */}
                  <tr className="hover:bg-[var(--primary)]/5 dark:hover:bg-zinc-800/80 transition-colors group">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                          <img 
                            alt="Paneer Tikka" 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq_6oesPdC5jO9ffJI1HC7o_ccmb0NQa053a61z7r9anIuayUHfZZ8aGFeZ1OTYEg7vfyh71AE7WL-U5pJHKzrGD0ubl3NWcucvs5B9joXOXuJgFlmEmjQaM4CTXyI6uf6eZcX-DmThjNsy4t9L_MIREgyraPilWLBWYssUinksR-madvArINYLYPQ6oeIW-25NSBFTsABulDqlWoAK9S3dXAKs99p3ePcUjBv7Te_bu5MrVRbVRxh0LZr0M_lFOwLxuj-c9lXi38"
                          />
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Paneer Tikka</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 tabular-nums text-sm text-zinc-500 dark:text-zinc-400">$1.50</td>
                    <td className="px-3 py-2 text-right">
                      <button aria-label="Remove" className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors active:scale-90">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                  {/* Item 2 */}
                  <tr className="hover:bg-[var(--primary)]/5 dark:hover:bg-zinc-800/80 transition-colors group">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                          <img 
                            alt="Extra Mozzarella" 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjBm67kuPYZnxc2dDNhnpcHRHsCyaakQvo40NR6v8jNfhdMv08Efcm2Q8_t8Jk8A3lRqyywfyIZhCi3P_2P6dKiNL3WzGcImgeXY5mbD1YMA6RvV5tXA2DTab8YCDKwf6zU7nnPLO5_lNdchrWntXOVdhfsWoD4VvVDgBt58qvqAhz3BiWyUjwfdbv23-TDzPnWtpOYSy3k8l-hXh5jsb6vCXx95J5dRQvX7OMvetaov_EBxCMui1_aFZAfJTKKEHapeQCdLFzOFU"
                          />
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Extra Mozzarella</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 tabular-nums text-sm text-zinc-500 dark:text-zinc-400">$2.00</td>
                    <td className="px-3 py-2 text-right">
                      <button aria-label="Remove" className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors active:scale-90">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Empty State Hint */}
            <div className="mt-4 flex flex-col items-center justify-center py-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
              <UtensilsCrossed className="text-zinc-300 dark:text-zinc-600 mb-2" size={32} />
              <p className="text-zinc-500 dark:text-zinc-400 text-xs text-center">
                Use the search bar above to link existing toppings <br/> to this new group.
              </p>
            </div>
          </section>
        </main>

        {/* Bottom Actions (Mobile) */}
        <footer className="sm:hidden p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold py-3 rounded-lg active:scale-95 transition-transform text-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[var(--primary)] text-white font-bold py-3 rounded-lg shadow-md active:scale-95 transition-transform text-sm">
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  );

  return portalTarget ? createPortal(modalContent, portalTarget) : modalContent;
}
