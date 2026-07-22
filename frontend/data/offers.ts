import { Offer } from '../types';

export const PUBLIC_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: '🎉 Welcome 20% Discount',
    code: 'GIRI20',
    description: 'Get 20% off on your first dine-in or takeaway mobile order above $30.',
    expiry: 'Valid till Sunday',
    badge: 'NEW CUSTOMER'
  },
  {
    id: 'off-2',
    title: '🍔 Buy 1 Get 1 Wagyu Burger',
    code: 'WAGYU2FOR1',
    description: 'Order any Wagyu Burger on Tuesday evenings and get the second burger 50% off.',
    expiry: 'Tuesdays Only',
    badge: 'POPULAR'
  }
];
