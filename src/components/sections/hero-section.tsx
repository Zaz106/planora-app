"use client";
import React from "react";
import Link from "next/link";
import "./hero-section.css";
import AnimatedSmoke from "@/components/ui/animated-smoke";

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
        {/* Hero content */}
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <span className="hero-badge">
              Micro-Learning Platform
            </span>
            
            <h1 className="hero-title">
              Learn something new<br />
              <span className="hero-title-highlight">Everyday</span>
            </h1>
            
            <p className="hero-description">
              Build consistent learning habits with bite-sized lessons that fit your busy schedule. 
              No more abandoned courses or guilt about unfinished tasks.
            </p>
            
            {/* Mobile CTA Button - only visible when nav items are hidden */}
            <Link href="/waiting-list">
              <button className="hero-mobile-cta">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;