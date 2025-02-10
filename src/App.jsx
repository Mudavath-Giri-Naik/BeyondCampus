import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams";
import Resources from "./components/Resources";
import Opportunities from "./components/Opportunities";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import AuthModal from "./components/AuthModal"; // Adjust the path if necessary
import { auth } from "./config/firebaseConfig";
import { signOut } from "firebase/auth";
import Home from "./components/Home";
import CollegePage from "./components/CollegePage";
import StudentDashboard from "./components/StudentDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    signOut(auth).then(() => setIsLoggedIn(false));
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
      <Route path="/" element={<Home />}  />
        <Route path="/teams" element={<Teams />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/college/:id" element={<CollegePage />} />
        <Route path="/student/:id" element={<StudentDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
