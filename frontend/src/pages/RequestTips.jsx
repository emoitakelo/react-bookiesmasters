import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./RequestTips.css";

const RequestTips = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    consent: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/tips/request", formData);
      setMessage("✅ Your request has been received. We'll contact you shortly!");
      setFormData({ name: "", email: "", whatsapp: "", consent: false });
    } catch (error) {
      setMessage("❌ Failed to send request. Try again later.");
    }
  };

  return (
    <div className="request-tips-wrapper">
      <div className="container mt-3">
        <h2>Request Safe Betting Tips</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>WhatsApp Number</label>
            <input
              name="whatsapp"
              type="text"
              className="form-control"
              placeholder="+254712345678"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              name="consent"
              type="checkbox"
              className="form-check-input"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <label className="form-check-label">
              I consent to be contacted regarding betting tips.
            </label>
          </div>

          <button className="btn btn-success" type="submit">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestTips;
