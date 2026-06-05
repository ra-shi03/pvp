import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Edit, Copy, Trash2 } from 'lucide-react';

export default function RolesPermissionTable({ rolesList, onPreviewRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [scopeFilter, setScopeFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, statusFilter, scopeFilter]);

  const filteredRoles = useMemo(() => {
    return rolesList.filter(role => {
       const matchSearch = role.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                           role.subtitle.toLowerCase().includes(debouncedSearch.toLowerCase());
       const matchType = typeFilter === "All" || typeFilter.includes(role.type);
       const matchStatus = statusFilter === "All" || statusFilter.includes(role.status);
       const matchScope = scopeFilter === "All" || scopeFilter.includes(role.scope);
       
       return matchSearch && matchType && matchStatus && matchScope;
    });
  }, [rolesList, debouncedSearch, typeFilter, statusFilter, scopeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRoles.length / itemsPerPage));
  const paginatedRoles = filteredRoles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      {/* Filters */}
      <div className="p-4 md:p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50">
         <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input 
               className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 focus:border-[var(--primary)] focus:ring-0 outline-none transition-colors" 
               placeholder="Search roles, users, or permissions..." 
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex items-center gap-3">
            <select 
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg py-2.5 px-4 text-sm focus:border-[var(--primary)] focus:ring-0 outline-none cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
               <option value="All">Role Type: All</option>
               <option value="System">System</option>
               <option value="Custom">Custom</option>
            </select>
            <select 
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg py-2.5 px-4 text-sm focus:border-[var(--primary)] focus:ring-0 outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
               <option value="All">Status: All</option>
               <option value="Active">Active</option>
               <option value="Inactive">Inactive</option>
               <option value="Suspended">Suspended</option>
            </select>
            <select 
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg py-2.5 px-4 text-sm focus:border-[var(--primary)] focus:ring-0 outline-none cursor-pointer"
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
            >
               <option value="All">Scope: All</option>
               <option value="Global">Global</option>
               <option value="Franchise">Franchise</option>
               <option value="Store">Store</option>
            </select>
            <button className="p-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
               <Filter size={20} />
            </button>
         </div>
      </div>
      
      {/* Data Table */}
      <div className="overflow-x-auto scrollbar-thin">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Role Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Permissions</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Scope</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
               {paginatedRoles.length > 0 ? (
                 paginatedRoles.map((role) => (
                   <tr key={role.id} className="hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10 transition-colors group">
                      <td className="px-6 py-3 cursor-pointer" onClick={() => onPreviewRole(role)}>
                         <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-[var(--primary)] transition-colors">{role.name}</div>
                         <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{role.subtitle}</div>
                      </td>
                      <td className="px-6 py-3">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${role.type === 'System' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300' : 'bg-red-50 dark:bg-red-900/20 text-[var(--primary)]'}`}>{role.type}</span>
                      </td>
                      <td className="px-6 py-3 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{role.users}</td>
                      <td className="px-6 py-3 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                         {role.permissionsCount} {role.permissionsTotal ? `/ ${role.permissionsTotal}` : ''}
                      </td>
                      <td className="px-6 py-3 text-xs text-zinc-700 dark:text-zinc-300">{role.scope}</td>
                      <td className="px-6 py-3">
                         <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${role.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : role.status === 'Suspended' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
                            {role.status}
                         </span>
                      </td>
                      <td className="px-6 py-3 text-right space-x-1">
                         <button onClick={() => onPreviewRole(role)} className="text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 p-1.5 rounded-lg transition-colors"><Eye size={18} /></button>
                         <button className="text-zinc-400 hover:text-[var(--primary)] p-1.5 rounded-lg transition-colors"><Edit size={18} /></button>
                         <button className="text-zinc-400 hover:text-[var(--primary)] p-1.5 rounded-lg transition-colors"><Copy size={18} /></button>
                         {role.type !== 'System' && (
                           <button className="text-zinc-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors"><Trash2 size={18} /></button>
                         )}
                      </td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan="7" className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                     No roles match the selected filters.
                   </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
      
      {/* Pagination */}
      {filteredRoles.length > 0 && (
        <div className="px-6 py-4 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
           <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRoles.length)} of {filteredRoles.length} roles
           </div>
           <div className="flex items-center gap-1">
              <button 
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 disabled={currentPage === 1}
                 className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
              >
                 <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                 <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-colors ${currentPage === i + 1 ? 'bg-[var(--primary)] text-white' : 'border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                 >
                    {i + 1}
                 </button>
              ))}
              <button 
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 disabled={currentPage === totalPages}
                 className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
              >
                 <ChevronRight size={18} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
