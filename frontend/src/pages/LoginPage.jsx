import React, { useState } from "react";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response));
      localStorage.setItem("userId", response._id); 
      localStorage.setItem("token", response.token); // Save the token
      toast.success("Login successfully!");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center bg-[#ecf2ec] p-3 rounded-md">
            <HiOutlineMail className="text-indigo-600 text-xl mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="bg-transparent outline-none flex-1"
              required
            />
          </div>

          <div className="flex items-center bg-[#ecf2ec] p-3 rounded-md">
            <GoLock className="text-indigo-600 text-xl mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="bg-transparent outline-none flex-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 cursor-pointer text-white py-2 rounded-md hover:bg-indigo-600 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          <p className="text-gray-600 text-center">
            Don&apos;t have an account?
            <Link to="/signup">
              <span className="underline text-indigo-800 cursor-pointer ml-1">Signup</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;