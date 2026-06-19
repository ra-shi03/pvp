import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Info,
  Minus,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";

const fieldClass =
  "w-full h-10 px-3 border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-zinc-100 border rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600";

const toppings = [
  {
    name: "Paneer Tikka",
    price: "$1.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCq_6oesPdC5jO9ffJI1HC7o_ccmb0NQa053a61z7r9anIuayUHfZZ8aGFeZ1OTYEg7vfyh71AE7WL-U5pJHKzrGD0ubl3NWcucvs5B9joXOXuJgFlmEmjQaM4CTXyI6uf6eZcX-DmThjNsy4t9L_MIREgyraPilWLBWYssUinksR-madvArINYLYPQ6oeIW-25NSBFTsABulDqlWoAK9S3dXAKs99p3ePcUjBv7Te_bu5MrVRbVRxh0LZr0M_lFOwLxuj-c9lXi38",
  },
  {
    name: "Extra Mozzarella",
    price: "$2.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjBm67kuPYZnxc2dDNhnpcHRHsCyaakQvo40NR6v8jNfhdMv08Efcm2Q8_t8Jk8A3lRqyywfyIZhCi3P_2P6dKiNL3WzGcImgeXY5mbD1YMA6RvV5tXA2DTab8YCDKwf6zU7nnPLO5_lNdchrWntXOVdhfsWoD4VvVDgBt58qvqAhz3BiWyUjwfdbv23-TDzPnWtpOYSy3k8l-hXh5jsb6vCXx95J5dRQvX7OMvetaov_EBxCMui1_aFZAfJTKKEHapeQCdLFzOFU",
  },
  {
    name: "Garlic Mayo Dip",
    price: "$0.75",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoBhoyqPMKUX9SQGtrdDaY29sttdfAiS9jUnKNYOwfwZymSpLO-WcFK-2NaCOOro_X4c3k_LKQSMJhrBu4E75cZlX0yQF2RZTXcabcPcxsQl97CDN2bXhy9iPDC6_NKCMrfFQcLXhiaL-7B26r6gWxbUKlwgm2pCAw5nEaGtjWice-Mys_i4UKu4hjhkcGyZkOxjMUFNTkttbAnK7AbqDUWpjynB2zPVwtod11z0NOTs8bQboZpY2wweozcd6GcxguE_wQ3Hn1ztE",
  },
];

function Section({ icon: Icon, title, className = "", children }) {
  return (
    <section className={`bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-[var(--primary)]" size={18} />
        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function NumberStepper({ label, value, setValue }) {
  const changeBy = (amount) => setValue(Math.max(0, value + amount));

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</label>
      <div className="flex items-center">
        <button
          onClick={() => changeBy(-1)}
          className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-l-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-100 dark:active:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
        >
          <Minus size={16} />
        </button>
        <input
          className="w-full h-9 text-center bg-transparent border-y border-zinc-200 dark:border-zinc-800 focus:ring-0 outline-none tabular-nums dark:text-zinc-100"
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)}
        />
        <button
          onClick={() => changeBy(1)}
          className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-r-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-100 dark:active:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-[var(--primary)]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]" />
    </label>
  );
}

function ToppingRow({ topping }) {
  return (
    <tr className="hover:bg-[var(--primary)]/5 dark:hover:bg-zinc-800/80 transition-colors group">
      <td className="px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
            <img alt={topping.name} className="w-full h-full object-cover" src={topping.image} />
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{topping.name}</span>
        </div>
      </td>
      <td className="px-3 py-2 tabular-nums text-zinc-500 dark:text-zinc-400">{topping.price}</td>
      <td className="px-3 py-2 text-right">
        <button aria-label="Remove" className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors active:scale-90">
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}

export default function AddGroupAddons({ isOpen, onClose }) {
  const [minSelections, setMinSelections] = useState(0);
  const [maxSelections, setMaxSelections] = useState(1);
  const [isRequired, setIsRequired] = useState(true);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    setPortalTarget(document.getElementById("admin-main-content"));
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="absolute inset-0 z-[60] flex items-center justify-center sm:p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl bg-white dark:bg-zinc-900 sm:rounded-xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <header className="h-12 flex items-center justify-between px-3 sm:px-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} aria-label="Close" className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors active:scale-90">
              <X className="text-zinc-500 dark:text-zinc-400" size={18} />
            </button>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Create Add-on Group</h1>
          </div>
          <button className="bg-[var(--primary)] text-white font-bold text-sm px-4 py-1.5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm hidden sm:block">
            Save
          </button>
        </header>

        <main className="flex-1 overflow-y-auto hide-scrollbar p-3 sm:p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950">
          <Section icon={Info} title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["group-name", "Group Name", "e.g., Veggie Toppings"],
                ["internal-desc", "Internal Description (Optional)", "Notes for kitchen staff"],
              ].map(([id, label, placeholder]) => (
                <div key={id} className="space-y-1">
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400" htmlFor={id}>
                    {label}
                  </label>
                  <input className={fieldClass} id={id} placeholder={placeholder} type="text" />
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Settings} title="Selection Rules" className="border-t-4 border-t-amber-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <NumberStepper label="Minimum Selections" value={minSelections} setValue={setMinSelections} />
              <NumberStepper label="Maximum Selections" value={maxSelections} setValue={setMaxSelections} />
              <div className="flex items-center justify-between p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 mt-4 md:mt-0">
                <span className="text-sm text-zinc-900 dark:text-zinc-100">Required Group</span>
                <Toggle checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} />
              </div>
            </div>
          </Section>

          <Section icon={PlusCircle} title="Toppings in Group" className="min-h-[280px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 mb-4">
              <div className="relative flex-1 sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  className="w-full h-9 pl-10 pr-4 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 border rounded-full focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none text-sm dark:text-zinc-100"
                  placeholder="Search and add toppings..."
                  type="text"
                />
              </div>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2">Topping Name</th>
                    <th className="px-3 py-2">Base Price</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {toppings.map((topping) => (
                    <ToppingRow key={topping.name} topping={topping} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center py-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
              <UtensilsCrossed className="text-zinc-300 dark:text-zinc-600 mb-2" size={28} />
              <p className="text-zinc-500 dark:text-zinc-400 text-sm text-center">
                Use the search bar above to link existing toppings <br /> to this new group.
              </p>
            </div>
          </Section>
        </main>

        <footer className="sm:hidden p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex gap-3 shrink-0">
          <button onClick={onClose} className="flex-1 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold py-2 rounded-lg active:scale-95 transition-transform text-sm">
            Cancel
          </button>
          <button className="flex-1 bg-[var(--primary)] text-white font-bold py-2 rounded-lg shadow-md active:scale-95 transition-transform text-sm">
            Save Group
          </button>
        </footer>
      </div>
    </div>
  );

  return portalTarget ? createPortal(modalContent, portalTarget) : modalContent;
}
