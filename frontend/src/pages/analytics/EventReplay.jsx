import { useState, useEffect } from 'react';
import { eventApi } from '../../api';
import { formatCurrency } from '../../utils/currency';
import { useNotifications } from '../../context/NotificationContext';

const timelineEvents = [
  { time: 'T-00:00', label: 'SESSION INITIALIZED', icon: '📡', color: 'var(--accent)' },
  { time: 'T+00:15', label: 'INGRESS PEAK', icon: null, color: 'var(--text-muted)' },
  { time: 'T+00:45', label: 'NOMINAL LOAD', icon: '🎯', color: 'var(--status-ok)', waveform: true },
  { time: 'T+01:30', label: 'HALFTIME SURGE', icon: '🔥', color: 'var(--status-warning)' },
  { time: 'T+02:15', label: 'EGRESS PROTOCOL', icon: null, color: 'var(--text-muted)' },
];

export default function EventReplay() {
  const [scrubber, setScrubber] = useState(42);
  const [activeLayers, setActiveLayers] = useState(['Density']);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const { showToast, addNotification } = useNotifications();

  const fetchReplayData = async () => {
    try {
      const data = await eventApi.getAll();
      if (data.length > 0) {
        setEvent(data[0]);
      }
    } catch (err) {
      console.error('Failed to reconstruct event node:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplayData();
  }, []);

  const layers = ['Density', 'Revenue', 'Incidents'];
  const layerColors = { Density: 'badge-accent', Revenue: 'badge-info', Incidents: 'badge-critical' };

  if (loading) return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1>Temporal Syncing...</h1>
          </div>
        </div>
      </div>
      <div style={{ padding: 60, textAlign: 'center' }}>Reconstructing Spatio-Temporal Data...</div>
    </>
  );

  const currentOccupancy = Math.floor((event?.peakAttendance || 75000) * (scrubber / 100));
  const currentRevenue = (currentOccupancy * 0.15).toFixed(2);

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <p className="label-caps">FORENSIC ANALYSIS // {activeTab.toUpperCase()}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 12, borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
                {['Dashboard', 'Analytics', 'Live Map', 'Archive'].map((t) => (
                  <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', fontSize: '0.65rem' }} onClick={() => { setActiveTab(t); showToast(`Re-syncing timeline: ${t}`, 'info'); }}>{t}</span>
                ))}
              </div>
            </div>
            <h1>Event Replay: {event?.name || 'Replay Node'}</h1>
          </div>
          <div className="page-actions">
            <div className="badge badge-accent" style={{ padding: '6px 14px', marginRight: 8 }}>{event?.date}</div>
            <button className="btn btn-primary" style={{ fontSize: '0.72rem' }} onClick={() => { addNotification('Intelligence Exported', 'Forensic spatio-temporal node exported for city-level audit.', 'info'); showToast('Exporting Forensic Data...', 'success'); }}>↓ Export Intelligence</button>
          </div>
        </div>
      </div>

      {activeTab === 'Dashboard' && renderDashboard()}
      {activeTab === 'Analytics' && renderAnalytics()}
      {activeTab === 'Live Map' && renderLiveMap()}
      {activeTab === 'Archive' && renderArchive()}
    </>
  );

  function renderDashboard() {
    return (
      <div className="page-enter">
        <div style={{ display: 'flex', gap: 20, marginBottom: 4 }}>
          <div>
            <div className="label-caps">Forensic Layers</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {layers.map(l => (
                <button key={l} className={`badge ${activeLayers.includes(l) ? layerColors[l] : 'badge-neutral'}`}
                  onClick={() => {
                    const newLayers = activeLayers.includes(l) ? activeLayers.filter(x => x !== l) : [...activeLayers, l];
                    setActiveLayers(newLayers);
                    showToast(`Layer ${l} ${activeLayers.includes(l) ? 'disabled' : 'enabled'}`, 'info');
                  }}
                  style={{ cursor: 'pointer', border: 'none' }}>
                  {l === 'Incidents' ? '⚠' : '◉'} {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, marginTop: 16 }}>
          {/* Timeline */}
          <div>
            {timelineEvents.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 20, position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 50 }}>
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{e.time}</span>
                  {i < timelineEvents.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border-color)', marginTop: 8 }}></div>}
                </div>
                <div className="card" style={{ padding: 12, flex: 1, borderLeft: `3px solid ${e.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {e.icon && <span>{e.icon}</span>}
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase' }}>{e.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Viewport */}
          <div>
            <div className="card" style={{ marginBottom: 16, overflow: 'hidden', position: 'relative', minHeight: 420, padding: 0 }}>
              <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 5 }}>
                <span className="badge badge-success" style={{ padding: '6px 12px' }}>
                  <span className="status-dot online pulse" style={{ width: 6, height: 6 }}></span>
                  Forensic Reconstruction
                </span>
                <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 6 }}>SYNC_ID: {event?._id?.substring(0,8)}</div>
              </div>
              
              <div style={{ height: '100%', minHeight: 400, background: 'linear-gradient(135deg, #0D1117 0%, #111827 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: 220, height: 220, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50% 50% 40% 40%', border: '1px solid var(--accent-border)', opacity: 0.4 }}></div>
                  <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', borderRadius: '50% 50% 40% 40%', border: '2px solid var(--accent)', opacity: 0.6, boxShadow: `inset 0 0 ${scrubber/2}px var(--accent-dim)` }}></div>
                  <div className="mono" style={{ position: 'absolute', bottom: -40, width: '100%', textAlign: 'center', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '2px' }}>REPLAYING_NODE_ALPHA</div>
                </div>
              </div>

              {/* Scrubber Controls */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 24px', background: 'rgba(11, 15, 25, 0.95)', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <button className="btn-icon" style={{ width: 36, height: 36, background: 'var(--accent-dim)', color: 'var(--accent)', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>▶</button>
                  <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent)', minWidth: 60 }}>{String(Math.floor(scrubber * 1.8)).padStart(2, '0')}:00</div>
                  <input type="range" min="0" max="100" value={scrubber} onChange={e => setScrubber(Number(e.target.value))} style={{ flex: 1, accentColor: 'var(--accent)' }} />
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SESSION_LENGTH: 180M</span>
                </div>
              </div>
            </div>

            {/* Telemetry Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
              <div>
                <div className="label-caps" style={{ marginBottom: 12 }}>Temporal Intelligence</div>
                <h2 style={{ marginBottom: 8 }}>{scrubber > 70 ? 'Egress Phase' : scrubber > 30 ? 'Internal Peak' : 'Ingress Loading'}</h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Observing spatio-temporal crowd behavior at the {scrubber}% mark. Spatial density is currently concentrated in 
                  <span style={{ color: 'var(--accent)' }}> Zone {Math.floor(scrubber / 10) + 1}</span>.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="card" style={{ padding: 16, background: 'var(--bg-deep)' }}>
                  <div className="label-caps">Occupancy</div>
                  <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginTop: 4 }}>{currentOccupancy.toLocaleString()}</div>
                </div>
                <div className="card" style={{ padding: 16, background: 'var(--bg-deep)' }}>
                  <div className="label-caps">Rev. Flow</div>
                  <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 4 }}>{formatCurrency(currentRevenue)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderAnalytics() {
    return (
      <div className="page-enter">
        <div className="grid-3" style={{ marginBottom: 24 }}>
          <div className="card">
            <div className="label-caps">Avg Density (P/m2)</div>
            <div className="metric-medium mono" style={{ color: 'var(--accent)', marginTop: 8 }}>2.4</div>
          </div>
          <div className="card">
            <div className="label-caps">Peak Congestion</div>
            <div className="metric-medium mono" style={{ color: 'var(--status-warning)', marginTop: 8 }}>4.8</div>
          </div>
          <div className="card">
            <div className="label-caps">Flow Efficiency</div>
            <div className="metric-medium mono" style={{ color: 'var(--status-ok)', marginTop: 8 }}>94%</div>
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="label-caps" style={{ marginBottom: 16 }}>Flow Rate Over Time (Forensic Node)</div>
          <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            {[20, 30, 45, 60, 85, 95, 80, 70, 60, 45, 30, 20, 25, 40, 55, 75, 90, 85, 60, 40].map((v, i) => (
              <div key={i} style={{ flex: 1, height: `${v}%`, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: '2px 2px 0 0' }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <span className="label-caps" style={{ fontSize: '0.62rem' }}>START</span>
            <span className="label-accent" style={{ fontSize: '0.62rem' }}>PEAK SURGE</span>
            <span className="label-caps" style={{ fontSize: '0.62rem' }}>END</span>
          </div>
        </div>
      </div>
    );
  }

  function renderLiveMap() {
    return (
      <div className="page-enter">
        <div className="card" style={{ height: 500, background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="pulse" style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(52, 152, 219, 0.1)', border: '1px solid var(--accent)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🗺️</span>
            </div>
            <h3 className="label-accent">Forensic Grid v2.4</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 8 }}>Spilling historical density data onto high-resolution vector grid...</p>
          </div>
        </div>
      </div>
    );
  }

  function renderArchive() {
    return (
      <div className="page-enter">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Archive Registry</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Node ID</th>
                <th>Event Title</th>
                <th>Type</th>
                <th>Duration</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'FNS-A920', title: 'Summer Jam 2026', type: 'Concert', dur: '4h 12m' },
                { id: 'FNS-B112', title: 'Tech Expo Central', type: 'Exhibition', dur: '12h 45m' },
                { id: 'FNS-C440', title: 'Derby Finals', type: 'Sporting', dur: '2h 30m' },
              ].map((a, i) => (
                <tr key={i}>
                  <td className="mono" style={{ color: 'var(--accent)' }}>{a.id}</td>
                  <td>{a.title}</td>
                  <td><span className="badge badge-neutral">{a.type}</span></td>
                  <td className="mono">{a.dur}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn btn-ghost" style={{ fontSize: '0.65rem' }} onClick={() => showToast(`Loading node ${a.id}...`, 'info')}>Load Replay</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
