import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Lock, 
  Mail, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  KeyRound, 
  Loader2, 
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { sendEmailOtp } from '../../services/emailOtpService';

export default function StudentLoginModal() {
  const { modal, closeModal, loginStudent, loginStudentWithOtp, openModal, showToast } = useApp();
  
  // Login Mode: 'password' | 'otp'
  const [loginMode, setLoginMode] = useState('password');

  // Password Mode Form State
  const [identifier, setIdentifier] = useState(() => (modal.data?.identifier || ''));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // OTP Mode Form State
  const [otpEmail, setOtpEmail] = useState(() => (modal.data?.identifier || ''));
  const [otpStep, setOtpStep] = useState('input-email'); // 'input-email' | 'verify-otp'
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(0);
  const [lastDispatchedOtp, setLastDispatchedOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Sync initial identifier if provided in modal data
  useEffect(() => {
    if (modal.type === 'student-login') {
      const initId = modal.data?.identifier || '';
      setIdentifier(initId);
      if (initId.includes('@')) {
        setOtpEmail(initId);
      }
      setLoginMode('password');
      setOtpStep('input-email');
      setOtpDigits(['', '', '', '', '', '']);
      setOtpError('');
      setResendTimer(0);
      setLastDispatchedOtp('');
    }
  }, [modal]);

  // Resend Timer countdown
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Auto-focus first input when entering verify-otp step
  useEffect(() => {
    if (otpStep === 'verify-otp') {
      setTimeout(() => {
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus();
        }
      }, 150);
    }
  }, [otpStep]);

  if (modal.type !== 'student-login') return null;

  // PASSWORD LOGIN HANDLER
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) return;
    setIsSubmittingPassword(true);
    setTimeout(() => {
      loginStudent(identifier, password);
      setIsSubmittingPassword(false);
    }, 350);
  };

  // OTP: Send 6-Digit Email Code
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    const cleanEmail = otpEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsSendingOtp(true);
    setOtpError('');
    try {
      const result = await sendEmailOtp(cleanEmail, 'student-login');
      if (result.success) {
        setLastDispatchedOtp(result.otp || '');
        setResendTimer(30);
        setOtpStep('verify-otp');
        setOtpDigits(['', '', '', '', '', '']);
        showToast(result.message, 'success');
      } else {
        showToast(result.message || 'Failed to send OTP code.', 'error');
      }
    } catch {
      showToast('Error sending verification code. Please check your network.', 'error');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // OTP: Resend Action
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    const cleanEmail = otpEmail.trim().toLowerCase();
    setIsSendingOtp(true);
    setOtpError('');
    try {
      const result = await sendEmailOtp(cleanEmail, 'student-login');
      if (result.success) {
        setLastDispatchedOtp(result.otp || '');
        setResendTimer(30);
        setOtpDigits(['', '', '', '', '', '']);
        showToast(`New 6-digit code sent to ${cleanEmail}`, 'success');
        if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
      } else {
        showToast(result.message || 'Please wait before requesting a new code.', 'warning');
      }
    } catch {
      showToast('Failed to resend code. Please try again.', 'error');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // OTP: Digit Keying & Navigation
  const handleDigitChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    const digit = cleaned.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setOtpError('');

    if (index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digitsOnly = pastedData.replace(/\D/g, '').slice(0, 6);
    if (!digitsOnly) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = digitsOnly[i] || '';
    }
    setOtpDigits(newDigits);
    setOtpError('');

    const focusIndex = Math.min(digitsOnly.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  // OTP: Verify & Sign In
  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    const fullCode = otpDigits.join('');
    if (fullCode.length < 6) {
      setOtpError('Please enter all 6 digits.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError('');

    setTimeout(() => {
      const cleanEmail = otpEmail.trim().toLowerCase();
      const res = loginStudentWithOtp(cleanEmail, fullCode);
      if (!res.success) {
        setOtpError(res.error || 'Verification failed');
      }
      setIsVerifyingOtp(false);
    }, 400);
  };

  const handleQuickFillCode = () => {
    if (lastDispatchedOtp && lastDispatchedOtp.length === 6) {
      setOtpDigits(lastDispatchedOtp.split(''));
      setOtpError('');
      if (otpInputRefs.current[5]) otpInputRefs.current[5].focus();
    }
  };

  const handleFillDemoStudent = (email, pwd) => {
    setIdentifier(email);
    setPassword(pwd);
    setOtpEmail(email);
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} style={{ zIndex: 1050 }}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '480px',
          width: '92%',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(11, 30, 61, 0.35)',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #07152B 0%, #0B1E3D 55%, #173B7A 100%)',
          color: '#FFFFFF',
          padding: '1.15rem 1.45rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          {/* Top glow line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #1E63D6 0%, #38BDF8 50%, #4F46E5 100%)'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1E63D6 0%, #38BDF8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(30, 99, 214, 0.35)',
              flexShrink: 0
            }}>
              <User size={18} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px' }}>
                Student & Intern Login
              </div>
              <div style={{ fontSize: '0.74rem', color: '#93C5FD', marginTop: '0.1rem' }}>
                Access results, certificates & internship workspace
              </div>
            </div>
          </div>

          <button 
            className="modal-close" 
            onClick={closeModal} 
            style={{ 
              color: '#94A3B8', 
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }} 
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher: Password vs 6-Digit Email OTP */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: '#F1F5F9',
          padding: '4px',
          margin: '1.15rem 1.45rem 0 1.45rem',
          borderRadius: '10px'
        }}>
          <button
            type="button"
            onClick={() => setLoginMode('password')}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: loginMode === 'password' ? '#FFFFFF' : 'transparent',
              color: loginMode === 'password' ? 'var(--primary-navy)' : 'var(--text-muted)',
              fontWeight: loginMode === 'password' ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              boxShadow: loginMode === 'password' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Lock size={14} color={loginMode === 'password' ? 'var(--electric-blue)' : '#94A3B8'} />
            Password
          </button>

          <button
            type="button"
            onClick={() => setLoginMode('otp')}
            style={{
              padding: '0.55rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: loginMode === 'otp' ? '#FFFFFF' : 'transparent',
              color: loginMode === 'otp' ? 'var(--primary-navy)' : 'var(--text-muted)',
              fontWeight: loginMode === 'otp' ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              boxShadow: loginMode === 'otp' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Mail size={14} color={loginMode === 'otp' ? 'var(--electric-blue)' : '#94A3B8'} />
            Login With OTP
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ 
          padding: '1.25rem 1.45rem',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          flex: 1
        }}>
          {/* TAB 1: 6-DIGIT EMAIL OTP LOGIN */}
          {loginMode === 'otp' && (
            <div>
              {otpStep === 'input-email' ? (
                <form onSubmit={handleSendOtp}>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                      Registered Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="email"
                        required
                        placeholder="e.g. aarav.sharma@example.com"
                        className="form-input"
                        style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }}
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="btn btn-primary btn-block"
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.92rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {isSendingOtp ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending 6-Digit Code...</span>
                      </>
                    ) : (
                      <>
                        <Mail size={16} />
                        <span>Send 6-Digit Login Code</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Enter 6-digit code sent to <strong style={{ color: 'var(--primary-navy)' }}>{otpEmail}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpStep('input-email')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--electric-blue)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: '0.2rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.2rem'
                      }}
                    >
                      <ArrowLeft size={11} /> Change Email
                    </button>
                  </div>

                  {/* Demo OTP Helper */}
                  {lastDispatchedOtp && (
                    <div style={{
                      backgroundColor: 'rgba(30, 99, 214, 0.05)',
                      border: '1px dashed rgba(56, 189, 248, 0.5)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '0.76rem', color: 'var(--primary-navy)' }}>
                        Demo Code: <strong style={{ color: 'var(--electric-blue)', fontFamily: 'monospace' }}>{lastDispatchedOtp}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={handleQuickFillCode}
                        style={{
                          background: 'var(--electric-blue)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Auto-Fill
                      </button>
                    </div>
                  )}

                  {/* 6 Digit Inputs */}
                  <div 
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      marginBottom: '0.85rem'
                    }}
                    onPaste={handlePaste}
                  >
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        style={{
                          width: '42px',
                          height: '48px',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          textAlign: 'center',
                          borderRadius: '8px',
                          border: digit ? '2px solid var(--electric-blue)' : '2px solid #E2E8F0',
                          backgroundColor: digit ? 'rgba(30, 99, 214, 0.04)' : '#FFFFFF',
                          color: 'var(--primary-navy)',
                          outline: 'none',
                          boxShadow: digit ? '0 0 0 3px rgba(56, 189, 248, 0.15)' : 'none',
                          fontFamily: 'Outfit, sans-serif'
                        }}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <div style={{ color: '#DC2626', fontSize: '0.76rem', fontWeight: 600, textAlign: 'center', marginBottom: '0.75rem' }}>
                      {otpError}
                    </div>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {resendTimer > 0 ? (
                      <span>Resend code in <strong style={{ color: 'var(--primary-navy)' }}>{resendTimer}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isSendingOtp}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--electric-blue)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: 0
                        }}
                      >
                        <RotateCcw size={11} /> Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifyingOtp || otpDigits.join('').length < 6}
                    className="btn btn-primary btn-block"
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.92rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {isVerifyingOtp ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Sign In to Dashboard</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: PASSWORD LOGIN */}
          {loginMode === 'password' && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  Email ID, Phone or Candidate ID
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. aarav.sharma@example.com"
                    className="form-input"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  Account Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    className="form-input"
                    style={{ paddingRight: '2.4rem', fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: '3px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
                marginBottom: '1rem' 
              }}>
                <button
                  type="button"
                  onClick={() => {
                    if (identifier && identifier.includes('@')) {
                      setOtpEmail(identifier);
                    }
                    setLoginMode('otp');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--electric-blue)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Forgot your password? Log in with OTP →
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmittingPassword}
                className="btn btn-primary btn-block"
                style={{
                  padding: '0.75rem',
                  fontSize: '0.92rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {isSubmittingPassword ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom Register Switcher */}
          <div style={{
            textAlign: 'center',
            marginTop: '1.15rem',
            paddingTop: '0.95rem',
            borderTop: '1px solid var(--border-light)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            New candidate?{' '}
            <button
              type="button"
              onClick={() => {
                closeModal();
                openModal('register');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--electric-blue)',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0
              }}
            >
              Register for Aptitude Test →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
