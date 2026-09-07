import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Upload, 
  Link as LinkIcon, 
  FileCode2, 
  MessageSquare, 
  Calendar, 
  CheckSquare, 
  AlertCircle, 
  Download, 
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  ArrowRight,
  CalendarDays,
  Target,
  FileCheck,
  Code2,
  FolderArchive,
  BookOpen,
  Info,
  CheckCircle,
  Lock,
  Unlock
} from 'lucide-react';

export default function EnrolledInternDashboard() {
  const { 
    currentUser, 
    setCurrentView, 
    submitInternTask, 
    openModal, 
    showToast 
  } = useApp();

  const [selectedMonth, setSelectedMonth] = useState('all'); // '1' | '2' | '3' | 'all'
  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [submissionForm, setSubmissionForm] = useState({
    submissionLink: '',
    notes: '',
    fileName: ''
  });

  if (!currentUser || !currentUser.isEnrolled) {
    return (
      <div className="container section-py" style={{ textAlign: 'center' }}>
        <h2>You are not enrolled as an active intern yet.</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>
          Please complete your Aptitude Test and confirm payment from your Student Dashboard.
        </p>
        <button onClick={() => setCurrentView('student-dashboard')} className="btn btn-primary">
          Go to Student Dashboard
        </button>
      </div>
    );
  }

  const intern = currentUser;
  const tasks = intern.tasks || [];
  
  // Progress calculations
  const approvedTasksCount = tasks.filter(t => t.status === 'Approved').length;
  const totalTasksCount = tasks.length || 12;
  const progressPercent = Math.round((approvedTasksCount / totalTasksCount) * 100);
  const isCompleted = intern.internshipStatus === 'Completed' || (tasks.length > 0 && approvedTasksCount === totalTasksCount);

  // Month-wise calculations
  const month1Tasks = tasks.filter(t => (t.month === 1) || (t.week >= 1 && t.week <= 4));
  const month2Tasks = tasks.filter(t => (t.month === 2) || (t.week >= 5 && t.week <= 8));
  const month3Tasks = tasks.filter(t => (t.month === 3) || (t.week >= 9 && t.week <= 12));

  const month1Approved = month1Tasks.filter(t => t.status === 'Approved').length;
  const month2Approved = month2Tasks.filter(t => t.status === 'Approved').length;
  const month3Approved = month3Tasks.filter(t => t.status === 'Approved').length;

  const month1Total = month1Tasks.length || 4;
  const month2Total = month2Tasks.length || 4;
  const month3Total = month3Tasks.length || 4;

  const month1Percent = month1Tasks.length ? Math.round((month1Approved / month1Tasks.length) * 100) : 0;
  const month2Percent = month2Tasks.length ? Math.round((month2Approved / month2Tasks.length) * 100) : 0;
  const month3Percent = month3Tasks.length ? Math.round((month3Approved / month3Tasks.length) * 100) : 0;

  // Strict Month Unlock Conditions:
  // Month 1: Open upon enrollment
  // Month 2: Open ONLY after completing all milestones in Month 1
  // Month 3: Open ONLY after completing all milestones in Month 2
  const isMonth1Unlocked = true;
  const isMonth1Completed = month1Tasks.length > 0 && month1Approved >= month1Tasks.length;

  const isMonth2Unlocked = isMonth1Completed;
  const isMonth2Completed = isMonth2Unlocked && month2Tasks.length > 0 && month2Approved >= month2Tasks.length;

  const isMonth3Unlocked = isMonth2Completed;
  const isMonth3Completed = isMonth3Unlocked && month3Tasks.length > 0 && month3Approved >= month3Tasks.length;

  const isTaskLocked = (task) => {
    const taskMonth = task.month || (task.week <= 4 ? 1 : task.week <= 8 ? 2 : 3);
    if (taskMonth === 1) return false;
    if (taskMonth === 2) return !isMonth2Unlocked;
    if (taskMonth === 3) return !isMonth3Unlocked;
    return false;
  };

  const getTaskLockReason = (task) => {
    const taskMonth = task.month || (task.week <= 4 ? 1 : task.week <= 8 ? 2 : 3);
    if (taskMonth === 2 && !isMonth2Unlocked) {
      return `Month 2 is locked! Complete and get mentor approval for all ${month1Total} milestones in Month 1 (${month1Approved}/${month1Total} approved).`;
    }
    if (taskMonth === 3 && !isMonth3Unlocked) {
      return `Month 3 is locked! Complete and get mentor approval for all ${month2Total} milestones in Month 2 (${month2Approved}/${month2Total} approved).`;
    }
    return null;
  };

  // Filter tasks based on selected tab
  const displayedTasks = selectedMonth === '1' 
    ? month1Tasks 
    : selectedMonth === '2' 
    ? month2Tasks 
    : selectedMonth === '3' 
    ? month3Tasks 
    : tasks;

  const handleMonthTabClick = (tabId) => {
    if (tabId === '2' && !isMonth2Unlocked) {
      showToast(`Month 2 is locked. Complete all ${month1Total} milestones in Month 1 to unlock.`, 'warning');
    } else if (tabId === '3' && !isMonth3Unlocked) {
      showToast(`Month 3 is locked. Complete all ${month2Total} milestones in Month 2 to unlock.`, 'warning');
    }
    setSelectedMonth(tabId);
  };

  const handleOpenSubmitModal = (task) => {
    if (isTaskLocked(task)) {
      showToast(getTaskLockReason(task) || 'This milestone is locked.', 'warning');
      return;
    }

    setActiveTaskModal(task);
    setSubmissionForm({
      submissionLink: task.submissionLink?.startsWith('http') ? task.submissionLink : '',
      notes: task.notes || '',
      fileName: task.fileName || ''
    });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!activeTaskModal) return;

    if (isTaskLocked(activeTaskModal)) {
      showToast(getTaskLockReason(activeTaskModal) || 'This milestone is locked.', 'warning');
      return;
    }

    if (!submissionForm.submissionLink && !submissionForm.fileName) {
      showToast('Please provide a repository/demo URL or upload a project file.', 'warning');
      return;
    }

    submitInternTask(intern.id, activeTaskModal.taskId, {
      submissionLink: submissionForm.submissionLink,
      notes: submissionForm.notes,
      fileName: submissionForm.fileName
    });

    setActiveTaskModal(null);
  };

  const getStatusBadge = (task) => {
    if (isTaskLocked(task)) {
      return (
        <span className="badge" style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Lock size={12} /> Locked
        </span>
      );
    }

    switch (task.status) {
      case 'Approved':
        return <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><CheckCircle2 size={13} /> Approved</span>;
      case 'Submitted':
        return <span className="badge badge-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={13} /> Under Review</span>;
      case 'Needs Revision':
        return <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><AlertCircle size={13} /> Needs Revision</span>;
      default:
        return <span className="badge" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>Pending</span>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', padding: '2.5rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Top Header Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          padding: '2rem 2.5rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: 'var(--badge-blue-bg)',
              color: 'var(--badge-blue-text)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              marginBottom: '0.5rem'
            }}>
              <Layers size={14} /> Official Enrolled Intern Portal · 3-Month Track
            </div>

            <h1 style={{ fontSize: '1.85rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
              {intern.name}
            </h1>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span>Intern ID: <strong style={{ color: 'var(--electric-blue)' }}>{intern.internId}</strong></span>
              <span>•</span>
              <span>Domain: <strong style={{ color: 'var(--primary-navy)' }}>{intern.chosenDomainName || 'Advanced Track'}</strong></span>
              <span>•</span>
              <span>Batch: {intern.internBatch || 'Batch 2026-Q3 (Alpha)'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isCompleted ? (
              <button
                onClick={() => openModal('certificate', intern)}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.75rem', gap: '0.5rem', boxShadow: '0 6px 20px var(--electric-blue-glow)' }}
              >
                <Award size={20} /> View & Download Certificate
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('student-dashboard')}
                className="btn btn-outline btn-sm"
              >
                Back to Student Profile
              </button>
            )}
          </div>
        </div>

        {/* 3-Month Progress & KPI Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Overall 3-Month Progress Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid var(--border-light)',
            padding: '1.5rem 1.75rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={18} color="var(--electric-blue)" />
                <span style={{ fontWeight: 800, color: 'var(--primary-navy)', fontSize: '1rem' }}>Overall 12-Week Progress</span>
              </div>
              <span className={`badge ${isCompleted ? 'badge-success' : 'badge-blue'}`} style={{ fontSize: '0.78rem' }}>
                {isCompleted ? 'Completed' : `${progressPercent}%`}
              </span>
            </div>

            <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              <strong>{approvedTasksCount}</strong> of <strong>{totalTasksCount}</strong> milestones verified & approved
            </div>

            <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: isCompleted ? '#059669' : 'var(--electric-blue)',
                borderRadius: '6px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Month 1 Progress Card */}
          <div 
            onClick={() => handleMonthTabClick('1')}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: selectedMonth === '1' ? '2px solid var(--electric-blue)' : '1px solid var(--border-light)',
              padding: '1.5rem 1.75rem',
              boxShadow: selectedMonth === '1' ? '0 8px 20px rgba(30, 99, 214, 0.12)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                Month 1: Foundations
              </div>
              <span className="badge" style={{ backgroundColor: month1Percent === 100 ? '#DCFCE7' : 'var(--badge-blue-bg)', color: month1Percent === 100 ? '#15803D' : 'var(--electric-blue)', fontSize: '0.74rem', fontWeight: 700 }}>
                {month1Approved}/4 Weeks ({month1Percent}%)
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
              Weeks 1–4: Core modules & fundamental lab deliverables
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${month1Percent}%`, height: '100%', backgroundColor: month1Percent === 100 ? '#059669' : 'var(--electric-blue)', transition: 'width 0.3s' }} />
            </div>
          </div>

          {/* Month 2 Progress Card */}
          <div 
            onClick={() => handleMonthTabClick('2')}
            style={{
              backgroundColor: isMonth2Unlocked ? '#FFFFFF' : '#FAFAFC',
              borderRadius: '16px',
              border: selectedMonth === '2' 
                ? (isMonth2Unlocked ? '2px solid var(--electric-blue)' : '2px solid #F59E0B') 
                : (isMonth2Unlocked ? '1px solid var(--border-light)' : '1px dashed #CBD5E1'),
              padding: '1.5rem 1.75rem',
              boxShadow: selectedMonth === '2' ? '0 8px 20px rgba(30, 99, 214, 0.12)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: isMonth2Unlocked ? 1 : 0.85
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: isMonth2Unlocked ? 'var(--primary-navy)' : '#64748B', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {!isMonth2Unlocked && <Lock size={15} color="#D97706" />}
                Month 2: Advanced Systems
              </div>
              {isMonth2Unlocked ? (
                <span className="badge" style={{ backgroundColor: month2Percent === 100 ? '#DCFCE7' : 'var(--badge-blue-bg)', color: month2Percent === 100 ? '#15803D' : 'var(--electric-blue)', fontSize: '0.74rem', fontWeight: 700 }}>
                  {month2Approved}/4 Weeks ({month2Percent}%)
                </span>
              ) : (
                <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Lock size={11} /> Locked
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.78rem', color: isMonth2Unlocked ? 'var(--text-muted)' : '#B45309', marginBottom: '0.65rem' }}>
              {isMonth2Unlocked ? 'Weeks 5–8: Architecture, microservices & pipelines' : `Requires 100% in Month 1 (${month1Approved}/${month1Total} completed)`}
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${month2Percent}%`, height: '100%', backgroundColor: month2Percent === 100 ? '#059669' : 'var(--electric-blue)', transition: 'width 0.3s' }} />
            </div>
          </div>

          {/* Month 3 Progress Card */}
          <div 
            onClick={() => handleMonthTabClick('3')}
            style={{
              backgroundColor: isMonth3Unlocked ? '#FFFFFF' : '#FAFAFC',
              borderRadius: '16px',
              border: selectedMonth === '3' 
                ? (isMonth3Unlocked ? '2px solid var(--electric-blue)' : '2px solid #F59E0B') 
                : (isMonth3Unlocked ? '1px solid var(--border-light)' : '1px dashed #CBD5E1'),
              padding: '1.5rem 1.75rem',
              boxShadow: selectedMonth === '3' ? '0 8px 20px rgba(30, 99, 214, 0.12)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: isMonth3Unlocked ? 1 : 0.85
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: isMonth3Unlocked ? 'var(--primary-navy)' : '#64748B', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {!isMonth3Unlocked && <Lock size={15} color="#D97706" />}
                Month 3: Capstone & LOR
              </div>
              {isMonth3Unlocked ? (
                <span className="badge" style={{ backgroundColor: month3Percent === 100 ? '#DCFCE7' : 'var(--badge-blue-bg)', color: month3Percent === 100 ? '#15803D' : 'var(--electric-blue)', fontSize: '0.74rem', fontWeight: 700 }}>
                  {month3Approved}/4 Weeks ({month3Percent}%)
                </span>
              ) : (
                <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Lock size={11} /> Locked
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.78rem', color: isMonth3Unlocked ? 'var(--text-muted)' : '#B45309', marginBottom: '0.65rem' }}>
              {isMonth3Unlocked ? 'Weeks 9–12: Cloud deployment, capstone defense & LOR' : `Requires 100% in Month 2 (${month2Approved}/${month2Total} completed)`}
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${month3Percent}%`, height: '100%', backgroundColor: month3Percent === 100 ? '#059669' : 'var(--electric-blue)', transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>

        {/* Month View Navigation Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.75rem'
        }}>
          {[
            { id: 'all', label: `All 3 Months (${approvedTasksCount}/${totalTasksCount} Approved)`, icon: Sparkles },
            { id: '1', label: `Month 1: Weeks 1–4 (${month1Approved}/${month1Total} Approved)`, icon: Calendar },
            { id: '2', label: `Month 2: Weeks 5–8 (${isMonth2Unlocked ? `${month2Approved}/${month2Total} Approved` : 'Locked'})`, icon: isMonth2Unlocked ? Calendar : Lock },
            { id: '3', label: `Month 3: Weeks 9–12 (${isMonth3Unlocked ? `${month3Approved}/${month3Total} Approved` : 'Locked'})`, icon: isMonth3Unlocked ? Calendar : Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedMonth === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleMonthTabClick(tab.id)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '12px',
                  border: isActive ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                  backgroundColor: isActive ? 'var(--electric-blue)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--primary-navy)',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 14px rgba(30, 99, 214, 0.25)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Locked Month Notification Banner if active view is a locked month */}
        {selectedMonth === '2' && !isMonth2Unlocked && (
          <div style={{
            backgroundColor: '#FEF3C7',
            border: '1.5px solid #FCD34D',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#FDE68A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Lock size={22} color="#B45309" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', color: '#92400E', fontWeight: 800, marginBottom: '0.2rem' }}>
                  Month 2: Advanced Systems is Locked
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#B45309', margin: 0 }}>
                  You must complete all 4 milestones in Month 1 and receive mentor approval before Month 2 access opens. (Current: <strong>{month1Approved}/{month1Total} Approved</strong>)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMonth('1')}
              className="btn btn-sm"
              style={{ backgroundColor: '#D97706', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '0.5rem 1.1rem', fontWeight: 700 }}
            >
              Complete Month 1 Milestones →
            </button>
          </div>
        )}

        {selectedMonth === '3' && !isMonth3Unlocked && (
          <div style={{
            backgroundColor: '#FEF3C7',
            border: '1.5px solid #FCD34D',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#FDE68A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Lock size={22} color="#B45309" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', color: '#92400E', fontWeight: 800, marginBottom: '0.2rem' }}>
                  Month 3: Capstone & LOR is Locked
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#B45309', margin: 0 }}>
                  You must complete all 4 milestones in Month 2 and receive mentor approval before Month 3 access opens. (Current: <strong>{month2Approved}/{month2Total} Approved</strong>)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMonth(isMonth2Unlocked ? '2' : '1')}
              className="btn btn-sm"
              style={{ backgroundColor: '#D97706', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '0.5rem 1.1rem', fontWeight: 700 }}
            >
              Go to {isMonth2Unlocked ? 'Month 2' : 'Month 1'} Deliverables →
            </button>
          </div>
        )}

        {/* Deliverables Task Roadmap */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
              {selectedMonth === '1' && 'Month 1 Deliverables: Core Engineering Foundations'}
              {selectedMonth === '2' && 'Month 2 Deliverables: Advanced Systems & Distributed Architecture'}
              {selectedMonth === '3' && 'Month 3 Deliverables: Enterprise Capstone & Mentor Defense'}
              {selectedMonth === 'all' && 'Complete 12-Week Milestone Deliverables'}
            </h2>

            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Showing {displayedTasks.length} milestones
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {displayedTasks.map((task, idx) => {
              const weekNum = task.week || idx + 1;
              const taskMonth = task.month || (weekNum <= 4 ? 1 : weekNum <= 8 ? 2 : 3);
              const locked = isTaskLocked(task);

              return (
                <div
                  key={task.taskId || idx}
                  style={{
                    backgroundColor: locked ? '#F8FAFC' : '#FFFFFF',
                    borderRadius: '18px',
                    border: locked 
                      ? '1.5px dashed #CBD5E1' 
                      : task.status === 'Approved' 
                      ? '1.5px solid #BBF7D0' 
                      : '1px solid var(--border-light)',
                    padding: '1.75rem',
                    boxShadow: locked ? 'none' : 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    transition: 'all 0.2s ease',
                    opacity: locked ? 0.88 : 1
                  }}
                >
                  {/* Task Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      {/* Week Badge */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: locked 
                          ? '#F1F5F9' 
                          : task.status === 'Approved' 
                          ? '#ECFDF5' 
                          : 'var(--badge-blue-bg)',
                        color: locked 
                          ? '#64748B' 
                          : task.status === 'Approved' 
                          ? '#059669' 
                          : 'var(--electric-blue)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        flexShrink: 0,
                        border: locked 
                          ? '1px solid #E2E8F0' 
                          : task.status === 'Approved' 
                          ? '1px solid #A7F3D0' 
                          : '1px solid rgba(30, 99, 214, 0.15)'
                      }}>
                        {locked ? (
                          <>
                            <Lock size={15} color="#94A3B8" />
                            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94A3B8' }}>W{weekNum}</span>
                          </>
                        ) : (
                          <>
                            <span>W{weekNum}</span>
                            <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--text-muted)' }}>M{taskMonth}</span>
                          </>
                        )}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <span style={{ 
                            fontSize: '0.72rem', 
                            fontWeight: 700, 
                            color: locked ? '#94A3B8' : 'var(--electric-blue)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.3px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}>
                            {locked && <Lock size={12} />}
                            Month {taskMonth} · Week {weekNum} Deliverable
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.18rem', color: locked ? '#475569' : 'var(--primary-navy)', fontWeight: 700 }}>
                          {task.title}
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: locked ? '#64748B' : 'var(--text-body)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      {getStatusBadge(task)}
                    </div>
                  </div>

                  {/* Locked Prerequisite Notice Banner inside Card */}
                  {locked && (
                    <div style={{
                      backgroundColor: '#FEF3C7',
                      border: '1px solid #FDE68A',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.82rem',
                      color: '#92400E',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem'
                    }}>
                      <Lock size={15} color="#D97706" style={{ flexShrink: 0 }} />
                      <span>
                        <strong>Prerequisite Required:</strong> Complete and get mentor approval for all 4 milestones in <strong>Month {taskMonth - 1}</strong> to unlock this deliverable.
                      </span>
                    </div>
                  )}

                  {/* Required Deliverables Guide Box */}
                  {task.requiredDeliverables && (
                    <div style={{
                      backgroundColor: locked ? '#F1F5F9' : 'var(--bg-subtle)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.95rem',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: locked ? '#64748B' : 'var(--primary-navy)',
                      border: '1px solid var(--border-light)'
                    }}>
                      <FolderArchive size={15} color={locked ? '#94A3B8' : 'var(--electric-blue)'} style={{ flexShrink: 0 }} />
                      <span><strong>Expected Output:</strong> {task.requiredDeliverables}</span>
                    </div>
                  )}

                  {/* Submissions & Mentor Comments */}
                  {!locked && task.submissionLink && (
                    <div style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: '10px',
                      padding: '0.9rem 1.1rem',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-light)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                        <LinkIcon size={14} color="var(--electric-blue)" />
                        <strong>Submitted Deliverable:</strong>
                        {task.submissionLink.startsWith('http') ? (
                          <a href={task.submissionLink} target="_blank" rel="noreferrer" style={{ color: 'var(--electric-blue)', textDecoration: 'underline', fontWeight: 600 }}>
                            {task.submissionLink} <ExternalLink size={12} style={{ display: 'inline' }} />
                          </a>
                        ) : (
                          <span>{task.submissionLink}</span>
                        )}
                      </div>
                      {task.notes && (
                        <div style={{ color: 'var(--text-body)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                          <strong>Remarks:</strong> {task.notes}
                        </div>
                      )}
                      {task.submittedAt && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          Submitted on {new Date(task.submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </div>
                      )}
                    </div>
                  )}

                  {!locked && task.mentorFeedback && (
                    <div style={{
                      backgroundColor: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      borderRadius: '10px',
                      padding: '0.85rem 1.1rem',
                      fontSize: '0.85rem',
                      color: '#065F46',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}>
                      <MessageSquare size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Senior Mentor Review:</strong> {task.mentorFeedback}
                      </div>
                    </div>
                  )}

                  {/* Submit / Re-submit Action */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                    {locked ? (
                      <button
                        disabled
                        type="button"
                        className="btn btn-sm"
                        style={{
                          borderRadius: '10px',
                          padding: '0.55rem 1.15rem',
                          backgroundColor: '#E2E8F0',
                          color: '#94A3B8',
                          border: '1px solid #CBD5E1',
                          cursor: 'not-allowed',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontWeight: 600,
                          fontSize: '0.82rem'
                        }}
                      >
                        <Lock size={14} /> Locked (Requires Month {taskMonth - 1} Completion)
                      </button>
                    ) : task.status !== 'Approved' ? (
                      <button
                        onClick={() => handleOpenSubmitModal(task)}
                        className="btn btn-outline-blue btn-sm"
                        style={{ borderRadius: '10px', padding: '0.55rem 1.1rem' }}
                      >
                        <Upload size={14} />
                        {task.status === 'Submitted' ? 'Update Submission' : task.status === 'Needs Revision' ? 'Re-submit Deliverable' : 'Submit Project Work'}
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700 }}>
                        <CheckCircle2 size={16} /> Deliverable Approved
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Submission Modal */}
      {activeTaskModal && (
        <div className="modal-backdrop" onClick={() => setActiveTaskModal(null)}>
          <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                Submit Deliverable: Month {activeTaskModal.month || (activeTaskModal.week <= 4 ? 1 : activeTaskModal.week <= 8 ? 2 : 3)} · Week {activeTaskModal.week}
              </h3>
            </div>

            <div className="modal-body" style={{ padding: '1.75rem 2rem' }}>
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                fontSize: '0.88rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--primary-navy)', fontSize: '0.98rem' }}>{activeTaskModal.title}</div>
                <div style={{ color: 'var(--text-body)', fontSize: '0.84rem', marginTop: '0.35rem', lineHeight: 1.5 }}>{activeTaskModal.description}</div>
                {activeTaskModal.requiredDeliverables && (
                  <div style={{ color: 'var(--electric-blue)', fontSize: '0.78rem', marginTop: '0.5rem', fontWeight: 600 }}>
                    Expected: {activeTaskModal.requiredDeliverables}
                  </div>
                )}
              </div>

              <form onSubmit={handleTaskSubmit}>
                <div className="form-group">
                  <label className="form-label">Project URL (GitHub Repository, Live Demo, or Google Drive)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/your-username/project-repo"
                    className="form-input"
                    value={submissionForm.submissionLink}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, submissionLink: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Or Upload File (ZIP, PDF, Code Archives - Max 50MB)</label>
                  <input
                    type="file"
                    className="form-input"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSubmissionForm({ ...submissionForm, fileName: e.target.files[0].name });
                      }
                    }}
                  />
                  {submissionForm.fileName && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--electric-blue)', marginTop: '0.35rem', fontWeight: 600 }}>
                      Selected: {submissionForm.fileName}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Submission Notes / Summary of Work</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you built, architecture decisions, test coverage, or benchmark results..."
                    className="form-textarea"
                    value={submissionForm.notes}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, notes: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTaskModal(null)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ gap: '0.5rem', borderRadius: '10px' }}
                  >
                    <Upload size={16} /> Submit Deliverable
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
