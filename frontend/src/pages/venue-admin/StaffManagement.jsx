import { useState, useEffect } from 'react';
import { userApi } from '../../api';
import InviteStaffModal from '../../components/modals/InviteStaffModal';
import { useNotifications } from '../../context/NotificationContext';

const permissionSets = [
  { id: 'dashboard', label: 'Dashboard Access' },
  { id: 'sensors', label: 'Sensor Management' },
  { id: 'events', label: 'Event Control' },
  { id: 'security', label: 'Security Commands' },
  { id: 'analytics', label: 'Analytics Export' },
  { id: 'twin', label: 'Digital Twin' },
  { id: 'users', label: 'User Management' },
  { id: 'emergency', label: 'Emergency Override' },
  { id: 'config', label: 'Platform Config' }
];

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('Directory');

  const { showToast } = useNotifications();

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await userApi.getAll();
      setStaff(data);
    } catch (err) {
      console.error('Failed to fetch staff:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const filteredStaff = staff.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const s = filteredStaff[selected] || filteredStaff[0] || null;

  const handleRevokeAccess = async (id) => {
    setProcessing(true);
    try {
      await userApi.remove(id);
      await fetchStaff();
      setSelected(0);
    } catch (err) {
      alert('Failed to revoke access: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handlePermissionToggle = async (permissionId, e) => {
    if (!s) return;
    
    try {
      await userApi.update(s._id, {
        [`permissions.${permissionId}`]: e.target.checked
      });
      console.log(`Permission ${permissionId} updated for ${s.name}`);
    } catch (err) {
      console.error('Failed to update permission:', err);
    }
  };

  const renderDirectory = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }}>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <input 
            placeholder="Search team members by name or role..." 
            style={{ width: '100%' }} 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Syncing matrix...</div>
          ) : filteredStaff.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center' }}>No matching personnel found.</div>
          ) : filteredStaff.map((m, i) => (
            <div key={m._id} onClick={() => setSelected(i)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', cursor: 'pointer', background: s?._id === m._id ? 'var(--accent-dim)' : 'transparent', borderLeft: s?._id === m._id ? '3px solid var(--accent)' : '3px solid transparent', borderBottom: '1px solid var(--border-subtle)', transition: 'all 0.15s ease' }}>
              <div className="sidebar-avatar" style={{ background: `var(--bg-elevated)`, color: 'var(--accent)', borderColor: 'var(--accent-border)' }}>{m.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.name}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600 }}>{m.role}</span>
                  <span className={`badge ${m.status === 'Active' ? 'badge-success' : 'badge-info'}`}>{m.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {!s ? (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>Select a member to view identity profile</div>
        ) : (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                <div className="sidebar-avatar" style={{ width: 64, height: 64, fontSize: '1.3rem', background: `var(--bg-elevated)`, color: 'var(--accent)', borderColor: 'var(--accent-border)' }}>{s.name.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ marginBottom: 4 }}>{s.name}</h2>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-info'}`}>{s.status}</span>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>{s.role}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><div className="label-caps">Email</div><div style={{ fontSize: '0.85rem', marginTop: 2 }}>{s.email}</div></div>
                    <div><div className="label-caps">Identity ID</div><div style={{ fontSize: '0.82rem', marginTop: 2, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{s._id}</div></div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => showToast('Password reset link dispatched via secure node', 'success')}>Reset Password</button>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => showToast(`Accessing audit history for ${s.name}...`, 'info')}>Audit Log</button>
                <button 
                  className={`btn btn-danger ${processing ? 'loading' : ''}`} 
                  style={{ flex: 0.6 }}
                  disabled={processing}
                  onClick={() => {
                      if (window.confirm('Are you sure you want to revoke system clearance for this operator? This action is irreversible.')) {
                          handleRevokeAccess(s._id);
                          showToast('Security revocation protocol initialized', 'info');
                      }
                  }}
                >
                  {processing ? 'Processing...' : 'Revoke Access'}
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Permissions Matrix</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="label-caps">Role: {s.role}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {permissionSets.map((p, i) => (
                  <div key={p.id} style={{ padding: '10px 12px', background: 'var(--bg-deep)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem' }}>{p.label}</span>
                    <label className="toggle" style={{ width: 36, height: 20 }}>
                      <input type="checkbox" checked={s.permissions?.[p.id] || false} onChange={(e) => handlePermissionToggle(p.id, e)} />
                      <span className="toggle-slider" style={{ borderRadius: 10 }}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderClearance = () => (
    <div className="card" style={{ padding: 0 }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Role</th>
            <th>Security Commands</th>
            <th>Emergency Override</th>
            <th>Platform Config</th>
            <th>Clearance Status</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(m => (
            <tr key={m._id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="sidebar-avatar" style={{ width: 28, height: 28, fontSize: '0.7rem' }}>{m.name.charAt(0)}</div>
                  <span style={{ fontWeight: 600 }}>{m.name}</span>
                </div>
              </td>
              <td className="mono" style={{ fontSize: '0.75rem' }}>{m.role}</td>
              <td style={{ textAlign: 'center' }}>{m.permissions?.security ? '✅' : '❌'}</td>
              <td style={{ textAlign: 'center' }}>{m.permissions?.emergency ? '✅' : '❌'}</td>
              <td style={{ textAlign: 'center' }}>{m.permissions?.config ? '✅' : '❌'}</td>
              <td>
                <span className={`badge ${m.permissions?.emergency && m.permissions?.security ? 'badge-critical' : m.permissions?.dashboard ? 'badge-success' : 'badge-neutral'}`}>
                  {m.permissions?.emergency && m.permissions?.security ? 'Level 4 (High)' : m.permissions?.dashboard ? 'Level 1 (Std)' : 'None'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRosters = () => (
    <div className="card" style={{ padding: 0 }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designated Sector</th>
            <th>Shift Timing</th>
            <th>Active Status</th>
            <th>Commands</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(m => (
            <tr key={m._id}>
              <td style={{ fontWeight: 600 }}>{m.name}</td>
              <td>
                <span className="badge badge-accent">
                  {m.role.includes('Security') ? 'Gate 4 / Zone B' : m.role.includes('Admin') ? 'Ops Center' : 'Sector A'}
                </span>
              </td>
              <td className="mono" style={{ fontSize: '0.85rem' }}>08:00 - 18:00</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className={`status-dot ${m.status === 'Active' ? 'online pulse' : 'offline'}`} />
                  <span style={{ fontSize: '0.85rem' }}>{m.status === 'Active' ? 'ON_POST' : 'OFF_DUTY'}</span>
                </div>
              </td>
              <td>
                <button className="btn btn-ghost" style={{ fontSize: '0.72rem' }} onClick={() => showToast(`Dispatching shift update to ${m.name}...`, 'info')}>Update Shift</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div className="page-pretitle">Personnel Matrix / {activeTab}</div>
            <h1>Staff & Role Management</h1>
            <p className="page-subtitle">Manage your venue's human assets, assign roles, and control access permissions.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, borderRight: '1px solid var(--border-subtle)', paddingRight: 16 }}>
              {['Directory', 'Clearance', 'Rosters'].map((t) => (
                <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => { setActiveTab(t); showToast(`Switching to ${t} panel`, 'info'); }}>{t}</span>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => showToast('Compiling personnel audit report...', 'success')}>Audit Log</button>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Invite Member</button>
          </div>
        </div>
      </div>

      {activeTab === 'Directory' && renderDirectory()}
      {activeTab === 'Clearance' && renderClearance()}
      {activeTab === 'Rosters' && renderRosters()}

      <InviteStaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onInvited={fetchStaff}
      />
    </>
  );
}
