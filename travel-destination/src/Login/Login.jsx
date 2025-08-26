import React, { useState } from "react";
import "./login.css";

function Login({ onSwitchToSignup, onSwitchToForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container-modal">
      <div className="input-box">
        <i className="fas fa-envelope"></i>
        <input type="email" placeholder="Email" required />
      </div>

      <div className="input-box">
        <i className="fas fa-lock"></i>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
        />
         <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
      </div>

      <div className="options">
        <label>
          <input type="checkbox" /> Remember Me
        </label>
        {/* Open Forgot Password Modal */}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToForgotPassword(); }}>Forgot Password?</a>
      </div>

      <button className="login-btn">Login</button>

      <div className="social-login">
        <p>Or Login with</p>
        <div className="social-icons">
          <i className="fab fa-google"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>

      <div className="signup-link">
        Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>Sign up here</a>
      </div>
    </div>
  );
}

export default Login;
