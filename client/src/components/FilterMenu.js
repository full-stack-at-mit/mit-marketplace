import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon

const FilterMenu = ({ onCostChange, onSearchChange, searchQuery }) => {
  const [filters, setFilters] = useState({
    categories: {
      products: true,
      services: true,
      studentBusinesses: true,
    },
    cost: [0, 100],
  });

  // Handle checkbox changes
  const handleCheckboxChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: {
        ...prevFilters.categories,
        [category]: !prevFilters.categories[category],
      },
    }));
  };

  // Handle cost slider changes
  const handleCostChange = (e) => {
    const value = e.target.value;
    const newCostRange = [0, value];
    setFilters((prevFilters) => ({
      ...prevFilters,
      cost: newCostRange,
    }));
    onCostChange(newCostRange); // Call the parent handler
  };

  return (
    <div className="bg-white w-full h-full py-4 overflow-y-auto">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full p-2 mb-6">
        <FaSearch className="text-gray-500 ml-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Marketplace"
          className="bg-transparent w-full pl-3 pr-4 py-1 text-sm text-gray-700 outline-none"
        />
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-lg font-bold mb-4">Categories</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.categories.products}
              onChange={() => handleCheckboxChange("products")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
            />
            Products
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.categories.services}
              onChange={() => handleCheckboxChange("services")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
            />
            Services
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.categories.studentBusinesses}
              onChange={() => handleCheckboxChange("studentBusinesses")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
            />
            Student Businesses
          </label>
        </div>
      </div>

      {/* Cost */}
      <div className="mt-6">
        <h4 className="text-lg font-bold mb-4">Cost</h4>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.cost[1]}
          onChange={handleCostChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-600 mt-2">
          Cost: ${filters.cost[0]} - ${filters.cost[1]}
        </p>
      </div>
    </div>
  );
};

export default FilterMenu;
