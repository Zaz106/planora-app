import React from 'react';
import './features-section.css';

interface BentoCardProps {
  variant?: 'normal' | 'large' | 'wide';
  image?: string;
  title: string;
  excerpt: string;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  variant = 'normal', 
  image, 
  title, 
  excerpt, 
  className = '' 
}) => {
  return (
    <li 
      className={`bento-card bento-card--${variant} ${className}`}
      tabIndex={0}
    >
      <div className="bento-card__content">
        {image && (
          <div className="bento-card__image">
            <img 
              src={image} 
              alt={title}
              loading="lazy"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        )}
        <div className="bento-card__text">
          <h3 className="bento-card__title">{title}</h3>
          <p className="bento-card__excerpt">{excerpt}</p>
        </div>
      </div>
    </li>
  );
};

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <section className={`bento-grid ${className}`} aria-labelledby="features-title">
      <ul className="bento-grid__container">
        {children}
      </ul>
    </section>
  );
};

// Sample card data - Large/wide items first to prevent grid holes
const cardData = [
  {
    variant: 'large' as const,
    title: 'Daily Streak Tracking',
    excerpt: 'Build unstoppable learning momentum with daily streak tracking and accountability.',
    image: '',
    className: 'hero-card'
  },
  {
    variant: 'wide' as const,
    title: 'Accountability Groups',
    excerpt: 'Join learning groups and stay motivated with peer support.',
    image: ''
  },
  {
    variant: 'large' as const,
    title: 'Curated Learning Paths',
    excerpt: 'Choose from expertly crafted paths in business writing, Excel shortcuts, and more.',
    image: ''
  },
  {
    variant: 'normal' as const,
    title: '5-15 Minute Lessons',
    excerpt: 'Bite-sized content that fits any schedule.',
    image: ''
  },
  {
    variant: 'normal' as const,
    title: 'Smart Flashcards',
    excerpt: 'Spaced repetition for maximum retention.',
    image: ''
  }
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 id="features-title" className="features-title">Powerful Features</h2>
          <p className="features-subtitle">
            Everything you need to build consistent micro-learning habits and master new skills in just minutes a day.
          </p>
        </div>
        
        <BentoGrid>
          {cardData.map((card, index) => (
            <BentoCard
              key={index}
              variant={card.variant}
              title={card.title}
              excerpt={card.excerpt}
              image={card.image}
              className={card.className || ''}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default FeaturesSection;
