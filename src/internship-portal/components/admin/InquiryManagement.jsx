import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  AlertCircle,
  Edit3,
  X,
  FileSpreadsheet
} from 'lucide-react';

export default function InquiryManagement() {
  const { inquiries, updateInquiryStatus, deleteInquiry, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Contacted' | 'Resolved'
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deletingInquiry, setDeletingInquiry] = useState(null);

  // Counselor reply / notes modal state
  const [notesForm, setNotesForm] = useState({
    status: 'Contacted',
    notes: '',
    replyDraft: ''
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = inquiries ? inquiries.length : 0;
    const pending = inquiries ? inquiries.filter(i => i.status === 'Pending').length : 0;
    const contacted = inquiries ? inquiries.filter(i => i.status === 'Contacted').length : 0;
    const resolved = inquiries ? inquiries.filter(i => i.status === 'Resolved').length : 0;
    return { total, pending, contacted, resolved };
  }, [inquiries]);

  // Filter inquiries
  const filteredInquiries = useMemo(() => {
    if (!inquiries) return [];
    return inquiries.filter(inq => {
      const matchStatus = statusFilter === 'All' || inq.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.phone && inq.phone.includes(q)) ||
        (inq.message && inq.message.toLowerCase().includes(q)) ||
        inq.id.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const handleOpenNotesModal = (inq) => {
    setSelectedInquiry(inq);
    setNotesForm({
      status: inq.status || 'Pending',
      notes: inq.counselorNotes || '',
      replyDraft: `Hi ${inq.name},\n\nThank you for reaching out to the AVP FutureTech Admissions Desk regarding our Internship & Aptitude Test 2026.\n\nIn response to your query:\n\n\nBest regards,\nAdmissions & Mentorship Desk\nAVP FutureTech LLP\nPh: +91 9307076962 / +91 7744001079\nEmail: contact@avpfuturetech.com`
    });
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, notesForm.status, notesForm.notes);
    setSelectedInquiry(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingInquiry) return;
    deleteInquiry(deletingInquiry.id);
    setDeletingInquiry(null);
  };

  const handleExportCSV = () => {
    if (!inquiries || inquiries.length === 0) {
      showToast('No inquiries available to export.', 'info');
      return;
    }
    const headers = ['Inquiry ID', 'Date & Time', 'Full Name', 'Email Address', 'Phone Number', 'Status', 'Message', 'Counselor Notes'];
    const rows = inquiries.map(i => [
      i.id,
      i.createdAt,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      i.email,
      `"${i.phone || ''}"`,
      i.status,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${(i.counselorNotes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AVP_Admissions_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inquiries CSV exported successfully!', 'success');
  };

  return (
    <div>
      {/* Header & Stats */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span className="badge" style={{ backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', fontWeight: 700 }}>
              <MessageSquare size={13} /> Admissions Counseling Desk
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ({stats.total} Inquiries Received)
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
            Student Inquiries & Custom Queries
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
            Review, track, and resolve admissions questions submitted from the landing page contact form.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="btn btn-outline btn-sm"
          style={{ borderRadius: '10px', fontSize: '0.84rem' }}
        >
          <FileSpreadsheet size={15} color="#15803D" /> Export Inquiries (CSV)
        </button>
      </div>

      {/* KPI Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid var(--border-light)',
          padding: '1.25rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Inquiries</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '0.2rem' }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Landing Page Queries</div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid var(--border-light)',
          padding: '1.25rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={13} /> Pending Review
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#D97706', marginTop: '0.2rem' }}>
            {stats.pending}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Requires counselor callback</div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid var(--border-light)',
          padding: '1.25rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#1E40AF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Phone size={13} /> Contacted / In-Progress
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--electric-blue)', marginTop: '0.2rem' }}>
            {stats.contacted}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Active counseling follow-up</div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid var(--border-light)',
          padding: '1.25rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#15803D', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={13} /> Resolved & Closed
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16A34A', marginTop: '0.2rem' }}>
            {stats.resolved}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Student query cleared</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'var(--bg-subtle)', padding: '0.3rem', borderRadius: '10px' }}>
          {[
            { id: 'All', label: `All (${stats.total})` },
            { id: 'Pending', label: `Pending (${stats.pending})` },
            { id: 'Contacted', label: `Contacted (${stats.contacted})` },
            { id: 'Resolved', label: `Resolved (${stats.resolved})` }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              style={{
                border: 'none',
                padding: '0.35rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: statusFilter === tab.id ? 700 : 500,
                cursor: 'pointer',
                backgroundColor: statusFilter === tab.id ? '#FFFFFF' : 'transparent',
                color: statusFilter === tab.id ? 'var(--primary-navy)' : 'var(--text-body)',
                boxShadow: statusFilter === tab.id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', minWidth: '280px', flex: '1', maxWidth: '400px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by name, email, phone, or question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '2.2rem',
              fontSize: '0.86rem',
              height: '38px',
              borderRadius: '10px'
            }}
          />
        </div>
      </div>

      {/* Inquiries Table / Cards View */}
      {filteredInquiries.length === 0 ? (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          padding: '3.5rem 2rem',
          textAlign: 'center'
        }}>
          <MessageSquare size={40} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
          <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', fontWeight: 700 }}>No Inquiries Found</h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0.35rem auto 0 auto' }}>
            {searchQuery ? `No inquiries matched "${searchQuery}".` : 'No admissions inquiries in this category.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredInquiries.map((inq) => {
            const isPending = inq.status === 'Pending';
            const isContacted = inq.status === 'Contacted';

            return (
              <div
                key={inq.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '1.4rem 1.6rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                {/* Top Row: Candidate Header & Status Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--badge-blue-bg)',
                      color: 'var(--electric-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      {(inq.name || 'S').charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
                          {inq.name}
                        </h4>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          #{inq.id}
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        marginTop: '0.25rem',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        flexWrap: 'wrap'
                      }}>
                        <a
                          href={`mailto:${inq.email}?subject=AVP FutureTech Admissions Inquiry - ${inq.id}`}
                          style={{ color: 'var(--electric-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}
                        >
                          <Mail size={13} /> {inq.email}
                        </a>

                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone}`}
                            style={{ color: 'var(--text-body)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}
                          >
                            <Phone size={13} /> +91 {inq.phone}
                          </a>
                        )}

                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}>
                          <Clock size={13} /> {inq.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown & Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: '1px solid var(--border-light)',
                        backgroundColor: isPending ? '#FEF3C7' : isContacted ? '#DBEAFE' : '#DCFCE7',
                        color: isPending ? '#92400E' : isContacted ? '#1E40AF' : '#15803D',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleOpenNotesModal(inq)}
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        color: 'var(--electric-blue)',
                        backgroundColor: 'var(--bg-subtle)'
                      }}
                    >
                      <Edit3 size={13} /> Counselor Notes
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingInquiry(inq)}
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '0.4rem 0.6rem',
                        borderRadius: '8px',
                        color: '#DC2626',
                        backgroundColor: '#FEF2F2'
                      }}
                      title="Delete inquiry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Question / Message Bubble */}
                <div style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.9rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.55
                }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Student Query Message:
                  </div>
                  "{inq.message || 'No detailed message provided.'}"
                </div>

                {/* Counselor Notes (if present) */}
                {inq.counselorNotes && (
                  <div style={{
                    backgroundColor: '#F0FDF4',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    border: '1px solid #BBF7D0',
                    fontSize: '0.82rem',
                    color: '#166534',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}>
                    <CheckCircle2 size={15} color="#16A34A" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <strong>Counselor Log:</strong> {inq.counselorNotes}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Counselor Notes / Quick Reply Modal */}
      {selectedInquiry && (
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
            maxWidth: '540px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge" style={{ backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', fontWeight: 700, fontSize: '0.72rem' }}>
                  {selectedInquiry.id}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', margin: '0.2rem 0 0 0' }}>
                  Admissions Follow-Up & Notes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.35rem' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Candidate Summary Box */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid var(--border-light)',
              marginBottom: '1.25rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                {selectedInquiry.name} · <span style={{ color: 'var(--electric-blue)' }}>{selectedInquiry.email}</span>
              </div>
              {selectedInquiry.phone && (
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Phone: +91 {selectedInquiry.phone}
                </div>
              )}
              <div style={{ color: 'var(--text-body)', fontStyle: 'italic', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                "{selectedInquiry.message}"
              </div>
            </div>

            <form onSubmit={handleSaveNotes}>
              <div className="form-group">
                <label className="form-label">Inquiry Resolution Status</label>
                <select
                  className="form-input"
                  value={notesForm.status}
                  onChange={(e) => setNotesForm({ ...notesForm, status: e.target.value })}
                >
                  <option value="Pending">Pending (Awaiting Counselor Action)</option>
                  <option value="Contacted">Contacted (In-Progress Counseling)</option>
                  <option value="Resolved">Resolved (Query Answered & Closed)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Counselor Internal Notes / Call Log</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Called student on +91 ..., clarified fee structure, student will take test on Sunday."
                  className="form-textarea"
                  value={notesForm.notes}
                  onChange={(e) => setNotesForm({ ...notesForm, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.75rem' }}>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=AVP FutureTech Admissions Response - ${selectedInquiry.id}&body=${encodeURIComponent(notesForm.replyDraft)}`}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Mail size={14} color="var(--electric-blue)" /> Open Email Client
                </a>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="btn btn-ghost btn-sm"
                    style={{ borderRadius: '10px' }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: '10px', fontWeight: 700 }}
                  >
                    <CheckCircle2 size={15} /> Save Follow-Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingInquiry && (
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
            maxWidth: '420px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <AlertCircle size={26} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
              Delete Inquiry Record?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginBottom: '1.5rem' }}>
              Are you sure you want to delete inquiry <strong>{deletingInquiry.id}</strong> from <strong>{deletingInquiry.name}</strong>?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setDeletingInquiry(null)}
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
