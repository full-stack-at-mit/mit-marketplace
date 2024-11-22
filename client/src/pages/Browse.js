import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FilterMenu from "../components/FilterMenu";
import ProductCard from "../components/ItemCard";
import SearchAndFilter from "../components/SearchAndFilter";
import "../stylesheets/Browse.css";
import { getAllProducts } from "../api/products";

const Browse = () => {
  const [activeView, setActiveView] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("New");
  const [costRange, setCostRange] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        console.log("Fetched data:", response.data); // Log the response for debugging
        setProducts(response.data.products || []); // Ensure default to an empty array
        setServices(response.data.services || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterClick = (filter) => setSelectedFilter(filter);
  const handleCostChange = (newCostRange) => setCostRange(newCostRange);

  const itemsToDisplay =
    activeView === "products"
      ? (products || []).filter(
          (product) =>
            product.price >= costRange[0] &&
            product.price <= costRange[1] &&
            (product.title?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            )
        )
      : (services || []).filter((service) =>
          (service.title?.toLowerCase() || "").includes(
            searchQuery.toLowerCase()
          )
        );

  return (
    <Layout>
      {/* Toggle Header */}
      <div className="toggle-header">
        <div
          className={`toggle-option ${
            activeView === "products" ? "active" : ""
          }`}
          onClick={() => setActiveView("products")}
        >
          Products
        </div>
        <div
          className={`toggle-option ${
            activeView === "services" ? "active" : ""
          }`}
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
