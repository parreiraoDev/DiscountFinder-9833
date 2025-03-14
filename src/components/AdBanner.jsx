import { motion } from 'framer-motion';

const AdBanner = ({ position }) => {
  const bannerClass = position === 'top' 
    ? 'w-full h-24 mb-8'
    : position === 'sidebar' 
      ? 'w-64 h-[600px] hidden xl:block'
      : 'w-full h-[250px] my-8';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${bannerClass}`}
    >
      <div className="text-center p-4">
        <span className="text-gray-500 dark:text-gray-400">Advertisement</span>
      </div>
    </motion.div>
  );
};

export default AdBanner;