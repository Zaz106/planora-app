import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function PageLayout({ 
  children, 
  title, 
  subtitle, 
  className = "" 
}: PageLayoutProps) {
  return (
    <div className="page-container">
      <div className={`container mx-auto py-8 ${className}`}>
        {(title || subtitle) && (
          <div className="text-center space-y-4 mb-8">
            {title && <h1 className="text-heading-1">{title}</h1>}
            {subtitle && <p className="text-body">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
