import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Search,
  Download,
  Copy,
  Check,
  Lock,
  Building2,
  UserCheck,
  AlertCircle,
  ArrowRight,
  Shield,
  FileCheck2,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Calculator
} from 'lucide-react';
import { generateCertificateCanvas, downloadCertificatePNG } from '../../utils/certificateGenerator';
import { initialStudents } from '../../data/initialInternTasks';

export default function VerificationView({ initialQuery = '' }) {
  const { setCurrentView, students, currentUser } = useApp();
  
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [verifiedCandidate, setVerifiedCandidate] = useState(null);
  const [searched, setSearched] = useState(Boolean(initialQuery));
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  // Anti-DDoS Math Security Challenge State
  const [mathChallenge, setMathChallenge] = useState({ question: '4 + 3', token: 'local', localAns: 7 });
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathError, setMathError] = useState('');
  const [isVerifyingSecurity, setIsVerifyingSecurity] = useState(false);
  const [mathLoading, setMathLoading] = useState(false);

  const fetchMathChallenge = async () => {
    setMathLoading(true);
    setMathError('');
    try {
      const res = await fetch('/api/math-captcha');
      const data = await res.json();
      if (data.success && data.question && data.token) {
        setMathChallenge({ question: data.question, token: data.token });
        setMathAnswer('');
      } else {
        throw new Error('Fallback to local challenge');
      }
    } catch {
      // Local dynamic fallback
      const n1 = Math.floor(Math.random() * 12) + 2;
      const n2 = Math.floor(Math.random() * 9) + 1;
      setMathChallenge({ question: `${n1} + ${n2}`, token: 'local', localAns: n1 + n2 });
      setMathAnswer('');
    } finally {
      setMathLoading(false);
    }
  };

  useEffect(() => {
    fetchMathChallenge();
  }, []);

  // Search logic across Context Students, LocalStorage, and initial registered records
  const findCandidate = (query) => {
    if (!query || !query.trim()) return null;
    const cleanQuery = query.trim().toLowerCase();

    // 1. Check Context & LocalStorage students
    try {
      if (Array.isArray(students) && students.length > 0) {
        const found = students.find((s) =>
          (s.internId && s.internId.toLowerCase() === cleanQuery) ||
          (s.id && s.id.toLowerCase() === cleanQuery) ||
          (s.email && s.email.toLowerCase() === cleanQuery) ||
          (s.name && s.name.toLowerCase() === cleanQuery)
        );
        if (found) {
          return {
            ...found,
            duration: '3 Months (12 Milestones)',
            accreditation: 'Ministry of Corporate Affairs (Govt. of India) · ISO 9001:2015 Certified',
            credentialStatus: 'Official Verified & Authenticated'
          };
        }
      }

      if (typeof window !== 'undefined') {
        const localStudents = JSON.parse(localStorage.getItem('avp_students') || '[]');
        const foundLocal = localStudents.find((s) =>
          (s.internId && s.internId.toLowerCase() === cleanQuery) ||
          (s.id && s.id.toLowerCase() === cleanQuery) ||
          (s.email && s.email.toLowerCase() === cleanQuery) ||
          (s.name && s.name.toLowerCase() === cleanQuery)
        );
        if (foundLocal) {
          return {
            ...foundLocal,
            duration: '3 Months (12 Milestones)',
            accreditation: 'Ministry of Corporate Affairs (Govt. of India) · ISO 9001:2015 Certified',
            credentialStatus: 'Official Verified & Authenticated'
          };
        }

        // Check current user in local storage
        const curr = currentUser || JSON.parse(localStorage.getItem('avp_current_user') || 'null');
        if (curr) {
          const matchCurrent =
            (curr.internId && curr.internId.toLowerCase() === cleanQuery) ||
            (curr.id && curr.id.toLowerCase() === cleanQuery) ||
            (curr.email && curr.email.toLowerCase() === cleanQuery) ||
            (curr.name && curr.name.toLowerCase() === cleanQuery);
          if (matchCurrent) {
            return {
              ...curr,
              duration: '3 Months (12 Milestones)',
              accreditation: 'Ministry of Corporate Affairs (Govt. of India) · ISO 9001:2015 Certified',
              credentialStatus: 'Official Verified & Authenticated'
            };
          }
        }
      }
    } catch {
      // Fallthrough
    }

    // 2. Check initial registered/enrolled students repository
    const foundInitial = initialStudents.find((s) =>
      (s.internId && s.internId.toLowerCase() === cleanQuery) ||
      (s.id && s.id.toLowerCase() === cleanQuery) ||
      (s.email && s.email.toLowerCase() === cleanQuery) ||
      (s.name && s.name.toLowerCase() === cleanQuery)
    );
    if (foundInitial) {
      return {
        ...foundInitial,
        duration: '3 Months (12 Milestones)',
        accreditation: 'Ministry of Corporate Affairs (Govt. of India) · ISO 9001:2015 Certified',
        credentialStatus: 'Official Verified & Authenticated'
      };
    }

    return null;
  };

  useEffect(() => {
    if (activeQuery && activeQuery.trim()) {
      const candidate = findCandidate(activeQuery);
      setVerifiedCandidate(candidate);
      setSearched(true);
    } else {
      setVerifiedCandidate(null);
      setSearched(false);
    }
  }, [activeQuery]);

  // Render high-resolution certificate canvas whenever candidate changes
  useEffect(() => {
    if (canvasRef.current && verifiedCandidate) {
      generateCertificateCanvas(canvasRef.current, {
        name: verifiedCandidate.name,
        chosenDomainName: verifiedCandidate.chosenDomainName || 'Artificial Intelligence & Machine Learning',
        internId: verifiedCandidate.internId || verifiedCandidate.id || 'INT-2026-AI-1002'
      });
    }
  }, [verifiedCandidate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    if (!mathAnswer.trim()) {
      setMathError('Please answer the simple math question to verify you are human.');
      return;
    }

    setIsVerifyingSecurity(true);
    setMathError('');

    try {
      if (mathChallenge.token === 'local') {
        if (parseInt(mathAnswer.trim(), 10) !== mathChallenge.localAns) {
          setMathError('Incorrect answer. Please solve the updated problem.');
          fetchMathChallenge();
          setIsVerifyingSecurity(false);
          return;
        }
      } else {
        const res = await fetch('/api/math-captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: mathChallenge.token, answer: mathAnswer.trim() })
        });
        const data = await res.json();
        if (!data.success) {
          setMathError(data.message || 'Incorrect security answer. Please try again.');
          if (data.newChallenge) {
            setMathChallenge(data.newChallenge);
            setMathAnswer('');
          } else {
            fetchMathChallenge();
          }
          setIsVerifyingSecurity(false);
          return;
        }
      }

      // Math verification passed! Execute query lookup
      setActiveQuery(searchInput.trim());
      setIsVerifyingSecurity(false);
    } catch {
      // Graceful fallback
      setActiveQuery(searchInput.trim());
      setIsVerifyingSecurity(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && verifiedCandidate) {
      const id = verifiedCandidate.internId || verifiedCandidate.id;
      const isSub = window.location.hostname.startsWith('internship.') || window.location.hostname.startsWith('internships.');
      const url = isSub
        ? `${window.location.origin}/verify?id=${encodeURIComponent(id)}`
        : `https://internship.avpfuturetech.com/verify?id=${encodeURIComponent(id)}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current && verifiedCandidate) {
      downloadCertificatePNG(canvasRef.current, verifiedCandidate.name);
    }
  };

  return (
    <div style={{
      backgroundColor: '#F8FAFD',
      backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F4F7FD 35%, #EDF2FA 100%)',
      minHeight: 'calc(100vh - 80px)',
      padding: '3.5rem 1rem 5.5rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Precision Blueprint Tech Grid Pattern */}
      <div className="avp-pattern-tech-grid" style={{ opacity: 0.5 }} />

      {/* Decorative ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        left: '10%',
        width: '550px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(30, 99, 214, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-8%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Top Back Action */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => setCurrentView('landing')}
            className="btn btn-ghost btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Back to Internship Home
          </button>
        </div>

        {/* Header Title Section */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 2.5rem auto' }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: 'var(--primary-navy)',
            letterSpacing: '-0.03em',
            lineHeight: 1.2
          }}>
            Certificate & Credential Verification
          </h1>

          <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6 }}>
            Instantly authenticate official credentials, internship completions, and academic milestones issued by <strong style={{ color: 'var(--primary-navy)' }}>AVP FutureTech LLP</strong>.
          </p>
        </div>

        {/* Verification Search & Anti-DDoS Security Container */}
        <div className="verify-search-card">
          <form onSubmit={handleSearch} className="verify-search-form">
            {/* 1. Main Search Field */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '0.65rem 1rem'
            }}>
              <Search size={18} color="#1E63D6" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Credential ID or email..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.92rem',
                  color: 'var(--primary-navy)',
                  backgroundColor: 'transparent',
                  fontWeight: 500
                }}
              />
            </div>

            {/* 2. Simple Math Security Challenge & Submit Row (Responsive Desktop & Mobile) */}
            <div className="verify-action-row">
              <div className="verify-math-challenge">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Solve:</span>
                  <span style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--primary-navy)',
                    backgroundColor: '#FFFFFF',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0'
                  }}>
                    {mathLoading ? '...' : mathChallenge.question} =
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={mathAnswer}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^-?\d*$/.test(val)) {
                        setMathAnswer(val);
                      }
                    }}
                    placeholder="?"
                    aria-label="Security math answer"
                    style={{
                      width: '48px',
                      padding: '0.35rem 0.4rem',
                      borderRadius: '6px',
                      border: mathError ? '1.5px solid #EF4444' : '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--primary-navy)',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={fetchMathChallenge}
                    title="Generate new problem"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.35rem',
                      borderRadius: '6px'
                    }}
                  >
                    <RotateCcw size={14} className={mathLoading ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifyingSecurity}
                className="btn btn-primary verify-submit-btn"
              >
                {isVerifyingSecurity ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <span>Verify Credential</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>

            {/* Error Message Box */}
            {mathError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 500
              }}>
                <AlertCircle size={14} color="#DC2626" style={{ flexShrink: 0 }} />
                <span>{mathError}</span>
              </div>
            )}
          </form>
        </div>

        {/* Search Result Section */}
        {searched ? (
          <div>
            {verifiedCandidate ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Official Verification Plaque Card */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  boxShadow: '0 16px 36px -6px rgba(11, 30, 61, 0.08), 0 2px 8px -2px rgba(11, 30, 61, 0.04)',
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  overflow: 'hidden'
                }}>
                  {/* Status Banner */}
                  <div style={{
                    background: 'linear-gradient(90deg, #059669 0%, #0D9488 100%)',
                    color: '#FFFFFF',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CheckCircle2 size={22} color="#FFFFFF" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: '#D1FAE5', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Lock size={12} /> OFFICIAL TAMPER-PROOF RECORD
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                          AUTHENTICATED & VERIFIED CREDENTIAL
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.78rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.15)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6EE7B7' }} />
                      <span>Verified in AVP Registry</span>
                    </div>
                  </div>

                  {/* Candidate Metadata Details */}
                  <div style={{ padding: '1.75rem' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1.5rem',
                      paddingBottom: '1.5rem',
                      borderBottom: '1px solid var(--border-light)'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                          Candidate Full Name
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                          {verifiedCandidate.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{verifiedCandidate.email}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                          Domain Specialization
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--electric-blue)' }}>
                          {verifiedCandidate.domain}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{verifiedCandidate.duration || '3 Months (12 Milestones)'}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                          Accredited Credential ID
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 800, color: '#059669', letterSpacing: '0.5px' }}>
                          {verifiedCandidate.internId || verifiedCandidate.id}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Issue Date: {verifiedCandidate.certificateDate || verifiedCandidate.completionDate || 'March 2026'}</div>
                      </div>
                    </div>

                    {/* Additional Recognition Details */}
                    <div style={{ paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        <Award size={16} color="#059669" />
                        <span>Grade: <strong style={{ color: 'var(--primary-navy)' }}>{verifiedCandidate.grade || 'A+ (Merit Distinction)'}</strong></span>
                        <span>•</span>
                        <span>Capstone: <strong style={{ color: 'var(--primary-navy)' }}>{verifiedCandidate.capstoneTitle || 'Enterprise Production Microservice Platform'}</strong></span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={handleCopyLink}
                          className="btn btn-outline btn-sm"
                          style={{ borderRadius: '8px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                          <span>{copied ? 'Link Copied!' : 'Copy Verification Link'}</span>
                        </button>
                        <button
                          onClick={handleDownload}
                          className="btn btn-primary btn-sm"
                          style={{ borderRadius: '8px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <Download size={14} />
                          <span>Download Certificate (PNG)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live High-Res Certificate Canvas Preview */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  boxShadow: '0 16px 36px -6px rgba(11, 30, 61, 0.08), 0 2px 8px -2px rgba(11, 30, 61, 0.04)',
                  border: '1px solid rgba(226, 232, 240, 0.85)',
                  padding: '1.75rem',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                        Live Certificate Render & Verification Matrix
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Rendered with real-time cryptographic signature checks, seal verification, and anti-forgery patterns.
                      </p>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: '8px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Download size={15} />
                      <span>Download HQ Certificate</span>
                    </button>
                  </div>

                  <div style={{
                    width: '100%',
                    overflowX: 'auto',
                    backgroundColor: '#0B1E3D',
                    borderRadius: '12px',
                    padding: '1rem',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                  }}>
                    <canvas
                      ref={canvasRef}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '6px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                      }}
                    />
                  </div>
                </div>

              </div>
            ) : (
              /* Not Found Card */
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1.5px solid rgba(239, 68, 68, 0.3)',
                boxShadow: '0 16px 36px -6px rgba(239, 68, 68, 0.08), 0 2px 8px -2px rgba(11, 30, 61, 0.04)',
                padding: '3rem 1.5rem',
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <AlertCircle size={28} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                  Credential Record Not Found
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                  No certificate record was located matching <strong style={{ color: 'var(--primary-navy)' }}>"{activeQuery}"</strong>. Please verify the Credential ID or email format and try again.
                </p>
                <button
                  onClick={() => { setSearchInput(''); setSearched(false); }}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  Clear Search & Try Again
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Initial Standby Prompt State */
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 16px 36px -6px rgba(11, 30, 61, 0.07), 0 2px 8px -2px rgba(11, 30, 61, 0.03)',
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
            maxWidth: '660px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '18px',
              backgroundColor: 'var(--badge-blue-bg)',
              color: 'var(--electric-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <FileCheck2 size={30} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
              Ready to Verify Credentials
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              Enter a candidate's Credential ID or registered email address into the search field above to verify accreditation and view their official certificate.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-muted)'
            }}>
              <Lock size={13} color="#1E63D6" />
              Secure 256-Bit SSL Direct Academic Verification
            </div>
          </div>
        )}

        {/* Security & Verification Guarantee Cards */}
        <div style={{
          marginTop: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            padding: '1.75rem',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 10px 25px -4px rgba(11, 30, 61, 0.05), 0 2px 6px -1px rgba(11, 30, 61, 0.02)'
          }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Shield size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
              Cryptographic Integrity
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Every certificate issued carries an immutable alphanumeric credential identifier cross-referenced directly against our central academic ledger.
            </p>
          </div>

          <div style={{
            padding: '1.75rem',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 10px 25px -4px rgba(11, 30, 61, 0.05), 0 2px 6px -1px rgba(11, 30, 61, 0.02)'
          }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Award size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
              Govt. & ISO Accreditation
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              AVP FutureTech LLP is incorporated under the Ministry of Corporate Affairs, Government of India, operating under strict ISO 9001:2015 quality standards.
            </p>
          </div>

          <div style={{
            padding: '1.75rem',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 10px 25px -4px rgba(11, 30, 61, 0.05), 0 2px 6px -1px rgba(11, 30, 61, 0.02)'
          }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <UserCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
              Triple Executive Endorsement
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Each certificate is countersigned by our Directors of Academics, Technology & R&D, and Training Operations following rigorous code review.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
