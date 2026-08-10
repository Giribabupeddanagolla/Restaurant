'use client';

import { useState } from 'react';
import { formatCurrency } from '@/utils/formatters';
import {
  BarChart3, TrendingUp, DollarSign, ShoppingBag, Receipt, Download,
  Calendar, ArrowUpRight, PieChart, Sparkles, Filter, ShieldCheck, Utensils
} from 'lucide-react';

interface RevenueRecord {
  period: string;
  ordersCount: number;
  grossRevenue: number;
  taxAmount: number;
  discounts: number;
  netProfit: number;
}

const REPORT_DATA: Record<string, RevenueRecord[]> = {
  month: [
    { period: 'Week 1 (Aug 1 - 7)',    ordersCount: 312, grossRevenue: 71125, taxAmount: 3556, discounts: 2100, netProfit: 49600 },
    { period: 'Week 2 (Aug 8 - 14)',   ordersCount: 298, grossRevenue: 68400, taxAmount: 3420, discounts: 1950, netProfit: 47800 },
    { period: 'Week 3 (Aug 15 - 21)',  ordersCount: 345, grossRevenue: 78900, taxAmount: 3945, discounts: 2400, netProfit: 55100 },
    { period: 'Week 4 (Aug 22 - 31)',  ordersCount: 293, grossRevenue: 66075, taxAmount: 3304, discounts: 1800, netProfit: 45900 },
  ],
  today: [
    { period: 'Lunch Shift (11am - 4pm)',  ordersCount: 42, grossRevenue: 12800, taxAmount: 640, discounts: 350, netProfit: 8900 },
    { period: 'Dinner Shift (5pm - 11pm)', ordersCount: 68, grossRevenue: 24500, taxAmount: 1225, discounts: 700, netProfit: 17100 },
  ],
  year: [
    { period: 'Q1 (Jan - Mar)', ordersCount: 3420, grossRevenue: 785000, taxAmount: 39250, discounts: 22000, netProfit: 549500 },
    { period: 'Q2 (Apr - Jun)', ordersCount: 3890, grossRevenue: 894000, taxAmount: 44700, discounts: 26500, netProfit: 625800 },
    { period: 'Q3 (Jul - Sep)', ordersCount: 4120, grossRevenue: 945000, taxAmount: 47250, discounts: 28000, netProfit: 661500 },
  ],
};

const TOP_SELLING_DISHES = [
  { name: 'Truffle Mushroom Risotto', category: 'Specials', salesCount: 342, totalRevenue: 222300, percentage: 85 },
  { name: 'Smoked Wagyu Beef Burger', category: 'Pizzas & Burgers', salesCount: 284, totalRevenue: 221520, percentage: 78 },
  { name: 'Crispy Pan-Seared Salmon', category: 'Mains', salesCount: 215, totalRevenue: 182750, percentage: 65 },
  { name: 'Artisanal Margherita Pizza', category: 'Pizzas', salesCount: 310, totalRevenue: 170500, percentage: 60 },
  { name: 'Molten Chocolate Lava Cake', category: 'Desserts', salesCount: 412, totalRevenue: 144200, percentage: 50 },
];

export default function AdminReportsPage() {
  const [timeframe, setTimeframe] = useState<'today' | 'month' | 'year'>('month');
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const currentRecords = REPORT_DATA[timeframe] || REPORT_DATA.month;

  // Calculated Metrics
  const totalRevenue = currentRecords.reduce((sum, r) => sum + r.grossRevenue, 0);
  const totalOrders  = currentRecords.reduce((sum, r) => sum + r.ordersCount, 0);
  const totalTax     = currentRecords.reduce((sum, r) => sum + r.taxAmount, 0);
  const totalProfit  = currentRecords.reduce((sum, r) => sum + r.netProfit, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const handleExportCSV = () => {
    setExporting(true);
    setTimeout(() => {
      // Generate CSV text
      const headers = 'Period,Orders Count,Gross Revenue (INR),Tax (INR),Discounts (INR),Net Profit (INR)\n';
      const rows = currentRecords
        .map((r) => `"${r.period}",${r.ordersCount},${r.grossRevenue},${r.taxAmount},${r.discounts},${r.netProfit}`)
        .join('\n');
      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
      
      const link = document.createElement('a');
      link.setAttribute('href', csvContent);
      link.setAttribute('download', `Giri_Financial_Report_${timeframe}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExporting(false);
      setMessage('Financial report exported successfully as CSV! 📥');
      setTimeout(() => setMessage(null), 4000);
    }, 600);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" /> Financial Analytics & Accounting
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Financial & Analytics Reports
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Track sales performance, channel breakdowns, tax liabilities, and net profit margins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" /> {exporting ? 'Generating Report...' : 'Export Financial Report (CSV)'}
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          {message}
        </div>
      )}

      {/* Timeframe Filter Tabs */}
      <div className="glass-card p-2 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center gap-2 w-fit">
        <span className="text-xs text-[#6b5840] font-bold px-3 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-[#8B0000]" /> Date Filter:
        </span>
        {[
          { id: 'today', label: 'Today (Shift Split)' },
          { id: 'month', label: 'This Month (Weekly)' },
          { id: 'year',  label: 'Year-to-Date (Quarterly)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTimeframe(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              timeframe === tab.id
                ? 'bg-[#8B0000] text-white shadow-sm'
                : 'text-[#4a3820] hover:bg-[#F8F5F0]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-[11px] font-bold text-[#a09070] uppercase whitespace-nowrap truncate">Total Gross Revenue</div>
            <div className="text-xl md:text-2xl font-extrabold text-[#1a1008] mt-1 whitespace-nowrap truncate">{formatCurrency(totalRevenue)}</div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3 shrink-0" /> +14.2% vs previous period
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 shadow-xs">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-[11px] font-bold text-[#a09070] uppercase whitespace-nowrap truncate">Orders Processed</div>
            <div className="text-xl md:text-2xl font-extrabold text-[#1a1008] mt-1 whitespace-nowrap truncate">{totalOrders.toLocaleString()} orders</div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3 shrink-0" /> +8.6% order volume
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] shrink-0 shadow-xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-[11px] font-bold text-[#a09070] uppercase whitespace-nowrap truncate">Average Order Value</div>
            <div className="text-xl md:text-2xl font-extrabold text-[#1a1008] mt-1 whitespace-nowrap truncate">{formatCurrency(avgOrderValue)}</div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3 shrink-0" /> Higher ticket size
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 shrink-0 shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-emerald-300 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-[11px] font-bold text-emerald-800 uppercase whitespace-nowrap truncate">Estimated Net Profit</div>
            <div className="text-xl md:text-2xl font-extrabold text-emerald-700 mt-1 whitespace-nowrap truncate">{formatCurrency(totalProfit)}</div>
            <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 mt-1 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 shrink-0" /> ~70% Net margin
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 shadow-xs">
            <Receipt className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytics Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Channel Revenue Split */}
        <div className="glass-card bg-white p-6 rounded-2xl border border-[#8B0000]/15 space-y-4">
          <h3 className="text-sm font-extrabold text-[#1a1008] flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#8B0000]" /> Sales Channel Split
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-extrabold mb-1 gap-2">
                <span className="whitespace-nowrap truncate">🍽️ Dine-In Restaurant</span>
                <span className="text-[#8B0000] whitespace-nowrap shrink-0">{formatCurrency(Math.round(totalRevenue * 0.5))} (50%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-[#8B0000] w-[50%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-extrabold mb-1 gap-2">
                <span className="whitespace-nowrap truncate">🥡 Takeaway Counter</span>
                <span className="text-amber-800 whitespace-nowrap shrink-0">{formatCurrency(Math.round(totalRevenue * 0.3))} (30%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-amber-600 w-[30%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-extrabold mb-1 gap-2">
                <span className="whitespace-nowrap truncate">🛵 Online & Delivery</span>
                <span className="text-blue-800 whitespace-nowrap shrink-0">{formatCurrency(Math.round(totalRevenue * 0.2))} (20%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-blue-600 w-[20%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Split */}
        <div className="glass-card bg-white p-6 rounded-2xl border border-[#8B0000]/15 space-y-4">
          <h3 className="text-sm font-extrabold text-[#1a1008] flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" /> Payment Method Breakdown
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-extrabold mb-1 gap-2">
                <span className="whitespace-nowrap truncate">📱 UPI / Online Instant</span>
                <span className="text-purple-800 whitespace-nowrap shrink-0">45%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-purple-600 w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-extrabold mb-1 gap-2">
                <span className="whitespace-nowrap truncate">💳 Credit / Debit Cards</span>
                <span className="text-blue-800 whitespace-nowrap shrink-0">35%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-blue-600 w-[35%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-extrabold mb-1 gap-2">
                <span className="whitespace-nowrap truncate">💵 Cash Payments</span>
                <span className="text-emerald-800 whitespace-nowrap shrink-0">20%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-emerald-600 w-[20%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Dish Performers */}
        <div className="glass-card bg-white p-6 rounded-2xl border border-[#8B0000]/15 space-y-4">
          <h3 className="text-sm font-extrabold text-[#1a1008] flex items-center gap-2">
            <Utensils className="w-4 h-4 text-[#C8A055]" /> Top Revenue Dishes
          </h3>

          <div className="space-y-2.5 text-xs">
            {TOP_SELLING_DISHES.slice(0, 3).map((dish) => (
              <div key={dish.name} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FFF8F0] border border-[#8B0000]/10 overflow-hidden">
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[#1a1008] text-xs truncate" title={dish.name}>{dish.name}</div>
                  <span className="text-[10px] text-[#a09070] whitespace-nowrap">{dish.salesCount} orders sold</span>
                </div>
                <span className="font-extrabold text-[#8B0000] text-xs whitespace-nowrap shrink-0">{formatCurrency(dish.totalRevenue)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Revenue Breakdown Table */}
      <div className="glass-card bg-white rounded-2xl border border-[#8B0000]/15 overflow-hidden shadow-sm space-y-3">
        <div className="p-4 bg-[#F8F5F0] border-b border-[#8B0000]/10 flex justify-between items-center flex-wrap gap-2">
          <h3 className="font-extrabold text-sm text-[#1a1008] flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#8B0000]" /> Financial Breakdown Table ({timeframe.toUpperCase()})
          </h3>
          <span className="text-xs text-[#8B0000] font-bold bg-[#FFF8F0] border border-[#8B0000]/20 px-2.5 py-1 rounded-lg whitespace-nowrap">
            GST Tax Liability: {formatCurrency(totalTax)}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1a1008] border-collapse">
            <thead className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-4 py-3.5 min-w-[180px] whitespace-nowrap">Time Period</th>
                <th className="px-4 py-3.5 min-w-[120px] whitespace-nowrap">Orders Count</th>
                <th className="px-4 py-3.5 min-w-[150px] whitespace-nowrap">Gross Revenue</th>
                <th className="px-4 py-3.5 min-w-[120px] whitespace-nowrap">Tax (5% GST)</th>
                <th className="px-4 py-3.5 min-w-[130px] whitespace-nowrap">Discounts Given</th>
                <th className="px-4 py-3.5 min-w-[150px] text-right whitespace-nowrap">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium">
              {currentRecords.map((record, idx) => (
                <tr key={idx} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="px-4 py-3.5 align-middle font-extrabold text-[#1a1008] whitespace-nowrap">{record.period}</td>
                  <td className="px-4 py-3.5 align-middle font-bold whitespace-nowrap">{record.ordersCount} orders</td>
                  <td className="px-4 py-3.5 align-middle font-extrabold text-[#8B0000] whitespace-nowrap">{formatCurrency(record.grossRevenue)}</td>
                  <td className="px-4 py-3.5 align-middle text-[#6b5840] whitespace-nowrap">{formatCurrency(record.taxAmount)}</td>
                  <td className="px-4 py-3.5 align-middle text-red-600 font-semibold whitespace-nowrap">-{formatCurrency(record.discounts)}</td>
                  <td className="px-4 py-3.5 align-middle text-right font-extrabold text-emerald-800 whitespace-nowrap">{formatCurrency(record.netProfit)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F8F5F0] font-extrabold border-t border-[#8B0000]/20 text-xs">
              <tr>
                <td className="px-4 py-3.5 uppercase whitespace-nowrap">Total Summary</td>
                <td className="px-4 py-3.5 whitespace-nowrap">{totalOrders} orders</td>
                <td className="px-4 py-3.5 text-[#8B0000] text-sm whitespace-nowrap">{formatCurrency(totalRevenue)}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">{formatCurrency(totalTax)}</td>
                <td className="px-4 py-3.5 text-red-600 whitespace-nowrap">-{formatCurrency(currentRecords.reduce((s, r) => s + r.discounts, 0))}</td>
                <td className="px-4 py-3.5 text-right text-emerald-800 text-sm whitespace-nowrap">{formatCurrency(totalProfit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}
