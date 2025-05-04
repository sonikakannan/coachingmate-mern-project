import React from 'react';
import trophy from '../../../assets/images/trophy.png';
import { Link } from 'react-router-dom';
import sad from '../../../assets/images/sad.png'

const ResultSummary = ({ courseTitle, correctCount, totalQuestions, quiz, selectedOptions }) => {
  const resultProgress = (correctCount / totalQuestions) * 100;

  const getOptionStyle = (option, correctAns) => {
    return option === correctAns
      ? 'bg-green-200 border-green-600'
      : 'bg-red-200 border-red-600';
  };

  return (
    <div className="min-h-screen bg-indigo-100 p-6 max-h-screen overflow-y-scroll">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Quiz Result</h2>

      <div className='flex flex-col items-center mx-auto bg-white shadow-md rounded-xl max-w-xl'>
       
       {resultProgress ===100? <img src={trophy} alt="trophy" className='py-3' width={100} height={100} />: <img src={sad} alt="sad" className='py-3 mt-4' width={100} height={100} />}
        <h1 className='text-2xl font-bold'>
          {resultProgress === 100 ? 'Excellent!' : 'Try Again!'}
        </h1>
        <p className='text-gray-600 font-medium py-2'>
          Your score is <span className='text-indigo-600 font-semibold'>{resultProgress}%</span> correct answers.
        </p>
        <p className='flex justify-between w-full max-w-60 font-semibold py-5 text-lg'>
          <span>Q.{totalQuestions}</span>
          <span>✅{correctCount}</span>
          <span>❌{totalQuestions - correctCount}</span>
        </p>
      </div>

      <div className="my-6">
        <Link to={'/practice/quiz'} className='w-full mx-auto max-w-2xl bg-indigo-500 text-white rounded-lg py-3 px-2 flex justify-center'>
          <button>Back To Home</button>
        </Link>
      </div>

      <div className="mt-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Summary:</h1>
        {quiz.map((question, index) => {
          const selected = selectedOptions[index];
          const correct = question.correctAns;

          return (
            <div key={index} className="my-4">
              {selected ? (
                <div
                  className={`p-4 px-6 rounded border ${getOptionStyle(selected, correct)}`}
                >
                  {selected}
                </div>
              ) : (
                <p className="text-gray-600">You did not answer this question.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultSummary;