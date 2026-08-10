const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const Table = require('../models/Table');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/giri_restaurant');
    console.log('🌱 Connected to MongoDB for Database Seeding...');

    await User.deleteMany();
    await MenuItem.deleteMany();
    await Category.deleteMany();
    await Table.deleteMany();

    // Create Admin & Staff Users
    await User.create([
      { name: 'Chef Rajiv Giri', email: 'admin@girirestaurant.com', password: 'password123', role: 'Admin', phone: '+919876543210' },
      { name: 'Rahul Sharma', email: 'manager@girirestaurant.com', password: 'password123', role: 'Manager', phone: '+919876543211' },
      { name: 'Priya Nair', email: 'chef@girirestaurant.com', password: 'password123', role: 'Chef', phone: '+919876543212' },
    ]);

    // Create Categories
    await Category.create([
      { name: 'Chef Specials', slug: 'specials', icon: 'Star', sortOrder: 1 },
      { name: 'Starters', slug: 'starters', icon: 'Salad', sortOrder: 2 },
      { name: 'Main Course', slug: 'mains', icon: 'UtensilsCrossed', sortOrder: 3 },
      { name: 'Pizzas & Burgers', slug: 'pizzas', icon: 'Pizza', sortOrder: 4 },
      { name: 'Desserts', slug: 'desserts', icon: 'Cake', sortOrder: 5 },
    ]);

    // Create Sample Menu Items
    await MenuItem.create([
      { name: 'Truffle Mushroom Risotto', slug: 'truffle-risotto', category: 'specials', price: 650, description: 'Creamy Arborio rice with wild forest mushrooms, black truffle oil, and aged parmesan crisp.', image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop', isVeg: true, dietary: ['veg', 'chef-special'], prepTime: '20 min', isPopular: true },
      { name: 'Smoked Wagyu Beef Burger', slug: 'wagyu-burger', category: 'pizzas', price: 780, description: 'Double Wagyu patty, cold-smoked cheddar, caramelized onions, served with truffle fries.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop', isVeg: false, dietary: ['non-veg'], prepTime: '15 min', isPopular: true },
      { name: 'Artisanal Woodfired Pizza', slug: 'woodfired-pizza', category: 'pizzas', price: 550, description: 'San Marzano tomato sauce, fresh buffalo mozzarella, organic basil, extra virgin olive oil.', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop', isVeg: true, dietary: ['veg'], prepTime: '12 min', isPopular: true },
    ]);

    // Create Tables
    await Table.create([
      { tableNumber: 'T-01', capacity: 2, section: 'Main Dining' },
      { tableNumber: 'T-02', capacity: 4, section: 'Main Dining' },
      { tableNumber: 'T-03', capacity: 4, section: 'Patio' },
      { tableNumber: 'T-04', capacity: 6, section: 'VIP Lounge' },
    ]);

    console.log('✅ Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
