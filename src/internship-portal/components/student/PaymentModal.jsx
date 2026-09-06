import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  X, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Smartphone,
  BookOpen,
  Sparkles,
  Award
} from 'lucide-react';

export default function PaymentModal() {
  const { modal, closeModal, processPayment, domains } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('candidate@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize selected domain from modal data or fallback
  const initialDomainId = modal.data?.chosenDomainId || domains[0]?.id || 'dom-ai-ml';
  const [selectedDomainId, setSelectedDomainId] = useState(initialDomainId);

  if (modal.type !== 'payment' || !modal.data) return null;

  const candidate = modal.data;
  const feeAmount = candidate.feeTier === '699' ? 699 : 5999;
  const selectedDomain = domains.find(d => d.id === selectedDomainId) || domains[0];
  const selectedDomainName = selectedDomain ? selectedDomain.name : 'AI & Machine Learning';

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      processPayment(candidate.id, {
        method: paymentMethod,
        upiId: upiId,
        amount: feeAmount,
        domainId: selectedDomainId,
        domainName: selectedDomainName,
        transactionId: `TXN-AVP-${Date.now()}`
      });
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} style={{ zIndex: 1050 }}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '540px',
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
          padding: '1.25rem 1.6rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          {/* Ambient Top Glow */}
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
              backgroundColor: 'rgba(30, 99, 214, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              <Lock size={18} color="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px' }}>
                Domain Selection & Enrollment
              </div>
              <div style={{ fontSize: '0.76rem', color: '#93C5FD' }}>
                Lock your track & activate your 3-month internship workspace
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
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ 
          padding: '1.4rem 1.6rem',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          flex: 1
        }}>
          <form onSubmit={handlePaySubmit}>
            {/* 1. DOMAIN PREFERENCE SELECTOR */}
            <div style={{
              backgroundColor: 'rgba(30, 99, 214, 0.04)',
              border: '1.5px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '14px',
              padding: '1.1rem',
              marginBottom: '1.25rem'
            }}>
              <label 
                className="form-label" 
                style={{ 
                  fontSize: '0.86rem', 
                  fontWeight: 800, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  color: 'var(--primary-navy)',
                  marginBottom: '0.5rem'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={15} color="var(--electric-blue)" />
                  <span>Choose Your Internship Domain Track *</span>
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                  Required
                </span>
              </label>

              <select
                className="form-select"
                style={{ 
                  fontSize: '0.9rem', 
                  padding: '0.65rem 0.85rem', 
                  borderRadius: '10px', 
                  fontWeight: 700,
                  backgroundColor: '#FFFFFF',
                  borderColor: 'var(--electric-blue)'
                }}
                value={selectedDomainId}
                onChange={(e) => setSelectedDomainId(e.target.value)}
              >
                {domains.map((dom) => (
                  <option key={dom.id} value={dom.id}>
                    {dom.name} {dom.badge ? `(${dom.badge})` : ''}
                  </option>
                ))}
              </select>

              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.45rem', lineHeight: 1.4 }}>
                Selected: <strong style={{ color: 'var(--primary-navy)' }}>{selectedDomainName}</strong> — Includes 12 weekly milestone deliverables, mentorship & verifiable certificate.
              </div>
            </div>

            {/* 2. ORDER SUMMARY BOX */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '14px',
              padding: '1.1rem',
              marginBottom: '1.25rem',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Candidate:</span>
                <strong style={{ color: 'var(--primary-navy)' }}>{candidate.name} ({candidate.id})</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Domain:</span>
                <strong style={{ color: 'var(--electric-blue)' }}>{selectedDomainName}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Internship Duration:</span>
                <span>3 Months (Structured Milestones)</span>
              </div>

              <div style={{
                height: '1px',
                backgroundColor: 'var(--border-light)',
                margin: '0.65rem 0'
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Total Amount Payable:
                  </div>
                  <div style={{ fontSize: '0.76rem', color: candidate.feeTier === '699' ? '#059669' : 'var(--electric-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {candidate.feeTier === '699' ? (
                      <>
                        <Award size={12} color="#059669" />
                        <span>Merit Scholarship Discount (88% OFF)</span>
                      </>
                    ) : (
                      <span>Standard Internship Enrollment</span>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--electric-blue)' }}>
                  ₹{feeAmount}
                </div>
              </div>
            </div>

            {/* 3. PAYMENT METHOD SELECTOR */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Select Payment Mode
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${paymentMethod === 'upi' ? 'var(--electric-blue)' : 'var(--border-light)'}`,
                    backgroundColor: paymentMethod === 'upi' ? 'var(--badge-blue-bg)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    color: 'var(--primary-navy)'
                  }}
                >
                  <Smartphone size={16} color="var(--electric-blue)" /> UPI / QR (GPay, PhonePe)
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${paymentMethod === 'card' ? 'var(--electric-blue)' : 'var(--border-light)'}`,
                    backgroundColor: paymentMethod === 'card' ? 'var(--badge-blue-bg)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    color: 'var(--primary-navy)'
                  }}
                >
                  <CreditCard size={16} color="var(--electric-blue)" /> Credit / Debit Card
                </button>
              </div>
            </div>

            {paymentMethod === 'upi' ? (
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Virtual Payment Address (VPA / UPI ID)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mobileNumber@upi or user@okhdfcbank"
                  className="form-input"
                  style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem' }}
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <input type="text" placeholder="Card Number (XXXX XXXX XXXX XXXX)" className="form-input" style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem' }} defaultValue="4111 2222 3333 4444" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <input type="text" placeholder="MM/YY" className="form-input" style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem' }} defaultValue="12/28" />
                  <input type="password" placeholder="CVV" className="form-input" style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem' }} defaultValue="789" maxLength={3} />
                </div>
              </div>
            )}

            {/* Pay and Activate Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary btn-block"
              style={{ 
                padding: '0.88rem', 
                fontSize: '0.98rem', 
                fontWeight: 800, 
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(30, 99, 214, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isProcessing ? (
                <span>Confirming & Activating Workspace...</span>
              ) : (
                <>
                  <span>Confirm Domain & Pay ₹{feeAmount}</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={14} color="var(--electric-blue)" />
            <span>Instant Intern ID generation & workspace unlock upon payment.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
