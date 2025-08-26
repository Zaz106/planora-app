import React from 'react';
import './logo.css';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, className = '' }) => {
  return (
    <div 
      className={`logo-container ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="logo-background">
        {/* Path/line connecting the dots */}
        <svg 
          className="logo-path" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path
            d="M15 90 Q45 55 55 50 Q68 35 75 25 T85 12"
            stroke="white"
            strokeWidth="5"
            fill="none"
            opacity="0.6"
          />
        </svg>
        
        <div className="logo-circle logo-circle-1"></div>
        <div className="logo-circle logo-circle-2"></div>
        <div className="logo-circle logo-circle-3"></div>
        <div className="logo-sparkle">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0L7.09 4.91L12 6L7.09 7.09L6 12L4.91 7.09L0 6L4.91 4.91L6 0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Logo;
