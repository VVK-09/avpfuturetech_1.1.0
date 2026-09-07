import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import CertificateModal from './components/common/CertificateModal';
import WebsitePreloader from './components/common/WebsitePreloader';

// Landing Page Sections
import HeroSection from './components/landing/HeroSection';
import TestBannerSection from './components/landing/TestBannerSection';
import WhatWeOfferSection from './components/landing/WhatWeOfferSection';
import DomainGridSection from './components/landing/DomainGridSection';
import CompanyMarqueeSection from './components/landing/CompanyMarqueeSection';
import TestimonialsSection from './components/landing/TestimonialsSection';
import FAQContactSection from './components/landing/FAQContactSection';
import SyllabusModal from './components/landing/SyllabusModal';
import AllDomainsView from './components/landing/AllDomainsView';

// Auth Modals
import StudentLoginModal from './components/auth/StudentLoginModal';
import AdminLoginModal from './components/auth/AdminLoginModal';

// Test Funnel Views
import RegistrationModal from './components/test/RegistrationModal';
import TestInstructionsView from './components/test/TestInstructionsView';
import MCQTestView from './components/test/MCQTestView';
import AntiCheatWarningModal from './components/test/AntiCheatWarningModal';
import PostTestPreferenceView from './components/test/PostTestPreferenceView';

// Student & Intern Dashboards
import StudentDashboard from './components/student/StudentDashboard';
import EnrolledInternDashboard from './components/student/EnrolledInternDashboard';
import PaymentModal from './components/student/PaymentModal';

// Verification View
import VerificationView from './components/verify/VerificationView';

// Admin Portal
import AdminLayout from './components/admin/AdminLayout';

export default function App() {
  const { currentView, verifyQueryId } = useApp();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Website 2-Second Initial Preloader */}
      <WebsitePreloader />

      {/* Global Notifications & Modals */}
      <Toast />
      <RegistrationModal />
      <StudentLoginModal />
      <AdminLoginModal />
      <SyllabusModal />
      <PaymentModal />
      <CertificateModal />
      <AntiCheatWarningModal />

      {/* Main View Router */}
      {currentView === 'landing' && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <TestBannerSection />
            <WhatWeOfferSection />
            <DomainGridSection />
            <CompanyMarqueeSection />
            <TestimonialsSection />
            <FAQContactSection />
          </main>
          <Footer />
        </>
      )}

      {currentView === 'all-domains' && (
        <>
          <Navbar />
          <AllDomainsView />
          <Footer />
        </>
      )}

      {currentView === 'instructions' && <TestInstructionsView />}

      {currentView === 'test' && <MCQTestView />}

      {currentView === 'post-test' && <PostTestPreferenceView />}

      {currentView === 'student-dashboard' && (
        <>
          <Navbar />
          <StudentDashboard />
          <Footer />
        </>
      )}

      {currentView === 'intern-dashboard' && (
        <>
          <Navbar />
          <EnrolledInternDashboard />
          <Footer />
        </>
      )}

      {currentView === 'verify' && (
        <>
          <Navbar />
          <main>
            <VerificationView initialQuery={verifyQueryId} />
          </main>
          <Footer />
        </>
      )}

      {currentView === 'admin-dashboard' && <AdminLayout />}
    </div>
  );
}
