import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { updateCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const getCart = () => {
    const simulateLogout = localStorage.getItem("simulateLogout") === "true";

    if (simulateLogout) {
      // If simulate logout, show empty cart
      setCartItems([]);
      setTotalPrice(0);
      updateCartCount(); // update cart count to 0 in context
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    setCartItems(storedCart);
    updateCartTotal(storedCart);
  };

  useEffect(() => {
    getCart();
  }, []);

  const updateCartTotal = (cart) => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateQuantity = (productId, delta) => {
    const simulateLogout = localStorage.getItem("simulateLogout") === "true";
    if (simulateLogout) {
      alert("You are logged out. Please login to update your cart.");
      navigate("/signin");
      return;
    }

    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty < 0) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    updateCartTotal(updatedCart);
    updateCartCount();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p>Price: ${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="text-right mt-6">
            <h4 className="text-xl font-bold">Total: ${totalPrice}</h4>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate("/apple")}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
