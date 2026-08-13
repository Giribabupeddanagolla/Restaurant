// Barrel file for backward compatibility
// Exports are organized for tree-shaking and lazy loading

export { INITIAL_CATEGORIES, CATEGORY_GROUPS, BAKERY_EXCLUSIVE_CATEGORY_GROUPS, GRILL_EXCLUSIVE_CATEGORY_GROUPS, SPICE_GARDEN_EXCLUSIVE_CATEGORY_GROUPS, CAFE_EXCLUSIVE_CATEGORY_GROUPS, SEAFOOD_EXCLUSIVE_CATEGORY_GROUPS, EXPRESS_BISTRO_EXCLUSIVE_CATEGORY_GROUPS } from './categories';
export { INITIAL_DISHES, getStoredDishes, saveStoredDishes, RESTAURANT_OUTLETS, FINE_DINING_TABLE_IMAGES, GIRI_KITCHEN_TABLE_IMAGES, GIRI_GRILL_TABLE_IMAGES, GIRI_CAFE_TABLE_IMAGES, CHEF_SPECIAL_DISHES, PIZZA_BURGER_DISHES, MAIN_COURSE_DISHES, BEVERAGE_BAR_DISHES, GIRI_FINE_DINING_PRODUCTS, GIRI_EXPRESS_BISTRO_DISHES } from './dishes';
export { BLOG_POSTS } from './blog';
export { PUBLIC_OFFERS } from './offers';
export { PUBLIC_REVIEWS, getStoredReviews, saveStoredReviews } from './reviews';
export { INITIAL_SHOPS, getStoredShops, saveStoredShops } from './shops';

// Re-export types for convenience
export type { Category, MenuItem, Offer, Review, BlogPost, Shop } from '../types';

