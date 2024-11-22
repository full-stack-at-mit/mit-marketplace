import React from "react";
import "../stylesheets/SearchAndFilter.css";

const SearchAndFilter = ({ selectedFilter, onFilterClick }) => {
  return (
    <div className="filter-buttons-container">
      {/* Filter Buttons */}
      <div className="filter-buttons flex space-x-2 pt-8 pl-4">
        {["New", "Price ascending", "Price descending", "Rating"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => onFilterClick(filter)}
              className={`filter-button px-4 py-2 rounded-md ${
                selectedFilter === filter
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
