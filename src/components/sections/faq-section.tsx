"use client";
import React, { useEffect, useRef, useState } from "react";
import "./faq-section.css";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "How long are the lessons?",
    a: "Each micro‑lesson is designed to take 5–15 minutes and ends with a quick 1–3 question quiz to lock in what you learned.",
  },
  {
    q: "What happens if I miss a day?",
    a: "Your streak resets, but you can set reminders at a time that works for you. We also plan optional 'streak freeze' power‑ups as microtransactions.",
  },
  {
    q: "What is spaced repetition?",
    a: "Important concepts automatically reappear over time (e.g., 1, 3, 7 days) so you remember more with less effort.",
  },
  {
    q: "Can I learn with friends or a team?",
    a: "Yes. Join a learning group to keep each other accountable. The Growth plan includes 6 seats and a shared dashboard for insights.",
  },
  {
    q: "Do I need to be social to use Planora?",
    a: "No. All social features are opt‑in. You can learn privately and still enjoy streaks, analytics, and certificates.",
  },
  {
    q: "Is there an offline mode?",
    a: "Pro unlocks offline mode so you can download lessons and keep your streak when you're traveling or on a low‑signal commute.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. When you complete a path, you can download a shareable certificate—perfect for LinkedIn or your portfolio.",
  },
  {
    q: "How much does it cost?",
    a: "Start free with one path. Pro is $4.99/mo for unlimited paths and advanced features. Growth adds 5 teammate invites (6 seats total).",
  },
];

const CaretIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`caret ${open ? "open" : ""}`}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type FaqItemRowProps = {
  qa: QA;
  index: number;
  open: boolean;
  onToggle: () => void;
};

const FaqItemRow: React.FC<FaqItemRowProps> = ({ qa, index, open, onToggle }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const panelId = `faq-panel-${index}`;
  const btnId = `faq-button-${index}`;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // cancel in-flight animation
    animationRef.current?.cancel();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      panel.style.height = open ? 'auto' : '0px';
      return;
    }

  const current = panel.style.height === 'auto' ? panel.scrollHeight : panel.getBoundingClientRect().height;
    const target = open ? panel.scrollHeight : 0;

  // already at target
    if (Math.abs(current - target) < 1) {
      panel.style.height = open ? 'auto' : '0px';
      return;
    }

  // start from a pixel value
    panel.style.height = `${current}px`;
  // animate height via WAAPI
  panel.style.opacity = '1';
  const anim = panel.animate(
      [ { height: `${current}px` }, { height: `${target}px` } ],
      { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
    );
    animationRef.current = anim;
    anim.onfinish = () => {
      panel.style.height = open ? 'auto' : '0px';
      panel.style.opacity = open ? '1' : ''; // revert to CSS controlled opacity when closed
      animationRef.current = null;
    };
    anim.oncancel = () => { animationRef.current = null; };
  }, [open]);

  return (
    <li className={`faq-item ${open ? "is-open" : ""}`}>
      <button
        id={btnId}
        className="faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="question">{qa.q}</span>
        <CaretIcon open={open} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="faq-panel"
        ref={panelRef}
      >
        <div className="panel-inner">
          <p>{qa.a}</p>
        </div>
      </div>
    </li>
  );
};

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-container">
  <header className="faq-header">
          <h2 id="faq-title" className="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="faq-subtitle">Get quick insights into any questions you may have.</p>
        </header>

        <ul className="faq-list" role="list">
          {faqs.map((item, i) => (
            <FaqItemRow
              key={i}
              qa={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FaqSection;
