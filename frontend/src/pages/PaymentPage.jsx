import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateCredits } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom"; // For navigation

const BASE_URL = "https://coachingmate-backend.onrender.com/api"


const plans = [
  {
    title: "Starter Plan",
    credits: 3,
    features: [
      "Limited to 3 course generation at a time",
      "Basic course types",
      "Limited practice",
    ],
    price: 500, // Price in cents (e.g., $5.00)
  },
  {
    title: "Pro Plan",
    credits: 10,
    features: [
      "Generate up to 10 courses at a time",
      "Includes intermediate course types",
      "Moderate practice access",
    ],
    price: 1500, // Price in cents (e.g., $15.00)
  },
  {
    title: "Ultimate Plan",
    credits: 20,
    features: [
      "Unlimited course generations",
      "All course types included",
      "Full practice & analytics access",
    ],
    price: 3000, // Price in cents (e.g., $30.00)
  },
];

const PaymentPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handlePlanSelection = async (plan) => {
    if (!user) {
      console.error("User is not logged in");
      navigate("/login"); // Redirect to login page if user is not authenticated
      return;
    }

    try {
      // Create a checkout session
      const response = await axios.post(
        `${BASE_URL}/stripe/create-checkout-session`,
        {
          price: plan.price,
          title: plan.title,
          userId: user._id,
          credits: plan.credits,
        }
      );

      window.location.href = response.data.url;

      // Simulate successful payment
      // For production, listen to a webhook or success callback
      const updatedCredits = user.creditPoints + plan.credits;
      await axios.post(`${BASE_URL}/auth/update-credits`, {
        userId: user._id,
        creditPoints: updatedCredits,
      });
      dispatch(updateCredits(updatedCredits));
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        Choose Your Plan
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-lg p-6 bg-indigo-50 border border-indigo-200 transition-transform hover:scale-105 min-h-[420px] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-indigo-800">
                {plan.title}
              </h2>
              <p className="text-xl font-bold text-indigo-600 mb-4">
                ${plan.price / 100}
              </p>
              <ul className="space-y-3 text-base text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-indigo-600 mr-2 mt-1">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition"
              onClick={() => handlePlanSelection(plan)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;
