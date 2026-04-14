import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import GlassPanel from '../../components/common/GlassPanel';
import StatCard from '../../components/common/StatCard';
import { venueEvents } from '../../data/mockData';
import { venueAdminSidebar, venueAdminBrand } from '../../data/sidebarConfig';

export default function VenueCommandCenter() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ h: 2, m: 34, s: 12 });
  const [occupancy, setOccupancy] = useState(24500);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedDay, setSelectedDay] = useState('SUN');

  const showToast = (msg, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.zIndex = '10000';
    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.innerHTML = type === 'success' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12.01" y2="8"/><polyline points="11 12 12 12 12 16 13 16"/></svg>';
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

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(p => {
        let { h, m, s } = p;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) h = 0;
        return { h, m, s };
      });
      setOccupancy(prev => Math.max(20000, Math.min(30000, prev + Math.floor((Math.random() - 0.3) * 100))));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pct = (occupancy / 82500 * 100).toFixed(0);
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const quickCommands = [
    { icon: '➕', label: 'Create Event', sub: 'New stadium booking', path: '/venue-admin/events' },
    { icon: '👥', label: 'Manage Staff', sub: 'Rosters & assignments', path: '/venue-admin/staff' },
    { icon: '🔔', label: 'Send Alert', sub: 'Global push broadcast', action: 'alert' },
    { icon: '📊', label: 'View Reports', sub: 'Historical analysis', path: '/analytics/report' },
    { icon: '📡', label: 'Sensor Lab', sub: 'Telemetry config', path: '/venue-admin/sensors' },
    { icon: '🧪', label: 'Open Sandbox', sub: 'Test environment', path: '/operations/sandbox' },
  ];

  const handleCommand = (cmd) => {
    if (cmd.path) {
      navigate(cmd.path);
    } else if (cmd.action === 'alert') {
      // Mock global broadcast
      showToast('🔴 COMMAND_BROADCAST: Emergency Intel Sent To All Nodes', 'critical');
    }
  };

  const intel = [
    { tag: 'SEC', msg: 'Gate 4 entry surge detected. Deploying auxiliary staff.', color: 'var(--status-warning)' },
    { tag: 'SYS', msg: 'Sensor Node 12-B recalibrated successfully.', color: 'var(--text-secondary)' },
    { tag: 'FAC', msg: 'Section 203 beverage spill reported. Custodial dispatched.', color: 'var(--status-alert)' },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Zone A: Technical & Core Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <GlassPanel padding={0} style={{ overflow: 'hidden' }}>
            <div className="map-placeholder-bg" style={{ height: 200 }}>
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot online pulse"></span>
                <span className="mono" style={{ fontSize: '0.68rem', opacity: 0.7 }}>LIVE: TWIN INSTANCE #882</span>
              </div>
              <div className="stadium-bowl mini">
                 <div className="stadium-inner-ring" />
              </div>
            </div>
            <div style={{ padding: 12, textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/operations')}>
                <Icon name="expand" size={14} /> Full Ops View
              </button>
            </div>
          </GlassPanel>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <StatCard 
              compact 
              label="Live Occupancy" 
              value={occupancy.toLocaleString()} 
              progress={pct} 
              subtext={`/ 82,500 CAP`} 
            />
            <StatCard 
              compact 
              label="Kickoff Countdown" 
              value={`${String(countdown.h).padStart(2, '0')}:${String(countdown.m).padStart(2, '0')}:${String(countdown.s).padStart(2, '0')}`}
              subtext="T-MINUS MATCH"
            />
          </div>

          <GlassPanel header="Rolling Intelligence" headerActions={<span className="label-accent">Real-Time</span>}>
            <div className="intel-stack">
              {intel.map((item, i) => (
                <div key={i} className="intel-row" style={{ borderLeftColor: item.color }}>
                  <span style={{ color: item.color, fontWeight: 700 }}>[{item.tag}]</span> {item.msg}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Zone B: Quick Access */}
        <GlassPanel header="Command Palette">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {quickCommands.map((cmd, i) => (
              <div key={i} className="command-tile" onClick={() => handleCommand(cmd)}>
                <div className="command-icon">{cmd.icon}</div>
                <div className="command-info">
                  <div className="command-label">{cmd.label}</div>
                  <div className="command-sub">{cmd.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Zone C: Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <GlassPanel 
            header="Event Schedule" 
            headerActions={
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="btn-icon" onClick={() => navigate('/venue-admin/events')}>‹</button>
                <button className="btn-icon" onClick={() => navigate('/venue-admin/events')}>›</button>
              </div>
            }
          >
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {days.map((d) => (
                <button 
                  key={d} 
                  className={`btn ${selectedDay === d ? 'btn-primary' : 'btn-ghost'}`} 
                  style={{ flex: 1, padding: '6px 0', fontSize: '0.68rem' }}
                  onClick={() => {
                    setSelectedDay(d);
                    showToast(`Viewing schedule for ${d}`, 'info');
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="schedule-stack" style={{ minHeight: 180 }}>
              {venueEvents.filter(e => e.date === selectedDay).map((evt, i) => (
                <div key={evt.id} className={`card ${i === 0 ? 'card-accent' : ''}`} style={{ padding: 14, marginBottom: 10, cursor: 'pointer' }} onClick={() => navigate('/venue-admin/events')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <h4 style={{ fontSize: '0.95rem' }}>{evt.name}</h4>
                    <div style={{ textAlign: 'right' }}>
                      <div className="mono" style={{ fontWeight: 700 }}>{evt.expected.toLocaleString()}</div>
                      <div className="label-caps" style={{ fontSize: '0.55rem' }}>Expected</div>
                    </div>
                  </div>
                  <div className="schedule-meta">
                    <Icon name="clock" size={12} /> {evt.time} START
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span className={`badge badge-${evt.staffing === 'full' ? 'success' : 'warning'}`}>
                      [ {evt.staffing.toUpperCase()} ]
                    </span>
                    {i === 0 && <span className="label-accent" style={{ fontSize: '0.65rem' }}>Brief →</span>}
                  </div>
                </div>
              ))}
              {venueEvents.filter(e => e.date === selectedDay).length === 0 && (
                <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  NO EVENTS SCHEDULED
                </div>
              )}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Unified Status Bar */}
      <GlassPanel padding="12px 20px" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="weather-widget">
            <span style={{ fontSize: '1.2rem' }}>☀️</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Clear Skies</div>
              <div className="mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>22°C</div>
            </div>
          </div>
          <div className="weather-forecast">
             {[{ d: 'MON', t: '24°' }, { d: 'TUE', t: '26°' }].map(f => (
               <div key={f.d} className="forecast-item">
                 <span className="label-caps" style={{ fontSize: '0.55rem' }}>{f.d}</span>
                 <span className="mono">{f.t}</span>
               </div>
             ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="status-item"><span className="status-dot online" /> SYSTEM: OK</span>
          <span className="badge badge-neutral">v2.4.92-STABLE</span>
        </div>
      </GlassPanel>
    </>
  );
}
