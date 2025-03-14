import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

const Filters = ({ onFilterChange, onSortChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'discount', label: 'Highest Discount' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rated' },
    { value: 'reviews', label: 'Most Reviews' }
  ];

  const priceRanges = [
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 to $50' },
    { value: '50-100', label: '$50 to $100' },
    { value: '100-plus', label: 'Over $100' }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <FaFilter />
          <span>Filters</span>
        </motion.button>

        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 bg-gray-100 rounded-lg appearance-none"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white p-4 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              {priceRanges.map(range => (
                <label key={range.value} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={range.value}
                    onChange={(e) => onFilterChange('priceRange', e.target.value, e.target.checked)}
                  />
                  {range.label}
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Minimum Rating</h3>
              {[4, 3, 2].map(rating => (
                <label key={rating} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    onChange={(e) => onFilterChange('rating', e.target.value)}
                  />
                  {rating}+ Stars
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Minimum Discount</h3>
              {[70, 50, 30, 10].map(discount => (
                <label key={discount} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="discount"
                    value={discount}
                    onChange={(e) => onFilterChange('discount', e.target.value)}
                  />
                  {discount}% or more
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Filters;