// Barrel file for backward compatibility
// Exports are organized for tree-shaking and lazy loading

export { INITIAL_CATEGORIES } from './categories';
export { INITIAL_DISHES } from './dishes';
export { BLOG_POSTS } from './blog';
export { PUBLIC_OFFERS } from './offers';
export { PUBLIC_REVIEWS } from './reviews';

// Re-export types for convenience
export type { Category, MenuItem, Offer, Review, BlogPost } from '../types';
