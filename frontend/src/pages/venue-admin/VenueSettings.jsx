import { useState } from 'react';
import { venueProfile } from '../../data/mockData';
import { useNotifications } from '../../context/NotificationContext';

export default function VenueSettings() {
  const [profile, setProfile] = useState(venueProfile);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('General');
  const [deploying, setDeploying] = useState(false);

  const handleUpdate = (key, val) => {
    setProfile(prev => ({ ...prev, [key]: val }));
    setHasChanges(true);
  };

  const { showToast, addNotification } = useNotifications();

  const handleSave = async () => {
    setDeploying(true);
    // Simulate global deployment sequence
    await new Promise(r => setTimeout(r, 1200));
    addNotification('System Sync Complete', 'Venue Profile Nodes Deployed Globally', 'info');
    setHasChanges(false);
    setDeploying(false);
  };

  const v = profile;

  const renderGeneral = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 24 }}>
      {/* Core Identity */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Core Identity
          </span>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div className="label-caps" style={{ marginBottom: 8 }}>Venue Name</div>
          <input value={v.name} onChange={e => handleUpdate('name', e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <div className="label-caps" style={{ marginBottom: 8 }}>Venue Type</div>
            <select value={v.type} onChange={e => handleUpdate('type', e.target.value)}>
              <option>Stadium</option>
              <option>Arena</option>
              <option>Campus</option>
            </select>
          </div>
          <div>
            <div className="label-caps" style={{ marginBottom: 8 }}>Region Code</div>
            <input value={v.regionCode} onChange={e => handleUpdate('regionCode', e.target.value)} />
          </div>
        </div>
        <div>
          <div className="label-caps" style={{ marginBottom: 8 }}>Geographical Coordinates</div>
          <input value={v.coordinates} onChange={e => handleUpdate('coordinates', e.target.value)} />
        </div>
      </div>

      {/* 3D Architecture */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            3D Architecture
          </span>
          <span className="badge badge-accent">V2.4.81-FINAL</span>
        </div>
        <div style={{ height: 120, background: 'var(--bg-deep)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }} onClick={() => showToast('Accessing secure CAD repository...', 'info')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏗️</div>
            <p style={{ fontSize: '0.85rem' }}>Drag & Drop BIM/CAD Model</p>
            <span className="label-caps">SUPPORTS OBJ, FBX, IFC</span>
          </div>
        </div>
        <div className="card" style={{ padding: '12px 16px', background: 'var(--accent-dim)', borderColor: 'var(--accent-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="label-caps" style={{ marginBottom: 4 }}>ACTIVE MODEL</div>
              <div className="mono" style={{ fontWeight: 600 }}>{v.activeModel}</div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--status-ok)" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {/* Operational Hours */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Operational Hours</span>
        </div>
        {Object.entries(v.operationalHours).map(([period, times]) => (
          <div key={period} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <span className="label-caps" style={{ width: 80 }}>{period === 'weekday' ? 'MON - FRI' : period.toUpperCase()}</span>
            <input value={times.open} style={{ width: 120, textAlign: 'center' }} onChange={() => setHasChanges(true)} />
            <input value={times.close} style={{ width: 120, textAlign: 'center' }} onChange={() => setHasChanges(true)} />
          </div>
        ))}
        <button className="btn btn-ghost" style={{ marginTop: 8, width: '100%' }} onClick={() => showToast('Holiday scheduling protocol activated', 'info')}>Add Special Holiday Hours</button>
      </div>

      {/* Safety Protocols */}
      <div className="card">
        <div className="card-header"><span className="card-title">Safety & Security Protocols</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Auto-Evacuation Trigger', desc: 'Allow AI to initialize evacuation on Level 3 threat', status: true },
            { label: 'Panic Mode Lockdown', desc: 'Secure all egress points on manual override', status: false },
            { label: 'External Relay', desc: 'Auto-notify local emergency response nodes', status: true }
          ].map((p, i) => (
            <div key={i} className="card" style={{ padding: 14, background: 'var(--bg-deep)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{p.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>{p.desc}</div>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked={p.status} onChange={() => setHasChanges(true)} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdvanced = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {/* Emergency Logistics */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Emergency Contact Registry</span>
        </div>
        {v.emergencyContacts.map((c, i) => (
          <div key={i} className="card" style={{ padding: 14, background: 'var(--bg-deep)', marginBottom: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'center' }}>
              <div>
                <div className="label-caps" style={{ marginBottom: 4 }}>{c.role}</div>
                <div style={{ fontWeight: 500 }}>{c.name}</div>
              </div>
              <div>
                <div className="label-caps" style={{ marginBottom: 4 }}>Direct Line</div>
                <div className="mono" style={{ fontSize: '0.85rem' }}>{c.phone}</div>
              </div>
              <button className="btn-icon" style={{ height: 28, width: 28, color: 'var(--status-alert)' }} onClick={() => showToast('⚠️ Contact access revoked', 'info')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost" style={{ marginTop: 4, width: '100%' }} onClick={() => showToast('Initializing new contact registration...', 'info')}>+ Add Contact Registry</button>
      </div>

      {/* API & System Integration */}
      <div className="card">
        <div className="card-header"><span className="card-title">System & API Integration</span></div>
        <div style={{ marginBottom: 16 }}>
          <div className="label-caps" style={{ marginBottom: 8 }}>Webhook Endpoint</div>
          <input className="mono" value="https://api.flowstate.io/webhooks/v1/event-relay" readOnly />
        </div>
        <div style={{ marginBottom: 16 }}>
          <div className="label-caps" style={{ marginBottom: 8 }}>Auth Token</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="mono" type="password" value="************************" readOnly style={{ flex: 1 }} />
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => showToast('API Token copied to clipboard')}>Copy</button>
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'var(--bg-deep)', borderLeft: '3px solid var(--status-warning)' }}>
          <div style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--status-warning)' }}>System Note:</strong> Advanced architectural settings are managed via the Global Admin portal. Venue-level overrides are restricted to operational parameters.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div className="page-pretitle">ADMINISTRATION / {activeTab}</div>
            <h1>Venue Profile & Settings</h1>
            <p className="page-subtitle">Configure core operational parameters and architectural mapping for your venue.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, borderRight: '1px solid var(--border-subtle)', paddingRight: 16 }}>
              {['General', 'Policies', 'Advanced'].map((t) => (
                <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => { setActiveTab(t); showToast(`Switching to ${t.toLowerCase()} configuration...`, 'info'); }}>{t}</span>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => { setHasChanges(false); showToast('System state restored to baseline'); }}>Discard</button>
            <button className={`btn btn-primary ${deploying ? 'loading' : ''}`} onClick={handleSave} disabled={deploying}>
              {deploying ? 'Deploying...' : 'Deploy Update'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'General' && renderGeneral()}
      {activeTab === 'Policies' && renderPolicies()}
      {activeTab === 'Advanced' && renderAdvanced()}

      {/* Bottom status bar if changes exist */}
      {hasChanges && (
        <div className="card animate-in" style={{ marginTop: 24, padding: '16px 20px', background: 'var(--accent-dim)', borderColor: 'var(--accent-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="status-dot online pulse"></span>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Unsaved changes detected in the current node.</span>
          </div>
          <button className={`btn btn-primary ${deploying ? 'loading' : ''}`} onClick={handleSave} disabled={deploying}>
            {deploying ? 'Deploying...' : 'Deploy Update'}
          </button>
        </div>
      )}
    </>
  );
}
