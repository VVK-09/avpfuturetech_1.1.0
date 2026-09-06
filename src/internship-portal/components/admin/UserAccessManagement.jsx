import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  UserPlus, 
  Clock, 
  Lock, 
  Key, 
  Shield, 
  User, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Save, 
  Mail, 
  Building, 
  Phone, 
  Eye, 
  EyeOff,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export default function UserAccessManagement() {
  const { 
    admins, 
    createAdminAccount, 
    updateAdminAccount, 
    deleteAdminAccount, 
    activityLogs, 
    currentUser, 
    userRole, 
    showToast 
  } = useApp();

  const isSuperAdmin = userRole === 'superadmin' || currentUser?.role === 'Super Admin' || currentUser?.role === 'superadmin';

  // State for provisioning new admin
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Staff Admin',
    department: 'Software Engineering Mentorship',
    phone: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

  // State for editing existing admin
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Staff Admin',
    department: '',
    phone: '',
    status: 'Active'
  });
  const [showEditPassword, setShowEditPassword] = useState(false);

  const handleOpenEdit = (adm) => {
    if (!isSuperAdmin) {
      showToast('Access Denied: Only Super Admins have permission to edit accounts.', 'warning');
      return;
    }
    setEditingAdmin(adm);
    setEditForm({
      name: adm.name || '',
      email: adm.email || '',
      password: '', // blank by default unless changing
      role: (adm.role === 'superadmin' || adm.role === 'Super Admin') ? 'Super Admin' : 'Staff Admin',
      department: adm.department || 'Academic Operations',
      phone: adm.phone || '',
      status: adm.status || 'Active'
    });
    setShowEditPassword(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;

    if (!editForm.name.trim() || !editForm.email.trim()) {
      showToast('Name and email are required.', 'warning');
      return;
    }

    const payload = {
      name: editForm.name.trim(),
      email: editForm.email.trim().toLowerCase(),
      role: editForm.role,
      department: editForm.department.trim(),
      phone: editForm.phone.trim(),
      status: editForm.status
    };

    if (editForm.password.trim()) {
      payload.password = editForm.password.trim();
    }

    const res = updateAdminAccount(editingAdmin.id, payload);
    if (res?.success !== false) {
      setEditingAdmin(null);
    }
  };

  const handleDelete = (adm) => {
    if (!isSuperAdmin) {
      showToast('Access Denied: Only Super Admins have permission to delete accounts.', 'warning');
      return;
    }

    if (currentUser && currentUser.id === adm.id) {
      showToast('You cannot delete your own logged-in Super Admin account.', 'warning');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete the admin account for "${adm.name}" (${adm.email})?`)) {
      deleteAdminAccount(adm.id);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      showToast('Access Denied: Only Super Admins can provision new accounts.', 'warning');
      return;
    }

    if (!newAdmin.name.trim() || !newAdmin.email.trim() || !newAdmin.password.trim()) {
      showToast('Please fill all required fields.', 'warning');
      return;
    }

    const res = createAdminAccount(newAdmin);
    if (res?.success !== false) {
      setNewAdmin({
        name: '',
        email: '',
        password: '',
        role: 'Staff Admin',
        department: 'Software Engineering Mentorship',
        phone: ''
      });
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid var(--border-light)',
        padding: '2rem 2.25rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', backgroundColor: 'var(--badge-blue-bg)', color: 'var(--electric-blue)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Shield size={14} /> Role-Based Access Control (RBAC) & Security Logs
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
            Admin Access & Security Audit Logs
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Manage staff roles, provision accounts, configure permissions, and monitor system security events
          </div>
        </div>

        {/* Current User Session Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: isSuperAdmin ? '#0F172A' : '#F0F9FF',
          color: isSuperAdmin ? '#FFFFFF' : 'var(--primary-navy)',
          padding: '0.65rem 1.15rem',
          borderRadius: '12px',
          border: isSuperAdmin ? '1px solid #334155' : '1px solid var(--border-light)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: isSuperAdmin ? 'rgba(56, 189, 248, 0.2)' : 'var(--electric-blue)',
            color: isSuperAdmin ? '#38BDF8' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}>
            {isSuperAdmin ? <ShieldCheck size={18} /> : <User size={18} />}
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: isSuperAdmin ? '#94A3B8' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
              Current User Session
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>
              {currentUser?.name || 'Administrator'} · <span style={{ color: isSuperAdmin ? '#38BDF8' : 'var(--electric-blue)' }}>{isSuperAdmin ? 'Super Admin' : 'Staff Admin'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RBAC Notice if NOT Super Admin */}
      {!isSuperAdmin && (
        <div style={{
          backgroundColor: '#FFFBEB',
          borderRadius: '14px',
          border: '1px solid #FDE68A',
          padding: '1.15rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          color: '#92400E'
        }}>
          <AlertTriangle size={22} color="#D97706" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ display: 'block', fontSize: '0.92rem', marginBottom: '0.15rem' }}>
              Restricted Permissions: Super Admin Access Only
            </strong>
            <span style={{ fontSize: '0.84rem' }}>
              Your current account has <strong>Staff Admin</strong> permissions. Creating, modifying, and deleting administrator accounts is restricted exclusively to <strong>Super Admins</strong>.
            </span>
          </div>
        </div>
      )}

      {/* 2-Column Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column: Authorized Admin Accounts & Provisioning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Authorized Admin Accounts Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-light)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} color="var(--electric-blue)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
                  Authorized Admin Accounts ({admins.length})
                </h3>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-subtle)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                {isSuperAdmin ? 'Full Access Granted' : 'Read-Only Mode'}
              </span>
            </div>

            {/* Admin Account List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {admins.map((adm) => {
                const isSuper = adm.role === 'Super Admin' || adm.role === 'superadmin';
                const isSelf = currentUser && currentUser.id === adm.id;
                return (
                  <div
                    key={adm.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.85rem',
                      padding: '1.1rem 1.25rem',
                      backgroundColor: isSelf ? '#F0F9FF' : 'var(--bg-subtle)',
                      borderRadius: '14px',
                      border: isSelf ? '1.5px solid var(--electric-blue)' : '1px solid var(--border-light)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: '220px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: isSuper ? '#0F172A' : '#1E63D6',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1rem',
                        flexShrink: 0
                      }}>
                        {adm.name ? adm.name.charAt(0).toUpperCase() : 'A'}
                      </div>

                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 800, color: 'var(--primary-navy)', fontSize: '0.96rem' }}>
                            {adm.name}
                          </span>
                          {isSelf && (
                            <span style={{ fontSize: '0.68rem', backgroundColor: 'var(--electric-blue)', color: '#FFFFFF', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                              You
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {adm.email} · <span style={{ color: 'var(--primary-navy)', fontWeight: 500 }}>{adm.department || 'Academic Operations'}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span className={`badge ${isSuper ? 'badge-navy' : 'badge-blue'}`} style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}>
                        {isSuper ? 'Super Admin' : 'Staff Admin'}
                      </span>

                      {/* Action buttons strictly enabled for Super Admin */}
                      {isSuperAdmin && (
                        <div style={{ display: 'flex', gap: '0.35rem', marginLeft: '0.25rem' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(adm)}
                            className="btn btn-outline-blue btn-sm"
                            style={{ padding: '0.35rem 0.65rem', borderRadius: '8px', fontSize: '0.78rem' }}
                            title="Edit Account Details"
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleDelete(adm)}
                            disabled={isSelf}
                            className="btn btn-ghost btn-sm"
                            style={{ 
                              padding: '0.35rem 0.55rem', 
                              borderRadius: '8px',
                              opacity: isSelf ? 0.35 : 1,
                              cursor: isSelf ? 'not-allowed' : 'pointer'
                            }}
                            title={isSelf ? 'Cannot delete your own active account' : 'Delete Admin Account'}
                          >
                            <Trash2 size={14} color="#DC2626" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Provision New Admin Account Card (Super Admin Only) */}
          {isSuperAdmin ? (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <UserPlus size={20} color="var(--electric-blue)" />
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', fontWeight: 800 }}>
                    Provision New Admin Account
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Super Admin privilege: Grant institutional management access to verified staff
                  </div>
                </div>
              </div>

              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label className="form-label">Admin Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    className="form-input"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rajesh@avpfuturetech.com"
                    className="form-input"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Access Level / Role *</label>
                    <select
                      className="form-input"
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                      style={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      <option value="Staff Admin">Staff / Reviewer Admin</option>
                      <option value="Super Admin">Super Admin (Full RBAC)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Department / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Academic Review & Mentorship"
                      className="form-input"
                      value={newAdmin.department}
                      onChange={(e) => setNewAdmin({ ...newAdmin, department: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Initial Password *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter secure initial password"
                      className="form-input"
                      style={{ paddingRight: '2.5rem' }}
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', borderRadius: '10px', padding: '0.75rem', marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  <UserPlus size={16} /> Provision Admin Account
                </button>
              </form>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px dashed var(--border-light)',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Lock size={36} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', fontWeight: 800, marginBottom: '0.35rem' }}>
                Account Provisioning Restricted
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                Only accounts with <strong>Super Admin</strong> authorization can create new admin credentials or elevate user privileges.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Activity Audit Log */}
        <div>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-light)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} color="var(--electric-blue)" /> System Activity & Audit Trail
              </h3>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Live Event Stream
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '720px', paddingRight: '0.25rem' }}>
              {activityLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.9rem 1.1rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.86rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ color: 'var(--primary-navy)', fontSize: '0.88rem' }}>
                      {log.user}
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', backgroundColor: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                      {new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-body)', lineHeight: 1.45 }}>
                    {log.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Admin Account Modal (Super Admin only) */}
      {editingAdmin && (
        <div className="modal-backdrop" onClick={() => setEditingAdmin(null)}>
          <div className="modal-content" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: 'var(--primary-navy)', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={18} color="#38BDF8" />
                <h3 className="modal-title" style={{ color: '#FFFFFF', fontSize: '1.15rem' }}>
                  Edit Admin Account: {editingAdmin.name}
                </h3>
              </div>
              <button className="modal-close" onClick={() => setEditingAdmin(null)} style={{ color: '#94A3B8' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.75rem 2rem' }}>
              <form onSubmit={handleSaveEdit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Access Level / Role *</label>
                    <select
                      className="form-input"
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      style={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      <option value="Staff Admin">Staff / Reviewer Admin</option>
                      <option value="Super Admin">Super Admin (Full RBAC)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Account Status</label>
                    <select
                      className="form-input"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Department / Operational Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineering Mentorship"
                    className="form-input"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Update Password (Leave blank to keep existing)</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showEditPassword ? 'text' : 'password'}
                      placeholder="Enter new password (optional)"
                      className="form-input"
                      style={{ paddingRight: '2.5rem' }}
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowEditPassword(!showEditPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {showEditPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingAdmin(null)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.4rem' }}
                  >
                    <Save size={16} /> Save Changes
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
