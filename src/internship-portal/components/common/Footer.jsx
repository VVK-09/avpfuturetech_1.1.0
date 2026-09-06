import React from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';
import { Mail, Phone, MapPin, ExternalLink, Shield, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { setCurrentView, openModal } = useApp();

  const handleNavClick = (sectionId) => {
    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer style={{
      backgroundColor: 'var(--primary-navy)',
      color: '#F1F5F9',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Column 1: Official Brand Logo & Mission */}
          <div>
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center' }}>
              <Logo size="lg" variant="light" style={{ height: '76px' }} />
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.65, maxWidth: '340px' }}>
              AVP FutureTech LLP is an industry-focused technical education and internship organization. We bridge academia with enterprise tech through verified project execution and hands-on mentorship.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(30, 99, 214, 0.25)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#93C5FD'
              }}>
                <CheckCircle2 size={13} color="#38BDF8" /> MCA Registered LLP
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#CBD5E1'
              }}>
                <Shield size={13} color="#CBD5E1" /> ISO 9001:2015 Certified
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', letterSpacing: '-0.2px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li>
                <button onClick={() => handleNavClick('hero')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('what-we-offer')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
                  What We Offer
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('domains')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
                  Internship Domains
                </button>
              </li>
              <li>
                <button onClick={() => openModal('register')} style={{ background: 'none', border: 'none', color: '#38BDF8', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
                  Register for Aptitude Test (₹699)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('testimonials')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
                  Student Reviews & Placements
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Internship Domains */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', letterSpacing: '-0.2px' }}>
              6 Internship Tracks
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <li>AI & Machine Learning (GenAI & LLMs)</li>
              <li>Data Science & Business Analytics</li>
              <li>Cybersecurity & Ethical Hacking</li>
              <li>Python Full Stack Development</li>
              <li>Java Full Stack Development</li>
              <li>Mobile App Development (Flutter/React Native)</li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', letterSpacing: '-0.2px' }}>
              Headquarters & Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="#38BDF8" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>AVP FutureTech LLP, Tech Innovation Hub, Bengaluru, Karnataka 560100</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} color="#38BDF8" style={{ flexShrink: 0 }} />
                <span>admissions@avpfuturetech.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="#38BDF8" style={{ flexShrink: 0 }} />
                <span>+91 98765 43210 (Mon-Sat, 9AM-6PM IST)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 AVP FutureTech LLP. All rights reserved. Registered under Ministry of Corporate Affairs (MCA), Govt. of India.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Verification Desk</span>

            {/* Discreet Admin Login Link */}
            <button
              onClick={() => openModal('admin-login')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#475569',
                fontSize: '0.78rem',
                cursor: 'pointer',
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#93C5FD'}
              onMouseLeave={(e) => e.target.style.color = '#475569'}
            >
              Staff & Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
