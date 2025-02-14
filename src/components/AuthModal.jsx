import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Eye, EyeOff, X } from "lucide-react";

const allowedDomains = ["mvgrce.edu.in", "iit.ac.in", ""];

const AuthModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidDomain = (email) => allowedDomains.some(domain => email.endsWith(`@${domain}`));

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (isSignup && !isValidDomain(email)) {
      setError("Only institutional emails are allowed for signup");
      return;
    }

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with name
        await updateProfile(userCredential.user, { displayName: name });
        
        // Send verification email
        await sendEmailVerification(userCredential.user);
        
        setSuccessMessage("Verification email sent! Please check your inbox.");
        setTimeout(onClose, 5000);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Check if email is verified
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in");
          await auth.signOut();
          return;
        }
        
        onClose();
      }
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your registered email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset link sent to your email");
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <X size={26} />
        </button>

        <h2 className="text-2xl font-bold text-sky-600 text-center mb-6">
          {isSignup ? "Student Registration" : "Student Login"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center mb-2">{successMessage}</p>}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 text-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Institutional Email"
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
            <button 
              type="button" 
              className="absolute inset-y-0 right-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full py-3 rounded-md bg-sky-500 text-white font-semibold text-lg hover:bg-sky-600">
            {isSignup ? "Register" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsSignup(!isSignup)}
            className="text-sky-600 hover:underline text-sm"
          >
            {isSignup ? "Already have an account? Login" : "New student? Create account"}
          </button>
        </div>

        {!isSignup && (
          <button onClick={handleForgotPassword} className="text-sm text-red-500 hover:underline mt-2 block text-center w-full">
            Forgot Password?
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthModal;