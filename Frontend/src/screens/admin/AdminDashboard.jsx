import { useState, useEffect } from "react";
import HeaderAdmin from "../../components/adminComponents/HeaderAdmin";
import { Link } from "react-router-dom";
import { useGetUsersMutation } from "../../slices/adminSlice/adminApliSlice";
import { toast } from "react-toastify";
import EditUsersModal from "../../components/adminComponents/EditUsersModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isEditUsersModalOpen, setIsEditUsersModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditProfileClick = (user) => {
    setSelectedUser(user)
    setIsEditUsersModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditUsersModalOpen(false);
    setSelectedUser(null)
  };

  const [getUsers, { isLoading }] = useGetUsersMutation();



  // useEffect to fetch user initiallly
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchData();
  }, [isEditUsersModalOpen]);



  // useEffect to filter user data based on search
  useEffect(() => {
    const filteredUsers = filteredData(search, users);
    setFilteredUsers(filteredUsers);
    setCurrentPage(1);
  }, [search, users]);

  // pagination logic
  // calculate index of last user on the page
  const indexOfLastUser = currentPage * usersPerPage;
  // calculate index of last user on the page
  const indexOfFistUser = indexOfLastUser - usersPerPage;
  // get current page of users
  const currentUsers = filteredUsers.slice(indexOfFistUser, indexOfLastUser);

  function filteredData(searchText, userList) {
    if (searchText == "") {
      return users;
    } else {
      const filtered = userList.filter((user) => {
        return (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        );
      });
      return filtered;
    }
  }

  // function to handle pagination controls
  const handlePagination = (action) => {
    if (action === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (action === "next" && indexOfLastUser < filteredUsers.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto lg:max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:p-10">
          <Link
                to="/admin/home"
                className="flex items-center w-[100px] mb-2 bg-white border hover:bg-indigo-500 hover:text-white transition duration-500 border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414L9.414 8H17a1 1 0 1 1 0 2H9.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Back</span>
              </Link>
            <div className="mb-6">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full h-10 ps-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Profile Pic
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="h-10 w-10 rounded-full"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleEditProfileClick(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300 mx-2">|</span>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
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
            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePagination("prev")}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-gray-200 rounded-lg ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-2">{currentPage}</span>
              <button
                onClick={() => handlePagination("next")}
                disabled={indexOfLastUser >= filteredUsers.length}
                className={`px-4 py-2 bg-gray-200 rounded-lg ${
                  indexOfLastUser >= filteredUsers.length
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {isEditUsersModalOpen && selectedUser && (
        <EditUsersModal
          userData={selectedUser}
          isOpen={isEditUsersModalOpen}
          onClose={handleCloseModal}
        />
      )}  
    </>
  );
};

export default AdminDashboard;
