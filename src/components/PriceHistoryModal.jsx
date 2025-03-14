import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { format, subDays, subMonths, subYears } from 'date-fns';
import { FaTimes } from 'react-icons/fa';

const TIME_RANGES = [
  { label: '1D', value: 'day' },
  { label: '1W', value: 'week' },
  { label: '1M', value: 'month' },
  { label: '3M', value: '3months' },
  { label: '6M', value: '6months' },
  { label: '1Y', value: 'year' },
];

const PriceHistoryModal = ({ product, onClose }) => {
  const [timeRange, setTimeRange] = useState('month');

  const getTimeRangeData = () => {
    const now = new Date();
    let startDate;

    switch (timeRange) {
      case 'day':
        startDate = subDays(now, 1);
        break;
      case 'week':
        startDate = subDays(now, 7);
        break;
      case 'month':
        startDate = subMonths(now, 1);
        break;
      case '3months':
        startDate = subMonths(now, 3);
        break;
      case '6months':
        startDate = subMonths(now, 6);
        break;
      case 'year':
        startDate = subYears(now, 1);
        break;
      default:
        startDate = subMonths(now, 1);
    }

    return product.prices.filter(p => new Date(p.date) >= startDate);
  };

  const chartData = {
    labels: getTimeRangeData().map(p => format(new Date(p.date), 'MMM d')),
    datasets: product.prices.map(platform => ({
      label: platform.name,
      data: platform.history.map(p => p.price),
      borderColor: platform.color,
      tension: 0.1
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
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
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">{product.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {TIME_RANGES.map(range => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.prices.map(platform => (
            <div
              key={platform.name}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">{platform.name}</h3>
              <div className="text-sm">
                <div>Current: ${platform.current}</div>
                <div>Lowest: ${platform.lowest}</div>
                <div>Highest: ${platform.highest}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PriceHistoryModal;