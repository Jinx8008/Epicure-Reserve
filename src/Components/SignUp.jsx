import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import "./SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        toast.error(`❌ ${getErrorMessage(error.message)}`);
        return;
      }

      toast.success("✅ Account created! Check your email for verification.");
      setFullName("");
      setEmail("");
      setPassword("");

      navigate("/"); 
    } catch (error) {
      toast.error("❌ Something went wrong. Try again.");
      console.error("Signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const redirectTo = "https://epicure-reserve.netlify.app"; // updated redirect
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Google signup error:", error.message);
      toast.error("❌ Google signup failed. Try again.");
    }
  };

  const getErrorMessage = (message) => {
    if (message.includes("already registered")) return "Email is already registered.";
    if (message.includes("Invalid login credentials")) return "Enter a valid email.";
    if (message.includes("Password should be at least")) return "Password should be at least 6 characters.";
    return "Something went wrong. Try again.";
  };

  return (
  <>
    <Navbar />    
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">👤</div>
          <h2>Create Your Account</h2>
          <p>Join us to start your culinary journey</p>
        </div>

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-btn primary" disabled={loading}>
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="auth-btn google" onClick={handleGoogleSignup}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="google-icon"
          />
          Sign up with Google
        </button>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default SignUp;