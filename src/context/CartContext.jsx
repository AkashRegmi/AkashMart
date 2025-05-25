import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const simulateLogout = localStorage.getItem("simulateLogout") === "true";
    if (simulateLogout) {
      setCartCount(0);
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setCartCount(0);
      return;
    }
    const cartKey = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
