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
            <p className="cta-subtitle">
              Build a lasting learning habit with bite‑sized 5–15 minute lessons, quick
              quizzes to reinforce, and gentle reminders that keep your streak alive.
              Learn anywhere, at your pace—then upgrade anytime for certificates,
              offline mode, and deeper insights.
            </p>
          </header>
          <div className="cta-actions">
            <Link href="/waiting-list" className="cta-btn btn-black" aria-label="Get started">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
