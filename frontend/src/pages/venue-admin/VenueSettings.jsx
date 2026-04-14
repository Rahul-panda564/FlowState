import { useState } from 'react';

import { venueProfile } from '../../data/mockData';

export default function VenueSettings() {

  const [profile, setProfile] = useState(venueProfile);
  const [hasChanges, setHasChanges] = useState(false);

  const handleUpdate = (key, val) => {
    setProfile(prev => ({ ...prev, [key]: val }));
    setHasChanges(true);
  };

  const showToast = (msg, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.zIndex = '10000';
    
    // Add icon wrapper
    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.innerHTML = type === 'success' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12.01" y2="8"/><polyline points="11 12 12 12 12 16 13 16"/></svg>';
    
    // Add text component
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

  const handleSave = () => {
    showToast('✅ SYSTEM_SYNC: Venue Profile Nodes Deployed Globally');
    setHasChanges(false);
  };

  const v = profile;
  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1>Venue Profile</h1>
            <p className="page-subtitle">Configure core operational parameters and architectural mapping.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, borderRight: '1px solid var(--border-subtle)', paddingRight: 16 }}>
              {['General', 'Policies', 'Advanced'].map((t) => (
                <span key={t} className="label-caps" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => showToast(`Opening ${t.toLowerCase()} configuration...`, 'info')}>{t}</span>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => { setHasChanges(false); showToast('Changes Discarded'); }}>Discard</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={!hasChanges}>Save Changes</button>
          </div>
        </div>
      </div>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Operational Hours */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--status-warning)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Operational Hours
            </span>
          </div>
          {Object.entries(v.operationalHours).map(([period, times]) => (
            <div key={period} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <span className="label-caps" style={{ width: 80 }}>{period === 'weekday' ? 'MON - FRI' : period.toUpperCase()}</span>
              <input value={times.open} style={{ width: 120, textAlign: 'center' }} onChange={() => setHasChanges(true)} />
              <input value={times.close} style={{ width: 120, textAlign: 'center' }} onChange={() => setHasChanges(true)} />
            </div>
          ))}
          <button className="btn btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }} onClick={() => showToast('Holiday scheduling protocol activated', 'info')}>Add Special Holiday Hours</button>
        </div>

        {/* Emergency Logistics */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--status-alert)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
              Emergency Logistics
            </span>
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
          <button className="btn btn-ghost" style={{ marginTop: 4, width: '100%', justifyContent: 'center' }} onClick={() => showToast('Initializing new contact registration...', 'info')}>+ Add Contact Registry</button>
        </div>
      </div>

      {/* Bottom deploy button */}
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-primary" style={{ padding: '14px 24px' }} onClick={handleSave} disabled={!hasChanges}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
          Deploy Update
        </button>
      </div>
    </>
  );
}
