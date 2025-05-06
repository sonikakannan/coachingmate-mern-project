import React from "react";

const FlashCard = ({ flashcard }) => {
  return (
    <div className="card-container mb-4">
      <div className="card h-96 w-80 bg-white rounded-lg shadow-md flex flex-col justify-center items-center p-4">
        <div className="card-front text-lg font-medium text-center">
          <p>{flashcard.front}</p>
        </div>
        <div className="card-back text-sm text-gray-600 text-center">
          <p>{flashcard.back}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
