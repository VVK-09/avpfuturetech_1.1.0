import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, ShieldCheck } from 'lucide-react';
import CompanyLogo from '../common/CompanyLogo';

export default function CompanyMarqueeSection() {
  const { companies } = useApp();

  return (
    <section id="students-placed" style={{
      padding: '4.5rem 0',
      backgroundColor: '#F8FAFC',
      backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 50%, #FFFFFF 100%)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Precision Cyber Dot Matrix Pattern */}
      <div className="avp-pattern-dot-matrix" style={{ opacity: 0.45 }} />
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--electric-blue)',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '0.5rem'
        }}>
          <Building2 size={16} /> Placement & Alumni Footprint
        </div>
        <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
          Our Students & Interns Work At Top Tech MNCs
        </h2>
        <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', marginTop: '0.4rem', maxWidth: '640px', margin: '0.4rem auto 0 auto' }}>
          Alumni who completed AVP FutureTech capstones and cleared aptitude evaluations are placed across leading engineering organizations.
        </p>
      </div>

      {/* Marquee Animation Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '0.75rem 0'
      }}>
        {/* Left & Right gradient fade masks */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '140px',
          height: '100%',
          background: 'linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '140px',
          height: '100%',
          background: 'linear-gradient(to left, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* Double array for seamless loop */}
        <div className="animate-marquee" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {[...companies, ...companies].map((comp, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: '14px',
                padding: '0.75rem 1.4rem',
                boxShadow: '0 4px 14px rgba(11, 30, 61, 0.05)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Real Company Vector Logo */}
              <CompanyLogo company={comp} size={36} />

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-navy)', letterSpacing: '-0.2px' }}>
                  {comp.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                  <ShieldCheck size={12} color="var(--electric-blue)" /> {comp.badge || 'Verified Recruiter'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
