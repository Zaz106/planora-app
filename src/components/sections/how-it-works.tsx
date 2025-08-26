import React from 'react';
import './how-it-works.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">
            Build consistent learning habits with daily 5-15 minute micro-lessons designed to fit your busy schedule.
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
              <h3 className="step-title">Choose Your Path</h3>
              <p className="step-description">
                Select a learning path like Business Writing or Excel Shortcuts. Set your daily reminder time and get ready for bite-sized lessons.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <div className="step-icon-placeholder">
                {/* Icon for Learn Daily */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="m12 1 0 6m0 6 0 6"/>
                  <path d="m17 7-3 3 3 3"/>
                  <path d="m7 7 3 3-3 3"/>
                </svg>
              </div>
            </div>
            <div className="step-content">
              <h3 className="step-title">Daily 5-15 Minute Lessons</h3>
              <p className="step-description">
                Complete focused micro-lessons with interactive quizzes. Each session builds on the last while fitting perfectly into your routine.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <div className="step-icon-placeholder">
                {/* Icon for Track Streaks */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                </svg>
              </div>
            </div>
            <div className="step-content">
              <h3 className="step-title">Build Streaks & Share Success</h3>
              <p className="step-description">
                Maintain learning streaks, earn certificates, and join accountability groups. Turn knowledge into a habit that sticks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
