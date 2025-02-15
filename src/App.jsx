import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import DefaultHome from "./components/DefaultHome";

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
      <MainLayout isLoggedIn={isLoggedIn} />
    </Router>
  );
};

const MainLayout = ({ isLoggedIn }) => {
  const location = useLocation();

  // 🎨 Define gradient backgrounds with subtle grid effect
  const pageBackgrounds = {
    "/": "bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 bg-grid",
    "/teams": "h-[120px] relative bg-grid",
    "/resources": "bg-gray-50",
    "/opportunities": " h-[120px] relative bg-grid",
    "/profile": "bg-gray-50",
    "/dashboard": "bg-gray-50",
    "/auth": "bg-gray-50",
    "/college/:id": "bg-gray-50",
    "/student/:id": "bg-gray-50",
    "/Home": "h-[120px] relative bg-grid",
  };

  return (
    <div className={`min-h-screen ${pageBackgrounds[location.pathname] || "bg-white"}`}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <DefaultHome />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/college/:id" element={<CollegePage />} />
        <Route path="/student/:id" element={<StudentDashboard />} />
        <Route path="/Home" element={isLoggedIn ? <Home /> : <DefaultHome />} />
      </Routes>
    </div>
  );
};

export default App;
