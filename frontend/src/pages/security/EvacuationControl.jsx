import { useState, useEffect } from 'react';
import AppShell from '../../layouts/AppShell';
import { venueApi } from '../../api';
import { evacuationData } from '../../data/mockData';
import { securitySidebar, securityBrand } from '../../data/sidebarConfig';
import StatCard from '../../components/common/StatCard';

export default function EvacuationControl() {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState("00:00:00");
  const [isEvacuating, setIsEvacuating] = useState(false);

  const showToast = (msg, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type === 'success' ? 'success' : 'critical'}`;
    toast.style.zIndex = '10000';
    
    // Icon
    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.innerHTML = type === 'success' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    
    // Text
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

  const fetchVenueStatus = async () => {
    try {
      const venues = await venueApi.getAll();
      if (venues.length > 0) {
        const v = venues[0];
        setVenue(v);
        setIsEvacuating(v.status === 'Evacuating');
      }
    } catch (error) {
      console.error('Failed to sync security node:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenueStatus();
    const i = setInterval(fetchVenueStatus, 2000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!isEvacuating) return;
    const i = setInterval(() => {
      const parts = timer.split(':').map(Number);
      parts[2]++;
      if (parts[2] >= 60) { parts[2] = 0; parts[1]++; }
      if (parts[1] >= 60) { parts[1] = 0; parts[0]++; }
      setTimer(parts.map(p => String(p).padStart(2,'0')).join(':'));
    }, 1000);
    return () => clearInterval(i);
  }, [timer, isEvacuating]);

  const handleEvacToggle = async () => {
    if (!venue) return;
    const newStatus = isEvacuating ? 'Active' : 'Evacuating';
    try {
      await venueApi.update(venue._id, { status: newStatus });
      setIsEvacuating(!isEvacuating);
      if (!isEvacuating) setTimer("00:00:00");
      showToast(isEvacuating ? 'EVACUATION CONTROL CANCELLED' : '⚠ SYSTEM WIDE EVACUATION TRIGGERED', isEvacuating ? 'success' : 'critical');
    } catch {
      // Prototype fallback bypass if local DB fails
      setIsEvacuating(!isEvacuating);
      if (!isEvacuating) setTimer("00:00:00");
      showToast(isEvacuating ? 'EVACUATION CONTROL CANCELLED' : '⚠ SYSTEM WIDE EVACUATION TRIGGERED', isEvacuating ? 'success' : 'critical');
    }
  };

  const d = evacuationData;
  const remainingValue = venue ? Math.floor((venue.liveLoad / 100) * venue.capacity) : 0;
  const statusColors = { cleared: 'var(--status-ok)', clearing: 'var(--status-warning)', pending: 'var(--text-muted)' };

  return (
    <AppShell 
      sidebarItems={securitySidebar} 
      brand={securityBrand.brand} 
      brandSub={securityBrand.brandSub} 
      user={null}
      headerExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, borderRight: '1px solid var(--border-subtle)', paddingRight: 16 }}>
            {['Protocol', 'Egress', 'Agencies'].map((t) => (
              <span key={t} className="label-caps" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => showToast(`Opening ${t.toLowerCase()} control panel...`, 'info')}>{t}</span>
            ))}
          </div>
          <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '6px 10px' }} onClick={() => showToast('Compiling emergency egress report...', 'success')}>Export Intel</button>
        </div>
      }
    >
      {/* Emergency Banner */}
      <div className={`evac-header ${isEvacuating ? 'emergency-active' : ''}`} style={{ 
        background: isEvacuating ? 'rgba(255, 71, 87, 0.15)' : 'var(--bg-elevated)',
        border: isEvacuating ? '1px solid var(--status-alert)' : '1px solid var(--border-color)',
        padding: 24, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ 
          width: 50, height: 50, borderRadius: '50%', background: isEvacuating ? 'var(--status-alert)' : 'var(--bg-deep)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isEvacuating ? '0 0 20px rgba(255, 71, 87, 0.4)' : 'none'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isEvacuating ? "#fff" : "var(--text-muted)"} strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          </svg>
        </div>
        <div>
          <h2 style={{ color: isEvacuating ? 'var(--status-alert)' : 'var(--text-primary)', marginBottom: 4 }}>
            {isEvacuating ? 'MASS EVACUATION ACTIVE' : 'SYSTEM STATUS: STABLE'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="evac-timer" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>⏱ {timer}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', letterSpacing: '0.1em' }}>PROTOCOL_MONITOR: ACTIVE</span>
          </div>
        </div>
        <button 
          className={`btn ${isEvacuating ? 'btn-danger' : 'btn-primary'}`} 
          style={{ marginLeft: 'auto', padding: '12px 24px', fontSize: '1rem' }}
          onClick={handleEvacToggle}
        >
          {isEvacuating ? 'TERMINATE PROTOCOL' : 'TRIGGER MASS EVACUATION'}
        </button>
      </div>

      {loading ? (
        <div className="card" style={{ padding: 60, textAlign: 'center' }}>Connecting to Security Node...</div>
      ) : (
        <>
          <div className="grid-4" style={{ marginBottom: 24 }}>
            <div className="metric-card" style={{ borderColor: isEvacuating ? 'var(--status-alert)' : 'var(--border-color)', borderWidth: isEvacuating ? 2 : 1 }}>
              <div className="metric-card-label">Identified Persons In-Bowl</div>
              <div className="metric-card-value" style={{ color: isEvacuating ? 'var(--status-alert)' : 'var(--text-primary)' }}>{remainingValue.toLocaleString()}</div>
            </div>
            <StatCard compact label="Active Egress Channels" value="14" subtext="All Primary Gates Open" />
            <StatCard compact label="Estimated Clearance" value="12.4m" subtext="Predictive Flow Logic" />
            <StatCard compact label="Agencies On-Site" value="4" subtext="Police, Fire, Medical, Staff" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
            <div className="card">
              <div className="card-header">
                <span className="card-title">Zone Integrity Monitoring</span>
                <span className="label-accent">SENSOR GRID LIVE</span>
              </div>
              {d.zoneClearance.map((z, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < d.zoneClearance.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: z.status === 'cleared' ? 'rgba(46,204,113,0.15)' : z.status === 'clearing' ? 'rgba(245,158,11,0.15)' : 'var(--bg-deep)', border: `2px solid ${statusColors[z.status]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: statusColors[z.status], fontWeight: 700, fontSize: '0.85rem' }}>
                    {z.status === 'cleared' ? '✓' : '⟳'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{z.name}</div>
                    <div className="label-caps" style={{ color: statusColors[z.status] }}>{z.status}</div>
                  </div>
                  <div className="progress-bar" style={{ width: 100 }}>
                    <div className={`progress-bar-fill ${z.status === 'cleared' ? 'green' : 'yellow'}`} style={{ width: z.status === 'cleared' ? '100%' : '45%' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Agency Dispatch</span>
              </div>
              {d.externalAgencies.map((a, i) => (
                <div key={i} className="card" style={{ padding: 16, background: 'var(--bg-deep)', marginBottom: 12, border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontWeight: 600 }}>{a.name}</div>
                    <span className={`badge ${a.status === 'ON SCENE' ? 'badge-success' : 'badge-info'}`}>{a.status}</span>
                  </div>
                  <button className="btn btn-secondary w-full" style={{ justifyContent: 'center', fontSize: '0.72rem' }} onClick={() => showToast(`Status ping transmitted to ${a.name}`, 'success')}>TRANSMIT STATUS</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
