import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLevel,
  toggleTopic,
  setCourseData,
  resetCourse,
  setTopics,
} from "../redux/slices/courseSlice";
import {
  useGenerateTopicsMutation,
  useGenerateCourseMutation,
} from "../redux/api/courseApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateCredits } from "../redux/slices/authSlice";

const CreateCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedLevel, selectedTopics, topics } = useSelector(
    (state) => state.course
  );
  const user = useSelector((state) => state.auth.user);

  const [heading, setHeading] = useState("");
  const [generateTopics, { isLoading: loadingTopics }] =
    useGenerateTopicsMutation();
  const [generateCourse, { isLoading: loadingCourse }] =
    useGenerateCourseMutation();

  const handleGenerateTopics = async () => {
    if (!heading.trim()) {
      toast.error("Please enter a course heading");
      return;
    }
    try {
      const response = await generateTopics({
        heading,
        level: selectedLevel,
      }).unwrap();
      const rawText = response.resl;
      const jsonText = rawText.match(/```json\n([\s\S]+?)\n```/);
      const parsedTopics = jsonText
        ? JSON.parse(jsonText[1])
        : JSON.parse(rawText);
      dispatch(setTopics(parsedTopics));
    } catch (error) {
      console.error("Topic generation failed", error);
      toast.error("Failed to generate topics");
    }
  };

  const handleGenerateCourse = async () => {
    if (user?.creditPoints <= 0) {
      toast.error("You have no credits left. Please buy more.");
      return;
    }

    try {
      const res = await generateCourse({ topics: selectedTopics }).unwrap();
      dispatch(setCourseData(res));
      dispatch(updateCredits(user.creditPoints - 1));
      toast.success("Course generated successfully");

      // ✅ Reset input fields
      setHeading("");
      dispatch(resetCourse());

      navigate("/");
    } catch (error) {
      console.error("Course generation failed", error);
      toast.error("Course generation failed");
    }
  };

  return (
    <div className="relative bg-indigo-100 min-h-screen flex flex-col items-center overflow-y-auto">
      <div className="max-w-4xl px-8 py-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          Create New Course
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 tracking-wide">
          What do you want to learn today?
        </h2>
        <p className="text-gray-600 mb-4">
          What course do you want to create (e.g., Learn Python, Digital
          Marketing, 10th Science Chapters, etc.)
        </p>

        <textarea
          rows={3}
          className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="e.g., Learn Python"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />

        <div className="flex gap-3 overflow-x-auto pb-2 mt-4">
          {["Basic", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => dispatch(setLevel(level))}
              className={`px-4 py-2 min-w-max rounded-full border font-semibold transition ${
                selectedLevel === level
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerateTopics}
          disabled={loadingTopics}
          className="mt-4 px-6 py-3 font-semibold border border-indigo-600 text-indigo-500 rounded-md hover:bg-indigo-700 hover:text-white transition w-full cursor-pointer flex justify-center items-center"
        >
          {loadingTopics ? (
            <span className="flex items-center gap-2">
              <span className="loader"></span> Generating...
            </span>
          ) : (
            "Generate Topics"
          )}
        </button>

        {topics.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select topics which you want to add in the course
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {topics.map((topic, idx) => (
                <div
                  key={idx}
                  onClick={() => dispatch(toggleTopic(topic))}
                  className={`border rounded-full py-2 px-4 text-sm font-medium transition cursor-pointer w-fit ${
                    selectedTopics.includes(topic)
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white text-indigo-700 border-indigo-500 hover:bg-indigo-100"
                  }`}
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTopics.length > 0 && (
          <button
            onClick={handleGenerateCourse}
            disabled={loadingCourse || user?.creditPoints <= 0}
            className={`mt-6 px-6 py-4 font-semibold rounded-md transition w-full flex justify-center items-center ${
              user?.creditPoints <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loadingCourse ? (
              <span className="flex items-center gap-2">
                <span className="loader"></span> Generating Course...
              </span>
            ) : user?.creditPoints <= 0 ? (
              "No Credits Left"
            ) : (
              "Generate Course"
            )}
          </button>
        )}
      </div>

      {/* 🔵 Spinner Styles */}
      <style>
        {`
          .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #4f46e5;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default CreateCoursePage;
