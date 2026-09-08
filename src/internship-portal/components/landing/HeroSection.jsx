import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import InteractiveBackground from '../common/InteractiveBackground';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  Lightbulb,
  Newspaper,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

const DEFAULT_TECH_FACTS = [
  {
    id: "tf-1",
    categoryLabel: "IoT & Microcontrollers",
    title: "More Power than Apollo 11",
    fact: "The tiny $4 ESP32 microcontroller in our IoT labs has over 200x more computing power and 1,000x more RAM than the Apollo 11 Moon Lander computer.",
    yearOrMetric: "240 MHz Dual-Core",
    source: "NASA Archives"
  },
  {
    id: "tf-5",
    categoryLabel: "Neural Networks & AI",
    title: "100 Trillion Synaptic Connections",
    fact: "The human brain contains ~86 billion neurons consuming only 20W of power. Modern AI Transformers emulate this deep associative capability on edge chips.",
    yearOrMetric: "~20 Watts Power",
    source: "MIT Tech Review"
  },
  {
    id: "tf-7",
    categoryLabel: "Silicon & Hardware",
    title: "19 Billion Transistors on a Fingernail",
    fact: "Modern 3-nanometer silicon chips pack over 19 billion transistors into an area smaller than a postage stamp — with switches merely a dozen atoms wide.",
    yearOrMetric: "3nm Fabrication",
    source: "IEEE Spectrum"
  },
  {
    id: "tf-4",
    categoryLabel: "Computer Science",
    title: "The First Real Computer Bug Was a Moth",
    fact: "In 1947, Grace Hopper's team found a real moth trapped in relays of the Harvard Mark II computer, taping it in their logbook as the first actual bug.",
    yearOrMetric: "Harvard Mark II (1947)",
    source: "Smithsonian Museum"
  }
];

const DEFAULT_TECH_NEWS = [
  {
    id: "tn-1",
    title: "Next-Gen Edge AI: 3nm Neuromorphic Chips Enable Real-Time Vision on Sub-5W Drones",
    source: "IEEE Spectrum",
    category: "AI & Hardware",
    timeAgo: "1h ago",
    url: "https://spectrum.ieee.org"
  },
  {
    id: "tn-2",
    title: "Open-Source RISC-V Architecture Surges Past 10 Billion Embedded Cores Worldwide",
    source: "RISC-V International",
    category: "Semiconductors",
    timeAgo: "2h ago",
    url: "https://riscv.org"
  },
  {
    id: "tn-3",
    title: "Autonomous RAG Agents & Local LLMs Transform Enterprise Engineering Workflows",
    source: "Hacker News",
    category: "Software Engineering",
    timeAgo: "3h ago",
    url: "https://news.ycombinator.com"
  }
];

export default function HeroSection() {
  const { openModal } = useApp();
  const [activeTab, setActiveTab] = useState('facts'); // 'facts' | 'news'
  const [facts, setFacts] = useState(DEFAULT_TECH_FACTS);
  const [factIndex, setFactIndex] = useState(0);
  const [news, setNews] = useState(DEFAULT_TECH_NEWS);
  const [newsIndex, setNewsIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch live tech facts & news from free API endpoint
  useEffect(() => {
    let isMounted = true;
    async function fetchTechFeed() {
      try {
        const res = await fetch('/api/tech-facts?news=true');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.allFacts && data.allFacts.length > 0) {
              setFacts(data.allFacts);
            }
            if (data.news && data.news.length > 0) {
              setNews(data.news);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch live tech feed:', err);
      }
    }
    fetchTechFeed();
    return () => { isMounted = false; };
  }, []);

  // Auto-rotate ticker every 6.5s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (activeTab === 'facts' && facts.length > 0) {
        setFactIndex((prev) => (prev + 1) % facts.length);
      } else if (activeTab === 'news' && news.length > 0) {
        setNewsIndex((prev) => (prev + 1) % news.length);
      }
    }, 6500);
    return () => clearInterval(timer);
  }, [activeTab, facts.length, news.length, isPaused]);

  const handleNext = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 300);
    if (activeTab === 'facts') {
      setFactIndex((prev) => (prev + 1) % facts.length);
    } else {
      setNewsIndex((prev) => (prev + 1) % news.length);
    }
  };

  const scrollToDomains = () => {
    const el = document.getElementById('domains');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentFact = facts[factIndex] || DEFAULT_TECH_FACTS[0];
  const currentNews = news[newsIndex] || DEFAULT_TECH_NEWS[0];

  return (
    <section id="hero" style={{
      position: 'relative',
      paddingTop: '3.25rem',
      paddingBottom: '4.5rem',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden'
    }}>
      {/* Precision Blueprint Grid & Interactive Canvas */}
      <div className="avp-pattern-tech-grid" style={{ opacity: 0.55 }} />
      <InteractiveBackground />

      {/* Decorative ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-150px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(30, 99, 214, 0.08) 0%, rgba(247, 249, 252, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, rgba(247, 249, 252, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Left Column: Hero Content */}
          <div>
            {/* Top Tagline Badge - Modern Glassmorphic Rounded Box */}
            <div
              onClick={() => openModal('register')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal('register'); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.42rem 0.95rem 0.42rem 0.5rem',
                background: 'linear-gradient(135deg, rgba(240, 249, 255, 0.95) 0%, rgba(224, 242, 254, 0.8) 50%, rgba(238, 246, 255, 0.95) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.45)',
                borderRadius: '10px',
                boxShadow: '0 4px 18px -2px rgba(30, 99, 214, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                userSelect: 'none',
                maxWidth: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(30, 99, 214, 0.22), 0 0 0 1px rgba(56, 189, 248, 0.3) inset';
                e.currentTarget.style.borderColor = 'var(--electric-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px -2px rgba(30, 99, 214, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
              }}
            >
              {/* Glowing Sparkle Icon Badge */}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '26px',
                height: '26px',
                borderRadius: '7px',
                background: 'linear-gradient(135deg, #1E63D6 0%, #38BDF8 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(30, 99, 214, 0.35)',
                flexShrink: 0
              }}>
                <Sparkles size={14} />
              </span>

              {/* Tagline Text */}
              <span style={{
                fontWeight: 700,
                color: 'var(--primary-navy)',
                fontSize: '0.86rem',
                letterSpacing: '-0.2px'
              }}>
                AVP FutureTech Aptitude Test 2026
              </span>

              {/* Pulsing Live Badge */}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.28)',
                color: '#059669',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.6px',
                textTransform: 'uppercase'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px #10B981'
                }} />
                LIVE
              </span>

              {/* Action Arrow */}
              <ArrowRight size={14} color="var(--electric-blue)" style={{ marginLeft: '1px' }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--primary-navy)',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              letterSpacing: '-1px'
            }}>
              Launch Your Tech Career with{' '}
              <span style={{
                color: 'var(--electric-blue)',
                position: 'relative',
                display: 'inline-block'
              }}>
                Industry-Ready
              </span>{' '}
              Internships
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.12rem',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              marginBottom: '2.25rem',
              maxWidth: '560px'
            }}>
              Gain verified experience in <strong>AI & ML, Data Science, Cybersecurity, Full Stack & Mobile Apps</strong>. Take our 60-min Aptitude Test — score 80%+ to unlock our subsidized <strong>₹699 Merit Rate</strong> (Standard: ₹5,999).
            </p>

            {/* Main Action Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <button
                type="button"
                onClick={() => openModal('register')}
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: '0 8px 24px rgba(30, 99, 214, 0.35)',
                  fontSize: '1.05rem',
                  padding: '0.95rem 2.2rem',
                  fontWeight: 800
                }}
              >
                Register for Test
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={scrollToDomains}
                className="btn btn-outline btn-lg"
                style={{
                  padding: '0.95rem 1.8rem',
                  fontSize: '1.02rem',
                  fontWeight: 600
                }}
              >
                Explore 6 Domains
              </button>
            </div>
          </div>

          {/* Right Column: Clean Visual Image Showcase */}
          <div style={{ position: 'relative' }}>
            {/* Ambient decorative back-glow */}
            <div style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '30px',
              background: 'radial-gradient(circle, rgba(30, 99, 214, 0.18) 0%, rgba(56, 189, 248, 0.1) 70%, transparent 100%)',
              filter: 'blur(20px)',
              zIndex: 0,
              pointerEvents: 'none'
            }} />

            {/* Main Showcase Image Frame */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1.5px solid var(--border-light)',
              boxShadow: '0 20px 45px -10px rgba(11, 30, 61, 0.16), 0 8px 20px -6px rgba(11, 30, 61, 0.08)',
              backgroundColor: '#FFFFFF',
              aspectRatio: '4 / 3'
            }}>
              <img
                src="/images/internship_hero.jpg"
                alt="AVP FutureTech Interns and Engineers Collaborating"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Bottom-Left Floating Accreditation Pill inside Image Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                padding: '0.45rem 0.8rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                zIndex: 3
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  backgroundColor: 'var(--badge-blue-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--electric-blue)'
                }}>
                  <CheckCircle size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    ISO 9001:2015 & MCA
                  </div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Govt. Recognized Certificate
                  </div>
                </div>
              </div>
            </div>

            {/* Top-Right Floating Rating Pill */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              padding: '0.45rem 0.95rem',
              boxShadow: '0 10px 25px -4px rgba(11, 30, 61, 0.15)',
              border: '1.5px solid var(--badge-blue-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              zIndex: 3
            }}>
              <div style={{ display: 'flex', gap: '1px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                4.9/5 Rating
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                (5k+ Interns)
              </span>
            </div>

            {/* Free API Tech Byte: Tech Fun Facts & Live Tech News Widget */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                marginTop: '1.25rem',
                padding: '0.85rem 1.15rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid var(--border-light)',
                boxShadow: '0 8px 24px -4px rgba(11, 30, 61, 0.08)',
                position: 'relative',
                zIndex: 2,
                transition: 'all 0.3s ease'
              }}
            >
              {/* Top Header: Category Tabs + Live Pulse Indicator + Shuffle/Next */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '0.6rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('facts')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: activeTab === 'facts' ? 800 : 600,
                      cursor: 'pointer',
                      border: activeTab === 'facts' ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                      backgroundColor: activeTab === 'facts' ? 'var(--badge-blue-bg)' : '#FFFFFF',
                      color: activeTab === 'facts' ? 'var(--electric-blue)' : 'var(--text-muted)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Lightbulb size={12} />
                    <span>Tech Fun Fact</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('news')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: activeTab === 'news' ? 800 : 600,
                      cursor: 'pointer',
                      border: activeTab === 'news' ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                      backgroundColor: activeTab === 'news' ? 'var(--badge-blue-bg)' : '#FFFFFF',
                      color: activeTab === 'news' ? 'var(--electric-blue)' : 'var(--text-muted)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Newspaper size={12} />
                    <span>Live Tech News</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <button
                    type="button"
                    title="Next Tech Byte"
                    onClick={handleNext}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-navy)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <RefreshCw size={11} style={{ transform: isRefreshing ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
                  </button>
                </div>
              </div>

              {/* Dynamic Body Content */}
              {activeTab === 'facts' ? (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.25rem'
                  }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                      {currentFact.title}
                    </div>
                    {currentFact.yearOrMetric && (
                      <span style={{
                        fontSize: '0.64rem',
                        fontWeight: 700,
                        color: 'var(--electric-blue)',
                        backgroundColor: 'var(--badge-blue-bg)',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap'
                      }}>
                        {currentFact.yearOrMetric}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.45,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {currentFact.fact}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '0.4rem',
                    fontSize: '0.66rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>{currentFact.categoryLabel || 'STEM Insight'} · {currentFact.source}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.25rem'
                  }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#2563EB',
                      backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px'
                    }}>
                      {currentNews.category || 'Tech Story'}
                    </span>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                      {currentNews.timeAgo || 'Recent'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-navy)', lineHeight: 1.35, marginBottom: '0.35rem' }}>
                    {currentNews.title}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.66rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>Source: {currentNews.source}</span>
                    {currentNews.url && (
                      <a
                        href={currentNews.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          color: 'var(--electric-blue)',
                          fontWeight: 700,
                          textDecoration: 'none'
                        }}
                      >
                        Read Article <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Hero Stats Bar */}
        <div style={{
          marginTop: '3.75rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-navy)', fontFamily: 'var(--font-heading)' }}>
              6 Domains
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              High-Demand Tech Tracks
            </div>
          </div>

          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--electric-blue)', fontFamily: 'var(--font-heading)' }}>
              ₹699
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Merit Discount Pricing starts from 699
            </div>
          </div>

          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-navy)', fontFamily: 'var(--font-heading)' }}>
              94.2%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Interview Clearance Rate
            </div>
          </div>

          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--electric-blue)', fontFamily: 'var(--font-heading)' }}>
              100% Remote
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Flexible Milestone Submissions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
