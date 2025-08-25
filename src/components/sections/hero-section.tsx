"use client";
import React from "react";
import "./hero-section.css";
import AnimatedSmoke from "@/components/ui/hero-bg";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <AnimatedSmoke height="100vh" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: "0 1rem",
          pointerEvents: "auto" /* re-enable interactions for content */
        }}
      >
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;