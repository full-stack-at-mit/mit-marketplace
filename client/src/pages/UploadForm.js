import React, { useState } from "react";
import "../stylesheets/UploadForm.css";
import { createProduct } from "../api/products";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    <div className="upload-form-container">
      <h2>Upload a Product or Service</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        {/* Name */}
        <label>
          Product/Service Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        {/* Price */}
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        {/* Description */}
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        {/* Contact */}
        <label>
          Contact Info:
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>

        {/* Category */}
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
        </label>

        {/* Condition */}
        <label>
          Condition:
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </label>

        {/* Pickup Details */}
        <label>
          Pickup Details:
          <input
            type="text"
            name="pickupDetails"
            value={formData.pickupDetails}
            onChange={handleChange}
          />
        </label>

        {/* Date Added */}
        <label>
          Date Added:
          <input
            type="date"
            name="dateAdded"
            value={formData.dateAdded}
            onChange={handleChange}
            disabled
          />
        </label>

        {/* Images */}
        <label>
          Upload Images:
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
