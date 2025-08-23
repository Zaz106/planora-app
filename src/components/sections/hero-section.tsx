"use client";
import React from "react";
import LightRays from "@/components/ui/hero-bg";
import "./hero-section.css";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section" style={{ position: "relative", width: "100%", minHeight: "100svh", overflow: "hidden" }}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
      <div className="hero-content" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", zIndex: 4 }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700 }}>Welcome to Planora</h1>
          <p style={{ opacity: 0.8, marginTop: 8 }}>Organize, plan, and ship faster.</p>
          <div style={{ marginTop: 16 }}>
            <button className="hero-cta" aria-label="Get started">
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;