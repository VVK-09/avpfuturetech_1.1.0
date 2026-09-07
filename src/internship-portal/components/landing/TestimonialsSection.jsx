import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const { testimonials } = useApp();
  const [cardsToShow, setCardsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Responsive cardsToShow count: 3 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const updateCardsToShow = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const totalItems = testimonials?.length || 0;
  const maxIndex = Math.max(0, totalItems - cardsToShow);

  // Keep currentIndex bounded when items or screen size changes
  useEffect(() => {
    if (currentIndex > maxIndex && maxIndex >= 0) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Next slide handler (smooth circular loop)
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-rotation timer: advances every 3.8s, pauses whenever hovered
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, maxIndex, nextSlide]);

  // Touch swipe support for mobile / touch devices
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
  };

  return (
    <section id="testimonials" className="section-py" style={{
      backgroundColor: '#F8FAFC',
      backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F5F8FD 50%, #EDF2FA 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Minimal Professional Background Pattern Overlay */}
      <div className="avp-pattern-dots" />

      {/* Decorative ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(30, 99, 214, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ padding: '0 1rem', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          <h2 className="section-title">
            Real Stories from Certified Interns
          </h2>
          <p className="section-desc">
            Read how students from top engineering universities took our Aptitude Test, unlocked the ₹699 merit fee, and built career-defining capstone projects.
          </p>
        </div>

        {/* Carousel Slider Outer Wrapper with Hover Pause */}
        <div
          style={{ position: 'relative', width: '100%', padding: '0.25rem 0' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider Overflow Window */}
          <div style={{ overflow: 'hidden', width: '100%', borderRadius: '18px' }}>
            <div
              style={{
                display: 'flex',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
                margin: cardsToShow === 1 ? '0 -0.4rem' : '0 -0.85rem'
              }}
            >
              {testimonials.map((item, idx) => (
                <div
                  key={item.id || idx}
                  style={{
                    flex: `0 0 ${100 / cardsToShow}%`,
                    maxWidth: `${100 / cardsToShow}%`,
                    padding: cardsToShow === 1 ? '0 0.4rem' : '0 0.85rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <div
                    className="card card-hover-up"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '18px',
                      border: '1px solid rgba(226, 232, 240, 0.85)',
                      padding: 'clamp(1.25rem, 3.5vw, 2rem)',
                      backgroundColor: '#FFFFFF',
                      position: 'relative',
                      height: '100%',
                      minHeight: cardsToShow === 1 ? 'auto' : '310px',
                      boxShadow: '0 10px 30px -5px rgba(11, 30, 61, 0.06), 0 2px 8px -2px rgba(11, 30, 61, 0.03)',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Quote size={32} color="rgba(30, 99, 214, 0.18)" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }} />

                    {/* Star Rating */}
                    <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.15rem' }}>
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p style={{
                      fontSize: 'clamp(0.88rem, 2vw, 0.94rem)',
                      color: 'var(--text-body)',
                      lineHeight: 1.65,
                      marginBottom: '1.5rem',
                      fontStyle: 'italic',
                      flex: 1
                    }}>
                      "{item.quote}"
                    </p>

                    {/* Student Profile Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      paddingTop: '0.9rem',
                      borderTop: '1px solid var(--border-light)'
                    }}>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid var(--electric-blue)',
                          flexShrink: 0
                        }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
                        }}
                      />

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{
                          fontWeight: 700,
                          fontSize: '0.94rem',
                          color: 'var(--primary-navy)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          flexWrap: 'wrap'
                        }}>
                          <span>{item.name}</span>
                          <CheckCircle2 size={14} color="var(--electric-blue)" style={{ flexShrink: 0 }} />
                        </div>
                        <div style={{
                          fontSize: '0.76rem',
                          color: 'var(--electric-blue)',
                          fontWeight: 600,
                          lineHeight: 1.35
                        }}>
                          {item.domain}
                        </div>
                        <div style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.35
                        }}>
                          {item.placedAt ? `Now at ${item.placedAt}` : item.college}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



