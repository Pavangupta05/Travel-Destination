import React from "react";
import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>Begin your adventurous journey here.</h2>
        <button className="get-started-btn" onClick={scrollToTop}>
          Get started
        </button>
      </div>

      <div className="footer-content">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/pavnnnx/?next=%2F&hl=en" target="main"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/pavan-kumar-gupta-837089290/" target="main"><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/in/pavan-kumar-gupta-837089290/" target="main"><i className="fab fa-facebook"></i></a>
            <a href="https://www.linkedin.com/in/pavan-kumar-gupta-837089290/" target="_main"> <i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p>43 Raymouth Rd. Baltimore, London 3910</p>
          <li type="none"><a href="#"><p>+1(123)-456-7890</p></a></li>
            <li type="none"><a href="#"><p>+1(123)-456-7890</p></a></li>
            <li type="none"><a href="#"><p>info@mydomain.com</p></a></li>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright ©2025. All Rights Reserved. — Designed with Pavan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
