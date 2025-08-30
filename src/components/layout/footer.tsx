import React from "react";
import Link from "next/link";
import "./footer.css";

const Icon = ({ path }: { path: string }) => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);

const socialLinks = [
  { href: "https://github.com", label: "GitHub", path: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.55-3.9-1.55-.53-1.33-1.3-1.68-1.3-1.68-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.11-.76.41-1.26.74-1.55-2.57-.29-5.27-1.29-5.27-5.75 0-1.27.46-2.31 1.2-3.12-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.21 1.19a11.1 11.1 0 0 1 5.84 0c2.23-1.5 3.21-1.19 3.21-1.19.63 1.59.23 2.76.11 3.05.75.81 1.2 1.85 1.2 3.12 0 4.47-2.71 5.45-5.29 5.74.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" },
  { href: "https://www.youtube.com", label: "YouTube", path: "M23.5 6.2s-.23-1.64-.95-2.36c-.91-.95-1.93-.95-2.4-1C16.9 2.5 12 2.5 12 2.5h-.01s-4.9 0-8.14.34c-.47.05-1.49.05-2.4 1-.72.72-.95 2.36-.95 2.36S0 8.05 0 9.9v1.72c0 1.86.1 3.7.1 3.7s.23 1.64.95 2.36c.91.95 2.1.92 2.64 1.02 1.92.19 8.3.26 8.3.26s4.91-.01 8.15-.35c.47-.05 1.49-.05 2.4-1 .72-.72.95-2.36.95-2.36s.1-1.85.1-3.7V9.9c0-1.85-.1-3.7-.1-3.7ZM9.5 13.5V7.5l6 3-6 3Z" },
  { href: "https://www.instagram.com", label: "Instagram", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-3.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.25 6Z" },
  { href: "https://twitter.com", label: " Twitter", path: "M18.244 2H21l-6.56 7.49L22 22h-6.8l-4.39-5.66L5.6 22H3l7.06-8.06L2 2h6.92l3.98 5.3L18.244 2Zm-2.38 18h1.88L8.26 4H6.32l9.544 16Z" },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <div className="footer-container">
        <div className="footer-top">
          <div className="brand" aria-label="Planora">
            <span className="dot" />
            <span>Planora</span>
          </div>

          <div className="cols">
            <div className="col">
              <h3>Learn</h3>
              <ul className="links" role="list">
                <li><Link href="#" aria-label="Getting started">Getting started</Link></li>
                <li><Link href="#" aria-label="Guides">Guides</Link></li>
                <li><Link href="#" aria-label="Samples">Samples</Link></li>
                <li><Link href="#" aria-label="GitHub repository">GitHub</Link></li>
              </ul>
            </div>
            <div className="col">
              <h3>Support</h3>
              <ul className="links" role="list">
                <li><Link href="#" aria-label="Help center">Help center</Link></li>
                <li><Link href="#" aria-label="Release notes">Release notes</Link></li>
                <li><Link href="#" aria-label="Frequently asked questions">FAQs</Link></li>
                <li><Link href="#" aria-label="Contact">Contact</Link></li>
              </ul>
            </div>
            <div className="col">
              <h3>Tools for learners</h3>
              <ul className="links" role="list">
                <li><Link href="#" aria-label="iOS app">iOS</Link></li>
                <li><Link href="#" aria-label="Android app">Android</Link></li>
                <li><Link href="#" aria-label="Web app">Web</Link></li>
                <li><Link href="#" aria-label="All products">All products</Link></li>
              </ul>
            </div>
            <div className="col">
              <h3>Socials</h3>
              <ul className="links" role="list">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} target="_blank" rel="noreferrer noopener" aria-label={`Follow on ${s.label}`}>
                      <span className="social-link">
                        <Icon path={s.path} />
                        <span>{s.label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hr" />

        <div className="footer-bottom">
          <div className="copyright">© {new Date().getFullYear()} Planora. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
