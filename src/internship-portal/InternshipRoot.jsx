"use client";

import React, { useEffect, useState } from 'react';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './index.css';

export default function InternshipRoot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#07152B',
        color: '#ffffff'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(56, 189, 248, 0.2)',
          borderTopColor: '#38BDF8',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#93C5FD', fontWeight: 600 }}>
          Loading AVP FutureTech Internship Portal...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="avp-internship-portal-app" style={{ minHeight: '100vh' }}>
        <App />
      </div>
    </AppProvider>
  );
}
