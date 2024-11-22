import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FilterMenu from "../components/FilterMenu";
import ProductCard from "../components/ItemCard";
import SearchAndFilter from "../components/SearchAndFilter";
import "../stylesheets/Browse.css";
import { getProducts, getServices } from "../api/products";

const Browse = () => {
  const [activeView, setActiveView] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("New");
  const [costRange, setCostRange] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  // hook for getting products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("Fetched products:", response.data);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (activeView === "products") {
      fetchProducts();
    }
  }, [activeView]);

  // hook for getting services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        console.log("Fetched services:", response.data);
        setServices(response.data.services || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    if (activeView === "services") {
      fetchServices();
    }
  }, [activeView]);

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
