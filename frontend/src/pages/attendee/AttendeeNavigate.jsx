import { useState, useEffect } from 'react';
import AttendeeShell from '../../layouts/AttendeeShell';

export default function AttendeeNavigate() {
  const [loading, setLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState('wayfinding');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AttendeeShell title="Tactical HUD">
      <div className="attendee-navigate page-enter">
        {/* Advanced HUD Header */}
        <div className="card-premium" style={{ borderRadius: 24, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div className="hud-scanline" style={{ opacity: 0.1 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <span className="label-hud">TACTICAL_POSITIONING_SYSTEM</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', marginTop: 4 }}>NAV_NEXUS_01</h2>
            </div>
            <div className="status-dot online small pulse"></div>
          </div>
          
          <div style={{ display: 'flex', gap: 8 }}>
            {['wayfinding', 'seating', 'services'].map(layer => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`btn-premium ${activeLayer === layer ? 'active' : ''}`}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: activeLayer === layer ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                  color: activeLayer === layer ? 'black' : 'var(--text-secondary)',
                  borderRadius: 14,
                  border: activeLayer === layer ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        {/* 3D ISOMETRIC VIEWPORT */}
        <div className="isometric-viewport" style={{ 
          height: 480, 
          background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)', 
          borderRadius: 32, 
          border: '1px solid var(--border-accent)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 0 100px rgba(0,212,170,0.05)'
        }}>
          {/* Global Radar Sweep */}
          <div className="radar-field" />
          
          <div className="isometric-map" style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Dynamic 3D Stadium Floor */}
            <div style={{ 
              position: 'absolute', top: '50%', left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: 500, height: 600, 
              border: '2px solid rgba(0, 212, 170, 0.1)', 
              borderRadius: '100px 100px 150px 150px',
              background: 'rgba(0,0,0,0.2)',
              boxShadow: '0 0 40px rgba(0, 212, 170, 0.05)'
            }}>
              {/* Floor Grid (Isometric Perspective) */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0, 212, 170, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', borderRadius: 'inherit' }} />
              
              {loading ? (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotateZ(35deg) rotateX(-55deg)' }}>
                  <div className="label-hud data-pulse">LINKING_SATELLITE_FEED...</div>
                </div>
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  
                  {/* ZONE BLOCKS (Raised Prisms) */}
                  <div style={{ position: 'absolute', top: '15%', left: '20%', width: 120, height: 80, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, boxShadow: '10px 10px 0 rgba(0,0,0,0.5)' }}>
                    <div style={{ padding: 8, fontSize: '0.6rem', color: 'var(--text-muted)' }} className="mono">SEC_101</div>
                  </div>
                  
                  <div style={{ position: 'absolute', top: '15%', right: '20%', width: 120, height: 80, background: 'rgba(0, 212, 170, 0.08)', border: '2px solid var(--accent)', borderRadius: 12, boxShadow: '15px 15px 30px rgba(0, 212, 170, 0.1)' }}>
                    <div style={{ padding: 8, fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 800 }} className="mono">TARGET_ZONE_427</div>
                    <div style={{ position: 'absolute', bottom: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--status-alert)' }} className="data-pulse" />
                  </div>

                  {/* WAYFINDING NEON PATH */}
                  {activeLayer === 'wayfinding' && (
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                       <path 
                         d="M 120 480 L 120 280 L 320 280 L 320 200" 
                         fill="none" 
                         stroke="var(--accent)" 
                         strokeWidth="8" 
                         strokeLinecap="round" 
                         style={{ 
                            filter: 'drop-shadow(0 0 20px var(--accent))', 
                            strokeDasharray: '500', 
                            strokeDashoffset: '500', 
                            animation: 'draw-path-3d 3s linear infinite',
                            opacity: 0.8
                         }} 
                       />
                    </svg>
                  )}

                  {/* DESTINATION LIGHT PILLAR */}
                  <div style={{ 
                    position: 'absolute', top: '20%', right: '35%', 
                    width: 2, height: 200, 
                    background: 'linear-gradient(to top, var(--accent) 0%, transparent 100%)',
                    boxShadow: '0 0 20px var(--accent)',
                    animation: 'beam-pulse 2s ease-in-out infinite',
                    zIndex: 20
                  }}>
                    <div style={{ 
                      position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
                      width: 20, height: 10, background: 'var(--accent)', filter: 'blur(8px)', opacity: 0.5
                    }} />
                  </div>

                  {/* USER PING PING */}
                  <div style={{ position: 'absolute', bottom: '20%', left: '24%' }}>
                    <div style={{ width: 40, height: 40, border: '2px solid white', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', transform: 'translate(-50%, -50%)' }} className="data-pulse"></div>
                    <div style={{ width: 12, height: 12, background: 'white', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 20px white' }}></div>
                  </div>

                  {/* SERVICE CLUSTERS (Services Layer Only) */}
                  {activeLayer === 'services' && (
                    <div className="page-enter">
                      <div style={{ position: 'absolute', top: '40%', left: '15%' }}>
                        <div style={{ width: 48, height: 48, background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }} className="data-pulse">🚻</div>
                        <div className="label-hud" style={{ marginTop: 8, textAlign: 'center' }}>NORTH_GATE</div>
                      </div>
                      <div style={{ position: 'absolute', top: '50%', right: '15%' }}>
                        <div style={{ width: 60, height: 60, background: 'rgba(0, 212, 170, 0.1)', border: '2px solid var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 0 40px rgba(0, 212, 170, 0.3)' }} className="data-pulse">🍔</div>
                        <div className="label-hud" style={{ marginTop: 8, textAlign: 'center' }}>PLAZA_FOOD</div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 20, right: 24, textAlign: 'right', pointerEvents: 'none' }}>
            <div className="label-hud" style={{ fontSize: '0.6rem', opacity: 0.5 }}>SYST_LOAD: STABLE</div>
            <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--accent)' }}>LEVEL_01 // SEC_427</div>
          </div>
        </div>

        {/* HUD Navigation Footer */}
        <div className="card-premium stagger-item" style={{ marginTop: 20, padding: 24, borderRadius: 28, position: 'relative', background: 'rgba(0, 212, 170, 0.05)', border: '1px solid var(--border-accent)' }}>
          <div style={{ position: 'absolute', top: 12, right: 20, fontSize: '0.5rem', color: 'var(--accent)', opacity: 0.4 }} className="mono">TACTICAL_GUIDE_V4</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
             <div className="data-pulse" style={{ width: 64, height: 64, background: 'var(--accent)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', boxShadow: '0 0 30px var(--accent-glow)' }}>
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="9 18 15 12 9 6"/></svg>
             </div>
             <div>
               <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'white' }}>IN 50 METERS</div>
               <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Follow the **Neon Trail** to Section 427</div>
             </div>
          </div>
        </div>
      </div>
    </AttendeeShell>
  );
}
