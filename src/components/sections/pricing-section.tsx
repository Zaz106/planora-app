"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./pricing-section.css";

type Feature = { label: string; heading?: boolean };
type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description:
      "Start your habit with one learning path, daily 10‑minute lessons and streak counter",
    features: [
      { label: "1 Learning path" },
      { label: "Daily micro‑lessons" },
      { label: "Basic flashcards" },
      { label: "Reminders at your preferred time" },
      { label: "Streak leaderboard" },
      { label: "Accountability groups & streak nudges" },
    ],
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/mo",
    description:
      "Unlock unlimited paths and more to transform your learning experience.",
    features: [
      { label: "Everything in Free, plus:", heading: true },
      { label: "Unlimited learning paths" },
      { label: "Advanced flashcards" },
      { label: "Progress analytics & trends" },
      { label: "Downloadable certificates" },
      { label: "Access to premium lesson packs (in‑app purchases)" },
    ],
    highlighted: true,
  },
  {
    name: "Growth",
    price: "$19.99",
    period: "/mo",
    description:
      "For small teams who want to learn together more effectively in a cohesive environment.",
    features: [
      { label: "Everything in Pro, plus:", heading: true },
      { label: "6 Seats" },
      { label: "Team dashboards " },
      { label: "Group challenges + Mini weekend challenges" },
      { label: "Admin controls & bulk management" },
      { label: "Priority support" },
    ],
  },
];

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Animated two-color border that tracks the exact size of its container
const AnimatedBorder: React.FC<{ radius?: number; baseSpeed?: number }>=({ radius = 12, baseSpeed = 22 })=>{
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0, r: radius });
  const purpleRef = useRef<SVGRectElement>(null);
  const orangeRef = useRef<SVGRectElement>(null);

  useLayoutEffect(()=>{
    const el = ref.current?.parentElement as HTMLElement | null;
    if(!el) return;
    const ro = new ResizeObserver(()=>{
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const br = cs.borderRadius || "";
      const m = br.match(/([0-9]+(?:\.[0-9]+)?)/);
      const rPx = m ? parseFloat(m[1]) : radius;
      setBox({ w: Math.max(0, Math.floor(rect.width)), h: Math.max(0, Math.floor(rect.height)), r: Math.max(0, rPx - 1) });
    });
    ro.observe(el);
    return ()=> ro.disconnect();
  },[]);

  useEffect(()=>{
    let raf = 0;
    const start = performance.now();
    const run = (t:number)=>{
      const w = box.w; const h = box.h; if(!w || !h) { raf = requestAnimationFrame(run); return; }
      // pathLength normalized to 100
      const P = 2*(w+h);
      const topF = w / P * 100; // fraction of 100
      const rightF = h / P * 100;
      const bottomF = topF;
      const leftF = rightF;

      const cycle = (baseSpeed>0? baseSpeed:22); // units per second in pathLength space
      const now = performance.now();
      const dt = (now - (run as any).prevTime || 16) / 1000; (run as any).prevTime = now;
      // compute offset progression with variable speeds: faster on short sides
      const speedTopBottom = cycle * 1; // baseline
      const ratio = w && h ? Math.max(1, Math.min(2, w/h)) : 1; // clamp 1..2
      const speedLeftRight = cycle * ratio; // boost on short sides

      const advance = (offset:number)=>{
        // figure out which segment the head is in and advance accordingly
        // offset goes from 0..100
        let o = (offset % 100 + 100) % 100;
        const segs = [topF, topF+rightF, topF+rightF+bottomF, 100];
        const v = o < segs[0] ? speedTopBottom
              : o < segs[1] ? speedLeftRight
              : o < segs[2] ? speedTopBottom
              : speedLeftRight;
        o = o - v*dt; // move forward along path
        if(o < 0) o += 100; // wrap
        return o;
      };

      const p = purpleRef.current; const oRect = orangeRef.current;
      if(p && oRect){
        // store last offsets in dataset (fallback to 0 / 50 phase)
        const pOff = +(p.dataset.off || '0');
        const oOff = +(oRect.dataset.off || '50');
        const np = advance(pOff);
        const no = advance(oOff);
        p.dataset.off = String(np);
        oRect.dataset.off = String(no);
        p.setAttribute('stroke-dashoffset', String(np));
        oRect.setAttribute('stroke-dashoffset', String(no));
      }
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return ()=> cancelAnimationFrame(raf);
  },[box.w, box.h, baseSpeed]);

  if(!box.w || !box.h) return <div ref={ref} aria-hidden="true" />;
  const pad = 1; // keep stroke inside edges
  const w = box.w - pad * 2;
  const h = box.h - pad * 2;
  const r = box.r;

  return (
    <svg className="shimmer-svg" width={box.w} height={box.h} aria-hidden="true">
      <defs>
        <linearGradient id="ab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(147,51,234,0.302)" />
          <stop offset="50%" stopColor="rgba(249,115,22,0.302)" />
          <stop offset="100%" stopColor="rgba(147,51,234,0.302)" />
        </linearGradient>
      </defs>
      {/* subtle base gradient border */}
      <rect x={pad} y={pad} width={w} height={h} rx={r} ry={r} className="ab-base" />
      {/* moving tapered glints */}
      <rect
        ref={purpleRef}
        className="glint purple"
        x={pad}
        y={pad}
        width={w}
        height={h}
        rx={r}
        ry={r}
  pathLength={100}
  strokeDasharray="24 84"
        strokeDashoffset={0}
      />
      <rect
        ref={orangeRef}
        className="glint orange"
        x={pad}
        y={pad}
        width={w}
        height={h}
        rx={r}
        ry={r}
  pathLength={100}
  strokeDasharray="24 84"
        strokeDashoffset={50}
      />
    </svg>
  );
}

const PricingSection: React.FC = () => {
  return (
    <section className="pricing-section" aria-labelledby="pricing-title">
      <div className="pricing-container">
        <header className="pricing-header">
          <h2 id="pricing-title" className="pricing-title">
            Simple, transparent pricing
          </h2>
          <p className="pricing-subtitle">
            Start free. Upgrade anytime as your momentum grows.
          </p>
        </header>

        <ul className="pricing-grid" role="list">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`pricing-card ${plan.highlighted ? "is-highlighted shimmering" : ""}`}
              data-shimmer-speed="10s"
              data-shimmer-intensity="1"
            >
              {plan.highlighted && (<AnimatedBorder radius={12} baseSpeed={11} />)}
              <div className="card-inner">
                <div className="card-head">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="price-row">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p className="plan-desc">{plan.description}</p>
                </div>

                <ul className="features" role="list">
                  {plan.features.map((f, i) => (
                    <li key={i} className={`feature${f.heading ? " heading" : ""}`}>
                      {!f.heading && (
                        <span className="check">
                          <CheckIcon />
                        </span>
                      )}
                      <span className="label">{f.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="card-cta">
                  <button
                    className="choose-btn btn-black"
                    type="button"
                    aria-label={`Choose ${plan.name} plan`}
                  >
                    Choose plan
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PricingSection;
