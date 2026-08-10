'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/formatters';
import { inventoryApi } from '@/services/restaurantService';
import {
  Boxes, Plus, Search, AlertTriangle, CheckCircle, RefreshCw,
  Edit2, Trash2, TrendingUp, DollarSign, Filter, Sparkles, AlertCircle, Menu, X, CheckCircle2
} from 'lucide-react';

export interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  unitPrice: number;
  supplier: string;
  lastRestocked?: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    itemName: 'Arborio Risotto Rice',
    category: 'Grains & Flour',
    quantity: 25,
    unit: 'kg',
    minThreshold: 10,
    unitPrice: 180,
    supplier: 'Gourmet Imports Ltd.',
    lastRestocked: '2026-08-01',
  },
  {
    id: 'inv-2',
    itemName: 'Black Truffle Oil',
    category: 'Spices & Oils',
    quantity: 3,
    unit: 'bottles',
    minThreshold: 5,
    unitPrice: 1200,
    supplier: 'Tuscany Fine Foods',
    lastRestocked: '2026-07-25',
  },
  {
    id: 'inv-3',
    itemName: 'Wagyu Beef Patties',
    category: 'Meats & Seafood',
    quantity: 4,
    unit: 'kg',
    minThreshold: 8,
    unitPrice: 950,
    supplier: 'Prime Butchery Co.',
    lastRestocked: '2026-08-04',
  },
  {
    id: 'inv-4',
    itemName: 'Fresh Buffalo Mozzarella',
    category: 'Dairy & Cheese',
    quantity: 18,
    unit: 'kg',
    minThreshold: 10,
    unitPrice: 420,
    supplier: 'Artisan Dairy Farms',
    lastRestocked: '2026-08-05',
  },
  {
    id: 'inv-5',
    itemName: 'Atlantic Salmon Fillets',
    category: 'Meats & Seafood',
    quantity: 12,
    unit: 'kg',
    minThreshold: 6,
    unitPrice: 850,
    supplier: 'Oceanic Seafood Co.',
    lastRestocked: '2026-08-06',
  },
  {
    id: 'inv-6',
    itemName: 'Alphonso Mango Puree',
    category: 'Beverages & Fruit',
    quantity: 2,
    unit: 'L',
    minThreshold: 5,
    unitPrice: 320,
    supplier: 'Sunberry Beverages',
    lastRestocked: '2026-07-28',
  },
  {
    id: 'inv-7',
    itemName: 'Belgian Dark Chocolate (70%)',
    category: 'Confectionery',
    quantity: 15,
    unit: 'kg',
    minThreshold: 5,
    unitPrice: 650,
    supplier: 'Cocoa Crafts',
    lastRestocked: '2026-08-02',
  },
];

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal Form State
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    itemName: '',
    category: 'Dairy & Cheese',
    quantity: 10,
    unit: 'kg',
    minThreshold: 5,
    unitPrice: 250,
    supplier: 'Local Market Supplier',
  });

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await inventoryApi.getItems();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setItems(res.data);
        localStorage.setItem('giri_inventory_items', JSON.stringify(res.data));
      } else {
        loadStoredItems();
      }
    } catch (err) {
      loadStoredItems();
    } finally {
      setLoading(false);
    }
  };

  const loadStoredItems = () => {
    const saved = localStorage.getItem('giri_inventory_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setItems(INITIAL_INVENTORY);
    localStorage.setItem('giri_inventory_items', JSON.stringify(INITIAL_INVENTORY));
  };

  useEffect(() => {
    fetchInventory();
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

  const saveInventoryState = (newItems: InventoryItem[]) => {
    setItems(newItems);
    localStorage.setItem('giri_inventory_items', JSON.stringify(newItems));
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      itemName: '',
      category: 'Dairy & Cheese',
      quantity: 10,
      unit: 'kg',
      minThreshold: 5,
      unitPrice: 250,
      supplier: 'Local Market Supplier',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.itemName || formData.quantity === undefined || !formData.unitPrice) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    let updatedList: InventoryItem[] = [];

    try {
      if (editingItem) {
        const id = editingItem.id || (editingItem as any)._id;
        try {
          await inventoryApi.updateItem(id, formData);
        } catch (err) {
          console.log('Saved locally');
        }
        updatedList = items.map((i) =>
          (i.id || (i as any)._id) === id ? ({ ...i, ...formData } as InventoryItem) : i
        );
        setMessage({ type: 'success', text: `Item "${formData.itemName}" updated successfully!` });
      } else {
        try {
          const res = await inventoryApi.createItem(formData);
          if (res && res.data) {
            updatedList = [res.data, ...items];
          }
        } catch (err) {
          const newItem: InventoryItem = {
            id: `inv-${Date.now()}`,
            itemName: formData.itemName!,
            category: formData.category || 'General',
            quantity: Number(formData.quantity) || 0,
            unit: formData.unit || 'kg',
            minThreshold: Number(formData.minThreshold) || 5,
            unitPrice: Number(formData.unitPrice) || 100,
            supplier: formData.supplier || 'Local Supplier',
            lastRestocked: new Date().toISOString().split('T')[0],
          };
          updatedList = [newItem, ...items];
        }
        setMessage({ type: 'success', text: `Inventory item "${formData.itemName}" created!` });
      }

      saveInventoryState(updatedList);
      setIsModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (item: InventoryItem) => {
    if (!confirm(`Are you sure you want to delete ingredient "${item.itemName}"?`)) return;

    const id = item.id || (item as any)._id;
    const updated = items.filter((i) => (i.id || (i as any)._id) !== id && i.itemName !== item.itemName);
    saveInventoryState(updated);

    try {
      await inventoryApi.deleteItem(id);
    } catch (err) {
      console.log('Deleted locally');
    }
    setMessage({ type: 'success', text: `Item "${item.itemName}" removed from inventory!` });
  };

  const handleAdjustStock = (item: InventoryItem, delta: number) => {
    const newQty = Math.max(0, item.quantity + delta);
    const id = item.id || (item as any)._id;
    const updated = items.map((i) =>
      (i.id || (i as any)._id) === id ? { ...i, quantity: newQty, lastRestocked: new Date().toISOString().split('T')[0] } : i
    );
    saveInventoryState(updated);
  };

  // Metrics
  const totalValuation = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const lowStockItems = items.filter((item) => item.quantity <= item.minThreshold);
  const categoriesList = Array.from(new Set(items.map((i) => i.category)));

  // Filtered list
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      search === '' ||
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'low-stock' && item.quantity <= item.minThreshold) ||
      item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <Boxes className="w-4 h-4" /> ERP Raw Ingredients & Stock
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Track raw ingredients, reorder levels, supplier stock, and valuation in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInventory}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs"
            title="Refresh Inventory"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Inventory Item
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' : 'bg-red-50 border border-red-300 text-red-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {message.text}
        </div>
      )}

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Total Stock Items</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{items.length}</div>
          </div>
        </div>

        <div
          onClick={() => setSelectedCategory('low-stock')}
          className="glass-card bg-white p-5 rounded-2xl border border-red-300 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-red-700 uppercase">Low Stock Alerts</div>
            <div className="text-2xl font-extrabold text-red-600 flex items-center gap-1">
              {lowStockItems.length} {lowStockItems.length > 0 && <span className="text-xs text-red-500 font-semibold">(Requires Action)</span>}
            </div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Total Stock Valuation</div>
            <div className="text-xl font-extrabold text-[#1a1008]">{formatCurrency(totalValuation)}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Active Suppliers</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{Array.from(new Set(items.map(i => i.supplier))).length}</div>
          </div>
        </div>
      </div>

      {/* Search Bar with 3-Lines Category Filter Dropdown */}
      <div className="glass-card p-3 md:p-4 rounded-2xl bg-white border border-[#8B0000]/10 relative z-30 w-full">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070] z-10 pointer-events-none" />
          
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredient or supplier..."
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-12 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]"
          />

          {/* Vertical Divider */}
          <div className="absolute right-11 top-1/2 -translate-y-1/2 w-[1px] h-4 bg-[#8B0000]/20 z-10 pointer-events-none" />

          {/* Three Lines Menu / Filter Button */}
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors z-20 flex items-center justify-center cursor-pointer ${
              showFilterMenu ? 'bg-[#8B0000] text-white shadow-sm' : 'text-[#8B0000] hover:bg-[#8B0000]/10'
            }`}
            title="Toggle Inventory Category Filters"
            aria-label="Toggle Inventory Category Filters"
          >
            {showFilterMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

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
                    <span>Inventory Categories</span>
                    {selectedCategory !== 'all' && (
                      <span
                        onClick={() => setSelectedCategory('all')}
                        className="text-[9px] text-[#8B0000] hover:underline font-bold cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                          : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>📦</span>
                        <span>All Inventory Items</span>
                      </span>
                      {selectedCategory === 'all' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCategory('low-stock');
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === 'low-stock'
                          ? 'bg-red-600 text-white font-extrabold shadow-xs'
                          : 'text-red-700 bg-red-50 hover:bg-red-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>⚠️</span>
                        <span>Low Stock Alerts ({lowStockItems.length})</span>
                      </span>
                      {selectedCategory === 'low-stock' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>

                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🏷️</span>
                          <span>{cat}</span>
                        </span>
                        {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-card bg-white rounded-2xl border border-[#8B0000]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1a1008] border-collapse">
            <thead className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-4 py-3.5 min-w-[180px] whitespace-nowrap">Ingredient / Item</th>
                <th className="px-4 py-3.5 min-w-[140px] whitespace-nowrap">Category</th>
                <th className="px-4 py-3.5 min-w-[110px] whitespace-nowrap">Stock Level</th>
                <th className="px-4 py-3.5 min-w-[110px] whitespace-nowrap">Min Threshold</th>
                <th className="px-4 py-3.5 min-w-[130px] whitespace-nowrap">Unit Cost</th>
                <th className="px-4 py-3.5 min-w-[130px] whitespace-nowrap">Total Value</th>
                <th className="px-4 py-3.5 min-w-[170px] whitespace-nowrap">Supplier</th>
                <th className="px-4 py-3.5 min-w-[120px] text-center whitespace-nowrap">Quick Adjust</th>
                <th className="px-4 py-3.5 min-w-[100px] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium">
              {filteredItems.map((item) => {
                const isLow = item.quantity <= item.minThreshold;
                return (
                  <tr key={item.id || (item as any)._id} className={`hover:bg-[#FFF8F0]/60 transition-colors ${isLow ? 'bg-red-50/40' : ''}`}>
                    <td className="px-4 py-3.5 align-middle">
                      <div className="font-extrabold text-sm text-[#1a1008] whitespace-nowrap truncate max-w-[170px]" title={item.itemName}>{item.itemName}</div>
                      {isLow && (
                        <span className="text-[9px] font-bold text-red-600 bg-red-100 border border-red-200 px-1.5 py-0.5 rounded uppercase mt-0.5 inline-block whitespace-nowrap">
                          ⚠️ Needs Reorder
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                      <span className="inline-block whitespace-nowrap px-2.5 py-1 bg-[#F8F5F0] border border-[#8B0000]/10 text-[#4a3820] font-bold rounded-lg text-[11px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                      <div className="font-extrabold text-sm whitespace-nowrap">
                        <span className={isLow ? 'text-red-600' : 'text-emerald-700'}>{item.quantity}</span> {item.unit}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-middle text-[#6b5840] whitespace-nowrap">
                      {item.minThreshold} {item.unit}
                    </td>
                    <td className="px-4 py-3.5 align-middle font-bold whitespace-nowrap">{formatCurrency(item.unitPrice)} / {item.unit}</td>
                    <td className="px-4 py-3.5 align-middle font-extrabold text-[#8B0000] whitespace-nowrap">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </td>
                    <td className="px-4 py-3.5 align-middle">
                      <div className="text-[#6b5840] font-semibold text-xs whitespace-nowrap truncate max-w-[160px]" title={item.supplier}>{item.supplier}</div>
                    </td>
                    <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleAdjustStock(item, -1)}
                          className="w-7 h-7 bg-red-50 border border-red-200 text-red-700 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all flex items-center justify-center cursor-pointer whitespace-nowrap"
                          title="Consume 1 Unit"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleAdjustStock(item, 5)}
                          className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px] rounded-lg hover:bg-emerald-600 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                          title="Restock 5 Units"
                        >
                          +5
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl transition-all"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item)}
                          className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-xs text-[#6b5840]">
            <Boxes className="w-8 h-8 text-[#8B0000] mx-auto mb-2 opacity-50" />
            No inventory items found matching your filters.
          </div>
        )}
      </div>

      {/* Add / Edit Inventory Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <Boxes className="w-5 h-5 text-[#8B0000]" />
                {editingItem ? 'Edit Inventory Item' : 'Add New Inventory Ingredient'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveItem} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Item / Ingredient Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.itemName || ''}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    placeholder="e.g. Premium Arborio Risotto Rice"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Category *</label>
                    <select
                      value={formData.category || 'Dairy & Cheese'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Dairy & Cheese">Dairy & Cheese</option>
                      <option value="Meats & Seafood">Meats & Seafood</option>
                      <option value="Grains & Flour">Grains & Flour</option>
                      <option value="Produce & Vegetables">Produce & Vegetables</option>
                      <option value="Beverages & Fruit">Beverages & Fruit</option>
                      <option value="Spices & Oils">Spices & Oils</option>
                      <option value="Confectionery">Confectionery</option>
                      <option value="Packaging & Paper">Packaging & Paper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Stock Unit *</label>
                    <input
                      type="text"
                      required
                      value={formData.unit || 'kg'}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      placeholder="e.g. kg, L, pcs, bottles"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Current Stock Qty *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.quantity !== undefined ? formData.quantity : 10}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Min Reorder Level *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.minThreshold || 5}
                      onChange={(e) => setFormData({ ...formData, minThreshold: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Unit Cost (₹) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.unitPrice || ''}
                      onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                      placeholder="e.g. 250"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Supplier Name</label>
                    <input
                      type="text"
                      value={formData.supplier || ''}
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                      placeholder="e.g. Gourmet Imports Ltd."
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
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Inventory Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
