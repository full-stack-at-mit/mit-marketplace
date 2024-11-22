import React, { useState } from "react";
import "../stylesheets/UploadForm.css";

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
    console.log('submitted')
    e.preventDefault();

    // Prepare formData for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("contact", formData.contact);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("condition", formData.condition);
    formDataToSubmit.append("pickupDetails", formData.pickupDetails);
    formDataToSubmit.append("dateAdded", formData.dateAdded);

    // Handle images
    formData.images.forEach((image, index) => {
      formDataToSubmit.append("images", image);
    });

    console.log(formDataToSubmit)

    try {
      // Make POST request to the backend API (assuming your backend runs on localhost:3000)
      const response = await fetch("http://localhost:3000/create-product", {
        method: "POST",
        body: formDataToSubmit,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Product created successfully:", result);
        // Optionally, reset the form or show a success message
      } else {
        console.error("Error:", result.error || "Something went wrong");
      }
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
