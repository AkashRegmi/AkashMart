import React, { useState } from "react";

const AdminPanel = () => {
  const [products, setProducts] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("admin_products")) || [];
    products.unshift(products); // Add to the beginning
    localStorage.setItem("admin_products", JSON.stringify(products));

    alert("Product added!");
    setProducts({ title: "", description: "", price: "", thumbnail: "" });
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={products.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={products.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={products.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Image URL (optional)"
          value={products.thumbnail}
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
