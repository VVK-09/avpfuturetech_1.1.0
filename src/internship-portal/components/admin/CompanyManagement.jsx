import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import CompanyLogo from '../common/CompanyLogo';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  RotateCcw, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Check,
  AlertTriangle,
  X
} from 'lucide-react';

const LOGO_PRESETS = [
  { name: 'Google', shortName: 'Google', badge: 'Big Tech', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Apple', shortName: 'Apple', badge: 'Tech Titan', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Meta', shortName: 'Meta', badge: 'Social / AI', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'NVIDIA', shortName: 'NVIDIA', badge: 'AI Hardware', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
  { name: 'Oracle', shortName: 'Oracle', badge: 'Enterprise Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
  { name: 'Cisco Systems', shortName: 'Cisco', badge: 'Networking MNC', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
  { name: 'Adobe', shortName: 'Adobe', badge: 'Creative Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png' },
  { name: 'Intel', shortName: 'Intel', badge: 'Semiconductor', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg' },
  { name: 'Salesforce', shortName: 'Salesforce', badge: 'Enterprise CRM', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
  { name: 'Netflix', shortName: 'Netflix', badge: 'Streaming / Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' }
];

export default function CompanyManagement() {
  const { 
    companies, 
    addCompany, 
    updateCompany, 
    deleteCompany, 
    resetCompaniesToDefault,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingCompany, setEditingCompany] = useState(null);
  const [deletingCompany, setDeletingCompany] = useState(null);
  const [showAddForm, setShowAddForm] = useState(true);

  // New Company Form State
  const [formState, setFormState] = useState({
    name: '',
    shortName: '',
    badge: 'MNC',
    logo: ''
  });

  // Edit Form State
  const [editForm, setEditForm] = useState({
    name: '',
    shortName: '',
    badge: '',
    logo: ''
  });

  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return companies;
    const q = searchQuery.toLowerCase();
    return companies.filter(c => 
      c.name.toLowerCase().includes(q) ||
      (c.shortName && c.shortName.toLowerCase().includes(q)) ||
      (c.badge && c.badge.toLowerCase().includes(q))
    );
  }, [companies, searchQuery]);

  const handleApplyPreset = (preset) => {
    setFormState({
      name: preset.name,
      shortName: preset.shortName,
      badge: preset.badge,
      logo: preset.logo
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      showToast('Please provide a company name', 'error');
      return;
    }

    addCompany(formState);
    setFormState({
      name: '',
      shortName: '',
      badge: 'MNC',
      logo: ''
    });
  };

  const handleStartEdit = (company) => {
    setEditingCompany(company);
    setEditForm({
      name: company.name || '',
      shortName: company.shortName || '',
      badge: company.badge || 'MNC',
      logo: company.logo || ''
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      showToast('Company name is required', 'error');
      return;
    }

    updateCompany(editingCompany.id, editForm);
    setEditingCompany(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingCompany) return;
    deleteCompany(deletingCompany.id);
    setDeletingCompany(null);
  };

  return (
    <div>
      {/* Header & Action Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span className="badge" style={{ backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', fontWeight: 700 }}>
              <Building2 size={13} /> Marquee Showcase Manager
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ({companies.length} Companies Total)
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
            Partner Companies & MNC Logos
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
            Manage the top tech employers and MNC logos showcased in the landing page alumni marquee.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={resetCompaniesToDefault}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: '10px', fontSize: '0.84rem' }}
            title="Reset to default 10 top MNCs"
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className={`btn btn-sm ${showAddForm ? 'btn-ghost' : 'btn-primary'}`}
            style={{ borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <Plus size={15} /> {showAddForm ? 'Hide Add Form' : 'Add New Company'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showAddForm ? '380px minmax(0, 1fr)' : '1fr', gap: '2rem' }}>
        
        {/* Left Column: Add Company Form with Live Preview & Presets */}
        {showAddForm && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Quick 1-Click Presets */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '1.25rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="var(--electric-blue)" /> Quick Popular MNC Presets
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {LOGO_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--primary-navy)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--badge-blue-bg)';
                      e.currentTarget.style.borderColor = 'var(--electric-blue)';
                      e.currentTarget.style.color = 'var(--electric-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                      e.currentTarget.style.color = 'var(--primary-navy)';
                    }}
                  >
                    + {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Company Form */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '1.5rem',
              boxShadow: '0 4px 16px rgba(11, 30, 61, 0.04)'
            }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', fontWeight: 800, marginBottom: '1.25rem' }}>
                Add Company Showcase
              </h3>

              <form onSubmit={handleAddSubmit}>
                <div className="form-group">
                  <label className="form-label">Company Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cisco Systems"
                    className="form-input"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Name / Brand Key</label>
                  <input
                    type="text"
                    placeholder="e.g. Cisco"
                    className="form-input"
                    value={formState.shortName}
                    onChange={(e) => setFormState({ ...formState, shortName: e.target.value })}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Used for built-in SVG vector fallback matching
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Category Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise Cloud / Big Tech / MNC"
                    className="form-input"
                    value={formState.badge}
                    onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Logo Image URL (SVG / PNG / WebP)</label>
                  <input
                    type="url"
                    placeholder="https://example.com/logo.svg"
                    className="form-input"
                    value={formState.logo}
                    onChange={(e) => setFormState({ ...formState, logo: e.target.value })}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Paste a direct image link, or leave empty to use built-in vector badge
                  </span>
                </div>

                {/* Live Card Preview */}
                <div style={{
                  marginTop: '1rem',
                  marginBottom: '1.25rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: '12px',
                  border: '1px dashed var(--border-light)'
                }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Live Marquee Card Preview:
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '14px',
                    padding: '0.75rem 1.2rem',
                    boxShadow: '0 4px 14px rgba(11, 30, 61, 0.05)'
                  }}>
                    <CompanyLogo company={{ ...formState, name: formState.name || 'Company Name' }} size={36} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary-navy)' }}>
                        {formState.name || 'Company Full Name'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ShieldCheck size={12} color="var(--electric-blue)" /> {formState.badge || 'Verified Recruiter'}
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ borderRadius: '10px', fontWeight: 700 }}>
                  <Plus size={16} /> Add to Marquee
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Right Column: Existing Companies Roster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid var(--border-light)',
            padding: '0.65rem 1.15rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search partner companies by name, badge, or keyword..."
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.9rem',
                color: 'var(--primary-navy)'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.2rem', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Companies Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem'
          }}>
            {filteredCompanies.map((c, index) => (
              <div
                key={c.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid var(--border-light)',
                  padding: '1.25rem',
                  boxShadow: '0 2px 10px rgba(11, 30, 61, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <CompanyLogo company={c} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 800,
                      fontSize: '0.98rem',
                      color: 'var(--primary-navy)',
                      lineHeight: 1.3,
                      marginBottom: '0.2rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {c.name}
                    </div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--electric-blue)',
                      backgroundColor: 'var(--badge-blue-bg)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px'
                    }}>
                      <ShieldCheck size={11} /> {c.badge || 'Verified Recruiter'}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}>
                  <span style={{ fontWeight: 600 }}>
                    Position #{index + 1}
                  </span>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(c)}
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '0.35rem 0.6rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: 'var(--electric-blue)',
                        backgroundColor: 'var(--bg-subtle)'
                      }}
                      title="Edit company"
                    >
                      <Edit3 size={13} /> Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingCompany(c)}
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '0.35rem 0.6rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: '#DC2626',
                        backgroundColor: '#FEF2F2'
                      }}
                      title="Delete company"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)'
            }}>
              <Building2 size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', fontWeight: 700 }}>No Companies Found</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No partner companies matched your search query "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Company Modal */}
      {editingCompany && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(11, 30, 61, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CompanyLogo company={editForm} size={36} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
                  Edit Partner Company
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCompany(null)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.35rem' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label className="form-label">Company Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Short Name / Brand Key</label>
                <input
                  type="text"
                  className="form-input"
                  value={editForm.shortName}
                  onChange={(e) => setEditForm({ ...editForm, shortName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category Badge</label>
                <input
                  type="text"
                  className="form-input"
                  value={editForm.badge}
                  onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Logo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="form-input"
                  value={editForm.logo}
                  onChange={(e) => setEditForm({ ...editForm, logo: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '10px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: '10px', fontWeight: 700 }}
                >
                  <Check size={15} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCompany && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(11, 30, 61, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '440px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <AlertTriangle size={28} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
              Delete Company?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginBottom: '1.5rem' }}>
              Are you sure you want to remove <strong>{deletingCompany.name}</strong> from the landing page marquee showcase?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setDeletingCompany(null)}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: '10px', flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="btn btn-danger btn-sm"
                style={{ borderRadius: '10px', flex: 1, backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none' }}
              >
                <Trash2 size={15} /> Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
