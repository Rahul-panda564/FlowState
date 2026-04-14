import { useState, useEffect, useCallback } from 'react';
import AppShell from '../../layouts/AppShell';
import { venueApi, eventApi } from '../../api';
import { superAdminSidebar, superAdminBrand, superAdminUser } from '../../data/sidebarConfig';
import Icon from '../../components/common/Icon';
import GlassPanel from '../../components/common/GlassPanel';
import StatCard from '../../components/common/StatCard';
import { formatCurrency } from '../../utils/currency';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    venues: 0,
    events: 0,
    load: 0,
    health: 98
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // System Telemetry State
  const [telemetry, setTelemetry] = useState({
    cpu: 42.5,
    mem: 68.2,
    dbLatency: 12,
    nodes: { healthy: 12, total: 14 }
  });

  const fetchGlobalStats = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const vendors = await venueApi.getAll();
      const events = await eventApi.getAll();
      
      const activeVenues = vendors.filter(v => v.status === 'Active');
      const activeEvents = events.filter(e => e.status === 'Live');
      const avgLoad = vendors.length > 0 
        ? (vendors.reduce((acc, v) => acc + (v.liveLoad || 0), 0) / vendors.length).toFixed(1) 
        : 0;

      setStats({
        venues: vendors.length,
        activeVenues: activeVenues.length,
        events: events.length,
        activeEvents: activeEvents.length,
        load: avgLoad,
        health: 100 - (vendors.filter(v => v.status === 'Offline').length * 5)
      });
    } catch (err) {
      console.error('Failed to sync global stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchGlobalStats();
    const interval = setInterval(() => fetchGlobalStats(), 10000);
    return () => clearInterval(interval);
  }, [fetchGlobalStats]);

  // Jitter effect for "Live" telemetry simulation
  useEffect(() => {
    const t = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 4)),
        mem: Math.min(100, Math.max(0, prev.mem + (Math.random() - 0.5) * 2)),
        dbLatency: Math.max(8, prev.dbLatency + (Math.random() - 0.5) * 5)
      }));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const cpuColor = telemetry.cpu < 60 ? 'green' : telemetry.cpu < 80 ? 'yellow' : 'red';
  const memColor = telemetry.mem < 60 ? 'green' : telemetry.mem < 80 ? 'blue' : 'red';

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

  // Mock Operational Data
  const revenueMetrics = {
    mrr: 125400,
    mrrChange: 12,
  };



  const [activeTab, setActiveTab] = useState('System');

  const renderSystemDashboard = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 20, marginBottom: 20 }}>
        <GlassPanel 
          header="Infrastructure Health" 
          headerActions={<button className="btn-icon"><Icon name="chart" size={14} /></button>}
        >
          {[
            { label: 'CPU Core Utilization', value: telemetry.cpu.toFixed(1), color: cpuColor },
            { label: 'Memory Footprint', value: telemetry.mem.toFixed(1), color: memColor },
            { label: 'DB Transaction Latency', value: telemetry.dbLatency.toFixed(1), color: 'blue' },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="label-caps" style={{ fontSize: '0.65rem' }}>{m.label}</span>
                <span className="mono" style={{ fontSize: '0.82rem', fontWeight: 600 }}>{m.value}%</span>
              </div>
              <div className="progress-bar">
                <div className={`progress-bar-fill ${m.color}`} style={{ width: `${m.value}%` }}></div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="status-dot online"></span> CLUSTER: {telemetry.nodes.healthy} ACTIVE</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="status-dot online"></span> API GATEWAY: STABLE</span>
          </div>
        </GlassPanel>

        <GlassPanel style={{ position: 'relative', overflow: 'hidden', padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="label-caps">Platform Reach // {stats.venues} Regions</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-success">● Connected</span>
              <span className="badge badge-accent">● Testing</span>
            </div>
          </div>
          <div style={{ height: 180, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <svg width="200" height="100" viewBox="0 0 200 100" opacity="0.4">
                <path d="M20,50 Q60,20 100,50 T180,50" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
                <circle cx="20" cy="50" r="2" fill="var(--accent)" />
                <circle cx="100" cy="50" r="2" fill="var(--accent)" />
                <circle cx="180" cy="50" r="2" fill="var(--accent)" />
             </svg>
             <div style={{ position: 'absolute', color: 'var(--text-muted)', fontSize: '0.7rem' }}>GEO_SPATIAL_SYNC_ACTIVE</div>
          </div>
        </GlassPanel>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        <GlassPanel header="Active Log Analytics">
          <table className="data-table">
            <thead>
              <tr><th>Node ID</th><th>Load</th><th>Status</th><th style={{ textAlign: 'right' }}>Uptime</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: 20, textAlign: 'center' }}>Synchronizing clusters...</td></tr>
              ) : (
                <>
                  <tr style={{ background: 'var(--accent-dim)' }}>
                    <td className="mono">NEXUS_CORE</td>
                    <td>{stats.load}%</td>
                    <td><span className="badge badge-success">Master</span></td>
                    <td style={{ textAlign: 'right' }} className="mono">99.98%</td>
                  </tr>
                  <tr>
                    <td className="mono">NODE_ALPHA_01</td>
                    <td>24%</td>
                    <td><span className="badge badge-info">Slave</span></td>
                    <td style={{ textAlign: 'right' }} className="mono">100%</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </GlassPanel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <StatCard accent label="System Flow" value="842.2k" subtext="Telemetry Packets / Min" />
          <GlassPanel header="Platform Saturation">
             <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{stats.health}%</div>
                <div className="label-caps" style={{ color: 'var(--text-muted)' }}>Infrastructure Index</div>
             </div>
          </GlassPanel>
        </div>
      </div>
    </>
  );

  const renderTrafficDashboard = () => (
    <div className="tab-content page-enter">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 20 }}>
        <GlassPanel header="Adoption Funnel // Global Throughput">
          <div style={{ padding: '20px 0' }}>
             {['Onboarding', 'Activation', 'Retention'].map((step, i) => (
                <div key={step} style={{ marginBottom: 20 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className="label-caps" style={{ fontSize: '0.7rem' }}>{step}</span>
                      <span className="label-accent" style={{ fontSize: '0.7rem' }}>{i === 0 ? '100%' : i === 1 ? '74%' : '42%'}</span>
                   </div>
                   <div className="progress-bar" style={{ height: 10 + (2-i)*4 }}>
                      <div className="progress-bar-fill" style={{ width: i === 0 ? '100%' : i === 1 ? '74%' : '42%', background: 'var(--accent)' }}></div>
                   </div>
                </div>
             ))}
          </div>
          <p className="label-caps" style={{ fontSize: '0.6rem', textAlign: 'center' }}>Conversion velocity: +5.2% vs prev. cycle</p>
        </GlassPanel>

        <StatCard label="Platform ROI Index" value={formatCurrency(revenueMetrics.mrr)} trend="+12.4%" accent>
           <div style={{ marginTop: 20, height: 120, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              {[1.8, 1.9, 2.0, 2.1, 2.2, 2.4].map((v, i) => (
                <div key={i} style={{ flex: 1, height: `${(v/2.5)*100}%`, background: 'var(--accent)', opacity: 0.2 + (i*0.1), borderRadius: '2px 2px 0 0' }} />
              ))}
           </div>
           <div className="label-caps" style={{ marginTop: 8, fontSize: '0.55rem', opacity: 0.5 }}>Monthly Recursive Revenue (MRR) - 6mo Trend</div>
        </StatCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        <GlassPanel header="Concurrent Sessions // 24H">
           <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100%" height="80" viewBox="0 0 100 40" preserveAspectRatio="none">
                 <path d="M0,35 Q20,10 40,25 T80,15 T100,5" fill="none" stroke="var(--accent)" strokeWidth="1" />
                 <path d="M0,40 Q20,20 40,35 T80,25 T100,20" fill="none" stroke="rgba(0,180,150,0.3)" strokeWidth="1" />
              </svg>
           </div>
           <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.6rem' }}><span className="status-dot online"></span> ATTENDEES (1.2M)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.6rem' }}><span className="status-dot warning"></span> OPERATORS (42K)</div>
           </div>
        </GlassPanel>
        <StatCard compact label="Customer Churn" value="1.4%" subtext="Target: < 2.0%" />
        <StatCard compact label="Feature Adoption" value="68.2%" subtext="Top: Sandbox_Beta" />
      </div>
    </div>
  );

  const renderNetworkDashboard = () => (
    <div className="tab-content page-enter">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 20 }}>
        <GlassPanel header="Global Data Ingestion Speed [PTS/SEC]">
          <div style={{ display: 'flex', gap: 40, padding: '20px' }}>
             <div style={{ flex: 1 }}>
                <div className="label-caps" style={{ color: 'var(--accent)', fontSize: '1.6rem', fontWeight: 700 }}>1.2M</div>
                <div className="label-caps" style={{ fontSize: '0.65rem' }}>LiDAR Packets / Sec</div>
                <div style={{ width: '100%', height: 4, background: 'var(--accent)', marginTop: 8, borderRadius: 2, opacity: 0.4 }} />
             </div>
             <div style={{ flex: 1 }}>
                <div className="label-accent" style={{ fontSize: '1.6rem', fontWeight: 700 }}>45.2K</div>
                <div className="label-caps" style={{ fontSize: '0.65rem' }}>IoT Sensor Events / Min</div>
                <div style={{ width: '100%', height: 4, background: 'var(--accent)', marginTop: 8, borderRadius: 2, opacity: 0.4 }} />
             </div>
          </div>
          <div className="label-caps" style={{ padding: '0 20px', fontSize: '0.6rem', opacity: 0.5 }}>Sync Delta: 12ms // Protocol: UDP/SECURE-B</div>
        </GlassPanel>

        <GlassPanel header="Cluster Node Topology">
           <div style={{ height: 160, display: 'flex', gap: 4, alignItems: 'flex-end' }}>
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: `${20 + Math.random()*80}%`, background: 'var(--accent)', opacity: 0.2 + (Math.random()*0.4), borderRadius: 1 }} />
              ))}
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <span className="label-caps" style={{ fontSize: '0.6rem' }}>North-AM Cluster</span>
              <span className="label-accent" style={{ fontSize: '0.6rem' }}>84% Capacity</span>
           </div>
        </GlassPanel>
      </div>

      <GlassPanel header="Node Health Matrix">
         <table className="data-table">
            <thead>
               <tr><th>Regional Cluster</th><th>Latency</th><th>Throughput</th><th>Status</th></tr>
            </thead>
            <tbody>
               <tr><td className="mono">NA-EAST (Virginia)</td><td className="mono">18ms</td><td className="mono">4.2GB/s</td><td><span className="badge badge-success">Stable</span></td></tr>
               <tr><td className="mono">EU-CENTRAL (Frankfurt)</td><td className="mono">32ms</td><td className="mono">2.8GB/s</td><td><span className="badge badge-success">Stable</span></td></tr>
               <tr><td className="mono">APAC-01 (Tokyo)</td><td className="mono">112ms</td><td className="mono">540MB/s</td><td><span className="badge badge-warning">Degraded</span></td></tr>
            </tbody>
         </table>
      </GlassPanel>
    </div>
  );

  return (
    <AppShell
      sidebarItems={superAdminSidebar}
      brand={superAdminBrand.brand}
      brandSub={superAdminBrand.brandSub}
      user={superAdminUser}
      headerExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {['System', 'Traffic', 'Network'].map((t) => (
            <span key={t} className={activeTab === t ? 'label-accent' : 'label-caps'} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => { setActiveTab(t); showToast(`Shifting view to ${t} telemetry...`, 'info'); }}>{t}</span>
          ))}
          <div style={{ width: 1, height: 16, background: 'var(--border-subtle)' }} />
          <button className="btn btn-secondary" style={{ fontSize: '0.62rem', padding: '4px 12px' }} onClick={() => showToast('Compiling global infrastructure audit...', 'success')}>System Audit</button>
        </div>
      }
    >
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1>System Command Centre</h1>
            <p className="label-caps" style={{ marginTop: 4 }}>
              CORE_TELEMETRY // VIEW: {activeTab.toUpperCase()} // SESSION: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
          <div className="page-actions">
            <button className="btn btn-secondary" onClick={() => showToast('Syncing mission intelligence log...', 'info')}><Icon name="export" size={14} /> Intelligence Log</button>
            <button 
              className={`btn btn-primary ${refreshing ? 'loading' : ''}`} 
              onClick={() => {
                  fetchGlobalStats(true);
                  showToast('Re-synchronizing all global nodes...', 'success');
              }}
              disabled={refreshing}
            >
              <Icon name="refresh" size={14} /> {refreshing ? 'Syncing...' : 'Force Sync'}
            </button>
          </div>
        </div>
      </div>

      <div className="tab-container" style={{ marginTop: 10 }}>
        {activeTab === 'System' && renderSystemDashboard()}
        {activeTab === 'Traffic' && renderTrafficDashboard()}
        {activeTab === 'Network' && renderNetworkDashboard()}
      </div>
    </AppShell>
  );
}
