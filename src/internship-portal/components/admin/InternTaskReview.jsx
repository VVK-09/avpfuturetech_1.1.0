import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  ExternalLink, 
  Award, 
  Search, 
  UserCheck, 
  Send 
} from 'lucide-react';

export default function InternTaskReview() {
  const { 
    students, 
    reviewInternTask, 
    markInternshipComplete, 
    openModal 
  } = useApp();

  const enrolledStudents = students.filter(s => s.isEnrolled);
  const [selectedStudentId, setSelectedStudentId] = useState(enrolledStudents[0]?.id || '');
  const [adminSelectedMonth, setAdminSelectedMonth] = useState('all'); // 'all' | '1' | '2' | '3'
  const [feedbackText, setFeedbackText] = useState({});

  const currentStudent = enrolledStudents.find(s => s.id === selectedStudentId) || enrolledStudents[0];

  const handleReviewAction = (taskId, status) => {
    if (!currentStudent) return;
    const comment = feedbackText[taskId] || (status === 'Approved' ? 'Excellent deliverable. Well-structured and compliant with rubrics.' : 'Please address comments and re-submit.');
    reviewInternTask(currentStudent.id, taskId, status, comment);
  };

  const studentTasks = currentStudent?.tasks || [];
  const filteredTasks = adminSelectedMonth === '1'
    ? studentTasks.filter(t => (t.month === 1) || (t.week >= 1 && t.week <= 4))
    : adminSelectedMonth === '2'
    ? studentTasks.filter(t => (t.month === 2) || (t.week >= 5 && t.week <= 8))
    : adminSelectedMonth === '3'
    ? studentTasks.filter(t => (t.month === 3) || (t.week >= 9 && t.week <= 12))
    : studentTasks;

  return (
    <div>
      {/* Top Header */}
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
            Intern Task Evaluation & Certificate Review
          </h2>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Review live deliverable submissions, write mentor feedback, and unlock verified certificates
          </div>
        </div>

        {currentStudent && (
          <button
            onClick={() => markInternshipComplete(currentStudent.id)}
            className="btn btn-primary"
            style={{ borderRadius: '10px' }}
          >
            <Award size={18} /> Mark All Approved & Award Certificate
          </button>
        )}
      </div>

      {enrolledStudents.length === 0 ? (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid var(--border-light)'
        }}>
          <p style={{ color: 'var(--text-muted)' }}>No active enrolled interns yet. Candidates will appear here once payment is confirmed or admin manually enrolls them.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px minmax(0, 1fr)',
          gap: '2rem'
        }}>
          {/* Left Column: Enrolled Interns List */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', fontWeight: 700, marginBottom: '1rem' }}>
              Active Interns ({enrolledStudents.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {enrolledStudents.map((s) => {
                const isSelected = s.id === currentStudent?.id;
                const approvedCount = (s.tasks || []).filter(t => t.status === 'Approved').length;
                const totalCount = s.tasks?.length || 4;

                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: `1.5px solid ${isSelected ? 'var(--electric-blue)' : 'var(--border-light)'}`,
                      backgroundColor: isSelected ? 'var(--badge-blue-bg)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '0.95rem' }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--electric-blue)', fontWeight: 600 }}>
                      {s.internId || s.id}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {s.chosenDomainName || 'AI & Machine Learning'} · ({approvedCount}/{totalCount} tasks)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Intern Task Review Queue */}
          {currentStudent && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Selected Intern Profile Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
                    {currentStudent.name} ({currentStudent.internId})
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {currentStudent.chosenDomainName} · {currentStudent.email} · Batch: {currentStudent.internBatch || '2026-Q3'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => openModal('certificate', currentStudent)}
                    className="btn btn-outline-blue btn-sm"
                  >
                    <Award size={15} /> Certificate Preview
                  </button>
                </div>
              </div>

              {/* Month Tabs */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: `All 12 Weeks (${studentTasks.filter(t => t.status === 'Approved').length}/12)` },
                  { id: '1', label: `Month 1 (W1–W4)` },
                  { id: '2', label: `Month 2 (W5–W8)` },
                  { id: '3', label: `Month 3 (W9–W12)` }
                ].map(mTab => (
                  <button
                    key={mTab.id}
                    type="button"
                    onClick={() => setAdminSelectedMonth(mTab.id)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      border: adminSelectedMonth === mTab.id ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                      backgroundColor: adminSelectedMonth === mTab.id ? 'var(--badge-blue-bg)' : '#FFFFFF',
                      color: adminSelectedMonth === mTab.id ? 'var(--electric-blue)' : 'var(--text-body)',
                      fontSize: '0.8rem',
                      fontWeight: adminSelectedMonth === mTab.id ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {mTab.label}
                  </button>
                ))}
              </div>

              {/* Task Review List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredTasks.map((task, idx) => {
                  const weekNum = task.week || idx + 1;
                  const taskMonth = task.month || (weekNum <= 4 ? 1 : weekNum <= 8 ? 2 : 3);
                  return (
                  <div
                    key={task.taskId || idx}
                    style={{
                      border: '1px solid var(--border-light)',
                      borderRadius: '14px',
                      padding: '1.5rem',
                      backgroundColor: task.status === 'Approved' ? '#F0FDF4' : 'var(--bg-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <span className="badge badge-navy" style={{ fontSize: '0.75rem', marginBottom: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          Month {taskMonth} · Week {weekNum}
                        </span>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-navy)', fontWeight: 700 }}>
                          {task.title}
                        </h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {task.description}
                        </div>
                      </div>

                      <span className={`badge ${task.status === 'Approved' ? 'badge-success' : task.status === 'Submitted' ? 'badge-blue' : 'badge-warning'}`}>
                        {task.status}
                      </span>
                    </div>

                    {/* Submission link if provided */}
                    {task.submissionLink ? (
                      <div style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        margin: '0.75rem 0',
                        fontSize: '0.85rem'
                      }}>
                        <div>
                          <strong>Deliverable:</strong>{' '}
                          {task.submissionLink.startsWith('http') ? (
                            <a href={task.submissionLink} target="_blank" rel="noreferrer" style={{ color: 'var(--electric-blue)', textDecoration: 'underline' }}>
                              {task.submissionLink} <ExternalLink size={12} style={{ display: 'inline' }} />
                            </a>
                          ) : (
                            <span>{task.submissionLink}</span>
                          )}
                        </div>
                        {task.notes && (
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                            Remarks: "{task.notes}"
                          </div>
                        )}
                        {task.submittedAt && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                            Submitted: {new Date(task.submittedAt).toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0.5rem 0' }}>
                        No deliverable submitted by student yet.
                      </div>
                    )}

                    {/* Mentor Feedback & Actions */}
                    <div style={{ marginTop: '1rem' }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Mentor Evaluation Comments</label>
                      <input
                        type="text"
                        placeholder="e.g. Excellent modular code, tests passing."
                        className="form-input"
                        style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                        defaultValue={task.mentorFeedback || ''}
                        onChange={(e) => setFeedbackText({ ...feedbackText, [task.taskId]: e.target.value })}
                      />

                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                        <button
                          onClick={() => handleReviewAction(task.taskId, 'Needs Revision')}
                          className="btn btn-outline btn-sm"
                          style={{ borderColor: '#D97706', color: '#D97706' }}
                        >
                          Request Revision
                        </button>
                        <button
                          onClick={() => handleReviewAction(task.taskId, 'Approved')}
                          className="btn btn-primary btn-sm"
                        >
                          <CheckCircle2 size={14} /> Approve Deliverable
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
