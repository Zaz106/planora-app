"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './navigation.css';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav">
      <Link href="/" className="nav__brand">
        <div className="nav__brand-icon">P</div>
        <span>Planora</span>
      </Link>
      
      <ul className="nav__links">
        <li><Link href="/overview" className="nav__link nav__link--active">Overview</Link></li>
        <li><Link href="/compare" className="nav__link">Compare</Link></li>
        <li><Link href="/pricing" className="nav__link">Pricing</Link></li>
        <li><Link href="/contact" className="nav__link">Contact</Link></li>
      </ul>
      
      <div className="nav__actions">
        <button className="nav__btn nav__btn--login">Login</button>
        <button className="nav__btn nav__btn--cta">Let's Talk  →</button>
      </div>
      
      <button 
        className="nav__mobile-toggle" 
        aria-label="Toggle mobile menu"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>
      
      <div className={`nav__mobile-menu ${isMobileMenuOpen ? 'nav__mobile-menu--open' : ''}`}>
        <ul className="nav__mobile-links">
          <li><Link href="/overview" className="nav__link nav__link--active">Overview</Link></li>
          <li><Link href="/compare" className="nav__link">Compare</Link></li>
          <li><Link href="/pricing" className="nav__link">Pricing</Link></li>
          <li><Link href="/contact" className="nav__link">Contact</Link></li>
        </ul>
        <div className="nav__mobile-actions">
          <button className="nav__btn nav__btn--login">Login</button>
          <button className="nav__btn nav__btn--cta">Let's Talk  →</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
