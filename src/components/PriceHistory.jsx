import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
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

const PriceHistory = ({ history }) => {
  const data = {
    labels: history.map(h => format(new Date(h.date), 'MMM d')),
    datasets: [
      {
        label: 'Price',
        data: history.map(h => h.price),
        borderColor: '#FF4747',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}`
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
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Price History</h3>
      <Line data={data} options={options} />
      <div className="mt-4 text-sm text-gray-500">
        Best time to buy: {format(new Date(Math.min(...history.map(h => h.price))), 'MMMM d, yyyy')}
      </div>
    </div>
  );
};

export default PriceHistory;