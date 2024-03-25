import Header from "../../components/Header";
import React, { useState } from "react";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import EditProfileModal from "../../components/EditProfileModal";

const Profile = () => {
    
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileModalOpen(false);
  };


  const { userInfo } = useSelector((state) => state.auth);

  console.log('userInfo:',userInfo);


  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="flex justify-between items-center mt-8">
              <Link
                to="/home"
                className="flex items-center bg-white border hover:bg-teal-500 hover:text-white transition duration-500 border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
              <button
                onClick={handleEditProfileClick}
                className="flex items-center bg-white border hover:bg-teal-500 hover:text-white transition duration-500 border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Edit Profile
              </button>
            </div>
            <div className="max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <img
                  src={userInfo.profileImage}
                  alt="Profile"
                  className="h-28 w-28 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">User Profile</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <p className="text-gray-900">{userInfo.name}</p>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <p className="text-gray-900">{userInfo.email}</p>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <p className="text-gray-900">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed euismod tellus sed dictum faucibus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditProfileModalOpen && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Profile;
