import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaTimes, FaCheck } from 'react-icons/fa';
import { getNotifications, markAsRead } from '@/services/notifications';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount(prev => prev - 1);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800"
      >
        <FaBell className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
          >
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-semibold dark:text-white">Notifications</h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b dark:border-gray-700 ${
                    !notification.read ? 'bg-blue-50 dark:bg-gray-700' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.date).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;