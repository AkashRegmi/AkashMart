import { IoMdCart } from "react-icons/io";
function  Navbar () {
    return(

        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-teal-700">AkashMart
        
        
        </div>
  
        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
  
        // this is for the cart icon 
        <div className="relative cursor-pointer">
         
          <IoMdCart className="h-6 w-6 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            0
          </span>
        </div>
      </nav>
    )
}
export default Navbar;
