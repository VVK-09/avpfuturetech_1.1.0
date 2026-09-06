import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, CheckCircle2, Award, ArrowRight, BookOpen, Layers, Terminal, Clock, Star } from 'lucide-react';

export default function SyllabusModal() {
  const { modal, closeModal, openModal } = useApp();

  if (modal.type !== 'syllabus' || !modal.data) return null;

  const domain = modal.data;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '800px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Banner Header with Image */}
        <div style={{ position: 'relative', height: '160px', width: '100%', backgroundColor: '#0B1E3D', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={domain.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'}
            alt={domain.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.75)'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(11,30,61,0.2) 0%, rgba(11,30,61,0.85) 100%)'
          }} />

          {/* Close button */}
          <button 
            className="modal-close" 
            onClick={closeModal} 
            style={{ 
              position: 'absolute', 
              top: '12px', 
              right: '12px', 
              backgroundColor: 'rgba(11, 30, 61, 0.75)', 
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              zIndex: 10
            }}
          >
            <X size={18} />
          </button>

          {/* Content Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '24px',
            right: '24px',
            zIndex: 2,
            color: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{
                backgroundColor: 'rgba(56, 189, 248, 0.25)',
                color: '#38BDF8',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 700
              }}>
                {domain.duration || '3 Months Remote'}
              </span>
              <span style={{
                backgroundColor: 'rgba(30, 99, 214, 0.8)',
                color: '#FFFFFF',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 700
              }}>
                {domain.badge || 'Open Track'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              {domain.name} — Curriculum Roadmap
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1 }}>
          {/* Summary Overview */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--primary-navy)', marginBottom: '0.4rem', fontWeight: 700 }}>
              Program Overview
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              {domain.fullDescription || domain.shortDescription}
            </p>
          </div>

          {/* Tools & Technologies */}
          {domain.tools && domain.tools.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--primary-navy)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700 }}>
                <Terminal size={17} color="var(--electric-blue)" /> Key Tools & Frameworks Mastered
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {domain.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--primary-navy)'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 12-Week Structured Milestones */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-navy)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700 }}>
              <Layers size={18} color="var(--electric-blue)" /> 12-Week Milestone & Project Schedule
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(domain.modules || []).map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--primary-navy)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    flexShrink: 0
                  }}>
                    W{m.week || idx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary-navy)' }}>
                      {m.title}
                    </div>
                    {m.deliverable && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        <strong>Expected Deliverable:</strong> {m.deliverable}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ padding: '1rem 2rem' }}>
          <button className="btn btn-ghost" onClick={closeModal}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              closeModal();
              openModal('register', { domainId: domain.id, domainName: domain.name });
            }}
          >
            Enroll in Domain (₹699 Merit Track)
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
