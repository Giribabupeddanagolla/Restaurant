'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Utensils, Plus, Edit, Trash2, ArrowLeft, Search, X, Check, Leaf, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface DishItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  image: string;
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  tax: number;
  foodType: 'Veg' | 'Non-Veg' | 'Egg';
  spiceLevel: string;
  prepTime: string;
  available: boolean;
  rating?: number;
}

const INITIAL_DISHES: DishItem[] = [
  {
    id: 'd-101',
    name: 'Chicken Dum Biryani',
    category: 'Biryani',
    subCategory: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80',
    description: 'Slow-cooked aromatic basmati rice layered with juicy marinated chicken and spices.',
    price: 249,
    discount: 20,
    finalPrice: 229,
    tax: 5,
    foodType: 'Non-Veg',
    spiceLevel: 'Medium',
    prepTime: '25 mins',
    available: true,
    rating: 4.8,
  },
  {
    id: 'd-102',
    name: 'Royal Paneer Butter Masala',
    category: 'Main Course',
    subCategory: 'Veg Main Course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80',
    description: 'Soft cottage cheese cubes simmered in buttery tomato gravy.',
    price: 390,
    discount: 40,
    finalPrice: 350,
    tax: 5,
    foodType: 'Veg',
    spiceLevel: 'Mild',
    prepTime: '20 mins',
    available: true,
    rating: 4.7,
  },
  {
    id: 'd-103',
    name: 'Smoked BBQ Chicken Wings',
    category: 'Starters',
    subCategory: 'Chicken Starters',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&auto=format&fit=crop&q=80',
    description: 'Charcoal grilled chicken wings glazed with sweet smoked BBQ marinade.',
    price: 350,
    discount: 30,
    finalPrice: 320,
    tax: 5,
    foodType: 'Non-Veg',
    spiceLevel: 'Spicy',
    prepTime: '18 mins',
    available: true,
    rating: 4.6,
  },
];

export default function MerchantDishesPage() {
  const [dishes, setDishes] = useState<DishItem[]>(INITIAL_DISHES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Biryani');
  const [subCategory, setSubCategory] = useState('Chicken Biryani');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(249);
  const [discount, setDiscount] = useState<number>(20);
  const [tax, setTax] = useState<number>(5);
  const [foodType, setFoodType] = useState<'Veg' | 'Non-Veg' | 'Egg'>('Non-Veg');
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [prepTime, setPrepTime] = useState('25 mins');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('giri_merchant_dishes') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        const sanitized = stored.map((d: any) => {
          const numPrice = Number(d.price) || 0;
          const numDiscount = Number(d.discount) || 0;
          const finalPrice = typeof d.finalPrice === 'number' ? d.finalPrice : Math.max(0, numPrice - numDiscount);
          return {
            ...d,
            price: numPrice,
            discount: numDiscount,
            finalPrice,
          };
        });
        setDishes(sanitized);
      }
    } catch (e) {}
  }, []);

  const saveToStorage = (list: DishItem[]) => {
    setDishes(list);
    try {
      localStorage.setItem('giri_merchant_dishes', JSON.stringify(list));

      // Sync with global stored dishes so it appears on the public menu page
      const existingGlobal = JSON.parse(localStorage.getItem('royal_restaurant_dishes_v2026_fine_dining_fix') || '[]');
      const curMerchant = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
      const userAuth = JSON.parse(localStorage.getItem('royal_user') || '{}');
      const mShopName = curMerchant.shopName || curMerchant.name || curMerchant.shopProfile?.shopName || userAuth.shopName || userAuth.name || 'RK Restaurant';
      const mShopSlug = mShopName.toLowerCase().replace(/\s+/g, '-');
      const mId = curMerchant.id || curMerchant._id || `merchant-${mShopSlug}`;

      const formattedMerchantItems = list.map((d) => ({
        ...d,
        merchantId: mId,
        shopName: mShopName,
        shopSlug: mShopSlug,
        dietary: [d.foodType ? d.foodType.toLowerCase() : 'veg'],
      }));

      const mergedGlobal = [...formattedMerchantItems, ...existingGlobal.filter((g: any) => g.merchantId !== mId && g.shopName !== mShopName)];
      localStorage.setItem('royal_restaurant_dishes_v2026_fine_dining_fix', JSON.stringify(mergedGlobal));
    } catch (e) {}
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const numPrice = Number(price);
    const numDiscount = Number(discount);

    if (numPrice < 0 || numDiscount < 0) {
      setErrorMessage('Original price and discount cannot be negative!');
      return;
    }
    if (numDiscount > numPrice) {
      setErrorMessage('Discount cannot be greater than original price!');
      return;
    }

    const finalPrice = Math.max(0, numPrice - numDiscount);
    const curMerchant = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
    const userAuth = JSON.parse(localStorage.getItem('royal_user') || '{}');
    const mShopName = curMerchant.shopName || curMerchant.name || curMerchant.shopProfile?.shopName || userAuth.shopName || userAuth.name || 'RK Restaurant';
    const mShopSlug = mShopName.toLowerCase().replace(/\s+/g, '-');
    const mId = curMerchant.id || curMerchant._id || `merchant-${mShopSlug}`;

    if (editingId) {
      const updated = dishes.map((d) =>
        d.id === editingId
          ? {
              ...d,
              merchantId: mId,
              shopName: mShopName,
              shopSlug: mShopSlug,
              name,
              category,
              subCategory,
              image: image || d.image,
              description,
              price: numPrice,
              discount: numDiscount,
              finalPrice,
              tax: Number(tax) || 0,
              foodType,
              spiceLevel,
              prepTime,
              available,
            }
          : d
      );
      saveToStorage(updated);
    } else {
      const created: DishItem & { merchantId: string; shopName: string; shopSlug: string } = {
        id: `dish-${Date.now()}`,
        merchantId: mId,
        shopName: mShopName,
        shopSlug: mShopSlug,
        name,
        category,
        subCategory,
        image: image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80',
        description,
        price: numPrice,
        discount: numDiscount,
        finalPrice,
        tax: Number(tax) || 0,
        foodType,
        spiceLevel,
        prepTime,
        available,
        rating: 4.8,
      };
      saveToStorage([created, ...dishes]);
    }

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCategory('Biryani');
    setSubCategory('Chicken Biryani');
    setImage('');
    setDescription('');
    setPrice(249);
    setDiscount(20);
    setTax(5);
    setFoodType('Non-Veg');
    setSpiceLevel('Medium');
    setPrepTime('25 mins');
    setAvailable(true);
    setEditingId(null);
    setErrorMessage(null);
  };

  const toggleAvailability = (id: string) => {
    const updated = dishes.map((d) => (d.id === id ? { ...d, available: !d.available } : d));
    saveToStorage(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this dish item?')) {
      const updated = dishes.filter((d) => d.id !== id);
      saveToStorage(updated);
    }
  };

  const filtered = dishes.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/merchant/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Dish & Price Management</h1>
            <p className="text-xs text-[#6b5840]">
              Add dishes, calculate final prices (Original Price - Discount), set food types & toggle availability
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Add New Dish
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dish name or category..."
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
          />
        </div>

        <span className="text-xs font-extrabold text-[#8B0000]">Total {filtered.length} Dishes Listed</span>
      </div>

      {/* Dishes Table */}
      <div className="glass-card rounded-2xl bg-white border border-[#8B0000]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Dish Image & Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Sub Category</th>
                <th className="p-3.5 text-right">Original Price</th>
                <th className="p-3.5 text-right">Discount</th>
                <th className="p-3.5 text-right">Final Price</th>
                <th className="p-3.5 text-center">Type</th>
                <th className="p-3.5 text-center">Availability</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium text-[#1a1008]">
              {filtered.map((dish) => (
                <tr key={dish.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#8B0000]/15 shrink-0"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-[#1a1008]">{dish.name}</div>
                        <div className="text-[10px] text-[#6b5840] line-clamp-1 max-w-xs">{dish.description}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 font-bold text-xs text-[#1a1008]">{dish.category}</td>
                  <td className="p-3.5 text-xs text-gray-600">{dish.subCategory || 'N/A'}</td>

                  <td className="p-3.5 text-right font-bold line-through text-gray-400">
                    {formatCurrency(dish.price)}
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-700">
                    -{formatCurrency(dish.discount)}
                  </td>
                  <td className="p-3.5 text-right font-extrabold text-[#8B0000] text-sm">
                    {formatCurrency(dish.finalPrice)}
                  </td>

                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        dish.foodType === 'Veg'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : dish.foodType === 'Egg'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      {dish.foodType}
                    </span>
                  </td>

                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => toggleAvailability(dish.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer border transition-all ${
                        dish.available
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {dish.available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>

                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingId(dish.id);
                          setName(dish.name);
                          setCategory(dish.category);
                          setSubCategory(dish.subCategory || '');
                          setImage(dish.image);
                          setDescription(dish.description);
                          setPrice(dish.price);
                          setDiscount(dish.discount);
                          setTax(dish.tax || 5);
                          setFoodType(dish.foodType || 'Non-Veg');
                          setSpiceLevel(dish.spiceLevel || 'Medium');
                          setPrepTime(dish.prepTime || '20 mins');
                          setAvailable(dish.available);
                          setShowModal(true);
                        }}
                        className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dish.id)}
                        className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <h2 className="text-base font-extrabold text-[#1a1008]">
                {editingId ? 'Edit Dish & Price Details' : '+ Add New Dish to Menu'}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveDish} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chicken Dum Biryani"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                  >
                    <option value="Biryani">Biryani</option>
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Breads">Breads</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Sub Category</label>
                  <input
                    type="text"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    placeholder="e.g. Chicken Biryani"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Dish Image URL *</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ingredients and taste description..."
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl p-2.5 outline-none"
                />
              </div>

              {/* Price Calculation */}
              <div className="p-3 bg-[#F8F5F0] rounded-xl border border-[#8B0000]/15 space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-[#8B0000] block">Price Calculation (₹)</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-gray-700 mb-0.5">Original Price *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-white border border-[#8B0000]/20 rounded-lg px-2.5 py-1.5 font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-0.5">Discount (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full bg-white border border-[#8B0000]/20 rounded-lg px-2.5 py-1.5 font-bold text-emerald-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-0.5">Final Selling Price</label>
                    <div className="bg-white border border-[#8B0000] rounded-lg px-2.5 py-1.5 font-extrabold text-[#8B0000] text-sm text-center">
                      ₹{Math.max(0, price - discount)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Food Type *</label>
                  <select
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value as any)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-2 py-2 outline-none font-bold"
                  >
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Egg">Egg</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Prep Time</label>
                  <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="25 mins"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-2 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Availability</label>
                  <select
                    value={available ? 'Available' : 'Unavailable'}
                    onChange={(e) => setAvailable(e.target.value === 'Available')}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-2 py-2 outline-none font-bold"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border">
                  Cancel
                </button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer">
                  Save Dish & Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
