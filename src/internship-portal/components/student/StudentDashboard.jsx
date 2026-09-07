import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Award, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ArrowRight, 
  Play, 
  FileText, 
  Calendar, 
  Layers, 
  ExternalLink,
  Edit3,
  Save,
  Sparkles
} from 'lucide-react';

export default function StudentDashboard() {
  const { 
    currentUser, 
    setCurrentUser, 
    setCurrentView, 
    openModal, 
    showToast,
    students,
    startTest,
    setActiveCandidate
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    collegeYear: currentUser?.collegeYear || '3rd Year',
    branch: currentUser?.branch || 'Computer Science & Engineering'
  });

  if (!currentUser) {
    return (
      <div className="container section-py" style={{ textAlign: 'center' }}>
        <h2>Please log in to view your Student Dashboard.</h2>
        <button onClick={() => openModal('student-login')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Student Login
        </button>
      </div>
    );
  }

  const student = currentUser;
  const hasAttemptedTest = student.testStatus === 'Completed' && student.scoreData;
  const isMerit = student.feeTier === '699';
  const isEnrolled = student.isEnrolled;

  const handleProfileSave = (e) => {
    e.preventDefault();
    const updated = {
      ...student,
      name: profileForm.name,
      phone: profileForm.phone,
      collegeYear: profileForm.collegeYear,
      branch: profileForm.branch
    };
    setCurrentUser(updated);
    setIsEditingProfile(false);
    showToast('Profile information updated successfully!', 'success');
  };

  const handleStartExamFromDashboard = () => {
    setActiveCandidate(student);
    setCurrentView('instructions');
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: 'var(--badge-blue-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--badge-blue-border)'
            }}>
              <User size={32} color="var(--electric-blue)" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
                  {student.name}
                </h1>
                <span className="badge badge-blue">
                  {student.id}
                </span>
                {isEnrolled && (
                  <span className="badge" style={{ backgroundColor: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}>
                    Active Intern
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {student.email} · {student.branch} ({student.collegeYear})
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isEnrolled ? (
              <button
                onClick={() => setCurrentView('intern-dashboard')}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <Layers size={18} /> Open Enrolled Intern Workspace
              </button>
            ) : hasAttemptedTest ? (
              <button
                onClick={() => openModal('payment', student)}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <CreditCard size={18} /> Enroll Now (₹{student.feeTier === '699' ? '699' : '5,999'})
              </button>
            ) : (
              <button
                onClick={handleStartExamFromDashboard}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <Play size={18} /> Take Aptitude Test 2026
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Grid: Left Summary & Right Profile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2rem'
        }}>
          {/* Left Column: Test & Enrollment Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Examination Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} color="var(--electric-blue)" /> Aptitude Evaluation Status
                </h3>
                <span className={`badge ${hasAttemptedTest ? 'badge-blue' : 'badge-warning'}`}>
                  {student.testStatus}
                </span>
              </div>

              {hasAttemptedTest ? (
                <div>
                  <div style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    marginBottom: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Section A (Aptitude)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                        {student.scoreData.sectionA}/20
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Section B (Logic)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                        {student.scoreData.sectionB}/20
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Section C (English)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                        {student.scoreData.sectionC}/10
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    backgroundColor: isMerit ? 'var(--badge-blue-bg)' : 'var(--bg-subtle)',
                    border: `1px solid ${isMerit ? 'var(--badge-blue-border)' : 'var(--border-light)'}`,
                    borderRadius: '12px',
                    marginBottom: '1.25rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-navy)' }}>
                        Total Score: {student.scoreData.percentage}% ({student.scoreData.totalScore}/50)
                      </div>
                      <div style={{ fontSize: '0.82rem', color: isMerit ? 'var(--electric-blue)' : 'var(--text-muted)', fontWeight: 600 }}>
                        {isMerit ? 'Merit Reward: ₹699 Special Fee Tier' : 'Standard Fee Tier: ₹5,999'}
                      </div>
                    </div>

                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isMerit ? 'var(--electric-blue)' : 'var(--primary-navy)' }}>
                      ₹{student.feeTier === '699' ? '699' : '5,999'}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.25rem' }}>
                    You have registered for the <strong>AVP FutureTech Aptitude Test 2026</strong>. Take the test now to qualify for our merit discount!
                  </p>
                  <button onClick={handleStartExamFromDashboard} className="btn btn-primary">
                    <Play size={16} /> Begin 60-Min Online Test
                  </button>
                </div>
              )}
            </div>

            {/* Selected Domain & Enrollment Status */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={20} color="var(--electric-blue)" /> Internship Domain Allocation
              </h3>

              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chosen Specialization:</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', margin: '0.3rem 0' }}>
                  {student.chosenDomainName || 'Not Selected Yet'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--electric-blue)' }}>
                  Duration: 3 Months · Flexible Milestone Format
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment & Enrollment:</span>
                <span className={`badge ${student.feeStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                  {student.feeStatus === 'Paid' ? 'Paid & Enrolled' : 'Payment Pending'}
                </span>
              </div>

              {student.feeStatus === 'Pending' && hasAttemptedTest && (
                <button
                  onClick={() => openModal('payment', student)}
                  className="btn btn-primary btn-block"
                  style={{ borderRadius: '10px' }}
                >
                  <CreditCard size={16} /> Complete Payment (₹{student.feeTier === '699' ? '699' : '5,999'})
                </button>
              )}

              {isEnrolled && (
                <button
                  onClick={() => setCurrentView('intern-dashboard')}
                  className="btn btn-navy btn-block"
                  style={{ borderRadius: '10px' }}
                >
                  Go to Intern Workspace
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Student Profile Details & Edit */}
          <div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', fontWeight: 700 }}>
                  Profile Information
                </h3>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="btn btn-outline btn-sm"
                    style={{ gap: '0.35rem' }}
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSave}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">College Year</label>
                    <select
                      className="form-select"
                      value={profileForm.collegeYear}
                      onChange={(e) => setProfileForm({ ...profileForm, collegeYear: e.target.value })}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="Final Year">Final Year</option>
                      <option value="Recent Graduate">Recent Graduate</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Branch / Degree</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={profileForm.branch}
                      onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                    <Save size={16} /> Save Changes
                  </button>
                </form>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.92rem' }}>
                  <div style={{ paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Candidate ID</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>{student.id}</div>
                  </div>

                  <div style={{ paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Registered Email</div>
                    <div style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{student.email}</div>
                  </div>

                  <div style={{ paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Contact Number</div>
                    <div style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>+91 {student.phone}</div>
                  </div>

                  <div style={{ paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Academic Standing</div>
                    <div style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{student.collegeYear} — {student.branch}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Registration Timestamp</div>
                    <div style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>
                      {new Date(student.registrationDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
