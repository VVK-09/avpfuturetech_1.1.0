import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';
import { 
  Clock, 
  FileText, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  Play, 
  User, 
  Award, 
  AlertTriangle, 
  ArrowLeft 
} from 'lucide-react';

export default function TestInstructionsView() {
  const { activeCandidate, currentUser, examSettings, startTest, setCurrentView } = useApp();
  const [agreed, setAgreed] = useState(false);

  const candidate = activeCandidate || currentUser || {
    name: 'Candidate',
    id: 'AVP-2026-TEMP',
    email: 'candidate@example.com'
  };

  const handleBeginTest = () => {
    if (!agreed) return;

    // Try requesting fullscreen if supported
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        console.log('Fullscreen request bypassed.');
      });
    }

    startTest();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      paddingTop: '2.5rem',
      paddingBottom: '4rem'
    }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Top Header Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <Logo size="sm" showTagline={true} />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            backgroundColor: 'var(--bg-subtle)',
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            border: '1px solid var(--border-light)'
          }}>
            <User size={18} color="var(--electric-blue)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary-navy)' }}>
                {candidate.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Candidate ID: <strong style={{ color: 'var(--electric-blue)' }}>{candidate.id}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
          padding: '2.5rem',
          position: 'relative'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            backgroundColor: 'var(--badge-blue-bg)',
            color: 'var(--badge-blue-text)',
            borderRadius: '9999px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            <FileText size={14} /> Evaluation Guidelines
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--primary-navy)',
            marginBottom: '0.5rem'
          }}>
            {examSettings.testTitle || 'AVP FutureTech Internship Aptitude Test 2026'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '2rem' }}>
            Please review the examination format, timing constraints, and anti-cheating policy carefully before starting.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '12px',
              padding: '1.1rem',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}>
              <Clock size={24} color="var(--electric-blue)" />
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Duration</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-navy)' }}>
                  {examSettings.totalTimeMinutes} Minutes
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '12px',
              padding: '1.1rem',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}>
              <FileText size={24} color="var(--electric-blue)" />
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Questions</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-navy)' }}>
                  50 MCQs
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '12px',
              padding: '1.1rem',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}>
              <Award size={24} color="var(--electric-blue)" />
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Marks</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-navy)' }}>
                  50 Marks
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--badge-blue-bg)',
              borderRadius: '12px',
              padding: '1.1rem',
              border: '1px solid var(--badge-blue-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}>
              <Award size={24} color="var(--electric-blue)" />
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--badge-blue-text)', fontWeight: 600 }}>Merit Cutoff</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--electric-blue)' }}>
                  80%+ → ₹699
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Section Breakdown Table */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '1rem', fontWeight: 700 }}>
              1. Test Structure & Section Distribution
            </h3>
            
            <div style={{
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
                  <tr>
                    <th style={{ padding: '0.85rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Section</th>
                    <th style={{ padding: '0.85rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Topic / Module</th>
                    <th style={{ padding: '0.85rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700, textAlign: 'center' }}>Questions</th>
                    <th style={{ padding: '0.85rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700, textAlign: 'center' }}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Section A</td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>Aptitude & Numerical Ability</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>20</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>20</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Section B</td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>Logical & Analytical Reasoning</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>20</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>20</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>Section C</td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>English & Professional Communication</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>10</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Anti-Cheating & Policy Rules */}
          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '14px',
            padding: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <h3 style={{
              fontSize: '1.05rem',
              color: '#92400E',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700
            }}>
              <AlertTriangle size={20} color="#D97706" /> Strict Anti-Cheating & Proctoring Rules
            </h3>
            <ul style={{
              paddingLeft: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.88rem',
              color: '#78350F',
              lineHeight: 1.55
            }}>
              <li><strong>Tab Switching & Minimizing:</strong> Switching browser tabs, minimizing the test window, or opening other applications is monitored.</li>
              <li><strong>5 Warnings Policy:</strong> Each violation triggers a warning alert. On the <strong>5th violation</strong>, your exam will be automatically submitted immediately.</li>
              <li><strong>Auto-Save:</strong> Selected answers are saved in real time. In case of unexpected connection loss, rejoin before timer expiration.</li>
              <li><strong>Negative Marking:</strong> There is <strong>no negative marking</strong>. Answering all 50 questions is encouraged.</li>
            </ul>
          </div>

          {/* Agreement Checkbox */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: '12px',
            border: '1.5px solid var(--border-light)',
            marginBottom: '2rem',
            cursor: 'pointer',
            userSelect: 'none'
          }} onClick={() => setAgreed(!agreed)}>
            <div style={{ marginTop: '2px', color: agreed ? 'var(--electric-blue)' : 'var(--text-muted)' }}>
              {agreed ? <CheckSquare size={20} /> : <Square size={20} />}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--primary-navy)', fontWeight: 600, lineHeight: 1.5 }}>
              I have read, understood, and agree to adhere to the examination rules, proctoring guidelines, and anti-cheating policy of AVP FutureTech LLP.
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => setCurrentView('landing')}
              className="btn btn-ghost"
              style={{ gap: '0.4rem' }}
            >
              <ArrowLeft size={16} /> Return to Home
            </button>

            <button
              onClick={handleBeginTest}
              disabled={!agreed}
              className="btn btn-primary btn-lg"
              style={{
                opacity: agreed ? 1 : 0.5,
                cursor: agreed ? 'pointer' : 'not-allowed',
                boxShadow: agreed ? '0 8px 24px var(--electric-blue-glow)' : 'none',
                padding: '0.95rem 2.5rem'
              }}
            >
              <Play size={18} /> Begin Test Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
