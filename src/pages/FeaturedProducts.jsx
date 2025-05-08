import React, { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [products1, setProducts1] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setProducts1(data.products))
      
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  {
    /*  this is handeling the cart */
  }
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => {
      item.id === product.id;
    });
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to Cart`);
  };
  return(
    <>
    <div className="max-w-7xl mx-auto p-4">
    <h2 className="text-3xl font-bold text-center mb-6 text-white">Featured Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products1.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-48 w-full object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
    </>
  )
 
};

export default FeaturedProducts;
