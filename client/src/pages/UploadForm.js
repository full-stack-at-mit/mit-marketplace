import React, { useState, useRef } from "react";
import "../stylesheets/UploadForm.css";
import { createProduct } from "../api/products";
import Layout from "../components/Layout";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    contact: "",
    category: "",
    condition: "",
    pickupDetails: "",
    dateAdded: new Date().toISOString().split("T")[0], // Default to today's date
    images: [],
  });

  const descriptionRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      autoResizeTextarea(descriptionRef.current);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      contact: formData.contact,
      category: formData.category,
      condition: formData.condition,
      pickupDetails: formData.pickupDetails,
      dateAdded: formData.dateAdded,
      images: formData.images.map((file) => file.name),
    };

    try {
      const result = await createProduct(payload); // Call createProduct function
      console.log("Product created successfully:", result.data);

      // Optionally, reset the form or show a success message
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <Layout>
      <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg pt-32">
        <h2 className="text-2xl font-bold mb-4">Upload a Product or Service</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Add Photos Section */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Add Photos
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Product/Service Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Fill in the Details</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Title *"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                  required // Required based on schema
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price *"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-32 border border-gray-300 rounded-md p-2"
                  required // Required based on schema
                />
              </div>
              <textarea
                name="description"
                placeholder="Description *"
                value={formData.description}
                onChange={handleChange}
                ref={descriptionRef}
                rows={3}
                className="w-full border border-gray-300 rounded-md p-2 resize-none overflow-hidden"
                required // Required based on schema
              />
            </div>
          </div>

          {/* Categories and Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Select Category and Condition
            </h3>
            <div className="flex space-x-4">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 flex-1"
                required // Required based on schema
              >
                <option value="">Choose a Category</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 flex-1"
                required // Required based on schema
              >
                <option value="">Choose Condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Contact Info *
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Your Contact Info"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required // Required based on schema
            />
          </div>

          {/* Pickup Details */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Pickup Details
            </label>
            <input
              type="text"
              name="pickupDetails"
              placeholder="Pickup Details"
              value={formData.pickupDetails}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Date Added */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Date Added *
            </label>
            <input
              type="date"
              name="dateAdded"
              value={formData.dateAdded}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required // Required based on schema
              disabled
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UploadForm;
