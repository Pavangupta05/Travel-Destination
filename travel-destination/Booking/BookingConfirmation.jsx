import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    document.body.classList.add("booking-body");
    return () => document.body.classList.remove("booking-body");
  }, []);

  if (!state) {
    return (
      <main className="booking-page">
        <div className="booking-container">
          <h1 className="booking-title">No booking found</h1>
          <p className="booking-subtitle">Please start a new booking.</p>
          <button className="btn" onClick={() => navigate("/explore")}>Back to Explore</button>
        </div>
      </main>
    );
  }

  const { name, email, destination, startDate, endDate, nights, travelers, estimatedTotal, discountAmount, finalTotal, coupon, notes } = state;

  return (
    <main className="booking-page">
      <div className="booking-container">
        <h1 className="booking-title">Booking Confirmed 🎉</h1>
        <p className="booking-subtitle">Thanks {name}! We sent a confirmation to {email}.</p>

        <div className="booking-summary">
          <div>
            <h3>Trip</h3>
            <p>{destination}</p>
          </div>
          <div>
            <h3>Dates</h3>
            <p>{startDate} → {endDate} ({nights} nights)</p>
          </div>
          <div>
            <h3>Travelers</h3>
            <p>{travelers}</p>
          </div>
          <div>
            <h3>Pricing</h3>
            <p>Estimate: ₹ {Number(estimatedTotal).toLocaleString()}</p>
            {coupon && <p>Coupon {coupon}: -₹ {Number(discountAmount).toLocaleString()}</p>}
            <p><strong>Total: ₹ {Number(finalTotal).toLocaleString()}</strong></p>
          </div>
        </div>

        {notes && (
          <div className="summary" style={{ marginTop: 16 }}>
            <h3>Notes</h3>
            <p>{notes}</p>
          </div>
        )}

        <div className="booking-actions" style={{ marginTop: 16 }}>
          <button className="btn primary" onClick={() => navigate("/explore")}>Explore more</button>
          <button className="btn" onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    </main>
  );
}

export default BookingConfirmation;


