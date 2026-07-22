import { MenuItem } from '../types';

export const INITIAL_DISHES: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Truffle Mushroom Risotto',
    category: 'specials',
    price: 18.50,
    description: 'Arborio rice cooked with wild forest mushrooms, black truffle oil, and aged parmesan crisp.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [
      { name: 'Add Extra Truffle Oil', price: 2.50 },
      { name: 'Extra Parmesan Cheese', price: 1.50 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Smoked Wagyu Beef Burger',
    category: 'pizzas',
    price: 21.00,
    description: 'Double Wagyu patty, smoked cheddar, caramelized onions, brioche bun, served with truffle fries.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Double Bacon Slice', price: 3.00 },
      { name: 'Gluten-Free Bun', price: 1.50 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Artisanal Margherita Pizza',
    category: 'pizzas',
    price: 15.00,
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, organic basil, extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [
      { name: 'Burrata Cheese Topping', price: 4.00 }
    ]
  },
  {
    id: 'dish-4',
    name: 'Crispy Pan-Seared Salmon',
    category: 'mains',
    price: 24.50,
    description: 'Atlantic salmon fillet, asparagus spears, saffron lemon butter sauce, baby potatoes.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg'],
    prepTime: 18,
    available: true,
    customizations: [
      { name: 'Side Garlic Herb Butter', price: 1.00 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Spicy Thai Green Curry',
    category: 'mains',
    price: 16.50,
    description: 'Authentic coconut curry with bamboo shoots, Thai basil, and fragrant jasmine rice.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg', 'spicy'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Extra Spicy Level 🔥', price: 0.00 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    price: 9.50,
    description: 'Warm Belgian dark chocolate cake with melting chocolate center & vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [
      { name: 'Extra Scoop Ice Cream', price: 2.00 }
    ]
  }
];
