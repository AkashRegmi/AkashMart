import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [products1, setProducts1] = useState([]);
  const { updateCartCount } = useContext(CartContext);
  const navigate= useNavigate();

  // useEffect(() => {
  //   fetch("https://dummyjson.com/products?limit=8")
  //     .then((res) => res.json())
  //     .then((data) => setProducts1(data.products))

  //     .catch((err) => console.error("Error fetching products:", err));
  // }, []);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=8");
      const data = await response.json();
      const localProducts = JSON.parse(localStorage.getItem("admin_products")) || [];
      setProducts1([...localProducts, ...data.products]); // Admin products first
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchData();
}, []);
  {
    /*  this is handeling the cart */
  }
  const handleAddToCart = (product) => {
     const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
     if (!email) {
    alert("Please log in first");
    navigate("/signin");
    return;
  }
    // if (!user) {
    //   alert("Please login to add items to the cart.");
    //   navigate("/signup"); // redirect to login if not logged in
    //   return;
    // }
    const cartKey = `cart_${email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingProduct = cart.find((item) => {
      item.id === product.id;
    });
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`${product.title} added to Cart`);
    updateCartCount();
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products1.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
              <p className="text-yellow-600 text-2xl">${product.price}</p>
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
  );
};

export default FeaturedProducts;
