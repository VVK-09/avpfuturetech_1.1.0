import React from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';
import { 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function PostTestPreferenceView() {
  const { 
    testState, 
    activeCandidate, 
    currentUser,
    setCurrentView,
    openModal 
  } = useApp();

  const candidate = activeCandidate || currentUser || { name: 'Candidate', id: 'AVP-2026-TEMP' };
  const scoreData = testState.scoreResult || (candidate.scoreData) || {
    sectionA: 18,
    sectionB: 18,
    sectionC: 8,
    totalScore: 44,
    maxScore: 50,
    percentage: 88,
    violationsCount: 0
  };

  const isMerit = scoreData.percentage >= 80;
  const isPassing = scoreData.percentage >= 40;
  const feeAmount = isMerit ? 699 : 5999;

  const handleProceedToEnrollment = () => {
    openModal('payment', {
      ...candidate,
      feeTier: isMerit ? '699' : '5999',
      scoreData
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      paddingTop: '2.5rem',
      paddingBottom: '4.5rem'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Top Branding & Congratulations Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          padding: '2.25rem 2.5rem',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
          marginBottom: '1.75rem'
        }}>
          {/* Centered Logo & Status Badge */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Logo size="lg" />

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: isPassing ? '#DCFCE7' : '#FEE2E2',
              color: isPassing ? '#15803D' : '#B91C1C',
              border: `1px solid ${isPassing ? '#86EFAC' : '#FCA5A5'}`,
              fontSize: '0.82rem',
              fontWeight: 700,
              marginTop: '1.25rem',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={15} color={isPassing ? '#16A34A' : '#DC2626'} />
              <span>{isPassing ? 'Evaluation Completed — Test Qualified' : 'Evaluation Completed'}</span>
            </div>
          </div>

          <h1 style={{ 
            fontSize: '1.9rem', 
            color: 'var(--primary-navy)', 
            fontWeight: 800, 
            marginBottom: '0.5rem',
            letterSpacing: '-0.3px'
          }}>
            Congratulations, {candidate.name}!
          </h1>
          <p style={{ 
            color: 'var(--text-muted)', 
            fontSize: '0.94rem', 
            maxWidth: '560px', 
            margin: '0 auto',
            lineHeight: 1.55 
          }}>
            Your AVP FutureTech Internship Aptitude Test has been scored. Review your performance breakdown below and proceed to choose your internship domain track.
          </p>
        </div>

        {/* Score Breakdown Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          padding: '2rem 2.5rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '1.75rem'
        }}>
          {/* Header row with Candidate ID and Score */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '1.25rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Candidate Identifier</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '0.2px' }}>
                {candidate.id || 'AVP-2026-CANDIDATE'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Aggregate Score</div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: isMerit ? 'var(--electric-blue)' : 'var(--primary-navy)' }}>
                {scoreData.totalScore} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ {scoreData.maxScore}</span>
                <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: isMerit ? '#16A34A' : 'var(--electric-blue)', fontWeight: 800 }}>
                  ({scoreData.percentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Sectional Breakdown Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.9rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Section A: Aptitude</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '0.25rem' }}>
                {scoreData.sectionA} / 20
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Section B: Reasoning</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '0.25rem' }}>
                {scoreData.sectionB} / 20
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Section C: English</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '0.25rem' }}>
                {scoreData.sectionC} / 10
              </div>
            </div>
          </div>

          {/* Qualified Fee Tier Banner */}
          {isMerit ? (
            <div style={{
              backgroundColor: 'var(--badge-blue-bg)',
              border: '1.5px solid var(--badge-blue-border)',
              borderRadius: '16px',
              padding: '1.35rem 1.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--electric-blue)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(30, 99, 214, 0.35)',
                  flexShrink: 0
                }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--primary-navy)', fontSize: '1.15rem' }}>
                    Unlocked: ₹699 Merit Scholarship Tier!
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-body)', marginTop: '0.15rem' }}>
                    Outstanding performance! You scored ≥ 80% and saved 88% off the regular ₹5,999 fee.
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--electric-blue)' }}>
                ₹699 <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ 3 months</span>
              </div>
            </div>
          ) : isPassing ? (
            <div style={{
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '16px',
              padding: '1.35rem 1.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '1.05rem' }}>
                  Standard Enrollment Tier (Score: {scoreData.percentage}%)
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  You meet all qualifications to enroll in any 3-month internship domain track.
                </div>
              </div>

              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                ₹5,999 <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ 3 months</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Step 2 Action Card (Domain Selection & Enrollment CTA) */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          padding: '1.75rem 2.25rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--electric-blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
              <Sparkles size={15} />
              <span>Next Step: Domain Track Selection</span>
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Choose your domain preference (AI & ML, Cybersecurity, Full Stack, Data Science, etc.) on the enrollment checkout page.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setCurrentView('student-dashboard')}
              className="btn btn-outline"
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <LayoutDashboard size={16} />
              <span>Student Dashboard</span>
            </button>

            <button
              type="button"
              onClick={handleProceedToEnrollment}
              className="btn btn-primary"
              style={{
                padding: '0.75rem 1.6rem',
                borderRadius: '10px',
                fontSize: '0.94rem',
                fontWeight: 800,
                boxShadow: '0 4px 16px rgba(30, 99, 214, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>Next: Select Domain & Enroll</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
