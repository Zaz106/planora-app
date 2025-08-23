"use client";
import React from "react";
import Badge from "@/components/ui/badge";
import "./hero-section.css";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <Badge variant="soft" className="hero__badge">
            Simplified Courses
          </Badge>
          
          <h1 className="hero__title">
            Work can and<br />
            should be <span className="hero__title-highlight">interesting</span>
          </h1>
          
          <p className="hero__description">
            The Financial Control Center is a powerful finance management application that 
            helps you consolidate all your financial.
          </p>
        </div>
        
        <div className="hero__image-container">
          Phone Image Placeholder
        </div>
      </div>
    </section>
  );
};

export default HeroSection;