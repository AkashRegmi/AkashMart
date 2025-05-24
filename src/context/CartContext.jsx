import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   const email = user?.email;
  //   const cart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
  //   const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  //   setCartCount(total);
  // }, []);
  useEffect(() => {
    updateCartCount(); // Run once on mount
  }, []);
  const updateCartCount = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedOut = localStorage.getItem("loggedOut") === "true";
    // 
     if (!user || isLoggedOut) {
    setCartCount(0); // Not logged in
    return;
  }
    // if (!email) {
    //   setCartCount(0);
    //   return;
    // }
    // const cart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    // const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    // setCartCount(total);
     const email = user.email;
  const cart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  setCartCount(total);
  };


  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
