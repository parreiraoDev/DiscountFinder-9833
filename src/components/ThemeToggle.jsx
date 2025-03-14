import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
    >
      {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
    </motion.button>
  );
};

export default ThemeToggle;