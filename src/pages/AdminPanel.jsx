import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate= useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new product object
    const newProduct = {
      id: Date.now(), // Unique ID
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      thumbnail: formData.thumbnail,
    };

    // Get existing products
    const existingProducts = JSON.parse(localStorage.getItem("admin_products")) || [];

    // Add new product to the beginning of the list
    existingProducts.unshift(newProduct);

    // Save updated list to localStorage
    localStorage.setItem("admin_products", JSON.stringify(existingProducts));

    alert("Product added!");

    // Reset the form
    setFormData({
      title: "",
      description: "",
      price: "",
      thumbnail: "",
    });
    navigate("/adminproduct")

  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Image URL (optional)"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;


