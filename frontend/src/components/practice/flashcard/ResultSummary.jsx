import React from "react";
import trophy from "../../../assets/images/trophy.png";
import sad from "../../../assets/images/sad.png";
import { Link } from "react-router-dom";

const ResultSummary = ({ courseTitle, correctCount, wrongCount, total }) => {
  const resultProgress = (correctCount / total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 overflow-y-auto">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Flashcard Summary
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto flex flex-col items-center">
        {resultProgress === 100 ? (
          <img src={trophy} alt="trophy" className="w-28 h-28 mb-4" />
        ) : (
          <img src={sad} alt="sad" className="w-28 h-28 mb-4" />
        )}

        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">
          {resultProgress === 100 ? "Excellent!" : "Keep Practicing!"}
        </h1>

        <p className="text-gray-600 text-lg mb-4 text-center">
          Your score is{" "}
          <span className="text-indigo-600 font-bold">
            {resultProgress.toFixed(0)}%
          </span>{" "}
          correct answers.
        </p>

        <div className="text-center  rounded-lg  px-6 py-4 w-full mt-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Course: <span className="text-indigo-700">{courseTitle}</span>
          </p>
          <div className="flex justify-around text-md font-medium">
            <span className="text-green-600">✅ Correct: {correctCount}</span>
            <span className="text-red-600">❌ Wrong: {wrongCount}</span>
          </div>
        </div>
      </div>
      <div className="my-6">
        <Link
          to={"/practice/flashcard"}
          className="w-full mx-auto max-w-2xl bg-indigo-500 text-white rounded-lg py-3 px-2 flex justify-center"
        >
          <button>Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ResultSummary;
