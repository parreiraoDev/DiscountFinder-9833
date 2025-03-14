import axios from 'axios';

// Expanded mock data
export const products = [
  // ... (previous products remain)
];

// Function to fetch products from multiple sources
export const fetchAllProducts = async () => {
  try {
    const sources = [
      'amazon',
      'aliexpress',
      'ebay',
      'walmart',
      'target',
      'bestbuy'
    ];
    
    const categories = [
      'electronics',
      'fashion',
      'home',
      'beauty',
      'sports',
      'toys'
    ];

    // Simulate fetching from multiple sources
    const mockProducts = [];
    
    // Generate 100 products
    for (let i = 1; i <= 100; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      mockProducts.push({
        id: i,
        title: `Product ${i} - ${category}`,
        image: `https://picsum.photos/seed/${i}/500/300`,
        prices: [
          {
            platform: source,
            originalPrice: Math.floor(Math.random() * 900) + 100,
            discountedPrice: Math.floor(Math.random() * 80) + 20,
            discountPercentage: Math.floor(Math.random() * 70) + 10,
            url: `https://${source}.com/product/${i}`
          },
          {
            platform: sources[Math.floor(Math.random() * sources.length)],
            originalPrice: Math.floor(Math.random() * 900) + 100,
            discountedPrice: Math.floor(Math.random() * 80) + 20,
            discountPercentage: Math.floor(Math.random() * 70) + 10,
            url: `https://${source}.com/product/${i}`
          }
        ],
        rating: (Math.random() * 2 + 3).toFixed(1),
        ratingCount: Math.floor(Math.random() * 5000) + 100,
        category,
        isHistoricalLow: Math.random() > 0.8,
        priceHistory: Array.from({ length: 30 }, (_, index) => ({
          date: new Date(Date.now() - (30 - index) * 24 * 60 * 60 * 1000).toISOString(),
          price: Math.floor(Math.random() * 100) + 50
        }))
      });
    }

    return mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getDiscountedProducts = (
  products,
  category,
  platform,
  searchTerm,
  filters,
  sortBy
) => {
  let filteredProducts = [...products];

  if (category !== 'All') {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (platform !== 'all') {
    filteredProducts = filteredProducts.filter((p) =>
      p.prices.some((price) => price.platform === platform)
    );
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(term)
    );
  }

  // Apply additional filters
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter((p) => {
      const lowestPrice = Math.min(...p.prices.map((price) => price.discountedPrice));
      return lowestPrice >= min && (max === 'plus' || lowestPrice <= max);
    });
  }

  // Sort products
  switch (sortBy) {
    case 'discount':
      return filteredProducts.sort((a, b) => {
        const aMaxDiscount = Math.max(...a.prices.map((p) => p.discountPercentage));
        const bMaxDiscount = Math.max(...b.prices.map((p) => p.discountPercentage));
        return bMaxDiscount - aMaxDiscount;
      });
    case 'price-asc':
      return filteredProducts.sort((a, b) => {
        const aMinPrice = Math.min(...a.prices.map((p) => p.discountedPrice));
        const bMinPrice = Math.min(...b.prices.map((p) => p.discountedPrice));
        return aMinPrice - bMinPrice;
      });
    case 'price-desc':
      return filteredProducts.sort((a, b) => {
        const aMinPrice = Math.min(...a.prices.map((p) => p.discountedPrice));
        const bMinPrice = Math.min(...b.prices.map((p) => p.discountedPrice));
        return bMinPrice - aMinPrice;
      });
    case 'rating':
      return filteredProducts.sort((a, b) => b.rating - a.rating);
    case 'reviews':
      return filteredProducts.sort((a, b) => b.ratingCount - a.ratingCount);
    default:
      return filteredProducts;
  }
};