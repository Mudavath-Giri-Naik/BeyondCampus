import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const auth = getAuth();

export const sendEmailOTP = async (email) => {
  try {
    const actionCodeSettings = {
      url: "http://localhost:5173/auth", // Change this to your deployed domain
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("Failed to send OTP. Try again.");
  }
};

export const verifyEmailOTP = async () => {
  try {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const storedEmail = window.localStorage.getItem("emailForSignIn");
      if (storedEmail) {
        await signInWithEmailLink(auth, storedEmail, window.location.href);
        window.localStorage.removeItem("emailForSignIn");
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    throw new Error("Invalid OTP or expired link.");
  }
};
