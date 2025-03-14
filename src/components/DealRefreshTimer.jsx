import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSync } from 'react-icons/fa';

const DealRefreshTimer = ({ onRefresh }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onRefresh();
          return 3600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRefresh]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div 
      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
      animate={{ opacity: [0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <FaSync className={timeLeft <= 60 ? 'animate-spin' : ''} />
      <span>Next refresh in {minutes}:{seconds.toString().padStart(2, '0')}</span>
    </motion.div>
  );
};

export default DealRefreshTimer;