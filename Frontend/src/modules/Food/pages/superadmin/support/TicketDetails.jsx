import React, { useState, useEffect, useRef } from 'react';
import { 
    ArrowLeft, MoreVertical, AlertTriangle, Clock, Reply, UserPlus, CheckCircle, 
    Calendar, ShoppingBag, CreditCard, ExternalLink, MessageSquare, Image as ImageIcon,
    Paperclip, Send, StickyNote, Zap
} from 'lucide-react';

const TicketDetails = ({ ticketId, onBack, onAssignClick, onEscalateClick, onStatusClick }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [isMobile, setIsMobile] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [activeTab]);

    return (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm min-h-[500px] animate-in fade-in duration-300">
            {/* Header for mobile back button */}
            <div className="w-full md:hidden flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-800">
                <button onClick={onBack} className="p-1.5 -ml-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <ArrowLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </button>
                <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-50">Ticket Details</span>
                <button className="p-1.5 -mr-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <MoreVertical className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </button>
            </div>

            {/* Left Side: Tabs & Details */}
            <aside className={`w-full md:w-[320px] border-r border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden ${isMobile && activeTab === 'timeline' ? 'hidden' : 'flex'}`}>
                {/* Desktop Back Header */}
                <div className="hidden md:flex items-center gap-1.5 p-2.5 border-b border-zinc-200 dark:border-zinc-800">
                    <button onClick={onBack} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-50">Back to Queue</span>
                </div>

                {/* Tabs Navigation */}
                <nav className="flex border-b border-zinc-200 dark:border-zinc-800 px-3 pt-2.5 gap-4 overflow-x-auto hide-scrollbar">
                    <button onClick={() => setActiveTab('info')} className={`pb-2 text-xs font-semibold whitespace-nowrap transition-colors ${activeTab === 'info' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'}`}>Info</button>
                    <button onClick={() => setActiveTab('customer')} className={`pb-2 text-xs font-semibold whitespace-nowrap transition-colors ${activeTab === 'customer' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'}`}>Customer</button>
                    <button onClick={() => setActiveTab('timeline')} className={`pb-2 text-xs font-semibold whitespace-nowrap transition-colors md:hidden ${activeTab === 'timeline' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'}`}>Conversation</button>
                </nav>

                {/* Tab Panels */}
                <div className="flex-1 overflow-y-auto p-3.5">
                    {/* Panel: Info */}
                    {activeTab === 'info' && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="space-y-2.5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Ticket ID</p>
                                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-0.5">{ticketId || '#SF-9042'}</h2>
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 px-2 py-0.5 rounded-full text-[10px] font-bold">OPEN</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2.5 border border-zinc-100 dark:border-zinc-800">
                                        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Priority</p>
                                        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                                            <AlertTriangle className="w-3.5 h-3.5" />
                                            <span className="font-bold text-xs">Urgent</span>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2.5 border border-zinc-100 dark:border-zinc-800">
                                        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">SLA Deadline</p>
                                        <div className="flex items-center gap-1.5 text-[var(--primary)] font-bold text-xs">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>2h 14m</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Quick Actions */}
                                <div className="pt-2.5 space-y-2">
                                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-1">Quick Actions</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] text-zinc-600 dark:text-zinc-300 transition-all group">
                                            <Reply className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-[9px] font-bold uppercase">Reply</span>
                                        </button>
                                        <button onClick={onAssignClick} className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] text-zinc-600 dark:text-zinc-300 transition-all group">
                                            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-[9px] font-bold uppercase">Assign</span>
                                        </button>
                                        <button onClick={onStatusClick} className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] text-zinc-600 dark:text-zinc-300 transition-all group">
                                            <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-[9px] font-bold uppercase">Status</span>
                                        </button>
                                        <button onClick={onEscalateClick} className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-red-200 dark:border-red-900/30 hover:bg-red-600 hover:text-white hover:border-red-600 text-red-600 dark:text-red-400 transition-all group">
                                            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-[9px] font-bold uppercase">Escalate</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Details List */}
                            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2.5 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 font-medium">Source</span>
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">Web Portal</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 font-medium">Assigned To</span>
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">Marcus Chen</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 font-medium">Created</span>
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">Oct 24, 10:30 AM</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Panel: Customer */}
                    {activeTab === 'customer' && (
                        <div className="space-y-5 animate-in fade-in duration-300">
                            <div className="flex flex-col items-center text-center space-y-2.5 pt-1">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-xl overflow-hidden shadow-sm">
                                        SJ
                                    </div>
                                    <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">Sarah Johnson</h3>
                                    <p className="text-[var(--primary)] font-semibold text-xs">Enterprise User</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2.5">
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2.5 flex items-center justify-between border border-zinc-100 dark:border-zinc-800 text-xs">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
                                        <span className="text-zinc-600 dark:text-zinc-400 font-medium">Member Since</span>
                                    </div>
                                    <span className="font-bold text-zinc-900 dark:text-zinc-50">Jan 2022</span>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2.5 flex items-center justify-between border border-zinc-100 dark:border-zinc-800 text-xs">
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="w-3.5 h-3.5 text-[var(--primary)]" />
                                        <span className="text-zinc-600 dark:text-zinc-400 font-medium">Total Orders</span>
                                    </div>
                                    <span className="font-bold text-zinc-900 dark:text-zinc-50">142</span>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2.5 flex items-center justify-between border border-zinc-100 dark:border-zinc-800 text-xs">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-3.5 h-3.5 text-[var(--primary)]" />
                                        <span className="text-zinc-600 dark:text-zinc-400 font-medium">Lifetime Spend</span>
                                    </div>
                                    <span className="font-bold text-zinc-900 dark:text-zinc-50">$12,450.00</span>
                                </div>
                            </div>
                            
                            <div className="pt-1">
                                <button className="w-full py-1.5 px-3 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 text-xs">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    View CRM Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Right Side: Conversation Timeline */}
            <section className={`flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden ${isMobile && activeTab !== 'timeline' ? 'hidden' : 'flex'}`}>
                {/* Timeline Header */}
                <div className="h-10 px-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                        {isMobile && (
                            <button onClick={() => setActiveTab('info')} className="mr-1.5 p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                        )}
                        <MessageSquare className="w-4 h-4 text-zinc-500" />
                        <span className="font-bold text-xs">Timeline History</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span> Customer</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Internal Note</span>
                    </div>
                </div>

                {/* Chat Area */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3.5 space-y-4 hide-scrollbar">
                    {/* System Event */}
                    <div className="flex justify-center">
                        <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[9px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Ticket Created • Oct 24, 10:30 AM</span>
                    </div>

                    {/* Customer Message */}
                    <div className="flex gap-2.5 max-w-[80%]">
                        <div className="w-6.5 h-6.5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0">SJ</div>
                        <div className="space-y-0.5">
                            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl rounded-tl-none p-2.5 shadow-sm">
                                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-normal">Hello Support Team, I'm having trouble accessing my dashboard after the latest update. Every time I try to log in, I get a '500 Server Error' message. Could you please investigate?</p>
                            </div>
                            <span className="text-[9px] text-zinc-500 font-medium pl-1">Sarah Johnson • 10:32 AM</span>
                        </div>
                    </div>

                    {/* Admin Reply */}
                    <div className="flex gap-2.5 max-w-[80%] ml-auto flex-row-reverse">
                        <div className="w-6.5 h-6.5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[10px] font-bold text-blue-700 dark:text-blue-300 flex-shrink-0">MC</div>
                        <div className="space-y-0.5 items-end flex flex-col">
                            <div className="bg-[var(--primary)] text-white rounded-xl rounded-tr-none p-2.5 shadow-md">
                                <p className="text-xs leading-normal">Hi Sarah, I'm sorry to hear that. Let me check our logs to see what's causing that 500 error. I'll get back to you shortly.</p>
                            </div>
                            <span className="text-[9px] text-zinc-500 font-medium pr-1">Marcus Chen • 10:45 AM</span>
                        </div>
                    </div>

                    {/* Internal Note */}
                    <div className="flex justify-center px-2">
                        <div className="w-full max-w-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-lg p-2.5 flex gap-2 items-start relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                            <StickyNote className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                                <p className="font-bold text-[10px] uppercase tracking-tight text-orange-700 dark:text-orange-400">Internal Note</p>
                                <p className="text-xs text-orange-900 dark:text-orange-200 italic leading-normal">"Confirmed server logs show a database connection timeout for Sarah's shard. Escalating to DevOps for immediate restart."</p>
                                <p className="text-[9px] text-orange-600/70 dark:text-orange-400/70 font-medium pt-0.5">Added by Marcus Chen • 10:48 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Attachment Message */}
                    <div className="flex gap-2.5 max-w-[80%]">
                        <div className="w-6.5 h-6.5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0">SJ</div>
                        <div className="space-y-1.5">
                            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl rounded-tl-none p-2.5 shadow-sm">
                                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-normal">Thanks, Marcus. Here is a screenshot of the error page I'm seeing.</p>
                            </div>
                            <div className="bg-white dark:bg-zinc-800 rounded-lg p-1.5 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2 w-52 group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors shadow-sm">
                                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded flex items-center justify-center flex-shrink-0">
                                    <ImageIcon className="w-4 h-4 text-zinc-500" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-50 truncate">error_log_001.webp</p>
                                    <p className="text-[9px] text-zinc-500 font-medium">1.2 MB</p>
                                </div>
                            </div>
                            <span className="text-[9px] text-zinc-500 font-medium pl-1">Sarah Johnson • 11:02 AM</span>
                        </div>
                    </div>
                </div>

                {/* Message Input Area */}
                <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex gap-2 mb-2">
                        <button className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 transition-colors">Public Reply</button>
                        <button className="px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-500/20 dark:hover:text-orange-400 transition-colors">Internal Note</button>
                    </div>
                    <div className="relative">
                        <textarea className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 pr-20 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent min-h-[70px] resize-none text-xs text-zinc-900 dark:text-zinc-50 transition-colors" placeholder="Type your message here..."></textarea>
                        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                            <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                                <Paperclip className="w-4 h-4" />
                            </button>
                            <button className="bg-[var(--primary)] text-white p-1.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center">
                                <Send className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TicketDetails;
