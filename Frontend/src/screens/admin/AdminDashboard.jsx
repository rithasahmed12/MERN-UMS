import { useState, useEffect } from 'react';
import HeaderAdmin from "../../components/adminComponents/HeaderAdmin"
import { Link } from "react-router-dom";
import { useGetUsersMutation } from '../../slices/adminSlice/adminApliSlice'
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [getUsers, { isLoading }] = useGetUsersMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data); // Assuming response.data contains the array of users
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderAdmin />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto lg:max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:p-10">
            <div className="mb-6">
              <input type="text" placeholder="Search users..." className="w-full h-10 ps-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Pic</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={user.profileImage} alt={user.name} className="h-10 w-10 rounded-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/admin/get-update-user/${user._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                        <span className="text-gray-300 mx-2">|</span>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 w-full flex justify-center">
              <Link to="/admin/add-user">
                <button className="flex items-center bg-white border hover:bg-indigo-500 hover:text-white transition duration-500 border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <span>Add User</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard;
