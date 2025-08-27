"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import './navigation.css';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand">
        <Logo size={40} />
        <span>Planora</span>
      </Link>
      
      <ul className="nav-links">
        <li><Link href="/" className="nav-link nav-link--active">Overview</Link></li>
        <li><Link href="/compare" className="nav-link">Compare</Link></li>
        <li><Link href="/pricing" className="nav-link">Pricing</Link></li>
        <li><Link href="/contact" className="nav-link">Contact</Link></li>
      </ul>
      
      <div className="nav-actions">
        <button className="nav-btn nav-btn--login">Login</button>
        <Link href="/waiting-list">
          <button className="nav-btn nav-btn--cta">Let's Talk</button>
        </Link>
      </div>
      
      <button 
        className="nav-mobile-toggle" 
        aria-label="Toggle mobile menu"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>
      
      <div className={`nav-mobile-menu ${isMobileMenuOpen ? 'nav-mobile-menu--open' : ''}`}>
        <ul className="nav-mobile-links">
          <li><Link href="/overview" className="nav-link nav-link--active">Overview</Link></li>
          <li><Link href="/compare" className="nav-link">Compare</Link></li>
          <li><Link href="/pricing" className="nav-link">Pricing</Link></li>
          <li><Link href="/contact" className="nav-link">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
