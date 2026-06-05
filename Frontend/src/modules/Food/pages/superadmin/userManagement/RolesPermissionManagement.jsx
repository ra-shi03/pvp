import React, { useState } from 'react';
import { ChevronRight, Plus, Users, Edit3, Shield, History, ShieldCheck, Building2, Store, ChefHat, X, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import RolesPermissionTable from './RolesPermissionTable';
import RolesPermissionDetails from './RolesPermissionDetails';

export const INITIAL_ROLES = [
  {
    id: "2",
    name: "Area Supervisor",
    subtitle: "Customized for regional ops",
    description: "Management of specific franchise territories including multiple stores and staff.",
    type: "Custom",
    users: 12,
    permissionsCount: "64",
    permissionsTotal: 148,
    scope: "Franchise",
    status: "Active"
  },
  {
    id: "3",
    name: "Delivery Lead",
    subtitle: "Fleet management access",
    description: "Standard role for delivery tracking and fleet management.",
    type: "Custom",
    users: 8,
    permissionsCount: "24",
    permissionsTotal: 148,
    scope: "Store",
    status: "Suspended"
  },
  {
    id: "4",
    name: "Audit Executive",
    subtitle: "Read-only financial audit",
    description: "Read-only access for financial and compliance audits.",
    type: "Custom",
    users: 3,
    permissionsCount: "14",
    permissionsTotal: 148,
    scope: "Global",
    status: "Active"
  }
];

export default function RolesPermissionManagement() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handlePreviewRole = (role) => {
    setSelectedRole(role);
    setIsDrawerOpen(true);
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 md:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-6">
        <div>
          <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span>User Management</span>
            <ChevronRight size={14} />
            <span className="text-[var(--primary)]">Roles & Permissions</span>
          </nav>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Roles & Permissions
          </h1>
          <p className="text-zinc-400 font-semibold text-xs mt-0.5">
            Manage platform roles, permissions, and access control policies
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl text-xs font-bold shadow-md shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] cursor-pointer">
          <Plus size={16} className="stroke-[3]" />
          <span>CREATE NEW ROLE</span>
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Users className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              <TrendingUp size={16} />
              +2
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">12</div>
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Total Roles</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Edit3 className="text-amber-500" size={24} />
            </div>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <TrendingUp size={16} />
              0
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">6</div>
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Custom Roles</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Shield className="text-[var(--primary)]" size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              <TrendingUp size={16} />
              +12
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">148</div>
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Total Permissions</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <History className="text-teal-600" size={24} />
            </div>
            <div className="flex items-center gap-1 text-[var(--primary)] text-xs font-bold">
              <History size={16} />
              Today
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">3</div>
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Recently Updated</div>
          </div>
        </div>
      </div>

      {/* Core System Roles */}
      <section className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Core System Roles</h3>
          <button className="text-[var(--primary)] text-xs font-bold flex items-center gap-1 hover:underline">
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar">
          <div className="min-w-[300px] flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl hover:border-[var(--primary)] transition-colors cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider">System</span>
            </div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] text-zinc-900 dark:text-zinc-50 transition-colors">Franchise Admin</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 h-10 line-clamp-2">Management of specific franchise territories including multiple stores and staff.</p>
            <div className="flex gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <div>
                <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">USERS</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">24</div>
              </div>
              <div className="border-l border-zinc-200 dark:border-zinc-800 pl-4">
                <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">PERMISSIONS</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">86</div>
              </div>
            </div>
          </div>

          <div className="min-w-[300px] flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl hover:border-[var(--primary)] transition-colors cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Store size={24} />
              </div>
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider">System</span>
            </div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] text-zinc-900 dark:text-zinc-50 transition-colors">Store Manager</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 h-10 line-clamp-2">Full control over a single store location, inventory, and staff rosters.</p>
            <div className="flex gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <div>
                <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">USERS</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">112</div>
              </div>
              <div className="border-l border-zinc-200 dark:border-zinc-800 pl-4">
                <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">PERMISSIONS</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">42</div>
              </div>
            </div>
          </div>

          <div className="min-w-[300px] flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl hover:border-[var(--primary)] transition-colors cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <ChefHat size={24} />
              </div>
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider">System</span>
            </div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] text-zinc-900 dark:text-zinc-50 transition-colors">Kitchen Staff</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 h-10 line-clamp-2">Access to order fulfillment, inventory logs, and kitchen workflow tools.</p>
            <div className="flex gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <div>
                <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">USERS</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">450+</div>
              </div>
              <div className="border-l border-zinc-200 dark:border-zinc-800 pl-4">
                <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">PERMISSIONS</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">18</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Table Section */}
      <RolesPermissionTable rolesList={INITIAL_ROLES} onPreviewRole={handlePreviewRole} />

      {/* Render the Drawer inline instead of through router */}
      <RolesPermissionDetails 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        role={selectedRole}
      />
    </div>
  );
}
