import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoGrid, IoAddCircle } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdHistory, MdLogout } from "react-icons/md";
import { FaRobot } from "react-icons/fa6";
import { useLogoutMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: <IoGrid style={{ width: "20px", height: "20px" }} />,
  },
  {
    to: "/create-course",
    label: "Create Course",
    icon: <IoAddCircle style={{ width: "20px", height: "20px" }} />,
  },
  {
    to: "/practice",
    label: "Practice",
    icon: <FaCalendarAlt style={{ width: "20px", height: "20px" }} />,
  },
  {
    to: "/ai-chatpdf",
    label: "AI ChatPdf",
    icon: <FaRobot style={{ width: "20px", height: "20px" }} />,
  },
  {
    to: "/explore",
    label: "Explore",
    icon: <MdHistory style={{ width: "20px", height: "20px" }} />,
  },
];

const SidebarLink = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `p-2 px-6 flex gap-4 items-center rounded ${
        isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
      }`
    }
  >
    <span className="w-6 h-6 md:w-5 md:h-5">{icon}</span>
    <p className="flex font-semibold text-lg">{label}</p>
  </NavLink>
);

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearCredentials());
      localStorage.removeItem("userId");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed md:relative z-50 h-screen bg-indigo-600 w-56 text-white flex-col justify-between py-5 transition-transform duration-300 ease-in-out 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex`}
    >
      {/* Close Icon for Mobile */}
      <div className="flex px-4 py-2 md:hidden">
        <button onClick={toggleSidebar}>
          <MdClose className="w-6 h-6  text-white cursor-pointer" />
        </button>
      </div>

      {/* Top Navigation */}
      <div className="flex flex-col space-y-5 pt-5 justify-center gap-3 ">
        {navItems.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Logout */}
      <div className="px-6 mt-auto">
        <button
          onClick={handleLogout}
          className="hover:bg-indigo-500 w-full flex items-center gap-2 p-2 rounded"
        >
          <MdLogout className="w-6 h-6 md:w-5 md:h-5" />
          <p className="flex font-semibold text-lg cursor-pointer">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
