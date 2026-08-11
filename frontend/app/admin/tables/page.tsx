'use client';

import { useState, useEffect } from 'react';
import { tableApi } from '@/services/restaurantService';
import {
  Table as TableIcon, Users, Plus, Search, CheckCircle2, Clock,
  Sparkles, RefreshCw, Filter, QrCode, Edit2, Trash2, ShieldCheck,
  AlertTriangle, Sparkle, Copy, Check, ChevronRight, Layers, Menu, X
} from 'lucide-react';

export interface RestaurantTable {
  id: string;
  tableNumber: string;
  capacity: number;
  zone: 'Main Dining Room' | 'VIP Lounge Booths' | 'Outdoor Garden Patio' | 'Bar Counter Seats';
  shape: 'Square 2-Seater' | 'Square 4-Seater' | 'Round 6-Seater' | 'VIP Booth 6-Seater' | 'Grand Lounge 8-Seater' | 'High-Top Bar';
  status: 'Available' | 'Occupied' | 'Reserved' | 'Needs Cleaning';
  assignedGuest?: string;
  currentOrderValue?: number;
  qrCodeUrl?: string;
}

const INITIAL_TABLES: RestaurantTable[] = [
  {
    id: 'tbl-1',
    tableNumber: 'Table 1',
    capacity: 2,
    zone: 'Main Dining Room',
    shape: 'Square 2-Seater',
    status: 'Available',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Table1',
  },
  {
    id: 'tbl-2',
    tableNumber: 'Table 2',
    capacity: 4,
    zone: 'Main Dining Room',
    shape: 'Square 4-Seater',
    status: 'Occupied',
    assignedGuest: 'David Chen (Party of 4)',
    currentOrderValue: 1850,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Table2',
  },
  {
    id: 'tbl-3',
    tableNumber: 'Table 3',
    capacity: 2,
    zone: 'Outdoor Garden Patio',
    shape: 'Square 2-Seater',
    status: 'Available',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Table3',
  },
  {
    id: 'tbl-4',
    tableNumber: 'Table 4 (VIP)',
    capacity: 6,
    zone: 'VIP Lounge Booths',
    shape: 'VIP Booth 6-Seater',
    status: 'Reserved',
    assignedGuest: 'Sophia Williams (7:30 PM)',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Table4',
  },
  {
    id: 'tbl-5',
    tableNumber: 'Table 5',
    capacity: 4,
    zone: 'Main Dining Room',
    shape: 'Square 4-Seater',
    status: 'Occupied',
    assignedGuest: 'Alex Morgan (Party of 3)',
    currentOrderValue: 2400,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Table5',
  },
  {
    id: 'tbl-6',
    tableNumber: 'Table 6',
    capacity: 6,
    zone: 'Outdoor Garden Patio',
    shape: 'Round 6-Seater',
    status: 'Needs Cleaning',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Table6',
  },
  {
    id: 'tbl-7',
    tableNumber: 'Table 7 (Grand)',
    capacity: 8,
    zone: 'VIP Lounge Booths',
    shape: 'Grand Lounge 8-Seater',
    status: 'Occupied',
    assignedGuest: 'Elena Rostova (Birthday Party)',
    currentOrderValue: 4600,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Table7',
  },
  {
    id: 'tbl-8',
    tableNumber: 'Bar Table 1',
    capacity: 2,
    zone: 'Bar Counter Seats',
    shape: 'High-Top Bar',
    status: 'Available',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=Bar1',
  },
];

export default function AdminTablesPage() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<RestaurantTable | null>(null);
  const [activeQRTable, setActiveQRTable] = useState<RestaurantTable | null>(null);
  const [copiedQR, setCopiedQR] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<RestaurantTable>>({
    tableNumber: '',
    capacity: 4,
    zone: 'Main Dining Room',
    shape: 'Square 4-Seater',
    status: 'Available',
    assignedGuest: '',
  });

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await tableApi.getTables();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setTables(res.data);
        localStorage.setItem('giri_restaurant_tables', JSON.stringify(res.data));
      } else {
        loadStoredTables();
      }
    } catch (err) {
      loadStoredTables();
    } finally {
      setLoading(false);
    }
  };

  const loadStoredTables = () => {
    const saved = localStorage.getItem('giri_restaurant_tables');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTables(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setTables(INITIAL_TABLES);
    localStorage.setItem('giri_restaurant_tables', JSON.stringify(INITIAL_TABLES));
  };

  useEffect(() => {
    // 1. Instant 0ms load from localStorage
    loadStoredTables();
    // 2. Silent background sync
    tableApi.getTables().then((res) => {
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setTables(res.data);
        localStorage.setItem('giri_restaurant_tables', JSON.stringify(res.data));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen || activeQRTable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, activeQRTable]);

  const saveTablesState = (newList: RestaurantTable[]) => {
    setTables(newList);
    localStorage.setItem('giri_restaurant_tables', JSON.stringify(newList));
  };

  const handleOpenAddModal = () => {
    setEditingTable(null);
    setFormData({
      tableNumber: `Table ${tables.length + 1}`,
      capacity: 4,
      zone: 'Main Dining Room',
      shape: 'Square 4-Seater',
      status: 'Available',
      assignedGuest: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (t: RestaurantTable) => {
    setEditingTable(t);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  const handleSaveTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tableNumber || !formData.capacity) {
      setMessage({ type: 'error', text: 'Please fill in Table Name/Number and Seating Capacity.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    let updatedList: RestaurantTable[] = [];

    try {
      if (editingTable) {
        const id = editingTable.id || (editingTable as any)._id;
        try {
          await tableApi.updateTableStatus(id, formData.status || 'Available', formData.assignedGuest);
        } catch (err) {
          console.log('Saved locally');
        }
        updatedList = tables.map((t) =>
          (t.id || (t as any)._id) === id ? ({ ...t, ...formData } as RestaurantTable) : t
        );
        setMessage({ type: 'success', text: `Table "${formData.tableNumber}" updated!` });
      } else {
        const cleanTableNum = formData.tableNumber!.replace(/\s+/g, '');
        const newTbl: RestaurantTable = {
          id: `tbl-${Date.now()}`,
          tableNumber: formData.tableNumber!,
          capacity: Number(formData.capacity) || 4,
          zone: (formData.zone as any) || 'Main Dining Room',
          shape: (formData.shape as any) || 'Square 4-Seater',
          status: (formData.status as any) || 'Available',
          assignedGuest: formData.assignedGuest || '',
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=${cleanTableNum}`,
        };

        try {
          await tableApi.createTable(newTbl);
        } catch (err) {
          console.log('Saved locally');
        }
        updatedList = [...tables, newTbl];
        setMessage({ type: 'success', text: `New table "${newTbl.tableNumber}" added!` });
      }

      saveTablesState(updatedList);
      setIsModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = (table: RestaurantTable, newStatus: RestaurantTable['status'], guestName: string = '') => {
    const id = table.id || (table as any)._id;
    const updated = tables.map((t) =>
      ((t.id || (t as any)._id) === id || t.tableNumber === table.tableNumber)
        ? {
            ...t,
            status: newStatus,
            assignedGuest: newStatus === 'Available' ? '' : guestName || t.assignedGuest,
            currentOrderValue: newStatus === 'Available' ? undefined : t.currentOrderValue,
          }
        : t
    );
    saveTablesState(updated);
    setMessage({ type: 'success', text: `${table.tableNumber} status updated to ${newStatus}!` });
  };

  const handleDeleteTable = async (table: RestaurantTable) => {
    if (!confirm(`Are you sure you want to remove "${table.tableNumber}" from the floor plan?`)) return;

    const id = table.id || (table as any)._id;
    const updated = tables.filter((t) => (t.id || (t as any)._id) !== id && t.tableNumber !== table.tableNumber);
    saveTablesState(updated);

    try {
      if (id) await tableApi.deleteTable(id);
    } catch (err) {
      console.log('Deleted locally');
    }
    setMessage({ type: 'success', text: `Table "${table.tableNumber}" removed.` });
  };

  const handleCopyQR = (table: RestaurantTable) => {
    const qrUrl = `http://localhost:3000/menu?table=${table.tableNumber.replace(/\s+/g, '')}`;
    navigator.clipboard.writeText(qrUrl);
    setCopiedQR(true);
    setTimeout(() => setCopiedQR(false), 3000);
  };

  // Metrics
  const availableCount = tables.filter((t) => t.status === 'Available').length;
  const occupiedCount = tables.filter((t) => t.status === 'Occupied').length;
  const reservedCount = tables.filter((t) => t.status === 'Reserved').length;
  const cleaningCount = tables.filter((t) => t.status === 'Needs Cleaning').length;

  // Filtered List
  const filteredTables = tables.filter((t) => {
    const matchesSearch =
      search === '' ||
      t.tableNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.zone.toLowerCase().includes(search.toLowerCase()) ||
      (t.assignedGuest && t.assignedGuest.toLowerCase().includes(search.toLowerCase()));
    const matchesZone = selectedZone === 'all' || t.zone === selectedZone;
    const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
    return matchesSearch && matchesZone && matchesStatus;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Occupied':
        return 'bg-red-100 text-red-900 border-red-300';
      case 'Reserved':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Needs Cleaning':
        return 'bg-purple-100 text-purple-900 border-purple-300';
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
            <TableIcon className="w-4 h-4" /> Restaurant Seating & Floor Plan
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Table Layout & Floor Plan
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Monitor live table availability, seating capacity, guest assignments, and QR code ordering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTables}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs cursor-pointer"
            title="Refresh Floor Plan"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Table
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
        <div className="glass-card bg-white p-5 rounded-2xl border border-emerald-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase">Available Tables</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{availableCount} / {tables.length}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-red-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-800 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-red-800 uppercase">Occupied Diners</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{occupiedCount} Tables</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-amber-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-800 uppercase">Reserved Tables</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{reservedCount} Tables</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-purple-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800 shrink-0">
            <Sparkle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-purple-800 uppercase">Needs Reset / Clean</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{cleaningCount} Tables</div>
          </div>
        </div>
      </div>

      {/* Search Bar with 3-Lines Floor Zone Filter Dropdown */}
      {/* Search Bar with 3-Lines Floor Zone Filter Dropdown */}
      <div className="relative w-full z-30">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
          
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search table number or guest name..."
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

            {/* Frameless 3-Lines Icon Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                showFilterMenu ? 'text-[#8B0000] bg-[#8B0000]/15' : 'text-[#8B0000] hover:bg-[#8B0000]/10'
              }`}
              title="Toggle Floor Zone Filters"
              aria-label="Toggle Floor Zone Filters"
            >
              <Menu className="w-4 h-4" />
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

              <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-2xl border border-[#8B0000]/20 shadow-2xl z-50 p-3 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                
                {/* Floor Zones Section */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wider border-b border-[#8B0000]/10 flex items-center justify-between">
                    <span>Floor Zones</span>
                    {selectedZone !== 'all' && (
                      <span
                        onClick={() => setSelectedZone('all')}
                        className="text-[9px] text-[#8B0000] hover:underline font-bold cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    {[
                      { id: 'all',                  label: 'All Floor Zones',  icon: '🏢' },
                      { id: 'Main Dining Room',     label: 'Main Dining',      icon: '🪟' },
                      { id: 'VIP Lounge Booths',    label: 'VIP Lounge',       icon: '🍾' },
                      { id: 'Outdoor Garden Patio', label: 'Garden Patio',     icon: '🌿' },
                      { id: 'Bar Counter Seats',    label: 'Bar Seating',      icon: '🍸' },
                    ].map((z) => (
                      <button
                        key={z.id}
                        onClick={() => {
                          setSelectedZone(z.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedZone === z.id
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{z.icon}</span>
                          <span>{z.label}</span>
                        </span>
                        {selectedZone === z.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Status Section */}
                <div className="space-y-1 pt-2 border-t border-[#8B0000]/10">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wider flex items-center justify-between">
                    <span>Table Status</span>
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
                      { id: 'all',            label: 'All Statuses',    icon: '📊' },
                      { id: 'Available',      label: 'Available',       icon: '🟢' },
                      { id: 'Occupied',       label: 'Occupied',        icon: '🔴' },
                      { id: 'Reserved',       label: 'Reserved',        icon: '🟡' },
                      { id: 'Needs Cleaning', label: 'Needs Cleaning',  icon: '🧹' },
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

      {/* Floor Plan Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredTables.map((t) => (
          <div
            key={t.id || (t as any)._id}
            className={`glass-card bg-white rounded-3xl p-5 border transition-all duration-200 hover:shadow-lg flex flex-col justify-between space-y-4 relative ${
              t.status === 'Occupied'
                ? 'border-red-300 shadow-xs bg-gradient-to-b from-white to-red-50/20'
                : t.status === 'Reserved'
                ? 'border-amber-300 bg-gradient-to-b from-white to-amber-50/20'
                : t.status === 'Needs Cleaning'
                ? 'border-purple-300 bg-gradient-to-b from-white to-purple-50/20'
                : 'border-[#8B0000]/15 hover:border-[#8B0000]/40'
            }`}
          >
            {/* Top Bar inside Card */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-extrabold text-[#1a1008] flex items-center gap-1.5">
                    <TableIcon className="w-4 h-4 text-[#8B0000]" />
                    {t.tableNumber}
                  </h3>
                  <span className="text-[10px] text-[#a09070] font-bold">{t.zone}</span>
                </div>

                {/* Status Badge */}
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border shrink-0 ${getStatusBadgeStyle(t.status)}`}>
                  {t.status}
                </span>
              </div>

              {/* Seating Details */}
              <div className="flex items-center gap-2 mt-3 text-xs text-[#4a3820]">
                <span className="px-2 py-0.5 bg-[#FFF8F0] border border-[#8B0000]/15 text-[#8B0000] rounded-md font-extrabold text-[11px]">
                  👤 {t.capacity} Seats
                </span>
                <span className="text-[11px] font-medium text-[#6b5840] italic truncate">
                  {t.shape}
                </span>
              </div>

              {/* Guest / Order Details if active */}
              {t.assignedGuest && (
                <div className="mt-3 p-2.5 rounded-xl bg-[#F8F5F0] border border-[#8B0000]/10 text-xs">
                  <div className="text-[10px] font-bold text-[#a09070] uppercase">Assigned Guest / Note:</div>
                  <div className="font-extrabold text-[#1a1008] mt-0.5 truncate">{t.assignedGuest}</div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Card */}
            <div className="space-y-2.5 pt-2 border-t border-[#8B0000]/10">
              
              {/* Quick Status Buttons */}
              <div className="grid grid-cols-2 gap-1.5">
                {t.status === 'Available' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(t, 'Occupied', 'Walk-in Guest')}
                      className="py-1.5 px-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] rounded-xl shadow-2xs transition-all cursor-pointer text-center"
                    >
                      Seat Guests
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(t, 'Reserved', 'Guest Booking')}
                      className="py-1.5 px-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10px] rounded-xl shadow-2xs transition-all cursor-pointer text-center"
                    >
                      Reserve
                    </button>
                  </>
                )}

                {t.status === 'Occupied' && (
                  <button
                    onClick={() => handleUpdateStatus(t, 'Needs Cleaning')}
                    className="col-span-2 py-1.5 px-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-[10px] rounded-xl shadow-2xs transition-all cursor-pointer text-center"
                  >
                    Finish Dining (Needs Cleaning)
                  </button>
                )}

                {t.status === 'Reserved' && (
                  <button
                    onClick={() => handleUpdateStatus(t, 'Occupied')}
                    className="col-span-2 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded-xl shadow-2xs transition-all cursor-pointer text-center"
                  >
                    Seat Reserved Guest
                  </button>
                )}

                {t.status === 'Needs Cleaning' && (
                  <button
                    onClick={() => handleUpdateStatus(t, 'Available')}
                    className="col-span-2 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded-xl shadow-2xs transition-all cursor-pointer text-center flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Mark Cleaned & Available
                  </button>
                )}
              </div>

              {/* Utility Row: QR Code & Edit */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => setActiveQRTable(t)}
                  className="text-[10px] font-bold text-[#8B0000] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" /> Table QR Code
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(t)}
                    className="p-1.5 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-lg transition-all"
                    title="Edit Table"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteTable(t)}
                    className="p-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                    title="Remove Table"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {filteredTables.length === 0 && (
        <div className="p-12 text-center text-xs text-[#6b5840] glass-card bg-white rounded-3xl">
          <TableIcon className="w-8 h-8 text-[#8B0000] mx-auto mb-2 opacity-50" />
          No restaurant tables found matching your search or section zone filter.
        </div>
      )}

      {/* Add / Edit Table Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-[#8B0000]" />
                {editingTable ? 'Edit Table Settings' : 'Add New Table to Floor Plan'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveTable} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Table Name / Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.tableNumber || ''}
                    onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                    placeholder="e.g. Table 9 or VIP Lounge 3"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Seating Capacity (Guests) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.capacity || 4}
                      onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Floor Zone Section *</label>
                    <select
                      value={formData.zone || 'Main Dining Room'}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Main Dining Room">🪟 Main Dining Room</option>
                      <option value="VIP Lounge Booths">🍾 VIP Lounge Booths</option>
                      <option value="Outdoor Garden Patio">🌿 Outdoor Garden Patio</option>
                      <option value="Bar Counter Seats">🍸 Bar Counter Seats</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Table Seating Shape</label>
                    <select
                      value={formData.shape || 'Square 4-Seater'}
                      onChange={(e) => setFormData({ ...formData, shape: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Square 2-Seater">Square 2-Seater</option>
                      <option value="Square 4-Seater">Square 4-Seater</option>
                      <option value="Round 6-Seater">Round 6-Seater</option>
                      <option value="VIP Booth 6-Seater">VIP Booth 6-Seater</option>
                      <option value="Grand Lounge 8-Seater">Grand Lounge 8-Seater</option>
                      <option value="High-Top Bar">High-Top Bar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Live Status</label>
                    <select
                      value={formData.status || 'Available'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Available">✅ Available</option>
                      <option value="Occupied">🔴 Occupied</option>
                      <option value="Reserved">⏳ Reserved</option>
                      <option value="Needs Cleaning">🧹 Needs Cleaning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Assigned Guest / Note</label>
                  <input
                    type="text"
                    value={formData.assignedGuest || ''}
                    onChange={(e) => setFormData({ ...formData, assignedGuest: e.target.value })}
                    placeholder="e.g. Walk-in Guest or Reservation Name"
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
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Table Setup'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table QR Code Modal */}
      {activeQRTable && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-3">
              <h3 className="font-extrabold text-base text-[#1a1008] flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#8B0000]" />
                {activeQRTable.tableNumber} QR Code
              </h3>
              <button onClick={() => setActiveQRTable(null)} className="text-[#a09070] hover:text-[#8B0000] font-bold">✕</button>
            </div>

            <p className="text-xs text-[#6b5840]">
              Scan QR code to open direct mobile ordering menu for <strong className="text-[#8B0000]">{activeQRTable.tableNumber}</strong>.
            </p>

            <div className="p-4 bg-[#FFF8F0] border border-[#8B0000]/20 rounded-2xl inline-block shadow-inner">
              <img
                src={activeQRTable.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/menu?table=${activeQRTable.tableNumber}`}
                alt="Table QR Code"
                className="w-44 h-44 mx-auto rounded-lg"
              />
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleCopyQR(activeQRTable)}
                className="w-full py-2.5 bg-[#8B0000] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer hover:bg-[#6b0000] transition-colors"
              >
                {copiedQR ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedQR ? 'Direct Ordering Link Copied!' : 'Copy Direct Table Ordering Link'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
