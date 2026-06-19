import React from 'react';
import { X, Package, Store, MapPin, Bike, Car, Star, Info, ChevronLeft, ChevronRight, Bot } from 'lucide-react';

export default function AssignRider({ isOpen, onClose, orderId }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Modal Container */}
            <div className="bg-white dark:bg-zinc-900 w-full max-w-[760px] max-h-[90vh] rounded-xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col mx-4 transform transition-all">
                
                {/* Modal Header */}
                <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/50">
                    <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">Assign Rider to Order</h3>
                        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">Searching for optimal fleet matching...</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-grow p-3.5 flex flex-col gap-4">
                    {/* Order Summary Card */}
                    <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-3.5 items-start shadow-sm">
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5 tracking-wider">Order ID</p>
                                <div className="flex items-center gap-2">
                                    <Package size={16} className="text-[var(--primary)]" />
                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{orderId || '#ORD-88291-LX'}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5 tracking-wider">Store / Merchant</p>
                                <div className="flex items-center gap-2">
                                    <Store size={16} className="text-emerald-500" />
                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Premium Electronics Hub</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5 tracking-wider">Delivery Zone</p>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-500" />
                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">North Tech District (B-4)</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 shadow-sm shrink-0">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                            <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">Priority: Express</span>
                        </div>
                    </div>

                    {/* Available Riders Table */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Available Riders</h4>
                            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">Sorted by: Optimal Distance & Load</span>
                            </div>
                        </div>
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50/80 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                                        <th className="p-2 text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">Rider Profile</th>
                                        <th className="p-2 text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">Distance</th>
                                        <th className="p-2 text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">Active Load</th>
                                        <th className="p-2 text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">Vehicle / Rating</th>
                                        <th className="p-2 text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                                    {/* Rider Row 1 */}
                                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="p-2">
                                            <div className="flex items-center gap-2.5">
                                                <div className="relative shrink-0">
                                                    <img alt="Rider Photo" className="w-8 h-8 rounded-full object-cover bg-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-sm" src="https://i.pravatar.cc/150?img=11" />
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Marco Russo</p>
                                                    <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">ID: RID-4421</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-[var(--primary)]">0.8 km</span>
                                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">~4 mins away</span>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-1 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                                    <div className="bg-zinc-500 dark:bg-zinc-400 h-full w-1/3 rounded-full"></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">1/3 slots</span>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1">
                                                    <Bike size={12} className="text-zinc-500 dark:text-zinc-400" />
                                                    <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">E-Bike Pro</span>
                                                </div>
                                                <div className="flex items-center text-amber-500 gap-0.5">
                                                    <Star size={10} className="fill-current" />
                                                    <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-500">4.9</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 text-right">
                                            <button className="px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold hover:bg-[var(--primary-hover)] active:scale-95 transition-all shadow-sm">
                                                Assign Rider
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Rider Row 2 */}
                                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="p-2">
                                            <div className="flex items-center gap-2.5">
                                                <div className="relative shrink-0">
                                                    <img alt="Rider Photo" className="w-8 h-8 rounded-full object-cover bg-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-sm" src="https://i.pravatar.cc/150?img=5" />
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Sarah Chen</p>
                                                    <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">ID: RID-5029</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-[var(--primary)]">1.4 km</span>
                                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">~7 mins away</span>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-1 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                                    <div className="bg-zinc-500 dark:bg-zinc-400 h-full w-0 rounded-full"></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">0/3 slots</span>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1">
                                                    <Bike size={12} className="text-zinc-500 dark:text-zinc-400" />
                                                    <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Motorcycle X1</span>
                                                </div>
                                                <div className="flex items-center text-amber-500 gap-0.5">
                                                    <Star size={10} className="fill-current" />
                                                    <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-500">4.7</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 text-right">
                                            <button className="px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold hover:bg-[var(--primary-hover)] active:scale-95 transition-all shadow-sm">
                                                Assign Rider
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Rider Row 3 */}
                                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="p-2">
                                            <div className="flex items-center gap-2.5">
                                                <div className="relative shrink-0">
                                                    <img alt="Rider Photo" className="w-8 h-8 rounded-full object-cover bg-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-sm" src="https://i.pravatar.cc/150?img=12" />
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">David Okoro</p>
                                                    <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">ID: RID-2118</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-[var(--primary)]">2.2 km</span>
                                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">~12 mins away</span>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-1 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                                    <div className="bg-zinc-500 dark:bg-zinc-400 h-full w-2/3 rounded-full"></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">2/3 slots</span>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1">
                                                    <Car size={12} className="text-zinc-500 dark:text-zinc-400" />
                                                    <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Van (L)</span>
                                                </div>
                                                <div className="flex items-center text-amber-500 gap-0.5">
                                                    <Star size={10} className="fill-current" />
                                                    <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-500">4.8</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 text-right">
                                            <button className="px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold hover:bg-[var(--primary-hover)] active:scale-95 transition-all shadow-sm">
                                                Assign Rider
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination/Status Footer */}
                    <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-955/50 rounded-xl p-2 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 ml-1">
                            <Info size={14} className="text-blue-500" />
                            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 italic">Optimization engine updated 12 seconds ago.</p>
                        </div>
                        <div className="flex gap-1">
                            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-50 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors shadow-sm" disabled>
                                <ChevronLeft size={14} />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors shadow-sm">
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex justify-end gap-2.5">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm active:scale-95"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-xs font-extrabold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm">
                        <Bot size={14} />
                        Auto-Assign Best
                    </button>
                </div>
            </div>
        </div>
    );
}
