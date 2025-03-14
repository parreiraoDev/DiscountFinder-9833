import { useState, useEffect } from 'react';
import { FaUserEdit, FaBan, FaCheck } from 'react-icons/fa';
import { getAllUsers, updateUserStatus } from '@/services/admin';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUserStatus(userId, newStatus);
      await loadUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Joined</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b dark:border-gray-700">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar || 'https://via.placeholder.com/32'} 
                      alt="" 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="dark:text-white">{user.full_name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 dark:text-gray-300">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.is_active 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.is_active ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="py-3 px-4 dark:text-gray-300">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(user.id, !user.is_active)}
                      className={`p-2 rounded-lg ${
                        user.is_active
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      {user.is_active ? <FaBan /> : <FaCheck />}
                    </button>
                    <button
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <FaUserEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;