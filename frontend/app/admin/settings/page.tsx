'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  DollarSign,
  Percent,
  Bell,
  CreditCard,
  Printer,
  Save,
  RotateCcw,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  Volume2,
  Flame,
  Globe,
} from 'lucide-react';

interface SettingsState {
  restaurantName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  gstTaxRate: number;
  serviceCharge: number;
  receiptFooter: string;
  autoAcceptOrders: boolean;
  kdsRefreshInterval: number;
  dineInEnabled: boolean;
  takeawayEnabled: boolean;
  deliveryEnabled: boolean;
  soundAlerts: boolean;
  razorpayMode: 'test' | 'live';
  emailNotifications: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  restaurantName: 'Giri Restaurant',
  tagline: 'Good Food, Great Experience',
  phone: '+91 98765 43210',
  email: 'contact@girirestaurant.com',
  address: '123 Gourmet Avenue, Culinary District, Bangalore',
  currency: '₹ (INR)',
  gstTaxRate: 5,
  serviceCharge: 2.5,
  receiptFooter: 'Thank you for dining with Giri Restaurant! Visit again.',
  autoAcceptOrders: true,
  kdsRefreshInterval: 5,
  dineInEnabled: true,
  takeawayEnabled: true,
  deliveryEnabled: true,
  soundAlerts: true,
  razorpayMode: 'test',
  emailNotifications: true,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'general' | 'financial' | 'operations' | 'payments'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('giri_erp_settings');
    if (stored) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      } catch (e) {
        console.error('Failed to parse stored ERP settings:', e);
      }
    }
  }, []);

  const handleChange = (field: keyof SettingsState, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('giri_erp_settings', JSON.stringify(settings));
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 400);
  };

  const handleReset = () => {
    if (confirm('Reset all ERP settings to factory defaults?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem('giri_erp_settings');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#8B0000]/10 text-[#8B0000]">
              <Sliders className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">System Settings & ERP Config</h1>
          </div>
          <p className="text-xs text-[#6b5840] mt-1">
            Configure global restaurant preferences, tax rates, operational toggles, and payment gateways.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 btn-crimson px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md active:scale-95"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save ERP Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>ERP System Configuration saved successfully! Settings applied live across all modules.</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#C8A055]/20 pb-1">
        {[
          { id: 'general', label: 'General Info', icon: Building2 },
          { id: 'financial', label: 'Tax & Financials', icon: DollarSign },
          { id: 'operations', label: 'KDS & Operations', icon: Flame },
          { id: 'payments', label: 'Payments & Gateway', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#8B0000] text-white shadow-md'
                  : 'bg-white text-[#6b5840] hover:bg-[#F8F5F0] border border-[#8B0000]/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: General Info */}
        {activeTab === 'general' && (
          <div className="glass-card p-6 rounded-2xl border border-[#8B0000]/10 space-y-5 bg-white shadow-sm">
            <div className="border-b pb-3 mb-2 flex items-center gap-2 text-[#8B0000] font-extrabold text-sm">
              <Building2 className="w-4 h-4" />
              <span>Restaurant Identity & Branding</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Restaurant Name *</label>
                <input
                  type="text"
                  value={settings.restaurantName}
                  onChange={(e) => handleChange('restaurantName', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Tagline / Slogan</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#8B0000]" />
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#8B0000]" />
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
                Primary Address
              </label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Financial & Tax */}
        {activeTab === 'financial' && (
          <div className="glass-card p-6 rounded-2xl border border-[#8B0000]/10 space-y-5 bg-white shadow-sm">
            <div className="border-b pb-3 mb-2 flex items-center gap-2 text-[#8B0000] font-extrabold text-sm">
              <Percent className="w-4 h-4" />
              <span>Tax Structure & Invoice Setup</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#8B0000]" />
                  Display Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  <option value="₹ (INR)">₹ (INR - Indian Rupee)</option>
                  <option value="$ (USD)">$ (USD - US Dollar)</option>
                  <option value="€ (EUR)">€ (EUR - Euro)</option>
                  <option value="AED">AED (UAE Dirham)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-[#8B0000]" />
                  GST Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.gstTaxRate}
                  onChange={(e) => handleChange('gstTaxRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Service Charge (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.serviceCharge}
                  onChange={(e) => handleChange('serviceCharge', parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                <Printer className="w-3.5 h-3.5 text-[#8B0000]" />
                Receipt / Invoice Footer Note
              </label>
              <input
                type="text"
                value={settings.receiptFooter}
                onChange={(e) => handleChange('receiptFooter', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Operations & KDS */}
        {activeTab === 'operations' && (
          <div className="glass-card p-6 rounded-2xl border border-[#8B0000]/10 space-y-5 bg-white shadow-sm">
            <div className="border-b pb-3 mb-2 flex items-center gap-2 text-[#8B0000] font-extrabold text-sm">
              <Flame className="w-4 h-4" />
              <span>Kitchen Display & Service Channels</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8B0000]" />
                  KDS Auto Refresh (Seconds)
                </label>
                <input
                  type="number"
                  min="2"
                  max="60"
                  value={settings.kdsRefreshInterval}
                  onChange={(e) => handleChange('kdsRefreshInterval', parseInt(e.target.value) || 5)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F5F0] border border-[#8B0000]/10">
                <div>
                  <div className="text-xs font-bold text-[#1a1008]">Auto-accept New Orders</div>
                  <div className="text-[10px] text-[#6b5840]">Send online orders to kitchen immediately</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoAcceptOrders}
                  onChange={(e) => handleChange('autoAcceptOrders', e.target.checked)}
                  className="w-4 h-4 accent-[#8B0000] cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-[#4a3820]">Active Service Channels</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'dineInEnabled', label: 'Dine-In Tables' },
                  { key: 'takeawayEnabled', label: 'Takeaway Counter' },
                  { key: 'deliveryEnabled', label: 'Home Delivery' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F8F5F0] border border-[#8B0000]/10 cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-[#1a1008]">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof SettingsState] as boolean}
                      onChange={(e) => handleChange(item.key as any, e.target.checked)}
                      className="w-4 h-4 accent-[#8B0000] cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Payments & Security */}
        {activeTab === 'payments' && (
          <div className="glass-card p-6 rounded-2xl border border-[#8B0000]/10 space-y-5 bg-white shadow-sm">
            <div className="border-b pb-3 mb-2 flex items-center gap-2 text-[#8B0000] font-extrabold text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Payment Gateway & Audio Notifications</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B0000]" />
                  Razorpay Mode
                </label>
                <select
                  value={settings.razorpayMode}
                  onChange={(e) => handleChange('razorpayMode', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  <option value="test">Test Mode (Simulation)</option>
                  <option value="live">Live Production Mode</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F5F0] border border-[#8B0000]/10 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#8B0000]" />
                    <span className="text-xs font-semibold text-[#1a1008]">New Order Sound Alerts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundAlerts}
                    onChange={(e) => handleChange('soundAlerts', e.target.checked)}
                    className="w-4 h-4 accent-[#8B0000] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F5F0] border border-[#8B0000]/10 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#8B0000]" />
                    <span className="text-xs font-semibold text-[#1a1008]">Email Summary Reports</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                    className="w-4 h-4 accent-[#8B0000] cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 btn-crimson px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md active:scale-95"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save ERP Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
