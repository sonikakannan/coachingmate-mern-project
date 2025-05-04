import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { imageAssets } from "../data/Options";
import { IoBookOutline } from "react-icons/io5";
import { FaCircleArrowLeft, FaCirclePlay } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useGetCourseByIdQuery } from "../redux/api/courseApi";
import { RWebShare } from "react-web-share";
import { IoIosSend } from "react-icons/io";

const CourseViewPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [completedChapters, setCompletedChapters] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  const { data: course, error, isLoading } = useGetCourseByIdQuery(courseId);

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem("completedChapters")) || {};
    if (course?._id) {
      setCompletedChapters(storedProgress[course._id] || []);
    }
  }, [course]);

  useEffect(() => {
    if (course?._id) {
      const storedBanners = JSON.parse(localStorage.getItem("courseBanners")) || {};
      if (!storedBanners[course._id]) {
        const bannerKeys = Object.keys(imageAssets);
        const randomKey = bannerKeys[Math.floor(Math.random() * bannerKeys.length)];
        storedBanners[course._id] = randomKey;
        localStorage.setItem("courseBanners", JSON.stringify(storedBanners));
      }
      setBannerImage(storedBanners[course._id]);
    }
  }, [course]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-indigo-600 font-semibold text-xl">Loading...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center my-10">
        <p className="text-red-500 mb-4">Failed to load course data.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="px-8 py-4 bg-gray-50/50 min-h-screen max-h-screen max-w-6xl mx-auto overflow-y-scroll mb-10">
      <Link to={"/"}>
        <FaCircleArrowLeft className="text-indigo-500 text-2xl cursor-pointer my-4" />
      </Link>
      <img
        src={imageAssets[bannerImage]}
        alt="banner"
        className="w-full h-60 object-cover rounded mb-6"
      />
     <div className="flex justify-between items-center">
     <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>
     <RWebShare 
  data={{
    title: course.courseTitle,
    text: `Check out this course: ${course.courseTitle}`,
    url: window.location.href,
  }}
>
  <button className="bg-indigo-500 text-white px-3 py-2 rounded-md cursor-pointer">
  <IoIosSend className="text-xl"/>
  </button>
</RWebShare>

     </div>
      <p className="flex items-center gap-2 text-center my-2">
        <IoBookOutline className="text-lg" />
        <span className="text-indigo-500">{course.chapters.length} chapters</span>
      </p>
      <h1 className="text-xl font-bold">Description</h1>
      <p className="text-gray-600">{course.description}</p>
      <button className="mt-6 px-6 py-4 font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer transition w-full">
        Start Now
      </button>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-2">Chapters</h1>
        {course.chapters.map((chapter) => {
          const firstContent = chapter.content?.[0];
          const isCompleted = completedChapters.includes(chapter._id);

          return (
            <Link
              key={chapter._id}
              to={
                firstContent
                  ? `/course-view/${course._id}/view-chapter/${chapter._id}/${firstContent._id}`
                  : "#"
              }
              state={{ chapter, course }}
            >
              <div className="my-4 flex justify-between items-center py-4 px-5 border border-indigo-700 rounded-lg hover:bg-indigo-400 hover:text-white text-indigo-600 cursor-pointer">
                <h2 className="font-semibold">{chapter.chapterName}</h2>
                {isCompleted ? (
                  <FaCheckCircle className="text-green-600 text-xl" />
                ) : (
                  <FaCirclePlay className="text-xl" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CourseViewPage;