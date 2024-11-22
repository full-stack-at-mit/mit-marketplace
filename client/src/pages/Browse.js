import React, { useState } from "react";
import Layout from "../components/Layout";
import FilterMenu from "../components/FilterMenu";
import ProductCard from "../components/ItemCard";
import SearchAndFilter from "../components/SearchAndFilter";
import "../stylesheets/Browse.css";

const Browse = () => {
  const [activeView, setActiveView] = useState("products"); // Tracks active view
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("New");
  const [costRange, setCostRange] = useState([0, 100]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterClick = (filter) => setSelectedFilter(filter);
  const handleCostChange = (newCostRange) => setCostRange(newCostRange);

  // Example data (replace this with actual data)
  const products = [...Array(10)].map((_, index) => ({
    id: index,
    title: "Cheese",
    description: "Swiss",
    price: 10,
  }));
  const services = [...Array(10)].map((_, index) => ({
    id: index,
    title: "Service",
    description: "Professional Service",
    price: 20,
  }));

  // Filter items based on the active view
  const itemsToDisplay =
    activeView === "products"
      ? products.filter(
          (product) => product.price >= costRange[0] && product.price <= costRange[1]
        )
      : services;

  return (
    <Layout>
      {/* Toggle Header */}
      <div className="toggle-header">
        <div
          className={`toggle-option ${activeView === "products" ? "active" : ""}`}
          onClick={() => setActiveView("products")}
        >
          Products
        </div>
        <div
          className={`toggle-option ${activeView === "services" ? "active" : ""}`}
          onClick={() => setActiveView("services")}
        >
          Services
        </div>
      </div>

      <div className="products-container">
        <aside className="sidebar">
          <FilterMenu onCostChange={handleCostChange} />
        </aside>
        <main className="main-content">
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedFilter={selectedFilter}
            onFilterClick={handleFilterClick}
          />

          <div className="product-grid">
            {itemsToDisplay.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Browse;
