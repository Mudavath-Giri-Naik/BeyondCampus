import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { sendEmailOTP, verifyEmailOTP } from "../utils/emailOTP";
import { Eye, EyeOff, X } from "lucide-react";

const allowedDomains = ["mvgrce.edu.in", "iit.ac.in"];

const AuthModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isCollegeEmail = (email) => {
    return allowedDomains.some((domain) => email.endsWith(`@${domain}`));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!isCollegeEmail(email)) {
      setError("Only college emails are allowed.");
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Signup successful! Verify your email.");
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

  const handleSendOTP = async () => {
    if (!isCollegeEmail(email)) {
      setError("Only college-associated emails are allowed.");
      return;
    }

    try {
      await sendEmailOTP(email);
      setOtpSent(true);
      setSuccessMessage("OTP sent! Check your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const verified = await verifyEmailOTP();
      if (verified) {
        setSuccessMessage("Email verified successfully!");
        setOtpSent(false);
      } else {
        setError("Invalid OTP. Try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <X size={26} />
        </button>

        <h2 className="text-2xl font-bold text-sky-600 text-center mb-6">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center mb-2">{successMessage}</p>}

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="College Email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="absolute inset-y-0 right-4 flex items-center" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full py-3 rounded-md bg-sky-500 text-white font-semibold text-lg hover:bg-sky-600">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <button onClick={handleForgotPassword} className="text-sm text-red-500 hover:underline mt-2 block text-center">
          Forgot Password?
        </button>

        {otpSent ? (
          <div className="mt-4">
            <p className="text-gray-600 text-sm">Check your email and click the link to verify.</p>
            <button onClick={handleVerifyOTP} className="w-full py-3 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Verify Email
            </button>
          </div>
        ) : (
          <button onClick={handleSendOTP} className="text-sm text-sky-500 hover:underline mt-4 block text-center">
            Verify Email with OTP
          </button>
        )}

      </div>
    </div>
  );
};

export default AuthModal;
