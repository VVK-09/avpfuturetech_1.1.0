import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { generateCertificateCanvas, downloadCertificatePNG } from '../../utils/certificateGenerator';
import { Award, Download, X, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';

export default function CertificateModal() {
  const { modal, closeModal, showToast } = useApp();
  const canvasRef = useRef(null);

  const internData = modal.type === 'certificate' ? modal.data : null;

  useEffect(() => {
    if (canvasRef.current && internData) {
      generateCertificateCanvas(canvasRef.current, internData);
    }
  }, [internData]);

  if (modal.type !== 'certificate' || !internData) return null;

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadCertificatePNG(canvasRef.current, internData.name);
      showToast('Certificate downloaded successfully!', 'success');
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '960px', maxHeight: '92vh' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--primary-navy)', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(30, 99, 214, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={22} color="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Official Verified Certificate of Internship
              </div>
              <div style={{ fontSize: '0.8rem', color: '#93C5FD' }}>
                Credential ID: {internData.internId || 'AVP-CERT-2026-992'}
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={closeModal} style={{ color: '#94A3B8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body with Certificate Canvas Preview */}
        <div className="modal-body" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-subtle)' }}>
          <div style={{
            maxWidth: '100%',
            overflowX: 'auto',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-xl)',
            border: '2px solid var(--border-light)',
            backgroundColor: '#FFFFFF'
          }}>
            <canvas 
              ref={canvasRef} 
              style={{ width: '100%', height: 'auto', display: 'block', maxWidth: '880px', margin: '0 auto' }} 
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--electric-blue)" /> Tamper-Proof Digital Signature
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="var(--electric-blue)" /> ISO 9001:2015 Verified
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Recipient: <strong>{internData.name}</strong> ({internData.chosenDomainName || 'Track'})
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-ghost" onClick={closeModal}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleDownload}>
              <Download size={16} />
              Download High-Res PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
