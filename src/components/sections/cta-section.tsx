import React from "react";
import Link from "next/link";
import "./cta-section.css";

const CtaSection: React.FC = () => {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="cta-container">
        <div className="cta-card">
          <header className="cta-header">
            <h2 id="cta-title" className="cta-title">Get started in minutes</h2>
            <p className="cta-subtitle">Build your daily learning streak with bite‑sized lessons and smart reminders.</p>
          </header>
          <div className="cta-actions">
            <Link href="/waiting-list" className="cta-btn" aria-label="Get started">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
