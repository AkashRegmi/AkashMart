import { IoMdCart } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import Logo from "../assets/AkashMart.jpg"
import { Link, useNavigate,  } from "react-router-dom";
import {  useContext, useEffect, useState } from "react";
import { Cart } from "../pages/Cart";
import { CartContext,} from "../context/CartContext";

function  Navbar () {
  const [userName, setUserName] = useState("");
  const [adminName, setAdminName] = useState("");
  const {cartCount,updateCartCount}= useContext(CartContext)
  const navigate=useNavigate();
  useEffect(()=>{
  const adminuser = JSON.parse(localStorage.getItem("Admin"));
  if(adminuser && adminuser.email){
    setAdminName(adminuser.email.slice(0, 1).toUpperCase());
  }
 },[]);

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
         <Link to="/cartpage"><IoMdCart className="h-6 w-6 m-5 text-gray-700" /></Link>
          
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
        {userName || adminName ? (
          <>
            <span>Hi, {userName || adminName}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
       
            <Link
        to="/signup"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Login as Customer
      </Link>
      <Link
        to="/adminlogin"
        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-800"
      >
        Login as Admin
      </Link>
          </>
          
        )}
      </div>
        
        </div>
      </nav>
    )
}
export default Navbar;
