import { attendeeRecap } from '../../data/mockData';

export default function AttendeeRecap() {
  const d = attendeeRecap;

  return (
    <>
      <div className="page-header" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-deep)', margin: '-20px -20px 20px -20px', padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Journey Recap</h2>
      </div>
      <div className="attendee-recap page-enter">
        {/* Distance Hero */}
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div className="label-caps" style={{ marginBottom: 8 }}>Total Distance</div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-color)" strokeWidth="4" strokeDasharray="4 6"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="245 82" strokeLinecap="round"/>
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <span className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>{d.totalDistance}</span>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>miles</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="badge badge-accent" style={{ padding: '6px 16px' }}>↗ {d.distancePercentile}</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24, padding: '16px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <div className="label-caps" style={{ marginBottom: 4, fontSize: '0.65rem' }}>Time in Seat</div>
            <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700 }}>{d.timeInSeat}</div>
          </div>
          <div>
            <div className="label-caps" style={{ marginBottom: 4, fontSize: '0.65rem' }}>Time Saved</div>
            <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>{d.timeSaved}</div>
          </div>
          <div>
            <div className="label-caps" style={{ marginBottom: 4, fontSize: '0.65rem' }}>Steps Taken</div>
            <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700 }}>{d.stepsTaken.toLocaleString()}</div>
          </div>
          <div>
            <div className="label-caps" style={{ marginBottom: 4, fontSize: '0.65rem' }}>Crowd Areas</div>
            <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>{String(d.crowdZonesAvoided).padStart(2, '0')} <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>avoided</span></div>
          </div>
        </div>

        {/* Route Visualization */}
        <div className="card" style={{ padding: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 2, fontSize: '0.9rem' }}>Route Visualized</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2.3 MILES THROUGH STADIUM</div>
          </div>
          <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '6px 12px' }}>▶ Replay</button>
        </div>

        {/* Journey Log */}
        <div style={{ marginBottom: 24 }}>
          <h4 className="label-accent" style={{ marginBottom: 16 }}>JOURNEY LOG</h4>
          {d.journeyLog.map((entry, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, position: 'relative' }}>
              {i < d.journeyLog.length - 1 && <div style={{ position: 'absolute', left: 15, top: 28, bottom: -12, width: 1, background: 'var(--border-color)' }}></div>}
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: entry.time ? 'var(--accent-dim)' : 'var(--bg-elevated)', border: `1px solid ${entry.time ? 'var(--accent-border)' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0, zIndex: 2 }}>
                {entry.icon}
              </div>
              <div style={{ flex: 1 }}>
                {entry.time && <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--accent)', marginBottom: 2 }}>{entry.time}</div>}
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 2 }}>{entry.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{entry.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary w-full" style={{ padding: '14px', fontSize: '0.88rem', justifyContent: 'center', marginBottom: 20 }}>
          ⊕ Export to Story
        </button>
      </div>
    </>
  );
}
