import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-blue-500 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left: Hamburger Menu (Mobile Only) */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Company Name (Left in md & lg, Center in sm) */}
        <div className="flex-1 md:flex-none md:w-auto text-center md:text-left">
          <Link to="/" className="text-xl font-bold hover:text-gray-200 transition">
            BeyondMyCampus
          </Link>
        </div>

        {/* Navigation Links (Centered in md & lg) */}
        <div className="hidden md:flex flex-1 justify-center gap-12 space-x-6 text-lg">
          {["Home", "Teams", "Resources", "Opportunities", "Profile"].map((item) => (
            <li key={item} className="list-none">
              <Link to={`/${item.toLowerCase()}`} className="hover:text-gray-200 transition">
                {item}
              </Link>
            </li>
          ))}
        </div>

        {/* Right: Login / Dashboard Button */}
        <div>
          {user ? (
            <Link to="/dashboard" className="text-xl font-bold">You</Link>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)} 
              className="bg-white text-sky-500 px-4 py-2 rounded-md font-semibold shadow-lg hover:bg-gray-200 transition">
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-sky-600 p-6 shadow-lg rounded-b-lg">
          <ul className="flex flex-col space-y-4 text-center">
            {["Home", "Teams", "Resources", "Opportunities", "Profile"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="text-lg hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </nav>
  );
};

export default Navbar;
