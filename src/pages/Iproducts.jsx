import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);
  const { updateCartCount } = useContext(CartContext);

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to add to cart.");
      return;
    }

    const email = user.email;
    const key = `cart_${email}`;
    const existingCart = JSON.parse(localStorage.getItem(key)) || [];

    const updatedCart = [...existingCart];
    const existingItem = updatedCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(key, JSON.stringify(updatedCart));
    updateCartCount();
    alert("Product added to cart!");
  };

  if (!product) return <div className="p-8 text-center text-xl">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <img src={product.image} alt={product.name} className="w-full max-h-96 object-contain mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description || "No description provided."}</p>
      <p className="text-xl font-semibold text-green-600 mb-4">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;
