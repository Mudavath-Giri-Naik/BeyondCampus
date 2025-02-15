import React from "react";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";

const studentProfiles = {
  1: {
    linkedin: { domain: "Web Development", projects: 5, certifications: 3, workExp: 2, techCommunities: ["GDG", "MLSA"] },
    github: { repos: 12, contributions: 150, strikeRate: 80, issuesSolved: 40, commits: 300 },
    leetcode: { lang: "C++", problems: 120, topicsCovered: 10, testsAttempted: 5, competitionsWon: 2 },
  },
};

const StudentDashboard = () => {
  const { id } = useParams();
  const student = studentProfiles[id] || {
    linkedin: { domain: "AI", projects: 3, certifications: 2, workExp: 1, techCommunities: ["TensorFlow"] },
    github: { repos: 8, contributions: 90, strikeRate: 70, issuesSolved: 30, commits: 200 },
    leetcode: { lang: "Python", problems: 100, topicsCovered: 8, testsAttempted: 4, competitionsWon: 1 },
  };

  return (
    <div className="min-h-screen p-8">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <img src="https://www.w3schools.com/howto/img_avatar.png" className="w-32 h-32 mx-auto rounded-full object-cover border" alt="Student" />
        <h2 className="text-2xl font-bold mt-4">Student {id}</h2>
        <p className="text-gray-600">College: XYZ University</p>

        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-blue-500 text-2xl"><FaLinkedin /></a>
          <a href="#" className="text-gray-800 text-2xl"><FaGithub /></a>
          <a href="#" className="text-yellow-500 text-2xl"><FaCode /></a>
        </div>

        <p className="text-gray-800 font-semibold mt-3">Rank: {id}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {["LinkedIn", "GitHub", "LeetCode"].map((platform, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-center">{platform} Profile</h3>
            <table className="w-full text-sm mt-2 border-collapse border border-gray-300">
              <tbody>
                {Object.entries(student[platform.toLowerCase()]).map(([key, value], index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="p-2 font-medium">{key.replace(/([A-Z])/g, " $1")}</td>
                    <td className="p-2">{Array.isArray(value) ? value.join(", ") : value}</td>
                    <td className="p-2 text-right font-bold">{Math.floor(Math.random() * 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
