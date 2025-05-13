import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Iproducts from "./pages/Iproducts";
import  { Cart, } from "./pages/Cart";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import Carousel from "./pages/Carousel";
import FeaturedProducts from "./pages/FeaturedProducts";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <>
    <CartProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Carousel" element={<Carousel />} />
          <Route path="/feature" element={<FeaturedProducts />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Iproducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartpage" element={<CartPage />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
         

          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    
    
    </CartProvider>
      
    </>
  );
};

export default App;
