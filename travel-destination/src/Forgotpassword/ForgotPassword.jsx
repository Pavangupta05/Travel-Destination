import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Password reset link sent to ${email}`);
    // You can add actual password reset logic here
  };

  return (
    <div className="forgot-container-modal">
        <h2>Forgot Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <div className="success-message">{message}</div>}
        <div className="back-to-login">
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Back to Login</a>
        </div>
    </div>
  );
}

export default ForgotPassword;

