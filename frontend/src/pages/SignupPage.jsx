import React, { useState } from "react";
import { useSignupMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData).unwrap();
      dispatch(setCredentials(response));
      localStorage.setItem("userId", response._id);
      localStorage.setItem("token", response.token);
      toast.success("Signup successfully!");
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error(
        err?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 md:w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex items-center bg-[#ecf2ec] p-3 rounded-md">
            <FaRegUser className="text-indigo-600 text-xl mr-2" />
            <input
              type="text"
              placeholder="Enter Your Name"
              className="bg-transparent outline-none flex-1"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center bg-[#ecf2ec] p-3 rounded-md">
            <HiOutlineMail className="text-indigo-600 text-xl mr-2" />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="bg-transparent outline-none flex-1"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center bg-[#ecf2ec] p-3 rounded-md">
            <GoLock className="text-indigo-600 text-xl mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              className="bg-transparent outline-none flex-1"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 cursor-pointer rounded-md hover:bg-indigo-600 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <p className="text-gray-600 text-center">
            Already have an account?
            <Link to="/login">
              <span className="underline text-indigo-800 cursor-pointer ml-1">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
