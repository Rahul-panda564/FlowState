import { useState, useEffect } from 'react';
import AppShell from '../../layouts/AppShell';
import { eventApi } from '../../api';
import { analyticsSidebar, analyticsBrand } from '../../data/sidebarConfig';
import { formatCurrency } from '../../utils/currency';

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

  if (loading) return <AppShell sidebarItems={analyticsSidebar} brand={analyticsBrand.brand} brandSub={analyticsBrand.brandSub}><div style={{ padding: 60, textAlign: 'center' }}>Reconstructing Spatio-Temporal Data...</div></AppShell>;

  // Simulated telemetry based on scrubber
  const currentOccupancy = Math.floor((event?.peakAttendance || 75000) * (scrubber / 100));
  const currentRevenue = (currentOccupancy * 0.15).toFixed(2);

  return (
    <AppShell sidebarItems={analyticsSidebar} brand={analyticsBrand.brand} brandSub={analyticsBrand.brandSub} user={null}
      headerExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="badge badge-accent" style={{ padding: '6px 14px' }}>{event?.name || 'Replay Node'} - {event?.date}</div>
          {['Dashboard', 'Analytics', 'Live Map', 'Archive'].map((t, i) => (
            <span key={t} className={i === 1 ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer' }}>{t}</span>
          ))}
          <button className="btn btn-primary" style={{ fontSize: '0.72rem' }}>↓ Export Intelligence</button>
        </div>
      }
    >
      <div style={{ display: 'flex', gap: 20, marginBottom: 4 }}>
        <div>
          <div className="label-caps">Forensic Layers</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {layers.map(l => (
              <button key={l} className={`badge ${activeLayers.includes(l) ? layerColors[l] : 'badge-neutral'}`}
                onClick={() => setActiveLayers(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])}
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
            
            <div style={{ height: '100%', minHeight: 380, background: 'linear-gradient(135deg, #0D1117 0%, #111827 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    </AppShell>
  );
}
