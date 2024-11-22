import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaSearch,
  FaTachometerAlt,
  FaUpload,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white py-2 z-10 fixed w-full shadow">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-8">
          <NavLink
            to="/"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded"
          >
            <FaHome className="text-2xl" />
            <span className="text-sm mt-1">Home</span>
          </NavLink>

          {isAuth ? (
            <>
              <NavLink
                to="/browse"
                className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded"
              >
                <FaSearch className="text-2xl" />
                <span className="text-sm mt-1">Browse</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded"
              >
                <FaTachometerAlt className="text-2xl" />
                <span className="text-sm mt-1">Dashboard</span>
              </NavLink>
              <NavLink
                to="/upload"
                className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded"
              >
                <FaUpload className="text-2xl" />
                <span className="text-sm mt-1">Upload</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded"
              >
                <FaSignInAlt className="text-2xl" />
                <span className="text-sm mt-1">Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded"
              >
                <FaUserPlus className="text-2xl" />
                <span className="text-sm mt-1">Sign up</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
