import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Explorenow.css";

import heroImg from "../assets/hero.jpg";
import imgMalaysia from "../assets/malasia.jpg";
import imgParis from "../assets/paris.jpg";
import imgSF from "../assets/sanfransisco.jpg";
import imgSwiss from "../assets/switzerland.jpg";
import imgItaly from "../assets/italy.jpg";
import imgIndia from "../assets/India.jpg";
import imgRome from "../assets/Rome.jpg";
import luxuryImg from "../assets/explorenow.avif";

const ExploreNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(6);

  const destinations = useMemo(
    () => [
      {
        image: imgMalaysia,
        title: "Malaysia",
        description: "Tropical paradise with vibrant cities and serene islands.",
      },
      {
        image: imgParis,
        title: "Paris, France",
        description: "City of lights, romance, art, and iconic architecture.",
      },
      {
        image: imgSF,
        title: "San Francisco, USA",
        description: "Golden Gate views, rolling hills, and coastal breeze.",
      },
      {
        image: imgSwiss,
        title: "Switzerland",
        description: "Alpine adventures, crystal lakes, and scenic rail journeys.",
      },
      {
        image: imgItaly,
        title: "Italy",
        description: "History, cuisine, and timeless art across iconic cities.",
      },
      {
        image: imgIndia,
        title: "India",
        description: "Diverse culture, heritage, and breathtaking landscapes.",
      },
      {
        image: imgRome,
        title: "Rome, Italy",
        description: "Ancient wonders and modern Italian charm.",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return destinations.filter((d) => {
      const matchText = !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
      const matchCat = category === "all" || (category === "beach" && /island|beach|coast|breeze/i.test(d.description)) || (category === "mountain" && /alpine|alps|mountain|hills/i.test(d.description)) || (category === "city" && /city|architecture|art|modern|ancient/i.test(d.description));
      return matchText && matchCat;
    });
  }, [query, category, destinations]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "az") arr.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") arr.sort((a, b) => b.title.localeCompare(a.title));
    // 'popular' leaves original order
    return arr;
  }, [filtered, sort]);

  const visibleItems = useMemo(() => sorted.slice(0, visibleCount), [sorted, visibleCount]);

  // Sync URL <-> state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    const c = params.get("cat") || "all";
    setQuery(q);
    setCategory(["all","beach","mountain","city"].includes(c) ? c : "all");
    setVisibleCount(6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "all") params.set("cat", category);
    navigate({ pathname: "/explore", search: params.toString() ? `?${params.toString()}` : "" }, { replace: true });
  }, [query, category, navigate]);

  // Reset pagination when filters or search change
  useEffect(() => {
    setVisibleCount(6);
  }, [query, category, sort]);

  return (
    <div className="explore-page">
      <Navbar />

      {/* Hero Section */}
      <header className="explore-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="explore-hero-overlay">
          <div className="explore-hero-content">
            <h1>Explore Destinations</h1>
            <p>Find your next adventure</p>

            <div className="explore-search">
              <span className="search-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search destinations, e.g. Paris, Alps, Beaches..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search destinations"
              />
              <button type="button" className="search-btn">Search</button>
            </div>
            <div className="explore-filters">
              <button className={`chip ${category === "all" ? "active" : ""}`} onClick={() => setCategory("all")}>All</button>
              <button className={`chip ${category === "city" ? "active" : ""}`} onClick={() => setCategory("city")}>City</button>
              <button className={`chip ${category === "beach" ? "active" : ""}`} onClick={() => setCategory("beach")}>Beach</button>
              <button className={`chip ${category === "mountain" ? "active" : ""}`} onClick={() => setCategory("mountain")}>Mountain</button>
            </div>
          </div>
        </div>
      </header>

      {/* Destinations Grid */}
      <main className="explore-section">
        <div className="explore-container">
          <div className="explore-toolbar">
            <div className="count">{sorted.length} destinations</div>
            <div className="sort">
              <label htmlFor="sort" className="visually-hidden">Sort</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="az">Name: A to Z</option>
                <option value="za">Name: Z to A</option>
              </select>
            </div>
          </div>

          {sorted.length === 0 && (
            <div className="empty-state">No destinations match your search. Try different keywords or filters.</div>
          )}

          <div className="explore-grid">
            {visibleItems.map((item, idx) => {
              const badge = /island|beach|coast|breeze/i.test(item.description)
                ? "Beach" : /alpine|alps|mountain|hills/i.test(item.description)
                ? "Mountain" : "City";
              return (
              <article className="explore-card" key={`${item.title}-${idx}`}>
                <div className="explore-card-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className={`badge ${badge.toLowerCase()}`}>{badge}</span>
                </div>
                <div className="explore-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button className="view-btn" type="button" onClick={() => navigate(`/booking?dest=${encodeURIComponent(item.title)}`)}>Book Now</button>
                </div>
              </article>
            );})}
          </div>

          {visibleCount < sorted.length && (
            <div className="load-more-wrap">
              <button className="load-more" onClick={() => setVisibleCount((c) => c + 6)}>Load More</button>
            </div>
          )}
        </div>
      </main>

      
      
      {/* Luxury Content Section */}
      <section className="luxury-section">
        <div className="luxury-container">
          <h2 className="luxury-title">Havens of Luxury and Comfort</h2>
          <p className="luxury-subtitle">
            Discover exquisite destinations where elegance meets ease. From sunlit shores and alpine retreats
            to storied city hideaways, indulge in curated experiences crafted for the discerning traveler.
          </p>
          <div className="luxury-media">
            <img src={luxuryImg} alt="Luxury travel inspiration" loading="lazy" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ExploreNow;