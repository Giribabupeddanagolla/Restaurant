'use client';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold text-[#1a1008]">System Settings & Config</h1>
      <div className="glass-card p-6 rounded-2xl border border-[#8B0000]/10 space-y-4 max-w-xl">
        <div>
          <label className="block text-xs font-bold text-[#4a3820] mb-1">Restaurant Name</label>
          <input type="text" defaultValue="Giri Restaurant" className="w-full px-3 py-2 bg-[#F8F5F0] border rounded-xl text-xs" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4a3820] mb-1">GST Tax Rate (%)</label>
          <input type="number" defaultValue={5} className="w-full px-3 py-2 bg-[#F8F5F0] border rounded-xl text-xs" />
        </div>
        <button className="btn-crimson text-xs px-5 py-2.5 rounded-xl font-bold">Save ERP Settings</button>
      </div>
    </div>
  );
}
