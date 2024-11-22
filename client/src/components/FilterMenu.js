import React, { useState } from "react";
import "../stylesheets/FilterMenu.css";

const FilterMenu = ({ onCostChange }) => {
  const [filters, setFilters] = useState({
    categories: {
      products: true,
      services: true,
      studentBusinesses: true,
    },
    cost: [0, 100],
  });

  // Function to handle checkbox changes for categories
  const handleCheckboxChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: {
        ...prevFilters.categories,
        [category]: !prevFilters.categories[category],
      },
    }));
    console.log("Updated filters:", filters);
  };

  // Function to handle cost slider changes
  const handleCostChange = (e) => {
    const value = e.target.value;
    const newCostRange = [0, value];
    setFilters((prevFilters) => ({
      ...prevFilters,
      cost: newCostRange,
    }));
    onCostChange(newCostRange); // Call the passed handler
    console.log("Updated filters:", filters);
  };

  return (
    <div>
      <div className="filter-menu">
        <h3>Filter Menu</h3>
        <div className="filter-category">
          <h4>Categories</h4>
          <label>
            <input
              type="checkbox"
              checked={filters.categories.products}
              onChange={() => handleCheckboxChange("products")}
            />
            Products
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.categories.services}
              onChange={() => handleCheckboxChange("services")}
            />
            Services
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.categories.studentBusinesses}
              onChange={() => handleCheckboxChange("studentBusinesses")}
            />
            Student Businesses
          </label>
        </div>

        <div className="filter-cost">
          <h4>Cost</h4>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.cost[1]}
            onChange={handleCostChange}
          />
          <p>
            Cost: ${filters.cost[0]} - ${filters.cost[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
