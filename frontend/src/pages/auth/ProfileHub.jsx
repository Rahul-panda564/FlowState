import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GlassPanel from '../../components/common/GlassPanel';
import Icon from '../../components/common/Icon';

export default function ProfileHub() {
  const [activeTab, setActiveTab] = useState('Identity');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const showToast = (msg, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.zIndex = '10000';
    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.innerHTML = type === 'success' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12.01" y2="8"/><polyline points="11 12 12 12 12 16 13 16"/></svg>';
    const text = document.createElement('div');
    text.innerText = msg;
    text.style.fontWeight = '500';
    text.style.fontSize = '0.9rem';
    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const activityLog = [
    { id: 1, action: 'System Login', time: '2026-04-13 09:12:44', node: 'NODE-ALPHA-04', ip: '192.168.1.42', status: 'Success' },
    { id: 2, action: 'Security Protocol Override', time: '2026-04-13 10:45:21', node: 'SEC-CONTROL-01', ip: '192.168.1.42', status: 'Authorized' },
    { id: 3, action: 'Sensor Calibration Update', time: '2026-04-13 11:22:05', node: 'SNS-NET-B', ip: '192.168.1.42', status: 'Complete' },
    { id: 4, action: 'Access Management Update', time: '2026-04-13 11:58:30', node: 'SYS-AUTH', ip: '192.168.1.42', status: 'Success' },
    { id: 5, action: 'Intelligence Report Export', time: '2026-04-13 14:05:12', node: 'ANLYT-HUB', ip: '192.168.1.42', status: 'Encrypted' },
  ];

  return (
    <>
      <div className="page-header page-enter">
        <div className="page-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <p className="page-pretitle">USER_MANAGEMENT // CLEARANCE_LEVEL_4</p>
              <div style={{ display: 'flex', gap: 12, marginLeft: 12, borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
                {['Identity', 'Security', 'Activity Log'].map(t => (
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
            <h1>User Profile & Security Hub</h1>
          </div>
          <button className="btn btn-secondary" onClick={() => showToast('Syncing profile with central node...', 'info')}>Sync Identity</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 0.8fr) 2fr', gap: 24 }}>
        {/* Sidebar Mini-Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <GlassPanel className="stagger-item" style={{ textAlign: 'center', padding: '40px 24px', animationDelay: '0.1s' }}>
            <div className="sidebar-avatar data-pulse" style={{ width: 100, height: 100, fontSize: '2.5rem', margin: '0 auto 20px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '2px solid var(--accent-border)', boxShadow: '0 0 30px rgba(0, 212, 170, 0.2)' }}>R</div>
            <h2 style={{ marginBottom: 4, letterSpacing: '0.02em' }}>Rahul</h2>
            <div className="label-accent" style={{ marginBottom: 16 }}>Venue Administrator</div>
            <div style={{ padding: '12px', background: 'var(--bg-deep)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', textAlign: 'left' }}>
              <div className="label-caps" style={{ fontSize: '0.65rem', marginBottom: 4 }}>Last Login</div>
              <div className="mono" style={{ fontSize: '0.78rem' }}>2026-04-13 14:30:11</div>
            </div>
          </GlassPanel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Identity', 'Security', 'Activity Log'].map(t => (
              <button 
                key={t} 
                className={`btn ${activeTab === t ? 'btn-primary' : 'btn-ghost'}`} 
                style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'Identity' && (
            <GlassPanel header="Identity Management">
              <div className="grid-2" style={{ gap: 24 }}>
                <div className="form-group">
                  <label className="label-caps">Display Name</label>
                  <input defaultValue="Rahul" style={{ width: '100%' }} />
                </div>
                <div className="form-group">
                  <label className="label-caps">Primary Email</label>
                  <input defaultValue="rahul@flowstate.ai" style={{ width: '100%' }} readOnly />
                </div>
                <div className="form-group">
                  <label className="label-caps">Assigned Role</label>
                  <input defaultValue="Venue Administrator" style={{ width: '100%' }} readOnly />
                </div>
                <div className="form-group">
                  <label className="label-caps">Organization</label>
                  <input defaultValue="Nexus Sports Entertainment" style={{ width: '100%' }} />
                </div>
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                <button className="btn btn-primary" onClick={() => showToast('Identity attributes updated successfully')}>Update Profile</button>
              </div>
            </GlassPanel>
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
        </div>
      </div>
    </>
  );
}
