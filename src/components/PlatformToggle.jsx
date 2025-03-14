import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/si';
import { sourceDetails, SOURCES } from '../data/sources';

const PlatformToggle = ({ selectedPlatform, onSelectPlatform }) => {
  const [showAll, setShowAll] = useState(true);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowAll(true);
            onSelectPlatform('all');
          }}
          className={`px-4 py-2 rounded-lg ${
            showAll ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          All Platforms
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAll(false)}
          className={`px-4 py-2 rounded-lg ${
            !showAll ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          Select Platforms
        </motion.button>
      </div>

      {!showAll && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Object.entries(sourceDetails).map(([key, source]) => {
            const IconComponent = Icons[source.icon];
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectPlatform(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  selectedPlatform === key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {IconComponent && <IconComponent className="text-xl" />}
                <span>{source.name}</span>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlatformToggle;