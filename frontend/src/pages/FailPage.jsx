import React, { useEffect } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FailPage = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigate]);
  return (
     <div className="min-h-screen bg-indigo-50/50 flex items-center justify-center">
          <div className="text-center p-6 bg-white max-w-xl rounded-lg shadow-md">
            <div className="text-red-600 text-6xl mb-3 flex justify-center">
              <span role="img" aria-label="check">
              <FaCircleXmark />
              </span>
            </div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Failed</h1>
            <p className="text-xl text-gray-600 mb-6">
            Unfortunately, your payment could not be processed. Please try again later.            </p>
          </div>
        </div>
  );
};

export default FailPage;
