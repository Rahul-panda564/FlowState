import { useState } from 'react';
import AttendeeShell from '../../layouts/AttendeeShell';

const mobilityOptions = [
  { icon: '✏️', label: 'I use stairs easily' },
  { icon: '🔲', label: 'I prefer ramps/elevators' },
  { icon: '♿', label: 'I use a wheelchair' },
  { icon: '👶', label: 'I have a stroller' },
  { icon: '👥', label: "I'm with a slow-moving group" },
];

const routeOptions = [
  { icon: '🚶', label: 'Minimize walking' },
  { icon: '👥', label: 'Avoid crowds' },
  { icon: '⚡', label: 'Fastest route', active: true },
  { icon: '🏞️', label: 'Scenic route' },
];

export default function AttendeeProfile() {
  const [selectedMobility, setSelectedMobility] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(2);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate cloud sync delay
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <AttendeeShell title="My Journey Prefs">
      <div className="attendee-profile page-enter">
        <h2 style={{ fontSize: '1.4rem', lineHeight: 1.3, marginBottom: 8 }}>How can we help you move better?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.85rem' }}>Tailor your navigation experience for the best stadium journey.</p>

        <div className="label-accent" style={{ marginBottom: 12 }}>Mobility Profile</div>
        {mobilityOptions.map((opt, i) => (
          <div key={i} onClick={() => setSelectedMobility(i)} className="card" style={{
            padding: '14px 18px',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
            background: i === selectedMobility ? 'var(--accent-dim)' : 'var(--bg-card)',
            borderColor: i === selectedMobility ? 'var(--accent)' : 'var(--border-color)',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: i === selectedMobility ? 'var(--accent-dim)' : 'var(--bg-deep)', border: `1px solid ${i === selectedMobility ? 'var(--accent)' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{opt.icon}</div>
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.9rem' }}>{opt.label}</span>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${i === selectedMobility ? 'var(--accent)' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i === selectedMobility && <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)' }}></div>}
            </div>
          </div>
        ))}

        <div className="label-accent" style={{ marginTop: 24, marginBottom: 12 }}>Route Logic</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {routeOptions.map((opt, i) => (
            <div key={i} onClick={() => setSelectedRoute(i)} className="card" style={{
              padding: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              background: i === selectedRoute ? 'var(--accent-dim)' : 'var(--bg-card)',
              borderColor: i === selectedRoute ? 'var(--accent)' : 'var(--border-color)',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: i === selectedRoute ? 'var(--accent)' : 'var(--text-primary)' }}>{opt.label}</div>
            </div>
          ))}
        </div>

        <button 
          className={`btn w-full ${saved ? 'btn-secondary' : 'btn-primary'}`} 
          style={{ marginTop: 24, padding: '16px', fontSize: '0.92rem', justifyContent: 'center', background: saved ? 'var(--status-ok)' : '', color: saved ? '#000' : '', border: saved ? 'none' : '' }}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'SYNCING PREFERENCES...' : saved ? '✓ SAVED SUCCESSFULLY' : 'Save Preferences'}
        </button>
      </div>
    </AttendeeShell>
  );
}
