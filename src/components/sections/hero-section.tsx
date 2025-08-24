"use client";
import React from "react";
import "./hero-section.css";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      {/* Hero content and image positioned absolutely above hero */}
      <div className="hero-content-wrapper">
        <div className="hero-content">
          <span className="hero-badge">
            Simplified Courses
          </span>
          
          <h1 className="hero-title">
            Work can and<br />
            should be <span className="hero-title-highlight">interesting</span>
          </h1>
          
          <p className="hero-description">
            The Financial Control Center is a powerful finance management application that 
            helps you consolidate all your financial.
          </p>
          
          {/* Mobile CTA Button - only visible when nav items are hidden */}
          <button className="hero-mobile-cta">
            Get Started
          </button>
        </div>
        
        <div className="hero-image-container">
          Video Placeholder
        </div>
      </div>
    </section>
  );
};

export default HeroSection;