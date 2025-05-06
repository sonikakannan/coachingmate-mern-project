import React from "react";
import PracticeCard from "../components/practice/PracticeCard";
import quizz from "../assets/images/quizz.png";
import flashcard from "../assets/images/flashcard.png";
import notes from "../assets/images/notes.png";

const items = [
  { src: quizz, label: "Quiz", link: "/practice/quiz" },
  { src: flashcard, label: "Flashcard", link: "/practice/flashcard" },
  { src: notes, label: "MCQ", link: "/practice/mcq" },
];

const PracticePage = () => {
  return (
    <div className="flex flex-wrap md:grid md:grid-cols-3 gap-10 justify-center p-6 mx-auto  max-w-2xl md:max-w-4xl lg:max-w-6xl min-h-screen max-h-screen overflow-y-scroll">
      {items.map((item, index) => (
        <PracticeCard
          key={index}
          src={item.src}
          label={item.label}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default PracticePage;
