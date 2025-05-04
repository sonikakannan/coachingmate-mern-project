import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../redux/api/courseApi';
import QuestionCard from '../components/practice/quiz/QuestionCard';
import ResultSummary from '../components/practice/quiz/ResultSummary';


const QuizSummaryPage = () => {
  const { quizid } = useParams();
  const { data, isLoading, isError } = useGetCourseByIdQuery(quizid);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (isLoading) return <div className="text-center mt-10 text-lg font-medium">Loading quiz...</div>;
  if (isError || !data) return <div className="text-center mt-10 text-red-600 text-lg font-medium">Failed to load quiz.</div>;

  const quiz = data.quiz || [];
  const currentQuiz = quiz[currentIndex];
  const correctAnswer = currentQuiz?.correctAns;

  const handleOptionClick = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentIndex]: option });
    setClicked(true);
  };

  const handleNavigation = (direction) => {
    setCurrentIndex((prev) => prev + direction);
    setClicked(false);
  };

  const correctCount = Object.entries(selectedOptions).filter(
    ([index, answer]) => quiz[+index]?.correctAns === answer
  ).length;

  if (showResult) {
    return (
      <ResultSummary
        courseTitle={data.courseTitle}
        correctCount={correctCount}
        totalQuestions={quiz.length}
        quiz={quiz}
        selectedOptions={selectedOptions}
      />
    );
  }
  

  return (
    <div className="min-h-screen bg-indigo-100 p-6 max-h-screen overflow-y-scroll">
     
      <QuestionCard
        currentIndex={currentIndex}
        totalQuestions={quiz.length}
        questionData={currentQuiz}
        progress={((currentIndex + 1) / quiz.length) * 100}
        selected={selectedOptions[currentIndex]}
        correctAnswer={correctAnswer}
        clicked={clicked}
        onOptionClick={handleOptionClick}
        onNext={() => handleNavigation(1)}
        onFinish={() => setShowResult(true)}
      />
    </div>
  );
};

export default QuizSummaryPage;