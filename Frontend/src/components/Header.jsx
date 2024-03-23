import React from 'react';

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-gradient-to-r from-teal-400 to-teal-600 shadow-lg">
      <div className="container flex flex-auto items-center h-full justify-between px-6">
        {/* Brand Name or Logo */}
        <div className="text-xl font-semibold text-white">MERN AUTH</div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-200">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
