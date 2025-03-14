import { useState } from 'react';
import { 
  FaChartLine, 
  FaUsers, 
  FaStore, 
  FaMoneyBillWave, 
  FaCog,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const MENU_ITEMS = [
  { icon: FaChartLine, label: 'Dashboard', path: '/admin' },
  { icon: FaUsers, label: 'Users', path: '/admin/users' },
  { icon: FaStore, label: 'Business Partners', path: '/admin/partners' },
  { icon: FaMoneyBillWave, label: 'Revenue', path: '/admin/revenue' },
  { icon: FaCog, label: 'Settings', path: '/admin/settings' },
];

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        z-50 md:relative md:translate-x-0
      `}>
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          {MENU_ITEMS.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mb-2"
            >
              <item.icon className="text-primary" />
              <span className="dark:text-white">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-500 dark:text-gray-400"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;