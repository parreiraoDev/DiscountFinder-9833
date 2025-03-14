import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaBell } from 'react-icons/fa';

const AlertModal = ({ product, onClose, onSave }) => {
  const [alertSettings, setAlertSettings] = useState({
    targetPrice: product.prices[0].discountedPrice,
    discountPercentage: 20,
    frequency: 'immediate',
    notificationType: ['email', 'push']
  });

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
        className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold dark:text-white">Set Price Alert</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Target Price</label>
            <input
              type="number"
              value={alertSettings.targetPrice}
              onChange={(e) => setAlertSettings(prev => ({ ...prev, targetPrice: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Minimum Discount</label>
            <input
              type="range"
              min="0"
              max="90"
              value={alertSettings.discountPercentage}
              onChange={(e) => setAlertSettings(prev => ({ ...prev, discountPercentage: e.target.value }))}
              className="w-full"
            />
            <span className="text-sm dark:text-gray-300">{alertSettings.discountPercentage}% off</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Notification Frequency</label>
            <select
              value={alertSettings.frequency}
              onChange={(e) => setAlertSettings(prev => ({ ...prev, frequency: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="immediate">Immediate</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Summary</option>
            </select>
          </div>

          <button
            onClick={() => onSave(alertSettings)}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
          >
            Save Alert
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlertModal;