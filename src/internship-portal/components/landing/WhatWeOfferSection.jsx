import React, { useState } from 'react';
import { 
  Cpu, 
  Award, 
  Code2, 
  Globe2, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  GitBranch, 
  Clock, 
  Zap, 
  Check
} from 'lucide-react';

export default function WhatWeOfferSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const offers = [
    {
      gradient: 'linear-gradient(135deg, #1E63D6 0%, #4F46E5 100%)',
      glowColor: 'rgba(30, 99, 214, 0.25)',
      icon: (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Cpu size={28} color="#FFFFFF" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#FFFFFF', borderRadius: '50%', padding: '2px', display: 'flex' }}>
            <Sparkles size={12} color="#1E63D6" />
          </div>
        </div>
      ),
      badgeText: '2026 Industry Spec',
      badgeColor: '#1E40AF',
      badgeBg: '#DBEAFE',
      title: 'Industry-Standard Curriculum',
      description: 'Crafted with senior tech leads to match real enterprise production stacks: PyTorch 2.4, FastAPI, Spring Boot 3, React 18, Kafka Streams & Burp Suite.'
    },
    {
      gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      icon: (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Award size={28} color="#FFFFFF" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#FFFFFF', borderRadius: '50%', padding: '2px', display: 'flex' }}>
            <ShieldCheck size={12} color="#059669" />
          </div>
        </div>
      ),
      badgeText: 'ISO 9001:2015 & MCA',
      badgeColor: '#065F46',
      badgeBg: '#D1FAE5',
      title: 'Verifiable ISO & MCA Certificate',
      description: 'Receive an official, tamper-proof Certificate of Internship with a verifiable QR code, unique Credential ID, and personalized Letter of Recommendation (LOR).'
    },
    {
      gradient: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
      glowColor: 'rgba(2, 132, 199, 0.25)',
      icon: (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Code2 size={28} color="#FFFFFF" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#FFFFFF', borderRadius: '50%', padding: '2px', display: 'flex' }}>
            <GitBranch size={12} color="#0284C7" />
          </div>
        </div>
      ),
      badgeText: 'Production Grade',
      badgeColor: '#075985',
      badgeBg: '#E0F2FE',
      title: 'Live Real-World Capstones',
      description: 'Move beyond basic toy tutorials. Engineer autonomous RAG AI research agents, high-throughput microservice SaaS platforms, and enterprise pentest audits for your portfolio.'
    },
    {
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
      glowColor: 'rgba(124, 58, 237, 0.25)',
      icon: (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Globe2 size={28} color="#FFFFFF" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#FFFFFF', borderRadius: '50%', padding: '2px', display: 'flex' }}>
            <Clock size={12} color="#7C3AED" />
          </div>
        </div>
      ),
      badgeText: '100% Remote & Self-Paced',
      badgeColor: '#5B21B6',
      badgeBg: '#EDE9FE',
      title: 'Flexible Milestone Learning',
      description: 'Learn at your own pace alongside your college academics. Clear weekly deliverables and 24/7 LMS milestone submissions ensure stress-free balance with semester exams.'
    },
    {
      gradient: 'linear-gradient(135deg, #E11D48 0%, #F43F5E 100%)',
      glowColor: 'rgba(225, 29, 72, 0.25)',
      icon: (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Users size={28} color="#FFFFFF" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#FFFFFF', borderRadius: '50%', padding: '2px', display: 'flex' }}>
            <CheckCircle2 size={12} color="#E11D48" />
          </div>
        </div>
      ),
      badgeText: '1-on-1 Mentorship',
      badgeColor: '#9F1239',
      badgeBg: '#FFE4E6',
      title: 'Senior Mentor Code Reviews',
      description: 'Every task submission receives granular line-by-line feedback, architectural pointers, and code optimization reviews directly from experienced engineers.'
    },
    {
      gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      glowColor: 'rgba(217, 119, 6, 0.25)',
      icon: (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={28} color="#FFFFFF" />
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#FFFFFF', borderRadius: '50%', padding: '2px', display: 'flex' }}>
            <Sparkles size={12} color="#D97706" />
          </div>
        </div>
      ),
      badgeText: 'Save 88% / ₹5,300',
      badgeColor: '#92400E',
      badgeBg: '#FEF3C7',
      title: 'Merit-Based ₹699 Pricing',
      description: 'We reward aptitude and hard work. Score 80%+ on our 60-min Aptitude Evaluation to unlock the complete 3-month track with all deliverables at just ₹699 (Standard ₹5,999).'
    }
  ];

  return (
    <section id="what-we-offer" className="section-py" style={{
      backgroundColor: '#F8FAFC',
      backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 50%, #FFFFFF 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 3D Isometric Lattice Pattern */}
      <div className="avp-pattern-isometric-lattice" style={{ opacity: 0.55 }} />

      {/* Decorative ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(30, 99, 214, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, rgba(255, 255, 255, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '3.5rem' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.5px' }}>
            Empowering Future Engineers with Real Industry Rigor
          </h2>
          <p className="section-desc" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}>
            We provide an immersive, production-focused internship designed to transform computer science, IT, and engineering students into job-ready technical talent.
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: '2rem'
        }}>
          {offers.map((offer, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: isHovered ? '1.5px solid var(--electric-blue)' : '1.5px solid var(--border-light)',
                  padding: '2rem 1.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isHovered 
                    ? `0 20px 35px -10px ${offer.glowColor}, 0 6px 15px -4px rgba(0,0,0,0.06)` 
                    : '0 4px 16px -2px rgba(11, 30, 61, 0.04)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer'
                }}
              >
                {/* Top Subtle Color Accent Bar on Hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: offer.gradient,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }} />

                {/* Card Top Row: Glowing Icon Box & Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.4rem'
                }}>
                  {/* Glowing Squircle Icon Container */}
                  <div style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '16px',
                    background: offer.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 20px -4px ${offer.glowColor}`,
                    transform: isHovered ? 'scale(1.06) rotate(2deg)' : 'scale(1) rotate(0deg)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    {offer.icon}
                  </div>

                  {/* Feature Status Badge */}
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: offer.badgeColor,
                    backgroundColor: offer.badgeBg,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    letterSpacing: '0.2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <Check size={12} strokeWidth={3} />
                    {offer.badgeText}
                  </span>
                </div>

                {/* Card Heading */}
                <h3 style={{
                  fontSize: '1.28rem',
                  color: 'var(--primary-navy)',
                  fontWeight: 800,
                  lineHeight: 1.3,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.2px'
                }}>
                  {offer.title}
                </h3>

                {/* Card Description */}
                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.65,
                  margin: 0
                }}>
                  {offer.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
