import { useState, useEffect } from 'react';
import { 
  FaCheck, 
  FaTimes, 
  FaExternalLinkAlt,
  FaEnvelope
} from 'react-icons/fa';
import { getBusinessApplications, updateBusinessApplication } from '@/services/admin';

const Partners = () => {
  const [applications, setApplications] = useState([]);
  const [activePartners, setActivePartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getBusinessApplications();
      setApplications(data.filter(app => app.status === 'pending'));
      setActivePartners(data.filter(app => app.status === 'active'));
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationUpdate = async (id, status) => {
    try {
      await updateBusinessApplication(id, status);
      await loadApplications();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pending Applications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Pending Applications
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-4">Business</th>
                <th className="text-left py-3 px-4">Website</th>
                <th className="text-left py-3 px-4">Plan</th>
                <th className="text-left py-3 px-4">Applied</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} className="border-b dark:border-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium dark:text-white">
                        {app.business_name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <a 
                      href={app.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      {app.website_url}
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </td>
                  <td className="py-3 px-4 dark:text-gray-300">
                    {app.subscription_tier} products
                  </td>
                  <td className="py-3 px-4 dark:text-gray-300">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApplicationUpdate(app.id, 'active')}
                        className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleApplicationUpdate(app.id, 'rejected')}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <FaTimes />
                      </button>
                      <a
                        href={`mailto:${app.contact_email}`}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        <FaEnvelope />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Partners */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Active Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePartners.map(partner => (
            <div
              key={partner.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold dark:text-white">
                    {partner.business_name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {partner.subscription_tier} products
                  </p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Active
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  Visit Site
                  <FaExternalLinkAlt className="text-xs" />
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href={`mailto:${partner.contact_email}`}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  Contact
                  <FaEnvelope className="text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;