'use client';

import { useState, useEffect } from 'react';
import { orderApi } from '@/services/restaurantService';
import {
  Flame, Clock, CheckCircle2, AlertCircle, RefreshCw, Volume2, VolumeX,
  ChefHat, Play, Check, Plus, ShoppingBag, Utensils, Sparkles
} from 'lucide-react';

export interface KitchenTicket {
  id: string;
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
  tableNo: string;
  status: 'Pending' | 'In Preparation' | 'Ready' | 'Served';
  items: { name: string; quantity: number; notes?: string }[];
  createdAt: number; // Timestamp
  customerName?: string;
}

const INITIAL_TICKETS: KitchenTicket[] = [
  {
    id: 'TICKET #104',
    orderType: 'Dine-In',
    tableNo: 'Table 4',
    status: 'Pending',
    items: [
      { name: 'Truffle Mushroom Risotto', quantity: 2, notes: 'Extra Parmesan cheese' },
      { name: 'Artisanal Margherita Pizza', quantity: 1, notes: 'Crispy thin crust' }
    ],
    createdAt: Date.now() - 5 * 60 * 1000,
    customerName: 'Sophia Williams'
  },
  {
    id: 'TICKET #105',
    orderType: 'Takeaway',
    tableNo: 'Counter Pickup',
    status: 'In Preparation',
    items: [
      { name: 'Smoked Wagyu Beef Burger', quantity: 1, notes: 'Medium rare, extra bacon' },
      { name: 'Truffle Fries', quantity: 1 }
    ],
    createdAt: Date.now() - 12 * 60 * 1000,
    customerName: 'David Chen'
  },
  {
    id: 'TICKET #106',
    orderType: 'Delivery',
    tableNo: 'Order #D-9812',
    status: 'In Preparation',
    items: [
      { name: 'Crispy Pan-Seared Salmon', quantity: 2, notes: 'Sauce on the side' },
      { name: 'Mango Passion Fruit Fizz', quantity: 2 }
    ],
    createdAt: Date.now() - 18 * 60 * 1000,
    customerName: 'Elena Rostova'
  },
  {
    id: 'TICKET #107',
    orderType: 'Dine-In',
    tableNo: 'Table 7',
    status: 'Ready',
    items: [
      { name: 'Spicy Thai Green Curry', quantity: 1, notes: 'Extra spicy 🔥' },
      { name: 'Jasmine Rice', quantity: 2 }
    ],
    createdAt: Date.now() - 22 * 60 * 1000,
    customerName: 'Alex Morgan'
  }
];

export default function AdminKitchenPage() {
  const [tickets, setTickets] = useState<KitchenTicket[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Manual ticket form state
  const [manualTable, setManualTable] = useState('Table 1');
  const [manualType, setManualType] = useState<'Dine-In' | 'Takeaway' | 'Delivery'>('Dine-In');
  const [manualItemName, setManualItemName] = useState('');
  const [manualQty, setManualQty] = useState(1);
  const [manualNotes, setManualNotes] = useState('');

  // Load tickets from localStorage or fallback
  useEffect(() => {
    const saved = localStorage.getItem('giri_kitchen_tickets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTickets(parsed);
          return;
        }
      } catch (e) {
        console.error('Error loading tickets from storage:', e);
      }
    }
    setTickets(INITIAL_TICKETS);
    localStorage.setItem('giri_kitchen_tickets', JSON.stringify(INITIAL_TICKETS));
  }, []);

  // Sync to localStorage
  const updateTicketsState = (newTickets: KitchenTicket[]) => {
    setTickets(newTickets);
    localStorage.setItem('giri_kitchen_tickets', JSON.stringify(newTickets));
  };

  // Timer for elapsed minutes update
  const [, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Audio fallback
    }
  };

  const handleStartCooking = (ticketId: string) => {
    const updated = tickets.map((t) =>
      t.id === ticketId ? { ...t, status: 'In Preparation' as const } : t
    );
    updateTicketsState(updated);
    playBeep();
    showMessage(`Order ${ticketId} started preparation! 🔥`);
  };

  const handleMarkReady = (ticketId: string) => {
    const updated = tickets.map((t) =>
      t.id === ticketId ? { ...t, status: 'Ready' as const } : t
    );
    updateTicketsState(updated);
    playBeep();
    showMessage(`Order ${ticketId} is MARKED READY! ✅`);
  };

  const handleCompleteOrder = (ticketId: string) => {
    const updated = tickets.map((t) =>
      t.id === ticketId ? { ...t, status: 'Served' as const } : t
    );
    updateTicketsState(updated);
    showMessage(`Order ${ticketId} completed and served! 🍽️`);
  };

  const handleAddManualTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualItemName.trim()) return;

    const newTicket: KitchenTicket = {
      id: `TICKET #${Math.floor(100 + Math.random() * 900)}`,
      orderType: manualType,
      tableNo: manualTable.trim() || 'Table 1',
      status: 'Pending',
      items: [{ name: manualItemName.trim(), quantity: manualQty, notes: manualNotes.trim() }],
      createdAt: Date.now(),
      customerName: 'Walk-in Guest',
    };

    const updated = [newTicket, ...tickets];
    updateTicketsState(updated);
    setIsAddModalOpen(false);
    setManualItemName('');
    setManualNotes('');
    setManualQty(1);
    playBeep();
    showMessage(`New kitchen ticket ${newTicket.id} added!`);
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 4000);
  };

  const getElapsedTimeStr = (timestamp: number) => {
    const mins = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
    if (mins < 1) return 'Just now';
    return `${mins}m ago`;
  };

  const pendingTickets = tickets.filter((t) => t.status === 'Pending');
  const preparingTickets = tickets.filter((t) => t.status === 'In Preparation');
  const readyTickets = tickets.filter((t) => t.status === 'Ready');

  const filteredTickets = (list: KitchenTicket[]) => {
    if (filterType === 'all') return list;
    return list.filter((t) => t.orderType.toLowerCase() === filterType.toLowerCase());
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <ChefHat className="w-4 h-4" /> Live Kitchen Operations
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1 flex items-center gap-2">
            Kitchen Display System (KDS)
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Real-time order tickets for kitchen staff and head chefs.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              soundEnabled
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-gray-100 text-gray-600 border-gray-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
            <span>{soundEnabled ? 'Alert Sound ON' : 'Muted'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-crimson px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Manual Ticket
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          {message}
        </div>
      )}

      {/* Order Type Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#8B0000]/10 pb-3 overflow-x-auto">
        {['all', 'dine-in', 'takeaway', 'delivery'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all whitespace-nowrap ${
              filterType === type
                ? 'bg-[#8B0000] text-white shadow-sm'
                : 'bg-white text-[#6b5840] hover:bg-[#F8F5F0] border border-[#8B0000]/10'
            }`}
          >
            {type === 'all' ? 'All Kitchen Tickets' : type}
          </button>
        ))}
      </div>

      {/* 3 Status Columns Kanban Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: NEW / PENDING */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-red-50 border border-red-200 text-red-900">
            <div className="flex items-center gap-2 font-extrabold text-xs">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>1. NEW / PENDING ORDERS</span>
            </div>
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
              {filteredTickets(pendingTickets).length}
            </span>
          </div>

          <div className="space-y-4">
            {filteredTickets(pendingTickets).map((ticket) => (
              <div
                key={ticket.id}
                className="glass-card bg-white border-2 border-red-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex justify-between items-start border-b border-red-100 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md uppercase">
                      {ticket.id}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#1a1008] mt-1">{ticket.tableNo}</h3>
                    {ticket.customerName && (
                      <p className="text-[11px] text-[#6b5840] font-semibold">{ticket.customerName}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 text-[#4a3820]">
                      {ticket.orderType}
                    </span>
                    <div className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1 justify-end">
                      <Clock className="w-3 h-3" /> {getElapsedTimeStr(ticket.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <ul className="space-y-2 text-xs">
                  {ticket.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-start bg-[#FFF8F5] p-2 rounded-xl border border-red-100">
                      <div>
                        <span className="font-extrabold text-[#1a1008]">{item.quantity}x {item.name}</span>
                        {item.notes && <p className="text-[10px] text-red-700 font-semibold italic">Note: {item.notes}</p>}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => handleStartCooking(ticket.id)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Start Cooking
                </button>
              </div>
            ))}

            {filteredTickets(pendingTickets).length === 0 && (
              <div className="p-8 text-center glass-card bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
                No new pending tickets.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: IN PREPARATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <div className="flex items-center gap-2 font-extrabold text-xs">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>2. IN PREPARATION / COOKING</span>
            </div>
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
              {filteredTickets(preparingTickets).length}
            </span>
          </div>

          <div className="space-y-4">
            {filteredTickets(preparingTickets).map((ticket) => (
              <div
                key={ticket.id}
                className="glass-card bg-white border-2 border-amber-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex justify-between items-start border-b border-amber-100 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md uppercase">
                      {ticket.id}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#1a1008] mt-1">{ticket.tableNo}</h3>
                    {ticket.customerName && (
                      <p className="text-[11px] text-[#6b5840] font-semibold">{ticket.customerName}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 text-[#4a3820]">
                      {ticket.orderType}
                    </span>
                    <div className="text-[11px] font-extrabold text-amber-700 flex items-center gap-1 mt-1 justify-end">
                      <Clock className="w-3 h-3" /> {getElapsedTimeStr(ticket.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <ul className="space-y-2 text-xs">
                  {ticket.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-start bg-[#FFFDF5] p-2 rounded-xl border border-amber-100">
                      <div>
                        <span className="font-extrabold text-[#1a1008]">{item.quantity}x {item.name}</span>
                        {item.notes && <p className="text-[10px] text-amber-800 font-semibold italic">Note: {item.notes}</p>}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Mark Ready Button */}
                <button
                  onClick={() => handleMarkReady(ticket.id)}
                  className="w-full py-2.5 rounded-xl btn-crimson text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark Ready
                </button>
              </div>
            ))}

            {filteredTickets(preparingTickets).length === 0 && (
              <div className="p-8 text-center glass-card bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
                No orders currently cooking.
              </div>
            )}
          </div>
        </div>

        {/* Column 3: READY FOR SERVING */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-center gap-2 font-extrabold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. READY FOR SERVING</span>
            </div>
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              {filteredTickets(readyTickets).length}
            </span>
          </div>

          <div className="space-y-4">
            {filteredTickets(readyTickets).map((ticket) => (
              <div
                key={ticket.id}
                className="glass-card bg-emerald-50/40 border-2 border-emerald-400 rounded-2xl p-5 shadow-md transition-all space-y-3"
              >
                <div className="flex justify-between items-start border-b border-emerald-200 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md uppercase">
                      {ticket.id}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#1a1008] mt-1">{ticket.tableNo}</h3>
                    {ticket.customerName && (
                      <p className="text-[11px] text-[#6b5840] font-semibold">{ticket.customerName}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full">
                      READY ✅
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <ul className="space-y-2 text-xs">
                  {ticket.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-start bg-white p-2 rounded-xl border border-emerald-200">
                      <div>
                        <span className="font-extrabold text-[#1a1008]">{item.quantity}x {item.name}</span>
                        {item.notes && <p className="text-[10px] text-emerald-800 font-semibold italic">Note: {item.notes}</p>}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Serve / Complete Button */}
                <button
                  onClick={() => handleCompleteOrder(ticket.id)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Serve & Clear Ticket
                </button>
              </div>
            ))}

            {filteredTickets(readyTickets).length === 0 && (
              <div className="p-8 text-center glass-card bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
                No orders waiting for pickup.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Manual Kitchen Ticket Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-3">
              <h3 className="font-extrabold text-sm text-[#1a1008] flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#8B0000]" /> Create Kitchen Ticket
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#a09070] font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddManualTicket} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Order Type</label>
                <select
                  value={manualType}
                  onChange={(e) => setManualType(e.target.value as any)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="Dine-In">Dine-In</option>
                  <option value="Takeaway">Takeaway</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Table / Identifier</label>
                <input
                  type="text"
                  required
                  value={manualTable}
                  onChange={(e) => setManualTable(e.target.value)}
                  placeholder="e.g. Table 4 or Counter"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={manualItemName}
                  onChange={(e) => setManualItemName(e.target.value)}
                  placeholder="e.g. Artisanal Margherita Pizza"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={manualQty}
                    onChange={(e) => setManualQty(Number(e.target.value))}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Kitchen Notes</label>
                  <input
                    type="text"
                    value={manualNotes}
                    onChange={(e) => setManualNotes(e.target.value)}
                    placeholder="e.g. Extra spicy"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border text-gray-600 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-crimson py-2 rounded-xl font-bold">
                  Send to Kitchen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
