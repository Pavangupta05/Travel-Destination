import React, { useEffect, useState } from "react";
import "./login.css";

function Login({ onSwitchToSignup, onSwitchToForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Load remembered email on mount
  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (rememberMe && email) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    // proceed with actual auth flow here
  };

  return (
    <div className="login-container-modal">
      <div className="input-box">
        <i className="fas fa-envelope"></i>
        <input
          id="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-box">
        <i className="fas fa-lock"></i>
        <input
          id="login-password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword); }}
        >
          <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
        </span>
      </div>

      <div className="options">
        <label htmlFor="remember-me">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          {" "}Remember Me
        </label>
        {/* Open Forgot Password Modal */}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToForgotPassword(); }}>Forgot Password?</a>
      </div>

      <button className="login-btn" onClick={handleLogin}>Login</button>

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
