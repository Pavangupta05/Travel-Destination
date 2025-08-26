
import React, { useState, useEffect, useRef } from "react";
import "./about.css";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import member1 from "../assets/person_1.jpg";
import member2 from "../assets/person_2.jpg";
import member3 from "../assets/person_3.jpg";
import member4 from "../assets/person_4.jpg";
import Footer from "../components/Footer";

function About() {
  // state for read more
  const [expanded, setExpanded] = useState(false);

  // state for counters
  const [countersStarted, setCountersStarted] = useState(false);
  const [stats, setStats] = useState({
    travelers: 0,
    destinations: 0,
    years: 0,
    awards: 0,
  });

  const statsRef = useRef(null);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  // counter animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
  }, [countersStarted]);

  useEffect(() => {
    if (countersStarted) {
      let start = { travelers: 0, destinations: 0, years: 0, awards: 0 };
      let end = { travelers: 20000, destinations: 50, years: 5, awards: 100 };

      let duration = 5000;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);

        setStats({
          travelers: Math.floor(progress * end.travelers),
          destinations: Math.floor(progress * end.destinations),
          years: Math.floor(progress * end.years),
          awards: Math.floor(progress * end.awards),
        });

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [countersStarted]);

  // scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  // FAQ toggle
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section className="about-hero">
      <div className="about-overlay">
        <div className="about-content reveal">
          <h1>About Us</h1>
          <p>
            Discover who we are and what inspires our journey. We believe in
            creating unforgettable travel experiences that inspire and connect
            people across the globe.
          </p>
          <button>Explore More</button>
        </div>
      </div>

      {/* Stats Section */}
      <section className="about-stats reveal" ref={statsRef}>
        <h2 className="stats-title">About TravelCo</h2>
        <p className="stats-subtitle">
          For over 15 years, TravelCo has been creating extraordinary travel
          experiences that inspire, educate, and connect people with the world's
          most incredible destinations.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="stat-number">{stats.travelers}+</h3>
            <p className="stat-label">Happy Travelers</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3 className="stat-number">{stats.destinations}+</h3>
            <p className="stat-label">Destinations</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="stat-number">{stats.years}+</h3>
            <p className="stat-label">Years Experience</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-award"></i>
            </div>
            <h3 className="stat-number">{stats.awards}+</h3>
            <p className="stat-label">Awards Won</p>
          </div>
        </div>
      </section>

      {/* About Text + Images */}
      <section className="about reveal">
        <div className="about-container">
          <div className="about-text">
            <h2>Explore All Corners Of The World With Us</h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>

            {expanded && (
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country, in
                which roasted parts of sentences fly into your mouth.
              </p>
            )}

            <button className="about-btn" onClick={toggleReadMore}>
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="about-images">
            <img src={about1} alt="airplane" className="about-img about-img-back" />
            <img src={about2} alt="traveller" className="about-img about-img-front" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section reveal">
        <h2 className="team-title">Meet Our Team of Experts</h2>
        <p className="team-subtitle">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts.
        </p>

        <div className="team-container">
          {[member1, member2, member3, member4].map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member} alt={`team-${index}`} />
              <h4>CEO, Co-Founder</h4>
              <h3>Member {index + 1}</h3>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          ))}
        </div>
      </section>
<section className="timeline-section reveal">
  <h2 className="timeline-title">Our Journey</h2>
  <div className="timeline-container">
    {[
      { year: "2020", text: "TravelCo was founded with a mission to inspire global travel.", icon: "fas fa-flag" },
      { year: "2022", text: "Expanded to 50+ destinations worldwide.", icon: "fas fa-plane-departure" },
      { year: "2024", text: "Reached 20000+ happy travelers.", icon: "fas fa-users" },
      { year: "2025", text: "Awarded Best Travel Agency of the Year.", icon: "fas fa-trophy" },
    ].map((item, idx) => (
      <div className="timeline-item" key={idx}>
        <div className="timeline-icon"><i className={item.icon}></i></div>
        <div className="timeline-content">
          <h3>{item.year}</h3>
          <p>{item.text}</p>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Testimonials Section */}
<section className="testimonials-section reveal">
  <h2 className="testimonials-title">What Our Clients Say</h2>
  <div className="testimonials-container">
    {[
      { name: "Pavan", role: "Traveler", review: "Amazing experience! Everything was well organized and smooth.", rating: 5 },
      { name: "Sarah Singh", role: "Adventurer", review: "Loved the trip! Highly recommend GlobeVista to everyone.", rating: 4 },
      { name: "David ", role: "Explorer", review: "The guides were friendly and knowledgeable. Great service!", rating: 5 },
    ].map((t, index) => (
      <div className="testimonial-card" key={index}>
        <div className="testimonial-icon"><i className="fas fa-user-circle"></i></div>
        <p className="testimonial-review">"{t.review}"</p>
        <div className="testimonial-rating">
          {[...Array(t.rating)].map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
          {[...Array(5 - t.rating)].map((_, i) => (
            <i key={i} className="far fa-star"></i>
          ))}
        </div>
        <h4>{t.name}</h4>
        <span>{t.role}</span>
      </div>
    ))}
  </div>
</section>
      {/* FAQ Section */}
      <section className="faq-section reveal">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {[
            {
              q: "How do I book a trip with TravelCo?",
              a: "You can book directly through our website or contact our support team for personalized assistance.",
            },
            {
              q: "Can I customize my travel package?",
              a: "Yes! We offer customizable travel experiences to suit your preferences and budget.",
            },
            {
              q: "Do you offer group discounts?",
              a: "Absolutely! We provide special offers for groups and corporate packages.",
            },
          ].map((faq, index) => (
            <div
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              key={index}
            >
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h4>{faq.q}</h4>
                <span>{activeFaq === index ? "-" : "+"}</span>
              </div>
              {activeFaq === index && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </section>
  );
}

export default About;
