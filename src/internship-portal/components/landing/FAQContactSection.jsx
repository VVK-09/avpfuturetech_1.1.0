import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Sparkles, 
  Phone, 
  Mail, 
  MessageSquare, 
  User, 
  Clock, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Headphones,
  Check
} from 'lucide-react';
import GoogleCaptcha from '../common/GoogleCaptcha';

export default function FAQContactSection() {
  const { submitInquiry, showToast } = useApp();
  const [openFAQ, setOpenFAQ] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [inquiry, setInquiry] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allFaqs = [
    {
      category: 'TEST',
      categoryLabel: 'Aptitude Test & Merit',
      q: 'How does the Aptitude Test and the ₹699 Merit Pricing work?',
      a: 'When you register for the AVP FutureTech Internship Aptitude Test 2026, you unlock a 60-minute online MCQ evaluation consisting of 50 questions (Aptitude, Logical Reasoning, and Technical English). Candidates scoring 80% or above (40+ marks) unlock the full 3-month production internship for just ₹699 (88% Merit Subsidy). Candidates with passing scores below 80% can enroll at the standard rate of ₹5,999.',
      highlights: ['60-Minute Online Exam', '80%+ Score unlocks ₹699 Merit Fee', 'Save ₹5,300 on Enrollment']
    },
    {
      category: 'FORMAT',
      categoryLabel: 'Internship Format',
      q: 'Is the internship format completely remote / self-paced?',
      a: 'Yes! The entire 3-month program is structured with weekly milestone deliverables, hands-on module tasks, and live mentor code reviews. Weekly deadlines and 24/7 LMS milestone submissions allow you to complete your deliverables alongside college classes and semester exams without attendance conflicts.',
      highlights: ['100% Remote & Self-Paced', '24/7 LMS Milestone Access', 'Zero College Class Conflicts']
    },
    {
      category: 'CERT',
      categoryLabel: 'Certificates & LOR',
      q: 'What certificate and Letter of Recommendation (LOR) do I receive upon completion?',
      a: 'Upon completing and having all 12 weekly deliverables approved by senior engineering mentors, you receive a tamper-proof, verified Certificate of Internship from AVP FutureTech LLP (MCA Registered & ISO 9001:2015 compliant) with a unique QR credential ID, along with a performance-rated Letter of Recommendation (LOR) for corporate and LinkedIn verification.',
      highlights: ['ISO 9001:2015 & MCA Recognized', 'Tamper-Proof QR Code Verification', 'Personalized Mentor LOR']
    },
    {
      category: 'TEST',
      categoryLabel: 'Aptitude Test & Merit',
      q: 'Can I take the test on a smartphone or mobile device?',
      a: 'Our test portal is fully responsive across desktop, tablet, and mobile browsers. However, because the examination features full-screen proctoring, strict tab-switch monitoring, and timed sections, we strongly recommend taking the test on a laptop or desktop with a stable internet connection for the best experience.',
      highlights: ['Responsive Exam Portal', 'Anti-Cheating Proctoring', 'Desktop/Laptop Recommended']
    },
    {
      category: 'TEST',
      categoryLabel: 'Aptitude Test & Merit',
      q: 'What happens if my internet disconnects during the test?',
      a: 'Every answer you select is instantly auto-saved to secure local state. If you accidentally refresh or experience a brief connection drop, simply re-enter within the 60-minute countdown window to resume your test without losing previously answered questions.',
      highlights: ['Instant Question Auto-Save', 'Seamless Resume Capability', '60-Minute Countdown Persistence']
    },
    {
      category: 'FORMAT',
      categoryLabel: 'Internship Format',
      q: 'What kind of projects will I build during the 3 months?',
      a: 'You will engineer production-grade capstones instead of generic toy tutorials. Depending on your chosen track, you will build autonomous RAG AI research agents, multi-tenant FastAPI SaaS platforms, distributed Kafka banking microservices, OWASP penetration tests, or cross-platform mobile apps for your public GitHub portfolio.',
      highlights: ['Production Capstones', 'Public GitHub Portfolio Code', '1-on-1 Mentor Code Reviews']
    }
  ];

  const filteredFaqs = activeCategory === 'ALL' 
    ? allFaqs 
    : allFaqs.filter(f => f.category === activeCategory);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!inquiry.name.trim() || !inquiry.email.trim()) {
      showToast('Please provide your full name and email address.', 'error');
      return;
    }

    const cleanPhone = inquiry.phone.replace(/\D/g, '');
    if (inquiry.phone && cleanPhone.length !== 10) {
      showToast('Contact number must be exactly 10 digits.', 'error');
      return;
    }

    if (!captchaVerified) {
      setCaptchaError('Please check the box to confirm you are not a robot.');
      return;
    }

    setIsSubmitting(true);
    setCaptchaError('');

    submitInquiry({
      name: inquiry.name.trim(),
      email: inquiry.email.trim().toLowerCase(),
      phone: cleanPhone,
      message: inquiry.message.trim()
    });

    setInquiry({ name: '', email: '', phone: '', message: '' });
    setCaptchaVerified(false);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-py" style={{ 
      backgroundColor: 'var(--bg-page)', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient lighting */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-8%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(30, 99, 214, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <HelpCircle size={14} color="var(--electric-blue)" /> ADMISSIONS & COUNSELING DESK
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.5px', marginBottom: '0.6rem' }}>
            Frequently Asked Questions & Support
          </h2>
          <p className="section-desc" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.02rem', lineHeight: 1.6 }}>
            Everything you need to know about the 2026 Aptitude Test, ₹699 Merit Pricing, 12-week curriculum milestones, and verified certifications.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Interactive FAQs */}
          <div>
            {/* Quick Category Filter Tabs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              {[
                { id: 'ALL', label: 'All Questions' },
                { id: 'TEST', label: 'Aptitude & Merit' },
                { id: 'FORMAT', label: 'Internship Format' },
                { id: 'CERT', label: 'Certificate & LOR' }
              ].map(tab => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab.id);
                      setOpenFAQ(0);
                    }}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '9999px',
                      border: isActive ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                      backgroundColor: isActive ? 'var(--badge-blue-bg)' : '#FFFFFF',
                      color: isActive ? 'var(--electric-blue)' : 'var(--text-body)',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 2px 8px rgba(30, 99, 214, 0.15)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Accordion FAQ Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFAQ === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: isOpen ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                      overflow: 'hidden',
                      boxShadow: isOpen ? '0 8px 24px -4px rgba(30, 99, 214, 0.12)' : '0 2px 10px rgba(11, 30, 61, 0.03)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFAQ(isOpen ? -1 : idx)}
                      style={{
                        width: '100%',
                        padding: '1.25rem 1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: 'none',
                        background: isOpen ? 'rgba(30, 99, 214, 0.02)' : '#FFFFFF',
                        textAlign: 'left',
                        cursor: 'pointer',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          backgroundColor: isOpen ? 'var(--electric-blue)' : 'var(--bg-subtle)',
                          color: isOpen ? '#FFFFFF' : 'var(--electric-blue)',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s ease'
                        }}>
                          Q{idx + 1}
                        </div>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '0.98rem',
                          color: isOpen ? 'var(--electric-blue)' : 'var(--primary-navy)',
                          lineHeight: 1.35
                        }}>
                          {faq.q}
                        </span>
                      </div>

                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? 'var(--badge-blue-bg)' : 'var(--bg-subtle)',
                        color: isOpen ? 'var(--electric-blue)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 1.4rem 1.4rem 1.4rem',
                        fontSize: '0.92rem',
                        color: 'var(--text-body)',
                        lineHeight: 1.65,
                        borderTop: '1px solid var(--border-light)',
                        paddingTop: '1rem',
                        backgroundColor: '#FFFFFF'
                      }}>
                        <p style={{ marginBottom: '1rem' }}>{faq.a}</p>

                        {/* Highlights pills */}
                        {faq.highlights && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {faq.highlights.map((h, hIdx) => (
                              <span
                                key={hIdx}
                                style={{
                                  fontSize: '0.74rem',
                                  fontWeight: 600,
                                  backgroundColor: 'var(--badge-blue-bg)',
                                  color: 'var(--electric-blue)',
                                  padding: '0.25rem 0.65rem',
                                  borderRadius: '6px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.3rem'
                                }}
                              >
                                <Check size={11} strokeWidth={3} />
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Support Helpline Callout */}
            <div style={{
              marginTop: '1.75rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--badge-blue-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--electric-blue)'
                }}>
                  <Headphones size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    Need Direct Counseling Help?
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Call or WhatsApp our admissions desk directly
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <a
                  href="tel:+917517532914"
                  className="btn btn-outline btn-sm"
                  style={{
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    padding: '0.45rem 0.85rem',
                    gap: '0.35rem',
                    color: 'var(--primary-navy)'
                  }}
                >
                  <Phone size={13} color="var(--electric-blue)" />
                  +91 7517532914
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Admissions Inquiry Form */}
          <div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              border: '1.5px solid var(--border-light)',
              boxShadow: '0 12px 35px -8px rgba(11, 30, 61, 0.08), 0 4px 15px rgba(0,0,0,0.03)',
              padding: '2.25rem 2.25rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top Accent Gradient Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1E63D6 0%, #38BDF8 50%, #4F46E5 100%)'
              }} />

              {/* Status Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--electric-blue)',
                  backgroundColor: 'var(--badge-blue-bg)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  <Sparkles size={13} /> Admissions Desk
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: '#059669',
                  backgroundColor: '#ECFDF5',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  border: '1px solid #A7F3D0'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                  Counselors Online
                </div>
              </div>

              <h3 style={{ fontSize: '1.45rem', color: 'var(--primary-navy)', fontWeight: 800, marginBottom: '0.35rem', letterSpacing: '-0.3px' }}>
                Have a Custom Query?
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginBottom: '1.6rem', lineHeight: 1.55 }}>
                Fill out this quick form and our counseling team will guide you on test preparation, domain curriculum, and merit pricing.
              </p>

              <form onSubmit={handleContactSubmit}>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}>
                    <User size={14} color="var(--electric-blue)" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Kulkarni"
                    className="form-input"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                  />
                </div>

                {/* Email & Phone 2-Col Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}>
                      <Mail size={14} color="var(--electric-blue)" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rohan.kulkarni@example.com"
                      className="form-input"
                      value={inquiry.email}
                      onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}>
                      <Phone size={14} color="var(--electric-blue)" />
                      <span>Contact Number</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile"
                      className="form-input"
                      value={inquiry.phone}
                      onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem' }}>
                    <MessageSquare size={14} color="var(--electric-blue)" />
                    <span>Your Message / Query</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ask about batch timings, syllabus roadmaps, aptitude test preparation, or merit pricing..."
                    className="form-textarea"
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                  />
                </div>

                {/* Google reCAPTCHA Verification Box */}
                <GoogleCaptcha 
                  onVerify={(v) => {
                    setCaptchaVerified(v);
                    setCaptchaError('');
                  }}
                  verified={captchaVerified}
                  error={captchaError}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-block"
                  style={{
                    padding: '0.9rem',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    marginTop: '0.75rem',
                    boxShadow: '0 6px 20px rgba(30, 99, 214, 0.3)',
                    gap: '0.5rem'
                  }}
                >
                  <Send size={16} />
                  <span>Send Inquiry to Admissions Desk</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
