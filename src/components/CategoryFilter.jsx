import { motion } from 'framer-motion';

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home',
  'Beauty',
  'Sports',
  'Toys',
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;