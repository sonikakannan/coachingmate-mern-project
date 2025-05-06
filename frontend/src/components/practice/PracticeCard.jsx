import React from "react";
import { Link } from "react-router-dom";

const PracticeCard = ({ src, label, link }) => {
  return (
    <Link
      to={link}
      className="relative h-72 overflow-hidden rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
    >
      <img src={src} alt={label} className="w-full h-full object-cover" />
      <div className="absolute inset-0  flex m-16">
        <p className="text-white text-xl font-semibold">{label}</p>
      </div>
    </Link>
  );
};

export default PracticeCard;
