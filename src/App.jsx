import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import PlatformToggle from './components/PlatformToggle';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import CurrencySelector from './components/CurrencySelector';
import ThemeToggle from './components/ThemeToggle';
import UserMenu from './components/UserMenu';
import DealRefreshTimer from './components/DealRefreshTimer';
import AdBanner from './components/AdBanner';
import AlertModal from './components/AlertModal';
import LoginModal from './components/LoginModal'; // Add this
import { getDiscountedProducts, fetchAllProducts } from './data/mockData';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('discount');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [user, setUser] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Add this
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    loadProducts();
  }, [isDark]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshDeals = async () => {
    await loadProducts();
  };

  const handleCreateAlert = (product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setSelectedProduct(product);
    setShowAlertModal(true);
  };

  const handleSaveAlert = (settings) => {
    // Implement alert saving logic
    console.log('Saving alert:', settings);
    setShowAlertModal(false);
  };

  const handleLogin = (credentials) => {
    // Implement login logic
    console.log('Logging in:', credentials);
    setUser({ name: 'Test User', email: credentials.email });
    setShowLoginModal(false);
  };

  const filteredProducts = getDiscountedProducts(
    products,
    selectedCategory,
    selectedPlatform,
    searchTerm,
    filters,
    sortBy
  );

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        {/* Header content remains the same */}
      </header>

      <main className="container mx-auto px-4 py-8">
        <AdBanner position="top" />
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <PlatformToggle
                selectedPlatform={selectedPlatform}
                onSelectPlatform={setSelectedPlatform}
              />
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <Filters
                onFilterChange={(type, value, checked) =>
                  setFilters(prev => ({ ...prev, [type]: value }))
                }
                onSortChange={setSortBy}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      selectedCurrency={selectedCurrency}
                      onCreateAlert={() => handleCreateAlert(product)}
                      isLoggedIn={!!user}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            <AdBanner position="bottom" />
          </div>
          <AdBanner position="sidebar" />
        </div>
      </main>

      <AnimatePresence>
        {showAlertModal && (
          <AlertModal
            product={selectedProduct}
            onClose={() => setShowAlertModal(false)}
            onSave={handleSaveAlert}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;