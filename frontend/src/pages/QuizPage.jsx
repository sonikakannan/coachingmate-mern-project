import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import quiz from "../assets/images/quiz.png";
import { useGetUserCoursesQuery } from "../redux/api/courseApi";

const QuizPage = () => {
  const userId = localStorage.getItem("userId");
  const { data, error, isLoading } = useGetUserCoursesQuery(userId);

  if (isLoading)
    return (
      <div className="text-center mt-10 text-lg font-medium">
        Loading quizzes...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-600 text-lg font-medium">
        Failed to load quizzes.
      </div>
    );

  const courses = Array.isArray(data?.courses) ? data.courses : [];

  // Only show courses that have at least one quiz
  const coursesWithQuizzes = courses.filter(
    (course) => course.quiz && course.quiz.length > 0
  );

  return (
    <div className="min-h-screen bg-indigo-50 px-4 py-2">
      <Link to={"/practice"}>
        <div className="p-3">
          <FaArrowLeftLong className="text-indigo-600 text-2xl cursor-pointer" />
        </div>
      </Link>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 md:mx-auto text-center">
        {coursesWithQuizzes.length > 0 ? (
          coursesWithQuizzes.map((course, index) => (
            <Link to={`/practice/quiz/quiz-summary/${course._id}`} key={index}>
              <div className="bg-indigo-200 p-4 rounded-xl h-72 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                <img
                  src={quiz}
                  alt="quiz"
                  className="w-full h-36 object-contain mb-4"
                />
                <h3 className="text-lg text-indigo-700 font-semibold mb-2">
                  {course.courseTitle}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No quizzes found in your courses.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
