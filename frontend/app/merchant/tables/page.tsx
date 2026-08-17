'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Table as TableIcon, Plus, ArrowLeft, Users, CheckCircle2, AlertTriangle, Printer, CreditCard, X, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface RestaurantTable {
  id: string;
  tableNumber: string;
  tableName: string;
  capacity: number;
  floor: string;
  section: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'WAITING' | 'CLEANING' | 'OUT_OF_SERVICE';
  activeOrder?: {
    orderNumber: string;
    customerName: string;
    phone: string;
    guests: number;
    items: { name: string; quantity: number; price: number }[];
    totalAmount: number;
    paymentStatus: 'UNPAID' | 'PAID';
    orderStatus: string;
  };
}

const INITIAL_TABLES: RestaurantTable[] = [
  {
    id: 'tbl-1',
    tableNumber: '01',
    tableName: 'Table 01',
    capacity: 2,
    floor: 'Ground Floor',
    section: 'Main Dining',
    status: 'AVAILABLE',
  },
  {
    id: 'tbl-2',
    tableNumber: '02',
    tableName: 'Table 02',
    capacity: 4,
    floor: 'Ground Floor',
    section: 'Main Dining',
    status: 'OCCUPIED',
    activeOrder: {
      orderNumber: 'ORD-2051',
      customerName: 'Anil Kumar',
      phone: '+91 98765 12345',
      guests: 3,
      items: [
        { name: 'Chicken Dum Biryani', quantity: 2, price: 229 },
        { name: 'Coke 500ml', quantity: 2, price: 40 },
      ],
      totalAmount: 538,
      paymentStatus: 'UNPAID',
      orderStatus: 'PREPARING',
    },
  },
  {
    id: 'tbl-3',
    tableNumber: '03',
    tableName: 'Table 03',
    capacity: 6,
    floor: 'Ground Floor',
    section: 'Family Area',
    status: 'RESERVED',
  },
  {
    id: 'tbl-4',
    tableNumber: '04',
    tableName: 'Table 04',
    capacity: 4,
    floor: 'Ground Floor',
    section: 'Main Dining',
    status: 'OCCUPIED',
    activeOrder: {
      orderNumber: 'ORD-2055',
      customerName: 'Ravi Kumar',
      phone: '+91 98765 43210',
      guests: 4,
      items: [
        { name: 'Chicken Dum Biryani', quantity: 2, price: 229 },
        { name: 'Chicken 65', quantity: 1, price: 260 },
      ],
      totalAmount: 718,
      paymentStatus: 'UNPAID',
      orderStatus: 'PREPARING',
    },
  },
  {
    id: 'tbl-5',
    tableNumber: '05',
    tableName: 'Table 05',
    capacity: 4,
    floor: '1st Floor',
    section: 'Balcony View',
    status: 'CLEANING',
  },
  {
    id: 'tbl-6',
    tableNumber: '06',
    tableName: 'Table 06',
    capacity: 8,
    floor: '1st Floor',
    section: 'VIP Dining',
    status: 'AVAILABLE',
  },
];

export default function MerchantTablesPage() {
  const [tables, setTables] = useState<RestaurantTable[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Table Form
  const [tblNumber, setTblNumber] = useState('');
  const [tblName, setTblName] = useState('');
  const [tblCapacity, setTblCapacity] = useState(4);
  const [tblFloor, setTblFloor] = useState('Ground Floor');
  const [tblSection, setTblSection] = useState('Main Dining');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tblNumber) return;

    const created: RestaurantTable = {
      id: `tbl-${Date.now()}`,
      tableNumber: tblNumber,
      tableName: tblName || `Table ${tblNumber}`,
      capacity: tblCapacity,
      floor: tblFloor,
      section: tblSection,
      status: 'AVAILABLE',
    };

    setTables([...tables, created]);
    setShowAddModal(false);
    setTblNumber('');
    setTblName('');
    showToast(`Table ${created.tableNumber} added to floor plan.`);
  };

  const handlePaymentAndCloseTable = (tblId: string) => {
    setTables(
      tables.map((t) =>
        t.id === tblId
          ? {
              ...t,
              status: 'AVAILABLE',
              activeOrder: t.activeOrder ? { ...t.activeOrder, paymentStatus: 'PAID' } : undefined,
            }
          : t
      )
    );
    setSelectedTable(null);
    showToast('Payment received (PAID). Table status set to AVAILABLE.');
  };

  const updateTableStatus = (tblId: string, status: RestaurantTable['status']) => {
    setTables(tables.map((t) => (t.id === tblId ? { ...t, status } : t)));
    showToast(`Table status updated to ${status}.`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {toastMsg && (
        <div className="bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/merchant/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Merchant Restaurant Table Management</h1>
            <p className="text-xs text-[#6b5840]">Visual table floor plan grid, live occupancy & table-wise order billing</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Add Table
        </button>
      </div>

      {/* Legend Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs font-bold">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
          ● AVAILABLE ({tables.filter((t) => t.status === 'AVAILABLE').length})
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300">
          ● OCCUPIED ({tables.filter((t) => t.status === 'OCCUPIED').length})
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
          ● RESERVED ({tables.filter((t) => t.status === 'RESERVED').length})
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
          ● CLEANING ({tables.filter((t) => t.status === 'CLEANING').length})
        </span>
      </div>

      {/* Visual Table Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => setSelectedTable(table)}
            className={`glass-card rounded-2xl p-5 border-2 transition-all cursor-pointer hover:shadow-lg space-y-3 ${
              table.status === 'AVAILABLE'
                ? 'bg-emerald-50/40 border-emerald-300'
                : table.status === 'OCCUPIED'
                ? 'bg-red-50/40 border-red-300'
                : table.status === 'RESERVED'
                ? 'bg-amber-50/40 border-amber-300'
                : 'bg-blue-50/40 border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-[#8B0000]" />
                <span className="font-extrabold text-base text-[#1a1008]">{table.tableName}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  table.status === 'AVAILABLE'
                    ? 'bg-emerald-200 text-emerald-900'
                    : table.status === 'OCCUPIED'
                    ? 'bg-red-200 text-red-900'
                    : table.status === 'RESERVED'
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-blue-200 text-blue-900'
                }`}
              >
                {table.status}
              </span>
            </div>

            <div className="text-xs space-y-1 text-[#6b5840]">
              <div className="flex items-center gap-1 font-bold">
                <Users className="w-3.5 h-3.5 text-[#8B0000]" /> Capacity: {table.capacity} Guests
              </div>
              <div className="text-[11px]">{table.section} • {table.floor}</div>
            </div>

            {table.activeOrder ? (
              <div className="pt-2 border-t border-[#8B0000]/10 flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#8B0000]">{table.activeOrder.orderNumber}</span>
                <span className="font-black text-[#8B0000] text-sm">{formatCurrency(table.activeOrder.totalAmount)}</span>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#8B0000]/10 text-[10px] text-gray-500 font-bold">
                Click to view details / link order
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SECTION 14: TABLE-WISE ORDER VIEW MODAL */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/20 max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-[#1a1008]">{selectedTable.tableName} Details</h2>
                <p className="text-xs text-[#6b5840]">
                  {selectedTable.section} • {selectedTable.floor} (Capacity: {selectedTable.capacity} Guests)
                </p>
              </div>
              <button onClick={() => setSelectedTable(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Change Table Status Actions */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase text-[#a09070] block">Change Table Status:</span>
              <div className="flex flex-wrap gap-1.5 text-xs font-extrabold">
                {(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'CLEANING'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateTableStatus(selectedTable.id, st)}
                    className={`px-3 py-1 rounded-lg border cursor-pointer ${
                      selectedTable.status === st ? 'bg-[#8B0000] text-white border-[#8B0000]' : 'bg-[#F8F5F0] border-[#8B0000]/20 text-[#4a3820]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Order Details */}
            {selectedTable.activeOrder ? (
              <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-[#8B0000]/15 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2">
                  <div>
                    <span className="font-extrabold text-sm text-[#1a1008]">{selectedTable.activeOrder.orderNumber}</span>
                    <div className="text-[10px] text-[#6b5840]">{selectedTable.activeOrder.customerName} ({selectedTable.activeOrder.phone})</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                    {selectedTable.activeOrder.paymentStatus}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#8B0000] uppercase block">Ordered Items</span>
                  {selectedTable.activeOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between font-medium">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-bold font-mono">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#8B0000]/10 flex justify-between items-center font-black text-sm text-[#8B0000]">
                    <span>Total Bill:</span>
                    <span>{formatCurrency(selectedTable.activeOrder.totalAmount)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#8B0000]/10 flex flex-wrap items-center justify-end gap-2">
                  <button
                    onClick={() => alert(`Bill printed for ${selectedTable.activeOrder?.orderNumber}`)}
                    className="px-3 py-1.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Bill
                  </button>
                  <button
                    onClick={() => handlePaymentAndCloseTable(selectedTable.id)}
                    className="btn-crimson py-1.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-1 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Pay & Close Table
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[#F8F5F0] rounded-2xl text-center space-y-2 text-xs">
                <TableIcon className="w-8 h-8 text-[#a09070] mx-auto" />
                <p className="font-bold text-[#1a1008]">No active order currently linked to this table.</p>
                <p className="text-[11px] text-[#6b5840]">You can create an offline order or assign a new guest to this table.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <h2 className="text-base font-extrabold text-[#1a1008]">+ Add New Restaurant Table</h2>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>

            <form onSubmit={handleCreateTable} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Table Number *</label>
                <input
                  type="text"
                  required
                  value={tblNumber}
                  onChange={(e) => setTblNumber(e.target.value)}
                  placeholder="e.g. 07"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Table Name</label>
                <input
                  type="text"
                  value={tblName}
                  onChange={(e) => setTblName(e.target.value)}
                  placeholder="e.g. Table 07 (Garden View)"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Capacity</label>
                  <input
                    type="number"
                    min="1"
                    value={tblCapacity}
                    onChange={(e) => setTblCapacity(Number(e.target.value))}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Section</label>
                  <input
                    type="text"
                    value={tblSection}
                    onChange={(e) => setTblSection(e.target.value)}
                    placeholder="Main Dining"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Floor</label>
                  <input
                    type="text"
                    value={tblFloor}
                    onChange={(e) => setTblFloor(e.target.value)}
                    placeholder="Ground Floor"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border">Cancel</button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer">Save Table</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
