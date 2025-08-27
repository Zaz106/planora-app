"use client";
import React, { useState } from "react";
import AnimatedSmoke from "@/components/ui/animated-smoke";
import { waitlistAPI } from "@/lib/api/api";
import "./page-module.css";

const WaitingListPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  const showMessage = (message: string, type: "success" | "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      const result = await waitlistAPI.addToWaitlist(email);
      
      if (result.success) {
        setEmail("");
        showMessage("You're on the list! We'll email you when Planora launches.", "success");
      } else {
        showMessage(result.message, "error");
      }
    } catch (err) {
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <section className="waiting-list-hero">
      <AnimatedSmoke height="100vh" />
      <div className="waiting-list-content-overlay">
        <div className="waiting-list-wrapper">
          <div className="waiting-list-content">
            <span className="waiting-list-badge">
              Micro-Learning Platform
            </span>
            
            <h1 className="waiting-list-title">
              Learn something new<br />
              <span className="waiting-list-title-highlight">Everyday</span>
            </h1>
            
            <p className="waiting-list-description">
              Build consistent learning habits with bite-sized lessons that fit your busy schedule. 
              No more abandoned courses or guilt about unfinished tasks.
            </p>

            <form onSubmit={handleSubmit} className="waiting-list-form">
              <div className="form-group">
                <div className="email-input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="email-input"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting || !email}
                  >
                    {isSubmitting ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </div>
              </div>
              
              <p className="privacy-notice">
                We'll notify you when Planora launches. No spam, unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className={`popup-icon ${popupType}`}>
              {popupType === "success" ? "✓" : "✕"}
            </div>
            <p className="popup-message">{popupMessage}</p>
            <button onClick={handlePopupClose} className="popup-close">
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WaitingListPage;
