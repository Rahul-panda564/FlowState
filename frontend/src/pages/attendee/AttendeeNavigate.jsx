import { useState, useEffect } from 'react';
import AttendeeShell from '../../layouts/AttendeeShell';

export default function AttendeeNavigate() {
  const [loading, setLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState('full');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AttendeeShell title="Smart Navigation">
      <div className="attendee-navigate page-enter">
        {/* Map Header */}
        <div style={{ background: 'var(--bg-elevated)', borderRadius: 20, padding: 16, marginBottom: 20, border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span className="label-caps">Signal Strength</span>
            <span style={{ color: 'var(--status-ok)', fontSize: '0.75rem', fontWeight: 700 }}>HIGH PRECISION (0.2m)</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['full', 'seating', 'services'].map(layer => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: activeLayer === layer ? 'var(--accent)' : 'var(--bg-deep)',
                  color: activeLayer === layer ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Map Display */}
        <div className="map-container" style={{ position: 'relative', height: 400, background: '#0a0d14', borderRadius: 24, border: '1px solid var(--accent-border)', overflow: 'hidden', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)' }}>
          {/* Grid lines for precision look */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }}></div>
          
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
              <div className="pulse" style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--accent)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
              <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>LOADING GRID...</span>
            </div>
          ) : (
            <>
              {activeLayer === 'full' && (
                <>
                  {/* Pathfinding */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <path d="M 50 350 L 150 200 L 250 250 L 340 50" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="8 4" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px var(--accent))' }} />
                  </svg>
                  {/* Destination Pin */}
                  <div style={{ position: 'absolute', top: '50px', left: '340px', transform: 'translate(-50%, -100%)' }}>
                    <div style={{ color: 'var(--status-alert)', fontSize: '2rem' }}>📍</div>
                    <div style={{ background: 'var(--bg-elevated)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-accent)', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap' }}>SEC 102</div>
                  </div>
                  {/* User Pulse */}
                  <div style={{ position: 'absolute', bottom: '50px', left: '50px', transform: 'translate(-50%, -50%)' }}>
                    <div style={{ width: 24, height: 24, background: 'var(--accent)', borderRadius: '50%', opacity: 0.3, position: 'absolute', top: -10, left: -10, animation: 'glowPulse 2s infinite' }}></div>
                    <div style={{ width: 12, height: 12, background: 'var(--accent)', borderRadius: '50%', border: '2px solid white' }}></div>
                  </div>
                </>
              )}

              {activeLayer === 'seating' && (
                <>
                  {/* Technical Blueprint Overlay */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.2 }}>
                    <defs>
                      <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--accent)" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
                    {/* Architectural structural lines */}
                    <path d="M0,50 L400,50 M0,150 L400,150 M0,250 L400,250" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="4 4" />
                    <path d="M50,0 L50,400 M150,0 L150,400 M250,0 L250,400" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="4 4" />
                  </svg>

                  {/* Polygon Seating Grid */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.8 }}>
                    <polygon points="40,20 180,20 160,120 20,120" fill="rgba(0, 212, 170, 0.05)" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 1" />
                    <text x="70" y="75" fill="var(--text-muted)" fontSize="10" fontWeight="bold" className="mono">ZONE_A [427]</text>
                    
                    <polygon points="190,20 330,20 350,120 210,120" fill="rgba(0, 212, 170, 0.1)" stroke="var(--accent)" strokeWidth="2" />
                    <text x="250" y="75" fill="var(--accent)" fontSize="10" fontWeight="bold" className="mono">ZONE_B [428]</text>
                    
                    <path d="M20,140 L350,140 L370,260 L0,260 Z" fill="rgba(255,255,255,0.02)" stroke="var(--border-subtle)" strokeWidth="1" />
                    <text x="140" y="200" fill="var(--text-muted)" fontSize="10" fontWeight="bold" className="mono">LOWER_BOWL_PRIME</text>
                    
                    {/* Exit Arrows (Blueprint-style) */}
                    <path d="M360,140 L380,140 M370,130 L380,140 L370,150" fill="none" stroke="var(--status-alert)" strokeWidth="2" />
                    <text x="340" y="130" fill="var(--status-alert)" fontSize="8" className="mono">EXIT_04</text>
                  </svg>
                </>
              )}

              {activeLayer === 'services' && (
                <>
                  {/* Technical Blueprint Overlay */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15 }}>
                     <path d="M0,100 L400,100 M0,300 L400,300" stroke="var(--accent)" strokeWidth="1" />
                     <path d="M100,0 L100,400 M300,0 L300,400" stroke="var(--accent)" strokeWidth="1" />
                  </svg>
                  {/* Services Grid UI */}
                  <div style={{ position: 'absolute', top: 80, left: 100, textAlign: 'center' }}>
                    <div style={{ width: 40, height: 40, background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: 4, border: '2px solid white', boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}>🚻</div>
                    <div className="label-caps" style={{ background: 'var(--bg-deep)', padding: '2px 6px', borderRadius: 4, fontSize: '0.6rem' }}>RESTROOM_NORTH</div>
                  </div>
                  <div style={{ position: 'absolute', top: 180, right: 80, textAlign: 'center' }}>
                    <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: 4, border: '2px solid white', boxShadow: '0 0 15px rgba(0, 212, 170, 0.4)' }}>🍔</div>
                    <div className="label-caps" style={{ background: 'var(--bg-deep)', padding: '2px 6px', borderRadius: 4, fontSize: '0.6rem' }}>KHANA_PLAZA</div>
                  </div>
                  <div style={{ position: 'absolute', bottom: 60, left: 140, textAlign: 'center' }}>
                    <div style={{ width: 40, height: 40, background: 'var(--status-alert)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: 4, border: '2px solid white', boxShadow: '0 0 15px rgba(255, 71, 87, 0.4)' }}>⚕️</div>
                    <div className="label-caps" style={{ background: 'var(--bg-deep)', padding: '2px 6px', borderRadius: 4, fontSize: '0.6rem' }}>MEDICAL_U02</div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Navigation Instructions */}
        <div style={{ background: 'rgba(0, 212, 170, 0.05)', border: '1px solid var(--accent-border)', borderRadius: 20, padding: 20, marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, background: 'var(--accent)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>In 50 Meters</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Turn right at Concession Hub B</div>
            </div>
          </div>
        </div>
      </div>
    </AttendeeShell>
  );
}
