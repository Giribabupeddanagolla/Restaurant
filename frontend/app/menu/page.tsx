'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { INITIAL_CATEGORIES, CATEGORY_GROUPS, BAKERY_EXCLUSIVE_CATEGORY_GROUPS, GRILL_EXCLUSIVE_CATEGORY_GROUPS, SPICE_GARDEN_EXCLUSIVE_CATEGORY_GROUPS, CAFE_EXCLUSIVE_CATEGORY_GROUPS, SEAFOOD_EXCLUSIVE_CATEGORY_GROUPS, EXPRESS_BISTRO_EXCLUSIVE_CATEGORY_GROUPS, FINE_DINING_EXCLUSIVE_CATEGORY_GROUPS, INITIAL_DISHES, getStoredDishes, saveStoredDishes, RESTAURANT_OUTLETS, getMatchingFoodImage } from '@/data/mockData';
import { Search, Leaf, Menu, X, Store, ArrowLeft, SlidersHorizontal, Utensils, ChevronDown, ChevronRight, Filter, Layers } from 'lucide-react';
import { MenuItem } from '@/types';
import DishModal from '@/components/DishModal';
import AddButton from '@/components/AddButton';
import { FALLBACK_SVG } from '@/components/SafeImage';
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

  const dCatId = String((dish as any).categoryId || (dish as any).category || '').toLowerCase().trim();
  const dSubCatId = String((dish as any).subCategoryId || (dish as any).subCategory || '').toLowerCase().trim();
  const dFoodType = String((dish as any).foodType || '').toLowerCase().trim();
  const dCat = (dish.category || '').toLowerCase();
  const dName = (dish.name || '').toLowerCase();
  const dDesc = (dish.description || '').toLowerCase();
  const dDiet = (dish.dietary || []).map((d) => d.toLowerCase());

  const targetCat = catId ? catId.toLowerCase().trim() : '';
  const targetSubCat = subCatId ? subCatId.toLowerCase().trim() : '';

  // Direct Database ID / Key matching
  if (targetSubCat) {
    if (dSubCatId === targetSubCat) return true;
    if (targetSubCat === 'veg-biryani') {
      if (dSubCatId === 'veg-biryani' || dSubCatId === 'saffron-vegetable-biryani') return true;
      if ((dCatId.includes('biryani') || dName.includes('biryani')) && (dFoodType === 'veg' || dDiet.includes('veg') || dName.includes('veg') || dName.includes('paneer') || dName.includes('mushroom') || dName.includes('subz') || dName.includes('saffron'))) {
        return true;
      }
    }
    if (targetSubCat === 'chicken-biryani') {
      if (dSubCatId === 'chicken-biryani' || dSubCatId === 'royal-chicken-biryani') return true;
      if ((dCatId.includes('biryani') || dName.includes('biryani')) && (dFoodType === 'non-veg' || dDiet.includes('non-veg') || dName.includes('chicken'))) {
        return true;
      }
    }
    if (targetSubCat === 'mutton-biryani') {
      if (dSubCatId === 'mutton-biryani' || dSubCatId === 'mutton-dum-biryani') return true;
      if ((dCatId.includes('biryani') || dName.includes('biryani')) && (dName.includes('mutton') || dName.includes('lamb') || dName.includes('mamsam'))) {
        return true;
      }
    }
    if (targetSubCat === 'prawn-biryani') {
      if (dSubCatId === 'prawn-biryani') return true;
      if ((dCatId.includes('biryani') || dName.includes('biryani')) && (dName.includes('prawn') || dName.includes('royyala') || dName.includes('shrimp'))) {
        return true;
      }
    }
    if (targetSubCat === 'egg-biryani') {
      if (dSubCatId === 'egg-biryani') return true;
      if ((dCatId.includes('biryani') || dName.includes('biryani')) && (dFoodType === 'egg' || dName.includes('egg'))) {
        return true;
      }
    }
    if (targetSubCat === 'dosa') {
      if (dSubCatId === 'dosa' || dName.includes('dosa')) return true;
    }
    if (targetSubCat === 'idli') {
      if (dSubCatId === 'idli' || dName.includes('idli') || dName.includes('idly')) return true;
    }
  } else if (targetCat) {
    if (dCatId === targetCat) return true;
    if (targetCat === 'biryani') {
      if (dCatId.includes('biryani') || dSubCatId.includes('biryani') || dName.includes('biryani')) return true;
    }
    if (targetCat === 'breakfast') {
      if (dCatId === 'breakfast' || dName.includes('idli') || dName.includes('dosa') || dName.includes('vada') || dName.includes('poori') || dName.includes('upma') || dName.includes('pongal')) return true;
    }
  }

  const target = subCatId || catId;

  switch (target) {
    case 'all':
      return true;

    // 1. Breakfast
    case 'breakfast':
      return dName.includes('idli') || dName.includes('idly') || dName.includes('dosa') || dName.includes('vada') || dName.includes('poori') || dName.includes('upma') || dName.includes('pongal') || dName.includes('omelette');
    case 'idli':
      return dName.includes('idli') || dName.includes('idly');
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
    case 'omelette':
      return dName.includes('omelette') || dName.includes('egg');

    // 2. Soups
    case 'soups':
      return dName.includes('soup') || dName.includes('velouté');
    case 'tomato-soup':
      return dName.includes('tomato') && dName.includes('soup');
    case 'sweet-corn-soup':
      return dName.includes('sweet corn') || (dName.includes('corn') && dName.includes('soup'));
    case 'hot-sour-soup':
      return (dName.includes('hot') && dName.includes('sour')) || dName.includes('hot & sour');
    case 'manchow-soup':
      return dName.includes('manchow');
    case 'chicken-soup':
      return dName.includes('chicken') && dName.includes('soup');

    // 3. Veg Starters
    case 'veg-starters':
      return (dCat === 'starters' || dName.includes('starter') || dName.includes('tikka') || dName.includes('65') || dName.includes('manchurian')) && (dDiet.includes('veg') || dName.includes('paneer') || dName.includes('gobi') || dName.includes('corn') || dName.includes('veg'));
    case 'paneer-tikka':
      return dName.includes('paneer tikka');
    case 'gobi-65':
      return dName.includes('gobi 65') || (dName.includes('gobi') && dName.includes('65'));
    case 'crispy-corn':
      return dName.includes('crispy corn') || dName.includes('corn basket');
    case 'chilli-paneer':
      return dName.includes('chilli paneer');
    case 'baby-corn-manchurian':
      return dName.includes('baby corn') || (dName.includes('corn') && dName.includes('manchurian'));

    // 4. Non-Veg Starters
    case 'non-veg-starters':
      return (dCat === 'starters' || dName.includes('starter') || dName.includes('65') || dName.includes('lollipop') || dName.includes('fry') || dName.includes('kebab')) && (dDiet.includes('non-veg') || dName.includes('chicken') || dName.includes('mutton') || dName.includes('fish'));
    case 'chicken-65':
      return dName.includes('chicken 65');
    case 'chicken-lollipop':
      return dName.includes('lollipop') || dName.includes('lolipop');
    case 'chilli-chicken':
      return dName.includes('chilli chicken');
    case 'mutton-kebab':
      return dName.includes('mutton kebab') || dName.includes('mutton seekh') || (dName.includes('mutton') && dName.includes('boti'));
    case 'fish-fry':
      return dName.includes('fish fry') || dName.includes('apollo fish');

    // 5. Tandoor
    case 'tandoor':
      return dName.includes('tandoor') || dName.includes('tandoori') || dName.includes('tikka');
    case 'tandoori-chicken':
      return dName.includes('tandoori chicken');
    case 'chicken-tikka-tandoor':
      return dName.includes('chicken tikka') && !dName.includes('masala') && !dName.includes('pizza');
    case 'paneer-tikka-tandoor':
      return dName.includes('paneer tikka');
    case 'tandoori-fish':
      return dName.includes('tandoori fish') || dName.includes('fish tikka');
    case 'tandoori-prawns':
      return dName.includes('tandoori prawn') || dName.includes('prawn tikka');

    // 6. Grill
    case 'grill':
      return dName.includes('grill') || dName.includes('grilled') || dName.includes('wings') || dName.includes('chops');
    case 'grilled-chicken':
      return dName.includes('grilled chicken');
    case 'chicken-wings':
      return dName.includes('wing') || dName.includes('wings');
    case 'mutton-chops':
      return dName.includes('mutton chop') || dName.includes('mutton chops') || dName.includes('lamb chops');
    case 'grilled-fish':
      return dName.includes('grilled fish') || dName.includes('grilled salmon');
    case 'grilled-prawns':
      return dName.includes('grilled prawn') || dName.includes('grilled jumbo prawns');

    // 7. Kebabs
    case 'kebabs':
      return dName.includes('kebab') || dName.includes('seekh') || dName.includes('boti');
    case 'chicken-seekh-kebab':
      return dName.includes('chicken seekh');
    case 'reshmi-kebab':
      return dName.includes('reshmi');
    case 'hariyali-kebab':
      return dName.includes('hariyali');
    case 'mutton-seekh-kebab':
      return dName.includes('mutton seekh');
    case 'paneer-kebab':
      return dName.includes('paneer kebab') || dName.includes('paneer tikka');

    // 8. Biryani
    case 'biryani':
      return dName.includes('biryani');
    case 'chicken-biryani':
      return dName.includes('biryani') && dName.includes('chicken');
    case 'mutton-biryani':
      return dName.includes('biryani') && (dName.includes('mutton') || dName.includes('lamb') || dName.includes('nalli'));
    case 'prawn-biryani':
      return dName.includes('biryani') && (dName.includes('prawn') || dName.includes('shrimp') || dName.includes('seafood'));
    case 'egg-biryani':
      return dName.includes('biryani') && dName.includes('egg');
    case 'veg-biryani':
      return dName.includes('biryani') && (dName.includes('veg') || dName.includes('paneer') || dName.includes('subz') || dDiet.includes('veg'));

    // 9. Rice & Pulao
    case 'rice-pulao':
      return dName.includes('rice') || dName.includes('pulao') || dName.includes('pulav');
    case 'jeera-rice':
      return dName.includes('jeera rice');
    case 'ghee-rice':
      return dName.includes('ghee rice');
    case 'veg-pulao':
      return dName.includes('veg pulao') || dName.includes('subz pulao') || (dName.includes('pulao') && !dName.includes('chicken'));
    case 'chicken-pulao':
      return dName.includes('chicken pulao');
    case 'fried-rice-sub':
      return dName.includes('fried rice');

    // 10. South Indian Curries
    case 'south-indian-curries':
      return dName.includes('curry') || dName.includes('gongura') || dName.includes('andhra') || dName.includes('chettinad');
    case 'andhra-chicken':
      return dName.includes('andhra chicken') || dName.includes('guntur chicken');
    case 'gongura-chicken':
      return dName.includes('gongura chicken') || (dName.includes('gongura') && dName.includes('chicken'));
    case 'chicken-curry-si':
      return dName.includes('chicken curry') || dName.includes('kodi kura');
    case 'mutton-curry-si':
      return dName.includes('mutton curry') || dName.includes('mamsam kura');
    case 'fish-curry-si':
      return dName.includes('fish curry') || dName.includes('chepala pulusu');

    // 11. North Indian Curries
    case 'north-indian-curries':
      return dName.includes('butter chicken') || dName.includes('kadai') || dName.includes('rogan josh') || dName.includes('dal makhani') || dName.includes('paneer') || dName.includes('masala');
    case 'butter-chicken':
      return dName.includes('butter chicken') || dName.includes('murgh makhani');
    case 'kadai-chicken':
      return dName.includes('kadai chicken');
    case 'rogan-josh':
      return dName.includes('rogan josh');
    case 'dal-makhani':
      return dName.includes('dal makhani');
    case 'kadai-paneer':
      return dName.includes('kadai paneer');

    // 12. Seafood
    case 'seafood':
      return dName.includes('fish') || dName.includes('prawn') || dName.includes('crab') || dName.includes('squid') || dName.includes('seafood');
    case 'fish-curry-sf':
      return dName.includes('fish curry');
    case 'fish-fry-sf':
      return dName.includes('fish fry');
    case 'prawn-curry-sf':
      return dName.includes('prawn curry');
    case 'crab-masala':
      return dName.includes('crab');
    case 'squid-fry':
      return dName.includes('squid') || dName.includes('calamari');

    // 13. Chinese
    case 'chinese':
      return dName.includes('noodle') || dName.includes('fried rice') || dName.includes('manchurian') || dName.includes('hakka') || dName.includes('schezwan');
    case 'hakka-noodles':
      return dName.includes('noodle') || dName.includes('hakka') || dName.includes('chow mein');
    case 'fried-rice-cn':
      return dName.includes('fried rice');
    case 'veg-manchurian':
      return dName.includes('veg manchurian');
    case 'chicken-manchurian':
      return dName.includes('chicken manchurian');
    case 'chilli-chicken-cn':
      return dName.includes('chilli chicken');

    // 14. Breads
    case 'breads':
      return dName.includes('naan') || dName.includes('roti') || dName.includes('paratha') || dName.includes('kulcha') || dName.includes('bread');
    case 'butter-naan':
      return dName.includes('butter naan');
    case 'garlic-naan':
      return dName.includes('garlic naan');
    case 'tandoori-roti':
      return dName.includes('tandoori roti') || dName.includes('roti');
    case 'laccha-paratha':
      return dName.includes('laccha') || dName.includes('paratha');
    case 'cheese-naan':
      return dName.includes('cheese naan');

    // 15. Fast Food
    case 'fast-food':
      return dName.includes('burger') || dName.includes('pizza') || dName.includes('pasta') || dName.includes('sandwich') || dName.includes('wrap');
    case 'burger':
      return dName.includes('burger') || dName.includes('slider');
    case 'pizza':
      return dName.includes('pizza');
    case 'pasta':
      return dName.includes('pasta') || dName.includes('penne') || dName.includes('spaghetti');
    case 'sandwich':
      return dName.includes('sandwich') || dName.includes('panini');
    case 'wrap':
      return dName.includes('wrap') || dName.includes('roll');

    // 16. Bakery
    case 'bakery':
      return dName.includes('cake') || dName.includes('pastry') || dName.includes('muffin') || dName.includes('donut') || dName.includes('cookie') || dName.includes('bread');
    case 'cakes':
      return dName.includes('cake') && !dName.includes('cheesecake') && !dName.includes('pastry');
    case 'pastries':
      return dName.includes('pastry');
    case 'muffins':
      return dName.includes('muffin');
    case 'donuts':
      return dName.includes('donut') || dName.includes('doughnut');
    case 'cookies':
      return dName.includes('cookie') || dName.includes('biscuits');

    // 17. Desserts
    case 'desserts':
      return dName.includes('gulab jamun') || dName.includes('rasmalai') || dName.includes('brownie') || dName.includes('cheesecake') || dName.includes('ice cream') || dCat === 'desserts';
    case 'gulab-jamun':
      return dName.includes('gulab jamun');
    case 'rasmalai':
      return dName.includes('rasmalai');
    case 'brownie':
      return dName.includes('brownie');
    case 'cheesecake':
      return dName.includes('cheesecake');
    case 'ice-cream':
      return dName.includes('ice cream') || dName.includes('sundae') || dName.includes('gelato');

    // 18. Beverages
    case 'beverages':
      return dName.includes('tea') || dName.includes('coffee') || dName.includes('shake') || dName.includes('juice') || dName.includes('mocktail') || dCat === 'drinks';
    case 'tea':
      return dName.includes('tea') || dName.includes('chai');
    case 'coffee':
      return dName.includes('coffee') || dName.includes('cappuccino') || dName.includes('latte') || dName.includes('espresso');
    case 'milkshake':
      return dName.includes('shake') || dName.includes('milkshake');
    case 'fresh-juice':
      return dName.includes('juice');
    case 'mocktail':
      return dName.includes('mocktail') || dName.includes('mojito') || dName.includes('cooler');

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
      return dName.includes('tandoori') && (dName.includes('full') || dName.includes('whole') || dName.includes('signature royal') || dName.includes('roast') || dName.includes('claypot') || dName.includes('bhatti') || dName.includes('dum') || dName.includes('zafrani') || dName.includes('kashmiri'));
    case 'half-tandoori-chicken':
      return dName.includes('tandoori') && (dName.includes('half') || dName.includes('portion') || dName.includes('smoky') || dName.includes('guntur') || dName.includes('lemon') || dName.includes('chettinad'));
    case 'tandoori-chicken-legs':
      return dName.includes('tandoori') && (dName.includes('leg') || dName.includes('legs') || dName.includes('tangdi') || dName.includes('drumstick'));
    case 'tandoori-chicken-wings':
      return dName.includes('tandoori') && (dName.includes('wing') || dName.includes('wings'));

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

    // Fine Dining Exclusive Category Groups & Subcategories
    case 'amuse-bouche':
      return (dish.id || '').startsWith('dish-fd-chefs-welcome-bite') || (dish.id || '').startsWith('dish-fd-paneer-canape') || (dish.id || '').startsWith('dish-fd-chicken-canape') || (dish.id || '').startsWith('dish-fd-seafood-bite') || (dish.id || '').startsWith('dish-fd-seasonal-special') || dName.includes('canapé') || dName.includes('bite') || dName.includes('amuse');
    case 'chefs-welcome-bite':
      return (dish.id || '').includes('chefs-welcome-bite') || dName.includes('welcome bite') || dName.includes('amuse-bouche');
    case 'paneer-canape':
      return (dish.id || '').includes('paneer-canape') || (dName.includes('paneer') && dName.includes('canapé'));
    case 'chicken-canape':
      return (dish.id || '').includes('chicken-canape') || (dName.includes('chicken') && dName.includes('canapé'));
    case 'seafood-bite':
      return (dish.id || '').includes('seafood-bite') || dName.includes('seafood bite') || dName.includes('caviar') || dName.includes('crostini bite') || dName.includes('thermidor bite') || dName.includes('saffron bite') || dName.includes('crab');
    case 'seasonal-special':
    case 'seasonal-special-ab':
      return (dish.id || '').includes('seasonal-special') || dName.includes('seasonal') || dName.includes('consommé') || dName.includes('sphere');

    case 'fine-dining-starters':
      return (dish.id || '').startsWith('dish-fd-truffle-paneer') || (dish.id || '').startsWith('dish-fd-tandoori-mushroom') || (dish.id || '').startsWith('dish-fd-chicken-galouti') || (dish.id || '').startsWith('dish-fd-mutton-shikampuri') || (dish.id || '').startsWith('dish-fd-smoked-fish');
    case 'truffle-paneer':
    case 'truffle-paneer-fds':
      return (dish.id || '').includes('truffle-paneer') || (dName.includes('truffle') && dName.includes('paneer'));
    case 'tandoori-mushroom':
    case 'tandoori-mushroom-fds':
      return (dish.id || '').includes('tandoori-mushroom') || dName.includes('tandoori mushroom') || dName.includes('stuffed mushroom') || dName.includes('mushroom tikka');
    case 'chicken-galouti-kebab':
    case 'chicken-galouti-kebab-fds':
      return (dish.id || '').includes('chicken-galouti') || dName.includes('chicken galouti');
    case 'mutton-shikampuri':
    case 'mutton-shikampuri-fds':
      return (dish.id || '').includes('mutton-shikampuri') || dName.includes('shikampuri');
    case 'smoked-fish':
    case 'smoked-fish-fds':
      return (dish.id || '').includes('smoked-fish') || dName.includes('smoked fish') || dName.includes('carpaccio');

    case 'premium-vegetarian':
      return (dish.id || '').startsWith('dish-fd-truffle-paneer-pv') || (dish.id || '').startsWith('dish-fd-dal-bukhara') || (dish.id || '').startsWith('dish-fd-subz-kofta') || (dish.id || '').startsWith('dish-fd-kashmiri-dum-aloo') || (dish.id || '').startsWith('dish-fd-wild-mushroom');
    case 'truffle-paneer-pv':
      return (dish.id || '').includes('truffle-paneer') || (dName.includes('truffle') && dName.includes('paneer'));
    case 'dal-bukhara':
    case 'dal-bukhara-pv':
      return (dish.id || '').includes('dal-bukhara') || dName.includes('dal bukhara');
    case 'subz-kofta':
    case 'subz-kofta-pv':
      return (dish.id || '').includes('subz-kofta') || dName.includes('subz kofta') || dName.includes('nargisi kofta');
    case 'kashmiri-dum-aloo':
    case 'kashmiri-dum-aloo-pv':
      return (dish.id || '').includes('kashmiri-dum-aloo') || dName.includes('dum aloo');
    case 'wild-mushroom-curry':
    case 'wild-mushroom-curry-pv':
      return (dish.id || '').includes('wild-mushroom') || dName.includes('wild mushroom') || dName.includes('morel');

    case 'premium-chicken':
      return (dish.id || '').startsWith('dish-fd-chicken-roulade') || (dish.id || '').startsWith('dish-fd-butter-chicken-supreme') || (dish.id || '').startsWith('dish-fd-chicken-malai') || (dish.id || '').startsWith('dish-fd-smoked-chicken') || (dish.id || '').startsWith('dish-fd-chicken-chettinad');
    case 'chicken-roulade':
    case 'chicken-roulade-pc':
      return (dish.id || '').includes('chicken-roulade') || dName.includes('roulade');
    case 'butter-chicken-supreme':
    case 'butter-chicken-supreme-pc':
      return (dish.id || '').includes('butter-chicken-supreme') || dName.includes('butter chicken supreme');
    case 'chicken-malai':
    case 'chicken-malai-pc':
      return (dish.id || '').includes('chicken-malai') || dName.includes('chicken malai');
    case 'smoked-chicken':
    case 'smoked-chicken-pc':
      return (dish.id || '').includes('smoked-chicken') || dName.includes('smoked chicken');
    case 'chicken-chettinad':
    case 'chicken-chettinad-pc':
      return (dish.id || '').includes('chicken-chettinad') || dName.includes('chettinad');

    case 'premium-mutton':
      return (dish.id || '').startsWith('dish-fd-mutton-rogan-josh') || (dish.id || '').startsWith('dish-fd-mutton-shank') || (dish.id || '').startsWith('dish-fd-mutton-galouti') || (dish.id || '').startsWith('dish-fd-lamb-chops') || (dish.id || '').startsWith('dish-fd-mutton-korma');
    case 'mutton-rogan-josh':
    case 'mutton-rogan-josh-pm':
      return (dish.id || '').includes('mutton-rogan-josh') || dName.includes('rogan josh');
    case 'mutton-shank':
    case 'mutton-shank-pm':
      return (dish.id || '').includes('mutton-shank') || dName.includes('mutton shank') || dName.includes('nihari');
    case 'mutton-galouti':
    case 'mutton-galouti-pm':
      return (dish.id || '').includes('mutton-galouti') || dName.includes('mutton galouti');
    case 'lamb-chops':
    case 'lamb-chops-pm':
      return (dish.id || '').includes('lamb-chops') || dName.includes('lamb chops');
    case 'mutton-korma':
    case 'mutton-korma-pm':
      return (dish.id || '').includes('mutton-korma') || dName.includes('mutton korma');

    case 'premium-seafood':
      return (dish.id || '').startsWith('dish-fd-grilled-salmon') || (dish.id || '').startsWith('dish-fd-butter-garlic-prawns') || (dish.id || '').startsWith('dish-fd-lobster-thermidor') || (dish.id || '').startsWith('dish-fd-seabass-fillet') || (dish.id || '').startsWith('dish-fd-seafood-medley');
    case 'grilled-salmon':
    case 'grilled-salmon-ps':
      return (dish.id || '').includes('grilled-salmon') || dName.includes('salmon');
    case 'butter-garlic-prawns':
    case 'butter-garlic-prawns-ps':
      return (dish.id || '').includes('butter-garlic-prawns') || (dName.includes('garlic') && dName.includes('prawn'));
    case 'lobster-thermidor':
    case 'lobster-thermidor-ps':
      return (dish.id || '').includes('lobster-thermidor') || dName.includes('lobster');
    case 'seabass-fillet':
    case 'seabass-fillet-ps':
      return (dish.id || '').includes('seabass-fillet') || dName.includes('seabass');
    case 'seafood-medley':
    case 'seafood-medley-ps':
      return (dish.id || '').includes('seafood-medley') || dName.includes('medley');

    case 'tandoor-kebab-fd':
      return (dish.id || '').startsWith('dish-fd-galouti-kebab') || (dish.id || '').startsWith('dish-fd-seekh-kebab') || (dish.id || '').startsWith('dish-fd-reshmi-kebab') || (dish.id || '').startsWith('dish-fd-tandoori-prawns') || (dish.id || '').startsWith('dish-fd-paneer-tikka');
    case 'galouti-kebab':
    case 'galouti-kebab-tk':
      return (dish.id || '').includes('galouti-kebab') || dName.includes('galouti');
    case 'seekh-kebab':
    case 'seekh-kebab-tk':
      return (dish.id || '').includes('seekh-kebab') || dName.includes('seekh');
    case 'reshmi-kebab':
    case 'reshmi-kebab-tk':
      return (dish.id || '').includes('reshmi-kebab') || dName.includes('reshmi');
    case 'tandoori-prawns':
    case 'tandoori-prawns-tk':
      return (dish.id || '').includes('tandoori-prawns') || (dName.includes('tandoori') && dName.includes('prawn'));
    case 'paneer-tikka':
    case 'paneer-tikka-tk':
      return (dish.id || '').includes('paneer-tikka') || dName.includes('paneer tikka');

    case 'fine-dining-biryani':
      return (dish.id || '').startsWith('dish-fd-royal-chicken-biryani') || (dish.id || '').startsWith('dish-fd-mutton-dum-biryani') || (dish.id || '').startsWith('dish-fd-prawn-biryani') || (dish.id || '').startsWith('dish-fd-saffron-vegetable-biryani');
    case 'royal-chicken-biryani':
    case 'royal-chicken-biryani-fdb':
      return (dish.id || '').includes('royal-chicken-biryani') || (dName.includes('chicken') && dName.includes('biryani'));
    case 'mutton-dum-biryani':
    case 'mutton-dum-biryani-fdb':
      return (dish.id || '').includes('mutton-dum-biryani') || (dName.includes('mutton') && dName.includes('biryani'));
    case 'prawn-biryani':
    case 'prawn-biryani-fdb':
      return (dish.id || '').includes('prawn-biryani') || (dName.includes('prawn') && dName.includes('biryani'));
    case 'saffron-vegetable-biryani':
    case 'saffron-vegetable-biryani-fdb':
      return (dish.id || '').includes('saffron-vegetable-biryani') || (dName.includes('saffron') && dName.includes('biryani')) || (dName.includes('veg') && dName.includes('biryani'));

    case 'rice-accompaniments-fd':
      return (dish.id || '').startsWith('dish-fd-saffron-rice') || (dish.id || '').startsWith('dish-fd-truffle-rice') || (dish.id || '').startsWith('dish-fd-jeera-rice') || (dish.id || '').startsWith('dish-fd-kashmiri-pulao') || (dish.id || '').startsWith('dish-fd-ghee-rice');
    case 'saffron-rice':
    case 'saffron-rice-ra':
      return (dish.id || '').includes('saffron-rice') || dName.includes('saffron rice');
    case 'truffle-rice':
    case 'truffle-rice-ra':
      return (dish.id || '').includes('truffle-rice') || dName.includes('truffle rice');
    case 'jeera-rice':
    case 'jeera-rice-ra':
      return (dish.id || '').includes('jeera-rice') || dName.includes('jeera rice');
    case 'kashmiri-pulao':
    case 'kashmiri-pulao-ra':
      return (dish.id || '').includes('kashmiri-pulao') || dName.includes('kashmiri pulao');
    case 'ghee-rice':
    case 'ghee-rice-ra':
      return (dish.id || '').includes('ghee-rice') || dName.includes('ghee rice');

    case 'indian-breads-fd':
      return (dish.id || '').startsWith('dish-fd-garlic-naan') || (dish.id || '').startsWith('dish-fd-truffle-naan') || (dish.id || '').startsWith('dish-fd-cheese-naan') || (dish.id || '').startsWith('dish-fd-roomali-roti') || (dish.id || '').startsWith('dish-fd-laccha-paratha');
    case 'garlic-naan':
    case 'garlic-naan-ib':
      return (dish.id || '').includes('garlic-naan') || dName.includes('garlic naan');
    case 'truffle-naan':
    case 'truffle-naan-ib':
      return (dish.id || '').includes('truffle-naan') || dName.includes('truffle naan');
    case 'cheese-naan':
    case 'cheese-naan-ib':
      return (dish.id || '').includes('cheese-naan') || dName.includes('cheese naan');
    case 'roomali-roti':
    case 'roomali-roti-ib':
      return (dish.id || '').includes('roomali-roti') || dName.includes('roomali');
    case 'laccha-paratha':
    case 'laccha-paratha-ib':
      return (dish.id || '').includes('laccha-paratha') || dName.includes('laccha');

    default:
      const targetClean = target.toLowerCase().replace(/-/g, ' ');
      return dCat === target || dName.includes(target) || dName.includes(targetClean);
  }
}

function MenuContent() {
  const searchParams = useSearchParams();
  const shopParam = searchParams.get('shop') || searchParams.get('shopId');
  const catParam = searchParams.get('category');

  const [dishes, setDishes] = useState<MenuItem[]>(INITIAL_DISHES);
  const [activeCategory, setActiveCategory] = useState(catParam || 'all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [activeShop, setActiveShop] = useState<string | null>(shopParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [catParam || 'all']: true,
  });

  useEffect(() => {
    const sParam = searchParams.get('shop') || searchParams.get('shopId');
    const cParam = searchParams.get('category');
    setActiveShop(sParam || null);
    setActiveCategory(cParam || 'all');
    setActiveSubCategory(null);
    if (cParam) {
      setExpandedCategories((prev) => ({ ...prev, [cParam]: true }));
    }
  }, [searchParams]);

  // Load dynamically stored/created dishes immediately with automatic version validation
  useEffect(() => {
    const stored = getStoredDishes();
    if (stored && stored.length > 0) {
      setDishes(stored);
    } else {
      setDishes(INITIAL_DISHES);
    }
    menuApi.getDishes()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const apiDishes = res.data;
          const merged = [...apiDishes, ...stored.filter((s) => !apiDishes.some((a: any) => a.id === s.id))];
          setDishes(merged);
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
    // Expand selected category
    setExpandedCategories((prev) => ({ ...prev, [catId]: true }));
  };

  const toggleCategoryExpand = (catId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const currentShopInfo = activeShop ? SHOP_INFO[activeShop] : null;

  const displayCategoryGroups = !activeShop || activeShop === 'giri-kitchen'
    ? CATEGORY_GROUPS
    : activeShop === 'giri-bakery'
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
    : activeShop === 'giri-fine-dining'
    ? FINE_DINING_EXCLUSIVE_CATEGORY_GROUPS
    : CATEGORY_GROUPS;

  const shopCategoryDishCount = useMemo(() => {
    const counts: Record<string, number> = {};
    if (!activeShop) return counts;
    const decoded = decodeURIComponent(activeShop).toLowerCase().trim();
    dishes.forEach((d) => {
      const dShop = (d.shopSlug || '').toLowerCase();
      const dName = (d.shopName || '').toLowerCase();
      const dMerchantId = (d.merchantId || '').toLowerCase();
      const match =
        dShop === decoded ||
        dName === decoded ||
        dMerchantId === decoded ||
        (dShop.length > 2 && decoded.includes(dShop)) ||
        (dName.length > 2 && decoded.includes(dName)) ||
        (decoded.length > 2 && dShop.includes(decoded)) ||
        (decoded.length > 2 && dName.includes(decoded));
      if (match) {
        const catKey = d.category ? d.category.toLowerCase() : 'all';
        counts[catKey] = (counts[catKey] || 0) + 1;
      }
    });
    return counts;
  }, [dishes, activeShop]);

  const currentGroup = displayCategoryGroups.find((g) => g.id === activeCategory);

  // Ultra-fast O(N) memoized filtering & deduplication for instant zero-latency category switching
  const uniqueFilteredDishes = useMemo(() => {
    const sQuery = searchQuery.toLowerCase();

    const filtered = dishes.filter((dish) => {
      let matchShop = true;
      if (activeShop) {
        const rawDecoded = decodeURIComponent(activeShop).toLowerCase().trim();
        const decoded = rawDecoded.replace(/-/g, ' ');
        const dShop = (dish.shopSlug || '').toLowerCase().replace(/-/g, ' ');
        const dName = (dish.shopName || '').toLowerCase().replace(/-/g, ' ');
        const dMerchantId = (dish.merchantId || '').toLowerCase().replace(/-/g, ' ');

        matchShop =
          dShop === decoded ||
          dName === decoded ||
          dMerchantId === decoded ||
          (dShop.length > 2 && (decoded.includes(dShop) || dShop.includes(decoded))) ||
          (dName.length > 2 && (decoded.includes(dName) || dName.includes(decoded)));
      }

      const matchCategory = matchCategorySubCategory(dish, activeCategory, activeSubCategory);

      const matchSearch = !sQuery ||
        dish.name.toLowerCase().includes(sQuery) ||
        dish.description.toLowerCase().includes(sQuery);

      const matchDiet = dietFilter === 'all' || (dish.dietary && dish.dietary.includes(dietFilter));

      return matchShop && matchCategory && matchSearch && matchDiet;
    });

    const shopMatches = dishes.filter((dish) => {
      if (!activeShop) return true;
      const rawDecoded = decodeURIComponent(activeShop).toLowerCase().trim();
      const decoded = rawDecoded.replace(/-/g, ' ');
      const dShop = (dish.shopSlug || '').toLowerCase().replace(/-/g, ' ');
      const dName = (dish.shopName || '').toLowerCase().replace(/-/g, ' ');
      const dMerchantId = (dish.merchantId || '').toLowerCase().replace(/-/g, ' ');

      return (
        dShop === decoded ||
        dName === decoded ||
        dMerchantId === decoded ||
        (dShop.length > 2 && (decoded.includes(dShop) || dShop.includes(decoded))) ||
        (dName.length > 2 && (decoded.includes(dName) || dName.includes(decoded)))
      );
    });

    const effective = filtered.length > 0
      ? filtered
      : (shopMatches.length > 0
          ? shopMatches
          : dishes);

    // Filter out synthetic repetitive "Special 1..20" items to maintain clean 25-30 authentic main catalog dishes
    const cleanEffective = effective.filter((d) => {
      if ((d as any).isMerchantDish || d.merchantId) return true;
      return !/\bSpecial\s+\d+\b/i.test(d.name || '');
    });

    // Sort merchant-added CRUD dishes FIRST at the top of the grid!
    const sortedEffective = [...cleanEffective].sort((a, b) => {
      const aIsMerchant = (a as any).isMerchantDish || a.merchantId ? 1 : 0;
      const bIsMerchant = (b as any).isMerchantDish || b.merchantId ? 1 : 0;
      return bIsMerchant - aIsMerchant;
    });

    const seen = new Set<string>();
    const result: MenuItem[] = [];
    for (const d of sortedEffective) {
      const key = (d.id || (d as any)._id || d.name || '').trim().toLowerCase();
      if (key && !seen.has(key)) {
        seen.add(key);
        result.push({
          ...d,
          image: getMatchingFoodImage(d.name, d.category, d.subCategory, d.image),
        });
      }
    }
    return result;
  }, [dishes, activeShop, activeCategory, activeSubCategory, searchQuery, dietFilter]);

  // Display all matching dishes without artificial truncation
  const displayDishes = useMemo(() => uniqueFilteredDishes, [uniqueFilteredDishes]);

  // Render Sidebar Tree Content (Used for Desktop Sidebar & Mobile Drawer)
  const renderSidebarTree = () => (
    <div className="space-y-5 text-[#1a1008]">

      {/* Dietary Filter Section */}
      <div>
        <span className="text-[10px] font-extrabold text-[#a09070] uppercase tracking-wider block mb-1.5 font-mono">
          Dietary Filter
        </span>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setDietFilter('all')}
            className={`py-1 px-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer text-center whitespace-nowrap ${
              dietFilter === 'all'
                ? 'bg-[#8B0000] text-white shadow-xs'
                : 'bg-[#F8F5F0] text-[#6b5840] hover:bg-[#FFF0EB]'
            }`}
          >
            🍽️ All
          </button>
          <button
            onClick={() => setDietFilter('veg')}
            className={`py-1 px-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer text-center whitespace-nowrap ${
              dietFilter === 'veg'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#F8F5F0] text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            🟢 Veg
          </button>
          <button
            onClick={() => setDietFilter('non-veg')}
            className={`py-1 px-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer text-center whitespace-nowrap ${
              dietFilter === 'non-veg'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-[#F8F5F0] text-red-700 hover:bg-red-50'
            }`}
          >
            🍖 Non-Veg
          </button>
        </div>
      </div>

      {/* Category & Subcategory Accordion Tree */}
      <div className="border-t border-[#8B0000]/10 pt-3">
        <span className="text-[10px] font-extrabold text-[#a09070] uppercase tracking-wider block mb-2 font-mono">
          Cuisines & Sub-Categories
        </span>
        <div className="space-y-1.5">

          {/* All Dishes item */}
          <button
            onClick={() => {
              handleSelectCategory('all');
              if (showMobileSidebar) setShowMobileSidebar(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
              activeCategory === 'all' && !activeSubCategory
                ? 'bg-[#1a1008] text-white shadow-md'
                : 'bg-[#F8F5F0] text-[#1a1008] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🍽️</span>
              <span>All Dishes</span>
            </span>
            {activeCategory === 'all' && !activeSubCategory && <span>✓</span>}
          </button>

          {/* Category Groups Tree */}
          {displayCategoryGroups.map((group) => {
            const isCatActive = activeCategory === group.id;
            const isExpanded = !!expandedCategories[group.id] || isCatActive;
            const hasSubcategories = group.subcategories && group.subcategories.length > 0;

            return (
              <div key={group.id} className="rounded-xl overflow-hidden bg-white/60 border border-black/5">
                {/* Main Category Header Button */}
                <div
                  onClick={() => {
                    handleSelectCategory(group.id);
                    if (showMobileSidebar && !hasSubcategories) setShowMobileSidebar(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                    isCatActive
                      ? 'bg-[#8B0000] text-white shadow-sm'
                      : 'hover:bg-[#FFF0EB] text-[#1a1008]'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate pr-1">
                    <span>{group.icon}</span>
                    <span className="truncate">{group.name}</span>
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {hasSubcategories && !activeShop && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        isCatActive ? 'bg-white/20 text-white' : 'bg-[#8B0000]/10 text-[#8B0000]'
                      }`}>
                        {group.subcategories.length}
                      </span>
                    )}
                    {activeShop && (shopCategoryDishCount[group.id] || 0) > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        isCatActive ? 'bg-white/20 text-white' : 'bg-[#8B0000]/10 text-[#8B0000]'
                      }`}>
                        {shopCategoryDishCount[group.id]}
                      </span>
                    )}
                    {hasSubcategories && (
                      <button
                        onClick={(e) => toggleCategoryExpand(group.id, e)}
                        className="p-1 hover:bg-black/10 rounded-md transition-colors"
                        title={isExpanded ? 'Collapse subcategories' : 'Expand subcategories'}
                      >
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Subcategories Nested List */}
                {hasSubcategories && isExpanded && (
                  <div className="pl-3 pr-1 py-1.5 bg-[#FAF8F5] border-t border-[#8B0000]/10 space-y-1 animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setActiveCategory(group.id);
                        setActiveSubCategory(null);
                        if (showMobileSidebar) setShowMobileSidebar(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                        isCatActive && !activeSubCategory
                          ? 'bg-[#8B0000]/15 text-[#8B0000] border border-[#8B0000]/30 font-bold'
                          : 'text-[#6b5840] hover:text-[#8B0000] hover:bg-white'
                      }`}
                    >
                      <span>All {group.name}</span>
                      {isCatActive && !activeSubCategory && <span>•</span>}
                    </button>

                    {group.subcategories.map((sub) => {
                      const isSubActive = activeSubCategory === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveCategory(group.id);
                            setActiveSubCategory(sub.id);
                            if (showMobileSidebar) setShowMobileSidebar(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-between transition-all cursor-pointer ${
                            isSubActive
                              ? 'bg-[#8B0000] text-white shadow-xs'
                              : 'text-[#3a2818] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <span className="text-[10px]">{sub.icon}</span>
                            <span className="truncate">{sub.name}</span>
                          </span>
                          {isSubActive && <span className="text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={`max-w-7xl mx-auto px-4 ${activeShop ? 'pt-2 pb-6 sm:pt-3 sm:pb-8' : 'py-6 sm:py-8'}`}>

        {/* Active Shop Banner */}
        {activeShop && (
          <div className="mb-5 rounded-3xl bg-gradient-to-r from-[#8B0000] via-[#A00000] to-[#600000] text-white px-5 py-3.5 sm:px-6 sm:py-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border border-white/20">
            <div className="flex items-center gap-3.5 shrink-0">
              <Link
                href="/shops"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 hover:bg-white/35 text-white flex items-center justify-center font-black text-lg transition-all shrink-0 cursor-pointer shadow-md border border-white/30 hover:scale-105 active:scale-95"
                title="Back to All Shops Directory"
              >
                ←
              </Link>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-xl sm:text-2xl shadow-inner shrink-0">
                🏪
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#E0B96A] leading-none">Merchant Outlet Catalog</div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white capitalize leading-snug mt-0.5">{decodeURIComponent(activeShop).replace(/-/g, ' ')}</h2>
                <p className="text-[11px] sm:text-xs text-red-100 font-medium leading-none mt-0.5">Showing menu catalog & dishes for this restaurant outlet.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveShop(null)}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/25 px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer text-center self-start sm:self-center"
            >
              View All Outlets →
            </button>
          </div>
        )}

        {/* Top Search Bar & Filter Controls */}
        <div className="relative w-full mb-6 z-30">
          <div className="relative w-full flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder={currentShopInfo ? `Search within ${currentShopInfo.title}...` : "Search dishes, biryani, tiffins, or cuisines..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-10 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-[#8B0000] hover:bg-black/5 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile 3-Lines Category Drawer Toggle Button */}
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="md:hidden px-3.5 py-3 bg-[#8B0000] text-white rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:bg-[#A00000] active:scale-95 transition-all shrink-0 cursor-pointer border border-[#8B0000]/20"
              title="Open Categories Menu"
            >
              <Menu className="w-4 h-4 stroke-[2.5]" />
              <span>Categories</span>
            </button>
          </div>

          {/* Active Filter Badges Row */}
          {(activeShop || activeCategory !== 'all' || activeSubCategory || dietFilter !== 'all' || searchQuery) && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-[#a09070] uppercase font-mono">Active Filters:</span>
              
              {activeShop && currentShopInfo && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000] text-white text-xs font-bold shadow-xs">
                  <span>{currentShopInfo.icon}</span>
                  <span>{currentShopInfo.title}</span>
                  <X className="w-3.5 h-3.5 hover:text-gray-200 cursor-pointer ml-1" onClick={() => setActiveShop(null)} />
                </span>
              )}

              {activeCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1008] text-white text-xs font-bold shadow-xs">
                  <span>{currentGroup?.icon || '🍽️'}</span>
                  <span className="capitalize">{currentGroup?.name || activeCategory}</span>
                  <X className="w-3.5 h-3.5 hover:text-gray-200 cursor-pointer ml-1" onClick={() => { setActiveCategory('all'); setActiveSubCategory(null); }} />
                </span>
              )}

              {activeSubCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A055] text-white text-xs font-bold shadow-xs">
                  <span>✨</span>
                  <span className="capitalize">{activeSubCategory.replace(/-/g, ' ')}</span>
                  <X className="w-3.5 h-3.5 hover:text-gray-200 cursor-pointer ml-1" onClick={() => setActiveSubCategory(null)} />
                </span>
              )}

              {dietFilter !== 'all' && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-bold shadow-xs ${
                  dietFilter === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                }`}>
                  <span>{dietFilter === 'veg' ? '🟢 Veg' : '🍖 Non-Veg'}</span>
                  <X className="w-3.5 h-3.5 hover:text-gray-200 cursor-pointer ml-1" onClick={() => setDietFilter('all')} />
                </span>
              )}

              <button
                onClick={() => {
                  setActiveShop(null);
                  setActiveCategory('all');
                  setActiveSubCategory(null);
                  setDietFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#8B0000] hover:underline ml-1 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Mobile Horizontal Quick-Category Chips */}
        <div className="md:hidden mb-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => handleSelectCategory('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeCategory === 'all' && !activeSubCategory
                ? 'bg-[#1a1008] text-white shadow-xs'
                : 'bg-white border border-[#8B0000]/20 text-[#1a1008]'
            }`}
          >
            🍽️ All
          </button>
          {displayCategoryGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => handleSelectCategory(g.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                activeCategory === g.id
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-white border border-[#8B0000]/20 text-[#1a1008]'
              }`}
            >
              <span>{g.icon}</span>
              <span>{g.name}</span>
            </button>
          ))}
        </div>

        {/* Main Split Layout: Left Sidebar + Right Dishes Grid */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">

          {/* Desktop Left Sticky Sidebar */}
          <aside className="hidden md:block w-56 lg:w-64 shrink-0 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-[#8B0000]/20 bg-white/80 backdrop-blur-md rounded-3xl p-3.5 border border-[#8B0000]/15 shadow-sm">
            {renderSidebarTree()}
          </aside>

          {/* Mobile Slide-Over Drawer */}
          {showMobileSidebar && (
            <div className="fixed inset-0 z-50 md:hidden flex">
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
                onClick={() => setShowMobileSidebar(false)}
              />
              <div className="relative w-80 max-w-[85vw] bg-white h-full p-5 overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-left duration-250 flex flex-col">
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="absolute right-4 top-4 p-1 text-gray-400 hover:text-[#8B0000] rounded-full hover:bg-black/5"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="pt-2">
                  {renderSidebarTree()}
                </div>
              </div>
            </div>
          )}

          {/* Right Main Content Area */}
          <main className="flex-1 min-w-0 w-full">

            {/* Category Header Title & Count */}
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#8B0000]/10 pb-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1a1008] capitalize">
                  {currentShopInfo 
                    ? `${currentShopInfo.title}` 
                    : activeSubCategory 
                      ? `${activeSubCategory.replace(/-/g, ' ')} Options` 
                      : currentGroup 
                        ? `${currentGroup.name} Dishes` 
                        : 'All Menu Dishes'}
                </h1>
                <p className="text-xs text-[#a09070] mt-0.5 font-medium">
                  Showing {displayDishes.length} gourmet dish options
                </p>
              </div>
            </div>

            {/* Dishes Grid */}
            {displayDishes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#8B0000]/10 p-8">
                <p className="text-4xl mb-3">🍽️</p>
                <h3 className="text-base font-bold text-[#1a1008]">No dishes found</h3>
                <p className="text-xs text-[#a09070] mt-1">Try selecting another category or resetting your search filter.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveSubCategory(null);
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
                {displayDishes.map((dish, idx) => {
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
                          src={cardImage || FALLBACK_SVG}
                          alt={displayDish.name}
                          loading={idx < 6 ? 'eager' : 'lazy'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_SVG;
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
          </main>
        </div>
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

