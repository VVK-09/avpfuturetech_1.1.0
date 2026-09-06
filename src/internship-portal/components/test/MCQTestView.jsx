import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';
import {
  Clock,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Send,
  HelpCircle,
  Award,
  AlertCircle,
  Grid,
  X,
  Check,
  Zap,
  Sparkles,
  LayoutGrid
} from 'lucide-react';

export default function MCQTestView() {
  const {
    questions,
    activeCandidate,
    currentUser,
    testState,
    saveAnswer,
    toggleMarkForReview,
    recordViolation,
    submitTest,
    examSettings
  } = useApp();

  const candidate = activeCandidate || currentUser || { name: 'Candidate', id: 'AVP-2026-TEMP' };

  // Test Timer
  const [secondsLeft, setSecondsLeft] = useState(testState.timeRemaining || 60 * 60);
  const [activeSection, setActiveSection] = useState('A');
  const [activeQuestionId, setActiveQuestionId] = useState('Q-A01');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);
  const violationCooldownRef = useRef(false);

  // Filter questions for active section
  const sectionQuestions = questions.filter(q => q.section === activeSection);
  const currentQuestion = questions.find(q => q.id === activeQuestionId) || questions[0];
  const currentQuestionGlobalIndex = questions.findIndex(q => q.id === currentQuestion?.id);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitTest(true); // Auto-submit on time expiry
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time (MM:SS)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Anti-Cheating: Tab switch and window blur detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerCheatWarning();
      }
    };

    const handleWindowBlur = () => {
      triggerCheatWarning();
    };

    const triggerCheatWarning = () => {
      if (!violationCooldownRef.current) {
        violationCooldownRef.current = true;
        recordViolation();
        setTimeout(() => {
          violationCooldownRef.current = false;
        }, 1500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    // Prevent accidental page leave
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Helper navigation
  const goToQuestion = (qId) => {
    const targetQ = questions.find(q => q.id === qId);
    if (targetQ) {
      setActiveSection(targetQ.section);
      setActiveQuestionId(qId);
      setMobilePaletteOpen(false); // Auto close palette on mobile after picking
    }
  };

  const handleNext = () => {
    if (currentQuestionGlobalIndex < questions.length - 1) {
      const nextQ = questions[currentQuestionGlobalIndex + 1];
      goToQuestion(nextQ.id);
    }
  };

  const handlePrev = () => {
    if (currentQuestionGlobalIndex > 0) {
      const prevQ = questions[currentQuestionGlobalIndex - 1];
      goToQuestion(prevQ.id);
    }
  };

  const handleClearAnswer = () => {
    if (currentQuestion) {
      saveAnswer(currentQuestion.id, null);
    }
  };

  // Stats calculation
  const totalAnswered = Object.keys(testState.answers).filter(k => !!testState.answers[k]).length;
  const totalMarked = testState.markedForReview.length;
  const totalUnanswered = questions.length - totalAnswered;

  const isCurrentMarked = currentQuestion && testState.markedForReview.includes(currentQuestion.id);
  const currentAnswer = currentQuestion ? testState.answers[currentQuestion.id] : null;

  const isLowTime = secondsLeft < 300; // less than 5 mins

  // Section Definitions
  const sections = [
    { id: 'A', label: 'Section A: Aptitude', shortLabel: 'Sec A: Aptitude', count: 20, range: '1 - 20', startId: 'Q-A01' },
    { id: 'B', label: 'Section B: Logical Reasoning', shortLabel: 'Sec B: Reasoning', count: 20, range: '21 - 40', startId: 'Q-B01' },
    { id: 'C', label: 'Section C: English', shortLabel: 'Sec C: English', count: 10, range: '41 - 50', startId: 'Q-C01' }
  ];

  return (
    <div
      className="test-view-wrapper"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      {/* Top Test Navigation Bar */}
      <header className="test-header">
        {/* Left: Brand & Candidate Info */}
        <div className="test-candidate-info">
          <div className="test-logo-wrap">
            <Logo size="sm" showTagline={false} />
          </div>
          <div className="test-header-divider" />
          <div className="test-user-meta">
            <div className="test-user-name">
              {candidate.name}
            </div>
            <div className="test-user-id">
              ID: <strong>{candidate.id}</strong>
            </div>
          </div>
        </div>

        {/* Center: Live Timer Display */}
        <div className={`test-timer-pill ${isLowTime ? 'low-time' : ''}`}>
          <Clock size={17} />
          <span>{formatTime(secondsLeft)}</span>
        </div>

        {/* Right: Anti-cheat Violations & Finish Button */}
        <div className="test-header-actions">
          <div className={`test-violation-badge ${testState.violationsCount > 0 ? 'has-violation' : ''}`}>
            <ShieldAlert size={15} />
            <span>Violations: <strong>{testState.violationsCount}/5</strong></span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="btn btn-primary test-submit-btn"
          >
            <Send size={14} />
            <span>Submit</span>
          </button>
        </div>
      </header>

      {/* Section Switcher Tabs */}
      <div className="test-section-bar">
        <div className="test-section-tabs custom-scrollbar">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            const secQs = questions.filter(q => q.section === sec.id);
            const secAnswered = secQs.filter(q => !!testState.answers[q.id]).length;

            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  const firstQOfSec = secQs[0];
                  if (firstQOfSec) setActiveQuestionId(firstQOfSec.id);
                }}
                className={`section-tab-btn ${isActive ? 'active' : ''}`}
              >
                <span className="sec-title-full">{sec.label} ({sec.count} Qs)</span>
                <span className="sec-title-mobile">{sec.shortLabel}</span>
                <span className="sec-progress-chip">
                  {secAnswered}/{sec.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Palette Quick Trigger (Visible on Mobile) */}
        <button
          onClick={() => setMobilePaletteOpen(true)}
          className="mobile-palette-toggle-btn"
          aria-label="Open Question Palette"
        >
          <LayoutGrid size={16} />
          <span>Palette ({totalAnswered}/50)</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="test-main-workspace">

        {/* Question Presentation Area */}
        <main className="question-content-area custom-scrollbar">
          {currentQuestion && (
            <div className="question-card-container">

              {/* Question Header & Metadata */}
              <div className="question-card-header">
                <div>
                  <div className="question-section-tag">
                    {currentQuestion.sectionName || `Section ${currentQuestion.section}`}
                  </div>
                  <h1 className="question-number-title">
                    Question {currentQuestionGlobalIndex + 1} <span>of {questions.length}</span>
                  </h1>
                </div>

                <div className="question-marks-cluster">
                  <span className="badge badge-blue">
                    +{currentQuestion.marks || 1} Mark
                  </span>
                  <span className="badge badge-neutral">
                    No Negative
                  </span>
                </div>
              </div>

              {/* Question Text Box */}
              <div className="question-text-box">
                <p className="question-text-content">
                  {currentQuestion.questionText}
                </p>
              </div>

              {/* 4 MCQ Radio Options */}
              <div className="mcq-options-container">
                {['A', 'B', 'C', 'D'].map((optKey) => {
                  const optText = currentQuestion[`option${optKey}`];
                  if (!optText) return null;
                  const isSelected = currentAnswer === optKey;

                  return (
                    <div
                      key={optKey}
                      onClick={() => saveAnswer(currentQuestion.id, optKey)}
                      className={`mcq-option-card ${isSelected ? 'selected' : ''}`}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          saveAnswer(currentQuestion.id, optKey);
                        }
                      }}
                    >
                      <div className={`option-letter-badge ${isSelected ? 'selected' : ''}`}>
                        {isSelected ? <Check size={16} strokeWidth={3} /> : optKey}
                      </div>

                      <div className="option-text-label">
                        {optText}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Bar (Prev, Next, Mark, Clear) */}
              <div className="question-bottom-actions">
                <div className="actions-left-group">
                  <button
                    onClick={() => toggleMarkForReview(currentQuestion.id)}
                    className={`btn btn-sm action-mark-btn ${isCurrentMarked ? 'marked' : ''}`}
                  >
                    <Bookmark size={15} color={isCurrentMarked ? '#B45309' : 'currentColor'} />
                    <span>{isCurrentMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>

                  {currentAnswer && (
                    <button
                      onClick={handleClearAnswer}
                      className="btn btn-ghost btn-sm action-clear-btn"
                    >
                      <RotateCcw size={14} />
                      <span>Clear Selection</span>
                    </button>
                  )}
                </div>

                <div className="actions-right-group">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionGlobalIndex === 0}
                    className="btn btn-outline btn-sm action-nav-btn"
                    style={{ opacity: currentQuestionGlobalIndex === 0 ? 0.4 : 1 }}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentQuestionGlobalIndex === questions.length - 1}
                    className="btn btn-primary btn-sm action-nav-btn"
                    style={{ opacity: currentQuestionGlobalIndex === questions.length - 1 ? 0.4 : 1 }}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          )}
        </main>

        {/* Desktop Side Question Palette Panel (>= 900px) */}
        <aside className="desktop-palette-sidebar custom-scrollbar">
          <div className="palette-sidebar-title">
            <LayoutGrid size={18} color="var(--electric-blue)" />
            <span>Question Palette</span>
          </div>

          {/* Legend */}
          <div className="palette-legend-grid">
            <div className="legend-item">
              <div className="legend-swatch answered" />
              <span>Answered ({totalAnswered})</span>
            </div>
            <div className="legend-item">
              <div className="legend-swatch unanswered" />
              <span>Unanswered ({totalUnanswered})</span>
            </div>
            <div className="legend-item">
              <div className="legend-swatch marked" />
              <span>Marked ({totalMarked})</span>
            </div>
            <div className="legend-item">
              <div className="legend-swatch current" />
              <span>Current</span>
            </div>
          </div>

          {/* Section Grids */}
          {sections.map((sec) => (
            <div key={sec.id} className="palette-section-block">
              <div className="palette-section-heading">
                {sec.label} ({sec.range})
              </div>
              <div className="palette-number-grid">
                {questions.filter(q => q.section === sec.id).map((q, idx) => {
                  const isAnswered = !!testState.answers[q.id];
                  const isMarked = testState.markedForReview.includes(q.id);
                  const isCurrent = q.id === currentQuestion?.id;

                  let statusClass = 'unanswered';
                  if (isCurrent) statusClass = 'current';
                  else if (isMarked) statusClass = 'marked';
                  else if (isAnswered) statusClass = 'answered';

                  const globalNum = sec.id === 'A' ? idx + 1 : sec.id === 'B' ? idx + 21 : idx + 41;

                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(q.id)}
                      className={`palette-num-btn ${statusClass}`}
                    >
                      {globalNum}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Submit Exam Button in Palette */}
          <div className="palette-submit-box">
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="btn btn-navy btn-block"
              style={{ padding: '0.85rem', borderRadius: '10px', fontWeight: 700, gap: '0.5rem' }}
            >
              <Send size={16} /> Submit & Finalize Exam
            </button>
          </div>
        </aside>

      </div>

      {/* Mobile Slide-Up Question Palette Drawer / Bottom Sheet */}
      {mobilePaletteOpen && (
        <div className="mobile-palette-overlay" onClick={() => setMobilePaletteOpen(false)}>
          <div
            className="mobile-palette-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle & Header */}
            <div className="mobile-sheet-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutGrid size={18} color="var(--electric-blue)" />
                <span style={{ fontWeight: 800, color: 'var(--primary-navy)', fontSize: '1.05rem' }}>
                  Question Palette (50 Qs)
                </span>
              </div>
              <button
                onClick={() => setMobilePaletteOpen(false)}
                className="sheet-close-btn"
                aria-label="Close palette"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress Bar & Summary */}
            <div className="mobile-sheet-summary">
              <div className="sheet-stat-pill blue">
                Answered: <strong>{totalAnswered}</strong>
              </div>
              <div className="sheet-stat-pill amber">
                Marked: <strong>{totalMarked}</strong>
              </div>
              <div className="sheet-stat-pill gray">
                Unanswered: <strong>{totalUnanswered}</strong>
              </div>
            </div>

            {/* Scrollable Questions Grid */}
            <div className="mobile-sheet-body custom-scrollbar">
              {sections.map((sec) => (
                <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.6rem' }}>
                    {sec.label} ({sec.range})
                  </div>
                  <div className="mobile-grid-numbers">
                    {questions.filter(q => q.section === sec.id).map((q, idx) => {
                      const isAnswered = !!testState.answers[q.id];
                      const isMarked = testState.markedForReview.includes(q.id);
                      const isCurrent = q.id === currentQuestion?.id;

                      let statusClass = 'unanswered';
                      if (isCurrent) statusClass = 'current';
                      else if (isMarked) statusClass = 'marked';
                      else if (isAnswered) statusClass = 'answered';

                      const globalNum = sec.id === 'A' ? idx + 1 : sec.id === 'B' ? idx + 21 : idx + 41;

                      return (
                        <button
                          key={q.id}
                          onClick={() => goToQuestion(q.id)}
                          className={`mobile-num-btn ${statusClass}`}
                        >
                          {globalNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sheet Footer Button */}
            <div className="mobile-sheet-footer">
              <button
                onClick={() => {
                  setMobilePaletteOpen(false);
                  setShowSubmitConfirm(true);
                }}
                className="btn btn-primary btn-block"
                style={{ borderRadius: '10px', fontWeight: 800, padding: '0.8rem' }}
              >
                <Send size={16} /> Submit Test Now
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      {showSubmitConfirm && (
        <div className="modal-backdrop" onClick={() => setShowSubmitConfirm(false)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: 'var(--primary-navy)', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={20} color="#38BDF8" />
                <h3 className="modal-title" style={{ color: '#FFFFFF' }}>Ready to Submit Your Exam?</h3>
              </div>
              <button className="modal-close" onClick={() => setShowSubmitConfirm(false)} style={{ color: '#94A3B8' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem 1.75rem' }}>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Please review your progress summary before confirming your final submission:
              </p>

              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '12px',
                padding: '1.1rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.9rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Questions:</span>
                  <strong style={{ color: 'var(--primary-navy)' }}>50</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--electric-blue)' }}>
                  <span>Answered:</span>
                  <strong>{totalAnswered} / 50</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B' }}>
                  <span>Unanswered:</span>
                  <strong>{totalUnanswered}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#D97706' }}>
                  <span>Marked for Review:</span>
                  <strong>{totalMarked}</strong>
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '0.2rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primary-navy)' }}>
                  <span>Time Remaining:</span>
                  <strong style={{ color: isLowTime ? '#DC2626' : 'var(--electric-blue)' }}>{formatTime(secondsLeft)}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="btn btn-outline"
                  style={{ borderRadius: '10px', flex: 1 }}
                >
                  Resume Test
                </button>
                <button
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    submitTest(false);
                  }}
                  className="btn btn-primary"
                  style={{ borderRadius: '10px', flex: 1, boxShadow: '0 4px 14px rgba(30, 99, 214, 0.35)' }}
                >
                  Confirm Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded High-Performance Responsive CSS */}
      <style>{`
        .test-view-wrapper {
          min-height: 100vh;
          background-color: var(--bg-page);
          display: flex;
          flex-direction: column;
          user-select: none;
          overflow-x: hidden;
        }

        /* Header */
        .test-header {
          background-color: #FFFFFF;
          border-bottom: 1.5px solid var(--border-light);
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(11, 30, 61, 0.04);
          gap: 1rem;
        }

        .test-candidate-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .test-header-divider {
          height: 24px;
          width: 1px;
          background-color: var(--border-light);
        }

        .test-user-name {
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--primary-navy);
          line-height: 1.2;
        }

        .test-user-id {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .test-user-id strong {
          color: var(--electric-blue);
        }

        .test-timer-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--badge-blue-bg);
          color: var(--electric-blue);
          border: 1.5px solid var(--badge-blue-border);
          padding: 0.42rem 1.1rem;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 1.08rem;
          letter-spacing: 0.8px;
          box-shadow: 0 2px 6px rgba(30, 99, 214, 0.1);
        }

        .test-timer-pill.low-time {
          background-color: #FEE2E2;
          color: #DC2626;
          border-color: #FCA5A5;
          animation: pulseRed 1.5s infinite;
        }

        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }

        .test-header-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .test-violation-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.38rem 0.75rem;
          background-color: var(--bg-subtle);
          color: var(--text-muted);
          border-radius: 8px;
          border: 1px solid var(--border-light);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .test-violation-badge.has-violation {
          background-color: #FEF2F2;
          color: #DC2626;
          border-color: #FECACA;
        }

        .test-submit-btn {
          padding: 0.5rem 1.1rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.86rem;
          gap: 0.4rem;
        }

        /* Section Bar */
        .test-section-bar {
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--border-light);
          padding: 0.5rem 1.5rem;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          gap: 1rem;
        }

        .test-section-tabs {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          overflow-x: auto;
        }

        .section-tab-btn {
          padding: 0.55rem 1.1rem;
          border-radius: 10px;
          border: 1.5px solid transparent;
          font-weight: 700;
          font-size: 0.86rem;
          cursor: pointer;
          background-color: var(--bg-subtle);
          color: var(--text-body);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .section-tab-btn:hover {
          background-color: #E2E8F0;
        }

        .section-tab-btn.active {
          background-color: var(--primary-navy);
          color: #FFFFFF;
          border-color: var(--primary-navy);
          box-shadow: 0 3px 10px rgba(11, 30, 61, 0.15);
        }

        .sec-title-mobile {
          display: none;
        }

        .sec-progress-chip {
          font-size: 0.72rem;
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.2);
          color: inherit;
          font-weight: 800;
        }

        .section-tab-btn:not(.active) .sec-progress-chip {
          background-color: #E2E8F0;
          color: var(--text-muted);
        }

        .mobile-palette-toggle-btn {
          display: none;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          border: 1.5px solid var(--badge-blue-border);
          background-color: var(--badge-blue-bg);
          color: var(--electric-blue);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Workspace Grid */
        .test-main-workspace {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          height: calc(100vh - 122px);
          overflow: hidden;
        }

        /* Question Content Area */
        .question-content-area {
          padding: 2rem 2.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .question-card-container {
          max-width: 860px;
          width: 100%;
          margin: 0 auto;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .question-card-header {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-light);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .question-section-tag {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--electric-blue);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .question-number-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-top: 0.15rem;
        }

        .question-number-title span {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .question-marks-cluster {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .badge-neutral {
          background-color: var(--bg-subtle);
          color: var(--text-muted);
          border: 1px solid var(--border-light);
        }

        /* Question Box */
        .question-text-box {
          background-color: #FFFFFF;
          border-radius: 16px;
          padding: 1.75rem 2rem;
          border: 1.5px solid var(--border-light);
          box-shadow: 0 4px 16px -2px rgba(11, 30, 61, 0.04);
          margin-bottom: 1.5rem;
        }

        .question-text-content {
          font-size: 1.15rem;
          color: var(--primary-navy);
          font-weight: 600;
          line-height: 1.7;
          white-space: pre-line;
        }

        /* MCQ Options */
        .mcq-options-container {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
        }

        .mcq-option-card {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          padding: 1.1rem 1.35rem;
          background-color: #FFFFFF;
          border: 1.5px solid var(--border-light);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(11, 30, 61, 0.02);
        }

        .mcq-option-card:hover {
          border-color: var(--electric-blue);
          background-color: #F8FAFC;
          transform: translateY(-1px);
        }

        .mcq-option-card.selected {
          background-color: var(--badge-blue-bg);
          border-color: var(--electric-blue);
          box-shadow: 0 4px 14px rgba(30, 99, 214, 0.18);
        }

        .option-letter-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--bg-subtle);
          color: var(--primary-navy);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.95rem;
          flex-shrink: 0;
          border: 1px solid var(--border-light);
          transition: all 0.18s ease;
        }

        .option-letter-badge.selected {
          background-color: var(--electric-blue);
          color: #FFFFFF;
          border-color: var(--electric-blue);
          box-shadow: 0 2px 6px rgba(30, 99, 214, 0.3);
        }

        .option-text-label {
          font-size: 1.02rem;
          color: var(--text-body);
          font-weight: 500;
          line-height: 1.5;
        }

        .mcq-option-card.selected .option-text-label {
          color: var(--primary-navy);
          font-weight: 700;
        }

        /* Bottom Action Bar */
        .question-bottom-actions {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .actions-left-group, .actions-right-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .action-mark-btn {
          border-color: var(--border-light);
          background-color: transparent;
          color: var(--text-body);
          border-radius: 10px;
          padding: 0.6rem 1rem;
          font-weight: 700;
        }

        .action-mark-btn.marked {
          border-color: #F59E0B;
          background-color: #FFFBEB;
          color: #B45309;
        }

        .action-clear-btn {
          color: var(--danger);
          border-radius: 10px;
        }

        .action-nav-btn {
          padding: 0.6rem 1.25rem;
          border-radius: 10px;
          font-weight: 700;
        }

        /* Desktop Palette Sidebar */
        .desktop-palette-sidebar {
          background-color: #FFFFFF;
          border-left: 1.5px solid var(--border-light);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .palette-sidebar-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          color: var(--primary-navy);
          font-weight: 800;
          margin-bottom: 1.1rem;
        }

        .palette-legend-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
          padding: 0.85rem 1rem;
          background-color: var(--bg-subtle);
          border-radius: 12px;
          margin-bottom: 1.25rem;
          font-size: 0.76rem;
          border: 1px solid var(--border-light);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .legend-swatch {
          width: 13px;
          height: 13px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .legend-swatch.answered { background-color: var(--electric-blue); }
        .legend-swatch.unanswered { background-color: #FFFFFF; border: 1.5px solid #CBD5E1; }
        .legend-swatch.marked { background-color: #F59E0B; }
        .legend-swatch.current { background-color: var(--primary-navy); }

        .palette-section-block {
          margin-bottom: 1.25rem;
        }

        .palette-section-heading {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .palette-number-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.45rem;
        }

        .palette-num-btn {
          height: 36px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .palette-num-btn.unanswered {
          background-color: #FFFFFF;
          color: var(--primary-navy);
          border: 1px solid var(--border-light);
        }
        .palette-num-btn.unanswered:hover {
          background-color: var(--bg-subtle);
          border-color: var(--electric-blue);
        }

        .palette-num-btn.answered {
          background-color: var(--electric-blue);
          color: #FFFFFF;
          border: 1px solid var(--electric-blue);
          box-shadow: 0 2px 6px rgba(30, 99, 214, 0.2);
        }

        .palette-num-btn.marked {
          background-color: #F59E0B;
          color: #FFFFFF;
          border: 1px solid #D97706;
          box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2);
        }

        .palette-num-btn.current {
          background-color: var(--primary-navy);
          color: #FFFFFF;
          border: 2px solid var(--primary-navy);
          box-shadow: 0 2px 8px rgba(11, 30, 61, 0.25);
          transform: scale(1.04);
        }

        .palette-submit-box {
          margin-top: auto;
          padding-top: 1rem;
        }

        /* Mobile Palette Sheet Overlay */
        .mobile-palette-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(7, 21, 43, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          animation: fadeIn 0.2s ease-out;
        }

        .mobile-palette-sheet {
          width: 100%;
          max-height: 85vh;
          background-color: #FFFFFF;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          animation: slideUpSheet 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid var(--border-light);
        }

        .sheet-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background-color: var(--bg-subtle);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .mobile-sheet-summary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background-color: var(--bg-page);
          border-bottom: 1px solid var(--border-light);
        }

        .sheet-stat-pill {
          flex: 1;
          padding: 0.35rem 0.5rem;
          border-radius: 8px;
          font-size: 0.74rem;
          text-align: center;
          font-weight: 600;
        }

        .sheet-stat-pill.blue {
          background-color: var(--badge-blue-bg);
          color: var(--electric-blue);
        }
        .sheet-stat-pill.amber {
          background-color: #FEF3C7;
          color: #B45309;
        }
        .sheet-stat-pill.gray {
          background-color: var(--bg-subtle);
          color: var(--text-muted);
          border: 1px solid var(--border-light);
        }

        .mobile-sheet-body {
          padding: 1.25rem;
          overflow-y: auto;
          flex: 1;
        }

        .mobile-grid-numbers {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.5rem;
        }

        .mobile-num-btn {
          height: 42px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .mobile-num-btn.unanswered {
          background-color: #FFFFFF;
          color: var(--primary-navy);
          border: 1.5px solid var(--border-light);
        }
        .mobile-num-btn.answered {
          background-color: var(--electric-blue);
          color: #FFFFFF;
          border: 1.5px solid var(--electric-blue);
        }
        .mobile-num-btn.marked {
          background-color: #F59E0B;
          color: #FFFFFF;
          border: 1.5px solid #D97706;
        }
        .mobile-num-btn.current {
          background-color: var(--primary-navy);
          color: #FFFFFF;
          border: 2px solid var(--electric-blue);
          box-shadow: 0 0 0 2px var(--badge-blue-bg);
        }

        .mobile-sheet-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid var(--border-light);
          background-color: #FFFFFF;
        }

        /* Keyframes */
        @keyframes slideUpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        /* Mobile Breakpoint Rules */
        @media (max-width: 899px) {
          .test-header {
            padding: 0.65rem 1rem;
            gap: 0.5rem;
          }

          .test-logo-wrap {
            display: none;
          }

          .test-header-divider {
            display: none;
          }

          .test-user-name {
            font-size: 0.84rem;
            max-width: 110px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .test-user-id {
            font-size: 0.7rem;
          }

          .test-timer-pill {
            padding: 0.35rem 0.75rem;
            font-size: 0.95rem;
            gap: 0.35rem;
          }

          .test-violation-badge {
            display: none;
          }

          .test-submit-btn {
            padding: 0.45rem 0.85rem;
            font-size: 0.8rem;
          }

          .test-section-bar {
            padding: 0.45rem 1rem;
            gap: 0.5rem;
          }

          .sec-title-full {
            display: none;
          }

          .sec-title-mobile {
            display: inline;
          }

          .section-tab-btn {
            padding: 0.45rem 0.75rem;
            font-size: 0.78rem;
            gap: 0.35rem;
          }

          .mobile-palette-toggle-btn {
            display: inline-flex;
          }

          .test-main-workspace {
            grid-template-columns: 1fr !important;
            height: calc(100vh - 110px);
          }

          .desktop-palette-sidebar {
            display: none !important;
          }

          .question-content-area {
            padding: 1.25rem 1rem;
          }

          .question-text-box {
            padding: 1.25rem 1.15rem;
            border-radius: 14px;
            margin-bottom: 1.15rem;
          }

          .question-text-content {
            font-size: 1.02rem;
            line-height: 1.6;
          }

          .mcq-option-card {
            padding: 0.95rem 1rem;
            gap: 0.75rem;
            border-radius: 12px;
          }

          .option-letter-badge {
            width: 32px;
            height: 32px;
            font-size: 0.85rem;
          }

          .option-text-label {
            font-size: 0.92rem;
          }

          .question-bottom-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
            padding-top: 1rem;
          }

          .actions-left-group, .actions-right-group {
            width: 100%;
          }

          .actions-left-group {
            order: 2;
          }

          .actions-right-group {
            order: 1;
          }

          .action-nav-btn {
            flex: 1;
            padding: 0.75rem;
          }

          .action-mark-btn {
            flex: 1;
            padding: 0.65rem;
          }

          .action-clear-btn {
            padding: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
}
