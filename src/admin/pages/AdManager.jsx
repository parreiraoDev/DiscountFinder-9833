import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { updateAdUnit, deleteAdUnit, createAdUnit } from '@/services/admin';

const AdManager = () => {
  const [adUnits, setAdUnits] = useState([
    { id: 1, platform: 'google', position: 'top', revenue: 1234.56, impressions: 50000 },
    { id: 2, platform: 'amazon', position: 'sidebar', revenue: 987.65, impressions: 30000 },
    // Add more ad units
  ]);

  const [editingUnit, setEditingUnit] = useState(null);

  const handleSave = async (unit) => {
    if (unit.id) {
      await updateAdUnit(unit);
    } else {
      await createAdUnit(unit);
    }
    setEditingUnit(null);
    // Refresh ad units
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ad Management</h2>
        <button 
          onClick={() => setEditingUnit({})}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add New Ad Unit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adUnits.map(unit => (
          <div key={unit.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{unit.platform}</h3>
                <p className="text-sm text-gray-500">{unit.position}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingUnit(unit)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => deleteAdUnit(unit.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span>Revenue</span>
                <span className="font-semibold">${unit.revenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Impressions</span>
                <span className="font-semibold">{unit.impressions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ad Unit Editor Modal */}
      {editingUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              {editingUnit.id ? 'Edit Ad Unit' : 'New Ad Unit'}
            </h3>
            {/* Add form fields */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdManager;