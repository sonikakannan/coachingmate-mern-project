import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const ViewChapterPage = () => {
  const { courseId, chapterId, contentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { chapter, course } = location.state;
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    if (contentId) {
      const index = chapter.content.findIndex((c) => c._id === contentId);
      setCurrentContentIndex(index !== -1 ? index : 0);
    }
  }, [contentId, chapter.content]);

  const handleNavigation = (direction) => {
    const newIndex = currentContentIndex + direction;

    if (newIndex >= 0 && newIndex < chapter.content.length) {
      setCurrentContentIndex(newIndex);
      navigate(
        `/course-view/${courseId}/view-chapter/${chapter._id}/${chapter.content[newIndex]._id}`,
        { state: { chapter, course } }
      );
    }
  };

  const progress = ((currentContentIndex + 1) / chapter.content.length) * 100;

  const handleFinish = () => {
    const completedChapters = JSON.parse(localStorage.getItem("completedChapters")) || {};
    const courseProgress = completedChapters[courseId] || [];
    if (!courseProgress.includes(chapterId)) {
      courseProgress.push(chapterId);
      completedChapters[courseId] = courseProgress;
      localStorage.setItem("completedChapters", JSON.stringify(completedChapters));
    }
    navigate(`/course-view/${courseId}`);
  };

  return (
    <div className="px-8 py-4 bg-indigo-100 min-h-screen max-h-screen  overflow-y-scroll">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between items-center pt-4">
          <Link to={`/course-view/${course._id}`}>
            <FaCircleArrowLeft className="text-indigo-500 text-2xl cursor-pointer " />
          </Link>
          <p className="text-center  text-gray-600">
            {Math.round(progress)}% Completed
          </p>
        </div>

        <div className="my-3">
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">{chapter.chapterName}</h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            {chapter.content[currentContentIndex]?.explain}
          </p>
          {chapter.content[currentContentIndex]?.code && (
            <pre className="bg-gray-100 p-4 rounded">
              <code>{chapter.content[currentContentIndex]?.code}</code>
            </pre>
          )}
          {chapter.content[currentContentIndex]?.example && (
            <p className="mt-4 ">
              Ex: {chapter.content[currentContentIndex]?.example}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handleNavigation(-1)}
            disabled={currentContentIndex === 0}
            className={`px-4 py-2 rounded ${
              currentContentIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            Previous
          </button>
          <p className="text-gray-700">
            Page {currentContentIndex + 1} of {chapter.content.length}
          </p>

          {currentContentIndex === chapter.content.length - 1 ? (
            <button
              onClick={handleFinish}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
            >
              Finish
            </button>
          ) : (
            <button
              onClick={() => handleNavigation(1)}
              disabled={currentContentIndex === chapter.content.length - 1}
              className={`px-4 py-2 rounded ${
                currentContentIndex === chapter.content.length - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewChapterPage;
