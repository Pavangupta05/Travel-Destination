import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function Booking() {
  useEffect(() => {
    document.body.classList.add("booking-body");
    return () => document.body.classList.remove("booking-body");
  }, []);
  const navigate = useNavigate();
  const query = useQuery();
  const prefillDestination = query.get("dest") || "";

  const [destination, setDestination] = useState(prefillDestination);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null); // { code, pct } | null
  const [errors, setErrors] = useState({});

  const nights = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, [startDate, endDate]);

  const estimatedTotal = useMemo(() => {
    const basePerNight = 120; // simple placeholder pricing
    return nights * basePerNight * Math.max(1, Number(travelers));
  }, [nights, travelers]);

  const discountAmount = useMemo(() => {
    if (!couponApplied) return 0;
    return Math.round(estimatedTotal * (couponApplied.pct / 100));
  }, [couponApplied, estimatedTotal]);

  const finalTotal = useMemo(() => {
    return Math.max(0, estimatedTotal - discountAmount);
  }, [estimatedTotal, discountAmount]);

  const canSubmit = destination && startDate && endDate && name && email && nights > 0 && !errors.date;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    // navigate to confirmation with summary state
    navigate("/booking/confirmation", {
      state: {
        name,
        email,
        destination,
        startDate,
        endDate,
        nights,
        travelers,
        estimatedTotal,
        discountAmount,
        finalTotal,
        coupon: couponApplied?.code || null,
        notes,
      },
      replace: true,
    });
  };

  const validateDates = (s, e) => {
    const newErrors = { ...errors };
    let err = "";
    if (s && e) {
      const sd = new Date(s);
      const ed = new Date(e);
      if (ed <= sd) {
        err = "End date must be after start date";
      }
    }
    newErrors.date = err || undefined;
    setErrors(newErrors);
  };

  return (
    <main className="booking-page">
      <div className="booking-container">
        <h1 className="booking-title">Book Your Trip</h1>
        <p className="booking-subtitle">Fill in your details to reserve your journey.</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Destination
              <input
                type="text"
                placeholder="e.g. Paris, Switzerland"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-row two">
            <label>
              Start Date
              <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); validateDates(e.target.value, endDate); }} required />
            </label>
            <label>
              End Date
              <input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); validateDates(startDate, e.target.value); }} required />
            </label>
          </div>
          {errors.date && (
            <div className="form-error">{errors.date}</div>
          )}
          <div className="form-row two">
            <label>
              Travelers
              <input
                type="number"
                min="1"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                required
              />
            </label>
            <label>
              Your Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
          </div>
          <div className="form-row two">
            <label>
              Coupon Code
              <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value.trim())} placeholder="e.g. SAVE10, FESTIVE20" />
            </label>
            <div className="coupon-actions">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  const code = coupon.toUpperCase();
                  const map = { SAVE10: 10, FESTIVE20: 20 };
                  if (map[code]) {
                    setCouponApplied({ code, pct: map[code] });
                  } else {
                    setCouponApplied(null);
                  }
                }}
              >
                Apply
              </button>
              {couponApplied && <span className="coupon-badge">Applied: {couponApplied.code} (-{couponApplied.pct}%)</span>}
            </div>
          </div>
          <div className="form-row">
            <label>
              Notes (optional)
              <textarea rows="4" placeholder="Special requests, preferred hotel type, etc." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>

          <div className="booking-sidebar">
            <div className="summary">
              <h3>Summary</h3>
              <ul>
                <li><span>Destination</span><strong>{destination || "—"}</strong></li>
                <li><span>Dates</span><strong>{startDate || "—"} → {endDate || "—"}</strong></li>
                <li><span>Nights</span><strong>{nights}</strong></li>
                <li><span>Travelers</span><strong>{travelers}</strong></li>
                <li><span>Estimate</span><strong>₹ {estimatedTotal.toLocaleString()}</strong></li>
                {couponApplied && (
                  <li><span>Discount</span><strong>- ₹ {discountAmount.toLocaleString()}</strong></li>
                )}
                <li><span>Total</span><strong>₹ {finalTotal.toLocaleString()}</strong></li>
              </ul>
              <p className="disclaimer">Final pricing varies by availability, accommodations, and add-ons.</p>
            </div>
            <button className="btn primary" type="submit" disabled={!canSubmit}>Confirm Booking</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Booking;


