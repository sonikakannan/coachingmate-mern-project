import React from "react";
import { useGetUserCoursesQuery } from "../redux/api/courseApi";
import { Link } from "react-router-dom";
import qa from "../assets/images/qa.png";
import { FaArrowLeftLong } from "react-icons/fa6";

const MCQPage = () => {
  const userId = localStorage.getItem("userId");
  const { data, isLoading, isError } = useGetUserCoursesQuery(userId);

  if (isLoading)
    return (
      <div className="text-center mt-10 text-lg font-medium">
        Loading courses...
      </div>
    );
  if (isError)
    return (
      <div className="text-center mt-10 text-red-600 text-lg font-medium">
        Failed to load courses.
      </div>
    );

  const courses = Array.isArray(data?.courses) ? data.courses : [];
  // Filter courses that contain MCQs (in 'qa' field)
  const userCoursesWithMCQs = courses.filter(course => course.qa && course.qa.length > 0);

  return (
    <div className="min-h-screen bg-indigo-50 px-4 py-6 mx-4">
      <Link to={'/practice'}>
        <div className="p-3">
          <FaArrowLeftLong className="text-indigo-600 text-2xl cursor-pointer" />
        </div>
      </Link>

      <div className="grid gap-6 grid-cols-2 text-center lg:grid-cols-3 mx-5 md:mx-auto">
        {userCoursesWithMCQs.length > 0 ? (
          userCoursesWithMCQs.map((course, index) => (
            <Link to={`/practice/mcq/mcq-summary/${course._id}`} key={index}>
              <div className="bg-indigo-100 h-72 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                <img
                  src={qa}
                  alt="question"
                  className="w-full h-36 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.courseTitle}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No MCQs found
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQPage;
