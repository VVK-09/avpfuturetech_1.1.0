import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.isVisible) return null;

  const icons = {
    success: <CheckCircle2 size={20} color="#1E63D6" />,
    warning: <AlertTriangle size={20} color="#D97706" />,
    error: <AlertCircle size={20} color="#DC2626" />,
    info: <Info size={20} color="#1E63D6" />
  };

  const bgStyles = {
    success: { background: '#FFFFFF', borderLeft: '5px solid #1E63D6' },
    warning: { background: '#FFFFFF', borderLeft: '5px solid #D97706' },
    error: { background: '#FFFFFF', borderLeft: '5px solid #DC2626' },
    info: { background: '#FFFFFF', borderLeft: '5px solid #1E63D6' }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '1rem 1.35rem',
        borderRadius: '12px',
        boxShadow: '0 12px 32px rgba(11, 30, 61, 0.16)',
        maxWidth: '440px',
        color: '#0B1E3D',
        fontSize: '0.92rem',
        fontWeight: '500',
        animation: 'slideUp 0.25s ease-out',
        ...bgStyles[toast.type || 'info']
      }}
    >
      {icons[toast.type || 'info']}
      <div style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</div>
    </div>
  );
}
