import { useState, useEffect } from 'react';
import AppShell from '../../layouts/AppShell';
import { sensorApi } from '../../api';
import AddSensorModal from '../../components/modals/AddSensorModal';
import { venueAdminSidebar, venueAdminBrand, venueAdminUser } from '../../data/sidebarConfig';

const statusColors = { Online: 'badge-success', Offline: 'badge-critical', Planned: 'badge-neutral' };

export default function SensorManagement() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [diagnosing, setDiagnosing] = useState(false);
  const [activeTab, setActiveTab] = useState('Monitor');

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

  const fetchSensors = async () => {
    setLoading(true);
    try {
      const data = await sensorApi.getAll();
      setSensors(data);
    } catch (err) {
      console.error('Failed to fetch sensors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, []);

  const handleRunDiagnostics = async () => {
    setDiagnosing(true);
    try {
      // Simulate a sweep across the network
      await new Promise(r => setTimeout(r, 1500));
      await sensorApi.runDiagnostics();
      await fetchSensors();
      showToast('Network sweep complete. All nodes synchronized.');
    } catch {
      showToast('Diagnostic sweep interrupted by gateway timeout', 'critical');
    } finally {
      setDiagnosing(false);
    }
  };

  const selectedSensor = sensors.find(s => s._id === selectedId) || null;

  const stats = {
    total: sensors.length,
    online: sensors.filter(s => s.status === 'Online').length,
    attention: sensors.filter(s => s.needsCalibration).length,
    offline: sensors.filter(s => s.status === 'Offline').length
  };

  return (
    <AppShell 
      sidebarItems={venueAdminSidebar} 
      brand={venueAdminBrand.brand} 
      brandSub={venueAdminBrand.brandSub} 
      user={venueAdminUser}
      headerExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, borderRight: '1px solid var(--border-subtle)', paddingRight: 16 }}>
            {['Monitor', 'Inventory', 'Diagnostics'].map((t) => (
              <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => { setActiveTab(t); showToast(`Switching to sensor ${t.toLowerCase()} view`, 'info'); }}>{t}</span>
            ))}
          </div>
          <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '6px 10px' }} onClick={() => showToast('Compiling hardware distribution manifest...', 'success')}>Export</button>
        </div>
      }
    >
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div className="page-pretitle">SENSOR NETWORK STATUS</div>
            <h1>Sensor Management</h1>
            <p className="page-subtitle">Monitor, calibrate, and manage all sensors across your venue infrastructure.</p>
          </div>
          <div className="page-actions">
            <button 
              className={`btn btn-secondary ${diagnosing ? 'loading' : ''}`} 
              onClick={handleRunDiagnostics}
              disabled={diagnosing}
            >
              {diagnosing ? 'Scanning Network...' : 'Run Diagnostics'}
            </button>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Sensor</button>
          </div>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Deployed', value: stats.total, icon: '📡', color: 'var(--text-primary)', sub: null },
          { label: 'Online', value: stats.online, icon: '✅', color: 'var(--status-ok)', sub: `${stats.total > 0 ? ((stats.online / stats.total) * 100).toFixed(0) : 0}% uptime` },
          { label: 'Needs Attention', value: stats.attention, icon: '⚠️', color: 'var(--status-warning)', sub: 'Calibration overdue' },
          { label: 'Offline', value: stats.offline, icon: '🔴', color: 'var(--status-alert)', sub: 'Requires inspection' },
        ].map((m, i) => (
          <div key={i} className="metric-card">
            <div className="metric-card-header">
              <div className="metric-card-label">{m.label}</div>
              <span style={{ fontSize: '1.2rem' }}>{m.icon}</span>
            </div>
            <div className="metric-card-value" style={{ color: m.color }}>{m.value}</div>
            {m.sub && <div className="metric-card-sub">{m.sub}</div>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        {/* Venue Map */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Venue Sensor Map</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-success">● Online</span>
              <span className="badge badge-warning">● Attention</span>
              <span className="badge badge-critical">● Offline</span>
            </div>
          </div>
          <div style={{ position: 'relative', height: 400, background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
             {/* Grid Lines */}
             {[20, 40, 60, 80].map(p => (
              <div key={`v-${p}`} style={{ position: 'absolute', left: 0, right: 0, top: `${p}%`, height: 1, background: 'var(--border-subtle)', opacity: 0.3 }}></div>
            ))}
            {[20, 40, 60, 80].map(p => (
              <div key={`h-${p}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'var(--border-subtle)', opacity: 0.3 }}></div>
            ))}

            {sensors.map((s, i) => (
              <div 
                key={s._id} 
                onClick={() => setSelectedId(s._id)}
                style={{ 
                  position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, 
                  transform: 'translate(-50%, -50%)', display: 'flex', 
                  flexDirection: 'column', alignItems: 'center', gap: 4,
                  zIndex: selectedId === s._id ? 10 : i
                }}
              >
                <div style={{ 
                  width: selectedId === s._id ? 18 : 12, 
                  height: selectedId === s._id ? 18 : 12, 
                  borderRadius: '50%', 
                  background: s.status === 'Online' ? 'var(--status-ok)' : s.status === 'Offline' ? 'var(--status-alert)' : 'var(--text-muted)', 
                  boxShadow: s.status === 'Online' ? '0 0 12px var(--status-ok)' : 'none', 
                  cursor: 'pointer',
                  border: selectedId === s._id ? '2px solid white' : 'none',
                  transition: 'all 0.2s ease'
                }}></div>
                {selectedId === s._id && <span className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', background: 'rgba(0,0,0,0.6)', padding: '2px 4px', borderRadius: 4 }}>{s.sensorId}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div>
          <div className="card" style={{ marginBottom: 16, padding: 0 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Hardware Registry</div>
            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              <table className="data-table" style={{ fontSize: '0.82rem' }}>
                <thead>
                  <tr><th>Sensor ID</th><th>Type</th><th>Status</th><th>Signal</th></tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" style={{ padding: 20, textAlign: 'center' }}>Syncing telemetry...</td></tr>
                  ) : sensors.length === 0 ? (
                    <tr><td colSpan="4" style={{ padding: 20, textAlign: 'center' }}>No active hardware.</td></tr>
                  ) : sensors.map(s => (
                    <tr 
                      key={s._id} 
                      onClick={() => setSelectedId(s._id)} 
                      style={{ cursor: 'pointer', background: selectedId === s._id ? 'var(--accent-dim)' : 'transparent' }}
                    >
                      <td className="mono" style={{ fontWeight: 600 }}>
                        {s.sensorId}
                        {s.needsCalibration && <span className="badge badge-warning" style={{ marginLeft: 6, fontSize: '0.55rem' }}>CAL</span>}
                      </td>
                      <td className="label-caps" style={{ fontSize: '0.62rem' }}>{s.type}</td>
                      <td><span className={`badge ${statusColors[s.status] || 'badge-neutral'}`}>{s.status}</span></td>
                      <td className="mono">{s.signal}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedSensor && (
            <div className="card card-accent animate-in">
              <div className="label-caps">Hardware Intel: {selectedSensor.sensorId}</div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Uptime</span>
                  <span className="mono">99.8%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Last Sync</span>
                  <span className="mono">2m ago</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Battery</span>
                  <span style={{ color: 'var(--status-ok)' }}>82%</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn btn-secondary w-full" style={{ fontSize: '0.72rem' }} onClick={() => showToast(`Calibrating sensor node ${selectedSensor.sensorId}...`, 'info')}>Calibrate</button>
                <button className="btn btn-ghost w-full" style={{ fontSize: '0.72rem' }} onClick={() => showToast('Accessing low-level hardware logs...', 'info')}>Sync Log</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddSensorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreated={fetchSensors}
      />
    </AppShell>
  );
}
