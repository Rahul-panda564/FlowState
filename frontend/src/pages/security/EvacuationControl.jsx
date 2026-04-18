import { useState, useEffect } from 'react';
import { venueApi } from '../../api';
import { evacuationData } from '../../data/mockData';
import StatCard from '../../components/common/StatCard';
import { useNotifications } from '../../context/NotificationContext';

export default function EvacuationControl() {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState("00:00:00");
  const [isEvacuating, setIsEvacuating] = useState(false);
  const [activeSubView, setActiveSubView] = useState('Protocol');
  const { addNotification, showToast } = useNotifications();


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
      addNotification(
        isEvacuating ? 'Evacuation Aborted' : 'MASS EVACUATION TRIGGERED',
        isEvacuating ? 'Evacuation protocol has been manually terminated by Command.' : 'System-wide mass egress protocol is now ACTIVE.',
        isEvacuating ? 'info' : 'alert'
      );
    } catch {
      setIsEvacuating(!isEvacuating);
      if (!isEvacuating) setTimer("00:00:00");
      showToast(isEvacuating ? 'EVACUATION CONTROL CANCELLED' : '⚠ SYSTEM WIDE EVACUATION TRIGGERED', isEvacuating ? 'success' : 'critical');
      addNotification(
        isEvacuating ? 'Evacuation Aborted' : 'MASS EVACUATION TRIGGERED',
        isEvacuating ? 'Evacuation protocol has been manually terminated by Command.' : 'System-wide mass egress protocol is now ACTIVE.',
        isEvacuating ? 'info' : 'alert'
      );
    }
  };

  const d = evacuationData;
  const remainingValue = venue ? Math.floor((venue.liveLoad / 100) * venue.capacity) : 0;
  const statusColors = { cleared: 'var(--status-ok)', clearing: 'var(--status-warning)', pending: 'var(--text-muted)' };

  const renderProtocol = () => (
    <div className="card" style={{ padding: 40, textAlign: 'center', background: isEvacuating ? 'rgba(255, 71, 87, 0.05)' : 'var(--bg-elevated)', border: isEvacuating ? '2px solid var(--status-alert)' : '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      {isEvacuating && <div className="pulse" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--status-alert)' }}></div>}
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: isEvacuating ? 'var(--status-alert)' : 'var(--bg-deep)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isEvacuating ? '0 0 30px rgba(255, 71, 87, 0.4)' : 'none' }}>
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={isEvacuating ? "#fff" : "var(--text-muted)"} strokeWidth="2">
             <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
           </svg>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 16, color: isEvacuating ? 'var(--status-alert)' : 'var(--text-primary)' }}>
          {isEvacuating ? 'PROTOCOL_ACTIVE' : 'READY_STANDBY'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
          {isEvacuating 
            ? 'Mass egress protocols are currently executing across all stadium sectors. Bi-directional communication hubs are broadcasting emergency instructions to all attendees.' 
            : 'The venue egress blueprint is loaded and synchronized with local emergency nodes. Triggering evacuation will activate all primary egress channels and notify external agencies.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
           <button 
             className={`btn ${isEvacuating ? 'btn-danger' : 'btn-primary'}`} 
             style={{ padding: '16px 40px', fontSize: '1.2rem', fontWeight: 700 }}
             onClick={handleEvacToggle}
           >
             {isEvacuating ? 'ABORT EVACUATION' : 'INITIATE EVACUATION'}
           </button>
        </div>
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 40 }}>
           <div>
             <div className="label-caps">PROTOCOL_TIMER</div>
             <div className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 8, color: 'var(--accent)' }}>{timer}</div>
           </div>
           <div>
             <div className="label-caps">SYSTEM_HEALTH</div>
             <div className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 8, color: 'var(--status-ok)' }}>100%</div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderEgress = () => (
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
            <div className="progress-bar" style={{ width: 120 }}>
              <div className={`progress-bar-fill ${z.status === 'cleared' ? 'green' : 'yellow'}`} style={{ width: z.status === 'cleared' ? '100%' : '45%' }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Egress Channel Status</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
           {[
             { name: 'Gate 4 - Main', status: 'PRIMARY', cap: '180/m' },
             { name: 'Gate B - North', status: 'OVERFLOW', cap: '90/m' },
             { name: 'VIP Egress 1', status: 'SECURE', cap: '45/m' },
             { name: 'East Stairwell', status: 'PRIMARY', cap: '120/m' },
           ].map((g, i) => (
             <div key={i} className="card" style={{ padding: 14, background: 'var(--bg-deep)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <div style={{ fontWeight: 600 }}>{g.name}</div>
                  <div className="label-caps" style={{ fontSize: '0.62rem', color: 'var(--accent)' }}>{g.status}</div>
               </div>
               <div className="mono" style={{ fontSize: '0.85rem' }}>{g.cap}</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderAgencies = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Agency Dispatch Matrix</span>
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
      <div className="card">
         <div className="card-header"><span className="card-title">Inter-Agency Log</span></div>
         <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {[
              { time: '14:25:01', msg: 'MET Police units arriving at Sector 4 ingress', unit: 'POLICE' },
              { time: '14:26:12', msg: 'Medical station 2 reporting 0 casualties', unit: 'MEDICAL' },
              { time: '14:27:05', msg: 'Fire Marshal confirms all gas lines isolated', unit: 'FIRE' },
              { time: '14:28:44', msg: 'Staff units 01-44 deployed to stairwells', unit: 'OPS' },
            ].map((l, i) => (
               <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 12 }}>
                 <div className="label-caps" style={{ width: 50, fontSize: '0.6rem', color: 'var(--accent)' }}>{l.unit}</div>
                 <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem' }}>{l.msg}</div>
                    <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>{l.time}</div>
                 </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <p className="label-caps">MASS EGRESS & EMERGENCY OPS</p>
              <div style={{ display: 'flex', gap: 12, marginLeft: 12, borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
                {['Protocol', 'Egress', 'Agencies'].map((t) => (
                  <span key={t} className={activeSubView === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.65rem' }} onClick={() => { setActiveSubView(t); showToast(`Switching to ${t.toLowerCase()} command tier`, 'info'); }}>{t}</span>
                ))}
              </div>
            </div>
            <h1>Evacuation Command Centre</h1>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary" onClick={() => showToast('Compiling emergency egress report...', 'success')}>Export Intel</button>
            <button 
              className={`btn ${isEvacuating ? 'btn-danger' : 'btn-primary'}`} 
              onClick={handleEvacToggle}
            >
              {isEvacuating ? 'TERMINATE PROTOCOL' : 'TRIGGER EVACUATION'}
            </button>
          </div>
        </div>
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

          {activeSubView === 'Protocol' && renderProtocol()}
          {activeSubView === 'Egress' && renderEgress()}
          {activeSubView === 'Agencies' && renderAgencies()}
        </>
      )}
    </>
  );
}
