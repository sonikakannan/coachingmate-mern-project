import React from 'react';
import { useGetAllCoursesQuery } from '../redux/api/courseApi';
import { Link } from 'react-router-dom';
import quiz from '../assets/images/quiz.png';
import { FaArrowLeftLong } from "react-icons/fa6";


const QuizPage = () => {
  const { data, isLoading, isError } = useGetAllCoursesQuery();

  if (isLoading) return <div className="text-center mt-10 text-lg font-medium">Loading courses...</div>;
  if (isError) return <div className="text-center mt-10 text-red-600 text-lg font-medium">Failed to load courses.</div>;

  const courses = Array.isArray(data?.courses) ? data.courses : [];
  console.log(data);
  

  return (
    <div className="min-h-screen bg-indigo-50 px-4 py-2">
      <Link to={'/practice'}><div className="p-3">
        <FaArrowLeftLong className=" text-indigo-600 text-2xl cursor-pointer " />
      </div></Link>

 <div className="grid gap-6 grid-cols-2  text-center lg:grid-cols-3  mx-5 md:mx-auto">
        {courses.length > 0 ? (
          courses.map((course, index) => (
<Link to={`/practice/quiz/quiz-summary/${course._id}`} key={index}>
<div className="bg-indigo-200 p-4 rounded-xl h-72  shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                <img
                  src={quiz}
                  alt="quiz"
                  className="w-full h-36 object-contain mb-4 "
                />
                <h3 className="text-lg text-indigo-700 font-semibold ">{course.courseTitle}</h3>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">No courses found</div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
