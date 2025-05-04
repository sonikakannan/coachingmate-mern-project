import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../redux/api/courseApi";
import { FaArrowLeftLong } from "react-icons/fa6";

const MCQSummaryPage = () => {
  const { qaid } = useParams();
  const { data, isLoading, isError } = useGetCourseByIdQuery(qaid);
  const [showAnswer, setShowAnswer] = useState(null);

  if (isLoading) return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500 text-lg">Error loading data.</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
         <Link to={'/practice/mcq'}><div className="p-3">
                        <FaArrowLeftLong className=" text-indigo-600 text-2xl cursor-pointer " />
                      </div></Link>
      <h1 className="text-3xl font-extrabold text-indigo-700  text-center">MCQ Summary</h1>
      <p className="text-center text-gray-500 mb-10">Click on a question to view the answer</p>

      {data.qa.map((item, index) => (
        <div
          key={item._id}
          className="mb-4 rounded-xl overflow-hidden border  border-indigo-200 shadow hover:shadow-lg transition duration-300"
        >
          <button
            onClick={() => setShowAnswer(index === showAnswer ? null : index)}
            className="w-full text-left p-5 bg-indigo-50 hover:bg-indigo-100 text-lg font-medium text-indigo-900 transition-all"
          >
            {index + 1}. {item.question}
          </button>
          {showAnswer === index && (
            <div className="p-5 bg-white text-gray-800 border-t border-indigo-100 text-base leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MCQSummaryPage;
