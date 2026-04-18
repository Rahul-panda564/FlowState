import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { venues } from '../../data/mockData';
import { formatCurrency } from '../../utils/currency';

export default function AttendeeHome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Fan');
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEvacuating, setIsEvacuating] = useState(false);

  // Mock fetching current venue context
  const fetchLiveStatus = () => {
    setVenue(venues[0]);
    const lastUser = localStorage.getItem('flowstate_last_user');
    if (lastUser) {
      // In a real app, fetch name from Firestore. Here we use email prefix or stored name.
      const name = lastUser.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLiveStatus();
    const i = setInterval(fetchLiveStatus, 3000);
    return () => clearInterval(i);
  }, []);

  if (loading) return (
    <>
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--accent)' }} className="pulse">
        ESTABLISHING SECURE LINK...
      </div>
    </>
  );

  return (
    <>
      <div className="attendee-home" style={{ paddingBottom: 40 }}>
        
        {/* Immersive Hero Header */}
        <div style={{ 
          position: 'relative', 
          margin: '-20px -20px 24px -20px', 
          padding: '40px 24px 30px',
          background: isEvacuating ? 'radial-gradient(circle at top, rgba(255, 71, 87, 0.4), var(--bg-deep))' : 'radial-gradient(circle at top, rgba(0, 212, 170, 0.15), var(--bg-deep))',
          overflow: 'hidden'
        }}>
          {/* Grid bg */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)', backgroundSize: '15px 15px', opacity: 0.2 }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 900, 
              background: isEvacuating ? 'var(--status-alert)' : 'linear-gradient(90deg, #fff, var(--accent))', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: 10,
              letterSpacing: '-0.03em'
            }}>
              {isEvacuating ? 'EVACUATE' : userName ? `NAMASTE, ${userName}.` : 'NAMASTE.'}
            </h1>
            <p style={{ color: isEvacuating ? 'var(--status-alert)' : 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {isEvacuating ? 'Emergency protocol initialized.' : `Digital Pass Active • ${venue?.name}`}
            </p>
          </div>
        </div>

        {/* Premium Digital Ticket */}
        <div className="card-premium stagger-item" style={{ 
            borderRadius: 28, 
            padding: 24, 
            marginBottom: 24, 
            border: `1px solid ${isEvacuating ? 'var(--status-alert)' : 'var(--border-accent)'}`,
            boxShadow: isEvacuating ? '0 10px 40px rgba(255, 71, 87, 0.2)' : 'var(--shadow-card)',
            animationDelay: '0.1s'
        }}>
          <div style={{ position: 'absolute', top: 12, right: 24, fontSize: '0.6rem', color: isEvacuating ? 'var(--status-alert)' : 'var(--accent)', opacity: 0.5 }} className="mono">SYST_LINK_OK</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div className="label-accent" style={{ color: isEvacuating ? 'var(--status-alert)' : 'var(--accent)', fontSize: '0.75rem' }}>
              ✦ SMART TICKET
            </div>
            <div className={`status-dot pulse ${isEvacuating ? 'critical' : 'online'}`} />
          </div>

          <div style={{ padding: '0 10px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 4 }}>Gate</div>
              <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700 }}>{isEvacuating ? 'EXT 4' : 'G-6'}</div>
            </div>
            <div style={{ borderLeft: '1px dashed var(--border-color)', margin: '0 20px' }}></div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 4 }}>Section</div>
              <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>427</div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/attendee/navigate')} 
            className={`btn w-full`} 
            style={{ 
              marginTop: 24, 
              padding: '16px', 
              fontSize: '0.9rem',
              borderRadius: 14,
              background: isEvacuating ? 'var(--status-alert)' : 'rgba(0, 212, 170, 0.1)',
              color: isEvacuating ? '#fff' : 'var(--accent)',
              border: isEvacuating ? 'none' : '1px solid var(--accent-border)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91"/></svg>
              {isEvacuating ? 'INITIATE EVACUATION ROUTE' : 'ACTIVATE NAVIGATION'}
            </div>
          </button>
        </div>

        {/* Dynamic Activity Hub */}
        {!isEvacuating && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <button 
              className="card-premium hover-scale stagger-item" 
              onClick={() => navigate('/attendee/food')} 
              style={{ padding: 20, cursor: 'pointer', borderRadius: 20, animationDelay: '0.2s', border: 'none', textAlign: 'left', width: '100%' }}
              aria-label="Access Express Food menu"
            >
              <div style={{ fontSize: '2rem', marginBottom: 12 }} aria-hidden="true">🍔</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'white' }}>Express Food</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--status-ok)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot online small pulse"></span> 2 Quick Lines
              </div>
            </button>
            
            <button 
              className="card-premium hover-scale stagger-item" 
              onClick={() => navigate('/attendee/friends')} 
              style={{ padding: 20, cursor: 'pointer', borderRadius: 20, animationDelay: '0.25s', border: 'none', textAlign: 'left', width: '100%' }}
              aria-label="Open Friend Radar"
            >
              <div style={{ fontSize: '2rem', marginBottom: 12 }} aria-hidden="true">📡</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'white' }}>Friend Radar</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot online small"></span> 3 Nearby
              </div>
            </button>
          </div>
        )}

        {/* Transit Intelligence Section */}
        {!isEvacuating && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              TRANSIT HUB
              <span className="badge badge-accent" style={{ fontSize: '0.5rem' }}>LIVE</span>
            </h3>
            <div className="card" style={{ padding: 0, borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ padding: 16, borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🚆</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Blue Line Terminal</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>To Downtown</div>
                  </div>
                </div>
                <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' }}>4m</div>
              </div>
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ flex: 1, padding: 16, textAlign: 'center', borderRight: '1px solid var(--border-subtle)' }}>
                  <div className="label-accent" style={{ fontSize: '0.6rem', marginBottom: 4 }}>PARKING P2</div>
                  <div className="mono" style={{ fontWeight: 700 }}>45% FULL</div>
                </div>
                <div style={{ flex: 1, padding: 16, textAlign: 'center' }}>
                  <div className="label-accent" style={{ fontSize: '0.6rem', marginBottom: 4 }}>SHUTTLE B</div>
                  <div className="mono" style={{ fontWeight: 700 }}>8m WAIT</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug/Emergency Sim */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
           <button 
             onClick={() => setIsEvacuating(!isEvacuating)}
             className={`badge ${isEvacuating ? 'badge-neutral' : 'badge-critical'}`}
             style={{ cursor: 'pointer', opacity: 0.5 }}
           >
             {isEvacuating ? 'RESET SIMULATION' : 'SIMULATE EMERGENCY PROTOCOL'}
           </button>
        </div>
      </div>
    </>
  );
}
