import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  X, 
  ArrowRight, 
  ArrowLeft,
  KeyRound, 
  Loader2, 
  RotateCcw, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { sendEmailOtp } from '../../services/emailOtpService';

export default function AdminLoginModal() {
  const { 
    modal, 
    closeModal, 
    validateAdminCredentials, 
    loginAdminWith2FA, 
    showToast 
  } = useApp();

  // Login Steps: 'credentials' | '2fa-otp'
  const [step, setStep] = useState('credentials');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verifiedAdmin, setVerifiedAdmin] = useState(null);

  // OTP State
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(0);
  const [lastDispatchedOtp, setLastDispatchedOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (modal.type === 'admin-login') {
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setVerifiedAdmin(null);
      setStep('credentials');
      setOtpDigits(['', '', '', '', '', '']);
      setErrorMessage('');
      setResendTimer(0);
      setLastDispatchedOtp('');
    }
  }, [modal]);

  // Resend Countdown Timer
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

  // Auto-focus first digit on OTP step
  useEffect(() => {
    if (step === '2fa-otp') {
      setTimeout(() => {
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus();
        }
      }, 150);
    }
  }, [step]);

  if (modal.type !== 'admin-login') return null;

  // STEP 1: Verify Credentials & Dispatch Compulsory 6-Digit OTP
  const handleValidateCredentials = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setErrorMessage('Please enter both admin email address and security password.');
      return;
    }

    setErrorMessage('');
    setIsSendingOtp(true);

    try {
      const validation = validateAdminCredentials(cleanEmail, password);
      if (!validation.success) {
        setErrorMessage(validation.error || 'Invalid admin credentials.');
        setIsSendingOtp(false);
        return;
      }

      setVerifiedAdmin(validation.admin);

      // Dispatch 6-Digit OTP for 2FA
      const otpRes = await sendEmailOtp(cleanEmail, 'admin-2fa', validation.admin.name);
      if (otpRes.success) {
        setLastDispatchedOtp(otpRes.otp || '');
        setResendTimer(30);
        setStep('2fa-otp');
        setOtpDigits(['', '', '', '', '', '']);
        showToast(otpRes.message, 'success');
      } else {
        setErrorMessage(otpRes.message || 'Failed to dispatch 2FA verification code.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // STEP 2: Resend 2FA Code
  const handleResendOtp = async () => {
    if (resendTimer > 0 || !email) return;
    const cleanEmail = email.trim().toLowerCase();
    setIsSendingOtp(true);
    setErrorMessage('');

    try {
      const otpRes = await sendEmailOtp(cleanEmail, 'admin-2fa', verifiedAdmin?.name || 'Administrator');
      if (otpRes.success) {
        setLastDispatchedOtp(otpRes.otp || '');
        setResendTimer(30);
        setOtpDigits(['', '', '', '', '', '']);
        showToast(`New 2FA code sent to ${cleanEmail}`, 'success');
        if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
      } else {
        showToast(otpRes.message || 'Please wait before requesting a new code.', 'warning');
      }
    } catch {
      showToast('Failed to resend 2FA code. Please check your network.', 'error');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // OTP Digit Navigation & Handling
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
    setErrorMessage('');

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
    setErrorMessage('');

    const focusIndex = Math.min(digitsOnly.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  // STEP 2: Verify 6-Digit OTP and Complete Admin Login
  const handleVerifyAndLogin = (e) => {
    if (e) e.preventDefault();
    const fullCode = otpDigits.join('');
    if (fullCode.length < 6) {
      setErrorMessage('Please enter all 6 digits of the 2FA security code.');
      return;
    }

    setIsVerifyingOtp(true);
    setErrorMessage('');

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const res = loginAdminWith2FA(cleanEmail, password, fullCode);
      if (!res.success) {
        setErrorMessage(res.error || '2FA Verification failed. Incorrect code.');
        setIsVerifyingOtp(false);
      }
    }, 350);
  };

  // Demo Quick Fill Helper
  const handleFillDemoAdmin = (adminEmail, adminPwd) => {
    setEmail(adminEmail);
    setPassword(adminPwd);
    setErrorMessage('');
  };

  const handleQuickFillOtp = () => {
    if (lastDispatchedOtp && lastDispatchedOtp.length === 6) {
      setOtpDigits(lastDispatchedOtp.split(''));
      setErrorMessage('');
      if (otpInputRefs.current[5]) otpInputRefs.current[5].focus();
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} style={{ zIndex: 1060 }}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '470px',
          width: '92%',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(11, 30, 61, 0.45)',
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
          padding: '1.2rem 1.45rem',
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
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'rgba(30, 99, 214, 0.4)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.25)',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} color="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px' }}>
                AVP Admin Console
              </div>
              <div style={{ fontSize: '0.74rem', color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.1rem' }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: '#38BDF8',
                  boxShadow: '0 0 6px #38BDF8'
                }} />
                Mandatory 2FA Protected Access
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

        {/* Security Banner */}
        <div style={{
          backgroundColor: '#0F264A',
          padding: '0.55rem 1.45rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          fontSize: '0.75rem',
          color: '#93C5FD'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lock size={12} color="#38BDF8" />
            <span>2-Step Authentication: Password + Email OTP</span>
          </div>
          <span style={{ 
            backgroundColor: 'rgba(56, 189, 248, 0.15)', 
            color: '#38BDF8', 
            padding: '2px 7px', 
            borderRadius: '4px', 
            fontWeight: 700, 
            fontSize: '0.68rem',
            letterSpacing: '0.3px'
          }}>
            {step === 'credentials' ? 'STEP 1 OF 2' : 'STEP 2 OF 2'}
          </span>
        </div>

        {/* Body */}
        <div style={{ 
          padding: '1.45rem',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          flex: 1
        }}>
          {/* STEP 1: ADMIN CREDENTIALS */}
          {step === 'credentials' && (
            <div>
              {/* Quick Demo Pill */}
              <div style={{
                backgroundColor: 'rgba(30, 99, 214, 0.04)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                marginBottom: '1.15rem',
                fontSize: '0.78rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--primary-navy)', marginBottom: '0.35rem' }}>
                  <Sparkles size={13} color="var(--electric-blue)" /> Demo Admin Keys:
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    onClick={() => handleFillDemoAdmin('admin@avpfuturetech.com', 'Admin@2026')}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      color: 'var(--primary-navy)',
                      fontWeight: 600
                    }}
                  >
                    Super Admin (Dr. Vikram)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleFillDemoAdmin('mentor@avpfuturetech.com', 'Mentor@2026')}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      color: 'var(--primary-navy)',
                      fontWeight: 600
                    }}
                  >
                    Staff Admin (Priya)
                  </button>
                </div>
              </div>

              <form onSubmit={handleValidateCredentials}>
                <div className="form-group" style={{ marginBottom: '0.9rem' }}>
                  <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Admin Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      placeholder="admin@avpfuturetech.com"
                      className="form-input"
                      style={{ fontSize: '0.88rem', padding: '0.65rem 0.85rem', borderRadius: '8px' }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                  <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Security Access Key / Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter security access key"
                      className="form-input"
                      style={{ paddingRight: '2.4rem', fontSize: '0.88rem', padding: '0.65rem 0.85rem', borderRadius: '8px' }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
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
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div style={{ 
                    color: '#DC2626', 
                    fontSize: '0.78rem', 
                    fontWeight: 600, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem',
                    marginBottom: '1rem',
                    backgroundColor: '#FEF2F2',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #FCA5A5'
                  }}>
                    <AlertCircle size={15} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="btn btn-navy btn-block"
                  style={{
                    padding: '0.85rem',
                    fontSize: '0.94rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(11, 30, 61, 0.25)'
                  }}
                >
                  {isSendingOtp ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verifying & Sending 2FA Code...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      <span>Verify Credentials & Send 2FA Code</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: COMPULSORY 6-DIGIT EMAIL OTP VERIFICATION */}
          {step === '2fa-otp' && (
            <div>
              <form onSubmit={handleVerifyAndLogin}>
                <div style={{ textAlign: 'center', marginBottom: '1.15rem' }}>
                  <div style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(30, 99, 214, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 0.75rem auto'
                  }}>
                    <KeyRound size={22} color="var(--electric-blue)" />
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    Enter 6-Digit 2FA Code
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Compulsory 2FA code dispatched to <strong style={{ color: 'var(--primary-navy)' }}>{email}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('credentials');
                      setErrorMessage('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--electric-blue)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '0.35rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <ArrowLeft size={12} /> Back to Credentials
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
                      2FA Demo Code: <strong style={{ color: 'var(--electric-blue)', fontFamily: 'monospace' }}>{lastDispatchedOtp}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={handleQuickFillOtp}
                      style={{
                        background: 'var(--electric-blue)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Auto-Fill Code
                    </button>
                  </div>
                )}

                {/* 6 Digit Inputs */}
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    marginBottom: '0.9rem'
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
                        width: '44px',
                        height: '50px',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        borderRadius: '10px',
                        border: digit ? '2px solid var(--electric-blue)' : '2px solid #E2E8F0',
                        backgroundColor: digit ? 'rgba(30, 99, 214, 0.04)' : '#FFFFFF',
                        color: 'var(--primary-navy)',
                        outline: 'none',
                        boxShadow: digit ? '0 0 0 3px rgba(56, 189, 248, 0.2)' : 'none',
                        fontFamily: 'Outfit, sans-serif'
                      }}
                    />
                  ))}
                </div>

                {errorMessage && (
                  <div style={{ 
                    color: '#DC2626', 
                    fontSize: '0.78rem', 
                    fontWeight: 600, 
                    textAlign: 'center', 
                    marginBottom: '0.85rem',
                    backgroundColor: '#FEF2F2',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #FCA5A5'
                  }}>
                    {errorMessage}
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '1.15rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {resendTimer > 0 ? (
                    <span>Resend 2FA code in <strong style={{ color: 'var(--primary-navy)' }}>{resendTimer}s</strong></span>
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
                        gap: '0.3rem',
                        padding: 0
                      }}
                    >
                      <RotateCcw size={12} /> Resend 2FA OTP Code
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isVerifyingOtp || otpDigits.join('').length < 6}
                  className="btn btn-navy btn-block"
                  style={{
                    padding: '0.85rem',
                    fontSize: '0.94rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(11, 30, 61, 0.25)'
                  }}
                >
                  {isVerifyingOtp ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Authenticating 2FA Session...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Authorize & Enter Console</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Bottom Security Note */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '1.25rem',
            paddingTop: '0.9rem',
            borderTop: '1px solid var(--border-light)',
            fontSize: '0.74rem',
            color: 'var(--text-muted)'
          }}>
            <Lock size={12} color="#64748B" />
            <span>Encrypted 256-bit admin session with cloud audit logging.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

