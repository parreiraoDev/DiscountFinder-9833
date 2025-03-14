import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaStore, FaBox } from 'react-icons/fa';

const PRODUCT_TIERS = [
  { products: 50, price: 10 },
  { products: 100, price: 18 },
  { products: 200, price: 35 },
  { products: 500, price: 80 }
];

const BusinessApplicationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    email: '',
    productCount: 50,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Business application:', formData);
    onClose();
  };

  const selectedTier = PRODUCT_TIERS.find(tier => tier.products === formData.productCount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Business Application</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Business Name</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Product Tier</label>
            <select
              value={formData.productCount}
              onChange={e => setFormData(prev => ({ ...prev, productCount: Number(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              {PRODUCT_TIERS.map(tier => (
                <option key={tier.products} value={tier.products}>
                  {tier.products} products - ${tier.price}/month
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Business Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 h-32"
              required
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 dark:text-white">Selected Plan Summary</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaBox />
                <span className="dark:text-gray-300">{selectedTier.products} Products</span>
              </div>
              <span className="text-xl font-bold text-primary">${selectedTier.price}/month</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Submit Application
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BusinessApplicationModal;