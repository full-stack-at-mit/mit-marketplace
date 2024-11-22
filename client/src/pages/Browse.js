import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FilterMenu from "../components/FilterMenu";
import ProductCard from "../components/ItemCard";
import SearchAndFilter from "../components/SearchAndFilter";
import "../stylesheets/Browse.css";
import { getProducts, getServices } from "../api/products";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("New");
  const [costRange, setCostRange] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  // Fetch products
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

    fetchProducts();
  }, []);

  // Fetch services
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

    fetchServices();
  }, []);

  // Handlers
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterClick = (filter) => setSelectedFilter(filter);
  const handleCostChange = (newCostRange) => setCostRange(newCostRange);

  // Combine products and services, then filter
  const combinedItems = [...products, ...services].filter(
    (item) =>
      item.price >= costRange[0] &&
      item.price <= costRange[1] &&
      (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="browse-page flex h-screen pt-16">
        {/* Sidebar Filter */}
        <aside className="filter-bar bg-white w-1/5 p-4 shadow-lg shadow-gray-400">
          <FilterMenu
            onCostChange={handleCostChange}
            onSearchChange={handleSearchChange}
            searchQuery={searchQuery}
          />
        </aside>

        {/* Main Content */}
        <main className="main-content flex-1">
          {/* Content */}
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedFilter={selectedFilter}
            onFilterClick={handleFilterClick}
          />

          <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {combinedItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Browse;
