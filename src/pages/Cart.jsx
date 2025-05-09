import React, { createContext, useEffect, useState } from 'react'
const cartContext=createContext();
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };
const Cart = () => {
  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
    {children}
  </CartContext.Provider>
  )
}

export default Cart
