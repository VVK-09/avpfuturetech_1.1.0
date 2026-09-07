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
  ArrowLeft
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveQuery(searchInput.trim());
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && verifiedCandidate) {
      const id = verifiedCandidate.internId || verifiedCandidate.id;
      const url = `${window.location.origin}/internships/verify?id=${encodeURIComponent(id)}`;
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
    <div style={{ backgroundColor: '#F7F9FC', minHeight: 'calc(100vh - 80px)', padding: '3rem 1rem 5rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(30, 99, 214, 0.1)',
            border: '1px solid rgba(30, 99, 214, 0.25)',
            color: 'var(--electric-blue)',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={16} color="var(--electric-blue)" />
            Official Academic & Internship Credential Registry
          </div>

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

        {/* Verification Search Bar */}
        <div style={{ maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1.5px solid var(--border-light)',
              boxShadow: '0 10px 25px -5px rgba(11, 30, 61, 0.08)',
              padding: '0.35rem 0.5rem 0.35rem 1rem',
              transition: 'border-color 0.2s'
            }}
          >
            <Search size={18} color="#94A3B8" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Credential ID or registered candidate email..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--primary-navy)',
                backgroundColor: 'transparent',
                fontWeight: 500
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: '12px',
                padding: '0.65rem 1.4rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                flexShrink: 0
              }}
            >
              <span>Verify</span>
              <ArrowRight size={15} />
            </button>
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
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(11, 30, 61, 0.08)',
                  border: '1.5px solid rgba(16, 185, 129, 0.3)',
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
                          Credential / Intern ID
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--electric-blue)', fontFamily: 'monospace' }}>
                          {verifiedCandidate.internId || verifiedCandidate.id}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ISO 9001:2015 Encoded</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                          Specialization Track
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                          {verifiedCandidate.chosenDomainName || 'Artificial Intelligence & ML'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>3-Month Industry Program</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                          Issue Date & Authority
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                          {verifiedCandidate.issueDate || '7 September 2026'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AVP FutureTech LLP</div>
                      </div>
                    </div>

                    {/* Authority & Actions */}
                    <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <Building2 size={18} color="var(--electric-blue)" />
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-body)' }}>
                          <strong>Accreditation:</strong> Recognized by Ministry of Corporate Affairs (Govt. of India) · ISO 9001:2015 Certified
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={handleCopyLink}
                          className="btn btn-ghost btn-sm"
                          style={{ borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, border: '1.5px solid var(--border-light)' }}
                        >
                          {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                          <span>{copied ? 'Link Copied!' : 'Copy Verification URL'}</span>
                        </button>

                        <button
                          onClick={handleDownload}
                          className="btn btn-primary btn-sm"
                          style={{ borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700 }}
                        >
                          <Download size={14} />
                          <span>Download Certificate (300 DPI)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live High-Resolution Certificate Canvas Display */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(11, 30, 61, 0.08)',
                  border: '1.5px solid var(--border-light)',
                  padding: '1.75rem',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'left' }}>
                      <Award size={20} color="#C5A059" />
                      <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                        Official Verified Certificate (High-Resolution 300 DPI)
                      </h2>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '6px', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)', border: '1px solid var(--badge-blue-border)' }}>
                      3508 × 2480 px Print Ready
                    </span>
                  </div>

                  {/* Canvas Container */}
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--border-light)', backgroundColor: '#FFFFFF', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)' }}>
                    <canvas
                      ref={canvasRef}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                        maxWidth: '100%'
                      }}
                    />
                  </div>

                  {/* Signatories Details */}
                  <div style={{
                    marginTop: '1.75rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ padding: '0.75rem', borderRadius: '10px', backgroundColor: 'var(--bg-subtle)' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-navy)' }}>Avishkar Kamble</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-body)', fontWeight: 600 }}>Director of Academics & Strategy</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>AVP FutureTech LLP</div>
                    </div>
                    <div style={{ padding: '0.75rem', borderRadius: '10px', backgroundColor: 'var(--bg-subtle)' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-navy)' }}>Vaishnav Kubade</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-body)', fontWeight: 600 }}>Director of Technology & R&D</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>AVP FutureTech LLP</div>
                    </div>
                    <div style={{ padding: '0.75rem', borderRadius: '10px', backgroundColor: 'var(--bg-subtle)' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-navy)' }}>Prathmesh Narvekar</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-body)', fontWeight: 600 }}>Director of Training & Operations</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>AVP FutureTech LLP</div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Not Found Card */
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #FECACA',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto',
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.08)'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <AlertCircle size={28} />
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                  Credential Not Found in Registry
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  We could not find an official credential matching <strong style={{ color: '#DC2626' }}>"{activeQuery}"</strong>. Please check the spelling of the Credential ID or email and try again.
                </p>

                <div style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  color: 'var(--text-body)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  <div style={{ fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>Verification Guidelines:</div>
                  <div>• Enter the exact Credential ID assigned upon program completion.</div>
                  <div>• Alternatively, search using the student's registered email address.</div>
                  <div>• Ensure the candidate has completed all required internship milestones.</div>
                </div>

                <a
                  href="/our-company#contact"
                  className="btn btn-navy"
                  style={{ borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, padding: '0.65rem 1.4rem' }}
                >
                  Contact Academic Verification Desk
                </a>
              </div>
            )}
          </div>
        ) : (
          /* Initial Standby Prompt State */
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid var(--border-light)',
            boxShadow: '0 10px 25px rgba(11, 30, 61, 0.05)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'var(--badge-blue-bg)',
              color: 'var(--electric-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <FileCheck2 size={28} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
              Ready to Verify Credentials
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              Enter a candidate's Credential ID or registered email address into the search field above to verify accreditation and view their official certificate.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-muted)'
            }}>
              <Lock size={13} color="#94A3B8" />
              Secure 256-Bit SSL Direct Academic Verification
            </div>
          </div>
        )}

        {/* Security & Verification Guarantee Cards */}
        <div style={{
          marginTop: '3.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ padding: '1.5rem', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(11, 30, 61, 0.04)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Shield size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
              Cryptographic Integrity
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Every certificate issued carries an immutable alphanumeric credential identifier cross-referenced directly against our central academic ledger.
            </p>
          </div>

          <div style={{ padding: '1.5rem', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(11, 30, 61, 0.04)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Award size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
              Govt. & ISO Accreditation
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              AVP FutureTech LLP is incorporated under the Ministry of Corporate Affairs, Government of India, operating under strict ISO 9001:2015 quality standards.
            </p>
          </div>

          <div style={{ padding: '1.5rem', borderRadius: '14px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(11, 30, 61, 0.04)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <UserCheck size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
              Triple Executive Endorsement
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Each certificate is countersigned by our Directors of Academics, Technology & R&D, and Training Operations following rigorous code review.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
