import React from 'react';
import './how-it-works.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">
            Get started with Planora in three simple steps and begin your journey to better learning habits.
          </p>
        </div>
        
        <div className="how-it-works-steps">
          <div className="step-card">
            <div className="step-icon">
              <div className="step-icon-placeholder">
                {/* Icon for Sign Up */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
            <div className="step-content">
              <h3 className="step-title">Sign Up</h3>
              <p className="step-description">
                Create your account in seconds and set up your learning preferences to get personalized content.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <div className="step-icon-placeholder">
                {/* Icon for Learn Daily */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
            </div>
            <div className="step-content">
              <h3 className="step-title">Learn Daily</h3>
              <p className="step-description">
                Engage with interactive flashcards and lessons designed to help you absorb knowledge effectively.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <div className="step-icon-placeholder">
                {/* Icon for Track Streaks */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10"/>
                  <path d="M12 20V4"/>
                  <path d="M6 20v-6"/>
                </svg>
              </div>
            </div>
            <div className="step-content">
              <h3 className="step-title">Track Streaks</h3>
              <p className="step-description">
                Monitor your progress and maintain learning streaks to build consistent study habits that last.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
