import React from 'react';
import './social-proof-section.css';

interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  quote: string;
  avatar?: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: '1',
    name: 'Jessica Park',
    role: 'Marketing Manager',
    quote: 'Finally found a learning app that fits my busy schedule! Just 10 minutes daily and I\'ve built a 47-day streak learning Excel shortcuts. My productivity has skyrocketed.',
  },
  {
    id: '2',
    name: 'Michael Torres',
    role: 'Sales Executive',
    quote: 'The daily micro-lessons are perfect for my commute. I completed the Business Writing path in 3 weeks and immediately applied it to close more deals. The streak system kept me motivated!',
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'College Student',
    quote: 'Who knew learning could be this addictive? The bite-sized lessons and flashcard reviews help me retain everything. My 62-day streak is my proudest achievement this year!',
  }
];

// Star rating component
const StarRating = () => (
  <div className="stars" role="img" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="star"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

// Get initials from name for avatar fallback
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Individual testimonial card
const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
  <article className="testimonial-card" role="listitem">
    <div className="card-content">
      <StarRating />
      <blockquote className="quote">
        "{item.quote}"
      </blockquote>
      <footer className="author">
        <div className="avatar">
          {item.avatar ? (
            <img 
              src={item.avatar} 
              alt={`${item.name}'s profile photo`}
              className="avatar-image"
              loading="lazy"
            />
          ) : (
            <div className="avatar-fallback">
              {getInitials(item.name)}
            </div>
          )}
        </div>
        <div className="author-info">
          <cite className="author-name">{item.name}</cite>
          {item.role && <p className="author-role">{item.role}</p>}
        </div>
      </footer>
    </div>
  </article>
);

const SocialProofSection = () => {
  return (
    <section className="social-proof-section" role="region" aria-labelledby="testimonials-heading">
      <div className="social-proof-container">
        <div className="social-proof-header">
          <h2 id="testimonials-heading" className="social-proof-title">
            Daily Streaks that Build Skills
          </h2>
          <p className="social-proof-subtitle">
            Join thousands of learners who are mastering new skills just 10 minutes at a time
          </p>
        </div>
        
        <div className="testimonial-grid" role="list">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
