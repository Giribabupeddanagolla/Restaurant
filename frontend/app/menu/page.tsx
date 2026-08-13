'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { INITIAL_CATEGORIES, CATEGORY_GROUPS, BAKERY_EXCLUSIVE_CATEGORY_GROUPS, GRILL_EXCLUSIVE_CATEGORY_GROUPS, SPICE_GARDEN_EXCLUSIVE_CATEGORY_GROUPS, CAFE_EXCLUSIVE_CATEGORY_GROUPS, SEAFOOD_EXCLUSIVE_CATEGORY_GROUPS, EXPRESS_BISTRO_EXCLUSIVE_CATEGORY_GROUPS, INITIAL_DISHES, getStoredDishes, saveStoredDishes, RESTAURANT_OUTLETS } from '@/data/mockData';
import { Search, Leaf, Menu, X, Store, ArrowLeft, SlidersHorizontal, Utensils } from 'lucide-react';
import { MenuItem } from '@/types';
import DishModal from '@/components/DishModal';
import AddButton from '@/components/AddButton';
import { formatCurrency } from '@/utils/formatters';
import { menuApi } from '@/services/restaurantService';

const SHOP_INFO: Record<string, { title: string; tagline: string; icon: string; bg: string }> = {
  'giri-express-bistro': { title: 'Giri Express & Bistro', tagline: 'Fast-Casual Gourmet Eats, Paninis & Craft Beverages', icon: '⚡', bg: 'from-[#E11D48] to-[#9F1239]' },
  'giri-fine-dining':  { title: 'Giri Fine Dining', tagline: 'Signature Experience & Fine Dining Specials', icon: '🍷', bg: 'from-[#8B0000] to-[#500000]' },
  'giri-kitchen':      { title: 'Giri Kitchen', tagline: 'Home Comfort Food, Alfredo Pastas & Soups', icon: '🍲', bg: 'from-[#16603A] to-[#0D4A2D]' },
  'giri-bakery':       { title: 'Giri Bakery', tagline: 'Artisanal Pastries, Tiramisu & Desserts', icon: '🥐', bg: 'from-[#C8A055] to-[#8C6F32]' },
  'giri-grill':        { title: 'Giri Grill', tagline: 'Smoked Wagyu Burgers, Ribs & Pizzas', icon: '🔥', bg: 'from-[#C8102E] to-[#8B0000]' },
  'giri-spice-garden': { title: 'Giri Spice Garden', tagline: 'Authentic Indian Curries & Asian Delicacies', icon: '🍛', bg: 'from-[#D97706] to-[#92400E]' },
  'giri-cafe':         { title: 'Giri Café', tagline: 'Cold Brew Coffee & Signature Mixes', icon: '☕', bg: 'from-[#4B5563] to-[#1F2937]' },
  'giri-seafood':      { title: 'Giri Seafood & Lounge', tagline: 'Fresh Norwegian Salmon & Coastal Delicacies', icon: '🍤', bg: 'from-[#0284C7] to-[#0369A1]' },
};

const SHOP_RELEVANT_CATEGORIES: Record<string, string[]> = {
  'giri-cafe': ['drinks', 'bakery', 'desserts', 'fast-food'],
  'giri-express-bistro': ['fast-food', 'italian', 'starters', 'chinese', 'drinks'],
  'giri-grill': ['italian', 'fast-food', 'starters', 'mains'],
  'giri-seafood': ['starters', 'mains', 'indian', 'rice-meals', 'drinks'],
  'giri-kitchen': ['tiffins', 'mains', 'indian', 'rice-meals', 'starters'],
  'giri-spice-garden': ['indian', 'biryani', 'starters', 'mains', 'chinese'],
  'giri-fine-dining': ['biryani', 'indian', 'starters', 'mains', 'tiffins', 'rice-meals', 'desserts', 'drinks'],
};

function matchCategorySubCategory(dish: MenuItem, catId: string, subCatId: string | null): boolean {
  if (catId === 'all' && !subCatId) return true;

  const dName = (dish.name || '').toLowerCase();
  const dDesc = (dish.description || '').toLowerCase();
  const dCat = (dish.category || '').toLowerCase();
  const dDiet = (dish.dietary || []).map((d) => d.toLowerCase());

  const target = subCatId || catId;

  switch (target) {
    case 'all':
      return true;

    // Biryani
    case 'biryani':
      return dName.includes('biryani');
    case 'chicken-biryani':
      return dName.includes('biryani') && dName.includes('chicken');
    case 'mutton-biryani':
      return dName.includes('biryani') && (dName.includes('mutton') || dName.includes('lamb') || dName.includes('nalli'));
    case 'egg-biryani':
      return dName.includes('biryani') && (dName.includes('egg') || dName.includes('omelette'));
    case 'veg-biryani':
      return dName.includes('biryani') && !dName.includes('paneer') && (dName.includes('veg') || dName.includes('subz') || dName.includes('soya') || dName.includes('mushroom') || dName.includes('kathal') || dName.includes('pulao') || dName.includes('corn') || dDiet.includes('veg'));
    case 'paneer-biryani':
      return dName.includes('biryani') && dName.includes('paneer');
    case 'special-biryani':
      return dName.includes('biryani') && (dName.includes('special') || dName.includes('signature') || dName.includes('shahi') || dName.includes('potli') || dName.includes('matka') || dName.includes('bamboo') || dName.includes('24k') || dName.includes('gold') || dName.includes('zafrani') || dName.includes('claypot') || dName.includes('seafood') || dName.includes('prawn') || dName.includes('combo'));

    // Indian
    case 'indian':
      return dCat === 'mains' || dCat === 'starters' || dName.includes('curry') || dName.includes('masala') || dName.includes('tikka') || dName.includes('biryani');
    case 'north-indian':
      return dName.includes('paneer') || dName.includes('butter chicken') || dName.includes('naan') || dName.includes('dal') || dName.includes('tikka') || dName.includes('korma') || dName.includes('kadai') || dName.includes('mughlai') || dName.includes('rajma') || dName.includes('chole');
    case 'south-indian':
      return dName.includes('idly') || dName.includes('idli') || dName.includes('dosa') || dName.includes('vada') || dName.includes('pongal') || dName.includes('pesarattu') || dName.includes('chettinad') || dName.includes('curd rice') || dName.includes('lemon rice') || dName.includes('meals') || dName.includes('parotta') || dName.includes('appam');
    case 'andhra':
      return dName.includes('andhra') || dName.includes('guntur') || dName.includes('mirchi') || dName.includes('gongura') || dName.includes('royyala') || dName.includes('pappu') || dName.includes('ulavacharu') || dName.includes('ulvacharu') || dName.includes('vankaya') || dName.includes('chepala') || dName.includes('pesarattu') || dName.includes('kodi') || dDesc.includes('andhra');
    case 'telangana':
      return dName.includes('telangana') || dName.includes('hyderabadi') || dName.includes('haleem') || dName.includes('dum') || dName.includes('natu kodi') || dName.includes('boti') || dName.includes('sarva pindi');
    case 'punjabi':
      return dName.includes('punjabi') || dName.includes('amritsari') || dName.includes('bhature') || dName.includes('kulcha') || dName.includes('makhani') || dName.includes('saag') || dName.includes('rajma') || dName.includes('kadhi');
    case 'gujarati':
      return dName.includes('gujarati') || dName.includes('dhokla') || dName.includes('thepla') || dName.includes('undhiyu') || dName.includes('sev tameta') || dName.includes('dal dhokli') || dName.includes('khandvi') || dDesc.includes('gujarati');
    case 'bengali':
      return dName.includes('bengali') || dName.includes('kosha') || dName.includes('mishti') || dName.includes('luchi') || dName.includes('shorshe') || dName.includes('bhetki') || dDesc.includes('bengali');
    case 'kerala':
      return dName.includes('kerala') || dName.includes('appam') || dName.includes('malabar') || dName.includes('coconut') || dName.includes('karimeen') || dName.includes('puttu') || dName.includes('nadan') || dDesc.includes('kerala');

    // Chinese
    case 'chinese':
      return dCat === 'starters' || dName.includes('noodle') || dName.includes('manchurian') || dName.includes('fried rice') || dName.includes('soup') || dName.includes('schezwan');
    case 'noodles':
      return dName.includes('noodle') || dName.includes('chow mein') || dName.includes('ramen');
    case 'fried-rice':
    case 'fried-rice-meals':
      return dName.includes('fried rice') || dName.includes('schezwan rice');
    case 'manchurian':
      return dName.includes('manchurian');
    case 'chinese-starters':
      return dName.includes('momo') || dName.includes('spring roll') || dName.includes('dim sum') || dName.includes('chilli chicken') || dName.includes('crispy');
    case 'soups':
    case 'healthy-soups':
      return dName.includes('soup') || dName.includes('velouté');

    // Fast Food
    case 'fast-food':
      return dCat === 'pizzas' || dName.includes('burger') || dName.includes('pizza') || dName.includes('fries') || dName.includes('sandwich') || dName.includes('wrap');
    case 'burgers':
      return dName.includes('burger') || dName.includes('slider');
    case 'pizza':
    case 'veg-pizza':
    case 'chicken-pizza':
      return dName.includes('pizza') || dName.includes('flatbread') || dName.includes('calzone');
    case 'sandwiches':
      return dName.includes('sandwich') || dName.includes('panini') || dName.includes('club') || dName.includes('toastie');
    case 'french-fries':
      return dName.includes('fries') || dName.includes('wedges');
    case 'wraps':
      return dName.includes('wrap') || dName.includes('roll') || dName.includes('quesadilla');
    case 'nuggets':
      return dName.includes('nugget') || dName.includes('tenders') || dName.includes('bites') || dName.includes('wings');

    // Starters
    case 'starters':
      return dCat === 'starters';
    case 'chicken-starters':
      return dCat === 'starters' && (dName.includes('chicken') || dName.includes('wings'));
    case 'mutton-starters':
      return dCat === 'starters' && (dName.includes('mutton') || dName.includes('lamb') || dName.includes('kebab'));
    case 'fish-starters':
      return dCat === 'starters' && (dName.includes('fish') || dName.includes('prawn') || dName.includes('calamari') || dName.includes('seafood'));
    case 'paneer-starters':
      return dCat === 'starters' && dName.includes('paneer');
    case 'veg-starters':
      return dCat === 'starters' && (dDiet.includes('veg') || dName.includes('veg') || dName.includes('gobi') || dName.includes('corn'));

    // Mains
    case 'mains':
      return dCat === 'mains';
    case 'chicken-main':
      return dCat === 'mains' && dName.includes('chicken');
    case 'mutton-main':
      return dCat === 'mains' && (dName.includes('mutton') || dName.includes('lamb') || dName.includes('shank'));
    case 'fish-main':
      return dCat === 'mains' && (dName.includes('fish') || dName.includes('salmon') || dName.includes('prawn') || dName.includes('lobster'));
    case 'paneer-main':
      return dCat === 'mains' && dName.includes('paneer');
    case 'veg-curries':
      return dCat === 'mains' && (dDiet.includes('veg') || dName.includes('veg') || dName.includes('malai') || dName.includes('mix veg'));
    case 'dal':
      return dName.includes('dal') || dName.includes('lentil') || dName.includes('sambar');

    // Tiffins
    case 'tiffins':
      return dName.includes('idly') || dName.includes('idli') || dName.includes('dosa') || dName.includes('vada') || dName.includes('poori') || dName.includes('upma') || dName.includes('pongal') || dName.includes('pesarattu');
    case 'idly':
      return dName.includes('idly') || dName.includes('idli');
    case 'dosa':
      return dName.includes('dosa');
    case 'vada':
      return dName.includes('vada');
    case 'poori':
      return dName.includes('poori') || dName.includes('puri');
    case 'upma':
      return dName.includes('upma');
    case 'pongal':
      return dName.includes('pongal');
    case 'pesarattu':
      return dName.includes('pesarattu') || dName.includes('pesara');

    // Rice & Meals
    case 'rice-meals':
      return dName.includes('rice') || dName.includes('meal') || dName.includes('thali') || dName.includes('pulao');
    case 'veg-meals':
      return (dName.includes('meal') || dName.includes('thali') || dCat === 'mains') && dDiet.includes('veg');
    case 'non-veg-meals':
      return (dName.includes('meal') || dName.includes('thali') || dCat === 'mains') && dDiet.includes('non-veg');
    case 'lemon-rice':
      return dName.includes('lemon rice');
    case 'jeera-rice':
      return dName.includes('jeera rice');
    case 'curd-rice':
      return dName.includes('curd rice');

    // Italian
    case 'italian':
      return dName.includes('pasta') || dName.includes('pizza') || dName.includes('lasagna') || dName.includes('risotto') || dName.includes('garlic bread');
    case 'pasta':
      return dName.includes('pasta') || dName.includes('penne') || dName.includes('spaghetti') || dName.includes('macaroni');
    case 'garlic-bread':
      return dName.includes('garlic bread') || dName.includes('breadsticks');
    case 'lasagna':
      return dName.includes('lasagna');

    // Desserts & Bakery Exclusive Categories
    case 'bakery-cakes':
      return dName.includes('cake') || dName.includes('cheesecake') || dName.includes('tiramisu') || dName.includes('gateau');
    case 'birthday-cake':
      return dName.includes('birthday') || (dName.includes('cake') && !dName.includes('wedding'));
    case 'wedding-cake':
      return dName.includes('wedding') || dName.includes('tiered');
    case 'photo-cake':
      return dName.includes('photo') || dName.includes('print');
    case 'theme-cake':
      return dName.includes('theme') || dName.includes('designer') || dName.includes('fondant');
    case 'chocolate-cake':
      return dName.includes('chocolate') && dName.includes('cake');
    case 'red-velvet-cake':
      return dName.includes('red velvet') && dName.includes('cake');
    case 'black-forest-cake':
      return dName.includes('black forest') && dName.includes('cake');
    case 'fruit-cake':
      return dName.includes('fruit') && dName.includes('cake');
    case 'cheesecake':
      return dName.includes('cheesecake');

    case 'bakery-pastries':
      return dName.includes('pastry') || dName.includes('slice');
    case 'chocolate-pastry':
      return dName.includes('chocolate') && dName.includes('pastry');
    case 'pineapple-pastry':
      return dName.includes('pineapple') && dName.includes('pastry');
    case 'red-velvet-pastry':
      return dName.includes('red velvet') && dName.includes('pastry');
    case 'black-forest-pastry':
      return dName.includes('black forest') && dName.includes('pastry');
    case 'butterscotch-pastry':
      return dName.includes('butterscotch') && dName.includes('pastry');
    case 'fruit-pastry':
      return dName.includes('fruit') && dName.includes('pastry');

    case 'bakery-breads':
      return dName.includes('bread') || dName.includes('loaf') || dName.includes('baguette') || dName.includes('toast');
    case 'white-bread':
      return dName.includes('white bread') || dName.includes('milk bread');
    case 'brown-bread':
      return dName.includes('brown bread') || dName.includes('wheat');
    case 'multigrain-bread':
      return dName.includes('multigrain');
    case 'garlic-bread':
      return dName.includes('garlic bread') || dName.includes('garlic toast');
    case 'french-baguette':
      return dName.includes('baguette') || dName.includes('sourdough');

    case 'bakery-cookies':
      return dName.includes('cookie') || dName.includes('cookies') || dName.includes('biscotti');
    case 'butter-cookies':
      return dName.includes('butter cookie') || dName.includes('butter cookies') || (dName.includes('butter') && dName.includes('cookie'));
    case 'chocolate-chip-cookies':
      return dName.includes('chocolate chip');
    case 'coconut-cookies':
      return dName.includes('coconut cookie') || dName.includes('coconut cookies') || dName.includes('macaron');
    case 'almond-cookies':
      return dName.includes('almond cookie') || dName.includes('almond cookies') || dName.includes('biscotti');
    case 'cashew-cookies':
      return dName.includes('cashew cookie') || dName.includes('cashew cookies') || dName.includes('cashew');
    case 'oatmeal-cookies':
      return dName.includes('oatmeal') || dName.includes('oat');
    case 'jeera-cookies':
      return dName.includes('jeera') || dName.includes('cumin');

    case 'bakery-biscuits':
      return dName.includes('biscuit') || dName.includes('biscuits');
    case 'cream-biscuits':
      return dName.includes('cream biscuit');
    case 'salt-biscuits':
      return dName.includes('salt biscuit') || dName.includes('salted');
    case 'digestive-biscuits':
      return dName.includes('digestive');
    case 'milk-biscuits':
      return dName.includes('milk biscuit');
    case 'coconut-biscuits':
      return dName.includes('coconut biscuit');
    case 'cashew-biscuits':
      return dName.includes('cashew biscuit');

    case 'bakery-muffins':
      return dName.includes('muffin');
    case 'chocolate-muffin':
      return dName.includes('chocolate') && dName.includes('muffin');
    case 'blueberry-muffin':
      return dName.includes('blueberry') && dName.includes('muffin');
    case 'vanilla-muffin':
      return dName.includes('vanilla') && dName.includes('muffin');
    case 'banana-muffin':
      return dName.includes('banana') && dName.includes('muffin');
    case 'red-velvet-muffin':
      return dName.includes('red velvet') && dName.includes('muffin');

    case 'bakery-donuts':
      return dName.includes('donut') || dName.includes('doughnut');
    case 'chocolate-donut':
      return dName.includes('chocolate') && (dName.includes('donut') || dName.includes('doughnut'));
    case 'glazed-donut':
      return dName.includes('glazed');
    case 'strawberry-donut':
      return dName.includes('strawberry') && (dName.includes('donut') || dName.includes('doughnut'));
    case 'cinnamon-donut':
      return dName.includes('cinnamon');
    case 'cream-filled-donut':
      return dName.includes('cream') && (dName.includes('donut') || dName.includes('doughnut'));

    case 'bakery-brownies':
      return dName.includes('brownie');
    case 'chocolate-brownie':
    case 'fudge-brownie':
      return dName.includes('chocolate') && dName.includes('brownie');
    case 'walnut-brownie':
      return dName.includes('walnut') && dName.includes('brownie');
    case 'nutella-brownie':
      return dName.includes('nutella') && dName.includes('brownie');
    case 'double-chocolate-brownie':
      return dName.includes('double chocolate') && dName.includes('brownie');

    case 'bakery-puffs':
      return dName.includes('puff') || dName.includes('savory') || dName.includes('savouries');
    case 'veg-puff':
      return dName.includes('veg puff') || dName.includes('masala veg puff');
    case 'paneer-puff':
      return dName.includes('paneer puff');
    case 'egg-puff':
      return dName.includes('egg puff');
    case 'chicken-puff':
      return dName.includes('chicken puff');
    case 'mushroom-puff':
      return dName.includes('mushroom puff');
    case 'cheese-puff':
      return dName.includes('cheese puff');
    case 'potato-puff':
      return dName.includes('potato puff') || dName.includes('aloo puff');

    case 'bakery-rolls':
      return dName.includes('roll') || dName.includes('sandwich');
    case 'veg-roll':
      return dName.includes('veg roll') || dName.includes('kathi roll');
    case 'paneer-roll':
      return dName.includes('paneer roll');
    case 'chicken-roll':
      return dName.includes('chicken roll');
    case 'veg-sandwich':
      return dName.includes('veg sandwich') || dName.includes('paneer tikka mayo');
    case 'cheese-sandwich':
      return dName.includes('cheese sandwich');
    case 'chicken-sandwich':
      return dName.includes('chicken sandwich') || dName.includes('smoked chicken');

    case 'bakery-desserts':
    case 'desserts':
    case 'bakery':
      return dCat === 'desserts' || dName.includes('cake') || dName.includes('pastry') || dName.includes('croissant') || dName.includes('puff') || dName.includes('cookie') || dName.includes('donut') || dName.includes('sweet') || dName.includes('brownie') || dName.includes('tart') || dName.includes('mousse') || (dish.shopSlug === 'giri-bakery');
    case 'chocolate-tart':
      return dName.includes('chocolate') && dName.includes('tart');
    case 'fruit-tart':
      return dName.includes('fruit') && dName.includes('tart');
    case 'eclair':
      return dName.includes('eclair') || dName.includes('éclair');
    case 'macaron':
      return dName.includes('macaron');
    case 'tiramisu':
      return dName.includes('tiramisu');
    case 'pudding':
      return dName.includes('pudding');
    case 'mousse':
      return dName.includes('mousse');

    case 'bakery-sweets':
    case 'sweets-mithai':
      return dName.includes('sweet') || dName.includes('mithai') || dName.includes('rasmalai') || dName.includes('gulab jamun') || dName.includes('laddu') || dName.includes('katli') || dName.includes('mysore pak') || dName.includes('badusha');
    case 'gulab-jamun':
      return dName.includes('gulab jamun');
    case 'rasmalai':
      return dName.includes('rasmalai');
    case 'kaju-katli':
      return dName.includes('kaju katli') || dName.includes('katli');
    case 'motichoor-laddu':
      return dName.includes('laddu') || dName.includes('laddoo');
    case 'mysore-pak':
      return dName.includes('mysore pak');
    case 'badusha':
      return dName.includes('badusha') || dName.includes('balushahi');

    case 'bakery-icecream':
    case 'ice-cream':
      return dName.includes('ice cream') || dName.includes('sundae') || dName.includes('gelato');
    case 'vanilla-ice-cream':
      return dName.includes('vanilla') && dName.includes('ice cream');
    case 'chocolate-ice-cream':
      return dName.includes('chocolate') && dName.includes('ice cream');
    case 'strawberry-ice-cream':
      return dName.includes('strawberry') && dName.includes('ice cream');
    case 'butterscotch-ice-cream':
      return dName.includes('butterscotch') && dName.includes('ice cream');
    case 'brownie-sundae':
      return dName.includes('sundae') || (dName.includes('brownie') && dName.includes('ice cream'));

    case 'bakery-beverages':
      return dCat === 'drinks' || dName.includes('coffee') || dName.includes('chocolate') || dName.includes('tea') || dName.includes('juice') || dName.includes('shake');
    case 'cold-coffee':
      return dName.includes('cold coffee') || dName.includes('frappe');
    case 'hot-chocolate':
      return dName.includes('hot chocolate') || dName.includes('cocoa');
    case 'cappuccino':
      return dName.includes('cappuccino');
    case 'latte':
      return dName.includes('latte');
    case 'espresso':
      return dName.includes('espresso');
    case 'masala-tea':
      return dName.includes('tea') || dName.includes('chai');
    case 'fresh-juice':
      return dName.includes('juice');
    case 'milkshake':
      return dName.includes('shake') || dName.includes('milkshake');

    // Grill Exclusive Categories
    case 'grill-chicken':
      return dName.includes('chicken') && (dName.includes('grill') || dName.includes('tikka') || dName.includes('shashlik') || dName.includes('breast') || dName.includes('leg') || dName.includes('wing'));
    case 'grilled-chicken-breast':
      return dName.includes('breast') || (dName.includes('grilled') && dName.includes('chicken'));
    case 'grilled-chicken-leg':
      return dName.includes('chicken leg') || dName.includes('leg quarter');
    case 'grilled-chicken-wings':
      return dName.includes('wings');
    case 'chicken-shashlik':
    case 'chicken-shashlik-skewer':
      return dName.includes('shashlik') && dName.includes('chicken');
    case 'chicken-tikka':
      return dName.includes('chicken tikka');
    case 'chicken-malai-tikka':
      return dName.includes('malai') && dName.includes('tikka');

    case 'tandoori-chicken':
      return dName.includes('tandoori chicken') || dName.includes('tandoori');
    case 'full-tandoori-chicken':
      return dName.includes('full tandoori');
    case 'half-tandoori-chicken':
      return dName.includes('half tandoori');
    case 'tandoori-chicken-legs':
      return dName.includes('tandoori') && dName.includes('leg');
    case 'tandoori-chicken-wings':
      return dName.includes('tandoori') && dName.includes('wing');

    case 'chicken-kebabs':
      return dName.includes('kebab') && dName.includes('chicken');
    case 'chicken-seekh-kebab':
      return dName.includes('chicken seekh');
    case 'reshmi-kebab':
      return dName.includes('reshmi');
    case 'hariyali-kebab':
      return dName.includes('hariyali') && !dName.includes('paneer');
    case 'tangdi-kebab':
      return dName.includes('tangdi');
    case 'chicken-boti-kebab':
      return dName.includes('chicken boti');

    case 'mutton-grill':
      return dName.includes('mutton') || dName.includes('lamb');
    case 'mutton-seekh-kebab':
      return dName.includes('mutton seekh');
    case 'mutton-shashlik':
    case 'mutton-shashlik-skewer':
      return dName.includes('mutton shashlik') || dName.includes('lamb mutton shashlik');
    case 'grilled-mutton-chops':
      return dName.includes('mutton chop') || dName.includes('chops');
    case 'mutton-boti':
      return dName.includes('mutton boti');
    case 'mutton-tikka':
      return dName.includes('mutton tikka');

    case 'fish-grill':
      return dName.includes('fish') || dName.includes('pomfret') || dName.includes('salmon') || dName.includes('seabass');
    case 'grilled-pomfret':
      return dName.includes('pomfret');
    case 'grilled-salmon':
      return dName.includes('salmon');
    case 'grilled-seabass':
      return dName.includes('seabass');
    case 'fish-tikka':
      return dName.includes('fish tikka');
    case 'lemon-herb-fish':
      return dName.includes('lemon herb') || dName.includes('white fish');

    case 'prawns-seafood':
      return dName.includes('prawn') || dName.includes('seafood');
    case 'grilled-prawns':
      return dName.includes('grilled prawn') || dName.includes('grilled prawns');
    case 'garlic-prawns':
      return dName.includes('garlic prawn') || dName.includes('garlic prawns');
    case 'tandoori-prawns':
      return dName.includes('tandoori prawn') || dName.includes('tandoori prawns');
    case 'chilli-prawns':
      return dName.includes('chilli prawn');
    case 'prawn-shashlik':
      return dName.includes('prawn shashlik') || dName.includes('prawn & veggie shashlik');

    case 'veg-grill':
      return dCat === 'starters' && (dDiet.includes('veg') || dName.includes('paneer') || dName.includes('mushroom') || dName.includes('corn') || dName.includes('vegetable'));
    case 'grilled-paneer':
      return dName.includes('cottage cheese steak') || (dName.includes('grilled') && dName.includes('paneer'));
    case 'paneer-tikka':
      return dName.includes('paneer tikka');
    case 'grilled-mushroom':
      return dName.includes('grilled button mushroom') || (dName.includes('grilled') && dName.includes('mushroom'));
    case 'tandoori-mushroom':
      return dName.includes('tandoori stuffed mushroom') || dName.includes('mushroom tikka');
    case 'grilled-corn':
      return dName.includes('corn');
    case 'grilled-vegetables':
      return dName.includes('grilled vegetable') || dName.includes('grilled vegetables');

    case 'paneer-tikka-specials':
      return dName.includes('paneer tikka');
    case 'achari-paneer-tikka':
      return dName.includes('achari paneer tikka');
    case 'malai-paneer-tikka':
      return dName.includes('malai paneer tikka');
    case 'hariyali-paneer-tikka':
      return dName.includes('hariyali paneer tikka');
    case 'afghani-paneer-tikka':
      return dName.includes('afghani') && dName.includes('paneer');

    case 'mixed-grill':
      return dName.includes('mixed grill') || dName.includes('platter');
    case 'chicken-mixed-grill':
      return dName.includes('chicken mixed grill');
    case 'mutton-mixed-grill':
      return dName.includes('mutton mixed grill');
    case 'seafood-mixed-grill':
      return dName.includes('seafood mixed grill');
    case 'royal-grill-platter':
      return dName.includes('royal mixed grill') || dName.includes('maharaja royal');
    case 'family-grill-platter':
      return dName.includes('giri family mega grill');

    case 'bbq-specials':
      return dName.includes('bbq');
    case 'bbq-chicken':
      return dName.includes('bbq half chicken') || dName.includes('bbq chicken');
    case 'bbq-wings':
      return dName.includes('bbq wings') || dName.includes('honey glazed bbq wings');
    case 'bbq-ribs':
      return dName.includes('bbq ribs') || dName.includes('smoked bbq ribs');
    case 'bbq-chicken-skewers':
      return dName.includes('bbq chicken skewers');
    case 'bbq-prawns':
      return dName.includes('bbq jumbo prawns') || dName.includes('bbq prawns');

    case 'shashlik-skewers':
      return dName.includes('shashlik') || dName.includes('skewer') || dName.includes('skewers');
    case 'vegetable-shashlik':
      return dName.includes('vegetable shashlik');
    case 'prawn-skewers':
      return dName.includes('prawn skewer') || dName.includes('prawn skewers');
    case 'mixed-skewers':
      return dName.includes('mixed grill skewers') || dName.includes('mixed skewers');

    case 'grill-platters':
      return dName.includes('platter');
    case 'chicken-platter':
      return dName.includes('chicken kebab & tikka platter') || dName.includes('chicken platter');
    case 'mutton-platter':
      return dName.includes('mutton chops & boti platter') || dName.includes('mutton platter');
    case 'seafood-platter':
      return dName.includes('oceanic seafood grill platter') || dName.includes('seafood platter');
    case 'veg-platter':
      return dName.includes('deluxe vegetarian tandoori platter') || dName.includes('veg platter');
    case 'family-platter':
      return dName.includes('grand family feast platter') || dName.includes('family platter');

    case 'grilled-burgers':
      return dName.includes('burger');
    case 'grilled-chicken-burger':
      return dName.includes('grilled chicken breast burger') || (dName.includes('grilled') && dName.includes('chicken') && dName.includes('burger'));
    case 'bbq-chicken-burger':
      return dName.includes('bbq bacon chicken burger') || dName.includes('bbq chicken burger');
    case 'grilled-paneer-burger':
      return dName.includes('grilled paneer burger');
    case 'double-chicken-burger':
      return dName.includes('double grilled chicken burger');

    case 'grilled-sandwiches':
      return dName.includes('sandwich');
    case 'grilled-chicken-sandwich':
      return dName.includes('grilled chicken club sandwich');
    case 'bbq-chicken-sandwich':
      return dName.includes('bbq chicken & cheese sandwich');
    case 'grilled-paneer-sandwich':
      return dName.includes('paneer tikka mayo grilled sandwich');
    case 'grilled-vegetable-sandwich':
      return dName.includes('mediterranean grilled veggie');

    // Spice Garden Exclusive Categories
    case 'south-indian-specials':
      return dName.includes('dosa') || dName.includes('idli') || dName.includes('vada') || dName.includes('uttapam') || dName.includes('pesarattu') || dName.includes('pongal');
    case 'dosa-special':
      return dName.includes('dosa');
    case 'idli-special':
      return dName.includes('idli');
    case 'vada-special':
      return dName.includes('vada');
    case 'uttapam-special':
      return dName.includes('uttapam');
    case 'pesarattu-special':
      return dName.includes('pesarattu');
    case 'pongal-special':
      return dName.includes('pongal');

    case 'andhra-specials':
      return dName.includes('andhra') || dName.includes('gongura') || dName.includes('natu kodi') || dName.includes('royyala') || dDesc.includes('andhra');
    case 'andhra-chicken-curry':
      return dName.includes('andhra chicken');
    case 'gongura-chicken':
      return dName.includes('gongura chicken') || (dName.includes('gongura') && dName.includes('chicken'));
    case 'gongura-mutton':
      return dName.includes('gongura mutton') || (dName.includes('gongura') && dName.includes('mutton'));
    case 'natu-kodi-curry':
      return dName.includes('natu kodi');
    case 'royyala-iguru':
      return dName.includes('royyala') || dName.includes('prawn iguru');

    case 'hyderabadi-specials':
      return dName.includes('hyderabadi') || dName.includes('haleem') || dName.includes('mirchi ka salan') || dName.includes('double ka meetha') || dName.includes('65');
    case 'hyderabadi-biryani':
      return dName.includes('hyderabadi') && dName.includes('biryani');
    case 'chicken-65-hyd':
      return dName.includes('chicken 65');
    case 'mirchi-ka-salan':
      return dName.includes('mirchi ka salan') || dName.includes('salan');
    case 'haleem-hyd':
      return dName.includes('haleem');
    case 'double-ka-meetha-hyd':
    case 'double-ka-meetha-dessert':
      return dName.includes('double ka meetha');

    case 'north-indian-curries':
      return dName.includes('butter chicken') || dName.includes('kadai chicken') || dName.includes('chicken tikka masala') || dName.includes('rogan josh') || dName.includes('dal makhani');
    case 'butter-chicken-ni':
      return dName.includes('butter chicken') || dName.includes('murgh makhani');
    case 'kadai-chicken-ni':
      return dName.includes('kadai chicken');
    case 'chicken-tikka-masala-ni':
      return dName.includes('chicken tikka masala');
    case 'mutton-rogan-josh-ni':
    case 'mutton-rogan-josh-sg':
      return dName.includes('rogan josh');
    case 'dal-makhani-ni':
      return dName.includes('dal makhani');

    case 'paneer-specials':
      return dName.includes('paneer');
    case 'paneer-butter-masala':
      return dName.includes('paneer butter masala');
    case 'kadai-paneer-sg':
      return dName.includes('kadai paneer');
    case 'paneer-tikka-masala-sg':
      return dName.includes('paneer tikka masala') || dName.includes('paneer tikka gravy');
    case 'palak-paneer-sg':
      return dName.includes('palak paneer');
    case 'shahi-paneer-sg':
      return dName.includes('shahi paneer');

    case 'veg-curries-specials':
      return dCat === 'mains' && (dDiet.includes('veg') || dName.includes('veg') || dName.includes('dal') || dName.includes('chana') || dName.includes('aloo'));
    case 'mix-veg-curry':
      return dName.includes('mixed vegetable') || dName.includes('mix veg');
    case 'dal-tadka-sg':
      return dName.includes('dal tadka');
    case 'dal-fry-sg':
      return dName.includes('dal fry');
    case 'chana-masala-sg':
      return dName.includes('chana masala');
    case 'aloo-gobi-sg':
      return dName.includes('aloo gobi');

    case 'chicken-specials':
      return dName.includes('chicken');
    case 'chicken-curry-sg':
      return dName.includes('chicken curry');
    case 'pepper-chicken-sg':
      return dName.includes('pepper chicken');
    case 'chilli-chicken-sg':
      return dName.includes('chilli chicken');
    case 'chicken-chettinad-sg':
      return dName.includes('chettinad');
    case 'chicken-korma-sg':
      return dName.includes('chicken korma');

    case 'mutton-specials':
      return dName.includes('mutton') || dName.includes('lamb');
    case 'mutton-curry-sg':
      return dName.includes('mutton curry');
    case 'mutton-korma-sg':
      return dName.includes('mutton korma');
    case 'mutton-pepper-fry-sg':
      return dName.includes('mutton pepper') || dName.includes('mutton chukka');
    case 'mutton-keema-sg':
      return dName.includes('keema');

    case 'seafood-specials':
      return dName.includes('fish') || dName.includes('prawn');
    case 'fish-curry-sg':
      return dName.includes('fish curry');
    case 'fish-fry-sg':
      return dName.includes('fish fry');
    case 'andhra-fish-curry-sg':
      return dName.includes('chepala pulusu') || dName.includes('andhra fish');
    case 'prawn-curry-sg':
      return dName.includes('prawn curry');
    case 'prawn-pepper-fry-sg':
      return dName.includes('prawn pepper');

    case 'rice-pulao':
      return dName.includes('rice') || dName.includes('pulao');
    case 'jeera-rice-sg':
      return dName.includes('jeera rice');
    case 'ghee-rice-sg':
      return dName.includes('ghee rice');
    case 'veg-pulao-sg':
      return dName.includes('veg pulao') || dName.includes('veggie basmati pulao');
    case 'chicken-pulao-sg':
      return dName.includes('chicken pulao');
    case 'mutton-pulao-sg':
      return dName.includes('mutton pulao');

    case 'biryani-specials-sg':
      return dName.includes('biryani');
    case 'chicken-dum-biryani-sg':
      return dName.includes('chicken') && dName.includes('biryani');
    case 'mutton-biryani-sg':
      return dName.includes('mutton') && dName.includes('biryani');
    case 'egg-biryani-sg':
      return dName.includes('egg') && dName.includes('biryani');
    case 'paneer-biryani-sg':
      return dName.includes('paneer') && dName.includes('biryani');
    case 'prawn-biryani-sg':
      return dName.includes('prawn') && dName.includes('biryani');

    case 'indian-breads-sg':
      return dName.includes('naan') || dName.includes('roti') || dName.includes('paratha');
    case 'butter-naan-sg':
      return dName.includes('butter naan');
    case 'garlic-naan-sg':
      return dName.includes('garlic naan');
    case 'tandoori-roti-sg':
      return dName.includes('tandoori roti');
    case 'laccha-paratha-sg':
      return dName.includes('laccha paratha');
    case 'butter-roti-sg':
      return dName.includes('butter roti');

    case 'spice-garden-starters':
      return dName.includes('crispy corn') || dName.includes('65');
    case 'crispy-corn-sg':
      return dName.includes('crispy corn') || dName.includes('pepper corn');
    case 'paneer-65-sg':
      return dName.includes('paneer 65');
    case 'gobi-65-sg':
      return dName.includes('gobi 65');
    case 'chicken-65-sg':
      return dName.includes('chicken 65');
    case 'fish-65-sg':
      return dName.includes('fish 65');

    case 'kebabs-tikkas-sg':
      return dName.includes('tikka') || dName.includes('kebab');
    case 'chicken-tikka-sg':
      return dName.includes('chicken tikka');
    case 'hariyali-kebab-sg':
      return dName.includes('hariyali');
    case 'reshmi-kebab-sg':
      return dName.includes('reshmi');
    case 'paneer-tikka-sg':
      return dName.includes('paneer tikka');
    case 'mutton-seekh-kebab-sg':
      return dName.includes('mutton seekh');

    case 'traditional-specials':
      return dName.includes('dal baati') || dName.includes('chole bhature') || dName.includes('rajma') || dName.includes('kofta');
    case 'dal-baati-sg':
      return dName.includes('dal baati');
    case 'chole-bhature-sg':
      return dName.includes('chole bhature') || dName.includes('bhatura');
    case 'rajma-masala-sg':
      return dName.includes('rajma');
    case 'malai-kofta-sg':
      return dName.includes('malai kofta');
    case 'veg-kofta-sg':
      return dName.includes('veg kofta') || dName.includes('vegetable kofta');

    case 'desserts-sg':
      return dCat === 'desserts' || dName.includes('jamun') || dName.includes('rasmalai') || dName.includes('meetha') || dName.includes('halwa') || dName.includes('kulfi');
    case 'gulab-jamun-sg':
      return dName.includes('gulab jamun');
    case 'rasmalai-sg':
      return dName.includes('rasmalai');
    case 'gajar-halwa-sg':
      return dName.includes('gajar halwa') || dName.includes('carrot halwa');
    case 'kulfi-sg':
      return dName.includes('kulfi');

    case 'beverages-sg':
      return dCat === 'drinks' || dName.includes('chai') || dName.includes('coffee') || dName.includes('lassi') || dName.includes('soda');
    case 'masala-chai-sg':
      return dName.includes('masala chai') || dName.includes('chai');
    case 'filter-coffee-sg':
      return dName.includes('filter coffee');
    case 'mango-lassi-sg':
      return dName.includes('mango lassi');
    case 'sweet-lassi-sg':
      return dName.includes('sweet lassi') || dName.includes('yogurt lassi');
    case 'fresh-lime-soda-sg':
      return dName.includes('fresh lime soda') || dName.includes('lime soda');

    // Cafe Exclusive Categories
    case 'hot-coffee-cafe':
      return dName.includes('espresso') || dName.includes('americano') || dName.includes('cappuccino') || dName.includes('latte') || dName.includes('mocha') || dName.includes('flat white') || dName.includes('macchiato') || dName.includes('filter coffee');
    case 'espresso-cf':
      return dName.includes('espresso');
    case 'americano-cf':
      return dName.includes('americano');
    case 'cappuccino-cf':
      return dName.includes('cappuccino');
    case 'cafe-latte-cf':
      return dName.includes('latte') && !dName.includes('caramel') && !dName.includes('hazelnut') && !dName.includes('vanilla') && !dName.includes('cinnamon');
    case 'cafe-mocha-cf':
      return dName.includes('mocha');
    case 'flat-white-cf':
      return dName.includes('flat white');
    case 'macchiato-cf':
      return dName.includes('macchiato');
    case 'filter-coffee-cf':
      return dName.includes('filter coffee');

    case 'specialty-coffee-cafe':
      return dName.includes('caramel latte') || dName.includes('hazelnut') || dName.includes('vanilla latte') || dName.includes('irish cream') || dName.includes('cinnamon') || dName.includes('gold dust');
    case 'caramel-latte-cf':
      return dName.includes('caramel latte');
    case 'hazelnut-latte-cf':
      return dName.includes('hazelnut');
    case 'vanilla-latte-cf':
      return dName.includes('vanilla latte');
    case 'irish-cream-coffee-cf':
      return dName.includes('irish cream');
    case 'cinnamon-coffee-cf':
      return dName.includes('cinnamon');
    case 'giri-special-coffee-cf':
      return dName.includes('gold dust') || dName.includes('giri signature');

    case 'cold-coffee-cafe':
      return dName.includes('cold coffee') || dName.includes('iced') || dName.includes('frappe');
    case 'cold-coffee-cf':
      return dName.includes('cold coffee');
    case 'iced-americano-cf':
      return dName.includes('iced americano');
    case 'iced-latte-cf':
      return dName.includes('iced latte');
    case 'iced-mocha-cf':
      return dName.includes('iced mocha');
    case 'frappe-cf':
      return dName.includes('frappe') && !dName.includes('caramel');
    case 'caramel-frappe-cf':
      return dName.includes('caramel frappe');

    case 'tea-cafe':
      return dName.includes('tea') || dName.includes('chai');
    case 'masala-tea-cf':
      return dName.includes('masala') && (dName.includes('tea') || dName.includes('chai'));
    case 'ginger-tea-cf':
      return dName.includes('ginger tea');
    case 'cardamom-tea-cf':
      return dName.includes('elaichi') || dName.includes('cardamom tea');
    case 'lemon-tea-cf':
      return dName.includes('lemon tea');
    case 'green-tea-cf':
      return dName.includes('green tea');
    case 'black-tea-cf':
      return dName.includes('black tea');

    case 'special-tea-cafe':
      return dName.includes('kahwa') || dName.includes('turmeric') || dName.includes('honey lemon') || dName.includes('mint tea') || dName.includes('chocolate tea');
    case 'kashmiri-kahwa-cf':
      return dName.includes('kahwa');
    case 'turmeric-tea-cf':
      return dName.includes('turmeric');
    case 'honey-lemon-tea-cf':
      return dName.includes('honey lemon');
    case 'mint-tea-cf':
      return dName.includes('spearmint') || dName.includes('mint tea');
    case 'chocolate-tea-cf':
      return dName.includes('chocolate tea') || dName.includes('cocoa infused chai');

    case 'milkshakes-cafe':
      return dName.includes('milkshake') || dName.includes('shake');
    case 'vanilla-milkshake-cf':
      return dName.includes('vanilla') && dName.includes('shake');
    case 'chocolate-milkshake-cf':
      return dName.includes('chocolate fudge shake') || (dName.includes('chocolate') && dName.includes('shake'));
    case 'strawberry-milkshake-cf':
      return dName.includes('strawberry') && dName.includes('shake');
    case 'mango-milkshake-cf':
      return dName.includes('mango') && dName.includes('shake');
    case 'oreo-milkshake-cf':
      return dName.includes('oreo');
    case 'kitkat-milkshake-cf':
      return dName.includes('kitkat');

    case 'mojitos-coolers-cafe':
      return dName.includes('mojito') || dName.includes('cooler') || dName.includes('blue lagoon');
    case 'virgin-mojito-cf':
      return dName.includes('virgin mojito');
    case 'mint-mojito-cf':
      return dName.includes('mint mojito') || dName.includes('spearmint lime');
    case 'blue-lagoon-cf':
      return dName.includes('blue lagoon');
    case 'green-apple-cooler-cf':
      return dName.includes('green apple');
    case 'strawberry-cooler-cf':
      return dName.includes('strawberry') && dName.includes('cooler');
    case 'lemon-mint-cooler-cf':
      return dName.includes('lemon') && dName.includes('cooler');

    case 'fresh-juices-cafe':
      return dName.includes('juice');
    case 'orange-juice-cf':
      return dName.includes('orange juice');
    case 'watermelon-juice-cf':
      return dName.includes('watermelon');
    case 'pineapple-juice-cf':
      return dName.includes('pineapple');
    case 'apple-juice-cf':
      return dName.includes('apple juice');
    case 'pomegranate-juice-cf':
      return dName.includes('pomegranate');
    case 'carrot-juice-cf':
      return dName.includes('carrot juice');

    case 'smoothies-cafe':
      return dName.includes('smoothie');
    case 'mango-smoothie-cf':
      return dName.includes('mango smoothie');
    case 'strawberry-smoothie-cf':
      return dName.includes('strawberry smoothie') || dName.includes('berry greek');
    case 'banana-smoothie-cf':
      return dName.includes('banana smoothie');
    case 'berry-smoothie-cf':
      return dName.includes('triple berry') || dName.includes('acai');
    case 'chocolate-smoothie-cf':
      return dName.includes('cocoa banana');

    case 'breakfast-cafe':
      return (dish.id || '').startsWith('dish-cf-bf');
    case 'masala-dosa-cf':
      return dName.includes('dosa');
    case 'idli-cf':
      return dName.includes('idli');
    case 'vada-cf':
      return dName.includes('vada');
    case 'poori-masala-cf':
      return dName.includes('poori');
    case 'upma-cf':
      return dName.includes('upma');
    case 'pongal-cf':
      return dName.includes('pongal');
    case 'vegetable-sandwich-bf':
      return dName.includes('veggie mayo toast');

    case 'sandwiches-cafe':
      return dName.includes('sandwich');
    case 'veg-sandwich-cf':
      return dName.includes('veggie sandwich') || dName.includes('cucumber tomato');
    case 'cheese-sandwich-cf':
      return dName.includes('double cheddar cheese');
    case 'grilled-paneer-sandwich-cf':
      return dName.includes('paneer tikka mayo');
    case 'chicken-sandwich-cf':
      return dName.includes('smoked chicken breast');
    case 'club-sandwich-cf':
      return dName.includes('club sandwich');
    case 'grilled-cheese-sandwich-cf':
      return dName.includes('mozzarella grilled cheese');

    case 'burgers-cafe':
      return dName.includes('burger');
    case 'veg-burger-cf':
      return dName.includes('crispy veg patty');
    case 'paneer-burger-cf':
      return dName.includes('cottage cheese burger');
    case 'chicken-burger-cf':
      return dName.includes('fried chicken patty');
    case 'cheese-burger-cf':
      return dName.includes('double cheese crisp burger');
    case 'bbq-chicken-burger-cf':
      return dName.includes('bbq chicken bacon');

    case 'pizza-cafe':
      return dName.includes('pizza');
    case 'margherita-pizza-cf':
      return dName.includes('margherita');
    case 'farmhouse-pizza-cf':
      return dName.includes('farmhouse');
    case 'paneer-pizza-cf':
      return dName.includes('paneer tikka capsicum');
    case 'chicken-tikka-pizza-cf':
      return dName.includes('chicken tikka onion pizza');
    case 'bbq-chicken-pizza-cf':
      return dName.includes('bbq chicken corn');

    case 'pasta-cafe':
      return dName.includes('pasta') || dName.includes('penne') || dName.includes('fusilli');
    case 'alfredo-pasta-cf':
      return dName.includes('alfredo') && !dName.includes('chicken');
    case 'arrabbiata-pasta-cf':
      return dName.includes('arrabbiata');
    case 'pesto-pasta-cf':
      return dName.includes('pesto');
    case 'creamy-mushroom-pasta-cf':
      return dName.includes('mushroom white wine');
    case 'chicken-pasta-cf':
      return dName.includes('chicken alfredo');

    case 'cafe-snacks-cafe':
      return dName.includes('fries') || dName.includes('garlic bread') || dName.includes('nachos') || dName.includes('wedges');
    case 'french-fries-cf':
      return dName.includes('salted potato fries');
    case 'peri-peri-fries-cf':
      return dName.includes('peri peri');
    case 'cheese-fries-cf':
      return dName.includes('cheddar cheese sauce fries');
    case 'garlic-bread-cf':
      return dName.includes('garlic bread');
    case 'nachos-cf':
      return dName.includes('nachos');
    case 'potato-wedges-cf':
      return dName.includes('wedges');

    case 'bakery-cafe':
      return dName.includes('cake') || dName.includes('pastry') || dName.includes('donut') || dName.includes('muffin');
    case 'chocolate-cake-cf':
      return dName.includes('chocolate truffle layer cake');
    case 'red-velvet-cake-cf':
      return dName.includes('red velvet');
    case 'black-forest-cake-cf':
      return dName.includes('black forest');
    case 'chocolate-pastry-cf':
      return dName.includes('chocolate pastry');
    case 'donuts-cf':
      return dName.includes('donut');
    case 'muffins-cf':
      return dName.includes('muffin');

    case 'cookies-biscuits-cafe':
      return dName.includes('cookie') || dName.includes('biscuits');
    case 'chocolate-chip-cookies-cf':
      return dName.includes('choco-chip cookie');
    case 'butter-cookies-cf':
      return dName.includes('danish rich butter');
    case 'oat-cookies-cf':
      return dName.includes('oat cookies');
    case 'almond-cookies-cf':
      return dName.includes('almond crunch');
    case 'coconut-cookies-cf':
      return dName.includes('coconut macaroon');

    case 'desserts-cafe':
      return (dish.id || '').startsWith('dish-cf-ds');
    case 'brownie-cf':
      return dName.includes('fudgy walnut chocolate brownie');
    case 'brownie-ice-cream-cf':
      return dName.includes('sizzling brownie');
    case 'cheesecake-cf':
      return dName.includes('cheesecake');
    case 'tiramisu-cf':
      return dName.includes('tiramisu');
    case 'chocolate-mousse-cf':
      return dName.includes('chocolate mousse');
    case 'fruit-custard-cf':
      return dName.includes('fruit custard');

    case 'ice-cream-cafe':
      return (dish.id || '').startsWith('dish-cf-ic');
    case 'vanilla-ice-cream-cf':
      return dName.includes('bourbon vanilla');
    case 'chocolate-ice-cream-cf':
      return dName.includes('belgian dark chocolate ice cream');
    case 'strawberry-ice-cream-cf':
      return dName.includes('fresh strawberry scoop');
    case 'butterscotch-ice-cream-cf':
      return dName.includes('butterscotch ice cream');
    case 'mango-ice-cream-cf':
      return dName.includes('mango fruit scoop');
    case 'chocolate-sundae-cf':
      return dName.includes('chocolate sundae');

    case 'cafe-combos-cafe':
      return (dish.id || '').startsWith('dish-cf-cb');
    case 'coffee-sandwich-combo':
      return dName.includes('cappuccino & veg club');
    case 'coffee-brownie-combo':
      return dName.includes('latte & warm chocolate');
    case 'tea-cookies-combo':
      return dName.includes('chai & choco-chip');
    case 'burger-fries-combo':
      return dName.includes('burger with fries');
    case 'pizza-beverage-combo':
      return dName.includes('pizza & virgin mojito');

    // Seafood Exclusive Categories
    case 'fish-specials-sf':
      return (dish.id || '').startsWith('dish-sf-ff');
    case 'fish-fry-sf':
      return dName.includes('fish fry') || dName.includes('king fish fry');
    case 'fish-tikka-sf':
      return dName.includes('fish tikka');
    case 'grilled-fish-sf':
      return dName.includes('grilled seabass') || dName.includes('lemon pepper fish fillet') || dName.includes('grilled fish');
    case 'tandoori-fish-sf':
      return dName.includes('tandoori grilled pomfret') || dName.includes('tandoori fish');
    case 'fish-finger-sf':
      return dName.includes('fish finger') || dName.includes('fish fingers');
    case 'lemon-pepper-fish-sf':
      return dName.includes('lemon pepper fish');

    case 'prawns-specials-sf':
      return (dish.id || '').startsWith('dish-sf-pr');
    case 'prawn-fry-sf':
      return dName.includes('royyala prawn fry') || dName.includes('prawn fry');
    case 'garlic-prawns-sf':
      return dName.includes('garlic butter tiger prawns') || dName.includes('garlic prawns');
    case 'butter-garlic-prawns-sf':
      return dName.includes('creamy garlic butter jumbo prawns');
    case 'chilli-prawns-sf':
      return dName.includes('chilli prawns');
    case 'prawn-tikka-sf':
      return dName.includes('prawn tikka');
    case 'tandoori-prawns-sf':
      return dName.includes('tandoori king prawns') || dName.includes('tandoori prawns');

    case 'crab-specials-sf':
      return (dish.id || '').startsWith('dish-sf-cr');
    case 'crab-masala-sf':
      return dName.includes('crab masala');
    case 'crab-pepper-fry-sf':
      return dName.includes('crab pepper fry') || dName.includes('black pepper crab');
    case 'crab-roast-sf':
      return dName.includes('crab roast');
    case 'crab-curry-sf':
      return dName.includes('crab curry');
    case 'garlic-crab-sf':
      return dName.includes('garlic crab') || dName.includes('garlic butter sea crab');

    case 'squid-calamari-sf':
      return (dish.id || '').startsWith('dish-sf-sq');
    case 'calamari-fry-sf':
      return dName.includes('calamari rings') || dName.includes('calamari fry');
    case 'crispy-calamari-sf':
      return dName.includes('crispy calamari');
    case 'pepper-squid-sf':
      return dName.includes('pepper squid') || dName.includes('squid roast');
    case 'chilli-squid-sf':
      return dName.includes('chilli squid');
    case 'grilled-squid-sf':
      return dName.includes('grilled squid') || dName.includes('grilled whole squid');

    case 'lobster-specials-sf':
      return (dish.id || '').startsWith('dish-sf-lb');
    case 'grilled-lobster-sf':
      return dName.includes('grilled whole lobster') || dName.includes('grilled lobster');
    case 'butter-garlic-lobster-sf':
      return dName.includes('butter garlic') && dName.includes('lobster');
    case 'lobster-thermidor-sf':
      return dName.includes('lobster thermidor');
    case 'spicy-lobster-sf':
      return dName.includes('spicy') && dName.includes('lobster');

    case 'seafood-starters-sf':
      return (dish.id || '').startsWith('dish-sf-st');
    case 'seafood-65-sf':
      return dName.includes('seafood 65');
    case 'crispy-fish-sf':
      return dName.includes('crispy fish') || dName.includes('battered fish strips');
    case 'prawn-popcorn-sf':
      return dName.includes('prawn popcorn');
    case 'seafood-kebab-sf':
      return dName.includes('seafood kebab');
    case 'fish-amritsari-sf':
      return dName.includes('fish amritsari');

    case 'seafood-grill-sf':
      return (dish.id || '').startsWith('dish-sf-gr');
    case 'grilled-fish-item-sf':
      return dName.includes('norwegian salmon steak') || dName.includes('grilled fish');
    case 'grilled-prawns-item-sf':
      return dName.includes('grilled jumbo prawns') || dName.includes('grilled prawns');
    case 'grilled-squid-item-sf':
      return dName.includes('grilled squid skewers');
    case 'grilled-crab-item-sf':
      return dName.includes('garlic butter crab') || dName.includes('grilled crab');
    case 'mixed-seafood-grill-sf':
      return dName.includes('mixed seafood grill');

    case 'seafood-tandoor-sf':
      return (dish.id || '').startsWith('dish-sf-td');
    case 'tandoori-prawns-item-sf':
      return dName.includes('tandoori tiger prawns');
    case 'tandoori-fish-item-sf':
      return dName.includes('tandoori red snapper') || dName.includes('tandoori fish');
    case 'tandoori-crab-item-sf':
      return dName.includes('tandoori spiced mud crab') || dName.includes('tandoori crab');
    case 'seafood-tikka-sf':
      return dName.includes('fish & prawn tikka') || dName.includes('seafood tikka');

    case 'coastal-specials-sf':
      return (dish.id || '').startsWith('dish-sf-cs');
    case 'andhra-fish-curry-sf':
      return dName.includes('andhra') && dName.includes('fish curry');
    case 'kerala-fish-curry-sf':
      return dName.includes('malabar meen curry') || dName.includes('kerala fish curry');
    case 'goan-fish-curry-sf':
      return dName.includes('goan') && dName.includes('fish curry');
    case 'mangalorean-fish-curry-sf':
      return dName.includes('mangalorean') && dName.includes('fish');
    case 'coastal-prawn-curry-sf':
      return dName.includes('kerala style coconut prawn curry') || dName.includes('coastal prawn curry');

    case 'seafood-curries-sf':
      return (dish.id || '').startsWith('dish-sf-sc');
    case 'fish-curry-sf':
      return dName.includes('homestyle tangy coastal fish curry') || dName.includes('fish curry');
    case 'prawn-curry-sf':
      return dName.includes('spiced tomato onion prawn gravy') || dName.includes('prawn curry');
    case 'crab-curry-sf':
      return dName.includes('roasted spice crab gravy') || dName.includes('crab curry');
    case 'coconut-fish-curry-sf':
      return dName.includes('creamy white coconut milk fish curry');
    case 'malabar-seafood-curry-sf':
      return dName.includes('mixed seafood malabar');

    case 'seafood-rice-biryani-sf':
      return (dish.id || '').startsWith('dish-sf-rb');
    case 'fish-biryani-sf':
      return dName.includes('fish tikka biryani') || dName.includes('fish biryani');
    case 'prawn-biryani-sf':
      return dName.includes('prawn basmati dum biryani') || dName.includes('prawn biryani');
    case 'seafood-biryani-sf':
      return dName.includes('mixed seafood saffron biryani') || dName.includes('seafood biryani');
    case 'prawn-pulao-sf':
      return dName.includes('prawn basmati pulao') || dName.includes('prawn pulao');
    case 'seafood-fried-rice-sf':
      return dName.includes('seafood fried rice');

    case 'seafood-noodles-sf':
      return (dish.id || '').startsWith('dish-sf-nd');
    case 'prawn-noodles-sf':
      return dName.includes('prawn hakka noodles') || dName.includes('prawn noodles');
    case 'seafood-hakka-noodles-sf':
      return dName.includes('mixed seafood hakka noodles');
    case 'chilli-garlic-prawn-noodles-sf':
      return dName.includes('chilli garlic prawn noodles');
    case 'seafood-schezwan-noodles-sf':
      return dName.includes('schezwan mixed seafood noodles');

    case 'lounge-starters-sf':
      return (dish.id || '').startsWith('dish-sf-ls');
    case 'nachos-sf':
      return dName.includes('melted cheese jalapeño nachos') || dName.includes('nachos');
    case 'cheese-balls-sf':
      return dName.includes('mozzarella cheese balls') || dName.includes('cheese balls');
    case 'french-fries-sf':
      return dName.includes('classic salted crispy potato fries');
    case 'peri-peri-fries-sf':
      return dName.includes('peri peri seasoned fries');
    case 'potato-wedges-sf':
      return dName.includes('garlic herb potato wedges');

    case 'lounge-chicken-sf':
      return (dish.id || '').startsWith('dish-sf-lc');
    case 'chicken-wings-sf':
      return dName.includes('buffalo chicken wings') || dName.includes('chicken wings');
    case 'bbq-wings-sf':
      return dName.includes('bbq wings');
    case 'chicken-strips-sf':
      return dName.includes('chicken strips');
    case 'chicken-popcorn-sf':
      return dName.includes('chicken popcorn');
    case 'chicken-skewers-sf':
      return dName.includes('chicken skewers');

    case 'lounge-veg-sf':
      return (dish.id || '').startsWith('dish-sf-lv');
    case 'paneer-tikka-sf':
      return dName.includes('roasted tandoori paneer tikka');
    case 'crispy-corn-sf':
      return dName.includes('crispy pepper corn') || dName.includes('crispy corn');
    case 'veg-spring-rolls-sf':
      return dName.includes('veg spring rolls');
    case 'mushroom-pepper-fry-sf':
      return dName.includes('mushroom pepper chukka') || dName.includes('mushroom pepper fry');
    case 'cheese-nachos-sf':
      return dName.includes('double layered loaded cheese nachos');

    case 'seafood-platters-sf':
      return (dish.id || '').startsWith('dish-sf-pl');
    case 'fish-platter-sf':
      return dName.includes('fish combination platter') || dName.includes('fish platter');
    case 'prawn-platter-sf':
      return dName.includes('prawn platter');
    case 'crab-platter-sf':
      return dName.includes('crab platter');
    case 'coastal-platter-sf':
      return dName.includes('coastal seafood platter') || dName.includes('coastal platter');
    case 'premium-seafood-platter-sf':
      return dName.includes('premium seafood platter') || dName.includes('lobster, prawn, fish');

    case 'family-platters-sf':
      return (dish.id || '').startsWith('dish-sf-fp');
    case 'family-seafood-platter-sf':
      return dName.includes('family mixed seafood grill feast');
    case 'mixed-grill-platter-sf':
      return dName.includes('seafood & tandoori chicken combination');
    case 'coastal-family-feast-sf':
      return dName.includes('coastal seafood curries & rice feast');
    case 'giri-special-seafood-feast-sf':
      return dName.includes('24k royal crown seafood');

    case 'mocktails-sf':
      return (dish.id || '').startsWith('dish-sf-mk');
    case 'virgin-mojito-sf':
      return dName.includes('spearmint lime sparkling virgin mojito');
    case 'blue-lagoon-sf':
      return dName.includes('blue curaçao');
    case 'green-apple-mojito-sf':
      return dName.includes('green apple mint mojito');
    case 'strawberry-mojito-sf':
      return dName.includes('fresh berry mint soda mojito');
    case 'passion-fruit-cooler-sf':
      return dName.includes('passion fruit sparkling cooler');

    case 'fresh-juices-sf':
      return (dish.id || '').startsWith('dish-sf-fj');
    case 'watermelon-juice-sf':
      return dName.includes('fresh watermelon juice');
    case 'pineapple-juice-sf':
      return dName.includes('pineapple juice');
    case 'orange-juice-sf':
      return dName.includes('valencia orange juice');
    case 'pomegranate-juice-sf':
      return dName.includes('kashmiri pomegranate juice');
    case 'sweet-lime-juice-sf':
      return dName.includes('sweet lime');

    case 'lounge-beverages-sf':
      return (dish.id || '').startsWith('dish-sf-bv');
    case 'iced-tea-sf':
      return dName.includes('peach iced tea');
    case 'cold-coffee-sf':
      return dName.includes('creamy chilled cold coffee');
    case 'fresh-lime-soda-sf':
      return dName.includes('sparkling sweet & salt fresh lime soda');
    case 'ginger-lemonade-sf':
      return dName.includes('crushed ginger lemonade');
    case 'mint-cooler-sf':
      return dName.includes('spearmint cucumber chilled cooler');

    case 'desserts-sf':
      return (dish.id || '').startsWith('dish-sf-ds');
    case 'cheesecake-sf':
      return dName.includes('blueberry cheesecake');
    case 'chocolate-brownie-sf':
      return dName.includes('walnut chocolate brownie');
    case 'tiramisu-sf':
      return dName.includes('espresso mascarpone tiramisu');
    case 'chocolate-mousse-sf':
      return dName.includes('dark chocolate mousse');
    case 'caramel-custard-sf':
      return dName.includes('vanilla caramel flan custard');

    case 'ice-creams-sf':
      return (dish.id || '').startsWith('dish-sf-ic');
    case 'vanilla-ic-sf':
      return dName.includes('french vanilla bean');
    case 'chocolate-ic-sf':
      return dName.includes('belgian dark chocolate ice cream scoop');
    case 'butterscotch-ic-sf':
      return dName.includes('butterscotch praline');
    case 'strawberry-ic-sf':
      return dName.includes('fresh strawberry cream ice cream');
    case 'mango-ic-sf':
      return dName.includes('alphonso mango fruit scoop');
    case 'brownie-sundae-sf':
      return dName.includes('brownie hot fudge sundae');

    // Giri Express & Bistro Exclusive Categories & Subcategories
    case 'express-breakfast-eb':
      return (dish.id || '').startsWith('dish-eb-eb');
    case 'masala-dosa-eb':
      return dName.includes('dosa');
    case 'idli-eb':
      return dName.includes('idli');
    case 'vada-eb':
      return dName.includes('vada');
    case 'poori-masala-eb':
      return dName.includes('poori');
    case 'upma-eb':
      return dName.includes('upma');
    case 'pongal-eb':
      return dName.includes('pongal');
    case 'bread-omelette-eb':
      return dName.includes('bread omelette');

    case 'quick-meals-eb':
      return (dish.id || '').startsWith('dish-eb-qm');
    case 'veg-meal-eb':
      return dName.includes('veg quick meal');
    case 'south-indian-meal-eb':
      return dName.includes('south indian meal');
    case 'mini-meal-eb':
      return dName.includes('mini meal');
    case 'andhra-meal-eb':
      return dName.includes('andhra thali meal');
    case 'chicken-meal-eb':
      return dName.includes('chicken curry quick meal');
    case 'executive-meal-eb':
      return dName.includes('executive feast meal');

    case 'rice-bowls-eb':
      return (dish.id || '').startsWith('dish-eb-rb');
    case 'veg-rice-bowl-eb':
      return dName.includes('veg power rice bowl');
    case 'chicken-rice-bowl-eb':
      return dName.includes('chicken tikka rice bowl');
    case 'paneer-rice-bowl-eb':
      return dName.includes('paneer makhani rice bowl');
    case 'egg-rice-bowl-eb':
      return dName.includes('egg curry rice bowl');
    case 'fried-rice-bowl-eb':
      return dName.includes('fried rice bowl');

    case 'biryani-eb':
      return (dish.id || '').startsWith('dish-eb-by');
    case 'chicken-biryani-eb':
      return dName.includes('chicken dum biryani');
    case 'mutton-biryani-eb':
      return dName.includes('mutton dum biryani');
    case 'egg-biryani-eb':
      return dName.includes('egg dum masala biryani');
    case 'veg-biryani-eb':
      return dName.includes('veg biryani');
    case 'paneer-biryani-eb':
      return dName.includes('paneer biryani');

    case 'burgers-eb':
      return (dish.id || '').startsWith('dish-eb-bg');
    case 'veg-burger-eb':
      return dName.includes('veg herb burger');
    case 'paneer-burger-eb':
      return dName.includes('paneer burger');
    case 'chicken-burger-eb':
      return dName.includes('chicken burger') && !dName.includes('bbq');
    case 'cheese-burger-eb':
      return dName.includes('cheese burger');
    case 'bbq-chicken-burger-eb':
      return dName.includes('bbq grilled chicken burger');

    case 'wraps-rolls-eb':
      return (dish.id || '').startsWith('dish-eb-wr');
    case 'paneer-wrap-eb':
      return dName.includes('paneer tikka wrap');
    case 'veg-roll-eb':
      return dName.includes('veg roll');
    case 'chicken-wrap-eb':
      return dName.includes('spicy chicken wrap');
    case 'chicken-kathi-roll-eb':
      return dName.includes('kathi roll');
    case 'egg-roll-eb':
      return dName.includes('egg masala kathi roll');
    case 'bbq-chicken-wrap-eb':
      return dName.includes('bbq chicken wrap');

    case 'sandwiches-eb':
      return (dish.id || '').startsWith('dish-eb-sw');
    case 'veg-grilled-sandwich-eb':
      return dName.includes('veg grilled sandwich');
    case 'cheese-sandwich-eb':
      return dName.includes('cheese toastie');
    case 'paneer-sandwich-eb':
      return dName.includes('paneer tikka mayo sandwich');
    case 'chicken-sandwich-eb':
      return dName.includes('chicken sandwich');
    case 'club-sandwich-eb':
      return dName.includes('club sandwich');

    case 'pizza-eb':
      return (dish.id || '').startsWith('dish-eb-pz');
    case 'margherita-pizza-eb':
      return dName.includes('margherita pizza');
    case 'farmhouse-pizza-eb':
      return dName.includes('farmhouse veggie pizza');
    case 'paneer-pizza-eb':
      return dName.includes('paneer tikka pizza');
    case 'chicken-tikka-pizza-eb':
      return dName.includes('chicken tikka pizza');
    case 'bbq-chicken-pizza-eb':
      return dName.includes('bbq smoked chicken pizza');

    case 'pasta-eb':
      return (dish.id || '').startsWith('dish-eb-ps');
    case 'alfredo-pasta-eb':
      return dName.includes('alfredo pasta');
    case 'arrabbiata-pasta-eb':
      return dName.includes('arrabbiata pasta');
    case 'pesto-pasta-eb':
      return dName.includes('pesto cream pasta');
    case 'mushroom-pasta-eb':
      return dName.includes('mushroom cream pasta');
    case 'chicken-pasta-eb':
      return dName.includes('chicken penne pasta');

    case 'express-starters-eb':
      return (dish.id || '').startsWith('dish-eb-st');
    case 'crispy-corn-eb':
      return dName.includes('crispy sweet corn');
    case 'gobi-65-eb':
      return dName.includes('gobi 65');
    case 'chicken-65-eb':
      return dName.includes('chicken 65');
    case 'chicken-popcorn-eb':
      return dName.includes('chicken popcorn');
    case 'chilli-paneer-eb':
      return dName.includes('chilli paneer');

    case 'fries-snacks-eb':
      return (dish.id || '').startsWith('dish-eb-fs');
    case 'french-fries-eb':
      return dName.includes('french fries');
    case 'peri-peri-fries-eb':
      return dName.includes('peri peri seasoned fries');
    case 'cheese-fries-eb':
      return dName.includes('cheese fries');
    case 'potato-wedges-eb':
      return dName.includes('potato wedges');
    case 'nachos-eb':
      return dName.includes('nachos');

    case 'chicken-specials-eb':
      return (dish.id || '').startsWith('dish-eb-cs');
    case 'chicken-wings-eb':
      return dName.includes('chicken wings');
    case 'chicken-strips-eb':
      return dName.includes('chicken strips');
    case 'chilli-chicken-eb':
      return dName.includes('chilli chicken');
    case 'pepper-chicken-eb':
      return dName.includes('pepper crusted chicken fry');
    case 'bbq-chicken-eb':
      return dName.includes('bbq chicken drumsticks');

    case 'veg-specials-eb':
      return (dish.id || '').startsWith('dish-eb-vs');
    case 'paneer-tikka-eb':
      return dName.includes('paneer tikka');
    case 'veg-manchurian-eb':
      return dName.includes('veg manchurian');
    case 'chilli-paneer-veg-eb':
      return dName.includes('chilli paneer');
    case 'mushroom-pepper-fry-eb':
      return dName.includes('mushroom pepper fry');
    case 'crispy-baby-corn-eb':
      return dName.includes('baby corn pepper fry');

    case 'bistro-coffee-eb':
      return (dish.id || '').startsWith('dish-eb-bc');
    case 'espresso-eb':
      return dName.includes('espresso shot');
    case 'americano-eb':
      return dName.includes('americano');
    case 'cappuccino-eb':
      return dName.includes('cappuccino');
    case 'cafe-latte-eb':
      return dName.includes('latte');
    case 'cafe-mocha-eb':
      return dName.includes('mocha');
    case 'filter-coffee-eb':
      return dName.includes('filter coffee');

    case 'cold-beverages-eb':
      return (dish.id || '').startsWith('dish-eb-cb');
    case 'cold-coffee-eb':
      return dName.includes('cold coffee');
    case 'iced-latte-eb':
      return dName.includes('iced latte');
    case 'iced-mocha-eb':
      return dName.includes('iced mocha');
    case 'iced-tea-eb':
      return dName.includes('iced tea');
    case 'chocolate-frappe-eb':
      return dName.includes('frappe');

    case 'mocktails-coolers-eb':
      return (dish.id || '').startsWith('dish-eb-mc');
    case 'virgin-mojito-eb':
      return dName.includes('virgin mint mojito');
    case 'blue-lagoon-eb':
      return dName.includes('blue lagoon');
    case 'green-apple-cooler-eb':
      return dName.includes('green apple');
    case 'lemon-mint-cooler-eb':
      return dName.includes('lemon mint detox cooler');
    case 'strawberry-cooler-eb':
      return dName.includes('strawberry basil cooler');

    case 'fresh-juices-eb':
      return (dish.id || '').startsWith('dish-eb-fj');
    case 'orange-juice-eb':
      return dName.includes('orange juice');
    case 'watermelon-juice-eb':
      return dName.includes('watermelon juice');
    case 'pineapple-juice-eb':
      return dName.includes('pineapple juice');
    case 'pomegranate-juice-eb':
      return dName.includes('pomegranate juice');
    case 'sweet-lime-eb':
      return dName.includes('sweet lime');

    case 'milkshakes-eb':
      return (dish.id || '').startsWith('dish-eb-ms');
    case 'chocolate-shake-eb':
      return dName.includes('chocolate thick shake');
    case 'vanilla-shake-eb':
      return dName.includes('vanilla shake');
    case 'strawberry-shake-eb':
      return dName.includes('strawberry thick milkshake');
    case 'mango-shake-eb':
      return dName.includes('mango thick milkshake');
    case 'oreo-shake-eb':
      return dName.includes('oreo');

    case 'desserts-eb':
      return (dish.id || '').startsWith('dish-eb-ds');
    case 'brownie-eb':
      return dName.includes('brownie');
    case 'cheesecake-eb':
      return dName.includes('cheesecake');
    case 'tiramisu-eb':
      return dName.includes('tiramisu');
    case 'chocolate-mousse-eb':
      return dName.includes('chocolate mousse');
    case 'gulab-jamun-eb':
      return dName.includes('gulab jamun');

    case 'combos-eb':
      return (dish.id || '').startsWith('dish-eb-cb-cb');
    case 'burger-combo-eb':
      return dName.includes('burger & fries combo');
    case 'biryani-combo-eb':
      return dName.includes('biryani feast combo');
    case 'wrap-combo-eb':
      return dName.includes('wrap & beverage combo');
    case 'sandwich-combo-eb':
      return dName.includes('sandwich meal combo');
    case 'pizza-combo-eb':
      return dName.includes('pizza & pasta combo');
    case 'family-combo-eb':
      return dName.includes('family feast combo');

    default:
      const targetClean = target.toLowerCase().replace(/-/g, ' ');
      return dCat === target || dName.includes(target) || dName.includes(targetClean);
  }
}

function MenuContent() {
  const searchParams = useSearchParams();
  const shopParam = searchParams.get('shop');
  const catParam = searchParams.get('category');

  const [dishes, setDishes] = useState<MenuItem[]>(INITIAL_DISHES);
  const [activeCategory, setActiveCategory] = useState(catParam || 'all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [activeShop, setActiveShop] = useState<string | null>(shopParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    setActiveShop(shopParam || null);
    setActiveCategory(catParam || 'all');
    setActiveSubCategory(null);
  }, [shopParam, catParam]);

  // Load dynamically stored/created dishes immediately
  useEffect(() => {
    const stored = getStoredDishes();
    if (stored && stored.length > 0) {
      setDishes(stored);
    }
    menuApi.getDishes()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setDishes(res.data);
          saveStoredDishes(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubCategory(null);
    if (catId === 'all') {
      setActiveShop(null);
    }
  };

  const currentShopInfo = activeShop ? SHOP_INFO[activeShop] : null;
  
  const displayCategoryGroups = activeShop === 'giri-bakery'
    ? BAKERY_EXCLUSIVE_CATEGORY_GROUPS
    : activeShop === 'giri-grill'
    ? GRILL_EXCLUSIVE_CATEGORY_GROUPS
    : activeShop === 'giri-spice-garden'
    ? SPICE_GARDEN_EXCLUSIVE_CATEGORY_GROUPS
    : activeShop === 'giri-cafe'
    ? CAFE_EXCLUSIVE_CATEGORY_GROUPS
    : activeShop === 'giri-seafood'
    ? SEAFOOD_EXCLUSIVE_CATEGORY_GROUPS
    : activeShop === 'giri-express-bistro'
    ? EXPRESS_BISTRO_EXCLUSIVE_CATEGORY_GROUPS
    : activeShop && SHOP_RELEVANT_CATEGORIES[activeShop]
    ? CATEGORY_GROUPS.filter((g) => SHOP_RELEVANT_CATEGORIES[activeShop].includes(g.id))
    : CATEGORY_GROUPS;

  const currentGroup = (
    activeShop === 'giri-bakery' ? BAKERY_EXCLUSIVE_CATEGORY_GROUPS :
    activeShop === 'giri-grill' ? GRILL_EXCLUSIVE_CATEGORY_GROUPS :
    activeShop === 'giri-spice-garden' ? SPICE_GARDEN_EXCLUSIVE_CATEGORY_GROUPS :
    activeShop === 'giri-cafe' ? CAFE_EXCLUSIVE_CATEGORY_GROUPS :
    activeShop === 'giri-seafood' ? SEAFOOD_EXCLUSIVE_CATEGORY_GROUPS :
    activeShop === 'giri-express-bistro' ? EXPRESS_BISTRO_EXCLUSIVE_CATEGORY_GROUPS :
    CATEGORY_GROUPS
  ).find((g) => g.id === activeCategory);

  const filteredDishes = dishes.filter((dish) => {
    let matchShop = true;
    if (activeShop) {
      const dShop = (dish.shopSlug || '').toLowerCase();
      const dName = (dish.shopName || '').toLowerCase();
      const dTitle = (dish.name || '').toLowerCase();
      const dCat = (dish.category || '').toLowerCase();

      if (activeShop === 'giri-express-bistro') {
        matchShop = dShop === 'giri-express-bistro' || (dish.id || '').startsWith('dish-eb-') || dName.includes('giri express');
      } else if (activeShop === 'giri-fine-dining') {
        matchShop = dShop === 'giri-fine-dining' || dName.includes('fine dining') || !dShop || dish.price >= 180;
      } else if (activeShop === 'giri-kitchen') {
        matchShop = dShop === 'giri-kitchen' || dName.includes('kitchen') || !dShop;
      } else if (activeShop === 'giri-bakery') {
        matchShop = dShop === 'giri-bakery' || dName.includes('bakery') || dCat === 'desserts' || dTitle.includes('cake') || dTitle.includes('pastry') || dTitle.includes('croissant') || dTitle.includes('puff') || dTitle.includes('cookie') || dTitle.includes('donut') || dTitle.includes('sweet') || dTitle.includes('bread') || dTitle.includes('tiramisu') || dTitle.includes('macaron') || dTitle.includes('brownie') || dTitle.includes('mithai');
      } else if (activeShop === 'giri-grill') {
        matchShop = dShop === 'giri-grill' || dName.includes('grill') || dTitle.includes('grill') || dTitle.includes('tandoori') || dTitle.includes('kebab') || dTitle.includes('tikka') || dTitle.includes('bbq') || dTitle.includes('shashlik') || dTitle.includes('skewer') || dTitle.includes('platter');
      } else if (activeShop === 'giri-spice-garden') {
        matchShop = dShop === 'giri-spice-garden' || dName.includes('spice garden') || (dish.id || '').startsWith('dish-sg-');
      } else if (activeShop === 'giri-cafe') {
        matchShop = dShop === 'giri-cafe' || dName.includes('caf') || (dish.id || '').startsWith('dish-cf-');
      } else if (activeShop === 'giri-seafood') {
        matchShop = dShop === 'giri-seafood' || dName.includes('seafood') || (dish.id || '').startsWith('dish-sf-');
      } else {
        matchShop = dShop === activeShop || !dShop;
      }
    }

    const matchCategory = matchCategorySubCategory(dish, activeCategory, activeSubCategory);

    const matchSearch = !searchQuery ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDiet = dietFilter === 'all' || (dish.dietary && dish.dietary.includes(dietFilter));

    return matchShop && matchCategory && matchSearch && matchDiet;
  });

  // Fallback to shop-restricted filter if filteredDishes is empty
  const effectiveDishes = filteredDishes.length > 0 ? filteredDishes : dishes.filter((dish) => {
    let matchShop = true;
    if (activeShop) {
      const dShop = (dish.shopSlug || '').toLowerCase();
      const dName = (dish.shopName || '').toLowerCase();
      const dTitle = (dish.name || '').toLowerCase();
      const dCat = (dish.category || '').toLowerCase();
      if (activeShop === 'giri-bakery') {
        matchShop = dShop === 'giri-bakery' || dName.includes('bakery') || dCat === 'desserts' || dTitle.includes('cake') || dTitle.includes('pastry') || dTitle.includes('croissant') || dTitle.includes('puff') || dTitle.includes('cookie') || dTitle.includes('donut') || dTitle.includes('sweet') || dTitle.includes('bread') || dTitle.includes('tiramisu') || dTitle.includes('macaron') || dTitle.includes('brownie') || dTitle.includes('mithai');
      } else if (activeShop === 'giri-grill') {
        matchShop = dShop === 'giri-grill' || dName.includes('grill') || dTitle.includes('grill') || dTitle.includes('tandoori') || dTitle.includes('kebab') || dTitle.includes('tikka') || dTitle.includes('bbq') || dTitle.includes('shashlik') || dTitle.includes('skewer') || dTitle.includes('platter');
      } else if (activeShop === 'giri-spice-garden') {
        matchShop = dShop === 'giri-spice-garden' || dName.includes('spice garden') || (dish.id || '').startsWith('dish-sg-');
      } else if (activeShop === 'giri-cafe') {
        matchShop = dShop === 'giri-cafe' || dName.includes('caf') || (dish.id || '').startsWith('dish-cf-');
      } else if (activeShop === 'giri-seafood') {
        matchShop = dShop === 'giri-seafood' || dName.includes('seafood') || (dish.id || '').startsWith('dish-sf-');
      } else {
        matchShop = dShop === activeShop;
      }
    }
    const matchSearch = !searchQuery ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDiet = dietFilter === 'all' || (dish.dietary && dish.dietary.includes(dietFilter));
    return matchShop && matchSearch && matchDiet;
  });

  const uniqueFilteredDishes = effectiveDishes.filter((dish, index, self) => {
    const idKey = (dish.id || (dish as any)._id || '').trim().toLowerCase();
    const nameKey = (dish.name || '').trim().toLowerCase();
    return self.findIndex((d) => {
      const dId = (d.id || (d as any)._id || '').trim().toLowerCase();
      const dName = (d.name || '').trim().toLowerCase();
      return (dId && dId === idKey) || (dName && dName === nameKey);
    }) === index;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search Bar with 3-Lines Outlets & Filter Dropdown */}
        <div className="relative w-full mb-6 sm:mb-8 z-30">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] w-4 h-4 pointer-events-none" />

            <input
              type="text"
              placeholder={currentShopInfo ? `Search within ${currentShopInfo.title}...` : "Search dishes, biryani, tiffins, or cuisines..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-24 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
            />

            {/* Right Action Icons: Clear & 3-Lines Menu Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-gray-400 hover:text-[#8B0000] hover:bg-black/5 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* 3-Lines Filter Menu Icon */}
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`p-1.5 transition-colors cursor-pointer flex items-center justify-center ${
                  showFilterMenu ? 'text-[#8B0000]' : 'text-[#8B0000] hover:text-[#A00000]'
                }`}
                title="Toggle Outlets & Category Filter Menu"
                aria-label="Toggle Outlets & Category Filter Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Outlet Pill indicator right under Search Bar */}
          {activeShop && currentShopInfo && (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={() => setActiveShop(null)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#8B0000]/40 text-[#1a1008] text-xs font-extrabold shadow-sm hover:bg-[#FFF0EB] hover:border-[#8B0000] transition-all cursor-pointer group"
                title="Click to reset shop filter"
              >
                <span className="flex items-center gap-1.5">
                  <span>{currentShopInfo.icon}</span>
                  <span>{currentShopInfo.title}</span>
                </span>
                <X className="w-3.5 h-3.5 text-[#a09070] group-hover:text-[#8B0000] ml-1" />
              </button>
            </div>
          )}

          {/* Floating Filter Menu Dropdown */}
          {showFilterMenu && (
            <>
              <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowFilterMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#8B0000]/15 rounded-2xl p-4 shadow-xl z-50 animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2 mb-3">
                  <span className="text-xs font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">Filter Menu</span>
                  <button onClick={() => setShowFilterMenu(false)} className="text-gray-400 hover:text-[#8B0000] cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Dietary Filter Section */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-[#a09070] uppercase tracking-wider block mb-2">Dietary Options</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => {
                        setDietFilter('all');
                        setShowFilterMenu(false);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        dietFilter === 'all'
                          ? 'bg-[#8B0000] text-white shadow-xs'
                          : 'bg-[#F8F5F0] text-[#6b5840] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                      }`}
                    >
                      <span>🍽️ All</span>
                    </button>
                    <button
                      onClick={() => {
                        setDietFilter('veg');
                        setShowFilterMenu(false);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        dietFilter === 'veg'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#F8F5F0] text-[#6b5840] hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <span>🟢 Pure Veg</span>
                    </button>
                    <button
                      onClick={() => {
                        setDietFilter('non-veg');
                        setShowFilterMenu(false);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        dietFilter === 'non-veg'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-[#F8F5F0] text-[#6b5840] hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      <span>🍖 Non-Veg</span>
                    </button>
                  </div>
                </div>

                {/* Restaurant Outlets Section */}
                <div className="space-y-1.5 border-t border-[#8B0000]/10 pt-3">
                  <span className="text-[10px] font-bold text-[#a09070] uppercase tracking-wider block mb-2">Filter Outlets</span>
                  <button
                    onClick={() => {
                      setActiveShop(null);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                      !activeShop
                        ? 'bg-[#8B0000] text-white shadow-xs'
                        : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🏪</span>
                      <span>All Outlets</span>
                    </span>
                    {!activeShop && <span>✓</span>}
                  </button>
                  {RESTAURANT_OUTLETS.map((outlet) => {
                    const isActive = activeShop === outlet.slug;
                    return (
                      <button
                        key={outlet.slug}
                        onClick={() => {
                          setActiveShop(outlet.slug);
                          setActiveCategory('all');
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#8B0000] text-white shadow-xs'
                            : 'text-[#1a1008] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{outlet.icon}</span>
                          <span>{outlet.name}</span>
                        </span>
                        {isActive && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>



        {/* Main Food Categories & Sub-Categories Tree Section */}
        <div className="mb-6 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#8B0000]/15 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#8B0000]" />
              <span className="text-xs font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">
                Food Categories & Cuisine Filter
              </span>
            </div>
          </div>

          {/* Main Category Groups Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleSelectCategory('all')}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeCategory === 'all' && !activeSubCategory
                  ? 'bg-[#1a1008] text-white shadow-md'
                  : 'bg-[#F8F5F0] text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000] border border-black/5'
              }`}
            >
              <span>🍽️ All Dishes</span>
            </button>
            {displayCategoryGroups.map((group) => {
              const isActive = activeCategory === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => handleSelectCategory(group.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B0000] text-white shadow-md ring-2 ring-[#8B0000]/30'
                      : 'bg-[#F8F5F0] text-[#1a1008] hover:bg-[#FFF0EB] hover:text-[#8B0000] border border-black/5'
                  }`}
                >
                  <span>{group.icon}</span>
                  <span>{group.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sub-Categories Row */}
          {currentGroup && currentGroup.subcategories.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#8B0000]/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none animate-in fade-in duration-200">
              <span className="text-[11px] font-bold text-[#a09070] mr-1 shrink-0 uppercase tracking-wider">
                Sub-Category:
              </span>
              <button
                onClick={() => setActiveSubCategory(null)}
                className={`shrink-0 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !activeSubCategory
                    ? 'bg-[#8B0000]/15 text-[#8B0000] border border-[#8B0000]/30'
                    : 'bg-[#F8F5F0] text-[#6b5840] hover:text-[#8B0000]'
                }`}
              >
                All {currentGroup.name}
              </button>
              {currentGroup.subcategories.map((sub) => {
                const isSubActive = activeSubCategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubCategory(sub.id)}
                    className={`shrink-0 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      isSubActive
                        ? 'bg-[#8B0000] text-white shadow-xs'
                        : 'bg-[#F8F5F0] text-[#1a1008] hover:bg-[#FFF0EB] hover:text-[#8B0000] border border-black/5'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Category Header Title & Subtitle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1a1008] capitalize">
              {currentShopInfo 
                ? `${currentShopInfo.title} Dishes` 
                : activeSubCategory 
                  ? `${activeSubCategory.replace(/-/g, ' ')} Options` 
                  : currentGroup 
                    ? `${currentGroup.name} Dishes` 
                    : 'Menu Dishes'}
            </h1>
            <p className="text-xs text-[#a09070] mt-0.5 font-medium">
              Showing {uniqueFilteredDishes.length} gourmet dish options
            </p>
          </div>
        </div>

        {/* Dishes Grid */}
        {uniqueFilteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#8B0000]/10 p-8">
            <p className="text-4xl mb-3">🍽️</p>
            <h3 className="text-base font-bold text-[#1a1008]">No dishes found</h3>
            <p className="text-xs text-[#a09070] mt-1">Try selecting another category or resetting your search filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveShop(null);
                setSearchQuery('');
                setDietFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[#8B0000] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#A00000] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {uniqueFilteredDishes.map((dish, idx) => {
              const cardImage = dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=85';
              const displayDish = { ...dish, image: cardImage };

              return (
                <div
                  key={dish.id || (dish as any)._id || idx}
                  onClick={() => setSelectedDish(displayDish)}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#8B0000]/10 bg-white cursor-pointer"
                >
                  {/* Dish Image */}
                  <div
                    className="relative h-44 sm:h-48 w-full bg-[#F8F5F0] overflow-hidden shrink-0"
                    style={{ position: 'relative', width: '100%', height: '192px', overflow: 'hidden' }}
                  >
                    <img
                      src={cardImage}
                      alt={displayDish.name}
                      loading={idx < 6 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=85';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Dietary Tag Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    {dish.dietary?.includes('veg') && (
                      <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Leaf className="w-3 h-3" /> Veg
                      </span>
                    )}
                    {dish.dietary?.includes('non-veg') && (
                      <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        🍖 Non-Veg
                      </span>
                    )}
                    {dish.dietary?.includes('chef-special') && (
                      <span className="bg-[#C8A055]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        ⭐ Special
                      </span>
                    )}
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
                  <div className="cursor-pointer" onClick={() => setSelectedDish(displayDish)}>
                    <h3 className="font-extrabold text-[#1a1008] text-base group-hover:text-[#8B0000] transition-colors line-clamp-1">
                      {displayDish.name}
                    </h3>
                    <p className="text-xs text-[#6b5840] line-clamp-2 leading-relaxed mt-1">{displayDish.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#8B0000]/10 gap-2 sm:gap-3">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-extrabold text-[#8B0000]">
                        {formatCurrency(displayDish.price)}
                      </span>
                      <span className="text-[11px] font-semibold text-[#a09070] mt-0.5">
                        ⏱️ {displayDish.prepTime} mins slot
                      </span>
                    </div>
                    <AddButton dish={displayDish} variant="sm" />
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>

      {/* Dish detail modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-[#8B0000] font-bold">
        Loading Menu...
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}

