import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';
import CandidateManagement from './CandidateManagement';
import ExamManagement from './ExamManagement';
import DomainManagement from './DomainManagement';
import InternTaskReview from './InternTaskReview';
import CompanyManagement from './CompanyManagement';
import InquiryManagement from './InquiryManagement';
import ContentManagement from './ContentManagement';
import UserAccessManagement from './UserAccessManagement';
import {
  Users,
  FileQuestion,
  Layers,
  CheckSquare,
  Building2,
  MessageSquare,
  Quote,
  ShieldCheck,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function AdminLayout() {
  const { currentUser, userRole, logout, setCurrentView, companies, inquiries } = useApp();
  const [adminTab, setAdminTab] = useState('candidates');
  // 'candidates' | 'inquiries' | 'exam' | 'domains' | 'intern-tasks' | 'companies' | 'content' | 'access'

  const pendingInquiriesCount = useMemo(() => {
    return inquiries ? inquiries.filter(i => i.status === 'Pending').length : 0;
  }, [inquiries]);

  if (!currentUser || (userRole !== 'superadmin' && userRole !== 'staffadmin')) {
    return (
      <div className="container section-py" style={{ textAlign: 'center' }}>
        <h2>Restricted Area. Admin Login Required.</h2>
        <button onClick={() => setCurrentView('landing')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Return to Home
        </button>
      </div>
    );
  }

  const isSuperAdmin = userRole === 'superadmin';

  const navItems = [
    { id: 'candidates', label: 'Candidates & Test Roster', icon: <Users size={18} /> },
    {
      id: 'inquiries',
      label: 'Admissions Inquiries',
      icon: <MessageSquare size={18} />,
      count: pendingInquiriesCount > 0 ? `${pendingInquiriesCount} new` : (inquiries?.length || 0),
      isAlert: pendingInquiriesCount > 0
    },
    { id: 'exam', label: 'Exam & Question Bank', icon: <FileQuestion size={18} /> },
    { id: 'domains', label: 'Internship Domains', icon: <Layers size={18} /> },
    { id: 'intern-tasks', label: 'Intern Submissions & Tasks', icon: <CheckSquare size={18} /> },
    { id: 'companies', label: 'Partner Companies & Logos', icon: <Building2 size={18} />, count: companies?.length || 0 },
    { id: 'content', label: 'Landing Page Content', icon: <Quote size={18} /> },
    { id: 'access', label: 'Admin Access & Audit', icon: <ShieldCheck size={18} /> }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Topbar */}
      <header style={{
        backgroundColor: 'var(--primary-navy)',
        color: '#FFFFFF',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 500,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Logo size="sm" showTagline={false} variant="light" />
          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF' }}>
              Operations Console
            </span>
            <span className="badge" style={{ backgroundColor: isSuperAdmin ? '#38BDF8' : '#DCEBFF', color: '#0B1E3D', fontWeight: 800, fontSize: '0.72rem' }}>
              {isSuperAdmin ? 'Super Admin' : 'Staff Admin'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }} className="admin-user-info">
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.74rem', color: '#93C5FD' }}>{currentUser.email}</div>
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('landing')}
            className="btn btn-outline btn-sm"
            style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: '#FFFFFF' }}
          >
            <ExternalLink size={14} /> View Live Site
          </button>

          <button
            type="button"
            onClick={logout}
            className="btn btn-ghost btn-sm"
            style={{ color: '#F87171', padding: '0.4rem 0.75rem' }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px minmax(0, 1fr)', minHeight: 'calc(100vh - 65px)' }}>
        {/* Sidebar */}
        <aside style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--border-light)',
          padding: '1.75rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 0.75rem 0.5rem 0.75rem', letterSpacing: '0.5px' }}>
            Portal Modules
          </div>

          {navItems.map((item) => {
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAdminTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--badge-blue-bg)' : 'transparent',
                  color: isActive ? 'var(--electric-blue)' : 'var(--text-body)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {item.icon}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.count !== undefined && (
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: item.isAlert ? '#F59E0B' : (isActive ? 'var(--electric-blue)' : 'var(--bg-subtle)'),
                    color: item.isAlert ? '#FFFFFF' : (isActive ? '#FFFFFF' : 'var(--text-muted)'),
                    padding: '0.15rem 0.45rem',
                    borderRadius: '10px'
                  }}>
                    {item.count}
                  </span>
                )}
                {isActive && <ChevronRight size={14} />}
              </button>
            );
          })}
        </aside>

        {/* Workspace Body */}
        <main style={{ padding: '2.5rem', overflowY: 'auto' }}>
          {adminTab === 'candidates' && <CandidateManagement />}
          {adminTab === 'inquiries' && <InquiryManagement />}
          {adminTab === 'exam' && <ExamManagement />}
          {adminTab === 'domains' && <DomainManagement />}
          {adminTab === 'intern-tasks' && <InternTaskReview />}
          {adminTab === 'companies' && <CompanyManagement />}
          {adminTab === 'content' && <ContentManagement />}
          {adminTab === 'access' && <UserAccessManagement />}
        </main>
      </div>
    </div>
  );
}
