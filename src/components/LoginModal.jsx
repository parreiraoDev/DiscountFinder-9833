import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginModal = ({ onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

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
          <h2 className="text-2xl font-bold dark:text-white">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <FaGoogle />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <FaFacebook />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;