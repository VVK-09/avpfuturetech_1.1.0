import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import InteractiveBackground from '../common/InteractiveBackground';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Award,
  Brain,
  Code2,
  Shield,
  BarChart3,
  Layers,
  Smartphone,
  Star,
  Terminal,
  TrendingUp,
  Cpu,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  QrCode,
  Zap,
  Activity,
  Briefcase
} from 'lucide-react';

const DOMAIN_DATA = {
  'dom-ai-ml': {
    id: 'dom-ai-ml',
    title: 'AI & Machine Learning',
    icon: Brain,
    tag: 'GenAI, LLM Agents & Neural Networks',
    package: '₹8.5 - ₹16.0 LPA',
    tech: ['PyTorch 2.4', 'LangChain', 'FastAPI', 'ChromaDB', 'Docker'],
    capstone: 'Autonomous Multi-Agent RAG Research System',
    simulationTitle: 'Live RAG Agent & Vector DB Pipeline',
    simulationAction: 'Run RAG Inference',
    simulationSteps: [
      { name: 'Vectorizing Clinical Knowledge Base', time: '12ms', status: 'done' },
      { name: 'Cosine Similarity Query on ChromaDB', time: '8ms', status: 'done' },
      { name: 'Transformer LLM Response Generation', time: '45ms', status: 'done' },
      { name: 'Output Verification & Accuracy Audit', time: '98.6%', status: 'success' }
    ],
    metricValue: '98.6%',
    metricLabel: 'Model Accuracy'
  },
  'dom-python-fullstack': {
    id: 'dom-python-fullstack',
    title: 'Python Full Stack Dev',
    icon: Code2,
    tag: 'FastAPI, React 18 & Microservices',
    package: '₹7.5 - ₹14.0 LPA',
    tech: ['Python 3.12', 'FastAPI', 'React 18', 'PostgreSQL', 'Redis'],
    capstone: 'Multi-Tenant Enterprise SaaS with Redis Cache',
    simulationTitle: 'Microservice Cluster & API Orchestrator',
    simulationAction: 'Deploy Microservices',
    simulationSteps: [
      { name: 'Building Docker Multi-Stage Container', time: '1.2s', status: 'done' },
      { name: 'Running PyTest Integration Suite (42/42)', time: '100%', status: 'done' },
      { name: 'Deploying to Kubernetes Pod Cluster', time: '3 Replicas', status: 'done' },
      { name: 'Health Check: HTTP 200 OK Response', time: '9.4ms', status: 'success' }
    ],
    metricValue: '9.4ms',
    metricLabel: 'P99 Latency'
  },
  'dom-cyber': {
    id: 'dom-cyber',
    title: 'Cybersecurity & Pentesting',
    icon: Shield,
    tag: 'Red Team, OWASP & Cloud Hardening',
    package: '₹8.0 - ₹15.5 LPA',
    tech: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Metasploit', 'Splunk'],
    capstone: 'Enterprise Perimeter Penetration Test & SIEM',
    simulationTitle: 'Automated Vulnerability & Perimeter Audit',
    simulationAction: 'Execute Pen-Test Scan',
    simulationSteps: [
      { name: 'Port Mapping & SSL/TLS Cipher Inspection', time: '443/TCP', status: 'done' },
      { name: 'OWASP Top 10 Attack Surface Simulation', time: '0 CVEs', status: 'done' },
      { name: 'Splunk SIEM Log Ingestion & Threat Analysis', time: 'Live', status: 'done' },
      { name: 'Perimeter Security Status: Fully Hardened', time: 'Grade A+', status: 'success' }
    ],
    metricValue: 'Grade A+',
    metricLabel: 'Security Posture'
  },
  'dom-ds': {
    id: 'dom-ds',
    title: 'Data Science & Analytics',
    icon: BarChart3,
    tag: 'Predictive Modeling & Executive BI',
    package: '₹7.8 - ₹14.5 LPA',
    tech: ['Python', 'SQL Window Fns', 'PowerBI', 'Tableau', 'Snowflake'],
    capstone: 'Customer Lifetime Value & Churn Prediction Model',
    simulationTitle: 'Predictive Revenue & Cohort Engine',
    simulationAction: 'Run Churn Prediction',
    simulationSteps: [
      { name: 'Extracting 500k+ Transactions from Snowflake', time: '140ms', status: 'done' },
      { name: 'Feature Engineering & Cross-Validation', time: '5-Fold', status: 'done' },
      { name: 'XGBoost Classification & ROC-AUC Evaluation', time: '0.94 AUC', status: 'done' },
      { name: 'Predicted Churn Reduction Impact: +₹2.4M', time: 'Calculated', status: 'success' }
    ],
    metricValue: '0.94',
    metricLabel: 'ROC-AUC Score'
  },
  'dom-java-fullstack': {
    id: 'dom-java-fullstack',
    title: 'Java Full Stack Development',
    icon: Layers,
    tag: 'Spring Boot 3, Kafka & Distributed Systems',
    package: '₹8.0 - ₹15.0 LPA',
    tech: ['Java 21', 'Spring Boot 3', 'Kafka Streams', 'Hibernate', 'React'],
    capstone: 'High-Throughput Banking & Payment Gateway Engine',
    simulationTitle: 'Distributed Kafka Event Stream Settle',
    simulationAction: 'Trigger Event Stream',
    simulationSteps: [
      { name: 'Ingesting Real-Time Transaction Stream', time: '50k ops/s', status: 'done' },
      { name: 'Spring Boot Microservice Idempotency Check', time: 'Passed', status: 'done' },
      { name: 'Distributed Consensus & Ledger Update', time: '2.1ms', status: 'done' },
      { name: 'Instant Settlement: Zero Packet Loss', time: '100% Sync', status: 'success' }
    ],
    metricValue: '50k/s',
    metricLabel: 'Throughput'
  },
  'dom-mobile-app': {
    id: 'dom-mobile-app',
    title: 'Mobile App Development',
    icon: Smartphone,
    tag: 'Flutter, React Native & Cloud Firebase',
    package: '₹7.0 - ₹13.5 LPA',
    tech: ['Flutter', 'React Native', 'Firebase', 'Redux', 'SQLite'],
    capstone: 'Real-Time Health Tracker & Geolocation App',
    simulationTitle: 'Cross-Platform Engine & Cloud Sync',
    simulationAction: 'Test Live App Sync',
    simulationSteps: [
      { name: 'Compiling Flutter AOT Binary for iOS & Android', time: '60 FPS', status: 'done' },
      { name: 'Firebase Realtime Firestore Channel Handshake', time: 'Active', status: 'done' },
      { name: 'Geolocation Delta Sync & Offline Cache Store', time: 'Stored', status: 'done' },
      { name: 'App Store Guidelines Verification: Ready', time: '100% Passed', status: 'success' }
    ],
    metricValue: '60 FPS',
    metricLabel: 'UI Fluidity'
  }
};

const PLACEMENT_TICKER = [
  { name: 'Ananya Deshmukh', company: 'Accenture AI Labs', package: '₹9.6 LPA', domain: 'AI & Machine Learning' },
  { name: 'Rohan Sharma', company: 'Microsoft India', package: '₹14.2 LPA', domain: 'Python Full Stack' },
  { name: 'Priya Sundaram', company: 'Amazon AWS', package: '₹15.8 LPA', domain: 'Cybersecurity' },
  { name: 'Karthik Varma', company: 'Tata Consultancy Services', package: '₹8.4 LPA', domain: 'Data Science' }
];

export default function HeroSection() {
  const { openModal } = useApp();
  const [activeDomainKey, setActiveDomainKey] = useState('dom-ai-ml');
  const [activeInteractiveTab, setActiveInteractiveTab] = useState('simulation'); // 'simulation' | 'certificate' | 'roadmap'
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(100);
  const [placementIndex, setPlacementIndex] = useState(0);

  const currentDomain = DOMAIN_DATA[activeDomainKey] || DOMAIN_DATA['dom-ai-ml'];
  const DomainIcon = currentDomain.icon;

  // Auto-rotate live placement ticker every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPlacementIndex((prev) => (prev + 1) % PLACEMENT_TICKER.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const scrollToDomains = () => {
    const el = document.getElementById('domains');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{
      position: 'relative',
      paddingTop: '4.5rem',
      paddingBottom: '5rem',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden'
    }}>
      {/* Interactive Minimal Canvas */}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Hero Content */}
          <div>
            {/* Top Tagline Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              backgroundColor: 'var(--badge-blue-bg)',
              color: 'var(--badge-blue-text)',
              border: '1px solid var(--badge-blue-border)',
              borderRadius: '9999px',
              fontSize: '0.86rem',
              fontWeight: 700,
              letterSpacing: '0.3px',
              marginBottom: '1.5rem'
            }}>
              <Sparkles size={16} color="var(--electric-blue)" />
              AVP FutureTech Aptitude Test 2026 Live
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
              alignItems: 'center',
              marginBottom: '2.5rem'
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

            {/* Value Guarantees */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontSize: '0.88rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle size={16} color="var(--electric-blue)" />
                <span>Verified ISO & MCA Certificate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle size={16} color="var(--electric-blue)" />
                <span>Live Project Submissions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle size={16} color="var(--electric-blue)" />
                <span>1-on-1 Weekly Code Reviews</span>
              </div>
            </div>
          </div>

          {/* Right Column: Ultra-Engaging Interactive Capstone & Career Lab */}
          <div style={{ position: 'relative' }}>

            {/* Main Interactive Showcase Console */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid var(--border-light)',
              boxShadow: '0 20px 45px -10px rgba(11, 30, 61, 0.14), 0 8px 20px -6px rgba(11, 30, 61, 0.06)',
              overflow: 'hidden',
              position: 'relative'
            }}>

              {/* High-Tech Topbar */}
              <div style={{
                backgroundColor: 'var(--primary-navy)',
                padding: '0.85rem 1.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#FFFFFF'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ fontSize: '0.78rem', color: '#93C5FD', fontWeight: 700, marginLeft: '0.4rem', letterSpacing: '0.5px' }}>
                    AVP FUTURETECH · ENGINEERING LABS
                  </span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#38BDF8'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38BDF8' }} />
                  Interactive Lab
                </div>
              </div>

              {/* Interactive Domain Switcher Pills */}
              <div
                className="custom-scrollbar"
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  gap: '0.4rem',
                  overflowX: 'auto'
                }}
              >
                {Object.values(DOMAIN_DATA).map((dom) => {
                  const isActive = activeDomainKey === dom.id;
                  const Icon = dom.icon;
                  return (
                    <button
                      key={dom.id}
                      type="button"
                      onClick={() => setActiveDomainKey(dom.id)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '10px',
                        border: 'none',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.18s ease',
                        backgroundColor: isActive ? 'var(--primary-navy)' : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : 'var(--text-body)',
                        boxShadow: isActive ? '0 2px 8px rgba(11, 30, 61, 0.2)' : '0 1px 3px rgba(0,0,0,0.04)'
                      }}
                    >
                      <Icon size={14} color={isActive ? '#38BDF8' : 'var(--electric-blue)'} />
                      {dom.title.split('&')[0].trim()}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Feature View Tabs: [Live Simulation | Certificate | Career Path] */}
              <div style={{
                padding: '0.6rem 1.25rem',
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button
                  type="button"
                  onClick={() => setActiveInteractiveTab('simulation')}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    backgroundColor: activeInteractiveTab === 'simulation' ? 'var(--badge-blue-bg)' : 'transparent',
                    color: activeInteractiveTab === 'simulation' ? 'var(--electric-blue)' : 'var(--text-muted)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Activity size={14} /> Capstone Sim
                </button>

                <button
                  type="button"
                  onClick={() => setActiveInteractiveTab('certificate')}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    backgroundColor: activeInteractiveTab === 'certificate' ? 'var(--badge-blue-bg)' : 'transparent',
                    color: activeInteractiveTab === 'certificate' ? 'var(--electric-blue)' : 'var(--text-muted)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Award size={14} /> Verified Credential
                </button>

                <button
                  type="button"
                  onClick={() => setActiveInteractiveTab('roadmap')}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    backgroundColor: activeInteractiveTab === 'roadmap' ? 'var(--badge-blue-bg)' : 'transparent',
                    color: activeInteractiveTab === 'roadmap' ? 'var(--electric-blue)' : 'var(--text-muted)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Briefcase size={14} /> Placement Ladder
                </button>
              </div>

              {/* Dynamic Body Content by Tab */}
              <div style={{ padding: '1.5rem' }}>

                {/* TAB 1: Live Interactive Capstone Simulation */}
                {activeInteractiveTab === 'simulation' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                      <div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {currentDomain.tag}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)', margin: '0.15rem 0 0 0' }}>
                          {currentDomain.title}
                        </h3>
                      </div>

                      <div style={{
                        textAlign: 'right',
                        backgroundColor: 'var(--badge-blue-bg)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '10px'
                      }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg. Placement</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--electric-blue)' }}>
                          {currentDomain.package}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Simulation Dashboard */}
                    <div style={{
                      backgroundColor: '#0F172A',
                      borderRadius: '16px',
                      padding: '1.15rem',
                      border: '1px solid #1E293B',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      marginBottom: '1.25rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#38BDF8', fontSize: '0.82rem', fontWeight: 700 }}>
                          <Terminal size={14} />
                          {currentDomain.simulationTitle}
                        </div>

                        <button
                          type="button"
                          onClick={handleRunSimulation}
                          disabled={isSimulating}
                          style={{
                            padding: '0.3rem 0.75rem',
                            borderRadius: '8px',
                            backgroundColor: isSimulating ? '#334155' : 'var(--electric-blue)',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: isSimulating ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Play size={12} fill="#FFFFFF" />
                          {isSimulating ? 'Running...' : currentDomain.simulationAction}
                        </button>
                      </div>

                      {/* Live Animated Steps */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.85rem' }}>
                        {currentDomain.simulationSteps.map((step, idx) => {
                          const isDone = simProgress >= (idx + 1) * 25;
                          return (
                            <div
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '0.76rem',
                                color: isDone ? '#F8FAFC' : '#64748B',
                                padding: '0.35rem 0.55rem',
                                borderRadius: '6px',
                                backgroundColor: isDone ? 'rgba(30, 41, 59, 0.6)' : 'transparent',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                <CheckCircle2 size={13} color={isDone ? '#10B981' : '#475569'} />
                                <span>{step.name}</span>
                              </div>
                              <span style={{
                                fontFamily: 'monospace',
                                color: isDone ? (step.status === 'success' ? '#10B981' : '#38BDF8') : '#475569',
                                fontWeight: 700
                              }}>
                                {isDone ? step.time : '...'}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Live Gauge Meter */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.65rem',
                        borderTop: '1px solid #1E293B',
                        fontSize: '0.74rem',
                        color: '#94A3B8'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Zap size={13} color="#F59E0B" />
                          <span>Industry Deliverable:</span>
                          <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{currentDomain.capstone}</span>
                        </div>

                        <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34D399', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                          {currentDomain.metricLabel}: {currentDomain.metricValue}
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '0.2rem' }}>Tech Stack:</span>
                      {currentDomain.tech.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            backgroundColor: 'var(--bg-subtle)',
                            border: '1px solid var(--border-light)',
                            padding: '0.18rem 0.5rem',
                            borderRadius: '6px',
                            color: 'var(--primary-navy)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: Verified ISO & MCA Credential Preview */}
                {activeInteractiveTab === 'certificate' && (
                  <div>
                    <div style={{
                      backgroundColor: 'linear-gradient(135deg, #0B1E3D 0%, #1E3A8A 100%)',
                      background: '#0B1E3D',
                      borderRadius: '16px',
                      padding: '1.4rem',
                      color: '#FFFFFF',
                      boxShadow: '0 8px 24px rgba(11, 30, 61, 0.2)',
                      marginBottom: '1.25rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', pointerEvents: 'none' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#93C5FD', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                            Ministry of Corporate Affairs Recognized
                          </div>
                          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.15rem' }}>
                            Certificate of Internship Completion
                          </div>
                        </div>

                        <span style={{
                          backgroundColor: '#1E63D6',
                          color: '#FFFFFF',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}>
                          <Award size={12} /> ISO 9001:2015
                        </span>
                      </div>

                      <div style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.5, marginBottom: '1rem' }}>
                        Issued to candidate upon clearing production capstone deliverables & code reviews for <strong>{currentDomain.title}</strong>.
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.07)',
                        padding: '0.65rem 0.9rem',
                        borderRadius: '10px',
                        fontSize: '0.75rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <QrCode size={20} color="#38BDF8" />
                          <div>
                            <div style={{ fontWeight: 700, color: '#FFFFFF' }}>Unique Verification ID</div>
                            <div style={{ color: '#94A3B8', fontSize: '0.68rem' }}>AVP-2026-INT-VERIFIED</div>
                          </div>
                        </div>

                        <span style={{ color: '#34D399', fontWeight: 700 }}>
                          ✓ Cryptographically Signed
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                      Includes personalized <strong>Letter of Recommendation (LOR)</strong> with mentor rating and GitHub repo deliverables.
                    </div>
                  </div>
                )}

                {/* TAB 3: Placement Ladder & Career Progression */}
                {activeInteractiveTab === 'roadmap' && (
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.85rem' }}>
                      12-WEEK CAREER ACCELERATOR TRAJECTORY
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {[
                        { step: 'Weeks 1–4', title: 'Foundations & Tooling Mastery', detail: 'Hands-on live problem solving and Git version control' },
                        { step: 'Weeks 5–8', title: 'Production Capstone Engineering', detail: 'Build full-scale enterprise grade applications & pipelines' },
                        { step: 'Weeks 9–12', title: 'Mentor Code Defense & Portfolio Review', detail: 'LOR issuance, mock interviews & MNC placement referrals' }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            gap: '0.85rem',
                            backgroundColor: 'var(--bg-subtle)',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--electric-blue)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            flexShrink: 0
                          }}>
                            {idx + 1}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                              {item.title} <span style={{ fontSize: '0.72rem', color: 'var(--electric-blue)', fontWeight: 600 }}>({item.step})</span>
                            </div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                              {item.detail}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom CTA Row: Large Enroll Button + Compact Syllabus */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <button
                    type="button"
                    onClick={scrollToDomains}
                    className="btn btn-outline"
                    style={{
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.82rem',
                      borderRadius: '10px',
                      fontWeight: 600,
                      color: 'var(--text-body)',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid var(--border-light)'
                    }}
                  >
                    View All 6 Domains
                  </button>

                  <button
                    type="button"
                    onClick={() => openModal('register', { domainId: currentDomain.id, domainName: currentDomain.title })}
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
                      boxShadow: '0 4px 14px rgba(30, 99, 214, 0.3)'
                    }}
                  >
                    <span>Enroll in {currentDomain.title.split('&')[0].trim()}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Top-Right Floating Trust Pill */}
            <div style={{
              position: 'absolute',
              top: '-18px',
              right: '-15px',
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              padding: '0.5rem 1rem',
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

            {/* Bottom-Left Floating Dynamic Placement Ticker */}
            <div style={{
              position: 'absolute',
              bottom: '-22px',
              left: '-15px',
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '0.75rem 1.15rem',
              boxShadow: '0 12px 30px -5px rgba(11, 30, 61, 0.18)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 3,
              maxWidth: '320px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--badge-blue-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <TrendingUp size={18} color="var(--electric-blue)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--primary-navy)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {PLACEMENT_TICKER[placementIndex].name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--electric-blue)', fontWeight: 600 }}>
                  {PLACEMENT_TICKER[placementIndex].company} · {PLACEMENT_TICKER[placementIndex].package}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Stats Bar */}
        <div style={{
          marginTop: '4.5rem',
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
              Merit Discount Pricing (80%+)
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
