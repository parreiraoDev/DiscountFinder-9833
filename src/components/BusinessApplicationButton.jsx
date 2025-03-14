import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const BusinessApplicationButton = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
    >
      <FaBriefcase />
      <span>Business Application</span>
    </motion.button>
  );
};

export default BusinessApplicationButton;