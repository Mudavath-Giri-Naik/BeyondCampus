import React from "react";
import { Link } from "react-router-dom";

const defaultCollegeImage = "https://as2.ftcdn.net/v2/jpg/04/98/14/49/1000_F_498144940_DkzvRAkgBv1ILU6DiDeMZr6vUufPOra4.jpg";

const colleges = [
  { id: 1, name: "Harvard University", location: "Cambridge, MA", image: defaultCollegeImage },
  { id: 2, name: "MIT", location: "Cambridge, MA", image: defaultCollegeImage },
  { id: 3, name: "Stanford University", location: "Stanford, CA", image: defaultCollegeImage },
  { id: 4, name: "University of Oxford", location: "Oxford, England", image: defaultCollegeImage },
  { id: 5, name: "California Institute of Technology (Caltech)", location: "Pasadena, CA", image: defaultCollegeImage },
  { id: 6, name: "Yale University", location: "New Haven, CT", image: defaultCollegeImage }
];

const Home = () => {
  return (
    <div className="min-h-screen  p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">Find Top Students</h1>
      <p className="text-center text-gray-600 mt-2">Discover the best talent from top universities</p>

      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search for colleges..."
          className="w-2/3 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {colleges.map((college) => (
          <Link to={`/college/${college.id}`} key={college.id} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={college.image} alt={college.name} className="w-full h-40 object-cover" onError={(e) => e.target.src = defaultCollegeImage} />
              <div className="p-4 text-center font-bold">
                {college.name}
                <p className="text-sm text-gray-600">{college.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
