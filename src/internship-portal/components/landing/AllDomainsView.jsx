import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  FileText,
  CheckCircle2,
  Search,
  Star,
  Clock,
  Award,
  Zap,
  Users,
  Shield,
  HelpCircle,
  TrendingUp,
  Tag,
  Check,
  Briefcase,
  Code2,
  Laptop,
  Brain,
  Cpu,
  Megaphone
} from 'lucide-react';

const DOMAIN_METRICS = {
  'dom-ai-ml': {
    ctc: '₹8.5 – ₹16.0 LPA',
    capstone: 'Autonomous RAG Research Agent & LLM Pipeline',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    category: 'Artificial Intelligence & Data'
  },
  'dom-ds': {
    ctc: '₹7.8 – ₹14.5 LPA',
    capstone: 'Customer Lifetime Value (LTV) & Churn Forecast Engine',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'Artificial Intelligence & Data'
  },
  'dom-cyber': {
    ctc: '₹8.0 – ₹15.5 LPA',
    capstone: 'Enterprise Perimeter Pentest & OWASP Remediation Audit',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    category: 'Cybersecurity'
  },
  'dom-python-fullstack': {
    ctc: '₹7.5 – ₹14.0 LPA',
    capstone: 'Multi-Tenant Microservices SaaS Platform with FastAPI & React',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science & IT'
  },
  'dom-java-fullstack': {
    ctc: '₹8.0 – ₹15.0 LPA',
    capstone: 'High-Throughput Distributed Banking Engine with Kafka & Spring Boot',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science & IT'
  },
  'dom-mobile-app': {
    ctc: '₹7.0 – ₹13.5 LPA',
    capstone: 'Real-Time Health & Geolocation App with Flutter & Firebase',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science & IT'
  }
};

export default function AllDomainsView() {
  const { domains, openModal, setCurrentView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredDomainId, setHoveredDomainId] = useState(null);

  // 6 Official Categories with dynamic counts
  const categories = useMemo(() => {
    const categoryDefs = [
      { id: 'All', label: 'All Specializations', icon: Sparkles },
      { id: 'Computer Science & IT', label: 'Computer Science & IT', icon: Laptop },
      { id: 'Artificial Intelligence & Data', label: 'AI & Data Science', icon: Brain },
      { id: 'Cybersecurity', label: 'Cybersecurity', icon: Shield },
      { id: 'Electronics, IoT & Embedded', label: 'Electronics, IoT & Embedded', icon: Cpu },
      { id: 'Business & Management', label: 'Business & Management', icon: Briefcase },
      { id: 'Marketing & Media', label: 'Marketing & Media', icon: Megaphone }
    ];

    return categoryDefs.map(cat => {
      const count = cat.id === 'All'
        ? domains.length
        : domains.filter(d => (d.category || 'Computer Science & IT') === cat.id).length;
      return {
        ...cat,
        count
      };
    });
  }, [domains]);

  // Filtered domains
  const filteredDomains = useMemo(() => {
    return domains.filter(dom => {
      const metric = DOMAIN_METRICS[dom.id];
      const domCategory = dom.category || metric?.category || 'Computer Science & IT';
      const matchesCategory = selectedCategory === 'All' || domCategory === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        dom.name.toLowerCase().includes(q) ||
        (dom.tagline && dom.tagline.toLowerCase().includes(q)) ||
        (dom.shortDescription && dom.shortDescription.toLowerCase().includes(q)) ||
        (dom.tools && Array.isArray(dom.tools) && dom.tools.some(t => t.toLowerCase().includes(q))) ||
        (metric?.capstone && metric.capstone.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [domains, selectedCategory, searchQuery]);

  const handleEnrollClick = (domain) => {
    openModal('register', { domainId: domain.id, domainName: domain.name });
  };

  const handleBackToHome = () => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('/domains')) {
      window.location.href = '/internships';
    } else {
      setCurrentView('landing');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* Top Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #07152B 0%, #0B1E3D 45%, #173B7A 100%)',
        color: '#FFFFFF',
        paddingTop: '2.25rem',
        paddingBottom: '3.75rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient background decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-25%',
          right: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(30,99,214,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(30,99,214,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Navigation Bar: Back to Home Button & Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={handleBackToHome}
              className="btn btn-ghost"
              style={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '12px',
                padding: '0.55rem 1.25rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={16} />
              Back to Internship Home
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#93C5FD' }}>
              <span style={{ cursor: 'pointer', color: '#CBD5E1' }} onClick={handleBackToHome}>Home</span>
              <span>/</span>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Internship Domains Catalog</span>
            </div>
          </div>

          {/* Header Title & Subtitle */}
          <div style={{ maxWidth: '860px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(56, 189, 248, 0.18)',
              color: '#38BDF8',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '9999px',
              padding: '0.35rem 0.95rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              marginBottom: '1.1rem',
              letterSpacing: '0.4px',
              textTransform: 'uppercase'
            }}>
              <Sparkles size={14} /> 6 Industry-Vetted Specialization Tracks
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '1.15rem',
              letterSpacing: '-0.03em'
            }}>
              Explore All Internship Tracks & Details
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: '#E2E8F0',
              lineHeight: 1.65,
              marginBottom: '2rem',
              maxWidth: '740px'
            }}>
              Comprehensive 3-month engineering programs featuring 1-on-1 industry mentorship, weekly code audits, real production capstones, and government & ISO verified certification.
            </p>

            {/* Live Highlights Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: '#F1F5F9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#38BDF8" /> 100% Online & Flexible Hours
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#38BDF8" /> ₹699 Merit Scholarship Track
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#38BDF8" /> Verified MCA & ISO Credentials
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#38BDF8" /> Guaranteed LOR & Referrals
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="container" style={{ marginTop: '-1.85rem', position: 'relative', zIndex: 10, marginBottom: '2.5rem' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '1.15rem 1.5rem',
          boxShadow: '0 12px 32px rgba(11, 30, 61, 0.09)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 1.05rem',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    border: isActive ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                    backgroundColor: isActive ? 'var(--badge-blue-bg)' : '#FFFFFF',
                    color: isActive ? 'var(--electric-blue)' : 'var(--text-body)',
                    boxShadow: isActive ? '0 2px 8px rgba(30, 99, 214, 0.15)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={14} style={{ color: isActive ? 'var(--electric-blue)' : '#64748b' }} />
                  <span>{cat.label} ({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '380px' }}>
            <Search size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by domain, tech stack (Python, React...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.5rem',
                fontSize: '0.88rem',
                borderRadius: '10px',
                height: '42px',
                border: '1.5px solid var(--border-light)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Domains Detailed Cards Grid */}
      <div className="container" style={{ maxWidth: '1480px' }}>
        {filteredDomains.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <HelpCircle size={52} color="var(--electric-blue)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', fontWeight: 800, marginBottom: '0.5rem' }}>
              No internship domains match your search
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Try searching with another keyword like "Python", "Cloud", or reset your category filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '10px' }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="domain-showcase-grid">
            {filteredDomains.map((domain) => {
              const metric = DOMAIN_METRICS[domain.id] || {
                ctc: '₹8.0 – ₹15.0 LPA',
                capstone: 'Enterprise Capstone & Production Deployment',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
              };
              const displayImage = domain.image || metric?.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80';
              const standardFee = domain.price?.standard || 5999;
              const meritFee = domain.price?.merit || 699;
              const isHovered = hoveredDomainId === domain.id;

              const domainPerks = domain.perks || [
                'Live 1-on-1 Industry Mentorship & Weekly Code Reviews',
                'Verified ISO 9001:2015 & MCA Recognized Certificate',
                '3 Production Capstone Projects with Deployment',
                'Guaranteed Letter of Recommendation (LOR)',
                'Lifetime LMS & Project Repository Access'
              ];

              return (
                <div
                  key={domain.id}
                  onMouseEnter={() => setHoveredDomainId(domain.id)}
                  onMouseLeave={() => setHoveredDomainId(null)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: isHovered ? '1.5px solid var(--electric-blue)' : '1.5px solid var(--border-light)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isHovered
                      ? '0 18px 40px -8px rgba(30, 99, 214, 0.16), 0 6px 16px rgba(0,0,0,0.04)'
                      : '0 6px 24px -4px rgba(11, 30, 61, 0.06)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                >
                  {/* Domain Image Banner Header */}
                  <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden', backgroundColor: '#0B1E3D' }}>
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
                        transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
                        transition: 'transform 0.5s ease'
                      }}
                    />

                    {/* Dark Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(11,30,61,0.2) 0%, rgba(11,30,61,0.75) 100%)'
                    }} />

                    {/* Top Duration Badge on Image */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
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
                    </div>

                    {/* Bottom Image Overlay: Rating */}
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      zIndex: 2
                    }}>
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
                  <div style={{ padding: '1.35rem 1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <h2 style={{
                        fontSize: '1.22rem',
                        fontWeight: 800,
                        color: 'var(--primary-navy)',
                        lineHeight: 1.25,
                        marginBottom: '0.3rem',
                        letterSpacing: '-0.3px'
                      }}>
                        {domain.name}
                      </h2>
                      <div style={{
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--electric-blue)',
                        lineHeight: 1.35
                      }}>
                        {domain.tagline}
                      </div>
                    </div>

                    {/* Core Deliverable Highlights with Micro-Card Badges */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      padding: '0.7rem 0.85rem',
                      border: '1px solid rgba(226, 232, 240, 0.8)',
                      marginBottom: '0.9rem'
                    }}>
                      {[
                        { label: 'Internship Certificate', icon: Award, color: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)' },
                        { label: 'Placement Assistance', icon: Briefcase, color: '#059669', bg: 'rgba(16, 185, 129, 0.1)' },
                        { label: 'Letter of Recommendation', icon: FileText, color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.1)' }
                      ].map((item, idx) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              fontSize: '0.82rem',
                              fontWeight: 650,
                              color: '#1E293B',
                              lineHeight: 1.3
                            }}
                          >
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              backgroundColor: item.bg,
                              color: item.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <ItemIcon size={13} strokeWidth={2.4} />
                            </div>
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Key Capstone Deliverable Highlight Box */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(30, 99, 214, 0.05) 0%, rgba(56, 189, 248, 0.08) 100%)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(30, 99, 214, 0.15)',
                      borderLeft: '3.5px solid var(--electric-blue)',
                      marginBottom: '0.9rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        color: 'var(--electric-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        marginBottom: '0.15rem'
                      }}>
                        <Sparkles size={11} /> Production Capstone
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--primary-navy)', lineHeight: 1.35 }}>
                        {metric.capstone}
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    {domain.tools && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                        marginBottom: '1rem'
                      }}>
                        {domain.tools.slice(0, 5).map((tool, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.2rem 0.5rem',
                              backgroundColor: '#F1F5F9',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              color: '#334155',
                              fontWeight: 650
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                        {domain.tools.length > 5 && (
                          <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.4rem', color: '#64748B', fontWeight: 600 }}>
                            +{domain.tools.length - 5} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Perks Section */}
                    <div style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: '12px',
                      padding: '0.95rem 1.1rem',
                      border: '1px solid var(--border-light)',
                      marginBottom: '1.25rem'
                    }}>
                      <div style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--primary-navy)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        marginBottom: '0.65rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <Sparkles size={13} color="var(--electric-blue)" /> Included Program Deliverables
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {domainPerks.slice(0, 4).map((perk, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                            <CheckCircle2 size={14} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Box */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-light)',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            Standard Fee: <span style={{ textDecoration: 'line-through' }}>₹{standardFee.toLocaleString('en-IN')}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--electric-blue)' }}>
                              ₹{meritFee}
                            </span>
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#16A34A' }}>
                              (Merit Track)
                            </span>
                          </div>
                        </div>

                        <div style={{
                          backgroundColor: '#DCFCE7',
                          color: '#15803D',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '8px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          textAlign: 'right',
                          border: '1px solid #BBF7D0'
                        }}>
                          88% Merit Subsidy
                        </div>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Score 80%+ on the Aptitude Test to unlock the ₹{meritFee} merit rate.
                      </div>
                    </div>

                    {/* Action Buttons: Large Primary Enroll CTA + Compact Secondary Syllabus */}
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
                        onClick={() => handleEnrollClick(domain)}
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
        )}
      </div>

      {/* Trust & Call to Action Banner at Bottom */}
      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #07152B 0%, #153364 100%)',
          borderRadius: '22px',
          padding: '2.75rem 2.25rem',
          color: '#FFFFFF',
          boxShadow: '0 15px 35px -5px rgba(11, 30, 61, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: '#38BDF8',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '0.5rem'
          }}>
            ✦ Cohort 2026 Admissions Open
          </div>

          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Ready to Begin Your Internship Journey?
          </h3>

          <p style={{ maxWidth: '680px', color: '#CBD5E1', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            Take the 60-minute online Aptitude Test today to qualify for the subsidized ₹699 merit fee. Build your portfolio with real-world enterprise capstone projects.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => openModal('register')}
              className="btn btn-primary btn-lg"
              style={{
                borderRadius: '12px',
                fontWeight: 800,
                boxShadow: '0 6px 20px rgba(30, 99, 214, 0.4)'
              }}
            >
              <span>Take Aptitude Test Now</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                setCurrentView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline btn-lg"
              style={{
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '12px'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
