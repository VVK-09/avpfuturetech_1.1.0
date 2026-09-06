import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Quote, Building2, Plus, Trash2, Star } from 'lucide-react';
import CompanyManagement from './CompanyManagement';

export default function ContentManagement() {
  const { 
    testimonials, 
    addTestimonial, 
    deleteTestimonial, 
    companies 
  } = useApp();

  const [activeTab, setActiveTab] = useState('testimonials'); // 'testimonials' | 'companies'

  // New Testimonial Form State
  const [tForm, setTForm] = useState({
    name: '',
    college: '',
    domain: 'AI & Machine Learning',
    placedAt: '',
    rating: 5,
    quote: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    addTestimonial({
      ...tForm,
      rating: Number(tForm.rating) || 5
    });
    setTForm({
      name: '',
      college: '',
      domain: 'AI & Machine Learning',
      placedAt: '',
      rating: 5,
      quote: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
            Landing Page Content Manager
          </h2>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Manage student testimonials and partner company showcase dynamically
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.35rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`btn btn-sm ${activeTab === 'testimonials' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            <Quote size={15} /> Student Reviews ({testimonials.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('companies')}
            className={`btn btn-sm ${activeTab === 'companies' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            <Building2 size={15} /> Partner Companies ({companies.length})
          </button>
        </div>
      </div>

      {activeTab === 'testimonials' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '360px minmax(0, 1fr)', gap: '2rem' }}>
          {/* Add Testimonial Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', fontWeight: 700, marginBottom: '1.25rem' }}>
              Add Student Review
            </h3>

            <form onSubmit={handleAddTestimonial}>
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Varun Kapoor"
                  className="form-input"
                  value={tForm.name}
                  onChange={(e) => setTForm({ ...tForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">College / University</label>
                <input
                  type="text"
                  placeholder="e.g. IIT Bombay / NIT Surathkal"
                  className="form-input"
                  value={tForm.college}
                  onChange={(e) => setTForm({ ...tForm, college: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Completed Domain</label>
                <input
                  type="text"
                  className="form-input"
                  value={tForm.domain}
                  onChange={(e) => setTForm({ ...tForm, domain: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Placed Company (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Microsoft / Accenture"
                  className="form-input"
                  value={tForm.placedAt}
                  onChange={(e) => setTForm({ ...tForm, placedAt: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Review Quote *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe student outcome and feedback..."
                  className="form-textarea"
                  value={tForm.quote}
                  onChange={(e) => setTForm({ ...tForm, quote: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <Plus size={16} /> Add Testimonial
              </button>
            </form>
          </div>

          {/* Testimonial Cards List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid var(--border-light)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteTestimonial(t.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '0.25rem' }}
                  >
                    <Trash2 size={15} color="#DC2626" />
                  </button>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', fontStyle: 'italic', marginBottom: '1rem', flex: 1 }}>
                  "{t.quote}"
                </p>

                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>{t.name}</div>
                  <div style={{ color: 'var(--electric-blue)' }}>{t.domain}</div>
                  <div style={{ color: 'var(--text-muted)' }}>{t.placedAt ? `Placed at ${t.placedAt}` : t.college}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Full Company Management Module Embedded in Tab */
        <CompanyManagement />
      )}
    </div>
  );
}
