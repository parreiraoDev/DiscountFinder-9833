import { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaStore, 
  FaShoppingCart, 
  FaMoneyBillWave 
} from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { getRevenueStats, getUserStats, getAdPerformance } from '@/services/admin';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    partners: 0,
    revenue: 0,
    alerts: 0
  });

  const [revenueData, setRevenueData] = useState(null);
  const [adPerformance, setAdPerformance] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [revenue, users, ads] = await Promise.all([
          getRevenueStats(),
          getUserStats(),
          getAdPerformance(
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            new Date().toISOString()
          )
        ]);

        setStats({
          users: users.totalUsers,
          partners: users.totalPartners,
          revenue: revenue.totalRevenue,
          alerts: users.totalAlerts
        });

        setRevenueData(revenue);
        setAdPerformance(ads);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FaUsers}
          label="Total Users"
          value={stats.users}
          trend="+12%"
        />
        <StatCard
          icon={FaStore}
          label="Business Partners"
          value={stats.partners}
          trend="+5%"
        />
        <StatCard
          icon={FaShoppingCart}
          label="Price Alerts"
          value={stats.alerts}
          trend="+18%"
        />
        <StatCard
          icon={FaMoneyBillWave}
          label="Monthly Revenue"
          value={`$${stats.revenue}`}
          trend="+8%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Revenue Trend</h3>
          {revenueData && (
            <Line
              data={revenueData.chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Ad Performance</h3>
          {adPerformance && (
            <Bar
              data={adPerformance.chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400">{label}</p>
        <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
      </div>
      <Icon className="text-3xl text-primary" />
    </div>
    <p className={`mt-2 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {trend} from last month
    </p>
  </div>
);