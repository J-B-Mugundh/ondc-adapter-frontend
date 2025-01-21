import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#4B0082] via-[#6A0DAD] to-[#8A2BE2] text-white py-4 px-6 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-3xl font-extrabold tracking-wider">
          <Link to="/" className="hover:text-[#FFD700] transition duration-300">
            Adapter Avengers
          </Link>
        </div>

        {/* Links Section */}
        <ul className="flex space-x-8 text-lg font-semibold">
          <li>
            <Link
              to="/"
              className="hover:text-[#FFD700] transition duration-300"
            >
             Seller Onboarding 
            </Link>
          </li>
          <li>
            <Link
              to="/ondc/search"
              className="hover:text-[#FFD700] transition duration-300"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/sellers"
              className="hover:text-[#FFD700] transition duration-300"
            >
              Seller Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/ondc/orders"
              className="hover:text-[#FFD700] transition duration-300"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="hover:text-[#FFD700] transition duration-300"
            >
              Admin Dashboard
            </Link>
          </li>
          
         
          {/* <li>
            <Link
              to="/cart"
              className="hover:text-[#FFD700] transition duration-300"
            >
              Cart
            </Link>
          </li> */}
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
