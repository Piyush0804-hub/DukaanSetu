export const locations = [
  { id: 'l1', name: 'Indirapuram, Ghaziabad' },
  { id: 'l2', name: 'Vaishali, Ghaziabad' },
  { id: 'l3', name: 'Vasundhara, Ghaziabad' }
];

export const stores = [
  {
    id: 's1',
    name: 'Gupta General Store',
    distance: 0.6,
    rating: 4.7,
    deliveryTime: '25-35 min',
    isOpen: true,
    address: 'Shop No. 4, Ahinsa Khand 2, Indirapuram',
    since: '1998',
    verified: true,
    totalProducts: 482
  },
  {
    id: 's2',
    name: 'Sharma Kirana Store',
    distance: 1.1,
    rating: 4.6,
    deliveryTime: '30-40 min',
    isOpen: true,
    address: 'Nyay Khand 1, Indirapuram',
    since: '2005',
    verified: true,
    totalProducts: 310
  },
  {
    id: 's3',
    name: 'Fresh Basket Local',
    distance: 1.5,
    rating: 4.5,
    deliveryTime: '25-35 min',
    isOpen: true,
    address: 'Gyan Khand 2, Indirapuram',
    since: '2015',
    verified: false,
    totalProducts: 850
  },
  {
    id: 's4',
    name: 'Verma Grocery Mart',
    distance: 2.2,
    rating: 4.3,
    deliveryTime: '40-50 min',
    isOpen: false,
    address: 'Niti Khand, Indirapuram',
    since: '2010',
    verified: true,
    totalProducts: 620
  }
];

export const categories = [
  { id: 'c1', name: 'Fruits & Vegetables', icon: '🥬' },
  { id: 'c2', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'c3', name: 'Atta, Rice & Dal', icon: '🍚' },
  { id: 'c4', name: 'Oil & Masala', icon: '🫙' },
  { id: 'c5', name: 'Snacks & Biscuits', icon: '🍪' },
  { id: 'c6', name: 'Beverages', icon: '🥤' },
  { id: 'c7', name: 'Personal Care', icon: '🧴' },
  { id: 'c8', name: 'Household', icon: '🧹' }
];

export const baseProducts = [
  {
    id: 'p1',
    name: 'Tata Salt',
    brand: 'Tata',
    packSize: '1 kg',
    categoryId: 'c4',
    image: 'https://m.media-amazon.com/images/I/611ZzXhNbdL._SX679_.jpg',
    description: 'Vacuum evaporated iodised salt suitable for everyday cooking.'
  },
  {
    id: 'p2',
    name: 'Aashirvaad Atta',
    brand: 'Aashirvaad',
    packSize: '5 kg',
    categoryId: 'c3',
    image: 'https://m.media-amazon.com/images/I/81k3yW1MncL._SX679_.jpg',
    description: '100% whole wheat chakki atta.'
  },
  {
    id: 'p3',
    name: 'Amul Taaza Milk',
    brand: 'Amul',
    packSize: '1 L',
    categoryId: 'c2',
    image: 'https://m.media-amazon.com/images/I/51rPq4T1rUL._SX679_.jpg',
    description: 'Toned milk, homogenized.'
  },
  {
    id: 'p4',
    name: 'Parle-G Gold Biscuits',
    brand: 'Parle',
    packSize: '1 kg',
    categoryId: 'c5',
    image: 'https://m.media-amazon.com/images/I/61NlS6p526L._SX679_.jpg',
    description: 'Glucose biscuits, perfect with chai.'
  },
  {
    id: 'p5',
    name: 'Maggi 2-Minute Noodles',
    brand: 'Nestle',
    packSize: '70 g',
    categoryId: 'c5',
    image: 'https://m.media-amazon.com/images/I/81BCEZ4OvbL._SX679_.jpg',
    description: 'Classic masala instant noodles.'
  },
  {
    id: 'p6',
    name: 'Fortune Sunflower Oil',
    brand: 'Fortune',
    packSize: '1 L',
    categoryId: 'c4',
    image: 'https://m.media-amazon.com/images/I/61o4vUjQ6-L._SX679_.jpg',
    description: 'Light and healthy cooking oil.'
  },
  {
    id: 'p7',
    name: 'Surf Excel Easy Wash',
    brand: 'Surf Excel',
    packSize: '1 kg',
    categoryId: 'c8',
    image: 'https://m.media-amazon.com/images/I/61F1QcT1q-L._SX679_.jpg',
    description: 'Detergent powder.'
  }
];

export const inventory = [
  // Tata Salt across stores
  { id: 'i1', storeId: 's1', productId: 'p1', price: 27, inStock: true, stockCount: 24 },
  { id: 'i2', storeId: 's2', productId: 'p1', price: 28, inStock: true, stockCount: 12 },
  { id: 'i3', storeId: 's3', productId: 'p1', price: 30, inStock: true, stockCount: 2 },
  
  // Aashirvaad Atta
  { id: 'i4', storeId: 's1', productId: 'p2', price: 290, inStock: true, stockCount: 7 },
  { id: 'i5', storeId: 's2', productId: 'p2', price: 295, inStock: true, stockCount: 5 },
  { id: 'i6', storeId: 's3', productId: 'p2', price: 310, inStock: true, stockCount: 15 },
  
  // Amul Milk
  { id: 'i7', storeId: 's1', productId: 'p3', price: 58, inStock: false, stockCount: 0 },
  { id: 'i8', storeId: 's2', productId: 'p3', price: 60, inStock: true, stockCount: 10 },
  { id: 'i9', storeId: 's3', productId: 'p3', price: 58, inStock: true, stockCount: 20 },
  
  // Parle-G
  { id: 'i10', storeId: 's1', productId: 'p4', price: 140, inStock: true, stockCount: 30 },
  { id: 'i11', storeId: 's2', productId: 'p4', price: 145, inStock: true, stockCount: 12 },
  
  // Maggi
  { id: 'i12', storeId: 's1', productId: 'p5', price: 14, inStock: true, stockCount: 45 },
  { id: 'i13', storeId: 's2', productId: 'p5', price: 14, inStock: true, stockCount: 25 },
  { id: 'i14', storeId: 's3', productId: 'p5', price: 15, inStock: true, stockCount: 50 },

  // Fortune Oil
  { id: 'i15', storeId: 's1', productId: 'p6', price: 135, inStock: true, stockCount: 8 },
  { id: 'i16', storeId: 's2', productId: 'p6', price: 140, inStock: true, stockCount: 15 }
];

export const getProductsWithStorePrices = () => {
  return baseProducts.map(product => {
    const storePrices = inventory
      .filter(i => i.productId === product.id)
      .map(i => {
        const store = stores.find(s => s.id === i.storeId);
        return {
          ...i,
          store
        };
      })
      .sort((a, b) => a.price - b.price); // Cheapest first
      
    return {
      ...product,
      storePrices
    };
  });
};
