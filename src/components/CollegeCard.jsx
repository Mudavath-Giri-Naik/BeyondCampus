import React from "react";

const CollegeCard = ({ college, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img src={college.image} alt={college.name} className="w-full h-40 object-cover rounded-t-lg" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{college.name}</h3>
      </div>
    </div>
  );
};

export default CollegeCard;
