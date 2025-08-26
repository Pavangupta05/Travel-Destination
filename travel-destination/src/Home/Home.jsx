
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import video from "../assets/video1.mp4";
import image1 from "../assets/malasia.jpg";
import image2 from "../assets/paris.jpg";
import image3 from "../assets/sanfransisco.jpg";
import image4 from "../assets/switzerland.jpg";
import image5 from "../assets/italy.jpg";
import image6 from "../assets/India.jpg";
import image7 from "../assets/Rome.jpg";
import memories from "../assets/memories.jpg";
import Footer from "../components/Footer";

// Image component with error handling
const SafeImage = ({ src, alt, className, fallbackText, fallbackStyle }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div 
        className={`image-fallback ${className}`} 
        style={{
          ...fallbackStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ff9800, #f57c00)',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}
      >
        {fallbackText || alt}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      style={{ 
        opacity: imageLoaded ? 1 : 0.7,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

function Home() {
  const navigate = useNavigate();
  // Destination slider data
  const destinations = [
    {
      image: image1,
      city: "Malaysia",
      description: "Tropical paradise awaits"
    },
    {
      image: image2,
      city: "Paris",
      description: "City of love and lights"
    },
    {
      image: image3,
      city: "San Francisco",
      description: "Golden Gate dreams"
    },
    {
      image: image4,
      city: "Switzerland",
      description: "Mountain majesty"
    },
    {
      image: image5,
      city: "Italy",
      description: "La dolce vita"
    },
    {
      image: image6,
      city: "India",
      description: "Land of diversity"
    },
    {
      image: image7,
      city: "Rome",
      description: "Where history lives"
    }
  ];

  // Travel destinations data
  const travelDestinations = [
    {
      image: image3,
      price: "$560",
      title: "Paradise Beach, Palawan Island",
      location: "Maldives, Republic Maldives"
    },
    {
      image: image2,
      price: "$490",
      title: "Eiffel Tower Experience",
      location: "Paris, France"
    },
    {
      image: image1,
      price: "$490",
      title: "Tropical Malaysia Adventure",
      location: "Kuala Lumpur, Malaysia"
    },
    {
      image: image4,
      price: "$430",
      title: "Swiss Alps Discovery",
      location: "Zurich, Switzerland"
    },
    {
      image: image5,
      price: "$560",
      title: "Italian Renaissance Tour",
      location: "Rome, Italy"
    },
    {
      image: image6,
      price: "$380",
      title: "Indian Artitecture",
      location: "Agra, India"
    },
    {
      image: image7,
      price: "$520",
      title: "Colosseum Night Tour",
      location: "Rome, Italy"
    },
    {
      image: image1,
      price: "$450",
      title: "Bali Island Paradise",
      location: "Bali, Indonesia"
    },
    {
      image: image2,
      price: "$680",
      title: "Santorini Sunset Views",
      location: "Santorini, Greece"
    },
    {
      image: image3,
      price: "$420",
      title: "Tokyo City Lights",
      location: "Tokyo, Japan"
    },
    {
      image: image4,
      price: "$390",
      title: "New York City Dreams",
      location: "New York, USA"
    },
    {
      image: image5,
      price: "$540",
      title: "Dubai Desert Safari",
      location: "Dubai, UAE"
    },
    {
      image: image6,
      price: "$480",
      title: "Sydney Opera House",
      location: "Sydney, Australia"
    },
    {
      image: image7,
      price: "$510",
      title: "Machu Picchu Adventure",
      location: "Cusco, Peru"
    }
  ];

  // Destination slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Travel destinations slider state
  const [travelIndex, setTravelIndex] = useState(0);
  const [isTravelTransitioning, setIsTravelTransitioning] = useState(false);

  // Auto-play for destination slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextDestination();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Destination slider functions
  const nextDestination = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevDestination = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToDestination = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Travel destinations slider functions
  const nextTravel = () => {
    if (isTravelTransitioning) return;
    setIsTravelTransitioning(true);
    setTravelIndex((prevIndex) => (prevIndex + 1) % travelDestinations.length);
    setTimeout(() => setIsTravelTransitioning(false), 600);
  };

  const prevTravel = () => {
    if (isTravelTransitioning) return;
    setIsTravelTransitioning(true);
    setTravelIndex((prevIndex) => (prevIndex - 1 + travelDestinations.length) % travelDestinations.length);
    setTimeout(() => setIsTravelTransitioning(false), 600);
  };

  const goToTravel = (index) => {
    if (isTravelTransitioning) return;
    setIsTravelTransitioning(true);
    setTravelIndex(index);
    setTimeout(() => setIsTravelTransitioning(false), 600);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={video} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>Welcome to GlobeVista</h1>
          <p>"At Globevista, we open windows to the world — helping you explore breathtaking destinations, discover cultures, and create unforgettable journeys that last a lifetime."</p>
          <button onClick={() => navigate("/explore")}>Explore Now</button>
        </div>
      </section>

      {/* Destination Slider */}
      <section className="destinations">
        <h2>Top Destinations</h2>
        <div className="destination-slider-container">
          <button className="slider-btn left" onClick={prevDestination} disabled={isTransitioning}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="destination-slider">
            <div 
              className={`destination-slide ${isTransitioning ? 'transitioning' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            >
              {destinations.map((dest, index) => (
                <div
                  className="destination-card"
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/explore?q=${encodeURIComponent(dest.city)}`)}
                  onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/explore?q=${encodeURIComponent(dest.city)}`); }}
                >
                  <div className="card-image">
                    <SafeImage 
                      src={dest.image} 
                      alt={dest.city} 
                      fallbackText={dest.city}
                      fallbackStyle={{ width: '100%', height: '100%' }}
                    />
                    <div className="card-overlay">
                      <Link className="explore-btn" to={`/explore?q=${encodeURIComponent(dest.city)}`}>Explore Now</Link>
                    </div>
                    <div className="card-gradient"></div>
                  </div>
                  <div className="card-content">
                    <h3>{dest.city}</h3>
                    <p>{dest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="slider-btn right" onClick={nextDestination} disabled={isTransitioning}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Destination pagination dots */}
        <div className="destination-dots">
          {destinations.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToDestination(index)}
            />
          ))}
        </div>
      </section>

      {/* ===== Travel Destinations Section ===== */}
      <section className="destinations-section">
        <div className="destinations-header">
          <h2>Discover Hundreds of Travel Destinations</h2>
          <p>
            Discover breathtaking destinations across the World, where every journey tells a story and every moment becomes a cherished memory.
          </p>
        </div>

        <div className="travel-slider-container">
          <button className="travel-slider-btn left" onClick={prevTravel} disabled={isTravelTransitioning}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="travel-slider">
            <div 
              className={`travel-slide ${isTravelTransitioning ? 'transitioning' : ''}`}
              style={{ transform: `translateX(-${travelIndex * 33.333}%)` }}
            >
              {travelDestinations.map((dest, index) => (
                <div
                  className="travel-card"
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/explore?q=${encodeURIComponent(dest.title)}`)}
                  onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/explore?q=${encodeURIComponent(dest.title)}`); }}
                >
                  <div className="card-image">
                    <SafeImage 
                      src={dest.image} 
                      alt={dest.title} 
                      fallbackText={dest.title}
                      fallbackStyle={{ width: '100%', height: '100%' }}
                    />
                    <span className="price">{dest.price}</span>
                    <div className="card-overlay">
                      <Link className="book-btn" to={`/explore?q=${encodeURIComponent(dest.title)}`}>Book Now</Link>
                    </div>
                    <div className="card-gradient"></div>
                  </div>
                  <div className="card-content">
                    <h3>{dest.title}</h3>
                    <p>{dest.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="travel-slider-btn right" onClick={nextTravel} disabled={isTravelTransitioning}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Travel destinations pagination dots */}
        <div className="travel-dots">
          {travelDestinations.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === travelIndex ? 'active' : ''}`}
              onClick={() => goToTravel(index)}
            />
          ))}
        </div>
      </section>

      {/* Story section */}
      <section className="story-section">
        <div className="story-text">
          <h2>Sweet Memories Come To Life Again</h2>
          <p>
            Relive the joy of your journeys with Globevista, where every destination is more than a place — it's a story waiting to be retold and a memory ready to be made again.
          </p>
          <p>
            From the golden sunsets on distant shores to the laughter shared on winding streets, we bring back the essence of travel — moments that turn into sweet memories you'll cherish forever.
          </p>
          <button className="read-btn">Read More</button>
        </div>
        <div className="story-image">
          <SafeImage 
            src={memories} 
            alt="Travel Memories" 
            fallbackText="Travel Memories"
            fallbackStyle={{ width: '100%', height: '300px', borderRadius: '12px' }}
          />
        </div>
      </section>

      {/* Services section */}
      <section className="services">
        <div className="services-left">
          <h2>Our Services</h2>
          <p>
            Our services ensure comfort, adventure, and lasting memories also Plan smart, travel better — with Globevista by your side.
          </p>
          <button className="btn">View All</button>
        </div>

        <div className="services-right">
          <div className="service">
            <div className="icon"><i className="fas fa-ship"></i></div>
            <h3>Tourism</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
          </div>

          <div className="service">
            <div className="icon"><i className="fas fa-hotel"></i></div>
            <h3>Package Tours</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
          </div>

          <div className="service">
            <div className="icon"><i className="fas fa-plane"></i></div>
            <h3>Travel Insurance</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
          </div>

          <div className="service">
            <div className="icon"><i className="fas fa-suitcase-rolling"></i></div>
            <h3>Airport Lounge Access</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
