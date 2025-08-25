import React from 'react';
import './features-section.css';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features</h2>
          <p className="features-subtitle">
            Everything you need to build consistent learning habits and track your progress effectively.
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card highlighted-feature">
            <div className="feature-image-container">
              <div className="feature-image-placeholder">
                Feature Image 1
              </div>
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Streak Tracking</h3>
              <p className="feature-description">
                Monitor your daily learning streaks and build consistent habits that lead to long-term success. 
                Visualize your progress with detailed analytics and milestone celebrations.
              </p>
              <div className="feature-stats">
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Days Average</span>
                </div>
              </div>
            </div>
          </div>

          <div className="features-row">
            <div className="feature-card">
              <div className="feature-image-container">
                <div className="feature-image-placeholder">
                  Feature Image 2
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Smart Flashcards</h3>
                <p className="feature-description">
                  Interactive flashcards powered by spaced repetition algorithms to optimize your learning efficiency.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-image-container">
                <div className="feature-image-placeholder">
                  Feature Image 3
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Leaderboards</h3>
                <p className="feature-description">
                  Compete with friends and the community to stay motivated and reach new learning milestones together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
