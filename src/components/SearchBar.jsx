import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-md"
        >
          Search
        </motion.button>
      </div>
    </form>
  );
}

export default SearchBar;