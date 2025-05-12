import { IoMdCart } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import Logo from "../assets/AkashMart.jpg"
import { Link, useNavigate,  } from "react-router-dom";
import {  useContext, useEffect, useState } from "react";
import { Cart } from "../pages/Cart";
import { CartContext,} from "../context/CartContext";

function  Navbar () {
  const [userName, setUserName] = useState("");
  const {cartCount,updateCartCount}= useContext(CartContext)
  const navigate=useNavigate();

 useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  if(user && user.name){
    setUserName(user.name.slice(0, 1).toUpperCase());
  }
 },[]);
  const handelClick=()=>{
    navigate("/signup");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); 
    updateCartCount(0);
    window.location.reload(); // Refresh to update the navbar
  };
  
    return(

        <nav className="bg-white shadow-md px-6 py-4  flex items-center justify-between">
        {/* Logo */}
        
         <button className=" cursor-pointer transition-transform duration-300 hover:scale-105"><img src={Logo} alt="AkashMart logo" className="h-20 rounded-2xl"/></button> 
        
        {/* Search Bar */}
        <div className="flex-1 mx-6">
        
          <input
          
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            
          />
          
        </div>
  
        
        <div className="relative cursor-pointer">
         
          <IoMdCart className="h-6 w-6 text-gray-700" />
          { /*<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            0
          </span> */}
          {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {cartCount}
            
          </span>
          )}
        </div>
        <div>
        
        {/*<button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
       onClick={handelClick} >Signup</button>*/}
         <div className="flex items-center space-x-4">
        {userName ? (
          <>
            <span>Hi, {userName}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
       
            <Link to="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Signup</Link>
          </>
        )}
      </div>
        
        </div>
      </nav>
    )
}
export default Navbar;
