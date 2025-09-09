import React, { useState, useEffect } from "react";
import "./Signup.css";

function Signup({ onSwitchToLogin }) {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    agreeToTerms: false,
    newsletter: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: "",
    color: ""
  });

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push("At least 8 characters");

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("Lowercase letter");

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("Uppercase letter");

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push("Number");

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push("Special character");

    let strengthText = "";
    let strengthColor = "";

    if (score === 0) {
      strengthText = "Very Weak";
      strengthColor = "strength-weak";
    } else if (score <= 2) {
      strengthText = "Weak";
      strengthColor = "strength-weak";
    } else if (score === 3) {
      strengthText = "Fair";
      strengthColor = "strength-fair";
    } else if (score === 4) {
      strengthText = "Good";
      strengthColor = "strength-good";
    } else {
      strengthText = "Strong";
      strengthColor = "strength-strong";
    }

    return { score, text: strengthText, color: strengthColor, feedback };
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Check password strength
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Date of Birth validation
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        newErrors.dateOfBirth = "You must be at least 13 years old";
      }
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
      };

      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data && data.status === "ok") {
        setSuccessMessage("Account created successfully!");
      } else {
        setErrors({ submit: data?.error || "Registration failed" });
        return;
      }
      
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        agreeToTerms: false,
        newsletter: false
      });
      
      setPasswordStrength({ score: 0, text: "", color: "" });
      
    } catch (error) {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social login handlers
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="signup-container-modal">
      <p className="signup-subtitle">Join us and start your travel adventure today!</p>

      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="name-fields">
          <div className="input-box">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {errors.firstName && <div className="error">{errors.firstName}</div>}
        {errors.lastName && <div className="error">{errors.lastName}</div>}

        {/* Email */}
        <div className="input-box">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {errors.email && <div className="error">{errors.email}</div>}

        {/* Password */}
        <div className="input-box">
          <i className="fas fa-lock"></i>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <span className="toggle-password" onClick={togglePassword}>
            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        {formData.password && (
          <div className="password-strength">
            <div className="strength-bar">
              <div className={`strength-fill ${passwordStrength.color}`}></div>
            </div>
            <div className="strength-text">{passwordStrength.text}</div>
          </div>
        )}
        {errors.password && <div className="error">{errors.password}</div>}

        {/* Confirm Password */}
        <div className="input-box">
          <i className="fas fa-lock"></i>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <span className="toggle-password" onClick={toggleConfirmPassword}>
            <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

        {/* Phone */}
        <div className="input-box">
          <i className="fas fa-phone"></i>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        {errors.phone && <div className="error">{errors.phone}</div>}

        {/* Date of Birth */}
        <div className="input-box">
          <i className="fas fa-calendar"></i>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}

        {/* Gender  */}
        <div className="input-box">
          <i className="fas fa-venus-mars"></i>
           <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender (Optional)</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select> 
        </div>

        {/* Terms and Conditions */}
        <div className="terms">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            required
          />
          <label>
            I agree to the{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeToTerms && <div className="error">{errors.agreeToTerms}</div>}

        {/* Newsletter Subscription */}
        <div className="terms">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
          />
          <label>
            Subscribe to our newsletter for travel updates and exclusive offers
          </label>
        </div>

        {/* Submit Error */}
        {errors.submit && <div className="error">{errors.submit}</div>}

        {/* Success Message */}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="signup-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Social Signup */}
      <div className="social-signup">
        <p>Or sign up with</p>
        <div className="social-icons">
          <i 
            className="fab fa-google" 
            onClick={() => handleSocialLogin("Google")}
            title="Sign up with Google"
          ></i>
          <i 
            className="fab fa-facebook" 
            onClick={() => handleSocialLogin("Facebook")}
            title="Sign up with Facebook"
          ></i>
          <i 
            className="fab fa-twitter" 
            onClick={() => handleSocialLogin("Twitter")}
            title="Sign up with Twitter"
          ></i>
        </div>
      </div>

      {/* Login Link */}
      <div className="login-link">
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Login here</a>
      </div>
    </div>
  );
}

export default Signup;
