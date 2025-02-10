import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Teams from "./components/Teams";
import Resources from "./components/Resources";
import Opportunities from "./components/Opportunities";
import Profile from "./components/Profile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login state

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
