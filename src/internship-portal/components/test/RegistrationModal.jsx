import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserPlus, 
  X, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle, 
  Mail, 
  Sparkles, 
  Check, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  GraduationCap, 
  BookOpen, 
  Lock, 
  KeyRound,
  Loader2,
  ShieldCheck,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { sendEmailOtp, verifyEmailOtp } from '../../services/emailOtpService';

export default function RegistrationModal() {
  const { modal, closeModal, registerStudent, checkStudentExists, openModal, showToast } = useApp();
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    collegeYear: '3rd Year',
    branch: 'Computer Science & Engineering (CSE)',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState('details'); // 'details' | 'otp'
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // 6-digit OTP State (Array of 6 strings)
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(0);
  const [lastDispatchedOtp, setLastDispatchedOtp] = useState('');

  // Validation & Error State
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [duplicateError, setDuplicateError] = useState('');
  const [otpError, setOtpError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (modal.type === 'register') {
      setCurrentStep('details');
      setFormData({
        name: '',
        phone: '',
        email: '',
        collegeYear: '3rd Year',
        branch: 'Computer Science & Engineering (CSE)',
        password: ''
      });
      setOtpDigits(['', '', '', '', '', '']);
      setPhoneError('');
      setEmailError('');
      setPasswordError('');
      setDuplicateError('');
      setOtpError('');
      setShowPassword(false);
      setIsSendingOtp(false);
      setIsVerifying(false);
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

  // Focus the first OTP input when step becomes 'otp'
  useEffect(() => {
    if (currentStep === 'otp') {
      setTimeout(() => {
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus();
        }
      }, 150);
    }
  }, [currentStep]);

  if (modal.type !== 'register') return null;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validatePhone = (phone) => {
    const digitsOnly = String(phone).replace(/\D/g, '');
    return digitsOnly.length >= 10;
  };

  // Password validation: at least 8 chars, 1 uppercase letter, 1 special character
  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(formData.password);
  
  const passwordStrengthScore = (hasMinLength ? 1 : 0) + (hasUppercase ? 1 : 0) + (hasSpecialChar ? 1 : 0);

  const validatePassword = (pwd) => {
    if (!pwd || pwd.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least 1 uppercase letter (A-Z).';
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(pwd)) {
      return 'Password must contain at least 1 special character (e.g. @, #, $, %, !).';
    }
    return '';
  };

  // STEP 1: Handle Details Submission & Send Email OTP
  const handleProceedToOtp = async (e) => {
    if (e) e.preventDefault();
    setPhoneError('');
    setEmailError('');
    setPasswordError('');
    setDuplicateError('');
    setOtpError('');

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');

    if (!cleanName) {
      showToast('Please enter your full name.', 'error');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setEmailError('Please enter a valid email address.');
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    const pwdErr = validatePassword(formData.password);
    if (pwdErr) {
      setPasswordError(pwdErr);
      showToast(pwdErr, 'error');
      return;
    }

    // Check if user already exists
    const existing = checkStudentExists(cleanEmail, cleanPhone);
    if (existing) {
      const msg = 'An account with this email address or phone already exists. Please login.';
      setDuplicateError(msg);
      showToast(msg, 'error');
      return;
    }

    // Dispatch 6-digit OTP
    setIsSendingOtp(true);
    try {
      const result = await sendEmailOtp(cleanEmail, 'registration', cleanName);
      if (result.success) {
        setLastDispatchedOtp(result.otp || '');
        setResendTimer(30);
        setCurrentStep('otp');
        setOtpDigits(['', '', '', '', '', '']);
        showToast(result.message, 'success');
      } else {
        showToast(result.message || 'Failed to send verification code. Please retry.', 'error');
      }
    } catch (err) {
      console.error('Error dispatching OTP:', err);
      showToast('Error sending verification code. Please check your network and retry.', 'error');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Resend OTP Action
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    const cleanEmail = formData.email.trim().toLowerCase();
    setIsSendingOtp(true);
    setOtpError('');
    try {
      const result = await sendEmailOtp(cleanEmail, 'registration', formData.name.trim());
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

  // OTP Digit Input Handlers
  const handleDigitChange = (index, value) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    // Single digit entry
    const digit = cleaned.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setOtpError('');

    // Auto-advance to next input
    if (index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        // Current is empty, backspace moves to previous input and clears it
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

    // Focus last filled index
    const focusIndex = Math.min(digitsOnly.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  // STEP 2: Verify OTP & Auto-Launch Test
  const handleVerifyOtpAndRegister = async (e) => {
    if (e) e.preventDefault();
    const fullCode = otpDigits.join('');
    if (fullCode.length < 6) {
      setOtpError('Please enter all 6 digits of the verification code.');
      showToast('Please enter the full 6-digit code.', 'error');
      return;
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');

    setIsVerifying(true);
    setOtpError('');

    try {
      const verifyResult = verifyEmailOtp(cleanEmail, fullCode, 'registration');
      if (!verifyResult.success) {
        setOtpError(verifyResult.message);
        showToast(verifyResult.message, 'error');
        setIsVerifying(false);
        return;
      }

      // Verification Succeeded! Register Candidate and Launch Test
      showToast('Email verified successfully! Launching Aptitude Test...', 'success');

      setTimeout(() => {
        registerStudent({
          name: formData.name.trim(),
          phone: cleanPhone,
          email: cleanEmail,
          collegeYear: formData.collegeYear,
          branch: formData.branch,
          password: formData.password || 'Pass@2026',
          chosenDomainId: modal.data?.domainId || '',
          chosenDomainName: modal.data?.domainName || '',
          isEmailVerified: true
        });
        setIsVerifying(false);
      }, 450);

    } catch (err) {
      console.error('Registration verification error:', err);
      setOtpError('Verification failed. Please try again.');
      setIsVerifying(false);
    }
  };

  // Quick fill helper for demo/testing
  const handleQuickFillCode = () => {
    if (lastDispatchedOtp && lastDispatchedOtp.length === 6) {
      const digits = lastDispatchedOtp.split('');
      setOtpDigits(digits);
      setOtpError('');
      if (otpInputRefs.current[5]) otpInputRefs.current[5].focus();
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} style={{ zIndex: 1050 }}>
      <div 
        className="modal-content reg-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Modal Header */}
        <div className="reg-modal-header">
          {/* Ambient Top Glow Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #1E63D6 0%, #38BDF8 50%, #4F46E5 100%)'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1E63D6 0%, #38BDF8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(30, 99, 214, 0.4)',
              flexShrink: 0
            }}>
              {currentStep === 'otp' ? <KeyRound size={20} color="#FFFFFF" /> : <UserPlus size={20} color="#FFFFFF" />}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px', lineHeight: 1.25 }}>
                {currentStep === 'otp' ? 'Verify Email Address' : 'Aptitude Test 2026 — Registration'}
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
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
              marginLeft: '0.5rem'
            }} 
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="reg-modal-body">
          {/* Duplicate Error Banner */}
          {duplicateError && (
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '0.8rem 0.95rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem',
              boxShadow: '0 3px 12px rgba(239, 68, 68, 0.08)'
            }}>
              <AlertCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#991B1B', fontSize: '0.86rem' }}>
                  {duplicateError}
                </div>
                <div style={{ marginTop: '0.45rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      closeModal();
                      openModal('student-login', { identifier: formData.email || formData.phone });
                    }}
                    style={{
                      backgroundColor: '#DC2626',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '7px',
                      padding: '0.38rem 0.85rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)'
                    }}
                  >
                    Login to Your Account
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: CANDIDATE REGISTRATION DETAILS */}
          {currentStep === 'details' && (
            <form onSubmit={handleProceedToOtp}>
              {/* ROW 1: Full Name & Email ID (2-Column Grid) */}
              <div className="reg-grid-2col">
                <div className="reg-field-group">
                  <label className="reg-label">
                    <span className="reg-label-left">
                      <span className="reg-icon-badge">
                        <User size={11} />
                      </span>
                      <span>Full Name *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    className="reg-input"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (duplicateError) setDuplicateError('');
                    }}
                  />
                </div>

                <div className="reg-field-group">
                  <label className="reg-label">
                    <span className="reg-label-left">
                      <span className="reg-icon-badge">
                        <Mail size={11} />
                      </span>
                      <span>Email ID (for OTP) *</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. aryan.sharma@example.com"
                    className="reg-input"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (emailError) setEmailError('');
                      if (duplicateError) setDuplicateError('');
                    }}
                  />
                  {emailError && <div className="form-error" style={{ fontSize: '0.72rem', marginTop: '0.2rem' }}>{emailError}</div>}
                </div>
              </div>

              {/* ROW 2: Mobile Number & Academic Branch */}
              <div className="reg-grid-2col">
                <div className="reg-field-group">
                  <label className="reg-label">
                    <span className="reg-label-left">
                      <span className="reg-icon-badge">
                        <Phone size={11} />
                      </span>
                      <span>Mobile Number *</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className="reg-input"
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, phone: digits });
                      if (phoneError) setPhoneError('');
                    }}
                  />
                  {phoneError && <div className="form-error" style={{ fontSize: '0.72rem', marginTop: '0.2rem' }}>{phoneError}</div>}
                </div>

                <div className="reg-field-group">
                  <label className="reg-label">
                    <span className="reg-label-left">
                      <span className="reg-icon-badge">
                        <BookOpen size={11} />
                      </span>
                      <span>Academic Branch *</span>
                    </span>
                  </label>
                  <select
                    className="reg-select"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  >
                    <option value="Computer Science & Engineering (CSE)">Computer Science (CSE)</option>
                    <option value="Information Technology (IT)">Information Technology (IT)</option>
                    <option value="Electronics & Communication (ECE)">Electronics (ECE)</option>
                    <option value="Electrical Engineering (EE)">Electrical (EE)</option>
                    <option value="Mechanical Engineering">Mechanical</option>
                    <option value="Civil Engineering">Civil</option>
                    <option value="BCA / MCA / B.Sc CS">BCA / MCA / B.Sc CS</option>
                    <option value="Other Technical Branch">Other Technical Branch</option>
                  </select>
                </div>
              </div>

              {/* ROW 3: College Year */}
              <div className="reg-field-group" style={{ marginBottom: '0.85rem' }}>
                <label className="reg-label">
                  <span className="reg-label-left">
                    <span className="reg-icon-badge">
                      <GraduationCap size={11} />
                    </span>
                    <span>Current College Year *</span>
                  </span>
                </label>
                <select
                  className="reg-select"
                  value={formData.collegeYear}
                  onChange={(e) => setFormData({ ...formData, collegeYear: e.target.value })}
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="Final Year">4th / Final Year (Senior)</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                  <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                </select>
              </div>

              {/* ROW 4: Password Field with Live Strength */}
              <div className="reg-field-group" style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="reg-label" style={{ marginBottom: 0 }}>
                    <span className="reg-label-left">
                      <span className="reg-icon-badge">
                        <Lock size={11} />
                      </span>
                      <span>Create Account Password *</span>
                    </span>
                  </label>

                  {formData.password && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '1px 8px',
                      borderRadius: '6px',
                      backgroundColor: passwordStrengthScore === 3 ? '#ECFDF5' : passwordStrengthScore === 2 ? '#FFFBEB' : '#FEF2F2',
                      color: passwordStrengthScore === 3 ? '#059669' : passwordStrengthScore === 2 ? '#D97706' : '#DC2626',
                      border: `1px solid ${passwordStrengthScore === 3 ? '#A7F3D0' : passwordStrengthScore === 2 ? '#FDE68A' : '#FECACA'}`
                    }}>
                      {passwordStrengthScore === 3 ? 'Strong' : passwordStrengthScore === 2 ? 'Moderate' : 'Weak'}
                    </span>
                  )}
                </div>

                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="8+ chars with 1 uppercase & 1 symbol (e.g. Pass@2026)"
                    className="reg-input"
                    style={{ paddingRight: '2.5rem' }}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (passwordError) setPasswordError('');
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '9px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748B',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '6px',
                      transition: 'color 0.2s ease'
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Progress Line */}
                {formData.password && (
                  <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginTop: '0.45rem', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(passwordStrengthScore / 3) * 100}%`,
                      height: '100%',
                      backgroundColor: passwordStrengthScore === 3 ? '#10B981' : passwordStrengthScore === 2 ? '#F59E0B' : '#EF4444',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }} />
                  </div>
                )}

                {passwordError && <div className="form-error" style={{ fontSize: '0.72rem', marginTop: '0.25rem' }}>{passwordError}</div>}

                {/* Requirements Chips */}
                <div className="reg-rules-wrap">
                  <span className={`reg-rule-chip ${hasMinLength ? 'valid' : ''}`}>
                    <Check size={11} color={hasMinLength ? '#059669' : '#94A3B8'} /> 8+ Characters
                  </span>
                  <span className={`reg-rule-chip ${hasUppercase ? 'valid' : ''}`}>
                    <Check size={11} color={hasUppercase ? '#059669' : '#94A3B8'} /> 1 Uppercase (A-Z)
                  </span>
                  <span className={`reg-rule-chip ${hasSpecialChar ? 'valid' : ''}`}>
                    <Check size={11} color={hasSpecialChar ? '#059669' : '#94A3B8'} /> 1 Symbol (!@#$)
                  </span>
                </div>
              </div>

              {/* ACTION BUTTON: SEND 6-DIGIT CODE */}
              <button
                type="submit"
                disabled={isSendingOtp}
                className="reg-submit-btn"
              >
                {isSendingOtp ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    <span>Sending 6-Digit Code...</span>
                  </>
                ) : (
                  <>
                    <Mail size={17} />
                    <span>Continue with 6-Digit Email OTP</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: 6-DIGIT EMAIL OTP ENTRY */}
          {currentStep === 'otp' && (
            <form onSubmit={handleVerifyOtpAndRegister}>
              <div style={{
                textAlign: 'center',
                padding: '0.5rem 0 1rem 0'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(30, 99, 214, 0.12) 0%, rgba(56, 189, 248, 0.22) 100%)',
                  color: 'var(--electric-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem auto',
                  boxShadow: '0 4px 14px rgba(30, 99, 214, 0.15)'
                }}>
                  <Mail size={26} />
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-navy)' }}>
                  Enter 6-Digit Verification Code
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  We sent a 6-digit OTP to{' '}
                  <strong style={{ color: 'var(--primary-navy)' }}>{formData.email}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--electric-blue)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '0.4rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px'
                  }}
                >
                  <ArrowLeft size={13} /> Edit Email Address
                </button>
              </div>

              {/* 6 Individual Digit Input Boxes */}
              <div 
                className="reg-otp-grid"
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
                    className={`reg-otp-box ${digit ? 'filled' : ''}`}
                  />
                ))}
              </div>

              {otpError && (
                <div style={{
                  color: '#DC2626',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginBottom: '0.85rem'
                }}>
                  {otpError}
                </div>
              )}

              {/* Resend Cooldown Section */}
              <div style={{
                textAlign: 'center',
                marginBottom: '1.25rem',
                fontSize: '0.78rem',
                color: 'var(--text-muted)'
              }}>
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
                      gap: '0.3rem',
                      padding: 0
                    }}
                  >
                    <RotateCcw size={12} />
                    {isSendingOtp ? 'Sending...' : 'Didn\'t receive code? Resend OTP'}
                  </button>
                )}
              </div>

              {/* Verify & Launch Test Action Button */}
              <button
                type="submit"
                disabled={isVerifying || otpDigits.join('').length < 6}
                className="reg-submit-btn"
              >
                {isVerifying ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    <span>Verifying & Launching Test...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Verify & Launch Aptitude Test</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom Login Link */}
          <div style={{
            textAlign: 'center',
            marginTop: '1.15rem',
            paddingTop: '0.95rem',
            borderTop: '1px solid #F1F5F9',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            Already registered?{' '}
            <button
              type="button"
              onClick={() => {
                closeModal();
                openModal('student-login');
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
              Login with Email OTP or Password →
            </button>
          </div>
        </div>
      </div>

      {/* Embedded High-Performance Responsive Modal Styles */}
      <style>{`
        .reg-modal-container {
          max-width: 550px;
          width: 94%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(11, 30, 61, 0.45);
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          background-color: #FFFFFF;
        }

        .reg-modal-header {
          background: linear-gradient(135deg, #07152B 0%, #0B1E3D 55%, #173B7A 100%);
          color: #FFFFFF;
          padding: 1.15rem 1.4rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .reg-modal-body {
          padding: 1.35rem 1.45rem 1.15rem 1.45rem;
          overflow-y: auto;
          background-color: #FFFFFF;
          flex: 1;
        }

        .reg-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .reg-field-group {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
        }

        .reg-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .reg-label-left {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .reg-icon-badge {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background-color: rgba(30, 99, 214, 0.08);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--electric-blue);
          flex-shrink: 0;
        }

        .reg-input {
          width: 100%;
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          padding: 0.65rem 0.85rem;
          font-size: 0.88rem;
          color: var(--primary-navy);
          font-family: inherit;
          outline: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }

        .reg-input:focus {
          background-color: #FFFFFF;
          border-color: var(--electric-blue);
          box-shadow: 0 0 0 3.5px rgba(30, 99, 214, 0.12);
        }

        .reg-input::placeholder {
          color: #94A3B8;
        }

        .reg-select {
          width: 100%;
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          padding: 0.65rem 2.2rem 0.65rem 0.85rem;
          font-size: 0.86rem;
          color: var(--primary-navy);
          font-family: inherit;
          outline: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
        }

        .reg-select:focus {
          background-color: #FFFFFF;
          border-color: var(--electric-blue);
          box-shadow: 0 0 0 3.5px rgba(30, 99, 214, 0.12);
        }

        .reg-submit-btn {
          width: 100%;
          padding: 0.8rem 1.4rem;
          font-size: 0.95rem;
          font-weight: 800;
          border-radius: 12px;
          background: linear-gradient(135deg, #1E63D6 0%, #154AB4 100%);
          color: #FFFFFF;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 16px rgba(30, 99, 214, 0.35);
          transition: all 0.2s ease;
          margin-top: 0.95rem;
        }

        .reg-submit-btn:hover:not(:disabled) {
          box-shadow: 0 8px 24px rgba(30, 99, 214, 0.45);
          transform: translateY(-1px);
        }

        .reg-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .reg-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .reg-rules-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-top: 0.45rem;
        }

        .reg-rule-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.18rem 0.55rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          background-color: #F1F5F9;
          color: #64748B;
          border: 1px solid #E2E8F0;
          transition: all 0.2s ease;
        }

        .reg-rule-chip.valid {
          background-color: #ECFDF5;
          color: #059669;
          border-color: #A7F3D0;
          font-weight: 700;
        }

        .reg-otp-grid {
          display: flex;
          justify-content: center;
          gap: clamp(0.3rem, 1.8vw, 0.55rem);
          margin-bottom: 1rem;
        }

        .reg-otp-box {
          width: clamp(38px, 12.5vw, 48px);
          height: clamp(48px, 14vw, 54px);
          font-size: clamp(1.2rem, 4vw, 1.4rem);
          font-weight: 800;
          text-align: center;
          border-radius: 10px;
          border: 2px solid #E2E8F0;
          background-color: #FFFFFF;
          color: var(--primary-navy);
          outline: none;
          transition: all 0.2s ease;
          font-family: 'Outfit', sans-serif;
        }

        .reg-otp-box.filled {
          border-color: var(--electric-blue);
          background-color: rgba(30, 99, 214, 0.04);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
        }

        .reg-otp-box:focus {
          border-color: var(--electric-blue);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25);
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 580px) {
          .reg-modal-container {
            width: 95%;
            max-height: 92vh;
            border-radius: 16px;
          }
          .reg-modal-header {
            padding: 1rem 1.15rem;
          }
          .reg-modal-body {
            padding: 1.15rem 1.15rem 1rem 1.15rem;
          }
          .reg-grid-2col {
            grid-template-columns: 1fr;
            gap: 0.8rem;
            margin-bottom: 0.8rem;
          }
          .reg-input, .reg-select {
            padding: 0.62rem 0.8rem;
            font-size: 0.9rem;
          }
          .reg-rules-wrap {
            gap: 0.35rem;
          }
        }
      `}</style>
    </div>
  );
}
