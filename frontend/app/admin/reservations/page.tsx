'use client';

import { useState, useEffect } from 'react';
import { reservationApi } from '@/services/restaurantService';
import {
  Calendar as CalendarIcon, Clock, Users, Plus, Search, CheckCircle2,
  XCircle, RefreshCw, Sparkles, Phone, Mail, UserCheck, Heart, AlertCircle,
  Filter, Check, Trash2, Edit2, ShieldAlert, Star, Menu, X, SlidersHorizontal
} from 'lucide-react';

export interface TableReservation {
  id: string;
  resId: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  tableId: string;
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';
}

const INITIAL_RESERVATIONS: TableReservation[] = [
  {
    id: 'res-1',
    resId: '#RES-101',
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    phone: '+1 (555) 234-5678',
    guests: 4,
    date: new Date().toISOString().split('T')[0],
    time: '07:30 PM',
    tableId: 'Table 4 (VIP Booth)',
    specialRequests: 'Anniversary Dinner - Window seating requested 🍾',
    status: 'Confirmed',
  },
  {
    id: 'res-2',
    resId: '#RES-102',
    name: 'David Chen',
    email: 'david.c@example.com',
    phone: '+1 (555) 345-6789',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '08:00 PM',
    tableId: 'Table 2',
    specialRequests: 'Quiet corner table',
    status: 'Pending',
  },
  {
    id: 'res-3',
    resId: '#RES-103',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+1 (555) 456-7890',
    guests: 6,
    date: new Date().toISOString().split('T')[0],
    time: '06:45 PM',
    tableId: 'Table 7 (Grand Lounge)',
    specialRequests: 'Birthday Celebration 🎂 (Bring candle dessert)',
    status: 'Seated',
  },
  {
    id: 'res-4',
    resId: '#RES-104',
    name: 'Alex Morgan',
    email: 'alex.m@example.com',
    phone: '+1 (555) 567-8901',
    guests: 3,
    date: new Date().toISOString().split('T')[0],
    time: '08:30 PM',
    tableId: 'Table 5',
    specialRequests: 'High chair needed for child',
    status: 'Confirmed',
  },
];

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<TableReservation[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState<TableReservation | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<TableReservation>>({
    name: '',
    email: '',
    phone: '+1 (555) ',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '07:00 PM',
    tableId: 'Table 1',
    specialRequests: '',
    status: 'Confirmed',
  });

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await reservationApi.getReservations();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setReservations(res.data);
        localStorage.setItem('giri_table_reservations', JSON.stringify(res.data));
      } else {
        loadStoredReservations();
      }
    } catch (err) {
      loadStoredReservations();
    } finally {
      setLoading(false);
    }
  };

  const loadStoredReservations = () => {
    const saved = localStorage.getItem('giri_table_reservations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReservations(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setReservations(INITIAL_RESERVATIONS);
    localStorage.setItem('giri_table_reservations', JSON.stringify(INITIAL_RESERVATIONS));
  };

  useEffect(() => {
    // 1. Instant 0ms load from localStorage
    loadStoredReservations();
    // 2. Silent background sync
    reservationApi.getReservations().then((res) => {
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setReservations(res.data);
        localStorage.setItem('giri_table_reservations', JSON.stringify(res.data));
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

  const saveReservationsState = (newList: TableReservation[]) => {
    setReservations(newList);
    localStorage.setItem('giri_table_reservations', JSON.stringify(newList));
  };

  const handleOpenAddModal = () => {
    setEditingRes(null);
    setFormData({
      name: '',
      email: '',
      phone: '+1 (555) 000-0000',
      guests: 2,
      date: new Date().toISOString().split('T')[0],
      time: '07:00 PM',
      tableId: 'Table 1',
      specialRequests: '',
      status: 'Confirmed',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (res: TableReservation) => {
    setEditingRes(res);
    setFormData({ ...res });
    setIsModalOpen(true);
  };

  const handleSaveReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setMessage({ type: 'error', text: 'Please fill in Name, Phone, Date, and Time.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    let updatedList: TableReservation[] = [];

    try {
      if (editingRes) {
        const id = editingRes.id || (editingRes as any)._id;
        try {
          await reservationApi.updateReservationStatus(id, formData.status || 'Confirmed', formData.tableId);
        } catch (err) {
          console.log('Saved locally');
        }
        updatedList = reservations.map((r) =>
          (r.id || (r as any)._id) === id ? ({ ...r, ...formData } as TableReservation) : r
        );
        setMessage({ type: 'success', text: `Reservation for "${formData.name}" updated!` });
      } else {
        const newRes: TableReservation = {
          id: `res-${Date.now()}`,
          resId: `#RES-${Math.floor(100 + Math.random() * 900)}`,
          name: formData.name!,
          email: formData.email || 'guest@example.com',
          phone: formData.phone!,
          guests: Number(formData.guests) || 2,
          date: formData.date!,
          time: formData.time!,
          tableId: formData.tableId || 'Table 1',
          specialRequests: formData.specialRequests || '',
          status: (formData.status as any) || 'Confirmed',
        };

        try {
          await reservationApi.createReservation(newRes);
        } catch (err) {
          console.log('Saved locally');
        }
        updatedList = [newRes, ...reservations];
        setMessage({ type: 'success', text: `Reservation ${newRes.resId} created for "${newRes.name}"!` });
      }

      saveReservationsState(updatedList);
      setIsModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = (res: TableReservation, newStatus: TableReservation['status']) => {
    const id = res.id || (res as any)._id;
    const updated = reservations.map((r) =>
      ((r.id || (r as any)._id) === id || r.resId === res.resId) ? { ...r, status: newStatus } : r
    );
    saveReservationsState(updated);
    setMessage({ type: 'success', text: `Booking ${res.resId} status updated to ${newStatus}!` });
  };

  const handleDeleteReservation = async (res: TableReservation) => {
    if (!confirm(`Are you sure you want to cancel & delete booking ${res.resId}?`)) return;

    const id = res.id || (res as any)._id;
    const updated = reservations.filter((r) => (r.id || (r as any)._id) !== id && r.resId !== res.resId);
    saveReservationsState(updated);

    try {
      if (id) await reservationApi.deleteReservation(id);
    } catch (err) {
      console.log('Deleted locally');
    }
    setMessage({ type: 'success', text: `Booking ${res.resId} removed.` });
  };

  // Metrics
  const totalGuests = reservations.reduce((sum, r) => sum + r.guests, 0);
  const confirmedCount = reservations.filter((r) => r.status === 'Confirmed' || r.status === 'Seated').length;
  const pendingCount = reservations.filter((r) => r.status === 'Pending').length;

  // Filtered List
  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.resId.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.tableId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Seated':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-900 border-red-300';
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
            <CalendarIcon className="w-4 h-4" /> Guest Seat & Table Management
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Table Bookings & Calendar
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Manage guest reservations, table assignments, party sizes, and special request occasions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchReservations}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs"
            title="Refresh Bookings"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create New Reservation
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

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Total Bookings Today</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{reservations.length}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-emerald-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase">Confirmed / Seated</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{confirmedCount}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-amber-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-800 uppercase">Pending Approval</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{pendingCount}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Expected Guests</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{totalGuests} Guests</div>
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
            placeholder="Search by guest name, phone, or table..."
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
              title="Toggle Booking Filters"
              aria-label="Toggle Booking Filters"
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
                
                {/* Booking Status Section */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wider border-b border-[#8B0000]/10 flex items-center justify-between">
                    <span>Booking Status</span>
                    {selectedStatus !== 'all' && (
                      <span
                        onClick={() => setSelectedStatus('all')}
                        className="text-[9px] text-[#8B0000] hover:underline font-bold cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    {[
                      { id: 'all',       label: 'All Bookings', icon: '📅' },
                      { id: 'Pending',   label: 'Pending',      icon: '⏳' },
                      { id: 'Confirmed', label: 'Confirmed',    icon: '✅' },
                      { id: 'Seated',    label: 'Seated',       icon: '🍽️' },
                      { id: 'Cancelled', label: 'Cancelled',    icon: '❌' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setSelectedStatus(st.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedStatus === st.id
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{st.icon}</span>
                          <span>{st.label}</span>
                        </span>
                        {selectedStatus === st.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}
        </div>

      {/* Bookings Table */}
      <div className="glass-card bg-white rounded-2xl border border-[#8B0000]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1a1008] border-collapse">
            <thead className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-4 py-3.5 min-w-[160px] whitespace-nowrap">Ref & Guest Name</th>
                <th className="px-4 py-3.5 min-w-[200px] whitespace-nowrap">Contact Info</th>
                <th className="px-4 py-3.5 min-w-[140px] whitespace-nowrap">Date & Time Slot</th>
                <th className="px-4 py-3.5 min-w-[110px] whitespace-nowrap">Party Size</th>
                <th className="px-4 py-3.5 min-w-[170px] whitespace-nowrap">Assigned Table</th>
                <th className="px-4 py-3.5 min-w-[190px] whitespace-nowrap">Special Requests / Notes</th>
                <th className="px-4 py-3.5 min-w-[120px] whitespace-nowrap">Status</th>
                <th className="px-4 py-3.5 min-w-[170px] text-center whitespace-nowrap">Status Control</th>
                <th className="px-4 py-3.5 min-w-[100px] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium">
              {filteredReservations.map((res) => (
                <tr key={res.id || (res as any)._id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="px-4 py-3.5 align-middle">
                    <span className="inline-block text-[10px] font-extrabold text-[#8B0000] bg-[#FFF8F0] border border-[#8B0000]/20 px-2 py-0.5 rounded whitespace-nowrap">
                      {res.resId}
                    </span>
                    <div className="font-extrabold text-sm text-[#1a1008] mt-1 whitespace-nowrap truncate max-w-[150px]">{res.name}</div>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-[#6b5840] font-semibold flex items-center gap-1 text-xs truncate max-w-[190px]">
                      <Mail className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> <span className="truncate">{res.email}</span>
                    </div>
                    <div className="text-[11px] text-[#a09070] flex items-center gap-1 mt-1 whitespace-nowrap">
                      <Phone className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> {res.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="font-extrabold text-[#1a1008]">{res.date}</div>
                    <div className="text-xs text-[#8B0000] font-bold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 shrink-0" /> {res.time}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg font-extrabold text-xs">
                      {res.guests} Guests
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className="inline-block font-extrabold text-[#1a1008] bg-[#F8F5F0] border border-[#8B0000]/15 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap max-w-[160px] truncate" title={res.tableId || 'Unassigned'}>
                      {res.tableId || 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <p className="text-xs text-[#6b5840] italic line-clamp-2 max-w-[180px]" title={res.specialRequests || 'Standard dining'}>
                      {res.specialRequests || 'Standard dining'}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${getStatusBadgeStyle(res.status)}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                      {res.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(res, 'Confirmed')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded-lg shadow-2xs transition-all cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}
                      {res.status === 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(res, 'Seated')}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-lg shadow-2xs transition-all cursor-pointer"
                        >
                          Seat Guests
                        </button>
                      )}
                      {res.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(res, 'Cancelled')}
                          className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 font-bold text-[10px] rounded-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(res)}
                        className="p-2 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl transition-all"
                        title="Edit Booking"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReservation(res)}
                        className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                        title="Delete Booking"
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

        {filteredReservations.length === 0 && (
          <div className="p-12 text-center text-xs text-[#6b5840]">
            <CalendarIcon className="w-8 h-8 text-[#8B0000] mx-auto mb-2 opacity-50" />
            No table reservations found matching your criteria.
          </div>
        )}
      </div>

      {/* Add / Edit Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#8B0000]" />
                {editingRes ? 'Edit Table Booking' : 'Create New Table Reservation'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveReservation} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sophia Williams"
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
                      placeholder="sophia@example.com"
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

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Booking Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Time Slot *</label>
                    <input
                      type="text"
                      required
                      value={formData.time || '07:30 PM'}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="07:30 PM"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Guests *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.guests || 2}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Assigned Table</label>
                    <select
                      value={formData.tableId || 'Table 1'}
                      onChange={(e) => setFormData({ ...formData, tableId: e.target.value })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Table 1">Table 1 (Window 2-Seater)</option>
                      <option value="Table 2">Table 2 (Indoor 4-Seater)</option>
                      <option value="Table 3">Table 3 (Patio 2-Seater)</option>
                      <option value="Table 4 (VIP Booth)">Table 4 (VIP Booth 6-Seater)</option>
                      <option value="Table 5">Table 5 (Family 6-Seater)</option>
                      <option value="Table 7 (Grand Lounge)">Table 7 (Grand Lounge 8-Seater)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Reservation Status</label>
                    <select
                      value={formData.status || 'Confirmed'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Pending">⏳ Pending Approval</option>
                      <option value="Confirmed">✅ Confirmed</option>
                      <option value="Seated">🍽️ Seated</option>
                      <option value="Completed">🏁 Completed</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Special Requests / Occasion</label>
                  <textarea
                    rows={3}
                    value={formData.specialRequests || ''}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. Anniversary dinner, window seating requested..."
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
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
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Reservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
