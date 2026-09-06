import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportCandidatesToExcel } from '../../utils/excelExport';
import { 
  Search, 
  Award, 
  Eye, 
  EyeOff,
  Lock,
  KeyRound,
  UserCheck,
  FileSpreadsheet,
  Edit3,
  Trash2,
  AlertTriangle,
  X,
  Save
} from 'lucide-react';

export default function CandidateManagement() {
  const { 
    students, 
    domains, 
    enrollCandidateDirectly, 
    updateStudent,
    deleteStudent,
    openModal, 
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [feeTierFilter, setFeeTierFilter] = useState('ALL');
  
  // Modals state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeYear: '',
    branch: '',
    chosenDomainId: '',
    testStatus: 'Not Attempted',
    feeTier: '',
    feeStatus: 'Pending',
    sectionA: 0,
    sectionB: 0,
    sectionC: 0
  });
  const [editError, setEditError] = useState('');

  // Deduplicate and filter logic
  const uniqueStudentList = React.useMemo(() => {
    const seen = new Set();
    return students.filter(s => {
      const key = s.id || s.email;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [students]);

  const filteredStudents = uniqueStudentList.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = domainFilter === 'ALL' || s.chosenDomainId === domainFilter;
    const matchesStatus = statusFilter === 'ALL' || s.testStatus === statusFilter;
    const matchesFeeTier = feeTierFilter === 'ALL' || s.feeTier === feeTierFilter;

    return matchesSearch && matchesDomain && matchesStatus && matchesFeeTier;
  });

  const handleExportExcel = () => {
    exportCandidatesToExcel(filteredStudents);
    showToast(`Exported ${filteredStudents.length} candidate records to Excel (.xlsx)!`, 'success');
  };

  // Open Edit Modal with prefilled values
  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setEditError('');
    setShowEditPassword(false);
    setEditFormData({
      name: student.name || '',
      email: student.email || '',
      phone: student.phone || '',
      password: student.password || '',
      collegeYear: student.collegeYear || '3rd Year',
      branch: student.branch || 'Computer Science & Engineering (CSE)',
      chosenDomainId: student.chosenDomainId || '',
      testStatus: student.testStatus || 'Not Attempted',
      feeTier: student.feeTier || '',
      feeStatus: student.feeStatus || 'Pending',
      sectionA: student.scoreData?.sectionA || 0,
      sectionB: student.scoreData?.sectionB || 0,
      sectionC: student.scoreData?.sectionC || 0
    });
  };

  // Save Edit Changes
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEditError('');

    if (!editFormData.name.trim()) {
      setEditError('Please enter candidate full name.');
      return;
    }

    const cleanPhone = editFormData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setEditError('Contact number must be exactly 10 digits.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email.trim())) {
      setEditError('Please enter a valid email address.');
      return;
    }

    if (editFormData.password && editFormData.password.length < 6) {
      setEditError('Password must be at least 6 characters long.');
      return;
    }

    const selectedDomain = domains.find(d => d.id === editFormData.chosenDomainId);

    // Build updated fields payload
    let updatedScoreData = editingStudent.scoreData;
    if (editFormData.testStatus === 'Completed') {
      const sA = Math.max(0, Math.min(20, Number(editFormData.sectionA) || 0));
      const sB = Math.max(0, Math.min(20, Number(editFormData.sectionB) || 0));
      const sC = Math.max(0, Math.min(10, Number(editFormData.sectionC) || 0));
      const totalScore = sA + sB + sC;
      const percentage = Math.round((totalScore / 50) * 100);

      updatedScoreData = {
        sectionA: sA,
        sectionB: sB,
        sectionC: sC,
        totalScore,
        maxScore: 50,
        percentage,
        violationsCount: editingStudent.scoreData?.violationsCount || 0,
        submittedAt: editingStudent.scoreData?.submittedAt || new Date().toISOString()
      };
    } else if (editFormData.testStatus === 'Not Attempted') {
      updatedScoreData = null;
    }

    const isEnrolledNow = editFormData.feeStatus === 'Paid';
    let internId = editingStudent.internId;
    if (isEnrolledNow && !internId) {
      const domainSlug = (selectedDomain?.name || 'GEN').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
      internId = `INT-2026-${domainSlug}-${editingStudent.id.slice(-4)}`;
    }

    const payload = {
      name: editFormData.name.trim(),
      email: editFormData.email.trim().toLowerCase(),
      phone: cleanPhone,
      password: editFormData.password ? editFormData.password.trim() : (editingStudent.password || 'password123'),
      collegeYear: editFormData.collegeYear,
      branch: editFormData.branch,
      chosenDomainId: editFormData.chosenDomainId,
      chosenDomainName: selectedDomain ? selectedDomain.name : '',
      testStatus: editFormData.testStatus,
      scoreData: updatedScoreData,
      feeTier: editFormData.feeTier || null,
      feeStatus: editFormData.feeStatus,
      isEnrolled: isEnrolledNow,
      internId: isEnrolledNow ? internId : '',
      internshipStatus: isEnrolledNow ? (editingStudent.internshipStatus === 'Not Started' ? 'In Progress' : editingStudent.internshipStatus) : 'Not Started'
    };

    const res = updateStudent(editingStudent.id, payload);
    if (res.success !== false) {
      setEditingStudent(null);
    } else {
      setEditError(res.error || 'Failed to update student details.');
    }
  };

  // Confirm and Execute Deletion
  const handleConfirmDelete = () => {
    if (!deletingStudent) return;
    deleteStudent(deletingStudent.id);
    setDeletingStudent(null);
  };

  return (
    <div>
      {/* Top Action Header */}
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
            Registered Candidates & Test Roster
          </h2>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Showing {filteredStudents.length} of {students.length} total registrations
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleExportExcel}
            className="btn btn-primary"
            style={{ borderRadius: '10px' }}
          >
            <FileSpreadsheet size={18} /> Export to Excel (.xlsx)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--border-light)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search candidate name, ID, email..."
            className="form-input"
            style={{ paddingLeft: '2.4rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Domain Filter */}
        <div>
          <select
            className="form-select"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <option value="ALL">All Domains</option>
            {domains.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Test Status Filter */}
        <div>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Test Statuses</option>
            <option value="Completed">Test Completed</option>
            <option value="Not Attempted">Not Attempted</option>
          </select>
        </div>

        {/* Fee Tier Filter */}
        <div>
          <select
            className="form-select"
            value={feeTierFilter}
            onChange={(e) => setFeeTierFilter(e.target.value)}
          >
            <option value="ALL">All Fee Tiers</option>
            <option value="699">₹699 (Merit 80%+)</option>
            <option value="5999">₹5,999 (Standard)</option>
          </select>
        </div>
      </div>

      {/* Candidate Data Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        overflowX: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
            <tr>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Candidate</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Contact / College</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Test Score</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Tier & Payment</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Chosen Domain</th>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No candidates match the specified filters.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  {/* Candidate Info */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>{student.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--electric-blue)' }}>{student.id}</div>
                  </td>

                  {/* Contact / Academic */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ color: 'var(--text-primary)' }}>{student.email}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      +91 {student.phone} · {student.collegeYear}
                    </div>
                  </td>

                  {/* Score & Anti-Cheat */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    {student.scoreData ? (
                      <div>
                        <div style={{ fontWeight: 700, color: student.scoreData.percentage >= 80 ? 'var(--electric-blue)' : 'var(--primary-navy)' }}>
                          {student.scoreData.percentage}% ({student.scoreData.totalScore}/50)
                        </div>
                        <div style={{ fontSize: '0.75rem', color: student.scoreData.violationsCount > 0 ? '#DC2626' : 'var(--text-muted)' }}>
                          Violations: {student.scoreData.violationsCount || 0}
                        </div>
                      </div>
                    ) : (
                      <span className="badge" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                        Pending Test
                      </span>
                    )}
                  </td>

                  {/* Fee Tier & Payment */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span className={`badge ${student.feeTier === '699' ? 'badge-blue' : 'badge-navy'}`}>
                        {student.feeTier === '699' ? '₹699 Merit Tier' : student.feeTier === '5999' ? '₹5,999 Standard' : 'Unassigned'}
                      </span>
                      <span className={`badge ${student.feeStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                        {student.feeStatus === 'Paid' ? 'Paid & Enrolled' : 'Payment Pending'}
                      </span>
                    </div>
                  </td>

                  {/* Domain */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>
                      {student.chosenDomainName || 'Not Selected'}
                    </div>
                    {student.isEnrolled && (
                      <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                        {student.internId}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {/* View Button */}
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="btn btn-outline btn-sm"
                        title="View Full Submission Details"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                      >
                        <Eye size={13} /> View
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEdit(student)}
                        style={{
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          border: '1px solid #BFDBFE',
                          borderRadius: '6px',
                          padding: '0.35rem 0.6rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'all 0.15s ease'
                        }}
                        title="Edit Candidate Information"
                      >
                        <Edit3 size={13} /> Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => setDeletingStudent(student)}
                        style={{
                          backgroundColor: '#FEF2F2',
                          color: '#DC2626',
                          border: '1px solid #FECACA',
                          borderRadius: '6px',
                          padding: '0.35rem 0.6rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'all 0.15s ease'
                        }}
                        title="Delete Candidate Record"
                      >
                        <Trash2 size={13} /> Delete
                      </button>

                      {/* Enroll / Cert Action */}
                      {!student.isEnrolled ? (
                        <button
                          onClick={() => enrollCandidateDirectly(student.id)}
                          className="btn btn-primary btn-sm"
                          title="Manually Enroll Candidate"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                        >
                          <UserCheck size={13} /> Enroll
                        </button>
                      ) : (
                        <button
                          onClick={() => openModal('certificate', student)}
                          className="btn btn-outline-blue btn-sm"
                          title="View Verified Certificate"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                        >
                          <Award size={13} /> Cert
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT STUDENT MODAL */}
      {editingStudent && (
        <div className="modal-backdrop" onClick={() => setEditingStudent(null)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: 'var(--primary-navy)', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(30, 99, 214, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Edit3 size={18} color="#38BDF8" />
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>
                    Edit Student Details
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#93C5FD' }}>
                    Candidate ID: {editingStudent.id}
                  </div>
                </div>
              </div>
              <button className="modal-close" onClick={() => setEditingStudent(null)} style={{ color: '#94A3B8' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.75rem 2rem' }}>
              {editError && (
                <div style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#991B1B',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}>
                  <AlertTriangle size={18} color="#DC2626" />
                  <span>{editError}</span>
                </div>
              )}

              <form onSubmit={handleSaveEdit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email ID *</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number (10 digits) *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      className="form-input"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label className="form-label" style={{ marginBottom: 0, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <KeyRound size={15} color="var(--electric-blue)" />
                      <span>Portal Login Password *</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowEditPassword(!showEditPassword)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--electric-blue)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontWeight: 600,
                        padding: 0
                      }}
                    >
                      {showEditPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      {showEditPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showEditPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter student portal password"
                      className="form-input"
                      style={{ paddingRight: '2.5rem' }}
                      value={editFormData.password}
                      onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                    />
                    <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Used by the candidate to log into their Student Scorecard & Enrolled Intern Portal.
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Current College Year</label>
                    <select
                      className="form-select"
                      value={editFormData.collegeYear}
                      onChange={(e) => setEditFormData({ ...editFormData, collegeYear: e.target.value })}
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="Final Year">4th / Final Year (Senior)</option>
                      <option value="Recent Graduate">Recent Graduate</option>
                      <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Academic Branch</label>
                    <select
                      className="form-select"
                      value={editFormData.branch}
                      onChange={(e) => setEditFormData({ ...editFormData, branch: e.target.value })}
                    >
                      <option value="Computer Science & Engineering (CSE)">CSE</option>
                      <option value="Information Technology (IT)">Information Technology (IT)</option>
                      <option value="Electronics & Communication (ECE)">ECE</option>
                      <option value="Electrical Engineering (EE)">Electrical (EE)</option>
                      <option value="Mechanical Engineering">Mechanical</option>
                      <option value="Civil Engineering">Civil</option>
                      <option value="BCA / MCA / B.Sc CS">BCA / MCA / B.Sc CS</option>
                      <option value="Other Technical Branch">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Assigned / Chosen Domain</label>
                  <select
                    className="form-select"
                    value={editFormData.chosenDomainId}
                    onChange={(e) => setEditFormData({ ...editFormData, chosenDomainId: e.target.value })}
                  >
                    <option value="">Not Selected</option>
                    {domains.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Test Status</label>
                    <select
                      className="form-select"
                      value={editFormData.testStatus}
                      onChange={(e) => setEditFormData({ ...editFormData, testStatus: e.target.value })}
                    >
                      <option value="Not Attempted">Not Attempted</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Fee Tier</label>
                    <select
                      className="form-select"
                      value={editFormData.feeTier}
                      onChange={(e) => setEditFormData({ ...editFormData, feeTier: e.target.value })}
                    >
                      <option value="">Unassigned</option>
                      <option value="699">₹699 (Merit 80%+)</option>
                      <option value="5999">₹5,999 (Standard)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Payment Status</label>
                    <select
                      className="form-select"
                      value={editFormData.feeStatus}
                      onChange={(e) => setEditFormData({ ...editFormData, feeStatus: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid & Enrolled</option>
                    </select>
                  </div>
                </div>

                {/* Score breakdown if test is completed */}
                {editFormData.testStatus === 'Completed' && (
                  <div style={{
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                      Test Scores Breakdown (Total 50 Marks)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Section A (Max 20)</label>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          className="form-input"
                          value={editFormData.sectionA}
                          onChange={(e) => setEditFormData({ ...editFormData, sectionA: e.target.value })}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Section B (Max 20)</label>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          className="form-input"
                          value={editFormData.sectionB}
                          onChange={(e) => setEditFormData({ ...editFormData, sectionB: e.target.value })}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Section C (Max 10)</label>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          className="form-input"
                          value={editFormData.sectionC}
                          onChange={(e) => setEditFormData({ ...editFormData, sectionC: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ borderRadius: '10px' }}
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingStudent && (
        <div className="modal-backdrop" onClick={() => setDeletingStudent(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <button className="modal-close" onClick={() => setDeletingStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1rem 2rem 2rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <Trash2 size={28} />
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', fontWeight: 800, marginBottom: '0.5rem' }}>
                Delete Candidate Record?
              </h3>

              <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Are you sure you want to permanently delete <strong>{deletingStudent.name}</strong> (<code>{deletingStudent.id}</code>)?
              </p>

              <div style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                marginBottom: '1.75rem',
                fontSize: '0.82rem',
                color: '#991B1B',
                textAlign: 'left'
              }}>
                <strong>Warning:</strong> This will remove all associated registration data, test scores, and internship task submissions permanently.
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem' }}>
                <button
                  type="button"
                  onClick={() => setDeletingStudent(null)}
                  className="btn btn-outline"
                  style={{ minWidth: '110px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  style={{
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    minWidth: '140px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Candidate View Modal */}
      {selectedStudent && (
        <div className="modal-backdrop" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                Candidate Profile: {selectedStudent.name}
              </h3>
              <button className="modal-close" onClick={() => setSelectedStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.75rem 2rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                fontSize: '0.88rem'
              }}>
                <div>Candidate ID: <strong>{selectedStudent.id}</strong></div>
                <div>Contact: <strong>+91 {selectedStudent.phone}</strong></div>
                <div>Email: <strong>{selectedStudent.email}</strong></div>
                <div>Login Password: <strong style={{ color: 'var(--electric-blue)' }}>{selectedStudent.password || 'password123'}</strong></div>
                <div>Branch: <strong>{selectedStudent.branch}</strong></div>
                <div>Year: <strong>{selectedStudent.collegeYear}</strong></div>
                <div>Chosen Domain: <strong>{selectedStudent.chosenDomainName || 'Not Selected'}</strong></div>
                <div>Registration: <strong>{new Date(selectedStudent.registrationDate).toLocaleDateString()}</strong></div>
              </div>

              {selectedStudent.scoreData ? (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
                    Examination Performance Breakdown
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Section A (Aptitude)</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedStudent.scoreData.sectionA}/20</div>
                    </div>
                    <div style={{ padding: '0.75rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Section B (Logic)</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedStudent.scoreData.sectionB}/20</div>
                    </div>
                    <div style={{ padding: '0.75rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Section C (English)</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedStudent.scoreData.sectionC}/10</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1rem', backgroundColor: '#FFFBEB', color: '#92400E', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                  Candidate has not yet attempted the Aptitude Test.
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    const st = selectedStudent;
                    setSelectedStudent(null);
                    handleOpenEdit(st);
                  }}
                  className="btn btn-outline"
                >
                  <Edit3 size={14} /> Edit Candidate
                </button>

                <button onClick={() => setSelectedStudent(null)} className="btn btn-ghost">
                  Close
                </button>
                {!selectedStudent.isEnrolled && (
                  <button
                    onClick={() => {
                      enrollCandidateDirectly(selectedStudent.id);
                      setSelectedStudent(null);
                    }}
                    className="btn btn-primary"
                  >
                    Directly Enroll as Active Intern
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
