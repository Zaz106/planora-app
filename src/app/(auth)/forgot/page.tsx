"use client";
import React, { useState } from "react";
import AnimatedSmoke from "@/components/ui/animated-smoke";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import "../shared.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setSent(true);
    setLoading(false);
  };

  return (
    <section className="auth-hero">
      <div className="auth-background">
        <AnimatedSmoke height="100%" />
      </div>
      <div className="auth-overlay">
        <div className="auth-card" role="dialog" aria-labelledby="forgot-title" aria-describedby="forgot-subtitle">
          <header className="auth-header">
            <Logo size={48} className="auth-logo" />
            <h1 id="forgot-title" className="auth-title">Reset your password</h1>
            <p id="forgot-subtitle" className="auth-subtitle">We'll email you a magic link to reset your password.</p>
          </header>

          {sent ? (
            <p className="auth-error" role="status" style={{background:'#ecfccb', borderColor:'#d9f99d', color:'#3f6212'}}>
              If an account exists for {email}, you'll receive an email shortly.
            </p>
          ) : null}

          <form onSubmit={onSubmit} className="auth-form" aria-disabled={loading}>
            <div className="input-group">
              <input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                required 
                className="auth-input" 
                placeholder="Email" 
                autoComplete="email" 
              />
            </div>

            <button type="submit" className="auth-btn btn-black" disabled={loading || !email}>
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <p className="auth-alt">Remembered it? <Link href="/login" className="auth-link">Back to login</Link></p>
        </div>
      </div>
    </section>
  );
}
