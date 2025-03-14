import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';

const DealAlert = ({ isLoggedIn, onCreateAlert, product }) => {
  if (!isLoggedIn) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        onClick={() => window.location.href = '/login'}
      >
        <FaBell />
        <span>Login to Set Alert</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark"
      onClick={() => onCreateAlert(product)}
    >
      <FaBell />
      <span>Set Price Alert</span>
    </motion.button>
  );
};

export default DealAlert;