import React from 'react';
import './video-container.css';

const VideoContainer = () => {
  return (
    <section className="video-section">
      <div className="video-container">
        <div className="mac-window">
          <div className="mac-window-header">
            <div className="traffic-lights">
              <div className="traffic-light red"></div>
              <div className="traffic-light yellow"></div>
              <div className="traffic-light green"></div>
            </div>
          </div>
          <div className="video-placeholder">
            Video Placeholder
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoContainer;
