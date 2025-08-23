import React from 'react';
import './badge.css';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'soft';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'primary', 
  children,
  className = ''
}) => {
  const classes = ['badge', `badge--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
