import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const QuestionCard = ({
  currentIndex,
  totalQuestions,
  questionData,
  progress,
  selected,
  correctAnswer,
  clicked,
  onOptionClick,
  onNext,
  onFinish,
}) => {
  const getOptionStyle = (option) => {
    if (clicked) {
      if (option === correctAnswer) return "bg-green-200 border-green-600";
      if (option === selected && selected !== correctAnswer)
        return "bg-red-200 border-red-600";
    }
    return "bg-white hover:bg-indigo-50";
  };

  return (
    <div className=" p-6  max-w-2xl md:max-w-5xl mx-auto">
      <div className="mb-4">
        <div className="text-sm flex justify-between py-1 text-gray-600 mb-1">
          <Link to={"/practice/quiz"}>
            <FaArrowLeftLong className="text-2xl cursor-pointer " />
          </Link>
          <p>
            Question {currentIndex + 1} of {totalQuestions}
          </p>
        </div>
        <div className="w-full h-3 bg-gray-300 rounded">
          <div
            className="h-3 bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white rounded-md p-8 ">
        <div className="text-xl font-bold  text-gray-800 mb-4">
          {questionData?.question}
        </div>
        <ul className="space-y-3 ">
          {questionData?.options?.map((option, idx) => (
            <li
              key={idx}
              className={`p-4 rounded border border-indigo-500 text-indigo-700 cursor-pointer text-lg font-medium ${getOptionStyle(
                option
              )}`}
              onClick={() => onOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>

        <div className="flex justify-end mt-6">
          <button
            onClick={currentIndex === totalQuestions - 1 ? onFinish : onNext}
            disabled={!selected}
            className="px-6 py-3 bg-indigo-600 text-white text-lg font-medium cursor-pointer rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
