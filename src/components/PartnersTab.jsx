import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const PartnersTab = ({ products, selectedCurrency, onShowPriceHistory }) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Our Partners</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Exclusive deals from our verified business partners
        </p>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            selectedCurrency={selectedCurrency}
            onShowPriceHistory={onShowPriceHistory}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PartnersTab;