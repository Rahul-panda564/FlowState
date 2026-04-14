import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../layouts/AppShell';
import { venueApi } from '../../api';
import { superAdminSidebar, superAdminBrand } from '../../data/sidebarConfig';

export default function AddVenueWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    region: 'NA-EAST',
    type: 'Stadium',
    timezone: 'UTC -05:00 Eastern Time',
    capacity: 0,
    tier: 'enterprise',
    image: '🏟️'
  });

  const [levels, setLevels] = useState([{ name: 'Main Bowl', seats: 45000, standingRoom: false }]);

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await venueApi.create(formData);
      navigate('/super-admin/venues');
    } catch (err) {
      console.error('Failed to create venue:', err);
      alert('Failed to initialize venue node. Check console for logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell sidebarItems={superAdminSidebar} brand={superAdminBrand.brand} brandSub={superAdminBrand.brandSub} user={null}
      headerExtra={
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="label-caps">System Monitoring</span>
          <span className="label-caps">Asset Library</span>
          <span className="label-accent">Venues</span>
          <span style={{ flex: 1 }}></span>
          <button className="btn btn-ghost" onClick={() => navigate('/super-admin/venues')}>Save & Exit</button>
          <button className="btn btn-primary" onClick={handleNext} disabled={loading}>
            {loading ? 'Initializing...' : step < 5 ? 'Next' : 'Complete Setup'}
          </button>
        </div>
      }
    >
      <div className="page-header">
        <h1>Add New Venue</h1>
        <p className="page-subtitle">Step {step} of 5: {['Basic Information', 'Sensor Configuration', 'Digital Twin Setup', 'Integration Connections', 'User Onboarding'][step - 1]}</p>
      </div>

      {/* Wizard Steps */}
      <div className="wizard-steps" style={{ maxWidth: 400 }}>
        {[1, 2, 3, 4, 5].map(s => (
          <div key={s} className={`wizard-step ${s < step ? 'completed' : s === step ? 'current' : ''}`}></div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
          {/* Venue Details */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Venue Details
              </span>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div className="label-caps" style={{ marginBottom: 8 }}>Venue Name</div>
              <input placeholder="e.g., MetLife Stadium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ borderColor: !formData.name ? 'var(--status-alert)' : 'var(--border-color)' }} />
              {!formData.name && <div style={{ color: 'var(--status-alert)', fontSize: '0.78rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--status-alert)', display: 'inline-block' }}></span>
                Venue name is required
              </div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <div className="label-caps" style={{ marginBottom: 8 }}>Venue Type</div>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option>Stadium</option>
                  <option>Arena</option>
                  <option>Amphitheater</option>
                  <option>Convention Center</option>
                  <option>Racetrack</option>
                </select>
              </div>
              <div>
                <div className="label-caps" style={{ marginBottom: 8 }}>Region</div>
                <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})}>
                  <option>NA-EAST</option>
                  <option>NA-WEST</option>
                  <option>EU-WEST</option>
                  <option>EU-CENTRAL</option>
                  <option>APAC-01</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <div className="label-caps" style={{ marginBottom: 8 }}>Deployment Tier</div>
                <select value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})}>
                  <option value="starter">Starter Node</option>
                  <option value="pro">Pro Grid</option>
                  <option value="enterprise">Enterprise Core</option>
                </select>
              </div>
              <div>
                <div className="label-caps" style={{ marginBottom: 8 }}>Timezone</div>
                <input value={formData.timezone} onChange={e => setFormData({...formData, timezone: e.target.value})} />
              </div>
            </div>
            <div>
              <div className="label-caps" style={{ marginBottom: 8 }}>Address / Location</div>
              <textarea rows={3} placeholder="Street address, City, State, Postal Code" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ resize: 'vertical' }}></textarea>
            </div>
          </div>

          {/* Capacity Configuration */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Capacity Configuration
              </span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div className="label-caps" style={{ marginBottom: 8 }}>Total Seating Capacity</div>
              <input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value) || 0})} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="label-caps">Configured Levels</span>
              <button 
                className="btn btn-ghost" 
                style={{ fontSize: '0.72rem', color: 'var(--accent)' }}
                onClick={() => setLevels([...levels, { name: `Level ${levels.length + 1}`, seats: 5000, standingRoom: false }])}
              >
                + Add Capacity Level
              </button>
            </div>
            {levels.map((l, i) => (
              <div key={i} className="card" style={{ padding: 14, background: 'var(--bg-deep)', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{l.name}</div>
                  <div style={{ color: 'var(--accent)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{l.seats.toLocaleString()} seats</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={l.standingRoom} onChange={(e) => {
                      const newLevels = [...levels];
                      newLevels[i].standingRoom = e.target.checked;
                      setLevels(newLevels);
                    }} /> Standing Room
                  </label>
                  <button 
                    className="btn-icon" 
                    style={{ width: 28, height: 28, color: 'var(--status-alert)' }}
                    onClick={() => setLevels(levels.filter((_, idx) => idx !== i))}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="card" style={{ marginTop: 24 }}>
          <div className="card-header">
            <span className="card-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              3D Model Upload
            </span>
            <span className="badge badge-accent">V2.4.81-FINAL</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: 40, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--bg-deep)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p>Drag and drop your 3D file here or <span className="label-accent" style={{ cursor: 'pointer' }} onClick={() => alert('Accessing local asset repository...')}>browse files</span></p>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Supported: CAD, BIM, FBX, OBJ</span>
              <span className="label-caps" style={{ fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => alert('Loading architectural templates...')}>Use template instead</span>
            </div>
            <div>
              <div className="card" style={{ background: 'var(--bg-deep)', padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>stadium_base_mesh.fbx</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>UPLOADED • 12.4 MB • PROCESSING ASSETS...</div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div className="progress-bar" style={{ marginTop: 10 }}>
                  <div className="progress-bar-fill accent" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="card" style={{ background: 'var(--bg-deep)', padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: '1rem' }}>💡</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Pro Tip: Uploading a BIM file will automatically populate structural metadata for sensor placement in Step 3.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="card" style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>{['', '📡', '🏗️', '🔗', '👤'][step-1]}</div>
            <h3>{['', 'Sensor Configuration', 'Digital Twin Setup', 'Integration Connections', 'User Onboarding'][step-1]}</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Configure {['', 'LiDAR and IoT sensors', 'zones and pathways', 'ticketing and transit APIs', 'admin accounts and roles'][step-1]} for your venue</p>
          </div>
        </div>
      )}

      <div className="wizard-footer">
        <button className="btn btn-ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate('/super-admin/venues')}>
          ← Previous
        </button>
        <span className="auto-save">Auto-saved 2m ago</span>
        <button className="btn btn-primary" onClick={handleNext}>
          {step < 5 ? `Next: ${['Sensor Configuration', 'Digital Twin Setup', 'Integration Connections', 'User Onboarding', ''][step]} →` : 'Complete Setup →'}
        </button>
      </div>
    </AppShell>
  );
}
