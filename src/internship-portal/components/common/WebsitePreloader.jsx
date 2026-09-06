import React, { useState, useEffect } from 'react';

export default function WebsitePreloader() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      const hasLoaded = sessionStorage.getItem('avp_site_preloaded');
      return !hasLoaded;
    } catch {
      return true;
    }
  });

  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Smooth progress counter from 0% to 100% over ~2200ms (2.2 seconds)
    const startTime = performance.now();
    const duration = 2200;

    let animationFrameId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Smooth cubic-out easing curve for fluid, futuristic acceleration
      const easedProgress = Math.min(100, Math.round((1 - Math.pow(1 - progressRatio, 2.8)) * 100));
      setProgress(easedProgress);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setIsFadingOut(true);
        try {
          sessionStorage.setItem('avp_site_preloaded', 'true');
        } catch (err) {
          console.error(err);
        }

        // Clean removal from DOM after smooth fade transition
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 500);

        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // SVG Circle calculations (radius: 56px => circumference: ~351.86px)
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Tip flare position calculations on the 360 circle
  const angleInDegrees = (progress / 100) * 360 - 90;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  const flareX = 70 + radius * Math.cos(angleInRadians);
  const flareY = 70 + radius * Math.sin(angleInRadians);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        userSelect: 'none'
      }}
    >
      <style>{`
        @keyframes avpSpinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes avpSpinCounter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes avpPulseRing {
          0% { transform: scale(0.92); opacity: 0.2; }
          50% { transform: scale(1.08); opacity: 0.5; }
          100% { transform: scale(0.92); opacity: 0.2; }
        }
        @keyframes avpGridPulse {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }
        @keyframes avpFlareBeacon {
          0%, 100% { r: 4; opacity: 1; filter: drop-shadow(0 0 8px #38BDF8); }
          50% { r: 5.5; opacity: 0.9; filter: drop-shadow(0 0 14px #FFFFFF); }
        }
      `}</style>

      {/* Cyber Grid Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          animation: 'avpGridPulse 4s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />

      {/* Ambient Radial Deep Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          width: '620px',
          height: '620px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(30, 58, 138, 0.08) 45%, rgba(0, 0, 0, 0) 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'avpPulseRing 3.5s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />

      {/* Main Content Wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1.5rem',
          maxWidth: '480px',
          width: '100%'
        }}
      >
        {/* White PNG Given Logo (Clean & Crisp) */}
        <div
          style={{
            position: 'relative',
            marginBottom: '1.25rem'
          }}
        >
          <img
            src="/avp-logo-white.png"
            alt="AVP FUTURETECH"
            style={{
              width: '100%',
              maxWidth: '290px',
              height: 'auto',
              display: 'block',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Tagline Subtitle */}
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#A1A1AA',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-heading, "Outfit", sans-serif)'
          }}
        >
          <span style={{ height: '1px', width: '24px', background: 'linear-gradient(90deg, transparent, rgba(161, 161, 170, 0.6))' }} />
          <span>LEARN • INNOVATE • TRANSFORM</span>
          <span style={{ height: '1px', width: '24px', background: 'linear-gradient(90deg, rgba(161, 161, 170, 0.6), transparent)' }} />
        </div>

        {/* CIRCULAR LOADER WIDGET */}
        <div
          style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}
        >
          {/* Outer Rotating Segmented Tech Ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-14px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(56, 189, 248, 0.35)',
              animation: 'avpSpinClockwise 12s linear infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Concentric Counter-Rotating Outer Orbit with Satellite Dots */}
          <div
            style={{
              position: 'absolute',
              inset: '-22px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              animation: 'avpSpinCounter 16s linear infinite',
              pointerEvents: 'none'
            }}
          >
            {/* Satellite Node 1 */}
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 10px #38BDF8, 0 0 20px #38BDF8'
              }}
            />
            {/* Satellite Node 2 */}
            <div
              style={{
                position: 'absolute',
                bottom: '-3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981'
              }}
            />
          </div>

          {/* SVG Circular Progress Meter */}
          <svg
            viewBox="0 0 140 140"
            style={{
              width: '100%',
              height: '100%',
              transform: 'rotate(-90deg)',
              overflow: 'visible'
            }}
          >
            <defs>
              {/* Vibrant neon gradient stroke */}
              <linearGradient id="avpCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="85%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              {/* Neon Glow Filter */}
              <filter id="avpCircleGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Static Track Ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="5"
            />

            {/* Inner Accent Ring */}
            <circle
              cx="70"
              cy="70"
              r={radius - 12}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Animated Loading Circle Ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="url(#avpCircleGradient)"
              strokeWidth="5.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="url(#avpCircleGlow)"
              style={{
                transition: 'stroke-dashoffset 0.08s linear'
              }}
            />

            {/* Dynamic Flare Beacon at the leading progress tip */}
            {progress > 0 && (
              <circle
                cx={flareX}
                cy={flareY}
                r="4.5"
                fill="#FFFFFF"
                style={{
                  animation: 'avpFlareBeacon 1s ease-in-out infinite',
                  transform: 'rotate(90deg)',
                  transformOrigin: '70px 70px'
                }}
              />
            )}
          </svg>

          {/* Center Hub: Digital Percentage Readout */}
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '82px',
              height: '82px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(15, 23, 42, 0.85) 0%, rgba(0, 0, 0, 0.95) 80%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.18), inset 0 0 15px rgba(0, 0, 0, 0.8)'
            }}
          >
            {/* Live Numerical Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
                fontWeight: 800,
                fontSize: '1.5rem',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textShadow: '0 0 15px rgba(56, 189, 248, 0.8)'
              }}
            >
              <span>{progress}</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#38BDF8',
                  fontWeight: 700,
                  marginLeft: '2px'
                }}
              >
                %
              </span>
            </div>

            {/* Micro Live Indicator */}
            <span
              style={{
                fontSize: '0.52rem',
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.12em',
                marginTop: '4px',
                textTransform: 'uppercase'
              }}
            >
              {progress < 100 ? 'SYNCING' : 'LOADED'}
            </span>
          </div>
        </div>

        {/* Futuristic Dynamic Telemetry Status Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Pulsing Status Dot */}
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: progress < 100 ? '#38BDF8' : '#10B981',
              boxShadow: progress < 100 
                ? '0 0 8px #38BDF8, 0 0 14px #38BDF8' 
                : '0 0 8px #10B981, 0 0 14px #10B981',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
            }}
          />

          {/* Telemetry Stage Message */}
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#CBD5E1',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading, "Outfit", sans-serif)'
            }}
          >
            {progress < 30 && 'INITIALIZING SYSTEM...'}
            {progress >= 30 && progress < 65 && 'LOADING 2026 CURRICULUM...'}
            {progress >= 65 && progress < 95 && 'SYNCHRONIZING DOMAIN MODULES...'}
            {progress >= 95 && 'PORTAL READY • ENTERING'}
          </span>
        </div>
      </div>
    </div>
  );
}
