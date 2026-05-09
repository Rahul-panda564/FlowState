import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import GlassPanel from '../../components/common/GlassPanel';
import Icon from '../../components/common/Icon';
import { useNotifications } from '../../context/NotificationContext';

export default function ProfileHub() {
  const [activeTab, setActiveTab] = useState('Identity');
  const [userName, setUserName] = useState('Operator');
  const [userEmail, setUserEmail] = useState('system@flowstate.sys');
  const [userInitials, setUserInitials] = useState('OP');
  
  // Identity Management State
  const [editName, setEditName] = useState('');
  const [editOrg, setEditOrg] = useState('');
  
  // Provisioning State
  const [newOpName, setNewOpName] = useState('');
  const [newOpEmail, setNewOpEmail] = useState('');
  const [newOpRole, setNewOpRole] = useState('venue-admin');
  const [newOpPassword, setNewOpPassword] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const org = localStorage.getItem('flowstate_org') || 'Nexus Sports Entertainment';
      setEditOrg(org);
      if (user) {
        const name = user.displayName || user.email.split('@')[0];
        setUserName(name);
        setEditName(name);
        setUserEmail(user.email);
        setUserInitials(name.substring(0, 1).toUpperCase());
      } else {
        const email = localStorage.getItem('flowstate_last_user');
        if (email) {
          const name = email.split('@')[0];
          setUserName(name);
          setEditName(name);
          setUserEmail(email);
          setUserInitials(name.substring(0, 1).toUpperCase());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const { showToast } = useNotifications();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      showToast('Error: Display Name cannot be empty.', 'error');
      return;
    }
    
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: editName });
      }
      localStorage.setItem('flowstate_org', editOrg);
      setUserName(editName);
      setUserInitials(editName.substring(0, 1).toUpperCase());
      showToast('Identity attributes updated successfully.', 'success');
    } catch (err) {
      showToast('Error updating profile: ' + err.message, 'error');
    }
  };

  const handleProvisionOperator = (e) => {
    e.preventDefault();
    
    if (!newOpName || !newOpEmail || !newOpPassword) {
      showToast('Error: All operator identity fields are required.', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newOpEmail)) {
      showToast('Error: Invalid operator communication vector (email).', 'error');
      return;
    }

    if (newOpPassword.length < 6) {
      showToast('Error: Temporary access key must be at least 6 characters.', 'error');
      return;
    }

    // In a production environment, this would call a Firebase Cloud Function to create the user via the Admin SDK
    // For this client-side architecture, we simulate the database provisioning step
    localStorage.setItem(`flowstate_role_${newOpEmail}`, newOpRole);
    
    showToast(`Success: ${newOpName} provisioned as ${newOpRole}. Credentials dispatched.`, 'success');
    
    setNewOpName('');
    setNewOpEmail('');
    setNewOpPassword('');
    setNewOpRole('venue-admin');
  };

  const activityLog = [
    { id: 1, action: 'System Login', time: '2026-04-13 09:12:44', node: 'NODE-ALPHA-04', ip: '192.168.1.42', status: 'Success' },
    { id: 2, action: 'Security Protocol Override', time: '2026-04-13 10:45:21', node: 'SEC-CONTROL-01', ip: '192.168.1.42', status: 'Authorized' },
    { id: 3, action: 'Sensor Calibration Update', time: '2026-04-13 11:22:05', node: 'SNS-NET-B', ip: '192.168.1.42', status: 'Complete' },
    { id: 4, action: 'Access Management Update', time: '2026-04-13 11:58:30', node: 'SYS-AUTH', ip: '192.168.1.42', status: 'Success' },
    { id: 5, action: 'Intelligence Report Export', time: '2026-04-13 14:05:12', node: 'ANLYT-HUB', ip: '192.168.1.42', status: 'Encrypted' },
  ];

  return (
    <main className="page-enter">
      <header className="page-header" aria-labelledby="profile-title">
        <div className="page-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <p className="page-pretitle">USER_MANAGEMENT // CLEARANCE_LEVEL_4</p>
              <div style={{ display: 'flex', gap: 12, marginLeft: 12, borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
                {['Identity', 'Security', 'Activity Log', 'Provisioning'].map(t => (
                  <span 
                    key={t} 
                    className={activeTab === t ? 'label-accent' : 'label-caps'} 
                    style={{ cursor: 'pointer', fontSize: '0.65rem' }}
                    onClick={() => setActiveTab(t)}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <h1 id="profile-title">User Profile & Security Hub</h1>
          </div>
          <button className="btn btn-secondary" onClick={() => showToast('Syncing profile with central node...', 'info')} aria-label="Synchronize profile data">Sync Identity</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 0.8fr) 2fr', gap: 24 }}>
        {/* Sidebar Mini-Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <GlassPanel className="stagger-item" style={{ textAlign: 'center', padding: '40px 24px', animationDelay: '0.1s' }} role="complementary">
            <div className="sidebar-avatar data-pulse" style={{ width: 100, height: 100, fontSize: '2.5rem', margin: '0 auto 20px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '2px solid var(--accent-border)', boxShadow: '0 0 30px rgba(0, 212, 170, 0.2)' }} aria-hidden="true">{userInitials}</div>
            <h2 style={{ marginBottom: 4, letterSpacing: '0.02em', textTransform: 'capitalize' }}>{userName}</h2>
            <div className="label-accent" style={{ marginBottom: 16 }}>Venue Administrator</div>
            <div style={{ padding: '12px', background: 'var(--bg-deep)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', textAlign: 'left' }}>
              <div className="label-caps" style={{ fontSize: '0.65rem', marginBottom: 4 }}>Last Login</div>
              <div className="mono" style={{ fontSize: '0.78rem' }} aria-label="Last active at">2026-04-13 14:30:11</div>
            </div>
          </GlassPanel>

          <nav aria-label="Profile navigation" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Identity', 'Security', 'Activity Log', 'Provisioning'].map(t => (
              <button 
                key={t} 
                className={`btn ${activeTab === t ? 'btn-primary' : 'btn-ghost'}`} 
                style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                onClick={() => setActiveTab(t)}
                aria-pressed={activeTab === t}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'Identity' && (
            <section aria-labelledby="identity-heading">
              <GlassPanel header={<span id="identity-heading">Identity Management</span>}>
                <form onSubmit={handleUpdateProfile}>
                  <div className="grid-2" style={{ gap: 24 }}>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="display-name">Display Name</label>
                      <input 
                        id="display-name" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)} 
                        style={{ width: '100%', textTransform: 'capitalize' }} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="email">Primary Email</label>
                      <input id="email" value={userEmail} style={{ width: '100%' }} readOnly />
                    </div>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="role">Assigned Role</label>
                      <input id="role" defaultValue="Venue Administrator" style={{ width: '100%' }} readOnly />
                    </div>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="org">Organization</label>
                      <input 
                        id="org" 
                        value={editOrg}
                        onChange={(e) => setEditOrg(e.target.value)}
                        style={{ width: '100%' }} 
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                  </div>
                </form>
              </GlassPanel>
            </section>
          )}

          {activeTab === 'Security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <GlassPanel header="System Access & Authentication">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Password Authentication</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Last changed 42 days ago. Strong entropy detected.</div>
                    </div>
                    <button className="btn btn-secondary" onClick={() => showToast('Sending password reset protocol to email...', 'info')}>Change Password</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Multi-Factor Authentication (MFA)</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--status-ok)' }}>Hardware Security Key Enabled (Yubikey)</div>
                    </div>
                    <button className="btn btn-secondary" onClick={() => showToast('Opening MFA management vault...', 'info')}>Configure</button>
                  </div>
                </div>
              </GlassPanel>

              <GlassPanel header="Active Operative Sessions">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Windows Desktop // Chrome</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Session • Delhi, India</div>
                  </div>
                  <span className="badge badge-success">ACTIVE</span>
                </div>
                <div style={{ padding: '12px 0', textAlign: 'center' }}>
                  <button className="btn btn-ghost" style={{ color: 'var(--status-alert)' }} onClick={() => showToast('Terminating all other system instances...', 'info')}>Terminate All Other Sessions</button>
                </div>
              </GlassPanel>
            </div>
          )}

          {activeTab === 'Activity Log' && (
            <GlassPanel 
              header="Operative Activity Log" 
              headerActions={<button className="btn btn-secondary" style={{ fontSize: '0.72rem' }} onClick={() => showToast('Exporting session history as encrypted CSV...', 'success')}>Export Log</button>}
            >
              <table className="data-table">
                <thead>
                  <tr><th>Timestamp</th><th>Action</th><th>Access Point</th><th>IP Address</th><th>Result</th></tr>
                </thead>
                <tbody>
                  {activityLog.map(log => (
                    <tr key={log.id}>
                      <td className="mono" style={{ fontSize: '0.75rem' }}>{log.time}</td>
                      <td style={{ fontWeight: 600 }}>{log.action}</td>
                      <td className="label-caps" style={{ fontSize: '0.65rem' }}>{log.node}</td>
                      <td className="mono" style={{ fontSize: '0.75rem' }}>{log.ip}</td>
                      <td><span className={`badge ${log.status === 'Success' || log.status === 'Authorized' || log.status === 'Encrypted' ? 'badge-success' : 'badge-alert'}`}>{log.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassPanel>
          )}

          {activeTab === 'Provisioning' && (
            <section aria-labelledby="provisioning-heading">
              <GlassPanel header={<span id="provisioning-heading">Provision New Operator</span>}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Register a new system operator. An encrypted invitation with the temporary secure key will be sent to their communication vector.
                </p>
                <form onSubmit={handleProvisionOperator}>
                  <div className="grid-2" style={{ gap: 24 }}>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="new-op-name">Full Name</label>
                      <input 
                        id="new-op-name" 
                        placeholder="Operator Name" 
                        style={{ width: '100%' }} 
                        value={newOpName}
                        onChange={e => setNewOpName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="new-op-email">System Email</label>
                      <input 
                        id="new-op-email" 
                        type="email" 
                        placeholder="identity@flowstate.sys" 
                        style={{ width: '100%' }} 
                        value={newOpEmail}
                        onChange={e => setNewOpEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="new-op-role">Assign Role</label>
                      <select 
                        id="new-op-role" 
                        style={{ width: '100%' }}
                        value={newOpRole}
                        onChange={e => setNewOpRole(e.target.value)}
                      >
                        <option value="venue-admin">Venue Administrator</option>
                        <option value="operations">Operations Commander</option>
                        <option value="security">Security Chief</option>
                        <option value="logistics">Logistics Coordinator</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label-caps" htmlFor="new-op-password">Temporary Access Key</label>
                      <input 
                        id="new-op-password" 
                        type="password" 
                        placeholder="••••••••••••" 
                        style={{ width: '100%' }} 
                        value={newOpPassword}
                        onChange={e => setNewOpPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                    <button type="submit" className="btn btn-primary">
                      Initialize Operator
                    </button>
                  </div>
                </form>
              </GlassPanel>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
