import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../redux/api/courseApi';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ResultSummary from '../components/practice/flashcard/ResultSummary';
import FlashCard from '../components/practice/flashcard/Flashcard';


const FlashCardSummaryPage = () => {
  const { summaryid } = useParams();
  const { data, isLoading, isError } = useGetCourseByIdQuery(summaryid);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  if (isLoading) {
    return <div className="text-center mt-10 text-lg font-medium">Loading flashcards...</div>;
  }

  if (isError || !data) {
    return <div className="text-center mt-10 text-red-600 text-lg font-medium">Failed to load flashcards.</div>;
  }

  const flashcards = data.flashcards || [];
  const currentFlashcard = flashcards[currentIndex];
  const isLastCard = currentIndex === flashcards.length - 1;

  const handleAnswer = (isCorrect) => {
    setAnswers({ ...answers, [currentIndex]: isCorrect });
  };

  const handleNext = () => {
    if (!isLastCard) setCurrentIndex((prev) => prev + 1);
  };

  const handleFinish = () => {
    setShowSummary(true);
  };

  const correctCount = Object.values(answers).filter(val => val === true).length;
  const wrongCount = Object.values(answers).filter(val => val === false).length;

  const hasAnswered = answers.hasOwnProperty(currentIndex);
  const progress = ((currentIndex + (hasAnswered ? 1 : 0)) / flashcards.length) * 100;

  if (showSummary) {
    return (
      <ResultSummary
        courseTitle={data.courseTitle} 
        correctCount={correctCount} 
        wrongCount={wrongCount} 
        total={flashcards.length} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-indigo-100 p-6">
      <div className='flex justify-between items-center'>
        <Link to={'/practice/flashcard'}>
          <div className="p-3">
            <FaArrowLeftLong className="text-indigo-600 text-2xl cursor-pointer" />
          </div>
        </Link>
        <p className="mr-14 text-gray-700 text-sm">
          Card {currentIndex + 1} of {flashcards.length}
        </p>
      </div>
      <div className='flex flex-col items-center'>
      <div className="w-full max-w-xl bg-gray-300 rounded-full h-4 mb-6 overflow-hidden">
      <div
        className="bg-indigo-600 h-4 transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Flashcard Summary</h1>
        <FlashCard flashcard={currentFlashcard} />
        <div className="flex gap-4 my-6">
          <button
            className="bg-green-500 cursor-pointer text-white px-4 py-3 rounded hover:bg-green-600"
            onClick={() => handleAnswer(true)}
          >
            Mark as Correct
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-4 py-3 rounded"
            onClick={() => handleAnswer(false)}
          >
            Mark as Wrong
          </button>
        </div>
        <div>
          {!isLastCard ? (
            <button
              className={`px-6 py-3 rounded text-white ${
                hasAnswered
                  ? 'bg-indigo-600 cursor-pointer hover:bg-indigo-700'
                  : 'bg-indigo-300 cursor-not-allowed'
              }`}
              onClick={handleNext}
              disabled={!hasAnswered}
            >
              Next
            </button>
          ) : (
            <button
              className={`px-5 py-3 rounded text-white ${
                hasAnswered
                  ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                  : 'bg-indigo-300 cursor-not-allowed'
              }`}
              onClick={handleFinish}
              disabled={!hasAnswered}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashCardSummaryPage;