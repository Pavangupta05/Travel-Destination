import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Home from "./Home/Home";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Login from "./Login/Login";
import ForgotPassword from "./Forgotpassword/ForgotPassword";
import Signup from "./Signup/Signup";
import ExploreNow from "./Explorenow/Explorenow";
import Booking from "./Booking/Booking";
import BookingConfirmation from "./Booking/BookingConfirmation";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
    setIsForgotPasswordModalOpen(false);
  };

  const handleOpenSignup = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseSignup = () => {
    setIsSignupModalOpen(false);
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordModalOpen(false);
  };

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
    setIsForgotPasswordModalOpen(false);
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
    setIsForgotPasswordModalOpen(false);
  };

  const switchToForgotPassword = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    setIsForgotPasswordModalOpen(true);
  };

  return (
    <Router>
      <Navbar onOpenLogin={handleOpenLogin} onOpenSignup={handleOpenSignup} />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreNow />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} /> 
      </Routes>

      {/* Login Modal */}
      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLogin}
        title="Login"
      >
        <Login onSwitchToSignup={switchToSignup} onSwitchToForgotPassword={switchToForgotPassword} />
      </Modal>

      {/* Signup Modal */}
      <Modal 
        isOpen={isSignupModalOpen} 
        onClose={handleCloseSignup}
        title="Create Account"
      >
        <Signup onSwitchToLogin={switchToLogin} />
      </Modal>

      {/* Forgot Password Modal */}
      <Modal 
        isOpen={isForgotPasswordModalOpen} 
        onClose={handleCloseForgotPassword}
        title="Forgot Password"
      >
        <ForgotPassword onSwitchToLogin={switchToLogin} />
      </Modal>
    </Router>
  );
}

export default App;


