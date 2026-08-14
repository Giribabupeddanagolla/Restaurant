import { Review } from '../types';

export const PUBLIC_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sophia Williams',
    role: 'Food Critic & Local Guide',
    rating: 5,
    date: '2 days ago',
    comment: 'The Truffle Mushroom Risotto was absolute perfection! Instant mobile table ordering made our anniversary dinner completely seamless and relaxing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-2',
    name: 'David Chen',
    role: 'Verified Diner',
    rating: 5,
    date: '5 days ago',
    comment: 'Exceptional Wagyu Burger and unbelievable lava cake! The ambiance across all Royal branches is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    role: 'Gourmet Enthusiast',
    rating: 5,
    date: '1 week ago',
    comment: 'Great service, quick delivery to our table, and the staff made sure every dietary requirement was catered to.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const getStoredReviews = (): Review[] => {
  if (typeof window === 'undefined') return PUBLIC_REVIEWS;
  try {
    const saved = localStorage.getItem('royal_reviews') || localStorage.getItem('giri_reviews');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading stored reviews:', e);
  }
  return PUBLIC_REVIEWS;
};

export const saveStoredReviews = (reviews: Review[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('royal_reviews', JSON.stringify(reviews));
  } catch (e) {
    console.error('Error saving stored reviews:', e);
  }
};
