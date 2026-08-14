'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatters';
import { employeeApi } from '@/services/restaurantService';
import { UserRole } from '@/types';
import {
  UserCheck, UserPlus, Search, ShieldCheck, Flame, Utensils,
  Truck, DollarSign, Edit2, Trash2, RefreshCw, Sparkles, Filter, Mail, Phone, Clock, Menu, X, CheckCircle2, SlidersHorizontal
} from 'lucide-react';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  shift: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  avatar?: string;
  joinedDate?: string;
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'emp-1',
    name: 'Giri Admin',
    email: 'admin@girirestaurant.com',
    phone: '+1 (555) 000-1111',
    role: 'Admin',
    shift: 'Full Time (Executive)',
    salary: 85000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-01-15',
  },
  {
    id: 'emp-2',
    name: 'Sarah Connor',
    email: 'manager@girirestaurant.com',
    phone: '+1 (555) 000-2222',
    role: 'Manager',
    shift: 'Full Time (Shift Supervisor)',
    salary: 55000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-03-01',
  },
  {
    id: 'emp-3',
    name: 'Master Chef Marco',
    email: 'chef@girirestaurant.com',
    phone: '+1 (555) 000-3333',
    role: 'Chef',
    shift: 'Evening Shift (3pm - 11pm)',
    salary: 62000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-02-10',
  },
  {
    id: 'emp-4',
    name: 'Leo Vance',
    email: 'waiter@girirestaurant.com',
    phone: '+1 (555) 000-4444',
    role: 'Waiter',
    shift: 'Morning Shift (7am - 3pm)',
    salary: 28000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-05-18',
  },
  {
    id: 'emp-5',
    name: 'Emma Watson',
    email: 'cashier@girirestaurant.com',
    phone: '+1 (555) 000-5555',
    role: 'Cashier',
    shift: 'Full Time (POS Terminal)',
    salary: 32000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-04-20',
  },
  {
    id: 'emp-6',
    name: 'Ravi Kumar',
    email: 'delivery@girirestaurant.com',
    phone: '+1 (555) 000-6666',
    role: 'Delivery',
    shift: 'Evening Shift (4pm - 12am)',
    salary: 26000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-06-01',
  },
];

export default function AdminEmployeesPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: '',
    email: '',
    phone: '+1 (555) ',
    role: 'Waiter',
    shift: 'Morning Shift (7am - 3pm)',
    salary: 30000,
    status: 'Active',
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await employeeApi.getEmployees();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setStaff(res.data);
        localStorage.setItem('giri_staff_members', JSON.stringify(res.data));
      } else {
        loadStoredStaff();
      }
    } catch (err) {
      loadStoredStaff();
    } finally {
      setLoading(false);
    }
  };

  const loadStoredStaff = () => {
    const saved = localStorage.getItem('giri_staff_members');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStaff(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setStaff(INITIAL_STAFF);
    localStorage.setItem('giri_staff_members', JSON.stringify(INITIAL_STAFF));
  };

  useEffect(() => {
    // 1. Instant 0ms load from localStorage
    loadStoredStaff();
    // 2. Silent background sync
    employeeApi.getEmployees().then((res) => {
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setStaff(res.data);
        localStorage.setItem('giri_staff_members', JSON.stringify(res.data));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const saveStaffState = (newList: StaffMember[]) => {
    setStaff(newList);
    localStorage.setItem('giri_staff_members', JSON.stringify(newList));
  };

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      phone: '+1 (555) 000-0000',
      role: 'Waiter',
      shift: 'Morning Shift (7am - 3pm)',
      salary: 30000,
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp: StaffMember) => {
    setEditingStaff(emp);
    setFormData({ ...emp });
    setIsModalOpen(true);
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.salary) {
      setMessage({ type: 'error', text: 'Please fill in Name, Email, and Salary.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    let updatedList: StaffMember[] = [];

    try {
      if (editingStaff) {
        const id = editingStaff.id || (editingStaff as any)._id;
        try {
          await employeeApi.updateEmployee(id, formData);
        } catch (err) {
          console.log('Saved locally');
        }
        updatedList = staff.map((s) =>
          (s.id || (s as any)._id) === id ? ({ ...s, ...formData } as StaffMember) : s
        );
        setMessage({ type: 'success', text: `Staff record "${formData.name}" updated!` });
      } else {
        const newEmp: StaffMember = {
          id: `emp-${Date.now()}`,
          name: formData.name!,
          email: formData.email!,
          phone: formData.phone || '+1 (555) 000-0000',
          role: (formData.role as UserRole) || 'Waiter',
          shift: formData.shift || 'Full Time',
          salary: Number(formData.salary) || 30000,
          status: (formData.status as any) || 'Active',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          joinedDate: new Date().toISOString().split('T')[0],
        };

        try {
          await employeeApi.createEmployee(newEmp);
        } catch (err) {
          console.log('Saved locally');
        }
        updatedList = [newEmp, ...staff];
        setMessage({ type: 'success', text: `New staff member "${newEmp.name}" added!` });
      }

      saveStaffState(updatedList);
      setIsModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStaff = async (emp: StaffMember) => {
    if (!confirm(`Are you sure you want to remove staff member "${emp.name}"?`)) return;

    const id = emp.id || (emp as any)._id;
    const updated = staff.filter((s) => (s.id || (s as any)._id) !== id && s.name !== emp.name);
    saveStaffState(updated);

    try {
      if (id) await employeeApi.deleteEmployee(id);
    } catch (err) {
      console.log('Deleted locally');
    }
    setMessage({ type: 'success', text: `Staff record for "${emp.name}" removed.` });
  };

  // Metrics
  const chefCount = staff.filter((s) => s.role === 'Chef').length;
  const waiterCount = staff.filter((s) => s.role === 'Waiter' || s.role === 'Cashier').length;
  const deliveryCount = staff.filter((s) => s.role === 'Delivery').length;

  // Filtered list
  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      s.role.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === 'all' || s.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-900 border-red-300';
      case 'Manager':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Chef':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Waiter':
        return 'bg-[#FFF8F0] text-[#8B0000] border-[#8B0000]/20';
      case 'Cashier':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Delivery':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <UserCheck className="w-4 h-4" /> Human Resources & RBAC Roles
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Staff Directory & Roles
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Manage staff profiles, shifts, monthly salaries, and RBAC permissions across 7 system roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStaff}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs"
            title="Refresh Staff List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Add New Staff Member
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' : 'bg-red-50 border border-red-300 text-red-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          {message.text}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Total Active Staff</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{staff.length}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-orange-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-800">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-orange-800 uppercase">Head Chefs & Kitchen</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{chefCount}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-emerald-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase">Waiters & Cashiers</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{waiterCount}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-blue-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-blue-800 uppercase">Delivery Fleet</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{deliveryCount}</div>
          </div>
        </div>
      </div>

      {/* Search & Outlets Filter Bar */}
      <div className="relative w-full mb-6 z-20">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
          
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by staff name, role, or phone..."
            className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-24 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
          />

          {/* Right Action Icons: Clear & Three-Lines Filter Menu */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
            {search && (
              <button
                onClick={() => setSearch('')}
                className="p-1 rounded-full text-gray-400 hover:text-[#8B0000] hover:bg-black/5 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Frameless Filter Toggle Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-1.5 text-[#8B0000] hover:text-[#a00000] hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
              title="Toggle Staff Role Filters"
              aria-label="Toggle Staff Role Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

          {/* Floating Dropdown Menu */}
          {showFilterMenu && (
            <>
              {/* Backdrop Listener */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowFilterMenu(false)}
              />

              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-[#8B0000]/20 shadow-2xl z-50 p-3 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wider border-b border-[#8B0000]/10 flex items-center justify-between">
                    <span>Staff Role Filter</span>
                    {selectedRole !== 'all' && (
                      <span
                        onClick={() => setSelectedRole('all')}
                        className="text-[9px] text-[#8B0000] hover:underline font-bold cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    {[
                      { id: 'all',      label: 'All Staff Members', icon: '👥' },
                      { id: 'Admin',    label: 'Administrators',    icon: '👑' },
                      { id: 'Manager',  label: 'Managers',          icon: '👔' },
                      { id: 'Chef',     label: 'Head & Line Chefs', icon: '👨‍🍳' },
                      { id: 'Waiter',   label: 'Waiters & Staff',   icon: '🍽️' },
                      { id: 'Cashier',  label: 'POS Cashiers',      icon: '💳' },
                      { id: 'Delivery', label: 'Delivery Riders',   icon: '🛵' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setSelectedRole(r.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedRole === r.id
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{r.icon}</span>
                          <span>{r.label}</span>
                        </span>
                        {selectedRole === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      {/* Staff Table */}
      <div className="glass-card bg-white rounded-2xl border border-[#8B0000]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1a1008] border-collapse">
            <thead className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-4 py-3.5 min-w-[180px] whitespace-nowrap">Staff Name</th>
                <th className="px-4 py-3.5 min-w-[140px] whitespace-nowrap">System Role</th>
                <th className="px-4 py-3.5 min-w-[200px] whitespace-nowrap">Contact Info</th>
                <th className="px-4 py-3.5 min-w-[170px] whitespace-nowrap">Assigned Shift</th>
                <th className="px-4 py-3.5 min-w-[130px] whitespace-nowrap">Monthly Salary</th>
                <th className="px-4 py-3.5 min-w-[110px] whitespace-nowrap">Status</th>
                <th className="px-4 py-3.5 min-w-[100px] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium">
              {filteredStaff.map((emp) => (
                <tr key={emp.id || (emp as any)._id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="px-4 py-3.5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#C8A055]/40 shrink-0">
                        {emp.avatar ? (
                          <Image src={emp.avatar} alt={emp.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#8B0000] text-white font-bold flex items-center justify-center text-xs">
                            {emp.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-extrabold text-sm text-[#1a1008] whitespace-nowrap truncate max-w-[140px]" title={emp.name}>{emp.name}</div>
                        <span className="text-[10px] text-[#a09070] whitespace-nowrap block">Joined: {emp.joinedDate || '2024'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold border whitespace-nowrap ${getRoleBadgeStyle(emp.role)}`}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-[#6b5840] font-semibold flex items-center gap-1 text-xs truncate max-w-[190px]">
                      <Mail className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="text-[11px] text-[#a09070] flex items-center gap-1 mt-1 whitespace-nowrap">
                      <Phone className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> {emp.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#4a3820] whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> {emp.shift}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle font-extrabold text-[#8B0000] whitespace-nowrap">
                    {formatCurrency(emp.salary)} / mo
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${
                      emp.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(emp)}
                        className="p-2 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl transition-all"
                        title="Edit Staff Member"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(emp)}
                        className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                        title="Remove Staff"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStaff.length === 0 && (
          <div className="p-12 text-center text-xs text-[#6b5840]">
            <UserCheck className="w-8 h-8 text-[#8B0000] mx-auto mb-2 opacity-50" />
            No staff records found matching your search.
          </div>
        )}
      </div>

      {/* Add / Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#8B0000]" />
                {editingStaff ? 'Edit Staff Profile' : 'Add New Staff Member'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveStaff} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Master Chef Marco"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marco@girirestaurant.com"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">System Role *</label>
                    <select
                      value={formData.role || 'Waiter'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Admin">👑 Admin (Full Control)</option>
                      <option value="Manager">👔 Manager (Operations)</option>
                      <option value="Chef">👨‍🍳 Chef (Kitchen Display KDS)</option>
                      <option value="Waiter">🍽️ Waiter (Floor Management)</option>
                      <option value="Cashier">💳 Cashier (POS & Billing)</option>
                      <option value="Delivery">🛵 Delivery (Fleet Agent)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Status</label>
                    <select
                      value={formData.status || 'Active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Assigned Shift *</label>
                    <select
                      value={formData.shift || 'Morning Shift (7am - 3pm)'}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Morning Shift (7am - 3pm)">Morning Shift (7am - 3pm)</option>
                      <option value="Evening Shift (3pm - 11pm)">Evening Shift (3pm - 11pm)</option>
                      <option value="Night Shift (11pm - 7am)">Night Shift (11pm - 7am)</option>
                      <option value="Full Time">Full Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Monthly Salary (₹) *</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      value={formData.salary || 30000}
                      onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="pt-4 mt-auto border-t border-[#8B0000]/10 bg-white sticky bottom-0 z-10 flex gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#8B0000]/20 text-[#6b5840] font-bold hover:bg-[#F8F5F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-crimson py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Staff Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
