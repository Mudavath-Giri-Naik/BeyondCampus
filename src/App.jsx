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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    signOut(auth).then(() => setIsLoggedIn(false));
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
      <Route path="/" element={<h1 className="text-center mt-10 text-3xl">Home Page</h1>} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
