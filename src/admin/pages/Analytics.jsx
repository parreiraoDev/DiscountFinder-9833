import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  FaUsers, 
  FaChartLine, 
  FaMoneyBillWave,
  FaAd 
} from 'react-icons/fa';
import { getDetailedAnalytics } from '@/services/admin';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const analytics = await getDetailedAnalytics(timeframe);
      setData(analytics);
    };
    fetchAnalytics();
  }, [timeframe]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select 
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 rounded-lg border"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <Line data={data.revenueData} options={data.revenueOptions} />
        </div>

        {/* User Acquisition */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Acquisition</h3>
          <Bar data={data.userAcquisitionData} options={data.userOptions} />
        </div>

        {/* Ad Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Ad Performance</h3>
          <Doughnut data={data.adPerformanceData} options={data.adOptions} />
        </div>

        {/* Platform Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Traffic by Platform</h3>
          <Doughnut data={data.platformData} options={data.platformOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;