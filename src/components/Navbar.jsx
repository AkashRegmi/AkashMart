import { IoMdCart } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import Logo from "../assets/AkashMart.jpg"
import { Link, useNavigate, useNavigation } from "react-router-dom";
function  Navbar () {
  const navigate=useNavigate();

  const handelClick=()=>{
    navigate("/signup");
  };
  
    return(

        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
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
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            0
          </span>
        </div>
        <div>
        
        <button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
       onClick={handelClick} >Login</button>
        
        </div>
      </nav>
    )
}
export default Navbar;
