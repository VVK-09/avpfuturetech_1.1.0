import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap,
  CheckCircle2,
  Layers,
  Award
} from 'lucide-react';

const DOMAIN_METRICS = {
  'dom-ai-ml': {
    ctc: '₹8.5 – ₹16.0 LPA',
    capstone: 'Autonomous RAG Research Agent & LLM Pipeline',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'
  },
  'dom-ds': {
    ctc: '₹7.8 – ₹14.5 LPA',
    capstone: 'Customer Lifetime Value (LTV) & Churn Forecast Engine',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  'dom-cyber': {
    ctc: '₹8.0 – ₹15.5 LPA',
    capstone: 'Enterprise Perimeter Pentest & OWASP Remediation Audit',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  'dom-python-fullstack': {
    ctc: '₹7.5 – ₹14.0 LPA',
    capstone: 'Multi-Tenant Microservices SaaS Platform with FastAPI & React',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  'dom-java-fullstack': {
    ctc: '₹8.0 – ₹15.0 LPA',
    capstone: 'High-Throughput Distributed Banking Engine with Kafka & Spring Boot',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  'dom-mobile-app': {
    ctc: '₹7.0 – ₹13.5 LPA',
    capstone: 'Real-Time Health & Geolocation App with Flutter & Firebase',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
  }
};

export default function DomainGridSection() {
  const { domains, openModal, setCurrentView } = useApp();
  const [visibleCount, setVisibleCount] = useState(3);
  const [offsetIndex, setOffsetIndex] = useState(() => domains.length);
  const [withTransition, setWithTransition] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const sliderRef = useRef(null);

  // Triple the list to enable continuous infinite rotational sliding
  const extendedDomains = [...domains, ...domains, ...domains];

  // Responsive visible count (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1140) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure offsetIndex stays in the middle array block if domains change
  useEffect(() => {
    if (domains.length > 0 && (offsetIndex < domains.length || offsetIndex >= 2 * domains.length)) {
      setWithTransition(false);
      setOffsetIndex(domains.length);
    }
  }, [domains.length]);

  // Re-enable CSS transitions smoothly after a silent position reset
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        const timeout = setTimeout(() => {
          setWithTransition(true);
        }, 20);
        return () => clearTimeout(timeout);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  const handlePrev = () => {
    setWithTransition(true);
    setOffsetIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setWithTransition(true);
    setOffsetIndex((prev) => prev + 1);
  };

  // Seamless boundary wrap when a transition completes
  const handleTransitionEnd = () => {
    if (domains.length === 0) return;
    if (offsetIndex >= 2 * domains.length) {
      setWithTransition(false);
      setOffsetIndex((prev) => prev - domains.length);
    } else if (offsetIndex < domains.length) {
      setWithTransition(false);
      setOffsetIndex((prev) => prev + domains.length);
    }
  };

  // Keyboard navigation on ArrowLeft / ArrowRight
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleJumpToDomain = (domainId) => {
    const idx = domains.findIndex(d => d.id === domainId);
    if (idx !== -1) {
      setWithTransition(true);
      setOffsetIndex(domains.length + idx);
    }
  };

  const handleShowAll = () => {
    setCurrentView('all-domains');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gap = 24; // 1.5rem in px
  const activeDotIndex = domains.length > 0
    ? ((offsetIndex % domains.length) + domains.length) % domains.length
    : 0;

  return (
    <section
      id="domains"
      className="section-py"
      style={{ backgroundColor: 'var(--bg-page)', outline: 'none' }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="container" style={{ position: 'relative' }}>

        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <Sparkles size={14} color="var(--electric-blue)" /> IN-DEMAND SPECIALIZATIONS
          </div>
          <h2 className="section-title" style={{ marginBottom: '0.6rem' }}>
            Explore Internship Domains
          </h2>
          <p className="section-desc" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Choose your engineering specialization. Learn with live industry mentors, work on production capstone projects, and earn verified credentials.
          </p>
        </div>

        {/* Quick Category Filter Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2.5rem'
        }}>
          {[
            { id: 'All', label: `🌟 All Tracks (${domains.length})` },
            { id: 'Computer Science & IT', label: `💻 Computer Science & IT (${domains.filter(d => (d.category || 'Computer Science & IT') === 'Computer Science & IT').length})` },
            { id: 'Artificial Intelligence & Data', label: `🧠 AI & Data (${domains.filter(d => d.category === 'Artificial Intelligence & Data').length})` },
            { id: 'Cybersecurity', label: `🛡️ Cybersecurity (${domains.filter(d => d.category === 'Cybersecurity').length})` },
            { id: 'Electronics, IoT & Embedded', label: `⚡ Electronics & IoT (${domains.filter(d => d.category === 'Electronics, IoT & Embedded').length})` },
            { id: 'Business & Management', label: `📊 Business & Mgmt (${domains.filter(d => d.category === 'Business & Management').length})` },
            { id: 'Marketing & Media', label: `📢 Marketing & Media (${domains.filter(d => d.category === 'Marketing & Media').length})` }
          ].map((tab) => {
            const isActive = categoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setCategoryFilter(tab.id);
                  if (tab.id !== 'All') {
                    const firstMatch = domains.find(d => (d.category || 'Computer Science & IT') === tab.id);
                    if (firstMatch) {
                      handleJumpToDomain(firstMatch.id);
                    }
                  }
                }}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  border: isActive ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                  backgroundColor: isActive ? 'var(--badge-blue-bg)' : '#FFFFFF',
                  color: isActive ? 'var(--electric-blue)' : 'var(--text-body)',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 8px rgba(30, 99, 214, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Slider Wrapper with Vertically Centered Left & Right Arrow Buttons */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '1.5rem' }}>

          {/* Centered Left Arrow Button (Always active for infinite rotation) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous domain"
            style={{
              position: 'absolute',
              left: '-22px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1.5px solid var(--border-light)',
              backgroundColor: '#FFFFFF',
              color: 'var(--primary-navy)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(11, 30, 61, 0.15)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--electric-blue)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = 'var(--electric-blue)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 22px rgba(30, 99, 214, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--primary-navy)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(11, 30, 61, 0.15)';
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Centered Right Arrow Button (Always active for infinite rotation) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next domain"
            style={{
              position: 'absolute',
              right: '-22px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1.5px solid var(--border-light)',
              backgroundColor: '#FFFFFF',
              color: 'var(--primary-navy)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(11, 30, 61, 0.15)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--electric-blue)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = 'var(--electric-blue)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 22px rgba(30, 99, 214, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--primary-navy)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(11, 30, 61, 0.15)';
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Viewport Container */}
          <div
            ref={sliderRef}
            style={{
              overflow: 'hidden',
              width: '100%',
              padding: '10px 4px 20px 4px'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                display: 'flex',
                gap: `${gap}px`,
                transition: withTransition ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                transform: `translateX(calc(-1 * ${offsetIndex} * ((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount} + ${gap}px)))`,
                willChange: 'transform'
              }}
            >
              {extendedDomains.map((domain, index) => {
                const metric = DOMAIN_METRICS[domain.id] || {
                  ctc: '₹8.0 – ₹15.0 LPA',
                  capstone: 'Enterprise Capstone & Production Deployment',
                  image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
                };
                const displayImage = domain.image || metric?.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={`${domain.id}-rot-${index}`}
                    style={{
                      flex: `0 0 calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
                      minWidth: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
                      backgroundColor: '#FFFFFF',
                      borderRadius: '22px',
                      border: '1.5px solid var(--border-light)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 6px 24px -4px rgba(11, 30, 61, 0.08)',
                      position: 'relative',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 16px 36px -6px rgba(30, 99, 214, 0.16)';
                      e.currentTarget.style.borderColor = 'var(--electric-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 24px -4px rgba(11, 30, 61, 0.08)';
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                    }}
                  >
                    {/* Domain Display Image Header */}
                    <div style={{ position: 'relative', height: '185px', width: '100%', overflow: 'hidden', backgroundColor: '#0B1E3D' }}>
                      <img
                        src={displayImage}
                        alt={domain.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80';
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'brightness(0.92)',
                          transition: 'transform 0.5s ease'
                        }}
                      />

                      {/* Gradient Dark Overlay */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(11,30,61,0.2) 0%, rgba(11,30,61,0.75) 100%)'
                      }} />

                      {/* Top Badges on Image */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        right: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 2
                      }}>
                        <span style={{
                          backgroundColor: 'rgba(11, 30, 61, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '8px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}>
                          <Clock size={12} color="#38BDF8" />
                          {domain.duration ? domain.duration.split('(')[0].trim() : '3 Months'}
                        </span>

                        <span style={{
                          backgroundColor: 'rgba(30, 99, 214, 0.95)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          padding: '0.3rem 0.7rem',
                          borderRadius: '8px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                        }}>
                          {domain.badge || 'Open Track'}
                        </span>
                      </div>

                      {/* Bottom Image Overlay: Average Placement CTC & Rating */}
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        right: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 2
                      }}>
                        <span style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#38BDF8',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          border: '1px solid rgba(56, 189, 248, 0.3)'
                        }}>
                          <TrendingUp size={12} />
                          CTC: {metric.ctc}
                        </span>

                        <div style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          padding: '0.22rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: 'var(--primary-navy)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}>
                          <Star size={12} fill="#F59E0B" color="#F59E0B" />
                          <span>{domain.rating || '4.9'}</span>
                          <span style={{ color: '#64748B', fontWeight: 500 }}>({domain.reviewsCount || '120+'})</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ marginBottom: '0.65rem' }}>
                        <h3 style={{
                          fontSize: '1.3rem',
                          fontWeight: 800,
                          color: 'var(--primary-navy)',
                          lineHeight: 1.25,
                          marginBottom: '0.25rem',
                          letterSpacing: '-0.3px'
                        }}>
                          {domain.name}
                        </h3>
                        <div style={{
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: 'var(--electric-blue)',
                          lineHeight: 1.35
                        }}>
                          {domain.tagline}
                        </div>
                      </div>

                      <p style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-body)',
                        lineHeight: 1.55,
                        marginBottom: '1rem',
                        flex: 1
                      }}>
                        {domain.shortDescription}
                      </p>

                      {/* Key Capstone Deliverable Highlight Box */}
                      <div style={{
                        backgroundColor: 'var(--bg-subtle)',
                        borderRadius: '10px',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid var(--border-light)',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.15rem' }}>
                          ⭐ Key Production Capstone
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-navy)', lineHeight: 1.35 }}>
                          {metric.capstone}
                        </div>
                      </div>

                      {/* Tech Tools Chips */}
                      {domain.tools && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.35rem',
                          marginBottom: '1.25rem'
                        }}>
                          {domain.tools.slice(0, 4).map((tool, idx) => (
                            <span
                              key={idx}
                              style={{
                                fontSize: '0.72rem',
                                padding: '0.2rem 0.5rem',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '6px',
                                border: '1px solid var(--border-light)',
                                color: 'var(--primary-navy)',
                                fontWeight: 600
                              }}
                            >
                              {tool}
                            </span>
                          ))}
                          {domain.tools.length > 4 && (
                            <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.4rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                              +{domain.tools.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Price & Subsidized Status */}
                      <div style={{
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>Aptitude Merit Fee:</div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--electric-blue)' }}>
                            ₹{domain.price?.merit || 699} <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 3 mos</span>
                          </div>
                        </div>

                        <span className="badge" style={{ backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #BBF7D0', fontSize: '0.73rem', fontWeight: 700 }}>
                          ★ Subsidized via Test
                        </span>
                      </div>

                      {/* UI/UX Optimized Action Buttons */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        marginTop: '0.25rem'
                      }}>
                        <button
                          type="button"
                          onClick={() => openModal('syllabus', domain)}
                          className="btn btn-outline"
                          style={{
                            padding: '0.65rem 0.85rem',
                            fontSize: '0.82rem',
                            borderRadius: '10px',
                            fontWeight: 600,
                            color: 'var(--text-body)',
                            backgroundColor: '#FFFFFF',
                            border: '1.5px solid var(--border-light)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            flexShrink: 0,
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--electric-blue)';
                            e.currentTarget.style.color = 'var(--electric-blue)';
                            e.currentTarget.style.backgroundColor = 'var(--badge-blue-bg)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.color = 'var(--text-body)';
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                          }}
                          title="View curriculum syllabus & roadmap"
                        >
                          <FileText size={14} color="var(--electric-blue)" />
                          Syllabus
                        </button>

                        <button
                          type="button"
                          onClick={() => openModal('register', { domainId: domain.id, domainName: domain.name })}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            padding: '0.75rem 1.25rem',
                            fontSize: '0.94rem',
                            borderRadius: '10px',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 14px rgba(30, 99, 214, 0.3)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span>Enroll Now</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots & Cycle Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '3rem'
        }}>
          {/* Pagination Dots */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            {domains.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setWithTransition(true);
                  setOffsetIndex(domains.length + idx);
                }}
                aria-label={`Jump to domain ${idx + 1}`}
                style={{
                  width: activeDotIndex === idx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: activeDotIndex === idx ? 'var(--electric-blue)' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            ))}
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Domain <strong>{activeDotIndex + 1}</strong> of <strong>{domains.length}</strong> • Continuous Rotational Track
          </div>
        </div>

        {/* Explore All Domains Detailed Catalog CTA */}
        <div style={{
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '2.25rem 2rem',
          border: '1px solid var(--border-light)',
          boxShadow: '0 4px 20px rgba(11, 30, 61, 0.04)',
          maxWidth: '850px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
            Looking for Complete 12-Week Roadmap & Perks?
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', maxWidth: '600px', marginBottom: '1.5rem' }}>
            Visit our detailed domain catalog to compare full curriculum milestones, letter of recommendation (LOR) details, and capstone deliverables.
          </p>

          <button
            type="button"
            onClick={handleShowAll}
            className="btn btn-primary btn-lg"
            style={{
              padding: '0.85rem 2.25rem',
              fontSize: '1.02rem',
              borderRadius: '12px',
              fontWeight: 700,
              gap: '0.6rem',
              boxShadow: '0 8px 24px rgba(30, 99, 214, 0.25)'
            }}
          >
            Explore All 6 Domains Catalog
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
