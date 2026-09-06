import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from './Logo';
import {
  LogIn,
  User,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Award,
  LayoutDashboard,
  LogOut,
  Sparkles,
  ArrowRight,
  Zap,
  Users,
  Compass,
  Phone,
  Home,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function Navbar() {
  const { currentView, setCurrentView, currentUser, userRole, logout, openModal } = useApp();
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    setMobileMenuOpen(false);
    openModal('register');
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'what-we-offer', label: 'What We Offer', icon: Sparkles },
    { id: 'domains', label: 'Domains', badge: '6 Tracks', icon: Compass },
    { id: 'students-placed', label: 'Our Students', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: Award },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <header className="site-header">
      {/* Top Ambient Announcement Ticker Bar */}
      <div 
        className="top-announcement-bar"
        onClick={handleRegisterClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRegisterClick(); }}
      >
        {/* Desktop Centered Content */}
        <div className="announcement-desktop-wrap">
          <div className="cohort-pill">
            <Sparkles size={12} /> 2026 COHORT
          </div>
          <span className="announcement-text">
            Aptitude Test Registration Live — Score 80%+ to unlock <strong style={{ color: '#FFFFFF' }}>₹699 Merit Pricing</strong> (Save ₹5,300)
          </span>
          <span className="announcement-cta">
            Register Now <ArrowRight size={13} />
          </span>
        </div>

        {/* Mobile Centered Content */}
        <div className="announcement-mobile-wrap">
          <div className="cohort-pill-mobile">
            <Zap size={11} /> 2026 COHORT
          </div>
          <span className="announcement-text-mobile">
            Score 80%+ for <strong>₹699 Merit Rate</strong>
          </span>
          <span className="announcement-cta-mobile">
            Register <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div className="main-navbar-bar">
        <div className="main-navbar-container">

          {/* Left: Brand Logo */}
          <div
            onClick={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="brand-logo-btn"
          >
            <div className="desktop-logo">
              <Logo size="md" />
            </div>
            <div className="mobile-logo">
              <Logo size="sm" />
            </div>
          </div>

          {/* Center: Desktop Navigation Links (>= 960px) */}
          <nav className="desktop-nav-menu">
            {navItems.map(item => {
              const isActive = activeSection === item.id && currentView === 'landing';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="desktop-nav-badge">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Desktop Action Cluster (>= 960px) */}
          <div className="desktop-actions-wrap">
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {userRole === 'student' ? (
                  <button
                    onClick={() => setCurrentView(currentUser.isEnrolled ? 'intern-dashboard' : 'student-dashboard')}
                    className="btn btn-navy btn-sm"
                    style={{
                      borderRadius: '10px',
                      padding: '0.52rem 1.1rem',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(11, 30, 61, 0.15)'
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                    <LayoutDashboard size={15} />
                    {currentUser.isEnrolled ? 'Intern Portal' : 'Student Dashboard'}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentView('admin-dashboard')}
                    className="btn btn-navy btn-sm"
                    style={{
                      borderRadius: '10px',
                      padding: '0.52rem 1.1rem',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(11, 30, 61, 0.15)'
                    }}
                  >
                    <ShieldCheck size={16} color="#38BDF8" />
                    Admin Console
                  </button>
                )}

                <button
                  onClick={logout}
                  className="btn btn-ghost btn-sm"
                  title="Log Out"
                  style={{
                    padding: '0.52rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#EF4444';
                    e.currentTarget.style.color = '#EF4444';
                    e.currentTarget.style.backgroundColor = '#FEF2F2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Main Website Link */}
                <a
                  href="/"
                  className="btn btn-outline btn-sm"
                  style={{
                    borderRadius: '10px',
                    padding: '0.52rem 0.9rem',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-primary)',
                    border: '1.5px solid var(--border-light)'
                  }}
                >
                  <Home size={14} color="var(--electric-blue)" />
                  <span>Main Website</span>
                </a>

                {/* Login Dropdown */}
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <button
                    onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                    className="desktop-login-toggle"
                  >
                    <LogIn size={15} color="var(--electric-blue)" />
                    <span>Login</span>
                    <ChevronDown size={13} style={{ transform: loginDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                  </button>

                  {loginDropdownOpen && (
                    <div className="login-menu-card">
                      <button
                        onClick={() => {
                          setLoginDropdownOpen(false);
                          openModal('student-login');
                        }}
                        className="login-menu-row"
                      >
                        <div className="login-menu-icon-wrap blue">
                          <User size={16} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Student Login</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>Scorecard & Intern Portal</div>
                        </div>
                      </button>

                      <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '0.35rem 0' }} />

                      <button
                        onClick={() => {
                          setLoginDropdownOpen(false);
                          openModal('admin-login');
                        }}
                        className="login-menu-row"
                      >
                        <div className="login-menu-icon-wrap navy">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Admin Console</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>Evaluation & Operations</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Radiant Primary Register Button */}
                <button
                  onClick={handleRegisterClick}
                  className="btn btn-primary"
                  style={{
                    padding: '0.55rem 1.35rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    borderRadius: '10px',
                    boxShadow: '0 4px 14px rgba(30, 99, 214, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    letterSpacing: '0.1px'
                  }}
                >
                  <span>Register for Test</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Mobile Hamburger Button ONLY (< 960px) */}
          <div className="mobile-actions-wrap">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-menu-trigger"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </div>

      {/* Modern Slide-In Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="drawer-header-row">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Logo size="sm" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="drawer-close-circle"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Account / Promo Card */}
            <div className="drawer-account-section">
              {currentUser ? (
                <div className="drawer-auth-card">
                  <div className="drawer-user-meta">
                    <div className="drawer-avatar-circle">
                      {userRole === 'superadmin' || userRole === 'staffadmin' ? (
                        <ShieldCheck size={20} color="#38BDF8" />
                      ) : (
                        <GraduationCap size={20} color="var(--electric-blue)" />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="drawer-role-tag">
                        {userRole === 'superadmin' ? 'SUPER ADMINISTRATOR' : userRole === 'staffadmin' ? 'STAFF ADMIN' : currentUser.isEnrolled ? 'ENROLLED INTERN' : 'REGISTERED STUDENT'}
                      </div>
                      <div className="drawer-name-text">
                        {currentUser.name || currentUser.fullName || currentUser.email}
                      </div>
                      <div className="drawer-online-status">
                        <span className="pulse-green-dot" /> Active Session
                      </div>
                    </div>
                  </div>

                  <div className="drawer-auth-btns">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (userRole === 'student') {
                          setCurrentView(currentUser.isEnrolled ? 'intern-dashboard' : 'student-dashboard');
                        } else {
                          setCurrentView('admin-dashboard');
                        }
                      }}
                      className="btn btn-navy btn-block"
                      style={{ borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, padding: '0.7rem 1rem' }}
                    >
                      <LayoutDashboard size={16} />
                      {userRole === 'student' ? (currentUser.isEnrolled ? 'Open Intern Portal' : 'Open Student Dashboard') : 'Open Admin Console'}
                      <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="btn btn-ghost btn-block drawer-signout-btn"
                    >
                      <LogOut size={15} /> Log Out Account
                    </button>
                  </div>
                </div>
              ) : (
                <div className="drawer-promo-card">
                  <div className="drawer-promo-pill">
                    <Sparkles size={12} /> 2026 Batch Test Live
                  </div>
                  <div className="drawer-promo-heading">
                    Score 80%+ to unlock <strong>₹699 Merit Pricing</strong>
                  </div>

                  <button
                    onClick={handleRegisterClick}
                    className="btn btn-primary btn-block"
                    style={{ borderRadius: '10px', fontWeight: 800, padding: '0.8rem', fontSize: '0.92rem', boxShadow: '0 4px 14px rgba(30, 99, 214, 0.3)' }}
                  >
                    <span>Register for Test</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="drawer-login-grid">
                    <button
                      onClick={() => { setMobileMenuOpen(false); openModal('student-login'); }}
                      className="drawer-login-chip"
                    >
                      <User size={15} color="var(--electric-blue)" />
                      <span>Student Login</span>
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); openModal('admin-login'); }}
                      className="drawer-login-chip"
                    >
                      <ShieldCheck size={15} color="var(--primary-navy)" />
                      <span>Admin Console</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Section Title */}
            <div className="drawer-nav-header">NAVIGATION</div>

            {/* Navigation Links */}
            <div className="drawer-links-scroll">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id && currentView === 'landing';
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`drawer-link-row ${isActive ? 'active' : ''}`}
                  >
                    <div className="drawer-link-icon">
                      <IconComponent size={18} />
                    </div>
                    <span className="drawer-link-label">{item.label}</span>
                    {item.badge && (
                      <span className="desktop-nav-badge">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={15} className="drawer-chevron" />
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="drawer-footer-bar">
              <div className="drawer-phone-help">
                <Phone size={14} color="var(--electric-blue)" />
                <span>Admissions Desk: <strong>+91 98765 43210</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Embedded High-Performance Responsive Styles */}
      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 500;
          width: 100%;
        }

        /* Top Announcement Bar */
        .top-announcement-bar {
          background: linear-gradient(90deg, #07152B 0%, #0B1E3D 35%, #153364 70%, #07152B 100%);
          color: #FFFFFF;
          border-bottom: 1px solid rgba(56, 189, 248, 0.15);
          cursor: pointer;
          user-select: none;
          width: 100%;
          transition: background 0.2s ease;
        }
        .top-announcement-bar:hover {
          background: linear-gradient(90deg, #0B1E3D 0%, #153364 50%, #0B1E3D 100%);
        }

        .announcement-desktop-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.45rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.2px;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }

        .announcement-mobile-wrap {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.4rem 0.85rem;
          font-size: 0.75rem;
          font-weight: 600;
          width: 100%;
        }

        .cohort-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: rgba(56, 189, 248, 0.2);
          color: #38BDF8;
          padding: 0.15rem 0.55rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 800;
          flex-shrink: 0;
        }

        .cohort-pill-mobile {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background-color: rgba(56, 189, 248, 0.2);
          color: #38BDF8;
          padding: 0.12rem 0.45rem;
          border-radius: 9999px;
          font-size: 0.68rem;
          font-weight: 800;
          flex-shrink: 0;
        }

        .announcement-text {
          color: #E2E8F0;
        }
        .announcement-text-mobile {
          color: #E2E8F0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .announcement-cta {
          color: #38BDF8;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          text-decoration: underline;
          flex-shrink: 0;
        }
        .announcement-cta-mobile {
          color: #38BDF8;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.15rem;
          flex-shrink: 0;
        }

        /* Main Navbar Bar */
        .main-navbar-bar {
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 20px -2px rgba(11, 30, 61, 0.05);
          width: 100%;
        }

        .main-navbar-container {
          max-width: 1320px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 74px;
        }

        /* Brand Logo */
        .brand-logo-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .brand-logo-btn:hover {
          transform: scale(1.02);
        }

        .desktop-logo {
          display: block;
        }
        .mobile-logo {
          display: none;
        }

        /* Desktop Nav Menu */
        .desktop-nav-menu {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .desktop-nav-link {
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.5rem 0.85rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background-color: transparent;
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }
        .desktop-nav-link:hover {
          background-color: rgba(30, 99, 214, 0.06);
          color: var(--electric-blue);
        }
        .desktop-nav-link.active {
          background-color: var(--badge-blue-bg);
          color: var(--electric-blue);
          font-weight: 700;
        }

        .desktop-nav-badge {
          font-size: 0.68rem;
          font-weight: 800;
          background-color: rgba(30, 99, 214, 0.1);
          color: var(--electric-blue);
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          line-height: 1;
        }

        /* Desktop Actions Wrap */
        .desktop-actions-wrap {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-shrink: 0;
        }

        .desktop-login-toggle {
          padding: 0.52rem 1.05rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--primary-navy);
          background-color: #FFFFFF;
          border: 1.5px solid var(--border-light);
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(11, 30, 61, 0.03);
          transition: all 0.2s ease;
        }
        .desktop-login-toggle:hover {
          border-color: var(--electric-blue);
          color: var(--electric-blue);
          background-color: var(--badge-blue-bg);
        }

        .login-menu-card {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 230px;
          background-color: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 15px 35px -5px rgba(11, 30, 61, 0.18), 0 4px 12px rgba(0,0,0,0.05);
          border: 1.5px solid var(--border-light);
          padding: 0.6rem;
          z-index: 600;
          animation: slideUpFade 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-menu-row {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.85rem;
          border: none;
          background: transparent;
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          font-size: 0.88rem;
          transition: all 0.15s ease;
        }
        .login-menu-row:hover {
          background-color: var(--badge-blue-bg);
        }

        .login-menu-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .login-menu-icon-wrap.blue {
          background-color: var(--badge-blue-bg);
          color: var(--electric-blue);
        }
        .login-menu-icon-wrap.navy {
          background-color: rgba(11, 30, 61, 0.08);
          color: var(--primary-navy);
        }

        /* Mobile Actions Wrap */
        .mobile-actions-wrap {
          display: none;
          align-items: center;
        }

        .mobile-menu-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1.5px solid var(--border-light);
          background-color: #FFFFFF;
          color: var(--primary-navy);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(11, 30, 61, 0.04);
          transition: all 0.2s ease;
        }
        .mobile-menu-trigger:active {
          background-color: var(--bg-subtle);
          transform: scale(0.94);
        }

        /* Mobile Drawer */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(7, 21, 43, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease-out;
        }

        .mobile-drawer-content {
          width: 100%;
          max-width: 340px;
          height: 100%;
          background-color: #FFFFFF;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          animation: slideDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .drawer-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light);
        }

        .drawer-close-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background-color: var(--bg-subtle);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .drawer-close-circle:active {
          background-color: #E2E8F0;
        }

        .drawer-account-section {
          padding: 1rem 1.25rem;
          background-color: var(--bg-page);
          border-bottom: 1px solid var(--border-light);
        }

        .drawer-auth-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .drawer-user-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .drawer-avatar-circle {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .drawer-role-tag {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--electric-blue);
          letter-spacing: 0.5px;
        }

        .drawer-name-text {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--primary-navy);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .drawer-online-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: #10B981;
          font-weight: 600;
          margin-top: 0.15rem;
        }

        .pulse-green-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 6px #10B981;
        }

        .drawer-auth-btns {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-top: 0.25rem;
        }

        .drawer-signout-btn {
          border-radius: 10px;
          font-size: 0.84rem;
          font-weight: 600;
          color: #EF4444;
          padding: 0.55rem;
        }
        .drawer-signout-btn:hover {
          background-color: #FEF2F2;
        }

        .drawer-promo-card {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .drawer-promo-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--electric-blue);
          text-transform: uppercase;
        }

        .drawer-promo-heading {
          font-size: 0.84rem;
          color: var(--text-body);
          line-height: 1.35;
        }

        .drawer-login-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: 0.2rem;
        }

        .drawer-login-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.55rem 0.5rem;
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .drawer-login-chip:active {
          background-color: var(--bg-subtle);
        }

        .drawer-nav-header {
          padding: 1rem 1.25rem 0.4rem 1.25rem;
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--text-light);
          letter-spacing: 0.8px;
        }

        .drawer-links-scroll {
          display: flex;
          flex-direction: column;
          padding: 0 0.75rem;
          flex: 1;
        }

        .drawer-link-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 0.75rem;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.18s ease;
        }
        .drawer-link-row:hover {
          background-color: var(--bg-subtle);
          color: var(--electric-blue);
        }
        .drawer-link-row.active {
          background-color: var(--badge-blue-bg);
          color: var(--electric-blue);
          font-weight: 700;
        }

        .drawer-link-icon {
          color: inherit;
          display: flex;
          align-items: center;
        }

        .drawer-link-label {
          flex: 1;
        }

        .drawer-chevron {
          color: var(--text-light);
          transition: transform 0.2s ease;
        }
        .drawer-link-row:hover .drawer-chevron {
          transform: translateX(2px);
          color: var(--electric-blue);
        }

        .drawer-footer-bar {
          padding: 1rem 1.25rem;
          border-top: 1px solid var(--border-light);
          background-color: var(--bg-page);
        }

        .drawer-phone-help {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Keyframes */
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDrawer {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Breakpoints */
        @media (max-width: 959px) {
          .desktop-nav-menu {
            display: none !important;
          }
          .desktop-actions-wrap {
            display: none !important;
          }
          .mobile-actions-wrap {
            display: flex !important;
          }
          .desktop-logo {
            display: none !important;
          }
          .mobile-logo {
            display: block !important;
          }
          .main-navbar-container {
            height: 62px !important;
            padding: 0 1rem !important;
          }
        }

        @media (max-width: 767px) {
          .announcement-desktop-wrap {
            display: none !important;
          }
          .announcement-mobile-wrap {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
