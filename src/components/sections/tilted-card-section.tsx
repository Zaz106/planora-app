"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from "motion/react";
import './tilted-card-section.css';

const TiltedCardSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });
  const scale = useSpring(useMotionValue(1), { damping: 30, stiffness: 100 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = (e.clientY - centerY) / rect.height * -12;
    const rotateYValue = (e.clientX - centerX) / rect.width * 12;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current || e.touches.length === 0) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const touch = e.touches[0];

    const rotateXValue = (touch.clientY - centerY) / rect.height * -12;
    const rotateYValue = (touch.clientX - centerX) / rect.width * 12;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseEnter = () => {
    scale.set(1.03);
  };

  const handleTouchStart = () => {
    scale.set(1.03);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  const handleTouchEnd = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <section className="tilted-card-section">
      <div className="tilted-card-container">
        <motion.div 
          ref={ref}
          className="tilted-card-placeholder"
          style={{
            rotateX,
            rotateY,
            scale,
          }}
          onMouseMove={handleMouse}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouch}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <span className="placeholder-text">Image Placeholder</span>
        </motion.div>
      </div>
    </section>
  );
};

export default TiltedCardSection;
