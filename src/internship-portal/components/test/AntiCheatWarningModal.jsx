import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, ShieldAlert, X } from 'lucide-react';

export default function AntiCheatWarningModal() {
  const { modal, closeModal } = useApp();

  if (modal.type !== 'anti-cheat-warning' || !modal.data) return null;

  const { warningCount, maxWarnings } = modal.data;
  const remainingWarnings = maxWarnings - warningCount;

  return (
    <div className="modal-backdrop">
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '480px', 
          border: '2px solid #EF4444', 
          boxShadow: '0 20px 40px rgba(220, 38, 38, 0.25)' 
        }}
      >
        <div className="modal-header" style={{ backgroundColor: '#FEF2F2', borderBottom: '1px solid #FECACA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={22} color="#DC2626" />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#991B1B' }}>
                Anti-Cheat Violation Warning
              </div>
              <div style={{ fontSize: '0.8rem', color: '#B91C1C' }}>
                Tab Switching or Window Focus Loss Detected
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '1.75rem 2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FEF2F2',
            color: '#DC2626',
            fontSize: '1.5rem',
            fontWeight: 800,
            marginBottom: '1rem',
            border: '2px solid #FCA5A5'
          }}>
            {warningCount} / {maxWarnings}
          </div>

          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', fontWeight: 800, marginBottom: '0.75rem' }}>
            Warning #{warningCount} of {maxWarnings}
          </h3>

          <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            You switched browser tabs, minimized the examination window, or lost focus. Switching tabs is strictly prohibited during the AVP FutureTech Aptitude Test.
          </p>

          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '10px',
            padding: '0.85rem 1rem',
            fontSize: '0.84rem',
            color: '#92400E',
            marginBottom: '1.75rem',
            textAlign: 'left'
          }}>
            <strong>Important:</strong> You have <strong>{remainingWarnings} warning{remainingWarnings === 1 ? '' : 's'} remaining</strong>. On the 5th violation, your test will be terminated and submitted immediately.
          </div>

          <button
            onClick={closeModal}
            className="btn btn-primary btn-block"
            style={{ backgroundColor: '#DC2626', padding: '0.85rem', borderRadius: '10px' }}
          >
            I Understand & Resume Test
          </button>
        </div>
      </div>
    </div>
  );
}
