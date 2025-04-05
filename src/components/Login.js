import React from "react";
import { auth, googleAuthProvider } from "../authService";
import { signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import '../styles/Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
        console.log("User logged in:", user);
        // Update user in AuthContext
        login(user);
        // Redirect to /task-page after successful login
        navigate("/task-page");
      })
      .catch((error) => {
        // Handle login error
        console.error("Login error:", error);
      });
  };

  return (
    <>
    <h1 className="heading">Task-Mananger (edify Assignment by Virendra kumar)</h1>
    <div className="login-container">
      <div className="login-card">
        <h2>Sign In</h2>
        <button className="sign-in-button" onClick={handleGoogleLogin}>Sign in with Google</button>
      </div>
    </div>
    </>
  );
};

export default Login;
