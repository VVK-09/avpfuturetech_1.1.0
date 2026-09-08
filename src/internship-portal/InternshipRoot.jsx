"use client";

import React, { useEffect, useState } from 'react';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './index.css';

export default function InternshipRoot({ initialView = 'landing', initialId = '' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050E1E',
          backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #0A224E 0%, #050E1E 70%, #020710 100%)',
          color: '#ffffff',
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          overflow: 'hidden',
          fontFamily: "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          userSelect: 'none'
        }}
      >
        {/* High-Tech Circuit Background Pattern */}
        <div
          className="pattern-circuit-dark"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.35,
            pointerEvents: 'none'
          }}
        />

        {/* Ambient Pulsing Glow Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30, 99, 214, 0.35) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)',
            filter: 'blur(30px)',
            animation: 'avpAuraPulse 3s ease-in-out infinite alternate',
            pointerEvents: 'none'
          }}
        />

        {/* Outer Circular Tech Ring & Logo Container */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          {/* Futuristic Orbit Ring with Glowing Nodes */}
          <div
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(56, 189, 248, 0.25)',
              animation: 'avpRotateRing 18s linear infinite',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 12px 3px #38BDF8'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#818CF8',
                boxShadow: '0 0 10px 2px #818CF8'
              }}
            />
          </div>

          {/* Inner Counter-Rotating Gradient Ring */}
          <div
            style={{
              position: 'absolute',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              border: '1.5px solid transparent',
              borderTopColor: 'rgba(56, 189, 248, 0.85)',
              borderRightColor: 'rgba(30, 99, 214, 0.45)',
              animation: 'avpRotateCounter 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Main Official White Logo Frame */}
          <div
            style={{
              position: 'relative',
              width: '230px',
              height: '160px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'avpLogoFloat 3s ease-in-out infinite alternate',
              filter: 'drop-shadow(0 0 25px rgba(56, 189, 248, 0.35))'
            }}
          >
            <img
              src="/logos/white-logo.png"
              alt="AVP FutureTech Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
            
            {/* Shimmer / Holographic Scan Sweep */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.25) 50%, transparent 80%)',
                animation: 'avpScanSweep 2.4s ease-in-out infinite',
                pointerEvents: 'none',
                mixBlendMode: 'overlay'
              }}
            />
          </div>

          {/* Glowing Animated Loading Bar & Status */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.85rem',
              textAlign: 'center'
            }}
          >
            {/* High-Tech Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(15, 35, 71, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#38BDF8',
                  boxShadow: '0 0 10px 2px #38BDF8',
                  animation: 'avpDotPulse 1.2s ease-in-out infinite'
                }}
              />
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#E0F2FE'
                }}
              >
                Initializing Portal
              </span>
            </div>

            {/* Glowing Linear Progress Bar */}
            <div
              style={{
                width: '190px',
                height: '3.5px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '60%',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #1E63D6 0%, #38BDF8 50%, #818CF8 100%)',
                  boxShadow: '0 0 12px #38BDF8',
                  animation: 'avpProgressBar 1.8s ease-in-out infinite'
                }}
              />
            </div>

            {/* Subtitle / Verification Tag */}
            <p
              style={{
                fontSize: '0.76rem',
                color: '#94A3B8',
                letterSpacing: '0.04em',
                margin: 0
              }}
            >
              AVP FutureTech · Research & Development
            </p>
          </div>
        </div>

        {/* Global Keyframe Animations */}
        <style>{`
          @keyframes avpRotateRing {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes avpRotateCounter {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes avpAuraPulse {
            0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.92); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          }
          @keyframes avpLogoFloat {
            0% { transform: translateY(0px) scale(1); }
            100% { transform: translateY(-6px) scale(1.02); }
          }
          @keyframes avpScanSweep {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(150%); }
          }
          @keyframes avpDotPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.7); }
          }
          @keyframes avpProgressBar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(50%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <AppProvider initialView={initialView} initialVerifyId={initialId}>
      <div className="avp-internship-portal-app" style={{ minHeight: '100vh' }}>
        <App />
      </div>
    </AppProvider>
  );
}
