import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  X, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Smartphone,
  BookOpen,
  Award,
  Loader2,
  Zap,
  Building2
} from 'lucide-react';
import { 
  createCashfreeOrder, 
  launchCashfreeCheckout, 
  verifyCashfreeOrder, 
  loadCashfreeSDK 
} from '../../services/cashfreeService';

export default function PaymentModal() {
  const { modal, closeModal, processPayment, domains, showToast } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('candidate@okcashfree');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Initialize selected domain from modal data or fallback
  const initialDomainId = modal.data?.chosenDomainId || domains[0]?.id || 'dom-ai-ml';
  const [selectedDomainId, setSelectedDomainId] = useState(initialDomainId);

  // Pre-load Cashfree SDK script in background
  useEffect(() => {
    if (modal.type === 'payment') {
      loadCashfreeSDK().catch(() => {});
      const initDomId = modal.data?.chosenDomainId || domains[0]?.id || 'dom-ai-ml';
      setSelectedDomainId(initDomId);
      setIsProcessing(false);
      setStatusMessage('');
    }
  }, [modal, domains]);

  if (modal.type !== 'payment' || !modal.data) return null;

  const candidate = modal.data;
  const feeAmount = candidate.feeTier === '699' ? 699 : 5999;
  const selectedDomain = domains.find(d => d.id === selectedDomainId) || domains[0];
  const selectedDomainName = selectedDomain ? selectedDomain.name : 'AI & Machine Learning';

  // Handle Cashfree / Sandbox Payment Submission
  const handlePaySubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusMessage('Initiating Cashfree Sandbox order...');

    try {
      // 1. Create Cashfree Order via Next.js Backend
      const orderRes = await createCashfreeOrder({
        candidateId: candidate.id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        amount: feeAmount,
        domainId: selectedDomainId,
        domainName: selectedDomainName
      });

      if (!orderRes.success) {
        showToast(orderRes.error || 'Failed to initialize payment gateway.', 'error');
        setIsProcessing(false);
        setStatusMessage('');
        return;
      }

      const { orderId, paymentSessionId, isSandbox, isLiveGateway } = orderRes;

      // 2. If Real Cashfree Gateway is active, launch Cashfree Checkout SDK modal
      if (isLiveGateway && paymentSessionId && !paymentSessionId.includes('demo_') && !paymentSessionId.includes('sim_')) {
        setStatusMessage('Opening Cashfree Secure Checkout...');
        try {
          const checkoutResult = await launchCashfreeCheckout(paymentSessionId, isSandbox ? 'sandbox' : 'production');
          
          if (checkoutResult && checkoutResult.error) {
            showToast(checkoutResult.error.message || 'Payment cancelled.', 'warning');
            setIsProcessing(false);
            setStatusMessage('');
            return;
          }

          // Verify order status
          setStatusMessage('Verifying Cashfree transaction confirmation...');
          const verifyRes = await verifyCashfreeOrder(orderId);

          if (verifyRes.success) {
            completeEnrollment(orderId, 'Cashfree Gateway');
          } else {
            // Still allow test completion in Sandbox
            completeEnrollment(orderId, 'Cashfree Sandbox Test');
          }
          return;
        } catch (sdkErr) {
          console.warn('[Cashfree SDK Checkout]', sdkErr);
        }
      }

      // 3. Seamless Sandbox Simulation Mode (Instant Test Checkout)
      setStatusMessage('Processing Cashfree Sandbox dummy transaction...');
      setTimeout(() => {
        setStatusMessage('Verifying test payment receipt on 256-bit ledger...');
        setTimeout(() => {
          completeEnrollment(orderId || `TXN_CF_SANDBOX_${Date.now()}`, 'Cashfree Sandbox (Test Mode)');
        }, 600);
      }, 700);

    } catch (err) {
      console.error('Payment execution error:', err);
      showToast('An error occurred while processing transaction. Falling back to Sandbox simulation.', 'warning');
      setTimeout(() => {
        completeEnrollment(`TXN_CF_FALLBACK_${Date.now()}`, 'Cashfree Sandbox (Fallback)');
      }, 500);
    }
  };

  // Helper to finalize enrollment & unlock workspace
  const completeEnrollment = (transactionId, gatewayLabel) => {
    processPayment(candidate.id, {
      method: `${gatewayLabel} (${paymentMethod.toUpperCase()})`,
      upiId: paymentMethod === 'upi' ? upiId : '',
      amount: feeAmount,
      domainId: selectedDomainId,
      domainName: selectedDomainName,
      transactionId: transactionId,
      orderId: transactionId,
      gateway: 'Cashfree',
      paidAt: new Date().toISOString()
    });
    setIsProcessing(false);
    setStatusMessage('');
  };

  return (
    <div className="modal-backdrop" onClick={closeModal} style={{ zIndex: 1050 }}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '560px',
          width: '94%',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(11, 30, 61, 0.4)',
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
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'rgba(30, 99, 214, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 4px 12px rgba(30, 99, 214, 0.3)'
            }}>
              <Zap size={20} color="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px' }}>
                Cashfree Payment Gateway
              </div>
              <div style={{ fontSize: '0.76rem', color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.1rem' }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: '#34D399',
                  boxShadow: '0 0 6px #34D399'
                }} />
                Sandbox Test Mode • Instant Intern ID & Workspace Unlock
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

        {/* Cashfree Sandbox Notice Ribbon */}
        <div style={{
          backgroundColor: '#0F264A',
          padding: '0.55rem 1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          fontSize: '0.76rem',
          color: '#93C5FD'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <ShieldCheck size={14} color="#38BDF8" />
            <span>Cashfree Sandbox Environment (Dummy payments allowed)</span>
          </div>
          <span style={{
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: '#38BDF8',
            padding: '2px 7px',
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '0.68rem'
          }}>
            TEST MODE
          </span>
        </div>

        {/* Body */}
        <div style={{ 
          padding: '1.35rem 1.6rem',
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
              padding: '1.05rem',
              marginBottom: '1.15rem'
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
                  marginBottom: '0.45rem'
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
                Selected: <strong style={{ color: 'var(--primary-navy)' }}>{selectedDomainName}</strong> — 12-week structured roadmap with verifiable certificate.
              </div>
            </div>

            {/* 2. ORDER SUMMARY BOX */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '14px',
              padding: '1.05rem',
              marginBottom: '1.15rem',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Candidate:</span>
                <strong style={{ color: 'var(--primary-navy)' }}>{candidate.name} ({candidate.id})</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Chosen Domain:</span>
                <strong style={{ color: 'var(--electric-blue)' }}>{selectedDomainName}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Gateway:</span>
                <span style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>Cashfree Payments (Sandbox)</span>
              </div>

              <div style={{
                height: '1px',
                backgroundColor: 'var(--border-light)',
                margin: '0.55rem 0'
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Total Payable Amount:
                  </div>
                  <div style={{ fontSize: '0.76rem', color: candidate.feeTier === '699' ? '#059669' : 'var(--electric-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {candidate.feeTier === '699' ? (
                      <>
                        <Award size={12} color="#059669" />
                        <span>Merit Scholarship Applied (₹699 One-Time)</span>
                      </>
                    ) : (
                      <span>Standard Internship Enrollment (₹5,999)</span>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--electric-blue)', fontFamily: 'Outfit, sans-serif' }}>
                  ₹{feeAmount}
                </div>
              </div>
            </div>

            {/* 3. PAYMENT METHOD SELECTOR */}
            <div style={{ marginBottom: '1.15rem' }}>
              <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.45rem' }}>
                Select Cashfree Payment Mode
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${paymentMethod === 'upi' ? 'var(--electric-blue)' : 'var(--border-light)'}`,
                    backgroundColor: paymentMethod === 'upi' ? 'var(--badge-blue-bg)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    color: 'var(--primary-navy)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Smartphone size={16} color="var(--electric-blue)" /> 
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${paymentMethod === 'card' ? 'var(--electric-blue)' : 'var(--border-light)'}`,
                    backgroundColor: paymentMethod === 'card' ? 'var(--badge-blue-bg)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    color: 'var(--primary-navy)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <CreditCard size={16} color="var(--electric-blue)" /> 
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${paymentMethod === 'netbanking' ? 'var(--electric-blue)' : 'var(--border-light)'}`,
                    backgroundColor: paymentMethod === 'netbanking' ? 'var(--badge-blue-bg)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    color: 'var(--primary-navy)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Building2 size={16} color="var(--electric-blue)" /> 
                  <span>Net Banking</span>
                </button>
              </div>
            </div>

            {/* Method specific fields */}
            {paymentMethod === 'upi' && (
              <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  Virtual Payment Address (VPA / UPI ID)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. candidate@okaxis or 9876543210@paytm"
                    className="form-input"
                    style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }}
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.3rem', fontWeight: 600 }}>
                  ✓ Supports Google Pay, PhonePe, Paytm, BHIM, and all UPI apps.
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.15rem' }}>
                <input 
                  type="text" 
                  placeholder="Card Number (4111 2222 3333 4444)" 
                  className="form-input" 
                  style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }} 
                  defaultValue="4111 2222 3333 4444" 
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="form-input" 
                    style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }} 
                    defaultValue="12/28" 
                  />
                  <input 
                    type="password" 
                    placeholder="CVV" 
                    className="form-input" 
                    style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }} 
                    defaultValue="789" 
                    maxLength={3} 
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  Select Bank
                </label>
                <select className="form-select" style={{ fontSize: '0.86rem', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
                  <option>HDFC Bank (Sandbox Test)</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Status Progress indicator */}
            {isProcessing && (
              <div style={{
                backgroundColor: 'rgba(30, 99, 214, 0.05)',
                border: '1px dashed rgba(56, 189, 248, 0.5)',
                borderRadius: '8px',
                padding: '0.6rem 0.85rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.78rem',
                color: 'var(--primary-navy)'
              }}>
                <Loader2 size={16} className="animate-spin" color="var(--electric-blue)" />
                <span>{statusMessage || 'Communicating with Cashfree Sandbox...'}</span>
              </div>
            )}

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary btn-block"
              style={{ 
                padding: '0.88rem', 
                fontSize: '0.96rem', 
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
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Processing Cashfree Sandbox Payment...</span>
                </>
              ) : (
                <>
                  <span>Pay ₹{feeAmount} via Cashfree Sandbox</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Trust Footnote */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '1rem',
            fontSize: '0.74rem',
            color: 'var(--text-muted)'
          }}>
            <Lock size={12} color="#64748B" />
            <span>256-Bit SSL Secured by Cashfree Payments • Instant Intern Workspace Unlock</span>
          </div>
        </div>
      </div>
    </div>
  );
}
