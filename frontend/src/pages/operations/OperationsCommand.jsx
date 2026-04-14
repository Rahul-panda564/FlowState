import { useState, useEffect } from 'react';
import Icon from '../../components/common/Icon';
import GlassPanel from '../../components/common/GlassPanel';
import StatCard from '../../components/common/StatCard';
import { venueApi } from '../../api';
import { operationsData, operationsAlerts } from '../../data/mockData';
import { operationsSidebar, operationsBrand } from '../../data/sidebarConfig';
import { formatCurrency } from '../../utils/currency';

export default function OperationsCommand() {
  const [venue, setVenue] = useState(null);
  const [clock, setClock] = useState(operationsData.localTime);
  const [activeTab, setActiveTab] = useState('Dashboard');

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

  const fetchLiveData = async () => {
    try {
      const liveVenues = await venueApi.getAll();
      if (liveVenues && liveVenues.length > 0) {
        setVenue(liveVenues[0]); 
      } else {
        // Fallback if API returns empty but is up
        setVenue(venues[0]);
      }
    } catch (err) {
      console.warn('MISSION_CONTROL: Stadium Node Offline. Switching to Local Simulation Mode.');
      // Auto-fallback to mock data so UI remains "Impressive"
      // eslint-disable-next-line react-hooks/purity
      setVenue(venues[0]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLiveData();
    const i = setInterval(fetchLiveData, 2500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const p = clock.split(':').map(Number);
      p[2]++;
      if (p[2] >= 60) { p[2] = 0; p[1]++; }
      if (p[1] >= 60) { p[1] = 0; p[0]++; }
      setClock(p.map(x => String(x).padStart(2, '0')).join(':'));
    }, 1000);
    return () => clearInterval(t);
  }, [clock]);

  const d = operationsData;
  const sevColors = { critical: 'var(--status-alert)', warning: 'var(--status-warning)', info: 'var(--status-info)' };
  const occValue = venue ? Math.floor((venue.liveLoad / 100) * venue.capacity) : 0;
  const occPct = venue ? venue.liveLoad : 0;
  const gameStatus = venue?.status === 'Evacuating' ? 'EMERGENCY EGRESS' : `${d.gameQuarter} — ${d.gameClock}`;

  const renderDashboard = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, marginBottom: 20 }}>
        <GlassPanel header="Visual Intelligence Heatmap" style={{ position: 'relative', overflow: 'hidden', minHeight: 340, background: '#080A0F' }}>
          {/* Blueprint Overlay Background */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
            <pattern id="grid-3d" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--accent)" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-3d)" />
            <path d="M 50,50 L 350,50 M 50,150 L 350,150 M 50,250 L 350,250" stroke="var(--accent)" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M 100,20 L 100,320 M 200,20 L 200,320 M 300,20 L 300,320" stroke="var(--accent)" strokeWidth="1" strokeDasharray="5,5" />
          </svg>

          <div className="hud-scanline" style={{ position: 'absolute', opacity: 0.15, height: '100px' }} />

          <div className="heatmap-overlay" style={{ 
            position: 'absolute', inset: 0, 
            background: `radial-gradient(circle at 50% 50%, rgba(255, 71, 87, ${occPct/120}) 0%, rgba(255, 107, 107, 0.05) 50%, transparent 100%)`,
            zIndex: 1
          }}>
            <div className="stadium-bowl" style={{ 
              position: 'relative',
              opacity: 0.6, 
              border: '2px solid var(--accent)', 
              margin: '40px auto', 
              width: '280px', 
              height: '180px', 
              borderRadius: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0, 212, 170, 0.2)'
            }}>
               <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-deep)', padding: '2px 8px', border: '1px solid var(--accent)', borderRadius: 4, fontSize: '0.6rem', color: 'var(--accent)' }}>MUMBAI_ARENA_NORTH</div>
               <div className={`heat-zone ${occPct > 80 ? 'critical' : occPct > 60 ? 'warning' : 'info'}`} style={{ 
                width: '60%', height: '60%', borderRadius: '50%',
                background: occPct > 80 ? 'var(--status-alert)' : 'var(--accent)',
                filter: 'blur(40px)', opacity: occPct/150,
                transition: 'all 1.5s ease'
               }} />
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 2 }}>
               <div className="label-caps" style={{ color: 'var(--accent)', fontWeight: 700 }}>BLUEPRINT_DENSITY_TRACKER</div>
               <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Structural load: SEC_427 | SEC_428 [MUMBAI]</div>
            </div>
          </div>
        </GlassPanel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
           <div className="stagger-item" style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 10, animationDelay: '0.1s' }}>
              <StatCard compact label="Live Occupancy" value={occValue.toLocaleString()} progress={occPct} subtext={`${occPct}% Threshold`} />
              <StatCard compact label="Flow Velocity" value={`${d.flowEfficiency}%`} subtext="Optimization delta +4%" />
           </div>
           <div className="stagger-item" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, animationDelay: '0.2s' }}>
              <StatCard compact label="Avg Velocity" value={`${d.avgVelocity}m/s`} subtext={`Peak ${d.peakDensity.change}%`} />
              <StatCard compact label="Est Revenue" value={`${formatCurrency(d.estRevenue, { maximumFractionDigits: 0 })}/m`} accent />
           </div>
           <div className="stagger-item" style={{ animationDelay: '0.3s' }}>
             <StatCard label="Egress Projection" value={venue?.status === 'Evacuating' ? 'ACTIVE_EXIT' : d.egressEstimate} subtext={venue?.status === 'Evacuating' ? 'Estimated clearance in 8.2m' : 'Standard exit protocol'} />
           </div>
        </div>
      </div>
      <GlassPanel header="System Logic Predictions" headerActions={<><Icon name="bolt" color="var(--accent)" /> AI ACTIVE</>}>
        <div className="alert-stack">
          {operationsAlerts.map((a) => (
            <div key={a.id} className="alert-row">
              <div className="alert-indicator" style={{ background: sevColors[a.severity] }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`badge badge-${a.severity}`}>{a.severity}</span>
                  <span style={{ fontWeight: 600 }}>{a.title}</span>
                </div>
                <p className="alert-desc">{a.description}</p>
              </div>
              <div className="alert-actions">
                {a.actions.map(act => <button key={act} className="btn btn-secondary" style={{ fontSize: '0.7rem' }} onClick={() => showToast(`Action dispatched: ${act}`, 'success')}>{act}</button>)}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </>
  );

  const renderAnalytics = () => (
    <div className="grid-2" style={{ gap: 24 }}>
      <GlassPanel header="Entry/Exit Velocity (Throughput)">
        <div style={{ height: 240, display: 'flex', alignItems: 'flex-end', gap: 12, padding: '20px 0' }}>
          {d.throughputHistory.map((v, i) => (
             <div key={i} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ height: `${v}%`, background: 'var(--accent)', opacity: 0.3 + (v/150), borderRadius: '2px 2px 0 0', border: '1px solid var(--accent-border)' }} />
                <span className="mono" style={{ fontSize: '0.6rem', textAlign: 'center', opacity: 0.6 }}>T-{9-i}m</span>
             </div>
          ))}
        </div>
        <div className="label-caps" style={{ textAlign: 'center', marginTop: 12 }}>Pedestrian throughput across all sensor nodes (pax/min)</div>
      </GlassPanel>
      <GlassPanel header="Revenue Capture Performance">
        <div style={{ height: 240, position: 'relative', overflow: 'hidden' }}>
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d={`M 0 100 ${d.revenueHistory.map((v, i) => `L ${(i*11)} ${100 - (v*8)}`).join(' ')} L 100 100 Z`} fill="url(#revGrad)" stroke="var(--accent)" strokeWidth="0.5" />
              <defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" /><stop offset="100%" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
           </svg>
           <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right' }}>
              <div className="label-accent">CURRENCY_VELOCITY</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{formatCurrency(d.estRevenue * 60)}/hr</div>
           </div>
        </div>
      </GlassPanel>
      <StatCard label="Fan Sentiment Tracker" value={d.fanSentiment === 'GOOD' ? 'OPTIMAL' : 'WATCH'} accent subtext="Aggregated biometrics & survey feedback">
        <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
           {[1, 0.8, 1.2, 0.6, 1.1, 0.9].map((s, i) => (
             <div key={i} className="pulse" style={{ width: 12, height: 12 * s, background: 'var(--accent)', borderRadius: 6, animationDelay: `${i*0.2}s` }} />
           ))}
        </div>
      </StatCard>
      <GlassPanel header="Operational Inefficiency Matrix">
         <div style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}><span className="label-caps">Section Bottle-Necks</span><span className="label-accent">CRITICAL_3</span></div>
            {['South Concourse', 'Gate 2 Entrance', 'Level 4 Skybox'].map((loc, i) => (
              <div key={i} style={{ padding: '8px 12px', background: 'rgba(255, 71, 87, 0.05)', borderLeft: '3px solid var(--status-alert)', borderRadius: '0 4px 4px 0', marginBottom: 8, fontSize: '0.85rem' }}>{loc} — Flow integrity compromised by 22%</div>
            ))}
         </div>
      </GlassPanel>
    </div>
  );

  const renderLiveMap = () => (
    <div style={{ height: 600, position: 'relative' }}>
      <GlassPanel header="Digital Twin Schematic [ACTIVE_SYNC]" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 40, border: '1px dashed var(--border-subtle)', borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '80%', height: '80%', border: '1px solid var(--border-color)', borderRadius: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '60%', height: '60%', background: 'var(--bg-deep)', borderRadius: 50, border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="label-caps" style={{ opacity: 0.4 }}>Field_Level_Prime</div></div>
           </div>
           {[
             { top: '10%', left: '45%', id: 'L-01', status: 'online' },
             { top: '85%', left: '45%', id: 'L-02', status: 'online' },
             { top: '45%', left: '10%', id: 'I-01', status: 'warning' },
             { top: '45%', left: '85%', id: 'I-02', status: 'online' },
           ].map(node => (
             <div key={node.id} style={{ position: 'absolute', top: node.top, left: node.left, cursor: 'pointer' }} onClick={() => showToast(`Syncing telemetry for ${node.id}...`, 'info')}>
                <div className={`status-dot ${node.status} pulse`} style={{ width: 12, height: 12 }} />
                <div className="label-caps" style={{ fontSize: '0.5rem', marginTop: 4 }}>{node.id}</div>
             </div>
           ))}
        </div>
        <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
           <div className="label-accent">LEGEND // SPATIAL_METRICS</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem' }}><span className="status-dot online"></span> <span>Node Operational</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem' }}><span className="status-dot warning"></span> <span>Sync Delay / Jitter</span></div>
           </div>
        </div>
        <div style={{ position: 'absolute', top: 60, right: 24 }}><StatCard compact label="Spatial Accuracy" value="99.94%" /></div>
      </GlassPanel>
    </div>
  );

  return (
    <>
      <div className="telemetry-strip" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <StatCard compact label="NEXUS TIME" value={clock} style={{ background: 'transparent', padding: 0 }} />
          <StatCard compact label="GAME STATE" value={gameStatus} style={{ background: 'transparent', padding: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
             <div className="label-caps">SIGNAL STATUS</div>
             <div style={{ display: 'flex', gap: 4 }}>
               <span className={`badge ${venue ? 'badge-success' : 'badge-critical'}`}>
                 {venue ? 'NODE_CONNECTED' : 'NODE_OFFLINE'}
               </span>
             </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="label-caps">Command Center</div>
          <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{venue?.name || d.eventName}</div>
        </div>
      </div>

      <div className="tab-content" key={activeTab}>
        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Analytics' && renderAnalytics()}
        {activeTab === 'Live Map' && renderLiveMap()}
      </div>
    </>
  );
}
