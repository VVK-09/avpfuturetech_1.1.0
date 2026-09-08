import React from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';
import { Mail, Phone, MapPin, ExternalLink, Shield, CheckCircle2, Globe } from 'lucide-react';

export default function Footer() {
  const { setCurrentView, openModal } = useApp();

  const handleNavClick = (sectionId) => {
    const isSub = typeof window !== 'undefined' && (
      window.location.hostname.startsWith('internship.') || 
      window.location.hostname.startsWith('internships.')
    );
    if (typeof window !== 'undefined' && (window.location.pathname.includes('/verify') || window.location.pathname.includes('/domains') || window.location.pathname.includes('/internships'))) {
      const rootPath = isSub ? '/' : '/internships';
      window.history.pushState(null, '', rootPath);
    }
    setCurrentView('landing');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDomainsClick = (e) => {
    if (e) e.preventDefault();
    const isSub = typeof window !== 'undefined' && (
      window.location.hostname.startsWith('internship.') || 
      window.location.hostname.startsWith('internships.')
    );
    if (typeof window !== 'undefined') {
      const domainsPath = isSub ? '/domains' : '/internships/domains';
      window.history.pushState(null, '', domainsPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentView('all-domains');
  };

  const handleVerifyClick = (e) => {
    if (e) e.preventDefault();
    const isSub = typeof window !== 'undefined' && (
      window.location.hostname.startsWith('internship.') || 
      window.location.hostname.startsWith('internships.')
    );
    if (typeof window !== 'undefined') {
      const verifyPath = isSub ? '/verify' : '/internships/verify';
      window.history.pushState(null, '', verifyPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentView('verify');
  };

  return (
    <footer style={{
      backgroundColor: 'var(--primary-navy)',
      color: '#F1F5F9',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* High-tech Cyber PCB Circuit Pattern Overlay */}
      <div className="avp-pattern-circuit-dark" style={{ opacity: 0.25 }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#38BDF8'
              }}>
                <Shield size={13} color="#38BDF8" /> ISO 9001:2015
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
                <a href="https://www.avpfuturetech.com" style={{ color: '#94A3B8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38BDF8'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>
                  <Globe size={14} color="#38BDF8" /> Main Company Website
                </a>
              </li>
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
                <button onClick={handleDomainsClick} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 'inherit', textAlign: 'left' }} onMouseEnter={(e) => e.currentTarget.style.color = '#38BDF8'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>
                  Internship Domains Catalog
                </button>
              </li>
              <li>
                <button onClick={() => openModal('register')} style={{ background: 'none', border: 'none', color: '#38BDF8', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
                  Register for Aptitude Test (₹699)
                </button>
              </li>
              <li>
                <button onClick={handleVerifyClick} style={{ background: 'none', border: 'none', color: '#38BDF8', cursor: 'pointer', padding: 0, fontSize: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Shield size={14} color="#38BDF8" /> Certification Verify
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
              Internship Domains
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              {[
                'Computer Science & IT',
                'AI & Data',
                'Cybersecurity',
                'Electronics & IoT',
                'Business & Mgmt',
                'Marketing & Media'
              ].map((domainName) => (
                <li key={domainName}>
                  <button
                    onClick={handleDomainsClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#94A3B8',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      display: 'inline-block',
                      textAlign: 'left',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; }}
                  >
                    {domainName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', letterSpacing: '-0.2px' }}>
              Headquarters & Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.88rem', color: '#94A3B8' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={17} color="#38BDF8" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ lineHeight: '1.45', color: '#CBD5E1' }}>Nirmiti Lakshminarayan Tower, Kudal, Sindhudurg, Maharashtra – 416520</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={17} color="#38BDF8" style={{ flexShrink: 0 }} />
                <a
                  href="mailto:contact@avpfuturetech.com"
                  style={{ color: '#F1F5F9', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#F1F5F9'; }}
                >
                  contact@avpfuturetech.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Phone size={17} color="#38BDF8" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href="tel:9307076962"
                      style={{ color: '#F1F5F9', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#F1F5F9'; }}
                    >
                      +91 9307076962
                    </a>
                    <span style={{ color: '#64748B' }}>•</span>
                    <a
                      href="tel:7744001079"
                      style={{ color: '#F1F5F9', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#F1F5F9'; }}
                    >
                      +91 7744001079
                    </a>
                  </div>
                  <span style={{ fontSize: '0.76rem', color: '#94A3B8' }}>
                    Mon – Sat, 9:00 AM – 6:00 PM IST
                  </span>
                </div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div>
              © 2026 AVP FutureTech LLP. All rights reserved.
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Made with ❤️ in Kokan</span> • <span>Empowering Future Innovators</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a 
              href="/privacy-policy" 
              style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#93C5FD'}
              onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
              Privacy Policy
            </a>
            <a 
              href="/terms-of-service" 
              style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#93C5FD'}
              onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
              Terms of Service
            </a>

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
