import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import PriceHistory from './PriceHistory';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ${product.discountedPrice}
                  </span>
                  <span className="ml-2 text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="ml-2 bg-accent text-white px-2 py-1 rounded-full text-sm">
                    {product.discountPercentage}% OFF
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  View on {product.platform}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <PriceHistory history={product.priceHistory} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;