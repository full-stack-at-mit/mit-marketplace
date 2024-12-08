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
      <div className="linebreak-1"></div>
      <div className="container mx-auto flex justify-between items-center">
        {/* College Marketplace Text aligned to the left */}
        <h1 className="text-2xl font-bold text-blue-600">
          College Marketplace
        </h1>

        {/* Centering the navigation items without considering the "College Marketplace" text */}
        <div className="flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-blue-500" : "text-gray-500"
              } hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded`
            }
          >
            <FaHome className="text-2xl" />
            <span className="text-sm mt-1">Home</span>
          </NavLink>

          {isAuth ? (
            <>
              <NavLink
                to="/browse"
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  } hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded`
                }
              >
                <FaSearch className="text-2xl" />
                <span className="text-sm mt-1">Browse</span>
              </NavLink>
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  } hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded`
                }
              >
                <FaUpload className="text-2xl" />
                <span className="text-sm mt-1">Upload</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  } hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded`
                }
              >
                <FaTachometerAlt className="text-2xl" />
                <span className="text-sm mt-1">Dashboard</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  } hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded`
                }
              >
                <FaSignInAlt className="text-2xl" />
                <span className="text-sm mt-1">Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  } hover:text-blue-500 transition hover:bg-gray-200 p-2 rounded`
                }
              >
                <FaUserPlus className="text-2xl" />
                <span className="text-sm mt-1">Sign up</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="linebreak-1"></div>
    </nav>
  );
};

export default Navbar;
