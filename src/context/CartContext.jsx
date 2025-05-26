import React, { createContext, useState, useEffect } from "react";

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
    const email = user?.email;

    if (!email) {
      setCartCount(0);
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
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
