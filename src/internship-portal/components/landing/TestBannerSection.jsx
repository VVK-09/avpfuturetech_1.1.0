import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Clock, 
  FileCheck2, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  BrainCircuit, 
  BookOpenCheck,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

export default function TestBannerSection() {
  const { openModal } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      id: 'A',
      title: 'Section A: Numerical Aptitude & Quantitative',
      qs: '20 Questions',
      marks: '20 Marks',
      timeRec: '25 Mins',
      desc: 'Evaluates computational speed, arithmetic reasoning, percentages, ratios, probability, and data interpretation.',
      topics: ['Arithmetic & Percentages', 'Speed & Distance', 'Ratios & Averages', 'Probability & Permutations', 'Data Interpretation'],
      icon: Calculator,
      color: '#38BDF8',
      bgGlow: 'rgba(56, 189, 248, 0.15)'
    },
    {
      id: 'B',
      title: 'Section B: Logical & Algorithmic Reasoning',
      qs: '20 Questions',
      marks: '20 Marks',
      timeRec: '25 Mins',
      desc: 'Assesses pattern recognition, logical deduction, algorithmic sequences, coding-decoding, and puzzle solving.',
      topics: ['Pattern & Number Series', 'Coding-Decoding', 'Blood Relations & Direction', 'Syllogisms & Deductions', 'Algorithmic Logic'],
      icon: BrainCircuit,
      color: '#818CF8',
      bgGlow: 'rgba(129, 140, 248, 0.15)'
    },
    {
      id: 'C',
      title: 'Section C: Technical English & Communication',
      qs: '10 Questions',
      marks: '10 Marks',
      timeRec: '10 Mins',
      desc: 'Measures reading comprehension, technical vocabulary, sentence correction, and professional corporate tone.',
      topics: ['Technical Grammar', 'Corporate Vocabulary', 'Reading Comprehension', 'Sentence Correction', 'Error Spotting'],
      icon: BookOpenCheck,
      color: '#34D399',
      bgGlow: 'rgba(52, 211, 153, 0.15)'
    }
  ];

  return (
    <section id="test-banner" style={{
      padding: 'clamp(3rem, 6vw, 5rem) 0',
      background: 'linear-gradient(135deg, #050E1D 0%, #0B1E3D 45%, #163B75 100%)',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* High-tech grid background overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.8,
        pointerEvents: 'none'
      }} />

      {/* Ambient Neon Lighting */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-5%',
        width: 'min(500px, 90vw)',
        height: 'min(500px, 90vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30, 99, 214, 0.25) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: 'min(550px, 90vw)',
        height: 'min(550px, 90vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '0 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
          alignItems: 'center'
        }}>
          {/* Left Column: Exam Details & Merit Value Proposition */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 2.85rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.18,
              marginBottom: '1.15rem',
              letterSpacing: '-0.02em'
            }}>
              AVP FutureTech Internship Aptitude Test 2026
            </h2>

            <p style={{
              fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
              color: '#CBD5E1',
              lineHeight: 1.65,
              marginBottom: '2rem'
            }}>
              A comprehensive 60-minute qualifying examination designed to test numerical aptitude, logical reasoning, and English technical communication. Candidates scoring <strong style={{ color: '#38BDF8' }}>80% or above</strong> earn our exclusive <strong style={{ color: '#4ADE80' }}>₹699 Merit Scholarship</strong> (saving ₹5,300).
            </p>

            {/* Test Features 3-Card Grid */}
            <div className="test-banner-metrics-grid" style={{
              gap: '0.85rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 0.9rem',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38BDF8',
                    flexShrink: 0
                  }}>
                    <Clock size={16} />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 600 }}>Total Duration</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF' }}>60 Minutes</div>
                <div style={{ fontSize: '0.7rem', color: '#38BDF8', marginTop: '0.15rem' }}>Auto-Save Enabled</div>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 0.9rem',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(129, 140, 248, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818CF8',
                    flexShrink: 0
                  }}>
                    <FileCheck2 size={16} />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 600 }}>Question Count</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF' }}>50 MCQs</div>
                <div style={{ fontSize: '0.7rem', color: '#818CF8', marginTop: '0.15rem' }}>3 Core Sections</div>
              </div>

              <div className="test-banner-metric-merit" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 0.9rem',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(52, 211, 153, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#34D399',
                    flexShrink: 0
                  }}>
                    <Award size={16} />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 600 }}>Merit Subsidy</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#4ADE80' }}>Score 80%+ → ₹699</div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.15rem' }}>Save 88% on Fees</div>
              </div>
            </div>

            {/* Action Buttons (Desktop Only) */}
            <div className="desktop-banner-cta" style={{ gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => openModal('register')}
                className="btn btn-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--primary-navy)',
                  fontWeight: 800,
                  fontSize: '0.98rem',
                  borderRadius: '12px',
                  padding: '0.85rem 1.65rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.25s ease',
                  width: 'min(100%, 320px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(56, 189, 248, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.35)';
                }}
              >
                <span>Register for Test Now</span>
                <ArrowRight size={18} color="var(--primary-navy)" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Exam Pattern & Section Breakdown Card */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '20px',
              padding: 'clamp(1.25rem, 3.5vw, 2rem)',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top Accent Gradient Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #38BDF8 0%, #818CF8 50%, #34D399 100%)'
              }} />

              {/* Card Title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.35rem',
                flexWrap: 'wrap',
                gap: '0.6rem'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}>
                  <FileCheck2 size={22} color="#38BDF8" style={{ flexShrink: 0 }} />
                  <span>Exam Pattern Breakdown</span>
                </h3>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                  color: '#38BDF8',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  whiteSpace: 'nowrap'
                }}>
                  Total: 50 Marks / 50 Qs
                </span>
              </div>

              {/* 3 Section Breakdown Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <div
                      key={sec.id}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '14px',
                        padding: '1rem 1.15rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      {/* Top row: Icon + Title + Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '0.65rem',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.7rem',
                          minWidth: 0,
                          flex: '1 1 200px'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: sec.bgGlow,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: sec.color,
                            flexShrink: 0
                          }}>
                            <Icon size={18} />
                          </div>
                          <div style={{
                            fontWeight: 800,
                            fontSize: '0.94rem',
                            color: '#FFFFFF',
                            lineHeight: 1.3
                          }}>
                            {sec.title}
                          </div>
                        </div>

                        <span style={{
                          backgroundColor: sec.color,
                          color: '#0B1E3D',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          padding: '0.28rem 0.65rem',
                          borderRadius: '8px',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          alignSelf: 'flex-start'
                        }}>
                          {sec.qs} · {sec.marks}
                        </span>
                      </div>

                      {/* Description */}
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#94A3B8',
                        lineHeight: 1.5,
                        paddingLeft: '0.15rem'
                      }}>
                        {sec.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile CTA: Placed directly after Section C */}
              <div className="mobile-banner-cta" style={{ marginTop: '1.25rem' }}>
                <button
                  onClick={() => openModal('register')}
                  className="btn btn-lg btn-block"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: 'var(--primary-navy)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    borderRadius: '12px',
                    padding: '0.85rem 1.4rem',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    cursor: 'pointer',
                    border: 'none',
                    width: '100%',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(56, 189, 248, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.35)';
                  }}
                >
                  <span>Register for Test Now</span>
                  <ArrowRight size={18} color="var(--primary-navy)" />
                </button>
              </div>

              {/* Anti-Cheating & Proctoring Notice */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '12px',
                fontSize: '0.8rem',
                color: '#FDE68A',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                lineHeight: 1.5
              }}>
                <ShieldAlert size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Anti-Cheating Proctoring:</strong> Full-screen enforcement, active tab-switch monitoring (Max 5 warnings before auto-submission).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Responsive CTA Visibility Styles */}
      <style>{`
        @media (min-width: 851px) {
          .desktop-banner-cta {
            display: flex !important;
          }
          .mobile-banner-cta {
            display: none !important;
          }
        }
        @media (max-width: 850px) {
          .desktop-banner-cta {
            display: none !important;
          }
          .mobile-banner-cta {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
