import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams";
import Resources from "./components/Resources";
import Opportunities from "./components/Opportunities";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import AuthModal from "./components/AuthModal";
import Home from "./components/Home";
import CollegePage from "./components/CollegePage";
import StudentDashboard from "./components/StudentDashboard";
import DefaultHome from "./components/DefaultHome"; // Import your DefaultHome component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUser(null);
    });
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Home /> : <DefaultHome />} 
        />
        <Route path="/teams" element={<Teams />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/college/:id" element={<CollegePage />} />
        <Route path="/student/:id" element={<StudentDashboard />} />
        
        {/* Keep existing Home route for direct access */}
        <Route 
          path="/Home" 
          element={isLoggedIn ? <Home /> : <AuthModal />} 
        />
      </Routes>
    </Router>
  );
};

export default App;