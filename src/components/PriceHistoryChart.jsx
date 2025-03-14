import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timeRanges = [
  { label: '1 Day', value: 'day' },
  { label: '1 Week', value: 'week' },
  { label: '1 Month', value: 'month' },
  { label: '3 Months', value: '3months' },
  { label: '6 Months', value: '6months' },
  { label: '9 Months', value: '9months' },
  { label: '1 Year', value: 'year' }
];

const getTimeRangeData = (history, range) => {
  const now = new Date();
  let startDate;

  switch (range) {
    case 'day':
      startDate = subDays(now, 1);
      break;
    case 'week':
      startDate = subWeeks(now, 1);
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
    case '9months':
      startDate = subMonths(now, 9);
      break;
    case 'year':
      startDate = subYears(now, 1);
      break;
    default:
      startDate = subMonths(now, 1);
  }

  return history.filter(entry => new Date(entry.date) >= startDate);
};

const PriceHistoryChart = ({ priceHistory, platforms }) => {
  const [timeRange, setTimeRange] = useState('month');
  const filteredData = getTimeRangeData(priceHistory, timeRange);

  const data = {
    labels: filteredData.map(h => format(new Date(h.date), 'MMM d')),
    datasets: platforms.map(platform => ({
      label: platform,
      data: filteredData
        .filter(h => h.platform === platform)
        .map(h => h.price),
      borderColor: sourceDetails[platform].color,
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {timeRanges.map(range => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-3 py-1 rounded-lg whitespace-nowrap ${
              timeRange === range.value
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default PriceHistoryChart;