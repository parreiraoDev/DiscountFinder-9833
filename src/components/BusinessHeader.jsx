import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const BusinessHeader = ({ onOpenBusinessModal }) => {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenBusinessModal}
        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg"
      >
        <FaBriefcase />
        <span>Join as Business Partner</span>
      </motion.button>
    </div>
  );
};

export default BusinessHeader;