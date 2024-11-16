import React, { useState } from "react";
import { updateProtectedInfo } from "../api/auth";

function Survey() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    interests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProtectedInfo(formData);
      alert("Profile information saved successfully!");
    } catch (error) {
      console.error("Error saving profile information:", error);
      alert("There was an error saving your information.");
    }
  };

  return (
    <div className="survey">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Interests (What do you want to buy?):</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="e.g., electronics, books, fashion"
            required
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default Survey;
