import React from "react";
import { Link, useParams } from "react-router-dom";

const colleges = [
  { name: "MIT", city: "Cambridge", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1920px-MIT_logo.svg.png", image: "https://images.unsplash.com/photo-1576495199018-85e9b22e1e92" },
  { name: "Stanford University", city: "Stanford", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Stanford_University_seal_2003.svg", image: "https://images.unsplash.com/photo-1526243741027-88c29e4b2b28" },
  { name: "Harvard University", city: "Cambridge", logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg", image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664" },
  { name: "Oxford University", city: "Oxford", logo: "https://upload.wikimedia.org/wikipedia/en/d/da/University_of_Oxford_coat_of_arms.svg", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" },
  { name: "IIT Bombay", city: "Mumbai", logo: "https://upload.wikimedia.org/wikipedia/en/0/00/IIT_Bombay_Logo.svg", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d" },
  { name: "NUS Singapore", city: "Singapore", logo: "https://upload.wikimedia.org/wikipedia/en/b/b1/National_University_of_Singapore_logo.svg", image: "https://images.unsplash.com/photo-1560264641-bbf9b6b00c6c" }
];

const students = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  rank: i + 1,
  image: Math.random() > 0.5 ? `https://www.w3schools.com/howto/img_avatar.png` : "", 
  college: colleges[i % colleges.length] 
}));

const CollegePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-500">Top 200 Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {students.map((student) => (
          <Link to={`/student/${student.id}`} key={student.id} className="block">
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img
                src={student.image || "https://www.w3schools.com/howto/img_avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div className="text-lg font-semibold mt-2">{student.name}</div>
              
              <div className="text-gray-600">{student.college.name}, {student.college.city}</div>
              <div className="text-gray-600 font-bold">Rank: {student.rank}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollegePage;
