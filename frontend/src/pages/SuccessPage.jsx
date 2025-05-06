import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigate]);

  return (
    <div className="min-h-screen bg-indigo-50/50 flex items-center justify-center">
      <div className="text-center p-6 bg-white max-w-xl rounded-lg shadow-md">
        <div className="text-green-600 text-6xl mb-3 flex justify-center">
          <span role="img" aria-label="check">
            <FaCheckCircle />
          </span>
        </div>
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for your
          purchase!
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
