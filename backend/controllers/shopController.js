const Shop = require('../models/Shop');

const DEFAULT_SHOPS = [
  {
    name: 'Giri Fine Dining',
    tagline: 'Signature Experience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.9,
    deliveryTime: '30–40 min',
    address: '742 Gourmet Ave, Downtown',
    city: 'Metropolitan City',
    phone: '+1 (555) 123-4567',
    openingHours: '12:00 PM – 11:00 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    name: 'Giri Kitchen',
    tagline: 'Home Comfort Food',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.7,
    deliveryTime: '20–30 min',
    address: '108 Comfort Street, West End',
    city: 'Metropolitan City',
    phone: '+1 (555) 234-5678',
    openingHours: '11:00 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    name: 'Giri Bakery',
    tagline: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '15–20 min',
    address: '45 Sweetland Boulevard, Uptown',
    city: 'Metropolitan City',
    phone: '+1 (555) 345-6789',
    openingHours: '08:00 AM – 09:00 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    name: 'Giri Grill',
    tagline: 'BBQ & Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.6,
    deliveryTime: '25–35 min',
    address: '89 Smoky Lane, Eastside',
    city: 'Metropolitan City',
    phone: '+1 (555) 456-7890',
    openingHours: '12:00 PM – 11:30 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    name: 'Giri Spice Garden',
    tagline: 'Indian & Asian',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.7,
    deliveryTime: '20–30 min',
    address: '302 Spice Road, Central Quarter',
    city: 'Metropolitan City',
    phone: '+1 (555) 567-8901',
    openingHours: '11:30 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    name: 'Giri Café',
    tagline: 'Coffee & Snacks',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.5,
    deliveryTime: '10–15 min',
    address: '12 Morning Star Lane, Bay District',
    city: 'Metropolitan City',
    phone: '+1 (555) 678-9012',
    openingHours: '07:00 AM – 08:00 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    name: 'Giri Seafood & Lounge',
    tagline: 'Coastal Delicacies & Cocktails',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.9,
    deliveryTime: '25–35 min',
    address: '505 Ocean Drive, Harbor Front',
    city: 'Metropolitan City',
    phone: '+1 (555) 789-0123',
    openingHours: '12:00 PM – 12:00 AM',
    isOpen: true,
    isFeatured: true,
  },
  {
    name: 'Giri Express & Bistro',
    tagline: 'Quick Gourmet Eats',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '10–20 min',
    address: '122 Metro Station Plaza, Tech Park',
    city: 'Metropolitan City',
    phone: '+1 (555) 890-1234',
    openingHours: '08:00 AM – 10:00 PM',
    isOpen: true,
    isFeatured: true,
  },
];

// Helper to seed if collection is empty
const seedDefaultShopsIfEmpty = async () => {
  try {
    const count = await Shop.countDocuments();
    if (count === 0) {
      await Shop.insertMany(DEFAULT_SHOPS);
      console.log('Seeded default shops into database');
    }
  } catch (err) {
    console.error('Error seeding default shops:', err.message);
  }
};

// @desc Get all shops / locations
// @route GET /api/v1/shops
exports.getShops = async (req, res, next) => {
  try {
    await seedDefaultShopsIfEmpty();
    const { featured, search } = req.query;

    let query = {};
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const shops = await Shop.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: shops.length, data: shops });
  } catch (error) {
    // If DB is disconnected, fallback gracefully
    res.status(200).json({ success: true, count: DEFAULT_SHOPS.length, data: DEFAULT_SHOPS });
  }
};

// @desc Get single shop
// @route GET /api/v1/shops/:id
exports.getShopById = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop location not found' });
    }
    res.status(200).json({ success: true, data: shop });
  } catch (error) {
    next(error);
  }
};

// @desc Create new shop location
// @route POST /api/v1/shops
exports.createShop = async (req, res, next) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json({ success: true, message: 'Shop created successfully', data: shop });
  } catch (error) {
    next(error);
  }
};

// @desc Update shop location
// @route PUT /api/v1/shops/:id
exports.updateShop = async (req, res, next) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop location not found' });
    }
    res.status(200).json({ success: true, message: 'Shop updated successfully', data: shop });
  } catch (error) {
    next(error);
  }
};

// @desc Delete shop location
// @route DELETE /api/v1/shops/:id
exports.deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop location not found' });
    }
    res.status(200).json({ success: true, message: 'Shop deleted successfully' });
  } catch (error) {
    next(error);
  }
};
