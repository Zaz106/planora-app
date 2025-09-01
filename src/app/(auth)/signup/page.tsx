"use client";
import React, { useState } from "react";
import AnimatedSmoke from "@/components/ui/animated-smoke";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import "../shared.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Password requirements state
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  // Check password requirements
  const checkRequirements = (pwd: string) => {
    setRequirements({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd)
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkRequirements(newPassword);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Design-only: mimic a short delay
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
  };

  const onGoogle = async () => { setLoading(true); await new Promise(r=>setTimeout(r,500)); setLoading(false); };
  const onGithub = async () => { setLoading(true); await new Promise(r=>setTimeout(r,500)); setLoading(false); };

  return (
    <section className="auth-hero">
      <div className="auth-background">
        <AnimatedSmoke height="100%" />
      </div>
      <div className="auth-overlay">
        <div className="auth-card" role="dialog" aria-labelledby="signup-title" aria-describedby="signup-subtitle">
          <header className="auth-header">
            <Logo size={48} className="auth-logo" />
            <h1 id="signup-title" className="auth-title">Get Started</h1>
            <p id="signup-subtitle" className="auth-subtitle">Start building consistent learning habits that fit your busy schedule.</p>
          </header>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <form onSubmit={onSubmit} className="auth-form">
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

            <div className="input-group">
              <input 
                id="password" 
                type="password" 
                value={password} 
                onChange={handlePasswordChange} 
                required 
                className="auth-input" 
                placeholder="Password" 
                autoComplete="new-password" 
              />
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="password-container">
                <div className="password-requirements">
                  <div className={`requirement ${requirements.length ? 'met' : ''}`}>
                    <span className="requirement-icon">{requirements.length ? '✓' : '✕'}</span>
                    At least 8 characters
                  </div>
                  <div className={`requirement ${requirements.uppercase ? 'met' : ''}`}>
                    <span className="requirement-icon">{requirements.uppercase ? '✓' : '✕'}</span>
                    One uppercase letter
                  </div>
                  <div className={`requirement ${requirements.lowercase ? 'met' : ''}`}>
                    <span className="requirement-icon">{requirements.lowercase ? '✓' : '✕'}</span>
                    One lowercase letter
                  </div>
                  <div className={`requirement ${requirements.number ? 'met' : ''}`}>
                    <span className="requirement-icon">{requirements.number ? '✓' : '✕'}</span>
                    One number
                  </div>
                </div>
                
                <button type="submit" className="auth-btn btn-black" disabled={loading || !email || !password}>
                  {loading ? "Creating…" : "Create account"}
                </button>
              </div>
            )}

            {!password && (
              <button type="submit" className="auth-btn btn-black" disabled={loading || !email || !password}>
                {loading ? "Creating…" : "Create account"}
              </button>
            )}
          </form>

          <div className="auth-divider"><span>or</span></div>

          <div className="auth-providers">
            <button onClick={onGoogle} className="auth-provider provider-google" type="button" disabled={loading} aria-label="Continue with Google">
              <svg className="provider-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button onClick={onGithub} className="auth-provider provider-github" type="button" disabled={loading} aria-label="Continue with GitHub">
              <svg className="provider-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p className="auth-alt">Already have an account? <Link href="/login" className="auth-link">Log in</Link></p>
           <p className="auth-legal">By continuing, you acknowledge that you have read and agree to our <Link href="/terms" className="auth-link">Terms of Service</Link> and <Link href="/privacy" className="auth-link">Privacy Policy</Link>.</p>
        </div>
      </div>
    </section>
  );
}
