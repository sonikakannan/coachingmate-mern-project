import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Add this at the top
import coin from "../assets/images/coin.png";

const Navbar = ({ onMenuClick }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="py-4 px-6 text-indigo-800 flex items-center justify-between">
      {/* Menu Icon on small screens */}
      <div className="md:hidden ">
        <button onClick={onMenuClick}>
          <FaBars size={24} className="cursor-pointer" />
        </button>
      </div>

      <div className="flex justify-end items-center flex-1">
        {user ? (
          <div className="flex gap-6 items-center ">
            <p className="text-lg font-semibold flex items-center gap-2">
              <img src={coin} alt="coin" width={50} height={50} />
              <span>{user.creditPoints} Credits Left</span>
            </p>
            <Link to="/paymentpage">
              <button className="bg-indigo-600 text-white rounded-md px-4 py-2  text-sm sm:text-lg font-semibold cursor-pointer hover:bg-indigo-700">
                Buy Credits
              </button>
            </Link>
          </div>
        ) : (
          <span>Please log in.</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
