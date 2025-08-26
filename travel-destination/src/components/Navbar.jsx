import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/FullLogo.jpg";

const Navbar = ({ onOpenLogin, onOpenSignup }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {   // 50px scroll hone ke baad
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = (e) => {
    e.preventDefault();
    onOpenLogin();
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    onOpenSignup();
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="logo"><a href="/">GlobeVista</a></div>
      <button className={`hamburger ${menuOpen ? "is-active" : ""}`} aria-label="Menu" aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
         <li><Link to="/contact">Contact</Link></li>
       <li><a href="#" onClick={handleLoginClick}>Login</a></li>
      <li><a href="#" onClick={handleSignupClick}>Signup</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;


