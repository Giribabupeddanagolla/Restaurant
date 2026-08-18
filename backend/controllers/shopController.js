const Shop = require('../models/Shop');
const Merchant = require('../models/Merchant');

const DEFAULT_SHOPS = [
  {
    name: 'Giri Fine Dining',
    tagline: 'Signature Experience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    deliveryTime: '30–40 min',
    address: '742 Gourmet Ave, Downtown',
    city: 'Metropolitan City',
    phone: '+1 (555) 123-4567',
    openingHours: '12:00 PM – 11:00 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    name: 'Giri Kitchen',
    tagline: 'Home Comfort Food',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    deliveryTime: '20–30 min',
    address: '108 Comfort Street, West End',
    city: 'Metropolitan City',
    phone: '+1 (555) 234-5678',
    openingHours: '11:00 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    name: 'Giri Bakery',
    tagline: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '15–20 min',
    address: '45 Sweetland Boulevard, Uptown',
    city: 'Metropolitan City',
    phone: '+1 (555) 345-6789',
    openingHours: '08:00 AM – 09:00 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    name: 'Giri Grill',
    tagline: 'BBQ & Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    deliveryTime: '25–35 min',
    address: '89 Smoky Lane, Eastside',
    city: 'Metropolitan City',
    phone: '+1 (555) 456-7890',
    openingHours: '12:00 PM – 11:30 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    name: 'Giri Spice Garden',
    tagline: 'Indian & Asian',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    deliveryTime: '20–30 min',
    address: '302 Spice Road, Central Quarter',
    city: 'Metropolitan City',
    phone: '+1 (555) 567-8901',
    openingHours: '11:30 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    name: 'Giri Café',
    tagline: 'Coffee & Snacks',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    deliveryTime: '10–15 min',
    address: '12 Morning Star Lane, Bay District',
    city: 'Metropolitan City',
    phone: '+1 (555) 678-9012',
    openingHours: '07:00 AM – 08:00 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    name: 'Giri Seafood & Lounge',
    tagline: 'Coastal Delicacies & Cocktails',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    deliveryTime: '25–35 min',
    address: '505 Ocean Drive, Harbor Front',
    city: 'Metropolitan City',
    phone: '+1 (555) 789-0123',
    openingHours: '12:00 PM – 12:00 AM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    name: 'Giri Express & Bistro',
    tagline: 'Quick Gourmet Eats',
    image: '/bistro-express.jpg',
    rating: 4.8,
    deliveryTime: '10–20 min',
    address: '122 Metro Station Plaza, Tech Park',
    city: 'Metropolitan City',
    phone: '+1 (555) 890-1234',
    openingHours: '08:00 AM – 10:00 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      '/bistro-express.jpg',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=800&auto=format&fit=crop&q=80'
    ],
  },
];

// @desc Get all shops / locations (Public API)
// @route GET /api/v1/shops
exports.getShops = async (req, res, next) => {
  try {
    const { featured, search } = req.query;

    let query = {};
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // 1. Fetch from Shop model
    let dbShops = [];
    try {
      dbShops = await Shop.find(query).sort({ createdAt: -1 });
    } catch (e) {}

    // 2. Fetch approved and active merchants from Merchant model (MongoDB)
    let merchantShops = [];
    try {
      const approvedMerchants = await Merchant.find({
        $or: [
          { status: 'approved', isApproved: true, isActive: true },
          { status: 'approved' },
          { isApproved: true }
        ]
      });

      merchantShops = approvedMerchants.map((m) => {
        const idStr = m._id.toString();
        return {
          _id: idStr,
          id: idStr,
          merchantId: idStr,
          shopId: idStr,
          name: m.shopName || m.businessName || 'Giri Spice Garden',
          shopName: m.shopName || m.businessName || 'Giri Spice Garden',
          tagline: m.description || 'Authentic South & North Indian fine dining restaurant.',
          description: m.description || 'Authentic South & North Indian fine dining restaurant.',
          category: m.category || 'Multi-Cuisine',
          logo: m.logo || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=85',
          banner: m.banner || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
          image: m.banner || m.logo || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
          rating: 4.8,
          deliveryTime: m.deliveryTime || '25-35 mins',
          time: m.deliveryTime || '25-35 mins',
          minimumOrder: m.minimumOrderAmount || 150,
          minimumOrderAmount: m.minimumOrderAmount || 150,
          address: `${m.address || 'Plot 42, Jubilee Hills Road No 36'}, ${m.area || ''}`,
          city: m.city || 'Hyderabad',
          phone: m.phone || '+91 98765 99999',
          openingHours: `${m.openingTime || '11:00 AM'} - ${m.closingTime || '11:00 PM'}`,
          isOpen: m.restaurantStatus !== 'Closed',
          isFeatured: true,
          status: 'active',
          isActive: true,
          diningImages: [m.banner, m.logo].filter(Boolean),
          kitchenImages: [m.logo, m.banner].filter(Boolean),
        };
      });
    } catch (e) {}

    // Merge Shops and Merchant Shops
    const map = new Map();
    dbShops.forEach((s) => map.set(s._id ? s._id.toString() : s.name, s));
    merchantShops.forEach((s) => map.set(s._id ? s._id.toString() : s.name, s));

    if (map.size === 0) {
      DEFAULT_SHOPS.forEach((s) => map.set(s._id, s));
    }

    let finalShops = Array.from(map.values());

    if (search) {
      const searchLower = search.toLowerCase();
      finalShops = finalShops.filter(
        (s) =>
          s.name?.toLowerCase().includes(searchLower) ||
          s.shopName?.toLowerCase().includes(searchLower) ||
          s.tagline?.toLowerCase().includes(searchLower) ||
          s.city?.toLowerCase().includes(searchLower) ||
          s.address?.toLowerCase().includes(searchLower)
      );
    }

    res.status(200).json({ success: true, count: finalShops.length, data: finalShops, restaurants: finalShops });
  } catch (error) {
    res.status(200).json({ success: true, count: DEFAULT_SHOPS.length, data: DEFAULT_SHOPS, restaurants: DEFAULT_SHOPS });
  }
};

// @desc Get single shop
// @route GET /api/v1/shops/:id
exports.getShopById = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    let shop = null;
    try {
      shop = await Shop.findById(shopId);
    } catch (e) {}

    if (!shop) {
      try {
        const m = await Merchant.findById(shopId);
        if (m) {
          const idStr = m._id.toString();
          shop = {
            _id: idStr,
            id: idStr,
            merchantId: idStr,
            shopId: idStr,
            name: m.shopName || m.businessName || 'Giri Spice Garden',
            shopName: m.shopName || m.businessName || 'Giri Spice Garden',
            tagline: m.description || 'Authentic South & North Indian fine dining restaurant.',
            description: m.description || 'Authentic South & North Indian fine dining restaurant.',
            category: m.category || 'Multi-Cuisine',
            logo: m.logo || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=85',
            banner: m.banner || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
            image: m.banner || m.logo || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
            rating: 4.8,
            deliveryTime: m.deliveryTime || '25-35 mins',
            time: m.deliveryTime || '25-35 mins',
            minimumOrder: m.minimumOrderAmount || 150,
            minimumOrderAmount: m.minimumOrderAmount || 150,
            address: `${m.address || 'Plot 42, Jubilee Hills Road No 36'}, ${m.area || ''}`,
            city: m.city || 'Hyderabad',
            phone: m.phone || '+91 98765 99999',
            openingHours: `${m.openingTime || '11:00 AM'} - ${m.closingTime || '11:00 PM'}`,
            isOpen: m.restaurantStatus !== 'Closed',
            isFeatured: true,
            status: 'active',
            isActive: true,
            diningImages: [m.banner, m.logo].filter(Boolean),
            kitchenImages: [m.logo, m.banner].filter(Boolean),
          };
        }
      } catch (e) {}
    }

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
