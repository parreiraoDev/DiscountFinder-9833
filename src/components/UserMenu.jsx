import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaHeart, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-primary text-white rounded-lg"
        onClick={() => window.location.href = '/login'}
      >
        Login
      </motion.button>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
      >
        <img
          src={user.avatar || 'https://via.placeholder.com/32'}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="dark:text-white">{user.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2"
          >
            <a href="/wishlist" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaHeart className="text-primary" />
              <span className="dark:text-white">Wishlist</span>
            </a>
            <a href="/alerts" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaBell className="text-primary" />
              <span className="dark:text-white">Price Alerts</span>
            </a>
            <a href="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaCog className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">Settings</span>
            </a>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;