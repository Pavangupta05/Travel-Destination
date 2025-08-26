import React from "react";
import "./Contact.css";
import contactBg from "../assets/contact.jpg"; 
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      {/* Hero Section for Contact Page */}
      <section
        className="contactPage-hero"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="contactPage-hero-content">
          <h1>Contact</h1>
          <p>
            Have questions about your next adventure? We're here to help you plan the perfect trip. Reach out to our travel experts and let's make your travel dreams come true.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contactPage-section">
        <div className="contactPage-overlay">
          <div className="contactPage-container">
            {/* Left Side - Info */}
            <div className="contactPage-info">
              <h2>Get In Touch</h2>
              <div className="contactPage-info-item">
                <span className="contactPage-icon">📍</span>
                <div>
                  <h4>Location:</h4>
                  <p>India Gate,Sitapura,Jaipur,Rajasthan (302022)</p>
                </div>
              </div>
              <div className="contactPage-info-item">
                <span className="contactPage-icon">⏰</span>
                <div>
                  <h4>Open Hours:</h4>
                  <p>Sunday - Friday: 11:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="contactPage-info-item">
                <span className="contactPage-icon">✉️</span>
                <div>
                  <h4>Email:</h4>
                  <p>pavangupta150605@gmail.com</p>
                </div>
              </div>
              <div className="contactPage-info-item">
                <span className="contactPage-icon">📞</span>
                <div>
                  <h4>Call:</h4>
                  <p>+91 8005872338</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="contactPage-form">
              <form>
                <div className="contactPage-form-row">
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                </div>
                <textarea placeholder="Message" rows="6" required></textarea>
                <button type="submit" className="contactPage-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer/>
    </>
  );
}

export default Contact;
