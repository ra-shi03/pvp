import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Download, MoreVertical, AlertTriangle, Minus, ArrowDown } from 'lucide-react';

const initialTickets = [
  { id: '#SF-9042', subject: 'Late delivery dispute - Franchise #22', requester: 'Aleksei Miller', requesterInitials: 'AM', requesterColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400', status: 'Escalated', priority: 'Critical', lastUpdate: '2 mins ago' },
  { id: '#SF-8931', subject: 'Rider app login failure (Android 14)', requester: 'Jane Doe', requesterInitials: 'JD', requesterColor: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400', status: 'In Progress', priority: 'Medium', lastUpdate: '14 mins ago' },
  { id: '#SF-8812', subject: 'Billing error on bulk internal order', requester: 'Marco Silva', requesterInitials: 'MS', requesterColor: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400', status: 'Pending', priority: 'Low', lastUpdate: '45 mins ago' },
];

const TicketData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Debounce logic for filter/search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredTickets = useMemo(() => {
    return initialTickets.filter(ticket => 
      ticket.subject.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      ticket.requester.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      ticket.status.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      ticket.priority.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm]);

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Active Escalations</h3>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-auto">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input 
                    type="text" 
                    placeholder="Search tickets..." 
                    className="pl-9 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-full sm:w-64 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <Download className="w-4 h-4" /> Export
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Ticket ID</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4 whitespace-nowrap">Requester</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Priority</th>
              <th className="px-6 py-4 whitespace-nowrap">Last Update</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
            {filteredTickets.map((ticket, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-[var(--primary)] font-bold whitespace-nowrap">{ticket.id}</td>
                    <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100">{ticket.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-semibold ${ticket.requesterColor}`}>
                                {ticket.requesterInitials}
                            </div>
                            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{ticket.requester}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            ticket.status === 'Escalated' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' :
                            ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                            'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                        }`}>
                            {ticket.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-1 ${
                            ticket.priority === 'Critical' ? 'text-red-500' : 
                            ticket.priority === 'Medium' ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-500'
                        }`}>
                            {ticket.priority === 'Critical' && <AlertTriangle className="w-4 h-4" />}
                            {ticket.priority === 'Medium' && <Minus className="w-4 h-4" />}
                            {ticket.priority === 'Low' && <ArrowDown className="w-4 h-4" />}
                            <span className="text-xs font-bold">{ticket.priority}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{ticket.lastUpdate}</td>
                    <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </td>
                </tr>
            ))}
            {filteredTickets.length === 0 && (
                <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400">
                            <Search className="w-8 h-8 mb-2 opacity-50" />
                            <p className="text-sm font-medium">No tickets found matching "{searchTerm}"</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TicketData;
