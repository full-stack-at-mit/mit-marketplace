import React, { useState } from "react";
import Layout from "../components/Layout";
import FilterMenu from "../components/FilterMenu";
import ProductCard from "../components/ItemCard";
import SearchAndFilter from "../components/SearchAndFilter";
import "../stylesheets/Browse.css";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("New");
  const [costRange, setCostRange] = useState([0, 100]); // New state for cost range

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterClick = (filter) => setSelectedFilter(filter);
  const handleCostChange = (newCostRange) => setCostRange(newCostRange); // New handler

  // Example products array (replace this with actual product data)
  const products = [...Array(10)].map((_, index) => ({
    id: index,
    title: "Cheese",
    description: "Swiss",
    price: 10, // example price
  }));

  // Filter products based on the selected cost range
  const filteredProducts = products.filter((product) => {
    return product.price >= costRange[0] && product.price <= costRange[1];
  });

  return (
    <Layout>
      <div className="products-container">
        {/* Sidebar for Filter Menu */}
        <aside className="sidebar">
          <FilterMenu onCostChange={handleCostChange} />{" "}
          {/* Pass the handler */}
        </aside>

        {/* Main content area */}
        <main className="main-content">
          {/* Search and Filter Component */}
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedFilter={selectedFilter}
            onFilterClick={handleFilterClick}
          />

          {/* Product cards grid layout */}
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} /> // Pass product data
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Browse;
