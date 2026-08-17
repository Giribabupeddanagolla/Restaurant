'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Edit, Trash2, ArrowLeft, CheckCircle2, Home, Briefcase, Tag, X } from 'lucide-react';

interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  houseFlat: string;
  streetArea: string;
  city: string;
  state: string;
  pincode: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault?: boolean;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    name: 'Ravi Kumar',
    phone: '+91 98765 43210',
    houseFlat: 'Flat 402, Royal Palms',
    streetArea: 'Jubilee Hills Road No. 36',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    type: 'HOME',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Ravi Kumar',
    phone: '+91 98765 43210',
    houseFlat: 'Block B, 7th Floor',
    streetArea: 'DLF Cyber City, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500032',
    type: 'WORK',
    isDefault: false,
  },
];

export default function UserAddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('Ravi Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [houseFlat, setHouseFlat] = useState('');
  const [streetArea, setStreetArea] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [stateName, setStateName] = useState('Telangana');
  const [pincode, setPincode] = useState('500033');
  const [type, setType] = useState<'HOME' | 'WORK' | 'OTHER'>('HOME');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!houseFlat || !streetArea) return;

    const created: SavedAddress = {
      id: `addr-${Date.now()}`,
      name,
      phone,
      houseFlat,
      streetArea,
      city,
      state: stateName,
      pincode,
      type,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, created]);
    setShowAddModal(false);
    setHouseFlat('');
    setStreetArea('');
    showToast('Saved new delivery address.');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this saved delivery address?')) {
      setAddresses(addresses.filter((a) => a.id !== id));
      showToast('Address removed.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {toastMsg && (
        <div className="bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/user/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Saved Delivery Addresses</h1>
            <p className="text-xs text-[#6b5840]">Manage home, work & custom delivery location snapshots for checkout</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#8B0000] text-white">
                {addr.type}
              </span>
              {addr.isDefault && (
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                  Default Address
                </span>
              )}
            </div>

            <div className="text-xs space-y-1">
              <div className="font-extrabold text-[#1a1008]">{addr.name} ({addr.phone})</div>
              <div className="font-bold text-[#4a3820]">{addr.houseFlat}, {addr.streetArea}</div>
              <div className="text-[11px] text-[#6b5840] font-mono">{addr.city}, {addr.state} • {addr.pincode}</div>
            </div>

            <div className="pt-2 border-t border-[#8B0000]/10 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => handleDelete(addr.id)}
                className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg font-bold"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <h2 className="text-base font-extrabold text-[#1a1008]">+ Add New Delivery Address</h2>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">House / Flat / Building *</label>
                <input
                  type="text"
                  required
                  value={houseFlat}
                  onChange={(e) => setHouseFlat(e.target.value)}
                  placeholder="e.g. Flat 402, Royal Palms"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Street / Area / Landmark *</label>
                <input
                  type="text"
                  required
                  value={streetArea}
                  onChange={(e) => setStreetArea(e.target.value)}
                  placeholder="e.g. Jubilee Hills Road No. 36"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">State</label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Address Tag Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                >
                  <option value="HOME">HOME</option>
                  <option value="WORK">WORK</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border">Cancel</button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
