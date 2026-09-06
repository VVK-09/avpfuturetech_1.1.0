import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, X, ArrowRight } from 'lucide-react';

export default function AdminLoginModal() {
  const { modal, closeModal, loginAdmin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (modal.type !== 'admin-login') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    setTimeout(() => {
      loginAdmin(email, password);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" style={{ maxWidth: '460px' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--primary-navy)', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(30, 99, 214, 0.4)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} color="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>AVP Admin Console</div>
              <div style={{ fontSize: '0.8rem', color: '#93C5FD' }}>Authorized Personnel Access Only</div>
            </div>
          </div>
          <button className="modal-close" onClick={closeModal} style={{ color: '#94A3B8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin Email Address</label>
              <input
                type="email"
                required
                placeholder="name@avpfuturetech.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                placeholder="Enter your security access key"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-navy btn-block"
              style={{ padding: '0.85rem', marginTop: '1.5rem', borderRadius: '10px' }}
            >
              {isSubmitting ? 'Authenticating...' : 'Authorize & Enter Console'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '1.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}>
            <Lock size={12} color="#64748B" />
            <span>Encrypted admin session with security audit logging.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
