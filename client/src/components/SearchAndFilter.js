import React from "react";
import "../stylesheets/SearchAndFilter.css";

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterClick,
}) => {
  return (
    <div className="search-filter-container">

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search"
        className="search-input"
      />

      {/* Search Icon */}
      <button className="search-button">🔍</button>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["New", "Price ascending", "Price descending", "Rating"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => onFilterClick(filter)}
              className={`filter-button ${
                selectedFilter === filter ? "active" : "inactive"
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
