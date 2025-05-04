import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import book from "../assets/images/book.png";
import { imageAssets } from "../data/Options";
import { IoBookOutline } from "react-icons/io5";
import { useGetAllCoursesQuery } from "../redux/api/courseApi";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllCoursesQuery();
  const [completedChapters, setCompletedChapters] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem("completedChapters")) || {};
    setCompletedChapters(storedProgress);

    const storedBanners = JSON.parse(localStorage.getItem("courseBanners")) || {};
    if (data?.courses) {
      const updatedCourses = data.courses.map((course) => {
        if (!storedBanners[course._id]) {
          const bannerKeys = Object.keys(imageAssets);
          const randomKey = bannerKeys[Math.floor(Math.random() * bannerKeys.length)];
          storedBanners[course._id] = randomKey;
        }
        return {
          ...course,
          banner_image: storedBanners[course._id],
        };
      });
      localStorage.setItem("courseBanners", JSON.stringify(storedBanners));
      setCourses(updatedCourses);
    }
  }, [data]);

  const handleCourseClick = (course) => {
    navigate(`/course-view/${course._id}`);
  };

  return (
    <div className="px-8 bg-indigo-100 min-h-screen max-h-screen overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Your Courses</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load courses.</p>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={book} alt="book image" width={250} height={250} />
          <h1 className="text-2xl font-semibold">You Don't Have Any Course</h1>
          <Link
            to={"/create-course"}
            className="mt-4 px-6 py-3 font-semibold border border-indigo-600 text-indigo-500 rounded-md hover:bg-indigo-700 hover:text-white transition w-full max-w-2xl cursor-pointer text-center"
          >
            +Create New Course
          </Link>
          <Link
            to={"/explore-course"}
            className="mt-4 px-6 py-4 font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition w-full max-w-2xl cursor-pointer text-center"
          >
            Explore Course
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const completedCount = completedChapters[course._id]?.length || 0;
            const totalChapters = course.chapters.length || 0;
            const progress = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;

            return (
              <div
                key={index}
                onClick={() => handleCourseClick(course)}
                className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden p-5 cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={imageAssets[course.banner_image]}
                  alt="Course Banner"
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{course.courseTitle}</h2>
                  <p className="flex items-center gap-2">
                    <IoBookOutline className="text-lg text-indigo-500" />
                    <span>
                      {completedCount}/{totalChapters} chapters
                    </span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{progress.toFixed(0)}% completed</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;