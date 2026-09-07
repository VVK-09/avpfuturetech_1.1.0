import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialQuestions } from '../data/initialQuestions';
import { initialDomains } from '../data/initialDomains';
import { initialTestimonials } from '../data/initialTestimonials';
import { initialCompanies } from '../data/initialCompanies';
import { initialInquiries } from '../data/initialInquiries';
import { initialStudents, initialAdmins, initialInternTemplates, generate12WeekTasksForDomain } from '../data/initialInternTasks';
import { sendEmailOtp, verifyEmailOtp, clearEmailOtp } from '../services/emailOtpService';
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../config/firebase';
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc
} from 'firebase/firestore';

const AppContext = createContext();

const safeGet = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const safeGetRaw = (key, fallback = '') => {
  if (typeof window === 'undefined') return fallback;
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const safeSet = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch { }
};

const safeRemove = (key) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch { }
};

export function AppProvider({ children, initialView = 'landing', initialVerifyId = '' }) {
  // Navigation View State
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.pathname.includes('/verify') || url.searchParams.get('view') === 'verify' || url.searchParams.get('id')) {
        return 'verify';
      }
      if (url.pathname.includes('/domains') || url.searchParams.get('view') === 'all-domains' || url.searchParams.get('view') === 'domains') {
        return 'all-domains';
      }
    }
    return initialView || 'landing';
  });

  const [verifyQueryId, setVerifyQueryId] = useState(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      return url.searchParams.get('id') || initialVerifyId || '';
    }
    return initialVerifyId || '';
  });

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const parsed = safeGet('avp_current_user', null);
    if (!parsed) return null;
    try {
      if (parsed && parsed.isEnrolled) {
        const fullTemplate = generate12WeekTasksForDomain(parsed.chosenDomainId);
        const existingTasks = parsed.tasks || [];
        const mergedTasks = fullTemplate.map((t) => {
          const existing = existingTasks.find(et => et.taskId === t.taskId || et.week === t.week);
          return existing ? { ...t, ...existing } : t;
        });
        return {
          ...parsed,
          tasks: mergedTasks
        };
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const [userRole, setUserRole] = useState(() => {
    return safeGetRaw('avp_user_role', 'guest');
  });

  // Data Store with LocalStorage Persistence
  const [questions, setQuestions] = useState(() => {
    return safeGet('avp_questions', initialQuestions);
  });

  const [domains, setDomains] = useState(() => {
    const normalizeCat = (cat) => {
      if (!cat) return 'Computer Science & IT';
      if (cat === 'AI & Data') return 'Artificial Intelligence & Data';
      if (cat === 'Full Stack' || cat === 'Mobile App') return 'Computer Science & IT';
      return cat;
    };

    const parsed = safeGet('avp_domains', null);
    if (!parsed) return initialDomains;
    try {
      return parsed.map(d => {
        const init = initialDomains.find(item => item.id === d.id);
        const mapped = init ? {
          ...init,
          ...d,
          image: d.image || init.image,
          perks: d.perks || init.perks,
          price: d.price || init.price
        } : d;
        return {
          ...mapped,
          category: normalizeCat(mapped.category)
        };
      });
    } catch {
      return initialDomains;
    }
  });

  const [testimonials, setTestimonials] = useState(() => {
    const parsed = safeGet('avp_testimonials', null);
    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) return initialTestimonials;
    const parsedIds = new Set(parsed.map(t => t.id));
    const missingInitials = initialTestimonials.filter(t => !parsedIds.has(t.id));
    return missingInitials.length > 0 ? [...parsed, ...missingInitials] : parsed;
  });

  const [companies, setCompanies] = useState(() => {
    const parsed = safeGet('avp_companies', null);
    if (!parsed) return initialCompanies;
    try {
      return parsed.map(c => {
        const init = initialCompanies.find(item => item.id === c.id);
        return init ? { ...init, ...c, logo: c.logo || init.logo, bgColor: c.bgColor || init.bgColor, brandColor: c.brandColor || init.brandColor } : c;
      });
    } catch {
      return initialCompanies;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    return safeGet('avp_inquiries', initialInquiries);
  });

  const [students, setStudents] = useState(() => {
    let loadedStudents = safeGet('avp_students', initialStudents);
    if (!Array.isArray(loadedStudents)) loadedStudents = initialStudents;

    // Deduplicate by ID and Email
    const seenIds = new Set();
    const seenEmails = new Set();
    const uniqueStudents = [];

    for (const s of loadedStudents) {
      const cleanEmail = s.email ? s.email.trim().toLowerCase() : '';
      const idKey = s.id || `AVP-2026-${Math.random()}`;
      if (seenIds.has(idKey) || (cleanEmail && seenEmails.has(cleanEmail))) {
        continue;
      }
      seenIds.add(idKey);
      if (cleanEmail) seenEmails.add(cleanEmail);

      if (s.isEnrolled) {
        const fullTemplate = generate12WeekTasksForDomain(s.chosenDomainId);
        const existingTasks = s.tasks || [];
        const mergedTasks = fullTemplate.map((t) => {
          const existing = existingTasks.find(et => et.taskId === t.taskId || et.week === t.week);
          return existing ? { ...t, ...existing } : t;
        });
        uniqueStudents.push({ ...s, tasks: mergedTasks });
      } else {
        uniqueStudents.push(s);
      }
    }

    return uniqueStudents;
  });

  const [admins, setAdmins] = useState(() => {
    const saved = safeGet('avp_admins', initialAdmins);
    if (Array.isArray(saved)) {
      const merged = [...saved];
      initialAdmins.forEach(initAdm => {
        const idx = merged.findIndex(a => a.email?.toLowerCase() === initAdm.email?.toLowerCase() || a.id === initAdm.id);
        if (idx >= 0) {
          merged[idx] = { ...merged[idx], ...initAdm };
        } else {
          merged.push(initAdm);
        }
      });
      return merged;
    }
    return initialAdmins;
  });

  const [examSettings, setExamSettings] = useState(() => {
    return safeGet('avp_exam_settings', {
      testTitle: 'AVP FutureTech Internship Aptitude Test 2026',
      totalTimeMinutes: 60,
      passPercentage: 40,
      meritPercentage: 80,
      meritFee: 699,
      standardFee: 5999,
      maxWarnings: 5,
      autoReleaseResults: true,
      currentCycleLabel: 'Cycle 2026 - Batch 3'
    });
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    return safeGet('avp_activity_logs', [
      { id: 'act-01', user: 'Dr. Vikram Pradhan', action: 'Published Exam Cycle 2026 - Batch 3', timestamp: new Date().toISOString() },
      { id: 'act-02', user: 'Priya Mukherjee', action: 'Approved Task 1 for Aarav Sharma (AI & ML)', timestamp: new Date().toISOString() }
    ]);
  });

  // Active Test Session State
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [testState, setTestState] = useState({
    answers: {}, // { [questionId]: 'A' | 'B' | 'C' | 'D' }
    markedForReview: [], // [questionId]
    currentSection: 'A',
    currentQuestionIndex: 0,
    timeRemaining: 60 * 60, // 60 minutes in seconds
    violationsCount: 0,
    isSubmitted: false,
    scoreResult: null
  });

  // Global Modals & Toast State
  const [modal, setModal] = useState({ type: null, data: null });
  const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });

  // Sync to LocalStorage on updates
  useEffect(() => {
    safeSet('avp_questions', questions);
  }, [questions]);

  useEffect(() => {
    safeSet('avp_domains', domains);
  }, [domains]);

  useEffect(() => {
    safeSet('avp_testimonials', testimonials);
  }, [testimonials]);

  useEffect(() => {
    safeSet('avp_companies', companies);
  }, [companies]);

  useEffect(() => {
    safeSet('avp_inquiries', inquiries);
  }, [inquiries]);

  useEffect(() => {
    safeSet('avp_students', students);
  }, [students]);

  useEffect(() => {
    safeSet('avp_admins', admins);
  }, [admins]);

  useEffect(() => {
    safeSet('avp_exam_settings', examSettings);
  }, [examSettings]);

  useEffect(() => {
    safeSet('avp_activity_logs', activityLogs);
  }, [activityLogs]);

  useEffect(() => {
    if (currentUser) {
      safeSet('avp_current_user', currentUser);
      safeSet('avp_user_role', userRole);
    } else {
      safeRemove('avp_current_user');
      safeSet('avp_user_role', 'guest');
    }
  }, [currentUser, userRole]);

  // Live Cloud Synchronization with Firebase Firestore
  useEffect(() => {
    if (!db) return;

    // 1. Live Firestore Listener for Students
    let unsubStudents = () => { };
    try {
      unsubStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
        if (!snapshot.empty) {
          const cloudStudents = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setStudents(cloudStudents);
          setCurrentUser(prevUser => {
            if (prevUser && prevUser.id) {
              const matchingCloudStudent = cloudStudents.find(s => s.id === prevUser.id);
              if (matchingCloudStudent) {
                return { ...prevUser, ...matchingCloudStudent };
              }
            }
            return prevUser;
          });
        } else {
          // If cloud collection is completely empty, seed initial records
          initialStudents.forEach(s => {
            const docRef = doc(db, 'students', String(s.id));
            setDoc(docRef, JSON.parse(JSON.stringify(s)), { merge: true }).catch(() => { });
          });
        }
      }, (err) => {
        console.warn('Firestore students listener notice:', err);
      });
    } catch (e) {
      console.warn('Students listener init notice:', e);
    }

    // 2. Live Firestore Listener for Inquiries
    let unsubInquiries = () => { };
    try {
      unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
        if (!snapshot.empty) {
          const cloudInquiries = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setInquiries(cloudInquiries);
        } else {
          initialInquiries.forEach(inq => {
            const docRef = doc(db, 'inquiries', String(inq.id));
            setDoc(docRef, JSON.parse(JSON.stringify(inq)), { merge: true }).catch(() => { });
          });
        }
      }, (err) => {
        console.warn('Firestore inquiries listener notice:', err);
      });
    } catch (e) {
      console.warn('Inquiries listener init notice:', e);
    }

    // 3. Live Firestore Listener for Admins
    let unsubAdmins = () => { };
    try {
      unsubAdmins = onSnapshot(collection(db, 'admins'), (snapshot) => {
        if (!snapshot.empty) {
          const cloudAdmins = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setAdmins(cloudAdmins);
        } else {
          initialAdmins.forEach(a => {
            const docRef = doc(db, 'admins', String(a.id));
            setDoc(docRef, JSON.parse(JSON.stringify(a)), { merge: true }).catch(() => { });
          });
        }
      }, (err) => {
        console.warn('Firestore admins listener notice:', err);
      });
    } catch (e) {
      console.warn('Admins listener init notice:', e);
    }

    // 4. Live Firestore Listener for Exam Settings
    let unsubSettings = () => { };
    try {
      unsubSettings = onSnapshot(doc(db, 'settings', 'examSettings'), (docSnap) => {
        if (docSnap.exists()) {
          setExamSettings(docSnap.data());
        }
      }, (err) => {
        console.warn('Firestore settings listener notice:', err);
      });
    } catch (e) {
      console.warn('Settings listener init notice:', e);
    }

    return () => {
      unsubStudents();
      unsubInquiries();
      unsubAdmins();
      unsubSettings();
    };
  }, []);

  // Cloud Sync Helpers
  const syncStudentToCloud = async (studentData) => {
    if (!db || !studentData || !studentData.id) return;
    try {
      const docRef = doc(db, 'students', String(studentData.id));
      const cleanData = JSON.parse(JSON.stringify(studentData));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing student to Firestore:', err);
    }
  };

  const deleteStudentFromCloud = async (studentId) => {
    if (!db || !studentId) return;
    try {
      await deleteDoc(doc(db, 'students', String(studentId)));
    } catch (err) {
      console.warn('Error deleting student from Firestore:', err);
    }
  };

  const syncInquiryToCloud = async (inquiryData) => {
    if (!db || !inquiryData || !inquiryData.id) return;
    try {
      const docRef = doc(db, 'inquiries', String(inquiryData.id));
      const cleanData = JSON.parse(JSON.stringify(inquiryData));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing inquiry to Firestore:', err);
    }
  };

  const deleteInquiryFromCloud = async (inquiryId) => {
    if (!db || !inquiryId) return;
    try {
      await deleteDoc(doc(db, 'inquiries', String(inquiryId)));
    } catch (err) {
      console.warn('Error deleting inquiry from Firestore:', err);
    }
  };

  const syncAdminToCloud = async (adminData) => {
    if (!db || !adminData || !adminData.id) return;
    try {
      const docRef = doc(db, 'admins', String(adminData.id));
      const cleanData = JSON.parse(JSON.stringify(adminData));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing admin to Firestore:', err);
    }
  };

  const deleteAdminFromCloud = async (adminId) => {
    if (!db || !adminId) return;
    try {
      await deleteDoc(doc(db, 'admins', String(adminId)));
    } catch (err) {
      console.warn('Error deleting admin from Firestore:', err);
    }
  };

  const syncExamSettingsToCloud = async (settings) => {
    if (!db || !settings) return;
    try {
      const docRef = doc(db, 'settings', 'examSettings');
      const cleanData = JSON.parse(JSON.stringify(settings));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing exam settings to Firestore:', err);
    }
  };

  const syncQuestionToCloud = async (questionData) => {
    if (!db || !questionData || !questionData.id) return;
    try {
      const docRef = doc(db, 'questions', String(questionData.id));
      const cleanData = JSON.parse(JSON.stringify(questionData));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing question to Firestore:', err);
    }
  };

  const deleteQuestionFromCloud = async (questionId) => {
    if (!db || !questionId) return;
    try {
      await deleteDoc(doc(db, 'questions', String(questionId)));
    } catch (err) {
      console.warn('Error deleting question from Firestore:', err);
    }
  };

  const syncDomainToCloud = async (domainData) => {
    if (!db || !domainData || !domainData.id) return;
    try {
      const docRef = doc(db, 'domains', String(domainData.id));
      const cleanData = JSON.parse(JSON.stringify(domainData));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing domain to Firestore:', err);
    }
  };

  const deleteDomainFromCloud = async (domainId) => {
    if (!db || !domainId) return;
    try {
      await deleteDoc(doc(db, 'domains', String(domainId)));
    } catch (err) {
      console.warn('Error deleting domain from Firestore:', err);
    }
  };

  const syncCompanyToCloud = async (companyData) => {
    if (!db || !companyData || !companyData.id) return;
    try {
      const docRef = doc(db, 'companies', String(companyData.id));
      const cleanData = JSON.parse(JSON.stringify(companyData));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing company to Firestore:', err);
    }
  };

  const deleteCompanyFromCloud = async (companyId) => {
    if (!db || !companyId) return;
    try {
      await deleteDoc(doc(db, 'companies', String(companyId)));
    } catch (err) {
      console.warn('Error deleting company from Firestore:', err);
    }
  };

  const syncTestimonialToCloud = async (testimonialData) => {
    if (!db || !testimonialData || !testimonialData.id) return;
    try {
      const docRef = doc(db, 'testimonials', String(testimonialData.id));
      const cleanData = JSON.parse(JSON.stringify(testimonialData));
      await setDoc(docRef, cleanData, { merge: true });
    } catch (err) {
      console.warn('Error syncing testimonial to Firestore:', err);
    }
  };

  const deleteTestimonialFromCloud = async (testimonialId) => {
    if (!db || !testimonialId) return;
    try {
      await deleteDoc(doc(db, 'testimonials', String(testimonialId)));
    } catch (err) {
      console.warn('Error deleting testimonial from Firestore:', err);
    }
  };

  // Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 4500);
  };

  const openModal = (type, data = null) => setModal({ type, data });
  const closeModal = () => setModal({ type: null, data: null });

  // Log Activity Helper
  const logActivity = (action, userName) => {
    const newLog = {
      id: `act-${Date.now()}`,
      user: userName || (currentUser ? currentUser.name : 'System Admin'),
      action,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Check if student email or phone is already registered
  const checkStudentExists = (email, phone) => {
    const cleanPhone = phone ? String(phone).replace(/\D/g, '') : '';
    const cleanEmail = email ? String(email).trim().toLowerCase() : '';
    return students.find(s => {
      const matchEmail = Boolean(cleanEmail && s.email && s.email.trim().toLowerCase() === cleanEmail);
      const matchPhone = Boolean(cleanPhone && s.phone && String(s.phone).replace(/\D/g, '') === cleanPhone);
      return matchEmail || matchPhone;
    });
  };

  // Auth Operations
  const registerStudent = (formData) => {
    const cleanEmail = formData.email ? formData.email.trim().toLowerCase() : '';
    const cleanPhone = formData.phone ? formData.phone.trim().replace(/\D/g, '') : '';

    const existing = checkStudentExists(cleanEmail, cleanPhone);
    if (existing) {
      showToast('You are already registered. Please login.', 'error');
      return {
        success: false,
        error: 'ALREADY_REGISTERED',
        message: 'You are already registered. Please login.',
        existingStudent: existing
      };
    }

    const candidateId = `AVP-2026-${1000 + students.length + 1}`;
    const newStudent = {
      id: candidateId,
      name: formData.name.trim(),
      phone: cleanPhone,
      email: cleanEmail,
      password: formData.password || 'student123',
      collegeYear: formData.collegeYear,
      branch: formData.branch,
      registrationDate: new Date().toISOString(),
      testStatus: 'Not Attempted',
      scoreData: null,
      feeTier: null,
      feeStatus: 'Pending',
      chosenDomainId: formData.chosenDomainId || '',
      chosenDomainName: formData.chosenDomainName || '',
      isEnrolled: false,
      internId: '',
      internBatch: '',
      internStartDate: '',
      internshipStatus: 'Not Started',
      certificateUnlocked: false,
      tasks: []
    };

    setStudents(prev => {
      const alreadyExists = prev.some(s =>
        (cleanEmail && s.email && s.email.trim().toLowerCase() === cleanEmail) ||
        (cleanPhone && s.phone && String(s.phone).replace(/\D/g, '') === cleanPhone) ||
        s.id === candidateId
      );
      if (alreadyExists) {
        return prev;
      }
      return [newStudent, ...prev];
    });

    // Cloud Firestore Sync
    syncStudentToCloud(newStudent);

    setActiveCandidate(newStudent);
    setCurrentUser(newStudent);
    setUserRole('student');

    // Initialize test session
    setTestState({
      answers: {},
      markedForReview: [],
      currentSection: 'A',
      currentQuestionIndex: 0,
      timeRemaining: examSettings.totalTimeMinutes * 60,
      violationsCount: 0,
      isSubmitted: false,
      scoreResult: null
    });

    closeModal();
    setCurrentView('instructions');
    logActivity(`Registered for Aptitude Test (${candidateId})`, newStudent.name);
    showToast(`Registration successful! Welcome, ${newStudent.name}.`, 'success');
    return { success: true, student: newStudent };
  };

  const loginStudent = (email, password) => {
    const cleanIdentifier = email ? email.trim().toLowerCase() : '';
    const found = students.find(
      s => (s.email.toLowerCase() === cleanIdentifier || s.phone === email || s.id.toLowerCase() === cleanIdentifier) &&
        s.password === password
    );

    if (found) {
      setCurrentUser(found);
      setUserRole('student');
      closeModal();
      if (found.isEnrolled) {
        setCurrentView('intern-dashboard');
      } else {
        setCurrentView('student-dashboard');
      }
      showToast(`Welcome back, ${found.name}!`, 'success');
      return true;
    } else {
      showToast('Invalid credentials. Please check your email/phone and password.', 'error');
      return false;
    }
  };

  const loginStudentWithOtp = (email, otpCode) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const verification = verifyEmailOtp(cleanEmail, otpCode, 'student-login');
    if (!verification.success) {
      showToast(verification.message, 'error');
      return { success: false, error: verification.message };
    }

    const found = students.find(
      s => s.email && s.email.trim().toLowerCase() === cleanEmail
    );

    if (found) {
      setCurrentUser(found);
      setUserRole('student');
      closeModal();
      if (found.isEnrolled) {
        setCurrentView('intern-dashboard');
      } else {
        setCurrentView('student-dashboard');
      }
      showToast(`Welcome back, ${found.name}! Verified via Email OTP.`, 'success');
      return { success: true, student: found };
    } else {
      showToast('No candidate account found with this email. Please register for the Aptitude Test first.', 'warning');
      return { success: false, error: 'Student not found' };
    }
  };

  const validateAdminCredentials = (email, password) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const found = admins.find(
      a => a.email.toLowerCase() === cleanEmail && a.password === password
    );
    if (!found) {
      return { success: false, error: 'Invalid admin email address or access key.' };
    }
    if (found.status === 'Inactive' || found.status === 'Suspended') {
      return { success: false, error: 'This admin account has been suspended or deactivated.' };
    }
    return { success: true, admin: found };
  };

  const loginAdminWith2FA = (email, password, otpCode) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const validation = validateAdminCredentials(cleanEmail, password);
    if (!validation.success) {
      showToast(validation.error, 'error');
      return validation;
    }

    const verification = verifyEmailOtp(cleanEmail, otpCode, 'admin-2fa');
    if (!verification.success) {
      showToast(verification.message, 'error');
      return { success: false, error: verification.message };
    }

    const admin = validation.admin;
    setCurrentUser(admin);
    const role = (admin.role === 'Super Admin' || admin.role === 'superadmin') ? 'superadmin' : 'staffadmin';
    setUserRole(role);
    closeModal();
    setCurrentView('admin-dashboard');
    logActivity(`Authorized & Logged in with 2-Factor Authentication (2FA)`, admin.name);
    showToast(`2FA Verified! Welcome to Admin Console, ${admin.name}.`, 'success');
    return { success: true, admin };
  };

  const loginAdmin = (email, password) => {
    const validation = validateAdminCredentials(email, password);
    if (validation.success) {
      const found = validation.admin;
      setCurrentUser(found);
      const role = (found.role === 'Super Admin' || found.role === 'superadmin') ? 'superadmin' : 'staffadmin';
      setUserRole(role);
      closeModal();
      setCurrentView('admin-dashboard');
      logActivity(`Logged in to Admin Portal`, found.name);
      showToast(`Welcome to Admin Console, ${found.name}!`, 'success');
      return true;
    } else {
      showToast(validation.error || 'Invalid admin credentials.', 'error');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('guest');
    setActiveCandidate(null);
    setCurrentView('landing');
    showToast('You have been logged out safely.', 'info');
  };

  // Test Execution Handlers
  const startTest = () => {
    setTestState(prev => ({
      ...prev,
      timeRemaining: examSettings.totalTimeMinutes * 60,
      violationsCount: 0,
      isSubmitted: false
    }));
    setCurrentView('test');
  };

  const saveAnswer = (questionId, optionKey) => {
    setTestState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: optionKey
      }
    }));
  };

  const toggleMarkForReview = (questionId) => {
    setTestState(prev => {
      const exists = prev.markedForReview.includes(questionId);
      return {
        ...prev,
        markedForReview: exists
          ? prev.markedForReview.filter(id => id !== questionId)
          : [...prev.markedForReview, questionId]
      };
    });
  };

  const recordViolation = () => {
    setTestState(prev => {
      const newCount = prev.violationsCount + 1;

      if (newCount >= examSettings.maxWarnings) {
        // Auto-submit immediately
        setTimeout(() => {
          submitTest(true);
        }, 100);
      } else {
        openModal('anti-cheat-warning', { warningCount: newCount, maxWarnings: examSettings.maxWarnings });
      }

      return {
        ...prev,
        violationsCount: newCount
      };
    });
  };

  const submitTest = (isAutoSubmit = false) => {
    // Score Calculation
    let sectionAScore = 0;
    let sectionBScore = 0;
    let sectionCScore = 0;

    questions.forEach(q => {
      const studentAns = testState.answers[q.id];
      if (studentAns && studentAns.toUpperCase() === q.correctOption.toUpperCase()) {
        if (q.section === 'A') sectionAScore += q.marks;
        else if (q.section === 'B') sectionBScore += q.marks;
        else if (q.section === 'C') sectionCScore += q.marks;
      }
    });

    const totalScore = sectionAScore + sectionBScore + sectionCScore;
    const maxScore = questions.reduce((sum, q) => sum + (q.marks || 1), 0) || 50;
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Fee Tier Logic
    let feeTier = '5999';
    if (percentage >= examSettings.meritPercentage) {
      feeTier = String(examSettings.meritFee); // '699'
    } else if (percentage < examSettings.passPercentage) {
      feeTier = 'disqualified';
    }

    const scoreResult = {
      sectionA: sectionAScore,
      sectionB: sectionBScore,
      sectionC: sectionCScore,
      totalScore,
      maxScore,
      percentage,
      violationsCount: testState.violationsCount,
      submittedAt: new Date().toISOString(),
      autoSubmitted: isAutoSubmit
    };

    // Update active candidate record
    const candidateId = activeCandidate ? activeCandidate.id : currentUser ? currentUser.id : null;

    if (candidateId) {
      setStudents(prev => prev.map(s => {
        if (s.id === candidateId) {
          const updated = {
            ...s,
            testStatus: 'Completed',
            scoreData: scoreResult,
            feeTier: feeTier
          };
          syncStudentToCloud(updated);
          setActiveCandidate(updated);
          if (currentUser && currentUser.id === candidateId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return s;
      }));
    }

    setTestState(prev => ({
      ...prev,
      isSubmitted: true,
      scoreResult
    }));

    closeModal();
    setCurrentView('post-test');

    if (isAutoSubmit) {
      showToast('Test auto-submitted due to anti-cheat policy limit or timer completion.', 'warning');
    } else {
      showToast('Test submitted successfully! Your answers have been recorded.', 'success');
    }
  };

  const saveDomainPreference = (domainId) => {
    const selectedDomain = domains.find(d => d.id === domainId);
    const domainName = selectedDomain ? selectedDomain.name : 'AI & Machine Learning';

    const candidateId = activeCandidate ? activeCandidate.id : currentUser ? currentUser.id : null;

    if (candidateId) {
      setStudents(prev => prev.map(s => {
        if (s.id === candidateId) {
          const updated = {
            ...s,
            chosenDomainId: domainId,
            chosenDomainName: domainName
          };
          syncStudentToCloud(updated);
          setActiveCandidate(updated);
          if (currentUser && currentUser.id === candidateId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return s;
      }));
    }

    setCurrentView('landing');
    showToast(`Domain preference saved for ${domainName}! You can view your scorecard anytime from the Student Dashboard.`, 'success');
  };

  // Payment Simulation & Intern Upgrade
  const processPayment = (candidateId, paymentDetails) => {
    setStudents(prev => prev.map(s => {
      if (s.id === candidateId) {
        const domainId = paymentDetails?.domainId || s.chosenDomainId || 'dom-ai-ml';
        const selectedDom = domains.find(d => d.id === domainId);
        const domainName = paymentDetails?.domainName || (selectedDom ? selectedDom.name : (s.chosenDomainName || 'AI & Machine Learning'));
        const internTasks = generate12WeekTasksForDomain(domainId);
        const internId = s.internId || `INT-2026-${(domainName || 'GEN').slice(0, 2).toUpperCase()}-${s.id.split('-')[2] || '101'}`;

        const updated = {
          ...s,
          chosenDomainId: domainId,
          chosenDomainName: domainName,
          feeStatus: 'Paid',
          isEnrolled: true,
          internId: internId,
          internBatch: 'Batch 2026-Q3 (Alpha)',
          internStartDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          internshipStatus: 'In Progress',
          tasks: internTasks
        };

        syncStudentToCloud(updated);

        if (currentUser && currentUser.id === candidateId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return s;
    }));

    closeModal();
    logActivity(`Payment verified for Candidate ${candidateId}`, 'Payment Gateway (Auto)');
    showToast('Payment confirmed! Your Enrolled Intern credentials and workspace have been unlocked.', 'success');
    setCurrentView('intern-dashboard');
  };

  // Intern Task Work Submission
  const submitInternTask = (candidateId, taskId, { submissionLink, notes, fileName }) => {
    const studentRecord = students.find(s => s.id === candidateId) || (currentUser?.id === candidateId ? currentUser : null);
    if (studentRecord && studentRecord.tasks) {
      const targetTask = studentRecord.tasks.find(t => t.taskId === taskId);
      if (targetTask) {
        const taskMonth = targetTask.month || (targetTask.week <= 4 ? 1 : targetTask.week <= 8 ? 2 : 3);

        if (taskMonth === 2) {
          const month1Tasks = studentRecord.tasks.filter(t => (t.month === 1) || (t.week >= 1 && t.week <= 4));
          const month1Approved = month1Tasks.filter(t => t.status === 'Approved').length;
          if (month1Tasks.length > 0 && month1Approved < month1Tasks.length) {
            showToast('Month 2 is locked! Complete and get mentor approval for all Month 1 milestones first.', 'warning');
            return;
          }
        } else if (taskMonth === 3) {
          const month2Tasks = studentRecord.tasks.filter(t => (t.month === 2) || (t.week >= 5 && t.week <= 8));
          const month2Approved = month2Tasks.filter(t => t.status === 'Approved').length;
          if (month2Tasks.length > 0 && month2Approved < month2Tasks.length) {
            showToast('Month 3 is locked! Complete and get mentor approval for all Month 2 milestones first.', 'warning');
            return;
          }
        }
      }
    }

    setStudents(prev => prev.map(s => {
      if (s.id === candidateId) {
        const updatedTasks = s.tasks.map(t => {
          if (t.taskId === taskId) {
            return {
              ...t,
              status: 'Submitted',
              submissionLink: submissionLink || `Uploaded File: ${fileName || 'Deliverable.zip'}`,
              notes: notes || '',
              submittedAt: new Date().toISOString()
            };
          }
          return t;
        });

        const updated = {
          ...s,
          tasks: updatedTasks
        };

        syncStudentToCloud(updated);

        if (currentUser && currentUser.id === candidateId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return s;
    }));

    showToast('Task deliverable submitted successfully! Mentor review pending.', 'success');
  };

  // Admin Review Intern Task
  const reviewInternTask = (candidateId, taskId, newStatus, feedbackText) => {
    setStudents(prev => prev.map(s => {
      if (s.id === candidateId) {
        const updatedTasks = s.tasks.map(t => {
          if (t.taskId === taskId) {
            return {
              ...t,
              status: newStatus,
              mentorFeedback: feedbackText || ''
            };
          }
          return t;
        });

        // Check if all tasks approved
        const allApproved = updatedTasks.length > 0 && updatedTasks.every(t => t.status === 'Approved');

        const updated = {
          ...s,
          tasks: updatedTasks,
          internshipStatus: allApproved ? 'Completed' : s.internshipStatus,
          certificateUnlocked: allApproved ? true : s.certificateUnlocked
        };

        syncStudentToCloud(updated);

        if (currentUser && currentUser.id === candidateId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return s;
    }));

    logActivity(`Reviewed Task ${taskId} for Candidate ${candidateId} -> ${newStatus}`);
    showToast(`Task review updated to: ${newStatus}`, 'success');
  };

  // Admin Mark Entire Internship as Complete
  const markInternshipComplete = (candidateId) => {
    setStudents(prev => prev.map(s => {
      if (s.id === candidateId) {
        const updatedTasks = s.tasks.map(t => ({ ...t, status: 'Approved' }));
        const updated = {
          ...s,
          internshipStatus: 'Completed',
          certificateUnlocked: true,
          tasks: updatedTasks
        };
        syncStudentToCloud(updated);
        if (currentUser && currentUser.id === candidateId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return s;
    }));

    logActivity(`Marked Internship Completed & Unlocked Certificate for Candidate ${candidateId}`);
    showToast('Internship marked Completed! Verified certificate unlocked.', 'success');
  };

  // Admin Direct Enrollment
  const enrollCandidateDirectly = (candidateId) => {
    processPayment(candidateId, { method: 'Admin Manual Override' });
  };

  // Admin Update Student Details
  const updateStudent = (studentId, updatedFields) => {
    // Check if new email/phone conflicts with another student
    if (updatedFields.email || updatedFields.phone) {
      const cleanEmail = updatedFields.email ? updatedFields.email.trim().toLowerCase() : '';
      const cleanPhone = updatedFields.phone ? String(updatedFields.phone).replace(/\D/g, '') : '';
      const conflict = students.find(s =>
        s.id !== studentId && (
          (cleanEmail && s.email && s.email.trim().toLowerCase() === cleanEmail) ||
          (cleanPhone && s.phone && String(s.phone).replace(/\D/g, '') === cleanPhone)
        )
      );
      if (conflict) {
        showToast('Email or mobile number is already in use by another candidate.', 'error');
        return { success: false, error: 'Email or mobile number already in use' };
      }
    }

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = {
          ...s,
          ...updatedFields,
          name: updatedFields.name !== undefined ? updatedFields.name.trim() : s.name,
          email: updatedFields.email !== undefined ? updatedFields.email.trim().toLowerCase() : s.email,
          phone: updatedFields.phone !== undefined ? String(updatedFields.phone).replace(/\D/g, '') : s.phone
        };
        syncStudentToCloud(updated);
        if (currentUser && currentUser.id === studentId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return s;
    }));

    logActivity(`Updated student record ${studentId}`);
    showToast('Student details updated successfully!', 'success');
    return { success: true };
  };

  // Admin Delete Student Record
  const deleteStudent = (studentId) => {
    const studentToDelete = students.find(s => s.id === studentId);
    setStudents(prev => prev.filter(s => s.id !== studentId));
    deleteStudentFromCloud(studentId);
    if (currentUser && currentUser.id === studentId) {
      logout();
    }
    logActivity(`Deleted student record ${studentId} (${studentToDelete?.name || ''})`);
    showToast(`Student ${studentToDelete?.name || studentId} deleted successfully.`, 'info');
  };

  // Question Bank Operations
  const addQuestion = (qData) => {
    const newQ = {
      ...qData,
      id: `Q-${qData.section}${Date.now().toString().slice(-4)}`,
      marks: Number(qData.marks) || 1
    };
    setQuestions(prev => [...prev, newQ]);
    syncQuestionToCloud(newQ);
    logActivity(`Added Question ${newQ.id} to Section ${newQ.section}`);
    showToast('New question added to Question Bank!', 'success');
  };

  const updateQuestion = (qId, qData) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const updated = { ...q, ...qData };
        syncQuestionToCloud(updated);
        return updated;
      }
      return q;
    }));
    logActivity(`Updated Question ${qId}`);
    showToast('Question updated successfully!', 'success');
  };

  const deleteQuestion = (qId) => {
    setQuestions(prev => prev.filter(q => q.id !== qId));
    deleteQuestionFromCloud(qId);
    logActivity(`Deleted Question ${qId}`);
    showToast('Question removed from Question Bank.', 'info');
  };

  const bulkImportQuestions = (newQuestionsList) => {
    setQuestions(prev => [...prev, ...newQuestionsList]);
    newQuestionsList.forEach(q => syncQuestionToCloud(q));
    logActivity(`Bulk imported ${newQuestionsList.length} questions`);
    showToast(`Imported ${newQuestionsList.length} questions successfully!`, 'success');
  };

  // Domain Management
  const addDomain = (dData) => {
    const newDom = {
      ...dData,
      id: `dom-${Date.now().toString().slice(-4)}`,
      enrolledCount: 0,
      isOpen: true,
      modules: dData.modules || []
    };
    setDomains(prev => [...prev, newDom]);
    syncDomainToCloud(newDom);
    logActivity(`Created new Internship Domain: ${newDom.name}`);
    showToast(`Domain "${newDom.name}" added successfully!`, 'success');
  };

  const updateDomain = (dId, dData) => {
    setDomains(prev => prev.map(d => {
      if (d.id === dId) {
        const updated = { ...d, ...dData };
        syncDomainToCloud(updated);
        return updated;
      }
      return d;
    }));
    logActivity(`Updated Domain ${dId}`);
    showToast('Domain details updated!', 'success');
  };

  const deleteDomain = (dId) => {
    setDomains(prev => prev.filter(d => d.id !== dId));
    deleteDomainFromCloud(dId);
    logActivity(`Deleted Domain ${dId}`);
    showToast('Domain deleted.', 'info');
  };

  // Testimonial Management
  const addTestimonial = (tData) => {
    const newT = {
      ...tData,
      id: `test-${Date.now().toString().slice(-4)}`
    };
    setTestimonials(prev => [newT, ...prev]);
    syncTestimonialToCloud(newT);
    logActivity(`Added Testimonial for ${newT.name}`);
    showToast('Testimonial added to landing page!', 'success');
  };

  const deleteTestimonial = (tId) => {
    setTestimonials(prev => prev.filter(t => t.id !== tId));
    deleteTestimonialFromCloud(tId);
    logActivity(`Deleted Testimonial ${tId}`);
    showToast('Testimonial removed.', 'info');
  };

  // Partner Company Management
  const addCompany = (cData) => {
    const newC = {
      ...cData,
      id: `c-${Date.now().toString().slice(-4)}`,
      name: cData.name?.trim(),
      shortName: cData.shortName?.trim() || cData.name?.trim(),
      badge: cData.badge?.trim() || 'Verified Recruiter',
      logo: cData.logo?.trim() || '',
      brandColor: cData.brandColor || '#0A2540',
      bgColor: '#FFFFFF'
    };
    setCompanies(prev => [...prev, newC]);
    syncCompanyToCloud(newC);
    logActivity(`Added Partner Company: ${newC.name}`);
    showToast(`Company "${newC.name}" added to showcase marquee!`, 'success');
  };

  const updateCompany = (cId, updatedFields) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === cId) {
        const updated = {
          ...c,
          ...updatedFields,
          name: updatedFields.name !== undefined ? updatedFields.name.trim() : c.name,
          shortName: updatedFields.shortName !== undefined ? updatedFields.shortName.trim() : c.shortName,
          badge: updatedFields.badge !== undefined ? updatedFields.badge.trim() : c.badge,
          logo: updatedFields.logo !== undefined ? updatedFields.logo.trim() : c.logo
        };
        syncCompanyToCloud(updated);
        return updated;
      }
      return c;
    }));
    logActivity(`Updated Partner Company: ${cId}`);
    showToast('Company details updated successfully!', 'success');
  };

  const deleteCompany = (cId) => {
    const toDel = companies.find(c => c.id === cId);
    setCompanies(prev => prev.filter(c => c.id !== cId));
    deleteCompanyFromCloud(cId);
    logActivity(`Deleted Partner Company ${toDel ? toDel.name : cId}`);
    showToast(`Company ${toDel ? `"${toDel.name}"` : ''} removed from marquee.`, 'info');
  };

  const resetCompaniesToDefault = () => {
    setCompanies(initialCompanies);
    localStorage.removeItem('avp_companies');
    initialCompanies.forEach(c => syncCompanyToCloud(c));
    logActivity('Reset Partner Companies to default MNC list');
    showToast('Reset partner companies to default 10 MNCs!', 'success');
  };

  // Inquiry & Admissions Desk Management
  const submitInquiry = (inquiryData) => {
    const newInquiry = {
      id: `INQ-2026-${Date.now().toString().slice(-4)}`,
      name: inquiryData.name?.trim(),
      email: inquiryData.email?.trim().toLowerCase(),
      phone: inquiryData.phone ? String(inquiryData.phone).replace(/\D/g, '') : '',
      message: inquiryData.message?.trim() || '',
      status: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      counselorNotes: ''
    };
    setInquiries(prev => [newInquiry, ...prev]);
    syncInquiryToCloud(newInquiry);
    logActivity(`New Admissions Inquiry from ${newInquiry.name} (${newInquiry.email})`);
    showToast('Inquiry submitted! Our admissions counselor will contact you shortly.', 'success');
    return { success: true };
  };

  const updateInquiryStatus = (inquiryId, newStatus, counselorNotes = '') => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === inquiryId) {
        const updated = {
          ...inq,
          status: newStatus !== undefined ? newStatus : inq.status,
          counselorNotes: counselorNotes !== undefined ? counselorNotes : inq.counselorNotes
        };
        syncInquiryToCloud(updated);
        return updated;
      }
      return inq;
    }));
    logActivity(`Updated Inquiry ${inquiryId} status to ${newStatus}`);
    showToast(`Inquiry marked as ${newStatus}!`, 'success');
  };

  const deleteInquiry = (inquiryId) => {
    const toDel = inquiries.find(i => i.id === inquiryId);
    setInquiries(prev => prev.filter(i => i.id !== inquiryId));
    deleteInquiryFromCloud(inquiryId);
    logActivity(`Deleted Inquiry ${inquiryId} from ${toDel ? toDel.name : ''}`);
    showToast('Inquiry record deleted.', 'info');
  };

  // Exam Settings Update
  const updateExamSettings = (newSettings) => {
    setExamSettings(newSettings);
    syncExamSettingsToCloud(newSettings);
    logActivity(`Updated Exam Settings & Cutoff Thresholds`);
    showToast('Exam configuration and pricing tiers updated!', 'success');
  };

  // Admin Account Creation (Super Admin only)
  const createAdminAccount = (adminData) => {
    const isSuper = userRole === 'superadmin' || currentUser?.role === 'Super Admin' || currentUser?.role === 'superadmin';
    if (!isSuper) {
      showToast('Access Denied: Only Super Admins can provision admin accounts.', 'error');
      return { success: false, error: 'Unauthorized' };
    }

    const cleanEmail = adminData.email?.trim().toLowerCase();
    const existing = admins.find(a => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast('An admin account with this email address already exists.', 'error');
      return { success: false, error: 'Email already exists' };
    }

    const newAdmin = {
      id: `adm-${Date.now().toString().slice(-4)}`,
      name: adminData.name?.trim(),
      email: cleanEmail,
      password: adminData.password || 'Admin@123',
      role: adminData.role || 'Staff Admin',
      department: adminData.department?.trim() || 'Academic Operations',
      phone: adminData.phone ? String(adminData.phone).replace(/\D/g, '') : '',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAdmins(prev => [...prev, newAdmin]);
    syncAdminToCloud(newAdmin);
    logActivity(`Created ${newAdmin.role} account for ${newAdmin.name} (${newAdmin.email})`);
    showToast(`Admin account created for ${newAdmin.name}!`, 'success');
    return { success: true, admin: newAdmin };
  };

  // Admin Account Update (Super Admin only)
  const updateAdminAccount = (adminId, updatedFields) => {
    const isSuper = userRole === 'superadmin' || currentUser?.role === 'Super Admin' || currentUser?.role === 'superadmin';
    if (!isSuper) {
      showToast('Access Denied: Only Super Admins can edit admin accounts.', 'error');
      return { success: false, error: 'Unauthorized' };
    }

    if (updatedFields.email) {
      const cleanEmail = updatedFields.email.trim().toLowerCase();
      const conflict = admins.find(a => a.id !== adminId && a.email.toLowerCase() === cleanEmail);
      if (conflict) {
        showToast('This email address is already in use by another admin.', 'error');
        return { success: false, error: 'Email already in use' };
      }
    }

    setAdmins(prev => prev.map(a => {
      if (a.id === adminId) {
        const updated = {
          ...a,
          ...updatedFields,
          name: updatedFields.name !== undefined ? updatedFields.name.trim() : a.name,
          email: updatedFields.email !== undefined ? updatedFields.email.trim().toLowerCase() : a.email,
          role: updatedFields.role !== undefined ? updatedFields.role : a.role,
          department: updatedFields.department !== undefined ? updatedFields.department.trim() : a.department,
          phone: updatedFields.phone !== undefined ? String(updatedFields.phone).replace(/\D/g, '') : a.phone,
          password: updatedFields.password ? updatedFields.password : a.password,
          status: updatedFields.status !== undefined ? updatedFields.status : (a.status || 'Active')
        };

        syncAdminToCloud(updated);

        if (currentUser && currentUser.id === adminId) {
          setCurrentUser(updated);
          if (updated.role) {
            setUserRole((updated.role === 'Super Admin' || updated.role === 'superadmin') ? 'superadmin' : 'staffadmin');
          }
        }
        return updated;
      }
      return a;
    }));

    logActivity(`Updated Admin Account details for ID: ${adminId}`);
    showToast('Admin account details updated successfully!', 'success');
    return { success: true };
  };

  // Admin Account Deletion (Super Admin only)
  const deleteAdminAccount = (adminId) => {
    const isSuper = userRole === 'superadmin' || currentUser?.role === 'Super Admin' || currentUser?.role === 'superadmin';
    if (!isSuper) {
      showToast('Access Denied: Only Super Admins can delete admin accounts.', 'error');
      return { success: false, error: 'Unauthorized' };
    }

    if (currentUser && currentUser.id === adminId) {
      showToast('Cannot delete your own active Super Admin account.', 'warning');
      return { success: false, error: 'Cannot delete self' };
    }

    const superAdminsCount = admins.filter(a => a.role === 'Super Admin' || a.role === 'superadmin').length;
    const target = admins.find(a => a.id === adminId);
    if ((target?.role === 'Super Admin' || target?.role === 'superadmin') && superAdminsCount <= 1) {
      showToast('Cannot delete the last remaining Super Admin account.', 'warning');
      return { success: false, error: 'Cannot delete last super admin' };
    }

    setAdmins(prev => prev.filter(a => a.id !== adminId));
    deleteAdminFromCloud(adminId);
    logActivity(`Deleted admin account: ${target?.name || adminId} (${target?.email || ''})`);
    showToast(`Admin account for ${target?.name || adminId} deleted.`, 'info');
    return { success: true };
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        questions,
        domains,
        testimonials,
        companies,
        inquiries,
        students,
        admins,
        examSettings,
        activityLogs,
        activeCandidate,
        setActiveCandidate,
        testState,
        setTestState,
        modal,
        toast,
        showToast,
        openModal,
        closeModal,
        checkStudentExists,
        registerStudent,
        loginStudent,
        loginStudentWithOtp,
        sendEmailOtp,
        verifyEmailOtp,
        loginAdmin,
        validateAdminCredentials,
        loginAdminWith2FA,
        logout,
        startTest,
        saveAnswer,
        toggleMarkForReview,
        recordViolation,
        submitTest,
        saveDomainPreference,
        processPayment,
        submitInternTask,
        reviewInternTask,
        markInternshipComplete,
        enrollCandidateDirectly,
        updateStudent,
        deleteStudent,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        bulkImportQuestions,
        addDomain,
        updateDomain,
        deleteDomain,
        addTestimonial,
        deleteTestimonial,
        addCompany,
        updateCompany,
        deleteCompany,
        resetCompaniesToDefault,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateExamSettings,
        createAdminAccount,
        updateAdminAccount,
        deleteAdminAccount,
        logActivity,
        verifyQueryId,
        setVerifyQueryId
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
