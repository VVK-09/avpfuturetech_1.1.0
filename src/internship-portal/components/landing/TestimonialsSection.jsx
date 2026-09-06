import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const { testimonials } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="section-py" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} /> Student Experiences
          </div>
          <h2 className="section-title">
            Real Stories from Certified Interns
          </h2>
          <p className="section-desc">
            Read how students from top engineering universities took our Aptitude Test, unlocked the ₹699 merit fee, and built career-defining capstone projects.
          </p>
        </div>

        {/* 3-Card Grid for Desktop + Responsive */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="card card-hover-up"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '18px',
                border: '1px solid var(--border-light)',
                padding: '2rem',
                backgroundColor: 'var(--bg-subtle)',
                position: 'relative'
              }}
            >
              <Quote size={36} color="rgba(30, 99, 214, 0.18)" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }} />

              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              {/* Quote text */}
              <p style={{
                fontSize: '0.94rem',
                color: 'var(--text-body)',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
                fontStyle: 'italic',
                flex: 1
              }}>
                "{item.quote}"
              </p>

              {/* Student Profile Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-light)'
              }}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--electric-blue)'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
                  }}
                />

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--primary-navy)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {item.name}
                    <CheckCircle2 size={14} color="var(--electric-blue)" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--electric-blue)', fontWeight: 600 }}>
                    {item.domain}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {item.placedAt ? `Now at ${item.placedAt}` : item.college}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Testimonials Carousel strip */}
        {testimonials.length > 3 && (
          <div style={{
            backgroundColor: 'var(--primary-navy)',
            borderRadius: '20px',
            padding: '2.5rem 3rem',
            color: '#FFFFFF',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}>
            <button
              onClick={prevSlide}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <div style={{ textAlign: 'center', maxWidth: '720px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#38BDF8" color="#38BDF8" />
                ))}
              </div>
              <p style={{ fontSize: '1.08rem', fontStyle: 'italic', lineHeight: 1.65, color: '#E2E8F0', marginBottom: '1rem' }}>
                "{testimonials[currentIndex].quote}"
              </p>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF' }}>
                {testimonials[currentIndex].name} — <span style={{ color: '#38BDF8', fontWeight: 500 }}>{testimonials[currentIndex].domain}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                {testimonials[currentIndex].college}
              </div>
            </div>

            <button
              onClick={nextSlide}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
