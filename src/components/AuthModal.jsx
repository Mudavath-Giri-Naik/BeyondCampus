import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { X } from "lucide-react";

const AuthModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Signup successful! You can now log in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset link sent! Check your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] transform transition-all duration-300 scale-100">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition">
          <X size={26} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-sky-600 text-center mb-6 animate-fadeIn">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center mb-2">{successMessage}</p>}

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="College Email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 transition shadow-sm text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 transition shadow-sm text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-sky-500 text-white font-semibold text-lg shadow-md hover:bg-sky-600 transition duration-300 transform hover:scale-105"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <button className="text-sm text-sky-500 hover:underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
          <button className="text-sm text-red-500 hover:underline" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
